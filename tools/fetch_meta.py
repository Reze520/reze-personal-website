# -*- coding: utf-8 -*-
"""按「歌名 + 歌手」到网易云查封面与歌词，结果写到 outputs_meta.json。
用法：python tools/fetch_meta.py
"""
import io, json, os, re, sys, time, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAP = os.path.join(ROOT, 'outputs_tmp_map.tsv')

UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'


def get(url, timeout=25):
    req = urllib.request.Request(url, headers={'User-Agent': UA, 'Referer': 'https://music.163.com/'})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def api(path):
    return json.loads(get('https://api.music.163.com' + path).decode('utf-8', 'replace'))


def search(kw, limit=8):
    q = '/api/search/get/web?csrf_token=&s=%s&type=1&offset=0&limit=%d' % (
        urllib.parse.quote(kw.encode('utf-8')), limit)
    try:
        d = api(q)
    except Exception as e:
        print('  search fail', e)
        return []
    return (d.get('result') or {}).get('songs') or []


def pick(songs, name, artist):
    """优先挑歌名完全一致、歌手名有交集的条目。"""
    def norm(s):
        return re.sub(r'[\s\-_·’\'"]', '', s or '').lower()
    n = norm(name)
    best = None
    for s in songs:
        sn = norm(s.get('name'))
        arts = [a.get('name', '') for a in s.get('artists', [])]
        aliases = []
        for a in s.get('artists', []):
            aliases += a.get('alias') or []
        hit = False
        for a in arts + aliases:
            if not a:
                continue
            if norm(a) in norm(artist) or norm(artist) in norm(a):
                hit = True
                break
            # 常见简写：宇多田ヒカル / G.E.M.邓紫棋 等
            if norm(a).replace('.', '') in norm(artist).replace('.', '').replace(' ', ''):
                hit = True
                break
        if sn == n and hit:
            return s
        if sn == n and best is None:
            best = s
        elif hit and best is None:
            best = s
    return best


def lyric(sid):
    try:
        d = api('/api/song/lyric?id=%s&lv=1&kv=1&tv=-1' % sid)
    except Exception:
        return ''
    lrc = ((d.get('lrc') or {}).get('lyric') or '').strip()
    if not lrc and (d.get('tlyric') or {}).get('lyric'):
        lrc = d['tlyric']['lyric'].strip()
    return lrc


def cover_of(song):
    album = song.get('album') or {}
    aid = album.get('id')
    if aid:
        try:
            d = api('/api/v1/album/%s' % aid)
            songs = d.get('songs') or []
            if songs:
                return (songs[0].get('al') or {}).get('picUrl') or ''
        except Exception:
            pass
    return ''


def main():
    rows = []
    for line in io.open(MAP, encoding='utf-8').read().splitlines():
        if not line.strip():
            continue
        f, name, artist, orig = line.split('\t')
        rows.append({'file': f, 'title': name, 'artist': artist, 'orig': orig})

    out = []
    for r in rows:
        print('==', r['title'], '/', r['artist'])
        songs = search('%s %s' % (r['title'], r['artist']))
        if not songs:
            songs = search(r['title'])
        s = pick(songs, r['title'], r['artist'])
        if not s:
            print('  !! 未匹配')
            out.append(dict(r, nid=None, cover='', lyrics=''))
            continue
        sid = s['id']
        cov = cover_of(s)
        lyr = lyric(sid)
        print('  ->', sid, s['name'], '/', ','.join(a['name'] for a in s['artists']),
              '| 歌词行', len([x for x in lyr.splitlines() if x.strip()]))
        out.append(dict(r, nid=sid, netease_name=s['name'],
                        netease_artist=','.join(a['name'] for a in s['artists']),
                        cover=cov, lyrics=lyr))
        time.sleep(0.5)

    dst = os.path.join(ROOT, 'outputs_meta.json')
    io.open(dst, 'w', encoding='utf-8', newline='\n').write(
        json.dumps(out, ensure_ascii=False, indent=1))
    miss = [x for x in out if not x.get('nid')]
    print('\n缺失', len(miss), '篇', [x['title'] for x in miss])


if __name__ == '__main__':
    main()
