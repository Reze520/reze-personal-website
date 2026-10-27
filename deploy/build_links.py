# -*- coding: utf-8 -*-
"""reze520.top · 导航页数据构建

源文件 deploy/links.json（cat / name / url / desc），本脚本负责：
  1. 抓每个站点的主机名，把 favicon 存到 assets/icons/
  2. 把整个数组写进 assets/js/data.js 与 assets/js/data.override.js 的 SITE.links

加站点只改 deploy/links.json，然后重跑本脚本。
图标是本地缓存，不依赖任何在线图标服务。

用法：
    python deploy/build_links.py            # 抓图标 + 写数据
    python deploy/build_links.py --icons    # 只补缺失的图标，不写数据
"""
import io, json, os, re, sys, time, urllib.request
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import urlparse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ICONS = os.path.join(ROOT, "assets", "icons")
SRC = os.path.join(ROOT, "deploy", "links.json")
DATA_JS = os.path.join(ROOT, "assets", "js", "data.js")
DATA_OV = os.path.join(ROOT, "assets", "js", "data.override.js")

UA = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/131.0 Safari/537.36",
}

EXTS = (".svg", ".png", ".ico", ".jpg")


def host_of(url):
    h = urlparse(url).netloc.lower()
    return h[4:] if h.startswith("www.") else (h or "unknown")


def cached(host):
    for ext in EXTS:
        p = os.path.join(ICONS, host + ext)
        if os.path.exists(p) and os.path.getsize(p) > 100:
            return "assets/icons/" + host + ext
    return ""


def guess_ext(data, ctype):
    ctype = (ctype or "").lower()
    if "svg" in ctype:
        return ".svg"
    if "png" in ctype:
        return ".png"
    if "icon" in ctype or "ico" in ctype:
        return ".ico"
    if "jpeg" in ctype or "jpg" in ctype:
        return ".jpg"
    if data[:4] == b"\x89PNG":
        return ".png"
    if data[:5] == b"<?xml" or b"<svg" in data[:200]:
        return ".svg"
    return ".ico"


def fetch_icon(host):
    """先查本地缓存，再取 favicon.im，最后退回站点自己的 /favicon.ico"""
    hit = cached(host)
    if hit:
        return hit

    for url in ("https://favicon.im/" + host, "https://%s/favicon.ico" % host):
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=20) as r:
                data = r.read()
                ctype = r.headers.get("Content-Type")
        except Exception:
            continue
        if len(data) < 100:
            continue
        ext = guess_ext(data, ctype)
        path = os.path.join(ICONS, host + ext)
        open(path, "wb").write(data)
        return "assets/icons/" + host + ext
    return ""


def build_icons(links):
    os.makedirs(ICONS, exist_ok=True)
    hosts = []
    for x in links:
        h = host_of(x["url"])
        if h not in hosts:
            hosts.append(h)

    print("抓图标：%d 个站点" % len(hosts))
    with ThreadPoolExecutor(max_workers=8) as ex:
        got = dict(zip(hosts, ex.map(fetch_icon, hosts)))

    for x in links:
        x["fav"] = got.get(host_of(x["url"]), "")
    ok = sum(1 for x in links if x["fav"])
    print("图标 %d / %d" % (ok, len(links)))
    for x in links:
        if not x["fav"]:
            print("   无图标:", x["name"], x["url"])
    return links


def write_data(links):
    # ---- data.js：手写 JS 字面量风格 ----
    rows = []
    for x in links:
        rows.append(
            "    { cat: %s, name: %s, url: %s, desc: %s, fav: %s },"
            % tuple(json.dumps(x[k], ensure_ascii=False) for k in
                    ("cat", "name", "url", "desc", "fav"))
        )
    block = "  links: [\n" + "\n".join(rows) + "\n  ],"
    s = io.open(DATA_JS, encoding="utf-8").read()
    new, n = re.subn(r"  links: \[[\s\S]*?\n  \],", lambda m: block, s, count=1)
    if not n:
        raise SystemExit("data.js 里没找到 links 数组")
    io.open(DATA_JS, "w", encoding="utf-8", newline="\n").write(new)

    # ---- data.override.js：JSON 风格，缩进 4 ----
    s = io.open(DATA_OV, encoding="utf-8").read()
    m = re.search(r'"links":\s*\[', s)
    if not m:
        raise SystemExit("data.override.js 里没找到 links 数组")
    i = s.index("[", m.start())
    depth, j = 0, i
    while j < len(s):
        if s[j] == "[":
            depth += 1
        elif s[j] == "]":
            depth -= 1
            if depth == 0:
                break
        j += 1
    body = json.dumps(links, ensure_ascii=False, indent=4)
    body = "\n".join("    " + ln for ln in body.splitlines())
    io.open(DATA_OV, "w", encoding="utf-8", newline="\n").write(
        s[:m.start()] + '"links": ' + body + s[j + 1:])

    print("已写入 data.js / data.override.js")


if __name__ == "__main__":
    links = json.load(io.open(SRC, encoding="utf-8"))
    only_icons = "--icons" in sys.argv
    links = build_icons(links)
    if not only_icons:
        write_data(links)
    io.open(os.path.join(ROOT, "_links.json"), "w", encoding="utf-8").write(
        json.dumps(links, ensure_ascii=False, indent=2))
