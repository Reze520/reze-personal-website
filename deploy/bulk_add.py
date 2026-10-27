# -*- coding: utf-8 -*-
"""reze520.top · 批量导入一个文件夹里的歌

用法：
    python deploy/bulk_add.py "C:/Users/reze/Desktop"            # 预览
    python deploy/bulk_add.py "C:/Users/reze/Desktop" --apply    # 真的写进去

会做：
  1. 扫文件夹里的 mp3，读 title / artist（标签优先，没有就从「歌名 - 歌手」文件名猜）
  2. 提取 mp3 内嵌封面，压到 320px 存成 assets/uploads/cover-<slug>.jpg
  3. 按「歌名 + 歌手」去网易云找 LRC 歌词，清掉作词作曲编曲那些行
  4. 复制成 assets/audio/songN.mp3，写进 playlist.js
  5. 推进版本号

只处理音频和元数据，不下载任何音频文件。
"""
import io
import json
import os
import re
import shutil
import subprocess
import sys
import time
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO = os.path.join(ROOT, "assets", "audio")
UPLOADS = os.path.join(ROOT, "assets", "uploads")
PLAYLIST = os.path.join(ROOT, "assets", "js", "playlist.js")

UA = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/131.0 Safari/537.36",
    "Referer": "https://music.163.com/",
}


def sh(cmd):
    return subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="ignore")


def probe(mp3):
    r = sh(["ffprobe", "-hide_banner", "-loglevel", "error",
            "-show_entries", "format_tags", "-of", "default=nw=1", mp3])
    tags = {}
    for line in (r.stdout or "").splitlines():
        if "=" not in line:
            continue
        k, v = line.split("=", 1)
        k = k.strip().lower()
        if k.startswith("tag:"):
            k = k[4:]
        tags[k] = v.strip()
    return tags


def split_name(path):
    """从「歌名 - 歌手.mp3」拆开"""
    name = os.path.splitext(os.path.basename(path))[0]
    name = name.replace("_", " ").strip()
    for sep in (" - ", "-", "–", "—"):
        if sep in name:
            a, b = name.split(sep, 1)
            return a.strip(), b.strip()
    return name.strip(), ""


def has_cover(mp3):
    r = sh(["ffprobe", "-hide_banner", "-loglevel", "error", "-select_streams", "v",
            "-show_entries", "stream=codec_name", "-of", "csv=p=0", mp3])
    return bool((r.stdout or "").strip())


def extract_cover(mp3, out_jpg):
    tmp = os.path.join(ROOT, "_cov_tmp.jpg")
    r = sh(["ffmpeg", "-y", "-loglevel", "error", "-i", mp3, "-an", "-vcodec", "copy", tmp])
    if r.returncode != 0 or not os.path.exists(tmp):
        return False
    try:
        from PIL import Image
        im = Image.open(tmp).convert("RGB")
        im.thumbnail((320, 320), Image.LANCZOS)
        im.save(out_jpg, quality=88, optimize=True)
        return True
    finally:
        if os.path.exists(tmp):
            os.remove(tmp)


def http_json(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=20) as f:
        return json.loads(f.read().decode("utf-8", "ignore"))


def duration_of(mp3):
    r = sh(["ffprobe", "-hide_banner", "-loglevel", "error",
            "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", mp3])
    try:
        return float((r.stdout or "").strip())
    except Exception:
        return 0.0


def find_song(title, artist, dur=0):
    """搜网易云，返回 (id, 歌名)。
    核心策略：先用音频时长筛掉翻唱/伴奏/改编版，再按名字确认。
    （版权歌的原版在搜索接口里常常搜不到，只剩各种改编版，靠名字会配错时间轴）"""
    q = (title + " " + artist).strip()
    url = "https://music.163.com/api/search/get?s=%s&type=1&limit=30" % urllib.parse.quote(q)
    try:
        d = http_json(url)
    except Exception:
        return None, None
    songs = ((d.get("result") or {}).get("songs")) or []
    plain = re.sub(r"[（(].*?[)）]", "", title).strip()
    if not plain:
        return None, None

    bad = re.compile(r"(伴奏|纯音乐|深情版|现场|live|remix|翻唱|cover|DJ|钢琴|吉他|"
                     r"铃声|片段|节选|beat|版)", re.I)

    def artists_of(s):
        return " ".join(a.get("name", "") for a in (s.get("artists") or s.get("ar") or []))

    def artist_ok(s):
        if not artist:
            return True
        ars = artists_of(s)
        return any(p and p in ars for p in re.split(r"[、,，&/]", artist) if p.strip())

    def name_ok(s):
        nm = s.get("name", "")
        return (nm == plain) or (plain in nm) or (nm in plain)

    # 第一轮：时长接近（±3 秒）+ 名字沾边 —— 最可靠
    if dur:
        cand = [s for s in songs
                if abs((s.get("duration") or 0) / 1000 - dur) <= 3 and name_ok(s)]
        # 同时候选里优先非改编版、歌手对得上的
        cand.sort(key=lambda s: (bad.search(s.get("name", "")) is not None,
                                 not artist_ok(s)))
        if cand:
            return cand[0].get("id"), cand[0].get("name")

    # 第二轮：歌名完全一致 + 歌手对 + 不是改编版
    for s in songs:
        nm = s.get("name", "")
        if nm == plain and artist_ok(s) and not bad.search(nm):
            return s.get("id"), nm
    # 第三轮：歌手对 + 不是改编版
    for s in songs:
        nm = s.get("name", "")
        if artist_ok(s) and not bad.search(nm) and name_ok(s):
            return s.get("id"), nm
    return None, None


