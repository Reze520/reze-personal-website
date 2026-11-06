/* ============================================================
   /p/<id> — 文章页的独立地址
   ------------------------------------------------------------
   原来文章是 /post?id=post-263，带问号，搜索引擎和分享卡片都
   不太愿意把它当成一篇独立文章。这里给每篇一个路径地址：
   /p/post-263，直接读静态 post.html，把 <head> 换成这一篇的
   title/description/og/canonical，正文也一并写进 #post。

   旧地址 /post?id=… 由 _middleware.js 301 过来，外链不断。

   任何一步失败都退回旧地址，不让读者卡在空白页。
   ============================================================ */

const ORIGIN = "https://reze520.pages.dev";
const BOT = /bot|crawler|spider|slurp|preview|facebookexternalhit|twitterbot|telegrambot|whatsapp|slackbot|discordbot|linkedinbot|weibo|baidu|sogou|360spider|yisou|bytespider|curl|wget|python-requests/i;

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
  const { request, env } = context;
  const url = new URL(request.url);
  let raw = "";
  try {
    raw = decodeURIComponent((context.params && context.params.slug) || "");
  } catch (e) {
    return Response.redirect(ORIGIN + "/writing", 302);
  }
  raw = raw.replace(/\/+$/, "");
  const id = raw;
  if (!id) return Response.redirect(ORIGIN + "/writing", 302);

  /* 静态 post.html 作为壳。ASSETS 直接读文件，不经过 middleware，
     避免 301 规则把这里也绕进去。 */
  let res;
  try {
    res = await env.ASSETS.fetch(new URL("/post.html", url.origin).toString());
  } catch (e) {
    return Response.redirect(ORIGIN + "/post?id=" + encodeURIComponent(id), 302);
  }
  if (!res || res.status !== 200) {
    return Response.redirect(ORIGIN + "/post?id=" + encodeURIComponent(id), 302);
  }

  let html = await res.text();
  if (!env.DB) return withHeaders(html, res);

  /* 先按 slug 找，再按 id 找，最后兼容纯数字。三条都空就当没这篇。 */
  let row = null;
  try {
    row = await env.DB.prepare(
      "SELECT id, slug, title, date, updated, cat, tags, cover, excerpt, content FROM posts WHERE slug=? LIMIT 1"
    ).bind(id).first();
    const m = /^(?:post-)?(\d+)$/.exec(id);
    if (!row && m) {
      row = await env.DB.prepare(
        "SELECT id, slug, title, date, updated, cat, tags, cover, excerpt, content FROM posts WHERE id=? LIMIT 1"
      ).bind(Number(m[1])).first();
    }
  } catch (e) {
    return withHeaders(html, res);
  }
  if (!row || !row.title) {
    /* 没有这篇：把 404 页当正文返回，状态码仍给 404，别让搜索引擎当成软 404。 */
    try {
      const nf = await env.ASSETS.fetch(new URL("/404.html", url.origin).toString());
      if (nf && nf.status === 200) {
        const nh = new Headers(nf.headers);
        nh.delete("content-length");
        nh.delete("content-encoding");
        nh.delete("etag");
        nh.set("content-type", "text/html; charset=utf-8");
        return new Response(await nf.text(), { status: 404, headers: nh });
      }
    } catch (e) {}
    return withHeaders(html, res);
  }

  let site = {};
  try {
    const s = await env.DB.prepare("SELECT v FROM settings WHERE k='site'").first();
    if (s) site = JSON.parse(s.v) || {};
  } catch (e) {}
  const name = site.name || "RezeのBlog";
  const title = row.title;
  const desc = plain(row.excerpt || row.content).slice(0, 150) || (title + " · " + name);
  const pageUrl = ORIGIN + "/p/" + encodeURIComponent(id);
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

  /* 正文直出，前端拿到云端数据后原地重绘，中间这段先顶着。 */
  const bodyRaw = String(row.content || "");
  let ssrDone = false;
  if (bodyRaw) {
    const words = plain(bodyRaw).length;
    const body = bodyRaw.replace(/<img\s/gi, function () { return '<img loading="lazy" decoding="async" '; });
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
