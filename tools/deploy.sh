#!/usr/bin/env bash
# ============================================================
#  reze520.top 一键发布
#  用法：./deploy.sh "这次改了什么"
#
#  说明：Cloudflare Pages 的生产分支是 Reze520-website，不是 main。
#        本仓库已配置 push 时同时更新 main 和 Reze520-website，
#        所以这里只要正常 push，两处都会同步。
#        本机 git 走 https 访问 GitHub 必须带 schannelCheckRevoke=false。
# ============================================================
set -euo pipefail
cd "$(dirname "$0")/.."

msg="${1:-更新站点}"

git add -A
if git diff --cached --quiet; then
  echo "· 没有需要提交的改动"
else
  git commit -m "$msg"
fi

git -c http.schannelCheckRevoke=false push

echo
echo "· 已推送（main + Reze520-website）"
echo "· 等 20~40 秒生效，验证："
echo "  curl -s https://reze520.pages.dev/ | grep -o 'main.js?v=[0-9a-z]*'"
