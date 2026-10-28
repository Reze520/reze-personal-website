# -*- coding: utf-8 -*-
"""reze520.top · 在线抓歌

用法：
    python deploy/fetch_song.py "十年 陈奕迅"
    python deploy/fetch_song.py "十年 陈奕迅" --dry-run        # 只搜不下载
    python deploy/fetch_song.py --file _songlist.txt           # 一次抓一批（每行「歌名 歌手」）
    python deploy/fetch_song.py --file _songlist.txt --deploy  # 抓完直接发布

流程：
  1. 咪咕搜歌 —— 正版曲库，能直接取到音源流和该曲自己的歌词
  2. 按「歌名完全一致 + 歌手对得上 + 录音室版」打分选条目，避开 DJ/翻唱/现场
  3. 下载到 assets/audio/songN.mp3，封面从内嵌图或 imgItems 取，压到 320px
  4. 歌词直接用条目的 lyricUrl（不靠按歌名猜，避免配错时间轴），清掉作词作曲行
  5. 写进 playlist.js，推进静态资源版本号

咪咕没有的条目再退回酷我取直链，歌词用网易云按时长 ±3 秒校验。
"""
import io
import json
import os
import re
import subprocess
import sys
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO = os.path.join(ROOT, "assets", "audio")
UPLOADS = os.path.join(ROOT, "assets", "uploads")
PLAYLIST = os.path.join(ROOT, "assets", "js", "playlist.js")

UA_PC = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
         "(KHTML, like Gecko) Chrome/126.0 Safari/537.36")
UA_MIGU = "Android_migu"

# 出现这些词的版本一律降权：唱法/时长/编曲都变了，不是原版
BAD = re.compile(r"(伴奏|纯音乐|深情版|现场|live|演唱会|remix|翻唱|cover|DJ|钢琴|吉他|"
                 r"铃声|片段|节选|beat|混音|karaoke|instrumental|双声道|双声|"
                 r"翻自|致敬|组曲|串烧|精选|合集|播客|电台|KTV|remake|加速|降速|"
                 r"女声版|男声版|童声|清唱|哼唱|空灵鼓|八音盒|口琴|萨克斯)", re.I)


def sh(cmd):
    return subprocess.run(cmd, capture_output=True, text=True,
                          encoding="utf-8", errors="ignore")


def get(url, timeout=30, headers=None):
    req = urllib.request.Request(url, headers=headers or {"User-Agent": UA_PC})
    with urllib.request.urlopen(req, timeout=timeout) as f:
        return f.read()


def get_json(url, timeout=30, headers=None):
    return json.loads(get(url, timeout, headers).decode("utf-8", "ignore"))


def duration_of(path):
    r = sh(["ffprobe", "-hide_banner", "-loglevel", "error",
            "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", path])
    try:
        return float((r.stdout or "").strip())
    except Exception:
        return 0.0


def plain_name(s):
    return re.sub(r"[（(【\[].*?[)）】\]]", "", s or "").strip()


# ---------------- 咪咕 ----------------
def migu_search(title, artist="", rows=30):
    q = (title + " " + artist).strip()
    url = ("https://app.c.nf.migu.cn/MIGUM2.0/v1.0/content/search_all.do"
           "?text=%s&pageNo=1&pageSize=%d&searchSwitch=%%7B%%22song%%22%%3A1%%7D"
           % (urllib.parse.quote(q), rows))
    try:
        d = get_json(url, headers={"User-Agent": UA_MIGU})
    except Exception:
        return []
    return ((d.get("songResultData") or {}).get("result") or [])


def migu_pick(cands, title, artist=""):
    """挑最像原版的一条，返回 (条目, 分数)。
    歌手对不上一律直接丢弃——歌名相同的翻唱太多了，靠降权压不住。"""
    plain = plain_name(title)
    parts = [p for p in re.split(r"[、,，&/\s]+", artist) if p.strip()]

    scored = []
    for c in cands:
        nm = c.get("name") or ""
        singers_list = [s.get("name") or "" for s in (c.get("singers") or [])]
        singers = " ".join(singers_list)
        nm_plain = plain_name(nm)
        s = 0
        if nm_plain == plain:
            s += 60
        elif plain and (plain in nm_plain or nm_plain in plain):
            s += 22
        else:
            continue
        if BAD.search(nm):
            s -= 80
        if parts:
            if any(p in singers for p in parts):
                s += 55
                # 点的是单人，给的却是合唱版，多半不是原唱那版
                if len(parts) == 1 and len(singers_list) > 1:
                    s -= 40
            else:
                continue
        tags = " ".join(c.get("tags") or [])
        if "录音室版" in tags:
            s += 30
        if c.get("copyright") == 1:
            s += 15
        scored.append((s, c))
    if not scored:
        return None, 0
    scored.sort(key=lambda x: -x[0])
    best = scored[0]
    if best[0] <= 0:
        return None, best[0]
    return best[1], best[0]


