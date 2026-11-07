# -*- coding: utf-8 -*-
"""把云端全文导回仓库，让离线兜底快照跟线上保持一致。

用法：
  python tools/sync_content.py                     # 从线上拉，写回两个生成物
  python tools/sync_content.py --dry-run           # 只报告会变什么，不写文件
  python tools/sync_content.py --snapshot X.json   # 用本地快照，不联网
  python tools/sync_content.py --url https://...   # 换地址后覆盖默认源

只动两个生成物：assets/js/data.override.js、assets/js/data.meta.js。
覆盖文件里的 SITE 配置块原样保留，只重写 POSTS 文章数组；首屏元数据由
tools/gen_meta.js 重生成。旧文件先备份到 _local/sync_backup_<时间戳>/，
该目录不进 git、不上线。不提交、不推送、不改版本号。
"""

import argparse
import datetime
import json
import os
import re
import shutil
import subprocess
import sys
import urllib.request
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
DEFAULT_URL = "https://reze520.pages.dev/site-data/content"
OVERRIDE = REPO / "assets/js/data.override.js"
META = REPO / "assets/js/data.meta.js"
GEN_META = REPO / "tools/gen_meta.js"


def fetch(url, timeout):
    # 本机环境设了系统代理，直连站点更稳；ProxyHandler({}) 显式绕开它
    opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
    req = urllib.request.Request(url, headers={"User-Agent": "curl/8.9.1"})
    with opener.open(req, timeout=timeout) as r:
        if r.status != 200:
            raise RuntimeError("HTTP %d" % r.status)
        return json.loads(r.read().decode("utf-8"))


def ids_of(text):
    return re.findall(r'^\s*"id":\s*"([^"]+)"', text, re.M)


def validate(data, old_ids):
    if not isinstance(data, dict):
        raise RuntimeError("快照不是对象")
    site = data.get("site")
    posts = data.get("posts")
    if not isinstance(site, dict) or not site:
        raise RuntimeError("快照缺 site")
    if not isinstance(posts, list) or not posts:
        raise RuntimeError("快照缺 posts 或为空")
    if not all(isinstance(p, dict) and p.get("id") and p.get("content") for p in posts):
        raise RuntimeError("有文章缺 id 或正文，拒绝覆盖")
    new_ids = [p["id"] for p in posts]
    if len(new_ids) != len(set(new_ids)):
        raise RuntimeError("文章 id 有重复，拒绝覆盖")
    # 云端异常时可能只返回一小截；宁可不覆盖，也不能把 330 篇兜底清空
    if old_ids and len(new_ids) < len(old_ids) - 2:
        raise RuntimeError(
            "云端只有 %d 篇，本地兜底 %d 篇，疑似返回不全，拒绝覆盖"
            % (len(new_ids), len(old_ids))
        )
    return new_ids


def build_override(data, old_text):
    # 站点配置块原样保留：云端那份可能指向仓库里没有的资源（例如 splash.bg
    # 用 bg.jpg，而兜底这份用仓库内的 bg.webp）。兜底文件的职责是离线可用，
    # 站设另有同步流程，这里只把文章正文换掉。
    cut = old_text.find("window.POSTS = ")
    if cut < 0 or "window.SITE = " not in old_text[:cut]:
        raise RuntimeError("兜底文件结构不认识，拒绝覆盖")
    head = old_text[:cut]
    return (
        head
        + "window.POSTS = "
        + json.dumps(data["posts"], ensure_ascii=False, indent=2)
        + ";\n"
    )


def write_lf(path, text):
    # 这两个文件一直是纯 LF，Windows 下必须显式关掉换行转换
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true", help="只报告，不写文件")
    ap.add_argument("--snapshot", help="用本地 JSON 快照，不联网")
    ap.add_argument("--url", default=DEFAULT_URL, help="云端内容接口地址")
    ap.add_argument("--timeout", type=int, default=90, help="请求超时秒数")
    args = ap.parse_args()

    old_text = OVERRIDE.read_text(encoding="utf-8")
    old_ids = ids_of(old_text)
    meta_before = META.read_bytes() if META.exists() else b""

    if args.snapshot:
        data = json.loads(Path(args.snapshot).read_text(encoding="utf-8"))
        src = args.snapshot
    else:
        data = fetch(args.url, args.timeout)
        src = args.url
    new_ids = validate(data, old_ids)
    body = build_override(data, old_text)

    added = [i for i in new_ids if i not in old_ids]
    removed = [i for i in old_ids if i not in new_ids]
    print("来源: %s" % src)
    print("文章: %d -> %d" % (len(old_ids), len(new_ids)))
    print("新增: %s" % (", ".join(added) if added else "无"))
    print("移除: %s" % (", ".join(removed) if removed else "无"))
    print("兜底文件: %.2f MB -> %.2f MB"
          % (len(old_text.encode("utf-8")) / 1048576,
             len(body.encode("utf-8")) / 1048576))

    if args.dry_run:
        print("dry-run：未写文件")
        return 0

    stamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    backup = REPO / "_local" / ("sync_backup_" + stamp)
    backup.mkdir(parents=True, exist_ok=True)
    shutil.copy2(OVERRIDE, backup / "data.override.js")
    if META.exists():
        shutil.copy2(META, backup / "data.meta.js")
    (backup / "snapshot.json").write_text(
        json.dumps(data, ensure_ascii=False), encoding="utf-8"
    )
    print("备份: _local/%s/" % backup.name)

    write_lf(OVERRIDE, body)
    # gen_meta.js 会读取刚写好的 override 里的 SITE 默认值，顺序不能反
    r = subprocess.run(
        ["node", str(GEN_META), str(backup / "snapshot.json")],
        cwd=str(REPO), capture_output=True, text=True
    )
    if r.returncode != 0:
        print("gen_meta.js 失败：%s" % (r.stderr or r.stdout).strip(), file=sys.stderr)
        return 1
    print(r.stdout.strip())

    meta_after = META.read_bytes()
    print("元数据文件: %s" % ("有变化" if meta_after != meta_before else "未变化"))
    print("完成。改动只在 assets/js/data.override.js 与 data.meta.js。")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as e:
        print("失败：%s" % e, file=sys.stderr)
        sys.exit(1)
