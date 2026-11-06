/* ============================================================
   生成首屏精简数据 assets/js/data.meta.js
   ------------------------------------------------------------
   用法：node tools/gen_meta.js <云端 content.json 快照路径>
   例：node tools/gen_meta.js ../../backups/xxx/cloud-content.json

   data.js（1.36MB）与 data.override.js（4.63MB）都带 330 篇正文，
   过去每个页面都要下载；现在首屏只加载本文件（元数据，约 200KB），
   正文由 /site-data/post?id= 按需取。两份老文件保留作离线兜底与后台导出，
   不再被前台页面直接引用。

   每次发新文章、云端内容变动后，重新跑一次本脚本即可。
   ============================================================ */
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..');
const snap = process.argv[2];
if (!snap) {
  console.error('用法: node tools/gen_meta.js <content.json>');
  process.exit(1);
}

// 取 data.js / data.override.js 里的 SITE 默认值（云端 site 可能少键）
const sandbox = { window: {} };
const evalIn = function (file) {
  const code = fs.readFileSync(path.join(REPO, 'assets/js', file), 'utf8');
  new Function('window', code)(sandbox.window);
};
evalIn('data.js');
evalIn('data.override.js');

const cloud = JSON.parse(fs.readFileSync(snap, 'utf8'));
const site = Object.assign({}, sandbox.window.SITE || {}, cloud.site || {});

function plain(html) {
  return String(html || '')
    .replace(/<[^>]*>/g, '')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, '');
}

const posts = (cloud.posts || []).map(function (p) {
  const words = plain(p.content).length;
  return {
    id: p.id, title: p.title || '', date: p.date || '', updated: p.updated || '',
    cat: p.cat || '', tags: p.tags || [], cover: p.cover || '', pinned: !!p.pinned,
    excerpt: p.excerpt || '', words: words, hasContent: words > 0,
    content: '', _dbid: p._dbid
  };
});

const out = [
  '/* 首屏精简数据 · 由 tools/gen_meta.js 生成，勿手改。',
  '   只含元数据，正文按需从 /site-data/post?id= 取。 */',
  'window.SITE = ' + JSON.stringify(site) + ';',
  'window.POSTS = ' + JSON.stringify(posts) + ';',
  'window.CAL_EVENTS = ' + JSON.stringify(cloud.events || []) + ';',
  ''
].join('\n');

const dest = path.join(REPO, 'assets/js/data.meta.js');
fs.writeFileSync(dest, out, 'utf8');
console.log('生成 %s：%d 篇，%d 字节（压缩前）', dest, posts.length, Buffer.byteLength(out));
