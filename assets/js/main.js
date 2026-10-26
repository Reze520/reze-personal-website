/* ============================================================
   reze520.top · 前端逻辑
   ------------------------------------------------------------
   靠 data.js 里的 SITE / POSTS 渲染页面，无需后端。
   ============================================================ */
(function () {
  "use strict";

  var SITE = window.SITE || {};
  var POSTS = (window.POSTS || []).slice();

  /* ---------- 图标 ---------- */
  var ICONS = {
    github:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>',
    bili:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="3.5"/><path d="M7.5 3.2 10 6M16.5 3.2 14 6M9.2 12v2M14.8 12v2"/></svg>',
    douyin:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15.2 3v11.2a4.2 4.2 0 1 1-4.2-4.2"/><path d="M15.2 3.2c.5 2.5 2 4.1 4.5 4.4"/></svg>',
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

  function $(sel, root) {
    return (root || document).querySelector(sel);
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

  /* ---------- 数据整理 ---------- */
  var byDate = POSTS.slice().sort(function (a, b) {
    return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
  });
  var featured = byDate.filter(function (p) {
    return p.pinned;
  });
  var ordered = featured.concat(
    byDate.filter(function (p) {
      return !p.pinned;
    })
  );

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

    var recent = byDate
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
    renderCards(box, ordered.slice(0, 5));
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
      var list = ordered.filter(function (p) {
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
  function mountPost() {
    var host = $("#post");
    if (!host) return;

    var id = new URLSearchParams(location.search).get("id");
    var p = postById(id);

    if (!p) {
      host.innerHTML =
        '<div class="post-head"><a class="back" href="writing.html">' +
        ICONS.back +
        " 返回文章列表</a>" +
        "<h1>没有找到这篇文章</h1>" +
        '<div class="post-meta"><span>它可能被移动或改名了</span></div></div>' +
        '<div class="prose"><p>你可以从<a href="writing.html">文章列表</a>里重新找找。</p></div>';
      return;
    }

    document.title = p.title + " · " + SITE.name;

    var meta =
      '<div class="post-meta">' +
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

    var idx = ordered.indexOf(p);
    var prev = ordered[idx + 1];
    var next = ordered[idx - 1];
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
      ? '<div class="post-nav' + (navItems.length === 1 ? " one" : "") + '">' +
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
      '<div class="post-head">' +
      '<a class="back" href="writing.html">' +
      ICONS.back +
      " 返回文章列表</a>" +
      "<h1>" +
      esc(p.title) +
      "</h1>" +
      meta +
      cover +
      "</div>" +
      '<div class="prose">' +
      p.content +
      "</div>" +
      '<div class="post-foot">' +
      '<div class="post-tags">' +
      tags +
      "</div>" +
      nav +
      "</div>";

    // 阅读进度
    var bar = $("#progress");
    if (bar) {
      function onScroll() {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        var pct = h > 0 ? (window.scrollY / h) * 100 : 0;
        bar.style.width = Math.min(100, Math.max(0, pct)) + "%";
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
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
    if (hi && cfg.hi) hi.textContent = cfg.hi;

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
  }

  // 首页顶栏浮在首屏上时变成透明白字，滚下去恢复
  function initSplashHeader() {
    var splash = $("#splash");
    var head = $(".site-head");
    if (!splash || !head) return;
    function update() {
      head.classList.toggle("is-over-hero", window.scrollY < splash.offsetHeight - 100);
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
    btn.className = "music-btn";
    btn.setAttribute("aria-label", "播放背景音乐");
    btn.setAttribute("title", "背景音乐");
    btn.innerHTML = ICONS.disc;

    var audio = document.createElement("audio");
    audio.loop = true;
    audio.preload = "none";
    audio.volume = 0.35;
    audio.src = SITE.bgm || "assets/audio/bgm.wav";

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
    document.body.appendChild(btn);
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

  /* ---------- 启动 ---------- */
  function boot() {
    // 每个模块单独兜底：任何一处出错都不该拖垮整页
    [
      initTheme,
      initHead,
      initYear,
      initMusic,
      mountSidebar,
      mountHome,
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
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
