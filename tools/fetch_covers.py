# -*- coding: utf-8 -*-
"""补抓缺失封面：搜索拿到 album.id -> 专辑详情接口取 picUrl -> 下载到 covers/。"""
import io, json, os, sys, subprocess, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
META = os.path.join(ROOT, 'outputs_meta.json')
COV = os.path.join(ROOT, 'assets', 'uploads', 'covers')
UA = {'User-Agent': 'Mozilla/5.0', 'Referer': 'https://music.163.com/'}


def api(u, timeout=25):
    return json.loads(urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=timeout).read().decode())


def search(name, artist):
    q = urllib.parse.quote(('%s %s' % (name, artist)).strip().encode())
    d = api('https://api.music.163.com/api/search/get/web?csrf_token=&s=%s&type=1&offset=0&limit=6' % q)
    for s in (d.get('result') or {}).get('songs', []):
        return s
    return None


def main():
    d = json.load(io.open(META, encoding='utf-8'))
    miss = [r for r in d if not r.get('cover_local')]
    print('待补封面:', [r['title'] for r in miss])
    done = False
    for r in miss:
        try:
            s = search(r['title'], r.get('artist', ''))
            if not s:
                print('  未搜到:', r['title']); continue
            aid = (s.get('album') or {}).get('id')
            pic = ''
            if aid:
                try:
                    al = api('https://api.music.163.com/api/v1/album/%d' % aid)
                    pic = (al.get('album') or {}).get('picUrl') or ''
                except Exception as e:
                    print('  album 详情失败:', e)
            if not pic:
                pic = (s.get('album') or {}).get('picUrl') or ''
            if not pic:
                print('  无封面地址:', r['title']); continue
            big = pic.split('?')[0] + '?param=600y600'
            dst = os.path.join(COV, os.path.splitext(r['file'])[0] + '.jpg')
            data = urllib.request.urlopen(urllib.request.Request(big, headers=UA), timeout=40).read()
            if len(data) < 2000:
                print('  封面太小(%d):' % len(data), r['title']); continue
            open(dst, 'wb').write(data)
            r['cover_local'] = 'assets/uploads/covers/%s.jpg' % os.path.splitext(r['file'])[0]
            done = True
            print('  已下载封面:', r['title'], len(data), '字节')
        except Exception as e:
            print('  失败:', r['title'], '|', e)
    if done:
        json.dump(d, io.open(META, 'w', encoding='utf-8', newline='\n'), ensure_ascii=False, indent=1)
        subprocess.run([sys.executable, os.path.join(ROOT, 'tools', 'gen_playlist.py')], check=True)
        subprocess.run(['git', 'add', 'assets/js/playlist.js', 'outputs_meta.json', 'assets/uploads/covers/'], cwd=ROOT, check=True)
        subprocess.run(['git', 'commit', '-q', '-m', '播放器：补全 6 首封面'], cwd=ROOT, check=True)
        subprocess.run(['git', '-c', 'http.schannelCheckRevoke=false', 'push', 'origin', 'main'], cwd=ROOT, check=True)
        subprocess.run(['git', '-c', 'http.schannelCheckRevoke=false', 'push', 'origin', 'HEAD:Reze520-website'], cwd=ROOT, check=True)
        print('已重新生成并双推')
    else:
        print('无封面可补')


if __name__ == '__main__':
    main()
