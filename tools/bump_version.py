#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
把全站 HTML 里所有静态资源的 ?v= 版本号换成同一个值。

以前是手改的，因此出现过 style.css?v=20261030d 配 main.js?v=20261030b 的混搭：
刷新后 CSS 更新了、JS 还是旧的，排查时容易被带偏。现在只认一个号。

用法：
    python tools/bump_version.py 20261101a
    python tools/bump_version.py            # 不给就用当天日期 + a
"""
import io, os, re, sys, glob
from datetime import date

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def main():
    new = sys.argv[1] if len(sys.argv) > 1 else date.today().strftime("%Y%m%d") + "a"
    if not re.fullmatch(r"[0-9a-z]{6,24}", new):
        print("版本号只能用数字和小写字母，6–24 位")
        return 1

    changed, total = [], 0
    for f in sorted(glob.glob(os.path.join(ROOT, "*.html"))):
        s = io.open(f, encoding="utf-8").read()
        t, n = re.subn(r"(assets/(?:css|js)/[A-Za-z0-9_.]+)\?v=[0-9a-z]+", r"\1?v=" + new, s)
        if n and t != s:
            io.open(f, "w", encoding="utf-8", newline="").write(t)
            changed.append((os.path.basename(f), n))
            total += n

    for name, n in changed:
        print("  %-18s %d 处" % (name, n))
    print("版本号 -> %s，共 %d 处，%d 个文件" % (new, total, len(changed)))
    return 0


if __name__ == "__main__":
    sys.exit(main())
