# -*- coding: utf-8 -*-
"""补查 fetch_meta.py 没有匹配到的条目，结果合并回 outputs_meta.json。
用法：python tools/fetch_meta2.py
"""
import io, json, os, re, time, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
META = os.path.join(ROOT, 'outputs_meta.json')
UA = ('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/120 Safari/537.36')


def get(url, timeout=30):
    req = urllib.request.Request(url, headers={
        'User-Agent': UA, 'Referer': 'https://music.163.com/',
        'Accept': '*/*', 'Accept-Language': 'zh-CN,zh;q=0.9'})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def api(path, tries=4):
    last = None
    for k in range(tries):
        try:
            return json.loads(get('https://api.music.163.com' + path).decode('utf-8', 'replace'))
        except Exception as e:
            last = e
            time.sleep(2 + k * 2)
    raise last


def search(kw, limit=10):
    try:
        d = api('/api/search/get/web?csrf_token=&s=%s&type=1&offset=0&limit=%d'
                % (urllib.parse.quote(kw.encode('utf-8')), limit))
    except Exception as e:
        print('  search fail', e)
        return []
    return (d.get('result') or {}).get('songs') or []


def norm(s):
    return re.sub(r'[\s\-_·’\'"\.]', '', s or '').lower()


def pick(songs, name, artist):
    n, ar = norm(name), norm(artist.split('、')[0])
    cands = []
    for s in songs:
        sn = norm(s.get('name'))
        arts = [a.get('name', '') for a in s.get('artists', [])]
        alias = []
        for a in s.get('artists', []):
            alias += a.get('alias') or []
        ahit = any(ar and (ar in norm(a) or norm(a) in ar) for a in arts + alias)
        cands.append((0 if sn == n else 1, 0 if ahit else 1, s))
    cands.sort(key=lambda x: (x[0], x[1]))
    return cands[0][2] if cands else None


def cover_of(song):
    aid = (song.get('album') or {}).get('id')
    if not aid:
        return ''
    try:
        d = api('/api/v1/album/%s' % aid)
        ss = d.get('songs') or []
        if ss:
            return (ss[0].get('al') or {}).get('picUrl') or ''
    except Exception:
        pass
    return ''


def lyric(sid):
    try:
        d = api('/api/song/lyric?id=%s&lv=1&kv=1&tv=-1' % sid)
    except Exception:
        return ''
    lrc = ((d.get('lrc') or {}).get('lyric') or '').strip()
    if not lrc:
        lrc = ((d.get('tlyric') or {}).get('lyric') or '').strip()
    return lrc


def main():
    data = json.load(io.open(META, encoding='utf-8'))
    for r in data:
        if r.get('nid'):
            continue
        print('==', r['title'], '/', r['artist'])
        kw2 = '%s %s' % (r['title'].rstrip('…'), r['artist'])
        songs = search(kw2)
        if not songs:
            time.sleep(3)
            songs = search(r['title'].rstrip('…'), 15)
        s = pick(songs, r['title'].rstrip('…'), r['artist'])
        if not s:
            print('  !! 仍未匹配')
            continue
        sid = s['id']
        r['nid'] = sid
        r['netease_name'] = s['name']
        r['netease_artist'] = ','.join(a['name'] for a in s['artists'])
        r['cover'] = cover_of(s)
        r['lyrics'] = lyric(sid)
        print('  ->', sid, s['name'], '/', r['netease_artist'],
              '| 歌词行', len([x for x in r['lyrics'].splitlines() if x.strip()]))
        time.sleep(1.5)

    io.open(META, 'w', encoding='utf-8', newline='\n').write(
        json.dumps(data, ensure_ascii=False, indent=1))
    miss = [x['title'] for x in data if not x.get('nid')]
    noly = [x['title'] for x in data if x.get('nid') and not x.get('lyrics')]
    nocov = [x['title'] for x in data if x.get('nid') and not x.get('cover')]
    print('\n未匹配', miss)
    print('无歌词', noly)
    print('无封面', nocov)


if __name__ == '__main__':
    main()
