/* ============================================================
   RezeのBlog · 前端逻辑
   ------------------------------------------------------------
   靠 data.js 里的 SITE / POSTS 渲染页面，无需后端。
   ============================================================ */
(function () {
  "use strict";

  /* 背景亮度先落地：style.css 里 --bg-bright 默认 1，
     用户调过的话这里第一时间覆盖，免得进页面先闪一下原亮度再变暗。
     旧版存的是 reze-lite（白幕不透明度），语义完全不同，直接作废。 */
  try {
    var _bb = localStorage.getItem("reze-bg-bright");
    if (_bb !== null) {
      var _bbn = Math.max(40, Math.min(160, Math.round(Number(_bb) || 100)));
      document.documentElement.style.setProperty("--bg-bright", (_bbn / 100).toFixed(2));
    }
  } catch (e) {}

  /* 卡片材质 / 浓度 / 颜色 / 背景弱化：同样先落地，避免进页面先闪一片纯白卡片。
     材质与颜色走 data-mat / data-tint（深浅两套值写在 CSS 里，切主题自动跟），
     浓度与背景弱化是连续量，走行内变量。 */
  try {
    var _root1 = document.documentElement;
    var _FILTERS = {
      solid: "none",
      translucent: "none",
      frost: "blur(14px) saturate(108%)",
    };
    var _mat = localStorage.getItem("reze-card-mat");
    if (_mat && Object.prototype.hasOwnProperty.call(_FILTERS, _mat)) {
      _root1.setAttribute("data-mat", _mat);
      _root1.style.setProperty("--card-filter", _FILTERS[_mat]);
    }
    var _tint = localStorage.getItem("reze-card-tint");
    if (_tint) _root1.setAttribute("data-tint", _tint);
    var _ca = localStorage.getItem("reze-card-alpha");
    if (_ca !== null) {
      // 70 是可读下限：再低卡片就等于没底，背景图的高光会直接压住正文
      var _can = Math.max(70, Math.min(100, Number(_ca) || 0));
      _root1.style.setProperty("--card-alpha", (_can / 100).toFixed(2));
      if (_can !== Number(_ca)) localStorage.setItem("reze-card-alpha", String(_can));
    }
    var _ve = localStorage.getItem("reze-veil");
    if (_ve !== null) {
      var _ven = Math.max(0, Math.min(100, Number(_ve) || 0));
      _root1.style.setProperty("--veil-alpha", (_ven / 100).toFixed(2));
    }
  } catch (e) {}

  var SITE = window.SITE || {};
  // 注意：POSTS 必须保持对 window.POSTS 数组的引用（不要 slice 复制），
  // 否则后台/云端的动态数据无法同步到这里的渲染。
  var POSTS = window.POSTS || [];

  // 批量导回仓库时给多篇旧文打上同一个 updated，前台会显示成「更新于」，
  // feed 也按它排序，把几年前的稿子顶到最前。同一天被五篇以上共用、且与
  // 发布日期不同的 updated 视为同步戳，读取时抹掉；正文与云端数据都不动。
  function stripBatchStamps(list) {
    if (!Array.isArray(list) || list.length < 5) return;
    var counts = {};
    list.forEach(function (p) {
      if (!p || !p.updated) return;
      var u = String(p.updated).slice(0, 10);
      var d = String(p.date || "").slice(0, 10);
      if (!u || u === d) return;
      counts[u] = (counts[u] || 0) + 1;
    });
    list.forEach(function (p) {
      if (!p || !p.updated) return;
      var u = String(p.updated).slice(0, 10);
      var d = String(p.date || "").slice(0, 10);
      if (u !== d && counts[u] >= 5) p.updated = "";
    });
  }

  stripBatchStamps(POSTS);

  // 原地更新 SITE/POSTS（保持引用不变，页面所有渲染自动看到新数据）
  // keepContent：云端给的是轻量元数据（不带正文）时，别把已经取回的单篇正文冲掉
  function applyDataOver(site, posts, keepContent) {
    try {
      if (site && typeof site === "object") {
        for (var k in window.SITE) { if (!(k in site)) delete window.SITE[k]; }
        for (var k2 in site) window.SITE[k2] = site[k2];
      }
      if (Array.isArray(posts)) {
        if (keepContent) {
          var oldBody = {};
          window.POSTS.forEach(function (p) {
            if (p && p.id && p.content) oldBody[p.id] = p.content;
          });
          posts.forEach(function (p) {
            if (p && !p.content && oldBody[p.id]) p.content = oldBody[p.id];
          });
        }
        stripBatchStamps(posts);
        window.POSTS.length = 0;
        posts.forEach(function (p) { window.POSTS.push(p); });
      }
    } catch (e) {}
  }

  /* ---------- 图标 ---------- */
  var ICONS = {
    github:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>',
    bili:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="3.5"/><path d="M7.5 3.2 10 6M16.5 3.2 14 6M9.2 12v2M14.8 12v2"/></svg>',
    douyin:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15.2 3v11.2a4.2 4.2 0 1 1-4.2-4.2"/><path d="M15.2 3.2c.5 2.5 2 4.1 4.5 4.4"/></svg>',
    lyrics:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="15" rx="3.5"/><path d="M7 9.5h10M7 13.5h10M7 17.5h5.5"/></svg>',
    note:
      '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M9 17.6a2.4 2.4 0 1 1-2.4-2.4c.5 0 1 .15 1.4.4V4.6l9.2-2v9.4a2.4 2.4 0 1 1-2.4-2.4c.5 0 1 .15 1.4.4V5.1L9 6.7z"/></svg>',
    volume:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6.5 9H3v6h3.5L11 19z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 6a9 9 0 0 1 0 12"/></svg>',
    volumeOff:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6.5 9H3v6h3.5L11 19z"/><path d="m16 9.5 5 5M21 9.5l-5 5"/></svg>',
    loop:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m17 2 4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>',
    shuffle:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.8-1.1 2-1.7 3.3-1.7H22"/><path d="m18 2 4 4-4 4"/><path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2"/><path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"/><path d="m18 14 4 4-4 4"/></svg>',
    code:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></svg>',
    video:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="14" height="12" rx="2.5"/><path d="m16 11 6-3.5v9L16 13"/></svg>',
    cloud:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97A6 6 0 0 0 6.2 9.2 3.9 3.9 0 0 0 6.9 19h10.6Z"/></svg>',
    image:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="m21 16-5-5-6.5 7"/></svg>',
    book:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 0 4 24.5"/><path d="M4 4.5v16"/></svg>',
    poem:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 6.5h14M5 12h10M5 17.5h13"/></svg>',
    play:
      '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M8 5.2v13.6a1 1 0 0 0 1.52.85l10.5-6.8a1 1 0 0 0 0-1.7L9.52 4.35A1 1 0 0 0 8 5.2Z"/></svg>',
    pause:
      '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="7" y="4.5" width="3.6" height="15" rx="1.2"/><rect x="13.4" y="4.5" width="3.6" height="15" rx="1.2"/></svg>',
    skipBack:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 5v14L8 12l10-7Z" fill="currentColor" stroke="none"/><path d="M5 5v14"/></svg>',
    skipFwd:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 5v14l10-7L6 5Z" fill="currentColor" stroke="none"/><path d="M19 5v14"/></svg>',
    close:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 5l14 14M19 5L5 19"/></svg>',
    grip:
      '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><circle cx="9" cy="7" r="1.5"/><circle cx="15" cy="7" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="17" r="1.5"/><circle cx="15" cy="17" r="1.5"/></svg>',
    activity:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h3l2.5-7 4 14 2.5-7H21"/></svg>',
    info:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.8v.2"/></svg>',
    search:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.4-3.4"/></svg>',
    up:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M6 11l6-6 6 6"/></svg>',
    disc:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.6"/><circle cx="12" cy="12" r="2.1"/><circle cx="12" cy="6.2" r="0.95" fill="currentColor" stroke="none"/></svg>',
    mail:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
    rss:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1.5" fill="currentColor"/></svg>',
    clock:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    cal:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></svg>',
    tag:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20.6 13.4 12 22l-9-9V4h9l8.6 8.6a1.4 1.4 0 0 1 0 2Z"/><circle cx="7.5" cy="8.5" r="1.5"/></svg>',
    doc:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>',
    folder:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
    user:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    layers:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/></svg>',
    sun:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>',
    palette:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21a9 9 0 1 1 9-9c0 2-1.6 3-3.5 3H16a2 2 0 0 0-1.4 3.4A2 2 0 0 1 12 21Z"/><circle cx="7.5" cy="10.5" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="16.5" cy="10.5" r="1"/></svg>',
    arrow:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    back:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:13px;height:13px"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>',
  };

  /* ---------- 工具 ---------- */
  // 首页播放器和左下角悬浮按钮共用一个音频实例
  var bgmAudio = null;
  // 播放列表与当前曲目序号（窗口内共享，切页不丢）
  var playerList = [];
  var playerIdx = 0;
  var playMode = "list"; // list 顺序循环 / one 单曲循环 / shuffle 随机
  // 歌单脚本有没有读到：ok / loading / failed。读不到不装成「只有一首」
  var playlistState = "ok";
  var playlistBusy = false;
  var refreshTrackList = null; // 浮窗列表重绘钩子（initFloatPlayer 注册）
  var retryPlaylistHook = null; // 列表里「重试」按钮的回调（initMusic 注册）
  // 当前这首的歌词（解析好的）。放成共享变量：首页会重渲染多次，
  // 每份闭包各存一份 lyricLines 就会互相打架（切歌后歌词对不上）。
  var curLyricLines = [];

  /* ---------- 音频线路 ----------
     页面在 Cloudflare Pages 上，但 Pages 不支持 Range 请求（进度条拖不动），
     所以音频优先走 jsDelivr；可 jsDelivr 在部分网络/地区会连不上，
     一旦连不上整个播放器就哑了。这里改成线路链：
        上次验证可用的线路 → 其余 CDN 镜像 → 同源（本站，保底）
     哪条通就走哪条，正在播的换线路也不断（位置一起带过去）。 */
  var AUDIO_DIR = /^assets\/audio\//;
  var audioBase = ""; // 当前在用的线路前缀，"" 表示同源
  var audioQueue = []; // 当前这一首还没试过的线路
  var audioDead = false; // 所有线路都不通
  var audioWantPlay = false; // 用户是不是想让它响（换线路后据此续播）
  var audioOnDead = null; // 全挂时的回调（由 initMusic 挂上）
  var AUDIO_LINE_KEY = "reze-audio-line";
  var AUDIO_LINE_TTL = 3 * 24 * 3600 * 1000;

  function cdnBases() {
    var arr = [window.PLAYLIST_CDN].concat(window.PLAYLIST_CDN_MIRRORS || []);
    var out = [];
    arr.forEach(function (u) {
      if (!u) return;
      var s = String(u).replace(/\/+$/, "") + "/";
      if (out.indexOf(s) < 0) out.push(s);
    });
    return out;
  }

  function readLineMemo() {
    try {
      var raw = localStorage.getItem(AUDIO_LINE_KEY);
      if (!raw) return "";
      var o = JSON.parse(raw);
      if (!o || !o.t || Date.now() - o.t > AUDIO_LINE_TTL) return "";
      return typeof o.b === "string" ? o.b : "";
    } catch (e) {
      return "";
    }
  }

  function memorizeLine(base) {
    try {
      localStorage.setItem(AUDIO_LINE_KEY, JSON.stringify({ b: base, t: Date.now() }));
    } catch (e) {}
  }

  // 一首歌的候选地址列表：{ url, base }
  function audioCandidates(t) {
    var src = (t && t.src) || "";
    if (!AUDIO_DIR.test(src)) return [{ url: src, base: "" }]; // 外链，原样用
    var file = src.replace(AUDIO_DIR, "");
    var out = [];
    if (audioBase) out.push({ url: audioBase + file, base: audioBase });
    cdnBases().forEach(function (b) {
      if (b !== audioBase) out.push({ url: b + file, base: b });
    });
    out.push({ url: src, base: "" }); // 同源保底，一定跟着页面走
    return out;
  }

  // 给 audio 挂上某一首的地址（自动带上剩余的备用线路）
  function setTrackSrc(t, autoplay) {
    var audio = bgmAudio;
    if (!audio) return;
    var cands = audioCandidates(t);
    audioDead = false;
    audioQueue = cands.slice(1);
    audio.src = cands[0].url;
    audio.load();
    if (autoplay) playAudio();
  }

  function playAudio() {
    var audio = bgmAudio;
    if (!audio) return;
    if (audioDead) {
      if (audioOnDead) audioOnDead();
      return;
    }
    audioWantPlay = true;
    var p = audio.play();
    if (p && typeof p.then === "function") {
      p.catch(function (e) {
        var name = (e && e.name) || "";
        // 切地址造成的中断、浏览器拦截自动播放，都不算故障
        if (name === "AbortError" || name === "NotAllowedError") return;
        // 真正的加载/解码失败交给 error 事件去换线路
      });
    }
  }

  // 探一下各条 CDN 线路通不通，通了就记住，下次直接走它（进度条能拖）
  function probeAudioLine(src, done) {
    if (!window.fetch || !window.AbortController || !AUDIO_DIR.test(src)) return;
    var bases = cdnBases();
    if (!bases.length) return;
    var file = src.replace(AUDIO_DIR, "");
    var i = 0;
    (function next() {
      if (i >= bases.length) return done("");
      var base = bases[i++];
      var ctl = new AbortController();
      var timer = setTimeout(function () {
        try {
          ctl.abort();
        } catch (e) {}
      }, 2500);
      fetch(base + file, {
        method: "GET",
        headers: { Range: "bytes=0-0" },
        signal: ctl.signal,
        cache: "no-store",
      })
        .then(function (r) {
          clearTimeout(timer);
          if (r.ok || r.status === 206) {
            memorizeLine(base);
            done(base);
          } else next();
        })
        .catch(function () {
          clearTimeout(timer);
          next();
        });
    })();
  }

  /* ---------- 悬浮播放器 ----------
     顶栏「背景音乐」或侧栏「悬浮」按钮都能唤起它：
     可拖动（位置记住）、可切歌、可换播放模式、可关闭、实时显示当前歌词。 */
  var FP_POS_KEY = "reze-fp-pos";
  var FP_MODES = ["list", "one", "shuffle"];
  var FP_MODE_TIP = { list: "顺序循环", one: "单曲循环", shuffle: "随机播放" };
  var fpDrag = null;

  function fpEl() {
    return document.getElementById("floatPlayer");
  }

  function fpPlace(el, l, t) {
    var w = el.offsetWidth || 238;
    var h = el.offsetHeight || 150;
    var maxL = Math.max(8, window.innerWidth - w - 8);
    var maxT = Math.max(8, window.innerHeight - h - 8);
    el.style.left = Math.min(Math.max(8, l), maxL) + "px";
    el.style.top = Math.min(Math.max(8, t), maxT) + "px";
    el.style.right = "auto";
    el.style.bottom = "auto";
  }

  function fpRestorePos(el) {
    try {
      var raw = localStorage.getItem(FP_POS_KEY);
      if (!raw) return;
      var o = JSON.parse(raw);
      if (!o || typeof o.l !== "number" || typeof o.t !== "number") return;
      fpPlace(el, o.l, o.t);
    } catch (e) {}
  }

  function fpPaintTrack(t) {
    var el = fpEl();
    if (!el) return;
    var cov = el.querySelector("#fp-cover");
    var ti = el.querySelector("#fp-title");
    var ar = el.querySelector("#fp-artist");
    var title = (t && t.title) || "未知曲目";
    var artist = (t && t.artist) || "";
    if (ti) ti.textContent = title;
    if (ar) ar.textContent = artist;
    if (cov) {
      cov.innerHTML = t && t.cover ? '<img src="' + esc(t.cover) + '" alt="">' : ICONS.disc;
    }
    var ly = el.querySelector("#fp-lyric");
    if (ly && !ly.classList.contains("has-line")) {
      ly.innerHTML = "<span>♪ " + esc(artist ? title + " · " + artist : title) + "</span>";
    }
  }

  function fpPaintLyric(text, hasLine) {
    var el = fpEl();
    if (!el) return;
    var ly = el.querySelector("#fp-lyric");
    if (!ly) return;
    ly.innerHTML = "<span>" + esc(text) + "</span>";
    ly.classList.toggle("has-line", !!hasLine);
  }

  function fpPaintPlaying(playing) {
    var el = fpEl();
    if (!el) return;
    var play = el.querySelector("#fp-play");
    var cov = el.querySelector("#fp-cover");
    if (play) play.innerHTML = playing ? ICONS.pause : ICONS.play;
    if (cov) cov.classList.toggle("spinning", !!playing);
  }

  function fpPaintMode() {
    var el = fpEl();
    if (!el) return;
    var b = el.querySelector("#fp-mode");
    if (!b) return;
    b.innerHTML =
      (playMode === "shuffle" ? ICONS.shuffle : ICONS.loop) +
      '<i class="ply-mode-badge" aria-hidden="true">1</i>';
    b.classList.toggle("is-on", playMode !== "list");
    b.setAttribute("data-mode", playMode);
    b.setAttribute("aria-label", "播放模式：" + (FP_MODE_TIP[playMode] || "顺序循环"));
  }

  function openFloatPlayer() {
    var el = fpEl();
    if (!el) return;
    el.classList.add("on");
    var btn = document.getElementById("p-float");
    if (btn) btn.classList.add("on");
    fpPaintTrack(trackAt(playerIdx));
    fpPaintPlaying(bgmAudio ? !bgmAudio.paused : false);
    fpPaintMode();
    if (!el.style.left) fpRestorePos(el);
    fpPlace(el, el.getBoundingClientRect().left, el.getBoundingClientRect().top);
  }

  function closeFloatPlayer() {
    var el = fpEl();
    if (!el) return;
    el.classList.remove("on");
    var btn = document.getElementById("p-float");
    if (btn) btn.classList.remove("on");
  }

  function toggleFloatPlayer() {
    var el = fpEl();
    if (!el) return;
    if (el.classList.contains("on")) closeFloatPlayer();
    else openFloatPlayer();
  }

  // 切歌优先借侧栏播放器的按钮（那边逻辑最全），没有就自己切
  function fpStep(step) {
    var b = document.getElementById(step > 0 ? "p-fwd" : "p-back");
    if (b) {
      b.click();
      fpPaintTrack(trackAt(playerIdx));
      return;
    }
    if (!playerList.length) return;
    playerIdx = ((playerIdx + step) % playerList.length + playerList.length) % playerList.length;
    var t = trackAt(playerIdx);
    setTrackSrc(t, true);
    fpPaintTrack(t);
    try {
      localStorage.setItem("reze-track", String(playerIdx));
    } catch (e) {}
  }

  function fpCycleMode() {
    var b = document.getElementById("p-loop");
    if (b) {
      b.click();
      fpPaintMode();
      return;
    }
    var i = FP_MODES.indexOf(playMode);
    playMode = FP_MODES[(i + 1) % FP_MODES.length];
    if (bgmAudio) bgmAudio.loop = playMode === "one";
    try {
      localStorage.setItem("reze-play-mode", playMode);
    } catch (e) {}
    fpPaintMode();
  }

  function initFloatPlayer() {
    if (fpEl()) return;
    var el = document.createElement("div");
    el.className = "float-player";
    el.id = "floatPlayer";
    el.setAttribute("role", "group");
    el.setAttribute("aria-label", "悬浮播放器");
    el.innerHTML =
      '<div class="fp-top">' +
      '<div class="fp-cover" id="fp-cover">' +
      ICONS.disc +
      "</div>" +
      '<div class="fp-meta"><b id="fp-title">未知曲目</b><span id="fp-artist"></span></div>' +
      '<button type="button" class="fp-close" id="fp-close" aria-label="关闭悬浮播放器">' +
      ICONS.close +
      "</button>" +
      "</div>" +
      '<div class="fp-lyric" id="fp-lyric"><span>♪ 还没播放</span></div>' +
      '<div class="fp-ctl">' +
      '<button type="button" id="fp-prev" aria-label="上一首">' +
      ICONS.skipBack +
      "</button>" +
      '<button type="button" class="fp-play" id="fp-play" aria-label="播放 / 暂停">' +
      ICONS.play +
      "</button>" +
      '<button type="button" id="fp-next" aria-label="下一首">' +
      ICONS.skipFwd +
      "</button>" +
      '<button type="button" class="fp-mode" id="fp-mode" aria-label="播放模式">' +
      ICONS.loop +
      "</button>" +
      "</div>";
    document.body.appendChild(el);

    el.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest("button") : null;
      if (!b || !el.contains(b)) return;
      if (b.id === "fp-play") {
        if (bgmAudio && !bgmAudio.paused) {
          audioWantPlay = false;
          bgmAudio.pause();
        } else {
          playAudio();
        }
      } else if (b.id === "fp-prev") fpStep(-1);
      else if (b.id === "fp-next") fpStep(1);
      else if (b.id === "fp-mode") fpCycleMode();
      else if (b.id === "fp-close") closeFloatPlayer();
    });

    // 拖动：按住卡片（按钮除外）就能拖，松手记住位置
    el.addEventListener("pointerdown", function (e) {
      if (e.button) return;
      if (e.target.closest && e.target.closest("button")) return;
      var r = el.getBoundingClientRect();
      fpDrag = { id: e.pointerId, dx: e.clientX - r.left, dy: e.clientY - r.top };
      el.classList.add("is-dragging");
      try {
        el.setPointerCapture(e.pointerId);
      } catch (err) {}
    });
    el.addEventListener("pointermove", function (e) {
      if (!fpDrag || e.pointerId !== fpDrag.id) return;
      e.preventDefault();
      fpPlace(el, e.clientX - fpDrag.dx, e.clientY - fpDrag.dy);
    });
    function endDrag(e) {
      if (!fpDrag) return;
      if (e && e.pointerId !== undefined && e.pointerId !== fpDrag.id) return;
      fpDrag = null;
      el.classList.remove("is-dragging");
      var r = el.getBoundingClientRect();
      try {
        localStorage.setItem(
          FP_POS_KEY,
          JSON.stringify({ l: Math.round(r.left), t: Math.round(r.top) })
        );
      } catch (err) {}
    }
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    window.addEventListener("resize", function () {
      if (!el.classList.contains("on")) return;
      var r = el.getBoundingClientRect();
      fpPlace(el, r.left, r.top);
    });

    if (bgmAudio) {
      bgmAudio.addEventListener("play", function () {
        fpPaintPlaying(true);
      });
      bgmAudio.addEventListener("pause", function () {
        fpPaintPlaying(false);
      });
    }
  }

  // 下一首该放哪个：随机模式下随机挑一首（避免连续重复同一首）
  function nextTrackIndex(step) {
    var n = playerList.length;
    if (!n) return 0;
    if (playMode === "shuffle" && n > 1) {
      var pick = playerIdx;
      while (pick === playerIdx) pick = Math.floor(Math.random() * n);
      return pick;
    }
    return (((playerIdx + step) % n) + n) % n;
  }

  // 取一首歌的展示信息，缺字段时兜底
  function trackAt(i) {
    var list = playerList.length ? playerList : [];
    if (!list.length) {
      return {
        title: (SITE.song && SITE.song.title) || "未知曲目",
        artist: (SITE.song && SITE.song.artist) || "",
        cover: (SITE.song && SITE.song.cover) || "",
        src: SITE.bgm || "assets/audio/song.mp3",
        lyrics: SITE.lyrics || "",
      };
    }
    return list[((i % list.length) + list.length) % list.length];
  }

  // playlist.js 是同步赋值。读不到就说明那次脚本没加载成功，返回 null，
  // 别把「没读到」和「站上只有一首」当成一回事。
  function readPlaylist() {
    var raw = window.PLAYLIST;
    if (!Array.isArray(raw) || !raw.length) return null;
    var out = raw.filter(function (t) {
      return t && t.src;
    });
    return out.length ? out : null;
  }

  // 重新拉一次 playlist.js：换查询串绕开那份坏缓存，最多两次。
  // 每次带超时，请求挂起时不会永远停在「歌单加载中」。
  function rescuePlaylist(attempt, done) {
    var tag = document.querySelector(
      'script[src*="playlist.js"]:not([data-retry])'
    );
    var src = tag ? tag.getAttribute("src") : "assets/js/playlist.js?v=1";
    var sep = src.indexOf("?") >= 0 ? "&" : "?";
    var s = document.createElement("script");
    var settled = false;
    var timer = setTimeout(function () {
      finish(null);
    }, 8000);
    function finish(arr) {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      s.onload = s.onerror = null;
      if (s.parentNode) s.parentNode.removeChild(s);
      if (arr) {
        done(arr);
        return;
      }
      if (attempt + 1 < 2) {
        setTimeout(function () {
          rescuePlaylist(attempt + 1, done);
        }, 600);
      } else {
        done(null);
      }
    }
    s.onload = function () {
      finish(readPlaylist());
    };
    s.onerror = function () {
      finish(null);
    };
    s.setAttribute("data-retry", "1");
    s.src = src + sep + "r=" + Date.now() + "-" + attempt;
    document.head.appendChild(s);
  }

  // file:// 协议下访问 storage 会抛 SecurityError，必须兜住，
  // 否则整段初始化会中断，页面变成白屏。
  var STORAGE = {
    get: function (k) {
      try {
        return window.localStorage.getItem(k);
      } catch (e) {
        return null;
      }
    },
    set: function (k, v) {
      try {
        window.localStorage.setItem(k, v);
      } catch (e) {}
    },
  };

  /* ---------- 可切换背景 ---------- */
  function bgList() {
    var arr = Array.isArray(SITE.homeBgs) ? SITE.homeBgs.filter(Boolean) : [];
    if (arr.length) return arr;
    return SITE.homeBg ? [SITE.homeBg] : [];
  }

  /* ---------- 背景明暗按图适配 ----------
     八张首屏图的平均亮度从 0.19 到 0.62，固定一层遮罩压不住亮的，
     又把暗的压成黑。换图时把图缩到 24x24 采一次平均亮度，分三档调
     .page-bg 的 brightness；外观面板里手动调过的值照样乘在前面。 */
  var bgManual = 1;
  var bgToneFactor = 1;
  var bgToneCache = {};
  try {
    var _bm = Number(localStorage.getItem("reze-bg-bright"));
    if (_bm > 0) bgManual = Math.max(0.4, Math.min(1.6, _bm / 100));
  } catch (e) {}
  function applyBgBright() {
    var v = Math.max(0.4, Math.min(1.6, bgManual * bgToneFactor));
    document.documentElement.style.setProperty("--bg-bright", v.toFixed(2));
  }
  function tuneBgTone(src) {
    if (!src) return;
    var key = String(src);
    if (bgToneCache[key]) {
      bgToneFactor = bgToneCache[key];
      applyBgBright();
      return;
    }
    var probe = new Image();
    probe.onload = function () {
      var L;
      try {
        var c = document.createElement("canvas");
        c.width = c.height = 24;
        var g = c.getContext("2d");
        g.drawImage(probe, 0, 0, 24, 24);
        var d = g.getImageData(0, 0, 24, 24).data;
        var sum = 0;
        for (var i = 0; i < d.length; i += 4) {
          sum += 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
        }
        L = sum / (d.length / 4) / 255;
      } catch (e) {
        return; // 外链图会污染 canvas，保持默认档
      }
      var f = L > 0.5 ? 0.72 : L < 0.28 ? 1.2 : 0.94;
      bgToneCache[key] = f;
      bgToneFactor = f;
      applyBgBright();
    };
    probe.src = key;
  }

  // 把背景图铺到全屏层；fade 为 true 时先淡出再换图，避免生硬跳变。
  // remember 为 false 时不记地址：随机模式每次都换，记下来下次反而会先闪一张旧的。
  // 首页那段早恢复脚本靠 reze-bg-url 取图，不再自己维护图片列表。
  function applyPageBg(src, fade, remember) {
    var el = $("#page-bg");
    if (!el || !src) return;
    tuneBgTone(src);
    if (remember !== false) STORAGE.set("reze-bg-url", String(src));
    var url = 'url("' + String(src).replace(/"/g, "%22") + '")';
    if (!fade) {
      el.style.backgroundImage = url;
      return;
    }
    el.style.opacity = "0";
    setTimeout(function () {
      el.style.backgroundImage = url;
      el.style.opacity = "";
    }, 350);
  }

  // 启动时决定用哪张：记住上次选择；选了「随机」(-1) 则每次进站随机挑
  function initPageBg() {
    var list = bgList();
    if (!list.length) return;
    var saved = STORAGE.get("reze-bg-idx");
    var random = saved === "-1";
    var idx;
    if (random) {
      idx = Math.floor(Math.random() * list.length); // 随机模式：不固化结果
    } else {
      var n = Number(saved);
      if (saved !== null && n >= 0 && n < list.length) {
        idx = n;
      } else {
        idx = Math.floor(Math.random() * list.length);
        STORAGE.set("reze-bg-idx", String(idx));
      }
    }
    applyPageBg(list[idx], false, !random);
  }

  function $(sel, root) {    return (root || document).querySelector(sel);
  }
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function fmtDate(d) {
    if (!d) return "";
    return String(d).replace(/-/g, ".");
  }

  // 用名字算一个稳定的颜色。
  // 直接取 hash % 360 会撞色（实测 9 个标签撞了两次），
  // 所以映射到一组预先挑好的色相。
  // 编号限定在 180–342 的冷色区间（青 → 蓝紫 → 紫 → 品红），
  // 呼应 Reze 的紫调，同时避免跳出一块黄绿破坏整体气质。
  var HUE_POOL = [180, 198, 216, 234, 252, 270, 288, 306, 324, 342];

  function hashOf(str) {
    var h = 7;
    var s = String(str || "");
    for (var i = 0; i < s.length; i++) h = (h * 53 + s.charCodeAt(i)) >>> 0;
    return h;
  }
  function hueOf(str) {
    return HUE_POOL[hashOf(str) % HUE_POOL.length];
  }
  // 分类固定配色，同类文章视觉上成组
  var CAT_HUE = { 技术: 252, 生活: 198, 作品: 306 };
  function catHue(name) {
    return Object.prototype.hasOwnProperty.call(CAT_HUE, name) ? CAT_HUE[name] : hueOf(name);
  }
  function plain(html) {
    var d = document.createElement("div");
    d.innerHTML = html || "";
    return (d.textContent || "").replace(/\s+/g, "");
  }
  function wordCount(post) {
    // 首屏只有元数据，字数是云端预先算好的；正文到手后按正文实算
    if (post.words !== undefined && !post.content) return post.words;
    return plain(post.content).length;
  }

  /* 卡片上早写着字数，只是 284 字和 61691 字排在一起是同一种形状。
     这条细线按全站最长的一篇归一，篇幅自己露出来。 */
  var _lenMax = 0;
  function lenBarHtml(post) {
    var w = wordCount(post) || 0;
    if (!_lenMax) {
      _lenMax = POSTS.reduce(function (m, x) { return Math.max(m, wordCount(x) || 0); }, 1);
    }
    var pct = Math.max(9, Math.min(100, Math.round(Math.pow(w / _lenMax, 0.45) * 100)));
    return '<span class="len-bar" aria-hidden="true"><i style="width:' + pct + '%"></i></span>';
  }

  /* 按需取单篇正文。cloud.js 负责请求，取不到时由它退到本地兜底文件。 */
  function fetchPostBody(id) {
    if (typeof window.loadCloudPost === "function") {
      return window.loadCloudPost(id)
        .then(function (p) { return p && typeof p.content === "string" ? p.content : ""; })
        .catch(function () { return ""; });
    }
    return Promise.resolve("");
  }

  // 从正文里截一段，尽量包含命中的词
  function snippet(text, terms, len) {
    if (!text) return "";
    var lower = text.toLowerCase();
    var pos = -1;
    for (var i = 0; i < terms.length; i++) {
      var p = lower.indexOf(terms[i]);
      if (p !== -1) {
        pos = p;
        break;
      }
    }
    if (pos === -1) {
      return text.slice(0, len) + (text.length > len ? "…" : "");
    }
    var start = Math.max(0, pos - 24);
    var s = text.slice(start, start + len);
    return (start > 0 ? "…" : "") + s + (start + len < text.length ? "…" : "");
  }

  // 先转义再包 <mark>，避免正文里的标签被当成 HTML
  function highlight(text, terms) {
    var out = esc(text);
    for (var i = 0; i < terms.length; i++) {
      var t = terms[i];
      if (!t) continue;
      var safe = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      out = out.replace(new RegExp("(" + safe + ")", "gi"), "<mark>$1</mark>");
    }
    return out;
  }

  /* ---------- 数据整理 ---------- */
  /* ---------- 数据整理（实时计算：云端/后台数据更新后自动生效） ---------- */
  function byDateList() {
    return POSTS.slice().sort(function (a, b) {
      return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
    });
  }
  function orderedPosts() {
    var bd = byDateList();
    return bd.filter(function (p) { return p.pinned; }).concat(
      bd.filter(function (p) { return !p.pinned; })
    );
  }

  function catCounts() {
    var m = {};
    POSTS.forEach(function (p) {
      m[p.cat] = (m[p.cat] || 0) + 1;
    });
    return m;
  }
  function tagCounts() {
    var m = {};
    POSTS.forEach(function (p) {
      (p.tags || []).forEach(function (t) {
        m[t] = (m[t] || 0) + 1;
      });
    });
    return m;
  }
  function postById(id) {
    for (var i = 0; i < POSTS.length; i++) if (POSTS[i].id === id) return POSTS[i];
    return null;
  }

  // 标签配色：按出现次数从多到少依次取色相，保证热门标签颜色互不相同，
  // 且同一个标签在侧栏、列表、文末永远是同一个颜色。
  var TAG_HUE = (function () {
    var counts = {};
    POSTS.forEach(function (p) {
      (p.tags || []).forEach(function (t) {
        counts[t] = (counts[t] || 0) + 1;
      });
    });
    var list = Object.keys(counts).sort(function (a, b) {
      return counts[b] - counts[a] || (a < b ? -1 : 1);
    });
    var map = {};
    list.forEach(function (t, i) {
      map[t] = HUE_POOL[i % HUE_POOL.length];
    });
    return map;
  })();

  function tagHue(t) {
    return Object.prototype.hasOwnProperty.call(TAG_HUE, t) ? TAG_HUE[t] : hueOf(t);
  }

  /* ---------- 头像与一句话简介 ----------
     纸样（新界面）用静止帧 assets/uploads/avatar.png；淡紫与极简（旧界面）
     继续放 SITE.avatar 指的那张 GIF。动图挂在页首会拖住整页重绘，纸样只讲
     纸面，动的地方越少越好；旧界面原本就有那张动图，留着不动。
     皮肤在 <head> 的内联脚本里已经写好，渲染时读到的即是最终值。
     简介只去掉末尾那一个句号：它下面就是三个数字，句号压在那里像把话说死了。 */
  function avatarSrc() {
    var a = String(SITE.avatar || "");
    if (document.documentElement.getAttribute("data-skin") !== "paper") return a;
    if (!a || /\.gif(\W|$)/i.test(a)) return "assets/uploads/avatar.png";
    return a;
  }
  function bioText() {
    return String(SITE.slogan || "").replace(/[。．.]+\s*$/, "");
  }
  /* 切皮肤不重渲染 DOM，已经挂出去的头像要跟着换一次 src。
     图片本身带 data-av：左右栏、首屏、站务条目都算在内。 */
  function syncAvatar() {
    var src = avatarSrc();
    if (!src) return;
    Array.prototype.forEach.call(document.querySelectorAll("img[data-av]"), function (im) {
      if (im.getAttribute("src") !== src) im.setAttribute("src", src);
    });
  }

  /* ---------- 侧栏 ---------- */
  function sidebarMarkup() {
    var cc = catCounts();
    var tc = tagCounts();
    var catNum = Object.keys(cc).length;
    var tagNum = Object.keys(tc).length;

    var avatar = avatarSrc()
      ? '<div class="avatar"><img data-av src="' + esc(avatarSrc()) + '" alt="' + esc(SITE.name) + '"></div>'
      : '<div class="avatar"><span class="ph">蕾</span></div>';

    // 社交按钮：优先用 SITE.social 数组，没有就退回旧的 github + email 两个
    var socialList =
      SITE.social && SITE.social.length
        ? SITE.social
        : [
            { name: "GitHub", icon: "github", url: SITE.github || "#" },
            { name: "邮箱", icon: "mail", url: "mailto:" + (SITE.email || "") },
          ];
    var socialHtml = socialList
      .map(function (s) {
        return (
          '<a href="' +
          esc(s.url) +
          '" target="_blank" rel="noopener" aria-label="' +
          esc(s.name) +
          '" title="' +
          esc(s.name) +
          '">' +
          (ICONS[s.icon] || ICONS.github) +
          "</a>"
        );
      })
      .join("");

    var recent = byDateList()
      .slice(0, 4)
      .map(function (p) {
        return (
          '<li><a href="/p/' +
          encodeURIComponent(p.id) +
          '">' +
          esc(p.title) +
          "</a><time>" +
          fmtDate(p.date) +
          "</time></li>"
        );
      })
      .join("");

    var cloud = Object.keys(tc)
      .sort(function (a, b) {
        return tc[b] - tc[a];
      })
      .map(function (t) {
        return (
          '<a href="/writing?tag=' +
          encodeURIComponent(t) +
          '" style="--tag-h:' +
          tagHue(t) +
          '">' +
          esc(t) +
          '<span class="c">' +
          tc[t] +
          "</span></a>"
        );
      })
      .join("");
    return (
      '<div class="side-block profile reveal">' +
      avatar +
      '<p class="name">' +
      esc(SITE.name) +
      "</p>" +
      '<p class="bio">' +
      esc(bioText()) +
      "</p>" +
      '<div class="stats">' +
      '<div><span class="n">' +
      POSTS.length +
      '</span><span class="k">文章</span></div>' +
      '<div><span class="n">' +
      tagNum +
      '</span><span class="k">标签</span></div>' +
      '<div><span class="n">' +
      catNum +
      '</span><span class="k">分类</span></div>' +
      "</div>" +
      '<div class="social">' +
      socialHtml +
      "</div>" +
      "</div>" +
      '<div class="side-block recent-block reveal">' +
      "<h2>" +
      ICONS.clock +
      "最近更新</h2>" +
      '<ul class="recent">' +
      recent +
      "</ul>" +
      "</div>" +
      '<div class="side-block tag-block reveal">' +
      "<h2>" +
      ICONS.tag +
      "标签</h2>" +
      '<div class="tagcloud">' +
      cloud +
      "</div>" +
      "</div>"
    );
  }

  function mountSidebar() {
    var box = $("#sidebar");
    if (!box) return;
    box.innerHTML = sidebarMarkup();
  }

  /* ---------- 卡片 ---------- */
  function cardMarkup(p, i) {
    var pin = p.pinned ? '<span class="pin">置顶</span>' : "";

    return (
      '<article class="card' + (p.cover ? "" : " no-cover") + (p.pinned ? " is-pinned" : "") + ' reveal" data-cat="' +
      esc(p.cat) +
      '" style="--cat-h:' + catHue(p.cat) + '">' +
      '<a href="/p/' +
      encodeURIComponent(p.id) +
      '">' +
      '<div class="card-body">' +
      '<h2 class="card-title">' +
      esc(p.title) +
      pin +
      "</h2>" +
      '<p class="card-excerpt">' +
      esc(p.excerpt) +
      "</p>" +
      '<div class="card-meta">' +
      "<span>" +
      ICONS.cal +
      fmtDate(p.date) +
      "</span>" +
      (p.updated
        ? "<span>" + ICONS.clock + "更新 " + fmtDate(p.updated) + "</span>"
        : "") +
      '<span class="cat" style="--cat-h:' +
      catHue(p.cat) +
      '">' +
      ICONS.folder +
      esc(p.cat) +
      "</span>" +
      "<span>" +
      ICONS.doc +
      wordCount(p).toLocaleString() +
      " 字</span>" +
      lenBarHtml(p) +
      "</div>" +
      "</div>" +
      (p.cover ? '<div class="cover"><img src="' + esc(p.cover) + '" alt="' + esc(p.title) + '" loading="lazy"></div>' : "") +
      "</a>" +
      "</article>"
    );
  }

  function renderCards(container, list) {
    if (!container) return;
    if (!list.length) {
      container.innerHTML = '<div class="empty">这个分类下还没有文章，换个看看？</div>';
      return;
    }
    container.innerHTML = list.map(cardMarkup).join("");
    observeReveal(container);
  }

  /* ---------- 首页 ---------- */
  function mountHome() {
    var box = $("#home-cards");
    if (!box) return;
    renderCards(box, orderedPosts().slice(0, 5));
  }

  /* ---------- 首页三栏 ---------- */
  function postsMainHtml() {
    var counts = catCounts();
    var tabs =
      '<a class="g-tab" href="/archive">归档</a>' +
      '<a class="g-tab" href="/sources">参考源</a>' +
      '<button class="g-tab" data-cat="全部" aria-pressed="true">全部<span class="n">' +
      POSTS.length + "</span></button>";
    Object.keys(counts).forEach(function (c) {
      tabs +=
        '<button class="g-tab" data-cat="' + esc(c) + '" aria-pressed="false">' + esc(c) +
        '<span class="n">' + counts[c] + "</span></button>";
    });
    return recStripHtml() +
      '<div class="g-tabs" id="g-tabs">' + tabs + "</div>" +
      '<div class="g-list" id="g-list"></div>';
  }

  function glassPostH(p) {
    var chips = (p.tags || [])
      .slice(0, 5)
      .map(function (t) {
        return '<span style="--tag-h:' + tagHue(t) + '"># ' + esc(t) + "</span>";
      })
      .join("");
    return (
      '<a class="g-posth' + (p.cover ? "" : " no-cover") + (p.pinned ? " is-pinned" : "") + '" href="/p/' + encodeURIComponent(p.id) + '" style="--cat-h:' + catHue(p.cat) + '">' +
      '<div class="info">' +
      '<div class="ttl"><span class="mark">' + ICONS.doc + "</span>" +
      "<h2>" + esc(p.title) + "</h2>" +
      (p.pinned ? '<span class="pin">置顶</span>' : "") + "</div>" +
      (chips ? '<div class="chips">' + chips + "</div>" : "") +
      '<p class="excerpt">' + esc(p.excerpt) + "</p>" +
      '<div class="meta"><span>' + ICONS.cal + fmtDate(p.date) + "</span>" +
      "<span>" + ICONS.doc + wordCount(p).toLocaleString() + " 字</span>" +
      lenBarHtml(p) + "</div>" +
      "</div>" +
      (p.cover ? '<div class="thumb"><img src="' + esc(p.cover) + '" alt="" loading="lazy"></div>' : "") +
      "</a>"
    );
  }

  /* 首页置顶区：只认 pinned 标记，和发布时间无关。第一篇放大成主卡，
     其余最多三张小卡；置顶篇数变化时自动增减，不用改版式。 */
  function featureBlockHtml(pins) {
    var lead = pins[0];
    var rest = pins.slice(1, 4);
    var tags = (lead.tags || []).slice(0, 3).map(function (t) {
      return "# " + esc(t);
    }).join("  ");
    var leadHtml =
      '<a class="ft-lead" href="/p/' + encodeURIComponent(lead.id) + '">' +
        '<div class="ft-lead-main">' +
          '<div class="ft-lead-top"><span class="pin">置顶</span></div>' +
          "<h2>" + esc(lead.title) + "</h2>" +
          '<p>' + esc(lead.excerpt) + "</p>" +
          '<div class="ft-lead-meta"><span>' + fmtDate(lead.date) + "</span>" +
            "<span>" + wordCount(lead).toLocaleString() + " 字</span>" +
            (tags ? "<span>" + esc(tags) + "</span>" : "") +
          "</div>" +
        "</div>" +
      "</a>";
    var rowHtml = rest.length
      ? '<div class="ft-row">' + rest.map(function (q) {
          return '<a class="ft-mini" href="/p/' + encodeURIComponent(q.id) + '">' +
            "<h3>" + esc(q.title) + "</h3>" +
            '<p class="ft-excerpt">' + esc(q.excerpt) + "</p>" +
            '<span class="ft-mini-meta">' + fmtDate(q.date) + " · " + esc(q.cat) + "</span>" +
          "</a>";
        }).join("") + "</div>"
      : "";
    return '<section class="ft-wrap">' + leadHtml + rowHtml + "</section>";
  }

  /* ---------- 站务 / 导航 ---------- */
  /* 动态记稿子，时间线记站点改动，原本分成两页。这里按日期混成一列，
     「稿」与「站」只作标签，不解释、不改原文。 */
  function siteFeed() {
    var out = [];
    (SITE.moments || []).forEach(function (m) {
      out.push({ date: m.date, text: m.text || "", tags: m.tags || [], images: m.images || [], kind: "稿" });
    });
    (SITE.timeline || []).forEach(function (t) {
      out.push({ date: t.date, title: t.title || "", text: t.desc || "", tags: t.tags || [], kind: "站" });
    });
    return out.sort(function (a, b) {
      return a.date < b.date ? 1 : (a.date > b.date ? -1 : 0);
    });
  }

  function momentsMainHtml() {
    var list = siteFeed();
    return (
      '<div class="g-card" style="margin-bottom:14px">' +
      '<div class="g-card-head"><span class="t">' + ICONS.activity + "站务</span>" +
      '<span class="more" id="m-count">' + list.length + " 条</span></div>" +
      '<div class="g-searchline">' + ICONS.search +
      '<input type="text" id="m-search" placeholder="搜索" autocomplete="off"></div></div>' +
      '<div class="g-moments" id="m-list"></div>'
    );
  }

  function momentMarkup(m) {
    var av = avatarSrc()
      ? '<img data-av src="' + esc(avatarSrc()) + '" alt="">'
      : "<span>" + esc((SITE.name || "蕾").charAt(0)) + "</span>";
    var pics = (m.images || []).length
      ? '<div class="pics">' +
        m.images
          .map(function (src) {
            return '<img src="' + esc(src) + '" alt="" loading="lazy">';
          })
          .join("") +
        "</div>"
      : "";
    var chips = (m.tags || []).length
      ? '<div class="foot">' + m.tags.map(function (x) {
          return '<span style="--tag-h:' + tagHue(x) + '">' + esc(x) + "</span>";
        }).join("") + "</div>"
      : "";
    return (
      '<div class="g-moment">' +
      '<div class="av">' + av + "</div>" +
      "<div>" +
      '<div class="head"><b>' + esc(SITE.name) + '</b>' +
      '<span class="kind">' + esc(m.kind) + '</span>' +
      '<span class="time">' + esc(m.date) + "</span></div>" +
      (m.title ? '<div class="title">' + esc(m.title) + "</div>" : "") +
      '<div class="body">' + esc(m.text) + "</div>" +
      pics + chips +
      "</div></div>"
    );
  }

  function bindMoments(root) {
    var listEl = root.querySelector("#m-list");
    var searchEl = root.querySelector("#m-search");
    var countEl = root.querySelector("#m-count");
    if (!listEl) return;
    var all = siteFeed();
    var curQ = "";
    var PER = 13;
    var curPage = 0;
    var curPages = 1;

    function paint() {
      var list = all.filter(function (m) {
        var hay = ((m.title || "") + " " + (m.text || "") + " " + (m.tags || []).join(" ")).toLowerCase();
        return !curQ || hay.indexOf(curQ) !== -1;
      });
      var paged = pageSlice(list, curPage, PER);
      curPages = paged.pages;
      if (curPage >= curPages) {
        curPage = curPages - 1;
        paged = pageSlice(list, curPage, PER);
      }
      if (curPage < 0) curPage = 0;
      var slice = paged.slice;
      listEl.innerHTML = (slice.length
        ? slice.map(momentMarkup).join("")
        : '<div class="g-empty">没有找到相关记录</div>') +
        (list.length ? buildPager(curPages, curPage) : "");
      if (countEl) countEl.textContent = list.length + " 条";
    }

    function setPage(p) {
      curPage = Math.max(0, Math.min(p, curPages - 1));
      paint();
      try { listEl.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (err) {}
    }

    listEl.addEventListener("click", function (e) {
      var t = e.target;
      if (!t || !t.closest) return;
      var b = t.closest(".pg-btn");
      if (b && !b.classList.contains("disabled")) {
        setPage(Number(b.getAttribute("data-p")) || 0);
        return;
      }
      if (t.closest(".pg-go")) {
        var inp = listEl.querySelector(".pg-input");
        setPage((parseInt(inp && inp.value, 10) || 1) - 1);
      }
    });

    listEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && e.target && e.target.classList &&
          e.target.classList.contains("pg-input")) {
        e.preventDefault();
        setPage((parseInt(e.target.value, 10) || 1) - 1);
      }
    });

    if (searchEl)
      searchEl.addEventListener("input", function () {
        curQ = searchEl.value.trim().toLowerCase();
        curPage = 0;
        paint();
      });

    paint();
  }

  // 导航页当前选中的分类（空 = 全部）
  var lkActiveCat = "";

  function linksMainHtml() {
    var items = SITE.links || [];
    if (!items.length) {
      return '<div class="g-card"><div class="g-empty">还没有添加链接</div></div>';
    }

    // 按分类分组，保持数据里的原始顺序
    var order = [];
    var bucket = {};
    items.forEach(function (l) {
      var c = l.cat || "其他";
      if (!bucket[c]) {
        bucket[c] = [];
        order.push(c);
      }
      bucket[c].push(l);
    });

    // 默认「全部」视图：每个分类只露 6 个，剩下的点分类筛选或「查看全部」再看
    var LK_PREVIEW = 3;
    var activeCat = lkActiveCat && bucket[lkActiveCat] ? lkActiveCat : "";
    var showOrder = activeCat ? [activeCat] : order;

    var chips =
      '<button class="lk-chip' + (activeCat ? "" : " on") + '" data-cat="">全部<em>' +
      items.length + "</em></button>" +
      order
        .map(function (c) {
          return (
            '<button class="lk-chip' + (activeCat === c ? " on" : "") +
            '" data-cat="' + esc(c) + '">' + esc(c) + "<em>" + bucket[c].length + "</em></button>"
          );
        })
        .join("");

    var groups = showOrder
      .map(function (c) {
        var all = bucket[c];
        var shown = activeCat ? all : all.slice(0, LK_PREVIEW);
        var cells = shown
          .map(function (l) {
            var initial = esc((l.name || "?").charAt(0));
            // 图标很小且同源，不用懒加载：程序化滚动后 lazy 图有时不触发，会留一片空方块。
            // 图还没下完时先显示站名首字，加载完再淡入盖住，避免一排空格子。
            var ico = l.fav
              ? '<img src="' + esc(l.fav) + '" alt="" width="20" height="20" decoding="async" ' +
                "onload=\"this.parentNode.classList.add('has-img')\" " +
                "onerror=\"this.style.display='none';this.parentNode.classList.add('no-img')\">"
              : "";
            return (
              '<a class="lk-item" href="' + esc(l.url) + '" target="_blank" rel="noopener">' +
              '<span class="lk-ico" data-fb="' + initial + '">' + ico + "</span>" +
              '<span class="lk-txt"><b>' + esc(l.name) + "</b>" +
              "<i>" + esc(l.desc || "") + "</i></span></a>"
            );
          })
          .join("");
        var more =
          !activeCat && all.length > LK_PREVIEW
            ? '<button class="lk-more" data-cat="' + esc(c) + '">全部 ' +
              all.length + " 个<i>›</i></button>"
            : "";
        return (
          '<section class="g-card lk-group">' +
          '<h2 class="lk-cat">' + esc(c) + "<em>" + all.length + "</em>" + more + "</h2>" +
          '<div class="lk-grid">' + cells + "</div></section>"
        );
      })
      .join("");

    return (
      '<div class="g-card lk-head">' +
      "<div><h1>导航</h1><p>常用站点，按用途分类。</p></div>" +
      '<span class="count">' + items.length + " 个</span></div>" +
      '<div class="lk-bar">' + chips + "</div>" +
      '<div class="lk-wrap">' + groups + "</div>"
    );
  }

  // 列表分页条：首尾箭头 + 一个固定宽度的滑动页码窗口 + 跳页框。
  // 首尾页已有 « » 直达，页码不再固定钉住第一页和最后一页，也不再插省略号；
  // 窗口恒为 7 个（窄屏 5 个），靠边自动夹紧，翻页时整条宽度不跳动。
  function pagerNums(pages, page) {
    var cur = page + 1; // 1-based 当前页
    var wide = (typeof window === "undefined" ? 1200 : window.innerWidth || 1200) > 720;
    var win = Math.min(pages, wide ? 7 : 5);
    var start = Math.max(1, Math.min(cur - Math.floor(win / 2), pages - win + 1));
    var out = [];
    for (var i = 0; i < win; i++) out.push(start + i);
    return out;
  }

  /* 均摊分页：页数取 ceil，余数从第一页起每页多分一篇。
     364 篇按 12 篇一页是 31 页，23 页排 12 篇、8 页排 11 篇，
     不会出现末页只剩几篇、也不会把 16 篇塞进末页。 */
  function pageSlice(list, page, per) {
    var n = list.length;
    var pages = Math.max(1, Math.ceil(n / per));
    var base = Math.floor(n / pages);
    var extra = n % pages;
    var from = page * base + Math.min(page, extra);
    var size = base + (page < extra ? 1 : 0);
    return { pages: pages, from: from, slice: list.slice(from, from + size) };
  }

  function buildPager(pages, page) {
    if (pages <= 1) return "";
    var h = '<div class="g-pager">';
    var first = page <= 0;
    var prev = page <= 0;
    var next = page >= pages - 1;
    var last = page >= pages - 1;
    h += '<button class="pg-btn pg-first' + (first ? " disabled" : "") + '" data-p="0"' +
      (first ? " disabled aria-disabled=\"true\"" : "") + ' aria-label="首页">«</button>';
    h += '<button class="pg-btn pg-prev' + (prev ? " disabled" : "") + '" data-p="' + (page - 1) +
      '"' + (prev ? " disabled aria-disabled=\"true\"" : "") + ' aria-label="上一页">‹</button>';
    pagerNums(pages, page).forEach(function (n) {
      h += '<button class="pg-btn pg-num' + (n - 1 === page ? " on" : "") +
        '" data-p="' + (n - 1) + '"' + (n - 1 === page ? ' aria-current="page"' : "") +
        ">" + n + "</button>";
    });
    h += '<button class="pg-btn pg-next' + (next ? " disabled" : "") + '" data-p="' + (page + 1) +
      '"' + (next ? " disabled aria-disabled=\"true\"" : "") + ' aria-label="下一页">›</button>';
    h += '<button class="pg-btn pg-last' + (last ? " disabled" : "") + '" data-p="' + (pages - 1) +
      '"' + (last ? " disabled aria-disabled=\"true\"" : "") + ' aria-label="尾页">»</button>';
    h += '<span class="pg-jump"><input class="pg-input" type="number" min="1" max="' + pages +
      '" placeholder="跳至" aria-label="跳转到页码"><button class="pg-go" type="button">跳转</button>' +
      '<span class="pg-total">共 ' + pages + " 页</span></span>";
    return h + "</div>";
  }

  function bindPagerActions(listEl, pages, c, t, apply) {
    listEl.querySelectorAll(".pg-btn").forEach(function (b) {
      b.onclick = function () {
        if (b.classList.contains("disabled")) return;
        var p = Number(b.getAttribute("data-p"));
        apply(c, t, p);
        syncListQuery(c, t, String(p));
        try { listEl.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (err) {}
      };
    });
    var jinput = listEl.querySelector(".pg-input");
    var jbtn = listEl.querySelector(".pg-go");
    if (jinput && jbtn) {
      var go = function () {
        var v = parseInt(jinput.value, 10);
        if (!v || v < 1) v = 1;
        if (v > pages) v = pages;
        apply(c, t, v - 1);
        syncListQuery(c, t, String(v - 1));
        try { listEl.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (err) {}
      };
      jbtn.onclick = go;
      jinput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") { e.preventDefault(); go(); }
      });
    }
  }

  function bindPostTabs(root, params0) {    var listEl = root.querySelector("#g-list");
    var barEl = root.querySelector("#g-tabs");
    if (!listEl || !barEl) return;

    var params = params0 || new URLSearchParams(location.search);
    var startCat = params.get("cat") || "全部";
    var startTag = params.get("tag") || "";
    var PER = 12; // 每页篇数

    function apply(c, t, page) {
      page = page || 0;
      var list = orderedPosts().filter(function (p) {
        var okCat = !c || c === "全部" || p.cat === c;
        var okTag = !t || (p.tags || []).indexOf(t) !== -1;
        return okCat && okTag;
      });
      var paged = pageSlice(list, page, PER);
      var pages = paged.pages;
      if (page >= pages) {
        page = pages - 1;
        paged = pageSlice(list, page, PER);
      }
      var slice = paged.slice;
      var feature = "";
      var flow = slice;
      /* 首页第一页、没开分类或标签筛选时，置顶几篇单独排成一组；
         翻页、点分类之后回到原来的等权列表。 */
      if (page === 0 && (!c || c === "全部") && !t) {
        var pins = slice.filter(function (q) { return q.pinned; }).slice(0, 4);
        if (pins.length) {
          feature = featureBlockHtml(pins);
          var used = {};
          pins.forEach(function (q) { used[q.id] = 1; });
          flow = slice.filter(function (q) { return !used[q.id]; });
        }
      }
      listEl.innerHTML = feature + (flow.length
        ? flow.map(glassPostH).join("")
        : (feature ? "" : '<div class="g-empty">这里还没有文章</div>')) + buildPager(pages, page);
      Array.prototype.forEach.call(barEl.querySelectorAll(".g-tab[data-cat]"), function (b) {
        b.setAttribute("aria-pressed", String(!t && b.getAttribute("data-cat") === c));
      });
      bindPagerActions(listEl, pages, c, t, apply);
    }

    barEl.addEventListener("click", function (e) {
      var b = e.target.closest(".g-tab[data-cat]");
      if (!b) return;
      var c = b.getAttribute("data-cat");
      apply(c, "", 0);
      // 地址栏跟上分类：返回时才能带着它回来（不触发路由，只改地址）
      // 文件名要写死：站点根路径下 location.pathname 是 "/"，split 出来是空串，
      // 拼出来的 "/#/home" 刷新后既没有 ?cat= 也定位不到首页文件。
      try {
        var q = c && c !== "全部" ? "?cat=" + encodeURIComponent(c) : "";
        history.replaceState(null, "", "/" + q);
      } catch (err) {}
    });

    bindPostTabs.__apply = apply;
    apply(startCat, startTag, 0);
  }

  /* 列表页顶部那一行：多少篇、跨几年、多少字。数字现算，不写死。 */
  function listScaleText() {
    var n = POSTS.length;
    var y0 = "", y1 = "";
    var total = 0;
    POSTS.forEach(function (p) {
      var y = String(p.date || "").slice(0, 4);
      if (y) {
        if (!y0 || y < y0) y0 = y;
        if (!y1 || y > y1) y1 = y;
      }
      total += wordCount(p);
    });
    var span = y0 && y1 ? (y0 === y1 ? y0 : y0 + " 至 " + y1) : "";
    var wan = total ? Math.round(total / 10000) : 0;
    return "<b>" + n + "</b> 篇" +
      (span ? " · " + span : "") +
      (wan ? " · " + wan + " 万字" : "");
  }

  function writingMainHtml() {
    var counts = catCounts();
    var chips =
      '<button class="g-chip" data-cat="全部" aria-pressed="true">全部<span class="count">' +
      POSTS.length +
      "</span></button>";
    Object.keys(counts).forEach(function (c) {
      chips +=
        '<button class="g-chip" data-cat="' + esc(c) + '" aria-pressed="false">' + esc(c) +
        '<span class="count">' + counts[c] + "</span></button>";
    });
    return '<div class="g-filters" id="g-filters">' + chips + "</div>" +
      '<div class="g-list" id="g-list"></div>';
  }

  function glassPostMarkup(p) {
    var chips = (p.tags || [])
      .map(function (t) {
        return '<span style="--tag-h:' + tagHue(t) + '">' + esc(t) + "</span>";
      })
      .join("");
    return (
      '<a class="g-post' + (p.pinned ? " is-pinned" : "") + '" href="/p/' + encodeURIComponent(p.id) + '">' +
      '<div class="top"><span>' + fmtDate(p.date) + "</span>" +
      '<span class="dot"></span><span class="cat">' + esc(p.cat) + "</span>" +
      (p.pinned ? '<span class="pin">置顶</span>' : "") +
      '<span class="dot"></span><span>' + wordCount(p).toLocaleString() + " 字</span>" +
      lenBarHtml(p) + "</div>" +
      "<h2>" + esc(p.title) + "</h2>" +
      '<p class="excerpt">' + esc(p.excerpt) + "</p>" +
      (chips ? '<div class="chips">' + chips + "</div>" : "") +
      "</a>"
    );
  }

  function bindWritingFilters(root) {
    var listEl = root.querySelector("#g-list");
    var barEl = root.querySelector("#g-filters");
    if (!listEl || !barEl) return;

    var PER = 12; // 每页篇数
    // 分类/标签/页码也从 hash 的 query 读：返回列表时分类写在 #/writing?cat=xx 里
    var params = new URLSearchParams(parseHash().qs || "");
    var startCat = params.get("cat") || "全部";
    var startTag = params.get("tag") || "";

    function apply(c, t, page) {
      page = page || 0;
      var list = orderedPosts().filter(function (p) {
        var okCat = !c || c === "全部" || p.cat === c;
        var okTag = !t || (p.tags || []).indexOf(t) !== -1;
        return okCat && okTag;
      });
      var paged = pageSlice(list, page, PER);
      var pages = paged.pages;
      if (page >= pages) {
        page = pages - 1;
        paged = pageSlice(list, page, PER);
      }
      var slice = paged.slice;
      listEl.innerHTML = (slice.length
        ? slice.map(glassPostMarkup).join("")
        : '<div class="g-empty">这里还没有文章</div>') + buildPager(pages, page);
      Array.prototype.forEach.call(barEl.querySelectorAll(".g-chip"), function (b) {
        b.setAttribute("aria-pressed", String(!t && b.getAttribute("data-cat") === c));
      });
      bindPagerActions(listEl, pages, c, t, apply);
    }

    barEl.addEventListener("click", function (e) {
      var b = e.target.closest(".g-chip");
      if (!b) return;
      var c = b.getAttribute("data-cat");
      apply(c, "", 0);
      try {
        var q = c && c !== "全部" ? "?cat=" + encodeURIComponent(c) : "";
        history.replaceState(null, "", "/writing" + q);
      } catch (err) {}
    });

    bindWritingFilters.__apply = apply;
    apply(startCat, startTag, 0);
  }

  /* ---------- 农历库：闲时异步取 ----------
     lunar.js 443KB，全站只有右栏那个小日历用得上，没必要占首屏带宽。
     等空下来再取，取到后重画一次日历；取不到就只显示公历，别处不受影响。
     版本号从 main.js 自己的 src 上抄，这样 bump_version 只管改 HTML 就够。 */
  var _lunarState = 0; // 0 未开始 / 1 加载中 / 2 已就绪

  function lunarUrl() {
    var me = document.currentScript;
    if (!me) {
      var ss = document.getElementsByTagName("script");
      for (var i = ss.length - 1; i >= 0; i--) {
        if (/(^|\/)main\.js/.test(ss[i].src || "")) { me = ss[i]; break; }
      }
    }
    var ver = me && me.src ? (me.src.match(/[?&]v=([0-9a-z]+)/) || [])[1] : "";
    return "assets/js/lunar.js" + (ver ? "?v=" + ver : "");
  }

  function fetchLunar() {
    if (_lunarState || window.Solar) return;
    _lunarState = 1;
    var s = document.createElement("script");
    s.src = lunarUrl();
    s.async = true;
    s.onload = function () {
      _lunarState = 2;
      if (typeof window.__rezeRepaintCal === "function") window.__rezeRepaintCal();
    };
    s.onerror = function () { _lunarState = 0; };
    (document.head || document.documentElement).appendChild(s);
  }

  function scheduleLunar() {
    if ("requestIdleCallback" in window) requestIdleCallback(fetchLunar, { timeout: 2500 });
    else setTimeout(fetchLunar, 1500);
  }

  /* ---------- 右栏小日历：农历 + 节日 + 发文标记，可翻月 ----------
     只用来「看日期」，点日期不改任何数据，也不做日程。 */
  function initMiniCal(right) {
    var box = right && right.querySelector(".g-cal");
    if (!box) return;
    var titleEl = box.querySelector(".g-cal-title");
    var gridEl = box.querySelector(".g-cal-grid");
    var selEl = box.querySelector(".g-cal-sel");
    var btnPrev = box.querySelector(".g-cal-prev");
    var btnNext = box.querySelector(".g-cal-next");
    var btnToday = box.querySelector(".g-cal-today");
    var btnPrevYr = box.querySelector(".g-cal-prevyr");
    var btnNextYr = box.querySelector(".g-cal-nextyr");

    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth();
    // 当前选中的日子（默认今天）。点格子改它，翻月不丢，只是不在当月时不亮。
    var sel = { y: y, m: m, d: today.getDate() };

    function dayInfo(yy, mo, dd) {
      if (!window.Solar) return null;
      try {
        var solar = window.Solar.fromYmd(yy, mo, dd);
        var lunar = solar.getLunar();
        var fest = (solar.getFestivals() || []).concat(lunar.getFestivals() || []);
        var jq = lunar.getJieQi() || "";
        if (jq) fest.unshift(jq);
        var dayCn = lunar.getDayInChinese();   // 初三 / 廿一
        var monCn = lunar.getMonthInChinese();
        return {
          lun: dayCn === "初一" ? monCn + "月" : dayCn,
          fest: fest.length ? String(fest[0]) : ""
        };
      } catch (e) {
        return null;
      }
    }

    function selText() {
      var info = dayInfo(sel.y, sel.m + 1, sel.d);
      var wd = "周" + "日一二三四五六".charAt(new Date(sel.y, sel.m, sel.d).getDay());
      var lun = info ? (info.fest || info.lun) : "";
      return sel.y + " 年 " + (sel.m + 1) + " 月 " + sel.d + " 日 " + wd +
        (lun ? " · 农历 " + lun : "");
    }

    function paint() {
      if (titleEl) titleEl.textContent = y + " 年 " + (m + 1) + " 月";
      var firstDow = new Date(y, m, 1).getDay();
      var days = new Date(y, m + 1, 0).getDate();
      var isNow = today.getFullYear() === y && today.getMonth() === m;

      var html = ["日", "一", "二", "三", "四", "五", "六"]
        .map(function (w) { return "<span>" + w + "</span>"; })
        .join("");
      for (var i = 0; i < firstDow; i++) html += '<b class="mute"></b>';
      for (var dd = 1; dd <= days; dd++) {
        var info = dayInfo(y, m + 1, dd);
        var sub = info ? (info.fest || info.lun) : "";
        var isFest = !!(info && info.fest);
        var cls = [];
        if (isNow && dd === today.getDate()) cls.push("today");
        if (sel.y === y && sel.m === m && sel.d === dd) cls.push("selected");
        html +=
          '<b class="' + cls.join(" ") + '" data-d="' + dd + '">' +
          "<em>" + dd + "</em>" +
          (sub ? '<i class="g-cal-sub' + (isFest ? " is-fest" : "") + '">' + esc(sub) + "</i>" : "") +
          "</b>";
      }
      if (gridEl) gridEl.innerHTML = html;
      if (selEl) selEl.textContent = selText();
    }

    if (btnPrev) btnPrev.onclick = function () { m--; if (m < 0) { m = 11; y--; } paint(); };
    if (btnNext) btnNext.onclick = function () { m++; if (m > 11) { m = 0; y++; } paint(); };
    if (btnPrevYr) btnPrevYr.onclick = function () { y--; paint(); };
    if (btnNextYr) btnNextYr.onclick = function () { y++; paint(); };
    if (btnToday) btnToday.onclick = function () {
      var t = new Date();
      y = t.getFullYear();
      m = t.getMonth();
      paint();
    };
    if (gridEl) gridEl.addEventListener("click", function (e) {
      var cell = e.target.closest ? e.target.closest("b[data-d]") : null;
      if (!cell) return;
      var dd = parseInt(cell.getAttribute("data-d"), 10);
      if (!dd) return;
      sel = { y: y, m: m, d: dd };
      paint();
    });
    paint();

    // 农历库闲时再取，取到后回调这里重画一次
    window.__rezeRepaintCal = paint;
    scheduleLunar();
  }

  /* 站上自留的句子：后台整存 settings 会整块覆盖 SITE，这些句子每次读取时并回去。
     诗笺每条带出处，欢迎页沿用原来的无署名短句，取的都为公版原句。 */
  var EXTRA_LINES = [
    "山高月小，水落石出。",
    "此心安处是吾乡。",
    "大漠孤烟直，长河落日圆。",
    "悟已往之不谏，知来者之可追。",
    "岁寒，然后知松柏之后凋也。",
    "路漫漫其修远兮，吾将上下而求索。",
    "清明前后，种瓜点豆。",
    "良言一句三冬暖，恶语伤人六月寒。",
    "一株是枣树，还有一株也是枣树。",
    "不要人夸好颜色，只留清气满乾坤。",
    "七転び八起き。",
    "花より団子。",
    "明日は明日の風が吹く。",
    "Carpe diem.",
    "Memento mori.",
    "Veni, vidi, vici.",
    "Ars longa, vita brevis.",
    "Festina lente.",
    "Übung macht den Meister.",
    "Chi va piano, va sano e va lontano."
  ];
  var EXTRA_POEMS = [
    {"t": "蒹葭苍苍，白露为霜。\n所谓伊人，在水一方。", "by": "《诗经·秦风·蒹葭》"},
    {"t": "彼采葛兮，一日不见，\n如三月兮。", "by": "《诗经·王风·采葛》"},
    {"t": "袅袅兮秋风，\n洞庭波兮木叶下。", "by": "屈原《九歌·湘夫人》"},
    {"t": "敕勒川，阴山下。\n天似穹庐，笼盖四野。\n天苍苍，野茫茫，风吹草低见牛羊。", "by": "北朝民歌《敕勒歌》"},
    {"t": "万里赴戎机，关山度若飞。\n朔气传金柝，寒光照铁衣。", "by": "北朝民歌《木兰诗》"},
    {"t": "对酒当歌，人生几何！\n譬如朝露，去日苦多。", "by": "汉·曹操《短歌行》"},
    {"t": "子在川上曰：\n逝者如斯夫，不舍昼夜。", "by": "《论语·子罕》"},
    {"t": "北冥有鱼，其名为鲲。\n鲲之大，不知其几千里也。", "by": "《庄子·逍遥游》"},
    {"t": "谢太傅寒雪日内集，与儿女讲论文义。\n俄而雪骤，公欣然曰：白雪纷纷何所似？\n兄子胡儿曰：撒盐空中差可拟。\n兄女曰：未若柳絮因风起。", "by": "南朝宋·刘义庆《世说新语·言语》"},
    {"t": "落霞与孤鹜齐飞，\n秋水共长天一色。", "by": "唐·王勃《滕王阁序》"},
    {"t": "春眠不觉晓，处处闻啼鸟。\n夜来风雨声，花落知多少。", "by": "唐·孟浩然《春晓》"},
    {"t": "行到水穷处，坐看云起时。\n偶然值林叟，谈笑无还期。", "by": "唐·王维《终南别业》"},
    {"t": "花间一壶酒，独酌无相亲。\n举杯邀明月，对影成三人。", "by": "唐·李白《月下独酌·其一》"},
    {"t": "会当凌绝顶，\n一览众山小。", "by": "唐·杜甫《望岳》"},
    {"t": "离离原上草，一岁一枯荣。\n野火烧不尽，春风吹又生。", "by": "唐·白居易《赋得古原草送别》"},
    {"t": "沉舟侧畔千帆过，\n病树前头万木春。", "by": "唐·刘禹锡《酬乐天扬州初逢席上见赠》"},
    {"t": "沧海月明珠有泪，\n蓝田日暖玉生烟。", "by": "唐·李商隐《锦瑟》"},
    {"t": "元丰六年十月十二日夜，解衣欲睡，月色入户，欣然起行。\n庭下如积水空明，水中藻、荇交横，盖竹柏影也。\n何夜无月？何处无竹柏？但少闲人如吾两人者耳。", "by": "宋·苏轼《记承天寺夜游》"},
    {"t": "山高月小，水落石出。\n曾日月之几何，而江山不可复识矣。", "by": "宋·苏轼《后赤壁赋》"},
    {"t": "两情若是久长时，\n又岂在朝朝暮暮。", "by": "宋·秦观《鹊桥仙·纤云弄巧》"},
    {"t": "二十四桥仍在，\n波心荡、冷月无声。", "by": "宋·姜夔《扬州慢·淮左名都》"},
    {"t": "自送别，心难舍，\n一点相思几时绝？", "by": "元·关汉卿《四块玉·别情》"},
    {"t": "孤村落日残霞，轻烟老树寒鸦，一点飞鸿影下。\n青山绿水，白草红叶黄花。", "by": "元·白朴《天净沙·秋》"},
    {"t": "宠辱不惊，闲看庭前花开花落；\n去留无意，漫随天外云卷云舒。", "by": "明·洪应明《菜根谭》"},
    {"t": "浩荡离愁白日斜，吟鞭东指即天涯。\n落红不是无情物，化作春泥更护花。", "by": "清·龚自珍《己亥杂诗·其五》"},
    {"t": "一九二九不出手，三九四九冰上走。\n五九六九沿河看柳，七九河开，八九燕来。\n九九加一九，耕牛遍地走。", "by": "数九歌（北方民谣）"},
    {"t": "良言一句三冬暖，\n恶语伤人六月寒。", "by": "《增广贤文》"},
    {"t": "在我的后园，可以看见墙外有两株树，\n一株是枣树，还有一株也是枣树。", "by": "鲁迅《秋夜》"}
  ];

  function siteLines() {
    var base = ((SITE.splash && SITE.splash.lines) || []).filter(Boolean);
    var seen = {}, out = [];
    base.concat(EXTRA_LINES).forEach(function (x) {
      if (!x || seen[x]) return;
      seen[x] = 1;
      out.push(x);
    });
    return out;
  }

  function sitePoems() {
    var base = (SITE.poems && SITE.poems.length)
      ? SITE.poems
      : (SITE.notice ? [SITE.notice] : []);
    var seen = {}, out = [];
    base.concat(EXTRA_POEMS).forEach(function (x) {
      var t = (typeof x === "string") ? x : ((x && x.t) || "");
      if (!t || seen[t]) return;
      seen[t] = 1;
      out.push(x);
    });
    return out;
  }

  /* ---------- 诗笺：点击换一首 ----------
     原来每次进页面随机抽一条，抽到哪首全靠运气，想换也没办法。
     现在固定成一组，点卡片就往下顺一条，淡出淡入接上。 */
  var _poemBank = null, _poemSig = "", _poemIdx = 0;

  function poemBank() {
    var src = sitePoems();
    var first = src.length ? (typeof src[0] === "string" ? src[0] : (src[0] && src[0].t) || "") : "";
    var sig = src.length + "|" + first;
    if (_poemBank && _poemSig === sig) return _poemBank;
    _poemSig = sig;
    _poemBank = src.map(function (x) {
      if (typeof x === "string") return { t: x, by: "" };
      return { t: (x && x.t) || "", by: (x && x.by) || "" };
    }).filter(function (x) { return x.t; });
    _poemIdx = _poemBank.length ? Math.floor(Math.random() * _poemBank.length) : 0;
    return _poemBank;
  }

  function poemInner(it) {
    if (!it) return "";
    return esc(it.t).replace(/\n/g, "<br>") +
      (it.by ? '<span class="sig">—— ' + esc(it.by) + "</span>" : "");
  }

  function poemCardHtml() {
    var bank = poemBank();
    if (!bank.length) return "";
    var canSwap = bank.length > 1;
    return (
      '<div class="g-card g-poem"><div class="g-card-head"><span class="t">' + ICONS.poem + "诗笺</span></div>" +
      '<div class="g-notice' + (canSwap ? " gn-swap" : "") + '"' +
      (canSwap ? ' role="button" tabindex="0" title="换一首"' : "") +
      '><div class="gn-body">' + poemInner(bank[_poemIdx]) + "</div></div></div>"
    );
  }

  function swapPoem() {
    var bank = _poemBank;
    if (!bank || bank.length < 2) return;
    var box = document.querySelector(".g-notice.gn-swap");
    if (!box || box.__busy) return;
    var body = box.querySelector(".gn-body");
    if (!body) return;
    box.__busy = true;
    body.style.transition = "opacity .18s ease, transform .18s ease";
    body.style.opacity = "0";
    body.style.transform = "translateY(-6px)";
    setTimeout(function () {
      _poemIdx = (_poemIdx + 1) % bank.length;
      body.innerHTML = poemInner(bank[_poemIdx]);
      body.style.transition = "none";
      body.style.transform = "translateY(9px)";
      void body.offsetHeight;
      body.style.transition = "opacity .3s ease, transform .34s cubic-bezier(.22,.7,.3,1)";
      body.style.opacity = "1";
      body.style.transform = "translateY(0)";
      setTimeout(function () { box.__busy = false; }, 340);
    }, 190);
  }

  function mountApp() {
    var left = $("#app-left");
    var main = $("#app-main");
    var right = $("#app-right");
    if (!left || !main || !right) return;

    var bgEl = $("#page-bg");
    var bgSrc = SITE.homeBg || (SITE.splash && SITE.splash.bg) || "";
    if (bgEl && bgSrc) {
      bgEl.style.backgroundImage = 'url("' + String(bgSrc).replace(/"/g, "%22") + '")';
    }
    // 多张背景时以列表为准（外观设置里可切换、会记住）
    initPageBg();

    var cc = catCounts();
    var tc = tagCounts();
    var curTrack = trackAt(playerIdx);
    var tagNames = Object.keys(tc).sort(function (a, b) {
      return tc[b] - tc[a];
    });

    /* ---- 左栏 ---- */
    /* 头像按皮肤分流：纸样用静止帧，淡紫与极简留着 GIF。
       切皮肤时由 syncAvatar() 换 src，这里不重渲染。 */
    var avatarHtml = SITE.avatar
      ? '<img data-av src="' + esc(avatarSrc()) + '" alt="' + esc(SITE.name) + '">'
      : '<span class="ph">' + esc((SITE.name || "蕾").charAt(0)) + "</span>";

    var socialHtml = (SITE.social || [])
      .map(function (s) {
        return (
          '<a href="' + esc(s.url) + '" target="_blank" rel="noopener" aria-label="' +
          esc(s.name) + '" title="' + esc(s.name) + '">' +
          (ICONS[s.icon] || ICONS.github) + "</a>"
        );
      })
      .join("");

    var catsHtml = Object.keys(cc)
      .map(function (c) {
        return (
          '<a class="g-cat" href="/writing?cat=' + encodeURIComponent(c) + '">' +
          ICONS.folder + esc(c) + '<span class="n">' + cc[c] + "</span></a>"
        );
      })
      .join("");

    // 首页标签云只放大类，不放人名与生活细目（余华、吃、爱情这类）。
    // 分类是粗分，标签细分：大类名若同时也是一个分类名，点进来会落空，所以只放
    // 「大类里确实有细分、且不属于同一名称分类」的那几个。
    var FIXED_TAGS = ["技术", "文学", "历史", "社会", "科幻", "诗词", "乡土", "语言", "影像"];
    var tagsHtml = FIXED_TAGS.filter(function (ft) { return tc[ft]; })
      .map(function (t) {
        return (
          '<a class="g-tag" href="/writing?tag=' + encodeURIComponent(t) +
          '" style="--tag-h:' + tagHue(t) + '">' + esc(t) + "</a>"
        );
      })
      .join("");

    var noticeCard = poemCardHtml();

    left.innerHTML =
      '<div class="g-card g-profile">' +
      '<div class="g-avatar">' + avatarHtml + "</div>" +
      '<p class="g-bio">' + esc(bioText()) + "</p>" +
      '<div class="g-social">' + socialHtml + "</div>" +
      '<div class="g-stats">' +
      "<div><span class='n'>" + POSTS.length + "</span><span class='k'>文章</span></div>" +
      "<div><span class='n'>" + tagNames.length + "</span><span class='k'>标签</span></div>" +
      "<div><span class='n'>" + Object.keys(cc).length + "</span><span class='k'>分类</span></div>" +
      "</div>" +
      "</div>" +
      noticeCard +
      '<div class="g-card g-player">' +
      '<div class="ply-head">音乐播放器' +
      '<button class="ply-list-btn" id="p-list" type="button" aria-label="曲目列表" data-tip="曲目列表">' +
      ICONS.note +
      "</button></div>" +
      // 封面 + 歌名歌手
      '<div class="ply">' +
      '<div class="ply-cover" id="p-cover">' +
      (curTrack.cover
        ? '<img src="' + esc(curTrack.cover) + '" alt="">'
        : '<span class="ph">♪</span>') +
      "</div>" +
      '<div class="ply-info"><b id="p-title">' +
      esc(curTrack.title || "未知曲目") +
      '</b><span id="p-artist">' +
      esc(curTrack.artist || "") +
      "</span></div>" +
      "</div>" +
      // 音量行：喇叭 + 滑块 + 律动条 + 悬浮播放器 / 悬浮歌词
      '<div class="ply-vol">' +
      '<button id="p-mute" data-tip="静音">' + ICONS.volume + "</button>" +
      '<input type="range" id="p-vol" min="0" max="100" value="35" aria-label="音量">' +
      '<span class="ply-eq" id="p-eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span>' +
      '<button id="p-float" data-tip="悬浮播放器">' + ICONS.disc + "</button>" +
      '<button id="p-flylric" data-tip="悬浮歌词">' + ICONS.note + "</button>" +
      "</div>" +
      // 进度：时间在两端
      '<div class="ply-prog">' +
      '<span id="p-cur">0:00</span>' +
      '<div class="ply-bar" id="p-bar"><i id="p-fill"></i></div>' +
      '<span id="p-dur">0:00</span>' +
      "</div>" +
      // 控制行：中间白色大圆
      '<div class="ply-ctrl">' +
      '<button id="p-loop" data-tip="循环播放">' + ICONS.loop + "</button>" +
      '<button id="p-back" data-tip="上一首">' + ICONS.skipBack + "</button>" +
      '<button class="ply-play" id="p-play" data-tip="播放 / 暂停"><span class="ply-play-ico">' +
      ICONS.play + "</span></button>" +
      '<button id="p-fwd" data-tip="下一首">' + ICONS.skipFwd + "</button>" +
      '<button id="p-lyricbox" data-tip="播放器歌词">' + ICONS.lyrics + "</button>" +
      "</div>" +
      // 歌词区（默认收起，点歌词按钮展开）
      '<div class="ply-lyrics" id="p-lyrics"></div>' +
      // 曲目列表（点右上角列表按钮展开）
      '<div class="ply-tracks" id="p-tracks"></div>' +
      "</div>" +
      '<div class="g-card">' +
      '<div class="g-card-head"><span class="t">' + ICONS.folder + "分类</span></div>" +
      '<div class="g-cats">' + catsHtml +
      '<a class="g-cat-foot" href="/writing">查看全部文章 →</a></div>' +
      "</div>" +
      '<div class="g-card">' +
      '<div class="g-card-head"><span class="t">' + ICONS.tag + "标签</span></div>" +
      '<div class="g-tagwrap">' + tagsHtml + "</div>" +
      "</div>";

    /* ---- 右栏 ---- */
    /* 右栏「动态」：直接是最近四篇，点哪条进哪篇 */
    var feed = byDateList()
      .slice(0, 4)
      .map(function (p) {
        return (
          '<li><a class="g-feed-a" href="/p/' +
          encodeURIComponent(p.id) + '">' +
          "<time>" + fmtDate(p.date) + "</time>" +
          "<span>" + esc((p.excerpt || "").slice(0, 42)) + "…</span></a></li>"
        );
      })
      .join("");

    var now = new Date();

    var totalWords = POSTS.reduce(function (s, p) {
      return s + wordCount(p);
    }, 0);
    var firstDate = byDateList().length ? byDateList()[byDateList().length - 1].date : "2026-01-01";
    var runDays = Math.max(
      1,
      Math.round((Date.now() - new Date(firstDate + "T00:00:00").getTime()) / 86400000)
    );
    var statCard =
      '<div class="g-card"><div class="g-card-head"><span class="t">' + ICONS.activity +
      "统计</span></div><div class=\"g-stat\">" +
      '<div><span class="k">文章</span><span class="n">' + POSTS.length + "</span></div>" +
      '<div><span class="k">分类</span><span class="n">' + Object.keys(cc).length + "</span></div>" +
      '<div><span class="k">标签</span><span class="n">' + tagNames.length + "</span></div>" +
      '<div><span class="k">总字数</span><span class="n">' + totalWords.toLocaleString() + "</span></div>" +
      '<div><span class="k">运行天数</span><span class="n">' + runDays + "</span></div>" +
      '<div><span class="k">最近更新</span><span class="n">' + fmtDate(byDateList()[0].date) + "</span></div>" +
      "</div></div>";

    right.innerHTML =
      '<div class="g-card g-card-mfeed">' +
      '<div class="g-card-head"><span class="t">' + ICONS.clock +
      '站务</span><a class="more" href="/moments">更多</a></div>' +
      '<ul class="g-feed">' + feed + "</ul></div>" +
      statCard +
      '<div class="g-card g-wx-mini">' +
      '<div class="g-card-head"><span class="t">' + ICONS.sun + "天气</span>" +
      '<a class="more" href="/weather">更多</a></div>' +
      '<div class="wxm-body" id="wx-mini-body"><div class="wxm-fail">正在获取…</div></div></div>' +
      '<div class="g-card g-cal-card">' +
      '<div class="g-card-head"><span class="t">' + ICONS.cal + "日历</span>" +
      '<div class="g-cal-nav">' +
      '<button type="button" class="g-cal-prevyr" aria-label="上一年">«</button>' +
      '<button type="button" class="g-cal-prev" aria-label="上个月">‹</button>' +
      '<button type="button" class="g-cal-today">今</button>' +
      '<button type="button" class="g-cal-next" aria-label="下个月">›</button>' +
      '<button type="button" class="g-cal-nextyr" aria-label="下一年">»</button>' +
      "</div></div>" +
      '<div class="g-cal"><div class="g-cal-title"></div>' +
      '<div class="g-cal-grid"></div>' +
      '<div class="g-cal-sel"></div></div></div>' +
      '<div class="g-card">' +
      '<div class="g-card-head"><span class="t">' + ICONS.info + "站点信息</span></div>" +
      '<div class="g-site"><dl>' +
      "<dt>搭建方式</dt><dd>手写 HTML / CSS</dd>" +
      "<dt>托管</dt><dd>Cloudflare Pages</dd>" +
      "<dt>博客版本</dt><dd>v1.0</dd>" +
      "<dt>内容许可</dt><dd>CC BY-NC-SA 4.0</dd>" +
      "<dt>始于</dt><dd>" + (SITE.startYear || 2026) + "</dd>" +
      "</dl></div></div>";

    initMiniCal(right);
    renderRecModules(right);
    mountTodayCard(right);

    // 右栏天气小卡：独立订阅，切城市时右栏也跟着变
    if (window.WX) {
      var wxBox = $("#wx-mini-body");
      if (wxBox) window.WX.mountMini(wxBox);
    }

    // 中栏在右栏之后渲染，文章页才能把「文章目录」插到右栏里而不被覆盖
    renderMain();

    /* ---- 播放器绑定 ---- */
    var audio = bgmAudio;
    var playBtn = $("#p-play");
    var volEl = $("#p-vol");
    var muteBtn = $("#p-mute");
    var loopBtn = $("#p-loop");
    var coverEl = $("#p-cover");
    var bar = $("#p-bar");
    var fill = $("#p-fill");
    var cur = $("#p-cur");
    var dur = $("#p-dur");

    function fmtTime(s) {
      if (!isFinite(s) || s < 0) s = 0;
      var m = Math.floor(s / 60);
      var ss = Math.floor(s % 60);
      return m + ":" + (ss < 10 ? "0" : "") + ss;
    }
    var eqEl = $("#p-eq");
    function paintBtn() {
      var playing = audio && !audio.paused;
      var icon = playing ? ICONS.pause : ICONS.play;
      /* 只换图标，不重写整个按钮：按钮本身还要当那个盒子的框用 */
      if (playBtn) {
        var icoBox = playBtn.querySelector(".ply-play-ico");
        if (icoBox) icoBox.innerHTML = icon;
        else playBtn.innerHTML = icon;
      }
      if (coverEl) coverEl.classList.toggle("spinning", !!playing);
      if (eqEl) eqEl.classList.toggle("playing", !!playing);
    }
    function tick() {
      if (!audio) return;
      var d = audio.duration || 0;
      var c = audio.currentTime || 0;
      if (fill) fill.style.width = d ? (c / d) * 100 + "%" : "0%";
      if (cur) cur.textContent = fmtTime(c);
      if (dur && d) dur.textContent = fmtTime(d);
    }
    if (audio) {
      audio.addEventListener("timeupdate", function () {
        tick();
        syncLyric();
      });
      audio.addEventListener("loadedmetadata", tick);
      audio.addEventListener("play", paintBtn);
      audio.addEventListener("pause", paintBtn);
    }
    function togglePlay() {
      if (!audio) return;
      if (audio.paused) playAudio();
      else {
        audioWantPlay = false;
        audio.pause();
      }
    }
    if (playBtn) playBtn.addEventListener("click", togglePlay);
    if (bar) {
      var scrubbing = false;
      function seekTo(clientX) {
        if (!audio || !isFinite(audio.duration) || audio.duration <= 0) return;
        var r = bar.getBoundingClientRect();
        if (!r.width) return;
        var ratio = (clientX - r.left) / r.width;
        ratio = Math.min(1, Math.max(0, ratio));
        audio.currentTime = ratio * audio.duration;
        tick();
      }
      function startScrub(e) {
        scrubbing = true;
        bar.classList.add("dragging");
        e.preventDefault();
        seekTo(e.clientX);
      }
      function moveScrub(e) {
        if (!scrubbing) return;
        e.preventDefault();
        seekTo(e.clientX);
      }
      function endScrub() {
        if (!scrubbing) return;
        scrubbing = false;
        bar.classList.remove("dragging");
        document.removeEventListener("pointermove", moveScrub);
        document.removeEventListener("pointerup", endScrub);
        document.removeEventListener("pointercancel", endScrub);
      }
      bar.addEventListener("pointerdown", function (e) {
        startScrub(e);
        // 监听挂到 document：指针拖出进度条范围也不会断
        document.addEventListener("pointermove", moveScrub);
        document.addEventListener("pointerup", endScrub);
        document.addEventListener("pointercancel", endScrub);
      });
      // click 兜底（与拖动共用 seekTo，幂等）：桌面点击直接定位
      bar.addEventListener("click", function (e) {
        if (!scrubbing) seekTo(e.clientX);
      });
    }
    var backBtn = $("#p-back");
    var fwdBtn = $("#p-fwd");
    if (backBtn)
      backBtn.addEventListener("click", function () {
        loadTrack(playerIdx - 1, true);
      });
    if (fwdBtn)
      fwdBtn.addEventListener("click", function () {
        loadTrack(nextTrackIndex(1), true);
      });

    // 音量 / 静音 / 循环
    function syncMuteIcon() {
      if (!muteBtn || !audio) return;
      muteBtn.innerHTML =
        audio.muted || audio.volume === 0 ? ICONS.volumeOff : ICONS.volume;
    }
    if (volEl && audio) {
      volEl.value = String(Math.round(audio.volume * 100));
      volEl.addEventListener("input", function () {
        audio.volume = Number(volEl.value) / 100;
        if (audio.volume > 0) audio.muted = false;
        syncMuteIcon();
      });
    }
    if (muteBtn && audio) {
      muteBtn.addEventListener("click", function () {
        audio.muted = !audio.muted;
        syncMuteIcon();
      });
    }
    /* 播放模式：顺序循环 → 单曲循环 → 随机，点一下换一个 */
    var MODE_ORDER = ["list", "one", "shuffle"];
    var MODE_TIP = { list: "顺序循环", one: "单曲循环", shuffle: "随机播放" };
    function paintMode() {
      if (!audio) return;
      audio.loop = playMode === "one";
      if (loopBtn) {
        // 角标必须是独立元素：提示气泡也用 ::after，两个挤在一起会把气泡撑成一个小黑块
        loopBtn.innerHTML =
          (playMode === "shuffle" ? ICONS.shuffle : ICONS.loop) +
          '<i class="ply-mode-badge" aria-hidden="true">1</i>';
        loopBtn.classList.toggle("on", playMode !== "list");
        loopBtn.setAttribute("data-mode", playMode);
        loopBtn.setAttribute("data-tip", MODE_TIP[playMode]);
      }
      try {
        localStorage.setItem("reze-play-mode", playMode);
      } catch (e) {}
    }
    if (loopBtn && audio) {
      try {
        var savedMode = localStorage.getItem("reze-play-mode");
        if (savedMode && MODE_ORDER.indexOf(savedMode) >= 0) playMode = savedMode;
      } catch (e) {}
      loopBtn.addEventListener("click", function () {
        var i = MODE_ORDER.indexOf(playMode);
        playMode = MODE_ORDER[(i + 1) % MODE_ORDER.length];
        paintMode();
      });
    }
    paintMode();
    syncMuteIcon();

    // 歌词：解析一次，供「播放器内歌词」和「悬浮单行歌词条」共用
    var lbBtn = $("#p-lyricbox"); // 播放器内歌词
    var flyBtn = $("#p-flylric"); // 悬浮单行歌词
    var floatBtn = $("#p-float"); // 悬浮播放器
    // 上一次听到哪首就按哪首取歌词，别一律拿第一首的（不然刷新后歌词对不上）
    var lyricLines = parseLrc(curTrack.lyrics || SITE.lyrics || "");
    curLyricLines = lyricLines;
    var lastLyric = -2;

    // 播放器内滚动歌词
    var lyricBox = $("#p-lyrics");
    function renderLyrics(box, lines) {
      if (!box) return;
      if (!lines.length) {
        box.innerHTML = '<p class="empty">暂无歌词</p>';
        return;
      }
      box.innerHTML = lines
        .map(function (l, i) {
          return '<p data-i="' + i + '">' + esc(l.text) + "</p>";
        })
        .join("");
    }
    if (lyricBox) {
      renderLyrics(lyricBox, lyricLines);
      // 默认收起：不再自动展开，点「播放器歌词」按钮才打开
    }

    // 网页正下方中间的「单行悬浮歌词条」（音乐软件风格，默认隐藏，点了才出现）
    var nowBar = document.getElementById("nowLyric");
    if (!nowBar) {
      nowBar = document.createElement("div");
      nowBar.className = "now-lyric";
      nowBar.id = "nowLyric";
      nowBar.setAttribute("aria-hidden", "true");
      var nlPlaceholder = curTrack.title
        ? curTrack.title + (curTrack.artist ? " · " + curTrack.artist : "")
        : "暂无歌词";
      nowBar.innerHTML =
        '<span class="nl-dot">♪</span>' +
        '<span class="nl-text" id="nlText">' + esc(nlPlaceholder) + "</span>";
      document.body.appendChild(nowBar);
    }
    var nlText = nowBar.querySelector("#nlText");

    // 右下角悬浮播放器由 initFloatPlayer() 负责（点顶栏音乐按钮也能叫出来）

    if (lbBtn && lyricBox) {
      lbBtn.addEventListener("click", function () {
        var open = lyricBox.classList.toggle("open");
        lbBtn.classList.toggle("on", open);
        if (open) {
          lastLyric = -2; // 展开后立刻定位到当前句
          syncLyric();
        }
      });
    }
    if (flyBtn) {
      flyBtn.addEventListener("click", function () {
        var open = nowBar.classList.toggle("on");
        flyBtn.classList.toggle("on", open);
        nowBar.setAttribute("aria-hidden", open ? "false" : "true");
        if (open) {
          lastLyric = -2;
          syncLyric();
        }
      });
    }
    if (floatBtn) {
      floatBtn.addEventListener("click", function () {
        toggleFloatPlayer();
      });
    }

    function syncLyric() {
      // 用共享的那份歌词：首页重渲染过的话，各份闭包手里的 lyricLines 会过时
      var lines = curLyricLines;
      if (!lines.length || !audio) return;
      var t = audio.currentTime;
      var idx = -1;
      for (var i = 0; i < lines.length; i++) {
        if (lines[i].t <= t + 0.25) idx = i;
        else break;
      }
      if (idx === lastLyric) return;
      lastLyric = idx;
      // 播放器内滚动歌词
      if (lyricBox) {
        var ps = lyricBox.querySelectorAll("p[data-i]");
        Array.prototype.forEach.call(ps, function (p, i) {
          p.classList.toggle("on", i === idx);
        });
        var curLine = ps[idx];
        if (curLine) {
          lyricBox.scrollTo({
            top: Math.max(
              0,
              curLine.offsetTop - lyricBox.clientHeight / 2 + curLine.offsetHeight / 2
            ),
            behavior: "smooth",
          });
        }
      }
      // 悬浮单行歌词
      if (nlText) {
        if (idx >= 0) {
          nlText.textContent = lines[idx].text;
          nowBar.classList.add("has-line");
        } else {
          // 间奏 / 还没到第一句：显示歌名占位
          var ct2 = trackAt(playerIdx);
          nlText.textContent = ct2.title
            ? ct2.title + (ct2.artist ? " · " + ct2.artist : "")
            : "纯音乐";
          nowBar.classList.remove("has-line");
        }
      }
      // 悬浮播放器里的歌词
      if (idx >= 0) {
        fpPaintLyric(lines[idx].text, true);
      } else {
        var ct3 = trackAt(playerIdx);
        fpPaintLyric(
          "♪ " + (ct3.title || "纯音乐") + (ct3.artist ? " · " + ct3.artist : ""),
          false
        );
      }
    }

    /* ---- 切歌 + 曲目列表 ---- */
    var listBtn = $("#p-list");
    var tracksBox = $("#p-tracks");

    function paintTrackList() {
      if (!tracksBox) return;
      // 歌单没读到，列表按钮不藏：面板里明说状态，别让人以为站上只有一首歌
      if (playlistState === "failed") {
        tracksBox.innerHTML =
          '<div class="ply-loadfail"><span>歌单加载失败</span>' +
          '<button type="button" class="ply-retry" data-retry-playlist>重试</button></div>';
        if (listBtn) listBtn.style.display = "";
        return;
      }
      if (playlistState === "loading") {
        tracksBox.innerHTML =
          '<div class="ply-loadfail"><span>歌单加载中</span></div>';
        if (listBtn) listBtn.style.display = "";
        return;
      }
      if (playerList.length < 2) {
        tracksBox.innerHTML = "";
        if (listBtn) listBtn.style.display = "none";
        return;
      }
      if (listBtn) listBtn.style.display = ""; // 补回来时把之前藏掉的按钮放出来
      tracksBox.innerHTML = playerList
        .map(function (t, i) {
          return (
            '<button type="button" class="ply-track' + (i === playerIdx ? " on" : "") +
            '" data-i="' + i + '">' +
            '<span class="no">' + (i + 1) + "</span>" +
            '<span class="nm">' + esc(t.title || "未知曲目") +
            "<i>" + esc(t.artist || "") + "</i></span>" +
            "</button>"
          );
        })
        .join("");
    }

    function loadTrack(i, autoplay) {
      if (!playerList.length || !audio) return;
      playerIdx = ((i % playerList.length) + playerList.length) % playerList.length;
      var t = playerList[playerIdx];

      // 地址交给线路链去选：这条 CDN 挂了会自动换下一条
      setTrackSrc(t, false);

      var tEl = $("#p-title");
      var aEl = $("#p-artist");
      if (tEl) tEl.textContent = t.title || "未知曲目";
      if (aEl) aEl.textContent = t.artist || "";
      if (coverEl) {
        coverEl.innerHTML = t.cover
          ? '<img src="' + esc(t.cover) + '" alt="">'
          : '<span class="ph">♪</span>';
      }

      // 歌词换成这一首的
      lyricLines = parseLrc(t.lyrics || "");
      curLyricLines = lyricLines;
      if (lyricBox) renderLyrics(lyricBox, lyricLines);
      lastLyric = -2;

      // 悬浮播放器同步
      fpPaintTrack(t);
      fpPaintLyric("♪ " + (t.title || "") + (t.artist ? " · " + t.artist : ""), false);

      paintTrackList();
      tick();
      if (autoplay) playAudio();
      try {
        localStorage.setItem("reze-track", String(playerIdx));
      } catch (e) {}
    }

    if (listBtn && tracksBox) {
      listBtn.addEventListener("click", function () {
        var open = tracksBox.classList.toggle("open");
        listBtn.classList.toggle("on", open);
      });
    }
    if (tracksBox) {
      tracksBox.addEventListener("click", function (e) {
        if (e.target.closest("[data-retry-playlist]")) {
          if (retryPlaylistHook) retryPlaylistHook();
          return;
        }
        var b = e.target.closest(".ply-track");
        if (!b) return;
        loadTrack(Number(b.getAttribute("data-i")), true);
        tracksBox.classList.remove("open");
        if (listBtn) listBtn.classList.remove("on");
      });
      // 列表滚到顶/底就停住，别把滚动传给整个页面
      // （overscroll-behavior 在个别浏览器对滚轮无效，这里兜一道）
      tracksBox.addEventListener(
        "wheel",
        function (e) {
          if (!tracksBox.classList.contains("open")) return;
          var top = tracksBox.scrollTop <= 0;
          var bottom =
            tracksBox.scrollTop + tracksBox.clientHeight >= tracksBox.scrollHeight - 1;
          if ((e.deltaY < 0 && top) || (e.deltaY > 0 && bottom)) {
            e.preventDefault();
          }
        },
        { passive: false }
      );
      // 触屏：到边界时同样拦住
      var touchY = 0;
      tracksBox.addEventListener(
        "touchstart",
        function (e) {
          touchY = e.touches[0].clientY;
        },
        { passive: true }
      );
      tracksBox.addEventListener(
        "touchmove",
        function (e) {
          if (!tracksBox.classList.contains("open")) return;
          var dy = touchY - e.touches[0].clientY; // >0 往下翻
          var top = tracksBox.scrollTop <= 0;
          var bottom =
            tracksBox.scrollTop + tracksBox.clientHeight >= tracksBox.scrollHeight - 1;
          if ((dy < 0 && top) || (dy > 0 && bottom)) e.preventDefault();
        },
        { passive: false }
      );
    }
    paintTrackList();
    // 歌单后台补回来后由 initMusic 调用：重画列表，必要时同步当前曲目
    refreshTrackList = function (syncCurrent) {
      paintTrackList();
      if (syncCurrent && playerList.length) loadTrack(playerIdx, false);
    };

    // 播完自动切下一首（单曲循环由 audio.loop 自己处理，不会走到这里）
    if (audio) {
      audio.addEventListener("ended", function () {
        if (audio.loop) return;
        loadTrack(nextTrackIndex(1), true);
      });
    }

    tick();
    paintBtn();
    syncLyric(); // 一进来就把第一句点亮，别一片灰
  }



