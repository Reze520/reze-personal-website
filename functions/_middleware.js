/* ============================================================
   /post 的服务端预渲染（middleware 版）
   ------------------------------------------------------------
   这个站是原生 JS 的单页，静态 post.html 的 <title>/description/og
   对 330 篇文章全是同一句「文章 · RezeのBlog」，搜索引擎和分享卡片
   抓到的也是这句。前端虽然会动态改 meta，爬虫不执行 JS 就看不见。

   这里在原静态响应返回前改写 <head>（不新增路由）：文章专属的 title、description、
   og:*、canonical 与 BlogPosting 结构化数据。真人访问照旧走前端渲染，
   只有爬虫 UA 额外在 body 末尾拿到一份可读正文，便于索引。

   任何一步失败都原样返回静态页面，不改变原有行为。
   ============================================================ */

const BOT = /bot|crawler|spider|slurp|preview|facebookexternalhit|twitterbot|telegrambot|whatsapp|slackbot|discordbot|linkedinbot|weibo|baidu|sogou|360spider|yisou|bytespider|curl|wget|python-requests/i;
const ORIGIN = "https://reze520.pages.dev";

function esc(s) {
  return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function plain(s) {
  return String(s || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
function withHeaders(body, res) {
  const h = new Headers(res.headers);
  h.delete("content-length");
  h.delete("content-encoding");
  h.delete("etag");
  h.set("content-type", "text/html; charset=utf-8");
  return new Response(body, { status: 200, headers: h });
}
function setMeta(html, key, value, isProp) {
  const kind = isProp ? "property" : "name";
  const re = new RegExp('<meta\\s+' + kind + '="' + key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + '"\\s+content="[^"]*"\\s*/?>', "i");
  const tag = '<meta ' + kind + '="' + key + '" content="' + esc(value) + '">';
  return re.test(html) ? html.replace(re, tag) : html.replace("</head>", "  " + tag + "\n</head>");
}

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);
  /* 只接管文章页，其余请求原样放行；不定义新路由，避免和 post.html 撞车 */
  if ((url.pathname !== "/post" && url.pathname !== "/post.html") ||
      !url.searchParams.get("id")) return next();

  const res = await next();
  const ct = res.headers.get("content-type") || "";
  if (res.status !== 200 || ct.indexOf("text/html") === -1) return res;

  let html = await res.text();
  const id = url.searchParams.get("id") || "";
  if (!env.DB) return withHeaders(html, res);

  let row = null;
  try {
    row = await env.DB.prepare(
      "SELECT id, slug, title, date, updated, cat, tags, cover, excerpt, content FROM posts WHERE slug=? LIMIT 1"
    ).bind(id).first();
    const m = /^post-(\d+)$/.exec(id);
    if (!row && m) {
      row = await env.DB.prepare(
        "SELECT id, slug, title, date, updated, cat, tags, cover, excerpt, content FROM posts WHERE id=? LIMIT 1"
      ).bind(Number(m[1])).first();
    }
  } catch (e) {
    return withHeaders(html, res);
  }
  if (!row || !row.title) return withHeaders(html, res);

  let site = {};
  try {
    const s = await env.DB.prepare("SELECT v FROM settings WHERE k='site'").first();
    if (s) site = JSON.parse(s.v) || {};
  } catch (e) {}
  const name = site.name || "RezeのBlog";
  const title = row.title;
  const desc = plain(row.excerpt || row.content).slice(0, 150) || (title + " · " + name);
  const pageUrl = ORIGIN + "/post?id=" + encodeURIComponent(id);
  const image = row.cover
    ? (row.cover.indexOf("http") === 0 ? row.cover : ORIGIN + "/" + row.cover.replace(/^\//, ""))
    : ORIGIN + "/assets/uploads/share.jpg";

  html = html.replace(/<title>[\s\S]*?<\/title>/i, "<title>" + esc(title) + " · " + esc(name) + "</title>");
  html = setMeta(html, "description", desc, false);
  html = setMeta(html, "og:title", title + " · " + name, true);
  html = setMeta(html, "og:description", desc, true);
  html = setMeta(html, "og:url", pageUrl, true);
  html = setMeta(html, "og:type", "article", true);
  html = setMeta(html, "og:image", image, true);
  html = setMeta(html, "twitter:card", "summary_large_image", false);
  html = setMeta(html, "twitter:image", image, false);
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/i,
    '<link rel="canonical" href="' + esc(pageUrl) + '">');

  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": desc,
    "datePublished": row.date || "",
    "dateModified": row.updated || row.date || "",
    "inLanguage": "zh-CN",
    "author": { "@type": "Person", "name": name },
    "publisher": { "@type": "Organization", "name": name },
    "mainEntityOfPage": { "@type": "WebPage", "@id": pageUrl },
    "image": image,
    "articleSection": row.cat || "",
    "keywords": (function () { try { return (JSON.parse(row.tags || "[]") || []).join(","); } catch (e) { return ""; } })()
  };
  const ldJson = JSON.stringify(ld).replace(/</g, "\\u003c");
  html = html.replace("</head>",
    '  <script type="application/ld+json">' + ldJson + "</script>\n</head>");

  /* 正文直出。原来只有爬虫能拿到这一段，真人得等前端拉 /site-data/post 再画，
     慢网下标题下面要空一两秒。现在直接写进 #post：前端拿到数据后照旧重绘，
     数据没回来之前先让这段待着（main.js 里按 data-ssr-id 判断）。
     自带 loading="lazy"，正文里的几十张图不再一起排队。 */
  const bodyRaw = String(row.content || "");
  let ssrDone = false;
  if (bodyRaw) {
    const words = plain(bodyRaw).length;
    const body = bodyRaw.replace(/<img\s/gi, function (m) { return '<img loading="lazy" decoding="async" '; });
    const ssr =
      '<article class="g-article no-cover" data-ssr="1">' +
      '<a class="back" href="/writing">← 返回文章列表</a>' +
      "<h1>" + esc(title) + "</h1>" +
      '<div class="g-meta">' +
      "<span>" + esc(String(row.date || "").replace(/-/g, ".")) + "</span>" +
      (row.cat ? '<span class="cat">' + esc(row.cat) + "</span>" : "") +
      "<span>" + words + " 字</span>" +
      "</div>" +
      '<div class="g-prose prose">' + body + "</div>" +
      "</article>";
    const mainTag = /<main class="post-app" id="post"><\/main>/;
    if (mainTag.test(html)) {
      html = html.replace(mainTag,
        '<main class="post-app" id="post" data-ssr-id="' + esc(id) + '">' + ssr + "</main>");
      ssrDone = true;
    }
  }

  if (!ssrDone && BOT.test(request.headers.get("user-agent") || "")) {
    const preview =
      '<div id="prerender-post"><h1>' + esc(title) + "</h1>" +
      '<p class="prerender-meta">' + esc(row.date || "") + (row.cat ? " · " + esc(row.cat) : "") + "</p>" +
      '<article class="g-prose">' + String(row.content || "") + "</article>" +
      '<p><a href="' + esc(pageUrl) + '">在站点里打开这一篇</a></p></div>';
    html = html.replace("</body>", preview + "\n</body>");
  }

  return withHeaders(html, res);
}
