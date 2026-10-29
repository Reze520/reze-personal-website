# -*- coding: utf-8 -*-
"""后台补抓缺失封面/歌词：普通Disco/海阔天空/爱情转移/至少还有你/龙卷风/라일락。
网易云搜索接口被限流时循环等待重试，抓到就下载封面、写歌词、更新 meta、重生成 playlist 并双推。
"""
import io, json, os, sys, time, subprocess, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
META = os.path.join(ROOT, 'outputs_meta.json')
COV = os.path.join(ROOT, 'assets', 'uploads', 'covers')

UA = {'User-Agent': 'Mozilla/5.0', 'Referer': 'https://music.163.com/'}


def api(url, timeout=25):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.loads(r.read().decode('utf-8'))


def search(name, artist):
    q = (name + ' ' + artist).strip()
    e = urllib.parse.quote(q.encode('utf-8'))
    d = api('https://api.music.163.com/api/search/get/web?csrf_token=&s=%s&type=1&offset=0&limit=6' % e)
    for s in (d.get('result') or {}).get('songs', []):
        return s
    return None


def lyric(nid):
    try:
        d = api('https://api.music.163.com/api/song/lyric?id=%d&lv=1&kv=1&tv=-1' % nid)
        return (d.get('lrc') or {}).get('lyric') or ''
    except Exception:
        return ''


def fetch():
    d = json.load(io.open(META, encoding='utf-8'))
    miss = [r for r in d if not r.get('nid')]
    if not miss:
        print('全部已有，无需补')
        return False
    changed = False
    for r in miss:
        try:
            s = search(r['title'], r.get('artist', ''))
            if not s:
                print('  未搜到:', r['title'])
                continue
            nid = s['id']
            cover = (s.get('album') or {}).get('picUrl') or ''
            ly = lyric(nid)
            r['nid'] = nid
            r['netease_name'] = s['name']
            r['netease_artist'] = ','.join(a['name'] for a in s.get('artists', []))
            if cover:
                big = cover.split('?')[0] + '?param=600y600'
                dst = os.path.join(COV, os.path.splitext(r['file'])[0] + '.jpg')
                req = urllib.request.Request(big, headers=UA)
                with urllib.request.urlopen(req, timeout=40) as rr:
                    data = rr.read()
                if len(data) > 2000:
                    open(dst, 'wb').write(data)
                    r['cover_local'] = 'assets/uploads/covers/%s.jpg' % os.path.splitext(r['file'])[0]
            if ly:
                r['lyrics'] = ly
            changed = True
            print('  已补:', r['title'], '| 封面', bool(r.get('cover_local')), '| 歌词', len(ly.splitlines()), '行')
        except Exception as ex:
            print('  失败:', r['title'], '|', ex)
    if changed:
        json.dump(d, io.open(META, 'w', encoding='utf-8', newline='\n'), ensure_ascii=False, indent=1)
    return changed


def regen_and_push():
    subprocess.run([sys.executable, os.path.join(ROOT, 'tools', 'gen_playlist.py')], check=True)
    subprocess.run(['git', 'add', 'assets/js/playlist.js', 'outputs_meta.json',
                   'assets/uploads/covers/'], cwd=ROOT, check=True)
    subprocess.run(['git', 'commit', '-q', '-m', '播放器：补全 6 首缺失封面/歌词'], cwd=ROOT, check=True)
    subprocess.run(['git', '-c', 'http.schannelCheckRevoke=false', 'push', 'origin', 'main'], cwd=ROOT, check=True)
    subprocess.run(['git', '-c', 'http.schannelCheckRevoke=false', 'push', 'origin', 'HEAD:Reze520-website'], cwd=ROOT, check=True)
    print('已重新生成并双推')


def main():
    for attempt in range(1, 31):
        print('=== 尝试 %d (%.0f) ===' % (attempt, time.time()))
        try:
            if fetch():
                regen_and_push()
                print('完成')
                return
        except Exception as ex:
            print('本轮异常:', ex)
        time.sleep(120)
    print('达到重试上限，仍未补全，退出')


if __name__ == '__main__':
    main()
