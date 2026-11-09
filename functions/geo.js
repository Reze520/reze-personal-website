/* ============================================================
   /geo · 访问者定位
   ------------------------------------------------------------
   用 Cloudflare 边缘的 request.cf（由访问者 IP 推出），返回经纬度与
   城市 / 省份，给前端按「自己所在位置」查天气用。

   关键点：
   - 不需要任何密钥，零额外网络请求（cf 字段随请求自带）。
   - 必须 no-store：这是按 IP 的位置，绝不能让 CDN 把 A 用户的位置
     缓存下来发给 B 用户。
   - request.cf 只在 Cloudflare 网络上填充；本地 wrangler 没有，会回
     ok:false，前端自动回退到默认城市列表。
   ============================================================ */

export function onRequest(context) {
  var cf = (context.request && context.request.cf) || {};
  var lat = cf.latitude != null ? Number(cf.latitude) : null;
  var lon = cf.longitude != null ? Number(cf.longitude) : null;

  var data = {
    ok: !!(lat != null && lon != null),
    city: cf.city || "",
    region: cf.region || "",
    country: cf.country || "",
    lat: lat,
    lon: lon,
    tz: cf.timezone || ""
  };

  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "private, no-store"
    }
  });
}
