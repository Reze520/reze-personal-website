# -*- coding: utf-8 -*-
"""reze520.top · 一键加歌

用法：
    python deploy/add_song.py "D:/音乐/某首歌.mp3"
    python deploy/add_song.py "D:/音乐/某首歌.mp3" "D:/音乐/某首歌.lrc"
    python deploy/add_song.py "D:/音乐/某首歌.mp3" --deploy      # 加完直接发布
    python deploy/add_song.py "D:/音乐/某首歌.mp3" --dry-run     # 只看会做什么

会自动完成：
  1. 从 mp3 内嵌标签读歌名 / 歌手（没有就用文件名猜「歌名 - 歌手」）
  2. 复制成 assets/audio/songN.mp3（N 自动递增，避免中文文件名）
  3. 有内嵌封面就提取成 assets/uploads/cover-songN.jpg
  4. 有 .lrc 就清掉作词/作曲/编曲那几行，转成歌词串
  5. 写进 assets/js/playlist.js
  6. 推进静态资源版本号，可选自动部署
"""
import io
import json
import os
import re
import shutil
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO = os.path.join(ROOT, "assets", "audio")
UPLOADS = os.path.join(ROOT, "assets", "uploads")
PLAYLIST = os.path.join(ROOT, "assets", "js", "playlist.js")


def sh(cmd):
    return subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="ignore")


def probe_tags(mp3):
    """读 title / artist（ffprobe 输出形如 TAG:title=xxx，要去掉前缀）"""
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


def guess_from_filename(path):
    """从「歌名 - 歌手.mp3」猜"""
    name = os.path.splitext(os.path.basename(path))[0]
    name = re.sub(r"[（(].*?[)）]", "", name).strip()
    for sep in (" - ", "-", "–", "—"):
        if sep in name:
            a, b = name.split(sep, 1)
            return a.strip(), b.strip()
    return name.strip(), ""


def next_index():
    nums = []
    for f in os.listdir(AUDIO):
        m = re.match(r"song(\d+)\.mp3$", f)
        if m:
            nums.append(int(m.group(1)))
    return max(nums) + 1 if nums else 1


def has_cover(mp3):
    r = sh(["ffprobe", "-hide_banner", "-loglevel", "error", "-select_streams", "v",
            "-show_entries", "stream=codec_name", "-of", "csv=p=0", mp3])
    return bool((r.stdout or "").strip())


def extract_cover(mp3, out_jpg):
    """提取内嵌封面并压缩到 320x320"""
    tmp = os.path.join(ROOT, "_cover_tmp.jpg")
    r = sh(["ffmpeg", "-y", "-loglevel", "error", "-i", mp3, "-an", "-vcodec", "copy", tmp])
    if r.returncode != 0 or not os.path.exists(tmp):
        return False
    try:
        from PIL import Image
        im = Image.open(tmp).convert("RGB")
        im.thumbnail((320, 320), Image.LANCZOS)
        im.save(out_jpg, quality=88, optimize=True)
        return True
    except Exception:
        shutil.copy(tmp, out_jpg)
        return True
    finally:
        if os.path.exists(tmp):
            os.remove(tmp)


def clean_lrc(path):
    """读 lrc，去掉作词作曲那些行，统一时间戳格式"""
    raw = open(path, "rb").read()
    text = None
    for enc in ("utf-8-sig", "utf-8", "gbk", "utf-16"):
        try:
            text = raw.decode(enc)
            break
        except Exception:
            continue
    if text is None:
        raise SystemExit("歌词文件编码无法识别：" + path)

    out = []
    for line in text.splitlines():
        t = line.strip()
        if not t:
            continue
        if re.search(r"(作词|作曲|编曲|制作人|词：|曲：|Lyrics by|Composed by)", t, re.I):
            continue
        t = re.sub(r"^\[(\d):", lambda m: "[0" + m.group(1) + ":", t)  # [0:05] -> [00:05]
        out.append(t)
    return "\n".join(out)


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
            return "?v=" + v[:-1] + chr(ord(v[-1]) + 1) if v[-1] != "z" else "?v=" + v + "0"

        t = re.sub(r"\?v=(2026\d{4}[a-z])", up, s)
        if t != s:
            io.open(p, "w", encoding="utf-8", newline="\n").write(t)
            n += 1
    return n


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    flags = [a for a in sys.argv[1:] if a.startswith("--")]
    dry = "--dry-run" in flags
    deploy = "--deploy" in flags

    if not args:
        print(__doc__)
        return
    mp3 = os.path.abspath(args[0])
    lrc = os.path.abspath(args[1]) if len(args) > 1 else None
    if not os.path.exists(mp3):
        raise SystemExit("找不到音频文件：" + mp3)

    tags = probe_tags(mp3)
    title = tags.get("title", "")
    artist = tags.get("artist", "")
    if not title:
        title, guess_artist = guess_from_filename(mp3)
        artist = artist or guess_artist

    # 同名 .lrc 自动找
    if not lrc:
        cand = os.path.splitext(mp3)[0] + ".lrc"
        if os.path.exists(cand):
            lrc = cand
            print("· 自动带上同名歌词：", os.path.basename(cand))

    head, arr = load_playlist()
    if any(t.get("title") == title and t.get("artist") == artist for t in arr):
        raise SystemExit("播放列表里已经有《%s - %s》了。" % (title, artist))

    idx = next_index()
    dst_name = "song%d.mp3" % idx
    dst = os.path.join(AUDIO, dst_name)
    cover_name = "cover-song%d.jpg" % idx
    cover_path = os.path.join(UPLOADS, cover_name)

    size_mb = os.path.getsize(mp3) / 1048576
    print("· 歌名：%s" % (title or "未知"))
    print("· 歌手：%s" % (artist or "未知"))
    print("· 大小：%.1f MB" % size_mb)
    print("· 目标：assets/audio/%s" % dst_name)
    print("· 歌词：%s" % (os.path.basename(lrc) if lrc else "无"))
    print("· 封面：%s" % ("有内嵌图" if has_cover(mp3) else "无"))

    if dry:
        print("\n（--dry-run，什么都没改）")
        return

    shutil.copyfile(mp3, dst)
    cover_rel = ""
    if has_cover(mp3) and extract_cover(mp3, cover_path):
        cover_rel = "assets/uploads/" + cover_name

    lyrics = clean_lrc(lrc) if lrc else ""
    arr.append({
        "title": title,
        "artist": artist,
        "src": "assets/audio/" + dst_name,
        "cover": cover_rel,
        "lyrics": lyrics,
    })
    save_playlist(head, arr)
    print("· 已写入 playlist.js（现在共 %d 首）" % len(arr))

    n = bump_version()
    print("· 版本号已推进（%d 个 html）" % n)

    if deploy:
        print("\n开始发布……")
        os.system('bash "%s"' % os.path.join(ROOT, "deploy", "deploy.sh").replace("\\", "/") + ' "加歌：《%s》"' % title)
    else:
        print("\n确认没问题就发布：bash deploy/deploy.sh \"加歌：《%s》\"" % title)


if __name__ == "__main__":
    main()
