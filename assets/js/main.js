/* ============================================================
   reze520.top · 前端逻辑
   ------------------------------------------------------------
   靠 data.js 里的 SITE / POSTS 渲染页面，无需后端。
   ============================================================ */
(function () {
  "use strict";

  var SITE = window.SITE || {};
  // 注意：POSTS 必须保持对 window.POSTS 数组的引用（不要 slice 复制），
  // 否则后台/云端的动态数据无法同步到这里的渲染。
  var POSTS = window.POSTS || [];

  // 原地更新 SITE/POSTS（保持引用不变，页面所有渲染自动看到新数据）
  function applyDataOver(site, posts) {
    try {
      if (site && typeof site === "object") {
        for (var k in window.SITE) { if (!(k in site)) delete window.SITE[k]; }
        for (var k2 in site) window.SITE[k2] = site[k2];
      }
      if (Array.isArray(posts)) {
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
    play:
      '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M8 5.2v13.6a1 1 0 0 0 1.52.85l10.5-6.8a1 1 0 0 0 0-1.7L9.52 4.35A1 1 0 0 0 8 5.2Z"/></svg>',
    pause:
      '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="7" y="4.5" width="3.6" height="15" rx="1.2"/><rect x="13.4" y="4.5" width="3.6" height="15" rx="1.2"/></svg>',
    skipBack:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 5v14L8 12l10-7Z" fill="currentColor" stroke="none"/><path d="M5 5v14"/></svg>',
    skipFwd:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 5v14l10-7L6 5Z" fill="currentColor" stroke="none"/><path d="M19 5v14"/></svg>',
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

  // 把背景图铺到全屏层；fade 为 true 时先淡出再换图，避免生硬跳变
  function applyPageBg(src, fade) {
    var el = $("#page-bg");
    if (!el || !src) return;
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
    var idx;
    if (saved === "-1") {
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
    applyPageBg(list[idx]);
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
  // 封面是渐变大色块，只在紫蓝区里取。
  // 光靠 hash 会让相邻两张卡撞成同一个颜色，所以让列表位置主导，
  // hash 只做 0–6 度的微调，保证相邻两张至少差 17 度。
  function coverHue(str, i) {
    return 240 + ((i || 0) * 23 + (hashOf(str) % 7)) % 100;
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
    return plain(post.content).length;
  }
  function readMin(post) {
    return Math.max(1, Math.round(wordCount(post) / 380));
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

  /* ---------- 侧栏 ---------- */
  function sidebarMarkup() {
    var cc = catCounts();
    var tc = tagCounts();
    var catNum = Object.keys(cc).length;
    var tagNum = Object.keys(tc).length;

    var avatar = SITE.avatar
      ? '<div class="avatar"><img src="' + esc(SITE.avatar) + '" alt="' + esc(SITE.name) + '"></div>'
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
          '<li><a href="post.html?id=' +
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
          '<a href="writing.html?tag=' +
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
      esc(SITE.slogan) +
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
    var cover = p.cover
      ? '<img src="' + esc(p.cover) + '" alt="' + esc(p.title) + '" loading="lazy">'
      : '<div class="cover-ph"><span>' + esc(p.cat) + "</span></div>";

    var pin = p.pinned ? '<span class="pin">置顶</span>' : "";

    return (
      '<article class="card reveal" data-cat="' +
      esc(p.cat) +
      '">' +
      '<a href="post.html?id=' +
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
      "</div>" +
      "</div>" +
      '<div class="cover" style="--ph-h:' +
      coverHue(p.id, i) +
      '">' +
      cover +
      "</div>" +
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
      '<a class="g-tab" href="timeline.html">归档</a>' +
      '<button class="g-tab" data-cat="全部" aria-pressed="true">全部<span class="n">' +
      POSTS.length + "</span></button>";
    Object.keys(counts).forEach(function (c) {
      tabs +=
        '<button class="g-tab" data-cat="' + esc(c) + '" aria-pressed="false">' + esc(c) +
        '<span class="n">' + counts[c] + "</span></button>";
    });
    return '<div class="g-tabs" id="g-tabs">' + tabs + "</div>" +
      '<div class="g-list" id="g-list"></div>';
  }

  function glassPostH(p) {
    var thumb = p.cover
      ? '<img src="' + esc(p.cover) + '" alt="" loading="lazy">'
      : '<div class="ph">' + esc(p.cat) + "</div>";
    var chips = (p.tags || [])
      .slice(0, 5)
      .map(function (t) {
        return '<span style="--tag-h:' + tagHue(t) + '"># ' + esc(t) + "</span>";
      })
      .join("");
    return (
      '<a class="g-posth" href="post.html?id=' + encodeURIComponent(p.id) + '">' +
      '<div class="info">' +
      '<div class="ttl"><span class="mark">' + ICONS.doc + "</span>" +
      "<h2>" + esc(p.title) + "</h2>" +
      (p.pinned ? '<span class="pin">置顶</span>' : "") + "</div>" +
      (chips ? '<div class="chips">' + chips + "</div>" : "") +
      '<p class="excerpt">' + esc(p.excerpt) + "</p>" +
      '<div class="meta"><span>' + ICONS.cal + fmtDate(p.date) + "</span>" +
      "<span>" + ICONS.doc + wordCount(p).toLocaleString() + " 字</span>" +
      "<span>" + ICONS.clock + readMin(p) + " 分钟</span></div>" +
      "</div>" +
      '<div class="thumb">' + thumb + "</div>" +
      "</a>"
    );
  }

  /* ---------- 动态 / 相册 / 导航 ---------- */
  function momentsMainHtml() {
    var list = (SITE.moments || []).slice().sort(function (a, b) {
      return a.date < b.date ? 1 : -1;
    });
    var tags = {};
    list.forEach(function (m) {
      (m.tags || []).forEach(function (t) {
        tags[t] = (tags[t] || 0) + 1;
      });
    });
    var chips = '<button class="g-tab" data-mtag="" aria-pressed="true">全部<span class="n">' +
      list.length + "</span></button>";
    Object.keys(tags).forEach(function (t) {
      chips += '<button class="g-tab" data-mtag="' + esc(t) + '" aria-pressed="false">' +
        esc(t) + '<span class="n">' + tags[t] + "</span></button>";
    });

    return (
      '<div class="g-card" style="margin-bottom:14px">' +
      '<div class="g-card-head"><span class="t">' + ICONS.activity + "动态</span>" +
      '<span class="more">' + list.length + " 条</span></div>" +
      '<div class="g-searchline">' + ICONS.search +
      '<input type="text" id="m-search" placeholder="搜搜看以前说过什么…" autocomplete="off"></div>' +
      '<div style="padding:0 14px 14px"><div class="g-tabs" id="m-tabs" style="margin:0">' +
      chips + "</div></div></div>" +
      '<div class="g-moments" id="m-list"></div>'
    );
  }

  function momentMarkup(m) {
    var av = SITE.avatar
      ? '<img src="' + esc(SITE.avatar) + '" alt="">'
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
    var footTags = (m.tags || [])
      .map(function (t) {
        return '<span style="--tag-h:' + tagHue(t) + '"># ' + esc(t) + "</span>";
      })
      .join("");
    return (
      '<div class="g-moment">' +
      '<div class="av">' + av + "</div>" +
      "<div>" +
      '<div class="head"><b>' + esc(SITE.name) + '</b><span class="time">' +
      esc(m.date) + "</span></div>" +
      '<div class="body">' + esc(m.text) + "</div>" +
      pics +
      (footTags ? '<div class="foot">' + footTags + "</div>" : "") +
      "</div></div>"
    );
  }

  function bindMoments(root) {
    var listEl = root.querySelector("#m-list");
    var tabsEl = root.querySelector("#m-tabs");
    var searchEl = root.querySelector("#m-search");
    if (!listEl) return;
    var all = (SITE.moments || []).slice().sort(function (a, b) {
      return a.date < b.date ? 1 : -1;
    });
    var curTag = "";
    var curQ = "";

    function paint() {
      var list = all.filter(function (m) {
        var okTag = !curTag || (m.tags || []).indexOf(curTag) !== -1;
        var okQ = !curQ || (m.text || "").toLowerCase().indexOf(curQ) !== -1;
        return okTag && okQ;
      });
      listEl.innerHTML = list.length
        ? list.map(momentMarkup).join("")
        : '<div class="g-empty">没有找到相关的动态</div>';
      if (tabsEl) {
        Array.prototype.forEach.call(tabsEl.querySelectorAll(".g-tab"), function (b) {
          b.setAttribute("aria-pressed", String((b.getAttribute("data-mtag") || "") === curTag));
        });
      }
    }

    if (tabsEl)
      tabsEl.addEventListener("click", function (e) {
        var b = e.target.closest(".g-tab");
        if (!b) return;
        curTag = b.getAttribute("data-mtag") || "";
        paint();
      });
    if (searchEl)
      searchEl.addEventListener("input", function () {
        curQ = searchEl.value.trim().toLowerCase();
        paint();
      });

    paint();
  }

  function albumMainHtml() {
    var items = SITE.album || [];
    var cats = SITE.albumCats || [];
    // 收集所有相册里出现的分类（含未在 albumCats 里的）
    var seen = cats.slice();
    items.forEach(function (it) { if (it.cat && seen.indexOf(it.cat) < 0) seen.push(it.cat); });
    var chips = '<div class="g-tabs" id="al-tabs" style="margin:0 0 14px"><button class="g-tab" data-acat="" aria-pressed="true">全部<span class="n">' + items.length + "</span></button>";
    seen.forEach(function (c) {
      var n = items.filter(function (it) { return it.cat === c; }).length;
      chips += '<button class="g-tab" data-acat="' + esc(c) + '" aria-pressed="false">' + esc(c) + '<span class="n">' + n + "</span></button>";
    });
    chips += "</div>";

    function cellsOf(list) {
      return list
        .map(function (it) {
          var inner = it.src
            ? '<img src="' + esc(it.src) + '" alt="' + esc(it.caption || "") + '" loading="lazy">'
            : '<div class="ph">待添加</div>';
          return (
            "<figure>" + inner + "<figcaption><span>" + esc(it.caption || "") +
            "</span><time>" + fmtDate(it.date) + "</time></figcaption></figure>"
          );
        })
        .join("");
    }
    return chips + '<div class="g-album" id="al-grid">' + cellsOf(items) + "</div>";
  }

  function bindAlbumTabs(root) {
    var tabs = root.querySelector("#al-tabs");
    var grid = root.querySelector("#al-grid");
    if (!tabs || !grid) return;
    var items = SITE.album || [];
    function paint(cat) {
      var list = items.filter(function (it) { return !cat || it.cat === cat; });
      grid.innerHTML = list.length
        ? list.map(function (it) {
            var inner = it.src
              ? '<img src="' + esc(it.src) + '" alt="' + esc(it.caption || "") + '" loading="lazy">'
              : '<div class="ph">待添加</div>';
            return "<figure>" + inner + "<figcaption><span>" + esc(it.caption || "") +
              "</span><time>" + fmtDate(it.date) + "</time></figcaption></figure>";
          }).join("")
        : '<div class="g-empty">这个分类还没有照片</div>';
      tabs.querySelectorAll(".g-tab").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.getAttribute("data-acat") === cat));
      });
    }
    tabs.addEventListener("click", function (e) {
      var b = e.target.closest(".g-tab[data-acat]");
      if (!b) return;
      paint(b.getAttribute("data-acat"));
    });
  }

  function linksMainHtml() {
    var items = SITE.links || [];
    return (
      '<div class="g-links-grid">' +
      items
        .map(function (l) {
          return (
            '<a class="g-link" href="' + esc(l.url) + '" target="_blank" rel="noopener">' +
            '<span class="ico">' + (ICONS[l.icon] || ICONS.layers) + "</span>" +
            '<span class="txt"><b>' + esc(l.name) + "</b><span>" + esc(l.desc || "") +
            "</span></span></a>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  function bindPostTabs(root, params0) {    var listEl = root.querySelector("#g-list");
    var barEl = root.querySelector("#g-tabs");
    if (!listEl || !barEl) return;

    var params = params0 || new URLSearchParams(location.search);
    var startCat = params.get("cat") || "全部";
    var startTag = params.get("tag") || "";

    function apply(c, t) {
      var list = orderedPosts().filter(function (p) {
        var okCat = !c || c === "全部" || p.cat === c;
        var okTag = !t || (p.tags || []).indexOf(t) !== -1;
        return okCat && okTag;
      });
      listEl.innerHTML = list.length
        ? list.map(glassPostH).join("")
        : '<div class="g-empty">这里还没有文章</div>';
      Array.prototype.forEach.call(barEl.querySelectorAll(".g-tab[data-cat]"), function (b) {
        b.setAttribute("aria-pressed", String(!t && b.getAttribute("data-cat") === c));
      });
    }

    barEl.addEventListener("click", function (e) {
      var b = e.target.closest(".g-tab[data-cat]");
      if (!b) return;
      apply(b.getAttribute("data-cat"), "");
      try {
        history.replaceState(null, "", location.pathname.split("/").pop() || "index.html");
      } catch (err) {}
    });

    apply(startCat, startTag);
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
      '<a class="g-post" href="post.html?id=' + encodeURIComponent(p.id) + '">' +
      '<div class="top"><span>' + fmtDate(p.date) + "</span>" +
      '<span class="dot"></span><span class="cat">' + esc(p.cat) + "</span>" +
      (p.pinned ? '<span class="pin">置顶</span>' : "") +
      '<span class="dot"></span><span>' + wordCount(p).toLocaleString() + " 字</span></div>" +
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

    var params = params0 || new URLSearchParams(location.search);
    var startCat = params.get("cat") || "全部";
    var startTag = params.get("tag") || "";

    function apply(c, t) {
      var list = orderedPosts().filter(function (p) {
        var okCat = !c || c === "全部" || p.cat === c;
        var okTag = !t || (p.tags || []).indexOf(t) !== -1;
        return okCat && okTag;
      });
      listEl.innerHTML = list.length
        ? list.map(glassPostMarkup).join("")
        : '<div class="g-empty">这里还没有文章</div>';
      Array.prototype.forEach.call(barEl.querySelectorAll(".g-chip"), function (b) {
        b.setAttribute("aria-pressed", String(!t && b.getAttribute("data-cat") === c));
      });
    }

    barEl.addEventListener("click", function (e) {
      var b = e.target.closest(".g-chip");
      if (!b) return;
      apply(b.getAttribute("data-cat"), "");
      try {
        history.replaceState(null, "", "writing.html");
      } catch (err) {}
    });

    apply(startCat, startTag);
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
    var tagNames = Object.keys(tc).sort(function (a, b) {
      return tc[b] - tc[a];
    });

    /* ---- 左栏 ---- */
    var avatarHtml = SITE.avatar
      ? '<img src="' + esc(SITE.avatar) + '" alt="' + esc(SITE.name) + '">'
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
          '<a class="g-cat" href="writing.html?cat=' + encodeURIComponent(c) + '">' +
          ICONS.folder + esc(c) + '<span class="n">' + cc[c] + "</span></a>"
        );
      })
      .join("");

    var tagsHtml = tagNames
      .map(function (t) {
        return (
          '<a class="g-tag" href="writing.html?tag=' + encodeURIComponent(t) +
          '" style="--tag-h:' + tagHue(t) + '">' + esc(t) + "</a>"
        );
      })
      .join("");

    var noticeCard = SITE.notice
      ? '<div class="g-card"><div class="g-card-head"><span class="t">' + ICONS.info +
        '公告</span></div><div class="g-notice">' + esc(SITE.notice) +
        '<span class="sig">— ' + esc(SITE.name) + "</span></div></div>"
      : "";

    left.innerHTML =
      '<div class="g-card g-profile">' +
      '<div class="g-avatar">' + avatarHtml + "</div>" +
      '<p class="g-name">' + esc(SITE.name) + "</p>" +
      '<p class="g-bio">' + esc(SITE.slogan) + "</p>" +
      '<div class="g-social">' + socialHtml + "</div>" +
      '<div class="g-stats">' +
      "<div><span class='n'>" + POSTS.length + "</span><span class='k'>文章</span></div>" +
      "<div><span class='n'>" + tagNames.length + "</span><span class='k'>标签</span></div>" +
      "<div><span class='n'>" + Object.keys(cc).length + "</span><span class='k'>分类</span></div>" +
      "</div>" +
      "</div>" +
      noticeCard +
      '<div class="g-card g-player">' +
      '<div class="ply-head">音乐播放器</div>' +
      // 封面 + 歌名歌手
      '<div class="ply">' +
      '<div class="ply-cover" id="p-cover">' +
      (SITE.song && SITE.song.cover
        ? '<img src="' + esc(SITE.song.cover) + '" alt="">'
        : '<span class="ph">♪</span>') +
      "</div>" +
      '<div class="ply-info"><b id="p-title">' +
      esc((SITE.song && SITE.song.title) || "未知曲目") +
      '</b><span id="p-artist">' +
      esc((SITE.song && SITE.song.artist) || "") +
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
      '<button id="p-back" data-tip="从头开始">' + ICONS.skipBack + "</button>" +
      '<button class="ply-play" id="p-play" data-tip="播放 / 暂停">' + ICONS.play + "</button>" +
      '<button id="p-fwd" data-tip="快进 10 秒">' + ICONS.skipFwd + "</button>" +
      '<button id="p-lyricbox" data-tip="播放器歌词">' + ICONS.lyrics + "</button>" +
      "</div>" +
      // 歌词区（居中，当前句高亮）
      '<div class="ply-lyrics" id="p-lyrics"></div>' +
      "</div>" +
      '<div class="g-card">' +
      '<div class="g-card-head"><span class="t">' + ICONS.folder + "分类</span></div>" +
      '<div class="g-cats">' + catsHtml +
      '<a class="g-cat-foot" href="writing.html">查看全部文章 →</a></div>' +
      "</div>" +
      '<div class="g-card">' +
      '<div class="g-card-head"><span class="t">' + ICONS.tag + "标签</span></div>" +
      '<div class="g-tagwrap">' + tagsHtml + "</div>" +
      "</div>";

    /* ---- 右栏 ---- */
    var feed = byDateList()
      .slice(0, 4)
      .map(function (p) {
        return (
          "<li><time>" + fmtDate(p.date) + "</time>" +
          esc((p.excerpt || "").slice(0, 42)) + "…</li>"
        );
      })
      .join("");

    var now = new Date();
    var yy = now.getFullYear();
    var mm = now.getMonth();
    var firstDay = new Date(yy, mm, 1).getDay();
    var total = new Date(yy, mm + 1, 0).getDate();
    var marked = {};
    POSTS.forEach(function (p) {
      var d = new Date(p.date);
      if (d.getFullYear() === yy && d.getMonth() === mm) marked[d.getDate()] = 1;
    });
    var cells = ["日", "一", "二", "三", "四", "五", "六"]
      .map(function (d) {
        return "<span>" + d + "</span>";
      })
      .join("");
    for (var i = 0; i < firstDay; i++) cells += '<b class="mute"></b>';
    for (var dd = 1; dd <= total; dd++) {
      var cls = dd === now.getDate() ? "today" : marked[dd] ? "has" : "";
      cells += '<b class="' + cls + '">' + dd + "</b>";
    }

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
      '<div class="g-card">' +
      '<div class="g-card-head"><span class="t">' + ICONS.clock +
      '动态</span><a class="more" href="timeline.html">更多</a></div>' +
      '<ul class="g-feed">' + feed + "</ul></div>" +
      statCard +
      '<div class="g-card">' +
      '<div class="g-card-head"><span class="t">' + ICONS.cal + "日历</span></div>" +
      '<div class="g-cal"><div class="g-cal-head"><span>' + yy + " 年 " + (mm + 1) +
      ' 月</span></div><div class="g-cal-grid">' + cells + "</div></div></div>" +
      '<div class="g-card">' +
      '<div class="g-card-head"><span class="t">' + ICONS.info + "站点信息</span></div>" +
      '<div class="g-site"><dl>' +
      "<dt>搭建方式</dt><dd>手写 HTML / CSS</dd>" +
      "<dt>托管</dt><dd>Cloudflare Pages</dd>" +
      "<dt>博客版本</dt><dd>v1.0</dd>" +
      "<dt>内容许可</dt><dd>CC BY-NC-SA 4.0</dd>" +
      "<dt>始于</dt><dd>" + (SITE.startYear || 2026) + "</dd>" +
      "</dl></div></div>";

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
      if (playBtn) playBtn.innerHTML = icon;
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
      if (audio.paused) audio.play().catch(function () {});
      else audio.pause();
    }
    if (playBtn) playBtn.addEventListener("click", togglePlay);
    if (bar) {
      var scrubbing = false;
      function seekTo(clientX) {
        if (!audio || !audio.duration) return;
        var r = bar.getBoundingClientRect();
        var ratio = (clientX - r.left) / r.width;
        ratio = Math.min(1, Math.max(0, ratio));
        audio.currentTime = ratio * audio.duration;
        tick();
      }
      bar.addEventListener("pointerdown", function (e) {
        scrubbing = true;
        try { bar.setPointerCapture(e.pointerId); } catch (_) {}
        seekTo(e.clientX);
      });
      bar.addEventListener("pointermove", function (e) {
        if (scrubbing) seekTo(e.clientX);
      });
      bar.addEventListener("pointerup", function (e) {
        scrubbing = false;
        try { bar.releasePointerCapture(e.pointerId); } catch (_) {}
      });
      bar.addEventListener("pointercancel", function () { scrubbing = false; });
      // click 兜底（与拖动共用 seekTo，幂等）：桌面点击直接定位
      bar.addEventListener("click", function (e) {
        if (!scrubbing) seekTo(e.clientX);
      });
    }
    var backBtn = $("#p-back");
    var fwdBtn = $("#p-fwd");
    if (backBtn)
      backBtn.addEventListener("click", function () {
        if (audio) audio.currentTime = Math.max(0, audio.currentTime - 10);
      });
    if (fwdBtn)
      fwdBtn.addEventListener("click", function () {
        if (audio && audio.duration)
          audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
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
    if (loopBtn && audio) {
      loopBtn.classList.toggle("on", audio.loop);
      loopBtn.addEventListener("click", function () {
        audio.loop = !audio.loop;
        loopBtn.classList.toggle("on", audio.loop);
      });
    }
    syncMuteIcon();

    // 歌词：解析一次，供「播放器内歌词」和「悬浮单行歌词条」共用
    var lbBtn = $("#p-lyricbox"); // 播放器内歌词
    var flyBtn = $("#p-flylric"); // 悬浮单行歌词
    var floatBtn = $("#p-float"); // 悬浮播放器
    var lyricLines = parseLrc(SITE.lyrics || "");
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
      // 参考图里歌词是常显的，所以默认展开；点「播放器歌词」按钮可以收起
      if (lyricLines.length) {
        lyricBox.classList.add("open");
        if (lbBtn) lbBtn.classList.add("on");
      }
    }

    // 网页正下方中间的「单行悬浮歌词条」（音乐软件风格，默认隐藏，点了才出现）
    var nowBar = document.getElementById("nowLyric");
    if (!nowBar) {
      nowBar = document.createElement("div");
      nowBar.className = "now-lyric";
      nowBar.id = "nowLyric";
      nowBar.setAttribute("aria-hidden", "true");
      var nlPlaceholder = (SITE.song && SITE.song.title)
        ? SITE.song.title + (SITE.song.artist ? " · " + SITE.song.artist : "")
        : "暂无歌词";
      nowBar.innerHTML =
        '<span class="nl-dot">♪</span>' +
        '<span class="nl-text" id="nlText">' + esc(nlPlaceholder) + "</span>";
      document.body.appendChild(nowBar);
    }
    var nlText = nowBar.querySelector("#nlText");

    // 右下角「悬浮迷你播放器」，由 #p-float 切换显隐
    if (!document.getElementById("floatPlayer")) {
      var fp = document.createElement("div");
      fp.className = "float-player";
      fp.id = "floatPlayer";
      fp.innerHTML =
        '<div class="fp-cover" id="fp-cover">' +
        (SITE.song && SITE.song.cover
          ? '<img src="' + esc(SITE.song.cover) + '" alt="">'
          : ICONS.disc) +
        "</div>" +
        '<div class="fp-meta"><b id="fp-title">' +
        esc((SITE.song && SITE.song.title) || "") +
        '</b><span id="fp-artist">' +
        esc((SITE.song && SITE.song.artist) || "") +
        "</span></div>" +
        '<button class="fp-play" id="fp-play" data-tip="播放 / 暂停">' +
        ICONS.play +
        "</button>";
      document.body.appendChild(fp);
      var fpPlay = fp.querySelector("#fp-play");
      var fpCover = fp.querySelector("#fp-cover");
      fpPlay.addEventListener("click", togglePlay);
      function paintFloat() {
        var playing = audio && !audio.paused;
        fpPlay.innerHTML = playing ? ICONS.pause : ICONS.play;
        fpCover.classList.toggle("spinning", !!playing);
      }
      audio.addEventListener("play", paintFloat);
      audio.addEventListener("pause", paintFloat);
      paintFloat();
    }

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
        var fp = document.getElementById("floatPlayer");
        if (!fp) return;
        var open = fp.classList.toggle("on");
        floatBtn.classList.toggle("on", open);
      });
    }

    function syncLyric() {
      if (!lyricLines.length || !audio) return;
      var t = audio.currentTime;
      var idx = -1;
      for (var i = 0; i < lyricLines.length; i++) {
        if (lyricLines[i].t <= t + 0.25) idx = i;
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
      if (!nlText) return;
      if (idx >= 0) {
        nlText.textContent = lyricLines[idx].text;
        nowBar.classList.add("has-line");
      } else {
        // 间奏 / 还没到第一句：显示歌名占位
        nlText.textContent = (SITE.song && SITE.song.title)
          ? SITE.song.title + (SITE.song.artist ? " · " + SITE.song.artist : "")
          : "纯音乐，请欣赏";
        nowBar.classList.remove("has-line");
      }
    }

    tick();
    paintBtn();
    syncLyric(); // 一进来就把第一句点亮，别一片灰
  }



/* ---------- SPA 路由：站内跳转只切中栏，音频持续 ---------- */
function timelineMainHtml() {
  var groups = {};
  (SITE.timeline || []).forEach(function (it) {
    var k = it.date.slice(0, 7).replace("-", ".");
    (groups[k] = groups[k] || []).push(it);
  });
  var months = Object.keys(groups).sort().reverse();
  var tlHtml = months.map(function (k) {
    return (
      '<div class="tl-year">' + k + "</div>" +
      groups[k].map(function (it) {
        var chips = (it.tags || []).map(function (t) {
          return '<span style="--tag-h:' + tagHue(t) + '">' + esc(t) + "</span>";
        }).join("");
        return (
          '<div class="tl-item"><div class="tl-body">' +
          '<div class="tl-top"><span>' + fmtDate(it.date) + "</span></div>" +
          '<h2 class="tl-title">' + esc(it.title) + "</h2>" +
          '<p class="tl-desc">' + esc(it.desc) + "</p>" +
          (chips ? '<div class="tl-chips">' + chips + "</div>" : "") +
          "</div></div>"
        );
      }).join("")
    );
  }).join("");
  return (
    '<div class="g-card timeline-head">' +
    "<div><h1>" + ICONS.activity + "时间线</h1><p>记录这个站的每一次改动</p></div>" +
    '<span class="count">' + (SITE.timeline || []).length + " 条</span></div>" +
    '<div class="timeline">' + tlHtml + "</div>"
  );
}

/* ============================================================
   日历页：农历 + 节日 + 节气 + 自己标记的记事 + 发文日期
   依赖 window.Lunar（lunar-javascript，由 calendar.html 引入）
   ============================================================ */
function calendarMainHtml() {
  return (
    '<div class="g-card calendar-head">' +
    "<div><h1>" + ICONS.activity + "日历</h1><p>农历、节日、节气，还有我自己标记的日子</p></div>" +
    '<span class="count" id="cal-today"></span></div>' +
    '<div class="cal-nav">' +
    '<button class="btn" id="cal-prev" aria-label="上一月">‹</button>' +
    '<span id="cal-title" style="font-weight:600;font-size:16px"></span>' +
    '<button class="btn" id="cal-next" aria-label="下一月">›</button>' +
    '<button class="btn" id="cal-todaybtn">今天</button>' +
    "</div>" +
    '<div class="cal-grid" id="cal-grid"></div>' +
    '<div class="cal-legend" id="cal-legend"></div>'
  );
}

function bindCalendar(root) {
  var grid = root.querySelector("#cal-grid");
  var title = root.querySelector("#cal-title");
  var legend = root.querySelector("#cal-legend");
  if (!grid) return;

  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth(); // 0-based

  // 记事（云端）+ 发文日期（本地 POSTS）
  var events = window.CAL_EVENTS || [];
  var postDates = {};
  (window.POSTS || []).forEach(function (p) {
    if (p.date) postDates[p.date.slice(0, 10)] = true;
  });

  function lunarInfo(y, m, d) {
    if (!window.Lunar) return null;
    try {
      var solar = window.Lunar.Solar.fromYmd(y, m, d);
      var lunar = solar.getLunar();
      var festivals = lunar.getFestivals() || [];
      var solarFest = solar.getFestivals() || [];
      var jq = lunar.getJieQi() || "";
      var others = lunar.getOtherFestivals() || [];
      var dayText = lunar.getDayInChinese(); // 初一、十五等
      var monthText = lunar.getMonthInChinese();
      var all = [];
      if (solarFest.length) all = all.concat(solarFest);       // 公历节日优先
      if (jq) all.push(jq);                                     // 节气
      if (festivals.length) all = all.concat(festivals);        // 农历节日
      if (others.length) all = all.concat(others);
      return {
        dayCn: dayText,
        monthCn: monthText,
        festivals: all.slice(0, 2) // 最多显示两个，避免挤
      };
    } catch (e) { return null; }
  }

  function render() {
    title.textContent = year + " 年 " + (month + 1) + " 月";
    var first = new Date(year, month, 1);
    var startDow = first.getDay(); // 0=周日
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var cells = "";
    // 表头
    ["日","一","二","三","四","五","六"].forEach(function (w) {
      cells += '<div class="cal-cell cal-dow">' + w + "</div>";
    });
    // 前置空白
    for (var i = 0; i < startDow; i++) cells += '<div class="cal-cell cal-empty"></div>';
    var todayStr = now.getFullYear() + "-" + pad2(now.getMonth() + 1) + "-" + pad2(now.getDate());
    for (var d = 1; d <= daysInMonth; d++) {
      var ds = year + "-" + pad2(month + 1) + "-" + pad2(d);
      var li = lunarInfo(year, month + 1, d);
      var dayEvents = events.filter(function (e) { return e.date === ds; });
      var isPost = postDates[ds];
      var isToday = ds === todayStr;
      var cls = "cal-cell" + (isToday ? " cal-today" : "");
      var marks = "";
      if (isPost) marks += '<i class="cal-dot cal-dot-post"></i>';
      if (dayEvents.length) marks += '<i class="cal-dot cal-dot-event"></i>';
      var sub = "";
      if (li) {
        var fest = li.festivals.length ? li.festivals[0] : (li.dayCn === "初一" ? li.monthCn : li.dayCn);
        var isFest = li.festivals.length || (li.dayCn === "初一" && li.monthCn !== "正月");
        sub = '<span class="cal-sub' + (isFest ? " cal-fest" : "") + '">' + esc(fest) + "</span>";
      }
      var evTitles = dayEvents.map(function (e) { return esc(e.title); }).join("、");
      cells += '<div class="' + cls + '" data-date="' + ds + '" title="' + esc(evTitles || "") + '">' +
        '<span class="cal-day">' + d + "</span>" + marks + sub + "</div>";
    }
    grid.innerHTML = cells;
    // 今日
    var todayEl = root.querySelector("#cal-today");
    if (todayEl) todayEl.textContent = todayStr;

    // 图例
    legend.innerHTML =
      '<span><i class="cal-dot cal-dot-post"></i>有发文</span>' +
      '<span><i class="cal-dot cal-dot-event"></i>有记事</span>' +
      '<span class="cal-sub cal-fest" style="font-size:12px">节日/节气</span>';

    // 点击日期显示详情
    grid.querySelectorAll(".cal-cell[data-date]").forEach(function (cell) {
      cell.onclick = function () {
        var ds2 = cell.getAttribute("data-date");
        var evs = events.filter(function (e) { return e.date === ds2; });
        var li2 = lunarInfo(parseInt(ds2.slice(0,4)), parseInt(ds2.slice(5,7)), parseInt(ds2.slice(8,10)));
        var txt = "「" + ds2 + "」";
        if (li2 && li2.festivals.length) txt += "\n" + li2.festivals.join("、");
        if (postDates[ds2]) txt += "\n📝 这一天发过文章";
        if (evs.length) txt += "\n\n记事：\n" + evs.map(function (e) { return "· " + e.title + (e.desc ? "：" + e.desc : ""); }).join("\n");
        else if (!postDates[ds2] && (!li2 || !li2.festivals.length)) txt += "\n（没有特别标记）";
        alert(txt);
      };
    });
  }

  root.querySelector("#cal-prev").onclick = function () { month--; if (month < 0) { month = 11; year--; } render(); };
  root.querySelector("#cal-next").onclick = function () { month++; if (month > 11) { month = 0; year++; } render(); };
  root.querySelector("#cal-todaybtn").onclick = function () { year = now.getFullYear(); month = now.getMonth(); render(); };

  render();
}

function pad2(n) { return n < 10 ? "0" + n : "" + n; }

function aboutHtml() {
  return (
    '<article class="g-article">' +
    '<h1>关于我</h1>' +
    '<div class="g-prose" style="padding-top:26px">' +
    '<h2>我是谁</h2>' +
    '<p>我叫伤心公主，<strong>reze</strong> 是我在网上的名字。没有什么非做不可的事，也没有哪个领域算专精——什么都想试试，什么都沾一点。</p>' +
    '<p>不太擅长自我介绍。每次被要求“简单说说你自己”，我都会卡住。但如果让我讲一个最近在想的问题，我可以讲很久。</p>' +
    '<p>所以这个站大概也是这样：没有履历，没有头衔，只有一些具体的、我真的想过的内容。</p>' +
    '<h2>这个站在做什么</h2>' +
    '<p>它有三个用途：</p>' +
    '<ul>' +
    '<li><strong>存学到的东西</strong>——任何领域都行，用一遍会忘，写一遍才留得下</li>' +
    '<li><strong>存生活碎片</strong>——今天发生的事，过三个月就记不清了，但当时的想法值得留下</li>' +
    '<li><strong>存做过的东西</strong>——不管多小，做出来就该有个地方放着</li>' +
    '</ul>' +
    '<p>整个站是手写的 HTML、CSS 和原生 JavaScript，没有框架，没有第三方统计脚本。你在页面上的每一次点击，都不会被发到别人那里去。</p>' +
    '<blockquote><p>一个不需要向任何人解释的地方，是我想给自己留的东西。</p></blockquote>' +
    '<h2 id="works">做过的东西</h2>' +
    '<ul>' +
    '<li><a href="post.html?id=a-cat-that-counts">会数数的猫</a>：把专注时间变成猫的食粮。中途走开它会生气，坚持够久它能吃到一条鱼。</li>' +
    '<li><a href="post.html?id=why-i-built-this-blog">reze520.top</a>：就是你正在看的这个站。零依赖、纯静态，随便哪个浏览器都能打开。</li>' +
    '<li><a href="writing.html">一些随手记</a>：排版、配色、动效上的小实验，散落在几篇文章里。</li>' +
    '</ul>' +
    '<h2>联系我</h2>' +
    '<p>写信比留言更可靠，我基本都会回。</p>' +
    '<ul>' +
    '<li>邮箱：<a href="mailto:1806754672@qq.com">1806754672@qq.com</a></li>' +
    '<li>GitHub：<a href="https://github.com/Reze520" target="_blank" rel="noopener">github.com/Reze520</a></li>' +
    '<li>哔哩哔哩：<a href="https://space.bilibili.com/234451938" target="_blank" rel="noopener">space.bilibili.com/234451938</a></li>' +
    '<li>抖音：<a href="https://v.douyin.com/jY-UScBpfDE/" target="_blank" rel="noopener">v.douyin.com/jY-UScBpfDE</a></li>' +
    '</ul>' +
    '<p>如果是聊任何有趣的事、或者想指出我哪篇文章写错了，都欢迎。指错的尤其欢迎。</p>' +
    '</div>' +
    '</article>'
  );
}

/* ---------- 文章目录（右栏，参照 Shirone 布局） ---------- */
var _tocHandler = null;

// 目录跳转要避开吸顶的顶栏
function tocOffset() {
  var head = document.querySelector(".site-head");
  return (head ? head.offsetHeight : 64) + 22;
}

function unbindToc() {
  if (_tocHandler) {
    window.removeEventListener("scroll", _tocHandler);
    _tocHandler = null;
  }
}

// 从正文的 h2 / h3 自动生成目录，并给标题补上锚点 id
function buildTocHtml() {
  var prose = document.querySelector("#app-main .g-prose");
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

function bindToc() {
  unbindToc();
  var nav = document.querySelector("#app-right .g-toc .toc");
  if (!nav) return;
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
  };
  window.addEventListener("scroll", _tocHandler, { passive: true });
  _tocHandler();
}

// 只在文章页把目录插到右栏「动态」卡片下面
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

function renderMain() {
  var app = document.querySelector(".app");
  var main = $("#app-main");
  if (!main) return;
  var page = (app && app.getAttribute("data-page")) || "home";
  var params = (app && app.__params) || new URLSearchParams();
  var prog = $("#progress");
  if (prog) prog.style.width = page === "post" ? "0%" : "";
  if (page === "moments") {
    main.innerHTML = momentsMainHtml();
    bindMoments(main);
  } else if (page === "album") {
    main.innerHTML = albumMainHtml();
    bindAlbumTabs(main);
  } else if (page === "links") {
    main.innerHTML = linksMainHtml();
  } else if (page === "timeline") {
    main.innerHTML = timelineMainHtml();
  } else if (page === "calendar") {
    main.innerHTML = calendarMainHtml();
    bindCalendar(main);
  } else if (page === "about") {
    main.innerHTML = aboutHtml();
  } else if (page === "post") {
    mountPost(main, params.get("id"));
  } else {
    main.innerHTML = postsMainHtml();
    bindPostTabs(main, params);
  }
  updateNavActive(page);
  renderRightForPage(page);
  window.scrollTo(0, 0);
}

function updateNavActive(page) {
  var navMap = { home: "index.html", moments: "moments.html", writing: "writing.html", album: "album.html", links: "links.html", calendar: "calendar.html" };
  var want = navMap[page];
  document.querySelectorAll(".nav a").forEach(function (a) {
    var href = a.getAttribute("href") || "";
    if (want && href.indexOf(want) >= 0) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
}

function parseHash() {
  var h = (location.hash || "").replace(/^#\/?/, "");
  var qi = h.indexOf("?");
  return { page: qi < 0 ? h : h.slice(0, qi), qs: qi < 0 ? "" : h.slice(qi) };
}

function applyRoute() {
  var r = parseHash();
  var app = document.querySelector(".app");
  if (!app) return;
  var page = r.page || app.getAttribute("data-page") || "home";
  if (page === "index") page = "home";
  app.setAttribute("data-page", page);
  app.__params = new URLSearchParams(r.qs);
  renderMain();
}

function goPage(hash) {
  if (location.hash === hash) {
    applyRoute();
    return;
  }
  location.hash = hash;
  // hashchange 是异步的，这里同步渲染一次，避免切页有延迟感（hashchange 触发时会再跑一次，幂等无害）
  applyRoute();
}

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
  e.preventDefault();
  var file = u.pathname.split("/").pop().replace(/\.html$/, "") || "home";
  if (file === "index") file = "home";
  goPage("#/" + file + (u.search || ""));
}

  /* ---------- 列表页 ---------- */
  function mountWriting() {
    var bar = $("#filterbar");
    var box = $("#all-cards");
    if (!box) return;

    var counts = catCounts();
    var cats = Object.keys(counts).sort();
    var params = new URLSearchParams(location.search);
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
        history.replaceState(null, "", "writing.html");
      });
    }

    apply(active, activeTag);
  }

  /* ---------- 详情页 ---------- */
  function mountPost(host, id) {
    if (!host) host = $("#post");
    if (!host) return;
    if (id === undefined) id = new URLSearchParams(location.search).get("id");
    var p = postById(id);

    if (!p) {
      host.innerHTML =
        '<article class="g-article"><a class="back" href="writing.html">' +
        ICONS.back +
        " 返回文章列表</a>" +
        "<h1>没有找到这篇文章</h1>" +
        '<div class="g-meta"><span>它可能被移动或改名了</span></div>' +
        '<div class="g-prose"><p>你可以从<a href="writing.html">文章列表</a>里重新找找。</p></div>' +
        "</article>";
      return;
    }

    document.title = p.title + " · " + SITE.name;

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
      " 字 · 约 " +
      readMin(p) +
      " 分钟</span>" +
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
        '<a href="post.html?id=' +
          encodeURIComponent(prev.id) +
          '"><span class="k">← 上一篇</span><span class="t">' +
          esc(prev.title) +
          "</span></a>"
      );
    }
    if (next) {
      navItems.push(
        '<a class="next" href="post.html?id=' +
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
          '<a href="writing.html?tag=' +
          encodeURIComponent(t) +
          '" style="--tag-h:' +
          tagHue(t) +
          '"># ' +
          esc(t) +
          "</a>"
        );
      })
      .join("");

    host.innerHTML =
      '<article class="g-article">' +
      '<a class="back" href="writing.html">' +
      ICONS.back +
      " 返回文章列表</a>" +
      "<h1>" +
      esc(p.title) +
      "</h1>" +
      meta +
      cover +
      '<div class="g-prose">' +
      p.content +
      "</div>" +
      '<div class="g-article-foot">' +
      '<div class="g-article-tags">' +
      tags +
      "</div>" +
      nav +
      "</div>" +
      "</article>";

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

  /* ---------- 外观设置面板 ---------- */
  function initSettings() {
    var btn = document.getElementById("set-btn");
    if (!btn || document.getElementById("set-overlay")) return;

    var overlay = document.createElement("div");
    overlay.className = "set-overlay";
    overlay.id = "set-overlay";
    overlay.innerHTML =
      '<div class="set-panel">' +
      "<h3>外观设置</h3>" +
      '<p class="sub">改完立刻生效，会自动记住</p>' +
      '<div class="set-group"><label>主题色</label>' +
      '<input type="range" class="hue-slider" id="hue" min="0" max="360" step="1" value="215"></div>' +
      '<div class="set-group"><label>配色预设</label>' +
      '<div class="preset-row" id="presets">' +
      '<button class="preset" data-h="215" style="background:#a8c6f7" title="海蓝"></button>' +
      '<button class="preset" data-h="280" style="background:#b8a1f7" title="紫罗兰"></button>' +
      '<button class="preset" data-h="330" style="background:#f0a3c8" title="樱粉"></button>' +
      '<button class="preset" data-h="160" style="background:#7fd6b0" title="薄荷"></button>' +
      "</div></div>" +
      '<div class="set-group"><label>模式</label>' +
      '<div class="seg" id="mode-seg">' +
      '<button data-mode="light">浅色</button><button data-mode="dark">深色</button></div></div>' +
      '<div class="set-group"><label>皮肤</label>' +
      '<div class="seg" id="skin-seg">' +
      '<button data-skin="soft">淡紫</button><button data-skin="minimal">极简</button></div></div>' +
      '<div class="set-group"><label>背景图</label>' +
      '<div class="bg-row" id="bg-row"></div>' +
      "</div>" +
      "</div>";
    document.body.appendChild(overlay);

    var hue = overlay.querySelector("#hue");
    var root = document.documentElement;

    function applyHue(h) {
      var bright = "hsl(" + h + ", 72%, 76%)";
      var deep = "hsl(" + h + ", 62%, 52%)";
      root.style.setProperty("--accent", deep);
      Array.prototype.forEach.call(
        document.querySelectorAll(".app, .post-app"),
        function (el) {
          el.style.setProperty("--g-accent", bright);
        }
      );
      STORAGE.set("reze-hue", String(h));
      if (hue) hue.value = h;
      Array.prototype.forEach.call(overlay.querySelectorAll(".preset"), function (b) {
        b.setAttribute("aria-pressed", String(Number(b.getAttribute("data-h")) === Number(h)));
      });
    }

    function syncSegs() {
      var dark = root.getAttribute("data-theme") === "dark";
      var soft = root.getAttribute("data-skin") === "soft";
      var m = overlay.querySelector('#mode-seg [data-mode="dark"]');
      var l = overlay.querySelector('#mode-seg [data-mode="light"]');
      var s = overlay.querySelector('#skin-seg [data-skin="soft"]');
      var mi = overlay.querySelector('#skin-seg [data-skin="minimal"]');
      if (m) m.setAttribute("aria-pressed", String(dark));
      if (l) l.setAttribute("aria-pressed", String(!dark));
      if (s) s.setAttribute("aria-pressed", String(soft));
      if (mi) mi.setAttribute("aria-pressed", String(!soft));
    }

    var savedHue = STORAGE.get("reze-hue");
    applyHue(savedHue === null ? 215 : Number(savedHue));
    syncSegs();

    hue.addEventListener("input", function () {
      applyHue(Number(hue.value));
    });

    overlay.querySelector("#presets").addEventListener("click", function (e) {
      var b = e.target.closest(".preset");
      if (!b) return;
      applyHue(Number(b.getAttribute("data-h")));
    });

    overlay.querySelector("#mode-seg").addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      root.setAttribute("data-theme", b.getAttribute("data-mode"));
      STORAGE.set("reze-theme", b.getAttribute("data-mode"));
      syncSegs();
    });

    overlay.querySelector("#skin-seg").addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      root.setAttribute("data-skin", b.getAttribute("data-skin"));
      STORAGE.set("reze-skin", b.getAttribute("data-skin"));
      syncSegs();
    });

    /* ---- 背景图切换：缩略图点一下就换，选择记进 localStorage ---- */
    var bgRow = overlay.querySelector("#bg-row");
    var bgs = bgList();

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
            '" title="背景 ' + (i + 1) + '"><img src="' + esc(src) + '" alt="背景 ' + (i + 1) + '"></button>'
          );
        })
        .join("") +
        '<button class="bg-thumb bg-random' + (randomMode ? " on" : "") + '" data-i="-1" title="每次随机">' +
        "🎲</button>";
    }

    paintBgRow();

    if (bgRow) {
      bgRow.addEventListener("click", function (e) {
        var b = e.target.closest(".bg-thumb");
        if (!b) return;
        var i = Number(b.getAttribute("data-i"));
        if (i === -1) {
          // 随机模式：清除记忆，下次进站随机挑一张
          STORAGE.set("reze-bg-idx", "-1");
          var pick = Math.floor(Math.random() * bgs.length);
          applyPageBg(bgs[pick], true);
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
    });
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) overlay.classList.remove("open");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") overlay.classList.remove("open");
    });
  }

  /* ---------- 主题 / 皮肤 ---------- */
  function initTheme() {
    var root = document.documentElement;

    function syncSkinLabels() {
      var isSoft = root.getAttribute("data-skin") === "soft";
      Array.prototype.forEach.call(document.querySelectorAll(".js-skin-name"), function (n) {
        n.textContent = isSoft ? "淡紫版" : "极简黑白版";
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
        var next = root.getAttribute("data-skin") === "soft" ? "minimal" : "soft";
        root.setAttribute("data-skin", next);
        STORAGE.set("reze-skin", next);
        syncSkinLabels();
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

  /* ---------- 首屏的滚动文字（打字机） ---------- */
  function startTyping(el, lines) {
    var idx = 0;
    var pos = 0;
    var deleting = false;

    function step() {
      var cur = lines[idx];
      if (!deleting) {
        pos++;
        el.textContent = cur.slice(0, pos);
        if (pos >= cur.length) {
          deleting = true;
          return setTimeout(step, 2100); // 打完停一会儿
        }
        return setTimeout(step, 115);
      }
      pos--;
      el.textContent = cur.slice(0, pos);
      if (pos <= 0) {
        deleting = false;
        idx = (idx + 1) % lines.length;
        return setTimeout(step, 460); // 删完换下一句
      }
      return setTimeout(step, 45);
    }

    step();
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
        media.style.backgroundImage = 'url("' + String(cfg.bg).replace(/"/g, "%22") + '")';
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
    var lineList = (cfg.lines || []).filter(Boolean);
    if (typingEl && lineList.length) startTyping(typingEl, lineList);

    var title = $("#splash-title");
    if (title) title.textContent = cfg.title || "欢迎来到我的小窝";

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
        ? '<img src="' + esc(SITE.avatar) + '" alt="' + esc(SITE.name) + '">'
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
      var y = window.scrollY;
      head.classList.toggle("is-over-hero", y < splash.offsetHeight - 100);
      if (inner) {
        // 滚过首屏高度的 35% 时文字基本消失，不会撞上顶栏
        var fade = Math.max(0, Math.min(1, y / (splash.offsetHeight * 0.35)));
        inner.style.opacity = String(1 - fade);
        inner.style.transform = "translateY(" + -fade * 70 + "px)";
        inner.style.visibility = fade >= 1 ? "hidden" : "visible";
        inner.style.pointerEvents = fade > 0.5 ? "none" : "";
      }
    }
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

    var audio = document.createElement("audio");
    audio.loop = true;
    audio.preload = "metadata";
    audio.volume = 0.35;
    audio.src = SITE.bgm || "assets/audio/bgm.wav";
    audio.load();
    bgmAudio = audio;

    var unavailable = false;
    var toast = null;

    audio.addEventListener("error", function () {
      unavailable = true;
    });
    audio.addEventListener("play", function () {
      btn.classList.add("is-playing");
      btn.setAttribute("aria-label", "暂停背景音乐");
    });
    audio.addEventListener("pause", function () {
      btn.classList.remove("is-playing");
      btn.setAttribute("aria-label", "播放背景音乐");
    });

    function showToast() {
      if (toast && toast.parentNode) return;
      toast = document.createElement("div");
      toast.className = "music-toast";
      toast.innerHTML =
        "还没找到音乐文件。把音频放到 <code>" +
        esc(SITE.bgm || "assets/audio/bgm.wav") +
        "</code> 就能用了。";
      document.body.appendChild(toast);
      setTimeout(function () {
        if (toast && toast.parentNode) toast.remove();
        toast = null;
      }, 6000);
    }

    btn.addEventListener("click", function () {
      if (unavailable) {
        showToast();
        return;
      }
      if (audio.paused) {
        var p = audio.play();
        if (p && typeof p.then === "function") {
          p.catch(function () {
            unavailable = true;
            showToast();
          });
        }
      } else {
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
  }

  /* ---------- 全文搜索 ---------- */
  function initSearch() {
    if (document.getElementById("search-overlay")) return;
    var tools = $(".head-tools");
    if (!tools) return;

    var trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "icon-btn";
    trigger.setAttribute("aria-label", "搜索文章");
    trigger.setAttribute("data-tip", "搜索 Ctrl+K");
    trigger.innerHTML = ICONS.search;
    tools.insertBefore(trigger, tools.firstChild);

    // 建一次索引，把正文转成纯文本；之后每次搜索只是字符串查找
    var index = orderedPosts().map(function (p) {
      var body = plain(p.content);
      return {
        post: p,
        titleLow: p.title.toLowerCase(),
        tagsLow: (p.tags || []).join(" ").toLowerCase(),
        haystack: (
          p.title + " " + p.excerpt + " " + (p.tags || []).join(" ") + " " + p.cat + " " + body
        ).toLowerCase(),
        body: body,
      };
    });

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
          var snip = snippet(item.body, terms, 70);
          return (
            '<a class="search-item" data-i="' +
            i +
            '" href="post.html?id=' +
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
    window.addEventListener("hashchange", applyRoute);
    document.addEventListener("click", interceptLinks);
    if (location.hash) applyRoute();
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
    try {
      if (typeof window.loadCloudContent === "function") {
        var c = await window.loadCloudContent();
        if (c && c.site && Object.keys(c.site).length) {
          applyDataOver(c.site, Array.isArray(c.posts) ? c.posts : null);
          if (Array.isArray(c.events)) window.CAL_EVENTS = c.events;
        }
      }
    } catch (e) {}
    boot();
  }
})();
