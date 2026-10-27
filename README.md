# reze520.top 使用说明

一套零依赖的静态博客：3 个 HTML、1 个 CSS、2 个 JS，没有框架、没有构建步骤、没有第三方统计。
双击 `index.html` 就能在浏览器里看，改完直接上传服务器即可。

---

## 一、日常维护：只改一个文件

**所有内容都在 `assets/js/data.js` 里。**

### 加一篇新文章

复制一个 `{ ... }` 对象，粘在 `window.POSTS = [` 后面（最新的放最前面）：

```js
{
  id: "my-new-post",              // 英文短横线，会出现在网址里，不能重复
  title: "文章标题",
  date: "2026-11-01",             // 发布日期
  updated: "",                    // 更新日期，没有就留空
  cat: "技术",                    // 技术 / 生活 / 作品（分类自动统计）
  tags: ["前端", "笔记"],          // 标签，随便加
  cover: "assets/uploads/xxx.jpg",// 封面图，没有就留空 ""
  pinned: false,                  // true = 置顶
  excerpt: "列表里显示的两行摘要。",
  content: `
<p>正文段落。</p>
<h2>小标题</h2>
<p>还能用 <strong>加粗</strong>、<em>斜体</em>、<code>行内代码</code>。</p>
<blockquote><p>引用。</p></blockquote>
<pre><code>代码块</code></pre>
<ul><li>列表</li></ul>
`
}
```

> 注意：`content` 用的是反引号包裹，**正文里不要再出现反引号**（会截断），
> 行内代码请用 `<code>` 标签。

### 改个人信息

`window.SITE` 里：

| 字段 | 说明 |
| --- | --- |
| `name` / `en` | 站名，显示在左上角和侧栏 |
| `slogan` | 侧栏签名，一句话 |
| `intro` | 首页介绍 |
| `email` | 邮箱，页脚「写信」和首页卡片用 |
| `social` | 侧栏的社交按钮数组，见下 |
| `avatar` | 头像路径，留空显示「蕾」字 |
| `icp` | 备案号，下来后填进去，全站页脚自动生效 |

### 社交按钮怎么改

侧栏那排圆形图标由 `social` 数组控制，**顺序就是显示顺序**：

```js
social: [
  { name: "GitHub", icon: "github", url: "https://github.com/Reze520" },
  { name: "哔哩哔哩", icon: "bili", url: "https://space.bilibili.com/234451938" },
  { name: "抖音", icon: "douyin", url: "https://v.douyin.com/jY-UScBpfDE/" },
  { name: "邮箱", icon: "mail", url: "mailto:1806754672@qq.com" },
],
```

`icon` 目前有四款可选：`github` / `bili` / `douyin` / `mail`。
想加别的平台，得先在 `main.js` 的 `ICONS` 对象里加一个同名的 SVG，再在这里引用。

> 小提示：邮箱直接写在页面上会被爬虫抓走发垃圾邮件。
> 如果以后觉得烦，可以把 `mailto:` 换成问卷或留言页的链接。

---

## 二、首屏欢迎页（只影响首页）

打开网站第一眼看到的全屏页面，由 `data.js` 里的 `splash` 控制：

```js
splash: {
  bg: "",        // 背景图或动图
  video: "",     // 背景视频（填了就优先于 bg）
  hi: "HI THERE — WELCOME TO MY BLOG",
  title: "欢迎来到我的小窝",
  quote: "什么都沾一点，想到什么记什么。",
  quoteFrom: "— 蕾泽",
  scrollText: "向下滑动",
},
```

### 换背景

**静态图 / 动图**：把图片丢进 `assets/uploads/`，然后：

```js
bg: "assets/uploads/hero.jpg",   // jpg / png / webp
bg: "assets/uploads/hero.gif",   // 动图也行，直接写 gif
```

**视频**（最有氛围，但也最重）：

```js
video: "assets/uploads/hero.mp4",
```

视频会自动静音、循环、自动播放——静音状态下浏览器是允许自动播的，这点和背景音乐不同。
建议：1280×720 以内，码率压到 1.5Mbps 以下，**文件别超过 4MB**，否则手机上加载很慢。

**什么都不填**的话，用内置的深紫夜色渐变，也好看，而且最快。

图片建议尺寸：1920×1080，重点内容放在画面中间偏上，
因为底部会被遮罩压暗、手机上两侧会被裁掉。