def migu_stream(song):
    """取音频数据流（PQ 约 128k mp3）"""
    url = ("https://app.c.nf.migu.cn/MIGUM2.0/v1.0/content/sub/listenSong.do"
           "?toneFlag=PQ&netType=00&ua=Android_migu&version=5.0.1"
           "&copyrightId=%s&contentId=%s&resourceType=%s&channel=0"
           % (song.get("copyrightId", ""), song.get("contentId", ""),
              song.get("resourceType", "2")))
    try:
        return get(url, timeout=90, headers={"User-Agent": UA_MIGU})
    except Exception:
        return b""


def migu_lyric(song):
    u = song.get("lyricUrl") or ""
    if not u:
        return ""
    try:
        return get(u, timeout=30, headers={"User-Agent": UA_MIGU}).decode("utf-8", "ignore")
    except Exception:
        return ""


def migu_cover_url(song):
    for item in (song.get("imgItems") or []):
        img = item.get("img") or ""
        if img.startswith("http"):
            return img
    return ""


# ---------------- 酷我（兜底） ----------------
def kuwo_search(title, artist=""):
    q = (title + " " + artist).strip()
    url = ("http://search.kuwo.cn/r.s?all=%s&ft=music&itemset=web_2013&client=kt"
           "&pn=0&rn=15&rformat=json&encoding=utf8" % urllib.parse.quote(q))
    try:
        raw = get(url).decode("utf-8", "ignore").strip().replace("'", '"')
        raw = raw.replace("&nbsp;", " ")
        d = json.loads(raw)
    except Exception:
        return []
    out = []
    for it in (d.get("abslist") or []):
        rid = str(it.get("DC_TARGETID") or "").replace("MUSIC_", "")
        if not rid:
            continue
        out.append({
            "rid": rid,
            "name": (it.get("SONGNAME") or "").replace("&nbsp;", " ").strip(),
            "artist": (it.get("ARTIST") or "").replace("&nbsp;", " ").strip(),
            "duration": int(it.get("DURATION") or 0),
            "formats": it.get("FORMATS") or "",
        })
    return out


def kuwo_url(rid):
    url = ("https://antiserver.kuwo.cn/anti.s?type=convert_url&format=mp3"
           "&response=url&rid=MUSIC_" + str(rid))
    try:
        u = get(url).decode("utf-8", "ignore").strip()
    except Exception:
        return None
    return u if u.startswith("http") else None


# ---------------- 网易云（酷我兜底时取歌词） ----------------
def netease_lyric_by_duration(title, dur, artist=""):
    q = (title + " " + artist).strip()
    url = ("https://music.163.com/api/search/get?s=%s&type=1&limit=30"
           % urllib.parse.quote(q))
    hdr = {"User-Agent": UA_PC, "Referer": "https://music.163.com/"}
    try:
        d = get_json(url, headers=hdr)
    except Exception:
        return ""
    songs = ((d.get("result") or {}).get("songs")) or []
    if not songs:
        return ""
    plain = plain_name(title)

    def artists_of(s):
        return " ".join(a.get("name", "") for a in (s.get("artists") or []))

    parts = [p for p in re.split(r"[、,，&/\s]+", artist) if p.strip()]
    cand = []
    for s in songs:
        nm = s.get("name", "")
        if not (nm == plain or plain in nm or nm in plain):
            continue
        if dur and abs((s.get("duration") or 0) / 1000 - dur) > 3:
            continue
        score = 0
        if not BAD.search(nm):
            score += 30
        if parts and any(p in artists_of(s) for p in parts):
            score += 30
        cand.append((score, s.get("id")))
    if not cand:
        return ""
    cand.sort(key=lambda x: -x[0])
    sid = cand[0][1]
    try:
        d = get_json("https://music.163.com/api/song/lyric?id=%s&lv=1&kv=1&tv=-1" % sid,
                     headers=hdr)
    except Exception:
        return ""
    return ((d.get("lrc") or {}).get("lyric")) or ""


