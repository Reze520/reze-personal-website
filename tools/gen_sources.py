#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
从 content/posts/*.md 的参考区块生成 assets/js/sources.js。

口径：只认 <h2> 里带「参考 / 延伸」的区块，取到下一个 h1/h2 为止，
优先取 <ul class="pg-refs"> 里的条目。按域名归并：被引 >=2 次的源逐篇展开，
只引过一次的域名收进末尾一组，不铺开明细。

用法：
    python tools/gen_sources.py

生成物带 ?v= 版本号，_headers 给 /assets/js/* 开的是一年 immutable；
改了数据必须跟着升版本，否则浏览器一年都不会重取。
"""
import glob
import html
import io
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DIR = os.path.join(ROOT, "content", "posts")
OUT = os.path.join(ROOT, "assets", "js", "sources.js")

H2 = re.compile(r"<h2[^>]*>[^<]*(?:参考|延伸)[^<]*</h2>")
NEXT_H = re.compile(r"<h[12]\b")
UL = re.compile(r'<ul class="pg-refs">(.*?)</ul>', re.S)
LI = re.compile(r"<li[^>]*>(.*?)</li>", re.S)
A = re.compile(r'<a\s[^>]*href="([^"]+)"[^>]*>(.*?)</a>', re.S)
SRC_NOTE = re.compile(r'<span class="src">(.*?)</span>', re.S)
TAG = re.compile(r"<[^>]+>")
HOST = re.compile(r"https?://([^/]+)")


def plain(s):
    return html.unescape(TAG.sub("", s or "")).strip()


def front(s):
    m = re.match(r"^---\s*\n(.*?)\n---", s, re.S)
    d = {}
    if not m:
        return d
    for line in m.group(1).splitlines():
        k, _, v = line.partition(":")
        v = v.strip()
        try:
            d[k.strip()] = json.loads(v)
        except Exception:
            d[k.strip()] = v.strip('"').strip("'")
    return d


def refs_of(s):
    m = H2.search(s)
    if not m:
        return None
    tail = s[m.end():]
    nxt = NEXT_H.search(tail)
    if nxt:
        tail = tail[:nxt.start()]
    ul = UL.search(tail)
    body = ul.group(1) if ul else tail
    out = []
    for li in LI.finditer(body):
        a = A.search(li.group(1))
        if not a:
            continue
        note = SRC_NOTE.search(li.group(1))
        out.append({
            "u": html.unescape(a.group(1)),
            "x": plain(a.group(2)),
            "s": plain(note.group(1)).lstrip("· ").strip() if note else "",
        })
    return out


def main():
    files = sorted(glob.glob(os.path.join(SRC_DIR, "*.md")))
    groups = {}
    n_posts = 0
    n_links = 0
    for f in files:
        s = io.open(f, encoding="utf-8").read()
        refs = refs_of(s)
        if refs is None:
            continue
        n_posts += 1
        meta = front(s)
        pid = str(meta.get("id") or os.path.splitext(os.path.basename(f))[0])
        title = str(meta.get("title") or pid)
        date = str(meta.get("date") or "")
        for r in refs:
            n_links += 1
            m = HOST.match(r["u"])
            if not m:
                continue
            d = m.group(1)
            g = groups.setdefault(d, {"d": d, "n": 0, "p": {}})
            g["n"] += 1
            e = g["p"].setdefault(pid, {"i": pid, "t": title, "d": date, "n": 0, "x": r["x"]})
            e["n"] += 1

    multi, single = [], []
    for d, g in groups.items():
        posts = sorted(g["p"].values(), key=lambda e: (e["d"], e["i"]), reverse=True)
        for e in posts:
            e["x"] = e["x"][:90]
        item = {"d": d, "n": g["n"], "c": len(posts), "p": posts}
        (multi if g["n"] >= 2 else single).append(item)
    multi.sort(key=lambda x: (-x["n"], x["d"]))
    single.sort(key=lambda x: x["d"])

    assert sum(x["n"] for x in multi) + len(single) == n_links, "链接数对不上"
    assert len(multi) + len(single) == len(groups), "域名数对不上"

    data = {
        "posts": n_posts,
        "links": n_links,
        "domains": len(groups),
        "groups": multi,
        "rest": [x["d"] for x in single],
    }
    head = (
        "/* 参考源索引 · 由 tools/gen_sources.py 生成，勿手改。\n"
        "   来源：content/posts/*.md 的参考区块。改数据后必须升 ?v= 版本号，\n"
        "   /assets/js/* 在 _headers 里是一年 immutable，不换地址浏览器不会重取。 */\n"
    )
    io.open(OUT, "w", encoding="utf-8", newline="\n").write(
        head + "window.SOURCES = " + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n"
    )
    print("参考源：%d 篇 / %d 条链接 / %d 个域名；展开 %d 组，单次 %d 个" %
          (n_posts, n_links, len(groups), len(multi), len(single)))
    print("写出 %s (%d bytes)" % (os.path.relpath(OUT, ROOT), os.path.getsize(OUT)))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
