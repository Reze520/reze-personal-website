/* ============================================================
   reze520.top · 内容读取（Cloudflare Pages Functions 后端）
   ------------------------------------------------------------
   loadCloudContent() 前台读取站点内容：GET /site-data/content
   云端有内容则返回 { site, posts }；云端为空或后端不可达时返回 null，
   由 main.js 回退到 data.js 默认内容。
   ============================================================ */
window.loadCloudContent = async function () {
  try {
    var r = await fetch("/site-data/content", { cache: "no-store" });
    if (!r.ok) return null;
    var d = await r.json();
    if (d && d.site && typeof d.site === "object" && Object.keys(d.site).length) {
      var site = window.mergeSiteDefaults
        ? window.mergeSiteDefaults(window.SITE || {}, d.site)
        : d.site;
      return { site: site, posts: Array.isArray(d.posts) ? d.posts : [] };
    }
    return null;
  } catch (e) {
    return null;
  }
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