# ---------------- 歌词清洗 / 封面 / 播放列表 ----------------
def clean_lrc(text):
    out = []
    for line in (text or "").replace("\r\n", "\n").splitlines():
        t = line.strip()
        if not t:
            continue
        if re.search(r"(作词|作曲|编曲|制作人|和声|吉他|贝斯|鼓|混音|录音|母带|监制|"
                     r"出品|发行|统筹|企划|Lyrics by|Composed by|Arranged by|"
                     r"Produced by|Written by|OP|SP)", t, re.I):
            continue
        if re.fullmatch(r"\[\d{2}:\d{2}[.:]\d{2,3}\]\s*", t):
            continue
        # 去掉「歌名 - 歌手」这种首行标题
        if re.match(r"^\[\d{2}:\d{2}[.:]\d{2,3}\]\s*[^-]{1,20}\s+-\s+", t) and len(t) < 60:
            continue
        out.append(t)
    return "\n".join(out)


def has_cover(mp3):
    r = sh(["ffprobe", "-hide_banner", "-loglevel", "error", "-select_streams", "v",
            "-show_entries", "stream=codec_name", "-of", "csv=p=0", mp3])
    return bool((r.stdout or "").strip())


def save_cover_from_file(mp3, out_jpg):
    tmp = os.path.join(ROOT, "_cover_tmp.jpg")
    r = sh(["ffmpeg", "-y", "-loglevel", "error", "-i", mp3, "-an",
            "-vcodec", "copy", tmp])
    if r.returncode != 0 or not os.path.exists(tmp):
        return False
    return _compress_cover(tmp, out_jpg)


def save_cover_from_url(url, out_jpg):
    tmp = os.path.join(ROOT, "_cover_tmp.img")
    try:
        data = get(url, timeout=30)
        io.open(tmp, "wb").write(data)
    except Exception:
        return False
    return _compress_cover(tmp, out_jpg)


def _compress_cover(src, out_jpg):
    try:
        from PIL import Image
        im = Image.open(src).convert("RGB")
        im.thumbnail((320, 320), Image.LANCZOS)
        im.save(out_jpg, quality=88, optimize=True)
        return True
    except Exception:
        return False
    finally:
        if os.path.exists(src):
            os.remove(src)


def next_index():
    nums = [int(m.group(1)) for f in os.listdir(AUDIO)
            for m in [re.match(r"song(\d+)\.mp3$", f)] if m]
    return max(nums) + 1 if nums else 1


def load_playlist():
    src = io.open(PLAYLIST, encoding="utf-8").read()
    m = re.search(r"window\.PLAYLIST\s*=\s*(\[[\s\S]*?\]);", src)
    if not m:
        raise SystemExit("playlist.js 格式不对，找不到 window.PLAYLIST")
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
            return "?v=" + (v[:-1] + chr(ord(v[-1]) + 1) if v[-1] != "z" else v + "0")

        t = re.sub(r"\?v=(2026\d{4}[a-z])", up, s)
        if t != s:
            io.open(p, "w", encoding="utf-8", newline="\n").write(t)
            n += 1
    return n


