# -*- coding: utf-8 -*-
"""构建并发布 books/ 下的书评。
- 读 books/manifest.json + books/<id>.txt
- 转 HTML（## 标题 -> h2，空行分段 -> p，段内换行 -> br）
- 云端已有同 slug 则 PUT 整篇替换（按 _dbids.json），没有则 POST 新增
用法：
  python build_books.py            # 发布全部
  python build_books.py huo-zhe    # 只发布指定 id
  python build_books.py --dry      # 只打印不请求
环境变量 REZE_PASS 提供管理员口令。
"""
import json, os, re, sys, glob, urllib.request, urllib.error

BASE = "https://reze520.pages.dev/site-data"
PASS = os.environ.get("REZE_PASS", "")
HERE = os.path.dirname(os.path.abspath(__file__))
MAN = json.load(open(os.path.join(HERE, "books/manifest.json"), encoding="utf-8"))
DBID = {}
dbp = os.path.join(HERE, "_dbids.json")
if os.path.exists(dbp):
    DBID = json.load(open(dbp, encoding="utf-8"))


def inline(s):
    """把 [文字](链接) 和 **加粗** 转成 HTML，其余原样保留（正文里本来就允许直接写标签）。"""
    s = re.sub(r"\[([^\]]+)\]\((https?://[^)\s]+)\)",
               r'<a href="\2" target="_blank" rel="noopener">\1</a>', s)
    s = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", s)
    return s


def to_html(body):
    out = []
    for block in body.strip().split("\n\n"):
        lines = [ln.rstrip() for ln in block.split("\n")]
        if not lines or all(not ln for ln in lines):
            continue
        head = lines[0].strip()
        if head.startswith("## "):
            # 注意 "## " 只有 3 个字符，截 4 位会把标题第一个字也切掉
            out.append("<h2>%s</h2>" % " ".join(lines)[3:].strip())
        elif head.startswith("<"):
            # 整块就是 HTML（比如配图用的 figure），别再包一层 <p>
            out.append("\n".join(lines))
        elif head.startswith(">"):
            # 原文引用：> 正文 … / > —— 出处
            cite = ""
            ps = []
            for ln in lines:
                t = ln.lstrip(">").strip()
                if not t:
                    continue
                if t.startswith("——") or t.startswith("--"):
                    cite = t.lstrip("—-").strip()
                else:
                    ps.append(inline(t))
            html = '<blockquote class="pg-quote"><p>%s</p>' % "<br>".join(ps)
            if cite:
                html += "<cite>—— %s</cite>" % cite
            out.append(html + "</blockquote>")
        elif head.startswith("- "):
            items = []
            for ln in lines:
                t = ln.lstrip()
                if t.startswith("- "):
                    items.append("<li>%s</li>" % inline(t[2:].strip()))
                elif items:
                    items[-1] = items[-1][:-5] + " " + inline(t) + "</li>"
            out.append('<ul class="pg-refs">%s</ul>' % "".join(items))
        else:
            out.append("<p>%s</p>" % "<br>".join(inline(ln) for ln in lines if ln.strip()))
    return "\n".join(out)


def refs_html(meta):
    refs = meta.get("refs") or []
    if not refs:
        return ""
    items = "".join(
        '<li><a href="%s" target="_blank" rel="noopener">%s</a>%s</li>'
        % (r["u"], r["t"], ('<span class="src"> · %s</span>' % r["s"]) if r.get("s") else "")
        for r in refs
    )
    return '\n<h2>参考与延伸</h2>\n<ul class="pg-refs">%s</ul>' % items


def send(path, method, payload):
    data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(BASE + path, data=data, method=method)
    req.add_header("Content-Type", "application/json; charset=utf-8")
    req.add_header("X-Admin-Pass", PASS)
    req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0 Safari/537.36")
    try:
        with urllib.request.urlopen(req, timeout=40) as r:
            return r.status, json.loads(r.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        try:
            return e.code, json.loads(e.read().decode("utf-8"))
        except Exception:
            return e.code, {}


def publish(meta, dry):
    body = open(os.path.join(HERE, "books", meta["id"] + ".txt"), encoding="utf-8").read()
    html = to_html(body) + refs_html(meta)
    payload = {
        "slug": meta["id"], "title": meta["title"], "date": meta["date"],
        "updated": meta.get("updated") or "", "cat": meta.get("cat", "读书"),
        "tags": meta.get("tags") or ["书评"], "cover": meta.get("cover") or "",
        "pinned": bool(meta.get("pinned")), "excerpt": meta["excerpt"], "content": html,
    }
    if dry:
        print("DRY %s (%d字) %s" % (meta["id"], len(body), meta["title"]))
        return "dry"
    dbid = DBID.get(meta["id"])
    if dbid:
        st, r = send("/posts/%d" % dbid, "PUT", payload)
        ok = st == 200 and r.get("ok")
        print(("PUT " if ok else "PUT-FAIL ") + str(st), meta["title"], r if not ok else "")
        return "put" if ok else "fail"
    else:
        st, r = send("/posts", "POST", payload)
        ok = st == 200 and r.get("ok")
        print(("POST " if ok else "POST-FAIL ") + str(st), meta["title"], r if not ok else "(id %s)" % r.get("id"))
        return "post" if ok else "fail"


def main():
    only = [a for a in sys.argv[1:] if not a.startswith("--")]
    dry = "--dry" in sys.argv
    targets = [m for m in MAN if (not only or m["id"] in only)]
    if not PASS and not dry:
        print("缺少 REZE_PASS"); sys.exit(1)
    n = {"put": 0, "post": 0, "fail": 0, "dry": 0}
    for m in targets:
        n[publish(m, dry)] += 1
    print("\n==", n, "==")


if __name__ == "__main__":
    main()
