#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
把 docs/更新日志.md 编译成站内页面 changelog.html。

为什么不用前端解析：多引一个 300KB 的 markdown 库不值得，
这页内容半年才动一次，编译成静态 HTML 反而更快、也能被爬虫直接读到。

日志的写法（2026.11 起）：
    ## 2026.11                      一个月一节，标题就是年月
    ### 界面 | 改了什么            三个井号 + 类型 | 陈述句标题
    - 一条一条写清楚               列表就是这一版的细节

类型目前有四个：界面 / 功能 / 修复 / 基建，只记站点本身的技术改动。编译时会做成左侧带色条的
小徽标（样式在 style.css 的 .cl-kind[data-k=...]），四个字改成八个字也认得，
只是颜色会退回默认那条线。

生成时直接复用 about.html 的 <header>/<footer> 骨架，
所以导航栏改了这里不用跟着改。about.html 里的跳转脚本会被移除，
让这页是一个真正独立的静态页面（有自己的 URL 和标题）。

用法：
    python tools/build_changelog.py
"""
import io, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "docs", "更新日志.md")
TPL = os.path.join(ROOT, "about.html")
OUT = os.path.join(ROOT, "changelog.html")
ORIGIN = "https://reze520.pages.dev"


def inline(s):
    """行内：先转义，再处理 code / bold / link。"""
    s = s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    # `code`
    s = re.sub(r"`([^`]+)`", r"<code>\1</code>", s)
    # **bold**
    s = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", s)
    # [文字](链接)
    s = re.sub(r"\[([^\]]+)\]\((https?:[^)]+)\)", r'<a href="\2" target="_blank" rel="noopener">\1</a>', s)
    return s


def month_label(key):
    """"2026.11" → "2026 年 11 月"；认不出来的原样返回。"""
    m = re.match(r"^(\d{4})\.(\d{1,2})$", key)
    return "%s 年 %d 月" % (m.group(1), int(m.group(2))) if m else key


def parse(md):
    """把 markdown 拆成 [{key, label, items:[{kind, title, points}]}]。"""
    months = []
    cur = None
    item = None
    for raw in md.splitlines():
        line = raw.rstrip()
        if not line.strip() or re.match(r"^-{3,}$", line.strip()):
            continue
        if line.startswith("## "):
            key = line[3:].strip().strip("#").strip()
            cur = {"key": key, "label": month_label(key), "items": []}
            months.append(cur)
            item = None
            continue
        if cur is None:
            continue
        if line.startswith("### "):
            head = line[4:].strip()
            kind, sep, title = head.partition("|")
            item = {
                "kind": kind.strip() or "改动",
                "title": title.strip() if sep else head,
                "points": [],
            }
            cur["items"].append(item)
            continue
        if item is None:
            continue
        text = line[2:].strip() if line.startswith("- ") else line.lstrip("> ").strip()
        if text:
            item["points"].append(inline(text))
    return months


def render(months):
    """渲染成「月份分节 + 每条一个折叠块」。只有最新一条默认展开。"""
    total = sum(len(m["items"]) for m in months)
    keys = [m["key"] for m in months]
    out = []
    a = out.append

    a('<article class="g-article g-changelog">')
    a('<header class="cl-head">')
    a("<h1>更新日志</h1>")
    a('<p class="cl-sub">按时间倒序排，一次改动一条，只记站点本身的技术改动，文章不进来。标题行扫一遍就知道改了什么，点开看细节。</p>')
    a('<div class="cl-facts">')
    a("<span><b>%d</b> 条记录</span>" % total)
    a("<span><b>%d</b> 个时间节点</span>" % len(months))
    if keys:
        a("<span>跨度 %s — %s</span>" % (keys[-1], keys[0]))
    a("</div>")
    a('<div class="cl-tools">')
    a('<button type="button" class="cl-btn" data-cl-all="1">展开全部</button>')
    a('<button type="button" class="cl-btn" data-cl-all="0">全部收起</button>')
    a("</div>")
    a('<nav class="cl-nav" aria-label="按时间跳转">')
    for m in months:
        a('<a href="#%s">%s<i>%d 条</i></a>' % (anchor(m["key"]), m["key"], len(m["items"])))
    a("</nav>")
    a("</header>")

    first = True
    for m in months:
        a('<section class="cl-month" id="%s">' % anchor(m["key"]))
        a('<h2>%s<span class="cl-count">%d 条</span></h2>' % (m["label"], len(m["items"])))
        a('<ol class="cl-list">')
        for it in m["items"]:
            a('<li class="cl-item"><details%s>' % (" open" if first else ""))
            first = False
            a('<summary><span class="cl-kind" data-k="%s">%s</span>'
              '<span class="cl-t">%s</span><span class="cl-n">%d 项</span></summary>'
              % (it["kind"], it["kind"], it["title"], len(it["points"])))
            a('<div class="cl-body"><ul>')
            for p in it["points"]:
                a("<li>%s</li>" % p)
            a("</ul></div>")
            a("</details></li>")
        a("</ol>")
        a("</section>")

    a("</article>")
    return "\n".join(out), total


def anchor(key):
    return "cl-" + key.replace(".", "")


def main():
    md = io.open(SRC, encoding="utf-8").read()
    # 去掉开头的大标题与导语块，正文从第一个 ## 开始
    idx = md.find("\n## ")
    body_md = md[idx + 1:] if idx > 0 else md

    months = parse(body_md)
    article, total = render(months)

    tpl = io.open(TPL, encoding="utf-8").read()

    # 0) 模板头部那段讲子页面跳转的注释，在这个静态页里不成立，换成这页的来历
    tpl = re.sub(
        r"<!-- 以前这里会把子页面转到.*?-->",
        '<!-- 静态页：正文由 tools/build_changelog.py 从 docs/更新日志.md 编译进来；改内容改那个 md，别直接改这页。 -->',
        tpl,
        count=1,
        flags=re.S,
    )
    # 1) 去掉「跳到首页」的跳转脚本，让这页独立存在
    tpl = re.sub(r'\s*<script>\s*\(function \(\) \{\s*var p = location\.pathname.*?</script>\s*', "\n", tpl, flags=re.S)

    # 2) 改标题与元信息
    title = "更新日志 · RezeのBlog"
    desc = "这个站的技术改动记录：界面、功能、修复、基建，一条一次改动，按时间倒序。"
    tpl = re.sub(r"<title>[^<]*</title>", "<title>%s</title>" % title, tpl, count=1)
    tpl = re.sub(r'<meta name="description" content="[^"]*"',
                 '<meta name="description" content="%s"' % desc, tpl, count=1)
    tpl = re.sub(r'<meta property="og:title" content="[^"]*"',
                 '<meta property="og:title" content="%s"' % title, tpl, count=1)
    tpl = re.sub(r'<meta property="og:description" content="[^"]*"',
                 '<meta property="og:description" content="%s"' % desc, tpl, count=1)
    tpl = re.sub(r'<meta property="og:url" content="[^"]*"',
                 '<meta property="og:url" content="%s/changelog"' % ORIGIN, tpl, count=1)
    tpl = re.sub(r'<meta property="og:type" content="[^"]*"',
                 '<meta property="og:type" content="article"', tpl, count=1)
    tpl = re.sub(r'<link rel="canonical" href="[^"]*"',
                 '<link rel="canonical" href="%s/changelog"' % ORIGIN, tpl, count=1)

    # 3) 正文（用 lambda 传 article，免得正文里的反斜杠被 re 当成转义）
    tpl = re.sub(r"<main class=\"col col-main\" id=\"app-main\">.*?</main>",
                 lambda _: '<main class="col col-main" id="app-main">%s</main>' % article,
                 tpl, flags=re.S)

    # 4) 告诉 main.js 这是静态页，别用路由把正文覆盖掉
    tpl = tpl.replace('<div class="app" data-page="about">', '<div class="app" data-static="1">')

    # 5) 一键展开／收起。details 自己就能点，这段只管批量开关
    _js = [
        "/* 更新日志的一键展开／收起。details 自己就能点，这段只管批量开关。 */",
        'document.addEventListener("click", function (e) {',
        '  var btn = e.target.closest("[data-cl-all]");',
        "  if (!btn) return;",
        '  var open = btn.getAttribute("data-cl-all") === "1";',
        '  var list = document.querySelectorAll(".cl-item details");',
        "  for (var i = 0; i < list.length; i++) list[i].open = open;",
        "});",
    ]
    script = "<script>\n" + "\n".join(_js) + "\n</script>\n"
    tpl = tpl.replace("</body>", script + "</body>")
    io.open(OUT, "w", encoding="utf-8", newline="\n").write(tpl)
    print("已生成 changelog.html（%d 条记录，%d 个时间节点）" % (total, len(months)))


if __name__ == "__main__":
    main()
