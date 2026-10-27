/* ============================================================
   reze520.top · 内容数据
   ------------------------------------------------------------
   这个文件是整个站唯一需要你手动改的地方。
   加一篇新文章 = 在 POSTS 数组里加一个 { ... } 对象，复制上一篇改内容即可。

   字段说明：
   id      唯一标识，英文短横线，会出现在网址里：post.html?id=xxx
   title   标题
   date    发布日期 YYYY-MM-DD
   updated 更新日期（没有就留空字符串）
   cat     分类：技术 / 生活 / 作品（分类会自动统计）
   tags    标签数组
   cover   封面图，留空则显示占位纹理
           放图方式：把图片存到 assets/uploads/ 下，
           然后这里写 "assets/uploads/你的图.jpg"
           建议尺寸 800×500（16:10），单张别超过 300KB
   pinned  true 表示置顶
   excerpt 摘要，列表里显示两行
   content 正文，HTML 片段（段落用 <p>，小标题 <h2><h3>，
           代码 <pre><code>，引用 <blockquote>，列表 <ul><li>）
   ============================================================ */

window.SITE = {
  name: "伤心公主",
  en: "sad princess",
  domain: "reze520.top",
  slogan: "什么都沾一点，想到什么记什么。",
  intro:
    "这里是我的自留地。生活、兴趣、随手做的小东西，还有那些没头没尾的想法，都放在这儿。没有推荐算法，也不会突然消失。",
  email: "1806754672@qq.com",
  github: "https://github.com/Reze520",
  // 侧栏的社交按钮，顺序即显示顺序。icon 可选：github / bili / douyin / mail
  social: [
    { name: "GitHub", icon: "github", url: "https://github.com/Reze520" },
    { name: "哔哩哔哩", icon: "bili", url: "https://space.bilibili.com/234451938" },
    { name: "抖音", icon: "douyin", url: "https://v.douyin.com/jY-UScBpfDE/" },
    { name: "邮箱", icon: "mail", url: "mailto:1806754672@qq.com" },
  ],
  startYear: 2026,
  avatar: "assets/uploads/avatar.gif", // 头像：留空显示「蕾」字
  icp: "待备案", // 备案下来后填：苏ICP备2026xxxxxx号-1

  // 背景音乐
  bgm: "assets/audio/song.mp3",

  // 播放器上显示的歌名和歌手（改歌时记得一起改）
  song: {
    title: "容易受伤的女人",
    artist: "王菲",
    cover: "assets/uploads/cover.png", // 播放器圆盘上显示的专辑封面
  },

  // 歌词：把 .lrc 文件里的内容整段粘进来（带 [00:12.34] 时间戳的那种）
  // 留空则歌词面板显示"暂无歌词"
  lyrics: `[00:00.00]容易受伤的女人 - 王菲 (Faye Wong)
[00:17.00]人渐醉了夜更深
[00:21.00]在这一刻多么接近
[00:25.00]思想仿似在摇撼
[00:29.00]矛盾也更深
[00:32.00]曾被破碎过的心
[00:36.00]让你今天轻轻贴近
[00:40.00]多少安慰及疑问
[00:43.00]偷偷的再生
[00:46.00]情难自禁
[00:48.00]我却其实属于
[00:50.00]极度容易受伤的女人
[00:54.00]不要不要
[00:55.00]不要骤来骤去
[00:57.00]请珍惜我的心
[01:01.00]如明白我
[01:02.00]继续情愿热恋
[01:04.00]这个容易受伤的女人
[01:08.00]不要等
[01:10.00]这一刻请热吻
[01:16.00]长夜有你醉也真
[01:19.00]让我终于找到信任
[01:23.00]不管一切是疑问
[01:27.00]快乐是情人
[01:59.00]曾害怕了这一生
[02:03.00]是你始终甘心靠近
[02:07.00]我方知拥有着缘份
[02:10.00]重建我信心
[02:14.00]曾被破碎过的心
[02:17.00]让你今天轻轻贴近
[02:21.00]多少安慰及疑问
[02:25.00]偷偷的再生
[02:28.00]情难自禁
[02:30.00]我却其实属于
[02:32.00]极度容易受伤的女人
[02:35.00]不要不要
[02:37.00]不要骤来骤去
[02:39.00]请珍惜我的心
[02:43.00]如明白我
[02:44.00]继续情愿热恋
[02:46.00]这个容易受伤的女人
[02:50.00]终此一生
[02:52.00]也火般的热吻
[02:58.00]长夜有你醉也真
[03:01.00]让我终于找到信任
[03:05.00]不管一切是疑问
[03:09.00]快乐是情人
[03:12.00]情难自禁
[03:13.00]我却其实属于
[03:15.00]极度容易受伤的女人
[03:19.00]不要不要
[03:21.00]不要骤来骤去
[03:23.00]请珍惜我的心
[03:26.00]如明白我
[03:28.00]继续情愿热恋
[03:30.00]这个容易受伤的女人
[03:33.00]不要等
[03:36.00]这一刻请热吻
[03:41.00]长夜有你醉也真
[03:45.00]让我终于找到信任
[03:48.00]不管一切是疑问
[03:52.00]快乐是情人`,

  // 首页三栏的背景大图：数组里可以放多张，外观设置面板里可切换（会记住选择）
  // homeBg 是旧字段，留作单图兜底；数组非空时以数组为准
  homeBg: "",
  homeBgs: [
    "assets/uploads/bg1.jpg", // 雨夜伞下
    "assets/uploads/bg3.jpg", // 白发黑西装（已锐化增强）
    "assets/uploads/bg.jpg",  // 夏日海滩
    "assets/uploads/bg5.jpg", // 月下花枝（最早那款背景）
  ],

  // 左栏公告，留空就不显示这张卡
  notice: "这里记录生活、兴趣，还有那些没头没尾的想法。不追热点，不定更新计划，想到就写。",

  // ---------- 动态（说说 / 碎碎念） ----------
  // images 留空就是纯文字，填了就在下面显示图片（可多张）
  moments: [
    {
      date: "2026-10-26 23:40",
      text: "站改完了，十一点半才收。本来想加的东西最后没加，太困了，明天再说。",
      images: [],
      tags: ["建站"],
    },
    {
      date: "2026-10-25 21:10",
      text: "楼下便利店换了个阿姨收银，说话慢慢的。我买水她说天冷了别喝太冰的。我哦了一声，其实我拿的是常温的，也没好意思说。",
      images: [],
      tags: ["生活"],
    },
    {
      date: "2026-10-20 19:40",
      text: "出门的时候天还是灰的，回来路上抬头看见那种很薄的金色。站那儿看了两分钟，旁边有人以为我在等谁。",
      images: [],
      tags: ["随手记"],
    },
    {
      date: "2026-10-12 23:05",
      text: "整理硬盘翻出三年前一个文件夹，十几个文件全都是写了一半的。本来打算删，一个一个点开看完，又都留着了。占地方就占地方吧。",
      images: [],
      tags: ["随手记"],
    },
  ],

  // ---------- 网址导航 ----------
  links: [
    { cat: "AI 工具", name: "DeepSeek", url: "https://chat.deepseek.com", desc: "推理与代码", fav: "assets/icons/chat.deepseek.com.png" },
    { cat: "AI 工具", name: "Kimi", url: "https://kimi.moonshot.cn", desc: "长文阅读", fav: "assets/icons/kimi.moonshot.cn.ico" },
    { cat: "AI 工具", name: "豆包", url: "https://www.doubao.com", desc: "字节 AI 助手", fav: "assets/icons/doubao.com.png" },
    { cat: "AI 工具", name: "通义千问", url: "https://tongyi.aliyun.com", desc: "阿里 AI 助手", fav: "assets/icons/tongyi.aliyun.com.png" },
    { cat: "AI 工具", name: "腾讯元宝", url: "https://yuanbao.tencent.com", desc: "接公众号语料", fav: "assets/icons/yuanbao.tencent.com.png" },
    { cat: "AI 工具", name: "文心一言", url: "https://yiyan.baidu.com", desc: "百度 AI 助手", fav: "assets/icons/yiyan.baidu.com.png" },
    { cat: "AI 工具", name: "智谱清言", url: "https://chatglm.cn", desc: "GLM 系列", fav: "assets/icons/chatglm.cn.ico" },
    { cat: "AI 工具", name: "讯飞星火", url: "https://xinghuo.xfyun.cn", desc: "语音能力强", fav: "assets/icons/xinghuo.xfyun.cn.png" },
    { cat: "AI 工具", name: "秘塔 AI 搜索", url: "https://metaso.cn", desc: "无广告检索", fav: "assets/icons/metaso.cn.png" },
    { cat: "AI 工具", name: "天工 AI", url: "https://www.tiangong.cn", desc: "搜索 + 写作", fav: "assets/icons/tiangong.cn.png" },
    { cat: "AI 工具", name: "海螺 AI", url: "https://hailuoai.com", desc: "语音与视频", fav: "assets/icons/hailuoai.com.png" },
    { cat: "AI 工具", name: "即梦 AI", url: "https://jimeng.jianying.com", desc: "文生图 / 视频", fav: "assets/icons/jimeng.jianying.com.ico" },
    { cat: "AI 工具", name: "可灵 AI", url: "https://klingai.com", desc: "文生视频", fav: "assets/icons/klingai.com.png" },
    { cat: "AI 工具", name: "Claude", url: "https://claude.ai", desc: "Anthropic", fav: "assets/icons/claude.ai.png" },
    { cat: "AI 工具", name: "Midjourney", url: "https://www.midjourney.com", desc: "AI 绘画", fav: "assets/icons/midjourney.com.png" },
    { cat: "开发技术", name: "GitHub", url: "https://github.com", desc: "代码托管", fav: "assets/icons/github.com.svg" },
    { cat: "开发技术", name: "Gitee", url: "https://gitee.com", desc: "国内代码托管", fav: "assets/icons/gitee.com.ico" },
    { cat: "开发技术", name: "MDN", url: "https://developer.mozilla.org", desc: "前端文档", fav: "assets/icons/developer.mozilla.org.png" },
    { cat: "开发技术", name: "菜鸟教程", url: "https://www.runoob.com", desc: "入门教程", fav: "assets/icons/runoob.com.png" },
    { cat: "开发技术", name: "菜鸟工具", url: "https://c.runoob.com", desc: "在线小工具", fav: "assets/icons/c.runoob.com.png" },
    { cat: "开发技术", name: "Stack Overflow", url: "https://stackoverflow.com", desc: "英文问答", fav: "assets/icons/stackoverflow.com.ico" },
    { cat: "开发技术", name: "掘金", url: "https://juejin.cn", desc: "中文技术社区", fav: "assets/icons/juejin.cn.png" },
    { cat: "开发技术", name: "CSDN", url: "https://www.csdn.net", desc: "中文技术博客", fav: "assets/icons/csdn.net.ico" },
    { cat: "开发技术", name: "博客园", url: "https://www.cnblogs.com", desc: "老牌技术博客", fav: "assets/icons/cnblogs.com.png" },
    { cat: "开发技术", name: "开源中国", url: "https://www.oschina.net", desc: "开源资讯", fav: "assets/icons/oschina.net.png" },
    { cat: "开发技术", name: "Can I use", url: "https://caniuse.com", desc: "兼容性查询", fav: "assets/icons/caniuse.com.png" },
    { cat: "开发技术", name: "CodePen", url: "https://codepen.io", desc: "前端在线实验", fav: "assets/icons/codepen.io.ico" },
    { cat: "开发技术", name: "Cloudflare", url: "https://dash.cloudflare.com", desc: "部署与 CDN", fav: "assets/icons/dash.cloudflare.com.ico" },
    { cat: "开发技术", name: "npm", url: "https://www.npmjs.com", desc: "包管理", fav: "assets/icons/npmjs.com.png" },
    { cat: "开发技术", name: "力扣", url: "https://leetcode.cn", desc: "刷题", fav: "assets/icons/leetcode.cn.ico" },
    { cat: "开发技术", name: "ES6 教程", url: "https://es6.ruanyifeng.com", desc: "阮一峰", fav: "assets/icons/es6.ruanyifeng.com.ico" },
    { cat: "开发技术", name: "阿里云", url: "https://www.aliyun.com", desc: "云服务", fav: "assets/icons/aliyun.com.png" },
    { cat: "开发技术", name: "腾讯云", url: "https://cloud.tencent.com", desc: "云服务", fav: "assets/icons/cloud.tencent.com.png" },
    { cat: "设计素材", name: "阿里图标库", url: "https://www.iconfont.cn", desc: "免费图标", fav: "assets/icons/iconfont.cn.png" },
    { cat: "设计素材", name: "Iconify", url: "https://icon-sets.iconify.design", desc: "图标聚合", fav: "assets/icons/icon-sets.iconify.design.png" },
    { cat: "设计素材", name: "Coolors", url: "https://coolors.co", desc: "配色生成", fav: "assets/icons/coolors.co.png" },
    { cat: "设计素材", name: "Figma", url: "https://www.figma.com", desc: "在线设计", fav: "assets/icons/figma.com.png" },
    { cat: "设计素材", name: "TinyPNG", url: "https://tinypng.com", desc: "图片压缩", fav: "assets/icons/tinypng.com.png" },
    { cat: "设计素材", name: "花瓣网", url: "https://huaban.com", desc: "灵感采集", fav: "assets/icons/huaban.com.png" },
    { cat: "设计素材", name: "稿定设计", url: "https://www.gaoding.com", desc: "模板做图", fav: "assets/icons/gaoding.com.png" },
    { cat: "设计素材", name: "创客贴", url: "https://www.chuangkit.com", desc: "在线设计", fav: "assets/icons/chuangkit.com.ico" },
    { cat: "设计素材", name: "站酷", url: "https://www.zcool.com.cn", desc: "设计师社区", fav: "assets/icons/zcool.com.cn.png" },
    { cat: "设计素材", name: "100font", url: "https://www.100font.com", desc: "免费商用字体", fav: "assets/icons/100font.com.png" },
    { cat: "设计素材", name: "Unsplash", url: "https://unsplash.com", desc: "免费图库", fav: "assets/icons/unsplash.com.ico" },
    { cat: "设计素材", name: "Pexels", url: "https://www.pexels.com", desc: "免费图库", fav: "assets/icons/pexels.com.png" },
    { cat: "设计素材", name: "Pixabay", url: "https://pixabay.com", desc: "免费素材", fav: "assets/icons/pixabay.com.png" },
    { cat: "设计素材", name: "改图宝", url: "https://www.gaitubao.com", desc: "在线改尺寸", fav: "assets/icons/gaitubao.com.png" },
    { cat: "设计素材", name: "Canva", url: "https://www.canva.com", desc: "在线设计", fav: "assets/icons/canva.com.jpg" },
    { cat: "效率工具", name: "语雀", url: "https://www.yuque.com", desc: "文档知识库", fav: "assets/icons/yuque.com.png" },
    { cat: "效率工具", name: "飞书", url: "https://www.feishu.cn", desc: "协作办公", fav: "assets/icons/feishu.cn.png" },
    { cat: "效率工具", name: "Excalidraw", url: "https://excalidraw.com", desc: "手绘风白板", fav: "assets/icons/excalidraw.com.png" },
    { cat: "效率工具", name: "ProcessOn", url: "https://www.processon.com", desc: "流程图", fav: "assets/icons/processon.com.ico" },
    { cat: "效率工具", name: "草料二维码", url: "https://cli.im", desc: "二维码生成", fav: "assets/icons/cli.im.ico" },
    { cat: "效率工具", name: "石墨文档", url: "https://shimo.im", desc: "在线文档", fav: "assets/icons/shimo.im.ico" },
    { cat: "效率工具", name: "金山文档", url: "https://www.kdocs.cn", desc: "WPS 云文档", fav: "assets/icons/kdocs.cn.png" },
    { cat: "效率工具", name: "腾讯文档", url: "https://docs.qq.com", desc: "在线表格", fav: "assets/icons/docs.qq.com.ico" },
    { cat: "效率工具", name: "幕布", url: "https://mubu.com", desc: "大纲笔记", fav: "assets/icons/mubu.com.png" },
    { cat: "效率工具", name: "坚果云", url: "https://www.jianguoyun.com", desc: "文件同步", fav: "assets/icons/jianguoyun.com.png" },
    { cat: "效率工具", name: "奶牛快传", url: "https://cowtransfer.com", desc: "大文件传输", fav: "assets/icons/cowtransfer.com.png" },
    { cat: "效率工具", name: "iLovePDF", url: "https://www.ilovepdf.com", desc: "PDF 处理", fav: "assets/icons/ilovepdf.com.png" },
    { cat: "效率工具", name: "Aconvert", url: "https://www.aconvert.com", desc: "格式转换", fav: "assets/icons/aconvert.com.ico" },
    { cat: "效率工具", name: "讯飞听见", url: "https://www.iflyrec.com", desc: "录音转文字", fav: "assets/icons/iflyrec.com.png" },
    { cat: "效率工具", name: "少数派", url: "https://sspai.com", desc: "效率内容", fav: "assets/icons/sspai.com.ico" },
    { cat: "新闻时政", name: "人民网", url: "http://www.people.com.cn", desc: "人民日报", fav: "assets/icons/people.com.cn.ico" },
    { cat: "新闻时政", name: "新华网", url: "http://www.news.cn", desc: "新华社", fav: "assets/icons/news.cn.png" },
    { cat: "新闻时政", name: "央视网", url: "https://www.cctv.com", desc: "中央电视台", fav: "assets/icons/cctv.com.ico" },
    { cat: "新闻时政", name: "中国新闻网", url: "https://www.chinanews.com.cn", desc: "中新社", fav: "assets/icons/chinanews.com.cn.svg" },
    { cat: "新闻时政", name: "中国日报", url: "https://www.chinadaily.com.cn", desc: "英文时政", fav: "assets/icons/chinadaily.com.cn.png" },
    { cat: "新闻时政", name: "光明网", url: "https://www.gmw.cn", desc: "光明日报", fav: "assets/icons/gmw.cn.ico" },
    { cat: "新闻时政", name: "环球网", url: "https://www.huanqiu.com", desc: "国际新闻", fav: "assets/icons/huanqiu.com.png" },
    { cat: "新闻时政", name: "参考消息", url: "https://www.cankaoxiaoxi.com", desc: "外媒编译", fav: "assets/icons/cankaoxiaoxi.com.svg" },
    { cat: "新闻时政", name: "澎湃新闻", url: "https://www.thepaper.cn", desc: "深度报道", fav: "assets/icons/thepaper.cn.ico" },
    { cat: "新闻时政", name: "界面新闻", url: "https://www.jiemian.com", desc: "财经新闻", fav: "assets/icons/jiemian.com.png" },
    { cat: "新闻时政", name: "财新网", url: "https://www.caixin.com", desc: "财经调查", fav: "assets/icons/caixin.com.ico" },
    { cat: "新闻时政", name: "第一财经", url: "https://www.yicai.com", desc: "财经资讯", fav: "assets/icons/yicai.com.png" },
    { cat: "新闻时政", name: "观察者网", url: "https://www.guancha.cn", desc: "时评", fav: "assets/icons/guancha.cn.png" },
    { cat: "新闻时政", name: "南方周末", url: "https://www.infzm.com", desc: "深度长文", fav: "assets/icons/infzm.com.svg" },
    { cat: "新闻时政", name: "联合早报", url: "https://www.zaobao.com.sg", desc: "新加坡视角", fav: "assets/icons/zaobao.com.sg.png" },
    { cat: "政府服务", name: "中国政府网", url: "https://www.gov.cn", desc: "政策文件", fav: "assets/icons/gov.cn.svg" },
    { cat: "政府服务", name: "国家统计局", url: "https://www.stats.gov.cn", desc: "统计数据", fav: "assets/icons/stats.gov.cn.svg" },
    { cat: "政府服务", name: "教育部", url: "http://www.moe.gov.cn", desc: "教育政策", fav: "assets/icons/moe.gov.cn.svg" },
    { cat: "政府服务", name: "人社部", url: "http://www.mohrss.gov.cn", desc: "就业社保", fav: "assets/icons/mohrss.gov.cn.svg" },
    { cat: "政府服务", name: "国家税务总局", url: "https://www.chinatax.gov.cn", desc: "税务政策", fav: "assets/icons/chinatax.gov.cn.svg" },
    { cat: "政府服务", name: "国家医保局", url: "http://www.nhsa.gov.cn", desc: "医保政策", fav: "assets/icons/nhsa.gov.cn.svg" },
    { cat: "政府服务", name: "外交部", url: "https://www.mfa.gov.cn", desc: "外交表态", fav: "assets/icons/mfa.gov.cn.svg" },
    { cat: "政府服务", name: "共产党员网", url: "https://www.12371.cn", desc: "党建学习", fav: "assets/icons/12371.cn.png" },
    { cat: "政府服务", name: "学信网", url: "https://www.chsi.com.cn", desc: "学历查询", fav: "assets/icons/chsi.com.cn.png" },
    { cat: "政府服务", name: "中国人事考试网", url: "http://www.cpta.com.cn", desc: "资格考试", fav: "assets/icons/cpta.com.cn.svg" },
    { cat: "政府服务", name: "国家政务服务平台", url: "http://gjzwfw.www.gov.cn", desc: "一网通办", fav: "assets/icons/gjzwfw.www.gov.cn.ico" },
    { cat: "政府服务", name: "学习强国", url: "https://www.xuexi.cn", desc: "时政学习", fav: "assets/icons/xuexi.cn.ico" },
    { cat: "社交社区", name: "微博", url: "https://weibo.com", desc: "公共讨论", fav: "assets/icons/weibo.com.ico" },
    { cat: "社交社区", name: "知乎", url: "https://www.zhihu.com", desc: "问答社区", fav: "assets/icons/zhihu.com.png" },
    { cat: "社交社区", name: "豆瓣", url: "https://www.douban.com", desc: "书影音标记", fav: "assets/icons/douban.com.png" },
    { cat: "社交社区", name: "百度贴吧", url: "https://tieba.baidu.com", desc: "兴趣贴吧", fav: "assets/icons/tieba.baidu.com.ico" },
    { cat: "社交社区", name: "小红书", url: "https://www.xiaohongshu.com", desc: "生活分享", fav: "assets/icons/xiaohongshu.com.ico" },
    { cat: "社交社区", name: "抖音", url: "https://www.douyin.com", desc: "短视频", fav: "assets/icons/douyin.com.png" },
    { cat: "社交社区", name: "哔哩哔哩", url: "https://www.bilibili.com", desc: "中长视频", fav: "assets/icons/bilibili.com.png" },
    { cat: "社交社区", name: "即刻", url: "https://okjike.com", desc: "话题圈子", fav: "assets/icons/okjike.com.svg" },
    { cat: "学术文献", name: "中国知网", url: "https://www.cnki.net", desc: "期刊论文", fav: "assets/icons/cnki.net.ico" },
    { cat: "学术文献", name: "万方数据", url: "https://www.wanfangdata.com.cn", desc: "期刊学位", fav: "assets/icons/wanfangdata.com.cn.ico" },
    { cat: "学术文献", name: "维普", url: "http://www.cqvip.com", desc: "中文期刊", fav: "assets/icons/cqvip.com.ico" },
    { cat: "学术文献", name: "国家哲学社会科学文献中心", url: "https://www.ncpssd.org", desc: "免费人文社科", fav: "assets/icons/ncpssd.org.ico" },
    { cat: "学术文献", name: "百度学术", url: "https://xueshu.baidu.com", desc: "论文检索", fav: "assets/icons/xueshu.baidu.com.ico" },
    { cat: "学术文献", name: "中国大学 MOOC", url: "https://www.icourse163.org", desc: "免费公开课", fav: "assets/icons/icourse163.org.png" },
    { cat: "学术文献", name: "爱课程", url: "https://www.icourses.cn", desc: "高校课程", fav: "assets/icons/icourses.cn.svg" },
    { cat: "学术文献", name: "智慧教育平台", url: "https://higher.smartedu.cn", desc: "国家平台", fav: "assets/icons/higher.smartedu.cn.png" },
    { cat: "学术文献", name: "国家图书馆", url: "http://www.nlc.cn", desc: "馆藏检索", fav: "assets/icons/nlc.cn.png" },
    { cat: "学术文献", name: "ReadPaper", url: "https://readpaper.com", desc: "论文阅读翻译", fav: "assets/icons/readpaper.com.ico" },
    { cat: "金融财经", name: "东方财富", url: "https://www.eastmoney.com", desc: "行情与数据", fav: "assets/icons/eastmoney.com.png" },
    { cat: "金融财经", name: "雪球", url: "https://xueqiu.com", desc: "投资讨论", fav: "assets/icons/xueqiu.com.ico" },
    { cat: "金融财经", name: "同花顺", url: "https://www.10jqka.com.cn", desc: "行情软件", fav: "assets/icons/10jqka.com.cn.png" },
    { cat: "金融财经", name: "新浪财经", url: "https://finance.sina.com.cn", desc: "财经资讯", fav: "assets/icons/finance.sina.com.cn.png" },
    { cat: "金融财经", name: "中国人民银行", url: "http://www.pbc.gov.cn", desc: "货币政策", fav: "assets/icons/pbc.gov.cn.svg" },
    { cat: "金融财经", name: "上海证券交易所", url: "https://www.sse.com.cn", desc: "上交所", fav: "assets/icons/sse.com.cn.svg" },
    { cat: "金融财经", name: "深圳证券交易所", url: "https://www.szse.cn", desc: "深交所", fav: "assets/icons/szse.cn.png" },
    { cat: "金融财经", name: "巨潮资讯", url: "http://www.cninfo.com.cn", desc: "公告披露", fav: "assets/icons/cninfo.com.cn.svg" },
    { cat: "金融财经", name: "中国证监会", url: "http://www.csrc.gov.cn", desc: "监管信息", fav: "assets/icons/csrc.gov.cn.svg" },
    { cat: "金融财经", name: "国家外汇管理局", url: "https://www.safe.gov.cn", desc: "汇率与外汇", fav: "assets/icons/safe.gov.cn.svg" },
    { cat: "数理工具", name: "Desmos", url: "https://www.desmos.com/calculator", desc: "函数画图", fav: "assets/icons/desmos.com.ico" },
    { cat: "数理工具", name: "GeoGebra", url: "https://www.geogebra.org", desc: "几何代数", fav: "assets/icons/geogebra.org.ico" },
    { cat: "数理工具", name: "WolframAlpha", url: "https://www.wolframalpha.com", desc: "符号计算", fav: "assets/icons/wolframalpha.com.ico" },
    { cat: "数理工具", name: "Symbolab", url: "https://www.symbolab.com", desc: "解题步骤", fav: "assets/icons/symbolab.com.ico" },
    { cat: "数理工具", name: "OEIS", url: "https://oeis.org", desc: "整数数列", fav: "assets/icons/oeis.org.png" },
    { cat: "数理工具", name: "MathWorld", url: "https://mathworld.wolfram.com", desc: "数学百科", fav: "assets/icons/mathworld.wolfram.com.ico" },
    { cat: "数理工具", name: "PhET", url: "https://phet.colorado.edu/zh_CN", desc: "物理仿真", fav: "assets/icons/phet.colorado.edu.ico" },
    { cat: "数理工具", name: "数学乐", url: "https://www.shuxuele.com", desc: "中学数学", fav: "assets/icons/shuxuele.com.ico" },
    { cat: "数理工具", name: "可汗学院", url: "https://zh.khanacademy.org", desc: "免费课程", fav: "assets/icons/zh.khanacademy.org.ico" },
    { cat: "人文历史", name: "豆瓣读书", url: "https://book.douban.com", desc: "书评与评分", fav: "assets/icons/book.douban.com.ico" },
    { cat: "人文历史", name: "书格", url: "https://shuge.org", desc: "古籍影印", fav: "assets/icons/shuge.org.ico" },
    { cat: "人文历史", name: "中国哲学书电子化计划", url: "https://ctext.org/zhs", desc: "先秦典籍", fav: "assets/icons/ctext.org.ico" },
    { cat: "人文历史", name: "国学大师", url: "http://www.guoxuedashi.net", desc: "古籍检索", fav: "assets/icons/guoxuedashi.net.jpg" },
    { cat: "人文历史", name: "中国国家博物馆", url: "http://www.chnmuseum.cn", desc: "馆藏与展览", fav: "assets/icons/chnmuseum.cn.svg" },
    { cat: "人文历史", name: "故宫博物院", url: "https://www.dpm.org.cn", desc: "数字文物", fav: "assets/icons/dpm.org.cn.svg" },
    { cat: "人文历史", name: "中国社会科学网", url: "http://www.cssn.cn", desc: "社科学术", fav: "assets/icons/cssn.cn.png" },
    { cat: "影音娱乐", name: "网易云音乐", url: "https://music.163.com", desc: "音乐社区", fav: "assets/icons/music.163.com.ico" },
    { cat: "影音娱乐", name: "QQ 音乐", url: "https://y.qq.com", desc: "曲库", fav: "assets/icons/y.qq.com.png" },
    { cat: "影音娱乐", name: "豆瓣电影", url: "https://movie.douban.com", desc: "评分与影评", fav: "assets/icons/movie.douban.com.png" },
    { cat: "影音娱乐", name: "爱奇艺", url: "https://www.iqiyi.com", desc: "影视剧", fav: "assets/icons/iqiyi.com.png" },
    { cat: "影音娱乐", name: "腾讯视频", url: "https://v.qq.com", desc: "影视综艺", fav: "assets/icons/v.qq.com.jpg" },
    { cat: "影音娱乐", name: "优酷", url: "https://www.youku.com", desc: "影视", fav: "assets/icons/youku.com.ico" },
    { cat: "影音娱乐", name: "芒果 TV", url: "https://www.mgtv.com", desc: "综艺", fav: "assets/icons/mgtv.com.ico" },
    { cat: "漫画阅读", name: "哔哩哔哩漫画", url: "https://manga.bilibili.com", desc: "正版日漫", fav: "assets/icons/manga.bilibili.com.ico" },
    { cat: "漫画阅读", name: "快看漫画", url: "https://www.kuaikanmanhua.com", desc: "原创国漫", fav: "assets/icons/kuaikanmanhua.com.ico" },
    { cat: "漫画阅读", name: "腾讯动漫", url: "https://ac.qq.com", desc: "正版国漫", fav: "assets/icons/ac.qq.com.ico" },
    { cat: "漫画阅读", name: "咚漫", url: "https://www.dongmanmanhua.cn", desc: "韩漫", fav: "assets/icons/dongmanmanhua.cn.ico" },
    { cat: "生活服务", name: "高德地图", url: "https://www.amap.com", desc: "地图导航", fav: "assets/icons/amap.com.ico" },
    { cat: "生活服务", name: "12306", url: "https://www.12306.cn", desc: "火车票", fav: "assets/icons/12306.cn.png" },
    { cat: "生活服务", name: "中国天气", url: "https://www.weather.com.cn", desc: "天气预报", fav: "assets/icons/weather.com.cn.png" },
    { cat: "生活服务", name: "百度翻译", url: "https://fanyi.baidu.com", desc: "中英互译", fav: "assets/icons/fanyi.baidu.com.ico" },
    { cat: "生活服务", name: "DeepL", url: "https://www.deepl.com", desc: "翻译", fav: "assets/icons/deepl.com.png" },
    { cat: "生活服务", name: "淘宝", url: "https://www.taobao.com", desc: "购物", fav: "assets/icons/taobao.com.png" },
    { cat: "生活服务", name: "京东", url: "https://www.jd.com", desc: "购物", fav: "assets/icons/jd.com.png" },
    { cat: "生活服务", name: "美团", url: "https://www.meituan.com", desc: "外卖到店", fav: "assets/icons/meituan.com.png" },
    { cat: "生活服务", name: "大众点评", url: "https://www.dianping.com", desc: "本地生活", fav: "assets/icons/dianping.com.png" },
    { cat: "生活服务", name: "快递100", url: "https://www.kuaidi100.com", desc: "查快递", fav: "assets/icons/kuaidi100.com.png" },
    { cat: "生活服务", name: "携程", url: "https://www.ctrip.com", desc: "机票酒店", fav: "assets/icons/ctrip.com.ico" },
    { cat: "生活服务", name: "QQ 邮箱", url: "https://mail.qq.com", desc: "邮箱", fav: "assets/icons/mail.qq.com.png" },
  ],

  // ---------- 相册 ----------
  // src 填图片路径，caption 是说明
  album: [
    { src: "", caption: "第一张照片", date: "2026-10-26" },
    { src: "", caption: "某个下午", date: "2026-10-20" },
    { src: "", caption: "路边", date: "2026-10-12" },
    { src: "", caption: "窗外", date: "2026-10-01" },
    { src: "", caption: "旧物", date: "2026-09-20" },
    { src: "", caption: "雨后", date: "2026-09-08" },
  ],

  // 时间线：只记站点的重大改动，不是文章
  timeline: [
    {
      date: "2026-10-27",
      title: "导航页扩容至 157 个站点",
      desc: "站点由 58 个扩充到 157 个，按 14 类归档：AI 工具、开发技术、设计素材、效率工具、新闻时政、政府服务、社交社区、学术文献、金融财经、数理工具、人文历史、影音娱乐、漫画阅读、生活服务。\n全部站点在无代理的国内网络下逐个探测，移除 ChatGPT、Gemini、YouTube、Suno、V2EX、Notion、维基百科等 10 个无法访问的入口。\n图标改为本地缓存，157 个站点合计 1.5 MB，不再依赖在线图标服务。\n分类卡片底色加深一档，避免背景图透出影响正文可读性。",
      tags: ["导航", "内容"],
    },
    {
      date: "2026-10-27",
      title: "音乐播放器：曲目列表与播放模式",
      desc: "新增曲目列表，支持切换曲目、上一首 / 下一首。\n播放模式改为顺序循环 / 单曲循环 / 随机三态轮换，选择结果持久化。\n歌词区改为默认收起，由按钮展开。\n修复单曲循环角标与悬浮提示共用伪元素导致的显示异常。",
      tags: ["音乐", "功能"],
    },
    {
      date: "2026-10-27",
      title: "修复音频进度条无法拖动",
      desc: "根因不在音频文件：站点静态资源响应缺少 Accept-Ranges，分段请求返回 200 而非 206，浏览器无法定位播放位置。\n音频资源改由支持分段请求的 CDN 托管，页面主体仍留在原托管，地址前缀集中在一处配置。",
      tags: ["音乐", "修复"],
    },
    {
      date: "2026-10-27",
      title: "欢迎页改为常驻页面顶部",
      desc: "欢迎页不再被隐藏，任意页面向上滚动均可回到。\n站内切换页面时自动落到内容起始位置，无需先划过大屏。\n刷新与深链接的落点分别处理，直接打开文章时不影响阅读。",
      tags: ["体验", "优化"],
    },
    {
      date: "2026-10-27",
      title: "日历并入右栏，移除独立页面",
      desc: "删除独立日历页及全部导航入口，旧链接重定向至首页。\n右栏日历补充农历、节气与节日，标注发布过文章的日期，支持切换月份与回到当月。\n按需求不提供日程与记事功能。",
      tags: ["视觉", "改版"],
    },
    {
      date: "2026-10-27",
      title: "标签体系与列表分页整理",
      desc: "标签由 30 个精简为 7 个：随笔、书评、前端、摘录、情感、英文、影评；仅出现一次的专名标签全部移除。\n文章列表每页由 5 篇调整为 12 篇。\n修复列表筛选函数引用未定义变量导致的运行时报错。",
      tags: ["阅读", "整理"],
    },
    {
      date: "2026-10-27",
      title: "文章与动态文案重写",
      desc: "重写七篇文章与四条动态，删除模板化的段落结论、对偶句式与虚构情节，改为具体叙事。\n文章正文同步至云端存储，旧链接的标识保持不变。",
      tags: ["写作"],
    },
    {
      date: "2026-10-27",
      title: "全站背景支持切换，头像改为动图",
      desc: "三张插画作为可选背景，可在外观设置内切换并记忆，也可设为每次进站随机。\n头像替换为动图。",
      tags: ["视觉", "功能"],
    },
    {
      date: "2026-10-27",
      title: "文章页新增目录",
      desc: "从正文标题自动生成目录，置于右栏，点击跳转并在滚动时高亮当前章节。",
      tags: ["阅读", "导航"],
    },
    {
      date: "2026-10-27",
      title: "改为单页切换，音频跨页不中断",
      desc: "页面切换改为单页路由，导航只更新内容区，播放器不重建，背景音乐跨页连续播放。\n进度条增加透明命中区，支持点击定位与拖动，时长正常显示。",
      tags: ["音乐", "体验"],
    },
    {
      date: "2026-10-27",
      title: "播放器改为唱片机样式",
      desc: "封面放大为带白边的圆盘并随播放旋转；音量条右侧接入律动条与快捷按钮；进度条两端标注时间；播放键改为居中圆形按钮。",
      tags: ["视觉", "音乐"],
    },
    {
      date: "2026-10-27",
      title: "歌词支持三种呈现方式",
      desc: "栏内歌词、右下角悬浮播放器、页面底部单行悬浮歌词，三种方式各自独立开关，布局自适应。",
      tags: ["音乐", "功能"],
    },
    {
      date: "2026-10-27",
      title: "播放器封面替换",
      desc: "播放器与悬浮球改用官方专辑封面图。",
      tags: ["音乐", "视觉"],
    },
    {
      date: "2026-10-26",
      title: "接入背景音乐与歌词",
      desc: "替换背景音乐并内联 LRC 歌词，支持点击展开、随播放进度高亮滚动。",
      tags: ["音乐"],
    },
    {
      date: "2026-10-26",
      title: "顶栏导航改版",
      desc: "三段式居中布局，图标配文字，悬停显示功能提示，次级入口收进更多菜单。",
      tags: ["导航"],
    },
    {
      date: "2026-10-26",
      title: "主页改为完全透明",
      desc: "移除毛玻璃效果，背景原图直出，文字加柔和阴影保证可读，必要时整体压暗两成。",
      tags: ["视觉"],
    },
    {
      date: "2026-10-26",
      title: "新增动态 / 相册 / 网址导航",
      desc: "在文章之外补齐三种内容形态；时间线只记录站点改动，与文章内容分离。",
      tags: ["内容"],
    },
    {
      date: "2026-10-26",
      title: "三栏结构上线",
      desc: "首页、文章、关于统一为左信息栏 + 中内容 + 右动态的三栏布局。",
      tags: ["改版"],
    },
    {
      date: "2026-10-26",
      title: "全文搜索与欢迎首屏",
      desc: "支持搜索正文（Ctrl+K 唤起）；打开站点先显示背景图欢迎页，中央以打字机效果循环展示一句话。",
      tags: ["功能"],
    },
    {
      date: "2026-10-26",
      title: "配色定为淡紫",
      desc: "从黑白极简转为以紫色为主的冷色调，同步完成暗色模式。",
      tags: ["视觉"],
    },
    {
      date: "2026-10-25",
      title: "域名实名通过",
      desc: "reze520.top 完成实名，开始准备服务器与备案。",
      tags: ["上线"],
    },
    {
      date: "2026-10-24",
      title: "站点从零搭建",
      desc: "无框架、无依赖，手写 HTML / CSS / JS，整站静态，国内访问延迟低。",
      tags: ["起点"],
    },
  ],

  // 首屏欢迎页（只影响首页）
  splash: {
    bg: "assets/uploads/bg.jpg", // 背景图：这张是「月下花枝」，左侧留白正好放标题
    video: "", // 背景视频：如 "assets/uploads/hero.mp4"，填了就优先用视频
    hi: "", // 首屏那行英文小标，留空就不显示
    title: "RezeのBlog",
    // 首屏下面那行会自己打字、删除、换下一句
    lines: [
      "凡是过往，皆为序章。",
      "什么都沾一点，想到什么记什么。",
      "夜里也有花开。",
    ],
    quote: "", // 留空就不显示那张签名卡，只留滚动的句子
    quoteFrom: "",
    scrollText: "向下滑动",
  },
};

