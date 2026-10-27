# -*- coding: utf-8 -*-
"""reze520.top · 生成导航数据并抓取本地 favicon"""
import io, json, os, time, urllib.request, urllib.parse

ROOT = "."
ICONS = os.path.join(ROOT, "assets", "icons")
os.makedirs(ICONS, exist_ok=True)

UA = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/131.0 Safari/537.36",
}

# 分类 / 名称 / 网址 / 描述
LINKS = [
    # --- AI 工具 ---
    ("AI 工具", "ChatGPT", "https://chatgpt.com", "最常用的对话 AI"),
    ("AI 工具", "Claude", "https://claude.ai", "长文和代码写得稳"),
    ("AI 工具", "Gemini", "https://gemini.google.com", "谷歌家的对话 AI"),
    ("AI 工具", "DeepSeek", "https://chat.deepseek.com", "中文推理，便宜好用"),
    ("AI 工具", "Kimi", "https://kimi.moonshot.cn", "长文档扔进去问"),
    ("AI 工具", "豆包", "https://www.doubao.com", "字节的，能画图"),
    ("AI 工具", "通义千问", "https://tongyi.aliyun.com", "阿里的对话 AI"),
    ("AI 工具", "腾讯元宝", "https://yuanbao.tencent.com", "接微信生态"),
    ("AI 工具", "即梦 AI", "https://jimeng.jianying.com", "图片和视频生成"),
    ("AI 工具", "可灵 AI", "https://klingai.com", "视频生成"),
    ("AI 工具", "Midjourney", "https://www.midjourney.com", "出图天花板"),
    ("AI 工具", "Suno", "https://suno.com", "一句话生成一首歌"),

    # --- 开发技术 ---
    ("开发技术", "GitHub", "https://github.com", "放代码的地方"),
    ("开发技术", "MDN", "https://developer.mozilla.org", "前端文档，查属性最准"),
    ("开发技术", "菜鸟教程", "https://www.runoob.com", "查语法，入门够用"),
    ("开发技术", "Stack Overflow", "https://stackoverflow.com", "报错先搜这里"),
    ("开发技术", "掘金", "https://juejin.cn", "中文技术社区"),
    ("开发技术", "V2EX", "https://www.v2ex.com", "程序员日常闲聊"),
    ("开发技术", "Can I use", "https://caniuse.com", "兼容性查询"),
    ("开发技术", "CodePen", "https://codepen.io", "前端试验场"),
    ("开发技术", "Cloudflare", "https://dash.cloudflare.com", "站点托管就在这"),
    ("开发技术", "npm", "https://www.npmjs.com", "找包和看文档"),

    # --- 设计素材 ---
    ("设计素材", "Unsplash", "https://unsplash.com", "免费高清图"),
    ("设计素材", "Pexels", "https://www.pexels.com", "免费图库，图多"),
    ("设计素材", "Pixabay", "https://pixabay.com", "图片和插画都有"),
    ("设计素材", "阿里图标库", "https://www.iconfont.cn", "找图标首选"),
    ("设计素材", "Iconify", "https://icon-sets.iconify.design", "图标集合，能直接复制 SVG"),
    ("设计素材", "Coolors", "https://coolors.co", "配色生成器"),
    ("设计素材", "Figma", "https://www.figma.com", "画界面原型"),
    ("设计素材", "Canva", "https://www.canva.cn", "不会设计也能做图"),
    ("设计素材", "TinyPNG", "https://tinypng.com", "图片压缩"),

    # --- 效率工具 ---
    ("效率工具", "Notion", "https://www.notion.so", "记东西、写文档"),
    ("效率工具", "语雀", "https://www.yuque.com", "国内的知识库"),
    ("效率工具", "飞书", "https://www.feishu.cn", "文档和表格"),
    ("效率工具", "Excalidraw", "https://excalidraw.com", "手绘风白板"),
    ("效率工具", "ProcessOn", "https://www.processon.com", "画流程图"),
    ("效率工具", "草料二维码", "https://cli.im", "生成二维码"),
    ("效率工具", "Squoosh", "https://squoosh.app", "浏览器里压图"),
    ("效率工具", "石墨文档", "https://shimo.im", "在线文档"),

    # --- 影音娱乐 ---
    ("影音娱乐", "哔哩哔哩", "https://space.bilibili.com/234451938", "我的 B 站"),
    ("影音娱乐", "YouTube", "https://www.youtube.com", "看别人的视频"),
    ("影音娱乐", "网易云音乐", "https://music.163.com", "找歌和看评论"),
    ("影音娱乐", "QQ 音乐", "https://y.qq.com", "曲库全"),
    ("影音娱乐", "豆瓣", "https://www.douban.com", "看书影评"),
    ("影音娱乐", "小红书", "https://www.xiaohongshu.com", "找灵感"),
    ("影音娱乐", "抖音", "https://v.douyin.com/jY-UScBpfDE/", "我的抖音"),

    # --- 学习资讯 ---
    ("学习资讯", "知乎", "https://www.zhihu.com", "搜问题"),
    ("学习资讯", "少数派", "https://sspai.com", "数码和效率"),
    ("学习资讯", "36 氪", "https://36kr.com", "看商业新闻"),
    ("学习资讯", "维基百科", "https://zh.wikipedia.org", "查资料"),

    # --- 生活实用 ---
    ("生活实用", "高德地图", "https://www.amap.com", "查路线"),
    ("生活实用", "12306", "https://www.12306.cn", "买火车票"),
    ("生活实用", "中国天气", "https://www.weather.com.cn", "出门前看一眼"),
    ("生活实用", "DeepL", "https://www.deepl.com", "翻译比机翻自然"),
    ("生活实用", "百度翻译", "https://fanyi.baidu.com", "备用的"),
    ("生活实用", "淘宝", "https://www.taobao.com", "买东西"),
    ("生活实用", "京东", "https://www.jd.com", "买数码"),
    ("生活实用", "QQ 邮箱", "https://mail.qq.com", "写信给我"),
]


