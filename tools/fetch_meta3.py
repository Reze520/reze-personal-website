# -*- coding: utf-8 -*-
"""最后 6 首：逐首慢查，带重试。"""
import io, json, os, re, time, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
META = os.path.join(ROOT, 'outputs_meta.json')
UA = ('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/120 Safari/537.36')

# 手工指定关键词，避免搜索结果被同名片挤掉
KW = {
    '普通Disco': ('普通Disco 洛天依', '普通Disco'),
    '海阔天空': ('海阔天空 Beyond', '海阔天空'),
    '爱情转移': ('爱情转移 陈奕迅', '爱情转移'),
    '至少还有你': ('至少还有你 林忆莲', '至少还有你'),
    '龙卷风': ('龙卷风 邓紫棋', '龙卷风'),
    '라일락': ('LILAC IU', '라일락'),
}


def get(url, timeout=30):
    req = urllib.request.Request(url, headers={
        'User-Agent': UA, 'Referer': 'https://music.163.com/'})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def api(path, tries=5):
    last = None
    for k in range(tries):
        try:
            return json.loads(get('https://api.music.163.com' + path).decode('utf-8', 'replace'))
        except Exception as e:
            last = e
            time.sleep(3 + k * 2)
    raise last


def search(kw, limit=15):
    try:
        d = api('/api/search/get/web?csrf_token=&s=%s&type=1&offset=0&limit=%d'
                % (urllib.parse.quote(kw.encode('utf-8')), limit))
    except Exception as e:
        print('  fail', e)
        return []
    return (d.get('result') or {}).get('songs') or []


def norm(s):
    return re.sub(r'[\s\-_·’\'"\.]', '', s or '').lower()


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
        kws, target = KW.get(r['title'], (r['title'], r['title']))
        print('==', r['title'], 'kw=', kws)
        songs = search(kws)
        if not songs:
            print('  !! 空结果')
            continue
        nt = norm(target)
        # 歌名一致优先，其次歌词行数最多（原唱通常歌词完整）
        cands = [s for s in songs if norm(s['name']) == nt] or songs
        s = max(cands, key=lambda x: x.get('duration') or 0)
        sid = s['id']
        r['nid'] = sid
        r['netease_name'] = s['name']
        r['netease_artist'] = ','.join(a['name'] for a in s['artists'])
        r['cover'] = cover_of(s)
        r['lyrics'] = lyric(sid)
        print('  ->', sid, s['name'], '/', r['netease_artist'],
              '| 歌词行', len([x for x in r['lyrics'].splitlines() if x.strip()]))
        time.sleep(2)

    io.open(META, 'w', encoding='utf-8', newline='\n').write(
        json.dumps(data, ensure_ascii=False, indent=1))
    print('未匹配', [x['title'] for x in data if not x.get('nid')])


if __name__ == '__main__':
    main()
