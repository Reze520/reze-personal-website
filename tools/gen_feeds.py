#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
用线上真实内容重建 sitemap.xml 与 feed.xml。

背景：文章 id 从早期的手写 slug（huo-zhe）改成了数据库自增（post-74），
但 sitemap / RSS 一直是按旧 slug 手写的，导致 59 + 33 条链接全部指向不存在的文章。

用法：
    # 1. 拉一份线上内容
    curl -s https://reze520.pages.dev/site-data/content -o /tmp/content.json
    # 2. 生成
    python tools/gen_feeds.py /tmp/content.json

只写 sitemap.xml 和 feed.xml，不动其它文件。
"""
import sys, json, io, re, os
from urllib.parse import quote
from datetime import datetime

ORIGIN = "https://reze520.pages.dev"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# 静态页：路径 -> (changefreq, priority)
STATIC_PAGES = [
    ("/", "weekly", "1.0"),
    ("/writing", "daily", "0.9"),
    ("/moments", "weekly", "0.7"),
    ("/album", "weekly", "0.7"),
    ("/links", "monthly", "0.6"),
    ("/weather", "weekly", "0.5"),
    ("/timeline", "monthly", "0.6"),
    ("/about", "monthly", "0.6"),
    ("/changelog", "monthly", "0.5"),
]


def esc(s):
    return (str(s or "")
            .replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
            .replace('"', "&quot;"))


def strip_html(s):
    s = re.sub(r"<[^>]*>", " ", str(s or ""))
    return re.sub(r"\s+", " ", s).strip()


def parse_date(s):
    try:
        return datetime.strptime(str(s)[:10], "%Y-%m-%d")
    except Exception:
        return None


def main(path):
    data = json.load(io.open(path, encoding="utf-8"))
    posts = data.get("posts") or []
    posts = [p for p in posts if p.get("id") and p.get("title")]
    posts.sort(key=lambda p: str(p.get("date") or ""), reverse=True)

    # ---------- sitemap ----------
    out = ['<?xml version="1.0" encoding="UTF-8"?>',
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for path_, freq, pri in STATIC_PAGES:
        out.append("  <url><loc>%s%s</loc><changefreq>%s</changefreq><priority>%s</priority></url>"
                   % (ORIGIN, path_, freq, pri))
    for p in posts:
        d = parse_date(p.get("updated") or p.get("date"))
        loc = "%s/post?id=%s" % (ORIGIN, quote(str(p["id"])))
        out.append("  <url><loc>%s</loc>%s<changefreq>yearly</changefreq><priority>0.8</priority></url>"
                   % (esc(loc), "<lastmod>%s</lastmod>" % d.strftime("%Y-%m-%d") if d else ""))
    out.append("</urlset>")
    io.open(os.path.join(ROOT, "sitemap.xml"), "w", encoding="utf-8", newline="\n").write("\n".join(out) + "\n")

    # ---------- RSS ----------
    latest = None
    for p in posts:
        d = parse_date(p.get("updated") or p.get("date"))
        if d and (latest is None or d > latest):
            latest = d
    if latest is None:
        latest = datetime.now()

    site = data.get("site") or {}
    title = site.get("name") or "伤心公主"
    desc = strip_html(site.get("desc") or site.get("intro") or "伤心公主的个人博客。")

    items = []
    for p in posts[:30]:
        d = parse_date(p.get("date"))
        if not d:
            continue
        link = "%s/post?id=%s" % (ORIGIN, quote(str(p["id"])))
        body = strip_html(p.get("excerpt") or p.get("content"))[:300]
        pub = d.strftime("%a, %d %b %Y 00:00:00 +0800")
        cats = ""
        if p.get("cat"):
            cats += "<category>%s</category>" % esc(p["cat"])
        for t in (p.get("tags") or []):
            cats += "<category>%s</category>" % esc(t)
        items.append(
            "<item><title>%s</title><link>%s</link>"
            "<guid isPermaLink=\"true\">%s</guid><pubDate>%s</pubDate>%s"
            "<description>%s</description></item>"
            % (esc(p["title"]), esc(link), esc(link), pub, cats, esc(body)))

    rss = ('<?xml version="1.0" encoding="UTF-8"?>\n'
           '<rss version="2.0"><channel>'
           "<title>%s</title><link>%s/</link><description>%s</description>"
           "<language>zh-CN</language><lastBuildDate>%s</lastBuildDate>"
           '<atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="%s/feed.xml" rel="self" type="application/rss+xml"/>'
           "%s</channel></rss>\n"
           % (esc(title), ORIGIN, esc(desc),
              latest.strftime("%a, %d %b %Y 00:00:00 +0800"), ORIGIN,
              "".join(items)))

    io.open(os.path.join(ROOT, "feed.xml"), "w", encoding="utf-8", newline="\n").write(rss)

    print("posts: %d" % len(posts))
    print("sitemap: %d 条（%d 静态 + %d 文章）" % (len(STATIC_PAGES) + len(posts), len(STATIC_PAGES), len(posts)))
    print("feed: %d 条，最新 %s" % (min(len(posts), 30), latest.date()))


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "/tmp/content.json")