### 调文字

`title` 是最大的那行字，`hi` 是上面那行英文小标（会自动转大写），
`quote` 是那半透明玻璃卡片里的句子。留空 `quote: ""` 会把卡片整个隐藏。

**只想要普通首页、不要这个全屏页？** 把 `index.html` 里的
`<section class="splash" ...>...</section>` 整段删掉即可，其余不受影响。

### 首页三栏结构

首屏往下滚，是三栏的仪表盘布局：

| 位置 | 内容 |
| --- | --- |
| **左栏** | 个人卡（头像/昵称/签名/社交/统计）、音乐播放器、分类、标签 |
| **中栏** | 时间线，按「年.月」分组，从新到旧 |
| **右栏** | 动态（最近四篇摘要）、日历（有文章的日子带小点）、站点信息 |

整页背景由 `SITE.homeBg` 控制：

```js
homeBg: "assets/uploads/bg.jpg",
```

留空就是深紫渐变。**建议选深色、低对比、有纵深的图**，因为上面压了磨砂玻璃卡片，
太花太亮的图会让文字看不清。

三栏样式全部以 `g-` 开头（`g-card` / `g-profile` / `g-posth` 等）。
**五个页面共用这套深色磨砂风格**：

| 页面 | 中栏内容 |
| --- | --- |
| `index.html` | 分类标签栏 + 文章卡片列表（左文右图） |
| `moments.html` | 动态——短句 + 搜索 + 标签筛选 |
| `writing.html` | 同上文章列表，带 URL 参数筛选 |
| `album.html` | 相册网格 |
| `links.html` | 网址导航卡片 |
| `timeline.html` | 时间线——**只记站点改动，不放文章** |
| `post.html` | 没有侧栏，一张居中的阅读卡（`.g-article`） |
| `about.html` | 关于内容（静态写在 HTML 里） |

中栏由 `<div class="app" data-page="...">` 的 `data-page` 决定：
`timeline` / `moments` / `album` / `links` 各渲染对应内容、
`about` 保留 HTML 里写好的内容、其他（空/`writing`）渲染文章列表。

### 三种内容各管一件事

| 类型 | 位置 | 用途 |
| --- | --- | --- |
| **文章** | `data.js` 的 `POSTS` | 正经写完的长内容 |
| **动态** | `data.js` 的 `moments` | 一两句话的碎片，可以配图 |
| **时间线** | `data.js` 的 `timeline` | 站点的重大改动记录 |

动态的格式：

```js
moments: [
  {
    date: "2026-10-26 22:30",
    text: "今天发生的事，一两句话就行。",
    images: ["assets/uploads/a.jpg"], // 留空 [] 就是纯文字
    tags: ["生活"],
  },
],
```

### 相册和导航

```js
album: [{ src: "assets/uploads/1.jpg", caption: "说明", date: "2026-10-26" }],
links: [{ name: "GitHub", url: "https://...", desc: "一句话", icon: "code" }],
```

`links` 的 `icon` 可选：`code` / `video` / `play` / `cloud` / `image` / `book` / `mail` / `layers`。

### 时间线只记改动

`data.js` 里的 `timeline` 数组，和文章是两套东西：

```js
timeline: [
  { date: "2026-10-26", title: "改了布局", desc: "一句话说明", tags: ["改版"] },
],
```

**加新条目时**：复制一条，改日期和内容即可。它会自动按「年.月」分组、从新到旧排。

### 左栏公告

`SITE.notice` 里写一句话，会显示在左栏个人卡下面。留空就不显示这张卡。

---

## 三、图片放哪儿

1. 把图片丢进 `assets/uploads/`（这个文件夹需要你自己建）
2. 在 `data.js` 里填路径：`"assets/uploads/cover-1.jpg"`

