# -*- coding: utf-8 -*-
"""按 outputs_meta.json + 旧 playlist.js 生成 assets/js/playlist.js。
桌面 27 首（Eutopia 置顶）+ 原有 14 首合并；不自动播放；单曲循环。
"""
import io, json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
META = os.path.join(ROOT, 'outputs_meta.json')
OLD = os.path.join(ROOT, 'assets', 'js', 'playlist.js')
DST = os.path.join(ROOT, 'assets', 'js', 'playlist.js')

FIRST = 'Eutopia'


def js(s):
    return json.dumps(s, ensure_ascii=False)


def clean_lyric(lrc):
    """去掉纯元信息行（作词/作曲/编曲……）与空行，保留时间轴。"""
    if not lrc:
        return ''
    out = []
    for line in lrc.splitlines():
        t = line.strip()
        if not t:
            continue
        body = t.split(']', 1)[-1].strip() if t.startswith('[') else t
        if not body:
            continue
        if any(body.startswith(k) for k in (
                '作词', '作曲', '编曲', '制作人', '混音', '母带', '录音',
                '吉他', '贝斯', '鼓', '钢琴', '弦乐', '和声', '监制', '出品',
                '词：', '曲：', 'OP', 'SP', 'Produced', 'Written', 'Composed',
                'Arranged', 'Mixed', 'Mastered', 'Lyrics', 'Music')):
            continue
        out.append(t)
    return '\n'.join(out)


def parse_old(path):
    """从旧 playlist.js 抽出 window.PLAYLIST = [ ... ] 里的条目。"""
    txt = io.open(path, encoding='utf-8').read()
    m = re.search(r'window\.PLAYLIST\s*=\s*(\[.*?\]);\s*\n', txt, re.S)
    if not m:
        return []
    return json.loads(m.group(1))


def main():
    data = json.load(io.open(META, encoding='utf-8'))
    # 桌面 27 首：Eutopia 置顶，其余按文件编号
    data.sort(key=lambda r: (0 if r['title'] == FIRST else 1, int(r['file'][1:3])))

    items = []
    for r in data:
        cov = r.get('cover_local') or r.get('cover') or ''
        ly = clean_lyric(r.get('lyrics') or '')
        # 空歌词留空 -> 播放器显示「暂无歌词」（比误标纯音乐更诚实）
        items.append({
            'title': r['title'],
            'artist': r['artist'],
            'src': 'assets/audio/' + r['file'],
            'cover': cov,
            'lyrics': ly,
        })

    # 原有 14 首原样保留，接在桌面歌后面
    old = parse_old(OLD)
    seen = {(it['title'], it['artist']) for it in items}
    for o in old:
        if (o.get('title'), o.get('artist')) in seen:
            continue
        items.append({
            'title': o.get('title', ''),
            'artist': o.get('artist', ''),
            'src': o.get('src', ''),
            'cover': o.get('cover', ''),
            'lyrics': o.get('lyrics', ''),
        })

    head = '''/* ============================================================
   RezeのBlog · 播放列表
   ------------------------------------------------------------
   加歌：往数组里加一条就行（title / artist / src / cover / lyrics）。
   lyrics 是 LRC 文本，没有就留空字符串，歌词区会显示「暂无歌词」。
   默认播放模式是单曲循环，打开网页不自动播放，点一下才响。
   ============================================================ */
/* 音频走这个 CDN：Cloudflare Pages 不返回 Accept-Ranges，浏览器没法拖动进度条。
   jsDelivr 支持 Range 请求（206），所以音频单独走它，页面仍然在 Cloudflare。
   换仓库或换 CDN 时只改这一行。 */
window.PLAYLIST_CDN = "https://cdn.jsdelivr.net/gh/Reze520/reze-personal-website@main/assets/audio/";
/* 备用线路：主 CDN 连不上时按顺序换（大陆网络下 jsdelivr 主域名常被抽风）。
   最后还会自动退回本站同源地址，所以哪怕全部 CDN 都不通，歌也照样能放。 */
window.PLAYLIST_CDN_MIRRORS = [
  "https://testingcf.jsdelivr.net/gh/Reze520/reze-personal-website@main/assets/audio/",
  "https://gcore.jsdelivr.net/gh/Reze520/reze-personal-website@main/assets/audio/",
  "https://fastly.jsdelivr.net/gh/Reze520/reze-personal-website@main/assets/audio/"
];
/* 默认播放模式：list 顺序循环 / one 单曲循环 / shuffle 随机 */
window.PLAYLIST_DEFAULT_MODE = "one";

window.PLAYLIST = [
'''
    body = []
    for it in items:
        body.append('  {\n'
                    '    "title": %s,\n'
                    '    "artist": %s,\n'
                    '    "src": %s,\n'
                    '    "cover": %s,\n'
                    '    "lyrics": %s\n'
                    '  }' % (js(it['title']), js(it['artist']),
                             js(it['src']), js(it['cover']), js(it['lyrics'])))
    out = head + ',\n'.join(body) + '\n];\n'
    io.open(DST, 'w', encoding='utf-8', newline='\n').write(out)
    print('写出', DST, '共', len(items), '首（桌面', len(data), '＋原有', len(items) - len(data), '）')
    for i, it in enumerate(items, 1):
        flag = '⭐' if it['title'] == FIRST else '  '
        print(' %2d %s %s / %s | 封面 %s | 歌词 %d 行'
              % (i, flag, it['title'], it['artist'],
                 '有' if it['cover'] else '—', len(it['lyrics'].splitlines())))


if __name__ == '__main__':
    main()
