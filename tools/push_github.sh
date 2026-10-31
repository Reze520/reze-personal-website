#!/usr/bin/env bash
# 推送 reze-blog 到 GitHub（绕开 hosts 劫持 + 走本机代理）
#
# 背景：本机 hosts 把 github.com / api.github.com / raw.githubusercontent.com 等
# 二十多个 GitHub 域名全部指向 127.0.0.1，所以 git / curl 一解析域名就绕回本机，
# 表现为 `SSL connect error` / HTTP 000。浏览器能上，是因为它走了自己的代理或 DoH。
#
# 本脚本的做法：不碰 hosts，改用
#   1) 通过代理 + 阿里 DoH 查 github.com 真实 IP
#   2) URL 直接写 IP（代理 CONNECT 时不再需要 DNS）
#   3) 显式带 Host: github.com + Basic 认证头（token 从本机凭据管理器动态读取）
# 代价：URL 是 IP，证书主机名不匹配，必须关掉 TLS 校验。仅在本机回环代理下使用。
#
# 用法：
#   bash tools/push_github.sh            # 双推 main + Reze520-website
#   bash tools/push_github.sh --dry-run  # 只看会推什么，不真推
#
# 若哪天把 hosts 修好了（github.com 指向真实 IP），直接 `git push origin main` 即可，
# 不需要本脚本。

set -uo pipefail

REPO_DIR="/c/Users/reze/WorkBuddy/2026-10-26-21-05-21/reze-blog"
PROXY="${GITHUB_PROXY:-http://127.0.0.1:11593}"
REPO_PATH="Reze520/reze-personal-website"
DRY=0
[ "${1:-}" = "--dry-run" ] && DRY=1

cd "$REPO_DIR" || { echo "仓库目录不存在：$REPO_DIR"; exit 1; }

echo "== 1/4 查 github.com 真实 IP（阿里 DoH）=="
# 先经代理查；代理没开（或端口变了）就直连 DoH 再试一次。
# 直连 DoH 通、且能连上 GitHub 的 IP 的情况确实存在，这时整条链路不需要代理。
PROXY_OK=1
IP=$(curl -s --max-time 20 --proxy "$PROXY" -H "accept: application/dns-json" \
      "https://dns.alidns.com/resolve?name=github.com&type=A" \
      | grep -o '"data":"[0-9.]*"' | head -1 | cut -d'"' -f4)
if [ -z "${IP:-}" ]; then
  PROXY_OK=0
  echo "   代理 $PROXY 不可用，改直连 DoH"
  IP=$(curl -4 -s --max-time 20 --noproxy '*' -H "accept: application/dns-json" \
        "https://dns.alidns.com/resolve?name=github.com&type=A" \
        | grep -o '"data":"[0-9.]*"' | head -1 | cut -d'"' -f4)
fi
if [ -z "${IP:-}" ]; then
  echo "查 IP 失败：代理没开、直连 DoH 也不通。"
  exit 1
fi
echo "   github.com -> $IP（$([ "$PROXY_OK" = "1" ] && echo 经代理 || echo 直连)）"

echo "== 2/4 从凭据管理器取 token =="
TOKEN=$(printf "protocol=https\nhost=github.com\n\n" | git credential fill 2>/dev/null | sed -n 's/^password=//p')
if [ -z "${TOKEN:-}" ]; then
  echo "取不到 github.com 凭据，请先手动 git 登录一次。"
  exit 1
fi
echo "   已取到（${#TOKEN} 字符）"

AUTH=$(printf "Reze520:%s" "$TOKEN" | base64 -w0)
URL="https://$IP/$REPO_PATH"
export GIT_TERMINAL_PROMPT=0

GITOPTS=(
  -c http.schannelCheckRevoke=false
  -c http.sslVerify=false
  -c credential.helper=
  -c "http.extraHeader=Host: github.com"
  -c "http.extraHeader=Authorization: Basic $AUTH"
)
# 只有走代理时才加 http.proxy；直连就把这条留着，否则会去连一个没开的端口
[ "$PROXY_OK" = "1" ] && GITOPTS+=(-c "http.proxy=$PROXY")

push_one () {
  local ref="$1" label="$2"
  echo "== $label =="
  if [ "$DRY" = "1" ]; then
    git "${GITOPTS[@]}" push --dry-run "$URL" "$ref" 2>&1 | grep -viE '^warning: ' 
  else
    git "${GITOPTS[@]}" push "$URL" "$ref" 2>&1 | grep -viE '^warning: '
  fi
  local rc=${PIPESTATUS[0]}
  [ "$rc" -ne 0 ] && echo "   推送失败（退出码 $rc）"
  return 0
}

echo "== 3/4 push main =="
push_one "main" "   main -> main"

echo "== 4/4 push 生产分支 =="
push_one "HEAD:Reze520-website" "   HEAD -> Reze520-website"

echo
if [ "$DRY" = "0" ]; then
  echo "== 远端核对 =="
  git "${GITOPTS[@]}" ls-remote "$URL" 2>/dev/null \
    | grep -E "refs/heads/(main|Reze520-website)$"
fi
echo "完成。Pages 构建约 2 分钟，用 curl -4 轮询验证。"