# ---------------- 主流程 ----------------
def add_one(title, artist="", dry=False):
    plain = plain_name(title)

    head, arr = load_playlist()
    for t in arr:
        if plain_name(t.get("title")) == plain:
            return "skip", "播放列表里已经有《%s》了" % t.get("title")

    cands = migu_search(title, artist)
    pick, score = migu_pick(cands, title, artist) if cands else (None, 0)

    if pick:
        singer = "、".join((s.get("name") or "") for s in (pick.get("singers") or []))
        print("    咪咕命中：%s - %s（%s）"
              % (pick.get("name"), singer, "录音室版" if "录音室版" in " ".join(pick.get("tags") or []) else "普通"))
        if dry:
            return "ok", "（预览）会下载上面的版本"
        data = migu_stream(pick)
        source = "咪咕"
        lyric_text = migu_lyric(pick)
        cover_url = migu_cover_url(pick)
        meta_title = plain_name(pick.get("name")) or plain
        meta_artist = artist or singer
    else:
        kc = kuwo_search(title, artist)
        kpick, kscore = None, 0
        parts = [p for p in re.split(r"[、,，&/\s]+", artist) if p.strip()]
        best = None
        for c in kc:
            nm = plain_name(c["name"])
            if nm != plain:
                continue
            s = 40
            if BAD.search(c["name"]):
                s -= 80
            if parts and any(p in c["artist"] for p in parts):
                s += 40
            else:
                s -= 50
            if best is None or s > best[0]:
                best = (s, c)
        if best and best[0] > 0:
            kpick, kscore = best[1], best[0]
        if not kpick:
            return "fail", "咪咕 / 酷我都只找到 DJ·翻唱·现场版（咪咕分 %d / 酷我分 %d）" % (score, kscore)
        print("    酷我命中：%s - %s (%ds)" % (kpick["name"], kpick["artist"], kpick["duration"]))
        if dry:
            return "ok", "（预览）会下载上面的版本"
        u = kuwo_url(kpick["rid"])
        if not u:
            return "fail", "酷我取直链失败"
        try:
            data = get(u, timeout=90)
        except Exception as e:
            return "fail", "下载失败：%s" % e
        source = "酷我"
        lyric_text = ""
        cover_url = ""
        meta_title = plain
        meta_artist = artist or kpick["artist"]

    if len(data) < 300 * 1024:
        return "fail", "%s 返回的数据太小（%d 字节），可能不是完整音频" % (source, len(data))

    idx = next_index()
    dst_name = "song%d.mp3" % idx
    dst = os.path.join(AUDIO, dst_name)
    io.open(dst, "wb").write(data)

    dur = duration_of(dst)
    if dur <= 0:
        os.remove(dst)
        return "fail", "下载的文件读不出时长，丢弃"

    # 封面：优先内嵌图（咪咕流一般带），否则用检索结果里的专辑图
    cover_name = ""
    cand_name = "cover-song%d.jpg" % idx
    cand_path = os.path.join(UPLOADS, cand_name)
    if has_cover(dst) and save_cover_from_file(dst, cand_path):
        cover_name = cand_name
    elif cover_url and save_cover_from_url(cover_url, cand_path):
        cover_name = cand_name

    # 歌词：咪咕用条目自带 lyricUrl；酷我兜底时才按时长去网易云匹配
    if not lyric_text:
        lyric_text = netease_lyric_by_duration(plain, dur, meta_artist)
    lyric = clean_lrc(lyric_text)

    entry = {
        "title": meta_title,
        "artist": meta_artist,
        "src": "assets/audio/" + dst_name,
        "cover": ("assets/uploads/" + cover_name) if cover_name else "",
        "lyrics": lyric,
    }
    arr.append(entry)
    save_playlist(head, arr)

    note = "%s · %s → %s，%.1f MB，%ds，歌词 %d 行，%s封面（%s）" % (
        meta_title, meta_artist, dst_name, len(data) / 1048576, int(dur),
        len(lyric.splitlines()) if lyric else 0,
        "有" if cover_name else "无", source)
    return "ok", note


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    flags = [a for a in sys.argv[1:] if a.startswith("--")]
    dry = "--dry-run" in flags
    deploy = "--deploy" in flags

    path = ""
    if "--file" in sys.argv:
        fi = sys.argv.index("--file")
        path = sys.argv[fi + 1] if fi + 1 < len(sys.argv) else ""

    def parse_line(line):
        """一行拆成 (歌名, 歌手)：优先「歌名 - 歌手」，否则第一个词是歌名"""
        line = line.strip()
        if " - " in line:
            a, b = line.split(" - ", 1)
            return a.strip(), b.strip()
        parts = line.split()
        if len(parts) == 1:
            return line, ""
        return parts[0], " ".join(parts[1:])

    items = []
    if path:
        if not os.path.exists(path):
            raise SystemExit("找不到清单文件：" + path)
        for line in io.open(path, encoding="utf-8"):
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            items.append(parse_line(line))
    elif args:
        items.append(parse_line(" ".join(args)))
    else:
        print(__doc__)
        return

    print("共 %d 首待处理%s\n" % (len(items), "（预览模式）" if dry else ""))
    stats = {"ok": 0, "skip": 0, "fail": 0}
    failed = []
    for i, (title, artist) in enumerate(items, 1):
        print("[%d/%d] %s%s" % (i, len(items), title, (" - " + artist) if artist else ""))
        try:
            st, msg = add_one(title, artist, dry)
        except Exception as e:
            st, msg = "fail", "异常：%s" % e
        stats[st] += 1
        print("    %s：%s" % ({"ok": "✓", "skip": "·", "fail": "✗"}[st], msg))
        if st == "fail":
            failed.append((title, artist, msg))
        print()

    print("=" * 52)
    print("成功 %d / 跳过 %d / 失败 %d" % (stats["ok"], stats["skip"], stats["fail"]))
    if failed:
        print("\n失败清单：")
        for t, a, msg in failed:
            print("  · %s%s —— %s" % (t, (" - " + a) if a else "", msg))

    if stats["ok"] and not dry:
        n = bump_version()
        print("\n静态资源版本号已推进（%d 个 html）" % n)
        print('接着跑：bash deploy/deploy.sh "加了几首歌"')


if __name__ == "__main__":
    main()