/* ---------- SPA 路由：站内跳转只切中栏，音频持续 ---------- */
/* 时间线正文：单行当一段话，多行按要点列出来（更新记录的样子） */
function tlDescHtml(text) {
  var lines = String(text || "")
    .split("\n")
    .map(function (s) { return s.trim(); })
    .filter(Boolean);
  if (!lines.length) return "";
  if (lines.length === 1) return '<p class="tl-desc">' + esc(lines[0]) + "</p>";
  return (
    '<ul class="tl-desc tl-list">' +
    lines
      .map(function (s) {
        return "<li>" + esc(s.replace(/^[·•\-*]\s*/, "")) + "</li>";
      })
      .join("") +
    "</ul>"
  );
}

/* ---------- 归档：全部文章按年排成一份目录 ----------
   列表页解决「我想找某篇」，归档页解决「我想从头看一遍」。
   只用 POSTS（元数据），正文一个字都不取，所以翻到底也不额外发请求。
   版式是实心目录：一年一个年份头，下面一列日期加标题，不做卡片，
   分隔线只有 1px —— 目的是让七年的厚度能在一次滚动里显出来。 */
function archiveMainHtml() {
  var list = POSTS.slice().sort(function (a, b) {
    return String(b.date || "").localeCompare(String(a.date || ""));
  });
  var years = [];
  var byYear = {};
  list.forEach(function (p) {
    var y = String(p.date || "").slice(0, 4);
    if (!y) return;
    if (!byYear[y]) {
      byYear[y] = [];
      years.push(y);
    }
    byYear[y].push(p);
  });
  years.sort().reverse();

  var jump = years
    .map(function (y) {
      return '<button class="arc-j" type="button" data-y="' + y + '">' + y + "</button>";
    })
    .join("");

  function yearBlock(y) {
    var rows = byYear[y]
      .map(function (p) {
        var d = String(p.date || "");
        var md = d.slice(5, 7).replace(/^0/, "") + "." + d.slice(8, 10);
        return (
          '<a class="arc-row" href="' + postHref(p) + '">' +
          '<span class="arc-d">' + md + "</span>" +
          '<span class="arc-t">' + esc(p.title || "") + "</span>" +
          "</a>"
        );
      })
      .join("");
    return (
      '<section class="arc-year" id="y' + y + '" data-y="' + y + '">' +
      '<h2 class="arc-h"><span class="arc-num">' + y + "</span>" +
      '<span class="arc-cnt">' + byYear[y].length + " 篇</span></h2>" +
      '<div class="arc-rows">' + rows + "</div></section>"
    );
  }

  /* 每个年份收成一个可折叠区块：默认收起，只留「年份 · N 篇」一行；点开才列该年文章。
     2026 一年就有 126 篇，整页直铺会非常长，折叠后首屏只剩年份标题。
     一年超过 ARC_CAP 篇时，先展示前 ARC_CAP 篇，余下放进隐藏容器，由「展开剩余」释放。 */
  var ARC_CAP = 40;
  function rowHtml(p) {
    var d = String(p.date || "");
    var md = d.slice(5, 7).replace(/^0/, "") + "." + d.slice(8, 10);
    return (
      '<a class="arc-row" href="' + postHref(p) + '">' +
      '<span class="arc-d">' + md + "</span>" +
      '<span class="arc-t">' + esc(p.title || "") + "</span>" +
      "</a>"
    );
  }
  function yearBlock(y, open) {
    var arr = byYear[y];
    var total = arr.length;
    var head = arr.slice(0, ARC_CAP).map(rowHtml).join("");
    var rest = "";
    if (total > ARC_CAP) {
      rest =
        '<div class="arc-rest" hidden>' +
        arr.slice(ARC_CAP).map(rowHtml).join("") +
        '</div><button type="button" class="arc-restbtn" data-rest="y' + y + '">展开剩余 ' +
        (total - ARC_CAP) + " 篇</button>";
    }
    return (
      '<details class="arc-year" id="y' + y + '" data-y="' + y + '"' +
      (open ? " open" : "") + ">" +
      '<summary class="arc-summary"><span class="arc-num">' + y + "</span>" +
      '<span class="arc-cnt">' + total + " 篇</span></summary>" +
      '<div class="arc-rows">' + head + rest + "</div></details>"
    );
  }

  var blocks = years.map(function (y) { return yearBlock(y, false); }).join("");

  return (
    '<div class="arc-top"><p class="g-scale">' + listScaleText() +
    ' · <a class="g-archlink" href="/sources">参考源</a></p>' +
    '<div class="arc-jump">' + jump + "</div></div>" +
    '<div class="arc-blocks" id="arc-blocks">' + blocks + "</div>"
  );
}

