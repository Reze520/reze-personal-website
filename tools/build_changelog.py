#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
把 docs/更新日志.md 编译成站内页面 changelog.html。

为什么不用前端解析：多引一个 300KB 的 markdown 库不值得，
这页内容半年才动一次，编译成静态 HTML 反而更快、也能被爬虫直接读到。

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


def to_html(md):
    out = []
    in_list = False
    in_quote = False

    def close():
        nonlocal in_list, in_quote
        if in_list:
            out.append("</ul>")
            in_list = False
        if in_quote:
            out.append("</blockquote>")
            in_quote = False

    for raw in md.splitlines():
        line = raw.rstrip()
        if not line.strip():
            close()
            continue
        if re.match(r"^#{1,6} ", line):
            close()
            level = len(line) - len(line.lstrip("#"))
            text = line[level:].strip()
            out.append("<h%d>%s</h%d>" % (level, inline(text), level))
        elif line.startswith("- "):
            if in_quote:
                out.append("</blockquote>")
                in_quote = False
            if not in_list:
                out.append("<ul>")
                in_list = True
            out.append("<li>%s</li>" % inline(line[2:].strip()))
        elif line.startswith("> "):
            if in_list:
                out.append("</ul>")
                in_list = False
            if not in_quote:
                out.append("<blockquote>")
                in_quote = True
            out.append("<p>%s</p>" % inline(line[2:].strip()))
        elif re.match(r"^-{3,}$", line.strip()):
            close()
            out.append("<hr>")
        else:
            close()
            out.append("<p>%s</p>" % inline(line.strip()))
    close()
    return "\n".join(out)


def main():
    md = io.open(SRC, encoding="utf-8").read()
    # 去掉开头的大标题与导语块，正文从第一个 ## 开始
    idx = md.find("\n## ")
    body_md = md[idx + 1:] if idx > 0 else md

    html = to_html(body_md)

    tpl = io.open(TPL, encoding="utf-8").read()

    # 1) 去掉「跳到首页」的跳转脚本，让这页独立存在
    tpl = re.sub(r'\s*<script>\s*\(function \(\) \{\s*var p = location\.pathname.*?</script>\s*', "\n", tpl, flags=re.S)

    # 2) 改标题与元信息
    title = "更新日志 · 伤心公主"
    desc = "这个站怎么一点点长成现在这样：每一版改了什么、为什么改、卡在哪儿。"
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

    # 3) 正文
    article = (
        '<article class="g-article g-changelog">'
        "<h1>更新日志</h1>"
        '<div class="g-meta"><span>这个站怎么一点点长成现在这样。按时间倒着排。</span></div>'
        '<div class="g-prose prose">%s</div>'
        "</article>"
    ) % html
    tpl = re.sub(r"<main class=\"col col-main\" id=\"app-main\">.*?</main>",
                 '<main class="col col-main" id="app-main">%s</main>' % article,
                 tpl, flags=re.S)

    # 4) 告诉 main.js 这是静态页，别用路由把正文覆盖掉
    tpl = tpl.replace('<div class="app" data-page="about">', '<div class="app" data-static="1">')

    io.open(OUT, "w", encoding="utf-8", newline="\n").write(tpl)
    print("已生成 changelog.html（正文 %d 段）" % html.count("<p>"))


if __name__ == "__main__":
    main()