def host_of(url):
    h = urllib.parse.urlparse(url).hostname or ""
    return h[4:] if h.startswith("www.") else h


def fetch_icon(host):
    """从 favicon.im 抓图标，按实际类型存本地，返回相对路径"""
    for existed in (".png", ".svg", ".ico", ".jpg"):
        p = os.path.join(ICONS, host + existed)
        if os.path.exists(p) and os.path.getsize(p) > 100:
            return "assets/icons/" + host + existed
    url = "https://favicon.im/" + host
    try:
        req = urllib.request.Request(url, headers=UA)
        with urllib.request.urlopen(req, timeout=15) as r:
            data = r.read()
            ctype = (r.headers.get("Content-Type") or "").lower()
    except Exception as e:
        print("    抓取失败 %s: %s" % (host, str(e)[:50]))
        return ""
    if len(data) < 100:
        return ""
    if "svg" in ctype:
        ext = ".svg"
    elif "png" in ctype:
        ext = ".png"
    elif "icon" in ctype or "ico" in ctype:
        ext = ".ico"
    else:
        ext = ".png" if data[:4] == b"\x89PNG" else ".ico"
    path = os.path.join(ICONS, host + ext)
    open(path, "wb").write(data)
    return "assets/icons/" + host + ext


result = []
seen_host = {}
print("开始抓图标（%d 个站点）……\n" % len({host_of(u) for _, _, u, _ in LINKS}))
for cat, name, url, desc in LINKS:
    host = host_of(url)
    if host in seen_host:
        fav = seen_host[host]
    else:
        fav = fetch_icon(host)
        seen_host[host] = fav
        time.sleep(0.3)
    print("%-4s %-16s %-30s %s" % ("✅" if fav else "❌", name, url, fav.split("/")[-1] if fav else "无图标"))
    result.append({"cat": cat, "name": name, "url": url, "desc": desc, "fav": fav})

io.open("_links.json", "w", encoding="utf-8").write(json.dumps(result, ensure_ascii=False, indent=2))
ok = sum(1 for x in result if x["fav"])
print("\n完成：%d / %d 拿到图标，数据写入 _links.json" % (ok, len(result)))
