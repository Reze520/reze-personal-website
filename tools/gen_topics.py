#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
从 assets/js/data.meta.js 的标签、标题、摘要生成 assets/js/topics.js。

用和 main.js 里 relatedPosts() 同一套汉字二元组 TF-IDF：
文档 = 标题（加权两次）+ 摘要 + 标签 + 分类；短词补单字，免得一个字的标签
在二元组里查不到东西。每个标签先收带标签和字面命中的篇目，再补余弦最近的
几篇，最后只留下关联 >=2 篇的词。存量正文不参与，也不逐篇过词。

人工补词不写这个文件，改 assets/js/topics.override.js：
    window.TOPICS_OVERRIDE = {"某个词": ["post-263", "post-118"]};
首次运行时脚本会建一个空的 override 文件，之后不再覆盖。

用法：
    python tools/gen_topics.py

生成物带 ?v= 版本号，改数据或改 override 之后必须跟着升版本。
"""
import io
import json
import math
import os
import re
from collections import Counter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
META = os.path.join(ROOT, "assets", "js", "data.meta.js")
OUT = os.path.join(ROOT, "assets", "js", "topics.js")
OVERRIDE = os.path.join(ROOT, "assets", "js", "topics.override.js")

OVERRIDE_HEAD = (
    "/* 人工补词 · 手改这个文件，改完必须升 ?v= 版本号。\n"
    "   格式：window.TOPICS_OVERRIDE = {\"词\": [\"post-263\", \"post-118\"]};\n"
    "   同名会并进自动聚出的词条，新词另起一组。 */\n"
)


def grams(s):
    s = re.sub(r"[^\u4e00-\u9fffA-Za-z0-9]", "", str(s or ""))
    out = [s[i:i + 2] for i in range(len(s) - 1)]
    out.extend(list(s))
    return out


def vector(tokens, df, n):
    tf = Counter(tokens)
    w = {t: (1 + math.log(c)) * math.log(1 + n / (1 + df.get(t, 0))) for t, c in tf.items()}
    norm = math.sqrt(sum(v * v for v in w.values())) or 1.0
    return {t: v / norm for t, v in w.items()}


def main():
    s = io.open(META, encoding="utf-8").read()
    i = s.find("window.POSTS")
    if i < 0:
        raise SystemExit("data.meta.js 里没有 window.POSTS")
    posts, _ = json.JSONDecoder().raw_decode(s[s.find("[", i):])
    n = len(posts) or 1

    doc_tokens = [grams((p.get("title") or "") + " " + (p.get("title") or "") + " " +
                        (p.get("excerpt") or "") + " " + " ".join(p.get("tags") or []) + " " +
                        (p.get("cat") or "")) for p in posts]
    df = Counter()
    for g in doc_tokens:
        df.update(set(g))
    vecs = [vector(g, df, n) for g in doc_tokens]

    tags = sorted({str(t) for p in posts for t in (p.get("tags") or [])})
    groups = []
    for term in tags:
        w = vector(grams(term), df, n)
        scores = sorted(((sum(v * vecs[i].get(t, 0.0) for t, v in w.items()), i)
                         for i in range(len(posts))), reverse=True)
        top = scores[0][0] if scores else 0.0
        cut = max(0.10, top * 0.72)
        ids = {}
        for p in posts:
            pid = p.get("id")
            if not pid:
                continue
            if term in (p.get("tags") or []):
                ids[pid] = p
            elif term.lower() in ((p.get("title") or "") + " " + (p.get("excerpt") or "")).lower():
                ids.setdefault(pid, p)
        for score, i in scores[:4]:
            if score >= cut:
                p = posts[i]
                if p.get("id"):
                    ids.setdefault(p["id"], p)
        if len(ids) < 2:
            continue
        items = sorted(ids.values(), key=lambda p: (p.get("date") or "", p.get("id") or ""), reverse=True)
        groups.append({
            "t": term,
            "n": len(items),
            "p": [{"i": p.get("id", ""), "t": p.get("title", ""), "d": p.get("date", "")} for p in items],
        })

    groups.sort(key=lambda g: (-g["n"], g["t"]))
    data = {
        "posts": len(posts),
        "terms": len(groups),
        "pairs": sum(g["n"] for g in groups),
        "groups": groups,
    }
    head = (
        "/* 词条索引 · 由 tools/gen_topics.py 生成，勿手改。\n"
        "   改数据后必须升 ?v= 版本号，/assets/js/* 在 _headers 里是一年 immutable。 */\n"
    )
    io.open(OUT, "w", encoding="utf-8", newline="\n").write(
        head + "window.TOPIC_GROUPS = " + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n"
    )
    if not os.path.exists(OVERRIDE):
        io.open(OVERRIDE, "w", encoding="utf-8", newline="\n").write(
            OVERRIDE_HEAD + "window.TOPICS_OVERRIDE = {};\n"
        )
        print("新建空的 ", os.path.relpath(OVERRIDE, ROOT))

    print("词条：%d 篇 / %d 个词 / %d 条关联；最多「%s」%d 篇" %
          (len(posts), len(groups), data["pairs"], groups[0]["t"] if groups else "-",
           groups[0]["n"] if groups else 0))
    print("写出 %s (%d bytes)" % (os.path.relpath(OUT, ROOT), os.path.getsize(OUT)))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
