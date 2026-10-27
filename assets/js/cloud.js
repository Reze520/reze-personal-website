/* ============================================================
   reze520.top · 内容读取（Cloudflare Pages Functions 后端）
   ------------------------------------------------------------
   loadCloudContent() 前台读取站点内容：GET /api/content
   云端有内容则返回 { site, posts }；云端为空或后端不可达时返回 null，
   由 main.js 回退到 data.js 默认内容。
   ============================================================ */
window.loadCloudContent = async function () {
  try {
    var r = await fetch("/api/content", { cache: "no-store" });
    if (!r.ok) return null;
    var d = await r.json();
    if (d && d.site && typeof d.site === "object" && Object.keys(d.site).length) {
      return { site: d.site, posts: Array.isArray(d.posts) ? d.posts : [] };
    }
    return null;
  } catch (e) {
    return null;
  }
};