**建议尺寸**：卡片封面 `800×500`（16:10），详情页顶部图 `1200×675`（16:9）。
单张压到 300KB 以内，打开才快。可以用 [squoosh.app](https://squoosh.app) 压。

没有封面也不会难看——会自动显示斜线纹理占位。

头像：方形图，存成 `assets/uploads/avatar.jpg`，然后在 `SITE.avatar` 填路径。

---

## 四、两种皮肤

**默认是「淡紫版」**，右上角**调色盘**按钮可在两版之间切换：

- **淡紫版（soft）**：淡紫底、圆角卡片、柔和紫色投影、彩色标签，冷调、偏中性
- **极简黑白版（minimal）**：无圆角、无阴影、细线分隔，偏克制

配色取自 Reze 的紫调：主色 `#7a5cb8`，置顶标记用品红 `#c04a80` 作点缀。
整体压在冷色区间（青 → 蓝紫 → 紫 → 品红），刻意避开黄绿，
以免跳出一块暖色破坏气质——这也正是「偏中性」的关键。

右上角**月亮/太阳**按钮切换深浅色。两个选择都会记住，下次打开还是你选的那个。

### 改默认皮肤

改四个 HTML 文件第一行的 `data-skin` 值（`soft` 或 `minimal`）：

```html
<html lang="zh-CN" data-theme="light" data-skin="soft">
```

### 想换主色

改 `style.css` 里 `[data-skin="soft"]` 那一段的两个变量即可，全站跟着变：

```css
--bg: #f3effc;     /* 页面底色 */
--accent: #7a5cb8; /* 主色：按钮、选中态、链接 */
```

### 标签颜色是怎么来的

不是随机的，也不是按名字哈希（那样很容易撞色，实测 9 个标签撞了两次）。
站里按标签出现次数从多到少排序，依次从 `main.js` 顶部的 `HUE_POOL` 色相池取色：

- 前 10 个热门标签，颜色保证互不相同
- 同一个标签在侧栏、文末、任何页面都是同一个颜色
- 想换配色，改这个数组里的数字（0–360 是色相环角度）

```js
// 全部压在 180–342 的冷色区间：青 → 蓝紫 → 紫 → 品红
var HUE_POOL = [180, 198, 216, 234, 252, 270, 288, 306, 324, 342];
```

分类用固定色：技术 = 蓝紫 252、生活 = 青 198、作品 = 品红 306。改 `CAT_HUE` 即可。

### 没有封面图时

不会留白。系统按文章在列表里的位置算出一个色相，自动生成柔和渐变块，
相邻两张一定错开，中间显示分类名。哪怕一张图都没传，首页看起来也是完整的。

### 动态背景

淡紫版背后有两层缓慢漂移的光晕，纯 CSS 实现（`body::before` / `body::after`），
不加载任何图片或第三方库，只在淡紫版出现，极简黑白版保持纯净。

- 想调强弱：改 `style.css` 里那几处 `rgba(150, 118, 226, 0.26)` 的最后一个数字
- 想关掉：把 `[data-skin="soft"] body::before` 的 `display: block` 改成 `none`
- 动画用 `transform` 做的，不重排布局，滚动时不掉帧
- 系统开了「减少动态效果」时，动画会自动停

### 背景音乐

左下角有个唱片按钮，播放时图标会转。

**必须先说明一件事**：浏览器不允许网页自动播放声音。这不是代码没写好，
是 Chrome / Edge / Safari 统一的规范——用户必须先有一次点击，才允许出声。
所以任何说「打开就自动响」的教程，实际上都在违规或者靠用户提前点过。

用法：**已经自带一段 48 秒的原创环境音**（`assets/audio/bgm.wav`，四和弦缓慢交替，
自己写代码合成的，没有任何版权问题），所以点按钮就能听。

想换成自己的歌：

1. 把音频放进 `assets/audio/`
2. 改 `data.js` 里的这一行：

```js
bgm: "assets/audio/你的歌.mp3",
```

改路径就行，不用改名。找不到文件时点按钮会弹提示，不会报错，也不会卡住页面。

放自己的歌之前想清楚三件事：

1. **版权** — 公开站点别用有版权的歌，找无版权音源或用自己录的
2. **体积** — 一首 3 分钟的 mp3 约 3MB，比整个站（121KB）大 25 倍，
   手机流量用户会明显感觉到慢。建议压到 2MB 以内，或只截一段循环
3. **礼貌** — 默认不响、要用户主动点，这个设计本身就是对的

---

## 五、本地怎么看

**最简单**：双击 `index.html`。

**更接近线上**（推荐，能测相对路径）：装个 Python，然后在 `reze-blog` 目录里跑：

```bash
python -m http.server 8080
```

浏览器打开 `http://localhost:8080`。

---

## 六、上线到阿里云（备案路线）

顺序不能颠倒：

1. **等域名实名通过**（1–3 个工作日，阿里云控制台看状态）
2. **买服务器**：轻量应用服务器最低配就够（静态站几乎不吃资源），
   系统镜像选 Ubuntu 22.04 或 Alibaba Cloud Linux
3. **备案**：在阿里云「ICP 备案」里提交，需要域名实名已满 3 天、服务器已购买，
   个人备案约 7–20 个工作日，期间网站不能对外访问
4. **备案通过后**：域名解析到服务器公网 IP（A 记录）
5. **传文件**：把 `reze-blog` 里的全部内容传到服务器 `/var/www/reze/`
6. **装 Nginx** 并配置（见下）

### Nginx 配置

```nginx
server {
    listen 80;
    server_name reze520.top www.reze520.top;
    root /var/www/reze;
    index index.html;

    error_page 404 /404.html;

    # 静态资源缓存
    location ~* \.(css|js|jpg|jpeg|png|webp|svg|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # 开 gzip，文字内容压得更小
    gzip on;
    gzip_types text/css application/javascript text/html image/svg+xml;
    gzip_min_length 1024;
}
```

传文件用 WinSCP 或命令行：

```bash
scp -r ./reze-blog/* root@你的服务器IP:/var/www/reze/
```

### 备案号要挂出来

备案通过后，把 `data.js` 里的 `icp` 改成真实号码（如 `苏ICP备2026000000号-1`），
页脚会自动显示。**国内备案要求页脚可见备案号并链接到 beian.miit.gov.cn**，
现在页脚已留位置，改这一个字段就行。

### 免费 HTTPS

```bash
apt install certbot python3-certbot-nginx
certbot --nginx -d reze520.top -d www.reze520.top
```

证书 90 天自动续期，装完就忘掉它。

---

## 七、SEO 已经替你做了

- `robots.txt`：允许抓取，指向 sitemap
- `sitemap.xml`：已列好所有页面，**加新文章后记得补一条**
- 每页都有 `title` / `description` / `og:` 标签
- 上线后去[百度搜索资源平台](https://ziyuan.baidu.com/)提交 sitemap，
  否则百度可能很久才发现你

---

## 八、目录结构

```
reze-blog/
├── index.html          首页
├── writing.html        全部文章（带分类筛选）
├── post.html           文章详情（靠 ?id= 参数）
├── about.html          关于 + 作品
├── 404.html            404 页
├── robots.txt
├── sitemap.xml
└── assets/
    ├── css/style.css   全部样式（双皮肤、动态背景、首屏）
    ├── js/data.js      ★ 内容、首屏、社交链接都在这里改
    ├── js/main.js      渲染逻辑
    ├── audio/bgm.wav   背景音乐（可换成自己的 mp3）
    └── uploads/        你放图片的地方
```

---

## 附：搜索与快捷键

顶栏最左边那个放大镜就是搜索，也可以按 **Ctrl + K**（Mac 是 ⌘ + K）直接唤起。

- 搜的是**标题、标签、分类、正文全文**，不只是标题
- 多个词用**空格**隔开，表示"都要有"，比如 `搬家 雨`
- 标题命中的排前面，标签命中次之
- `↑ ↓` 选，`Enter` 打开，`Esc` 关闭
- 完全在浏览器里跑，不需要服务器，也不会把你的搜索词发出去

搜索最多几十毫秒，因为索引是在页面加载时建好的。文章涨到几百篇也依然很快
（如果真到了那个量级，可以给它加个防抖）。

### 另外两个小东西

- **页面切换过渡**：用浏览器原生的 View Transitions，进入新页面会轻微淡入上移。
  只有较新的 Chrome / Edge / Safari 支持，老浏览器直接跳转，不影响使用。
- **回到顶部**：往下滚超过 600px，右下角会出现一个箭头按钮。

---

## 九、常见问题

**改了文章但页面没变？**
浏览器缓存。Ctrl + F5 强制刷新。

**详情页白屏？**
看网址里 `?id=` 后面的值和 `data.js` 里的 `id` 是否完全一致（区分大小写）。

**想加评论？**
静态站没后端。两个轻量方案：giscus（基于 GitHub Discussions，免费无广告）
或 Waline（需要一台小服务器）。要加跟我说。

**想换字体？**
`style.css` 顶部的 `--sans` 和 `--serif` 改成你想要的字体栈。
不建议引外链字体，国内加载慢。
