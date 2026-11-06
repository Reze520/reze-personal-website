#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""给正文里的图片生成宽高表。

正文存的是 <img src="assets/uploads/xxx.jpg">，没有 width/height。
图片一加载，浏览器才知道它多高，下面的文字就被推下去——这正是滚动时
页面跳动的来源。这里把 assets/uploads 下所有图的尺寸量出来，写两份：

  assets/js/img-size.js   window.IMG_SIZE = {...}  前端渲染完补属性
  functions/_img-size.js  export default {...}     直出时写进 HTML

跑法：python tools/gen_img_size.py
新增图片后重跑一次。
"""

import json
import os
import subprocess
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UPLOADS = os.path.join(REPO, "assets", "uploads")
EXTS = (".jpg", ".jpeg", ".png", ".webp", ".gif")


def probe(path):
    try:
        out = subprocess.run(
            ["ffprobe", "-v", "error", "-select_streams", "v:0",
             "-show_entries", "stream=width,height", "-of", "csv=p=0", path],
            capture_output=True, text=True, timeout=20,
        )
        line = (out.stdout or "").strip().splitlines()
        if not line:
            return None
        w, h = line[0].split(",")[:2]
        w, h = int(w), int(h)
        return (w, h) if w > 0 and h > 0 else None
    except Exception:
        return None


def main():
    sizes = {}
    missing = []
    for root, _dirs, files in os.walk(UPLOADS):
        for name in sorted(files):
            if not name.lower().endswith(EXTS):
                continue
            full = os.path.join(root, name)
            rel = os.path.relpath(full, REPO).replace("\\", "/")
            got = probe(full)
            if got:
                sizes[rel] = list(got)
            else:
                missing.append(rel)

    keys = sorted(sizes)
    body = ",\n".join('  "%s": [%d, %d]' % (k, sizes[k][0], sizes[k][1]) for k in keys)

    js = (
        "/* 正文图片的原始宽高。由 tools/gen_img_size.py 生成，勿手改。\n"
        "   用来给 <img> 补 width/height，图片加载前就占住位置，滚动不跳。 */\n"
        "window.IMG_SIZE = {\n" + body + "\n};\n"
    )
    with open(os.path.join(REPO, "assets", "js", "img-size.js"), "w", encoding="utf-8", newline="") as f:
        f.write(js)

    mod = (
        "/* 正文图片的原始宽高。由 tools/gen_img_size.py 生成，勿手改。\n"
        "   直出正文时按这张表给 <img> 写 width/height。 */\n"
        "export default {\n" + body + "\n};\n"
    )
    with open(os.path.join(REPO, "functions", "_img-size.js"), "w", encoding="utf-8", newline="") as f:
        f.write(mod)

    print("图片 %d 张，量到 %d 张" % (len(keys) + len(missing), len(keys)))
    if missing:
        print("没量到：", ", ".join(missing[:8]))
    return 0


if __name__ == "__main__":
    sys.exit(main())
