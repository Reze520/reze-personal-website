# -*- coding: utf-8 -*-
"""把改写好的七篇文章推到云端 D1（Cloudflare Pages Functions）。
   只替换 title / excerpt / content，其余字段（日期、分类、标签、封面、置顶）保持原样。
"""
import json, urllib.request, io, os, sys

BASE = os.path.dirname(os.path.abspath(__file__))
API = "https://reze520.pages.dev/site-data"
PASS = "ra050712"
TODAY = "2026-10-27"

H = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/131.0 Safari/537.36",
    "Referer": "https://reze520.pages.dev/",
    "Origin": "https://reze520.pages.dev",
    "Accept": "application/json",
    "Content-Type": "application/json",
}


def call(path, data=None, method="GET", with_pass=False):
    body = json.dumps(data, ensure_ascii=False).encode("utf-8") if data is not None else None
    req = urllib.request.Request(API + path, data=body, method=method, headers=H)
    if with_pass:
        req.add_header("X-Admin-Pass", PASS)
    try:
        with urllib.request.urlopen(req, timeout=25) as f:
            return f.status, json.loads(f.read())
    except urllib.error.HTTPError as e:
        return e.code, {"err": e.read().decode("utf-8", "ignore")[:200]}
    except Exception as e:
        return 0, {"err": str(e)[:200]}


patch = json.load(io.open(os.path.join(BASE, "_cloud_patch.json"), encoding="utf-8"))
articles = patch["articles"]

st, d = call("/content")
if st != 200:
    print("读取失败", st, d)
    sys.exit(1)

posts = d.get("posts", [])
print("云端共 %d 篇" % len(posts))

done = []
for p in posts:
    slug = p.get("id")
    if slug not in articles:
        continue
    new = articles[slug]
    body = {
        "slug": slug,
        "title": new["title"],
        "date": p.get("date", ""),
        "updated": TODAY,
        "cat": p.get("cat", ""),
        "tags": p.get("tags", []),
        "cover": p.get("cover", ""),
        "pinned": bool(p.get("pinned")),
        "excerpt": new["excerpt"],
        "content": "\n" + new["content"] + "\n",
    }
    st2, r2 = call("/posts/%d" % p["_dbid"], body, "PUT", with_pass=True)
    flag = "OK " if st2 == 200 and r2.get("ok") else "FAIL"
    print("  [%s] %-4s %s -> %s" % (flag, p["_dbid"], p.get("title"), new["title"]))
    if st2 == 200 and r2.get("ok"):
        done.append(slug)
    else:
        print("       ", st2, r2)

print("\n成功 %d / %d" % (len(done), len(articles)))
missing = [k for k in articles if k not in done]
if missing:
    print("未更新：", missing)