function bindArchive(root) {
  root.querySelectorAll(".arc-j").forEach(function (b) {
    b.addEventListener("click", function () {
      var y = b.getAttribute("data-y");
      var det = root.querySelector('.arc-year[data-y="' + y + '"]');
      if (det) {
        det.open = true;
        det.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  root.querySelectorAll(".arc-restbtn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var rest = btn.parentElement.querySelector(".arc-rest");
      if (rest) rest.hidden = false;
      btn.remove();
      /* 多出来的行里可能有该年头一条（年份块没展开时条画在第 1 行，
         展开后仍在第 1 行），但总数变了，比例要重算。 */
      if (window.__rezeRedrawHeat) window.__rezeRedrawHeat();
    });
  });
}

/* 时间线先只渲染最近几条，底部「加载更早」再往前翻。
   一页铺 22 条太长，分页又和这个版式不适配。 */
/* ---------- 参考源：按需装载的索引 ----------
   数据有两三百 KB，没必要让首屏为它买单。直接打开 /sources
   时文档里带了数据脚本；从站内点过去，由这里补一次，加载完再渲染。
   资源地址跟 main.js 用同一个 ?v=，改数据跟着升版本就行。 */
function auxAssetUrl(file) {
  var cur = document.querySelector('script[src*="main.js"]');
  var q = cur ? (String(cur.src).match(/[?&]v=[0-9a-z]+/) || [""])[0].replace(/^&/, "?") : "";
  return "assets/js/" + file + q;
}

function loadAuxFiles(list, done) {
  var i = 0;
  function next() {
    if (i >= list.length) { done(); return; }
    var item = list[i++];
    if (item[0] && window[item[0]]) { next(); return; }
    var s = document.createElement("script");
    s.src = auxAssetUrl(item[1]);
    s.onload = s.onerror = function () { next(); };
    document.head.appendChild(s);
  }
  next();
}

function ixRow(id, title, date, tail) {
  var d = String(date || "");
  var md = d ? d.slice(5, 7).replace(/^0/, "") + "." + d.slice(8, 10) : "";
  return '<a class="arc-row" href="/p/' + encodeURIComponent(id) + '">' +
    '<span class="arc-d">' + esc(md) + '</span>' +
    '<span class="arc-t">' + esc(title) +
    (tail ? '<span class="ix-tail">' + esc(tail) + '</span>' : "") +
    '</span></a>';
}

function ixGroup(name, count, rows) {
  return '<details class="ix-group"><summary class="arc-h">' +
    '<span class="ix-name">' + esc(name) + '</span>' +
    '<span class="arc-cnt">' + esc(count) + '</span></summary>' +
    '<div class="arc-rows">' + rows + '</div></details>';
}

function sourcesMainHtml() {
  var S = window.SOURCES || {};
  var groups = S.groups || [];
  var top = '<p class="g-scale"><b>' + (S.posts || 0) + '</b> 篇有参考 · <b>' +
    (S.links || 0) + '</b> 条链接 · <b>' + (S.domains || 0) + '</b> 个域名</p>';
  var links = '<div class="g-tabs">' +
    '<a class="g-tab" href="/archive">归档</a></div>';
  var blocks = groups.map(function (g) {
    var rows = (g.p || []).map(function (p) {
      return ixRow(p.i, p.t, p.d, p.n > 1 ? p.n + ' 条' : "");
    }).join("");
    return ixGroup(g.d, g.n + ' 条 · ' + g.c + ' 篇', rows);
  }).join("");
  var rest = (S.rest || []).map(function (d) {
    return '<span class="ix-single">' + esc(d) + '</span>';
  }).join("");
  var tail = '<details class="ix-group"><summary class="arc-h">' +
    '<span class="ix-name">只引一次的源</span>' +
    '<span class="arc-cnt">' + (S.rest || []).length + ' 个</span></summary>' +
    '<div class="ix-rest">' + rest + '</div></details>';
  return top + links + blocks + tail;
}

function renderIndexPage(main, page) {
  main.innerHTML = '<p class="g-scale">正在取回</p>';
  loadAuxFiles([["SOURCES", "sources.js"]], function () {
    var app = document.querySelector(".app");
    if (!app || app.getAttribute("data-page") !== page) return;
    if (!window.SOURCES) {
      main.innerHTML = '<div class="g-card"><div class="g-notice">加载失败</div></div>';
      return;
    }
    main.innerHTML = sourcesMainHtml();
  });
}

var TL_STEP = 10;
var tlShown = TL_STEP;

function timelineMainHtml() {
  return momentsMainHtml();
}

/* 数字转中文数词（用于关于页的统计，按你的规矩用中文数词）。
   覆盖到亿级，本站用到的 361 / 129 / 7 / 172 这类都没问题。 */
function numToCn(n) {
  if (n === 0) return "零";
  if (n < 0) return "负" + numToCn(-n);
  var d = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  var u = ["", "十", "百", "千"];
  function four(num) {
    var s = "", str = String(num), len = str.length, zero = false, i, digit, pos;
    for (i = 0; i < len; i++) {
      digit = +str.charAt(i);
      pos = len - 1 - i;
      if (digit === 0) { zero = true; }
      else {
        if (zero) { s += "零"; zero = false; }
        s += d[digit] + u[pos];
      }
    }
    return s;
  }
  var s = "";
  if (n >= 100000000) {
    s += four(Math.floor(n / 100000000)) + "亿";
    n = n % 100000000;
    if (n === 0) return s;
    if (n < 10000000) s += "零";
  }
  if (n >= 10000) {
    s += four(Math.floor(n / 10000)) + "万";
    n = n % 10000;
    if (n === 0) return s;
    if (n < 1000) s += "零";
  }
  s += four(n);
  return s.replace(/^一十/, "十");
}

function aboutHtml() {
  // 站内统计从 POSTS 现算，发新文不用再回来手改这页
  var posts = window.POSTS || [];
  var postCount = posts.length;
  var wordTotal = 0;
  var catSet = {};
  posts.forEach(function (p) {
    if (p.words) wordTotal += p.words;
    if (p.cat) catSet[p.cat] = (catSet[p.cat] || 0) + 1;
  });
  var CAT_ORDER = ["读书", "技术", "日常", "杂记", "文史", "电影", "类型文学"];
  var cats = Object.keys(catSet);
  var ordered = CAT_ORDER.filter(function (c) { return cats.indexOf(c) >= 0; })
    .concat(cats.filter(function (c) { return CAT_ORDER.indexOf(c) < 0; }));
  var catPhrase = ordered.join("、") + numToCn(ordered.length) + "类";
  var wordWan = Math.round(wordTotal / 10000);
  var statLine =
    "目前" + numToCn(postCount) + "篇，约" + numToCn(wordWan) + "万字，分在" + catPhrase + "。";

  return (
    '<article class="g-article">' +
    '<h1>关于这个站</h1>' +
    '<div class="g-prose prose">' +
    '<p>这个站从 2020 年前后开始搭，中间推倒重来过几次。现在这一版是手写的 HTML、CSS 和原生 JavaScript，没有框架、没有构建工具，也没有打包流程，一堆静态文件挂在 Cloudflare Pages 上。</p>' +
    '<p>内容存在 Cloudflare D1，前台读构建时生成的静态元数据，后台通过接口读写；接口取不到时用仓库里的一份副本兜底。</p>' +
    '<h2>里面有什么</h2>' +
    '<p>' + statLine + '另有动态、导航两块，导航收了一百七十多个站点。</p>' +
    '<h2>没做的部分</h2>' +
    '<p>没有第三方统计脚本，页面不记录来源、停留时长和点击路径；推荐只按正文的相似度算，不建立用户画像；评论区长期空置，已经收起。</p>' +
    '<h2>联系</h2>' +
    '<ul>' +
    '<li>邮箱：<a href="mailto:1806754672@qq.com">1806754672@qq.com</a></li>' +
    '<li>GitHub：<a href="https://github.com/Reze520" target="_blank" rel="noopener">github.com/Reze520</a></li>' +
    '<li>哔哩哔哩：<a href="https://space.bilibili.com/234451938" target="_blank" rel="noopener">space.bilibili.com/234451938</a></li>' +
    '<li>抖音：<a href="https://v.douyin.com/jY-UScBpfDE/" target="_blank" rel="noopener">v.douyin.com/jY-UScBpfDE</a></li>' +
    '</ul>' +
    '</div>' +
    '</article>'
  );
}

/* ---------- 文章目录 ----------
   两处用到：
   ① 首页 / 文章列表那种三栏布局 —— 目录插进右栏（原逻辑）。
   ② 文章详情页（.post-app）—— 详情页不是三栏，目录只能自己长出来，
      由 mountPost 之后的 insertPostToc 插进 .post-app 里。
   两份目录共用 buildTocHtml / bindToc，靠选择器区分是哪一份。 */
var _tocHandler = null;
var _tocProgressHandler = null;

// 目录跳转要避开吸顶的顶栏
function tocOffset() {
  var head = document.querySelector(".site-head");
  return (head ? head.offsetHeight : 64) + 22;
}

function clearTocScroll() {
  if (_tocHandler) {
    window.removeEventListener("scroll", _tocHandler);
    _tocHandler = null;
  }
  if (_tocProgressHandler) {
    window.removeEventListener("scroll", _tocProgressHandler);
    _tocProgressHandler = null;
  }
}

// 换页时连浮层一起收掉；bindToc 内部只清滚动监听，不能把浮层也拆了
function unbindToc() {
  clearTocScroll();
  destroyFloatToc();
}

/* 正文容器在两种页面上位置不同：
   列表页是 <main id="app-main">，文章详情页是 <main class="post-app" id="post">。
   目录、进度条这些逻辑两边都要用，统一走这一个选择器。 */
var PROSE_SEL = "#app-main .g-prose, #post .g-prose";

// 从正文的 h2 / h3 自动生成目录，并给标题补上锚点 id
function buildTocHtml() {
  var prose = document.querySelector(PROSE_SEL);
  if (!prose) return "";
  var hs = prose.querySelectorAll("h2, h3");
  if (!hs.length) return "";
  var links = [];
  Array.prototype.forEach.call(hs, function (h, i) {
    var text = (h.textContent || "").trim();
    if (!text) return;
    var id = "sec-" + i;
    h.id = id;
    var lv = h.tagName === "H3" ? 3 : 2;
    links.push(
      '<a class="toc-link lv' + lv + '" href="#" data-target="' + id + '">' +
        esc(text) +
        "</a>"
    );
  });
  if (links.length < 2) return "";
  return (
    '<div class="g-card g-toc">' +
    '<div class="g-card-head"><span class="t">' + ICONS.doc + "文章目录</span></div>" +
    '<nav class="toc">' + links.join("") + "</nav></div>"
  );
}

/* 文章详情页自己那一份目录。
   详情节不是三栏（.post-app 一层），右栏不存在，所以目录得长在正文旁边。
   长文（>= 4 个标题）才有；结构上和右栏那份一样，多一条顶部细进度条。 */
function buildPostTocHtml() {
  var basic = buildTocHtml();
  if (!basic) return "";
  var count = document.querySelectorAll(PROSE_SEL + " h2, " + PROSE_SEL + " h3").length;
  if (count < 4) return "";
  return basic.replace(
    'class="g-card g-toc"',
    'class="g-card g-toc post-toc"'
  ).replace(
    '<nav class="toc">',
    '<div class="toc-progress" aria-hidden="true"><i></i></div><nav class="toc">'
  );
}

/* 窄屏的文章目录：浮在正文旁边。
   宽屏有右侧那一列可以常驻（见 insertPostToc），窄屏没地方放，改成浮层：
   默认收成一个小圆标签（显示总节数），点开是一张能自己滚的列表，
   可以拖到顺手的地方，位置记在 localStorage 里。 */
var _ftocHandlers = [];

function destroyFloatToc() {
  var n = document.querySelector(".ftoc");
  if (n && n.parentNode) n.parentNode.removeChild(n);
  var mk = document.querySelector(".ftoc-mask");
  if (mk && mk.parentNode) mk.parentNode.removeChild(mk);
  _ftocHandlers.forEach(function (h) {
    window.removeEventListener(h[0], h[1]);
  });
  _ftocHandlers = [];
}

function mountFloatToc() {
  destroyFloatToc();
  var host = document.querySelector("#post") || document.querySelector(".post-app");
  if (!host) return;
  var stale = host.querySelector(".post-toc");
  if (stale) stale.remove();
  var prose = document.querySelector(PROSE_SEL);
  if (!prose) return;
  var hs = prose.querySelectorAll("h2, h3");
  if (hs.length < 4) return;

  var items = [];
  Array.prototype.forEach.call(hs, function (h, i) {
    var text = (h.textContent || "").trim();
    if (!text) return;
    var id = "sec-" + i;
    h.id = id;
    items.push({ id: id, text: text, lv: h.tagName === "H3" ? 3 : 2 });
  });
  if (items.length < 4) return;

  var wrap = document.createElement("div");
  wrap.className = "ftoc";
  wrap.setAttribute("data-open", "0");
  wrap.innerHTML =
    '<button class="ftoc-btn" type="button" aria-expanded="false" aria-label="展开文章目录">' +
    '<span class="ftoc-ic">' + ICONS.doc + "</span>" +
    '<span class="ftoc-n">' + items.length + "</span></button>" +
    '<div class="ftoc-panel">' +
    '<div class="ftoc-head"><span class="ftoc-t">目录</span>' +
    '<span class="ftoc-at"><b>1</b>/' + items.length + "</span>" +
    '<button class="ftoc-x" type="button" aria-label="收起目录">×</button></div>' +
    '<div class="ftoc-prog"><i></i></div>' +
    '<nav class="ftoc-nav">' +
    items
      .map(function (it) {
        return (
          '<a class="ftoc-link lv' + it.lv + '" href="#" data-target="' +
          it.id + '">' + esc(it.text) + "</a>"
        );
      })
      .join("") +
    "</nav></div>";
  document.body.appendChild(wrap);

  var btn = wrap.querySelector(".ftoc-btn");
  var head = wrap.querySelector(".ftoc-head");
  var nav = wrap.querySelector(".ftoc-nav");
  var links = Array.prototype.slice.call(nav.querySelectorAll("a[data-target]"));
  var atEl = wrap.querySelector(".ftoc-at b");
  var progEl = wrap.querySelector(".ftoc-prog i");

  function add(ev, fn, opt) {
    window.addEventListener(ev, fn, opt || false);
    _ftocHandlers.push([ev, fn]);
  }
  // 手机上展开时铺一层透明点击层，点正文任何地方就收起
  var mask = document.createElement("div");
  mask.className = "ftoc-mask";
  document.body.appendChild(mask);

  var panel = wrap.querySelector(".ftoc-panel");

  // 拖过之后位置可能落在屏幕外（换设备、转屏），这里按展开状态夹回来
  function clampPos() {
    if (!wrap.style.left) return;
    var open = wrap.getAttribute("data-open") === "1";
    var w = open ? panel.offsetWidth || 246 : btn.offsetWidth || 46;
    var h = open ? Math.min(panel.offsetHeight || 320, window.innerHeight * 0.62) : 46;
    var l = parseFloat(wrap.style.left) || 0;
    var t = parseFloat(wrap.style.top) || 0;
    var maxL = Math.max(8, window.innerWidth - w - 10);
    var maxT = Math.max(8, window.innerHeight - h - 12);
    wrap.style.left = Math.min(maxL, Math.max(8, l)) + "px";
    wrap.style.top = Math.min(maxT, Math.max(8, t)) + "px";
  }

  function setOpen(v) {
    wrap.setAttribute("data-open", v ? "1" : "0");
    btn.setAttribute("aria-expanded", v ? "true" : "false");
    mask.classList.toggle("is-on", !!v && window.innerWidth <= 760);
    clampPos();
  }
  setOpen(false);
  mask.addEventListener("click", function () {
    setOpen(false);
  });

  // 记忆上次拖到的位置
  function posKey() {
    return window.innerWidth <= 760 ? "ftoc-pos-m" : "ftoc-pos";
  }
  try {
    var saved = JSON.parse(localStorage.getItem(posKey()) || "null");
    if (saved && saved.l) {
      wrap.style.left = saved.l;
      wrap.style.top = saved.t;
      wrap.style.right = "auto";
    }
  } catch (e) {}

  btn.addEventListener("click", function () {
    if (wrap.getAttribute("data-drag") === "1") {
      wrap.setAttribute("data-drag", "0");
      return;
    }
    setOpen(wrap.getAttribute("data-open") !== "1");
  });
  wrap.querySelector(".ftoc-x").addEventListener("click", function () {
    setOpen(false);
  });

  nav.addEventListener("click", function (e) {
    var a = e.target.closest("a[data-target]");
    if (!a) return;
    e.preventDefault();
    var el = document.getElementById(a.getAttribute("data-target"));
    if (!el) return;
    var y = el.getBoundingClientRect().top + window.pageYOffset - tocOffset();
    window.scrollTo({ top: y, behavior: "smooth" });
    links.forEach(function (x) {
      x.classList.toggle("on", x === a);
    });
    if (window.innerWidth < 760) setOpen(false);
  });

  // 拖动：按住圆钮或面板顶部都能拖，松手位置写进 localStorage
  var drag = null;
  function startDrag(e) {
    if (e.button != null && e.button !== 0) return;
    var r = wrap.getBoundingClientRect();
    drag = { x: e.clientX, y: e.clientY, l: r.left, t: r.top, moved: false };
    wrap.style.left = r.left + "px";
    wrap.style.top = r.top + "px";
    wrap.style.right = "auto";
    wrap.classList.add("dragging");
  }
  function moveDrag(e) {
    if (!drag) return;
    var dx = e.clientX - drag.x;
    var dy = e.clientY - drag.y;
    if (Math.abs(dx) + Math.abs(dy) > 3) drag.moved = true;
    // 展开时面板贴右缘向左长，能拖到的右界要整块面板都装得下
    var open = wrap.getAttribute("data-open") === "1";
    var w = open ? panel.offsetWidth || 246 : btn.offsetWidth || 46;
    var h = open ? Math.min(panel.offsetHeight || 320, window.innerHeight * 0.62) : 46;
    var maxL = Math.max(8, window.innerWidth - w - 10);
    var maxT = Math.max(8, window.innerHeight - h - 12);
    wrap.style.left = Math.max(8, Math.min(maxL, drag.l + dx)) + "px";
    wrap.style.top = Math.max(8, Math.min(maxT, drag.t + dy)) + "px";
  }
  function endDrag() {
    if (!drag) return;
    wrap.classList.remove("dragging");
    if (drag.moved) {
      wrap.setAttribute("data-drag", "1");
      try {
        localStorage.setItem(
          posKey(),
          JSON.stringify({ l: wrap.style.left, t: wrap.style.top })
        );
      } catch (e) {}
    }
    drag = null;
  }
  [btn, head].forEach(function (h) {
    h.addEventListener("mousedown", startDrag);
    h.addEventListener("touchstart", function (e) {
      var t = e.touches[0];
      if (t) startDrag({ clientX: t.clientX, clientY: t.clientY, button: 0 });
    }, { passive: true });
  });
  add("mousemove", moveDrag);
  add("mouseup", endDrag);
  add("touchmove", function (e) {
    var t = e.touches[0];
    if (t) moveDrag({ clientX: t.clientX, clientY: t.clientY });
  }, { passive: true });
  add("touchend", endDrag);

  // 滚动时高亮当前节，并把列表滚到看得见的位置
  function onScroll() {
    var idx = 0;
    for (var i = 0; i < links.length; i++) {
      var el = document.getElementById(links[i].getAttribute("data-target"));
      if (el && el.getBoundingClientRect().top <= tocOffset() + 12) idx = i;
    }
    links.forEach(function (a, i) {
      a.classList.toggle("on", i === idx);
    });
    if (atEl) atEl.textContent = idx + 1;
    followToc(nav, links[idx]);
    if (progEl) {
      var r = prose.getBoundingClientRect();
      var total = r.height - window.innerHeight * 0.6;
      var done = tocOffset() - r.top;
      var pct = total > 0 ? (done / total) * 100 : 100;
      progEl.style.width = Math.min(100, Math.max(0, pct)).toFixed(1) + "%";
    }
  }
  add("scroll", onScroll, { passive: true });
  add("resize", onScroll);
  add("keydown", function (e) {
    if (e.key === "Escape" || e.keyCode === 27) setOpen(false);
  });
  add("resize", clampPos);
  onScroll();
}

/* 文章详情页的目录：
   - 宽屏（>=1120px）：常驻正文右侧那一列，跟着滚动，当前节高亮。
     .post-app 本来就是「正文 + 236px」的 grid，之前改成浮层后这一列空着，
     正文被挤在左边、右边留一大块白，现在把目录放回去。
   - 窄屏：仍然用浮层（侧面没地方放，浮层可拖、可收）。
   两套互斥，切换断点时重建，不会同时出现两份目录。 */
var _tocHost = null;
var _tocWide = null;

function insertPostToc(host) {
  _tocHost = host || document.querySelector("#post") || document.querySelector(".post-app");
  var wide = window.matchMedia("(min-width: 1120px)").matches;
  _tocWide = wide;

  // 先清掉两边可能存在的旧目录
  var old = _tocHost && _tocHost.querySelector(".post-toc");
  if (old) old.remove();
  destroyFloatToc();

  if (!_tocHost) return;

  if (wide) {
    var html = buildPostTocHtml();
    // 标题不足 4 个的文章没有目录，两栏会空出一整列，收回单栏居中
    _tocHost.classList.toggle("no-toc", !html);
    if (!html) return;
    var tmp = document.createElement("div");
    tmp.innerHTML = html;
    _tocHost.appendChild(tmp.firstElementChild);
    bindToc(); // 绑 #post .post-toc .toc
  } else {
    _tocHost.classList.remove("no-toc");
    mountFloatToc();
  }
}

// 拖窗口跨过断点时切形态（宽屏↔窄屏），只在真的跨过去时重建。
// 除了断点，还要看 DOM 是不是那个形态：有些浏览器缩放 / 转屏时 matchMedia
// 已经变了却不派发 resize，光比断点会留下「窄屏里挂着一份常驻目录」的错位态。
function maybeRebuildToc() {
  if (!_tocHost || !_tocHost.isConnected) return;
  var hs = document.querySelectorAll(PROSE_SEL + " h2, " + PROSE_SEL + " h3").length;
  if (hs < 4) return; // 短文没有目录，不存在形态问题
  var wide = window.matchMedia("(min-width: 1120px)").matches;
  var hasCard = !!_tocHost.querySelector(".post-toc");
  var hasFloat = !!document.querySelector(".ftoc");
  var ok = wide ? hasCard && !hasFloat : hasFloat && !hasCard;
  if (wide === _tocWide && ok) return;
  insertPostToc(_tocHost);
}
window.addEventListener("resize", maybeRebuildToc, { passive: true });
window.addEventListener("orientationchange", maybeRebuildToc, { passive: true });
if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", maybeRebuildToc, {
    passive: true,
  });
}

