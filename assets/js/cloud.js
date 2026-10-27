/* ============================================================
   reze520.top · 云服务接入
   ------------------------------------------------------------
   初始化 WorkBuddy Cloud 客户端，并提供：
   - loadCloudContent()  前台读取站点内容（公开读）
   - 云读取优先级：云端 > 本地 localStorage > data.js 默认
   ============================================================ */
window.CLOUD_CONFIG = {
  endpoint: "https://reze-blog-63886.app.workbuddy.host",
  oauthRelayBaseUrl: "https://www.workbuddy.cn/v2/as/genie-baas/oauth",
  publishableKey: "wbpk_npFqpAxSMoBWYkqlo16ybG_zg4PR57JTimMea0AKF7nRqfuZy1ru7qW"
};

window.cloud = null;
if (window.WorkBuddyCloud && window.WorkBuddyCloud.createWorkBuddyCloud) {
  try {
    window.cloud = window.WorkBuddyCloud.createWorkBuddyCloud(window.CLOUD_CONFIG);
  } catch (e) {
    window.cloud = null;
  }
}

// 把 posts 表的一行转回前台 POSTS 结构
function mapPostRow (row) {
  var tags = [];
  try { tags = JSON.parse(row.tags || "[]"); } catch (e) { tags = []; }
  return {
    id: row.slug || ("post-" + row.id),
    title: row.title || "",
    date: row.date || "",
    updated: row.updated || "",
    cat: row.cat || "",
    tags: Array.isArray(tags) ? tags : [],
    cover: row.cover || "",
    pinned: !!row.pinned,
    excerpt: row.excerpt || "",
    content: row.content || ""
  };
}

// 前台读取：返回 { site, posts }；云里还没初始化时返回 null
window.loadCloudContent = async function () {
  if (!window.cloud) return null;
  try {
    var ss = await window.cloud.database
      .from("site_settings")
      .select("*")
      .order("id", { ascending: true })
      .limit(1);
    if (ss.error || !ss.data || !ss.data.length) return null;
    var row = ss.data[0];
    var site = {};
    try { site = JSON.parse(row.data || "{}"); } catch (e) { site = {}; }
    if (!site || typeof site !== "object" || !Object.keys(site).length) return null;

    var adminId = row.admin_id || "";
    var posts = [];
    if (adminId) {
      var pr = await window.cloud.database
        .from("posts")
        .select("*")
        .eq("owner_id", adminId)
        .order("created_at", { ascending: false });
      if (!pr.error && Array.isArray(pr.data)) posts = pr.data.map(mapPostRow);
    }
    return { site: site, posts: posts };
  } catch (e) {
    return null;
  }
};

// 站点根上的登录回调处理（WorkBuddy 账号登录）
// 返回: 'none' 无回调参数 / 'ok' 已登录 / 'error' 登录失败 / 'no-cloud' SDK 不可用
window.handleCloudCallback = async function () {
  if (!window.cloud) return "no-cloud";
  try {
    var url = new URL(location.href);
    if (!url.searchParams.has("code") && !url.searchParams.has("error")) return "none";
    var provider = url.searchParams.get("provider");
    if (provider !== "workbuddy") return "none";
    if (typeof window.cloud.auth.handleWorkBuddyCallback !== "function") return "error";
    var r = await window.cloud.auth.handleWorkBuddyCallback();
    if (r.error) return "error";
    for (var k of ["code", "state", "provider"]) url.searchParams.delete(k);
    history.replaceState(null, "", url.pathname + url.search + url.hash);
    return "ok";
  } catch (e) {
    return "error";
  }
};