window.POSTS = [
  {
    id: "why-i-built-this-blog",
    title: "我为什么自己写了一个博客",
    date: "2026-10-26",
    updated: "2026-10-26",
    cat: "技术",
    tags: ["前端", "随笔"],
    cover: "",
    pinned: true,
    excerpt:
      "最早只是想找个地方放东西，别丢就行。后来换过两个平台，东西丢了，才想着自己弄一个。我不会写代码，是一点点试出来的。",
    content: `
<p>最开始没想过自己弄。我就是想找个地方，把随手写的东西和拍的照片放一起，别丢就行。</p>
<p>先用的公众号。发东西要排版，一段一段调，图片还得先传上去，弄到一半就不想弄了。后来又换了个在线日记的网站，写了几个月，某天打开发现它改版了，我以前写的东西到处翻，找了半天才找着，还有几篇干脆没了。</p>
<p>那次之后我就想，要不自己弄一个吧。至少东西放在我自己这儿。</p>
<p>我不会写代码。一开始连 html 是什么都不知道，就知道记事本里写点字、存成 .html 能打开。就从这个开始试的。</p>
<h2>比我想的慢很多</h2>
<p>我以为就是让字显示出来，结果光是让字出现在中间就弄了一晚上。中间还学会了一个词叫控制台，按 F12 会出来一堆红字，我看不懂，只能一行一行地删，看删掉哪句它就不红了。</p>
<p>第一次页面打开的时候我挺高兴，虽然只有一行字，还是黑白的。</p>
<p>后来一点点加。加了个能点的链接，点不开，因为路径写错了。加了张图片，不显示，因为文件名里带了空格。这些现在说起来都是小事，当时每一个都能卡我半天。</p>
<h2>为什么没用现成的</h2>
<p>其实我也下载过。装完打开一看，一堆配置文件，里面全是我不认识的词。我想改个标题都找不到在哪儿，就又删了。</p>
<p>说白了就是我看不懂。与其花时间弄明白别人写的东西，不如就用我自己这几页，笨是笨，但大概知道哪块是干嘛的。</p>
<p>还有一个原因，这站很小，打开很快。我网不好的时候打开别人的站要转半天，打开自己这个基本是瞬间。</p>
<h2>现在</h2>
<p>改了快一个月，还有很多地方不满意。手机上有些地方挤，有的字颜色我调了半天还是觉得不好看。</p>
<p>但它是我的。哪天想删哪块就删哪块，不用问谁。</p>
<p>如果你也想弄一个，我的建议是别一开始就下载框架。找个记事本，打几个字，存成 html，双击打开看一眼。能看到字，剩下的你慢慢就会想改。</p>
`,
  },
  {
    id: "whitespace-is-breathing-room",
    title: "我一开始把页面做得好挤",
    date: "2026-10-20",
    updated: "",
    cat: "技术",
    tags: ["设计", "CSS"],
    cover: "",
    pinned: false,
    excerpt:
      "刚做这个站的时候，页面上一点空都不敢留，每个板块都加边框。后来截图放大看，才发现问题出在哪儿。",
    content: `
<p>这个站我改了很多遍。最开始那一版现在看挺难看的，主要问题是挤。</p>
<p>那时候我的想法是，页面上不能空着。空着就像没做完。所以每个板块我都加了边框，内容之间只留一点点缝，颜色也换了好几个，想让它看起来满一点。</p>
<p>自己看不出来。后来有天在手机上看，看两分钟就觉得累，往下翻的时候眼睛找不到落点。</p>
<h2>空的地方不是浪费</h2>
<p>以前我以为空白就是没东西。现在觉得它更像隔开。</p>
<p>两块内容中间留够了，人自己就知道它们不是一回事，不用再画线。我原来加那么多边框，其实是在补这个没留够的距离。</p>
<p>道理说穿了很简单，但真改的时候我才发现，我根本不会量。我调间距全靠感觉，8、10、12、15，看哪个顺眼用哪个。所以怎么调都有一种说不出的乱。我还以为是颜色的问题，换了好几遍颜色，一点用都没有。</p>
<h2>后来只用几个数</h2>
<p>4、8、16、24、40、64，就这几个，别的不用。想拉开一点就往上跳一档，不要自己造一个 13 出来。</p>
<pre><code>.gap-1 { margin-bottom: 4px; }
.gap-2 { margin-bottom: 8px; }
.gap-3 { margin-bottom: 16px; }
.gap-4 { margin-bottom: 24px; }
.gap-5 { margin-bottom: 40px; }</code></pre>
<p>一开始很别扭，因为有时候我就想要 12 像素，差 4 像素我觉得肯定能看出来。用久了才发现人眼其实分不清，但能感觉出来这些间距是不是一家的。</p>
<h2>字重比字号好用</h2>
<p>这个是看别人的站学的。我以前要强调什么就把字放大，结果一页里四五种字号，看着乱。</p>
<p>现在标题和正文一样大，只把字重加粗、颜色加深。层次出来了，页面也安静不少。</p>
<p>现在看，还是觉得有些地方挤，有些地方空得莫名其妙。这事好像没有做完的时候，隔几天看总能挑出新的毛病。</p>
`,
  },
  {
    id: "css-variables-as-a-way-out",
    title: "加个深色模式，我改了一下午",
    date: "2026-10-12",
    updated: "2026-10-15",
    cat: "技术",
    tags: ["CSS", "前端"],
    cover: "",
    pinned: false,
    excerpt:
      "最开始颜色全是我一个个写死的，想加深色模式的时候，从两点改到六点还没改干净。后来才知道有变量这回事。",
    content: `
<p>这个站有浅色和深色，还有两套皮肤。听起来像模像样，其实我一开始差点被自己坑死。</p>
<p>最开始颜色是直接写死的。背景一个色号，字一个色号，线一个色号，一个一个敲上去。写了两百多行，页面出来了，看着还行。</p>
<p>然后我加了个深色模式。</p>
<p>那天下午两点改到六点。不是改不出来，是改不完。颜色散在几百个地方，改到一半忘了哪些改过，只能从头用搜索一个个找。找到后面眼睛都花，还是漏了两处，深色模式下那两块白得特别刺眼。</p>
<h2>后来才知道有变量这回事</h2>
<p>就是给颜色起个名字，放在最上面，后面用的时候写名字：</p>
<pre><code>:root {
  --bg: #fbfaf8;
  --ink: #16161a;
  --line: #e6e3dd;
}

body {
  background: var(--bg);
  color: var(--ink);
}</code></pre>
<p>要换颜色，改上面那三行就够了，别的地方一个字都不用动。</p>
<h2>深色模式花了十分钟</h2>
<p>因为所有地方用的都是 var(--bg) 这种写法，只要重新给一遍值：</p>
<pre><code>[data-theme="dark"] {
  --bg: #101114;
  --ink: #ededed;
  --line: #272a30;
}</code></pre>
<p>js 那边只改一个属性：</p>
<pre><code>document.documentElement.dataset.theme = "dark";</code></pre>
<p>就这么一行。改完我坐那儿愣了一下，觉得前面那个下午白干了。</p>
<h2>踩过的几个</h2>
<p>一个是变量里存的必须是完整的一段。我试过存一个 8px 进去，然后想再拼一个 4px，不生效。它不是一个数字，是一整段值，拼不了，得拆成两个变量。</p>
<p>还有一个不算变量的事，是我自己打错了一个字母，找了一个多小时，一直在怀疑是浏览器的问题。</p>
<p>另外记得加一句 color-scheme: light dark。不加的话深色模式下滚动条还是白的，看着像贴了张纸条在上面。</p>
<p>现在加皮肤、改主题色，基本就是改几个数。说「给以后的自己留后路」有点夸张了，其实就是不想再花一个下午，去找哪个颜色写错了。</p>
`,
  },
  {
    id: "october-moving-day",
    title: "十月底，天黑得早了",
    date: "2026-10-08",
    updated: "",
    cat: "生活",
    tags: ["随笔", "日记"],
    cover: "",
    pinned: false,
    excerpt:
      "没什么大事。就是天暗得越来越早，楼道灯要跺脚才亮，煮饺子的时候站在锅边等了七八分钟。",
    content: `
<p>十月底，天黑得越来越早。以前六点外面还亮着，现在五点五十出门就得开楼道灯。</p>
<p>我住那栋楼是感应灯，走过去才亮，亮了还能听见啪的一声。有天晚上我走得慢，灯灭了，我在黑里站了两秒才想起来跺脚。</p>
<p>就这两秒，忽然觉得有点好笑。</p>
<h2>最近晚上都在干什么</h2>
<p>没什么特别的。吃完饭刷会儿手机，刷到一个视频说要珍惜时间，看完继续刷。</p>
<p>然后想起来冰箱里还有速冻饺子，煮了十几个。水开得太慢，我站在旁边等，看着锅底冒小泡，一个都还没上来。等它全浮起来大概七八分钟，那七八分钟我就一直站着，什么也没干。</p>
<p>这种时候会想，要是有个人说说话就好了。但也只是那几分钟，饺子吃完就不想了。</p>
<h2>下楼一趟</h2>
<p>去便利店买了一瓶水和一个面包。收银的阿姨问要不要袋子，我说不用，揣兜里。她说了一句天冷了别喝太凉的。</p>
<p>我说好，其实我拿的是常温的。</p>
<p>回来路上风有点大，把外套拉链拉到最上面。这种天气最好的地方是不出汗，最不好的地方是出门前要在门口站一会儿想想穿什么。</p>
<h2>差不多就这样</h2>
<p>没什么大事发生。天冷了，饭照吃，觉照睡，偶尔在楼道里站两秒。</p>
`,
  },
  {
    id: "three-books-this-year",
    title: "今年读完的三本书",
    date: "2026-09-28",
    updated: "",
    cat: "生活",
    tags: ["阅读", "随笔"],
    cover: "",
    pinned: false,
    excerpt:
      "年初想过今年要读多少本。现在十一月了，真正从头读到尾的只有三本，剩下那些翻一半就不看了。",
    content: `
<p>年初想过今年要读完多少本。现在十一月了，我数了一下，真正从头读到尾的只有三本。剩下那些翻开一半就不看了。</p>
<h2>第一本讲注意力</h2>
<p>书里有句话我记到现在，大意是：你不是没时间，是把时间都给了不重要的事，然后抱怨重要的事没做完。</p>
<p>看完那天我查了一下手机使用时长，六个多小时。我盯着那个数字看了一会儿，把通知全关了，只留电话和消息。</p>
<p>有用。至少现在能看进去前三章了。后两章还是会拖。</p>
<h2>第二本讲怎么跟人说话</h2>
<p>书里讲的很简单：大部分人听别人说话的时候不是在听，是在等自己开口。</p>
<p>我回想了一下，我确实是。别人说到一半，我心里已经在想我要接什么了，所以很多对话其实是我一个人在讲。</p>
<p>现在试着等对方说完停三秒。三秒特别长，长到有好几次我发现，我刚才根本没听懂他什么意思。</p>
<h2>第三本最薄，读得最慢</h2>
<p>它讲的是做东西的人那种别扭：怕做不好，所以不动手；不动手，就永远不会做不好。</p>
<p>这句话说到我了。我这个站拖了很久才开始弄，一直觉得还没准备好，得先学会这个那个。后来想，先随便弄个能打开的，难看就难看。</p>
<p>结果几天就弄出来了。虽然现在还是不好看。</p>
<h2>明年不定目标了</h2>
<p>定目标和完成之间隔着一个我。想读就读，读到好的记下来。</p>
`,
  },
  {
    id: "a-cat-that-counts",
    title: "做了一只会数数的猫",
    date: "2026-09-15",
    updated: "2026-09-20",
    cat: "作品",
    tags: ["作品", "JavaScript"],
    cover: "",
    pinned: false,
    excerpt:
      "番茄钟我下过三个，都是两天就不用了，因为太没意思。后来自己做了个小的，做成了一只猫。",
    content: `
<p>我做事集中不了太久。坐下来，五分钟就想拿手机，拿起来刷二十分钟，放下心里难受，又接着坐着。一天过去什么也没干成。</p>
<p>番茄钟我下过三个。共同点是用了两天就不用了，因为没意思，一个数字在那儿倒计时，我盯着它反而更烦。</p>
<p>后来我想，要不自己做一个。做成什么样呢，我想了想，做成一只猫吧。</p>
<h2>规则就几条</h2>
<ul>
<li>点开始，猫就醒着，坐那儿陪你</li>
<li>中途切走超过半分钟，猫会生气，进度清零</li>
<li>撑满二十五分钟，猫吃到一条鱼</li>
<li>攒够十条鱼，猫换个样子</li>
</ul>
<p>功能就这些，代码也没几行。但它比那些番茄钟管事，因为我看着它在旁边坐着，就不太想半路跑掉。这个理由说出去有点傻，可确实是这样。</p>
<h2>做的时候错了两次</h2>
<h3>第一次加了个排行榜</h3>
<p>想的是可以比比谁养得好。做出来用了两天，发现这个想法有问题：我本来就是集中不了才用的，结果它还让我看别人比我强，越用越烦。删了。</p>
<h3>第二次是动画</h3>
<p>我给猫加了呼吸、眨眼、尾巴摆，光调这些调了一个多星期，自己觉得挺好。后来才发现，人真正在用的时候是低头写字，根本不看屏幕。</p>
<p>所以动画砍到只剩尾巴轻轻摆一下。省下来的时间修了个真问题：页面切到后台的时候计时器会被浏览器降速，二十五分钟能被拖成一个多小时。这个才真的要命。</p>
<h2>现在</h2>
<p>它还在我书签栏里，没放出来，也没做成什么安装包，就是我自己用的一个 html 文件。</p>
<p>我也没打算把它做成产品。做它最大的收获是发现，能让人坚持下去的东西往往挺朴素的，就是刚好戳到某根弦。对我来说是，有个东西在旁边坐着，我跑了它就要饿着。</p>
`,
  },
  {
    id: "write-it-down",
    title: "我为什么老爱写点东西",
    date: "2026-08-30",
    updated: "",
    cat: "生活",
    tags: ["随笔", "写作"],
    cover: "",
    pinned: false,
    excerpt:
      "遇到想不明白的事就写一会儿，写完放那儿，不一定再看。记性没自己想得那么好，这是写下来之后才发现的。",
    content: `
<p>我有写东西的习惯。遇到想不明白的事，就打开手机备忘录写一会儿，写完放那儿，不一定再看。</p>
<p>这个习惯从什么时候开始的，我也说不上来。</p>
<h2>记性没自己想的那么好</h2>
<p>我以前觉得自己记性挺好。写下来之后才发现，不是记性好，是脑子会自动补。</p>
<p>有一件事我纠结了很久，当时翻来覆去算了很多遍，还问了别人的意见。现在再想，只剩一句「本来就该那么选」，中间那些来回的部分全没了。</p>
<p>所以现在我会写。写的时候人比较老实，因为知道没人看，装也没用。</p>
<h2>翻自己以前写的，有点尴尬</h2>
<p>前阵子翻到两年前写的一段，密密麻麻很长，全在说服自己没事。最后一句是「算了，就这样吧」。</p>
<p>现在看，第一个反应是：这有什么好纠结的。第二个反应是：但我当时真的纠结了，还纠结得挺认真。</p>
<p>那种感觉挺怪的。不是后悔，也不觉得当时的自己幼稚，就是有点理解他。</p>
<h2>所以这个站得在</h2>
<p>有人问过我，写这些又没人看，图什么。</p>
<p>我说不太清楚。大概是想着过几年回来，还能看到现在这个正在纠结的我。技术的东西会被淘汰，想法会被我自己推翻，但「当时是这么想的」这件事，只有写下来那一刻是准的。</p>
<p>所以我不想把它放在别人的平台上。放在自己域名底下，只要我还交得起域名的钱，它就在。</p>
`,
  },
];