/* 目录本身也能滚（50 个条目的长文，一屏放不下）。
   高亮跑到可视区外时，把目录自己滚一格 —— 但只在目录真的是滚动区时才动，
   右栏那种一屏放得下的目录，scrollTop 一直是 0，这里什么都不做。 */
function followToc(nav, current) {
  if (!nav || !current) return;
  if (nav.scrollHeight - nav.clientHeight < 24) return;
  var nr = nav.getBoundingClientRect();
  var ar = current.getBoundingClientRect();
  var pad = 12;
  if (ar.top < nr.top + pad) {
    nav.scrollTop -= nr.top + pad - ar.top;
  } else if (ar.bottom > nr.bottom - pad) {
    nav.scrollTop += ar.bottom - (nr.bottom - pad);
  }
}

function bindToc() {
  clearTocScroll();
  // 文章详情页有自己那份时就绑它，否则绑右栏那份
  var nav =
    document.querySelector("#post .post-toc .toc") ||
    document.querySelector("#app-right .g-toc .toc");
  if (!nav) return;
  // 目录卡本体（.g-card.g-toc），宽屏 sticky 的正是它
  var card = nav.closest(".g-toc") || nav.parentNode;
  var links = Array.prototype.slice.call(nav.querySelectorAll("a[data-target]"));
  if (!links.length) return;

  nav.addEventListener("click", function (e) {
    var a = e.target.closest("a[data-target]");
    if (!a) return;
    e.preventDefault(); // 不要改 hash，否则会被 SPA 路由当成换页
    var el = document.getElementById(a.getAttribute("data-target"));
    if (!el) return;
    var y = el.getBoundingClientRect().top + window.pageYOffset - tocOffset();
    window.scrollTo({ top: y, behavior: "smooth" });
    links.forEach(function (x) {
      x.classList.toggle("on", x === a);
    });
  });

  _tocHandler = function () {
    var idx = 0;
    for (var i = 0; i < links.length; i++) {
      var el = document.getElementById(links[i].getAttribute("data-target"));
      if (el && el.getBoundingClientRect().top <= tocOffset() + 12) idx = i;
    }
    links.forEach(function (a, i) {
      a.classList.toggle("on", i === idx);
    });
    followToc(nav, links[idx]);
  };
  window.addEventListener("scroll", _tocHandler, { passive: true });
  _tocHandler();

  /* 目录顶部那条细进度：按「正文已读比例」走，不是整页滚动比例
     —— 整页比例里页脚、版权都算进去，读完正文时还差一截，看着别扭。 */
  var prog = card.querySelector(".toc-progress i");
  if (prog) {
    var prose = document.querySelector(PROSE_SEL);
    var track = prog.parentNode;
    _tocProgressHandler = function () {
      if (!prose || !track) return;
      var r = prose.getBoundingClientRect();
      var total = r.height - window.innerHeight * 0.6;
      var done = tocOffset() - r.top;
      var pct = total > 0 ? (done / total) * 100 : 100;
      track.style.setProperty(
        "--toc-progress",
        Math.min(100, Math.max(0, pct)).toFixed(1)
      );
    };
    window.addEventListener("scroll", _tocProgressHandler, { passive: true });
    _tocProgressHandler();
  }
}

// 只在文章页把目录插到右栏「动态」卡片下面。
// 文章详情页（.post-app）没有右栏，那里的目录由 insertPostToc 自己长，
// 所以这里遇到 post 时什么都不做 —— 两份目录同时存在会互相抢滚动高亮。
function renderRightForPage(page) {
  var right = $("#app-right");
  if (!right) return;
  var old = right.querySelector(".g-toc");
  if (old) old.remove();
  if (page !== "post") {
    unbindToc();
    return;
  }
  var html = buildTocHtml();
  if (!html) {
    unbindToc();
    return;
  }
  var tmp = document.createElement("div");
  tmp.innerHTML = html;
  var node = tmp.firstElementChild;
  var first = right.firstElementChild;
  if (first && first.nextElementSibling) right.insertBefore(node, first.nextElementSibling);
  else right.appendChild(node);
  bindToc();
}

// 路由切换时瞬时滚到指定位置：绕过 html 上的 scroll-behavior:smooth，
// 避免"整页滑一段动画"打断阅读（目录跳转、回顶部仍然是平滑滚动）
function instantScrollTo(y) {
  var de = document.documentElement;
  var prev = de.style.scrollBehavior;
  de.style.scrollBehavior = "auto";
  window.scrollTo(0, y);
  de.style.scrollBehavior = prev;
}

/* 切页后的落点：
   - 本次加载第一次进来、且落在首页 → 停在首屏
   - 文章直链、站内切页 → 直接落到内容开头（首屏就在上面，往上滑随时回去） */
var _firstRoute = true;
var _lastSettle = null;

function settleScroll(page) {
  // goPage 会同步渲染一次、popstate 再跑一次，同一路由只落一次。
  // 键里必须带上 path + search：地址从 hash 换成真实路径后，只看 hash 会是空串，
  // 同一页换分类（/writing?cat=A → /writing?cat=B）就认不出是两次了。
  var key = page + "|" + (location.pathname || "") + (location.search || "") + (location.hash || "");
  if (_lastSettle === key) return;
  _lastSettle = key;

  var splash = document.getElementById("splash");
  var h = splash ? splash.offsetHeight : 0;
  var first = _firstRoute;
  _firstRoute = false;
  var y = h && !(first && page === "home") ? h : 0;
  instantScrollTo(y);
  // 图片和字体加载后首屏高度可能变一点，下一帧再校一次
  requestAnimationFrame(function () {
    instantScrollTo(y);
  });
}

/* 列表的分类/标签/页码同步进地址栏：返回时靠它把落点拼回去，
   刷新也不会掉回「全部」。用 replaceState，不产生新的历史记录。 */
function syncListQuery(cat, tag, page) {
  var q = [];
  if (cat && cat !== "全部") q.push("cat=" + encodeURIComponent(cat));
  if (tag) q.push("tag=" + encodeURIComponent(tag));
  if (page && Number(page) > 0) q.push("p=" + Number(page));
  var app = document.querySelector(".app");
  var cur = (app && app.getAttribute("data-page")) || "home";
  if (cur !== "writing" && cur !== "home") return;
  try {
    history.replaceState(null, "", (cur === "writing" ? "/writing" : "/") + (q.length ? "?" + q.join("&") : ""));
  } catch (e) {}
}

/* ---------- 每个路由的标题与描述 ----------
   子页面（about.html、writing.html…）打开时会 location.replace 到
   index.html#/xxx，浏览器标签就只剩首页那一句「RezeのBlog」，
   description / og 也全停在首页。收藏、分享、搜索结果里八个页面长得一模一样。
   这里按路由重写一遍，值和各静态页 <head> 里写的保持一致。 */
var PAGE_META = {
  home: ["RezeのBlog", "RezeのBlog的个人博客。读书、技术、文史与日常的记录。"],
  writing: ["全部文章 · RezeのBlog", "RezeのBlog写过的全部文章，按分类和标签浏览。"],
  archive: ["归档 · RezeのBlog", "全部文章按年份排成的目录，从二〇二〇年排到今天。"],
  moments: ["站务 · RezeのBlog", "稿子与站点改动，按日期混排。"],
  links: ["导航 · RezeのBlog", "常去的地方。"],
  weather: ["天气 · RezeのBlog", "几个城市的天气并列。"],
  timeline: ["站务 · RezeのBlog", "稿子与站点改动，按日期混排。"],
  about: ["关于这个站 · RezeのBlog", "关于本站：缘起、搭建方式与联系方式。"],
  sources: ["参考源 · RezeのBlog", "各篇末尾引过的出处，按域名归并。"],
  post: ["文章 · RezeのBlog", "RezeのBlog的个人博客。"]
};
var SITE_ORIGIN = "https://reze520.pages.dev";

/* 文章地址。原来是 /post?id=post-263，带问号，分享和收录都吃亏；
   现在每篇一条路径 /p/post-263。旧地址由 functions/_middleware.js 301 过来，
   站内一律用这个函数生成，不要再手拼。 */
function postHref(p) {
  var id = p && typeof p === "object" ? p.id : p;
  return "/p/" + encodeURIComponent(id == null ? "" : String(id));
}

/* 地址里的百分号编码不一定是合法的，坏输入不能把整页崩掉。 */
function safeDecode(s) {
  try { return decodeURIComponent(s); } catch (e) { return String(s || ""); }
}

/* 从地址里取文章 id：新地址在路径里，老地址在查询串里。 */
function postIdFromUrl() {
  var m = /^\/p\/([^\/]+)\/?$/.exec(location.pathname || "");
  if (m) return safeDecode(m[1]);
  return new URLSearchParams(location.search || "").get("id") || "";
}

function setMetaTag(attr, key, val) {
  var sel = attr === "name" ? 'meta[name="' + key + '"]' : 'meta[property="' + key + '"]';
  var el = document.head.querySelector(sel);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  if (el.getAttribute("content") !== val) el.setAttribute("content", val);
}

function syncMeta(page, params) {
  var m = PAGE_META[page] || PAGE_META.home;
  var title = m[0];
  var desc = m[1];
  // Cloudflare Pages 会把 /xxx.html 308 到 /xxx，canonical 直接写最终地址，别写跳转前那个
  var url = SITE_ORIGIN + (page === "home" ? "/" : "/" + page);
  var type = "website";

  if (page === "post") {
    var id = (params && params.get("id")) || new URLSearchParams(location.search).get("id") || "";
    var p = postById(id);
    if (p) {
      title = p.title + " · " + SITE.name;
      // 摘要优先，没有就截正文开头，去掉标签和多余空白
      desc = String(p.excerpt || p.content || "")
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 110);
      url = SITE_ORIGIN + "/p/" + encodeURIComponent(p.id);
      type = "article";
    } else {
      title = "没有找到这篇文章 · " + SITE.name;
      desc = "这篇文章可能被移动或改名了，可以去文章列表里重新找找。";
    }
  } else if (page === "about") {
    type = "profile";
  }

  if (document.title !== title) document.title = title;
  setMetaTag("name", "description", desc);
  setMetaTag("property", "og:title", title);
  setMetaTag("property", "og:description", desc);
  setMetaTag("property", "og:url", url);
  setMetaTag("property", "og:type", type);
  setMetaTag("name", "twitter:card", "summary");

  var link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  if (link.getAttribute("href") !== url) link.setAttribute("href", url);
}

function renderMain() {
  var app = document.querySelector(".app");
  var main = $("#app-main");
  if (!main) return;
  // 静态页（changelog.html）正文是编译好的，别被首页版式覆盖掉
  if (app && app.getAttribute("data-static")) return;
  var page = (app && app.getAttribute("data-page")) || "home";
  var params = (app && app.__params) || new URLSearchParams();
  var prog = $("#progress");
  if (prog) prog.style.width = page === "post" ? "0%" : "";
  if (page === "moments" || page === "timeline") {
    main.innerHTML = momentsMainHtml();
    bindMoments(main);
  } else if (page === "links") {
    main.innerHTML = linksMainHtml();
  } else if (page === "weather") {
    if (window.WX) {
      main.innerHTML = window.WX.mainHtml();
      window.WX.bind(main);
    } else {
      main.innerHTML = '<div class="g-card"><div class="g-card-head"><span class="t">天气</span></div>' +
        '<div class="g-notice">天气模块没加载出来，刷新一下试试。</div></div>';
    }
  } else if (page === "archive") {
    main.innerHTML = archiveMainHtml();
    bindArchive(main);
    decorateArchiveHeat();
  } else if (page === "sources") {
    renderIndexPage(main, page);
  } else if (page === "about") {
    main.innerHTML = aboutHtml();
  } else if (page === "post") {
    mountPost(main, params.get("id"));
  } else if (page === "writing") {
    // 写作页：分类 chips + 分页列表（和首页那种「帖子区块」不是一个版式）
    main.innerHTML = writingMainHtml();
    bindWritingFilters(main);
  } else {
    main.innerHTML = postsMainHtml();
    bindPostTabs(main, params);
  }
  updateNavActive(page);
  renderRightForPage(page);
  settleScroll(page);
  // 地址里明确带了 cat=xx 时，列表要真的停在这一栏（刷新、返回都靠这条）
  if ((page === "home" || page === "writing") && params.get("cat")) {
    var fn = page === "home" ? bindPostTabs.__apply : bindWritingFilters.__apply;
    if (typeof fn === "function") {
      fn(params.get("cat"), params.get("tag") || "", Number(params.get("p")) || 0);
    }
  }
  armScrollRestore(page);
  postRouteFix();
  renderRecModules();
  syncMeta(page, params);
}

/* goPage 会同步渲染一次、popstate 再渲染一次。返回文章列表时地址还是旧的
   （/post?…），那一次同步渲染拿不到 cat，会先把列表拉成「全部」。
   等路由落地后再补一次分类筛选，保证落点正确。 */
