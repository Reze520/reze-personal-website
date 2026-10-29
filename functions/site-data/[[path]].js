/* ============================================================
   RezeのBlog · Cloudflare Pages Functions
   ------------------------------------------------------------
   统一 API 路由（挂在 /api/* 下）：
     GET    /api/content       公开读：{ site, posts }
     POST   /api/login         { pass } → 校验管理员口令
     POST   /api/posts         写文章（需口令）
     PUT    /api/posts/:id     改文章（需口令）
     DELETE /api/posts/:id     删文章（需口令）
     POST   /api/settings      { site } → 保存整站设置（需口令）

   依赖：Pages 项目绑定 D1（变量名 DB）+ 环境变量 ADMIN_PASS（管理员口令）
   ============================================================ */

const JSON_HEADERS = { "Content-Type": "application/json; charset=utf-8" };

function json(data, status) {
  return new Response(JSON.stringify(data), { status: status || 200, headers: JSON_HEADERS });
}

async function initSchema(env) {
  await env.DB.prepare(
    `CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT DEFAULT '', title TEXT DEFAULT '', date TEXT DEFAULT '', updated TEXT DEFAULT '',
      cat TEXT DEFAULT '', tags TEXT DEFAULT '[]', cover TEXT DEFAULT '',
      pinned INTEGER DEFAULT 0, excerpt TEXT DEFAULT '', content TEXT DEFAULT '',
      created_at TEXT DEFAULT (datetime('now'))
    )`
  ).run();
  await env.DB.prepare(
    `CREATE TABLE IF NOT EXISTS settings (k TEXT PRIMARY KEY, v TEXT)`
  ).run();
  await env.DB.prepare(
    `CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT DEFAULT '', title TEXT DEFAULT '', desc TEXT DEFAULT '',
      type TEXT DEFAULT 'note', created_at TEXT DEFAULT (datetime('now'))
    )`
  ).run();
}

function authorized(request, env) {
  const p = request.headers.get("X-Admin-Pass") || "";
  return !!env.ADMIN_PASS && p === env.ADMIN_PASS;
}

function mapPost(r) {
  let tags = [];
  try { tags = JSON.parse(r.tags || "[]"); } catch (e) {}
  return {
    id: r.slug || ("post-" + r.id),
    title: r.title || "",
    date: r.date || "",
    updated: r.updated || "",
    cat: r.cat || "",
    tags: Array.isArray(tags) ? tags : [],
    cover: r.cover || "",
    pinned: !!r.pinned,
    excerpt: r.excerpt || "",
    content: r.content || "",
    _dbid: r.id
  };
}

export async function onRequest(context) {
  const { request, env, params } = context;
  const seg = params.path || [];
  const method = request.method;

  try {
    await initSchema(env);
  } catch (e) {
    return json({ error: "数据库未就绪：" + e.message }, 500);
  }

  // 公开读内容
  if (method === "GET" && seg.length === 1 && seg[0] === "content") {
    const s = await env.DB.prepare("SELECT v FROM settings WHERE k='site'").first();
    let site = {};
    if (s) { try { site = JSON.parse(s.v); } catch (e) { site = {}; } }
    const rows = await env.DB.prepare("SELECT * FROM posts ORDER BY pinned DESC, created_at DESC, id DESC").all();
    const evs = await env.DB.prepare("SELECT * FROM events ORDER BY date ASC, id ASC").all();
    return json({ site: site, posts: (rows.results || []).map(mapPost), events: (evs.results || []) });
  }

  // 登录
  if (method === "POST" && seg.length === 1 && seg[0] === "login") {
    const body = await request.json().catch(function () { return {}; });
    if (env.ADMIN_PASS && body.pass === env.ADMIN_PASS) return json({ ok: true });
    return json({ ok: false, error: "口令错误" }, 401);
  }

  // 以下都需要管理员口令
  if (!authorized(request, env)) return json({ error: "未授权" }, 401);

  // 文章
  if (seg.length >= 1 && seg[0] === "posts") {
    if (method === "POST" && seg.length === 1) {
      const b = await request.json();
      const r = await env.DB.prepare(
        "INSERT INTO posts (slug,title,date,updated,cat,tags,cover,pinned,excerpt,content) VALUES (?,?,?,?,?,?,?,?,?,?)"
      ).bind(
        b.slug || "", b.title || "", b.date || "", b.updated || "", b.cat || "",
        JSON.stringify(b.tags || []), b.cover || "", b.pinned ? 1 : 0, b.excerpt || "", b.content || ""
      ).run();
      return json({ ok: true, id: r.meta && r.meta.last_row_id });
    }
    if ((method === "PUT" || method === "DELETE") && seg.length === 2) {
      const id = Number(seg[1]);
      if (method === "DELETE") {
        await env.DB.prepare("DELETE FROM posts WHERE id=?").bind(id).run();
        return json({ ok: true });
      }
      const b = await request.json();
      await env.DB.prepare(
        "UPDATE posts SET slug=?,title=?,date=?,updated=?,cat=?,tags=?,cover=?,pinned=?,excerpt=?,content=? WHERE id=?"
      ).bind(
        b.slug || "", b.title || "", b.date || "", b.updated || "", b.cat || "",
        JSON.stringify(b.tags || []), b.cover || "", b.pinned ? 1 : 0, b.excerpt || "", b.content || "", id
      ).run();
      return json({ ok: true });
    }
  }

  // 日历记事
  if (seg.length >= 1 && seg[0] === "events") {
    if (method === "POST" && seg.length === 1) {
      const b = await request.json();
      const r = await env.DB.prepare(
        "INSERT INTO events (date,title,desc,type) VALUES (?,?,?,?)"
      ).bind(b.date || "", b.title || "", b.desc || "", b.type || "note").run();
      return json({ ok: true, id: r.meta && r.meta.last_row_id });
    }
    if ((method === "PUT" || method === "DELETE") && seg.length === 2) {
      const id = Number(seg[1]);
      if (method === "DELETE") {
        await env.DB.prepare("DELETE FROM events WHERE id=?").bind(id).run();
        return json({ ok: true });
      }
      const b = await request.json();
      await env.DB.prepare(
        "UPDATE events SET date=?,title=?,desc=?,type=? WHERE id=?"
      ).bind(b.date || "", b.title || "", b.desc || "", b.type || "note", id).run();
      return json({ ok: true });
    }
  }

  // 设置
  if (method === "POST" && seg.length === 1 && seg[0] === "settings") {
    const b = await request.json();
    const site = b.site || {};
    await env.DB.prepare(
      "INSERT INTO settings (k,v) VALUES ('site',?) ON CONFLICT(k) DO UPDATE SET v=excluded.v"
    ).bind(JSON.stringify(site)).run();
    return json({ ok: true });
  }

  return json({ error: "not found" }, 404);
}
