/* ============================================================
   RezeのBlog · 天气
   ------------------------------------------------------------
   数据来自 Open-Meteo：公开接口、不用密钥、支持一次查多个坐标。
   城市列表自己维护，存在 localStorage，最多 8 个，可搜索添加。
   切换城市只换主视图，顶部一排小卡是所有城市的当前天气。
   ============================================================ */
(function () {
  "use strict";

  var GEO = "https://geocoding-api.open-meteo.com/v1/search";
  var FC = "https://api.open-meteo.com/v1/forecast";
  var CITY_KEY = "reze-weather-cities";
  var ACTIVE_KEY = "reze-weather-active";
  var CACHE_MS = 8 * 60 * 1000; // 天气不用实时到秒，8 分钟内重复进页直接用缓存
  var MAX_CITIES = 8;

  var DEFAULT_CITIES = [
    { id: "beijing", name: "北京", admin: "北京", lat: 39.9075, lon: 116.3972 },
    { id: "shanghai", name: "上海", admin: "上海", lat: 31.2304, lon: 121.4737 },
    { id: "hangzhou", name: "杭州", admin: "浙江", lat: 30.2741, lon: 120.1551 }
  ];

  /* ---------- 小工具 ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function store(key, val) {
    try {
      if (val === undefined) return window.localStorage.getItem(key);
      if (val === null) return window.localStorage.removeItem(key);
      window.localStorage.setItem(key, val);
    } catch (e) {}
    return null;
  }
  function hhmm(d) {
    return ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
  }
  function isoTime(iso) {
    return String(iso || "").slice(11, 16);
  }
  function round(n) {
    return Math.round(Number(n) || 0);
  }

  /* ---------- 天气图标 ---------- */
  var S = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" ' +
          'stroke-linecap="round" stroke-linejoin="round"';
  var ICON = {
    sun:
      "<svg " + S + '><circle cx="12" cy="12" r="4.1"/><path d="M12 2.6v2.3M12 19.1v2.3' +
      'M2.6 12h2.3M19.1 12h2.3M5.2 5.2l1.7 1.7M17.1 17.1l1.7 1.7M18.8 5.2l-1.7 1.7' +
      'M6.9 17.1l-1.7 1.7"/></svg>',
    moon:
      "<svg " + S + '><path d="M20.5 14.8A8.7 8.7 0 0 1 9.2 3.5a8.7 8.7 0 1 0 11.3 11.3Z"/></svg>',
    cloud:
      "<svg " + S + '><path d="M17.6 19.2a4.3 4.3 0 0 0 .3-8.6 6 6 0 0 0-11.3-.8 3.95 3.95 0 0 0 .9 7.7Z"/></svg>',
    cloudSun:
      "<svg " + S + '><circle cx="8.4" cy="7.6" r="2.6"/><path d="M8.4 2.7v1.4M8.4 11.1v1.4' +
      'M3.5 7.6H4.9M11.9 7.6h1.4M5 4.2l1 1M10.8 10l1 1M11.8 4.2l-1 1"/>' +
      '<path d="M17.4 20a4 4 0 0 0 .3-8 5.6 5.6 0 0 0-10.5-.7 3.7 3.7 0 0 0 .8 7.2Z"/></svg>',
    cloudMoon:
      "<svg " + S + '><path d="M12.4 8.6A4.6 4.6 0 0 1 6.5 2.7a4.6 4.6 0 1 0 5.9 5.9Z"/>' +
      '<path d="M17.4 20a4 4 0 0 0 .3-8 5.6 5.6 0 0 0-10.5-.7 3.7 3.7 0 0 0 .8 7.2Z"/></svg>',
    drizzle:
      "<svg " + S + '><path d="M17.6 16.2a4.3 4.3 0 0 0 .3-8.6 6 6 0 0 0-11.3-.8 3.95 3.95 0 0 0 .9 7.7Z"/>' +
      '<path d="M9 19v1.4M13 19v1.4M17 19v1.4"/></svg>',
    rain:
      "<svg " + S + '><path d="M17.6 15.8a4.3 4.3 0 0 0 .3-8.6 6 6 0 0 0-11.3-.8 3.95 3.95 0 0 0 .9 7.7Z"/>' +
      '<path d="M8.4 18.2 7.5 21M12.4 18.2 11.5 21M16.4 18.2 15.5 21"/></svg>',
    rainHeavy:
      "<svg " + S + '><path d="M17.6 15.4a4.3 4.3 0 0 0 .3-8.6 6 6 0 0 0-11.3-.8 3.95 3.95 0 0 0 .9 7.7Z"/>' +
      '<path d="M7.6 17.6 6.4 21.2M11.4 17.6 10.2 21.2M15.2 17.6 14 21.2M18.6 17.8 17.8 20.4"/></svg>',
    snow:
      "<svg " + S + '><path d="M17.6 15.6a4.3 4.3 0 0 0 .3-8.6 6 6 0 0 0-11.3-.8 3.95 3.95 0 0 0 .9 7.7Z"/>' +
      '<path d="M8.4 18.4v2M7.5 19.4h1.8M13.4 18.4v2M12.5 19.4h1.8"/></svg>',
    snowHeavy:
      "<svg " + S + '><path d="M17.6 15.6a4.3 4.3 0 0 0 .3-8.6 6 6 0 0 0-11.3-.8 3.95 3.95 0 0 0 .9 7.7Z"/>' +
      '<path d="M7.4 18v2.2M6.4 19.1h2M11.4 18v2.2M10.4 19.1h2M15.4 18v2.2M14.4 19.1h2"/></svg>',
    thunder:
      "<svg " + S + '><path d="M17.6 14.9a4.3 4.3 0 0 0 .3-8.6 6 6 0 0 0-11.3-.8 3.95 3.95 0 0 0 .9 7.7Z"/>' +
      '<path d="M13 16.4h-2.2l-1 3.1h2l-.8 2.6 3.5-3.9h-2.1z"/></svg>',
    fog:
      "<svg " + S + '><path d="M17.6 13.4a4.3 4.3 0 0 0 .3-8.6 6 6 0 0 0-11.3-.8 3.95 3.95 0 0 0 .9 7.7Z"/>' +
      '<path d="M5 17h14M7 20.4h10"/></svg>'
  };

  /* WMO 天气代码 → 中文描述 + 图标 */
  var WMO = {
    0: ["晴", "sun"],
    1: ["晴间多云", "sun"],
    2: ["多云", "cloud"],
    3: ["阴", "cloud"],
    45: ["有雾", "fog"],
    48: ["冻雾", "fog"],
    51: ["小毛毛雨", "drizzle"],
    53: ["毛毛雨", "drizzle"],
    55: ["大毛毛雨", "drizzle"],
    56: ["冻毛毛雨", "drizzle"],
    57: ["冻毛毛雨", "drizzle"],
    61: ["小雨", "rain"],
    63: ["中雨", "rain"],
    65: ["大雨", "rainHeavy"],
    66: ["冻雨", "rain"],
    67: ["冻雨", "rainHeavy"],
    71: ["小雪", "snow"],
    73: ["中雪", "snow"],
    75: ["大雪", "snowHeavy"],
    77: ["雪粒", "snow"],
    80: ["阵雨", "rain"],
    81: ["强阵雨", "rainHeavy"],
    82: ["暴雨", "rainHeavy"],
    85: ["阵雪", "snow"],
    86: ["强阵雪", "snowHeavy"],
    95: ["雷阵雨", "thunder"],
    96: ["雷阵雨伴冰雹", "thunder"],
    99: ["强雷雨伴冰雹", "thunder"]
  };

  var KIND_CLASS = {
    sun: "wx-c-sun",
    moon: "wx-c-moon",
    cloud: "wx-c-cloud",
    cloudSun: "wx-c-sun",
    cloudMoon: "wx-c-moon",
    drizzle: "wx-c-rain",
    rain: "wx-c-rain",
    rainHeavy: "wx-c-rain",
    snow: "wx-c-snow",
    snowHeavy: "wx-c-snow",
    thunder: "wx-c-thunder",
    fog: "wx-c-cloud"
  };

  // 白天夜里用不同图标，别在大晴天显示月亮
  function iconFor(code, isDay) {
    var hit = WMO[code];
    if (!hit) return ICON.cloud;
    var kind = hit[1];
    if (kind === "sun") return isDay === 0 ? ICON.moon : ICON.sun;
    if (kind === "cloud") return isDay === 0 ? ICON.cloudMoon : ICON.cloudSun;
    if (kind === "cloudSun") return isDay === 0 ? ICON.cloudMoon : ICON.cloudSun;
    return ICON[kind] || ICON.cloud;
  }
  function kindClass(code, isDay) {
    var hit = WMO[code];
    if (!hit) return "wx-c-cloud";
    var kind = hit[1];
    if (kind === "sun" || kind === "cloudSun") return isDay === 0 ? "wx-c-moon" : "wx-c-sun";
    return KIND_CLASS[kind] || "wx-c-cloud";
  }
  function descOf(code) {
    return (WMO[code] && WMO[code][0]) || "未知";
  }

  /* ---------- 城市列表 ---------- */
  function readCities() {
    var raw = store(CITY_KEY);
    if (raw) {
      try {
        var arr = JSON.parse(raw);
        if (Array.isArray(arr) && arr.length) return arr.slice(0, MAX_CITIES);
      } catch (e) {}
    }
    return DEFAULT_CITIES.slice();
  }
  function writeCities(arr) {
    store(CITY_KEY, JSON.stringify(arr.slice(0, MAX_CITIES)));
  }
  function cityKey(lat, lon) {
    return "g_" + Math.round(lat * 100) + "_" + Math.round(lon * 100);
  }
  function activeId(cities) {
    var id = store(ACTIVE_KEY);
    for (var i = 0; i < cities.length; i++) if (cities[i].id === id) return id;
    return cities[0] ? cities[0].id : "";
  }
  function cityById(id) {
    var arr = state.cities;
    for (var i = 0; i < arr.length; i++) if (arr[i].id === id) return arr[i];
    return arr[0] || null;
  }
  // 香港 / 澳门 / 台湾按中国的地方来标
  function regionOf(r) {
    var cc = r.country_code || "";
    if (cc === "HK") return "中国香港";
    if (cc === "MO") return "中国澳门";
    if (cc === "TW") return "中国台湾";
    if (cc === "CN") return r.admin1 ? String(r.admin1) : "中国";
    return r.country ? String(r.country) : "";
  }
  function displayName(r) {
    var cc = r.country_code || "";
    if (cc === "HK" || cc === "MO" || cc === "TW") return regionOf(r);
    return r.name || "";
  }

  /* ---------- 数据 ---------- */
  var state = {
    cities: readCities(),
    active: "",
    data: null, // 与 cities 顺序一致的数组
    loading: false,
    error: "",
    updated: 0,
    query: "",
    results: [],
    searching: false,
    addOpen: false
  };
  state.active = activeId(state.cities);

  var cache = { key: "", time: 0, data: null };
  var listeners = [];

  function citiesHash(arr) {
    return arr
      .map(function (c) {
        return c.id + ":" + c.lat.toFixed(2) + "," + c.lon.toFixed(2);
      })
      .join("|");
  }

  function fetchWeather(cities, force) {
    if (!cities.length) return Promise.resolve([]);
    var key = citiesHash(cities);
    if (!force && cache.key === key && cache.data && Date.now() - cache.time < CACHE_MS) {
      return Promise.resolve(cache.data);
    }
    var lat = cities.map(function (c) { return c.lat; }).join(",");
    var lon = cities.map(function (c) { return c.lon; }).join(",");
    var url =
      FC +
      "?latitude=" + lat +
      "&longitude=" + lon +
      "&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation," +
      "weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,is_day" +
      "&hourly=temperature_2m,weather_code,precipitation_probability" +
      "&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset," +
      "uv_index_max,precipitation_probability_max" +
      "&timezone=auto&forecast_days=7";

    return fetch(url)
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(function (d) {
        // 单个坐标返回对象，多个坐标返回数组，这里统一成数组
        var list = Array.isArray(d) ? d : [d];
        cache = { key: key, time: Date.now(), data: list };
        return list;
      });
  }

  function load(force) {
    if (state.loading) return Promise.resolve();
    state.loading = true;
    state.error = "";
    notify("loading");
    return fetchWeather(state.cities, force)
      .then(function (list) {
        state.data = list;
        state.updated = Date.now();
      })
      .catch(function (e) {
        state.error = e && e.message ? e.message : "网络请求失败";
      })
      .then(function () {
        state.loading = false;
        notify("ready");
      });
  }

  function notify(why) {
    listeners.forEach(function (fn) {
      try { fn(why); } catch (e) {}
    });
  }

  function dataOf(city) {
    if (!state.data || !city) return null;
    for (var i = 0; i < state.cities.length; i++) {
      if (state.cities[i].id === city.id) return state.data[i] || null;
    }
    return null;
  }

  /* ---------- 渲染：城市条 ---------- */
  function barHtml() {
    var chips = state.cities
      .map(function (c) {
        return (
          '<button class="wx-chip' + (c.id === state.active ? " on" : "") +
          '" data-city="' + esc(c.id) + '">' + esc(c.name) + "</button>"
        );
      })
      .join("");
    return (
      '<div class="wx-bar" id="wx-bar">' +
      '<div class="wx-chips">' + chips + "</div>" +
      '<div class="wx-acts">' +
      '<span class="wx-stamp" id="wx-stamp"></span>' +
      '<button class="wx-ico-btn" id="wx-refresh" type="button" data-tip="刷新">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
      'stroke-linecap="round" stroke-linejoin="round"><path d="M20 11a8 8 0 1 0-.9 5"/>' +
      '<path d="M20 4.5V11h-6.2"/></svg></button>' +
      '<button class="wx-ico-btn" id="wx-add-btn" type="button" data-tip="添加城市">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
      'stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg></button>' +
      "</div></div>"
    );
  }

  /* ---------- 渲染：多城市小卡 ---------- */
  function miniRowHtml() {
    if (state.cities.length < 2) return "";
    var cards = state.cities
      .map(function (c) {
        var d = dataOf(c);
        var cur = d && d.current;
        var day = d && d.daily;
        var t = cur ? round(cur.temperature_2m) + "°" : "—";
        var hi = day && day.temperature_2m_max ? round(day.temperature_2m_max[0]) + "°" : "";
        var lo = day && day.temperature_2m_min ? round(day.temperature_2m_min[0]) + "°" : "";
        var ico = cur ? iconFor(cur.weather_code, cur.is_day) : ICON.cloud;
        var cls = cur ? kindClass(cur.weather_code, cur.is_day) : "wx-c-cloud";
        return (
          '<button class="wx-mini' + (c.id === state.active ? " on" : "") +
          '" data-city="' + esc(c.id) + '">' +
          '<span class="n">' + esc(c.name) + "</span>" +
          '<span class="i ' + cls + '">' + ico + "</span>" +
          '<span class="t">' + t + "</span>" +
          '<span class="r">' + lo + " / " + hi + "</span>" +
          "</button>"
        );
      })
      .join("");
    return '<div class="wx-minirow" id="wx-minirow">' + cards + "</div>";
  }

  /* ---------- 渲染：当前天气 ---------- */
  function heroHtml() {
    var city = cityById(state.active);
    if (!city) return "<!-- no city -->";
    var d = dataOf(city);
    if (state.error) {
      return (
        '<div class="wx-hero g-card"><div class="wx-fail">' +
        "<b>没取到天气数据</b><p>" + esc(state.error) +
        "——可能是网络被拦了，也可能是一次查的城市太多。</p>" +
        '<button class="wx-retry" id="wx-retry" type="button">再试一次</button></div></div>'
      );
    }
    if (!d || !d.current) {
      return (
        '<div class="wx-hero g-card"><div class="wx-fail"><b>正在获取天气…</b>' +
        "<p>第一次进来要等一两秒。</p></div></div>"
      );
    }
    var cur = d.current;
    var day = d.daily;
    var today = {
      code: day.weather_code[0],
      max: round(day.temperature_2m_max[0]),
      min: round(day.temperature_2m_min[0]),
      rain: day.precipitation_probability_max[0],
      uv: day.uv_index_max[0],
      sunrise: isoTime(day.sunrise[0]),
      sunset: isoTime(day.sunset[0])
    };
    var metrics = [
      ["体感", round(cur.apparent_temperature) + "°"],
      ["湿度", round(cur.relative_humidity_2m) + "%"],
      ["风", windText(cur.wind_speed_10m, cur.wind_direction_10m)],
      ["降水", (Number(cur.precipitation) || 0).toFixed(1) + " mm"],
      ["紫外线", today.uv == null ? "—" : String(round(today.uv))],
      ["气压", round(cur.surface_pressure) + " hPa"],
      ["日出", today.sunrise || "—"],
      ["日落", today.sunset || "—"]
    ]
      .map(function (m) {
        return '<div class="wx-m"><span class="k">' + m[0] + '</span><span class="v">' +
          esc(m[1]) + "</span></div>";
      })
      .join("");

    return (
      '<div class="wx-hero g-card">' +
      '<div class="wx-hero-l">' +
      '<div class="wx-loc">' + esc(city.name) +
      (city.admin ? '<em>' + esc(city.admin) + "</em>" : "") +
      '<span class="wx-live">' + (state.loading ? "更新中" : "已更新 " + hhmm(new Date(state.updated))) +
      "</span></div>" +
      '<div class="wx-big">' +
      '<span class="wx-bigico ' + kindClass(cur.weather_code, cur.is_day) + '">' +
      iconFor(cur.weather_code, cur.is_day) + "</span>" +
      "<b>" + round(cur.temperature_2m) + "</b><i>°C</i></div>" +
      '<div class="wx-desc">' + esc(descOf(cur.weather_code)) +
      " · 今天 " + today.min + "° 到 " + today.max + "°" +
      (today.rain != null ? " · 降水概率 " + round(today.rain) + "%" : "") +
      "</div>" +
      "</div>" +
      '<div class="wx-metrics">' + metrics + "</div>" +
      "</div>"
    );
  }

  function windText(speed, deg) {
    var dirs = ["北", "东北偏北", "东北", "东北偏东", "东", "东南偏东", "东南", "东南偏南",
                "南", "西南偏南", "西南", "西南偏西", "西", "西北偏西", "西北", "西北偏北"];
    var d = dirs[Math.round(((Number(deg) || 0) % 360) / 22.5) % 16];
    return d + "风 " + (Number(speed) || 0).toFixed(0) + " km/h";
  }

  /* ---------- 渲染：逐小时 ---------- */
  function hourHtml() {
    var city = cityById(state.active);
    var d = dataOf(city);
    if (!d || !d.hourly) return "";
    var h = d.hourly;
    var start = hourStartIndex(h.time, (d.current && d.current.time) || "");
    var cells = [];
    for (var i = start; i < Math.min(start + 24, h.time.length); i++) {
      var code = h.weather_code[i];
      var isDay = dayHour(h.time[i], d.daily);
      cells.push(
        '<div class="wx-hh' + (i === start ? " now" : "") + '">' +
        "<span class=\"h\">" + (i === start ? "现在" : isoTime(h.time[i])) + "</span>" +
        '<span class="i ' + kindClass(code, isDay) + '">' + iconFor(code, isDay) + "</span>" +
        '<span class="t">' + round(h.temperature_2m[i]) + "°</span>" +
        '<span class="p">' + round(h.precipitation_probability[i]) + "%</span>" +
        "</div>"
      );
    }
    return (
      '<div class="wx-hour g-card">' +
      '<div class="g-card-head"><span class="t">' + ICONS_CLOCK + "未来 24 小时</span>" +
      '<span class="more">温度 / 降水概率</span></div>' +
      '<div class="wx-hstrip">' + cells.join("") + "</div></div>"
    );
  }

  // 逐小时数据是按当地时区排的，用 current.time 定位「现在」那一格
  function hourStartIndex(times, nowIso) {
    var key = String(nowIso).slice(0, 13);
    for (var i = 0; i < times.length; i++) {
      if (times[i].slice(0, 13) >= key) return i;
    }
    return 0;
  }
  // 这一天每小时算白天还是黑夜，只用来看图标
  function dayHour(iso, daily) {
    if (!daily || !daily.sunrise) return 1;
    var dayIdx = daily.time.indexOf(iso.slice(0, 10));
    if (dayIdx < 0) return 1;
    var t = iso.slice(11, 16);
    return t >= isoTime(daily.sunrise[dayIdx]) && t < isoTime(daily.sunset[dayIdx]) ? 1 : 0;
  }

  /* ---------- 渲染：7 天 ---------- */
  function weekHtml() {
    var city = cityById(state.active);
    var d = dataOf(city);
    if (!d || !d.daily) return "";
    var day = d.daily;
    var lo = Infinity;
    var hi = -Infinity;
    day.temperature_2m_min.forEach(function (v) { if (v < lo) lo = v; });
    day.temperature_2m_max.forEach(function (v) { if (v > hi) hi = v; });
    var span = hi - lo || 1;

    var rows = day.time
      .map(function (iso, i) {
        var code = day.weather_code[i];
        var mn = round(day.temperature_2m_min[i]);
        var mx = round(day.temperature_2m_max[i]);
        var left = ((day.temperature_2m_min[i] - lo) / span) * 100;
        var width = Math.max(4, ((day.temperature_2m_max[i] - day.temperature_2m_min[i]) / span) * 100);
        var p = day.precipitation_probability_max[i];
        return (
          '<div class="wx-day' + (i === 0 ? " today" : "") + '">' +
          '<span class="d">' + weekday(iso, i) + "</span>" +
          '<span class="i ' + kindClass(code, 1) + '">' + iconFor(code, 1) + "</span>" +
          '<span class="n">' + esc(descOf(code)) + "</span>" +
          '<span class="p">' + (p == null || round(p) === 0 ? "" : round(p) + "%") + "</span>" +
          '<span class="lo">' + mn + "°</span>" +
          '<span class="bar"><i style="left:' + left.toFixed(1) + "%;width:" +
          Math.min(100 - left, width).toFixed(1) + '%"></i></span>' +
          '<span class="hi">' + mx + "°</span>" +
          "</div>"
        );
      })
      .join("");

    return (
      '<div class="wx-week g-card">' +
      '<div class="g-card-head"><span class="t">' + ICONS_CAL + "未来 7 天</span>" +
      '<span class="more">' + esc(city.name) + "</span></div>" +
      '<div class="wx-days">' + rows + "</div></div>"
    );
  }

  function weekday(iso, idx) {
    if (idx === 0) return "今天";
    if (idx === 1) return "明天";
    var d = new Date(iso + "T00:00:00");
    if (isNaN(d.getTime())) return iso.slice(5).replace("-", "/");
    return "周" + "日一二三四五六".charAt(d.getDay());
  }

  /* ---------- 渲染：添加城市 ---------- */
  // 单独算「搜索结果」这一块，供整页渲染和局部更新共用。
  // 拆出来是为了搜索时只替换 <ul>，不重建输入框 —— 重建输入框会打断
  // 输入法的拼音组合态，导致拼音永远转不成汉字。
  function resultsHtml() {
    if (!state.results.length) {
      return '<li class="wx-tip">' +
        (state.searching ? "正在搜索…" : "输入地名搜一下，比如「成都」「昆明」「中国香港」") +
        "</li>";
    }
    return state.results
      .map(function (r) {
        var nm = displayName(r);
        var rg = regionOf(r);
        var dup = state.cities.some(function (c) {
          return Math.abs(c.lat - r.latitude) < 0.05 && Math.abs(c.lon - r.longitude) < 0.05;
        });
        return (
          '<li><span class="n">' + esc(nm) +
          (rg && rg !== nm ? '<em>' + esc(rg) + "</em>" : "") +
          "</span>" +
          '<button class="wx-addone" data-add="' + esc(r.latitude) + "," +
          esc(r.longitude) + '" data-name="' + esc(nm) + '" data-region="' + esc(rg) +
          '" type="button"' + (dup ? " disabled" : "") + ">" +
          (dup ? "已添加" : "添加") + "</button></li>"
        );
      })
      .join("");
  }

  // 搜索专用：只重画结果列表，输入框原封不动
  function paintResults() {
    var ul = document.querySelector("#wx-addpanel .wx-resultlist");
    if (ul) ul.innerHTML = resultsHtml();
  }

  function addPanelHtml() {
    var current = state.cities
      .map(function (c) {
        return (
          '<li><span class="n">' + esc(c.name) +
          (c.admin ? '<em>' + esc(c.admin) + "</em>" : "") + "</span>" +
          '<button class="wx-del" data-del="' + esc(c.id) + '" type="button" ' +
          (state.cities.length <= 1 ? "disabled " : "") + 'aria-label="移除">移除</button></li>'
        );
      })
      .join("");

    return (
      '<div class="wx-addpanel g-card' + (state.addOpen ? " open" : "") + '" id="wx-addpanel">' +
      '<div class="g-card-head"><span class="t">' + ICONS_PIN + "我的城市</span>" +
      '<span class="more">最多 ' + MAX_CITIES + " 个</span></div>" +
      '<div class="wx-addbody">' +
      '<div class="wx-search">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
      'stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/>' +
      '<path d="m20 20-3.4-3.4"/></svg>' +
      '<input type="text" id="wx-q" placeholder="搜索城市或地区" autocomplete="off" ' +
      'value="' + esc(state.query) + '">' +
      "</div>" +
      '<ul class="wx-citylist">' + current + "</ul>" +
      '<div class="wx-sub">搜索结果</div>' +
      '<ul class="wx-resultlist">' + resultsHtml() + "</ul>" +
      "</div></div>"
    );
  }

  /* ---------- 组装整页 ---------- */
  // 只出「容器里面那层」。repaintAll 要往 #wx-wrap.innerHTML 里塞，
  // 所以它绝不能带上 #wx-wrap 本身 —— 否则重画一次就多套一层同名容器，
  // #wx-wrap 出现重复 id，.wx-wrap 的 margin-top / gap 也会双倍生效。
  function innerHtml() {
    return (
      barHtml() +
      miniRowHtml() +
      heroHtml() +
      hourHtml() +
      weekHtml() +
      addPanelHtml()
    );
  }

  function mainHtml() {
    return '<div class="wx-wrap" id="wx-wrap">' + innerHtml() + "</div>";
  }

  // 重画整块。搜索框正在输入时保留光标和内容，别让人物打字打一半被吃掉
  function repaintAll() {
    var wrap = $("#wx-wrap");
    if (!wrap) return;
    var inp = $("#wx-q");
    var typing = inp && document.activeElement === inp;
    var caret = typing ? inp.selectionStart : 0;

    // 正在用输入法打字（拼音组合态）时绝不整块重画：
    // 一旦重建输入框，组合态就被打断，拼音会原样留成英文字母。
    if (typing && composing) return;

    var panelOpen = state.addOpen;
    var q = state.query;
    wrap.innerHTML = innerHtml();

    if (panelOpen) {
      var p = $("#wx-addpanel");
      if (p) p.classList.add("open");
      var box = $("#wx-q");
      if (box) {
        box.value = q || "";
        if (typing) {
          box.focus();
          try { box.setSelectionRange(caret, caret); } catch (e) {}
        }
      }
    }
    var stamp = $("#wx-stamp");
    if (stamp) {
      stamp.textContent = state.loading
        ? "更新中…"
        : state.updated
        ? hhmm(new Date(state.updated)) + " 更新"
        : "";
    }
  }

  /* ---------- 事件 ---------- */
  function setActive(id) {
    if (!cityById(id)) return;
    state.active = id;
    store(ACTIVE_KEY, id);
    repaintAll();
    // 右栏小卡也跟着换，不然点完只剩主视图变了
    paintMini();
  }

  function removeCity(id) {
    if (state.cities.length <= 1) return;
    state.cities = state.cities.filter(function (c) { return c.id !== id; });
    writeCities(state.cities);
    if (state.active === id) {
      state.active = state.cities[0].id;
      store(ACTIVE_KEY, state.active);
    }
    // 城市变了，缓存作废
    cache = { key: "", time: 0, data: null };
    state.data = null;
    repaintAll();
    load(true);
  }

  function addCity(lat, lon, name, region) {
    if (state.cities.length >= MAX_CITIES) {
      toast("最多只能放 " + MAX_CITIES + " 个城市");
      return;
    }
    var id = cityKey(lat, lon);
    for (var i = 0; i < state.cities.length; i++) {
      if (state.cities[i].id === id) {
        setActive(id);
        return;
      }
    }
    state.cities.push({
      id: id,
      name: name || "未命名",
      admin: region || "",
      lat: lat,
      lon: lon
    });
    writeCities(state.cities);
    state.active = id;
    store(ACTIVE_KEY, id);
    cache = { key: "", time: 0, data: null };
    state.data = null;
    state.query = "";
    state.results = [];
    repaintAll();
    load(true);
  }

  function toast(msg) {
    var old = $("#wx-toast");
    if (old) old.remove();
    var n = document.createElement("div");
    n.id = "wx-toast";
    n.className = "wx-toast";
    n.textContent = msg;
    document.body.appendChild(n);
    setTimeout(function () {
      if (n.parentNode) n.remove();
    }, 2200);
  }

  function search(q) {
    q = String(q || "").trim();
    if (!q) {
      state.results = [];
      state.searching = false;
      paintResults();
      return;
    }
    state.searching = true;
    state.results = [];
    paintResults();
    fetch(GEO + "?name=" + encodeURIComponent(q) + "&count=8&language=zh&format=json")
      .then(function (r) { return r.json(); })
      .then(function (d) { return (d && d.results) || []; })
      .catch(function () { return []; })
      .then(function (list) {
        // 只留有人口的城市，避免搜出同名小村庄
        state.results = list
          .filter(function (r) { return r.latitude != null && r.longitude != null; })
          .sort(function (a, b) { return (b.population || 0) - (a.population || 0); })
          .slice(0, 6);
        state.searching = false;
        paintResults();
      });
  }

  var searchTimer = null;
  var composing = false; // 输入法拼音组合中

  function bind(root) {
    if (!root || root.__wxBound) return;
    root.__wxBound = true;

    root.addEventListener("click", function (e) {
      var t = e.target.closest ? e.target : e.target.parentNode;
      var chip = e.target.closest("[data-city]");
      if (chip) {
        setActive(chip.getAttribute("data-city"));
        return;
      }
      var del = e.target.closest("[data-del]");
      if (del) {
        removeCity(del.getAttribute("data-del"));
        return;
      }
      var add = e.target.closest("[data-add]");
      if (add) {
        var ll = String(add.getAttribute("data-add")).split(",");
        addCity(
          Number(ll[0]),
          Number(ll[1]),
          add.getAttribute("data-name"),
          add.getAttribute("data-region")
        );
        return;
      }
      if (e.target.closest("#wx-refresh") || e.target.closest("#wx-retry")) {
        load(true);
        return;
      }
      if (e.target.closest("#wx-add-btn")) {
        state.addOpen = !state.addOpen;
        var p = $("#wx-addpanel");
        if (p) p.classList.toggle("open", state.addOpen);
        return;
      }
    });

    // 输入法拼音组合：开始时挂起搜索，结束后（已转成汉字）再搜。
    // 不这样做的话，防抖搜索会在组合中途触发重绘，把拼音打散成英文。
    root.addEventListener("compositionstart", function (e) {
      if (e.target && e.target.id === "wx-q") {
        composing = true;
        clearTimeout(searchTimer);
      }
    }, true);
    root.addEventListener("compositionend", function (e) {
      if (e.target && e.target.id === "wx-q") {
        composing = false;
        state.query = e.target.value;
        clearTimeout(searchTimer);
        searchTimer = setTimeout(function () { search(state.query); }, 60);
      }
    }, true);

    root.addEventListener("input", function (e) {
      if (!e.target || e.target.id !== "wx-q") return;
      // 组合态中的 input 事件带的是拼音，别拿它去搜
      if (e.isComposing || composing) return;
      state.query = e.target.value;
      clearTimeout(searchTimer);
      searchTimer = setTimeout(function () { search(state.query); }, 420);
    });

    root.addEventListener("keydown", function (e) {
      if (!e.target || e.target.id !== "wx-q") return;
      if (e.key === "Enter" && !e.isComposing && !composing) {
        clearTimeout(searchTimer);
        search(e.target.value);
      }
    });

    // 只留一个订阅，反复进页不会越挂越多
    if (window.__wxListener) {
      listeners = listeners.filter(function (f) { return f !== window.__wxListener; });
    }
    window.__wxListener = function (why) {
      if (why === "loading" || why === "ready") {
        if ($("#wx-wrap")) repaintAll();
        paintMini();
      }
    };
    listeners.push(window.__wxListener);

    load(false);
  }

  /* ---------- 右栏小卡 ---------- */
  function miniHtml() {
    var city = cityById(state.active);
    if (!city) return "";
    var d = dataOf(city);
    if (state.error) {
      return '<div class="wxm-fail">天气没取到，<a href="weather.html">去天气页看看</a></div>';
    }
    if (!d || !d.current) return '<div class="wxm-fail">正在获取…</div>';
    var cur = d.current;
    var day = d.daily;
    var tabs = state.cities
      .map(function (c) {
        return (
          '<button class="wxm-dot' + (c.id === state.active ? " on" : "") +
          '" data-city="' + esc(c.id) + '" title="' + esc(c.name) + '" ' +
          'aria-label="' + esc(c.name) + '">' + esc(c.name.charAt(0)) + "</button>"
        );
      })
      .join("");
    return (
      '<div class="wxm-main">' +
      '<span class="wxm-ico ' + kindClass(cur.weather_code, cur.is_day) + '">' +
      iconFor(cur.weather_code, cur.is_day) + "</span>" +
      '<div class="wxm-t"><b>' + round(cur.temperature_2m) + "°</b>" +
      "<i>" + esc(descOf(cur.weather_code)) + "</i></div>" +
      "</div>" +
      '<div class="wxm-sub">' + esc(city.name) + " · " +
      round(day.temperature_2m_min[0]) + "° / " + round(day.temperature_2m_max[0]) + "°" +
      (day.precipitation_probability_max[0] != null
        ? " · 降水 " + round(day.precipitation_probability_max[0]) + "%"
        : "") +
      "</div>" +
      (state.cities.length > 1 ? '<div class="wxm-dots">' + tabs + "</div>" : "")
    );
  }

  function paintMini() {
    var box = $("#wx-mini-body");
    if (box) box.innerHTML = miniHtml();
  }

  function mountMini(box) {
    if (!box) return;
    box.addEventListener("click", function (e) {
      var d = e.target.closest("[data-city]");
      if (d) setActive(d.getAttribute("data-city"));
    });
    paintMini();
    // 小卡单独订阅一份，主页面不在时也能跟着切
    // 右栏会被整块重画，用固定的引用去重，避免反复进页越挂越多
    if (window.__wxMiniFn) {
      listeners = listeners.filter(function (f) { return f !== window.__wxMiniFn; });
    }
    window.__wxMiniFn = function () { paintMini(); };
    listeners.push(window.__wxMiniFn);
    if (!state.data && !state.loading) load(false);
  }

  var ICONS_CLOCK =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
    'stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/>' +
    '<path d="M12 7.5V12l3 1.8"/></svg>';
  var ICONS_CAL =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
    'stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2.5"/>' +
    '<path d="M3 10h18M8 3v4M16 3v4"/></svg>';
  var ICONS_PIN =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
    'stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z"/>' +
    '<circle cx="12" cy="10" r="2.6"/></svg>';

  window.WX = {
    mainHtml: mainHtml,
    bind: bind,
    mountMini: mountMini,
    paintMini: paintMini,
    reload: function () { return load(true); }
  };
})();
