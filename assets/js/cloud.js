/* ============================================================
   RezeのBlog · 内容读取（Cloudflare Pages Functions 后端）
   ------------------------------------------------------------
   loadCloudContent({light:true})  首屏/列表：只取元数据，几十 KB
   loadCloudContent()              全量正文：后台与全文搜索索引用
   loadCloudPost(id)               单篇正文：文章页按需取
   请求走浏览器 HTTP 缓存（后端 ETag + max-age），不再每次回源搬一百万字。
   ============================================================ */
window.loadCloudContent = async function (opts) {
  var light = !!(opts && opts.light);
  try {
    var r = await fetch("/site-data/content" + (light ? "?light=1" : ""), { cache: "default" });
    if (!r.ok) return null;
    var d = await r.json();
    if (d && d.site && typeof d.site === "object" && Object.keys(d.site).length) {
      var site = window.mergeSiteDefaults
        ? window.mergeSiteDefaults(window.SITE || {}, d.site)
        : d.site;
      return {
        site: site,
        posts: Array.isArray(d.posts) ? d.posts : [],
        events: Array.isArray(d.events) ? d.events : [],
        light: light
      };
    }
    return null;
  } catch (e) {
    return null;
  }
};

/* 文章页只取这一篇的正文。云端不可用时退回仓库里的 data.override.js。 */
window.loadCloudPost = async function (id) {
  if (!id) return null;
  try {
    var r = await fetch("/site-data/post?id=" + encodeURIComponent(id), { cache: "default" });
    if (r.ok) {
      var d = await r.json();
      if (d && d.post && typeof d.post.content === "string" && d.post.content) return d.post;
    }
  } catch (e) {}
  return window.loadFallbackPost ? window.loadFallbackPost(id) : null;
};

/* 兜底文件是赋值语句，直接注入页面会换掉 window.POSTS 的引用（main.js 里
   留着旧数组的闭包会失联），所以放到隔离的 window 对象里执行，只取需要的那篇。 */
var _fallbackPosts = null;
window.loadFallbackPost = async function (id) {
  try {
    if (!_fallbackPosts) {
      var r = await fetch("assets/js/data.override.js");
      if (!r.ok) return null;
      var txt = await r.text();
      var sandbox = { window: {} };
      new Function("window", txt)(sandbox.window);
      _fallbackPosts = (sandbox.window && sandbox.window.POSTS) || [];
    }
    for (var i = 0; i < _fallbackPosts.length; i++) {
      if (_fallbackPosts[i] && _fallbackPosts[i].id === id) return _fallbackPosts[i];
    }
  } catch (e) {}
  return null;
};

/* 空值补全：云端数据里缺失/为空的字段用 data.js 默认值补上（用户的动态等内容优先保留）。
   防止早期后台把设置存成空值导致前台显示空白。 */
window.mergeSiteDefaults = function (def, cur) {
  function clone (o) { return JSON.parse(JSON.stringify(o || {})); }
  function isEmpty (v) {
    return v === null || v === undefined || v === "" ||
      (Array.isArray(v) && v.length === 0);
  }
  function walk (d, c) {
    var out = clone(d);
    for (var k in c) {
      var v = c[k];
      if (k === "moments") { if (Array.isArray(v) && v.length) out[k] = v; continue; }
      if (v === null || v === undefined || v === "") continue; // 空值用默认
      if (Array.isArray(v) && v.length === 0) continue;        // 空数组用默认
      if (typeof v === "object" && !Array.isArray(v)) {
        out[k] = walk(typeof d === "object" && d ? d[k] || {} : {}, v);
        continue;
      }
      out[k] = v;
    }
    return out;
  }
  try {
    if (!def || !Object.keys(def).length) return clone(cur);
    return walk(def, cur || {});
  } catch (e) {
    return cur;
  }
};
