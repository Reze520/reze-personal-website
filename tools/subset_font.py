#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
把马善政毛笔楷书裁成「只含诗笺会用到的那几百个字」的子集。

原来整份字体 2.6 MB，而这套字体全站只用在一处：右栏那张「诗笺」卡片，
每屏最多显示一首五六十字的诗。为了几十个字下一个 2.6 MB 的字库不值，
裁完大约几十 KB。

用法：
    # 从线上取诗笺内容（推荐，和线上一致）
    python tools/subset_font.py
    # 或者用本地的内容快照
    python tools/subset_font.py path/to/content.json

前提：完整字体放在 _local/fonts/mashanzheng-full.woff2（不进 git，见 README）。
注意：诗词改动了要重跑一次，否则新出现的字会退回宋体（字形不一样，能看出来）。
"""
import io, json, os, sys, urllib.request

from fontTools import subset

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "_local", "fonts", "mashanzheng-full.woff2")
OUT = os.path.join(ROOT, "assets", "fonts", "mashanzheng.woff2")
CONTENT_URL = "https://reze520.pages.dev/site-data/content"

# 除了诗词本身，再兜一点标点、数字和常用字，免得改一两句就缺字
EXTRA = "，。、《》「」『』（）【】？！：；·—-…0123456789ABCabc诗笺朝代"
# 落款会出现「唐」「宋」「元」「明」「清」「五代」「近代」等，全部收录
EXTRA += "唐宋代元明清近现当五代十国秦汉魏晋南北朝"


def load_content(path=None):
    if path:
        return json.load(io.open(path, encoding="utf-8"))
    req = urllib.request.Request(CONTENT_URL, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))


def poem_chars(data):
    site = data.get("site") or data
    poems = site.get("poems") or []
    buf = []
    for p in poems:
        if isinstance(p, dict):
            buf.append(str(p.get("t") or ""))
            buf.append(str(p.get("by") or ""))
        else:
            buf.append(str(p))
    return "".join(buf)


def main():
    arg = sys.argv[1] if len(sys.argv) > 1 else None
    data = load_content(arg)
    text = poem_chars(data) + EXTRA
    chars = "".join(sorted(set(text)))

    if not os.path.exists(SRC):
        print("缺少完整字体：%s" % SRC)
        print("先把原始 mashanzheng.woff2 放回去，再跑一次。")
        return 1

    opts = subset.Options()
    opts.flavor = "woff2"
    opts.layout_features = ["*"]
    opts.name_IDs = ["*"]
    opts.notdef_outline = True
    opts.recalc_bounds = True
    opts.drop_tables = ["DSIG"]

    font = subset.load_font(SRC, opts)
    s = subset.Subsetter(opts)
    s.populate(text=chars)
    s.subset(font)

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    subset.save_font(font, OUT, opts)

    before = os.path.getsize(SRC) / 1024
    after = os.path.getsize(OUT) / 1024
    print("字符数 %d" % len(chars))
    print("%.0f KB -> %.0f KB（省 %.0f%%）" % (before, after, (1 - after / before) * 100))
    return 0


if __name__ == "__main__":
    sys.exit(main())
