# -*- coding: utf-8 -*-
"""把云端每篇文章落成独立的 .md 源文件，进 git。

云端 D1 是唯一可写源，仓库里的 data.override.js 只是给前台兜底的生成物。
一旦要批量改一个词、导出成册、换个系统，从 JS 字符串里反解正文会丢结构，
所以这里保留一份逐篇、纯文本、可逆的原件：YAML frontmatter + 原样 HTML 正文。
frontmatter 的值用 JSON 写法（YAML 是 JSON 的超集），引号、换行、数组都不用另写转义。

用法：
  python tools/export_content.py                  # 拉云端，写源文件，顺手同步兜底
  python tools/export_content.py --no-sync        # 只写源文件（CI 用）
  python tools/export_content.py --snapshot X.json
  python tools/export_content.py --dry-run        # 只报告会变什么
  python tools/export_content.py --force          # 允许云端篇数骤降

一次联网产出三样：content/posts/<id>.md、_local/content_export_<时间戳>.json，
以及交给 sync_content.py 用这份快照重写的 data.override.js / data.meta.js。
不提交、不推送、不改版本号。
"""

import argparse
import datetime
import json
import os
import re
import subprocess
import sys
import urllib.request
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
DEFAULT_URL = "https://reze520.pages.dev/site-data/content"
POSTS_DIR = REPO / "content" / "posts"
LOCAL_DIR = REPO / "_local"
SYNC = REPO / "tools" / "sync_content.py"

# 顺序固定，写出来的 frontmatter 才好 diff
FIELDS = ["id", "title", "date", "updated", "cat", "tags", "cover", "pinned", "excerpt"]
SAFE_ID = re.compile(r"^[A-Za-z0-9_-]+$")


def fetch(url, timeout):
    # 本机环境设了系统代理，直连站点更稳；ProxyHandler({}) 显式绕开它
    opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
    req = urllib.request.Request(url, headers={"User-Agent": "curl/8.9.1"})
    with opener.open(req, timeout=timeout) as r:
        if r.status != 200:
            raise RuntimeError("HTTP %d" % r.status)
        return json.loads(r.read().decode("utf-8"))


def yaml_value(v):
    # json.dumps 产出的是合法 YAML 标量：字符串带双引号，bool/null/数组/数字原样
    return json.dumps(v if v is not None else "", ensure_ascii=False)


def build_md(post):
    lines = ["---"]
    for k in FIELDS:
        lines.append("%s: %s" % (k, yaml_value(post.get(k, ""))))
    lines.append("---")
    lines.append("")
    lines.append(post.get("content") or "")
    return "\n".join(lines).rstrip("\n") + "\n"


def write_lf(path, text):
    data = text.encode("utf-8")
    if path.exists() and path.read_bytes() == data:
        return False
    with open(path, "wb") as f:
        f.write(data)
    return True


def validate(data, old_count, force):
    if not isinstance(data, dict):
        raise RuntimeError("快照不是对象")
    posts = data.get("posts")
    if not isinstance(posts, list) or not posts:
        raise RuntimeError("快照缺 posts")
    if not isinstance(data.get("site"), dict):
        raise RuntimeError("快照缺 site")
    seen = {}
    for p in posts:
        if not isinstance(p, dict):
            raise RuntimeError("posts 里有非对象项")
        pid = p.get("id")
        if not isinstance(pid, str) or not SAFE_ID.match(pid):
            raise RuntimeError("文章 id 不合法：%r" % pid)
        if pid in seen:
            raise RuntimeError("文章 id 重复：%s" % pid)
        if "content" not in p:
            raise RuntimeError("文章缺 content：%s" % pid)
        seen[pid] = True
    # 云端接口偶发只返回一部分时，别拿它把仓库里的原件覆盖掉
    if old_count and len(posts) < old_count * 0.9 and not force:
        raise RuntimeError(
            "云端篇数 %d 比仓库原有 %d 篇少了超过一成，拒绝覆盖。"
            "确认是主动删文的话加 --force" % (len(posts), old_count)
        )
    return posts


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--snapshot", help="用本地 JSON 快照，不联网")
    ap.add_argument("--url", default=DEFAULT_URL, help="云端内容接口地址")
    ap.add_argument("--timeout", type=int, default=90, help="请求超时秒数")
    ap.add_argument("--dry-run", action="store_true", help="只报告，不写文件")
    ap.add_argument("--no-sync", action="store_true", help="只导出源文件，不跑 sync_content.py")
    ap.add_argument("--force", action="store_true", help="允许云端篇数骤降")
    args = ap.parse_args()

    POSTS_DIR.mkdir(parents=True, exist_ok=True)
    LOCAL_DIR.mkdir(parents=True, exist_ok=True)
    old_count = len(list(POSTS_DIR.glob("*.md")))

    if args.snapshot:
        data = json.loads(Path(args.snapshot).read_text(encoding="utf-8"))
        snap = None
        print("读取本地快照：%s" % args.snapshot)
    else:
        print("拉取云端全文：%s" % args.url)
        data = fetch(args.url, args.timeout)
        stamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        snap = LOCAL_DIR / ("content_export_%s.json" % stamp)
        if not args.dry_run:
            write_lf(snap, json.dumps(data, ensure_ascii=False))
        print("快照：%s" % (snap or "(dry-run 不落盘)"))

    posts = validate(data, old_count, args.force)
    print("云端文章 %d 篇，仓库原有 %d 个源文件" % (len(posts), old_count))

    changed, added, empty = [], [], []
    for p in posts:
        path = POSTS_DIR / (p["id"] + ".md")
        text = build_md(p)
        if not (p.get("content") or "").strip():
            empty.append(p["id"])
        if args.dry_run:
            if not path.exists():
                added.append(p["id"])
            elif path.read_text(encoding="utf-8") != text:
                changed.append(p["id"])
            continue
        is_new = not path.exists()
        if write_lf(path, text):
            (added if is_new else changed).append(p["id"])

    cloud_ids = set(p["id"] for p in posts)
    extra = sorted(f.stem for f in POSTS_DIR.glob("*.md") if f.stem not in cloud_ids)
    print("新增 %d，改动 %d，云端已无而仓库仍有 %d" % (len(added), len(changed), len(extra)))
    if empty:
        print("正文为空：%s" % ", ".join(empty[:10]))
    if extra:
        print("保留不删：%s%s" % (", ".join(extra[:10]), " …" if len(extra) > 10 else ""))
    if args.dry_run:
        print("dry-run：未写任何文件")
        return 0

    if args.no_sync or args.snapshot:
        print("跳过 sync_content.py")
        return 0
    print("用同一份快照同步离线兜底与首屏元数据")
    return subprocess.call([sys.executable, str(SYNC), "--snapshot", str(snap)])


if __name__ == "__main__":
    sys.exit(main())