def fetch_lyric(song_id):
    url = "https://music.163.com/api/song/lyric?id=%s&lv=1&kv=1&tv=-1" % song_id
    try:
        d = http_json(url)
    except Exception:
        return ""
    return ((d.get("lrc") or {}).get("lyric")) or ""


def clean_lrc(text):
    out = []
    for line in (text or "").splitlines():
        t = line.strip()
        if not t:
            continue
        if re.search(r"(作词|作曲|编曲|制作人|和声|吉他|贝斯|鼓|混音|录音|母带|监制|"
                     r"Lyrics by|Composed by|Arranged by|Produced by)", t, re.I):
            continue
        if re.fullmatch(r"\[\d{2}:\d{2}[.:]\d{2,3}\]\s*", t):
            continue
        out.append(t)
    return "\n".join(out)


def slugify(text):
    s = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return s or "track"


def next_index():
    nums = [int(m.group(1)) for f in os.listdir(AUDIO)
            if (m := re.match(r"song(\d+)\.mp3$", f))]
    return (max(nums) + 1) if nums else 1


def load_playlist():
    src = io.open(PLAYLIST, encoding="utf-8").read()
    m = re.search(r"window\.PLAYLIST\s*=\s*(\[[\s\S]*?\]);", src)
    if not m:
        raise SystemExit("playlist.js 结构不对")
    return src[:m.start()], json.loads(m.group(1))


def save_playlist(head, arr):
    body = json.dumps(arr, ensure_ascii=False, indent=2)
    io.open(PLAYLIST, "w", encoding="utf-8", newline="\n").write(
        head + "window.PLAYLIST = " + body + ";\n")


def bump_version():
    n = 0
    for f in os.listdir(ROOT):
        if not f.endswith(".html"):
            continue
        p = os.path.join(ROOT, f)
        s = io.open(p, encoding="utf-8").read()

        def up(m):
            v = m.group(1)
            return "?v=" + (v[:-1] + chr(ord(v[-1]) + 1) if v[-1] != "z" else v)

        t = re.sub(r"\?v=(2026\d{4}[a-z])", up, s)
        if t != s:
            io.open(p, "w", encoding="utf-8", newline="\n").write(t)
            n += 1
    return n


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    apply = "--apply" in sys.argv
    if not args:
        print(__doc__)
        return
    folder = os.path.abspath(args[0])
    files = sorted(f for f in os.listdir(folder) if f.lower().endswith(".mp3"))
    if not files:
        raise SystemExit("这个文件夹里没有 mp3")

    head, arr = load_playlist()
    have = {(t.get("title", ""), t.get("artist", "")) for t in arr}
    idx = next_index()

    plan = []
    print("找到 %d 个 mp3，先逐个确认信息：\n" % len(files))
    for fn in files:
        path = os.path.join(folder, fn)
        tags = probe(path)
        t_name, t_art = split_name(path)
        title = tags.get("title") or t_name
        artist = t_art or tags.get("artist") or ""
        title = re.sub(r"\s*\(\d{4}\)$", "", title).strip()

        dup = any(title in t and artist and artist in a for t, a in have)
        dur = duration_of(path)
        sid, matched = (None, None)
        lyric = ""
        if not dup:
            sid, matched = find_song(title, artist, dur)
            if sid:
                lyric = clean_lrc(fetch_lyric(sid))
            time.sleep(0.35)

        cov = "有" if has_cover(path) else "无"
        size = os.path.getsize(path) / 1048576
        lyric_info = (str(len(lyric.splitlines())) + " 行") if lyric else "没找到"
        print("《%s》— %s" % (title, artist or "?"))
        print("   %.1fMB | 时长 %.0fs | 封面%s | 歌词 %s%s" % (
            size, dur, cov, lyric_info,
            "  ← 已存在，跳过" if dup else ""))
        if matched:
            print("   对上版本：%s" % matched)
        plan.append({
            "file": fn, "path": path, "title": title, "artist": artist,
            "lyrics": lyric, "cover": has_cover(path), "dup": dup, "size": size,
        })

    todo = [p for p in plan if not p["dup"]]
    total = sum(p["size"] for p in todo)
    print("\n--- 汇总 ---")
    print("新增 %d 首，跳过 %d 首，合计 %.1f MB" % (len(todo), len(plan) - len(todo), total))
    print("歌词缺失：%s" % (", ".join(p["title"] for p in todo if not p["lyrics"]) or "无"))

    if not apply:
        print("\n（预览模式，什么都没改。确认无误后加 --apply）")
        return

    print("\n开始写入……")
    for p in todo:
        dst_name = "song%d.mp3" % idx
        shutil.copyfile(p["path"], os.path.join(AUDIO, dst_name))
        cover_rel = ""
        if p["cover"]:
            cn = "cover-%s.jpg" % slugify(p["title"])
            if extract_cover(p["path"], os.path.join(UPLOADS, cn)):
                cover_rel = "assets/uploads/" + cn
        arr.append({
            "title": p["title"], "artist": p["artist"],
            "src": "assets/audio/" + dst_name,
            "cover": cover_rel, "lyrics": p["lyrics"],
        })
        print("  + 《%s》-> %s" % (p["title"], dst_name))
        idx += 1

    save_playlist(head, arr)
    n = bump_version()
    print("\n完成：播放列表共 %d 首，%d 个 html 版本号已推进" % (len(arr), n))
    print('发布：bash deploy/deploy.sh "批量导入 %d 首歌"' % len(todo))


if __name__ == "__main__":
    main()
