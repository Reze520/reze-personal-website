# -*- coding: utf-8 -*-
"""IndexNow：把新增或改动的页面地址主动交给 Bing / Yandex 等引擎。

仓库根目录的 <key>.txt 既是文件名也是内容，属于公开验证串，不是凭据。
首次部署完成后跑 `--all` 提交 sitemap 里的全部地址；之后发新文跑 `--new`，
只提交最近一次提交里变动的篇目和几个索引页。

用法：
  python tools/indexnow_ping.py --all
  python tools/indexnow_ping.py --new
  python tools/indexnow_ping.py --url https://reze520.pages.dev/p/post-386
  python tools/indexnow_ping.py --all --dry-run
"""

import argparse
import glob
import io
import json
import os
import re
import subprocess
import sys
import urllib.error
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HOST = "reze520.pages.dev"
ORIGIN = "https://" + HOST
ENDPOINT = "https://api.indexnow.org/indexnow"
BING_ENDPOINT = "https://www.bing.com/indexnow"
INDEX_PAGES = ["/", "/writing", "/archive", "/sources"]
MAX_URLS = 10000


def find_key():
    names = [os.path.basename(p) for p in glob.glob(os.path.join(ROOT, "*.txt"))]
    keys = [n[:-4] for n in names if re.fullmatch(r"[0-9a-f]{32}\.txt", n)]
    if len(keys) != 1:
        raise SystemExit("根目录应当只有一个 32 位十六进制的 key 文件，当前 %d 个" % len(keys))
    key = keys[0]
    body = io.open(os.path.join(ROOT, key + ".txt"), encoding="utf-8").read().strip()
    if body != key:
        raise SystemExit("key 文件内容与文件名不一致，Bing 会拒绝这次提交")
    return key


def sitemap_urls():
    s = io.open(os.path.join(ROOT, "sitemap.xml"), encoding="utf-8").read()
    return re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", s)


def changed_posts(since):
    out = subprocess.check_output(
        ["git", "diff", "--name-only", since, "HEAD", "--", "content/posts"],
        cwd=ROOT, text=True,
    )
    ids = []
    for line in out.splitlines():
        m = re.fullmatch(r"content/posts/([^/]+)\.md", line.strip())
        if m:
            ids.append(m.group(1))
    return ids


def collect(args):
    if args.all:
        return sitemap_urls(), "sitemap.xml 全量"
    if args.new:
        ids = changed_posts(args.since)
        urls = [ORIGIN + p for p in INDEX_PAGES]
        urls += [ORIGIN + "/p/" + i for i in ids]
        return urls, "最近一次提交里变动的 %d 篇，另加 %d 个索引页" % (len(ids), len(INDEX_PAGES))
    return list(args.url), "命令行指定的地址"


def ping(key, urls, dry_run, endpoint):
    urls = list(dict.fromkeys(u for u in urls if u.startswith(ORIGIN)))
    if not urls:
        raise SystemExit("没有可提交的地址")
    if len(urls) > MAX_URLS:
        raise SystemExit("一次最多 %d 条，当前 %d 条" % (MAX_URLS, len(urls)))
    payload = {
        "host": HOST,
        "key": key,
        "keyLocation": ORIGIN + "/" + key + ".txt",
        "urlList": urls,
    }
    print("端点   %s" % endpoint)
    print("key     %s" % key)
    print("地址数 %d（%s）" % (len(urls), urls[0] + " … " + urls[-1]))
    if dry_run:
        print("dry-run：未发送")
        return 0

    data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    # 本机系统代理端口每次会话都变且间歇 502，这个端点直接走公网
    os.environ["NO_PROXY"] = "*"
    os.environ["no_proxy"] = "*"
    opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
    req = urllib.request.Request(
        endpoint, data=data,
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )
    try:
        with opener.open(req, timeout=30) as resp:
            code = resp.status
            body = resp.read().decode("utf-8", "replace")[:300]
    except urllib.error.HTTPError as e:
        code = e.code
        body = e.read().decode("utf-8", "replace")[:300]
    except urllib.error.URLError as e:
        print("请求失败：%s" % e.reason)
        return 1
    print("HTTP %d  %s" % (code, body))
    if code in (200, 202):
        print("已提交，Bing / Yandex 会自行安排抓取。")
        return 0
    if code == 403:
        print("403：站点验证还没同步完。key 文件刚上线时常见，等几分钟重试即可；"
              "也可换 --endpoint %s，或在 Bing 站长平台的 IndexNow 页确认 key。" % BING_ENDPOINT)
    elif code == 429:
        print("429：超过当日配额，隔天再试，或改用 --url 只提交新篇。")
    return 1


def main():
    ap = argparse.ArgumentParser(description="向 IndexNow 提交本站 URL")
    g = ap.add_mutually_exclusive_group(required=True)
    g.add_argument("--all", action="store_true", help="提交 sitemap.xml 全部地址")
    g.add_argument("--new", action="store_true", help="提交最近一次提交里变动的篇目")
    g.add_argument("--url", action="append", default=[], help="指定单个地址，可重复")
    ap.add_argument("--since", default="HEAD~1", help="--new 的对比起点，默认 HEAD~1")
    ap.add_argument("--endpoint", default=ENDPOINT,
                    help="提交端点，默认 api.indexnow.org（广播）；只给 Bing 可填 %s" % BING_ENDPOINT)
    ap.add_argument("--dry-run", action="store_true", help="只打印，不发送")
    args = ap.parse_args()

    key = find_key()
    urls, desc = collect(args)
    print("来源   %s" % desc)
    return ping(key, urls, args.dry_run, args.endpoint)


if __name__ == "__main__":
    sys.exit(main())
