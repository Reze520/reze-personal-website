/* ============================================================
   /post?id=… → /p/…
   ------------------------------------------------------------
   文章页改成路径地址（/p/post-263）之后，旧地址不能断：搜索引擎
   收录的、别人收藏的、还留在别处的链接都是带问号的那一套。这里
   统一 301 到新地址，权重跟着走。

   其余请求原样放行。文章页的 meta 改写与正文直出已经搬到
   functions/p/[[slug]].js，middleware 只管这一条跳转。
   ============================================================ */

const ORIGIN = "https://reze520.pages.dev";

export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.pathname !== "/post" && url.pathname !== "/post.html") return context.next();

  const id = url.searchParams.get("id");
  if (!id) return context.next();

  return Response.redirect(ORIGIN + "/p/" + encodeURIComponent(id), 301);
}