var _lastRouteKey = "";
function postRouteFix() {
  var key = (location.pathname || "") + (location.search || "") + (location.hash || "") + "|" + ((document.querySelector(".app") || {}).getAttribute
    ? document.querySelector(".app").getAttribute("data-page") : "");
  if (key === _lastRouteKey) return;
  _lastRouteKey = key;
  if (!_pendingCat) return;
  var cat = _pendingCat;
  _pendingCat = "";
  setTimeout(function () {
    var app = document.querySelector(".app");
    var page = (app && app.getAttribute("data-page")) || "";
    if (page !== "home" && page !== "writing") return;
    var fn = page === "home" ? bindPostTabs.__apply : bindWritingFilters.__apply;
    if (typeof fn === "function") fn(cat, "", 0);
    if (_restoreY && _restoreY.p === page && typeof _restoreY.y === "number") {
      var y = _restoreY.y;
      instantScrollTo(y);
      setTimeout(function () { instantScrollTo(y); }, 60);
    }
  }, 40);
}

function updateNavActive(page) {
  // 链接现在都是 /writing 这种路径，得按路径整段比，不能再用 indexOf 找子串：
  // 首页的 "/" 是任何地址的子串，那样每一页都会把「主页」点亮。
  var navMap = { home: "/", moments: "/moments", timeline: "/moments", writing: "/writing", links: "/links", weather: "/weather" };
  var want = navMap[page];
  // 只给真正的页面链接判当前页：菜单里「随机一篇」「发现」这类 href="#"
  // 以前拆成空串后回退成 "/"，首页会五项一起标成当前页，各自挂上顶栏的指示短线。
  document.querySelectorAll(".nav > a, .nav-more-menu a.m-dupe").forEach(function (a) {
    var path = (a.getAttribute("href") || "").split(/[?#]/)[0];
    if (want && path && path === want) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
}

/* 路由从地址里读。现在内页是 /writing、/p/post-263 这种干净地址
   （直接敲 /writing.html 也不是不行，Cloudflare 会 308 到 /writing，这里两种都认）。
   以前所有内页都往 /index.html#/writing 跳，老书签和老外链不能废，所以 hash 继续兜底。 */
function parseHash() {
  // 文章页是路径地址 /p/post-263，最后一段是文章 id 而不是页面名
  var pm = /^\/p\/([^\/]+)\/?$/.exec(location.pathname || "");
  if (pm) return { page: "post", qs: "?id=" + encodeURIComponent(safeDecode(pm[1])) };
  var seg = (location.pathname || "/")
    .replace(/\/+$/, "")
    .split("/")
    .pop()
    .replace(/\.html$/i, "")
    .toLowerCase();
  if (seg && seg !== "index") return { page: seg, qs: location.search || "" };
  var h = (location.hash || "").replace(/^#\/?/, "");
  var qi = h.indexOf("?");
  return { page: qi < 0 ? h : h.slice(0, qi), qs: qi < 0 ? "" : h.slice(qi) };
}

function applyRoute() {
  var r = parseHash();
  var app = document.querySelector(".app");
  if (!app) return;
  // 静态页（如 changelog.html）正文是编译好的 HTML，不需要路由接管；
  // 带上 data-static 就跳过渲染，顶栏按钮、播放器这些仍然照常初始化。
  if (app.getAttribute("data-static")) return;
  // 没有 hash 时一律回首页：不能用上一次的 data-page，
  // 否则从文章页后退会拿空 id 再渲染一次 post，显示「没有找到这篇文章」
  var page = r.page || "home";
  if (page === "index") page = "home";
  // 文章详情走独立页面 /post（post.html）。若从老书签、外链落到首页文档里的
  // post 路由，这里直接整页跳到 /post，让文章页始终是一套版式、一种状态，
  // 避免「在首页栅格里被当成第三栏内容渲染」这种错位的版式。
  if (page === "post") {
    var pid0 = new URLSearchParams(r.qs || "").get("id");
    location.replace(pid0 ? postHref(pid0) : "/writing");
    return;
  }
  // 静态文档没有渲染分支，落到这里只会被渲染成首页卡片流；整页跳过去。
  if (STATIC_PAGES.indexOf(page) >= 0) {
    location.replace("/" + page);
    return;
  }
  // 老地址没带分类、但眼下停在某个分类上（点了返回）时，把分类补进 hash，
  // 这样刷新一下也还停在这一栏，不会掉回全部。
  // 另外：地址里的 ?cat= 也要留在 hash 里 —— 之前切到写作页会把 location.search 清掉，
  // 页面看着还是技术栏，地址已经只剩 #/writing，一刷新就退回全部。
  if ((page === "home" || page === "writing") && !r.qs) {
    var fromSearch = new URLSearchParams(location.search || "");
    var keepCat = _pendingCat || fromSearch.get("cat") || "";
    var keepTag = fromSearch.get("tag") || "";
    // 首页没分类可补时不补，免得每回首页都被改写成带着 ?cat=
    if (keepCat || keepTag || page === "writing") {
      var sq = [];
      if (keepCat) sq.push("cat=" + encodeURIComponent(keepCat));
      if (keepTag) sq.push("tag=" + encodeURIComponent(keepTag));
      if (sq.length) {
        r.qs = "?" + sq.join("&");
        try {
          history.replaceState(null, "", (page === "home" ? "/" : "/" + page) + r.qs);
        } catch (e) {}
      }
    }
  }
  _pendingCat = "";
  app.setAttribute("data-page", page);
  app.__params = new URLSearchParams(r.qs);
  // 从列表里点进文章时记一下「从哪个列表来的」，返回时才能回到原处。
  // 注意：真正可靠的一次记录发生在 interceptLinks 里（那时还在列表页）。
  // 这里只做兜底——比如直接打开文章链接、或者刷新文章页时没有来源可依；
  // 已经有来源、且说的就是这篇时不要重写，否则会把首页/写作页的来源
  // 覆盖成兜底的 writing，返回就掉回文章列表了。
  if (page === "post") {
    var idNow = new URLSearchParams(r.qs).get("id") || "";
    var prevSrc = readListSource();
    if (!prevSrc || prevSrc.id !== idNow) markListSource();
  }
  syncSplash();
  renderMain();
}

/* ---------- 记住列表来源 ----------
   在首页点了「生活」再进文章，看完点返回，原来是直接跳回整个首页，
   分类和位置全丢了。这里把来源页、分类、标签、翻到第几页和当时的滚动位置
   记在 sessionStorage 里，文章页的返回按钮照着它拼地址。
   历史栈里没退路（比如从收藏夹直达文章）时只当作没记录。 */
var LIST_SRC_KEY = "reze-list-src";
var _pendingCat = ""; // 从文章返回时要补回 hash 的分类

function saveListSource(page, extra) {
  var state = { p: page || "home", at: Date.now() };
  if (extra) for (var k in extra) {
    if (k === "p") continue;   // 页面归属只由第一个参数决定，extra 里同名的页码键不许覆盖它
    if (extra[k] === undefined || extra[k] === null || extra[k] === "") continue;
    state[k] = extra[k];
  }
  try {
    sessionStorage.setItem(LIST_SRC_KEY, JSON.stringify(state));
  } catch (e) {}
}

function readListSource() {
  try {
    var raw = sessionStorage.getItem(LIST_SRC_KEY);
    if (!raw) return null;
    var o = JSON.parse(raw);
    return o && o.p ? o : null;
  } catch (e) {
    return null;
  }
}

/* 列表页在进入文章的那一刻，把当前状态存起来。
   注意别只看 .app 的 data-page：首页初次加载时这个属性还是空的，
   只看它会让「首页 -> 文章」这一步根本不记来源，返回时就掉回文章列表。 */
function currentPage() {
  var app = document.querySelector(".app");
  var p = (app && app.getAttribute("data-page")) || "";
  if (p) return p;
  var h = parseHash().page;
  if (h) return h === "index" ? "home" : h;
  // 首页的根路径没有 data-page、也没有 hash，解析出来是空串。
  // 这里必须认成 home：否则「首页点分类 → 进文章」这一步记不下来源，
  // 返回按钮会退化成「返回文章列表」，回不到首页那一栏。
  var path = (location.pathname || "/").replace(/\/+$/, "");
  return path === "" || path === "/index.html" ? "home" : "";
}

function markListSource(idHint) {
  var page = currentPage();
  if (!page) return;
  // 文章页之间互相跳（上一篇 / 下一篇）：来源没变，别覆盖
  if (page === "post") {
    // 注意 idHint：在列表页点文章的那一刻，hash 还停在列表路由上、读不出文章 id，
    // 所以由调用方（interceptLinks）把目标 id 传进来。
    var hh = parseHash().qs || "";
    var pq = new URLSearchParams(hh);
    var idNow = idHint || pq.get("id") || "";
    var prev = readListSource();
    if (prev && prev.id === idNow) return;
    // 已经有合法来源（列表页记下的 home / writing + 分类）时，这里只补 id，
    // 不能拿空值去覆盖 cat / tag / y，否则「返回」会退回全部文章。
    if (prev && (prev.p === "home" || prev.p === "writing")) {
      prev.id = idNow;
      saveListSource(prev.p, prev);
      return;
    }
    saveListSource("writing", { id: idNow });
    return;
  }
  // 分类/标签/页码「以地址栏为准」：点分类时地址栏会同步成 ?cat=xx，
  // 但点文章那一刻按钮上的 aria-pressed 未必已经刷新，直接从地址读最稳。
  var hashQs = new URLSearchParams(parseHash().qs || "");
  var pageQs = new URLSearchParams(location.search || "");
  var extra = { y: Math.round(window.pageYOffset || 0) };
  if (page === "home" || page === "writing") {
    var cat = hashQs.get("cat") || pageQs.get("cat") || "";
    var tag = hashQs.get("tag") || pageQs.get("tag") || "";
    if (!cat) {
      var box = document.querySelector("#g-tabs .g-tab[aria-pressed='true'], #g-filters .g-chip[aria-pressed='true']");
      if (box) cat = box.getAttribute("data-cat") || "";
    }
    if (!cat || cat === "全部") delete extra.cat; else extra.cat = cat;
    if (tag) extra.tag = tag;
    // 注意：分页号必须叫 pn，不能叫 p —— p 是「来源页」的键，
    // 一旦被页码（数字 0）覆盖，readListSource 就认不出这是列表页，
    // 返回按钮会退回默认的「全部文章」（线上 64 篇的场景就是这么坏的）。
    var on = document.querySelector("#g-list .pg-btn.on");
    if (on) extra.pn = Number(on.getAttribute("data-p")) || 0;
  }
  saveListSource(page, extra);
}

/* 文章页「返回」按钮的地址：能回到来源列表就带上分类，否则回全部文章 */
function backLinkHtml() {
  var src = readListSource();
  var href = "/writing";
  var label = "返回文章列表";
  if (src && (src.p === "home" || src.p === "writing")) {
    var q = [];
    if (src.tag) {
      q.push("tag=" + encodeURIComponent(src.tag));
      label = "返回「" + src.tag + "」";
    } else if (src.cat && src.cat !== "全部") {
      q.push("cat=" + encodeURIComponent(src.cat));
      label = "返回「" + src.cat + "」";
    }
    if (src.p && Number(src.pn) > 0) q.push("p=" + Number(src.pn));
    href = (src.p === "home" ? "/" : "/writing") + (q.length ? "?" + q.join("&") : "");
  }
  return '<a class="back" href="' + href + '">' + ICONS.back + " " + esc(label) + "</a>";
}

/* 返回列表后把滚动位置放回去：分类要重新筛一遍，直接复用记下的值，
   不依赖浏览器的 scrollRestoration */
var _restoreY = null;

function armScrollRestore(page) {
  var src = _restoreY;
  if (!src || src.p !== page) return;
  _restoreY = null;
  if (typeof src.y !== "number" || src.y < 0) return;
  var go = function () { instantScrollTo(src.y); };
  go();
  requestAnimationFrame(go);
  setTimeout(go, 60);
}

/* 欢迎首屏：常驻在页面最上方，任何时候往上滑都能回到它。
   进站时停在首屏；站内切页时自动落到内容开头，不用先划过去。 */
function syncSplash() {
  var splash = document.getElementById("splash");
  if (!splash) return;
  splash.style.display = "";
  if (typeof window.__splashUpdate === "function") window.__splashUpdate();
}

/* 标签页开太久时不会重新拉 JS，改了也看不见。
   切回页面时对一下 index.html 里的版本号，不一致就提示刷新。 */
function showRebuildTip() {
  if (document.getElementById("rebuild-tip")) return;
  var b = document.createElement("button");
  b.id = "rebuild-tip";
  b.className = "rebuild-tip";
  b.textContent = "站点已更新，刷新查看";
  b.addEventListener("click", function () {
    location.reload();
  });
  document.body.appendChild(b);
}

function watchBuild() {
  var tag = document.querySelector('script[src*="main.js?v="]');
  if (!tag) return;
  var m = /main\.js\?v=([\w]+)/.exec(tag.getAttribute("src") || "");
  if (!m) return;
  var ver = m[1];
  var busy = false;

  function check() {
    if (busy || document.visibilityState !== "visible") return;
    busy = true;
    fetch("index.html?_b=" + Date.now(), { cache: "no-store" })
      .then(function (r) { return r.text(); })
      .then(function (html) {
        var mm = /main\.js\?v=([\w]+)/.exec(html);
        if (mm && mm[1] !== ver) showRebuildTip();
      })
      .catch(function () {})
      .then(function () { busy = false; });
  }

  document.addEventListener("visibilitychange", check);
  window.addEventListener("focus", check);
}

/* 内部路由（#/page?qs）翻成真实地址：首页 → "/"，其余 → "/page?qs"。
   站里所有页面都在根目录，路径深度只有一层，相对资源不会因为换了地址而错位。 */
function routeToPath(hash) {
  var p = String(hash || "").replace(/^#\/?/, "");
  var qi = p.indexOf("?");
  var page = (qi < 0 ? p : p.slice(0, qi)).toLowerCase();
  var qs = qi < 0 ? "" : p.slice(qi);
  if (!page || page === "index" || page === "home") return "/" + qs;
  if (page === "post") {
    var pid = new URLSearchParams(qs).get("id");
    if (pid) return postHref(pid);
  }
  return "/" + page + qs;
}

function goPage(hash) {
  // 首页点分类会把 ?cat= 写到地址栏；切到别的页面时必须丢掉，
  // 否则那个分类会被带到写作页，把它的筛选按钮全筛成「不存在」。
  // 但首页 / 写作页自己带着分类进来时不能清：清了以后刷新就丢掉筛选，
  // 表现就是「返回回到技术栏，一刷新又变回全部」。
  // 现在整条地址由 pushState 一次写定，不用再先把 search 抹一遍。
  var dest = routeToPath(hash);
  if ((location.pathname || "/") + (location.search || "") === dest) {
    applyRoute();
    return;
  }
  try {
    history.pushState(null, "", dest);
  } catch (e) {
    // 极老的浏览器没有 pushState：退回整页跳转，功能不能丢
    location.href = dest;
    return;
  }
  // pushState 不会触发任何事件，这里同步渲染一次，避免切页有延迟感
  applyRoute();
}

/* 正文编译在 HTML 里、SPA 没有渲染分支的页面。点到它们、或者从它们点出去，
   都得交给浏览器整页跳转。加新静态页时把名字写进这个清单。
   toolbox：工具箱页是独立文档，自己不引 main.js，renderMain 里也没有它的分支。
   漏写的话点导航只会 pushState 换地址、正文还是首页卡片流，必须刷新才到。 */
var STATIC_PAGES = ["changelog", "toolbox"];

function interceptLinks(e) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  var a = e.target.closest("a[href]");
  if (!a) return;
  var href = a.getAttribute("href");
  if (!href) return;
  if (a.target === "_blank" || a.hasAttribute("download")) return;
  if (/^(https?:|mailto:|tel:|#|javascript:)/i.test(href)) return;
  var u;
  try { u = new URL(href, location.href); } catch (_) { return; }
  if (u.origin !== location.origin) return;
  // 文章页（post.html）是独立文档，没有 .app 容器：
  // 这里不做 SPA 拦截，直接交给浏览器整页跳转。否则 pushState 改了地址栏、
  // 页面却还停在文章页，必须刷新才回得去（「点主页还在文章页」那一类 bug 的根因）。
  if (!document.querySelector(".app")) return;
  // 当前这页本身是静态文档（正文编译在 HTML 里）：站内跳转一律整页走，
  // 否则只是地址栏换了个字，内容还停在原来的页面上。
  if (document.querySelector(".app[data-static]")) return;
  // 文章页的新地址 /p/<id>：路径最后一段是文章 id，不是页面名，得先认出来。
  // 文章页是独立文档，一律整页跳；跳之前记下来源列表，返回时用得上。
  var pm = /^\/p\/([^\/]+)\/?$/.exec(u.pathname);
  if (pm) {
    markListSource(safeDecode(pm[1]));
    location.href = u.pathname + (u.search || "");
    return;
  }
  var file = u.pathname.split("/").pop().replace(/\.html$/, "") || "home";
  if (file === "index") file = "home";
  // 目标页是静态文档，同理整页跳。以前在首页点「更新日志」就漏在这里：
  // pushState 把地址换成 /changelog，正文还是首页的卡片流，得手动刷新一次才到。
  if (STATIC_PAGES.indexOf(file) >= 0) return;
  e.preventDefault();
  var app = document.querySelector(".app");
  var from = (app && app.getAttribute("data-page")) || "";
  var toPost = file === "post";
  // 文章详情页是独立页面 /post（post.html），排版和首页三栏不同。
  // 从列表点进来一律整页跳过去，保证「点进去」和「刷新一遍」是同一个版式，
  // 不再出现「先进来是第一种、刷新才是第二种」。
  if (toPost) {
    // 先记下来源列表（此刻还停在列表页），下一个页面用得上；
    // id 从链接里取，不能等跳转之后读，那时页面已经不在列表上了。
    markListSource(u.searchParams.get("id") || "");
    location.href = routeToPath("#/" + file + (u.search || "")); // /p/xxx
    return;
  }
  var src = readListSource();
  // 地址栏不用在这里补：goPage 会用 pushState 把整条地址一次写对，
  // 以前那种「先把文件名换成 post.html、再往 hash 里塞 #/post」的做法已经不需要了。
  goPage("#/" + file + (u.search || ""));
  // 从文章页点返回：把来源列表当时的分类和滚动位置还回去
  if (from === "post" && src && src.p === file) {
    _restoreY = src;
    _pendingCat = !u.search && !src.tag ? src.cat || "" : "";
  }
}

  /* ---------- 列表页 ---------- */
  function mountWriting() {
    var bar = $("#filterbar");
    var box = $("#all-cards");
    if (!box) return;

    var counts = catCounts();
    var cats = Object.keys(counts).sort();
    var _hq = new URLSearchParams(parseHash().qs || "");
    var params = _hq.get("cat") ? _hq : (location.search ? new URLSearchParams(location.search) : new URLSearchParams());
    var active = params.get("cat") || "全部";
    var activeTag = params.get("tag") || "";

    var chips =
      '<button class="chip" data-cat="全部" aria-pressed="false">全部<span class="count">' +
      POSTS.length +
      "</span></button>";
    cats.forEach(function (c) {
      chips +=
        '<button class="chip" data-cat="' +
        esc(c) +
        '" aria-pressed="false">' +
        esc(c) +
        '<span class="count">' +
        counts[c] +
        "</span></button>";
    });
    if (bar) bar.innerHTML = chips;

    function apply(cat, tag) {
      var list = orderedPosts().filter(function (p) {
        var okCat = !cat || cat === "全部" || p.cat === cat;
        var okTag = !tag || (p.tags || []).indexOf(tag) !== -1;
        return okCat && okTag;
      });
      renderCards(box, list);
      if (bar) {
        Array.prototype.forEach.call(bar.querySelectorAll(".chip"), function (b) {
          b.setAttribute("aria-pressed", String(b.dataset.cat === (tag ? "" : cat)));
        });
      }
      var title = $("#filter-note");
      if (title) {
        title.textContent = tag
          ? "标签：" + tag + "（" + list.length + " 篇）"
          : cat === "全部"
          ? "共 " + list.length + " 篇"
          : cat + "（" + list.length + " 篇）";
      }
    }

    if (bar) {
      bar.addEventListener("click", function (e) {
        var btn = e.target.closest(".chip");
        if (!btn) return;
        active = btn.dataset.cat;
        activeTag = "";
        apply(active, "");
        history.replaceState(null, "", "/writing");
      });
    }

    apply(active, activeTag);
  }

  /* ---------- 详情页 ---------- */

  /* 给没有滚动容器的表格补一个。
     内容里表格有两种写法：一种外面已经包了 <div class="pg-tablewrap">，
     一种是裸的。裸的那种在窄屏上会顺着版面铺开，把整篇文章顶出屏幕。
     这里是渲染完之后扫一遍正文，把裸表格裹进同样的容器里。 */
  function wrapBareTables(host) {
    if (!host) return;
    var prose = host.querySelector(".g-prose");
    if (!prose) return;
    var tables = prose.querySelectorAll("table");
    for (var i = 0; i < tables.length; i++) {
      var t = tables[i];
      // 已经有容器的跳过（pg-tablewrap / g-tablewrap 都算）
      if (t.parentElement && /tablewrap/i.test(t.parentElement.className || "")) continue;
      var wrap = document.createElement("div");
      wrap.className = "pg-tablewrap";
      t.parentNode.insertBefore(wrap, t);
      wrap.appendChild(t);
    }
  }

  /* ---------- 站内视频卡（data-bvid） ----------
     正文里只写 <div data-bvid="BV..." data-title="..."></div>，
     这里把它变成一张封面卡；点一下才塞进 iframe，省流量也不拖首屏。 */
  function mountVideos(host) {
    if (!host) return;
    var nodes = host.querySelectorAll("[data-bvid]");
    for (var i = 0; i < nodes.length; i++) {
      (function (el) {
        if (el.getAttribute("data-video-ready")) return;
        el.setAttribute("data-video-ready", "1");

        var bv = (el.getAttribute("data-bvid") || "").trim();
        var title = el.getAttribute("data-title") || "点击播放";
        // BV 号格式不对就别留个空框，直接藏掉
        if (!/^BV[0-9A-Za-z]{10}$/.test(bv)) {
          el.style.display = "none";
          return;
        }
        if (!el.className) el.className = "g-bv";
        el.setAttribute("role", "button");
        el.setAttribute("tabindex", "0");
        el.setAttribute("aria-label", "播放视频：" + title);

        var play = document.createElement("span");
        play.className = "g-bv-play";
        play.setAttribute("aria-hidden", "true");
        var cap = document.createElement("span");
        cap.className = "g-bv-title";
        cap.textContent = title;
        el.innerHTML = "";
        el.appendChild(play);
        el.appendChild(cap);

        function start() {
          if (el.getAttribute("data-playing")) return;
          el.setAttribute("data-playing", "1");
          el.classList.add("is-playing");
          el.removeAttribute("role");
          el.removeAttribute("tabindex");
          var f = document.createElement("iframe");
          f.className = "g-bv-frame";
          f.setAttribute("scrolling", "no");
          f.setAttribute("frameborder", "0");
          f.setAttribute("allowfullscreen", "true");
          f.setAttribute("allow", "autoplay; fullscreen");
          f.src =
            "https://player.bilibili.com/player.html?bvid=" +
            bv +
            "&page=1&high_quality=1&danmaku=0&autoplay=1";
          el.innerHTML = "";
          el.appendChild(f);
        }

        el.addEventListener("click", start);
        el.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " " || e.keyCode === 13 || e.keyCode === 32) {
            e.preventDefault();
            start();
          }
        });
      })(nodes[i]);
    }
  }

  /* ---------- 文章留言（读者留言） ----------
     在文章详情页底部挂一个「留言」入口，默认收起，展开才有列表与输入框。
     2026-11-06 重做：原来一大块表单常驻在正文卡之外，直接压着背景插画，
     深色下字和框都发糊，还有个亮色按钮格外扎眼；全站留言长期是 0，
     一整块空表单既占版面又劝退。现在没人用时只剩一行小字，有回音时自动摊开，
     想写一句只要一行加回车。数据仍走 /site-data/comments，
     所有用户内容一律用 textContent 渲染，避免 XSS。 */
  function fmtCmtTime(s) {
    if (!s) return "";
    var m = /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})/.exec(s);
    if (!m) return s;
    var d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]));
    d = new Date(d.getTime() + 8 * 3600 * 1000); // 服务器 UTC，转北京时间显示
    function p(n) { return (n < 10 ? "0" : "") + n; }
    return d.getUTCFullYear() + "-" + p(d.getUTCMonth() + 1) + "-" + p(d.getUTCDate()) +
      " " + p(d.getUTCHours()) + ":" + p(d.getUTCMinutes());
  }

  function mountComments(host, postId) {
    if (!host || !postId) return;
    var sec = host.querySelector(".g-comments");
    if (sec && sec.getAttribute("data-post") === postId) {
      loadComments(sec, postId);
      return;
    }
    if (sec) sec.remove();

    sec = document.createElement("section");
    sec.className = "g-comments";
    sec.setAttribute("data-post", postId);

    /* 一行入口：留言 · 条数 · 「写一句」提示 · 箭头（CSS 画） */
    var toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "g-cmt-toggle";
    toggle.setAttribute("aria-expanded", "false");
    var label = document.createElement("span");
    label.textContent = "留言";
    var count = document.createElement("span");
    count.className = "g-comments-count";
    count.textContent = "0";
    var hint = document.createElement("span");
    hint.className = "g-cmt-toggle-hint";
    hint.textContent = "写一句";
    toggle.appendChild(label);
    toggle.appendChild(count);
    toggle.appendChild(hint);
    sec.appendChild(toggle);

    var panel = document.createElement("div");
    panel.className = "g-cmt-panel";
    panel.hidden = true;

    var list = document.createElement("div");
    list.className = "g-cmt-list";
    panel.appendChild(list);

    var form = document.createElement("form");
    form.className = "g-cmt-form";
    form.setAttribute("autocomplete", "off");

    var compose = document.createElement("div");
    compose.className = "g-cmt-compose";
    var ta = document.createElement("textarea");
    ta.name = "text";
    ta.className = "g-cmt-text";
    ta.rows = 1;
    ta.maxLength = 2000;
    ta.required = true;
    ta.placeholder = "读到这儿，想到什么就留一句";
    var btn = document.createElement("button");
    btn.type = "submit";
    btn.className = "g-cmt-submit";
    btn.textContent = "发送";
    compose.appendChild(ta);
    compose.appendChild(btn);
    form.appendChild(compose);

    var foot = document.createElement("div");
    foot.className = "g-cmt-foot";
    var status = document.createElement("span");
    status.className = "g-cmt-status";
    var signBtn = document.createElement("button");
    signBtn.type = "button";
    signBtn.className = "g-cmt-sign";
    signBtn.textContent = "署名";
    var tip = document.createElement("span");
    tip.className = "g-cmt-tip";
    tip.textContent = "回车发送 · Shift + 回车换行";
    foot.appendChild(status);
    foot.appendChild(signBtn);
    foot.appendChild(tip);
    form.appendChild(foot);

    var nameWrap = document.createElement("div");
    nameWrap.className = "g-cmt-name-wrap";
    nameWrap.hidden = true;
    var nameI = document.createElement("input");
    nameI.type = "text";
    nameI.name = "name";
    nameI.className = "g-cmt-name";
    nameI.maxLength = 40;
    nameI.placeholder = "署名（留空就是匿名）";
    nameWrap.appendChild(nameI);
    form.appendChild(nameWrap);

    /* 管理入口：平时不占地方，只在有留言时露出一个极小的「管理」；
       也可以 Shift + 点标题直接进，方便在空文章上删东西。 */
    var adminBtn = document.createElement("button");
    adminBtn.type = "button";
    adminBtn.className = "g-cmt-admin";
    adminBtn.textContent = "管理";
    adminBtn.hidden = true;
    foot.appendChild(adminBtn);

    panel.appendChild(form);
    sec.appendChild(panel);
    /* 挂进正文卡里，别留在卡外压着背景插画：卡面是实底，字才不发糊 */
    var card = host.querySelector(".g-article");
    (card || host).appendChild(sec);

    function setOpen(on, focusIt) {
      sec.classList.toggle("is-open", on);
      panel.hidden = !on;
      toggle.setAttribute("aria-expanded", on ? "true" : "false");
      if (on && focusIt) {
        try { ta.focus({ preventScroll: true }); } catch (e) { ta.focus(); }
      }
    }

    function enterAdmin() {
      var pass = sessionStorage.getItem("reze-admin-pass");
      if (!pass) {
        pass = window.prompt("输入管理口令以删除留言：");
        if (!pass) return;
        sessionStorage.setItem("reze-admin-pass", pass);
      }
      sec.setAttribute("data-admin", "1");
      setOpen(true, false);
      loadComments(sec, postId, true);
    }

    toggle.addEventListener("click", function (e) {
      if (e.shiftKey) { enterAdmin(); return; }
      setOpen(!sec.classList.contains("is-open"), true);
    });
    adminBtn.addEventListener("click", enterAdmin);

    signBtn.addEventListener("click", function () {
      nameWrap.hidden = !nameWrap.hidden;
      if (nameWrap.hidden) { nameI.value = ""; }
      else { nameI.focus(); }
      signBtn.textContent = nameWrap.hidden ? "署名" : "不留名了";
    });

    /* 一行输入，写长了自己长高；中文输入法选字时的回车不发送 */
    ta.addEventListener("input", function () {
      ta.style.height = "auto";
      ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
    });
    ta.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey && !e.isComposing) {
        e.preventDefault();
        if (form.requestSubmit) form.requestSubmit();
        else btn.click();
      }
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = nameI.value.trim();
      var text = ta.value.trim();
      if (!text) { status.textContent = "内容为空"; return; }
      status.textContent = "发送中…";
      btn.disabled = true;
      fetch("/site-data/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post: postId, name: name, text: text })
      })
        .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) {
          if (res.ok && res.j && res.j.ok) {
            ta.value = "";
            ta.style.height = "auto";
            status.textContent = "已发出";
            loadComments(sec, postId, true);
          } else {
            status.textContent = (res.j && res.j.error) || "发送失败，稍后再试";
          }
        })
        .catch(function () { status.textContent = "网络出错，稍后再试"; })
        .then(function () { btn.disabled = false; });
    });

    loadComments(sec, postId);
  }

  function loadComments(sec, postId, keepOpen) {
    var list = sec.querySelector(".g-cmt-list");
    var count = sec.querySelector(".g-comments-count");
    var panel = sec.querySelector(".g-cmt-panel");
    var toggle = sec.querySelector(".g-cmt-toggle");
    var adminBtn = sec.querySelector(".g-cmt-admin");
    var isAdmin = sec.getAttribute("data-admin") === "1";
    var pass = sessionStorage.getItem("reze-admin-pass");
    fetch("/site-data/comments?post=" + encodeURIComponent(postId), { cache: "no-store" })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var cs = (data && data.comments) || [];
        count.textContent = String(cs.length);
        list.innerHTML = "";
        if (adminBtn) adminBtn.hidden = !cs.length;
        cs.forEach(function (c) {
          var item = document.createElement("div");
          item.className = "g-cmt";
          var head = document.createElement("div");
          head.className = "g-cmt-head";
          var who = document.createElement("span");
          who.className = "g-cmt-who";
          who.textContent = c.name || "匿名";
          var when = document.createElement("span");
          when.className = "g-cmt-when";
          when.textContent = fmtCmtTime(c.created_at);
          head.appendChild(who);
          head.appendChild(when);
          var body = document.createElement("div");
          body.className = "g-cmt-body";
          body.textContent = c.text;
          item.appendChild(head);
          item.appendChild(body);
          if (isAdmin && pass) {
            var del = document.createElement("button");
            del.type = "button";
            del.className = "g-cmt-del";
            del.textContent = "删除";
            del.addEventListener("click", function () {
              if (!window.confirm("删除这条留言？")) return;
              fetch("/site-data/comments/" + c.id, {
                method: "DELETE",
                headers: { "X-Admin-Pass": pass }
              }).then(function (r) { if (r.ok) loadComments(sec, postId, true); });
            });
            item.appendChild(del);
          }
          list.appendChild(item);
        });
        /* 有回音就摊开让后来的人看见；没人留话时保持收起，
           用户自己点开过就别替他合上。 */
        if (cs.length && (keepOpen || !sec.classList.contains("is-open"))) {
          sec.classList.add("is-open");
          panel.hidden = false;
          toggle.setAttribute("aria-expanded", "true");
        }
      })
      .catch(function () {
        list.innerHTML = "";
        var st = sec.querySelector(".g-cmt-status");
        if (st) st.textContent = "留言加载失败";
      });
  }

  /* ---------- 相关阅读：按内容算，不记行为 ----------
     首屏只装元数据，所以用标题/摘要/标签/分类的汉字二元组做 TF-IDF，
     再叠加标签重合、同分类、年份接近。全程本地算，不上传、不画像、不记点击。 */
  var _relCache = { sig: "", inv: null, docs: null };
  /* 字面二元组只会认「同一个词」，认不出「算力」和「工人」在谈同一件事。
     这几组主题词把相近的话题归到一起，至少命中两个词才算数。 */
  var TOPICS = [
    { n: "机器与劳动", w: ["人工智能", "大模型", "算力", "机器", "算法", "工人", "劳动", "就业", "失业", "自动化", "岗位", "替代", "生产", "效率", "普通人", "优化", "技术性失业", "消费"] },
    { n: "制度与门槛", w: ["社保", "税", "政策", "制度", "补贴", "低保", "工伤", "罚款", "规定", "资格", "门槛", "休假", "退休", "监管", "认定", "申领"] },
    { n: "词与日常", w: ["内耗", "班味", "搭子", "松弛", "独处", "童年", "缘分", "情绪", "焦虑", "免税", "快剪", "语音", "演唱会", "黄金", "体验", "悦己"] },
    { n: "文史与诗", w: ["诗", "唐诗", "宋词", "鲁迅", "陶渊明", "白居易", "典故", "文言", "古籍", "史记", "文学", "朱光潜"] },
    { n: "书与电影", w: ["小说", "读书", "电影", "导演", "镜头", "角色", "叙事", "影评", "书评", "类型文学"] },
    { n: "数学与技术", w: ["数学", "几何", "证明", "停机问题", "代码", "程序", "模型", "公式", "数据", "曲线", "圆度"] }
  ];
  function topicsOf(p) {
    var s = (p.title + " " + (p.excerpt || "") + " " + (p.tags || []).join(" ") + " " + (p.cat || "")).toLowerCase();
    var out = [];
    TOPICS.forEach(function (t, i) {
      var hit = 0;
      t.w.forEach(function (w) { if (s.indexOf(w.toLowerCase()) !== -1) hit++; });
      if (hit >= 2) out.push(i);
    });
    return out;
  }
  function hanGrams(s) {
    s = String(s || "").replace(/[^\u4e00-\u9fffA-Za-z0-9]/g, "");
    var a = [];
    for (var i = 0; i < s.length - 1; i++) a.push(s.substr(i, 2));
    return a;
  }
  function relSignature() {
    var last = "";
    for (var i = 0; i < POSTS.length; i++) {
      var u = POSTS[i].updated || POSTS[i].date || "";
      if (u > last) last = u;
    }
    return POSTS.length + "|" + last;
  }
  function buildRelIndex() {
    var sig = relSignature();
    if (_relCache.sig === sig && _relCache.inv) return _relCache;
    var docs = POSTS.map(function (p) {
      var txt = p.title + " " + p.title + " " + (p.excerpt || "") + " " +
        (p.tags || []).join(" ") + " " + (p.cat || "");
      var g = hanGrams(txt), tf = {};
      g.forEach(function (t) { tf[t] = (tf[t] || 0) + 1; });
      return { p: p, tf: tf, topics: topicsOf(p) };
    });
    var df = {};
    docs.forEach(function (d) {
      Object.keys(d.tf).forEach(function (t) { df[t] = (df[t] || 0) + 1; });
    });
    var N = docs.length || 1, inv = {};
    docs.forEach(function (d, i) {
      var norm = 0, w = {};
      Object.keys(d.tf).forEach(function (t) {
        var v = (1 + Math.log(d.tf[t])) * Math.log(1 + N / (1 + (df[t] || 0)));
        w[t] = v;
        norm += v * v;
      });
      norm = Math.sqrt(norm) || 1;
      var nw = {};
      Object.keys(w).forEach(function (t) {
        nw[t] = w[t] / norm;
        (inv[t] || (inv[t] = [])).push({ i: i, w: nw[t] });
      });
      /* 自向量也要归一化：否则点积被放大 norm 倍，摘要长的老文会压过新文 */
      d.w = nw;
    });
    _relCache = { sig: sig, inv: inv, docs: docs };
    return _relCache;
  }
  /* opts.exclude：结果里剔掉这些 id（猜你喜欢要把刚读的那几篇挡在外面）。
     opts.src：来源是几篇文章时，只认「被不止一篇提到」的候选，同标签权重也按篇数加，
     这样不会因为其中一篇标签特别多就把推荐全带偏。 */
  function relatedPosts(p, limit, opts) {
    if (!p) return [];
    var exclude = (opts && opts.exclude) || {};
    var C = buildRelIndex(), self = -1;
    for (var i = 0; i < C.docs.length; i++) {
      if (C.docs[i].p.id === p.id) { self = i; break; }
    }
    if (self < 0) return [];
    var scores = {}, tags = p.tags || [], w = C.docs[self].w;
    Object.keys(w).forEach(function (t) {
      (C.inv[t] || []).forEach(function (e) {
        if (e.i === self) return;
        scores[e.i] = (scores[e.i] || 0) + w[t] * e.w;
      });
    });
    var pYear = parseInt((p.date || "0").slice(0, 4), 10) || 0;
    var tagW = (opts && opts.src) ? opts.src : 1;
    var selfTopics = C.docs[self].topics || [];
    C.docs.forEach(function (d, i) {
      if (i === self) return;
      var s = scores[i] || 0;
      var common = (d.p.tags || []).filter(function (t) { return tags.indexOf(t) !== -1; });
      var shared = (d.topics || []).filter(function (t) { return selfTopics.indexOf(t) !== -1; });
      if (common.length) s += 0.32 * common.length * tagW;
      if (shared.length) s += 0.22 * shared.length;
      if (d.p.cat && d.p.cat === p.cat) s += 0.05;
      var dy = Math.abs((parseInt((d.p.date || "0").slice(0, 4), 10) || 0) - pYear);
      if (dy <= 1) s += 0.02;
      if (d.p.pinned) s += 0.01;
      scores[i] = s;
    });
    return Object.keys(scores).map(function (k) {
      var i = Number(k), d = C.docs[i];
      var common = (d.p.tags || []).filter(function (t) { return tags.indexOf(t) !== -1; });
      var shared = (d.topics || []).filter(function (t) { return selfTopics.indexOf(t) !== -1; });
      var reason = common.length
        ? "同标签 · " + common[0]
        : (shared.length ? "都在谈「" + TOPICS[shared[0]].n + "」"
          : (d.p.cat && d.p.cat === p.cat ? "同在「" + d.p.cat + "」" : "话题相近"));
      return { post: d.p, score: scores[i], reason: reason };
    }).filter(function (x) {
      if (exclude[x.post.id]) return false;
      return x.score > 0.012;
    })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, limit || 12);
  }
  function pickRelated(all, seed, n) {
    if (all.length <= n) return all;
    if (!seed) return all.slice(0, n);
    var out = [], start = (seed * n) % all.length;
    for (var i = 0; i < n; i++) out.push(all[(start + i) % all.length]);
    return out;
  }
  function relatedItemHtml(r) {
    return '<a href="/p/' + encodeURIComponent(r.post.id) + '">' +
      '<span class="rl-t">' + esc(r.post.title) + "</span>" +
      '<span class="rl-r">' + esc(r.reason) + "</span></a>";
  }
  function relatedBlockHtml(p, seed) {
    var all = relatedPosts(p, 12);
    if (!all.length) return "";
    return '<section class="g-related" data-rel-id="' + esc(p.id) + '" data-rel-seed="' + (seed || 0) + '">' +
      '<div class="g-related-hd"><h3>接着读</h3>' +
      '<button type="button" data-rel-more="1">换一批</button></div>' +
      '<div class="g-related-list">' + pickRelated(all, seed || 0, 3).map(relatedItemHtml).join("") + "</div>" +
      "</section>";
  }

  /* 首页「今日一组」：挑一篇种子，把与它最相近的三篇摆在一起。 */
  var _recSeed = 0;
  function dailyPick() {
    var day = Number(new Date().toISOString().slice(0, 10).replace(/-/g, "")) || 1;
    var pool = POSTS.filter(function (p) { return p.excerpt && !p.pinned; });
    if (!pool.length) pool = POSTS.slice();
    if (!pool.length) return { base: null, list: [] };
    var base = pool[(day + _recSeed * 7) % pool.length];
    return { base: base, list: pickRelated(relatedPosts(base, 12), _recSeed, 3) };
  }
  function recStripHtml() {
    var d = dailyPick();
    if (!d.base || !d.list.length) return "";
    return '<section class="g-rec-strip">' +
      '<div class="g-rec-hd"><span>今日一组</span>' +
      '<button type="button" data-rec-more="1">换一组</button></div>' +
      '<div class="g-rec-body">' +
        '<a class="g-rec-base" href="/p/' + encodeURIComponent(d.base.id) + '">' +
          '<span class="rb-k">' + esc(d.base.cat) + "</span>" +
          '<strong class="rb-t">' + esc(d.base.title) + "</strong>" +
          '<span class="rb-m">' + fmtDate(d.base.date) + "</span>" +
        "</a>" +
        '<div class="g-rec-items">' + d.list.map(function (r, i) {
          return '<a href="/p/' + encodeURIComponent(r.post.id) + '">' +
            "<i>0" + (i + 1) + "</i><span>" + esc(r.post.title) + "</span>" +
            "<em>" + esc(r.reason) + "</em></a>";
        }).join("") + "</div>" +
      "</div></section>";
  }

  /* 换一批 / 换一组：整页委托，重画后不用重新绑事件 */
  document.addEventListener("click", function (e) {
    if (!e.target || !e.target.closest) return;
    var relBtn = e.target.closest("[data-rel-more]");
    if (relBtn) {
      var box = relBtn.closest(".g-related");
      if (!box) return;
      var id = box.getAttribute("data-rel-id");
      var seed = Number(box.getAttribute("data-rel-seed") || 0) + 1;
      var list = box.querySelector(".g-related-list");
      var p = postById(id);
      if (list && p) {
        list.innerHTML = pickRelated(relatedPosts(p, 12), seed, 3).map(relatedItemHtml).join("");
        box.setAttribute("data-rel-seed", String(seed));
      }
      return;
    }
    if (e.target.closest("[data-rec-more]")) {
      _recSeed++;
      var strip = document.querySelector(".g-rec-strip");
      if (strip) strip.outerHTML = recStripHtml();
    }
  });

  function mountPost(host, id) {
    if (!host) host = $("#post");
    if (!host) return;
    if (id === undefined) id = postIdFromUrl();
    var p = postById(id);

    if (!p) {
      // 内容还在路上时，不能一口咬定「没有找到」：云端那份比 data.js 新，
      // 刚发的文章往往还没落到本地兜底数据里，等一会儿就会出现。
      if (!window.__contentReady && id) {
        host.setAttribute("data-post-pending", "1");
        host.setAttribute("data-post-id", id);
        host.removeAttribute("data-post-sig");
        host.innerHTML =
          '<article class="g-article">' +
          backLinkHtml() +
          "<h1>正在读取这一篇</h1>" +
          '<div class="g-meta"><span>内容正在取回</span></div>' +
          '<div class="g-prose prose"><p>稍等一会儿。如果一直停在这里，刷新一次通常就好。</p></div>' +
          "</article>";
        return;
      }
      host.removeAttribute("data-post-pending");
      host.removeAttribute("data-post-id");
      host.removeAttribute("data-post-sig");
      var noNet = !window.__contentGot; // 没真正拿到云端数据（请求失败）时才这么说
      host.innerHTML = noNet
        ? '<article class="g-article">' +
          backLinkHtml() +
          "<h1>暂时读不到这一篇</h1>" +
          '<div class="g-meta"><span>网络没接上，或者服务器在忙</span></div>' +
          '<div class="g-prose prose"><p>刷新一次试试。如果一直这样，可以先去<a href="/writing">文章列表</a>。</p></div>' +
          "</article>"
        : '<article class="g-article">' +
          backLinkHtml() +
          "<h1>没有找到这篇文章</h1>" +
          '<div class="g-meta"><span>它可能被移动或改名了</span></div>' +
          '<div class="g-prose prose"><p>你可以从<a href="/writing">文章列表</a>里重新找找。</p></div>' +
          "</article>";
      return;
    }

    /* 首屏那份正文是服务端直出的（middleware 塞进 #post，带 data-ssr-id）。
       正文还没取回来之前先留着它——否则刚能读的字会被空壳盖掉，白闪一下。 */
    if (!p.content && host.getAttribute("data-ssr-id") === String(p.id)) {
      if (!p._bodyLoading) {
        p._bodyLoading = true;
        fetchPostBody(p.id).then(function (body) {
          p._bodyLoading = false;
          if (!body) return;
          p.content = body;
          p.words = plain(body).length;
          var ys = window.scrollY;
          mountPost(host, p.id);
          if (ys > 0) instantScrollTo(ys);
        });
      }
      return;
    }

    /* 首屏只装了元数据，正文按需取这一篇。取回来后原地重画，滚动位置不动。 */
    if (!p.content && !p._bodyLoading) {
      p._bodyLoading = true;
      fetchPostBody(p.id).then(function (body) {
        p._bodyLoading = false;
        if (!body) return;
        p.content = body;
        p.words = plain(body).length;
        var y = window.scrollY;
        mountPost(host, p.id);
        if (y > 0) instantScrollTo(y);
      });
    }

    // 记下这一次画的是哪一版，云端数据回来后好判断要不要重画
    host.removeAttribute("data-post-pending");
    host.removeAttribute("data-ssr-id");
    host.setAttribute("data-post-id", p.id);
    host.setAttribute("data-post-sig", String((p.content || "").length));

    document.title = p.title + " · " + SITE.name;

    /* 本篇材料：正文里已有的视频卡、表格、参考条目，标题下先摆一行。
       服务端直出的那份同样带这行，重绘前后不跳。 */
    var bodyHtml = String(p.content || "");
    var matBits = [];
    var nVideo = (bodyHtml.match(/data-bvid\s*=/g) || []).length;
    var nTable = (bodyHtml.match(/<table\b/gi) || []).length;
    var mRef = /<h2[^>]*>[^<]*(?:参考|延伸)[^<]*<\/h2>/.exec(bodyHtml);
    var nRef = 0;
    if (mRef) {
      var refTail = bodyHtml.slice(mRef.index + mRef[0].length);
      var nx = /<h[12]\b/.exec(refTail);
      if (nx) refTail = refTail.slice(0, nx.index);
      nRef = (refTail.match(/<li\b/gi) || []).length;
    }
    if (nVideo) matBits.push("视频 " + nVideo);
    if (nTable) matBits.push("表 " + nTable);
    if (nRef) matBits.push("参考 " + nRef);
    var mat = matBits.length ? '<span class="mat">' + matBits.join(" · ") + "</span>" : "";

    var meta =
      '<div class="g-meta">' +
      "<span>" +
      ICONS.cal +
      "发布于 " +
      fmtDate(p.date) +
      "</span>" +
      (p.updated
        ? "<span>" + ICONS.clock + "更新于 " + fmtDate(p.updated) + "</span>"
        : "") +
      '<span class="cat" style="--cat-h:' +
      catHue(p.cat) +
      '">' +
      ICONS.folder +
      esc(p.cat) +
      "</span>" +
      "<span>" +
      ICONS.doc +
      wordCount(p).toLocaleString() +
      " 字</span>" +
      mat +
      "</div>";

    var cover = p.cover
      ? '<div class="post-cover"><img src="' + esc(p.cover) + '" alt="' + esc(p.title) + '"></div>'
      : "";

    var idx = orderedPosts().indexOf(p);
    var prev = orderedPosts()[idx + 1];
    var next = orderedPosts()[idx - 1];
    var navItems = [];
    if (prev) {
      navItems.push(
        '<a href="/p/' +
          encodeURIComponent(prev.id) +
          '"><span class="k">← 上一篇</span><span class="t">' +
          esc(prev.title) +
          "</span></a>"
      );
    }
    if (next) {
      navItems.push(
        '<a class="next" href="/p/' +
          encodeURIComponent(next.id) +
          '"><span class="k">下一篇 →</span><span class="t">' +
          esc(next.title) +
          "</span></a>"
      );
    }
    var nav = navItems.length
      ? '<div class="g-nav' + (navItems.length === 1 ? " one" : "") + '">' +
        navItems.join("") +
        "</div>"
      : "";

    var tags = (p.tags || [])
      .map(function (t) {
        return (
          '<a href="/writing?tag=' +
          encodeURIComponent(t) +
          '" style="--tag-h:' +
          tagHue(t) +
          '"># ' +
          esc(t) +
          "</a>"
        );
      })
      .join("");

    var CAT_SKIN = { "读书": "reading", "技术": "tech", "日常": "daily", "电影": "movie", "杂记": "notes", "文史": "history" };
    var skin = CAT_SKIN[p && p.cat] || "";

    /* 首行缩进按篇开关。中文长文的老排法，全站默认不排；
       这篇文章要排，就在正文最前面加一行 <div class="pg-indent"></div> 占位，
       渲染时读出来、去掉占位、把类名挂到正文容器上。
       之所以不直接写 <div class="g-prose prose pg-indent">，是因为正文容器
       由这里统一生成（还要接类目 skin），文章里改不了它。 */
    var indentHint = /^\s*<div class="pg-indent"><\/div>\s*/;
    var wantIndent = indentHint.test(p.content || "");
    var content = wantIndent ? (p.content || "").replace(indentHint, "") : p.content;
    if (!content) content = '<p class="pg-loading">正文正在取回…</p>';

    host.innerHTML =
      '<article class="g-article' + (p.cover ? "" : " no-cover") + '" style="--cat-h:' + catHue(p.cat) + '">' +
      backLinkHtml() +
      "<h1>" +
      esc(p.title) +
      "</h1>" +
      meta +
      cover +
      '<div class="g-prose prose' + (skin ? " prose--" + skin : "") + (wantIndent ? " pg-indent" : "") + '">' +
      content +
      "</div>" +
      '<div class="g-article-foot">' +
      '<div class="g-article-tags">' +
      tags +
      "</div>" +
      nav +
      "</div>" +
      relatedBlockHtml(p, 0) +
      '<div class="g-mail-cta"><a href="mailto:1806754672@qq.com">写信：1806754672@qq.com</a></div>' +
      "</article>";

    // 正文里的图统一补懒加载、异步解码与原始宽高
    applyImgSize(host);

    // 手机上表格必须能横向滚。内容里的表格有两种写法：
    // 一种自己包了 <div class="pg-tablewrap">，一种什么都没包 ——
    // 后者在窄屏上直接把版面撑破，这里给它补上容器。
    wrapBareTables(host);

    // 站内视频卡：正文里写了 data-bvid 的，这里变成「点击才加载」
    mountVideos(host);
    recordRead(p.id);
    attachReadScroll(p.id);
    restoreRead(p.id);
    applyReadFs(readFsIndex());
    buildPostTools(p);

    // 详情页没有三栏，目录得自己长出来（宽屏落右栏、窄屏落正文上方）。
    // 标题少于 4 个的直接不生成，省得小文章也挂个目录。
    insertPostToc(host);

    // 详情页也铺背景图（沿用当前选中的那张，不重置选择）
    var bgEl = $("#page-bg");
    if (bgEl && !bgEl.style.backgroundImage) {
      initPageBg();
    }

    // 阅读进度
    var bar = $("#progress");
    if (bar) {
      function onScroll() {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        var pct = h > 0 ? (window.scrollY / h) * 100 : 0;
        bar.style.width = Math.min(100, Math.max(0, pct)) + "%";
      }
      if (window.__postScroll) window.removeEventListener("scroll", window.__postScroll);
      window.__postScroll = onScroll;
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    // 文章底部留言区已收起（长期 0 条，改用页脚 / 关于页的邮箱入口）
    // mountComments(host, p.id);
  }


  /* ---------- 文章页工具栏：字号 / 收藏 / 复制 / 打印 ----------
     只碰正文容器的 --read-fs，不改任何字号写死的组件。字号偏好存本地，
     跨文章、跨会话沿用。 */
  var FS_STEPS = [16, 17.5, 19, 21];
  var FS_NAMES = ["小", "中", "大", "特大"];
  /* 没存过就用最小一档：正文默认 16px，跟改动前的观感一致。
     存过的值越界（改过档位表）也回最小一档，不去猜用户想要哪一档。 */
  function readFsIndex() {
    var raw = STORAGE.get("reze_read_fs");
    if (raw === null || raw === "") return 0;
    var v = Number(raw);
    return v >= 0 && v < FS_STEPS.length ? v : 0;
  }
  function applyReadFs(i) {
    var root = document.documentElement;
    // 正文字号本来就走 --prose-fs，这里直接改它，不去另起一套变量
    root.style.setProperty("--prose-fs", FS_STEPS[i] + "px");
    STORAGE.set("reze_read_fs", String(i));
    var btns = document.querySelectorAll(".g-tools .fs-btn");
    for (var k = 0; k < btns.length; k++) {
      btns[k].classList.toggle("on", Number(btns[k].getAttribute("data-fs")) === i);
    }
  }

  /* 收藏：只存 id 与时间，不存正文，不占本地空间 */
  function getSaved() {
    try {
      var a = JSON.parse(STORAGE.get("reze_saved") || "[]");
      return Array.isArray(a) ? a : [];
    } catch (e) {
      return [];
    }
  }
  function isSaved(id) {
    var a = getSaved();
    for (var i = 0; i < a.length; i++) if (a[i].id === id) return true;
    return false;
  }
  function toggleSave(id) {
    var a = getSaved();
    var hit = -1;
    for (var i = 0; i < a.length; i++) if (a[i].id === id) { hit = i; break; }
    if (hit >= 0) a.splice(hit, 1);
    else a.unshift({ id: id, t: Date.now() });
    STORAGE.set("reze_saved", JSON.stringify(a.slice(0, 200)));
    return hit < 0;
  }
  function syncSaveBtn(on) {
    var b = document.querySelector(".g-tools .save-btn");
    if (!b) return;
    b.classList.toggle("on", !!on);
    var lab = b.querySelector(".lab");
    if (lab) lab.textContent = on ? "已收藏" : "收藏";
    b.setAttribute("aria-pressed", on ? "true" : "false");
  }

  function toastMsg(msg) {
    var t = document.createElement("div");
    t.className = "g-toast";
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add("in"); });
    setTimeout(function () {
      t.classList.remove("in");
      setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 260);
    }, 1600);
  }

  function buildPostTools(p) {
    var host = document.querySelector(".g-article");
    if (!host || host.querySelector(".g-tools")) return;
    var fsHtml = FS_STEPS.map(function (v, i) {
      return '<button type="button" class="fs-btn' + (i === readFsIndex() ? " on" : "") +
        '" data-fs="' + i + '" title="字号 ' + FS_NAMES[i] + '">' + FS_NAMES[i] + "</button>";
    }).join("");
    var saved = isSaved(p.id);
    var box = document.createElement("div");
    box.className = "g-tools";
    box.innerHTML =
      '<div class="tools-grp fs-grp" role="group" aria-label="正文字号">' + fsHtml + "</div>" +
      '<button type="button" class="tools-btn save-btn' + (saved ? " on" : "") +
      '" aria-pressed="' + (saved ? "true" : "false") + '">' + ICONS.book +
      '<span class="lab">' + (saved ? "已收藏" : "收藏") + "</span></button>" +
      '<button type="button" class="tools-btn copy-btn">' + ICONS.note +
      "<span class=\"lab\">复制链接</span></button>" +
      '<button type="button" class="tools-btn print-btn">' + ICONS.doc +
      "<span class=\"lab\">打印</span></button>";
    /* 位置：正文之后、文末标签之前。原先 appendChild 会落到「接着读」之后，
       读起来像是被夹在推荐块里；锚到 .g-article-foot 前面更稳。 */
    var foot = host.querySelector(".g-article-foot");
    if (foot && foot.parentNode === host) host.insertBefore(box, foot);
    else host.appendChild(box);

    box.addEventListener("click", function (e) {
      var fs = e.target.closest ? e.target.closest(".fs-btn") : null;
      if (fs) {
        applyReadFs(Number(fs.getAttribute("data-fs")));
        return;
      }
      var sb = e.target.closest ? e.target.closest(".save-btn") : null;
      if (sb) {
        var on = toggleSave(p.id);
        syncSaveBtn(on);
        toastMsg(on ? "已收进收藏" : "已移出收藏");
        return;
      }
      var cb = e.target.closest ? e.target.closest(".copy-btn") : null;
      if (cb) {
        var url = location.origin + postHref(p.id);
        var done = function () { toastMsg("链接已复制"); };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(done, function () { toastMsg("复制失败"); });
        } else {
          var ta = document.createElement("textarea");
          ta.value = url;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand("copy"); done(); } catch (err) { toastMsg("复制失败"); }
          document.body.removeChild(ta);
        }
        return;
      }
      var pb = e.target.closest ? e.target.closest(".print-btn") : null;
      if (pb) window.print();
    });
  }

  /* ---------- 我的收藏 ---------- */
  function buildSavedPanel() {
    var a = getSaved();
    var rows = "";
    for (var i = 0; i < a.length; i++) {
      var post = postById(a[i].id);
      if (!post) continue;
      rows +=
        '<li><a href="' + postHref(post.id) + '">' +
        '<span class="t">' + esc(post.title) + "</span>" +
        '<span class="d">' + fmtDate(post.date) + " · " + esc(post.cat || "") + "</span></a>" +
        '<button type="button" class="del" data-id="' + esc(post.id) + '" aria-label="移出收藏">×</button></li>';
    }
    var body = document.getElementById("saved-body");
    if (!body) return;
    body.innerHTML = rows
      ? '<ul class="saved-list">' + rows + "</ul>"
      : '<p class="saved-empty">还没有收藏。</p>';
    var dels = body.querySelectorAll(".del");
    for (var k = 0; k < dels.length; k++) {
      dels[k].addEventListener("click", function (e) {
        e.preventDefault();
        toggleSave(this.getAttribute("data-id"));
        buildSavedPanel();
      });
    }
  }
  function openSaved() {
    buildSavedPanel();
    openModal("saved-overlay");
  }
  function initSaved() {
    // 两个弹层按发现/年度回顾同一套外壳生成，风格不另起一套
    if (!document.getElementById("saved-overlay")) {
      var so = document.createElement("div");
      so.className = "search-overlay saved-overlay";
      so.id = "saved-overlay";
      so.innerHTML =
        '<div class="search-box disc-box" role="dialog" aria-modal="true" aria-label="我的收藏">' +
        '<div class="disc-head"><span>我的收藏</span>' +
        '<button class="search-clear disc-x" type="button" aria-label="关闭">×</button></div>' +
        '<div class="disc-body"><div id="saved-body"></div>' +
        '<div class="saved-foot"><a href="#" class="js-saved-export">导出为 Markdown</a></div>' +
        "</div></div>";
      document.body.appendChild(so);
      so.addEventListener("click", function (e) { if (e.target === so) closeModal(so); });
      var sx = so.querySelector(".disc-x");
      if (sx) sx.addEventListener("click", function () { closeModal(so); });
    }
    if (!document.getElementById("keys-overlay")) {
      var ko = document.createElement("div");
      ko.className = "search-overlay keys-overlay";
      ko.id = "keys-overlay";
      var K = [
        ["Ctrl / ⌘ + K", "搜索"],
        ["/", "打开搜索"],
        ["?", "这张表"],
        ["s", "收藏当前文章"],
        ["t", "跳到目录"],
        ["g 然后 h", "回首页"],
        ["Esc", "关闭弹层"],
      ];
      ko.innerHTML =
        '<div class="search-box disc-box" role="dialog" aria-modal="true" aria-label="快捷键">' +
        '<div class="disc-head"><span>快捷键</span>' +
        '<button class="search-clear disc-x" type="button" aria-label="关闭">×</button></div>' +
        '<div class="disc-body"><dl class="keys-list">' +
        K.map(function (r) { return "<dt><kbd>" + r[0] + "</kbd></dt><dd>" + r[1] + "</dd>"; }).join("") +
        "</dl></div></div>";
      document.body.appendChild(ko);
      ko.addEventListener("click", function (e) { if (e.target === ko) closeModal(ko); });
      var kx = ko.querySelector(".disc-x");
      if (kx) kx.addEventListener("click", function () { closeModal(ko); });
    }
    var links = document.querySelectorAll(".js-saved");
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener("click", function (e) {
        e.preventDefault();
        openSaved();
      });
    }
    var keys = document.querySelectorAll(".js-keys");
    for (var j = 0; j < keys.length; j++) {
      keys[j].addEventListener("click", function (e) {
        e.preventDefault();
        openModal("keys-overlay");
      });
    }
    var dl = document.querySelector(".js-saved-export");
    if (dl) dl.addEventListener("click", function (e) {
      e.preventDefault();
      var a = getSaved();
      if (!a.length) { toastMsg("收藏夹是空的"); return; }
      var lines = a.map(function (x) {
        var post = postById(x.id);
        if (!post) return "";
        return "- [" + post.title + "](https://reze520.pages.dev" + postHref(post.id) + ")";
      }).filter(Boolean);
      var blob = new Blob(["# 收藏\n\n" + lines.join("\n") + "\n"], { type: "text/markdown;charset=utf-8" });
      var url = URL.createObjectURL(blob);
      var link = document.createElement("a");
      link.href = url;
      link.download = "reze-收藏.md";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
    });
  }

  /* ---------- 键盘快捷键 ----------
     只在没有输入焦点时接管，避免打断搜索框与留言框的输入。
     列表本身不挂全局快捷键，j/k 只在文章页里翻上一篇/下一篇。 */
  function inField(el) {
    if (!el) return false;
    var t = (el.tagName || "").toUpperCase();
    return t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || el.isContentEditable;
  }
  function initShortcuts() {
    var help = document.getElementById("keys-overlay");
    document.addEventListener("keydown", function (e) {
      if (inField(e.target) || e.ctrlKey || e.metaKey || e.altKey) return;
      var k = e.key;
      /* Shift+/ 在部分键盘布局与输入法下 e.key 报的是 "/"，两个都收 */
      if (k === "?" || (k === "/" && e.shiftKey)) {
        e.preventDefault();
        if (help) openModal("keys-overlay");
        return;
      }
      if (k === "Escape") {
        /* Esc 归这里管：弹层开着先收弹层。别指望弹层自己接——它盖在页面上，
           焦点却常留在 body，按键到不了它那儿。 */
        var openOv = document.querySelector(".search-overlay.open");
        if (openOv) { e.preventDefault(); closeModal(openOv); }
        return;
      }
      if (k === "g") {
        __gKeyAt = Date.now();
        return;
      }
      if (k === "h" && Date.now() - __gKeyAt < 900) {
        e.preventDefault();
        location.href = "/";
        return;
      }
      if (k === "s" && document.querySelector(".save-btn")) {
        var sb = document.querySelector(".save-btn");
        if (sb) { e.preventDefault(); sb.click(); }
        return;
      }
      if (k === "t") {
        var toc = document.querySelector(".g-toc a, #app-right .g-toc a");
        if (toc) { e.preventDefault(); toc.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
        /* 详情节另有自己的目录块；列表页的目录在右栏，窄屏下右栏整列收起，没有抽屉可开，就不再兜 */
        return;
      }
      if (k === "/" ) {
        var sbtn = document.getElementById("search-btn");
        if (sbtn) { e.preventDefault(); sbtn.click(); }
        return;
      }
    });
  }
  var __gKeyAt = 0;

  /* ---------- 归档热度条 ----------
     按年统计篇数，在归档页每行标题旁给出相对长度条。不写数字以外的东西。 */
  function yearHeatHtml(list) {
    var by = {};
    var max = 0;
    for (var i = 0; i < list.length; i++) {
      var y = String(list[i].date || "").slice(0, 4);
      if (!y) continue;
      by[y] = (by[y] || 0) + 1;
      if (by[y] > max) max = by[y];
    }
    return by;
  }
  function decorateArchiveHeat() {
    /* 年份块超过 40 篇时余下的行装在 .arc-rest[hidden] 里。那些行宽高为 0，
       把条画进去就是白画 —— 2020/2021/2022 年头几条条就这么丢的。
       只在已展开的行里算，展开剩余时再重建一次。 */
    var rows = [].slice.call(document.querySelectorAll("#app-main .arc-row")).filter(function (r) {
      return !r.closest(".arc-rest[hidden]");
    });
    if (!rows.length) return;

    /* 归档版式里年份写在每个 .arc-year 的 data-y 上，行里只有月日，
       所以按所在年份块归组，而不是去行里找四位数。 */
    function yearOfRow(row) {
      var blk = row.closest ? row.closest(".arc-year, section[id^='y']") : null;
      if (!blk) return "";
      var y = (blk.getAttribute("data-y") || "").trim();
      if (!/^\d{4}$/.test(y)) {
        var n = blk.querySelector(".arc-num");
        y = n ? (n.textContent || "").trim() : "";
      }
      return /^\d{4}$/.test(y) ? y : "";
    }

    /* 篇数取年份块标题上的 .arc-cnt（真实总数），不去数渲染出来的行。
       年块超过 40 篇时余下的行在 .arc-rest[hidden] 里，数行会把 2026 的 126 篇当成 40 篇，
       于是满条变成 85%，比例全错。 */
    var counts = {};
    var max = 0;
    var blocks = document.querySelectorAll("#app-main .arc-year");
    for (var b = 0; b < blocks.length; b++) {
      var yb = (blocks[b].getAttribute("data-y") || "").trim();
      if (!/^\d{4}$/.test(yb)) continue;
      var cntEl = blocks[b].querySelector(".arc-cnt");
      var n = cntEl ? parseInt((cntEl.textContent || "").replace(/[^\d]/g, ""), 10) : 0;
      if (!n) {
        /* 没有计数标签时只能数行，算个保底 */
        for (var q = 0; q < rows.length; q++) if (yearOfRow(rows[q]) === yb) n++;
      }
      counts[yb] = n;
      if (n > max) max = n;
    }
    if (!max) return;
    /* 一年一条就够：同一年里三十几行条条等长，重复的刻度不传递任何信息。
       用「这个年块已画过没」判断，不靠 previousElementSibling：年块超过 40 篇时
       前 40 行在 .arc-rows 里、余下在 .arc-rest 里，两个容器一展开就不是兄弟了，
       41 行的 previousElementSibling 是 null，于是该年多画一条。 */
    var drawn = {};
    for (var j = 0; j < rows.length; j++) {
      var y2 = yearOfRow(rows[j]);
      if (!y2 || !counts[y2] || drawn[y2]) continue;
      drawn[y2] = 1;
      if (rows[j].classList.contains("has-heat")) continue;
      var pct = Math.max(8, Math.round((counts[y2] / max) * 100));
      /* 用伪元素而不用子元素：.arc-row 是 grid，第三个子项会被排进隐式行，
         绘制被网格层叠吃掉。伪元素绝对定位不参与布局。 */
      rows[j].classList.add("has-heat");
      rows[j].style.setProperty("--heat", pct + "%");
      rows[j].setAttribute("data-heat", y2 + " 年共 " + counts[y2] + " 篇");
    }
  }
  /* 「展开剩余」把隐藏行放出来后，新露出的第一行还没条，重算一次。
     旧条先清，否则比例会按新总数变而旧条不动。 */
  function clearArchiveHeat() {
    var old = document.querySelectorAll("#app-main .has-heat");
    for (var i = 0; i < old.length; i++) {
      old[i].classList.remove("has-heat");
      old[i].style.removeProperty("--heat");
      old[i].removeAttribute("data-heat");
    }
  }
  window.__rezeRedrawHeat = function () {
    clearArchiveHeat();
    decorateArchiveHeat();
  };

  /* ---------- 右栏「今日」卡：农历 / 节气 / 距上次更新 ----------
     农历库是闲时才取的（443KB），取到前先只画公历与间隔天数。 */
  function todayCardHtml() {
    var now = new Date();
    var pad = function (n) { return (n < 10 ? "0" : "") + n; };
    var iso = now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate());
    var last = byDateList()[0];
    var gap = "";
    if (last) {
      var d0 = new Date(String(last.date).replace(/\./g, "-") + "T00:00:00");
      var d1 = new Date(iso + "T00:00:00");
      var n = Math.round((d1 - d0) / 86400000);
      gap = n <= 0 ? "今天有更新" : "距上次更新 " + n + " 天";
    }
    return (
      '<div class="g-card today-card">' +
      '<div class="g-card-head"><span class="t">' + ICONS.sun + "今日</span></div>" +
      '<div class="today-body">' +
      '<div class="today-date">' + iso.replace(/-/g, ".") + "</div>" +
      '<div class="today-lunar" data-lunar>' +
      (window.Solar ? lunarLine(now) : "农历取回中…") + "</div>" +
      '<div class="today-gap">' + gap + "</div></div></div>"
    );
  }
  function lunarLine(d) {
    try {
      var s = window.Solar.fromDate(d);
      var lun = s.getLunar();
      var parts = [];
      parts.push("农历" + lun.getMonthInChinese() + "月" + lun.getDayInChinese());
      var jq = lun.getJieQi();
      if (jq) parts.push(jq);
      var f = (s.getFestivals() || []).concat(lun.getFestivals() || []);
      if (f.length) parts.push(f[0]);
      return parts.join(" · ");
    } catch (e) {
      return "";
    }
  }
  function mountTodayCard(right) {
    if (!right) return;
    var wrap = document.createElement("div");
    wrap.innerHTML = todayCardHtml();
    var card = wrap.firstChild;
    right.insertBefore(card, right.firstChild);
    // 农历库是闲时才取，挂到日历的重绘钩子上：库到了这里顺带把农历补上
    if (!window.Solar) {
      var prevRepaint = window.__rezeRepaintCal;
      window.__rezeRepaintCal = function () {
        if (typeof prevRepaint === "function") prevRepaint();
        var box = card.querySelector && card.querySelector("[data-lunar]");
        if (box && window.Solar) box.textContent = lunarLine(new Date()) || "";
      };
    }
  }

  /* ---------- 阅读历史：续读 / 猜你喜欢 ---------- */
  function getHistory() {
    try {
      var a = JSON.parse(STORAGE.get("reze_history") || "[]");
      return Array.isArray(a) ? a : [];
    } catch (e) { return []; }
  }
  function recordRead(id) {
    if (!id) return;
    var h = getHistory().filter(function (x) { return x !== id; });
    h.unshift(id);
    if (h.length > 24) h = h.slice(0, 24);
    STORAGE.set("reze_history", JSON.stringify(h));
  }
  function readYMap() {
    try {
      var m = JSON.parse(STORAGE.get("reze_read_y") || "{}");
      return m && typeof m === "object" ? m : {};
    } catch (e) { return {}; }
  }
  function saveScroll(id, y) {
    if (!id) return;
    var m = readYMap();
    m[id] = Math.max(0, Math.round(y) || 0);
    STORAGE.set("reze_read_y", JSON.stringify(m));
  }
  function restoreRead(id) {
    var y = readYMap()[id];
    if (!y) return;
    instantScrollTo(y);
    requestAnimationFrame(function () { instantScrollTo(y); });
    setTimeout(function () { instantScrollTo(y); }, 400);
  }
  function attachReadScroll(id) {
    if (window.__readScroll) window.removeEventListener("scroll", window.__readScroll);
    window.__readId = id;
    var last = 0;
    window.__readScroll = function () {
      var now = Date.now();
      if (now - last < 700) return;
      last = now;
      saveScroll(window.__readId, window.scrollY);
    };
    window.addEventListener("scroll", window.__readScroll, { passive: true });
  }

  /* 「继续读」挂左栏、「猜你喜欢」挂右栏：都基于本地阅读历史，不建画像、不上传 */
  function renderRecModules(right) {
    var box = right || $("#app-right");
    if (!box) return;
    var hist = getHistory();

    var cont = document.getElementById("rec-continue");
    if (!cont) {
      cont = document.createElement("div");
      cont.className = "g-card rec-continue";
      cont.id = "rec-continue";
      box.appendChild(cont);
    }
    /* 只列最近 3 篇。这张卡在左栏，宽 248px、底下还压着别的卡片，
       列多了会一路把页面拖长，三篇刚好够勾人回去。
       历史里存着但已经解析不出来（文章删了/改名了）就当没读过，
       cItems 为空时整张卡收起——不留「还没有读过的文章」那种空壳。 */
    var cItems = hist.slice(0, 3).map(function (id) {
      var p = postById(id);
      if (!p) return "";
      return '<li><a href="/p/' + encodeURIComponent(p.id) + '">' +
        "<time>" + fmtDate(p.date) + "</time>" +
        "<span>" + esc(p.title) + "</span></a></li>";
    }).filter(Boolean).join("");
    if (!cItems) {
      cont.style.display = "none";
    } else {
      cont.style.display = "";
      cont.innerHTML =
        '<div class="g-card-head"><span class="t">' + ICONS.clock + "继续读</span></div>" +
        '<ul class="g-feed">' + cItems + "</ul>";
    }

    var guess = document.getElementById("rec-guess");
    if (!guess) {
      guess = document.createElement("div");
      guess.className = "g-card rec-guess";
      guess.id = "rec-guess";
      box.appendChild(guess);
    }
    /* 不只拿最后一篇当种子：一个人连着读的几篇合起来才说明他这两天在看什么。
       最近 3 篇各出候选，同篇累加分数，被不止一篇提到才算数；
       已经读过的挡掉，同一分类最多两条。 */
    var seeds = [], seen = {};
    for (var hi = 0; hi < hist.length && seeds.length < 3; hi++) {
      var hp = postById(hist[hi]);
      if (hp) seeds.push(hp);
    }
    seen = {};
    seeds.forEach(function (sp) { seen[sp.id] = 1; });
    var pool = {}, poolN = {};
    seeds.forEach(function (sp) {
      relatedPosts(sp, 12, { exclude: seen, src: 1 }).forEach(function (r) {
        if (!pool[r.post.id]) { pool[r.post.id] = { post: r.post, score: 0 }; poolN[r.post.id] = 0; }
        pool[r.post.id].score += r.score;
        poolN[r.post.id]++;
      });
    });
    var recs = [];
    /* 同一分类最多两条只管「相关推荐」这一段。放到最后统一剪会误伤兜底补进来的条目：
       三篇种子都属「读书」时，补满的那几条也同属「读书」，一剪又只剩两条。 */
    var catUsed = {};
    if (seeds.length > 1) {
      Object.keys(pool)
        .filter(function (k) { return poolN[k] > 1; })
        .sort(function (a, b) { return pool[b].score - pool[a].score; })
        .forEach(function (k) {
          var c2 = pool[k].post.cat || "";
          if ((catUsed[c2] || 0) >= 2) return;
          catUsed[c2] = (catUsed[c2] || 0) + 1;
          recs.push(pool[k].post);
        });
    }
    /* 交集不够时按票数补满：读完三篇同一分类，交集只剩下同分类的两篇，
       不补的话卡片只剩两条，看着像坏了。forEach 里 return 只是跳过本次，
       不是跳出整个循环，所以这里写 continue 语义是安全的。 */
    var have = {};
    recs.forEach(function (p) { have[p.id] = 1; });
    Object.keys(pool)
      .sort(function (a, b) { return pool[b].score - pool[a].score; })
      .forEach(function (k) {
        if (recs.length >= 5 || have[k]) return;
        recs.push(pool[k].post); have[k] = 1;
      });
    /* 还不足就退到最近更新，保证卡片永远是 5 条 */
    orderedPosts().forEach(function (p) {
      if (recs.length >= 5 || seen[p.id]) return;
      for (var ci = 0; ci < recs.length; ci++) if (recs[ci].id === p.id) return;
      recs.push(p);
    });
    recs = recs.slice(0, 5);
    if (!recs.length) {
      guess.style.display = "none";
    } else {
      guess.style.display = "";
      var gItems = recs.map(function (p) {
        return '<li><a href="/p/' + encodeURIComponent(p.id) + '">' +
          '<span class="cat" style="--cat-h:' + catHue(p.cat) + '">' + esc(p.cat) + "</span>" +
          "<span>" + esc(p.title) + "</span></a></li>";
      }).join("");
      guess.innerHTML =
        '<div class="g-card-head"><span class="t">' + ICONS.activity + "猜你喜欢</span></div>" +
        '<ul class="g-feed">' + gItems + "</ul>";
    }
    placeRecModules();
  }

  /* 「继续读」搬到左栏末尾，「猜你喜欢」留在右栏。
     左栏只有个人卡、诗笺、播放器，桌面端底下常空出一截；三篇续读正好补上，
     右栏天生就是推荐位，不来回搬。
     两处都用 appendChild：搬的是同一个节点，重复调用不会翻倍。
     窄屏（≤900px）左栏是两列网格，卡片横跨整行，样式在 style.css 尾部。 */
  function placeRecModules() {
    var left = $("#app-left");
    var right = $("#app-right");
    if (!left || !right) return;
    var cont = document.getElementById("rec-continue");
    /* 没有阅读历史时卡片是 display:none，何必搬过去占一个空槽 */
    if (cont && cont.style.display !== "none" && cont.parentNode !== left) {
      left.appendChild(cont);
    }
    var guess = document.getElementById("rec-guess");
    if (guess && guess.parentNode !== right) {
      guess.classList.remove("rec-guess-wide");
      right.appendChild(guess);
    }
  }

  /* ---------- 发现 / 年度回顾 / 随机一篇 ---------- */
  function openModal(id) {
    var ov = document.getElementById(id);
    if (!ov) return;
    ov.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeModal(ov) {
    if (!ov) return;
    ov.classList.remove("open");
    document.body.style.overflow = "";
  }

  function buildDiscover() {
    var cc = catCounts();
    var tc = tagCounts();
    var cats = Object.keys(cc).sort(function (a, b) { return cc[b] - cc[a]; });
    var tags = Object.keys(tc).sort(function (a, b) { return tc[b] - tc[a]; });
    var catHtml = cats.map(function (c) {
      return '<a class="g-cat" href="/writing?cat=' + encodeURIComponent(c) + '">' +
        ICONS.folder + esc(c) + '<span class="n">' + cc[c] + "</span></a>";
    }).join("");
    var tagHtml = tags.map(function (t) {
      return '<a class="g-tag" href="/writing?tag=' + encodeURIComponent(t) + '" style="--tag-h:' +
        tagHue(t) + '">#' + esc(t) + "</a>";
    }).join("");
    var box = document.getElementById("disc-overlay");
    if (!box) {
      box = document.createElement("div");
      box.className = "search-overlay disc-overlay";
      box.id = "disc-overlay";
      box.innerHTML =
        '<div class="search-box disc-box" role="dialog" aria-modal="true" aria-label="发现">' +
        '<div class="disc-head"><span>发现</span><button class="search-clear disc-x" type="button" aria-label="关闭">×</button></div>' +
        '<div class="disc-body"></div></div>';
      document.body.appendChild(box);
      box.addEventListener("click", function (e) { if (e.target === box) closeModal(box); });
      var x = box.querySelector(".disc-x");
      if (x) x.addEventListener("click", function () { closeModal(box); });
    }
    box.querySelector(".disc-body").innerHTML =
      '<div class="disc-sec"><h4>按分类浏览</h4><div class="g-cats">' + catHtml + "</div></div>" +
      '<div class="disc-sec"><h4>按标签浏览</h4><div class="g-tagwrap">' + tagHtml + "</div></div>";
  }

  function buildYearReview() {
    var byYear = {};
    POSTS.forEach(function (p) {
      var y = String(p.date || "").slice(0, 4);
      if (y.length !== 4) return;
      if (!byYear[y]) byYear[y] = { n: 0, w: 0, cats: {} };
      byYear[y].n++;
      byYear[y].w += wordCount(p);
      if (p.cat) byYear[y].cats[p.cat] = (byYear[y].cats[p.cat] || 0) + 1;
    });
    var years = Object.keys(byYear).sort();
    var total = POSTS.length;
    var words = POSTS.reduce(function (s, p) { return s + wordCount(p); }, 0);
    var maxN = years.reduce(function (m, y) { return Math.max(m, byYear[y].n); }, 1);
    var rows = years.slice().reverse().map(function (y) {
      var d = byYear[y];
      var top = Object.keys(d.cats).sort(function (a, b) { return d.cats[b] - d.cats[a]; })[0] || "—";
      var pct = Math.round((d.n / maxN) * 100);
      var wTxt = d.w >= 10000 ? (d.w / 10000).toFixed(1) + " 万字" : d.w + " 字";
      return '<div class="yr-row"><span class="yr-y">' + y + '</span>' +
        '<span class="yr-n">' + d.n + " 篇</span>" +
        '<span class="yr-bar"><i style="width:' + pct + '%"></i></span>' +
        '<span class="yr-w">' + wTxt + "</span>" +
        '<span class="yr-top">' + esc(top) + "</span></div>";
    }).join("");
    var box = document.getElementById("yr-overlay");
    if (!box) {
      box = document.createElement("div");
      box.className = "search-overlay yr-overlay";
      box.id = "yr-overlay";
      box.innerHTML =
        '<div class="search-box yr-box" role="dialog" aria-modal="true" aria-label="年度回顾">' +
        '<div class="disc-head"><span>年度回顾</span><button class="search-clear disc-x" type="button" aria-label="关闭">×</button></div>' +
        '<div class="yr-body"></div></div>';
      document.body.appendChild(box);
      box.addEventListener("click", function (e) { if (e.target === box) closeModal(box); });
      var x = box.querySelector(".disc-x");
      if (x) x.addEventListener("click", function () { closeModal(box); });
    }
    var allW = words >= 10000 ? (words / 10000).toFixed(1) + " 万字" : words + " 字";
    box.querySelector(".yr-body").innerHTML =
      '<p class="yr-sum">' + total + " 篇　·　" + allW + "　·　" + years.length + " 个年度</p>" + rows;
  }

  function initExtras() {
    var randomLink = document.querySelector(".js-random");
    if (randomLink) {
      randomLink.addEventListener("click", function (e) {
        e.preventDefault();
        var list = orderedPosts();
        if (!list.length) return;
        var p = list[Math.floor(Math.random() * list.length)];
        location.href = "/p/" + encodeURIComponent(p.id);
      });
    }
    var discLink = document.querySelector(".js-disc");
    if (discLink) discLink.addEventListener("click", function (e) {
      e.preventDefault(); buildDiscover(); openModal("disc-overlay");
    });
    var yrLink = document.querySelector(".js-yearrev");
    if (yrLink) yrLink.addEventListener("click", function (e) {
      e.preventDefault(); buildYearReview(); openModal("yr-overlay");
    });
    // 弹层里点分类 / 标签：先关弹层再跳转，SPA 内跳转时弹层不会自己消失
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest(".disc-overlay a, .yr-overlay a");
      if (a) closeModal(a.closest(".search-overlay"));
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        var ov = document.querySelector(".search-overlay.open");
        if (ov) closeModal(ov);
      }
    });
  }

  /* ---------- 顶栏「更多」下拉 ---------- */
  function initNavMore() {
    var box = document.getElementById("nav-more");
    if (!box) return;
    var btn = box.querySelector("button");
    if (!btn) return;
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      box.classList.toggle("open");
    });
    document.addEventListener("click", function () {
      box.classList.remove("open");
    });
  }

  /* ---------- 外观设置面板 ----------
     按皮肤分两套。淡紫那套是玻璃：背景亮度、主题色、卡片材质/浓度/颜色、
     背景弱化、背景图——每一项都会在玻璃上直接起作用。
     纸样那套反过来只留纸面能改的几项：主题色（朱红的深浅）、背景纸色、
     版心宽度、手写字体开关、日期农历。
     分组带 data-skin-set="paper"/"soft"，CSS 只显示当前皮肤那一套；
     切皮肤时 syncSettingsSkin() 把另一套的按钮状态丢掉，免得按下
     没有反应的选项还挂着高亮。 */
  function initSettings() {
    var btn = document.getElementById("set-btn");
    if (!btn || document.getElementById("set-overlay")) return;

    var root = document.documentElement;

    var overlay = document.createElement("div");
    overlay.className = "set-overlay";
    overlay.id = "set-overlay";

    var softHtml =
      '<div class="set-group" data-skin-set="soft"><label>背景亮度<span class="lite-val" id="lite-val">100%</span></label>' +
      '<input type="range" class="lite-slider" id="lite" min="40" max="160" step="1" value="100"></div>' +
      '<div class="set-group" data-skin-set="soft"><label>主题色</label>' +
      '<input type="range" class="hue-slider" id="hue" min="0" max="360" step="1" value="215"></div>' +
      '<div class="set-group" data-skin-set="soft"><label>配色预设</label>' +
      '<div class="preset-row" id="presets">' +
      '<button class="preset" data-h="215" style="background:#a8c6f7" title="海蓝"></button>' +
      '<button class="preset" data-h="280" style="background:#b8a1f7" title="紫罗兰"></button>' +
      '<button class="preset" data-h="330" style="background:#f0a3c8" title="樱粉"></button>' +
      '<button class="preset" data-h="160" style="background:#7fd6b0" title="薄荷"></button>' +
      "</div></div>" +
      '<div class="set-group" data-skin-set="soft"><label>卡片材质</label>' +
      '<div class="seg" id="mat-seg">' +
      '<button data-mat="solid">纯色</button>' +
      '<button data-mat="translucent">半透明</button>' +
      '<button data-mat="frost">毛玻璃</button></div></div>' +
      '<div class="set-group" data-skin-set="soft"><label>卡片浓度<span class="set-val" id="card-val">74%</span></label>' +
      '<input type="range" class="set-slider" id="card-alpha" min="70" max="100" step="1" value="74"></div>' +
      '<div class="set-group" data-skin-set="soft"><label>卡片颜色</label>' +
      '<div class="preset-row" id="tint-row">' +
      '<button class="preset tint" data-tint="paper" style="background:#fffdf8" title="纸白"></button>' +
      '<button class="preset tint" data-tint="white" style="background:#ffffff" title="纯白"></button>' +
      '<button class="preset tint" data-tint="warm" style="background:#fcf6ea" title="暖米"></button>' +
      '<button class="preset tint" data-tint="cool" style="background:#f6f9fc" title="冷灰"></button>' +
      "</div></div>" +
      '<div class="set-group" data-skin-set="soft"><label>背景弱化<span class="set-val" id="veil-val">50%</span></label>' +
      '<input type="range" class="set-slider" id="veil" min="0" max="100" step="1" value="50"></div>' +
      '<div class="set-group" data-skin-set="soft"><label>背景图</label>' +
      '<div class="bg-row" id="bg-row"></div></div>';

    // 纸样：纸面是纯色铺满的，没有背景图、没有玻璃卡片，
    // 所以只留「纸的深浅 / 版心宽窄 / 字用不用手写体 / 日历显不显农历」。
    var paperHtml =
      '<div class="set-group" data-skin-set="paper"><label>纸面</label>' +
      '<div class="preset-row" id="paper-row">' +
      '<button class="preset" data-paper="warm" style="background:#f6f2e9" title="宣纸"></button>' +
      '<button class="preset" data-paper="plain" style="background:#fbfaf6" title="素白"></button>' +
      '<button class="preset" data-paper="rice" style="background:#f3ecd8" title="米黄"></button>' +
      '<button class="preset" data-paper="cool" style="background:#f2f4f1" title="青白"></button>' +
      "</div></div>" +
      '<div class="set-group" data-skin-set="paper"><label>版心宽度<span class="set-val" id="wrap-val">标准</span></label>' +
      '<div class="seg" id="wrap-seg">' +
      '<button data-wrap="wide">宽</button><button data-wrap="std">标准</button><button data-wrap="narrow">窄</button>' +
      "</div></div>" +
      '<div class="set-group" data-skin-set="paper"><label>行距<span class="set-val" id="lead-val">1.9</span></label>' +
      '<input type="range" class="set-slider" id="lead" min="17" max="22" step="1" value="19"></div>' +
      '<div class="set-group" data-skin-set="paper"><label>手写字体</label>' +
      '<div class="seg" id="hand-seg">' +
      '<button data-hand="off">宋体</button><button data-hand="on">马善政</button></div>' +
      '<p class="set-note">标题与诗笺换手写体，正文不变。</p></div>' +
      '<div class="set-group" data-skin-set="paper"><label>日历</label>' +
      '<div class="seg" id="lun-seg">' +
      '<button data-lun="on">带农历</button><button data-lun="off">只看公历</button></div></div>';

    overlay.innerHTML =
      '<div class="set-panel">' +
      "<h3>外观设置</h3>" +
      '<p class="sub">改完立刻生效，会自动记住</p>' +
      '<div class="set-group"><label>模式</label>' +
      '<div class="seg" id="mode-seg">' +
      '<button data-mode="light">浅色</button><button data-mode="dark">深色</button></div></div>' +
      '<div class="set-group"><label>皮肤</label>' +
      '<div class="seg" id="skin-seg">' +
      '<button data-skin="soft">淡紫</button><button data-skin="paper">纸样</button></div></div>' +
      softHtml +
      paperHtml +
      "</div>";
    document.body.appendChild(overlay);

    var hue = overlay.querySelector("#hue");
    var lite = overlay.querySelector("#lite");
    var liteVal = overlay.querySelector("#lite-val");

    /* ---------- 背景亮度（淡紫） ----------
       真亮度：直接给 .page-bg 上 filter: brightness(倍数)，整幅背景图一起
       变亮变暗，色彩关系和层次都保留 —— 这就是和「盖白幕」最本质的区别。
       40%–160%，100% 是原图。
       为什么不加在 html 或 body 上：filter 会造包含块，页面上所有
       position:fixed 的浮层（目录、进度条、背景、播放器）都会改成相对它
       定位，一开就散架。只加在背景层上，它内部没有 fixed 子元素，安全。 */
    function applyLite(v) {
      var n = Math.max(40, Math.min(160, Math.round(Number(v) || 100)));
      bgManual = n / 100;
      applyBgBright();
      if (liteVal) liteVal.textContent = n + "%";
      if (lite) lite.value = n;
      STORAGE.set("reze-bg-bright", String(n));
    }

    function currentSkin() {
      return root.getAttribute("data-skin") === "paper" ? "paper" : "soft";
    }

    /* 主题色只写给淡紫。纸样的朱红是样式表里 !important 钉死的四种纸本色相
       （data-ph），这里一旦把 --g-accent 内联写到 .app / html 上，行内就压过了
       样式表，日历当天那圈描边会跟着淡紫的蓝跑 —— 所以纸样下这一步整个跳过，
       只留高亮同步。 */
    function applyHue(h) {
      var n = Math.max(0, Math.min(360, Math.round(Number(h) || 0)));
      if (currentSkin() !== "paper") {
        var bright = "hsl(" + n + ", 72%, 76%)";
        var deep = "hsl(" + n + ", 62%, 52%)";
        root.style.setProperty("--accent", deep);
        Array.prototype.forEach.call(
          document.querySelectorAll(".app, .post-app"),
          function (el) {
            el.style.setProperty("--g-accent", bright);
          }
        );
      }
      STORAGE.set("reze-hue", String(n));
      if (hue) hue.value = n;
      Array.prototype.forEach.call(overlay.querySelectorAll("#presets .preset"), function (b) {
        b.setAttribute("aria-pressed", String(Number(b.getAttribute("data-h")) === n));
      });
      // 纸样那几个色块同理，跟着同一圈色相走
      Array.prototype.forEach.call(overlay.querySelectorAll("#paper-row .preset"), function (b) {
        if (root.getAttribute("data-skin") !== "paper") return;
        b.setAttribute("aria-pressed", String(Number(b.getAttribute("data-ph")) === n));
      });
    }

    /* 纸样：朱红有四种常见的纸本色相，比拖一整条色环准得多 */
    var PAPER_HUES = { vermilion: 5, ochre: 28, ink: 210, plum: 340 };
    Array.prototype.forEach.call(overlay.querySelectorAll("#paper-row .preset"), function (b) {
      b.setAttribute("data-ph", String(PAPER_HUES[b.getAttribute("data-paper")] || 5));
    });

    function currentSkin() {
      return root.getAttribute("data-skin") === "paper" ? "paper" : "soft";
    }

    function syncSegs() {
      var dark = root.getAttribute("data-theme") === "dark";
      var m = overlay.querySelector('#mode-seg [data-mode="dark"]');
      var l = overlay.querySelector('#mode-seg [data-mode="light"]');
      var s = overlay.querySelector('#skin-seg [data-skin="soft"]');
      var mi = overlay.querySelector('#skin-seg [data-skin="paper"]');
      if (m) m.setAttribute("aria-pressed", String(dark));
      if (l) l.setAttribute("aria-pressed", String(!dark));
      if (s) s.setAttribute("aria-pressed", String(currentSkin() === "soft"));
      if (mi) mi.setAttribute("aria-pressed", String(currentSkin() === "paper"));
    }

    /* 切皮肤：把另一套里的按钮全部放掉高亮。
       不这么做的话，淡紫里选的「毛玻璃」会一直是按下态，切到纸样后
       那一组已经藏起来了看不出来；切回来时又是对的 —— 但面板一打开
       如果先看到纸样那套，再从淡紫那套读，会出现两套同时高亮的假象。 */
    function syncSettingsSkin() {
      var skin = currentSkin();
      overlay.setAttribute("data-skin", skin);
      Array.prototype.forEach.call(overlay.querySelectorAll(".seg button, .preset"), function (b) {
        var grp = b.closest ? b.closest("[data-skin-set]") : null;
        if (!grp) return;
        if (grp.getAttribute("data-skin-set") !== skin) b.setAttribute("aria-pressed", "false");
      });
      if (skin === "soft") {
        syncSegs();
        return;
      }
      // 纸样：把四组状态按存储值重新点亮
      var pv = overlay.querySelector("#paper-row .preset[aria-pressed='true']");
      if (!pv) {
        var p = STORAGE.get("reze-paper-tone") || "warm";
        Array.prototype.forEach.call(overlay.querySelectorAll("#paper-row .preset"), function (b) {
          b.setAttribute("aria-pressed", String(b.getAttribute("data-paper") === p));
        });
      }
    }

    var savedHue = STORAGE.get("reze-hue");
    applyHue(savedHue === null ? 215 : Number(savedHue));
    var savedLite = STORAGE.get("reze-bg-bright");
    applyLite(savedLite === null ? 100 : Number(savedLite));

    /* ---------- 卡片材质 / 浓度 / 颜色 / 背景弱化（淡紫） ----------
       四个开关共用 34 节那组变量：
         --card-filter 决定有没有模糊（纯色、半透明都是 none）
         --card-alpha  决定透多少
         data-tint     决定基色（深浅两套值写在 CSS 里）
         --veil-alpha  决定背景插画退到多淡
       材质按钮会顺手把浓度设成该材质的默认值 —— 否则从纯色切到
       半透明看不出区别，用户会以为按钮坏了。 */
    var MAT = {
      solid: { filter: "none", alpha: 100 },
      translucent: { filter: "none", alpha: 72 },
      frost: { filter: "blur(14px) saturate(108%)", alpha: 78 },
    };
    var TINTS = ["paper", "white", "warm", "cool"];
    var cardAlphaEl = overlay.querySelector("#card-alpha");
    var cardVal = overlay.querySelector("#card-val");
    var veilEl = overlay.querySelector("#veil");
    var veilVal = overlay.querySelector("#veil-val");
    var tintRow = overlay.querySelector("#tint-row");

    function applyMat(key, keepAlpha) {
      if (!MAT[key]) key = "frost";
      root.setAttribute("data-mat", key);
      root.style.setProperty("--card-filter", MAT[key].filter);
      if (!keepAlpha) applyCardAlpha(MAT[key].alpha);
      Array.prototype.forEach.call(overlay.querySelectorAll("#mat-seg button"), function (b) {
        b.setAttribute("aria-pressed", String(b.getAttribute("data-mat") === key));
      });
      STORAGE.set("reze-card-mat", key);
    }

    function applyCardAlpha(v) {
      // 下限 70：卡片浓度低于这个值，全屏背景图的亮部会直接透到文字上
      var n = Math.max(70, Math.min(100, Math.round(Number(v) || 0)));
      root.style.setProperty("--card-alpha", (n / 100).toFixed(2));
      if (cardVal) cardVal.textContent = n + "%";
      if (cardAlphaEl) cardAlphaEl.value = n;
      STORAGE.set("reze-card-alpha", String(n));
    }

    function applyTint(key) {
      if (TINTS.indexOf(key) === -1) key = "paper";
      root.setAttribute("data-tint", key);
      if (tintRow) {
        Array.prototype.forEach.call(tintRow.querySelectorAll(".preset"), function (b) {
          b.setAttribute("aria-pressed", String(b.getAttribute("data-tint") === key));
        });
      }
      STORAGE.set("reze-card-tint", key);
    }

    function applyVeil(v) {
      var n = Math.max(0, Math.min(100, Math.round(Number(v) || 0)));
      root.style.setProperty("--veil-alpha", (n / 100).toFixed(2));
      if (veilVal) veilVal.textContent = n + "%";
      if (veilEl) veilEl.value = n;
      STORAGE.set("reze-veil", String(n));
    }

    /* 面板上的读数以「当前真正生效的值」为准：行内变量优先于 CSS 默认值，
       所以先把两者都读出来，滑块才不会一打开就跳一下。 */
    function readNum(name, fallback) {
      var inline = root.style.getPropertyValue(name);
      var v = inline || "";
      if (!v) {
        try {
          v = getComputedStyle(root).getPropertyValue(name);
        } catch (e) {
          v = "";
        }
      }
      var n = Number(String(v).trim());
      return isFinite(n) ? n : fallback;
    }

    /* 初始化只「读」不「写」：没动过设置就不往行内塞值，
       否则行内值会盖掉 CSS 里按断点给的默认值（手机上卡片该更实一点）。 */
    function paintMat(key) {
      if (!MAT[key]) key = "frost";
      root.setAttribute("data-mat", key);
      Array.prototype.forEach.call(overlay.querySelectorAll("#mat-seg button"), function (b) {
        b.setAttribute("aria-pressed", String(b.getAttribute("data-mat") === key));
      });
    }

    var savedMat = STORAGE.get("reze-card-mat");
    if (savedMat && MAT[savedMat]) {
      applyMat(savedMat, true);
    } else {
      paintMat("frost");
    }

    var savedAlpha = STORAGE.get("reze-card-alpha");
    if (savedAlpha !== null) {
      applyCardAlpha(Number(savedAlpha));
    } else {
      var curAlpha = Math.round(readNum("--card-alpha", 0.78) * 100);
      if (cardVal) cardVal.textContent = curAlpha + "%";
      if (cardAlphaEl) cardAlphaEl.value = curAlpha;
    }

    applyTint(root.getAttribute("data-tint") || "paper");

    var savedVeil = STORAGE.get("reze-veil");
    if (savedVeil !== null) {
      applyVeil(Number(savedVeil));
    } else {
      var curVeil = Math.round(readNum("--veil-alpha", 0.62) * 100);
      if (veilVal) veilVal.textContent = curVeil + "%";
      if (veilEl) veilEl.value = curVeil;
    }

    /* ---------- 纸样那几项 ----------
       纸色只换底色，不动字色；版心和行距落在 --paper-wrap / --paper-lead
       两个变量上，纸样的 html 规则里读它们，没设值时用标准值。
       手写体是把 .splash-title / .g-bio / .g-notice 那一撮的 font-family
       挂到 <html> 上，一条 data-hand="on" 就能整页切换。 */
    var PAPER_TONES = {
      warm: { bg: "#f6f2e9", alt: "#efe9dc", fill: "#fbf8f1" },
      plain: { bg: "#fbfaf6", alt: "#f2f1ec", fill: "#ffffff" },
      rice: { bg: "#f3ecd8", alt: "#eae1c8", fill: "#faf6e9" },
      cool: { bg: "#f2f4f1", alt: "#e6ebe5", fill: "#fafbf9" },
    };
    var paperRow = overlay.querySelector("#paper-row");
    var wrapSeg = overlay.querySelector("#wrap-seg");
    var wrapVal = overlay.querySelector("#wrap-val");
    var leadEl = overlay.querySelector("#lead");
    var leadVal = overlay.querySelector("#lead-val");
    var handSeg = overlay.querySelector("#hand-seg");
    var lunSeg = overlay.querySelector("#lun-seg");

    function applyPaperTone(key) {
      if (!PAPER_TONES[key]) key = "warm";
      root.setAttribute("data-paper", key);
      if (paperRow) {
        Array.prototype.forEach.call(paperRow.querySelectorAll(".preset"), function (b) {
          b.setAttribute("aria-pressed", String(b.getAttribute("data-paper") === key));
        });
      }
      STORAGE.set("reze-paper-tone", key);
    }

    function applyWrap(key) {
      if (["wide", "std", "narrow"].indexOf(key) === -1) key = "std";
      root.setAttribute("data-wrap", key);
      if (wrapVal) wrapVal.textContent = key === "wide" ? "宽" : key === "narrow" ? "窄" : "标准";
      if (wrapSeg) {
        Array.prototype.forEach.call(wrapSeg.querySelectorAll("button"), function (b) {
          b.setAttribute("aria-pressed", String(b.getAttribute("data-wrap") === key));
        });
      }
      STORAGE.set("reze-paper-wrap", key);
    }

    function applyLead(v) {
      var n = Math.max(17, Math.min(22, Math.round(Number(v) || 19)));
      root.style.setProperty("--paper-lead", (n / 10).toFixed(1));
      if (leadVal) leadVal.textContent = (n / 10).toFixed(1);
      if (leadEl) leadEl.value = n;
      STORAGE.set("reze-paper-lead", String(n));
    }

    function applyHand(on) {
      var yes = on === "on";
      root.setAttribute("data-hand", yes ? "on" : "off");
      if (handSeg) {
        Array.prototype.forEach.call(handSeg.querySelectorAll("button"), function (b) {
          b.setAttribute("aria-pressed", String((b.getAttribute("data-hand") === "on") === yes));
        });
      }
      STORAGE.set("reze-paper-hand", yes ? "on" : "off");
    }

    function applyLunar(on) {
      var yes = on !== "off";
      root.setAttribute("data-lunar", yes ? "on" : "off");
      if (lunSeg) {
        Array.prototype.forEach.call(lunSeg.querySelectorAll("button"), function (b) {
          b.setAttribute("aria-pressed", String((b.getAttribute("data-lun") === "on") === yes));
        });
      }
      STORAGE.set("reze-cal-lunar", yes ? "on" : "off");
    }

    applyPaperTone(STORAGE.get("reze-paper-tone") || root.getAttribute("data-paper") || "warm");
    applyWrap(STORAGE.get("reze-paper-wrap") || "std");
    var savedLead = STORAGE.get("reze-paper-lead");
    applyLead(savedLead === null ? 19 : Number(savedLead));
    applyHand(STORAGE.get("reze-paper-hand") || "off");
    applyLunar(STORAGE.get("reze-cal-lunar") || "on");
    syncSegs();
    syncSettingsSkin();

    hue.addEventListener("input", function () {
      applyHue(Number(hue.value));
    });

    if (lite) {
      lite.addEventListener("input", function () {
        applyLite(lite.value);
      });
    }

    overlay.querySelector("#presets").addEventListener("click", function (e) {
      var b = e.target.closest(".preset");
      if (!b) return;
      applyHue(Number(b.getAttribute("data-h")));
    });

    if (paperRow) {
      paperRow.addEventListener("click", function (e) {
        var b = e.target.closest(".preset");
        if (!b) return;
        // 色块一按两用：换纸色，顺带把朱红挪到对应的色相
        applyPaperTone(b.getAttribute("data-paper"));
        var ph = b.getAttribute("data-ph");
        if (ph !== null) applyHue(Number(ph));
        syncSettingsSkin();
      });
    }

    if (wrapSeg) {
      wrapSeg.addEventListener("click", function (e) {
        var b = e.target.closest("button");
        if (!b) return;
        applyWrap(b.getAttribute("data-wrap"));
      });
    }
    if (leadEl) {
      leadEl.addEventListener("input", function () {
        applyLead(leadEl.value);
      });
    }
    if (handSeg) {
      handSeg.addEventListener("click", function (e) {
        var b = e.target.closest("button");
        if (!b) return;
        applyHand(b.getAttribute("data-hand"));
      });
    }
    if (lunSeg) {
      lunSeg.addEventListener("click", function (e) {
        var b = e.target.closest("button");
        if (!b) return;
        applyLunar(b.getAttribute("data-lun"));
      });
    }

    overlay.querySelector("#mat-seg").addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      applyMat(b.getAttribute("data-mat"));
    });

    if (cardAlphaEl) {
      cardAlphaEl.addEventListener("input", function () {
        applyCardAlpha(cardAlphaEl.value);
      });
    }

    if (veilEl) {
      veilEl.addEventListener("input", function () {
        applyVeil(veilEl.value);
      });
    }

    if (tintRow) {
      tintRow.addEventListener("click", function (e) {
        var b = e.target.closest(".preset");
        if (!b) return;
        applyTint(b.getAttribute("data-tint"));
      });
    }

    overlay.querySelector("#mode-seg").addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      root.setAttribute("data-theme", b.getAttribute("data-mode"));
      STORAGE.set("reze-theme", b.getAttribute("data-mode"));
      /* 背景亮度和主题无关（它调的是背景图本身），切主题不再动它 */
      syncSegs();
    });

    overlay.querySelector("#skin-seg").addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      var next = b.getAttribute("data-skin");
      root.setAttribute("data-skin", next);
      STORAGE.set("reze-skin-v2", next);
      syncAccentVars(next);
      syncSegs();
      syncSettingsSkin();
      paintBgRow();
      document.dispatchEvent(new CustomEvent("reze:skin"));
    });

    /* ---- 背景图切换（淡紫）：缩略图点一下就换，选择记进 localStorage ---- */
    var bgRow = overlay.querySelector("#bg-row");
    var bgs = bgList();

    // 缩略图面板默认 display:none，图不加 lazy 的话每次进站都会把这 8 张大图全下一遍
    function paintBgRow() {
      if (!bgRow) return;
      if (!bgs.length) {
        bgRow.innerHTML = '<span class="bg-empty">未配置背景图</span>';
        return;
      }
      // 高亮以「当前实际生效的背景」为准，而不是只看存储值，
      // 避免初始化顺序导致的过期高亮；随机模式额外点亮 🎲
      var bgEl = document.getElementById("page-bg");
      var applied = bgEl ? bgEl.style.backgroundImage || "" : "";
      var randomMode = STORAGE.get("reze-bg-idx") === "-1";
      bgRow.innerHTML = bgs
        .map(function (src, i) {
          return (
            '<button class="bg-thumb' + (applied.indexOf(src) !== -1 ? " on" : "") + '" data-i="' + i +
            '" title="背景 ' + (i + 1) + '"><img src="' + esc(src) + '" alt="背景 ' + (i + 1) + '" loading="lazy" decoding="async"></button>'
          );
        })
        .join("") +
        '<button class="bg-thumb bg-random' + (randomMode ? " on" : "") + '" data-i="-1" title="每次随机">' +
        "🎲</button>";
    }

    // 缩略图等面板真正打开再建，不然每次进站都要白下 8 张大图
    if (bgRow) {
      bgRow.addEventListener("click", function (e) {
        var b = e.target.closest(".bg-thumb");
        if (!b) return;
        var i = Number(b.getAttribute("data-i"));
        if (i === -1) {
          // 随机模式：清除记忆，下次进站随机挑一张
          STORAGE.set("reze-bg-idx", "-1");
          var pick = Math.floor(Math.random() * bgs.length);
          applyPageBg(bgs[pick], true, false);
        } else {
          STORAGE.set("reze-bg-idx", String(i));
          applyPageBg(bgs[i], true);
        }
        paintBgRow();
      });
    }

    btn.addEventListener("click", function () {
      overlay.classList.add("open");
      syncSegs();
      syncSettingsSkin();
      if (currentSkin() === "soft") paintBgRow();
    });
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) overlay.classList.remove("open");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") overlay.classList.remove("open");
    });

    // 顶栏那颗皮肤按钮也能切，面板开着时状态要跟着走
    document.addEventListener("reze:skin", function () { syncSegs(); syncSettingsSkin(); });
  }

  /* ---------- 主题 / 皮肤 ---------- */
  /* 纸样那几项在进站时就得生效：设置面板是按需打开才建的，
     不能等用户点开面板才恢复纸色 / 版心 / 行距 / 手写体 / 农历。 */
  function restorePaperPrefs() {
    var root = document.documentElement;
    var tone = STORAGE.get("reze-paper-tone");
    if (tone) root.setAttribute("data-paper", tone);
    var wrap = STORAGE.get("reze-paper-wrap");
    if (wrap) root.setAttribute("data-wrap", wrap);
    var lead = STORAGE.get("reze-paper-lead");
    if (lead !== null) {
      var n = Math.max(17, Math.min(22, Math.round(Number(lead) || 19)));
      root.style.setProperty("--paper-lead", (n / 10).toFixed(1));
    }
    var hand = STORAGE.get("reze-paper-hand");
    if (hand) root.setAttribute("data-hand", hand === "on" ? "on" : "off");
    var lun = STORAGE.get("reze-cal-lunar");
    if (lun) root.setAttribute("data-lunar", lun === "off" ? "off" : "on");
  }

  /* accent 的行内值与皮肤要对得上：
     淡紫那套把 --accent / --g-accent 内联写到 html 与 .app 上，纸样靠样式表
     的朱红顶。从淡紫切到纸样时把这两处行内值撤掉，纸样才收得回来；切回淡紫
     再按存着的色相写一遍。 */
  function syncAccentVars(skin) {
    var root = document.documentElement;
    var els = document.querySelectorAll(".app, .post-app");
    if (skin === "paper") {
      root.style.removeProperty("--accent");
      Array.prototype.forEach.call(els, function (el) {
        el.style.removeProperty("--g-accent");
      });
      return;
    }
    var hue = STORAGE.get("reze-hue");
    var n = Math.max(0, Math.min(360, Math.round(Number(hue === null ? 215 : hue) || 0)));
    root.style.setProperty("--accent", "hsl(" + n + ", 62%, 52%)");
    Array.prototype.forEach.call(els, function (el) {
      el.style.setProperty("--g-accent", "hsl(" + n + ", 72%, 76%)");
    });
  }

  function initTheme() {
    var root = document.documentElement;
    restorePaperPrefs();
    syncAccentVars(root.getAttribute("data-skin") === "paper" ? "paper" : "soft");
    syncAvatar();
    /* 设置面板是按需建的，头像同步不能挂在它那个监听器上 */
    document.addEventListener("reze:skin", syncAvatar);

    function syncSkinLabels() {
      var isPaper = root.getAttribute("data-skin") === "paper";
      Array.prototype.forEach.call(document.querySelectorAll(".js-skin-name"), function (n) {
        n.textContent = isPaper ? "纸样" : "淡紫版";
      });
    }
    syncSkinLabels();

    var themeBtn = $("#theme-btn");
    if (themeBtn) {
      var paintTheme = function () {
        themeBtn.innerHTML = root.getAttribute("data-theme") === "dark" ? ICONS.sun : ICONS.moon;
      };
      paintTheme();
      themeBtn.addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        STORAGE.set("reze-theme", next);
        paintTheme();
      });
    }

    var skinBtn = $("#skin-btn");
    if (skinBtn) {
      skinBtn.addEventListener("click", function () {
        var next = root.getAttribute("data-skin") === "soft" ? "paper" : "soft";
        root.setAttribute("data-skin", next);
        STORAGE.set("reze-skin-v2", next);
        syncSkinLabels();
        syncAccentVars(next);
        // 设置面板那一套要跟着换；面板没建出来时这个监听器不存在，无妨
        document.dispatchEvent(new CustomEvent("reze:skin"));
      });
    }

    var tip = $("#skin-tip");
    if (tip) {
      var closeBtn = tip.querySelector("button");
      if (closeBtn) {
        closeBtn.addEventListener("click", function () {
          tip.remove();
          STORAGE.set("reze-tip-closed", "1");
        });
      }
      if (STORAGE.get("reze-tip-closed")) tip.remove();
    }
  }

  // 解析 LRC：[00:12.34] 歌词
  function parseLrc(text) {
    if (!text) return [];
    var out = [];
    String(text)
      .split(/\r?\n/)
      .forEach(function (raw) {
        var m = raw.match(/\[(\d{1,2}):(\d{1,2})(?:[.:](\d{1,3}))?\](.*)/);
        if (!m) return;
        var ms = m[3] ? parseInt((m[3] + "00").slice(0, 3), 10) : 0;
        var t = parseInt(m[1], 10) * 60 + parseInt(m[2], 10) + ms / 1000;
        var txt = m[4].replace(/\[\d{1,2}:\d{1,2}(?:[.:]\d{1,3})?\]/g, "").trim();
        if (txt) out.push({ t: t, text: txt });
      });
    return out.sort(function (a, b) {
      return a.t - b.t;
    });
  }

  /* ---------- 首屏的滚动文字（打字机，点击换一句） ----------
     原来只能等它自己打完、删光、再随机换下一句，想看另一句只能等。
     现在点一下就切到下一句：先淡出上移，换完从下面浮上来，再继续打字。
     自动循环保留，只是换句的顺序从随机改成了按次序，点击才接得上。 */
  function startTyping(el, lines) {
    if (!el || !lines || !lines.length) return;
    if (el.__typingStop) { try { el.__typingStop(); } catch (e) {} }

    var idx = 0;
    var pos = 0;
    var deleting = false;
    var timer = null;
    var busy = false;

    function stop() { if (timer) { clearTimeout(timer); timer = null; } }
    function later(fn, ms) { stop(); timer = setTimeout(fn, ms); }

    function step() {
      var cur = lines[idx] || "";
      if (!deleting) {
        pos++;
        el.textContent = cur.slice(0, pos);
        if (pos >= cur.length) {
          deleting = true;
          return later(step, 2400); // 打完停一会儿
        }
        return later(step, 108);
      }
      pos--;
      el.textContent = cur.slice(0, pos);
      if (pos <= 0) {
        deleting = false;
        idx = (idx + 1) % lines.length;
        return later(step, 440);
      }
      return later(step, 44);
    }

    // 点一下：当前句淡出上移 -> 换句 -> 从下面浮上来重新打
    function jump() {
      if (busy) return;
      busy = true;
      stop();
      var box = el.parentNode || el;
      var next = (idx + 1) % lines.length;
      box.style.transition = "opacity .18s ease, transform .18s ease";
      box.style.opacity = "0";
      box.style.transform = "translateY(-7px)";
      setTimeout(function () {
        idx = next;
        pos = 0;
        deleting = false;
        el.textContent = "";
        box.style.transition = "none";
        box.style.transform = "translateY(10px)";
        void box.offsetHeight;
        box.style.transition = "opacity .32s ease, transform .36s cubic-bezier(.22,.7,.3,1)";
        box.style.opacity = "1";
        box.style.transform = "translateY(0)";
        setTimeout(function () { busy = false; step(); }, 200);
      }, 190);
    }

    var hit = el.parentNode || el;
    hit.style.cursor = "pointer";
    if (!hit.getAttribute("title")) hit.setAttribute("title", "换一句");
    hit.onclick = function (e) {
      if (e && e.preventDefault) e.preventDefault();
      jump();
    };
    el.__typingStop = stop;

    step();
  }

  /* ---------- 正文图片 ----------
     老文章里的 <img> 只有 src：既没有 loading，也没有宽高。
     一篇长文进来会把几十张图一起拉下来；图回来之前浏览器不知道它多高，
     滚动到一半图加载完，下面的字被推走。尺寸表由 tools/gen_img_size.py
     从 assets/uploads 量出来，新加图之后重跑一次。 */
  var IMG_SIZE = window.IMG_SIZE || {};
  function applyImgSize(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll("img"), function (img) {
      if (!img.getAttribute("loading")) img.setAttribute("loading", "lazy");
      img.setAttribute("decoding", "async");
      if (img.getAttribute("width") && img.getAttribute("height")) return;
      var raw = img.getAttribute("src") || "";
      var key = raw
        .replace(/^https?:\/\/[^/]+\//, "")
        .replace(/^\//, "")
        .split("?")[0]
        .split("#")[0];
      var box = IMG_SIZE[key];
      if (box && box[0] > 0 && box[1] > 0) {
        img.setAttribute("width", box[0]);
        img.setAttribute("height", box[1]);
      }
    });
  }

  /* ---------- 首屏欢迎页 ---------- */
  function mountSplash() {
    var splash = $("#splash");
    if (!splash) return;
    var cfg = SITE.splash || {};

    var media = $("#splash-media");
    if (media) {
      if (cfg.video) {
        media.innerHTML =
          '<video src="' + esc(cfg.video) + '" autoplay muted loop playsinline></video>';
      } else if (cfg.bg) {
        var bgUrl = String(cfg.bg).replace(/"/g, "%22");
        media.style.backgroundImage = 'url("' + bgUrl + '")';
        // 云端 setting 里记的图（如 bg.jpg）仓库里可能没有，加载失败就退回第一张首图
        var probe = new Image();
        probe.onerror = function () {
          var fb = bgList()[0];
          if (fb) media.style.backgroundImage = 'url("' + String(fb).replace(/"/g, "%22") + '")';
        };
        probe.src = bgUrl;
      }
      // 两者都没配时，保留 CSS 里的默认紫光背景，不隐藏
    }

    var hi = $("#splash-hi");
    if (hi) {
      if (cfg.hi) hi.textContent = cfg.hi;
      else hi.style.display = "none";
    }

    // 会打字、删除、换句的那一行
    var typingEl = $("#typing");
    var lineList = siteLines();
    if (typingEl && lineList.length) startTyping(typingEl, lineList);

    var title = $("#splash-title");
    if (title) title.textContent = cfg.title || (window.SITE && window.SITE.name) || "RezeのBlog";

    var quote = $("#splash-quote");
    if (quote) {
      if (cfg.quote) {
        var qp = quote.querySelector("p");
        var qs = quote.querySelector("span");
        if (qp) qp.textContent = cfg.quote;
        if (qs) qs.textContent = cfg.quoteFrom || "";
      } else {
        quote.style.display = "none";
      }
    }

    var av = $("#splash-avatar");
    if (av) {
      av.innerHTML = SITE.avatar
        ? '<img data-av src="' + esc(avatarSrc()) + '" alt="' + esc(SITE.name) + '">'
        : "<span>" + esc((SITE.name || "蕾").charAt(0)) + "</span>";
    }

    var scrollText = splash.querySelector(".splash-scroll span");
    if (scrollText && cfg.scrollText) scrollText.textContent = cfg.scrollText;

    // 社交小图标：放在"向下滑动"上方
    var socialList = SITE.social || [];
    var scrollEl = splash.querySelector(".splash-scroll");
    if (scrollEl && socialList.length && !splash.querySelector(".splash-social")) {
      var sbox = document.createElement("div");
      sbox.className = "splash-social";
      sbox.innerHTML = socialList
        .map(function (s) {
          return (
            '<a href="' + esc(s.url) + '" target="_blank" rel="noopener" aria-label="' +
            esc(s.name) + '" title="' + esc(s.name) + '">' +
            (ICONS[s.icon] || ICONS.github) + "</a>"
          );
        })
        .join("");
      scrollEl.parentNode.insertBefore(sbox, scrollEl);
    }
  }

  // 首页顶栏浮在首屏上时变成透明白字，滚下去恢复；
  // 同时首屏文字随滚动淡出上移，避免和顶栏重叠（参考站同款效果）
  function initSplashHeader() {
    var splash = $("#splash");
    var head = $(".site-head");
    if (!splash || !head) return;
    var inner = splash.querySelector(".splash-inner");
    function update() {
      var h = splash.offsetHeight;
      // 子页面里首屏被收起（高度为 0），不参与计算，顶栏恢复常态
      if (!h) {
        head.classList.remove("is-over-hero");
        return;
      }
      var y = window.scrollY;
      head.classList.toggle("is-over-hero", y < h - 100);
      if (inner) {
        // 滚过首屏高度的 35% 时文字基本消失，不会撞上顶栏
        var fade = Math.max(0, Math.min(1, y / (h * 0.35)));
        inner.style.opacity = String(1 - fade);
        inner.style.transform = "translateY(" + -fade * 70 + "px)";
        inner.style.visibility = fade >= 1 ? "hidden" : "visible";
        inner.style.pointerEvents = fade > 0.5 ? "none" : "";
      }
    }
    window.__splashUpdate = update;
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- 背景音乐 ----------
     浏览器不允许网页自动出声，必须由用户点一下才播。
     所以这里只做按钮，不做自动播放——不是偷懒，是规范如此。
     ---------------------------------- */
  function initMusic() {
    if (document.querySelector(".music-btn")) return;

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "icon-btn music-icon";
    btn.id = "music-btn";
    btn.setAttribute("aria-label", "背景音乐");
    btn.setAttribute("data-tip", "背景音乐");
    btn.innerHTML = ICONS.disc;

    // 播放列表：优先用 playlist.js。读不到先放 SITE 那一首，别让播放器哑掉；
    // 但记下状态，后台再拉一次歌单，拉不回来也明说，不静默装成「只有一首」。
    var list = readPlaylist();
    if (!list) {
      playlistState = "loading";
      list = [trackAt(0)];
    }

    playerList = list;
    try {
      var saved = parseInt(localStorage.getItem("reze-track") || "0", 10);
      if (!isNaN(saved) && saved >= 0 && saved < list.length) playerIdx = saved;
    } catch (e) {
      playerIdx = 0;
    }

    // 上次验证过能用的线路直接用，省得每次先从连不上的 CDN 上撞一遍
    audioBase = readLineMemo();

    var audio = document.createElement("audio");
    audio.loop = true;
    audio.preload = "metadata";
    audio.volume = 0.35;
    bgmAudio = audio;

    var toast = null;
    var asked = false; // 用户点过播放没有（没点就别弹失败提示，太吵）

    // 这条线路挂了就换下一条，正在播的继续播，位置也跟着过去
    audio.addEventListener("error", function () {
      if (audioQueue.length) {
        var pos = audio.currentTime || 0;
        var next = audioQueue.shift();
        audioBase = next.base;
        audio.src = next.url;
        audio.load();
        if (pos > 0) {
          try {
            audio.currentTime = pos;
          } catch (e) {}
        }
        if (audioWantPlay) {
          var rp = audio.play();
          if (rp && typeof rp.catch === "function") rp.catch(function () {});
        }
        return;
      }
      // 所有线路都不通：CDN、镜像、本站全没拿到音频
      audioDead = true;
      audioWantPlay = false;
      btn.classList.remove("is-playing");
      if (asked && audioOnDead) audioOnDead();
    });
    audio.addEventListener("play", function () {
      btn.classList.add("is-playing");
      btn.setAttribute("aria-label", "暂停背景音乐");
    });
    audio.addEventListener("pause", function () {
      btn.classList.remove("is-playing");
      btn.setAttribute("aria-label", "播放背景音乐");
    });

    // 先按「已知能用的线路」装好地址，能立刻播（同源保底，不会哑）
    setTrackSrc(list[playerIdx], false);

    // 悬浮播放器：点顶栏这颗音乐按钮就能唤起
    initFloatPlayer();

    // 后台探一下 CDN 通不通：通了就切过去，进度条才能拖
    probeAudioLine(list[playerIdx].src, function (base) {
      if (!base || audioDead || !audio.paused) return;
      audioBase = base;
      setTrackSrc(trackAt(playerIdx), false);
    });

    var toastSeq = 0;
    function showToast(html) {
      var seq = ++toastSeq;
      if (toast && toast.parentNode) toast.remove(); // 换文案，别被旧提示挡住
      toast = document.createElement("div");
      toast.className = "music-toast";
      toast.innerHTML = html;
      document.body.appendChild(toast);
      setTimeout(function () {
        if (seq !== toastSeq) return; // 已经被新提示替换掉了
        if (toast && toast.parentNode) toast.remove();
        toast = null;
      }, 7000);
    }

    audioOnDead = function () {
      showToast(
        "音频加载失败。"
      );
    };

    btn.addEventListener("click", function () {
      asked = true;
      // 面板没开：叫出来（顺便开始播）；面板已经开着：这颗按钮就当播放/暂停用
      var el = fpEl();
      var wasOpen = !!(el && el.classList.contains("on"));
      openFloatPlayer();
      // 上一轮全挂了：用户再点就从头再试一遍（网络可能已经好了）
      if (audioDead) {
        audioDead = false;
        asked = true;
        setTrackSrc(trackAt(playerIdx), false);
        setTimeout(function () {
          if (!audioDead) playAudio();
        }, 60);
        return;
      }
      if (audio.paused) {
        playAudio();
      } else if (wasOpen) {
        // 面板本来就开着，这一下才算「暂停」；刚才是关着的就别一开就停
        audioWantPlay = false;
        audio.pause();
      }
    });

    document.body.appendChild(audio);
    // 放到顶栏：搜索、音乐、皮肤、主题 依次排列
    var skinBtn = $("#skin-btn");
    var tools = $(".head-tools");
    if (skinBtn && skinBtn.parentNode) skinBtn.parentNode.insertBefore(btn, skinBtn);
    else if (tools) tools.appendChild(btn);
    else {
      btn.className = "music-btn";
      document.body.appendChild(btn);
    }

    // 列表区那颗「重试」按钮走这里（手动重试才给提示）
    retryPlaylistHook = function () { runPlaylistRescue(true); };
    if (playlistState === "loading") runPlaylistRescue(false);

    function runPlaylistRescue(manual) {
      if (playlistBusy) return;
      playlistBusy = true;
      playlistState = "loading";
      if (refreshTrackList) refreshTrackList(false);
      rescuePlaylist(0, function (arr) {
        playlistBusy = false;
        if (arr) {
          playerList = arr;
          playlistState = "ok";
          if (playerIdx >= arr.length) playerIdx = 0;
          if (refreshTrackList) refreshTrackList(!asked);
          if (manual) showToast("歌单已恢复，" + arr.length + " 首。");
        } else {
          playlistState = "failed";
          if (refreshTrackList) refreshTrackList(false);
          if (manual) showToast("歌单加载失败。");
        }
      });
    }
  }

  /* ---------- 全文搜索 ---------- */
  function initSearch() {
    if (document.getElementById("search-overlay")) return;
    var tools = $(".head-tools");
    if (!tools) return;

    var trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "icon-btn";
    trigger.id = "search-btn";
    trigger.setAttribute("aria-label", "搜索文章");
    trigger.setAttribute("data-tip", "搜索 Ctrl+K");
    trigger.innerHTML = ICONS.search;
    tools.insertBefore(trigger, tools.firstChild);

    // 索引先只拿元数据（标题/摘要/标签/分类），正文等用户真的要搜再补
    var index = [];
    function buildIndex() {
      index = orderedPosts().map(function (p) {
        var body = plain(p.content);
        return {
          post: p,
          titleLow: p.title.toLowerCase(),
          tagsLow: (p.tags || []).join(" ").toLowerCase(),
          haystack: (
            p.title + " " + p.excerpt + " " + (p.tags || []).join(" ") + " " + p.cat + " " + body
          ).toLowerCase(),
          body: body || p.excerpt || ""
        };
      });
    }
    buildIndex();

    var overlay = document.createElement("div");
    overlay.className = "search-overlay";
    overlay.id = "search-overlay";
    overlay.innerHTML =
      '<div class="search-box" role="dialog" aria-modal="true" aria-label="搜索文章">' +
      '<div class="search-field">' +
      ICONS.search +
      '<input class="search-input" type="text" placeholder="搜标题、标签、正文…" autocomplete="off" spellcheck="false">' +
      '<button class="search-clear" type="button" aria-label="清空">×</button>' +
      "</div>" +
      '<div class="search-results"></div>' +
      '<div class="search-hint">' +
      "<span><kbd>↑</kbd><kbd>↓</kbd> 选择</span>" +
      "<span><kbd>Enter</kbd> 打开</span>" +
      "<span><kbd>Esc</kbd> 关闭</span>" +
      "</div>" +
      "</div>";
    document.body.appendChild(overlay);

    var input = overlay.querySelector(".search-input");
    var results = overlay.querySelector(".search-results");
    var clearBtn = overlay.querySelector(".search-clear");
    var active = -1;

    function showRecent() {
      results.innerHTML =
        '<div class="search-empty">输入关键词开始搜索<br>共 ' +
        POSTS.length +
        " 篇文章可供检索</div>";
    }

    function openPanel() {
      ensureFullIndex();
      overlay.classList.add("open");
      document.body.style.overflow = "hidden";
      if (!input.value) showRecent();
      setTimeout(function () {
        input.focus();
      }, 30);
    }

    function closePanel() {
      overlay.classList.remove("open");
      document.body.style.overflow = "";
      input.value = "";
      clearBtn.classList.remove("show");
      active = -1;
    }

    function paint(list, terms) {
      active = -1;
      if (!list.length) {
        results.innerHTML =
          '<div class="search-empty">没有找到相关的内容<br>换个词试试，或者用更短的词</div>';
        return;
      }
      results.innerHTML = list
        .map(function (item, i) {
          var p = item.post;
          var snip = snippet(item.body || item.post.excerpt || "", terms, 70);
          return (
            '<a class="search-item" data-i="' +
            i +
            '" href="/p/' +
            encodeURIComponent(p.id) +
            '">' +
            "<h4>" +
            highlight(p.title, terms) +
            '<span class="cat">' +
            esc(p.cat) +
            "</span></h4>" +
            "<p>" +
            highlight(snip, terms) +
            "</p>" +
            "</a>"
          );
        })
        .join("");
    }

    /* 首屏只有元数据，全文索引等用户第一次打开搜索框再补一次；
       拉的过程中仍能用标题/摘要搜，补完后重画当前结果。 */
    var _fullAsked = false;
    function ensureFullIndex() {
      if (_fullAsked || typeof window.loadCloudContent !== "function") return;
      _fullAsked = true;
      window.loadCloudContent({ light: false }).then(function (c) {
        if (!c || !Array.isArray(c.posts) || !c.posts.length) return;
        applyDataOver(null, c.posts, true);
        buildIndex();
        if (input.value.trim()) doSearch();
      }).catch(function () {});
    }

    function doSearch() {
      var q = input.value.trim();
      clearBtn.classList.toggle("show", q.length > 0);
      if (!q) {
        showRecent();
        return;
      }
      var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
      var hits = [];
      for (var i = 0; i < index.length; i++) {
        var item = index[i];
        var score = 0;
        var ok = true;
        for (var j = 0; j < terms.length; j++) {
          var t = terms[j];
          if (item.haystack.indexOf(t) === -1) {
            ok = false;
            break;
          }
          score += 1;
          if (item.titleLow.indexOf(t) !== -1) score += 12;
          if (item.tagsLow.indexOf(t) !== -1) score += 6;
        }
        if (ok) hits.push({ item: item, score: score });
      }
      hits.sort(function (a, b) {
        return b.score - a.score;
      });
      paint(
        hits.map(function (h) {
          return h.item;
        }),
        terms
      );
    }

    function move(delta) {
      var items = results.querySelectorAll(".search-item");
      if (!items.length) return;
      if (active >= 0 && items[active]) items[active].classList.remove("active");
      active = (active + delta + items.length) % items.length;
      items[active].classList.add("active");
      items[active].scrollIntoView({ block: "nearest" });
    }

    trigger.addEventListener("click", openPanel);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closePanel();
    });
    clearBtn.addEventListener("click", function () {
      input.value = "";
      clearBtn.classList.remove("show");
      showRecent();
      input.focus();
    });
    input.addEventListener("input", doSearch);

    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        move(1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        move(-1);
      } else if (e.key === "Enter") {
        var items = results.querySelectorAll(".search-item");
        var target = active >= 0 ? items[active] : items[0];
        if (target && target.getAttribute("href")) {
          window.location.href = target.getAttribute("href");
        }
      }
    });

    document.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        if (overlay.classList.contains("open")) closePanel();
        else openPanel();
      } else if (e.key === "Escape" && overlay.classList.contains("open")) {
        closePanel();
      }
    });
  }

  /* ---------- 回到顶部 ---------- */
  function initToTop() {
    if (document.querySelector(".to-top")) return;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "to-top";
    btn.setAttribute("aria-label", "回到顶部");
    btn.innerHTML = ICONS.up;
    document.body.appendChild(btn);

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    function update() {
      btn.classList.toggle("show", window.scrollY > 600);
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ---------- 顶栏滚动 ---------- */
  function initHead() {
    var head = $(".site-head");
    if (!head) return;
    function onScroll() {
      head.classList.toggle("is-stuck", window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 入场动画 ---------- */
  var io = null;
  function observeReveal(root) {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(function (n) {
        n.classList.add("in");
      });
      return;
    }
    if (!io) {
      io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
      );
    }
    (root || document).querySelectorAll(".reveal:not(.in)").forEach(function (n) {
      io.observe(n);
    });
  }

  /* ---------- 年份 ---------- */
  function initYear() {
    document.querySelectorAll(".js-year").forEach(function (n) {
      n.textContent = new Date().getFullYear();
    });
    document.querySelectorAll(".js-site-name").forEach(function (n) {
      n.textContent = SITE.name || "";
    });
    document.querySelectorAll(".js-domain").forEach(function (n) {
      n.textContent = SITE.domain || "";
    });
    document.querySelectorAll(".js-icp").forEach(function (n) {
      n.textContent = SITE.icp || "备案中";
    });
  }

  /* ---------- 本地 CMS 覆盖（后台编辑器产物） ----------
     后台 admin.html 编辑后把内容存进 localStorage；
     这里在启动最前读取，有就覆盖 SITE / POSTS，实现本机即时预览。
     部署上线则依赖导出的 data.override.js（见 index.html 引用）。
     ---------------------------------- */
  function applyLocalCms() {
    try {
      var raw = window.localStorage.getItem("reze-cms");
      if (!raw) return;
      var cms = JSON.parse(raw);
      applyDataOver(cms && cms.site, cms && cms.posts);
    } catch (e) {}
  }

  /* ---------- 内容本地缓存 ----------
     为什么要缓存：/site-data/content 是一整仿、一千多 KB，回包时快时慢。
     不缓存的话每次刷新都得等它，等不到就只能用 data.js 里的旧数据，
     刚发的文章就会成为「没有找到」。存一份在 localStorage，下次先用它铺页面。 */
  var CONTENT_CACHE_KEY = "reze-content-cache-v2";
  var CONTENT_CACHE_MAX = 3.6 * 1024 * 1024; // 大概 3.6MB，留余量给别的键

  function readContentCache() {
    try {
      var raw = localStorage.getItem(CONTENT_CACHE_KEY);
      if (!raw) return null;
      var d = JSON.parse(raw);
      if (d && d.site && typeof d.site === "object" && Array.isArray(d.posts) && d.posts.length) return d;
    } catch (e) {}
    return null;
  }

  function writeContentCache(c) {
    try {
      var s = JSON.stringify({
        site: c.site || {},
        posts: Array.isArray(c.posts) ? c.posts : [],
        events: Array.isArray(c.events) ? c.events : [],
        t: Date.now()
      });
      if (s.length > CONTENT_CACHE_MAX) return;
      localStorage.setItem(CONTENT_CACHE_KEY, s);
    } catch (e) {
      // 满了就把旧的清掉，不能因为缓存把页面弄崩
      try { localStorage.removeItem(CONTENT_CACHE_KEY); } catch (e2) {}
    }
  }

  /* 云端内容到达后，把「刚才没拿到」的那一页补画一遍。
     正常浏览时这里什么都不做，只有内容比首屏晚到或版本变了才动手。 */
  /* 内容指纹：篇数 + 时间线条数 + 每篇的置顶、日期、更新时间。
     只比篇数会漏掉「篇数没变但置顶状态变了」：旧缓存先铺页面，云端回来
     数据换了却不重画，撤掉的置顶会一直挂在卡片上。 */
  function contentSig() {
    var ps = window.POSTS || [];
    var h = 0;
    for (var i = 0; i < ps.length; i++) {
      var q = ps[i] || {};
      var s = (q.id || "") + ":" + (q.pinned ? 1 : 0) + ":" + (q.date || "") + ":" + (q.updated || "");
      for (var j = 0; j < s.length; j++) h = (h * 31 + s.charCodeAt(j)) | 0;
    }
    return ps.length + "|" + (((window.SITE && window.SITE.timeline) || []).length) + "|" + h;
  }
  var _bootSig = "";

  function afterContentReady() {
    try {
      var app = document.querySelector(".app");
      if (!app || app.getAttribute("data-static")) return;
      var page = app.getAttribute("data-page") || "home";
      if (page === "post") {
        var host = $("#app-main");
        if (!host) return;
        var pending = host.getAttribute("data-post-pending") === "1";
        var id = host.getAttribute("data-post-id") ||
          new URLSearchParams(parseHash().qs).get("id") || "";
        if (!id) return;
        var p = postById(id);
        var sig = p ? String((p.content || "").length) : "";
        if (!pending && (!p || sig === host.getAttribute("data-post-sig"))) return;
        var y = window.scrollY;
        mountPost(host, id);
        if (y > 0) instantScrollTo(y);
        else if (pending) instantScrollTo(0);
        return;
      }
      /* 列表、归档、动态这些页面原来只在启动时画一次。
         可本地 data.js 里只有几篇占位，真正的七十多篇在云端，
         第一次访问（浏览器里还没缓存）就会先画出那几篇，然后一直停在那儿，
         非得刷新一次才齐。这里内容一到、份数对不上，就补画一遍，滚动位置按住不放。 */
      var now = contentSig();
      if (now === _bootSig) return;
      _bootSig = now;
      var keepY = window.scrollY || window.pageYOffset || 0;
      renderMain();
      if (keepY > 0) {
        instantScrollTo(keepY);
        requestAnimationFrame(function () { instantScrollTo(keepY); });
      }
    } catch (e) {
      if (window.console && console.error) console.error("[reze] afterContentReady", e);
    }
  }

  /* ---------- 启动 ---------- */
  function boot() {
    applyLocalCms(); // 先套用本地编辑的内容，再渲染
    // 每个模块单独兜底：任何一处出错都不该拖垮整页
    [
      initPageBg, // 先定背景，设置面板的高亮才有依据
      initTheme,
      initHead,
      initYear,
      initMusic,
      initSearch,
      initToTop,
      initNavMore,
      initSettings,
      mountSidebar,
      mountHome,
      mountApp,
      mountWriting,
      mountPost,
      mountSplash,
      initExtras,
      initSaved,
      initShortcuts,
      initSplashHeader,
    ].forEach(
      function (fn) {
        try {
          fn();
        } catch (e) {
          if (window.console && console.error) console.error("[reze] " + fn.name + " 失败", e);
        }
      }
    );
    try {
      observeReveal(document);
    } catch (e) {}
    // 老链接（/#/writing）还是走 hashchange；新地址（/writing）靠 popstate 接前进后退
    window.addEventListener("hashchange", applyRoute);
    window.addEventListener("popstate", applyRoute);
    document.addEventListener("click", interceptLinks);
    /* 文章页挂了 <base href="/">，以 # 开头的锚点会被浏览器解析到首页去。
       这里统一接管：滚到本页对应位置，地址写回当前路径，不跳站。 */
    document.addEventListener("click", function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      var h = a.getAttribute("href") || "";
      // #/writing 这种老 hash 路由交给路由处理，不当锚点
      if (h.length < 2 || h.charAt(1) === "/") return;
      var el = document.getElementById(h.slice(1));
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      try { history.replaceState(null, "", location.pathname + location.search + h); } catch (err) {}
    });
    // 诗笺：点击换一首。事件托管，左栏每次重渲染都不用重新绑
    document.addEventListener("click", function (e) {
      var t = e.target;
      if (t && t.closest && t.closest(".g-notice.gn-swap")) swapPoem();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " " && e.key !== "Spacebar") return;
      var el = document.activeElement;
      if (el && el.classList && el.classList.contains("gn-swap")) {
        e.preventDefault();
        swapPoem();
      }
    });
    // 导航页分类筛选 / 时间线「加载更早」：事件托管，重渲染后不用重新绑
    document.addEventListener("click", function (e) {
      var chip = e.target.closest(".lk-chip, .lk-more");
      if (chip) {
        lkActiveCat = chip.getAttribute("data-cat") || "";
        renderMain();
        // 换分类后回到筛选条下方，别停在半空中
        var bar = document.querySelector(".lk-bar");
        if (bar) {
          var y = bar.getBoundingClientRect().top + window.scrollY - 74;
          instantScrollTo(Math.max(0, y));
        }
        return;
      }
      if (e.target.closest("#tl-more")) {
        var host = $("#app-main");
        if (host) {
          host.innerHTML = momentsMainHtml();
          bindMoments(host);
        }
      }
    });
    // 内页地址现在是 /writing 这种真实路径，不再靠 hash 判断要不要跑路由。
    // 静态页（changelog.html）正文是自己编译好的，路由不接管，首屏那层照旧收一下。
    var _app0 = document.querySelector(".app");
    if (_app0 && _app0.getAttribute("data-static")) syncSplash("home");
    else if (parseHash().page || location.hash) applyRoute();
    // 没有路由时也要判断一次：老访客直接进首页，不再弹欢迎大屏
    else syncSplash("home");
    watchBuild();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }

  // 启动：先套本地编辑的内容，再尝试拉云端（云端优先），最后渲染
  async function start() {
    // 登录回调（WorkBuddy 账号登录用于进入后台 admin.html）
    try {
      if (typeof window.handleCloudCallback === "function") {
        var cb = await window.handleCloudCallback();
        if (cb === "ok") {
          try {
            if (sessionStorage.getItem("reze-admin-intent") === "1") {
              sessionStorage.removeItem("reze-admin-intent");
              location.replace("admin.html");
              return;
            }
          } catch (e) {}
        }
      }
    } catch (e) {}

    applyLocalCms();
    // 先用上次成功拿到的内容把页面铺上。/site-data/content 要一两秒到十几秒，
    // 等它回来再渲染，刷新文章页会先白屏，网络一抖还会把刚发的文章判成「没有找到」。
    var cached = readContentCache();
    if (cached) {
      applyDataOver(cached.site, cached.posts, true);
      if (Array.isArray(cached.events)) window.CAL_EVENTS = cached.events;
    }
    boot();
    // 记下「刚才画的是哪一份」，云端那份回来以后好对比要不要补画
    _bootSig = contentSig();
    // 再向云端要一次：拿到以后原地更新，必要时把当前这一页补画一遍
    try {
      if (typeof window.loadCloudContent === "function") {
        var c = await window.loadCloudContent({ light: true });
        if (c && c.site && Object.keys(c.site).length) {
          applyDataOver(c.site, Array.isArray(c.posts) ? c.posts : null, true);
          if (Array.isArray(c.events)) window.CAL_EVENTS = c.events;
          writeContentCache(c);
          window.__contentGot = true;
        }
      }
    } catch (e) {}
    window.__contentReady = true;
    afterContentReady();
  }

  /* 测试挂钩：只在带 ?__test=1 时挂出来，平时是空的。
     自动测试要能直接调 mountPost / insertPostToc 验证目录注入，
     否则 IIFE 里的函数外面一个都摸不到。（线上访问永远不带这个参数） */
  if (/[?&]__test=1/.test(location.search)) {
    window.__REZE_TEST__ = {
      mountPost: mountPost,
      insertPostToc: insertPostToc,
      buildPostTocHtml: buildPostTocHtml,
      bindToc: bindToc,
      mountVideos: mountVideos,
      relatedPosts: relatedPosts,
      recStripHtml: recStripHtml,
    };
  }
})();
