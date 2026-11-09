#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
从 content/posts/*.md 生成首页页尾的静态篇目清单，写进 index.html 的
<!-- ALL-LIST:START --> / <!-- ALL-LIST:END --> 之间。

为什么用静态 HTML：首页与归档页的文章列表都由 main.js 渲染，直接抓
HTML 时一条 /p/ 链接都没有，爬虫只能靠 sitemap 才知道文章地址。这段
清单不依赖脚本，行内顺带列出本篇贴过的视频、表格与参考条数。

整块默认收起，页尾只留一行数字；年份再折一层。链接仍在 HTML 里，
<details> 是原生折叠，爬虫读得到，读者不必先看一整屏目录。

用法：
    python tools/gen_all_list.py

发新文跑完 tools/export_content.py 后重跑一次，再 tools/bump_version.py。
"""
import glob
import html as htmllib
import io
import json
import os
import re
from urllib.parse import quote

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DIR = os.path.join(ROOT, "content", "posts")
OUT = os.path.join(ROOT, "index.html")

START = "<!-- ALL-LIST:START -->"
END = "<!-- ALL-LIST:END -->"

FRONT = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.S)
H2 = re.compile(r"<h2[^>]*>[^<]*(?:参考|延伸)[^<]*</h2>")
NEXT_H = re.compile(r"<h[12]\b")
LI = re.compile(r"<li\b", re.I)
TAG = re.compile(r"<[^>]+>")


def esc(s):
    return htmllib.escape(str(s or ""), quote=True)


def front(s):
    m = FRONT.match(s)
    d = {}
    if not m:
        return d, s
    for line in m.group(1).splitlines():
        k, _, v = line.partition(":")
        v = v.strip()
        try:
            d[k.strip()] = json.loads(v)
        except Exception:
            d[k.strip()] = v.strip('"').strip("'")
    return d, s[m.end():]


def plain(s):
    return re.sub(r"\s+", " ", htmllib.unescape(TAG.sub(" ", s or ""))).strip()


def materials(body):
    """视频卡 / 表格 / 参考条数 / 配图，都是正文里已有的东西。"""
    video = len(re.findall(r"data-bvid\s*=", body))
    table = len(re.findall(r"<table\b", body, re.I))
    image = len(re.findall(r"<img\b", body, re.I))
    refs = 0
    m = H2.search(body)
    if m:
        tail = body[m.end():]
        nxt = NEXT_H.search(tail)
        if nxt:
            tail = tail[:nxt.start()]
        refs = len(LI.findall(tail))
    return video, table, refs, image


def bits_of(cat, words, video, table, refs, image):
    out = []
    if cat:
        out.append(esc(cat))
    out.append("%s 字" % format(words, ","))
    if video:
        out.append("视频 %d" % video)
    if table:
        out.append("表 %d" % table)
    if refs:
        out.append("参考 %d" % refs)
    if image:
        out.append("图 %d" % image)
    return " · ".join(out)


def main():
    files = sorted(glob.glob(os.path.join(SRC_DIR, "*.md")))
    rows = []
    total = {"video": 0, "table": 0, "refs": 0, "image": 0}
    for f in files:
        s = io.open(f, encoding="utf-8").read()
        d, body = front(s)
        pid = d.get("id") or os.path.basename(f)[:-3]
        date = str(d.get("date") or "")[:10]
        if not d.get("title") or not date:
            continue
        video, table, refs, image = materials(body)
        total["video"] += video
        total["table"] += table
        total["refs"] += refs
        total["image"] += image
        bits = bits_of(d.get("cat"), len(plain(body)), video, table, refs, image)
        mmdd = date[5:7] + "." + date[8:10]
        row = ('    <a class="arc-row" href="/p/%s">'
               '<span class="arc-d">%s</span>'
               '<span><span class="arc-t">%s</span>'
               '<span class="all-mat">%s</span></span></a>'
               % (quote(str(pid)), mmdd, esc(d["title"]), bits))
        rows.append((date[:4], date, row))

    by_year = {}
    for year, date, row in rows:
        by_year.setdefault(year, []).append((date, row))

    out = ['<details class="all-list" id="all-list" aria-label="全部篇目">',
           '  <summary class="all-list-h">全部篇目'
           '<span class="all-list-stat">%d 篇 · %d 个视频卡 · %d 张表 · %d 张配图</span></summary>'
           % (len(rows), total["video"], total["table"], total["image"])]
    for year in sorted(by_year, reverse=True):
        items = sorted(by_year[year], key=lambda x: x[0], reverse=True)
        out.append('  <details class="ix-group">')
        out.append('    <summary class="arc-h"><span class="ix-name">%s</span>'
                   '<span class="ix-tail">%d 篇</span></summary>' % (year, len(items)))
        for _, row in items:
            out.append(row)
        out.append("  </details>")
    out.append("</details>")
    block = "\n".join(out)

    with io.open(OUT, "rb") as f:
        raw = f.read()
    crlf = b"\r\n" in raw
    s = raw.decode("utf-8")
    if crlf:
        s = s.replace("\r\n", "\n")
    if START in s and END in s:
        pre, rest = s.split(START, 1)
        _, post = rest.split(END, 1)
        s = pre + START + "\n" + block + "\n" + END + post
        where = "替换标记区"
    else:
        anchor = '<footer class="site-foot">'
        if s.count(anchor) != 1:
            raise SystemExit("找不到唯一的页尾锚点")
        s = s.replace(anchor, START + "\n" + block + "\n" + END + "\n\n" + anchor, 1)
        where = "插入页尾前"
    if crlf:
        s = s.replace("\n", "\r\n")
    with io.open(OUT, "wb") as f:
        f.write(s.encode("utf-8"))

    print("%s：%d 篇，%d 个年份，视频 %d / 表 %d / 参考 %d / 配图 %d"
          % (where, len(rows), len(by_year), total["video"], total["table"],
             total["refs"], total["image"]))


if __name__ == "__main__":
    main()
