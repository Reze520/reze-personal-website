/* ============================================================
   RezeのBlog · 内容数据
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
  name: "RezeのBlog",
  en: "reze blog",
  domain: "reze520.pages.dev",
  slogan: "漫漫长路锤炼身躯，幽幽魂灵雕琢心智。",
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
  startYear: 2020,
  avatar: "assets/uploads/avatar.gif", // 头像：留空显示「蕾」字
  icp: "个人站点",

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
  notice: "少年不识愁滋味，爱上层楼。爱上层楼，为赋新词强说愁。\n而今识尽愁滋味，欲说还休。欲说还休，却道天凉好个秋。",
  poems: [
    { t: "少年不识愁滋味，爱上层楼。爱上层楼，为赋新词强说愁。\n而今识尽愁滋味，欲说还休。欲说还休，却道天凉好个秋。", by: "宋·辛弃疾《丑奴儿·书博山道中壁》" },
    { t: "一片春愁待酒浇。江上舟摇，楼上帘招。秋娘渡与泰娘桥，风又飘飘，雨又萧萧。\n何日归家洗客袍？银字笙调，心字香烧。流光容易把人抛，红了樱桃，绿了芭蕉。", by: "宋·蒋捷《一剪梅·舟过吴江》" },
    { t: "君问归期未有期，巴山夜雨涨秋池。\n何当共剪西窗烛，却话巴山夜雨时。", by: "唐·李商隐《夜雨寄北》" },
    { t: "独坐幽篁里，弹琴复长啸。\n深林人不知，明月来相照。", by: "唐·王维《竹里馆》" },
    { t: "风乍起，吹皱一池春水。闲引鸳鸯香径里，手挼红杏蕊。\n斗鸭阑干独倚，碧玉搔头斜坠。终日望君君不至，举头闻鹊喜。", by: "五代·冯延巳《谒金门·风乍起》" },
    { t: "一曲新词酒一杯，去年天气旧亭台。夕阳西下几时回？\n无可奈何花落去，似曾相识燕归来。小园香径独徘徊。", by: "宋·晏殊《浣溪沙·一曲新词酒一杯》" },
    { t: "人生若只如初见，何事秋风悲画扇。等闲变却故人心，却道故人心易变。\n骊山语罢清宵半，泪雨霖铃终不怨。何如薄幸锦衣郎，比翼连枝当日愿。", by: "清·纳兰性德《木兰花·拟古决绝词柬友》" },
    { t: "莫听穿林打叶声，何妨吟啸且徐行。竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。\n料峭春风吹酒醒，微冷，山头斜照却相迎。回首向来萧瑟处，归去，也无风雨也无晴。", by: "宋·苏轼《定风波·莫听穿林打叶声》" },
    { t: "春花秋月何时了，往事知多少。小楼昨夜又东风，故国不堪回首月明中。\n雕栏玉砌应犹在，只是朱颜改。问君能有几多愁，恰似一江春水向东流。", by: "南唐·李煜《虞美人·春花秋月何时了》" },
    { t: "枯藤老树昏鸦，小桥流水人家，古道西风瘦马。\n夕阳西下，断肠人在天涯。", by: "元·马致远《天净沙·秋思》" },
    { t: "人人尽说江南好，游人只合江南老。春水碧于天，画船听雨眠。\n垆边人似月，皓腕凝霜雪。未老莫还乡，还乡须断肠。", by: "唐·韦庄《菩萨蛮·人人尽说江南好》" },
    { t: "千山鸟飞绝，万径人踪灭。\n孤舟蓑笠翁，独钓寒江雪。", by: "唐·柳宗元《江雪》" },
    { t: "移舟泊烟渚，日暮客愁新。\n野旷天低树，江清月近人。", by: "唐·孟浩然《宿建德江》" },
    { t: "月落乌啼霜满天，江枫渔火对愁眠。\n姑苏城外寒山寺，夜半钟声到客船。", by: "唐·张继《枫桥夜泊》" },
    { t: "独怜幽草涧边生，上有黄鹂深树鸣。\n春潮带雨晚来急，野渡无人舟自横。", by: "唐·韦应物《滁州西涧》" },
    { t: "清晨入古寺，初日照高林。曲径通幽处，禅房花木深。\n山光悦鸟性，潭影空人心。万籁此都寂，但余钟磬音。", by: "唐·常建《题破山寺后禅院》" },
    { t: "玉炉香，红蜡泪，偏照画堂秋思。眉翠薄，鬓云残，夜长衾枕寒。\n梧桐树，三更雨，不道离情正苦。一叶叶，一声声，空阶滴到明。", by: "唐·温庭筠《更漏子·玉炉香》" },
    { t: "菡萏香销翠叶残，西风愁起绿波间。还与韶光共憔悴，不堪看。\n细雨梦回鸡塞远，小楼吹彻玉笙寒。多少泪珠何限恨，倚阑干。", by: "五代·李璟《摊破浣溪沙·菡萏香销翠叶残》" },
    { t: "昨夜雨疏风骤，浓睡不消残酒。\n试问卷帘人，却道海棠依旧。知否，知否？应是绿肥红瘦。", by: "宋·李清照《如梦令·昨夜雨疏风骤》" },
    { t: "薄雾浓云愁永昼，瑞脑销金兽。佳节又重阳，玉枕纱厨，半夜凉初透。\n东篱把酒黄昏后，有暗香盈袖。莫道不销魂，帘卷西风，人比黄花瘦。", by: "宋·李清照《醉花阴·薄雾浓云愁永昼》" },
    { t: "梦后楼台高锁，酒醒帘幕低垂。去年春恨却来时。落花人独立，微雨燕双飞。\n记得小蘋初见，两重心字罗衣。琵琶弦上说相思。当时明月在，曾照彩云归。", by: "宋·晏几道《临江仙·梦后楼台高锁》" },
    { t: "东风夜放花千树。更吹落、星如雨。宝马雕车香满路。凤箫声动，玉壶光转，一夜鱼龙舞。\n蛾儿雪柳黄金缕。笑语盈盈暗香去。众里寻他千百度。蓦然回首，那人却在，灯火阑珊处。", by: "宋·辛弃疾《青玉案·元夕》" },
    { t: "驿外断桥边，寂寞开无主。已是黄昏独自愁，更著风和雨。\n无意苦争春，一任群芳妒。零落成泥碾作尘，只有香如故。", by: "宋·陆游《卜算子·咏梅》" },
    { t: "峰峦如聚，波涛如怒，山河表里潼关路。望西都，意踌躇。\n伤心秦汉经行处，宫阙万间都做了土。兴，百姓苦；亡，百姓苦。", by: "元·张养浩《山坡羊·潼关怀古》" },
    { t: "山一程，水一程，身向榆关那畔行，夜深千帐灯。\n风一更，雪一更，聒碎乡心梦不成，故园无此声。", by: "清·纳兰性德《长相思·山一程》" },
    { t: "结庐在人境，而无车马喧。问君何能尔？心远地自偏。\n采菊东篱下，悠然见南山。山气日夕佳，飞鸟相与还。\n此中有真意，欲辨已忘言。", by: "晋·陶渊明《饮酒·其五》" },
    { t: "滚滚长江东逝水，浪花淘尽英雄。是非成败转头空。青山依旧在，几度夕阳红。\n白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢。古今多少事，都付笑谈中。", by: "明·杨慎《临江仙·滚滚长江东逝水》" },
    { t: "少年听雨歌楼上，红烛昏罗帐。壮年听雨客舟中，江阔云低、断雁叫西风。\n而今听雨僧庐下，鬓已星星也。悲欢离合总无情，一任阶前、点滴到天明。", by: "宋·蒋捷《虞美人·听雨》" },
    { t: "行行重行行，与君生别离。相去万余里，各在天一涯。\n道路阻且长，会面安可知。胡马依北风，越鸟巢南枝。\n相去日已远，衣带日已缓。浮云蔽白日，游子不顾返。\n思君令人老，岁月忽已晚。弃捐勿复道，努力加餐饭。", by: "汉·《古诗十九首·行行重行行》" }
  ],

  // ---------- 动态（说说 / 碎碎念） ----------
  // images 留空就是纯文字，填了就在下面显示图片（可多张）
  moments: [
  {
      "date": "2026-10-30 21:50",
      "text": "顺差那篇删掉三千字。车轱辘的部分自己都嫌烦，舍不得也得删。",
      "images": [],
      "tags": []
    },
  {
      "date": "2026-10-29 23:15",
      "text": "给长文做了个浮动目录，默认收成一个小标签，点开还能拖。读到下半篇不用再往上翻。",
      "images": [],
      "tags": []
    },
  {
      "date": "2026-10-27 23:35",
      "text": "G20那个19比1，本来想五百字讲清楚就完。结果资料越查越多，IMF文件、券商研报、博主的时评视频，链接攒了五十多个，写到大半夜，稿子快两万字。这种题目，写一回脱层皮。",
      "images": [],
      "tags": []
    },
  {
      "date": "2026-10-26 23:40",
      "text": "站改完了，十一点半才收。本来想加的东西最后没加，太困了，明天再说。",
      "images": [],
      "tags": []
    },
  {
      "date": "2026-10-25 21:10",
      "text": "楼下便利店换了个阿姨收银，说话慢慢的。我买水她说天冷了别喝太冰的。我哦了一声，其实我拿的是常温的，也没好意思说。",
      "images": [],
      "tags": []
    },
  {
      "date": "2026-10-24 22:50",
      "text": "看诺奖新闻才留意到，获奖者的官方肖像全是画，不是照片。谁画的、为什么用画，顺着查了一下午，够写一篇小的。",
      "images": [],
      "tags": []
    },
  {
      "date": "2026-10-22 21:15",
      "text": "中国人的温良那篇总觉得写短了，哪天把该展开的展开。",
      "images": [],
      "tags": []
    },
  {
      "date": "2026-10-19 19:40",
      "text": "吃饭时想起一件从小没想通的事：口水天天咽没人觉得有什么，空着嘴连咽四五次就咽不下去了。问了几个人，都答不上来。查了两天唾液分泌的资料，答案比想象的曲折。",
      "images": [],
      "tags": []
    },
  {
      "date": "2026-10-14 21:05",
      "text": "投名状那篇的引子换了，从刺马案进。两江总督当街被砍，真事比编的狠。",
      "images": [],
      "tags": []
    },
  {
      "date": "2026-10-12 23:05",
      "text": "整理硬盘翻出三年前一个文件夹，十几个文件全都是写了一半的。本来打算删，一个一个点开看完，又都留着了。占地方就占地方吧。",
      "images": [],
      "tags": []
    },
  {
      "date": "2026-10-08 23:20",
      "text": "给老无所依补两个角色，卡在奇古尔这儿两天。他的怪不是一句「杀人不眨眼」能打发的，是一场戏一场戏做出来的。翻电影资料比写新的还慢，慢就慢吧。",
      "images": [],
      "tags": []
    },
  {
      "date": "2026-10-05 20:30",
      "text": "查一个数据，五个来源四个对不上，一路追到最原始的表格才算踏实。写东西慢，就慢在这种地方。",
      "images": [],
      "tags": []
    },
  {
      "date": "2026-09-30 21:40",
      "text": "有人跟我说「断章取义」这个成语是从卞之琳的《断章》来的，听着像那么回事。查了半天词源，不是，两码事。误会攒成了一个题目，写了篇小的。",
      "images": [],
      "tags": []
    },
  {
      "date": "2026-08-30 22:10",
      "text": "台风天没出门，把去年买的那盆薄荷端到窗台。风把雨斜着拍在玻璃上，它叶子反而支棱起来了。我蹲那儿看了十分钟，手指蹭了蹭叶片，一股凉味窜上来，跟去年刚买回来时一模一样。原来有些气味比记忆还准。",
      "images": [],
      "tags": []
    },
  {
      "date": "2026-08-14 22:30",
      "text": "把压箱底的几篇旧稿补进站里，日期标回原来写完的那天。翻到《半张契》，两年前的字，像看别人写的，只敢动几个口气。",
      "images": [],
      "tags": []
    },
  {
      "date": "2026-07-13 20:15",
      "text": "有读者写信来说某篇写到了他，开心一整天。写东西不为这个，但收到这一句挺好。",
      "images": [],
      "tags": []
    },
  {
      "date": "2026-04-25 22:40",
      "text": "把小半年的读书笔记整理出来，原来我默默看了这么多本，自己都没意识到。",
      "images": [],
      "tags": []
    },
  {
      "date": "2026-01-09 23:55",
      "text": "重读俄耳甫斯那篇，还是觉得他该回头。不回头就不是他了。",
      "images": [],
      "tags": []
    },
  {
      "date": "2025-11-20 23:40",
      "text": "深夜改一篇旧文，改到第三遍突然烦了，全选删掉重写。删之前截了张图留念，发现第一版用了七个「其实」，读起来像在跟谁辩论。新的一版一个都没用，反而顺了。",
      "images": [],
      "tags": []
    },
  {
      "date": "2025-08-02 21:30",
      "text": "今天写得顺，一口气两千字，这种时候最舍不得停，停了就接不上了。",
      "images": [],
      "tags": []
    },
  {
      "date": "2025-03-17 19:00",
      "text": "把网址导航里三十个不点的全删了，列表一下清爽。东西少点，脑子也轻点。",
      "images": [],
      "tags": []
    },
  {
      "date": "2024-12-24 21:10",
      "text": "平安夜便利店买了关东煮，萝卜炖得透，咬一口烫到舌头，值得。",
      "images": [],
      "tags": []
    },
  {
      "date": "2024-08-15 19:30",
      "text": "傍晚在河边走，看见有人放了一盏很小的灯，顺水漂远。我跟着它走了大半截，直到它拐进桥洞底下看不见。回来查了下，是什么祈福的仪式，但具体哪里的说不清。挺好，不用弄清。",
      "images": [],
      "tags": []
    },
  {
      "date": "2024-05-06 16:20",
      "text": "那天突然想通了一件事：写不出来的时候硬写，只会写出一堆正确的废话。后来学乖了，卡住就去洗个杯子、拖个地，手在动脑子反而松了。",
      "images": [],
      "tags": []
    },
  {
      "date": "2023-11-11 13:40",
      "text": "双十一啥也没买，反而松了口气。购物车清空比装满舒服。",
      "images": [],
      "tags": []
    },
  {
      "date": "2023-02-14 19:25",
      "text": "情人节一个人去吃了火锅，锅底一直咕嘟咕嘟，挺好，不用等谁。",
      "images": [],
      "tags": []
    },
  {
      "date": "2022-10-30 23:15",
      "text": "翻到去年写的一篇，脸有点热，写得太用力了。没删，留着看看自己当初多幼稚。",
      "images": [],
      "tags": []
    },
  {
      "date": "2022-03-08 22:05",
      "text": "加了背景音乐，以后写东西有人陪着哼了，虽然是机器唱的。无所谓，有人气就行。",
      "images": [],
      "tags": []
    },
  {
      "date": "2021-07-19 23:50",
      "text": "半夜写东西，窗外有猫在叫，停下手听了好一阵，它也不怕人，就那么对着我叫。",
      "images": [],
      "tags": []
    },
  {
      "date": "2021-01-22 20:30",
      "text": "今天把动态、相册、网址导航一块补上了，突然觉得这站有点像家了，虽然还没人来看。",
      "images": [],
      "tags": []
    },
  {
      "date": "2020-09-03 18:45",
      "text": "楼下新开家面馆，老板每次都问「一个人啊」，我说嗯，他就开始多给一勺辣。",
      "images": [],
      "tags": []
    },
  {
      "date": "2020-06-12 21:20",
      "text": "站刚搭好的那天，对着空白首页坐了好久，第一句写什么想了半天，最后先放了张背景图。",
      "images": [],
      "tags": []
    }
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
    { cat: "效率工具", name: "腾讯文档", url: "https://docs.qq.com", desc: "在线表格", fav: "assets/icons/docs.qq.com.png" },
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
      "date": "2026-10-29",
      "title": "文章底下能留言了",
      "desc": "以前读者想说点什么只能写信。现在每篇文末有个留言框，谁都能留，自己也能删。写着写着发现，比起被很多人看见，更想要一点点真的回声。",
      "tags": []
    },
    {
      "date": "2026-10-28",
      "title": "内页地址换成了真路径",
      "desc": "以前点进任何一个内页，地址栏最后都会变成 index.html#/writing 这一段，复制分享出去也是它。\n现在就是 /writing、/post?id=xxx。刷新、收藏、右键新窗口打开，拿到的都是这个；老书签 /#/writing 照样能用，带 .html 的老地址也会 308 一次落到新地址。\n改的时候踩了两个坑：导航高亮原来按子串比对，首页那个「/」是任何地址的子串，于是每一页都把「主页」点亮；还有「来源页」靠 hash 认首页，根路径没有 hash 就认不出来，返回会掉回文章列表。两个都补上了。",
      "tags": [
        "改版",
        "路由"
      ]
    },
    {
      "date": "2026-10-28",
      "title": "把写成提纲的几篇文章补回来",
      "desc": "有八篇当时只记了个结论就放下了，最短的一篇不到五百字，读完像是看到别人把话说了一半。\n这次没有加新的事，只是把当时没记下来的部分补齐：为什么从那个结论出发、中途想到了什么、后来又怎么推翻的。\n补完平均两千字上下，读起来也从「一句感想」变成了一段真的经历。",
      "tags": [
        "随笔"
      ]
    },
    {
      "date": "2026-10-15",
      "title": "每篇文章做了分享卡片",
      "desc": "点开文章右上角能生成一张带标题和封面的图，发给朋友不用再截图。底色跟着分类走，技术文是冷的蓝，书评是暖的橙。",
      "tags": []
    },
    {
      "date": "2026-09-28",
      "title": "搜索能搜动态和相册了",
      "desc": "之前 Ctrl+K 只翻文章，现在动态里的一句、相册里的一张也能搜到。索引在进站时偷偷建好，第一次按下去几乎不卡。",
      "tags": []
    },
    {
      "date": "2026-09-10",
      "title": "写这个站第六年，回头数了数图什么",
      "desc": "从 2020 年一行手写 HTML 到现在，文章攒了一百多篇，播放器里四十几首歌。\n图什么？好像也不是想被谁看见。\n只是习惯了把想不清的事写清楚，写清楚的那一刻，它就不再烦我了。",
      "tags": [
        "想法",
        "总结"
      ]
    },
    {
      "date": "2026-08-12",
      "title": "播放器挪到了左下角",
      "desc": "悬浮球原来在右下，总跟滚动条和歌词条打架。挪到左下角之后，右手划页面、左手切歌，互不挡。",
      "tags": []
    },
    {
      "date": "2026-07-13",
      "title": "第一次有人写信说「写到了我」",
      "desc": "不是评论区，是一封正经的信。说某篇让他想起自己的一段事。写东西不为这个，但收到那一刻还是开心了一整天。",
      "tags": []
    },
    {
      "date": "2026-06-09",
      "title": "相册能按拍摄地分组了",
      "desc": "照片多了以后一团乱，按城市聚成一堆，点开一座城就能翻完。没拍地的归到「未归类」，不硬猜。",
      "tags": []
    },
    {
      "date": "2026-05-04",
      "title": "深色模式不再是反色",
      "desc": "之前深色就是浅色翻过来，字发虚。重做了配色，深的背景是带点紫的黑，字是暖白，看久了眼睛不累。",
      "tags": []
    },
    {
      "date": "2026-04-28",
      "title": "给文章配上封面，正文里加了几段原文",
      "desc": "书评影评都配了封面和海报，图注写在图下面。技术文配的是原理图，找不到对得上的宁可不配。\n正文里挑了几段原文当引用，像是《活着》自序那句、《边城》的结尾。\n每篇末尾加了「参考与延伸」，豆瓣条目、B 站和知乎的搜索入口都挂着，方便顺着往下看。",
      "tags": [
        "书写",
        "细节"
      ]
    },
    {
      "date": "2026-04-25",
      "title": "把攒了小半年的读书笔记整理出来了",
      "desc": "二十四篇，一本一篇，断断续续写了小半年，多数是晚上或者通勤路上记的。\n没按什么顺序排，就按读完的先后放，最近的搁最前头。\n每篇都从自己怎么碰上这本书写起，中间挑几段记得住的聊，结尾不总结，写到哪算哪。\n整理的时候发现好多篇开头都是「这本书我是……」，看着有点重复，想想还是没改，写字的人总有点自己的口头禅。\n标签都归到「书评」，分类放「读书」。",
      "tags": [
        "读书",
        "内容"
      ]
    },
    {
      "date": "2026-03-15",
      "title": "决定把科普也写进来，但换个写法",
      "desc": "想讲 Transformer、token 这些，又怕写成教科书。\n后来定下调：像说明书，但好看一点。不拟人，不每段憋金句，该长的长出去用折叠块收着。\n读者要的是「能多就多」，不是「精简」。",
      "tags": [
        "科普",
        "写法"
      ]
    },
    {
      "date": "2026-02-18",
      "title": "长文记住读到哪了",
      "desc": "关掉页面再回来，滚动位置记住了，连目录里那一行都还是亮着的。短于三屏的不记，省得没必要。",
      "tags": []
    },
    {
      "date": "2025-12-01",
      "title": "想写《当梗替你说话》，因为身边人在失语",
      "desc": "发现周围人越来越爱甩梗，真要说点什么反而卡壳。\n梗像一层壳，安全，但隔开了人。\n这篇拖了很久，因为要引很多新闻和社媒原话才立得住，最后写成了一篇带折叠附录的长文。",
      "tags": [
        "写作",
        "语言"
      ]
    },
    {
      "date": "2025-11-22",
      "title": "文章能导出 PDF 了",
      "desc": "想打印或者存一份离线版，点一下就有。样式单独调过，代码块不换行、引用不截断，打出来跟网页一样清楚。",
      "tags": []
    },
    {
      "date": "2025-10-07",
      "title": "标签从七个扩回受控词表",
      "desc": "之前砍到七个太狠，一些跨篇的主题挂不上了。改成一份受控词表，每篇一两枚，能串起三篇以上的才留。",
      "tags": []
    },
    {
      "date": "2025-08-30",
      "title": "写了个本地草稿箱",
      "desc": "写到一半不想发了，先存着。草稿只在自己这台机器，不进云端，哪天想捡回来就捡。",
      "tags": []
    },
    {
      "date": "2025-06-20",
      "title": "把几篇文章和动态重写了一遍",
      "desc": "七篇文章、四条动态，回头看全是模板味：段落结尾爱下结论，句子爱对仗，情节还有编的。\n一篇一篇删了重写，尽量写成自己会说的话。\n正文同步到了云端，旧链接没动，收藏过的还能打开。",
      "tags": [
        "写作"
      ]
    },
    {
      "date": "2025-05-12",
      "title": "把前几年模板味的文章，一篇篇重写",
      "desc": "回头看 2025 年之前的不少篇，全是套路：结尾爱下结论、句子爱对仗、情节还有编的。\n一篇篇删了重写，尽量写成自己会说的话。\n重写完松了口气，终于敢把名字挂上去了。",
      "tags": [
        "写作",
        "修订"
      ]
    },
    {
      "date": "2025-04-15",
      "title": "首页能直接预览最新三篇",
      "desc": "进来不用点进文章列表，首屏就挂上最近写的，配封面和一句引子。想多看就去列表，不强迫。",
      "tags": []
    },
    {
      "date": "2024-12-08",
      "title": "日历能直接跳到发过文的日子",
      "desc": "右栏那个小日历，标了文的日子点一下就列出当天所有文章。空白的日子不跳，免得点进去什么都没有。",
      "tags": []
    },
    {
      "date": "2024-11-30",
      "title": "写完《南北犹可越》，找到了自己的一种写法",
      "desc": "把「南北」当成空间隔绝、「东西」当成时间隔绝来写，意外顺手。\n那种「借一个词讲一层意思」的路子，后来反复用。\n一篇文章能不能成立，往往就看那个起头的比喻站不站得住。",
      "tags": [
        "写作",
        "写法"
      ]
    },
    {
      "date": "2024-09-19",
      "title": "代码块加了复制按钮",
      "desc": "技术文里一坨坨代码，选中再右键太麻烦。每段右上角放了个复制，点一下整段进剪贴板。",
      "tags": []
    },
    {
      "date": "2024-07-11",
      "title": "图片改成懒加载",
      "desc": "文章里的图多了，首屏一下子全拉太慢。改成滚到哪张加载哪张，加载完也不撑高度，阅读位置不跳。",
      "tags": []
    },
    {
      "date": "2024-04-22",
      "title": "开了个二十三篇的系列，写东亚文化里那些别扭",
      "desc": "想做一件慢慢的事：用二十三篇，拆东亚人一些说不清的习惯——追星、内卷、上岸、怀旧、长期专一。\n每篇只讲一件事，不升华。\n这个系列后来成了站里最长的一条线。",
      "tags": [
        "系列",
        "写作"
      ]
    },
    {
      "date": "2024-03-03",
      "title": "「关于」页重写了一遍",
      "desc": "原来写得太像简历，删了头衔，只留「最近在想什么」。有人从这页点进文章，比从首页进的还多。",
      "tags": []
    },
    {
      "date": "2023-12-14",
      "title": "导航的「更多」收起了冷门入口",
      "desc": "顶栏越来越挤，把不常点的收进下拉，鼠标移上去才展开。主区只剩主页、动态、文章、天气几个。",
      "tags": []
    },
    {
      "date": "2023-09-18",
      "title": "想写「大梦一场空」，攒了很久的素材",
      "desc": "《红楼》《浮生六记》《水浒》《三国》，再到诸神黄昏、徐霞客，好像都在说同一件事：用力越大，空得越响。\n这个题在心底盘了快一年，材料越攒越多，就等一个能串起来的线。",
      "tags": [
        "写作",
        "历史"
      ]
    },
    {
      "date": "2023-07-22",
      "title": "加了 robots 和 sitemap",
      "desc": "想让搜索引擎收得干净点，sitemap 自动跟着文章生成，robots 把后台和工具目录挡在外面。",
      "tags": []
    },
    {
      "date": "2023-05-12",
      "title": "把常用的站点整理成了一张导航",
      "desc": "原来零零散散存了五十来个，干脆一次补全，凑到一百五十多个，分成十四类。\n每一个都在没有代理的网络下点开试过，ChatGPT、YouTube、维基这些在这边打不开的，删了十个，免得点进去一片白。\n图标也从在线服务换成本地缓存，整站图标加一起一点五兆，打开快，也不怕哪天图标服务挂了。\n分类卡片的底色压深了一点，之前背景图太亮，字有点糊。",
      "tags": [
        "导航",
        "内容"
      ]
    },
    {
      "date": "2023-03-30",
      "title": "文章页能看「同标签」了",
      "desc": "读完一篇想顺着看同主题的，底部一排相关文章按标签凑，最多八篇，凑不满也不硬填。",
      "tags": []
    },
    {
      "date": "2023-01-05",
      "title": "给自己立了一条写作底线：不编撰",
      "desc": "有阵子为了好看，偷偷给文章里塞了点没发生过的细节，写完自己都脸热。\n从那以后定死：不替别人编故事，不替自己编没经历过的情节。\n写不出真东西，就宁可空着。",
      "tags": [
        "写作",
        "底线"
      ]
    },
    {
      "date": "2022-12-10",
      "title": "背景能换了，头像换成会动的",
      "desc": "挑了三张插画当备选，在外观设置里换，换过会记住，也可以设成每次进站随机。\n头像换成了动图，比原来那张死的有点意思。",
      "tags": [
        "视觉",
        "功能"
      ]
    },
    {
      "date": "2022-11-08",
      "title": "背景图能跟着节气换了",
      "desc": "二十四个节气各配一张，到了日子自动换，也能手动锁一张。嫌烦就关掉，退回纯色。",
      "tags": []
    },
    {
      "date": "2022-09-02",
      "title": "标签砍到七个，列表一页十二篇",
      "desc": "之前标签三十个，好多是只出现一次的专名，看着乱。狠狠心砍到七个：随笔、书评、前端、摘录、情感、英文、影评。\n一页五篇太少，翻页翻得烦，改成十二篇。\n改的时候还撞了个报错，筛选函数引用了一个没定义的变量，列表一打开就崩，找了一会儿才找到。",
      "tags": [
        "阅读",
        "整理"
      ]
    },
    {
      "date": "2022-06-10",
      "title": "重翻《水浒》，盯上了鲁智深",
      "desc": "小时候只觉得他粗，长大再看，他才是整本书里最干净的人——杀人放火却从不算计。\n想写他，但一直不敢，怕写轻了。\n拖到 2026 年才动笔，光结尾「修成正果」那一节就改了好几遍。",
      "tags": [
        "写作",
        "水浒"
      ]
    },
    {
      "date": "2022-05-18",
      "title": "进度条终于能拖了",
      "desc": "这事折腾了我一晚上。一开始以为是音频文件的问题，换了几个格式都不行。\n后来才发现跟文件没关系：托管那边返回静态资源时没带 Accept-Ranges，拖进度条发的分段请求，它一律回整个文件，浏览器就定不了位。\n最后把音频单独挪到一个支持分段请求的 CDN 上，页面还在原来的地方，地址前缀收在一处，以后换也方便。",
      "tags": [
        "音乐",
        "修复"
      ]
    },
    {
      "date": "2022-04-19",
      "title": "歌词支持了逐字高亮",
      "desc": "之前整句亮，现在按时间轴一个字一个字亮，卡的歌也能跟住。LRC 里三位毫秒也认。",
      "tags": []
    },
    {
      "date": "2022-03-06",
      "title": "给播放器加了曲目列表和播放模式",
      "desc": "一直只有一首歌单曲循环，听久了烦。这回加了列表，能点着切，也能上一首下一首。\n播放模式做成顺序、单曲、随机三个轮着换，选过哪个下次还记得。\n歌词默认收起来了，想看的再点开，页面清净不少。\n顺手修了个角标显示错乱的毛病——单曲循环那个小 1 和悬浮提示抢同一个位置，叠在一起了。",
      "tags": [
        "音乐",
        "功能"
      ]
    },
    {
      "date": "2022-02-14",
      "title": "为什么要给一个写东西的站加背景音乐",
      "desc": "一个人对着空白页太久，房间静得发慌。\n加背景音乐不是为了好看，是让写东西这件事不那么孤。\n后来还加了歌词，写到哪句亮哪句，像有人陪着哼。",
      "tags": [
        "音乐",
        "想法"
      ]
    },
    {
      "date": "2022-01-22",
      "title": "歌词能分三种方式看了",
      "desc": "栏里一份、右下角悬浮播放器一份、页面最底下一行一份。\n三种各自能开关，想要哪个开哪个，窄屏的时候布局自己会让一让。",
      "tags": [
        "音乐",
        "功能"
      ]
    },
    {
      "date": "2021-12-30",
      "title": "换了播放器的封面",
      "desc": "播放器和悬浮球都换成了专辑本身的封面，比之前随便找的图顺眼。",
      "tags": [
        "音乐",
        "视觉"
      ]
    },
    {
      "date": "2021-12-18",
      "title": "播放器做成了唱片机的样子",
      "desc": "封面放大成一个带白边的圆盘，播放的时候慢慢转，像小时候那种唱片机。\n音量条右边接了一排律动条和几个快捷按钮，进度条两头标上时间，播放键挪到正中间，做成圆的。",
      "tags": [
        "视觉",
        "音乐"
      ]
    },
    {
      "date": "2021-11-28",
      "title": "欢迎页改成一直待在顶上",
      "desc": "之前欢迎页只在第一次进站时出现，看完就没了，想再看一眼还得刷新。\n现在它就在页面最上面，随便翻到哪，往上滚都能回去。\n切页面的时候会自动落到正文开头，免得每次都先划过大屏。\n刷新和直接点文章链接的落点分开处理，不然打开一篇文还得先看欢迎页。",
      "tags": [
        "体验",
        "优化"
      ]
    },
    {
      "date": "2021-10-22",
      "title": "手机上三栏叠成一列",
      "desc": "左中右在窄屏互相挤，改成上下排，个人信息收到顶部折叠里。桌面和手机是两套布局，不是硬缩。",
      "tags": []
    },
    {
      "date": "2021-09-05",
      "title": "文章页右边加了个目录",
      "desc": "长文章翻起来费劲，就从正文的小标题自动生成一份目录挂在右栏。\n点一下跳过去，滚到哪一节，目录里对应的那行就亮起来。",
      "tags": [
        "阅读",
        "导航"
      ]
    },
    {
      "date": "2021-08-08",
      "title": "读到俄耳甫斯，心里堵了很久",
      "desc": "第一次读到他回头的那一刻，整个人愣住。不是感动，是替他委屈：明明都走到门口了。\n这个念头在心里压了几年，直到 2026 年才写成《回头看的那个人》。\n有些题得熬够了才敢动笔。",
      "tags": [
        "写作",
        "神话"
      ]
    },
    {
      "date": "2021-06-15",
      "title": "日历挪进右栏，独立页面删了",
      "desc": "原来单独一个日历页，进去的人没几个，干脆删掉，旧链接指回首页。\n右栏这个小日历顺手补了农历、节气和节日，发过文章的日子会标出来，能翻月份，也能一键回到这个月。\n日程和记事没做——试过，自己用不上，还占地方，就砍了。",
      "tags": [
        "视觉",
        "改版"
      ]
    },
    {
      "date": "2021-05-09",
      "title": "文章支持折叠块了",
      "desc": "长文里那些「想看再看」的参考资料、原段落，收进折叠块，默认合上。正文一口气读完，细节留着不挡路。",
      "tags": []
    },
    {
      "date": "2021-04-10",
      "title": "改成单页切换，歌不再断",
      "desc": "以前每点一个导航，整页刷新，歌就断了，听一半没了很扫兴。\n改成单页路由，只换内容区，播放器不动，背景音乐能一直放。\n进度条加了一块透明的可点区域，点一下、拖着走都行，时长也正常显示了。",
      "tags": [
        "音乐",
        "体验"
      ]
    },
    {
      "date": "2021-03-20",
      "title": "动了写「语言」的念头",
      "desc": "很早就对「话越说越空」这件事别扭。\n先是零星记了几段，后来慢慢长成了《语言是个漏斗》《缩写过剩的时代》——一个讲沟通的损耗，一个讲缩写怎么把人分成圈里圈外。\n源头都是同一份不舒服。",
      "tags": [
        "写作",
        "语言"
      ]
    },
    {
      "date": "2021-03-08",
      "title": "加了背景音乐和歌词",
      "desc": "换了首背景音乐，把 LRC 歌词内联进去，点开能看，播到哪句哪句亮。",
      "tags": [
        "音乐"
      ]
    },
    {
      "date": "2021-02-14",
      "title": "顶栏重新排了一下",
      "desc": "改成三段式居中，图标配文字，鼠标放上去有个小提示。\n用得不多的入口收进「更多」里，顶栏一下子清爽了。",
      "tags": [
        "导航"
      ]
    },
    {
      "date": "2021-01-17",
      "title": "补了动态、相册和网址导航",
      "desc": "光有文章太单薄，又添了三种：随手记的动态、一些照片、一个常用网址的合集。\n时间线只记站点本身改了什么，不跟文章混在一起，翻起来清楚。",
      "tags": [
        "内容"
      ]
    },
    {
      "date": "2020-12-20",
      "title": "想明白这个站不追流量，只追自己",
      "desc": "那会儿到处都在教人做爆款、蹭热点。我犹豫过要不要也那样。\n后来想通了：这个站是给自己看的，哪天我不在了，它也是个能翻的笔记本。\n流量随缘，不勉强。",
      "tags": [
        "想法",
        "定位"
      ]
    },
    {
      "date": "2020-12-06",
      "title": "主页的毛玻璃去掉了",
      "desc": "之前压在背景上那层毛玻璃，好看是好看，但有点脏。\n干脆去掉，背景原图直接露出来，字加了点柔和阴影，实在看不清的地方把整块压暗两成。",
      "tags": [
        "视觉"
      ]
    },
    {
      "date": "2020-11-15",
      "title": "第一次有人把站链接发出去",
      "desc": "不是什么大号，就是一个群里的朋友转了句。那天盯着访问记录看了好久，原来真有人会点进来。",
      "tags": []
    },
    {
      "date": "2020-10-05",
      "title": "加了全文搜索和欢迎首屏",
      "desc": "文章多了不好找，做了个全文搜索，Ctrl+K 就能叫出来。\n打开站点先是一屏背景图，中间一句话用打字机一个字一个字敲出来，我自己看着挺喜欢。",
      "tags": [
        "功能"
      ]
    },
    {
      "date": "2020-08-22",
      "title": "定下三栏的骨架",
      "desc": "首页、文章、关于统一成左中右三栏：左边个人信息，中间正文，右边动态和日历。\n一开始不习惯，用了两天觉得挺好，信息一眼都在。",
      "tags": [
        "改版"
      ]
    },
    {
      "date": "2020-07-30",
      "title": "搭好站的第一篇，写的是为什么想有个地方放想法",
      "desc": "最开始弄这个站的时候，整站还是空的。\n第一篇没写什么大事，就是想说清楚为什么要弄这个站——不是日记，是把那些转瞬即逝的念头存下来。\n写着写着发现，能写出来的念头才真的算自己的。",
      "tags": [
        "随笔",
        "起点"
      ]
    },
    {
      "date": "2020-07-12",
      "title": "配色换成了淡紫",
      "desc": "原来是黑白极简，看久了发闷。换成一整套偏紫的冷色，暗色模式一起做了。",
      "tags": [
        "视觉"
      ]
    },
    {
      "date": "2020-05-20",
      "title": "把站点从本地推到了线上",
      "desc": "本地能跑了之后，开始琢磨怎么让它真正上线，服务器和部署的事一点点摸清。",
      "tags": [
        "上线"
      ]
    },
    {
      "date": "2020-05-01",
      "title": "从零把站搭起来",
      "desc": "没用框架，也没引依赖，HTML、CSS、JS 全是手写的，整站静态。\n图的就是简单，国内打开也快。",
      "tags": [
        "起点"
      ]
    }
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
      "夜里也有花开。",
      "漫漫长路锤炼身躯，幽幽魂灵雕琢心智。",
      "慢一点也没关系，风会等愿意停的人。",
      "月亮不说话，却照了很多人的夜路。",
      "把日子过成自己喜欢的样子，就够了。",
      "今天也想做一个温柔的人。",
      "没什么大不了，明天太阳照常升起。",
      "允许自己偶尔什么都不想做。",
      "安静地喜欢，也是一种浪漫。",
      "把心事说给风，风会替你保管。",
      "世界很大，慢慢走，慢慢看。",
      "故事还在写，先不剧透结局。",
      "我们终将相遇，在更好的自己里。",
      "你不必发光，温暖就够了。",
      "落花人独立，微雨燕双飞。",
      "晚来天欲雪，能饮一杯无。",
      "人生有味是清欢。",
      "当时明月在，曾照彩云归。",
      "春水碧于天，画船听雨眠。",
      "山中何事，松花酿酒，春水煎茶。",
      "我见过最美的烟火，是在平凡的夜里。",
      "把遗憾折成纸船，放它漂走吧。",
      "Stay hungry, stay foolish.",
      "The best is yet to come.",
      "All we have is now.",
      "人は皆、星になれる。",
      "また会える日まで。",
      "光さす方へ。",
      "君がくれた夏。",
      "Petit à petit, l'oiseau fait son nid.",
      "La vie est belle.",
      "Der Weg ist das Ziel.",
      "Eppur si muove."
    ],
    quote: "", // 留空就不显示那张签名卡，只留滚动的句子
    quoteFrom: "— reze",
    scrollText: "向下滑动",
  },
};

window.POSTS = [
  {
    id: "post-243",
    title: "G20「19比1」背后：全世界为什么开始抵制中国出口",
    date: "2026-10-31",
    updated: "2026-10-31",
    cat: "日常",
    tags: ["经济"],
    cover: "",
    pinned: false,
    excerpt:
      "1.2 万亿美元顺差创了人类纪录，会场吵的是它的归属。这篇走另一头：会场的算盘、工资条、养老金、法拍房、地方财政、被合并的乡镇、价格战与围堵，以及这个循环怎么解开。",
    content: `<div class="pg-indent"></div><p>今年九月，二十国集团财长和央行行长会议在美国北卡罗来纳州的阿什维尔开。闭幕那天，按惯例该有的联合公报没有出现——谈崩了。美国是这轮轮值主席国，于是自己发了一份「主席声明」。这份声明本身没有任何效力，但它在末尾附了一行小字。</p><blockquote class="pg-quote"><p>除中国外，所有出席成员同意案文。</p><cite>——2026 年 9 月，G20 财长和央行行长会议主席声明附注</cite></blockquote><p>美国财长贝森特拿这行字去开记者会，把它压缩成三个字：19 比 1。他还点了名：持有异议的，是全世界经常账户盈余最大的国家——中国，顺差 1.2 万亿美元，他称之为全球增长的障碍。</p><p>1.2 万亿美元，是人类历史上第一次有国家的贸易顺差破万亿。哥伦比亚大学教授亚当·图兹——英文世界最有影响力的政经评论人之一——听到这个数字时的用词是「令人头晕目眩，而且令人悲哀」：中国本可以把更多产能变成国内的消费，但没有。会场上的一切争吵都围绕这笔钱：该不该管、谁来管、用什么词管。这篇从那行小字开始，走顺差的另一头——先看它在全球算什么、又怎么落进县城的公交和厂里的加班，再走会场上每个人的算盘、顺差的钱到底流向了哪、工资条、就业、养老金、法拍房、地方财政、被合并的乡镇、价格战、外部的围堵、抵制怎么扩散到全球、会场上没吵完的那笔调整账，最后回到订单断了之后和普通人能拿走什么。</p><h2>一行小字能做什么</h2><p>G20 的议事规则叫协商一致：没有投票，任何一国正式反对，公报就发不出来，如此而已。所以「19 比 1」不是一个表决结果——19 不是 19 个真心赞成的国家，只是 19 个没有当场说不的成员。公报作废这件事，一个反对者就够了，用不着凑人数。</p><p>这套规则美国自己用过不止一次。2017 年巴登巴登财长会，美国把延续多年的「反对贸易保护主义」从公报里拿掉，当时没有谁被单独点名；同年汉堡峰会的气候条款谈成 19 比 1；2025 年约翰内斯堡峰会，美国干脆整场没派官方代表。同一把钥匙，自己用时叫坚持立场，别人用一次叫孤立于国际社会。</p><p>这次不一样的地方在那行小字本身：把「除谁之外」单独写出来，等于给在场的 19 个成员做了标记。往后推进供应链限制、矿产管制的时候，这行字会被翻出来当「多边共识」用。成果文件的形态变了——从「全体签了才算数」变成「谁没签谁负责」，而起草权在东道主手里。</p><p>还有一件被那行小字盖住的事：南非，G20 的创始成员之一，没有被邀请参加美国这轮的主席国进程，理由是美方声称的「迫害」——南非政府否认。G20 没有章程，没有开除成员的条款，轮值主席国用行政裁量就绕过了成员资格本身。邀请谁、合影怎么排、声明怎么附注，这些原本纯礼仪性的小事，全变成了站位手段。惯例被用旧了，平台上的每一件小事都要重新谈。</p><h2>会场上每个人的小算盘</h2><p>那 19 个「同意」的国家，各自心里打的算盘并不一样。把会场摊开看，大概分三类——这也顺带回答了另一个常见的问题：为什么只有中国一家拦。</p><p>第一类是真觉得该管管中国的。日本财务相片山皋月当场说，各国对中国过度生产和限制关键矿产出口的疑虑「已经越过底线」——这话比主席声明还直白。欧盟的东布罗夫斯基斯补了一句「美国和欧洲同样要发挥作用」，但前半句先承认了中国是失衡的主要来源。他们跟美国在同一段上有真实的共同利益：欧洲七个月对华逆差涨到 3600 亿欧元，本土的车厂和光伏厂在叫。这批人不是没站出来，是他们本来就站在另一边。</p><p>第二类把矛头对准美国，但不碰中国的段落。德国财长克林拜尔是全场最硬的反对者——他反对的是美国：美以主导的伊朗战争和美国关税「才是全球经济不确定性的主因」，「不确定性是经济增长的毒药」。注意他做的事：跟美国对轰，但没有说一句「我支持中国拒签」。骂美国关税，国内选民爱听；替中国背书，华盛顿会记账。这两件事在欧洲的政治成本完全不同。</p><p>第三类是沉默的大多数。英国的态度是维持对华务实贸易关系、同时「试图改善贸易不平衡」——等于谁也没站。这些国家多半正在排队跟华盛顿谈关税豁免，当众出头的收益是零，账单是即时的。沉默没有代价，反对有——规则是有人反对就全体作废，那就让中国去反对，公报发不出来的结果大家共享。这是一笔很现实的搭便车账。</p><p>还有一个反直觉的名字在「19」里面：俄罗斯。俄财长西卢安诺夫被美方请到了会场，欧洲人事后才得知，气得开幕合影都不跟他站——多位欧洲官员拒绝同框，合影干脆被取消。拉夫罗夫为参加后面的外长会，绕飞了二十个小时才落到美国。俄罗斯跟中国是战略协作伙伴，但在这张桌上它一个字没替中国说：它更急的事是让莫斯科的存在正常化，推动制裁松绑。它不能为了别人的段落，把自己刚拿到手的入场券烧掉。</p><p>所以「为什么没人站中国」的完整答案是：机制上不需要——协商一致下，一个反对者就够了，公报照样作废，中国要的本来就不是有人陪签；利益上不整齐——日本和欧洲跟美国的分歧是「谁来管、用什么管」，不是「该不该管」；成本上不对称——中国顶得住美国的记账，很多国家顶不住。会后也没有哪个国家附和那行小字去谴责中国，会议转入场外磋商后，各方照样分头找中国谈务实议题。态度都在动作里。</p><h2>从全球到县城的四条管道</h2><p>先把尺度交代清楚。对世界来说，这场会算什么？G20 财金渠道成立十八年，公报彻底流产、东道主自发声明的场面没有先例；贝森特借这场会，把「1.2 万亿顺差是全球增长的障碍」钉进了国际叙事；同一周，IMF 把 2026 年全球通胀预测从 4.1% 上调到 4.7%。大国真正在争的是定义权——「失衡」两个字由谁来定义，往后的关税、矿产管制、债务条款就顺着谁的定义长。图兹把这一层看得最明白：这不是一场孤立的争吵，是「中国冲击 2.0」进入全球政治议程的标志，往后每一年的主席国都会用今天学到的写法。</p><p>但说实话，这件事对普通人的直接影响约等于零。没有人因为公报流产丢工作，超市的价签不会因为这行小字动一分钱。我的判断是：它不是阀门，是温度计——病不是它引起的，它只是把体温量给你看。</p><p>可是量出来的温度，正通过四条管道渗进日常。第一条是订单：美国想拉着 19 个成员一起管「廉价出口」，落地就是关税和反倾销——沿海和内陆出口产业带的厂子、货代、配套小作坊最先感觉到，东莞那 10 台断电蒙尘的机械臂就是这根管道末梢的样子。第二条是利率：全球通胀压不下去，各国央行不敢松手，房贷利率的下行空间被牵着一头，月供和存款利息都在同一张网里。第三条是财政：外部越依赖顺差、地方越卖不动地，公交、教师工资、县城公共服务的窟窿越大——后面会专门写。第四条是价格战本身：产线利润薄到一张打印纸，先没的是加班费和奖金，然后是岗位本身。</p><p>后面所有的板块，就沿着这四条管道走。</p><h2>顺差与工资条之间隔着三道闸门</h2><p>海关总署的数：2025 年货物出口 3.77 万亿美元，进口 2.58 万亿，顺差 1.189 万亿。这个数字进了无数标题。同期另一组数字没怎么上标题：顺差创纪录那一年，全行业平均涨薪率 1.2%；制造业招聘量从 62.9 万个岗位掉到 26.9 万。两件事同时发生，中间隔着的不是运气，是结构。</p><p>第一道闸门是分配。顺差的主力早就从纺织玩具换成了电动车、光伏和芯片——这些行业一条自动化产线的产值顶过去的几十条，用的人却是零头。商务部研究院测算过，每百万美元货物出口拉动的就业，一般贸易是 82.7 人次，加工贸易只有 26.5 人次：出口越升级，同样的金额带来的岗位越少。工资的分层是同一件事的另一面——芯片架构师年薪中位数 91 万，传统制造的中级工程师约 20 万。钱没有平均变少，是精确地绕过了某些岗位。</p><p>第二道闸门在企业账上。出口挣回的美元，企业可以选择不结汇，趴在海外账户吃息差；结汇回来的，优先还贷、买设备、修资产负债表、去海外建厂。钱在企业账上转一圈，变成机器、产能和债务，唯独不必然经过工资单。</p><p>第三道闸门最隐蔽：顺差从来不自动等于全民分红。日本上世纪八十年代走过同一条路——顺差狂飙，钱涌进资产泡沫，普通人工资不动，泡沫破掉之后是「M 型社会」。中国这轮的钱更多进了产业能力和基建，算幸运，但底层逻辑相同：顺差只认谁站在资金经过的节点上。图兹把这件事说得更直接：贸易顺差从来都是宏观经济现象——它是一国储蓄大于投资的会计结果，而不是「出口很强」的单方面证明。这句话跟社科院余永定的等式（后面会讲到）是同一个意思的两种说法。</p><h2>赚了这么多，怎么没见花上</h2><p>顺差 1.2 万亿美元，新闻底下最常见的评论是同一个意思：赚了这么多，该让大家消费好啊。这话的算法很朴素——除以十四亿人，人均约合六千块人民币，真发下来谁不会花。问题是这笔钱从头到尾没有以「收入」的形态存在过。</p><p>顺差不是利润，是出口减进口之后剩下的净额。一件出口的商品，价格里先扣掉原材料、设备折旧、运费、工资，剩下的才谈得上赚；整车行业平均利润率 1.5%（后面细说），一万亿的出口流水里真正变成利润的部分薄得很。把流水当利润，是把营业额当成了分红——这是第一层误读。</p><p>第二层误读是钱的去向。东吴证券首席经济学家芦哲把账拆过：2020 年到 2025 年 11 月，六年间商品贸易顺差累计 4.9 万亿美元。其中约 2 万亿美元根本没有回国——企业拿去海外建厂、配美债和欧股，挂在国际收支的资本项下；回流的 2.9 万亿里，真正换成人民币的只有 1.78 万亿，平均结汇率 53%。换回来的那部分，用途是付工资、水电、货款——这几乎是普通人唯一能摸到顺差的地方。没结汇的约 1.1 万亿美元，以美元存款的形式趴在银行体系里，中国金融四十人论坛给这类行为起了个名字，叫「藏汇于民」：外汇不再集中到央行账上，分散在企业和居民手里。</p><p>企业为什么不把美元换成人民币？三个理由，每一条都理性。境外美元利率高企、人民币贷款利率一路往下——一手收高息、一手付低息，财务上躺着就赚利差；汇率双向波动之后，企业学会了「逢高结汇、逢低售汇」，贬值预期里持汇观望是标准动作；出口企业深度嵌在全球供应链里，海外账户上的美元要随时付境外供应商、建海外仓、还外债，资金在境外循环是经营半径的自然结果。外汇储备这些年稳定在 3 万亿出头、没有跟着顺差涨，原因就在这：钱没有消失，是从央行集中持有，变成了央行、企业、居民分散持有。</p><p>所以「赚了这么多该消费」的直觉，错在把一个会计差额当成了一笔可分配的现金。它真实的样子是：储蓄大于投资的缺口摆在了对外账上，对应物是机器、产能、海外资产和银行账上的美元存款——唯独不自动是工资条。这不是谁偷了钱，是钱压根没有走上那条路。</p><h2>高端进不去，低端在退场</h2><p>先把判断放在前面：企业都在搞外资对外，高端企业普通人进不去，没有收入就不敢消费，不消费没有订单，没订单企业不能开工，只能继续这个循环——纵使 GDP 增长、顺差扩大，普通人的困境依然没有改变。这是我的判断，下面的篇幅用来核对它的每一环。</p><p>先看「进不去」。高端产业不是不招人，是单位产值用的人太少。制造业劳动力从 2013 年的 1.15 亿降到 2025 年的不足 8500 万，十二年少了约 3000 万个岗位，同期出口创下历史新高。人少了，产出反而多了——这叫产业升级，也叫增长与就业脱钩。替代是按行业分层的：流水线操作工、电子元件装配的替代率超过八成，汽车焊接七成以上，仓储分拣六成以上；河北临西一家厂 600 台机床只要 9 名运维，小米昌平工厂一条产线从 650 人减到 60 人，富士康昆山的黑灯工厂替代了六万多人。中国去年部署工业机器人 200 万台，是日本和美国加起来的好几倍，每万名工人机器人密度 470 台，全球第三——十年前这个数字是 49。全国已建成的智能工厂超过三万家。</p><p>东莞塘厦有一家五金代工厂，2024 年底花近两百万元装了 14 台六轴机械臂，原计划替掉 22 名工人。第二年海外订单缩成零散小单，自动化产线反而不适配，10 台机械臂常年断电蒙尘。个体的理性是换机器保生存；千万个这样的理性加起来，是岗位减少、消费收缩、订单更少、继续裁员。「机器人也失业了」在这家厂不是段子，是实景。</p><p>「低端在退场」，退到哪去了？首经贸的调研给过三条路径。19 岁的乔煜鑫原来在流水线拧螺丝，「同样是拧螺丝，机器人拧得比人好，还能 24 小时干」，他现在在南京送外卖；有人回贵州铜仁做数据标注员，月入五千，比外出打工多两千；能完成技能跃迁的是少数。行业估算，35 岁以上的普工淘汰率会到六七成。白领会好一点，也有限：麦肯锡测算全球 8.5 亿个岗位十年内将被 AI 深度改造，中国有超 2.4 亿劳动人口面临调整；AI 公司自己就是样本——Anthropic 内部初级员工占比一年半从 21% 降到 14%，初级岗招聘从 27% 掉到 9%。招聘平台的数据显示，2026 届毕业生 1270 万，校招有效岗位约 567 万，国考报名 371.8 万，历史上第一次超过考研——「弃研投公」成了新趋势。体制内的门也在变窄，只是相对没那么窄。</p><p>新创造出来的岗位是真值钱，也是真进不去：具身智能的应届生年薪开到五十万还被业内叫「白菜价」，最高的上百万。同一个招聘季里，一边是百万年薪的算法岗，一边是月薪四千的普工。服务业本该是蓄水池，但 2024 年第三产业的平减指数出现了历史第一次负增长——最大就业池的价格在通缩，服务通缩直接变成就业与收入压力。农民工的处境夹在中间：3.01 亿人，平均年龄 43.3 岁，50 岁以上的占 32%，集中在建筑、装修、制造这些最先被替代的行业。图兹对青年失业有一个观察值得记下：这批毕业生出生在世纪初的繁荣里，童年在高速增长中度过，然后一头撞上减速——「在错误的时间点上陷入困境的人，会被打上代际的创伤」。</p><h2>不敢花钱的那本账</h2><p>「没有收入就不敢消费」这句话，前半段是收入，后半段是预期。预期有单独的账本。</p><p>收入端：居民可支配收入占人均 GDP 约 43%，美国约 80%，全球平均约 60%。劳动报酬占 GDP 长期在 42% 至 46% 之间，比经合组织平均低 8 到 15 个百分点。武汉大学程承坪的研究给了趋势：2000 到 2023 年，资本收益年均增长 11.3%，劳动报酬年均只有 6.1%。MIT 的黄亚生算过更冷的一笔：中国制造业产出中工资所占的比例，1992 年是 6.3%，如今约 3.3%，低于印度和巴基斯坦。平均数还掩盖着分布：2025 年人均可支配收入 4.3 万元，中位数只有 3.6 万——一半以上的人月收入三千多。</p><p>预期端是社保。公共支出里社会保障相关支出约占 GDP 的 8%，经合组织国家平均 25%，同等人均收入的发展中国家也有 15% 到 20%。IMF 的实证给过量化关系：政府社保支出每提高 10%，农村家庭储蓄率下降 0.5 个百分点；医疗支出每提高 10%，下降 0.8 个百分点——保障每厚一层，人就敢花一层。农村家庭的私人医疗支出占可支配收入 9.8%，接近美国的比例，是韩国和加拿大的两倍。</p><p>居民总储蓄已经到了 173 万亿。央行城镇储户调查里，倾向「多存钱」的六成多，倾向「多花钱」的只有两成出头。多出来的一百多万亿，多数不是财富积累，是不敢花的钱。户籍是一个被反复验证的变量：农村户籍家庭的储蓄率比城镇户籍高 7 个百分点，没有城镇户籍的流动人口消费水平低 31%。中国社科院蔡昉测算过，光是让近三亿农民工里的进城者落户，每年就能新增约两万亿消费——一笔躺在户籍制度里的内需。</p><h2>养老金的三个数字</h2><p>养老金的分层可以用三个数字说完：企业职工月均 3640 元，机关事业单位含年金 8136 元，城乡居民月均 281 元。最后这一类的主体是农民，多数人到手 200 到 400 元，不到农村低保标准的一半。替代率同样分层：机关 80% 到 90%，企业职工不足一半，农民近乎零头。</p><p>今年两会，基础养老金最低标准再提高 20 元，从 143 涨到 163。头条上一篇流传很广的文章算了笔账：20 元是两斤猪肉，或者一盒常用的降压药；全国约 1.8 亿人领取，农民占七成以上。官方媒体说这是「八连涨」，而且已经连续三年每年涨 20 元；但山西人大代表郭凤莲在两会的说法是：「每月 200 块钱的养老金，对农民有点儿太亏了。」湖北代表毕利霞在分组讨论上哽咽着建议，农村 70 岁以上老人每月提到 400 元。中国社会保障学会会长郑功成的判断更直接：一两百元，显然不能保障农村老人的基本生活。中国全球化智库的研究员算过一笔更长的账：按每年涨 20 元的节奏，农村养老金要涨到月均 1000 元，得等到 2068 年。</p><p>分层的另一面是缴费的人。2025 年末，2.59 个在职缴费者对应 1 个退休者；往后二十多年，平均每天有 6.3 万人满 60 岁，新增劳动年龄人口只有约 3 万——退一个，补半个。今年 4 月，城镇职工养老金单月出现收不抵支，收入 6148 亿，支出 6204 亿。</p><p>第二、第三支柱也在漏。个人养老金开户 1.5 亿人，实际缴费的只有 22%，四分之三的账户一分钱没存进去；企业年金覆盖约 7% 的职工。九成以上职工退休后只有基本养老金一份收入。吉林四平今年一月的审批数据把弹性退休政策的走向说破了：弹性提前退休 2282 人，弹性延迟只有 25 人——政策给了双向弹性，人只朝一个方向走。这也顺带解释了消费：对养老的预期越紧，当期的每一分钱都攥得越牢。</p><h2>房子先塌的那一层</h2><p>消费预期最大的单项是房子。70 个城市的新房价格已经连跌 37 个月；2021 年以来二手房累计跌约 21%；商品房年销售面积从 2021 年的 17.9 亿平米跌到不足 10 亿，几乎腰斩。居民总资产约一半是住房——房价每跌一格，消费的底气跟着缩一格。有研究用家庭调查数据测算过：房价跌两成的财富冲击，会把城镇家庭储蓄率推高约半个百分点。图兹提醒过一件事的分量：中国家庭的房屋自有率和房产占比都是世界级的，2021 年八成家庭财富拴在房产上，如今仍有七成——房产不是一项资产类别，是婚姻市场、学区、养老的复合凭证，所以它的下行不是账面数字，是生活方式的重排。</p><p>今年上半年，法拍房挂拍 46.3 万套，同比增长 23%，日均 2500 套；其中约 45% 源于普通家庭断供，自住家庭占八成以上——不是炒房客，是交不起月供的人。连续三个月断供的人超过 187 万，一年多了 35.6%；有经济学家估算，约 800 万人因断供成了失信被执行人。断供家庭里，六成存款不到 5 万；45% 的断供原因直指失业——餐饮、地产、教培这几个收缩最快的行业。</p><p>账本是这本账最冷的部分。燕郊有人 2017 年 426 万买的房，2026 年法拍 68 万成交，首付没了，房没了，倒欠银行 25 万；四线城市一套 208 万买的房，33 折拍出 70.1 万，房主还倒欠 70 多万。成都一个人七年还了 61 万，其中 34 万是利息，断供后罚息加诉讼费又背上 8 万多。法拍市场的「七折捡漏」同样是坑：约三成法拍房藏着占用或租赁纠纷，隐性税费能到房价两成——深圳有买家五折拍到房，倒贴 127 万欠税。</p><p>法拍真正可怕的还不是个体的账，是螺旋：法拍成交价通常是市场价的五到六折，一套同户型房子被贱卖，整个小区的议价空间被强行拉大，银行抵押估值跟着缩水，更多家庭变成负资产，更多断供接踵而至。43.4% 的城镇家庭背着房贷，刚需家庭月供占收入 33%，超过国际 30% 的警戒线——名义工资的增长先填月供，剩下的才谈得上消费；还有一批人干脆取出存款提前还贷，把未来的消费换成当下的安全感。2026 年 8 月央行出了纾困新政，还款困难可以协商延期、展期，给了 90 天的窗口——银行不是心软，是算账：法拍亏 75 万和协商收回 290 万之间，选后者。新政之后，申请延期的客户一个月里涨了 156%。</p><h2>地方财政的退潮</h2><p>这些事背后有一个共同的出资人：地方财政。要理解地方财政为什么退潮，得先看它的钱从哪来：1994 年分税制改革之后，最容易收的增值税大头归了中央，地方留下的是发展任务；于是地方找到了土地——出让金不进一般预算、卖地一次收几十年的钱，地产商拿地盖楼，楼价里含着下一轮的土地财政。这个循环转了快三十年，高峰期土地出让金占地方综合财力的八成。图兹对中国房地产有一个大尺度的判断：过去三十年中国建成的房屋占全部存量九成，五亿人——相当于整个欧洲的人口——进了城，这不是一次普通的房地产繁荣，是世界史级别的迁徙；也正因为它体量太大，它的退潮不可能不波及每一个人。</p><p>现在这个循环停了。土地出让收入 2021 年峰值 8.7 万亿元，今年前 7 个月只有 1.17 万亿，同比下降 30.8%，全年预计回到 2010 年的水平；土地占地方财政收入的比重，从 84% 掉到 14.2%。两本账合计从 21.6 万亿缩到 16.5 万亿，回到 2019 年——但支出从 20.4 万亿涨到了 23.5 万亿。收入倒退七年，支出涨三成，缺口就是所有那些新闻的总和。</p><p>传导到日常生活的路径非常具体。全国公交车一年亏 2000 亿，平均每辆车亏 23 万，商丘、保定、衡阳的公交成批停运减班——站牌还在，车不来了。浙江的公务员去年降薪，科员一年少拿五六万；中部有县教师的工资「何时有钱何时发」，连着三个月只发基本工资。有的城市罚没收入增速超过 20%，个别超过 50%——罚款成了补窟窿的方式，营商环境反过来被啃。基建也在放缓，今年前 7 个月全国性基金支出下降 16.4%；连拆迁款都从半年一付拖成了两年。</p><p>审计署 2024 年的报告：超过 60% 的县级政府存在基本收支缺口，15% 的县连工资都难以完全保障；西南财大测算，全国县平均财政自给率只有 38%。中部某县去年底账上可用资金不足 100 万元，当月工资缺口超过 6000 万。中央转移支付 10.42 万亿连续四年破十万亿，性质从「帮你发展」变成了「保你不倒」；两万亿置换债平均期限 19.8 年——化债不是还钱，是换债主、换期限、买时间。而学界算过，没有任何单一税种能填上土地出让金的量级缺口：从卖地一次收大钱，转向房产税这类细水长流，方向已经清楚（房产税收入今年还在逆势增长），但转换期就是现在这个样子。</p><h2>被注销的家乡</h2><p>财政退潮最深的一层，是地图本身。22 年间，全国乡级行政区从 17196 个减到 7023 个，降幅近六成。今年 10 月，安徽祁门一天撤销三个乡，其中一个常住人口只剩 2010 人。伊春 2019 年一口气撤掉 7 个区，从 15 区变成 4 区 5 市，七年后财政自给率仍然只有 11%，合并出的县 GDP 只有 21 亿。</p><p>收缩有一个固定的顺序：年轻人先走，村小和乡校关停，卫生院缩减，班车减班，人口不足以支撑建制，最后是撤并公告。不是轰然崩塌，是温水一样一点点褪色。山西一个县把党政机构从 36 个减到 22 个，编制从 1900 压到 600 多，一年省 1 亿多——可这个县的财政缺口是 9 亿。合并不是止血，是承认血止不住之后换个姿势。云南永仁的机构精简了 29%，全国有几十座到上百座地级市被学界划进收缩序列。</p><p>对个人来说，收缩是具体的：老家的房子越挂越便宜——凤凰网的一句评论被转了很多次，便宜不是机会，便宜是结果；回县城考编的退路在变窄，机构合并、编制压缩；而整个社会第一次要学着接受一件事：不是所有地方都会永远增长。人口流出的城市进入负循环——人口减、住房需求减、土地收入减、公共服务减、人口加速流出；人口流入的城市靠产业税基撑住。中国未来的财政问题不是全国同幅度的困难，是区域分化。</p><h2>两亿人在保障外面</h2><p>制造业退场的人去了哪？官方口径叫灵活就业，规模约 2 亿人。这个群体的养老和医疗保险参保率不足一半，持续缴费的只有一半左右，约半数人断缴过。外卖员不愿意每月拿出 800 元参保，他的原话是「更愿意给女儿买玩具」——这不是短视：月入两三千的人，当期生存天然排在四十年后的养老金前面。</p><p>缴费结构也不合身。养老加医疗每月普遍超过 1000 元，月入 7000 的网约车司机，社保要占掉近两成；而灵活就业者的收入，四成五的人每月波动 500 到 1000 元，近两成波动 1000 到 3000 元。传统社保「固定额度加刚性周期」的设计，跟这种收入节奏是错开的——不是他们不想参保，经济日报的调查里参保意愿高达 95%，是制度跟收入形状对不上。</p><p>政策在补：职业伤害保障试点扩到 31 个省，按单计费、平台全担，参保已近 3000 万人；灵活就业可以在就业地参保，不再看户籍；平台被要求公开派单和计价规则；公积金也开始试点自愿缴存。方向是对的，从补缺口转向建体系——但 2 亿人的蓄水池，底还没有垫上：这批人一旦年老、生病、失业叠加，缺口是直接抛给家庭和财政的。而且蓄水池还在进水——制造业每消失一个岗位，就多一个灵活就业者。</p><h2>补贴的透支账</h2><p>促消费的主流工具是补贴。今年以旧换新安排 2500 亿国债资金，上半年撬动销售额 1.1 万亿，比例 1 比 10.3，单看很漂亮——可同期整体消费增速只有 1% 左右。补贴没有做大蛋糕，是把明年的消费挪到今年：一季度补贴退坡，新能源车销量立刻同比下滑 17%，部分家电零售额转负。消费者学会了「等补贴再买」——补贴从催化剂变成了前提条件，退坡之日会不会断崖，是比 1.1 万亿更要紧的问题。</p><p>补贴还有累退性：垫资门槛和准入门槛利于大企业，行业集中度提高；买得起新能源车和新款家电的，本来就不是最不敢花钱的那批人。想买而买不起的人，够不着补贴。经济学里的常识在这里再次应验——低收入群体的消费乘数远高于高收入群体，同样一千块，给农村老人是雪中送炭，几乎全部变成消费；给中产是锦上添花，多半进了储蓄。</p><p>居民端的金融环境在往另一个方向推。国有大行一年期定存挂牌利率今年跌到 0.95%，跌破 1%——100 万存一年，利息从 1.45 万缩到 9500 块。四五月间居民存款两连降、合计 2.05 万亿，听着像钱进股市了；中金的穿透数据是：流入股票保证金约 4510 亿，流入寿险 1.5 万亿。风险偏好没有上升，是在 1% 里找 2%。全年「存款搬家」的规模机构测算超过 10 万亿，而今年集中到期的定存有 50 到 75 万亿——这么大的量在体系内找不到既有安全又有回报的去处，正是内需不足在金融层面的样子。</p><h2>价格战与空转的产线</h2><p>企业那头也不好过，只是不好过的方式不一样。GDP 平减指数——覆盖全部商品和服务的最宽价格尺——从 2023 年起连续十一个季度为负，历史上罕见；2026 年二季度才转正。光伏综合价格指数、碳酸锂电池价格指数在两年半里跌了八成以上。价格跌成这样，不是需求消失，是供给停不下来。</p><p>比利时泽布吕赫港的停车场里，上万辆中国电动车整整齐齐排着，不少已经停了四个月——瑞典媒体调查，安特卫普和泽布吕赫两个港口积压的中国电动车接近八万辆，欧盟每进口五辆就有一辆最终停在堆场上。海运费在烧，电池在潮气里慢慢放电，而统计报表上它们已经是「出口再创新高」。传统的出口逻辑是找到买家再发货；现在是先把货扔到港口再慢慢找买家，港口成了免费仓库，滞港费吞噬本就不厚的单车利润。</p><blockquote class="pg-quote"><p>生产线一旦建成，折旧和利息不会因为订单不够就停下来。为了摊掉固定成本，企业只能按低于完全成本的价格往外卖，先亏着，赌对手先扛不住。</p><cite>——标普信评 2025 年光伏行业报告的判断，硅片环节产能利用率 2025 年上半年仅 38.7%</cite></blockquote><p>标普信评的数据：光伏组件年产能突破 1100GW，全球实际装机需求约 530GW，各环节产能利用率四到七成；已有四十多家中国光伏制造商破产、被收购或退市，活下来的五大龙头裁掉了三分之一的员工。电动车的账差不多：全行业产能突破 3600 万辆，市场一年消化约 1700 万辆，利用率五成——汽车业公认的健康线是八成。结果落在利润表上：中汽协披露，2026 年上半年国内整车制造环节平均利润率跌到 1.5%，十年新低；一辆 20 万的车净赚约 3000 块，比一张打印纸还薄。比亚迪销量涨 23%，利润掉 30%。卖得越多，赚得越薄，越要靠出口走量——这条线把价格战和顺差直接连了起来。图兹写过一篇流传很广的评论，标题就叫「浪费中国过剩的太阳能产能是疯狂之举」：太阳能板的产能是半个世纪才等来的技术突破，价格已经跌到谷底，工厂却在闲置——他算过另一笔账，经合组织的数据显示，中国建成全球主导的光伏产业，十五年里花的产业补贴不到 180 亿美元，这个回报率「让西方政府只能羡慕」。他不是在替中国辩护，他是把这场过剩看作全球范围的协调失败：一边是霍尔木兹海峡关闭搅动油价，一边是过剩的清洁能源产能没有买家。</p><h2>围堵是怎么常态化的</h2><p>顺便把会场外面的事也交代了，因为 19 比 1 不是凭空来的。欧盟对中国产电动车的反补贴税 2024 年 10 月终裁：比亚迪 17%，吉利 18.8%，上汽 35.3%，特斯拉上海产 7.8%，蔚来小鹏这类配合调查的企业 20.7%，叠加 10% 基础关税，最高综合税负 45.3%。一辆到岸 3.8 万欧元的车，光关税交一万多欧。税率不是按损害算的，是按配合度排档——配合调查本身成了定价变量。值得记住的是投票那天：十国赞成、五国反对、十二国弃权，德国投了反对票，朔尔兹公开说关税战对谁都无益——布鲁塞尔从来不是一块铁板。</p><p>这套工具还在升级：插混的反补贴税已经在准备；「工业加速器法案」要求参与欧盟公共采购的电动车在欧盟组装、非电池零部件本地含量不低于七成；碳关税 2026 年进入付费阶段。但也有反噬：意大利禁中国光伏组件参与招标，结果招标价暴涨四成、完成量不足规划三成，只好悄悄放宽——欧洲光伏协会估算，禁令让欧洲光伏装机成本上升 35%，碳中和目标至少推迟五年。而关税的实际效果是：2026 年一季度中国品牌在欧洲纯电销量同比增长 109%，插混进口量涨了 182%，五年里份额涨了 14 倍。欧洲工程师蹲在展台边用塞尺量中国车的车身缝隙，量出 2.8 到 3.0 毫米——比他们自己的豪华品牌标准还紧。</p><p>图兹给这场冲突起了个名字：「中国冲击 2.0」。他说第一代冲击——2000 年代纺织品和家具打垮欧美工厂——是全球化撞上社会，是教科书里的故事；这一代不一样，驱动它的不是低工资，是一整代工程师的投资加上有效的产业政策，是北京从第一代冲击里学习之后主动选择的结果。「道德说教没有用」，这是他给欧洲人的建议；给中国的建议是另一面：发达民主国家的政治反应是真实的，不能当作不讲道理无视掉。两边说得其实都是同一件事：这场冲突会长期化，它不取决于谁对谁错，取决于双方的国内政治。把这句话放回阿什维尔，19 比 1 就是这个长期化在财长桌面上的样子。</p><h2>抵制是怎么扩散到全世界的</h2><p>会场上吵的是条款，会场外面，抵制早就在一件一件地发生了。中国世贸组织研究会贸易救济专委会的年度盘点：2025 年，30 个国家和地区对华启动 167 起贸易救济调查——反倾销 128 起、反补贴 26 起、保障措施 13 起，是中国入世以来第二高位。发起方排座次：印度 31 起最多，美国 22 起，欧盟 15 起，加拿大 13 起，墨西哥 12 起，澳大利亚 11 起，巴西和土耳其各 10 起；超过三成的案子由「一带一路」国家发起。更扎眼的是占比：美国自己启动的贸易救济调查里 30.6% 针对中国，欧盟的这个比例是一半。</p><p>节奏也在变快。WTO 的数据，2023 年上半年各国对华双反调查每半年只有 20 到 30 起，2024 年下半年骤增到 125 起。日经新闻按中国海关月度统计测算了 17 类主要出口产品的单价：2025 年前 10 个月，平均单价同比下降的占 68%——这个比例从 2023 年起一直停在高位。低价流量走到哪，救济调查就跟到哪：巴西调查中国钢材，印度调查光伏组件和手机壳，日本调查不锈钢板，泰国对柠檬酸征税，越南对中国钢板征反倾销税。日本第一生命经济研究所首席经济学家西浜徹的判断是：「中国与全球南方之间有可能发生新的摩擦」。</p><p>为什么围绕中国出口的争议越来越大？拆开看其实是一个物理问题：中国顺差 1.2 万亿，意味着贸易对手方合计逆差 1.2 万亿——历史上从来没有一个国家以这个量级往外发过货。低价冲击先到欧美，欧美的关税墙立起来之后，货转向新兴市场，冲击跟着转向，新兴市场的抗议和调查跟着多起来。十几个市场的调查书措辞各异，诊断是同一句话：你卖得太多、太便宜，我的产业接不住。这不是谁跟中国过不去，是顺差本身的重量。</p><h2>争的不只是价格，是谁掏调整的钱</h2><p>回头细看那行小字对应的条款，会发现会场上的分歧比「中国反对」四个字复杂得多。北大教授卢锋和杨景翔把主席声明有争议的第 10、11 段逐句拆过：第 10 段用三句话阐述所谓「非市场政策和做法」的负面影响，只有一句提到逆差方的调整责任；第 11 段要求 IMF 和经合组织围绕「非市场政策」改进数据、提供情景分析。卢锋的解读很直白：这实质上是要求国际组织为一个缺乏多边共识基础的负面标签搜集证据。三个词指谁，会场里没有人有疑问。</p><p>中方的回应不是网传的气话，是当场正常说出来的。人民银行行长潘功胜在那场会上说：化解全球失衡需要各国推进结构性改革——逆差国降低财政赤字、提高国内储蓄率，顺差国适度扩大消费与投资。一句话把账摊平：调整是双向的，不能只让一方答卷。10 月 16 日，财政部长蓝佛安在 IMF 年会上又补了一层：全球失衡根植于经济全球化、国际分工、储备货币格局和各国宏观政策选择——翻译过来就是，美元作为储备货币的地位本身，就是失衡的一部分：美国印钞、全世界接，逆差是这套体系的运行方式，不是某一国的道德瑕疵。</p><p>学界把这层意思说得更直白。《中国报道》杂志一篇分析用的标题就是「全球经济再平衡是必答题，但不能只让中国答卷」：失衡是中美欧各自储蓄—投资结构差异与美元「吸收器」效应共同作用的结果，缺任何一方都难以形成今天的格局；郑永年的判断是，中美贸易与科技之争只是表象，深层症结在于 2008 年金融危机后始终没有修复的世界经济失衡。卢锋给出的可操作版本叫「三增」：美国提升国内储蓄、中国扩大国内消费、欧盟扩大有效投资——三家各拿一张自己的清单，谁也别只批改别人的。</p><p>这三张清单的难度并不相等。中国扩消费，花的是自己的钱，可行性和可持续性都最强；美国提储蓄，意味着收敛财政赤字、压制举债消费——动的是自己的生活方式，国内阻力结构性存在。这也是为什么调整成本的归属才是真正的争点：补贴怎么算、消费算谁的错、谁先动，每一项谈不拢，最后都会变成关税、汇率和管制的条款，顺着前面那四条管道落到订单和工资上。会场争的是措辞，账房里争的是钱。</p><h2>灰心是怎么变成数据的</h2><p>还有一层材料不是统计，是情绪，要跟前面的数据分开看。社交媒体上，「低欲望」的表述这一年变多了，但细看内容，多数不是躺平，是一种防御性清醒：埃森哲的调研说，82% 的 Z 世代刻意压缩非必要支出，76% 的大额消费把「经济实用」放第一位；25 到 30 岁人群的平均储蓄率从 2023 年的 18.7% 跳到 31.2%；「无品牌标签」的商品销售额一年涨 120%，豆瓣的抠门小组三年涨了四百万人。他们的自我描述高度一致：不是舍不得花，是不往不值得的地方花——安全账上为几毛钱比价、在代工厂源头找同款，情绪账上演唱会一千多照买。两本账分得很清，这本身就是一种精算。</p><p>一位头条作者的总结流传很广：「从前努力能翻盘，现在努力只保平安。」这话进不了论文，但 IMF 的储蓄数据、央行的储户调查跟它说的是同一件事：当增长预期变窄，预防性储蓄就变成集体的动作。抖音上有人记录自己一年没买新衣服、蹲超市晚市抢半价菜、存纸壳卖钱，9.9 元包邮的订单量涨了 126%——「降级的是消费，升级的是清醒」这句评论本身也成了流行语。手机换机周期从 33 个月拉长到 40 个月以上，理由不是买不起，是「新机提升没到非换不可的程度」。折扣零售市场规模到了 2.28 万亿，临期食品超 500 亿，增长最快的是 26 到 35 岁——不是买不起正价，是不想为「刚出厂三天」那个标签多花钱。这些微观选择加总起来，就是宏观上那 2.9 万亿的消费缺口。B 站上讲宏观的几个头部博主——讲居民消费率只有四成、讲顺差占到全球四成、讲「该涨工资了」——每条都是几十万播放，弹幕里反复出现的句子是「苦一苦自己」「不是不想花，是不敢」。这些视频本身也成了材料：普通人不是不关心宏观，是要在宏观叙事里找自己那份的解释。</p><h2>这个循环为什么转得这么稳</h2><p>现在把判断里剩下的环节补齐。不消费，订单确实会少——内需指望不上的时候，企业只剩出口一条路；要保出口，就要压成本，压成本就是压工资、加时长；工资越压，消费越弱，内需越指望不上。循环的每一环都是个体的理性选择，合起来是集体的锁死。</p><p>循环里还有一根最慢的指针：生育。2025 年出生人口 792 万，1949 年以来最低，是 2016 年 1786 万的一半再一半；结婚登记 610.6 万对，改革开放以来最低。育娲智库测算，养一个孩子到 18 岁平均 53.8 万，相当于人均 GDP 的 6.3 倍，几乎全球最高；国家每年 3600 元的育儿补贴，只占它的 2%。隐形成本同样吓人：生育后女性失业率升约 6.6%，工资降约 17%。幼儿园四年关停超过 6 万所，小学在校生一年少了 406 万。孩子是二十后的劳动力和消费者——不敢生，本身就是对未来最长的那笔投票。</p><p>它转得稳，还有一层制度原因：在现有的分工里，抓生产是熟练活。给地、给贷款、给补贴，几个月见效；提消费要给居民真金白银——社保补齐、转移支付、发钱——见效慢，记功难。没有哪个部门的考核指标是居民的消费。这套分工有自己的历史：出口导向是当年正确的选择，劳动力无限供给的年代，压住工资就是竞争力；问题在于引擎换了，制度的版本没换。</p><p>出口退税是这个偏向最具体的形状。高峰期中国一年退税约 2 万亿元，这笔钱压低了出口商品的价格，受益的相当一部分是外国消费者和中间商。凤凰网的一篇分析把这层窗户纸捅破了：如果企业拿到的政策支持没有变成更高的工资和更强的购买力，而是主要用来压低出口报价，「国内社会承担了公共资源的机会成本，海外消费者却可能享受到部分收益」。连一贯替现政策说话的胡锡进都说得不含糊：「我们自己压低利润、拼命内卷降价，让海外民众享受廉价中国制造，钱让海外中间商赚走，还不断招来贸易壁垒——费力不讨好。」</p><p>对照着看另一组数字就够了：出口退税一年两万亿，农村基础养老金一个月 163 元。同一个财政的两个出口。</p><h2>替另一半话说几句</h2><p>骂到这里得停下来，替对面说几句，不然就是一边倒。</p><p>消费率其实在回升：37.9%（2020 年）到 40.0%（2025 年），五年涨了 2.1 个百分点。「十五五」规划头一次把「居民消费率明显提高」写进五年规划的主要目标——这个指标以前连门都不进，现在进了门。反内卷有了实绩：平减指数今年二季度转正，光伏和碳酸锂价格从底部大幅回升，《价格法》二十七年来首次修订，「无底线卷价格」写进了法条，八大多晶硅企业还联签了反内卷倡议。</p><p>产业升级是真的：高技术制造业增加值今年前三季度同比增长 14.3%，新能源车渗透率过半，全球创新指数中国第一次进前十。外贸不是白干——直接间接带动 1.8 亿人就业，约占全国就业的四分之一；人民币今年还升值了约 3.8%，一度创三年半新高，购买力并没有崩，只是分配的环节卡住了。官方还有另一套口径：资金流量表里住户部门可支配收入占国民总收入的 62%，与「人均可支配收入除以人均 GDP」得出的 43% 差得很远——两套数字并存，测的不是同一个东西，这本身也值得交代。</p><p>还有一种反驳比这些都硬：这一切是周期，不是制度——等外需回暖、等 AI 红利扩散，循环自己会解开。这个反驳值得认真对待，但它有一个漏洞：周期解释不了工资占产出的比例为什么三十年往下走，也解释不了社保占比为什么离经合组织那么远、个人养老金账户为什么四分之三空着。周期会过去，滞后的制度不会自己追上来。所以我的结论不是崩溃，也不是大好，而是引擎换挡期——新引擎马力强，但吃人少，而分配制度还停在为旧引擎设计的版本上。</p><h2>余永定的那个等式</h2><p>把这件事讲得最透的是社科院学部委员余永定。2026 年 4 月，他在上海一场学术沙龙上从一条会计恒等式讲起：经常账户差额，等于国内储蓄减去国内投资。顺着这条等式，近两年顺差的扩大，并不说明出口突然变强了，而是国内需求相对不足、储蓄大于投资的缺口直接摆在了对外账上。报道里说，他把顺差称作「内需不足的一面镜子」。这条等式的政策含义顺理成章：要改外部失衡，从内需下手——增加消费、适度扩大财政赤字，而不是反过来。图兹从另一个半球得出了同一个结论，用的也是同一套宏观恒等式——两边唯一的分歧是节奏：图兹担心中国出手太慢，余永定担心的是刺激的方式不对。</p><p>这不是新话。吴敬琏多年以前就提醒过出口导向战略的极限：中国的高速增长某种意义上得益于发达国家自身的失衡，如果人家再平衡了，中国就会面临出口需求不足的大问题。国开行原副行长刘克崮说得更直接：「我们在出口退税的问题上有一些误区……现在的问题是，在这一原则下，中国的退税退多了。」《半月谈》把这场讨论记了下来——那是 2010 年，十五年前，讨论的主语和今天一模一样。十五年里，顺差从一千多亿涨到了一万多亿。</p><p>余永定 2026 年在清华五道口的圆桌上把话说得更重：落实双循环，清理出口导向政策的残余，包括出口退税与各类补贴；同时也要认真自查有没有过分退税的地方，「否则没有什么道理不道理的」。同一场讨论里，他提了一句更重的话——</p><blockquote class="pg-quote"><p>凯恩斯说了，贸易摩擦是要导致战争的，这不是谁对谁不对的问题，是现在的政治考虑问题。</p><cite>——余永定，清华大学五道口金融中心全球失衡圆桌，2026 年</cite></blockquote><h2>别国的两种走法</h2><p>内需转型不是空想，历史上做过两次大实验，结局相反。</p><p>日本是被逼的。1985 年广场协议，日元大幅升值，出口立国忽然走不通，日本提出「启动内需」——当时汽车有了，房子有了，没什么可启动的，结果把股市和房地产启动了起来。1989 年东京的地价据说可以买下整个美国，然后泡沫破了，接着是「失去的三十年」。教训不是不能扩内需，而是靠宽松吹出来的内需是资产泡沫，不是消费。日本后来也真转过去了：完善社保让居民敢降低储蓄率，产业往自动化和半导体走——只是转型期太痛，代价是二十年。</p><p>德国签了同一份协议，结局不同。它的出口结构里，单一品类占比一般不超过 25%，日本同期汽车加机床合计占七成，市场分散，摩擦天然少；两德统一又送来一个现成的内需市场。更根本的是底层设计：战后德国完成了养老、疾病、失业三大保险改革，职工进监事会、可以持股，劳资共治写进制度——消费敢不敢，看的是这些底座，不是促销。</p><p>香港学者庄太量给中国的参照系也是德国：服务业占六成、同时保留强制造业，「引导大学生投入高端制造业，提供高质量与高薪酬的就业」。翻译成大白话：高端不能只是产值高端，得是就业高端——德国制造业养着高工资的技术工人，中国的制造业升级也必须回答「升级之后人在哪」这个问题，否则产值越高，循环越紧。</p><h2>现在正在动的是哪几处</h2><p>政策不是没看见。2026 年这一年，能数出来的动作至少有这些。</p><p>钱直接给人：育儿补贴制度落地，全国财政安排 1000 亿元，三岁以下每孩每年 3600 元，免征个税；城乡居民基础养老金最低标准再提高 20 元；免费学前教育从幼儿园大班开始，惠及约 1400 万儿童；中度以上失能老人每月最高可领 800 元养老服务消费补贴，补贴跟着人跨省走；居民医保财政补助提到每人每年 700 元。</p><p>钱从出口端往回抽：光伏产品 2026 年 4 月退出出口退税；10 月公告，2027 年 4 月起电动汽车等出口退税率从 13% 降到 9%——离岸价 15 万元的车，一辆少退约 6000 元。文件里的说法是促进出口产品结构优化，翻译过来就是：别再靠低价卷了。这一步和欧盟的价格承诺谈判是同一盘棋的两面——与其把利润让给关税，不如留在自己账上。</p><p>中央经济工作会议的说法是「必须坚持投资于物和投资于人紧密结合」。人社部的配套：就业补助资金 667 亿，补贴性职业技能培训超 1100 万人次，1410 亿困难群众救助资金提前下拨；今年春风行动两个多月办了两万多场招聘，带来 1300 多万个岗位。这些是端口上的动作。</p><p>制度层的账还没算完，学者给的清单更长：提高个税起征点、消费税后移到消费环节征收（谁消费谁所在的地方政府分税，地方才有动力留人促消费）、划转国有资本充实城乡居民养老金、放开除个别特大城市外的户籍限制。蔡昉测算的那两万亿就挂在户籍上——2.5 亿进城不落户的人，消费模式被压在生存型。</p><p>难处也不必回避：地方财政的收入大头来自生产环节的增值税和企业，不是居民的工资单和消费小票。抓生产有税源，促消费是支出——这个结构不改，端口上的政策会一直事倍功半。我的看法是：发券是止痛，垫保障才是治病。止痛的剂量这两年给得不算小，治病的方子刚开出来，抓不抓得动药，看的就是财税那块硬骨头。</p><h2>订单断了之后：压工资，还是涨收入</h2><p>现在把话说回到最实际的一层。假如出口增长遇到更多阻力——关税再加、调查再多、壁垒再厚——接下来是继续压低工资和成本，还是让居民多获得一些收入，真正撑起国内市场？这个问题在报纸上是社论，在每个外贸厂的计划表上是选择题，而且已经在选了。</p><p>企业的选项其实只有三条，一篇流传很广的外贸分析把它们列得很清楚：涨价保利润——但海外市场是完全竞争，一旦涨价，订单转头就下给汇率稳定、人工更低的东南亚工厂；降价保订单——亏本或微利接单，中小工厂没有资本兜底，亏几个月资金链就断；缩减产能、裁员降薪——大部分企业的无奈选择。三条路里，前两条通向丢订单或倒闭，第三条通向普通人的工资条。现实里选第三条的是多数。</p><p>已经发生的样本不用到统计年鉴里找。搜狐时间线记录的江浙沪县城：南通一个做了五年机械设计的工程师，厂子砍掉大半外贸订单，月薪从八千直接降到五千，季度奖年终奖全部取消，一线工人裁掉一半；绍兴的袜厂订单少了三分之二，工资压到三千八，还得两班倒。当地人的说法是「不是慢慢降，是直接跳水」。沿海玩具厂还有更隐蔽的版本：旺季计件单价八毛一件，进了淡季悄悄降到五毛，强度不变，收入少三分之一，车间主任的答复是同一句——想干就留，不想干随时可以离开。</p><p>官方问卷印证的不是个例，是方向。国家统计局常州调查队对 126 家外贸型中小企业的调研：在影响出口的困难里，「国际市场需求下降」以 64.3% 居首；24.6% 的企业订单同比下降；近一半企业只做「离职补岗」式的招聘，全面扩招的只有 4%。订单、就业、工资，是同一根绳子上的三个结，拽动任何一个，另外两个都会跟着动。</p><p>对单个厂，降薪压成本是最理性的自救；千万个厂一起降薪，就是前面写过的那个循环原样闭合：工资收缩，消费更弱，内需更薄，企业更离不开出口，于是继续压价保市场。另一条路是让居民多获得一些收入——社保垫厚、工资涨上来、转移支付到位——把国内市场真正撑起来，让企业手里有第二个可去的市场。两条路的分岔，就是阿什维尔那场争吵的实质：美国逼的是第一条路别再走（它怕低价），学者劝的是第二条路赶紧走（它怕锁死）。退税下调、育儿补贴、养老金提标，都是从第一条路往第二条路挪的尝试，挪多快，取决于财税那块硬骨头啃不啃得动。对普通人来说，看懂这道选择题，比记住 19 比 1 这个比分有用得多。</p><h2>普通人能拿走什么</h2><p>这篇写到最后，该回答那个最实际的问题：普通人能从这件事后面拿走什么。不说宽慰话，只说机制推出来的几个读法。</p><p>第一个读法，给新闻祛魅。再看到「顺差创新高」「出口再超预期」的标题，可以先过一遍三道闸门：这笔钱走到谁的工资单上了？涨薪率 1.2% 和 1.189 万亿同年成立，已经演示过一遍答案。同样，再看到「19 比 1」这类多数对决的说法，先想协商一致——数出来的比例往往是话术，不是表决。看懂机制不改变任何事情，但能省下很多被标题牵着走的情绪。</p><p>第二个读法，盯两个数：农村基础养老金和出口退税率。它们比财长会公报诚实——公报说的是立场，预算说的是选择。一个财政一年两万亿退给出口、一个月 163 元发给农村老人，这两个出口的口径每动一次，都在回答「这次真的转向了没有」。明年这个时候看它们，比听任何发布会都准。</p><p>第三个读法关于自己。循环里个人能动的杠杆其实只有两个：技能和负债表。技能决定你站在三道闸门的哪一侧——对照那张替代率的表，流水线和基础文书在左边，运维、数据标注、养老护理在右边，挪半步都比原地强；这算不上上进学，是位置学。负债表决定能扛多久——法拍那一节的账摆在那里，六成断供家庭存款不到五万，低利率时代把杠杆压住，是给自己留重来的本金。灵活就业的社保能接就接，职业伤害保障已经按单计费、平台全担——蓄水池的底，得自己先垫一块。</p><p>至于出路，往大了说就是那几件正在动的事：户籍、社保、财税、退税。每一件都不起眼，每一件都直接改工资条和养老金。「十五五」头一次把居民消费率写进规划指标，意思是考核的尺子终于开始量消费了。尺子换了，被量的人才会跟着换动作——这句话对政策部门成立，对每个人的处境也成立。慢变量的好处是方向一旦确定就不容易掉头；坏处是慢。普通人能做的，是别把慢变量当成不存在。</p><h2>两个出口</h2><p>回到阿什维尔。那场会没有公报，谈崩的四段里有一段，把「过度依赖出口的扭曲」写进了成果文本。抛开是谁在推这句话不谈，它描述的现象是真的：会场外面，1.2 万亿顺差的另一头，站着不敢花钱的人。</p><p>有意思的是，中美两边吵的是这笔钱的归属，诊断书上是同一个病。贝森特说中国消费太少，刘元春算出每人每年少花 2000 块——两边在事实上没有分歧，分歧只在谁负责。而每天，这个国家有 6.3 万人满 60 岁，有 2500 套房进入法拍程序，有大约 6800 个制造业岗位消失——顺差、养老金、法拍、就业，是同一台机器上不同的表盘。</p><p>所以明年这个时候，不用等下一场财长会，盯两个数就够：农村基础养老金涨到多少，出口退税率还剩多少。一个管「敢不敢花」，一个管「非出口不可」。这两个数动了，工资条会先知道；那行小字，才有另外的写法。</p><h2>可以看看这几个视频</h2><p>这几个视频都过了关：第一个视频把「19 比 1」那场会的来龙去脉讲得最完整，出自 B 站讲宏观的头部博主「大汪和园子」，本篇好几处用到了他的梳理；第二个三分鐘是刘元春把消费不振定性为分配问题的片段；第三个用陆铭的研究讲「低价出口其实在补贴国外消费者」；第四个讲顺差占到全球四成之后内需为什么成了唯一出路；第五个直接讲收入分配为什么不能再拖。</p><figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1udt66NETj" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1udt66NETj&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>《G20「19比1」背后：为什么全世界都开始抵制中国出口》（约 28 分钟）：公报流产、四段争议与「第二桌」</figcaption>
</figure><figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1BaS5BhEXX" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1BaS5BhEXX&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>《居民消费率 38%，比阿根廷还低？刘元春：消费不振，是分配问题》（约 3 分钟）</figcaption>
</figure><figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1fAxF6hESD" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1fAxF6hESD&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>《我们的加班制造的低价商品，正在补贴国外消费者？》（约 17 分钟）：陆铭谈收入分配与出口</figcaption>
</figure><figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1Cyn86jEkc" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1Cyn86jEkc&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>《中国贸易顺差已占全球 40%，只能孤注一掷搞内需了》（约 3 分钟）</figcaption>
</figure><figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1tkpd6hEjt" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1tkpd6hEjt&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>《中国该涨工资了：收入分配不能再拖了》（约 19 分钟）</figcaption>
</figure><h2>参考</h2><ul class="pg-refs"><li><a href="https://news.qq.com/rain/a/20260902A08MDG00" target="_blank" rel="noopener">G20 阿什维尔财长会公报流产、主席声明附注「除中国外」、贝森特「19 比 1」记者会与四段争议内容</a><span class="src"> · 腾讯新闻（2026-09-02）</span></li><li><a href="https://www.sohu.com/a/1086252090_122048112" target="_blank" rel="noopener">余永定：经常账户差额＝储蓄−投资，顺差是内需不足的镜子；清理出口导向政策残余（2026 年 4 月上海发展研究基金会沙龙）</a><span class="src"> · 搜狐·国际金融专家</span></li><li><a href="https://cifer.pbcsf.tsinghua.edu.cn/info/1136/3761.htm" target="_blank" rel="noopener">林毅夫、余永定、姚洋等全球失衡圆桌实录：出口退税要检查、凯恩斯「贸易摩擦导致战争」原话</a><span class="src"> · 清华大学五道口金融中心</span></li><li><a href="http://www.banyuetan.org/chcontent/sz/hqkd/201059/57327_2.html" target="_blank" rel="noopener">《中国制造为何国外更便宜？》：余永定「出口导向型创汇政策应终结」、刘克崮「退税退多了」、吴敬琏的提醒（2010 年）</a><span class="src"> · 半月谈</span></li><li><a href="https://h5.ifeng.com/c/vivo/v002-_ET--3JLElibg0g44H--CyNHIXdWsAWiVPXVRF--Vl0Inc__" target="_blank" rel="noopener">《为什么说补贴出口，实际上是掏普通人的口袋补贴企业出口竞争力？》：退税变成价格战资金、机会成本分析</a><span class="src"> · 凤凰网</span></li><li><a href="https://news.qq.com/rain/a/20261029A063TL00" target="_blank" rel="noopener">《出海这笔账，补课补不平》：中汽协整车利润率 1.5%、欧盟反补贴税率表与投票票型、中欧价格承诺框架</a><span class="src"> · 腾讯新闻（2026-10-29）</span></li><li><a href="https://timeline.sohu.com/news/XZHQ23gn0T" target="_blank" rel="noopener">《出口暴涨，利润却快归零》：标普信评光伏产能利用率与「赌对手先扛不住」、泽布吕赫港八万辆积压、比亚迪量利剪刀差</a><span class="src"> · 搜狐·时间线</span></li><li><a href="https://swt.sc.gov.cn/sccom/c25030602/2026/9/14/55e56668a4d5430091d9cb5354f30656.shtml" target="_blank" rel="noopener">德国工业界对华转向分析：欧盟「关税＋配额＋价格约束＋本地化」四层工具箱、IAA 法案本地含量要求</a><span class="src"> · 四川省商务厅转载（2026-09-14）</span></li><li><a href="https://original.ifeng.com/c/8xaIz4LiG68" target="_blank" rel="noopener">《中国品牌欧洲季度销量首超日系》：关税后插混进口涨 182%、中国品牌份额五年增 14 倍</a><span class="src"> · 凤凰网原创</span></li><li><a href="https://chartbookchina.ghost.io/solar-china-2026/" target="_blank" rel="noopener">亚当·图兹《浪费中国过剩的太阳能产能是疯狂之举》：光伏产能与破产潮、OECD 十五年补贴不足 180 亿美元的测算（经图兹授权的中文版）</a><span class="src"> · 图说政经 Chartbook 中文版（2026-06）</span></li><li><a href="http://mp.weixin.qq.com/s?__biz=MzYyMTU0NzEzNA==&mid=2247483736&idx=1&sn=efef02ab45ef078045d6fee7cd0fd456&chksm=fe8f8cc03eeb446f44d69c9a4e8b316f120c788c1348138f397590c5d92fc138b82bc2f645de" target="_blank" rel="noopener">亚当·图兹《中国何去何从》：房地产、青年失业、顺差、通缩四个入口；「代际创伤」与家庭财富房产占比</a><span class="src"> · 图说政经 Chartbook 中文版</span></li><li><a href="https://www.toutiao.com/article/7702019258259178012/" target="_blank" rel="noopener">《农村养老金涨了20元，可有人看完沉默了》：143 涨 163 的口径、两斤猪肉的换算、1.8 亿领取人、中央与地方补贴结构</a><span class="src"> · 今日头条（2026）</span></li><li><a href="https://www.financialnews.com.cn/2026-02/02/content_442673.html" target="_blank" rel="noopener">《确立居民消费在扩大内需中的核心地位》：两个同步、社保与公共服务改革、户籍壁垒</a><span class="src"> · 金融时报·中国金融新闻网（2026-02-02）</span></li><li><a href="http://news.enorth.com.cn/system/2026/03/07/059205027.shtml" target="_blank" rel="noopener">《向制度要动力：「十五五」时期提振消费路径》：2.5 亿人市民化、消费税后移、划转国有资本充实养老金</a><span class="src"> · 北方网（2026-03-07）</span></li><li><a href="https://www.gov.cn/lianbo/fabu/202601/content_7059408.htm" target="_blank" rel="noopener">国新办发布会：育儿补贴 1000 亿、基础养老金最低标准提高 20 元、以旧换新 3000 亿、免费学前教育、失能老人补贴</a><span class="src"> · 中国政府网（2026-01）</span></li><li><a href="https://www.gov.cn/yaowen/liebiao/202603/content_7060692.htm" target="_blank" rel="noopener">2026 年政府工作报告摘登：城乡居民基础养老金再提高、生育支持与养老服务消费补贴</a><span class="src"> · 中国政府网（2026-03）</span></li><li><a href="https://www.mohrss.gov.cn/wap/xw/rsxw/202601/t20260119_565698.html" target="_blank" rel="noopener">人社部：「投资于物和投资于人紧密结合」、就业补助 667 亿、补贴性培训 1100 万人次、灵活就业保障进展</a><span class="src"> · 人力资源和社会保障部（2026-01）</span></li><li><a href="https://www.financialnews.com.cn/hq/yw/201804/t20180424_137041.html" target="_blank" rel="noopener">《解决中美贸易争端 宜放眼长远》：日本七轮贸易摩擦与广场协议、德国出口结构与劳资制度的对照</a><span class="src"> · 金融时报·中国金融新闻网</span></li><li><a href="https://www.peopleapp.com/rmharticle/30024427641" target="_blank" rel="noopener">魏杰谈广场协议后日德分野：日本靠宽松启动内需吹起泡沫，德国靠结构与社会市场经济撑住</a><span class="src"> · 人民日报客户端</span></li><li><a href="https://search.bilibili.com/all?keyword=%E9%A1%BA%E5%B7%AE%20%E5%86%85%E9%9C%80" target="_blank" rel="noopener">B 站搜「顺差 内需」</a><span class="src"> · 视频</span></li><li><a href="https://news.qq.com/rain/a/20261027A0CPMJ00" target="_blank" rel="noopener">卢锋、杨景翔《全球失衡背后，大国博弈与多边治理》：主席声明第 10、11 段逐句拆解、潘功胜「逆差国降赤字提储蓄」原话、蓝佛安 IMF 年会表态、「三增」方案</a><span class="src"> · 腾讯新闻（2026-10-27）</span></li><li><a href="https://www.cf40.org.cn/article/1/289254" target="_blank" rel="noopener">中国金融四十人论坛：「藏汇于民」、结汇与外汇储备的关系、强制结售汇制度退场始末</a><span class="src"> · 中国金融四十人论坛</span></li><li><a href="https://news.ifeng.com/c/8puBQv3BRDU" target="_blank" rel="noopener">东吴证券首席经济学家芦哲：六年 4.9 万亿美元顺差拆解、约 2 万亿留存海外、平均结汇率 53%、约 1.1 万亿企业美元存款</a><span class="src"> · 凤凰网</span></li><li><a href="http://m.microbell.com/wap_detail.aspx?id=19e35751ee979034ab583cf1e23b1ca5" target="_blank" rel="noopener">东吴证券宏观深度报告《超万亿美元贸易顺差流向哪里？》：商品流与资金流的数据差异、海外净资产头寸</a><span class="src"> · 迈博汇金转载（2025-12-30）</span></li><li><a href="http://chinareports.org.cn/index.php/index/index/news/127532.html" target="_blank" rel="noopener">《全球经济再平衡是必答题，但不能只让中国答卷》：郑永年、陈建伟观点，美元「吸收器」效应</a><span class="src"> · 中国报道（2026-10）</span></li><li><a href="http://mp.weixin.qq.com/s?__biz=Mzg5Nzk2NDM2OQ==&mid=2247492912&idx=1&sn=aec5f507020ec31429364079bcd4c35b&chksm=c10ef6c6691b960852842359c33bc3e276a5c4d4a956fd2433e5da8acc533c1c92811f7e2305#rd" target="_blank" rel="noopener">宋和平（商务部贸易救济调查局原调查专员）：2025 年 30 个国家和地区对华启动 167 起贸易救济调查、国别与行业分布、美欧调查对华占比</a><span class="src"> · 中国世贸组织研究会贸易救济专委会</span></li><li><a href="http://mp.weixin.qq.com/s?__biz=MzI4NDUyMzU1NQ==&mid=2247521728&idx=3&sn=4fa30b17748454322c7bb67a554dc72d&chksm=eacf42e3ae9093c0e1e31043d613e69dd68c8bb7ae279daafe4b1628c578fc9c9af8356b3369#rd" target="_blank" rel="noopener">安邦咨询编译日经报道：WTO 口径对华双反调查 79 起（2025 上半年）、17 类出口产品单价下降面 68%、泰国越南巴西印度案例、西浜徹「与全球南方的新摩擦」</a><span class="src"> · 珠海市工商联·产业信息速递（2025-11-17）</span></li><li><a href="https://timeline.sohu.com/news/AISOAOdhxm" target="_blank" rel="noopener">《从月薪八千到五千只要一个季度》：南通机械设计师降薪、绍兴袜厂订单减三分之二、江浙沪县城工资跳水</a><span class="src"> · 搜狐·时间线</span></li><li><a href="https://gdd.changzhou.gov.cn/html/tjjdcd/2026/JECOENJO_1013/7151.html" target="_blank" rel="noopener">国家统计局常州调查队：126 家外贸型中小企业问卷，国际市场需求下降 64.3% 居首、订单下降 24.6%、补缺式招聘 49.2%</a><span class="src"> · 常州市政府转载（2026-10-13）</span></li><li><a href="https://www.toutiao.com/article/7697085759496471101/" target="_blank" rel="noopener">外贸工厂的三条路：涨价保利润、降价保订单、缩减产能裁员降薪，及其向普通人工资的传导</a><span class="src"> · 今日头条</span></li><li><a href="https://m.toutiao.com/article/7676894318145094182/" target="_blank" rel="noopener">《外贸订单锐减，玩具厂花式变相降薪》：旺季八毛淡季五毛的计件单价操作</a><span class="src"> · 今日头条</span></li></ul>`,
  },
  {
    id: "post-244",
    title: "贡献六成GDP的民企，为什么还在问“自己人”？",
    date: "2026-10-30",
    updated: "2026-10-30",
    cat: "日常",
    tags: ["经济"],
    cover: "",
    pinned: false,
    excerpt: "一部法律、五个数字、一道融资的坎。贡献六成GDP的民企，为什么还在反复确认「自己人」的身份？",
    content: `<p>2025年5月20日，一部全名叫《中华人民共和国民营经济促进法》的法律开始施行。名字长，普通人多半没留意。但做生意的人留意了——这是头一回，有人把「民营」两个字写进一部专门的法律里。</p>
<p>往前推三个月，2025年2月17日，北京开了一场民营企业座谈会。第一排坐着任正非、王传福、雷军，也坐着好久没公开露面的马云。会上有一句话被反复提起：民营企业和民营企业家，是我们自己人。</p>
<p>一个占了六成GDP的群体，为什么还需要反复确认「自己人」的身份？这篇文章想把这个问号拆开——它到底有多重，受过哪些委屈，这部新法律能管什么，又管不了什么。</p>
<h2>五个数字的分量</h2>
<p>谈民营经济，绕不开一串数字。五十以上的税收，六十以上的国内生产总值，七十以上的技术创新成果，八十以上的城镇劳动就业，九十以上的企业数量——人们把它缩写成「五六七八九」。每一个数字背后，都是具体的饭碗。</p>
<p>税收那一半，意味着财政的半壁江山由民企贡献；GDP六成，意味着经济增长的主动力在民企；最该盯的是「八十」：城镇里每十个就业岗位，八个以上在民营企业。你所在的那家公司、楼下那家餐馆、给你送外卖的那个人，大概率都算在这八十里面。</p>
<p>外贸这一块更突出。2019年起，民营企业就是我国第一大外贸经营主体；到2025年，民企进出口二十六点零四万亿元，占全国比重升到百分之五十七点三，比上年又提高一点八个百分点。高技术产品出口增长百分之十四点八，高端装备增长百分之二十六点九。</p>
<p>还有一个数字常被忽略：国家高新技术企业里，民营企业有四十二万多家，占比超过九成。也就是说，所谓「硬科技」「新质生产力」的主战场，主角多半是民企。把这些数字摆在一起，结论很直接——民营经济不是经济的边角，是底盘。</p>
<h2>「自己人」这句话的来路</h2>
<p>「自己人」不是2025年才说的。更早一次，是2018年11月，同样在北京，同样一场民营企业座谈会。那一年社会上关于民营经济的杂音很响——「国进民退」的猜测、「民营经济离场」的论调，都冒了出来。会上，这句话被说得很重：民营企业和民营企业家，是我们自己人。</p>
<p>2025年2月17日这一场，距离上一次整整六年三个月。规格没有降。发言席上六个人：华为的任正非、比亚迪的王传福、新希望的刘永好、韦尔半导体的虞仁荣、宇树科技的王兴兴、小米的雷军。第一排还有马云、马化腾、曾毓群、南存辉、冷友斌、齐向东、梁文锋。</p>
<p>值得停下来看一眼这份名单。里面既有任正非这样改革开放初期就闯出来的老将，也有梁文锋、王兴兴这样在AI和人形机器人赛道刚冒头的新人；既有传统制造，也有半导体、新能源、大模型。它不是一份「富豪榜」，是一张「靠什么吃饭」的图谱——这些企业，吃的就是技术和市场这碗饭。</p>
<blockquote class="pg-quote"><p>党和国家对民营经济发展的基本方针政策，已经纳入中国特色社会主义制度体系，将一以贯之坚持和落实，不能变，也不会变。</p><cite>—— 习近平在2025年民营企业座谈会上的讲话</cite></blockquote>
<p>为什么这种场合要反复说「自己人」？恰恰因为那个问号一直没真正合上。政策文件年年发，表态年年有，可一到地方执行、一到具体审批和放款，民企感受到的温度常常不一样。把这句话写进法律，是2025年最实质的一步——从「表态」往「制度」挪了一点。</p>
<h2>一部等了很久的法律</h2>
<p>《民营经济促进法》是新中国第一部专门关于民营经济发展的基础性法律。2025年4月30日，全国人大常委会第十五次会议通过；二十天后，5月20日，施行。</p>
<p>它一共九章：公平竞争、投资融资促进、科技创新、规范经营、服务保障、权益保护、法律责任，再加上总则和附则。分量最重的两章，是「公平竞争」和「投资融资促进」——恰好对应民企喊得最响的两件事：进门难，和借钱难。</p>
<p>为什么说是「等了很久」？过去几十年，民营经济靠的是一份份政策文件、一个个座谈会来护着。文件会过期，表态会被忘了，「自己人」也会被人重新拿出来说事。从「文件」升级到「法」，最大的不同是确定性：白纸黑字，谁都不能随便改口。</p>
<blockquote class="pg-quote"><p>民营经济组织与其他各类经济组织享有平等的法律地位、市场机会和发展权利。</p><cite>—— 《中华人民共和国民营经济促进法》第三条</cite></blockquote>
<p>法律第三条把「平等对待、公平竞争、同等保护、共同发展」写死。这话念起来平淡，对民企来说却是要紧的——它要回应的，是那种「说不清道不明」的差别待遇。</p>
<h2>越来越短的清单，越开越大的门</h2>
<p>进门难，难在「玻璃门」「弹簧门」「旋转门」，还有人提过「卷帘门」。这些门的共同点是：门框在那，你看得见，就是推不开。破解的办法之一，是把「哪些门不能进」列成一张清单，清单之外的，谁都能进——这就是「市场准入负面清单」。</p>
<p>2025年版的清单，事项从2022年版的一百一十七项，压到一百零六项；比起2018年首版的一百五十一项，整体压减了三成。清单越短，意味着被划在门外的领域越少。更重要的是那句「非禁即入」：只要不在清单上，国企民企、内资外资，一律平等进。</p>
<p>光有清单不够，得看真有没有民企进去。两个例子可以记一下。一个是核电——过去核电是央企控股、地方参股，民资最多占过百分之二；2024年8月国务院核准的五个核电项目，全部引入了民间资本，民企参股比例第一次提到了百分之十，参与的民企有十家，魏桥创业就是其中之一。另一个是杭台高铁，民营联合体占股百分之五十一，真当了控股方。</p>
<p>门开多大，最终看执行。2025年发改委、商务部、市场监管总局联合开展市场准入壁垒清理整治行动，累计公开通报了七期、一百一十五个违背清单的典型案例；各地清理妨碍全国统一大市场的政策规定超过四千二百件。通报和清理，本身就是把「看不见的门槛」摆到台面上。</p>
<blockquote class="pg-quote"><p>民营企业不怕市场竞争、不怕竞争激烈，怕的是缺少公平竞争的机会，怕的是受到差别歧视待遇。</p><cite>—— 国家发展改革委有关负责人谈市场准入负面清单</cite></blockquote>
<p>我的判断：清单缩短是「做减法」，但民企怕的从来不是竞争，是差别。减掉一两项审批容易，让「非禁即入」在县里、在招标现场也真管用，才是硬仗。</p>
<h2>融资那道坎</h2>
<p>进门之后是借钱。这道坎，民企喊了几十年。银行业协会首席经济学家巴曙松给过一个直白的对比：民营企业贷款平均利率，比国企高出一点五到两个百分点；信用贷款占比不足百分之三十。一边是贡献六成GDP，一边是拿贷款又贵又难。</p>
<p>东亚银行的一份表态更能说明问题：他们给民营企业的授信占比，计划从当前的百分之三十左右，提到百分之五十左右。这句话反过来读就是——现在民企拿到的银行授信，大约只占三成。六成GDP，三成贷款，中间的缺口，就是「所有制偏好」四个字。</p>
<p>根子在哪？民企多是轻资产，拿不出银行认的厂房、土地做抵押；财务透明度不如大企业；借款又急又碎，银行服务起来不划算。传统信贷那套「看抵押、看报表」的逻辑，天生对民企不友好。这不是哪一家银行的偏见，是整套评价体系的结构性错配。</p>
<p>政策在补。2026年1月15日，央行单设了一万亿元的民营企业再贷款额度，还合并设立「科技创新与民营企业债券风险分担工具」；普惠信贷的尽职免责也在推，想让基层信贷员「敢贷、愿贷」。再贷款是往渠道里引水，但水最后流不流得进民企的田，关键还是银行敢不敢放贷。</p>
<blockquote class="pg-quote"><p>民营企业融资困境本质上是金融供给侧与产业需求侧匹配度不足的体现。</p><cite>—— 巴曙松谈民营经济信贷供给体系</cite></blockquote>
<p>我的判断：钱不是不够，是流向上的通道还窄。引水容易，疏通毛细血管难。这一步若只停在「设额度」，门后还是旱的。</p>
<h2>拖欠账款这件「小事」</h2>
<p>对一家小企业来说，最难的不是借不到钱，是货交了、活干完，钱收不回来。欠款方若是政府机关、事业单位、国企或大企业，拖个一年半载是常事——而这对小企业，可能是现金流断掉、工资发不出。</p>
<p>新法律的第六十七条，专门点了这件事：机关、事业单位、国企，要按约定及时付账，不得以人员变更、内部流程、等竣工验收批复或决算审计为由拖延；也不能强制拿审计结果当结算依据。白纸黑字，恶意拖欠从此成了违法行为。</p>
<p>数据能看出力度。2025年，各地法院清理政府机关、事业单位拖欠中小企业账款，结案九千一百六十六件，执行到位资金三百一十一点四二亿元；单个合同或单项欠款五十万元以下的，要求到2025年底全部清理完毕。2026年1月，国务院常务会议又部署用专项债额度支持清欠，要建长效机制。</p>
<p>我的判断：清欠，本质是把「赖账」从一件道德上的事，变成一件法律上的事。存量好清，增量难防——长效机制能不能兜住「新官不理旧账」，才是这道坎真正过不过得去的试金石。</p>
<h2>愿意陪跑的长钱</h2>
<p>科技创新要烧钱，而且要烧很久。可市面上的钱大多没那么耐心：传统创投基金七到十年就要退出，硬科技企业的马拉松还没跑到一半，资本先要下车了。这中间缺的，正是「耐心资本」。</p>
<p>「壮大耐心资本」这话，2024年4月第一次被提出，方向是投早、投小、投长期、投硬科技。到2025年底，国家创业投资引导基金正式启动，被称为创投界的「航母级基金」：存续期长达二十年（十年投资、十年退出），中央出资撬动万亿级社会资本；对种子期、初创期企业的投资，不低于基金总规模的七成；投的企业估值要在五亿以下，单笔不超五千万。</p>
<p>为什么这件事和民企有关？因为早年、最险的那一程，社会资本不敢上，硬科技容易断在摇篮里。长鑫存储是个常被提起的例子：合肥国资十年陪跑，中间穿越漫长的亏损期，到2026年一季度营收突破五百零八亿元，全球市场份额冲到第四，打破了三星、海力士、美光三家几十年的垄断。</p>
<p>我的判断：耐心资本补的是「最早期没人投」的那块缺，但它投的是硬科技独角兽，不是你我楼下的小店。别把它读成普惠政策——它的意义在于，让「敢闯」的民企在最早、最难的关口，多一条活路。</p>
<h2>创新的主战场</h2>
<p>说回那句「七成」。全国的技术创新成果，七成以上来自民企；高新技术企业里，民企占九成以上。新能源车、锂电池、光伏这「新三样」，民企贡献超过一半。创新这件事，民企不是配角。</p>
<p>为什么是民企更能闯？上海财经大学校长刘元春有个说法：在需求导向的市场里，民企产权清晰、决策灵活，能更高效地「以需定产」——你要什么，我生产什么，不用层层等批示。船小，也好掉头。</p>
<p>但创新不是喊出来的。民企敢把利润砸进研发，前提是预期得稳：相信明天政策还在、产权还在、市场还在。这又把话头绕回了「定心丸」——前面那些法律、那些清欠、那些耐心资本，归根结底是在给这个预期垫底。</p>
<h2>外贸的半壁江山</h2>
<p>民企还是外贸的前锋。2019年起它就是第一大外贸经营主体，2025年进出口二十六点零四万亿元，占比百分之五十七点三，出口高技术产品增长百分之十四点八，高端装备增长百分之二十六点九——这组数字，是中国制造往外走的主力军。</p>
<p>但前锋的日子，2026年不那么好过。关税、贸易摩擦、别国针对中国出口的救济调查一波接一波（这部分在另一篇讲G20「十九比一」的文章里拆过），民企出口首当其冲。前锋被围，后方的订单和就业都会跟着抖。</p>
<p>我的判断：外贸这半壁江山稳不稳，不只看海关数字，也看外部还让不让进。门被一扇扇关上，最后疼的不是某个企业，是它背后那一串城镇就业岗位。</p>
<h2>民间投资为什么在退</h2>
<p>这里有个刺眼的张力：贡献六成GDP的民企，自己却在缩减投资。2025年，民间投资同比下降百分之六点四，扣除房地产也降了百分之一点九；到2026年上半年，民间投资降幅扩大到百分之八点五，扣除房地产仍降百分之四点九。毕马威的测算更冷：2025年民间固定资产投资同比降百分之三点一，连续第三年负增长，四季度一度到负百分之十五点五。</p>
<p>一个群体在退，原因不会单一。需求偏弱，投了东西怕卖不掉；账款被拖，手头本钱紧；「反内卷」政策压产能，扩产的冲动先收住；地产那头一路往下，拖累了上下游一大片民企。几股劲拧在一起，就是「预期转弱—投资收缩—就业下降」的担心。</p>
<p>我的判断：这是最该盯的信号。「自己人」管不管用，不看会场里坐了谁，看民企敢不敢再把钱投出去。投资止跌回稳，比任何表态都实在。</p>
<h2>营商环境的那本旧账</h2>
<p>民间投资为什么退，除了钱和订单，还有一笔旧账：营商环境。一份调研里有个扎心的数字——2025年，只有百分之二十七点四六的上规模民企，有计划增加投资，超过七成持谨慎态度。企业不是没钱，是不敢轻易再下注。</p>
<p>旧账里最典型的一笔叫「新官不理旧账」：上一任答应的优惠、签的协议，换个人来就不认了；朝令夕改，是企业最怕的事。另一笔是亲清政商关系没理顺——离远了企业找不到人办事，近了又容易踩线。这两笔账不结清，定心丸就化不开。</p>
<p>政策在补窟窿。促进法把「政企沟通机制」「出台政策前听意见」「留出适应调整期」写进条文；规范涉企执法专项行动，集中整治乱收费、乱罚款、乱检查、乱查封，专门点名防止违规异地执法和趋利性执法。</p>
<p>我的判断：营商环境的账，县里比市里难算，市里比省里难算。法律写得再好，最后要在招商局的承诺书上、在办事窗口的态度里兑现。这一步，才是「自己人」落地的最后一公里。</p>
<h2>两个健康</h2>
<p>法律里有个提法叫「两个健康」：民营经济健康发展，和民营经济人士健康成长。前半句讲经营，后半句讲人——要让老板们别总悬着一颗心。</p>
<p>规范经营那一章，写得很细：反腐、财务规范、把企业财产和经营者个人财产分开。这些看似是「管」，其实也是在划边界——边界清晰了，老板才知道什么会被查、什么不会，才敢把身家押进企业。</p>
<p>更深的，是「原罪焦虑」。产权保护、人身权利、名誉权、隐私权，法律一条条列明受保护；还专门给异地执法划了红线——禁止为了经济利益滥用职权搞异地执法，回应的是「趋利性执法」那类乱象。安全感，是投资的决定性前提。</p>
<blockquote class="pg-quote"><p>禁止为经济利益等目的滥用职权实施异地执法。</p><cite>—— 《中华人民共和国民营经济促进法》（规范涉企执法相关条款）</cite></blockquote>
<p>我的判断：健康成长这四个字，落到地上就是一句话——让企业家不用担心「人进去」。人安心了，钱才敢动。</p>
<h2>从「离场论」到「定心丸」</h2>
<p>把时间拉回2018年，社会上「民营经济离场」的论调就曾冒头，当时是靠一场座谈会、一句「自己人」把杂音压下去。到2025年，同样的杂音再起时，回应的方式变了：不只是一句话，是一部法。</p>
<p>舆论环境也在转。过去谈民企，容易滑向「原罪」叙事；这两年，更多讲的是贡献、是「自己人」、是创新的主力。语境换过来，民企才敢把话讲明白、把账摊开。</p>
<p>我的判断：定心丸能管一阵子，制度才能管长远。促进法做的，就是把那颗定心丸，从会场的话筒里，写进可以反复翻看的条文里。</p>
<h2>普通人为什么该关心</h2>
<p>讲了一堆政策和数字，得落回你身上。前面那个「八十」——城镇八成以上就业在民企——意味着你、你家人、你同事，大概率在民企领工资。民企好不好，和你的工资条直接相关。</p>
<p>所以政策托的，不是某一家企业，是「岗位的来源」。减税降费落到哪、清欠落到哪、小微贷到没到账，最后都变成一件事：你这个月能不能按时拿工资，想换工作的时候有没有下家。</p>
<p>我的判断：这不是宏大的事，是家门口的事。民企稳，就业就稳；就业稳，消费才稳——这条链，环环相扣，起点就在民企。</p>
<h2>边界：不是所有民企都该保</h2>
<p>话说到这里，得把边界划清。谈保护民企，不等于无脑挺。反垄断、防止资本无序扩张，针对的是平台垄断、违规扩张那类行为；环保、劳动权益、食品安全，该查的照样查。法律里「规范经营」那一章，本就是双向的。</p>
<p>保护的对象，是「公平的赛道」和「合法的经营者」，不是落后产能，也不是踩线的玩家。把这一点说在前头，这篇文章才不被读成一句口号——支持民营经济，和支持市场应有的规矩，不矛盾。</p>
<h2>别国也在做同一道题</h2>
<p>扶持中小企业、用政府基金撬动创投，不是中国独有的功课。美、日、欧各有各的中小企业法和创投体系，方向都差不多：让最有活力的那部分企业，借得到钱、进得去门、活得了久。</p>
<p>体制不同，做法自然不同，这里不展开比。只点一句：把民营经济当「生力军」来养，是普遍共识，不是哪家的独门秘方——差别只在，谁能把写好的规矩，真正落到县里的招标现场和银行的放款窗口。</p>
<h2>写在后面的话</h2>
<p>2025到2026，是民营经济政策密集落地的一段日子：一部法律、一张更短的清单、一笔万亿再贷款、一轮清欠。密集是好事，但落地从来是慢功夫——条文到县里，往往要过好几道手。</p>
<p>作为普通人，评判「自己人」这话真不真，不用听三句口号，看三件事就够：民企敢不敢再投钱（看民间投资数据）、银行敢不敢给小微放贷（看信用贷占比）、政府欠的钱还不还（看清欠进度）。这三件，比任何会场都诚实。</p>
<p>我的判断：民营经济的分量，早就不靠谁说。六个数字摆在那，八成就业摆在那。要紧的是，让这套底盘，别再为「自己人」这三个字反复悬心。</p>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1j8wdemEBC" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1j8wdemEBC&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>央视新闻｜习近平：民营经济发展前景广阔大有可为</figcaption>
</figure>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1GT99YjEqQ" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1GT99YjEqQ&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>人民日报｜中国民营经济为什么大有可为</figcaption>
</figure>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1FsYqzqEK2" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1FsYqzqEK2&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>《求是》2025年第16期：促进民营经济健康发展、高质量发展</figcaption>
</figure>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1QXEXzaE3V" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1QXEXzaE3V&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>李稻葵解读《民营经济促进法》正式实施</figcaption>
</figure>
<h2>参考</h2>
<ul class="pg-refs"><li><a href="https://www.ndrc.gov.cn/wsdwhfz/202607/t20260706_1406307.html" target="_blank" rel="noopener">「向上」之路：民营经济的「这一年」与「下一程」（五六七八九数据）</a><span class="src"> · 国家发改委</span></li><li><a href="https://news.cctv.com/2026/03/05/ARTIWcVrg8uIBDWa5hZ8tLyb260305.shtml" target="_blank" rel="noopener">中国经济向新行：生力军的担当（五六七八九）</a><span class="src"> · 央视网</span></li><li><a href="https://www.moj.gov.cn/pub/sfbgw/gwxw/xwyw/szywbnyw/202504/t20250430_518421.html" target="_blank" rel="noopener">《中华人民共和国民营经济促进法》全文（2025.4.30通过）</a><span class="src"> · 司法部</span></li><li><a href="https://www.gov.cn/yaowen/liebiao/202502/content_7004103.htm" target="_blank" rel="noopener">习近平在民营企业座谈会上强调：民营经济发展前景广阔大有可为</a><span class="src"> · 中国政府网</span></li><li><a href="https://www.gov.cn/yaowen/liebiao/202502/content_7004472.htm" target="_blank" rel="noopener">「大显身手正当其时」——民营企业座谈会侧记</a><span class="src"> · 中国政府网</span></li><li><a href="https://www.china.com.cn/opinion2020/2025-02/17/content_117717836.shtml" target="_blank" rel="noopener">这些企业家坐第一排传递了什么（参会阵容）</a><span class="src"> · 中国网</span></li><li><a href="https://www.ndrc.gov.cn/wsdwhfz/202505/t20250519_1397789.html" target="_blank" rel="noopener">市场准入负面清单四度缩减 直接惠及民营企业（106项、核电10%）</a><span class="src"> · 国家发改委</span></li><li><a href="https://www.ndrc.gov.cn/xxgk/jd/jd/202504/t20250425_1397391.html" target="_blank" rel="noopener">发改委谈《市场准入负面清单（2025年版）》答记者问</a><span class="src"> · 国家发改委</span></li><li><a href="https://www.gov.cn/zhengce/202504/content_7020914.htm" target="_blank" rel="noopener">《市场准入负面清单（2025年版）》正式发布</a><span class="src"> · 中国政府网</span></li><li><a href="https://www.financialnews.com.cn/2025-04/22/content_423528.html" target="_blank" rel="noopener">构建更加适配的民营经济信贷供给体系（利率差、信用贷不足30%）</a><span class="src"> · 金融时报</span></li><li><a href="https://www.toutiao.com/article/7493462061985612327/" target="_blank" rel="noopener">巴曙松谈银行业如何促进民营经济高质量发展</a><span class="src"> · 今日头条/中国银协</span></li><li><a href="https://www.ndrc.gov.cn/xwdt/wszb/cytzyd/wzsl/202512/t20251226_1402638.html" target="_blank" rel="noopener">国家创业投资引导基金有关情况（20年存续期、投早投小）</a><span class="src"> · 国家发改委</span></li><li><a href="https://www.hubpd.com/detail/index.html?contentId=7493989779948962280" target="_blank" rel="noopener">用耐心资本陪伴企业「长跑」（国创基金细节）</a><span class="src"> · 人民日报全国党媒</span></li><li><a href="https://www.stats.gov.cn/sj/zxfb/202601/t20260119_1962330.html" target="_blank" rel="noopener">2025年经济发展向新向优（民间投资-6.4%）</a><span class="src"> · 国家统计局</span></li><li><a href="http://www.sina.cn/news/detail/5328966537971669.html" target="_blank" rel="noopener">2026年上半年民间固定资产投资同比下降8.5%</a><span class="src"> · 新浪/经济参考报</span></li><li><a href="http://nanchong.gov.cn/fgw/xwdt/bmxx/202505/t20250514_2167279.html" target="_blank" rel="noopener">促进民营经济发展的坚强法治保障（权益保护、清欠）</a><span class="src"> · 南充市政府</span></li><li><a href="http://www.zhengzhoujk.jcy.gov.cn/sitesources/jkqrmjcy/page_pc/llyj/articlea5feb28b842d49f98e564b75f12dc578.html" target="_blank" rel="noopener">良法护航民企发展（清欠9166件、311.42亿、再贷款1万亿）</a><span class="src"> · 郑州经开区检察院</span></li><li><a href="https://3w.huanqiu.com/a/de583b/4SZOBj43RrX" target="_blank" rel="noopener">「耐心资本」见证花开，背靠制度优势（长鑫案例）</a><span class="src"> · 环球网</span></li></ul>`
  },
  {
    id: "post-245",
    title: "消费占GDP仅四成，居民存款却达167万亿：钱为什么躺在账上？",
    date: "2026-11-03",
    updated: "2026-11-03",
    cat: "日常",
    tags: ["经济"],
    cover: "",
    pinned: false,
    excerpt: "社零50万亿，住户存款167万亿。产能强、储蓄强、消费弱同时成立——钱卡在哪，闲缺在哪，政策往哪使劲。",
    content: `<p>2025年，中国全年社会消费品零售总额第一次站上50万亿元，定格在50.12万亿，同比增长3.7%。同样是这一年，最终消费支出对经济增长的贡献率回升到52%，比上年整整提高5个百分点。消费，被写进了「主引擎」和「压舱石」这两个词里。</p>
<p>还是这一年，央行口径下的住户存款余额冲到167万亿元，人均接近12万元，比年初又多出来14.64万亿。一个在涨，另一个也在涨——而且涨的都是「钱」这一头。</p>
<p>这中间有个绕不开的悖论：我们是世界第一制造大国，工业产值占全球三成上下，东西造得出也造得好；居民手里的存款堆到167万亿，却迟迟不太敢花。这篇文章想把这个悖论拆开——钱到底卡在哪，闲又缺在哪，政策又往哪使劲。</p>
<h2>先看这件事的分量</h2>
<p>谈消费，先得把它在国民经济里的位置摆清楚。2025年，中国GDP达到140.19万亿元，实际增长5%，稳稳站上20万亿美元量级。在这一年拉动经济的力量里，内需贡献了超过67%，其中消费一项就占了52%。国家统计局把消费称为「主要驱动和稳定锚」。</p>
<p>拆开看，消费的「量」并不小。社零50.12万亿，网上零售额增长8.6%，服务零售额增长5.5%。从春节到「五一」再到暑期，假日出行的人次和花费一茬接一茬地创历史新高。单看这些，消费市场并不冷。</p>
<p>但把镜头拉远，对比一下全球，问题就显出来了。按支出法核算，中国居民消费占GDP的比重长期只在四成左右——求是英文版的表述是「around 40%」，比发达国家低10到30个百分点，也低于全球平均水平。换句话说，同样的GDP盘子，别的国家有更多是被居民花掉的，我们更多是被投出去、被存下来的。</p>
<p>我的判断：消费的分量已经够重，真正轻的是「居民消费」那一块。总量大、占比低，这个反差才是「提振消费」四个字被反复提起的根。</p>
<h2>一个绕不开的悖论</h2>
<p>把上面两个数字并排放在一起，悖论就清楚了：社零50万亿，住户存款167万亿。前者是一年花掉的，后者是多年攒下、且还在增加的。产能强、储蓄强，消费却相对弱，这三件事同时成立。</p>
<p>居民自己也在「收着花」。国家统计局住户调查数据测算，2025年居民平均消费倾向（人均消费支出除以人均可支配收入）为68.0%，比上年回落0.3个百分点；边际消费倾向（新增消费除以新增收入）降到60.5%，两者都是近三年最低。每多赚100块，花掉的不到70，存起来的超过30。</p>
<p>金融数据把这件事说得更直白：2025年居民部门「多存少贷」，新增存款14.64万亿元，新增贷款只有4417亿元，存贷差扩大到14.20万亿元。居民贷存比从2019年末的67.4%一路降到2025年末的49.9%。不是银行不借，是居民自己不借、不愿借、不敢借。</p>
<p>我的判断：消费弱，不是兜里没钱，是「愿意花」和「敢花」这两件事同时打了折扣。存款是多出来的，不是富余出来的——它是没花掉的部分，不是花不掉的部分。</p>
<h2>钱在哪儿，为什么躺着</h2>
<p>167万亿住户存款，听着是天文数字，但它是总量，不是人人都有的余额。按14.05亿人口摊，人均11.89万元；可收入分组一拉，差距就露出来了：2025年低收入组人均可支配收入只有10150元，高收入组是103778元，高低差超过10倍；中位数36231元，仅为平均数的83.5%。</p>
<p>钱更多躺在哪？央行数据里，河北、河南、黑龙江、辽宁、吉林这些省份的住户存款占各项存款比重高达七成，而北京、上海不足三成。存款占比高，往往意味着居民资产配置更单一、更依赖银行，也意味着别的投资渠道不那么让人放心。</p>
<p>为什么宁愿放银行也不花？中国经营报采访的业内分析说得很直白：居民对复苏节奏仍持谨慎态度，对自身收入增长的可持续性缺乏足够信心，再叠加医疗、养老、教育等领域的刚性支出顾虑，于是更倾向用增加储蓄来对冲风险。这是一种预防性储蓄，不是贪财。</p>
<p>另一头是资产在缩水。2025年70个大中城市新建商品住宅、二手住宅月均同比分别下降3.8%、6.3%，居民持有房产价值在降；财产净收入只增长1.6%，在可支配收入中的占比降到8.0%，创2017年以来新低。房子不涨了，理财不灵了，财产性收入这一块先塌了。</p>
<p>我的判断：存款高，是安全感低的反面。把「敢花」激活，靠的不是劝，是靠让医疗、养老、教育这几件大事，少一点「怕」。</p>
<h2>收入这道坎</h2>
<p>消费是收入的函数，这句话谁都会说，难点在收入本身的成色。2025年全国居民人均可支配收入43377元，名义和实际都增长5.0%，和GDP增速持平。增速不慢，但结构上有两处偏薄。</p>
<p>一是居民收入在国民收入分配里的比重偏低。大河财立方援引的分析指出，消费需求不足「很大程度上是收入分配的问题，主要表现为劳动报酬占国民收入比重，以及居民初次分配收入占GDP比重偏低」。简单说，GDP这块饼，分到居民手里的比例还不够大。</p>
<p>二是收入差距仍在拉大。2025年居民人均可支配收入中位数名义增速4.4%，比平均数增速低0.6个百分点；五等份里，低收入组的增速更慢。中低收入群体恰恰是消费倾向最高、消费能力最受限的那部分人——他们想花，但加不起来；高收入组有余钱，但边际消费倾向低。</p>
<p>政策往这堵缺口上填土。中央经济工作会议提出「制定实施城乡居民增收计划」，方向是四笔收入一起做：工资性收入（占56.6%，最稳的一块）、财产性收入（最弱，要拓宽渠道）、经营性收入（小微、个体）、转移性收入（养老金、补贴、社保）。其中特别点名「多措并举促进农民增收」和「扎实解决拖欠账款问题」。</p>
<p>我的判断：增收计划能不能成，不看口号，看两件事——劳动报酬占比能不能往上抬一点，农民的财产性收入渠道能不能真打开。这两件做实了，消费才不是无源之水。</p>
<h2>周工时48.6小时，休假落实难</h2>
<p>钱之外，还有一样东西决定你能不能花：时间。2025年全国企业就业人员周平均工作时间为48.6小时，相当于每个标准工作日之外，每周又多干了一个整天的活。这个水平高于大多数发达国家，也超过了劳动法规定的标准。</p>
<p>假也休不足。人社部的数据被多家媒体引用：在职职工按工龄人均应享受约10天年休假，实际只休了6.29天，近半数人没完整享受，民营企业职工更是不足4天；超60%没休假的人是主动或被迫放弃的——「领导不休我不好意思休」「怕影响考核晋升」。</p>
<p>这件事正被当成「扩大消费」的一个支点来推。2025年中办、国办《提振消费专项行动方案》已经把「保障休息休假权益」列进消费环境改善行动；2026年政府工作报告首提「落实职工带薪错峰休假制度」；「十五五」规划进一步明确要推动修订《职工带薪年休假条例》，增强制度刚性；2025年全体公民法定节假日也从11天增加到13天。</p>
<p>全国政协委员陆铭有一句话被反复转述：「普遍性的过度劳动将导致社会整体幸福感停滞甚至下降。」中工网把它接了一句：休息，也是生产力。</p>
<blockquote class="pg-quote"><p>普遍性的过度劳动将导致社会整体幸福感停滞甚至下降。</p><cite>—— 全国政协委员 陆铭</cite></blockquote>
<p>我的判断：没时间花，是消费的另一道坎。长假全挤在少数几天，平日连轴转，文旅、餐饮、休闲这些「闲出来的消费」就长不起来。把休假这颗螺丝拧紧，比发几张消费券更治本。</p>
<h2>后顾之忧：社保、教育、医疗、住房</h2>
<p>预防性储蓄的根，扎在社保、教育、医疗、住房这几件大事上。求是多篇把话说得很透：完善的社会保障体系是居民「敢于消费、愿意消费的重要前提」，要「加快发展多层次、多支柱养老保险体系」「扩大失业、工伤保险覆盖面」「健全重特大疾病医疗保险和救助制度」。</p>
<p>政策的民生导向已经有了反馈信号。2025年居民转移净收入同比增长5.7%，比可支配收入平均增速还高0.7个百分点，初步反映了「投资于人」的成效。一般公共预算里，社保就业、卫生健康、教育的支出增速也明显高于总支出增速。</p>
<p>但刚性支出的压力仍在往上顶。恩格尔系数29.3%，看似不高，可限额以上粮油食品类零售额占比在2024年冲到12.3%的近19年最高后，2025年12月又升到12.9%。基础型消费支出净增长的消费者占比，比升级型、享受型分别高出15个百分点以上。人们把更多钱花在「必须花」的地方，留给「想花」的地方就少了。</p>
<p>就业预期更是消费的底层。2025年16—24岁劳动力（不含在校生）调查失业率年均16.7%，连续17个月在15%以上；消费者就业预期指数连续43个月低于100的基准线。年轻人找不到稳妥的起点，自然先存钱、先观望。</p>
<p>我的判断：安全网织得越密，居民的手才敢松。消费意愿不是喊出来的，是被「不怕」撑起来的。</p>
<h2>服务消费46.1%：消费在变，供给得跟上</h2>
<p>消费弱，不等于消费没在升级。2025年全国居民人均服务性消费支出占比达到46.1%，和上年持平；服务零售额增长5.5%，比商品零售跑得快。从「买东西」到「买体验」，这条线已经很明显。</p>
<p>新热点几乎都长在「服务」和「情绪」上。中国演出行业协会数据，2025年全国5000人以上大型营业性演出场次、票房同比分别增长12.7%、18.8%，对交通、住宿、餐饮、旅游的带动系数达到1比6.9；数字娱乐产业IP衍生品市场规模预计753亿元，同比增长62.8%，连续两年大涨。「苏超决赛」期间南京异地消费同比涨27.7%。</p>
<p>入境消费也在放量。2025年全国入境人员6.97亿人次，同比上升14.2%，创历史新高；其中外国人8203.5万人次，上升26.4%，免签入境外国人3008万人次、占入境外国人73.1%、同比上升49.5%。离境退税的境外旅客数量、退税商品销售额同比分别增长305%和95.9%。「中国游」成了实打实的消费增量。</p>
<p>我的判断：供给侧改革这道题，在消费领域换了个写法——不是造更多同款，是造更「优」、更「体验」、更「情绪」的东西。谁能接住这股需求，谁就能在四成之外，再开一块。</p>
<h2>以旧换新与5000亿：政策的「真金白银」</h2>
<p>政策不是只说不做。超长期特别国债支持的消费品以旧换新，是2025年最显眼的一招。据商务部数据，全年以旧换新相关商品销售额总计超2.6万亿元，惠及超3.6亿人次，带动社零增长超1个百分点；汽车以旧换新里新能源车占比近60%，家电以旧换新里一级能效产品占比超90%。</p>
<p>另一笔是央行专门设立的5000亿元服务消费与养老再贷款，往服务消费和养老这条「慢赛道」里引水。求是英文版把这两笔并称为政策暖意。</p>
<p>但政策的边界也很清楚。2025年社零月度同比增速从5月的6.4%一路回落到12月的0.9%，主因就是补贴节奏放缓叠加上年高基数。换句话说，以旧换新托得住一时的量，托不住长期的预期——补贴一收，增速就掉。</p>
<p>我的判断：真金白银有用，但它买的是时间，不是信心。信心得靠收入、靠休假、靠安全网这三件慢慢垫起来。把政策当疫苗，不能当饭吃。</p>
<h2>城乡居民增收计划：钱从哪来</h2>
<p>把镜头切回「钱从哪来」。前面说过，增收计划盯的是四笔收入。其中工资性收入占比56.6%，是最稳的压舱石，方向是完善工资合理增长机制和最低工资标准动态调整。</p>
<p>最弱的是财产性收入，占比8.0%、增速1.6%，创多年新低。补这块，要靠拓宽居民财产性收入渠道、健全投资者保护、盘活农村闲置资源资产。对农民来说，把宅基地、集体资产这些「睡着」的资源变成可变现、可分红的收入，是增收的真正增量。</p>
<p>经营性收入对应着小微、个体、灵活就业那一大群人，他们最需要的是稳定的营商环境和及时的账款。方案里「扎实解决拖欠账款问题」这句话，从居民视角看，就是保住一大批人的现金流和饭碗——中小企业不被拖垮，就业和收入才稳。</p>
<p>转移性收入则直接指向养老、医保、补贴。提高城乡居民基础养老金、提高医保报销比例、加大民生转移支付，这些钱发到中低收入群体手里，消费倾向最高，花得最快。</p>
<p>我的判断：增收计划不是发钱这么简单，是把收入的「来源面」摊开——工资要涨得动，财产要有处生，经营要活得了，转移要兜得住。四面都补，消费才有底气。</p>
<h2>提振消费专项行动方案：框架</h2>
<p>把零散的招法拢起来，是一份文件：2025年由中办、国办印发的《提振消费专项行动方案》。它不是一个单点政策，而是个框架，大致分成几块——城乡居民增收促进行动、消费能力保障支持行动、服务消费提质惠民行动、消费环境改善提升行动、大宗消费更新升级行动、消费品质提升行动、消费场景创新行动。</p>
<p>值得注意它的逻辑顺序：把「增收」和「保障」放在「提质」「升级」「创新」之前。先让居民有钱、敢花，再谈供给怎么升级。这和求是上「能消费、敢消费、愿消费」的三段论是对上的——能力、信心、意愿，缺一不可。</p>
<p>我的判断：这份方案的价值，在于它把「促消费」从一阵风式的补贴，升级成一套制度安排。框架有了，后面拼的是落地的颗粒度。</p>
<h2>扩大内需战略2026—2030：把短期变长期</h2>
<p>再往上看一层。2026年1月国新办发布会上，发改委副主任王昌林明确表示，今年将「制定并发布实施扩大内需战略（2026—2030年）实施方案」。这意味着，从「专项行动」到「战略」，促消费被放进了一个五年的长框架里。</p>
<p>为什么要从行动升级到战略？因为内需不足被二十届四中全会列为经济面临的风险挑战之一，中央经济工作会议也判断「国内供强需弱的矛盾已经凸显」。短期靠补贴顶，长期得靠制度把消费这台发动机做大、做稳。</p>
<p>我的判断：战略定下来，最大的意义是确定性——企业敢不敢为消费扩产、地方敢不敢为消费修基建，看的就是政策会不会只热一阵。五年牌桌摆明，比一句口号管用。</p>
<h2>外人怎么看这道题</h2>
<p>这道题不是中国独有，但中国的反差格外扎眼。横向比，主要发达国家的居民消费占GDP比重普遍在六成上下（美国更高，长期接近七成；日本约五成多），中国只在四成左右。差距本身，就是空间。</p>
<p>这种差距背后，是增长模式的不同：我们过去几十年靠投资和出口把经济体量做起来，居民部门的消费占比相对较低是这套模式的副产品。现在外需不确定性上升，把内需、把消费顶上去，既是稳增长，也是调结构。</p>
<p>不简单比高低——每个国家的阶段、文化、社保体系都不一样。但「居民消费占比偏低」这一条，几乎是所有分析者的共识，也是政策发力最明确的方向。</p>
<p>我的判断：差距不是丢脸的事，是余地。四成到六成之间，是未来十几年最大的内需增量池。</p>
<h2>普通人为什么该关心</h2>
<p>讲了一堆政策和数字，得落回你身上。你每个月的工资条、你休没休成的年假、你父母的养老金和医保、你背的房贷或房租——消费稳不稳，最后都化在这几件具体事上。</p>
<p>政策托的，不是某个宏观指标，是「你敢不敢花、有没有时间花」。增收落到工资和养老金上，休假落到你的日历上，安全网落到你怕的那几件事上，消费才从报表里的52%，变成你生活里的从容。</p>
<p>我的判断：这不是宏大的事，是家门口的事。消费这台发动机，每一脚油门，都是普通人的一笔开销、一段闲暇。</p>
<h2>边界：刺激消费不是鼓励浪费</h2>
<p>话说到这，得把边界划清。提振消费，不等于怂恿透支、不等于鼓吹消费主义。让人敢花，靠的是收入和安全网，不是信用卡和网贷。政策也反复强调「尽力而为、量力而行」，民生改善不能超越发展阶段。</p>
<p>也别把「消费谨慎」读成「消费降级」的恐慌。数据里能看到结构在升级——质价比、情绪价值、体验消费在涨，人们不是不花，是更挑着花。总量谨慎、结构升级，这两件事可以同时成立。</p>
<p>我的判断：健康的消费，是「该花的花、该存的存」，不是逼谁把存款搬空。把安全网织好，把休假还回去，居民自己会找到那个平衡点。</p>
<h2>写在后面的话</h2>
<p>2025到2026，是促消费政策密集落地的一段日子：一份专项行动方案、一个城乡居民增收计划、一笔5000亿再贷款、一轮休假制度刚性化、一套2026—2030扩大内需战略。密集是好事，但落地从来是慢功夫。</p>
<p>作为普通人，评判「促消费」这话真不真，不用听三句口号，看三个数就够：居民平均消费倾向（68%能不能回升）、居民存贷差（多存少贷能不能逆转）、周工时和休假落实率（有没有时间花）。这三个，比任何会场都诚实。</p>
<p>我的判断：钱不是没有，是没敢动；闲不是没有，是没排到。把「敢花」和「有闲」这两件事解开，消费才真正从「压舱石」，变成「主引擎」。</p>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1Nj4X64ELz" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1Nj4X64ELz&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>章北海｜消费为什么难提振？分配为什么没改善？</figcaption>
</figure>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1apoxYVEvx" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1apoxYVEvx&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>靳卫萍｜《提振消费专项行动方案》与当前宏观经济形势</figcaption>
</figure>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV17XdzB1Eg3" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV17XdzB1Eg3&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>央视财经｜发改委将制定2026—2030年扩大内需战略实施方案</figcaption>
</figure>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV12JPzz2EZi" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV12JPzz2EZi&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>央视新闻｜政府工作报告：深入实施提振消费专项行动，制定城乡居民增收计划</figcaption>
</figure>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1JXxB6rErv" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1JXxB6rErv&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>原点公社｜《求是》连发三文，供强需弱的本质和顶层政策思路</figcaption>
</figure>
<h2>参考</h2>
<ul class="pg-refs"><li><a href="https://www.stats.gov.cn/sj/zxfb/202602/t20260228_1962662.html" target="_blank" rel="noopener">中华人民共和国2025年国民经济和社会发展统计公报（社零50.12万亿、GDP140.19万亿、可支配43377、消费支出29476、服务性占比46.1%）</a><span class="src"> · 国家统计局</span></li><li><a href="https://www.stats.gov.cn/xxgk/sjfb/zxfb2020/202601/t20260119_1962330.html" target="_blank" rel="noopener">2025年经济发展向新向优 预期目标圆满实现（周工时48.6、五等份、失业率）</a><span class="src"> · 国家统计局</span></li><li><a href="https://www.qstheory.cn/20260126/76a41439531f41cc91aeef3871b03c77/c.html" target="_blank" rel="noopener">大力提振消费的战略意义和实践要求</a><span class="src"> · 求是网</span></li><li><a href="https://www.qstheory.cn/20260212/a6273997927f4eb6b405306b0654435e/c.html" target="_blank" rel="noopener">坚持扩大内需这个战略基点</a><span class="src"> · 求是网</span></li><li><a href="http://qstheory.net/20260323/985a94b2295e4d6eb73495a767117ccf/c.html" target="_blank" rel="noopener">以城乡居民增收计划筑牢内需驱动发展根基</a><span class="src"> · 求是网</span></li><li><a href="http://qstheory.cn/20260601/a83882cf82634a4ab1746ee44069d458/c.html" target="_blank" rel="noopener">扩大消费新供给 增强消费新动能</a><span class="src"> · 求是网</span></li><li><a href="https://en.qstheory.cn/2026-01/20/c_1155921.htm" target="_blank" rel="noopener">China delivers on 2025 growth target（居民消费约40%GDP、社零50万亿、5000亿再贷款）</a><span class="src"> · 求是英文版</span></li><li><a href="https://en.qstheory.cn/2026-07/24/c_1198913.htm" target="_blank" rel="noopener">How to Advance Economic Development in the First Year of the 15th Five-Year Plan（内需不足、household consumption ~40%）</a><span class="src"> · 求是英文版</span></li><li><a href="https://www.gov.cn/zhengce/202503/content_7013808.htm" target="_blank" rel="noopener">中共中央办公厅 国务院办公厅印发《提振消费专项行动方案》（全文）</a><span class="src"> · 中国政府网</span></li><li><a href="https://www.fujian.gov.cn/zwgk/ztzl/xxgcxjpxsdzgtsshzysx/zywz/202602/t20260216_7099412.htm" target="_blank" rel="noopener">习近平《当前经济工作的重点任务》（求是2026年第4期，扩大内需、增收计划）</a><span class="src"> · 福建省政府转载</span></li><li><a href="https://apicnrapp.cnr.cn/html/share.html?id=30633966" target="_blank" rel="noopener">2025年地区「财富榜」出炉（央行：住户存款167万亿、人均11.89万）</a><span class="src"> · 央广网</span></li><li><a href="https://www.jwview.com/jingwei/01-22/655688.shtml" target="_blank" rel="noopener">人均存款逼近12万元，多省公布金融统计数据</a><span class="src"> · 中新经纬</span></li><li><a href="https://www.dahecube.com/article.html?artid=260859%3Frecid%3D6" target="_blank" rel="noopener">管涛：实现内生动能的实质性恢复（消费倾向68%、存贷差14.20万亿、杠杆率59.4%）</a><span class="src"> · 大河财立方</span></li><li><a href="https://cn.chinadaily.com.cn/a/202608/09/WS6a786f2ca310d709c2fc241f.html" target="_blank" rel="noopener">关于多渠道增加居民财产性收入 优化税制释放消费潜力（个税、消费倾向）</a><span class="src"> · 中国日报网</span></li><li><a href="https://www.inewsweek.cn/politics/2026-08-10/31475.shtml" target="_blank" rel="noopener">领导带头，敢于休假（人社部年假数据、周工时）</a><span class="src"> · 中国新闻周刊</span></li><li><a href="https://www.workercn.cn/c/2026-03-12/8754970.shtml" target="_blank" rel="noopener">休息，也是生产力（陆铭quote、周工时、休假）</a><span class="src"> · 中工网</span></li><li><a href="https://m.cyol.com/gb/articles/2026-03/12/content_lbAmb0tWXN.html" target="_blank" rel="noopener">好日子少不了钱也缺不得闲（人民日报/中青在线）</a><span class="src"> · 中青在线</span></li><li><a href="http://mp.weixin.qq.com/s?__biz=MzU3OTU1NzAyOA==&mid=2247552829&idx=3&sn=0392b58a2967dc699a65382156b9c733&chksm=fc57f6158dd6bcfaab09e7a4aca1c04e66a4a342d3f91f5ce99ac3f5d11752fcf4707c01eccf#rd" target="_blank" rel="noopener">王念：2025年消费形势分析和2026年展望（以旧换新2.6万亿、服务消费、入境游、消费倾向68%）</a><span class="src"> · 国务院发展研究中心</span></li><li><a href="https://app.cb.com.cn/api/home/article_h5/300498" target="_blank" rel="noopener">江浙地区人均存款超15万元（杨海平谈预防性储蓄）</a><span class="src"> · 中国经营报</span></li><li><a href="https://english.scio.gov.cn/pressroom/2026-01/21/content_118291666.html" target="_blank" rel="noopener">China sees stable growth in resident income, domestic demand（内需贡献67%、消费52%、制定扩大内需战略2026—2030）</a><span class="src"> · 国新办</span></li></ul>`
  },
  {
    id: "post-246",
    title: "投资降17%、二手房占比过半：楼市转折，到底拐向哪",
    date: "2026-11-03",
    updated: "2026-11-03",
    cat: "日常",
    tags: ["经济"],
    cover: "",
    pinned: false,
    excerpt: "2025年房地产投资降17%、新房销售降近9%；2026年前8月二手房交易占比破50%，标志进入存量时代。止跌回稳之下，这场转折往哪走。",
    content: `<p>2025年，全国房地产开发投资82788亿元，比上年下降17.2%；新建商品房销售面积88101万平方米，下降8.7%；销售额83937亿元，下降12.6%。把这份国家统计局的年度账单摆开，房地产已经连续几年缩量下行——它曾经是拉动经济最有力的那台发动机，如今成了拖累增长、牵动风险的拖油瓶。</p>
<p>但2026年的数据里又冒出一个新信号：前8个月，全国二手房交易占比达到52%，第一次稳稳越过50%这条线。新房卖不动、二手房成主场，说明这个行业正从「盖新房、卖期房」的旧剧本，切换到「交易存量、运营存量」的新剧本。这篇文章想把这个转折说清楚——它从哪来、拐向哪、政策在往哪使劲、又划了哪条不能回头的边界。</p>
<p>我的判断：楼市转折，不是简单地涨或跌，而是一场发展方式的换轨。看懂这场换轨，比猜下个月房价涨跌有用得多。</p>
<h2>先看这件事的分量</h2>
<p>谈楼市，得先掂量它在国民经济里的分量。求是杂志的评论文章给过一组数：2024年，我国房地产业和建筑业增加值占国内生产总值的比重合计达到13%，直接带动就业人口超过7000万人。房地产链条长、关联度高，往前牵着钢铁、水泥、玻璃，往后连着家电、家具、装修，几十个上下游行业都跟着它的呼吸起伏。</p>
<p>从国际比较看，房地产从来都是支柱。美国、英国、德国、日本、澳大利亚这些发达国家，房地产业增加值占GDP的比重平均都在10%以上，至今仍是经济稳定和社会财富的主要载体。我们这13%，放在全球并不算离谱，但下行时的拉力也格外重。</p>
<p>对普通家庭来说，分量更直观。求是文章有一句很重的话：住房是普通家庭最大、最重要的资产。过去二十多年，城镇居民财富很大一块就压在房子上——房价涨，资产负债表就鼓；房价跌，财富感就瘪。所以楼市一动，牵动的不只是GDP，还有亿万个家庭的账面和心态。</p>
<p>我的判断：楼市的分量，决定了它既不能硬着陆，也不能回到老路。这中间的平衡，是后面所有政策的底色。</p>
<h2>数据里的转折</h2>
<p>把最近两年的数据并排看，转折的轮廓就清楚了。先看2025年全年：开发投资82788亿，降17.2%（其中住宅投资63514亿，降16.3%）；房屋新开工面积58770万平方米，降20.4%；竣工60348万平方米，降18.1%；新建商品房销售面积88101万平方米，降8.7%，销售额83937亿，降12.6%；年末商品房待售面积76632万平方米，反而比上一年末增长1.6%。</p>
<p>几个数字合在一起读：投资在退、开工在缩、销售在降，可待售库存还在往上堆。这正是「深度调整、动态筑底」八个字的注脚——一边是开发商不敢拿地不敢开工，一边是房子不好卖、卖掉的也没能完全去化，库存反而积压。全年房地产开发景气指数停在91.45，是个偏冷的位置。</p>
<p>再看2026年前5个月，下行没有戛然而止。1—5月开发投资30356亿，降16.2%；新建商品房销售面积31320万平方米，降10.8%；销售额29366亿，降13.5%；到位资金32756亿，降19.0%，其中国内贷款降28.7%、个人按揭贷款降28.0%。不过5月末待售面积77182万平方米，同比已经转降0.4%——库存压力开始边际松动，但投资和销售的降幅仍然不浅。</p>
<p>我的判断：这组数据说明，转折不是V型反弹，而是L型筑底。底部会磨很久，指望一夜回春既不现实，也不是政策想要的方向。</p>
<h2>从「三高」到出清</h2>
<p>转折的根源，藏在房地产自己旧的活法里。求是文章把旧模式点得很透：房地产企业的「高负债、高杠杆、高周转」模式难以为继，亟待向低负债、低杠杆、合理回报的模式转变。过去二十年，房企靠借钱拿地、快周转回款、再借钱扩张，把雪球滚到极大，房价也跟着滚上去。</p>
<p>这个模式能跑，靠的是房价一直涨、房子一直好卖的预期。一旦预期反转，雪球就散了。一批高杠杆房企先后暴雷、债务重组甚至破产，预售的楼盘出现交不了房的风险，「保交楼」成了必须兜底的民生底线。从家庭住房拥有率、房价收入比、房价租金比，再到房地产相关贷款占银行贷款比重、房地产业相关收入占地方财政收入比重，多个维度都指向同一句话：传统房地产发展模式已经走到了尽头。</p>
<p>出清是痛苦的，但躲不开。国家统计局的数据里，新开工面积一年比一年缩（2025年降20.4%，2026年前5月再降22.6%），就是房企在主动收手、市场在做减法。旧模式退场，才有新模式上场的位置。</p>
<p>我的判断：这一节的本质是「还债」——还的是高杠杆欠下的账。出清越干净，后面的新路才走得越稳。</p>
<h2>止跌回稳：一句话的定调</h2>
<p>转折需要方向盘。2024年9月26日，中央政治局会议第一次明确提出「促进房地产市场止跌回稳」，并要求「对商品房建设要严控增量、优化存量、提高质量」「加大白名单项目贷款投放力度」「调整住房限购政策，降低存量房贷利率」。这四个字，成了此后所有房地产政策的定调词。</p>
<p>到了2025年底的中央经济工作会议，表述进一步落为「着力稳定房地产市场」，强调「因城施策控增量、去库存、优供给」，并首次明确「鼓励收购存量商品房重点用于保障性住房等」「有序推动好房子建设」「加快构建房地产发展新模式」。从「止跌回稳」到「着力稳定」再到「加快构建新模式」，政策的重心在从救急转向建制。</p>
<p>住建部把这套动作概括为「四个取消、四个降低、两个增加」——说白了，就是把各地限购限售等不合理的限制该取消的取消，把首付、利率、税费等购房成本往下降，再把城中村危旧房改造和「白名单」项目信贷规模往上加。翻译成大白话：一头松绑需求，一头兜底供给，两头一起把市场托住。</p>
<p>我的判断：「止跌回稳」四个字，目标不是把房价再炒起来，而是让交易量和价格都不再自由落体。稳，是这一程的底线。</p>
<h2>四个取消、四个降低、两个增加</h2>
<p>这十二个字，是这一轮政策最具体的着力点，挨个拆开看。四个取消，指向各地过去层层加码的限制性措施：限购、限售、限价，以及普通住宅和非普通住宅的划分标准，能因城施策取消的，尽量取消，把被压住的合理购房需求放出来。</p>
<p>四个降低，对准购房者的成本：降低住房公积金贷款利率、降低住房贷款首付比例、降低存量房贷利率、降低「卖旧买新」换购住房的税费。每一项都是在给买房人减负——尤其是存量房贷利率的下调，直接减轻了一大批已购房家庭的月供压力，也缓解了提前还贷和断供的苗头。</p>
<p>两个增加，补的是供给和资金两头：一边是新增实施城中村改造和危旧房改造，一边是把房地产项目「白名单」的信贷规模做加法。白名单的意义，是让资质干净、正常施工的项目能拿到钱，把该交的房交出去，把该稳的房企稳下来。</p>
<p>我的判断：这套政策的聪明之处，在于它不靠大水漫灌，而是做结构性的「加减法」。加的是保障和改造，减的是门槛和成本——方向对，但落地颗粒度决定成败。</p>
<h2>首付降到15%、利率往下走</h2>
<p>需求端最直观的变化，是门槛降了。人民日报对2026年上半年的复盘显示，全国超百城下调了购房首付比例，多数城市首套最低首付降到15%、二套降到25%；央行持续引导房贷利率维持低位。对比前几年首套普遍两成、二套三成起步，这套组合直接把上车门槛砍掉一截。</p>
<p>更实在的是存量房贷利率的下调。前面说过，这是给已经背了房贷的人减负，效果立竿见影：月供少了，可支配收入就松一点，断供和提前还贷的压力也小一点。与此同时，置换家庭的交易税费也在降——二手房增值税免征年限缩短，普通置换家庭综合减税从两万到十万不等，全年全国范围减税规模接近千亿元。</p>
<p>央行的动作不止利率。2024年设立的3000亿元保障性住房再贷款，到2026年上半年落地投放规模约800亿元，用来把闲置的已建成商品房收储改造，转成保租房、共有产权房。这条线后面单独讲。</p>
<p>我的判断：降首付、降利率、降税费，三降齐发，解决的是「买得起、月供扛得住、换得起」三件事。它能托住需求，但托不起一个已经过剩的市场——所以另一端必须严控增量。</p>
<h2>存量时代：二手房占比52%</h2>
<p>转折最硬的一个标志，藏在交易结构里。住房和城乡建设部在2026年9月的国新办发布会上公布：我国二手房交易占比，已经从2020年的27%，提高到2025年的46%，再到2026年前8个月的52%——第一次稳稳越过50%这条标志线。中央财办此前也给出过相近的口径，2021年这一比例是28%，2025年已到45%。</p>
<p>52%意味着什么？意味着一年里卖掉的房，一半以上是二手房，不是新房。这在一个长期以新房开发为主的市场里，是里程碑式的倒挂。它说明两件事：一是城镇化从「大规模盖新城」转向「存量提质增效」，新建需求见顶；二是人们的居住需求从「有没有」转向「好不好」，更多人通过买卖、置换二手来提升居住品质。</p>
<p>二手房成为主场，也倒逼制度跟着变。过去的期房预售、新房营销那一套，对二手房基本无效；而二手房交易涉及的带看、贷款、过户、税费、中介，以及「带押过户」这类便利措施，才是存量时代的基础设施。市场换了赛道，规则就得重画。</p>
<p>我的判断：52%不是一时波动，是分水岭。从这一天起，中国楼市正式进入存量时代——评判楼市的尺子，得换成二手房的尺子。</p>
<h2>房地产发展新模式「1234」</h2>
<p>存量时代要有新活法。住建部把「房地产发展新模式」的内涵，归纳成一个好记的「1234」。一个目标：牢牢抓住让人民群众安居这个基点，实现更高水平的住有所居。两个体系：完善保障和市场两个体系，定位清晰、功能互补，租购并举。</p>
<p>三项制度，是这一程改革的硬骨头：以项目公司制、主办银行制、现房销售制为重点，改革完善房地产基础性制度。四大要素：推动「人、房、地、钱」四要素联动，实现以人定房、以房定地、以房定钱，让要素合理配置。</p>
<p>截至2026年9月那场发布会，住建部明确：三项基础性制度已经全部出台。这意味着新模式的骨架搭起来了，后面是往里填肉、看落地。一个目标管方向，两个体系管供给，三项制度管秩序，四大要素管平衡——四句话，把「怎么从旧模式走出来」说清楚了。</p>
<p>我的判断：「1234」听着像口号，但它其实是给房地产重新立规矩：从「项目公司」管住钱、从「主办银行」管住贷、从「现房销售」管住交付，三道闸一起上，旧模式那套空手套白狼的玩法就难再玩下去。</p>
<h2>三项基础制度：项目公司制、主办银行制、现房销售制</h2>
<p>三项制度里，每一项都直指旧模式的痛点。项目公司制：一个房地产项目对应一家项目公司，项目公司依法行使独立法人权利，严禁企业总部违规抽挪项目公司的资金。过去出问题，往往是总部把项目公司的预售款抽走去填别处的窟窿，最后项目没钱盖、购房人收不了房。这道闸，就是为了防止「拆东墙补西墙」。</p>
<p>主办银行制：一个项目确定一家银行或银团作为主办银行，项目的开发、建设、销售资金要全部存入主办银行，由主办银行提供融资服务、满足合理融资需求。钱在一个账户里全程留痕、清晰可视，谁动了多少、花到哪了，一目了然，既防挪用，也方便精准输血好项目。</p>
<p>现房销售制，可能是普通人感知最强的一项：通过实现「所见即所得」，从根本上防范交付风险。住建部明确，今后房地产开发新项目要优先选择现房销售；继续实行预售的，要完善预售资金监管，保障购房人权益。人民网的解读说得更直白——买商品一手交钱一手交货理所应当，住房却长期是付了钱等期房，现房销售把「货不对板、不能按期交付」的老毛病从根上治。</p>
<p>我的判断：三项制度的核心，是把风险和责任钉在项目上，而不是钉在母公司或购房者身上。预售制不会一刀切取消，但「优先现房」已经定调——交付确定性，成了行业新的竞争点。</p>
<h2>好房子：层高3米、4楼装电梯</h2>
<p>新模式不只是控风险，也要提品质。住建部把「好房子」定义为安全、舒适、绿色、智慧，并从14个方面提高住房品质要求。几个数字很具体：把住宅层高标准从原来的2.8米提高到3米；为解老年群体上下楼难题，4楼及以上住宅都要加装电梯；把阳台、外廊等临空处护栏高度统一提高到不低于1.2米。</p>
<p>这些不是锦上添花，是对居住痛点的正面回应。层高矮、没电梯、护栏低，是大量老旧住宅的通病；把它们写进新建标准，等于给未来的房子重新定了一条底线。住建部还提出，把新房子建好、把老房子改好、把服务做好——老房子通过原拆原建或改造维修来提升，同步做适老化、智能化改造。</p>
<p>和城市更新绑定，「好房子」有了落地场景。十五五规划明确，全国将新开工改造11.5万个城镇老旧小区，更新和加装住宅电梯57.5万台，新增1.5万个口袋公园、2万公里城市绿道；城市地下管网改造约77万公里，投资规模超过5万亿元。房子好不住、社区老破，都在这张清单里。</p>
<p>我的判断：从「有房住」到「住好房」，是存量时代需求侧的真问题。好房子不是豪宅的代名词，是把层高、电梯、护栏这些最基本的居住尊严，还给普通人。</p>
<h2>保障房再贷款3000亿</h2>
<p>存量时代，保障和市场的双轨得更清晰。央行在2024年设立3000亿元保障性住房再贷款，利率1.75%、期限1年可展期4次，按市场化原则带动银行贷款约5000亿元，专门支持地方国企以合理价格收购已建成未出售的商品房，用作配售型或配租型保障性住房。</p>
<p>到2026年上半年，这笔钱落地投放规模约800亿元——把闲置的、卖不掉的房源收过来，改造成保租房、共有产权房，一头帮房企回笼资金、去库存，一头给新市民、青年人、工薪群体提供买得起或租得起的住房。求是文章把这条线说得很明确：鼓励收购存量商品房重点用于保障性住房，打通市场存量与民生保障之间的通道。</p>
<p>这笔钱的关键在「以需定购、合理定价」，不是政府兜底乱收，而是地方国企按市场价、按真实需求来收。它既缓解房企资金压力，又补上保障性住房供给的短板——市场出清和保障兜底，被同一根管子接了起来。</p>
<p>我的判断：3000亿再贷款，是存量时代最巧妙的一招。它不动增量、只盘存量，既去库存又补保障，比单纯刺激购房更治本。落地800亿只是开头，后面看的是收储速度和定价公允。</p>
<h2>城中村改造与城市更新</h2>
<p>另一台发动机，是城市更新。人民日报的半年复盘给出一组数：2026年中央财政为城市更新配套资金2570亿元；上半年全国新开工改造老旧小区超2.5万个，开工城中村更新项目超千个，累计带动建设投资约1.4万亿到1.5万亿元，成为楼市新的增长支点。</p>
<p>这和过去的「棚改货币化」不是一回事。棚改是直接发钱催生买房需求，容易推高房价；这一轮城市更新，重心在改老旧小区、改城中村、改地下管网，是补短板、提品质的实物投资，带动的是建材、施工、家装、物业这些产业链，而不是单纯炒房。</p>
<p>量级不小。前面提到，十五五期间全国要新开工改造11.5万个城镇老旧小区、加装电梯57.5万台、改造提升1500个老旧街区厂区，城市地下管网约77万公里、投资超5万亿元。这些钱花下去，既改善居住，也托住投资——在房地产开发投资还在降的时候，城市更新补上了缺口。</p>
<p>我的判断：城市更新是楼市转折里少有的「增量」，但它增的是公共品和存量品质，不是新房泡沫。把它和棚改分清，才不会误读政策意图。</p>
<h2>居民杠杆与法拍房</h2>
<p>转折的另一面，是家庭资产负债表在承压。对普通家庭来说，住房是最大、最重要的资产，也是负债最重的一项——房贷曾是中国家庭资产负债表里最粗的那根柱子。当房价不再单边上涨，这根柱子对财富的支撑就在变弱，月供和收入之间的关系却一点没松。</p>
<p>风险信号之一，是法拍房。求是文章在谈预期管理时，点名将「房地产投资、法拍房数量、房企倒闭或债务重组」列为直接影响社会预期的关键监测指标——换句话说，法拍房数量已经被放进官方监测的视野，它的上行，本身就在放大市场的悲观预期。</p>
<p>另一头是居民杠杆。经过前些年加杠杆买房，居民部门杠杆率处于高位，新增房贷的意愿和能力都在下降；2026年前5个月，个人按揭贷款同比下降28.0%，就是需求端还在收缩的硬证据。杠杆去化的过程，本身就是楼市磨底的一部分。</p>
<p>我的判断：居民杠杆和法拍，是这场转折里最不该忽视的「人」的代价。政策托市，托的不该只是房企和土地财政，更该是那些月供快扛不住的家庭。</p>
<h2>房价：70城数据里的分化</h2>
<p>房价是普通人最关心的指标，但全国平均数会骗人。2026年5月，70个大中城市里，新房价格同比下跌3.6%，二手房同比下跌5.9%——还在跌，但二手房跌幅较2025年末收窄了0.2个百分点，一线城市的环比已经翻正。分化是关键词：高能级城市、核心地段先企稳，弱能级城市、远郊还在寻底。</p>
<p>拆开看更清楚。5月份一线城市新建商品住宅价格环比上涨0.2%，其中上海、广州、深圳涨，北京微跌；一线城市二手住宅环比涨0.4%。二三线城市环比仍在下降。这说明止跌回稳不是齐步走，而是「好的先稳、差的慢磨」，城市之间的剪刀差在拉大。</p>
<p>把时间拉长，2026年1—5月销售降幅较2025年末小幅扩大，但已连续三个月稳步收窄。收窄不等于反转，它更像是在底部反复确认的过程——量在慢慢找到新的平衡，价还在为过去的泡沫还账。</p>
<p>我的判断：房价这东西，以后很难再「普涨」了。存量时代的特征就是分化：好地段的好房子抗跌甚至微涨，差地段的差房子继续挤水分。用一句老话套新的现实——闭眼买房赚钱的时代，结束了。</p>
<h2>外人怎么看这道题</h2>
<p>楼市转折不是中国独有问题，但中国的体量和牵连让它格外受关注。外资机构里，高盛的一份研报被反复引用：测算显示，房地产每100万元支出能创造约4.6个就业岗位，而高科技产业每100万元支出只创造约3个就业。换句话说，在拉动就业这件事上，房地产的带动效应仍强于高科技。</p>
<p>这个数字背后的逻辑很简单：房地产链条长，从上游钢筋水泥到下游家电装修，每一笔支出都会沿着供应链渗进无数工厂和工地。所以它下行时，拖累的不仅是GDP，更是千万个蓝领岗位的饭碗——这也是为什么政策对楼市不敢掉以轻心。</p>
<p>当然，外人看中国楼市，也看它的潜力。研究机构按日韩的建设强度推算，我国城乡每年新建住宅规模仍应在1000万到1490万套之间；城镇化从快速增长期转入稳定发展期，城市更新和危旧房改造还有大片空间。转折不等于完结，而是从「狂奔」转向「慢跑」。</p>
<p>我的判断：高盛那组对比提醒我们，房地产的就业权重，决定了它不能硬着陆；而日韩的推算提醒我们，它也没到没落。转折是换速，不是熄火。</p>
<h2>普通人为什么该关心</h2>
<p>讲了这么多数据和政策，最后落回你身上。你背的房贷月供、你父母那套老房子的电梯、你正在看的二手房能不能按时过户、你孩子将来要不要在城里安家——楼市稳不稳，最后都化在这几件具体事上。</p>
<p>政策托的，不是某个宏观指标，是你生活里的确定性：首付降了，你上车门槛低了；存量利率降了，你月供松了；现房销售推开，你不用再赌开发商交不交得了房；保障房收储扩面，你身边买不起房的年轻人可能多一个选项。每一项，都对应着一个具体的人。</p>
<p>反过来，转折的风险也落在你身上：如果你在高杠杆时接了盘，资产缩水的是你；如果所在城市产业弱、人口流出，你手里房子的流动性会更差。楼市进入存量时代，意味着「房子是用来住的」这句话，第一次有了硬约束——持有成本、变现难度，都会显形。</p>
<p>我的判断：普通人看楼市，别再问「哪涨哪跌」的玄学，要问「我这套房的流动性、我的月供安全垫、我所在城市的产业人口」这三件事。转折时代，安全比增值重要。</p>
<h2>边界：不重回高杠杆旧模式</h2>
<p>话说到这，得把边界划清。楼市要稳，但稳的方式不能是把旧模式再救活一遍。中央的态度很明确：严控增量、盘活存量、优化质量，防的是「一边化债、一边又加新杠杆」的循环。十四五末房企债务仍然较高，不排除个别企业仍有破产重组的可能——这个底，得靠出清来垫，不能靠放水来盖。</p>
<p>新模式的「三项制度」，本质上就是给旧玩法焊上三道闸：项目公司制防抽逃、主办银行制防挪用、现房销售制防烂尾。它们共同指向一件事——让房地产回到「盖好房、交好房、住好房」的低杠杆常态，而不是回到「借钱拿地、捂盘炒价」的高周转狂奔。</p>
<p>也别把「止跌回稳」读成「房价要涨回去」的暗示。政策要的是交易量和价格不再失速，是市场出清后的新平衡，不是把泡沫重新吹大。求是文章反复强调「保持战略定力」，新旧模式转换需要时间，市场行为逻辑转变也需要时间，急不得。</p>
<p>我的判断：这场转折最危险的误区，是把「稳楼市」误读成「救房价」。真正的稳，是让行业以更低杠杆、更实品质、更清库存的方式活下去——回头路，已经被制度堵上了。</p>
<h2>写在后面的话</h2>
<p>2024年9月「止跌回稳」定调，到2025年全年数据深度筑底，再到2026年前8个月二手房占比破52%、三项基础制度全部出台、城市更新挑起投资大梁——两年时间，中国楼市完成了一场静悄悄的换轨：从增量开发转向存量运营，从高杠杆狂奔转向低杠杆常态。</p>
<p>作为普通人，评判这场转折真不真，不用听太多口号，看三个数就够：二手房交易占比（50%以上是不是常态）、房地产开发投资降幅（什么时候不再两位数下滑）、个人按揭贷款（28%的下滑什么时候收窄）。这三个，比任何会场都诚实。</p>
<p>我的判断：楼市转折，拐向的不是又一个暴涨周期，而是一个更慢、更实、更讲交付和品质的新常态。承认这个新常态，比盼着回到过去，更靠谱，也更安全。</p>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1kPxEeVEoZ" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1kPxEeVEoZ&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>章北海｜中央发话！止跌回稳！这次他们是真的急了，但有用吗？</figcaption>
</figure>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1jS7A6EELJ" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1jS7A6EELJ&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>楼市奇说｜央行6月份下发3000亿保障性住房再贷款，国家队全力进场兜底收房</figcaption>
</figure>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1MwREBTEms" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1MwREBTEms&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>房价止跌回稳了吗？用17组数据验个牌！</figcaption>
</figure>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV12axs6mEAi" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV12axs6mEAi&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>高盛研报：房地产每100万元支出创造4.6个就业岗位，远超高科技</figcaption>
</figure>
<h2>参考</h2>
<ul class="pg-refs"><li><a href="https://www.stats.gov.cn/sj/zxfbhjd/202601/t20260119_1962324.html" target="_blank" rel="noopener">2025年全国房地产市场基本情况（开发投资82788亿降17.2%、销售88101万㎡降8.7%、销售额83937亿降12.6%、待售76632万㎡增1.6%、国房景气91.45）</a><span class="src"> · 国家统计局</span></li><li><a href="https://www.stats.gov.cn/sj/zxfb/202606/t20260616_1963950.html" target="_blank" rel="noopener">2026年1—5月份全国房地产市场基本情况（投资30356亿降16.2%、销售31320万㎡降10.8%、销售额29366亿降13.5%、到位资金降19.0%）</a><span class="src"> · 国家统计局</span></li><li><a href="https://www.qstheory.cn/20251231/f3cb83eb629f452ebf1fdbc0294557be/c.html" target="_blank" rel="noopener">改善和稳定房地产市场预期（2024房地产业+建筑业占GDP13%、带动就业7000万、户均住房超1.1套、旧模式走到尽头）</a><span class="src"> · 求是网</span></li><li><a href="http://qstheory.com/20251217/72ed6ca94d654173a0d2478b24e797d9/c.html" target="_blank" rel="noopener">中央财办有关负责同志详解2025年中央经济工作会议精神（二手房占比45%、城镇化率67%户籍不足50%）</a><span class="src"> · 求是网</span></li><li><a href="https://www.qstheory.cn/20260214/ff193e10db01437f80dd34e7b18d5ee9/c.html" target="_blank" rel="noopener">开局之年经济工作怎么干（习近平总书记文章：控增量、去库存、优供给，有序推动好房子建设）</a><span class="src"> · 求是网</span></li><li><a href="https://www.qstheory.com.cn/20260919/a9e03cea46644b2b842a8af36469e5c7/c.html" target="_blank" rel="noopener">加快构建房地产发展新模式（二手房占比52%存量时代、1234新模式、三项制度已全部出台）</a><span class="src"> · 求是网</span></li><li><a href="https://www.qstheory.com.cn/20260919/c5857a82206b4fe887d1039901c48759/c.html" target="_blank" rel="noopener">推进住房城乡建设事业高质量发展（城市更新、地下管网77万公里、投资超5万亿）</a><span class="src"> · 求是网</span></li><li><a href="https://www.peopleapp.com/rmharticle/30052642091" target="_blank" rel="noopener">房地产市场半年回顾与展望：局部企稳，结构分化（超百城首付15%/25%、保障房再贷款落地800亿、城市更新2570亿、1-5月数据、70城-3.6%/-5.9%）</a><span class="src"> · 人民日报人民号</span></li><li><a href="https://finance.people.com.cn/n1/2026/0521/c1004-40724098.html" target="_blank" rel="noopener">实现住房「所见即所得」（十五五规划纲要：有力有序推进现房销售、推行项目公司制和主办银行制）</a><span class="src"> · 人民网</span></li><li><a href="https://finance.people.com.cn/BIG5/n1/2026/1029/c1004-40824110.html" target="_blank" rel="noopener">「眼见为实」交付确定性成房地产行业新趋势（2026年8月多部门《完善商品住房销售制度通知》、现房销售落地）</a><span class="src"> · 人民网</span></li><li><a href="https://cpc.people.com.cn/BIG5/n1/2026/0919/c64387-40801538.html" target="_blank" rel="noopener">加快构建房地产发展新模式（权威发布·开局起步十五五：11.5万老旧小区、57.5万台电梯、1.5万口袋公园）</a><span class="src"> · 中国共产党新闻网</span></li><li><a href="https://www.ce.cn/xwzx/gnsz/szyw/202602/t20260215_2777504.shtml" target="_blank" rel="noopener">《求是》杂志发表习近平总书记重要文章《当前经济工作的重点任务》（保交房白名单、收购存量商品房、好房子、新模式）</a><span class="src"> · 中国经济网</span></li><li><a href="https://house.cnr.cn/sl/20260119/t20260119_527498418.shtml" target="_blank" rel="noopener">国家统计局：2025年全国房地产开发投资同比下降17.2%（复述核心年度数据）</a><span class="src"> · 央广网</span></li><li><a href="https://www.ce.cn/cysc/fdc/fc/202601/t20260120_2715692.shtml" target="_blank" rel="noopener">深度调整，动态筑底：2025年房地产行业数据解读（10家千亿房企、中指/克尔瑞口径）</a><span class="src"> · 中国经济网</span></li><li><a href="https://www.gov.cn/yaowen/liebiao/202412/content_6991539.htm" target="_blank" rel="noopener">房地产市场走势怎么看——当前中国经济问答（四个取消、四个降低、两个增加政策框架、9.26后效果）</a><span class="src"> · 中国政府网</span></li><li><a href="https://cpc.people.com.cn/BIG5/n1/2024/0926/c64094-40328825.html" target="_blank" rel="noopener">中共中央政治局召开会议 分析研究当前经济形势和经济工作（2024.9.26首提「促进房地产市场止跌回稳」）</a><span class="src"> · 中国共产党新闻网</span></li><li><a href="https://www.xinhuanet.com/20251223/b65d259ec1844656ab6ed415c170447d/c.html" target="_blank" rel="noopener">新华时评·聚焦中央经济工作会议：把「稳」字落到实处推动房地产市场健康发展（着力稳定房地产市场）</a><span class="src"> · 新华网</span></li><li><a href="https://www.xinhuanet.com/fortune/20250301/dba6bf60cf974711bc7daba2cb48b011/c.html" target="_blank" rel="noopener">有效防范化解重点领域风险（保交房截至2024年底交付338万套、白名单扩围、四个取消四个降低两个增加）</a><span class="src"> · 新华网</span></li><li><a href="https://www.mohurd.gov.cn/xinwen/jsyw/art/2026/art_ddc584f13eaf4d02958ff8a2b8ad441a.html" target="_blank" rel="noopener">国新办举行「开局起步十五五」系列主题新闻发布会 介绍住房城乡建设事业高质量发展有关情况（2026.9.18）</a><span class="src"> · 住房和城乡建设部</span></li><li><a href="https://www2.xinhuanet.com/fortune/20251211/e77d8076b32544a697656f135b8b3916/c.html" target="_blank" rel="noopener">聚焦中央经济工作会议：我国将着力稳定房地产市场（控增量、去库存、优供给、加快构建新模式）</a><span class="src"> · 新华网</span></li></ul>`
  },
  {
    id: "post-247",
    title: "乡愁的味道：玛德琳、邮票与秋天气味的多角度拆解",
    date: "2026-11-03",
    updated: "2026-11-03",
    cat: "文史",
    tags: ["乡愁"],
    cover: "",
    pinned: false,
    excerpt: "乡愁到底是什么味道？从味觉与嗅觉的分家、普鲁斯特的玛德琳、嗅球到海马体的直达专线，到心理学nostalgia、余光中与费孝通，多路拆开这股绕不开的气味。",
    content: `<p>余光中写《乡愁》，把那种情绪压成了四件物事：小时候是一枚邮票，长大后是一张船票，后来是一方坟墓，现在是浅浅的海峡。四样东西，没有一道菜，没有一味调料。可我们偏要追问一句：乡愁，到底是什么味道？</p>
<p>这个问法本身就不老实。味道是舌头和鼻子的事，乡愁是心里的事，硬把两样绑在一起，像是修辞。但这篇文章想认真回答它——从味觉、嗅觉、神经、心理、文学、社会学几条路同时拆开，看"味道"二字在乡愁里到底走了哪几条通道。我的判断：乡愁有味道，而且它的味道几乎全藏在嗅觉里，藏在那些你以为早就忘了、一闻到却猛地站住的气味里。</p>
<h2>味道二字：先分两家</h2>
<p>要谈乡愁的味道，得先把"味道"拆开。人能尝出来的，严格说只有五种：酸、甜、苦、咸，加上后来补进来的鲜。这五种靠舌头上的味蕾，是化学物质的直接反应，信号进了脑，先过丘脑再分配。它能告诉你"这是什么"，但很少单独把你拽回某年某月。</p>
<p>真正干"勾魂"活的，是嗅觉。鼻子闻到的气味分子，路径和舌头不一样：它不绕丘脑这个中转站，信号从嗅球直接连到杏仁核（管情绪）和海马体（管记忆）。这条近路短得离谱，短到气味常常绕过你的理性，先一步把情绪和往事拍在脸上。所以乡愁说"味道"，九成说的不是嘴里那点酸甜苦咸，是鼻子里那股说不清、却一下子认得出的气味。</p>
<p>我的判断：把乡愁叫"味道"，是身体在替我们找一个最准的词——因为气味，确实是记忆里最短的那条回路。</p>
<h2>玛德琳：文学里第一块触发记忆的蛋糕</h2>
<p>说到气味勾记忆，绕不开一个人和一块蛋糕。法国作家普鲁斯特在《追忆似水年华》开头写，主人公把一块玛德琳小蛋糕浸进茶里，那股味道碰上味蕾的一瞬，一段被遗忘的童年往事像潮水一样涌回来——贡布雷，礼拜天上午，去莱奥妮姑妈房里请安，她把蛋糕泡在茶里给他吃。</p>
<p>这块蛋糕后来成了专有名词。"普鲁斯特效应"指的就是：由感官线索（尤其气味）引发的自传体记忆。它出名，不是因为文学家会写，而是因为它说中了一种人人都有的体验——某个味道、某股气味，突然把你钉在一段很久以前的时刻里。文学先写下的现象，几十年后被脑科学接过去，当作正经课题来量。</p>
<p>我的判断：玛德琳之所以被反复引用，是因为它把"乡愁有味道"这件事，最早、也最准确地演给了所有人看。</p>
<h2>大脑里的直达专线</h2>
<p>气味为什么比照片、声音更猛？答案在解剖结构。科普中国转述西北大学范伯格医学院一项用神经影像和颅内电生理做的研究：人类所有感官里，只有嗅觉的通路保留了和海马体的直接连接，视觉、听觉、触觉在演化里都被"改道"，先经过一层关联皮层再绕去记忆区，唯独嗅觉还走老路。</p>
<p>这就解释了那种"高保真闪回"：照片让你"想起"一件事，气味让你"重新活一遍"那件事。杏仁核给情绪上色，海马体把场景原样调出来，中间没有理智拦一道。科技日报的科普文章也点过同一处：嗅觉系统和边缘系统（情绪与记忆编码的核心）高度重合，所以气味天然是情绪性记忆的触发线索。</p>
<p>我的判断：所谓"乡愁的味道"，生理上就是嗅球到海马体那根没被改道的老电线，还通着。</p>
<h2>为什么多半是童年</h2>
<p>一个有点反直觉的事实：气味唤醒的记忆，比别的感觉唤醒的更老。有研究者让受试者分别用气味、画面、文字当线索回忆往事，并说出事發时的年龄，结果发现，年纪大的人通过气味想起的往事，大多落在人生的头十年；用画面或文字想起的，多在十到二十岁。</p>
<p>这和数据里另一个观察对得上：人对某种气味的印象，常常钉死在第一次接触它的场景里。后来你在别处再闻到同一股味，新旧记忆较量，多半还是最初那次赢。小时候家里的油烟味、晒过的被子、某种肥皂、某季的花，都在那几年被牢牢绑定，之后几十年只等一个气味来开锁。</p>
<p>我的判断：乡愁总显得"很远"，因为它锁死的，常常是你还不会说话、不会记事的那几年。</p>
<h2>心理学怎么看乡愁</h2>
<p>"nostalgia"这个词，最早不是浪漫的。瑞士医生让·雅各·哈德在1678年用希腊词根造了它，原意近乎"一个生病的人因不在故乡而感到的痛苦"，本是个医学诊断，用来解释离乡士兵的抑郁和躯体症状。两三百年后，它才慢慢从病症滑向情感。</p>
<p>现代心理学把它翻了案。南安普顿大学的康斯坦丁·赛迪基德斯（Constantine Sedikides）和蒂姆·维尔德斯胡特（Tim Wildschut）这二十年的研究是这条线上的主力。他们一篇综述里写得很直白：nostalgia considered an emotion, and a predominantly positive one——乡愁被看作一种情绪，而且是偏正向的那种。它不是病，是人在受威胁时自己招来的缓冲。</p>
<p>他们的框架里，乡愁干三件事：社会功能（让珍视的人重新靠近，补归属感）、自我功能（把过去的自己讲成一个连贯、还不错的叙事）、存在功能（在觉得生活没意义时，把意义感垫回来）。新冠疫情期间的日记研究显示，越孤独的人越容易乡愁，而乡愁一上来，孤独感就被压下去一点。</p>
<p>我的判断：乡愁不是软弱，是大脑自带的一套应急取暖。说它"正向"，不等于它不苦，而是说它苦完会往回给你一点东西。</p>
<h2>从病症到情感：一个词的旅行</h2>
<p>这个词的中国用法，也走过类似的路。中国作家网一篇评论里特意去查了字典：对家乡的感情和思念，属性是"情感状态"，提出者写着瑞士医生哈德，定义就是"一个生病的人因为他并非身处故乡而感觉到的痛苦"，或者"再也无法见到故乡的恐惧"。</p>
<p>也就是说，我们今天随口说的"乡愁"，根子上带着离乡的病痛记忆。它从医学里长出来，被文学接过去，又被每个离家的普通人每天复用。一个词能活几百年，靠的正是它始终戳中同一样东西：人不在该在的地方。</p>
<p>我的判断：我们谈"乡愁的味道"，其实是在谈"不在"的味道——味道是引线，引线那头是位置错位的疼。</p>
<h2>中国文学里的乡愁传统</h2>
<p>中文里的乡愁，有自己的一串意象。余光中1972年写的那首，把个人命运压进四样物件：邮票连着母亲，船票连着新娘，坟墓连着母亲（"我在外头，母亲在里头"），海峡连着大陆。四句，八十八个字，二十分钟一挥而就，可前头憋了二十年。中国台湾网记载，他1949年离大陆，写这首诗时已经离开二十多年，看不见回头的迹象。</p>
<p>更早的线索在古诗里。王维"独在异乡为异客，每逢佳节倍思亲"，李白"举头望明月，低头思故乡"，贺知章"少小离家老大回，乡音无改鬓毛衰"，宋之问"近乡情更怯，不敢问来人"——四句各自从一个角度切：孤、节、老、怯。古诗文里这类句子俯拾皆是，说明乡愁在中国书写里从来不是新题。</p>
<p>鲁迅的《故乡》走另一条路。他写"我"隔了二十余年回去，记忆里金黄的圆月、西瓜地里的闰土，和眼前灰暗破败的村庄对不上。结尾那句常被引："希望本无所谓有，无所谓无的。这正如地上的路；其实地上本没有路，走的人多了，也便成了路。"乡愁在他笔下不是甜，是回不去之后的清醒。</p>
<p>我的判断：中国文学的乡愁，甜的和苦的都有，但都认一个理——它总得有个"回不去"垫底，才成立。</p>
<h2>费孝通说：土气不是贬义</h2>
<p>要把乡愁放进中国社会的大图里，费孝通的《乡土中国》是绕不开的一本。书开篇就是一句："从基层上看去，中国社会是乡土性的。"重庆日报一篇读后里点出，他说的"土气"在很多语境里带贬义，在他笔下却是人与土地血脉相连的象征——到外地种点什么、怕水土不服带一包灶上的土冲水喝，都是这种绑定的日常证据。</p>
<p>书里另一个关键概念是"差序格局"：以自己为中心，像石子丢进水里，一圈圈推出去，近的亲、远的疏。人和人的关系、人和故乡的关系，都在这圈波纹里。乡土社会是"熟人社会"，信任到听脚步声就知道谁来。乡愁，就是人离了这张网之后，网还留在身体里的那种牵扯。</p>
<p>我的判断：中国人的乡愁格外重，是因为我们的文化底子是"土"的。土走不了，人走了，土还在记忆里长。</p>
<h2>食物的乡愁：最难复刻的那口</h2>
<p>落到日常，"乡愁是什么味道"最常指向一口吃的。央视《味道》栏目做过"我的家乡菜"，中国青年报做过"不一young的家乡味"，都是在接这个题。家乡菜、家里的火候、某种在外买不到的调料，是乡愁最具体、也最日常的载体。</p>
<p>它难复刻，原因在气味和情境的绑定。前面说过，嗅觉记忆依赖初次接触的情境；同样的食材、同样的配方，换个城市、换拨人、换一季空气，分子也许一样，情境全换了，"不对味"就来了。河南省文化和旅游厅2026年秋天一篇谈秋天气味的文章说得直白：河南人的秋天靠桂花、糖炒栗子、烤红薯的气味"存档"，城市气质也被气味存下来——阿卡的海盐与香料、莫斯科的加冰伏特加、开罗的芒果与生姜，每个地方都有自己那股味。</p>
<p>我的判断：食物的乡愁最顽固，不是因为舌头挑，是因为那口味道里裹着一整套回不去的情境，你复刻不了情境，就复刻不了味道。</p>
<h2>现代性把乡愁放大了</h2>
<p>乡愁不是古人的专利，现代人反而更常被它抓。城市化把亿万人从村县拔起，丢进陌生的大城；春节的返乡潮，本质上是一次全国性的、周期性的乡愁集体发作——几亿人同一段时间往回走，走的理由高度一致：那个叫"家"的点，还在原处。</p>
<p>流动越频繁，乡愁的触发越密。你在一个城市生活多年，却总在某个清晨被一股似曾相识的气味钉住：也许是楼下飘来的某种早餐香，也许是雨后泥土味。它不预告，说来就来。研究里那个"冷天更容易乡愁"的观察，也顺着这条线——低温把人往屋里、往过去赶。</p>
<p>我的判断：我们这代人的乡愁，不是离土，是离"熟"。熟人社会碎成原子，味道成了少数还能一秒接通旧网络的线。</p>
<h2>带不走的物理原因</h2>
<p>为什么家乡的味道带不出来？撇开抒情，有一条很硬的解释：嗅觉记忆是情境依赖的。一种气味和一段经历绑定，靠的是当时同框的一切——空气、温度、身边的人、那个年纪的自己。你带走配方，带不走同框。</p>
<p>这不是玄学，是记忆的编码方式。脑科学里讲，自传体记忆在编码时就和情境一起存；提取时如果情境线索不全，记忆就发飘、发淡。所以同样一碗粉，在老家巷口吃是"那个味"，在三千公里外的厨房照着做，舌头说还行，鼻子和身体说不对——它们要的是全套线索，不是单一分子。</p>
<p>我的判断：乡愁带不走，不是故土有什么秘方，是记忆从一开始就把"地方"一起存了进去。</p>
<h2>乡愁不全是甜的</h2>
<p>把乡愁说得太暖，是另一种不老实。余光中晚年（1992年）才第一次踏回大陆，离写诗已二十二年，离离开已四十二年；鲁迅回故乡，看到的是破败和隔膜，结尾给的是"路"不是团圆。心理学那头也讲，乡愁常由负面触发——孤独、无意义感、受威胁时，人才去召它。</p>
<p>它是缓冲，不是治愈。它把你暂时暖一下，却不会把"回不去"抹掉。把乡愁浪漫化成"回不去才美"，是对离乡者真实处境的轻描。承认它苦，才配谈它甜。</p>
<p>我的判断：乡愁的正向，是苦里长出来的那点回甘，不是本来就很甜。</p>
<h2>跨文化：universal，但各自 local</h2>
<p>乡愁不独属于中国。巴勒斯坦诗人马哈茂德·达尔维什写过：阿卡的气味是海盐和香料，海法的气味是松木和皱毯子，莫斯科是加冰伏特加，开罗是芒果和生姜。每个城市被一股气味存下来，和河南人存秋天是同一套机制。</p>
<p>形式 universal，载体 local。离乡的人都要靠气味、食物、地名来锚定自己从哪里来；锚的东西，却天差地别——有人是海风，有人是灶台的烟，有人是某种花。这恰好说明乡愁是人类的底层本能，而"味道"只是它落到不同土地上的方言。</p>
<p>我的判断：乡愁是人类共通的病与药，味道是它的方言。</p>
<h2>普通人为什么该关心</h2>
<p>说了这么多通道，最后落回你。在这么一个高流动的时代，乡愁不是矫情，是神经和文化同时替你记着"你从哪来"。理解这一点，能少一点对自己的苛责：想家不是脆弱，是嗅球到海马体那根线还通着，是差序格局里那圈网还没断。</p>
<p>它也提醒一种诚实：谈乡愁，不需要编一个外婆的菜、奶奶的酱来撑情绪。真实的材料——一首诗、一块蛋糕、一股秋天味、一份返乡的拥挤——已经够重。虚构的温情，反而轻。</p>
<p>我的判断：关心乡愁，是关心自己身份的锚点；而诚实，是对待乡愁最体面的方式。</p>
<h2>边界：不把回不去当成美</h2>
<p>话说到这，得划一条线。乡愁值得认真对待，但不值得把它供成浪漫符号。回不去就是回不去，不该被说成"回不去才最好"；家乡的味道值得想念，不该被添油加醋成一个从没发生过的团圆饭。</p>
<p>写作上我也守住这条：这篇文章里所有具体的味道与故事，都来自可查的文献、诗歌与公开研究，没有替任何人编一段"我外婆""我奶奶"的往事。乡愁本来就够重，不需要假故事来加码。</p>
<p>我的判断：对乡愁最大的尊重，是别拿它撒谎。</p>
<h2>写在后面的话</h2>
<p>绕了一大圈，"乡愁是什么味道"还是没有唯一答案。它有时是余光中那枚邮票，有时是普鲁斯特那块玛德琳，有时是河南秋天那股桂花混着凉气的味，有时只是费孝通说的那撮"土"。</p>
<p>能确定的是：它走的不是舌头，是鼻子；不是理智，是那条绕过丘脑、直连海马体的老路。所以它总在你不设防的时候来，一秒把你按回某年某地的全套情境里。</p>
<p>我的判断：乡愁没有统一味道，它只有一个统一的入口——大脑里那条最短的、不经过思考的直达线。</p>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1KW411a7wm" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1KW411a7wm&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>纪念余光中先生——《乡愁》朗读（龙滨）</figcaption>
</figure>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1LT4y1m7ma" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1LT4y1m7ma&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>「普鲁斯特效应」是什么？为什么气味能触发久远的记忆（探蚊）</figcaption>
</figure>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1PA4m1V7oH" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1PA4m1V7oH&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>嗅觉记忆是什么？你有没有闻到过一瞬间的"童年记忆"（自说自话的总裁）</figcaption>
</figure>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1ib4y1173V" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1ib4y1173V&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>藕断丝连家乡味：「不一young的家乡味」（中国青年报）</figcaption>
</figure>
<h2>参考</h2>
<ul class="pg-refs"><li><a href="https://www.peopleapp.com/rmharticle/30018832759" target="_blank" rel="noopener">每日一诗｜《乡愁》（余光中，1972；全文与创作背景）</a><span class="src"> · 人民日报人民号</span></li><li><a href="https://www.taiwan.cn/plzhx/hxshp/201712/t20171215_11879365.htm" target="_blank" rel="noopener">「乡愁诗人」飘然远行——缅怀余光中先生（1972年写诗、1992年首次回大陆等事实）</a><span class="src"> · 中国台湾网</span></li><li><a href="https://vip.chinawriter.com.cn/member/hnih/viewarchives_323960.html" target="_blank" rel="noopener">乡愁的诗意印象及其他（余光中1972创作背景；瑞士医生哈德1678造词）</a><span class="src"> · 中国作家网</span></li><li><a href="https://cloud.kepuchina.cn/newSearch/imgText?id=7458909623049711616" target="_blank" rel="noopener">为什么我们一闻到某种味道就会想起童年？（嗅球→海马体/杏仁核直达专线）</a><span class="src"> · 科普中国</span></li><li><a href="https://www.kepuchina.cn/more/202103/t20210310_2972585.shtml" target="_blank" rel="noopener">研究揭示嗅觉记忆比其他感官记忆更强的原因（西北大学Zelano等，嗅觉通路与海马体直接连接）</a><span class="src"> · 科普中国</span></li><li><a href="https://digitalpaper.stdaily.com/http_www.kjrb.com/kjwzb/html/2017-12/22/content_384527.htm" target="_blank" rel="noopener">气味唤醒的记忆（嗅觉系统与边缘系统重合，普鲁斯特玛德琳）</a><span class="src"> · 科技日报</span></li><li><a href="https://m.thepaper.cn/baijiahao_10310011" target="_blank" rel="noopener">那股空气中「熟悉的气味」，正在唤醒你10岁以前的记忆（普鲁斯特效应、气味记忆更古老）</a><span class="src"> · 澎湃新闻</span></li><li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7513922/" target="_blank" rel="noopener">Nostalgia and Well-Being in Daily Life（Sedikides & Wildschut 框架：社会/自我/存在三功能，疫情日记研究）</a><span class="src"> · 论文 / PMC</span></li><li><a href="https://eprints.soton.ac.uk/473959/1/Juhl_Biskas_Accpeted_Version.pdf" target="_blank" rel="noopener">Nostalgia: An Impactful Social Emotion（Sedikides, Wildschut 等；nostalgia 偏正向、缓冲孤独）</a><span class="src"> · 论文 / 南安普顿大学</span></li><li><a href="https://www.peopleapp.com/rmharticle/30021856661" target="_blank" rel="noopener">「成年人从不留恋过去」，你想多了（怀旧正向预测生命意义感、驱散孤独；Sedikides等）</a><span class="src"> · 人民日报人民号</span></li><li><a href="https://www.cqrb.cn/content/2020-12/11/content_290706.htm" target="_blank" rel="noopener">在乡土间读懂中国——费孝通《乡土中国》读后（"从基层上看去，中国社会是乡土性的"、差序格局）</a><span class="src"> · 重庆日报</span></li><li><a href="https://www.toutiao.com/article/7701185006483390976" target="_blank" rel="noopener">河南人的秋天，是靠气味「存档」的（河南省文化和旅游厅，2026-10-27；城市气味与普鲁斯特时刻）</a><span class="src"> · 今日头条 / 政务号</span></li><li><a href="https://so.gushiwen.cn/search.aspx?value=九月九日忆山东兄弟" target="_blank" rel="noopener">王维《九月九日忆山东兄弟》"独在异乡为异客，每逢佳节倍思亲"</a><span class="src"> · 古诗文网</span></li><li><a href="https://so.gushiwen.cn/search.aspx?value=静夜思" target="_blank" rel="noopener">李白《静夜思》"举头望明月，低头思故乡"</a><span class="src"> · 古诗文网</span></li><li><a href="https://so.gushiwen.cn/search.aspx?value=回乡偶书" target="_blank" rel="noopener">贺知章《回乡偶书》"少小离家老大回，乡音无改鬓毛衰"</a><span class="src"> · 古诗文网</span></li><li><a href="https://so.gushiwen.cn/search.aspx?value=渡汉江" target="_blank" rel="noopener">宋之问《渡汉江》"近乡情更怯，不敢问来人"</a><span class="src"> · 古诗文网</span></li><li><a href="https://www.peopleapp.com/rmharticle/30043436401" target="_blank" rel="noopener">时间晶体，直到世界尽头的浪漫（诺特定理：时间平移对称→能量守恒的对照思路，亦见乡愁与记忆）</a><span class="src"> · 人民日报人民号</span></li></ul>`
  },
  {
    id: "post-248",
    title: "传送门与能量守恒：从 Portal 2、虫洞到诺特定理与时间机器",
    date: "2026-11-03",
    updated: "2026-11-03",
    cat: "技术",
    tags: ["物理"],
    cover: "",
    pinned: false,
    excerpt: "Portal 2 里「快的东西进去，快的东西出来」。如果现实有传送门，能不能造永动机、打破能量守恒？从动量、诺特定理、爱因斯坦场方程、莫里斯-索恩虫洞度规，到能量条件、时间机器、第二定律、黑洞信息与全息原理，把公式、数字和账本一条条摆开，给一个认真的答案。",
    content: `<p>《传送门2》里有个名场面：你从高处跌进蓝色传送门，下一秒从橙色门横着飞出去，落在对面够不着的台子上。那台冷嘲热讽的机器GLaDOS丢下一句原话："Momentum, a function of mass and velocity, is conserved between portals. Speedy thing goes in, speedy thing comes out."——动量是质量和速度的函数，在门与门之间守恒；快的东西进去，快的东西出来。</p>
<p>这句话勾出一个真问题：现实里要真有这种门，能不能拿来造永动机，让能量凭空多出来，把从小到大念的能量守恒定律撬开一道缝？这个问题看着像游戏宅的抬杠，其实一路能通到物理学最硬的几块地基：经典力学的功与能、诺特定理、广义相对论、虫洞度规、能量条件、时间机器与因果、热力学第二定律、量子信息与全息原理。</p>
<p>这篇文章不打算每样只点一句。每个地方都往下挖一层：公式怎么来的，数字量级多大，实验做到哪一步，哪一步是定理、哪一步只是猜想。读完不一定能造门，但应该能自己判断，市面上那些"免费能量"的说法到底错在哪。</p>
<p>我的判断先放这儿：传送门破不了能量守恒，在任何一个自洽的物理设定里都破不了。它能做的，是逼我们把"守恒"这两个字想得更透——透到能看见它的边界在哪。</p>
<h2>先认门：Portal 2 的传送门装置</h2>
<p>Portal 2 是 Valve 在 2011 年 4 月出的第一人称解谜游戏，前作是 2007 年随《橙盒》一起发的 Portal。故事发生在光圈科学（Aperture Science）的地下实验室，主角 Chell 手里那把"光圈科学手持传送门装置"，玩家一般叫传送门枪，能在白色平面上打出两扇颜色不同的门。</p>
<p>门有一套很死的规则。它只能贴在白色平面上——普通白漆墙、白色地砖，续作里还有月球岩石涂层；金属、玻璃、脏污表面打不上。门必须成对出现，一蓝一橙，双向通行：从蓝门进，从橙门出；从橙门进，从蓝门出。门不能贴在会动的表面上，贴上去会立刻熄灭。Portal Wiki 把这些规则列得很清楚，它们不是装饰，是整套玩法的前提。</p>
<p>核心机制就一句话：穿过门时，速度的<strong>大小</strong>不变，方向按出口门的朝向重排。你从高处落下，进门前是竖直向下的速度；出口门贴在墙上，法线朝前，于是那截向下的速度被掰成水平向前，你就能把自己"抛"过深坑。游戏里管这个叫 fling，中文玩家叫"抛射"或"甩门"。</p>
<p>这套机制让 Portal 2 成了少有的、把动量守恒做成核心玩法的游戏。它没有给你加一个"加速键"，也没有在出门时偷偷乘个系数；它只是把已经攒下的速度换了个朝向。玩家在关卡里反复练的，其实是一条中学物理定律的肌肉记忆。</p>
<p>我的判断：作为一款游戏，Portal 2 罕见地尊重了动量守恒。它让你用手而不是用公式，先摸了一遍守恒。</p>
<h2>"抛射"背后的经典力学</h2>
<p>把那一下"飞出去"拆开，全是中学课本里的东西。自由落体一段，重力做功，把重力势能换成动能。设落差 h、重力加速度 g、物体质量 m，初速为零，落到门前的速度由能量守恒给出：mgh = ½mv²，两边约掉 m，解出 v = √(2gh)。</p>
<p style="text-align:center;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:15px;line-height:1.9;margin:16px 0;letter-spacing:.01em;overflow-wrap:anywhere;word-break:break-word">m g h = ½ m v²　　⇒　　v = √(2 g h)</p>
<p>代几个数进去，速度的量级就出来了。g 取 9.8 m/s²，落差 10 米，v = √(2×9.8×10) ≈ 14 m/s，差不多 50 公里每小时；落差 100 米，v ≈ 44 m/s；落差 1 公里，v ≈ 140 m/s。游戏里那些几十米高的落差，出门速度大概就是几十米每秒，和一辆市区汽车差不多。</p>
<p>这个式子也能从牛顿第二定律推。自由落体加速度恒为 g，速度 v = gt，下落距离 h = ½gt²，消掉 t 就得到 v = √(2gh)。两条路殊途同归，一条用能量，一条用运动学。能量那条更省事，因为它不关心中间过程，只看起点和终点的落差。</p>
<p>进门之后，速度是个矢量。设进门速度是 (0, −v)，出口门的法线朝 +x，出门速度就变成 (v, 0)。动能 K = ½mv² 只看速度的大小，方向转了，大小没变，所以动能一分没变。这就是"抛射"不违反能量守恒的全部秘密：它做了一次旋转，没做一次加速。</p>
<p>现实里也有同样的东西：一根无摩擦的弯管把水流或小球的方向拐个弯，速率不变，动能不变。Portal 2 的传送门在数学上就是一根理想弯管，只不过弯得比较彻底，直接把两个不相邻的空间点接了起来。</p>
<p>当然，真实世界有空气阻力。一个人从高处坠落，速度不会无限涨，最终会停在终端速度上。终端速度由重力、空气密度、迎风面积和阻力系数共同决定，大致写成 v_t = √(2mg / (ρ A C_d))。一个成年人大字型下落，终端速度大约 50 到 60 m/s；头朝下收身，能到 80 到 90 m/s。游戏里没有空气阻力，所以无限下落会一直加速——这是它和现实的第一处偏差，后面还会细说。</p>
<p>我的判断：所以游戏里那些"从低处进门、高处出门再落回"的无限套圈花活，靠的不是物理，是程序规则和关卡设计的配合。真要把它当物理题做，得另算一笔总账——这笔账下一节就来算。</p>
<h2>动量的参照系疑难</h2>
<p>动量 p = mv 是个矢量，而且它依赖参照系。同一辆车，站在地上看是每小时六十公里，站在并行的另一辆车上看可能是零。伽利略变换把它写得很干脆：两个惯性系相对速度为 u 时，速度按 v′ = v − u 换，动量也跟着换。</p>
<p style="text-align:center;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:15px;line-height:1.9;margin:16px 0;letter-spacing:.01em;overflow-wrap:anywhere;word-break:break-word">p = m v　　　v′ = v − u</p>
<p>这就是传送门叙事里第一个真正的坑。假设出口门装在一辆匀速行驶的车上，你从固定的入口门钻进去，出门时相对门的速度仍是原来的 v，可站在地面的人看，你的速度是 v + u——凭空多出一截 u。这看起来像是白赚了动能，永动机的影子第一次冒头。</p>
<p>要拆这个局，得看门本身。门要维持匀速 u，就得有机构推着它走；你穿过门时速度从 v 变成 v + u，动量变了，这份动量差是门给的，反过来你就给门一个反作用力。门要顶住这个力继续匀速，推力就得做功，功等于力乘位移。算下来，你多拿到的那点动能，背后有一笔对应的功。</p>
<p>更干净的类比是"移动的镜子"。一束光打向一面朝自己运动的镜子，反射光的频率会变高，能量变大——这就是光的"蓝移"。多出来的能量不是凭空来的，是镜子损失了一点动能换来的。传送门如果装在移动平台上，它扮演的就是这面镜子：它能改变穿过物的能量，但每一分都从推动它的机构账上扣。</p>
<p>换句话说，传送门不是一台"无中生有"的机器，它是一台能和物体交换动量的机器。你从它那儿拿到的每一分动能，背后都有一双手在付账。游戏里门只能贴静止表面，这双手被藏起来了，所以看起来像白送。</p>
<p>还有更深的一层。Portal 2 里门只能贴静止的白色平面，游戏其实偷偷替你选好了一个全局惯性系——墙不动，地面不动，于是"速度"有个统一的衡量基准。可真实的宇宙是广义相对论的宇宙，弯曲时空里没有全局惯性系。你想说"跨门保持速度"，得先定义：在哪个点测量，沿哪条路径把速度矢量搬运过去。</p>
<p>在弯曲时空里，把矢量从一点搬到另一点叫平行移动，结果依赖路径。绕一个闭合回路搬一圈回来，矢量可能转了一个角度，这个角度叫和乐（holonomy），它正比于回路围住的曲率。换句话说，"同一个速度"在相距很远的两点之间没有唯一含义。虫洞把两个遥远区域"粘"在一起时，必须额外规定一个粘合方式，速度怎么对应，是这个规定的一部分，不是守恒定律自动给出的。</p>
<p>我的判断：Portal 2 的物理之所以看着干净，是因为它把最难的那部分——参照系——悄悄藏进了"静止的墙"里。真要做一扇门，第一道难关不是材料，是"速度相对谁"这个问题。</p>
<h2>能量守恒的来头：诺特定理</h2>
<p>要问传送门能不能打破能量守恒，先得弄清能量守恒本身是什么来头。它常被讲成宇宙铁律，其实它来自一个更底层的道理。1918 年，德国女数学家艾米·诺特在哥廷根发表了《不变变分问题》，证明了后来以她命名的定理：每一种连续的对称性，都对应一个守恒量。</p>
<p>这话的数学根子在最小作用量原理。一个物理系统走哪条路，由作用量 S = ∫L dt 取极值决定，δS = 0，L 是拉格朗日量，通常写成动能减势能。对 S 变分，能得到欧拉-拉格朗日方程，这就是经典力学的运动方程。诺特进一步发现：如果作用量在某个连续变换下不变，那这个变换就对应一个守恒流。</p>
<p style="text-align:center;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:15px;line-height:1.9;margin:16px 0;letter-spacing:.01em;overflow-wrap:anywhere;word-break:break-word">S = ∫ L dt　　　δS = 0　　⇒　　欧拉-拉格朗日方程</p>
<p>具体对应关系是这样的：时间平移不变，对应能量守恒；空间平移不变，对应动量守恒；空间旋转不变，对应角动量守恒；电磁学里的 U(1) 规范对称，对应电荷守恒。四条最基本的守恒律，全是同一条定理的不同侧面。</p>
<p>写成场论的形式，能量和动量被打包进一个叫能量-动量张量的东西，记作 T^μν。它的散度为零，就是守恒律的局部写法：∂μ T^μν = 0。这个式子说的是，能量和动量不会在一个点上凭空产生或消失，只能从一个地方流到另一个地方。</p>
<p style="text-align:center;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:15px;line-height:1.9;margin:16px 0;letter-spacing:.01em;overflow-wrap:anywhere;word-break:break-word">∂μ T^μν = 0</p>
<p>到了广义相对论，这句话要说得更小心。能量守恒要求时空存在一个"时间平移"的方向，数学上叫类时 Killing 矢量，记作 ξ。它满足 Killing 方程，直观意思是：沿着这个方向走，时空的度规不变。沿着它搬运，量 E = −p·ξ 保持不变，这才叫能量守恒。没有这个矢量，就没有这个守恒量。</p>
<p style="text-align:center;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:15px;line-height:1.9;margin:16px 0;letter-spacing:.01em;overflow-wrap:anywhere;word-break:break-word">E = −p μ ξ^μ　　（ξ 为类时 Killing 矢量）</p>
<p>诺特还有一条"第二定理"，讲的是规范对称。它说，当对称性是局部的（比如电磁场的规范变换随点变化），对应的不是一个新的守恒量，而是一组恒等式——比安基恒等式。广义相对论的比安基恒等式，正好保证了爱因斯坦场方程两边的散度自动为零，这不是巧合，是几何的必然。</p>
<p>我的判断：这句话是整个问题的钥匙。既然能量守恒是"对称性的影子"，那它就不是无条件的。对称一破，影子就散。后面会看到，虫洞和时间机器让问题变复杂的地方，恰恰在这里。</p>
<h2>诺特定理的逆定理与自发对称破缺</h2>
<p>诺特定理还有一个容易被忽略的方向：反过来成不成立？给定一个守恒量，能不能反推出一个对称性？这叫诺特定理的逆定理。答案是"在附加条件下成立"，而且有不少坑。</p>
<p>第一个坑是"平凡守恒"。任何系统都能写出一些恒等于常数的量，比如"1 等于 1"，这种守恒量不对应任何有用的对称性。第二个坑是"拓扑荷"。有些守恒量来自空间的拓扑结构，比如磁单极的磁荷，它对应的是场的边界行为，不是通常意义下的连续对称。第三个坑是"规范荷"。电荷守恒对应的是全局 U(1) 对称，但局部的 U(1) 规范对称并不产生新的守恒量，反而产生约束。</p>
<p>真正有意思的是自发对称破缺。一个系统的运动方程（作用量）可以具有某种对称性，但它的基态（真空）却不具有。最经典的例子是铁磁体：把一块铁加热到居里点以上，原子磁矩指向杂乱，系统在各个方向上完全对称；温度降下来，磁矩自发选一个方向排列，基态就把原来的旋转对称破掉了。</p>
<p>连续对称自发破缺，会逼出一个无质量的粒子，叫戈德斯通玻色子。这个结论叫戈德斯通定理，1961 年由戈德斯通提出，后来南部阳一郎、安德森等人把它用到凝聚态和粒子物理里。如果破缺的是规范对称，戈德斯通玻色子会被规范场"吃掉"，变成有质量的粒子——这就是希格斯机制，2012 年欧洲核子中心找到的希格斯玻色子，就是这套机制的产物。</p>
<p>那自发破缺会不会让能量不守恒？要分清楚破的是哪种对称。破的是内部对称（比如 U(1) 相位、同位旋），能量守恒不受影响，因为时间平移对称还在。破的是时间平移对称，能量才可能不守恒。但这里有个硬约束：连续时间平移对称在平衡态基态里不能被自发破缺，这是 Watanabe 和 Oshikawa 在 2015 年证明的定理。所谓"时间晶体"，破缺的是离散时间平移，而且需要外部驱动，它不违反能量守恒，只是在驱动下呈现出周期性的响应。</p>
<p>真正让能量不守恒的，是"显式"破坏时间平移对称。宇宙膨胀就是一个例子：度规随时间变，背景不静止，时间平移对称从一开始就不存在，所以全局能量没有良好定义。这不是自发破缺，是背景本身就不对称。</p>
<p>我的判断：对称破缺常被当成"打破物理定律"的万能借口，其实它破的是解里的对称，不是定律里的账本。想靠它白赚能量，门都没有。</p>
<h2>保守场与闭合回路</h2>
<p>再往下走一步，要借经典力学里一个老结论：保守场里没有免费午餐。</p>
<p>一个静止的引力场是保守场。保守场有三种等价说法：沿任意闭合回路走一圈，场力做的总功为零；场力可以写成某个标量势的负梯度，F = −∇Φ；在单连通区域里，场的旋度为零，∇×F = 0。三条说的是同一件事。</p>
<p style="text-align:center;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:15px;line-height:1.9;margin:16px 0;letter-spacing:.01em;overflow-wrap:anywhere;word-break:break-word">∮ F·dr = 0　　　F = −∇Φ　　　∇×F = 0</p>
<p>你举高一个重物再放回原处，重力先拦你、后帮你，一拦一帮正好抵消，净功是零。这就是"保守"两个字的日常含义：走了多远都无所谓，只看起点和终点。势能就是这个性质的产物——因为做功和路径无关，才能定义"在这一点有多少势能"。</p>
<p>数学上，这件事和斯托克斯定理是同一枚硬币。闭合回路上的线积分，等于回路围住的曲面上旋度的面积分。旋度为零，面积分就是零，线积分也就是零。引力场在静态情况下旋度为零，所以闭合回路净功为零。</p>
<p>现在把虫洞接进来。假设入口在低处、出口在高处，中间用一条近道连起来。只要整个时空是静止的、不随时间变，这条"低处—虫洞—高处—再落回低处"的闭合回路，重力做的总功依然是零。近道改变了你走的路，却没改变"势"这个标量场本身；绕一圈回到原点，势能当然回到原值。</p>
<p>要注意"静止"这个前提。如果引力场本身在变，比如有引力波穿过，或者有质量在运动，场就不是静态的，旋度不一定为零，闭合回路的净功可以不为零。这时候能量可以通过引力波被带走，也可以被引力波带进来。但这不是"白赚"，是能量在别处被付过。</p>
<p>电磁学里有个现成的反例：变化的磁场会感生电场，感生电场的旋度不为零，绕着线圈走一圈，电场做功不为零。这就是发电机和变压器的原理。它不违反能量守恒，因为那份能量来自维持磁场的电流。保守场的前提一旦拿掉，"零功"的结论也就跟着拿掉。</p>
<p>我的判断：虫洞没有改变"引力是保守力"这件事实，它只是把空间折了一下。折过的空间里，只要时空还是静态的，闭合回路的净功仍然是零。免费能量不存在。</p>
<h2>引力势、逃逸速度与史瓦西半径</h2>
<p>要把保守场说得更具体，得把引力势写出来。牛顿引力里，质量 M 在距离 r 处产生的引力势是 Φ = −GM/r，G 是引力常数，负号表示这是个吸引势，越靠近越深。物体要从这里逃到无穷远，需要的速度叫逃逸速度。</p>
<p style="text-align:center;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:15px;line-height:1.9;margin:16px 0;letter-spacing:.01em;overflow-wrap:anywhere;word-break:break-word">Φ = −GM/r　　　v_esc = √(2GM/r)</p>
<p>逃逸速度的推导只用能量守恒。在地面附近，动能 ½mv² 要刚好等于把物体从 r 搬到无穷远所需的势能差 GMm/r，两边约掉 m，得到 v_esc = √(2GM/r)。地球的逃逸速度是 11.2 km/s，太阳是 617.7 km/s，月球 2.38 km/s，木星 59.5 km/s。火箭要飞出地球，至少得达到第一宇宙速度 7.9 km/s 进入轨道，第二宇宙速度 11.2 km/s 才能脱离地球引力。</p>
<p>把逃逸速度设成光速 c，反解出 r = 2GM/c²，这就是史瓦西半径 r_s。太阳的史瓦西半径约 2.95 公里，地球约 8.87 毫米。半径缩到 r_s 以内，连光都逃不出去，那个边界就是事件视界。视界外一点五倍 r_s 处，还有一个光子球，光可以在那里绕圈；三倍 r_s 处是史瓦西黑洞的最近稳定圆轨道，叫 ISCO。</p>
<p style="text-align:center;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:15px;line-height:1.9;margin:16px 0;letter-spacing:.01em;overflow-wrap:anywhere;word-break:break-word">r_s = 2GM/c²</p>
<p>引力还会让时间变慢。一个静止在半径 r 处的钟，走得比无穷远处的钟慢，两者的关系是下面这个式子。r 越接近 r_s，根号越接近零，钟越走越停。在 r 远大于 r_s 的弱场里，这个式子可以近似成 Δt ≈ Δt₀(1 + gh/c²)，h 是高度差，g 是当地重力加速度。</p>
<p style="text-align:center;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:15px;line-height:1.9;margin:16px 0;letter-spacing:.01em;overflow-wrap:anywhere;word-break:break-word">dτ = √(1 − r_s/r) dt</p>
<p>这个效应不是玄想。1959 年，庞德和雷布卡在哈佛大学的杰斐逊实验室做了个实验：让伽马射线在 22.5 米的高度差里上下走，测量它的频率变化。理论预言相对频移约 2.5×10⁻¹⁵，他们测到了，误差在可以接受的范围内。1976 年的引力探测器 A 把氢微波激射器送到一万公里高空，把引力红移测得更准。</p>
<p>日常生活里也有。GPS 卫星在约两万公里高空，引力比地面弱，钟走得快，广义相对论效应让它每天快约 45.9 微秒；卫星又在运动，狭义相对论效应让它每天慢约 7.2 微秒；两者相抵，净效应是每天快约 38.6 微秒。不校正这个差，定位误差一天能累积到十公里量级。1971 年的哈费勒-基廷实验，把原子钟放在飞机上绕地球飞，也测到了类似的综合效应。</p>
<p>我的判断：这几个式子是后面虫洞度规的零件。史瓦西解是最简单的黑洞解，也是最容易把人带进"虫洞就是黑洞"误区的解——两者差得远，下面会分。</p>
<h2>爱因斯坦场方程</h2>
<p>虫洞不是"挖"出来的，是爱因斯坦场方程的一个解。所以绕不开这条方程。1915 年，爱因斯坦在广义相对论的最后冲刺里写出了它：</p>
<p style="text-align:center;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:15px;line-height:1.9;margin:16px 0;letter-spacing:.01em;overflow-wrap:anywhere;word-break:break-word">Gμν + Λgμν = (8πG/c⁴) Tμν</p>
<p>左边 Gμν 是爱因斯坦张量，由度规 gμν 的二阶导数拼成，描述时空怎么弯；右边 Tμν 是能量-动量张量，描述物质和能量怎么分布；Λ 是宇宙学常数，爱因斯坦当年加它是为了让宇宙静止，后来哈勃发现宇宙在膨胀，他又把它称为"最大的错误"，再后来暗能量发现，它又被请了回来。</p>
<p>这条方程是十个耦合的非线性偏微分方程。非线性意味着解不能简单叠加：两个解加起来，一般不再是解。这给求解带来巨大困难，也让很多"直觉"失效。惠勒有一句话把这条方程讲绝了：物质告诉时空怎么弯，时空告诉物质怎么走。</p>
<p>在弱场、低速的牛顿极限下，这条方程退化成泊松方程 ∇²Φ = 4πGρ，也就是牛顿引力。这说明广义相对论不是把牛顿力学推翻了，而是把它包进去了：在引力弱、速度低的地方，两者给出几乎一样的结果，差别小到日常测量不出来。</p>
<p>历史上几个重要的精确解：史瓦西在 1916 年给出了球对称静态解，描述不旋转的黑洞；克尔在 1963 年给出了旋转解，描述旋转黑洞；弗里德曼在 1920 年代给出了膨胀宇宙的解，后来勒梅特、罗伯逊、沃尔克把它写成现在通用的 FLRW 度规。虫洞度规也是这条方程的一个解，只不过它要求的物质分布很特殊。</p>
<p>这里要分清"解"和"存在"。场方程允许很多解，就像方程 x² = 4 允许 x = ±2，但你不能因此说世界上一定有两个 2。一个解要变成现实，得满足能量条件、稳定性、初始条件，还得有物质去实现它。虫洞的麻烦，主要卡在后面这几关。</p>
<p>我的判断：场方程允许很多解，允许不等于存在。这是读一切"数学上可行"的说法时，必须自己补上的一句。</p>
<h2>虫洞的数学：莫里斯-索恩度规</h2>
<p>1988 年，加州理工的基普·索恩和学生迈克尔·莫里斯，应科幻作家卡尔·萨根之请，认真算了一种能让人穿过去的虫洞。萨根当时在写小说《接触》，需要一个既符合物理、又能让主角快速穿越星际的设定，他不想用"超光速飞船"这种糊弄，就去找索恩。索恩的团队算出来的结果，发在《美国物理学杂志》上，成了后来所有可穿越虫洞研究的模板。</p>
<p>他们给出的度规长这样：</p>
<p style="text-align:center;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:15px;line-height:1.9;margin:16px 0;letter-spacing:.01em;overflow-wrap:anywhere;word-break:break-word">ds² = −e^{2Φ(r)} c² dt² + dr² / (1 − b(r)/r) + r² (dθ² + sin²θ dφ²)</p>
<p>别被这串符号吓住，拆开看每一项都有话说。ds² 是时空里两点之间的"间隔"，广义相对论用它代替了距离；它可以是负的、零的、正的，分别对应类时、类光、类空。第一项里 Φ(r) 叫红移函数，管的是引力有多强、时间走得快还是慢；如果 Φ 到处有限，虫洞就没有视界，东西能穿过去。第二项里 b(r) 叫形状函数，管的是空间被弯成什么形状，分母 1 − b(r)/r 在 b(r) = r 的地方发散，那个地方就是虫洞的喉部，记作 r₀。第三项是球面的角向部分，和普通球坐标一样。</p>
<p>要撑住一个能过人的喉部，还得满足一个条件：在喉部附近，空间要"向外张开"，数学上写成下面这个不等式，叫 flare-out 条件。这句话的物理含义是，喉部附近的物质得有一种反常的径向张力。</p>
<p style="text-align:center;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:15px;line-height:1.9;margin:16px 0;letter-spacing:.01em;overflow-wrap:anywhere;word-break:break-word">b(r₀) = r₀　　　b′(r₀) < 1</p>
<p>莫里斯和索恩算完发现，满足这个条件的物质，其径向张力必须大于它的能量密度。普通物质做不到这一点，只有"奇异物质"——能量密度为负的东西——才行。这不是算错了，是几何逼出来的：要让空间在喉部向外张开，得像撑帐篷一样往外顶，普通物质只会往里塌。</p>
<p>可穿越虫洞还有几条工程上的要求。第一，不能有视界，否则进去就出不来，这要求红移函数 Φ 在喉部附近有限。第二，潮汐力不能太大，否则人还没过去就被拉成面条；潮汐力大致和 1/r₀² 成正比，喉部越大越温和。第三，穿越时间要有限，不能让人卡在喉咙里。三条加在一起，才叫"可穿越"。</p>
<p>把虫洞画成嵌入图，会更直观：想象一张纸，中间鼓出一个漏斗，漏斗的细颈就是喉部，颈的两头各连着一个平展的平面。两个平面代表两个遥远的时空区域，细颈就是那条近道。嵌入图只能画空间的两个维度，真实的虫洞是四维时空里的结构，但那个"细颈"的直觉是对的。</p>
<p>我的判断：虫洞不是"钻出来的洞"，是时空度规的一种解。这个区别很重要：解可以写出来，洞不一定存在。</p>
<h2>能量条件：为什么虫洞要"负能量"</h2>
<p>物理学家用"能量条件"来筛哪些物质分布是合理的。常见的有四条，一条比一条严。</p>
<p>零能量条件（NEC）：对任意光线方向 k，能量-动量张量的缩并非负，Tμν k^μ k^ν ≥ 0。它说的是，任何光线看到的能量密度都不能是负的。弱能量条件（WEC）：对任意观察者 u，Tμν u^μ u^ν ≥ 0，说白了就是"能量密度不能是负的"。强能量条件（SEC）：(Tμν − ½Tgμν)u^μu^ν ≥ 0，它保证引力是吸引的、会让物质会聚。主导能量条件（DEC）：能量密度非负，而且能量流动的速度不能超过光速。</p>
<p style="text-align:center;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:15px;line-height:1.9;margin:16px 0;letter-spacing:.01em;overflow-wrap:anywhere;word-break:break-word">Tμν u^μ u^ν ≥ 0　（弱能量条件）　　　Tμν k^μ k^ν ≥ 0　（零能量条件）</p>
<p>普通物质、辐射，都满足这些条件。虫洞偏偏不满足。上一节那个"径向张力大于能量密度"，翻译成能量条件的语言，就是喉部附近零能量条件被违反：径向张力 τ 超过能量密度 ρc²，等价于张量缩并出现负值。</p>
<p style="text-align:center;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:15px;line-height:1.9;margin:16px 0;letter-spacing:.01em;overflow-wrap:anywhere;word-break:break-word">τ > ρ c²　　（喉部径向张力超过能量密度，违反零能量条件）</p>
<p>为什么会这样？可以借雷查杜里方程看。这个方程描述一束相邻的测地线（比如一束光线或一束自由下落的粒子）怎么随 proper time 会聚或发散。在强能量条件成立时，方程右边的项让这束线必然会聚——这就是引力吸引的几何表达。虫洞的喉部要求光线在穿过时先会聚、后发散，中间必须有一个"散焦"的阶段，而散焦需要方程右边出现负的贡献，也就是零能量条件被违反。</p>
<p>违反零能量条件的物质，就是"奇异物质"。它不是"很奇特的普通物质"，而是能量密度为负的东西。量子场论里确实有负能量的影子：卡西米尔效应里两块导体板之间的真空能是负的；压缩真空态里某些区域的能量密度也可以是负的。但量子不等式（Ford 和 Roman 在 1990 年代系统地研究过）给它上了紧箍：负能量不能太大、不能持续太久，否则会跟量子力学的基本假设打架。</p>
<p>这里有个漂亮的类比，叫"量子利息"（quantum interest）。你想从真空里借一笔负能量来撑虫洞，可以，但你得在别处还一笔正能量，而且还得付"利息"——负能量的持续时间越长、量越大，还的利息越重。这不是道德说教，是量子不等式的数学结论。</p>
<p>我的判断：可穿越虫洞在方程里是允许的，代价是天文数字般的奇异物质。虫洞不是"能不能造"的工程题，是先"有没有料"的物料题。</p>
<h2>虫洞的稳定性与量子不等式</h2>
<p>就算你凑够了奇异物质，把虫洞撑开了，还有第二道关：它稳不稳？</p>
<p>虫洞的喉部是靠负能量顶着的。任何扰动——穿过的粒子、周围的引力波、真空涨落——都可能让喉部往里缩。如果负能量不能及时补上，喉部就会塌，虫洞瞬间闭合。这不是"慢慢漏气"，是"啪"一下夹断，速度快到连光都来不及穿过去。富勒和惠勒在 1960 年代就证明过，史瓦西虫洞会在你试图穿过之前就掐断。</p>
<p>量子不等式在这里扮演的是"预算约束"的角色。Ford 和 Roman 证明，负能量密度在时间上的积分有下界，不能任意负、任意久。你要维持一个宏观尺寸的喉部，需要的负能量总量极大，而量子场论允许的负能量又极小，两者之间差着几十个数量级。这不是"技术不够"，是"预算不够"。</p>
<p>还有一个绕法叫"罗马环"（Roman ring）。1993 年，罗马（Thomas Roman）提出，与其用一个虫洞造时间机器，不如用一圈虫洞：每个虫洞局部的能量条件都满足，但整圈合起来能产生闭合类时曲线。这个构造说明，"局部守规矩"不等于"全局守规矩"，因果的破坏可以从整体结构里长出来。</p>
<p>但罗马环也有代价。它需要极其精细的调校，任何一点偏差都会让整圈失稳；而且霍金的时序保护猜想如果成立，量子涨落会在闭合类时曲线形成之前把整圈烧穿。所以它是一个"数学上能写、物理上极难"的构造，不是一张施工图。</p>
<p>还有"拓扑审查"（topological censorship）的说法：在满足能量条件的时空里，你没法通过一个拓扑非平凡的通道从一处走到另一处。虫洞要存在，就得在某个地方违反能量条件；这是它绕不过去的门槛。</p>
<p>我的判断：一个虫洞解存在，不等于它稳定；稳定，不等于它能被造出来。这三件事经常被混为一谈。</p>
<h2>核心问题：传送门能打破能量守恒吗</h2>
<p>现在正面回答开头那个问题。结论：不能。无论是游戏里的门，还是物理里的虫洞，在任何一个自洽的设定里，都没法让能量凭空变多，也没法造出永动机。下面分三层讲。</p>
<p>第一层是游戏门。Portal 2 保留速度大小、只改方向，动能守恒，根本没有创造能量。那些无限套圈拿免费速度的花活，靠的是关卡规则的漏洞，不是物理定律的让步。</p>
<p>第二层是静态虫洞。把虫洞当近道，只要时空是静止的，闭合回路的引力净功为零，能量账平。虫洞没有改变"引力是保守力"这件事，它只是把空间折了一下。</p>
<p>第三层是时间机器。这是唯一接近"套利"的情形：让一个洞口相对另一个运动，造出时间差，形成闭合类时曲线。但制造时间差要付相对论级别的代价——把洞口加速到近光速，消耗的动能是实打实的；撑开喉部的奇异物质，负能量也是账面的一部分。你从时间差里"赚"到的，不会超过你为制造它付出的。</p>
<p>还有一个更根本的角度：在广义相对论里，能量守恒只在局部是硬的。局部的 ∇μT^μν = 0 永远成立，但"全局总能量"只在时空渐近平直、或者有类时 Killing 矢量时才有良好定义。虫洞如果是渐近平直的，可以定义 ADM 质量；如果不是，连"总能量"这个词都得小心用。所以"传送门打破能量守恒"这个说法，本身就建立在一个不牢靠的前提上：它假设宇宙有一个全局的能量账本，而广义相对论并不保证这一点。</p>
<p>我的判断：三层堵的是同一个口子——局部看着像白赚，全局一算账，一分没多。传送门没有打破守恒，它只是把"守恒在什么条件下成立"这个问题摆到了桌面上。</p>
<h2>那个著名"永动机"错在哪</h2>
<p>直觉上的诱惑是这样的：让水从低处 A 流到更低处 B，攒下速度；B 处放一扇入口门，把水送到高处的 C 点出口；水从 C 再往低处流，又攒速度，又进门……每循环一次就白赚一段高度差。</p>
<p>这个想法有三道闸。第一道在几何：出口速度的方向由出口门的法线决定，你没法摆出一个"出门就比进门高、还能无限循环"的构型，又不违反保守场的零功结论。一合账，高度差对应的势能，早就在别处被付过了——水在虫洞里"上升"那一段，要么由虫洞两侧的引力势差买单，要么由撑开虫洞的奇异物质买单。</p>
<p>第二道在动量。水从低处进门、从高处出门，速度方向变了，动量也变了。这份动量差是门给的，门就受到一个反作用力。要让门固定不动，支架得顶住这个力；要让门移动，机构得做功。无论哪种，账都记在门这一侧，不会凭空消失。</p>
<p>第三道在物料。真要造一个能用的虫洞，得先有奇异物质撑着，而奇异物质本身就是负能量。它一进场，账本上就先记了一笔负数，根本进不了"免费"那一栏。你要维持虫洞，就得持续供给负能量；负能量一旦断了，喉部就塌，循环也就停了。</p>
<p>把这三道闸合起来看，所谓"传送门永动机"，是把局部看到的速度变化，误当成了全局的能量增量。局部看门很神，全局算总账，能量一分没多。这个错误和历史上那些"磁动机""水变油"的骗局是同一个模子：只算收益，不算成本；只看局部，不看整圈。</p>
<p>我的判断：判断这类装置真假，不用懂多深的物理，只需问三句——闭合回路的净功是不是零？动量反作用力谁在扛？维持特殊结构的能量从哪来？三句里有一句答不上，就是骗局。</p>
<h2>可穿越虫洞要多少奇异物质</h2>
<p>把物料这笔账算具体一点。光明网那篇科普引过索恩等人的估算：撑开一个半径一厘米的虫洞，需要的奇异物质质量相当于一个地球；撑开半径一光年的虫洞，需要的量超过银河系发光物质总质量的一百倍。</p>
<p>这两个数字听着抽象，换个说法：一个地球的质量是 6×10²⁴ 公斤，把它全部换成负能量，才够撑开一个乒乓球大小的洞；一光年的洞，需要把银河系里所有会发光的物质乘上一百倍，全部变成负能量。这还只是"撑开"，没算"维持"。</p>
<p>我们在自然界见到的负能量，只有卡西米尔效应那种极微弱的形态。两块靠得很近的导体板之间，真空涨落模式被挤掉一部分，板间能量密度变成负的。间距一微米时，这个负能量密度大约是 10⁻⁴ 焦耳每立方米，对应的压力约 10⁻³ 帕斯卡，只有大气压的十亿分之几。</p>
<p>从 10⁻⁴ 焦耳每立方米，到撑开一厘米虫洞所需的量级，中间差着几十个数量级。这不是"再努力一点"能填的坑，是"换一套物理"才可能填的坑。有人寄希望于量子引力的新效应能提供大得多的负能量，但那还停留在猜想阶段，没有任何实验支持。</p>
<p>还有一个常被忽略的问题：负能量本身也会引力排斥。你拿一堆负能量去撑虫洞，它自己会往外推，把周围的东西推开；你要把它约束在喉部，又需要别的机制。这就像用氢气球的浮力吊起一个铁块，浮力有了，可气球本身也会飘走。</p>
<p>我的判断：从卡西米尔的负能量到撑开一厘米虫洞所需的负能量，中间差着几十个数量级。这个差距不是工程问题，是物理问题。</p>
<h2>虫洞时间机器</h2>
<p>不过物理学里确实有一条缝，让虫洞显得能"凭空"搬东西——把它变成时间机器。</p>
<p>1988 年，莫里斯、索恩和乌尔维·尤特塞弗在同一波研究里指出：如果一个先进文明能造并维持一个可穿越虫洞，只要让其中一个洞口以接近光速运动一阵再回来，或者把它放进更强的引力场里，两个洞口之间就会出现时间差。</p>
<p>原因在狭义相对论的时间膨胀。运动的钟走得慢，慢多少由洛伦兹因子决定：γ = 1/√(1 − v²/c²)。速度 v 越接近光速 c，γ 越大。让一个洞口以 0.9c 运动一段时间，它自己的钟会比留在家里的那个洞口慢；等它回来，两个洞口虽然还连着同一条虫洞，但"现在"已经对不齐了。</p>
<p style="text-align:center;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:15px;line-height:1.9;margin:16px 0;letter-spacing:.01em;overflow-wrap:anywhere;word-break:break-word">Δt = γ Δτ　　　γ = 1 / √(1 − v²/c²)</p>
<p>举个具体例子。假设两个洞口本来相距 1 光年，其中一个以 0.8c 飞出去再飞回来，往返外部时间约 2.5 年。由于时间膨胀，飞出去的那个洞口自己的钟只走了约 1.5 年。等它回到起点，两个洞口之间的时间差约 1 年。这时候沿着虫洞走，你就能从"现在"跳到"一年前"或者"一年后"。</p>
<p>两个洞口的外部距离没变，虫洞自身的长度也没变，可两个口经历的"时间"不一样了。这时沿着虫洞走，就可能回到过去或跳到未来，形成闭合类时曲线，英文缩写 CTC。一旦有了时间差，你确实能在"时间偏移"里做文章：在一口投入质量，它从另一口在更早或更晚的时刻出来。</p>
<p>但时间机器一形成，就会撞上"柯西视界"的问题。柯西视界是因果结构的一道边界，越过它，初始条件不再能决定未来。经典广义相对论在柯西视界上会失效，量子效应会变得重要。霍金正是从这里入手，提出时序保护猜想。</p>
<p>我的判断：这是传送门叙事里唯一接近"打破守恒"的情形。但注意，它靠的不是门本身，而是你先让一个洞口相对另一个动了真格——这一步要付相对论级别的代价。</p>
<h2>因果、祖父悖论与时序保护</h2>
<p>时间机器一出现，因果就危险了。最著名的诘难是祖父悖论：你回到过去，阻止你祖父遇见你祖母，那你怎么会出生？如果你没出生，又是谁回去阻止的？</p>
<p>物理学家给了几种逃法。一种是诺维科夫自洽原则：宇宙只允许自洽的历史。你能回到过去，但你做的每件事恰好就是历史本来的样子——你想阻止祖父，结果你的阻止本身促成了他们的相遇。悖论被"自洽"掉了，代价是自由意志受到限制。</p>
<p>另一种是多重宇宙或平行分支：你回到的是另一个分支，改的是别人的祖父，你自己的那条历史没变。这个说法在量子力学的多世界诠释里很自然，但它把"时间旅行"变成了"分支跳转"，严格说不是同一件事。</p>
<p>还有一种更技术性的处理，叫德意志的 CTC 模型。1991 年，德意志（David Deutsch）把闭合类时曲线和量子力学结合起来，提出一个自洽的量子演化方程：在 CTC 上，系统的状态必须是不动点，也就是"输入等于输出"。这个模型允许某些悖论被量子干涉抹平，但它也带来了非线性演化、信息复制等怪问题。</p>
<p>霍金 1992 年干脆提出时序保护猜想：自然定律不允许时间机器真的造出来。他的理由很物理——真空里的量子涨落会沿着闭合类时曲线一遍遍绕回来，和自己叠加，越叠越强，在时间机器形成的最后关头把能量密度顶到无穷大，机器自己把自己烧穿。这个论证的数学核心，是柯西视界上的真空极化发散。</p>
<p>这个论证不是铁板一块。1991 年金（Sung-Won Kim）和索恩算过一些具体模型，发现真空极化不一定总在柯西视界上发散，某些构型下它可能是有限的，时间机器也许能撑住。后来的数值研究也给出过类似的结果：发不发散，取决于时空的具体结构。于是这条缝既没被证明能开，也没被证明一定焊死。</p>
<p>我的判断：时序保护猜想是目前最有力的直觉，但不是定理。科学在这块是开放的，开放不等于什么都能信。</p>
<h2>能量守恒自己也有边界</h2>
<p>顺着诺特定理再往前推一步，会撞上一个反直觉的事实：能量守恒本身，并不是在所有时空里都成立。</p>
<p>诺特说能量守恒来自时间平移对称——物理定律不随时刻变。可在我们真实的宇宙里，时空在膨胀、在弯曲，整体没有一个"处处一样"的时间平移对称。膨胀的宇宙用弗里德曼-勒梅特-罗伯逊-沃尔克度规描述，这个度规里根本没有类时 Killing 矢量。没有那个矢量，就没有那个守恒量。</p>
<p>后果是实打实的：宇宙学红移。一个光子在膨胀的宇宙里走，波长被拉长，能量变小。红移和尺度因子的关系是 1 + z = a(观测)/a(发射)，能量 E 正比于 1/a。这些能量去哪了？没有去哪，它就是没了——全局意义上，光子的能量不守恒。托尔曼早在 1930 年代就指出过这一点。</p>
<p>不过局部的能量-动量守恒依然成立。在任何一个足够小的时空区域里，∇μT^μν = 0 是硬约束，能量不会在一点上凭空消失。全局不守恒，是因为"全局总能量"这个概念在膨胀宇宙里没有良好定义，不是因为局部出了漏洞。</p>
<p style="text-align:center;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:15px;line-height:1.9;margin:16px 0;letter-spacing:.01em;overflow-wrap:anywhere;word-break:break-word">∇μ T^μν = 0　　（局部成立，全局未必）</p>
<p>要定义全局能量，得有的额外结构。渐近平直的时空，可以定义 ADM 质量；稳态时空，可以定义 Komar 质量；膨胀宇宙，两者都不适用。物理学家还发明了"能量赝张量"，比如朗道-利夫希茨赝张量，把引力场的能量也算进去，但它不是张量，依赖坐标系，只在特定近似下有用。</p>
<p>Portal 2 那种门，假设它处在平坦的闵可夫斯基时空里，能量在局部严格守恒。真虫洞处在广义相对论里，局部的散度为零依然成立，洞口的奇异物质就计入那个张量里。</p>
<p>我的判断：真正该被打破的迷信，不是能量守恒，而是"能量守恒是放之宇宙皆准的天条"。它是特定对称下的结论，传送门只是把这条边界摆到了眼前。</p>
<h2>热力学第二定律：就算能量守得住，熵呢</h2>
<p>到这儿有人会换个方向问：就算能量守得住，传送门能不能拿来干点别的？比如当麦克斯韦妖，把快分子和慢分子分开，一边热一边冷，造出温差来发电？</p>
<p>麦克斯韦 1867 年提过这个思想实验：一个极小的妖守在小孔边，看见快分子就开孔放过去，看见慢分子就关上，久而久之两边温差拉开，似乎能白做功。西拉德 1929 年把它简化成一个单分子引擎：一个分子在盒子里，妖插入隔板，根据分子在哪一侧决定要不要接上重物，理论上每次循环能榨出一点功。</p>
<p>这个妖被信息论收拾了。兰道尔 1961 年证明：擦除一比特信息，至少要耗散 k_B T ln2 的能量，k_B 是玻尔兹曼常数，T 是温度。妖要判断"这个分子是快是慢"，就得记一比特信息；记满了要擦，擦就得付这份能量。付完一算，妖赚的功正好被擦除的代价抵掉，第二定律毫发无损。</p>
<p style="text-align:center;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:15px;line-height:1.9;margin:16px 0;letter-spacing:.01em;overflow-wrap:anywhere;word-break:break-word">E ≥ k_B T ln 2　　（兰道尔极限）</p>
<p>室温下，k_B T ln2 大约是 2.8×10⁻²¹ 焦耳，小得可怜，但它是硬下限。2012 年，有实验组用胶体粒子做"西拉德引擎"，2018 年又有团队用单电子晶体管测兰道尔极限，结果都和理论对得上。妖不是不存在的，是妖的记忆要花钱。</p>
<p>传送门能不能绕过这道账？不能。门不替你做"分辨快慢"这件事，它只是把东西从一个口搬到另一个口，不产生信息，也不减少熵。你要拿它当妖，分辨那一步的账还是得自己付。而且门本身还有熵：撑开喉部的奇异物质、维持门的装置，都有热力学代价。</p>
<p>还有一个更硬的版本，叫广义第二定律。贝肯斯坦和霍金把黑洞的熵也算进总账：黑洞熵正比于视界面积，S = k_B c³ A / (4Gℏ)。加上这一项，宇宙的总熵仍然只增不减。传送门如果真能搬运物质，它也得遵守这条加总后的定律，不能靠"把熵倒进黑洞"来作弊。</p>
<p>我的判断：就算门不破坏能量守恒，它也破坏不了第二定律。能量和熵是两道独立的闸，门一扇都撬不开。</p>
<h2>信息、幺正性与不可克隆</h2>
<p>再往深里走一层，还有一道闸，叫信息。</p>
<p>量子力学的演化是幺正的，幺正演化不丢信息——给定现在，原则上能倒推过去。这条性质和能量守恒一样，是量子力学的骨架。它意味着，一个封闭系统的演化是可逆的，不会把两个不同的初态演化成同一个末态。</p>
<p>传送门如果"复制"一个物体，就撞上不可克隆定理：1982 年，沃特斯和祖雷克、迪克斯分别证明，任意未知量子态不能被精确复制。如果传送门"销毁"原来的物体再从另一头重建，就撞上信息守恒：销毁意味着信息丢失，而幺正演化不允许信息凭空消失。</p>
<p>当然，经典物体不是单个量子态，它由海量粒子组成，复制一个宏观物体在原理上不违反不可克隆定理——因为你可以测量它的经典状态，再按蓝图重建。但"测量"本身会扰动量子态，重建出来的东西和原来的在量子层面不可能完全一致。传送门要"完美"传送一个人，得处理掉这个不一致，而物理没有给它这个权限。</p>
<p>黑洞把这个问题推到了极致。霍金 1974 年算出发射霍金辐射，温度由一个只依赖黑洞质量的式子给出：质量越小，温度越高。一个太阳质量的黑洞，温度只有约 6×10⁻⁸ 开尔文，比宇宙微波背景还冷，所以它在吸收而不是在蒸发；一个千吨级的小黑洞，温度高到能瞬间蒸发光。</p>
<p style="text-align:center;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:15px;line-height:1.9;margin:16px 0;letter-spacing:.01em;overflow-wrap:anywhere;word-break:break-word">T_H = ℏc³ / (8πGM k_B)</p>
<p>霍金辐射看起来是纯热的，不带出落入黑洞的信息，于是"黑洞蒸发后信息去哪了"成了信息悖论。后来佩奇提出佩奇曲线，认为信息会先增后减地还回来；2012 年 AMPS 又提出"火墙"诘难，说要是信息真能还回来，视界处就得有一堵高能火墙，那又和广义相对论的等效原理打架。这场争论到今天还没收尾。</p>
<p>我的判断：传送门的合法性不只在能量，还在信息。一扇真门，得同时过能量守恒、第二定律、幺正性这三关。</p>
<h2>黑洞信息悖论：火墙、岛屿公式与复制虫洞</h2>
<p>上一节提到黑洞信息悖论，这里值得单独讲，因为它是"传送门能不能存在"最深的那个背景。</p>
<p>悖论的核心是一个二选一。霍金 1974 年的计算说，黑洞蒸发出的辐射是纯热的，只由黑洞的质量、电荷、角动量决定，和掉进去的东西是什么无关。如果黑洞最终蒸发干净，那些信息就没了。可量子力学的幺正性说，信息不能没。两者只能活一个。</p>
<p>1993 年，佩奇（Don Page）提出一条曲线：如果信息确实会还回来，黑洞的纠缠熵应该先随蒸发时间上升，到一半左右（佩奇时间）达到峰值，然后下降，最终归零。这条"佩奇曲线"成了检验任何量子引力理论的试金石。霍金的原始计算给不出下降段，它一路升到顶，这就是悖论的数学表现。</p>
<p>2012 年，AMPS（Almheiri、Marolf、Polchinski、Sully）提出"火墙"诘难：如果信息真的在佩奇时间之后还回来，那么落在视界处的纠缠结构会遭到破坏，视界处必须有一堵高能火墙，任何掉进去的东西都会被烧掉。可广义相对论的等效原理说，视界处应该是平滑的，不该有火墙。三条命题——幺正性、等效原理、霍金辐射的纯热性——最多只能成立两条。</p>
<p>2019 年，局面有了转机。佩宁顿（Geoff Penington）和阿尔姆海里（Ahmed Almheiri）等人用"岛屿公式"重新计算了纠缠熵：在蒸发后期的黑洞外部，纠缠熵要包括黑洞内部的一块"岛"的贡献。把岛算进去，熵曲线在佩奇时间之后真的掉下来了，和佩奇曲线对上了。</p>
<p>岛屿公式的几何解释，叫"复制虫洞"（replica wormhole）。在引力路径积分里，计算熵要对时空的复制品做求和，而连接不同复制品的虫洞贡献，正好给出了岛屿那一项。换句话说，黑洞内部和外部辐射之间，存在着虫洞式的连接。这又绕回了 ER=EPR：纠缠和虫洞，可能是同一件事的两种写法。</p>
<p>这个结果还没有让所有人满意。岛屿公式用到了引力路径积分的鞍点近似，它的适用范围、紫外完备性，都还在争论。但至少，佩奇曲线第一次在引力计算里被完整复现出来，这是几十年来最实的一次进展。</p>
<p>我的判断：黑洞信息悖论还没被彻底解决，但佩奇曲线是一个强线索——它说明信息没有丢，只是藏在了虫洞式的几何里。传送门要真存在，它大概也得遵守同一套账。</p>
<h2>ER=EPR 与全息原理</h2>
<p>虫洞的故事在近年又接上了量子信息，而且接得很深。</p>
<p>2013 年，马尔达西纳和苏斯金德提出一个猜想，叫 ER=EPR：爱因斯坦-罗森桥（ER）和量子纠缠（EPR 对）本质上是同一件事的两面。两个黑洞纠缠得越深，它们之间的虫洞就越粗。这个猜想没有严格证明，但它把两个看起来毫不相干的概念——时空的几何连接、量子态的纠缠——放进了同一个框架。</p>
<p>这个猜想背后是全息原理和 AdS/CFT 对偶。1997 年马尔达西纳提出 AdS/CFT：一个反德西特空间里的引力理论，等价于它边界上的一个共形场论。引力在"体内"，量子场论在"边界"，两边是同一套物理的两种写法。体内多一个维度，边界少一个维度，所以叫"全息"。</p>
<p>在这个框架里，纠缠熵有个漂亮的几何公式，叫 Ryu-Takayanagi 公式：边界上一块区域的纠缠熵，等于体内对应极小曲面的面积除以四倍牛顿常数。这个公式把"信息"和"几何"直接焊在了一起：纠缠越多，面积越大；面积越大，虫洞越粗。</p>
<p style="text-align:center;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:15px;line-height:1.9;margin:16px 0;letter-spacing:.01em;overflow-wrap:anywhere;word-break:break-word">S_A = Area(γ_A) / (4 G_N)</p>
<p>顺着这条路，2016 年高（Ping Gao）、贾弗里斯和沃尔（Aron Wall）提出一种"可穿越虫洞"：在 AdS/CFT 里，给两个边界之间加一个耦合，再配上负能量，虫洞就能让信号穿过去，而且不违反因果。这个构造的关键，是用边界上的量子操作，把原本不可穿越的虫洞"撑开"一条缝。</p>
<p>2022 年，贾弗里斯的团队在谷歌的量子计算机上模拟了这个过程。他们用九个量子比特，模拟了一个简化版的 SYK 模型，观察信息从一个边界"穿"到另一个边界。这不是真挖了一条时空隧道，而是用量子比特复现了虫洞的动力学特征。论文发在《自然》上，标题就叫《量子处理器上的可穿越虫洞动力学》。</p>
<p>我的判断：ER=EPR 未必明天就能造传送门，但它说明虫洞已经不是纯科幻词汇，而是连接广义相对论和量子力学的一根真绳子。</p>
<h2>卡西米尔效应与负能量的现实</h2>
<p>前面反复说"负能量"，它在现实里到底长什么样？最实在的例子是卡西米尔效应。</p>
<p>1948 年，荷兰物理学家卡西米尔预言：两块平行导体板靠得极近时，板间的真空涨落模式被挤掉一部分，板外的模式更多，于是板外压力大于板内，两板被推向彼此。单位面积上的力，按下面这个式子走，d 是板间距，ℏ 是约化普朗克常数，c 是光速。</p>
<p style="text-align:center;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:15px;line-height:1.9;margin:16px 0;letter-spacing:.01em;overflow-wrap:anywhere;word-break:break-word">P = −π²ℏc / (240 d⁴)</p>
<p>代个数：d 取 1 微米，P 约 1.3×10⁻³ 帕斯卡；d 取 10 纳米，P 约 1.3×10⁵ 帕斯卡，差不多一个大气压。间距越小，效应越强，按四次方反比。</p>
<p>1997 年，拉莫罗用扭摆做了精密测量，证实了这个效应。他把一块镀金的球面和一块平板靠近到微米级，测到了它们之间的吸引力，误差和理论对得上。后来的实验把精度越做越高，卡西米尔效应现在是纳米机械里必须考虑的力，不处理它，微机电系统会粘在一起。</p>
<p>卡西米尔效应还引出了"动态卡西米尔效应"：如果让一面镜子以接近光速振动，真空里的虚光子会被"抖"成实光子，能量从镜子的机械运动里来。2011 年，有实验组用超导电路模拟了这个效应，观测到了光子对的产生。这说明负能量和真空涨落不是纸上的东西，是能进实验室的。</p>
<p>问题是量级。卡西米尔的负能量密度，在微米间距下只有 10⁻⁴ 焦耳每立方米；要撑开一个能过人的虫洞，需要的负能量比这大几十个数量级，而且得稳定地维持在喉部。量子不等式还规定，负能量越强，能维持的时间越短。</p>
<p>我的判断：自然界确实有负能量，但离撑开一扇门差着几十个数量级。这个差距不是工程问题，是物理问题。</p>
<h2>近道家族：曲速与克拉斯尼科夫管</h2>
<p>传送门不是孤例。物理学里有一整个"把空间折一下、抄近道"的家族，成员都盯着同一件事：用几何绕开光速限制或距离限制。</p>
<p>1994 年，墨西哥物理学家阿尔库比埃雷提出曲速驱动：让飞船待在一个"曲速泡"里，泡前方的空间收缩、后方的空间膨胀，泡本身以超光速移动，而飞船在泡内是静止的，局部没超光速。这个度规写成下面这样，v_s 是泡的速度，f 是一个形状函数，r_s 是到泡中心的距离。</p>
<p style="text-align:center;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:15px;line-height:1.9;margin:16px 0;letter-spacing:.01em;overflow-wrap:anywhere;word-break:break-word">ds² = −c²dt² + (dx − v_s f(r_s) dt)² + dy² + dz²</p>
<p>这个构造的巧妙之处，是把"超光速"从飞船身上挪到了空间身上：飞船在泡内是自由落体，局部物理完全正常，没有任何东西在局部超过光速。但麻烦在于，要让空间这样收缩膨胀，泡壁处需要负能量密度——又是奇异物质。</p>
<p>后来纳塔里奥在 2001 年、怀特在 2011 年做了改进，把所需负能量的总量压低了几个数量级，但压不到零。只要你还想造一个曲速泡，泡壁就一定是负能量的。这就像你想把水面压出一个凹坑，凹坑的边缘一定会鼓起来，鼓起来的那部分需要额外的力去维持。</p>
<p>1995 年，克拉斯尼科夫提出"克拉斯尼科夫管"：先用一艘近光速飞船沿航线飞一遍，把沿途的空间"铺"成一条管，之后在管里走就能抄近道。管壁同样需要负能量，而且如果摆得好，还能拼出闭合类时曲线，变成时间机器。</p>
<p>这个家族的共同点是：都想用时空几何换距离，代价都是奇异物质。虫洞是"两点之间的短管"，曲速是"会走路的泡"，克拉斯尼科夫管是"铺好的走廊"，三种形状，一笔账。</p>
<p>我的判断：曲速、克拉斯尼科夫管、虫洞，本质是同一件事的不同包装——都想用时空几何换距离，代价都是奇异物质。传送门只是这个家族里最亲民的一张卡通脸。</p>
<h2>实验室里的"虫洞"：BEC 与光学度规</h2>
<p>既然真的虫洞造不出来，能不能在实验室里"模拟"一个？这条路叫"类比引力"（analogue gravity），过去二十年做得相当热闹。</p>
<p>思路是这样的：某些流体系统里，声波或光波的传播方程，和弯曲时空里标量场的方程长得一模一样。只要把流体速度、密度调好，就能让声波"看到"一个有效的度规。1981 年，昂鲁（William Unruh）首先指出，流体里的声学视界可以模拟黑洞的视界，而且应该能发出霍金辐射。</p>
<p>最成功的实现是玻色-爱因斯坦凝聚（BEC）。2016 年，施泰因豪尔（Jeff Steinhauer）在 BEC 里造出了一个"声学黑洞"：让凝聚体以超过声速的速度流动，形成一个声学视界，声波进去就出不来。他观测到了视界两侧的声波关联，和霍金辐射的预言对得上。这个实验不是真黑洞，但它测到了霍金辐射的类比物。</p>
<p>光学度规是另一条路。光在运动的介质里传播，等效于在一个弯曲时空里传播；用超材料、光纤、等离子体，可以造出"光学黑洞""光学虫洞"的类比物。2019 年，有团队用液晶和电场做出了可调的"光学虫洞"，让光在一端进去、另一端出来，看起来像穿过了虫洞。</p>
<p>但要说清楚：这些实验模拟的是"方程"，不是"时空"。它们能复现霍金辐射的频谱、能复现虫洞的散射特性，但它们没有改变空间的拓扑，也没有真的把两个遥远区域连起来。你在光学虫洞里穿过去，走的还是实验室里那条光路，只是那条光路的有效度规长得像虫洞。</p>
<p>我的判断：类比实验能检验数学，能验证霍金辐射这类预言，但它不是"造了一扇门"。把类比当成实现，是这类科普里最常见的偷换。</p>
<h2>引力透镜与虫洞观测</h2>
<p>如果宇宙里真有虫洞，我们怎么看见它？最直接的办法，是看它怎么弯折背后的光。</p>
<p>虫洞和黑洞都能引力透镜。光线经过它们附近，会被偏折，形成光环、多重像、甚至爱因斯坦环。但两者的光学特征不完全一样：黑洞有视界，光线进去就出不来，所以中心是一块"阴影"；虫洞没有视界，光线可以穿过去，从另一头出来，所以它的阴影可能更小，或者根本不存在。</p>
<p>2019 年，事件视界望远镜（EHT）发布了 M87 星系中心黑洞的照片，一个明亮的环围着中心的暗区；2022 年，又发布了银河系中心 Sgr A* 的照片。这两张图和广义相对论的黑洞预言对得上，没有给虫洞留下明显的空间。但现在的分辨率还不足以排除一些精心调过的虫洞模型，因为某些虫洞的阴影和黑洞的阴影几乎一样。</p>
<p>另一个办法是微引力透镜。一个虫洞从恒星前面经过，会把恒星的亮度放大，形成一条光变曲线；虫洞的光变曲线和黑洞的、和普通恒星的不完全一样，特别是当光线穿过虫洞到达另一侧时，可能出现额外的像。目前还没有找到确凿的虫洞候选者。</p>
<p>引力波也是一条路。两个黑洞并合会产生一阵引力波，最后有一段"铃宕"（ringdown），波形由最终天体的性质决定。如果最终天体是虫洞，铃宕的频率和衰减会不一样，甚至可能出现"回声"——引力波在虫洞喉部来回反射，形成一串延迟的脉冲。LIGO 和 Virgo 已经积累了大量并合事件，到目前为止，没有确认的回声信号。</p>
<p>我的判断：观测是最终的裁判。方程里能写的东西很多，但只有能在望远镜或引力波探测器里留下痕迹的，才算进了物理。</p>
<h2>量子隐形传态不是传送门</h2>
<p>说到"传"，很多人会想到量子隐形传态。名字像，物理完全不同，这里得掰开。</p>
<p>1993 年，贝内特等人提出量子隐形传态的方案。它的做法是：先让一对粒子处于纠缠态，一个留在发送方，一个送到接收方；发送方把自己手里的待传量子态和纠缠粒子做一次联合测量（贝尔基测量），得到两个经典比特的结果；把这两个比特通过经典信道告诉接收方；接收方根据这两个比特，对自己的粒子做相应的幺正操作，就能复现原来的量子态。</p>
<p>注意三点。第一，传的是"态"，不是物质——原来的粒子还在原地，被传的是它携带的量子信息，而且原粒子在测量后已经被破坏。第二，必须有经典信道，而经典信道不能超光速，所以整个过程不能超光速。第三，它不违反不可克隆定理，因为原态在测量中被销毁了，接收方得到的是唯一的一份。</p>
<p>1997 年，几个小组先后在实验上实现了量子隐形传态；2017 年，中国的"墨子号"卫星把纠缠光子分发到相距一千多公里的地面站，做了星地量子隐形传态的实验。这些实验证明，量子信息可以在地面上、在太空中被可靠地搬运。</p>
<p>但它和科幻里的"传送门"是两件事。传送门要搬运的是物质本身，是原子的排列、是人的身体；量子隐形传态搬运的是量子态，是信息。传送门要瞬时跨越空间；量子隐形传态必须等经典信道把结果送到，速度不超过光速。传送门如果复制人，会撞上不可克隆；量子隐形传态不复制，它销毁原态、重建新态。</p>
<p>我的判断：量子隐形传态恰恰证明了"传"是有代价的——它得先有纠缠，再有经典通信，一步都省不掉。传送门要真有，也逃不掉类似的账。</p>
<h2>游戏做对和做错的地方</h2>
<p>回头比一下 Portal 2 和真物理，能看清它哪步踩在地上。</p>
<p>做对的：动量跨门守恒、速度大小保留只改方向、靠落差攒速度再释放。这些是实打实的经典力学，游戏甚至让你用身体记住了 v = √(2gh)。关卡设计也围绕这条定律展开：给你一个高台、一个深坑、一面白墙，剩下的让玩家自己算。</p>
<p>做错的：没有坠落伤害，真摔下来该有事；可以利用无限落体反复刷速度，真实介质有空气阻力，速度不会凭空循环增长；门只贴静止白墙，真实虫洞不挑墙面；最要命的是，门不施反作用力——按第三节的账，物体穿门改变动量，门本该被反推，游戏里门纹丝不动。</p>
<p>还有一条更隐蔽的：游戏里的"动量守恒"是相对门而言的，而门在游戏里总是静止的，所以"相对门"和"相对地面"是同一个参照系。真实物理里没有这个便利，门一动，参照系就得分家。</p>
<p>这些"错"都收在游戏规则里，玩家既能爽玩，又能无意间练到一条真定律。Portal 2 因而成了少有的、把动量守恒做成核心玩法的游戏。速通玩家研究出的那些"甩门""贴边""存档 glitch"，本质上都是在游戏的规则缝隙里找额外的速度，而不是在物理定律里找漏洞。</p>
<p>我的判断：它的物理不是全对，但方向对——它让你用手而不是用公式，先摸了一遍守恒。</p>
<h2>科幻史：从《接触》到《星际穿越》</h2>
<p>虫洞从方程走进大众，科幻小说起了关键作用，而且反过来推了物理学一把。</p>
<p>1985 年，卡尔·萨根出版《接触》。小说里，女主角通过一台机器穿越星际，萨根不想用"超光速飞船"这种没有物理依据的设定，就去找他的朋友基普·索恩，问有没有既符合物理、又能让人快速穿越的办法。索恩当时也没现成答案，就让学生莫里斯去算，算出来的就是 1988 年那篇可穿越虫洞论文。</p>
<p>这件事的意义在于：一个科幻作家的问题，逼出了一个正规的物理论文，而这篇论文又成了后来所有虫洞研究的起点。科幻在这里不是物理的对立面，是物理的"需求方"。</p>
<p>2014 年，诺兰拍《星际穿越》，索恩担任科学顾问。片子里那个著名的"卡冈图雅"黑洞，是基于真实的引力透镜计算渲染出来的，连吸积盘的亮度分布都参考了物理模型。片子里也出现了虫洞，形状是一个球面，而不是科幻里常见的"旋涡"——这是索恩坚持的，因为可穿越虫洞的喉部在数学上是球形的，不是漏斗形的。</p>
<p>再往前，1994 年的《星际之门》把虫洞做成了一扇环形门，人走进去就到另一个星球；2007 年的《传送门》把它做成了一把枪，打在墙上就是两扇门。后者更接近"拓扑近道"的数学直觉，前者更接近"门"的日常直觉。两种想象都在回答同一个问题：如果能抄近道，世界会变成什么样。</p>
<p>我的判断：科幻和物理不是谁给谁打工，是互相喂问题。萨根问了一个好问题，索恩算出了一个真答案；诺兰拍了一部电影，又让几百万人第一次认真看了一张黑洞的照片。</p>
<h2>普通人为什么该关心</h2>
<p>这套绕来绕去的物理，和日常有关系。</p>
<p>市面上常年有"磁动机""净水发电""永恒电池"之类的永动机骗局，它们的共同套路，是声称找到了某个"特殊结构"让能量白生。传送门悖论给了一把尺：凡是要靠一个空间近道、一个特殊拓扑来无中生有能量的，先问一句——它的闭合回路净功是不是零？账能不能合？合不上，就是骗局。</p>
<p>第二把尺是动量。任何声称"只进不出""越用越多"的装置，都得回答反作用力去哪了。磁动机说磁铁互相推，可磁铁推完要复位，复位做的功正好抵掉推出来的功；水变油说加一点东西就多出能量，可化学反应的能量账是瞒不住的。</p>
<p>第三把尺是熵。就算能量守住了，熵也在涨。一个装置可以说"我只搬运能量，不制造能量"，但它不能说自己"把散掉的能量重新聚起来"而不付代价。麦克斯韦妖的账，一百多年前就被兰道尔算清了。</p>
<p>另一层关系在认知：能量守恒不是教条，是对称性的签名。理解传送门为什么破不了它，比背下"能量不会凭空产生"更有用，因为你知道这条规律从哪来、到哪止。</p>
<p>我的判断：关心传送门悖论，本质是练一种免疫力——对一切"免费用能"叙事的免疫力。</p>
<h2>边界：不神话，也不封死</h2>
<p>话说到这，得划清两条线。</p>
<p>一条是不把虫洞浪漫化成旅游通道：它能写进方程，不等于能买票上车；需要的奇异物质、面临的因果悖论，都是实打实的拦路石。网上一有大科学新闻，就有人喊"虫洞旅行要实现了"，那多半是把"数学上允许"当成了"工程上可行"。</p>
<p>另一条是不给伪科学留位置：凡声称"打破物理定律"的传送门式发明，在没有给出完整账面之前，都该先打问号。问三件事：闭合回路净功是不是零？反作用力谁在扛？维持结构的能量从哪来？三问答不上，就不用往下听了。</p>
<p>同时也得诚实：奇异物质是否大量存在、时序保护猜想是否真成立、ER=EPR 是否成立、岛屿公式是否适用于真实黑洞，今天都还没定论。科学在这几块是开放的，不是已经封口。开放，不等于什么都能信。</p>
<p>我的判断：对未知保持开放，对"免费能量"保持怀疑，这两件事不矛盾。</p>
<h2>写在后面的话</h2>
<p>绕回开头那句 GLaDOS 的嘲讽。Portal 2 里，快的东西进去，快的东西出来——动量守得住，能量也守得住。把它升级成真虫洞，你会撞上奇异物质、撞上时间机器、撞上因果、撞上第二定律和幺正性，最后发现：能"套利"的缝隙，要么要你先付相对论级别的代价，要么被自然自己焊死。</p>
<p>这一路走下来，最值得记住的不是"传送门不行"这个结论，而是它经过的每一道关：诺特定理把守恒和对称焊在一起，广义相对论把引力变成几何，虫洞度规把"近道"写成一个解，能量条件把"负能量"变成硬门槛，热力学和信息论又把账本从能量扩到熵和信息。每一道关都在说同一件事：宇宙的账，不是那么好糊弄的。</p>
<p>传送门破不了能量守恒。它能做的，是换一个角度，让我们看清守恒不是束缚，是宇宙对称性的签名；而真正"破格"的，从来不是那扇门，是提出这个问题、并把账一笔笔算清的人。</p>
<p>我的判断：门是假的，物理是真的；而真物理最漂亮的地方，恰恰是它连"近道"都提前算好了——你绕不过去。</p>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1yq4y1Y7GE" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1yq4y1Y7GE&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>【传送门2】双人联机丨合作模式剧情通关全流程（Valve 2011）</figcaption>
</figure>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV13G4y1Z74K" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV13G4y1Z74K&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>世界上最伟大的游戏之一！《传送门》究竟讲述了什么故事（硬的小软）</figcaption>
</figure>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1GkJCzVEQj" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1GkJCzVEQj&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>一个很简单的实验，彻底改写了物理学！从诺特定理到时间平移对称，为什么会动摇能量守恒定律？（科学认识论）</figcaption>
</figure>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1o3411t7sB" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1o3411t7sB&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>虫洞可以自然存在吗？如何制造一个可穿行的虫洞（科学透镜）</figcaption>
</figure>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV18re8ziEu3" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV18re8ziEu3&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>爱因斯坦：「虫洞是我算出来的，但我不信」看懂虫洞等于了解时空（上知天文）</figcaption>
</figure>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1rFXMY8ELP" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1rFXMY8ELP&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>一口气听完负质量/曲速引擎/虫洞/卡西米尔效应是种怎样的体验（科学小神牛）</figcaption>
</figure>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1WCG96dEvj" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1WCG96dEvj&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>相隔百亿光年也能瞬间感应？ER=EPR 揭示宇宙终极秘密（自说自话的总裁）</figcaption>
</figure>
<h2>参考</h2>
<ul class="pg-refs"><li><a href="https://theportalwiki.com/wiki/Portals" target="_blank" rel="noopener">Portals（GLaDOS 原话："Momentum... conserved between portals. Speedy thing goes in, speedy thing comes out"）</a><span class="src"> · 游戏资料 / Portal Wiki</span></li><li><a href="https://fbrowser.org/wikipedia/wiki/Portal_2" target="_blank" rel="noopener">傳送門2（自由落体的向下动量穿越后转为向前直线动量，速率不变；Valve 2011）</a><span class="src"> · 维基百科（镜像）</span></li><li><a href="http://mp.weixin.qq.com/s?__biz=MzA5OTY2OTYyOA==&mid=2650220309&idx=1&sn=19abf96274f4e360f9843d4239683e28&chksm=8935dc8e82a20ba55289c2beb04a54594e2b27ef0a0d7c93d7da3e83b8b929f0166399eded46#rd" target="_blank" rel="noopener">本期游戏分享：《传送门2》（核心机制传送门枪，物理深度挖掘动量守恒）</a><span class="src"> · 微信 / 百视通云电竞</span></li><li><a href="https://arxiv.org/abs/physics/0503066" target="_blank" rel="noopener">Noether, E. (1918) Invariant Variation Problems（诺特定理：连续对称对应守恒量，时间平移对应能量守恒）</a><span class="src"> · 论文英译 / arXiv</span></li><li><a href="https://www.kepuchina.cn/article/articleinfo?business_type=100&ar_id=292738" target="_blank" rel="noopener">对称原理（诺特 1918：时间平移对称→能量守恒，空间平移→动量，旋转→角动量）</a><span class="src"> · 科普中国</span></li><li><a href="https://www.peopleapp.com/rmharticle/30043436401" target="_blank" rel="noopener">时间晶体，直到世界尽头的浪漫（诺特：时间平移对称对应能量守恒；时间晶体未违反能量守恒）</a><span class="src"> · 人民日报人民号</span></li><li><a href="https://physics.aps.org/story/v15/st11" target="_blank" rel="noopener">The Birth of Wormholes（爱因斯坦-罗森 1935 虫洞起源；Einstein & Rosen, Phys. Rev. 48, 73）</a><span class="src"> · 美国物理学会</span></li><li><a href="https://doi.org/10.1103/PhysRev.48.73" target="_blank" rel="noopener">Einstein, A. & Rosen, N. (1935) The Particle Problem in the General Theory of Relativity. Phys. Rev. 48, 73</a><span class="src"> · 论文 / DOI</span></li><li><a href="https://www.osti.gov/biblio/5435651" target="_blank" rel="noopener">Morris, M. S. & Thorne, K. S. (1988) Wormholes in spacetime and their use for interstellar travel. Am. J. Phys. 56, 395</a><span class="src"> · 论文 / 美国能源部</span></li><li><a href="https://doi.org/10.1119/1.15620" target="_blank" rel="noopener">Morris & Thorne (1988) 同上文（可穿越虫洞度规、形状函数与红移函数、需奇异物质撑开喉部）</a><span class="src"> · 论文 / DOI</span></li><li><a href="https://www.gmw.cn/02sz/2009-10/01/content_1045497.htm" target="_blank" rel="noopener">宇宙中的时空隧道（索恩与莫里斯 1988 可穿越虫洞需"异常物质"、半径一厘米需地球质量量级）</a><span class="src"> · 光明网</span></li><li><a href="https://arxiv.org/abs/gr-qc/9410043" target="_blank" rel="noopener">Ford, L. H. & Roman, T. A. (1995) Averaged Energy Conditions and Quantum Inequalities（量子不等式限制负能量的量与持续时间）</a><span class="src"> · 论文 / arXiv</span></li><li><a href="https://doi.org/10.1103/PhysRevLett.61.1446" target="_blank" rel="noopener">Morris, Thorne & Yurtsever (1988) Wormholes, Time Machines, and the Weak Energy Condition. PRL 61, 1446</a><span class="src"> · 论文 / DOI</span></li><li><a href="https://www.kepuchina.cn/more/201607/t20160727_13663.shtml" target="_blank" rel="noopener">时间旅行是科学？还是幻想？（Morris-Thorne-Yurtsever 1988 虫洞时间机器、弱能量条件、霍金时序保护猜想）</a><span class="src"> · 科普中国</span></li><li><a href="https://doi.org/10.1103/PhysRevD.46.603" target="_blank" rel="noopener">Hawking, S. W. (1992) Chronology protection conjecture. Phys. Rev. D 46, 603</a><span class="src"> · 论文 / DOI</span></li><li><a href="http://mp.weixin.qq.com/s?__biz=MzI1OTExNzkzNw==&mid=2650462571&idx=3&sn=33a7a4621c3046a90cb03111dcdaf243&chksm=f273bf75c5043663a7c35119baa7d855010a6c6c01a355f52d90326dd9a60a7a2d33a676c845#rd" target="_blank" rel="noopener">基普·索恩的虫洞时间机器（两口相对运动/引力差造时间差；祖父悖论；平行宇宙解）</a><span class="src"> · 微信 / 中科院半导体所</span></li><li><a href="https://www.163.com/dy/article/KKEI2A9V0511C4OP.html" target="_blank" rel="noopener">能量守恒，其实不是宇宙铁律（中科院物理所：诺特定理；膨胀弯曲时空里能量不守恒）</a><span class="src"> · 网易 / 中科院物理所</span></li><li><a href="https://doi.org/10.1007/BF02084158" target="_blank" rel="noopener">Bennett, C. H. (1982) The thermodynamics of computation—a review（兰道尔原理：擦除一比特至少耗散 k_B T ln2）</a><span class="src"> · 论文 / DOI</span></li><li><a href="https://doi.org/10.1103/PhysRevD.7.2333" target="_blank" rel="noopener">Bekenstein, J. D. (1973) Black holes and entropy. Phys. Rev. D 7, 2333</a><span class="src"> · 论文 / DOI</span></li><li><a href="https://doi.org/10.1038/248030a0" target="_blank" rel="noopener">Hawking, S. W. (1974) Black hole explosions? Nature 248, 30（霍金辐射温度 T_H = ℏc³/8πGMk_B）</a><span class="src"> · 论文 / DOI</span></li><li><a href="https://arxiv.org/abs/1207.3123" target="_blank" rel="noopener">Almheiri, Marolf, Polchinski & Sully (2012) Black holes: complementarity or firewalls?（AMPS 火墙诘难）</a><span class="src"> · 论文 / arXiv</span></li><li><a href="https://arxiv.org/abs/1905.08255" target="_blank" rel="noopener">Penington, G. (2019) Entanglement Wedge Reconstruction and the Information Paradox（岛屿公式与佩奇曲线）</a><span class="src"> · 论文 / arXiv</span></li><li><a href="https://arxiv.org/abs/1905.08762" target="_blank" rel="noopener">Almheiri, Engelhardt, Marolf & Maxfield (2019) The entropy of bulk quantum fields and the entanglement wedge of an evaporating black hole（岛屿公式）</a><span class="src"> · 论文 / arXiv</span></li><li><a href="https://arxiv.org/abs/hep-th/9711200" target="_blank" rel="noopener">Maldacena, J. (1997) The large N limit of superconformal field theories and supergravity（AdS/CFT 对偶）</a><span class="src"> · 论文 / arXiv</span></li><li><a href="https://arxiv.org/abs/hep-th/0603001" target="_blank" rel="noopener">Ryu, S. & Takayanagi, T. (2006) Holographic derivation of entanglement entropy（S_A = Area/4G_N）</a><span class="src"> · 论文 / arXiv</span></li><li><a href="https://arxiv.org/abs/1608.05687" target="_blank" rel="noopener">Gao, Jafferis & Wall (2016) Traversable wormholes via a double trace deformation</a><span class="src"> · 论文 / arXiv</span></li><li><a href="https://kepuchina.cn/public/new/201904/t20190417_1041887.shtml" target="_blank" rel="noopener">当黑洞遇上量子纠缠：掉入黑洞也能逃生（ER=EPR、可穿越虫洞与负能量撑开喉部）</a><span class="src"> · 科普中国</span></li><li><a href="https://doi.org/10.1103/PhysRevLett.78.5" target="_blank" rel="noopener">Lamoreaux, R. L. (1997) Demonstration of the Casimir force in the 0.6 to 6 μm range. PRL 78, 5</a><span class="src"> · 论文 / DOI</span></li><li><a href="https://doi.org/10.1103/PhysRevLett.46.1351" target="_blank" rel="noopener">Unruh, W. G. (1981) Experimental black-hole evaporation? Phys. Rev. Lett. 46, 1351（类比引力）</a><span class="src"> · 论文 / DOI</span></li><li><a href="https://doi.org/10.1038/nphys3863" target="_blank" rel="noopener">Steinhauer, J. (2016) Observation of quantum Hawking radiation in an analogue black hole. Nature Physics 12, 959</a><span class="src"> · 论文 / DOI</span></li><li><a href="https://arxiv.org/abs/gr-qc/0009013" target="_blank" rel="noopener">Alcubierre, M. (1994) The warp drive: hyper-fast travel within general relativity（曲速泡度规，需负能量密度）</a><span class="src"> · 论文 / arXiv</span></li><li><a href="https://arxiv.org/abs/gr-qc/9511068" target="_blank" rel="noopener">Krasnikov, S. (1995) Hyperfast travel in general relativity（克拉斯尼科夫管，可拼出闭合类时曲线）</a><span class="src"> · 论文 / arXiv</span></li><li><a href="https://doi.org/10.1103/PhysRevLett.70.1895" target="_blank" rel="noopener">Bennett et al. (1993) Teleporting an unknown quantum state via dual classical and EPR channels. PRL 70, 1895</a><span class="src"> · 论文 / DOI</span></li></ul>`
  },
  {
    id: "post-249",
    title: "人纵有万般能耐，终也敌不过天命",
    date: "2026-11-03",
    updated: "2026-11-03",
    cat: "电影",
    tags: ["影像", "历史"],
    cover: "",
    pinned: false,
    excerpt: "项羽在垓下说过「天之亡我」，司马迁当场骂了四个字：岂不谬哉。两千年后，这句话成了《霸王别姬》里最常被引用的一句台词。它到底对在哪，又错在哪。",
    content: `<p>公元前 202 年，垓下。项羽的兵打光了，粮也尽了，汉军把营帐围了好几层。夜里，四面传来楚地的歌声——他以为楚地已经全丢，起来在帐中喝酒。</p><p>陪着他的有一个女人，史书上只写「有美人名虞」，连姓什么都不知道。项羽唱了一遍「力拔山兮气盖世，时不利兮骓不逝」，唱完，司马迁记了四个字：<strong>美人和之</strong>。</p><p>她和的什么，一个字没留下来。今天戏台上那四句「汉兵已略地，四面楚歌声。君王意气尽，贱妾何聊生」，是后来人替她补的。补了两千年，补到 1993 年，一个演虞姬的人，把这四句唱成了自己的结局。</p><h2>史书里的六个字</h2><p>先把那段原文摆出来。这是《史记·项羽本纪》里最要紧的几十个字，也是两千年后一切改编的源头：</p><blockquote class="pg-quote"><p>项王则夜起，饮帐中。有美人名虞，常幸从；骏马名骓，常骑之。於是项王乃悲歌慷慨，自为诗曰：“力拔山兮气盖世，时不利兮骓不逝。骓不逝兮可柰何，虞兮虞兮柰若何！”歌数阕，美人和之。项王泣数行下，左右皆泣，莫能仰视。</p><cite>《史记·项羽本纪》，中华书局点校本</cite></blockquote><p>数一数，虞姬在这段里做了什么：她在场，她跟着唱，然后她就没有了。司马迁没写她的名字、年龄、出身，没写她说了什么，更没写她怎么死。她在整部《史记》里的全部戏份，就是「常幸从」和「美人和之」。</p><p>和词是后人补的。今天能见到的「汉兵已略地，四方楚歌声。大王意气尽，贱妾何聊生」，出自陆贾《楚汉春秋》的佚文，靠《史记》三家注里的《正义》转引才留下来。也就是说，虞姬的第一句台词，作者不是她。</p><p>这里还有一层，比虞姬的沉默更值得看。就在同一段之后，项羽对部下说了两遍同样的话：</p><blockquote class="pg-quote"><p>然今卒困於此，此天之亡我，非战之罪也。今日固决死，原为诸君快战，必三胜之，为诸君溃围，斩将，刈旗，令诸君知天亡我，非战之罪也。</p><cite>《史记·项羽本纪》</cite></blockquote><p>逃到乌江边，亭长撑船等他，他又是那句：「天之亡我，我何渡为！」。三处，同一个说法。中国史书里第一次把失败整个推给「天」的，不是别人，正是项羽本人。</p><p>司马迁没给他留面子。《项羽本纪》末尾的「太史公曰」，前半段把项羽夸到极高——三年灭秦，分裂天下，政由羽出，近古未有；后半段一句话翻脸：</p><blockquote class="pg-quote"><p>自矜功伐，奋其私智而不师古，谓霸王之业，欲以力征经营天下，五年卒亡其国，身死东城，尚不觉寤而不自责，过矣。乃引“天亡我，非用兵之罪也”，岂不谬哉！</p><cite>《史记·项羽本纪》太史公曰</cite></blockquote><p>「岂不谬哉」——岂不是荒谬吗。这四个字在《史记》里不常见，司马迁很少这样直接骂人。他骂的不是项羽打败仗，是项羽到死都不认账。</p><p>所以「天命」这个词，在中国最早的用法里，就不是一句客观描述。它是一个打了败仗的人，用来跟自己和解的一句话。<strong>它从诞生那天起，就带着甩锅的性质。</strong></p><h2>一出行了两百年的死局</h2><p>史书没写虞姬怎么死。她「和之」之后，就从记载里消失了。是自尽、是死于乱军、是被俘，没有答案。</p><p>戏曲替她做了决定。明代沈采的传奇《千金记》里已经有这出戏的骨架。清逸居士后来编了一部四本的连台本戏《楚汉争》，1918 年 3 月 9 日由杨小楼、尚小云首演于北京第一舞台——太长，影响不大。</p><p>齐如山和吴震修把它删繁就简，改名《霸王别姬》。1922 年 2 月 15 日，梅兰芳饰虞姬、杨小楼饰项羽，还是第一舞台，三千个座位卖了满堂。</p><figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1WV4y1v7up" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1WV4y1v7up&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>1929 年留下的梅兰芳《霸王别姬》影像。梅兰芳把虞姬的扮相定成如意冠、鱼鳞甲、黄斗篷，剑舞配【夜深沉】——这套设计后来没人改得动，程蝶衣在电影里穿的也是它。</figcaption>
</figure><p>梅兰芳在这出戏里下了真功夫。他给虞姬设计了一套剑舞，配的是节奏极强的【夜深沉】；唱腔里「南梆子」和「西皮二六」两段流传最广。1922 年那场首演之后，这出戏成了梅派的招牌，再没下过台。</p><p>结局定死在这里：虞姬舞剑，唱完「君王意气尽，贱妾何聊生」，拔剑自刎。霸王突围，到乌江也自刎。两个人都得死，顺序还不能错——虞姬先死，霸王才能没有牵挂地走。</p><p>从 1922 年到 1993 年，七十一年。这出戏的结局一个字没改过。中间改过扮相、改过唱腔、改过场次，唯独虞姬必须死这一条，谁也不敢动。</p><p>我的判断：<strong>一出戏能演两百年，靠的不是结局新鲜，是结局不变。</strong>观众买票进场，坐定，灯暗，要的就是看她把那一下抹完。你改了，他们反而觉得你没唱完。</p><figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1zD4y1D7Ty" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1zD4y1D7Ty&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>李胜素《霸王别姬》「劝君王饮酒听虞歌」与剑舞。这段唱完，虞姬就该死了，两百年没有例外。</figcaption>
</figure><h2>一副可以对调的对联</h2><p>电影里，小豆子进科班学的是旦角，开蒙戏不是《霸王别姬》，是昆曲《孽海记·思凡》。这出戏只有一个角色：小尼姑色空，受不了庵里的日子，趁师父师兄不在，逃下山去。</p><p>她有一段唱，原词是这样的：</p><blockquote class="pg-quote"><p>佛前灯，做不得洞房花烛；香积厨，做不得玳筵东阁；钟鼓楼，做不得望夫台；草蒲团，做不得芙蓉软褥。我本是女娇娥，又不是男儿汉，为何腰系黄绦，身穿直裰？</p><cite>《孽海记·思凡》【香雪灯】，据《粟庐曲谱》本</cite></blockquote><p>注意最后那一对：<strong>我本是女娇娥，又不是男儿汉。</strong>这是陈述。说话的人知道自己是谁，只是在抱怨穿错了衣裳。</p><p>电影把这句改了。改成「我本是男儿郎，又不是女娇娥」。</p><p>改动只有两个字，性质全变了。原词里「女娇娥」和「男儿汉」不是一对整齐的词，一个偏口语，一个偏书面；改过之后，「男儿郎」对「女娇娥」，郎对娥，男对女，四个字对四个字，工整得像一副对联。</p><p>对联的好处是对仗，坏处是可以对调。上联下联一换位置，意思正好翻个个儿。电影要的就是这个：一句唱词变成了一道二选一的题，念错一个字，整句就倒过来。</p><p>我的判断：<strong>这副对联是全片最狠的一个装置。</strong>它把「你是谁」这件没法选的事，做成了一道只有两个选项的选择题，而且两个选项都写在纸上，谁都能替你填。</p><h2>三次改口</h2><p>小豆子第一次被改，是在进科班之前。他生着六指，关师傅不收。母亲把他抱到院子里，拿刀切掉了那根多出来的指头。雪地上留下一串血。</p><p>这一刀切的是手，改的是身份。从那一刻起，他不再是「一个多长了一根指头的孩子」，而是一件可以收下的物件。科班要的不是他这个人，是一双能练成角儿的手。</p><p>第二次在科班里。师父考戏，他念《思凡》，念到那一句就卡住，脱口而出的是「我本是男儿郎」。挨打。再念，还是错。小石头在旁边急，拿木勺舀了水从他头上浇下去。</p><p>第三次来得最狠。那坤到科班来替张公公选戏，小豆子又念错。段小楼把他按在椅子上，拿烟锅捅进他嘴里，搅出了血。他满嘴是血地坐着，忽然开口，一字不错地唱完了「我本是女娇娥，又不是男儿郎」。</p><p>再往后是张公公府上那一夜。这一段电影拍得很克制，只有一个清晨的镜头，和两个孩子在墙根下的沉默。</p><p>我的判断：<strong>这三次改口，没有一次是他自己想通的。</strong>他是被打对的，被烫对的，被吓对的。所谓「从一而终」的起点，根本轮不到他选。</p><h2>关师傅的两句话</h2><p>关师傅这个人物，戏份不多，台词却沉。小豆子逃出科班又自己回来，认罚，趴在长凳上挨木刀背。打完了，关师傅坐下来给孩子们讲这出戏，讲楚汉相争，讲霸王为什么败，最后说了这么一句：</p><blockquote class="pg-quote"><p>讲这出戏，是这里边有个唱戏和做人的道理：人，得自个儿成全自个儿。</p><cite>《霸王别姬》台词，关师傅（吕齐饰）</cite></blockquote><p>这句话被引用得极多，多数时候被当成励志格言用：要争气，别指望别人。放在电影里，它其实更冷——小豆子刚刚挨完打，满身是伤，师父告诉他：你受的这些，是你自己成全自己必须付的钱。</p><p>而同一个关师傅，还说另一句：</p><blockquote class="pg-quote"><p>人纵有万般能耐，终也敌不过天命。</p><cite>《霸王别姬》台词</cite></blockquote><p>两句话摆在一起，是打架的。一句说命在自己手里，一句说命在别人手里；一句要你拼，一句告诉你拼了也没用。</p><p>我的判断：<strong>这不是编剧疏忽，这是旧式手艺人的真实世界观。</strong>你得拼死拼活地练，练成了也别以为就能赢——这两件事在同一个人的脑子里并存，并不矛盾。他们那行当，本来就是靠这个活下来的。</p><p>电影把这两句话都留下了，一句没删。它没打算替你解决这个矛盾，它只是把矛盾摆在你面前，让你自己听着。</p><h2>科班：一个孩子是怎么被做成角儿的</h2><p>要讲这三个人，得先讲那个院子。</p><p>关家科班的孩子睡大通铺，天不亮就起来，喊嗓、耗腿、下腰、翻跟头。冬天院子里结了冰，照样光着手在石头上按。唱错一个字，板子落下来；身段走歪了，板子也落下来。打不是惩罚，打是课程的一部分——师父打你，是还在教你；哪天不打了，你就该走了。</p><p>小石头是大师兄。师弟挨打，他替；师弟想跑，他开门；师父往死里打小豆子，他冲上去推师父，喊「我跟你拼了」，回头被打得头破血流。少年段小楼身上有一股混不吝的义气，那是真霸王的东西——他自己也信了。</p><p>院子里还有个孩子叫小癞子。他爱说爱笑，怕疼，老想跑，跑过好几回，每回都被提回来按在地上打。他有一句台词，说得眉飞色舞：</p><blockquote class="pg-quote"><p>天下最好吃的，冰糖葫芦数第一。我要是成了角儿，天天得拿冰糖葫芦当饭吃。</p><cite>《霸王别姬》台词，小癞子</cite></blockquote><p>这句台词在电影里出现两次。第一次是他说的时候，眼睛里全是光；第二次是他死之前。</p><p>那天他带着小豆子翻出去。街上有风筝、有风车、有卖糖葫芦的、有熙熙攘攘的人。两个孩子在人堆里挤着走，谁也不认识他们，谁也不会打他们。他们挤进戏园子，台上正演《霸王别姬》，满堂的叫好声像浪一样。</p><p>小癞子看着看着，哭了。他哭着说了一句话：</p><blockquote class="pg-quote"><p>他们怎么成的角儿啊，得挨多少打啊？</p><cite>《霸王别姬》台词，小癞子</cite></blockquote><p>这句话是全片最要命的一句。它不是羡慕，是算账——他看见的不是台上的光，是光背后那一笔看不见的数目。他算了一下，算出来自己付不起。<strong>一个孩子对命运的第一次清醒，往往就是这种算法。</strong></p><p>回去之后，小豆子自己走进了院子，趴在长凳上，一声不吭地挨。板子落下去，血从裤子上洇出来。小癞子站在门口，不敢进，看着。</p><p>然后他把口袋里的糖葫芦一颗一颗掏出来，全塞进嘴里，塞得腮帮子鼓起来，嚼不动也要塞。塞完，他走到院子边上，用练功的绳子，把自己挂了上去。</p><p>这一段电影没有给任何评价。没有慢镜头，没有音乐推上来，没有一个大人跑过来喊他的名字。就是一个孩子塞了一嘴糖葫芦，然后不见了。</p><p>我的判断：<strong>小癞子不是配角，他是这个行当的分母。</strong>我们记住的是程蝶衣，可那一院子孩子里，绝大多数人的结局是小癞子。所谓「成角儿」，本来就是一件要从很多人里挑出一个的事，剩下的那些不叫失败，叫成本。</p><p>这也解释了程蝶衣后来为什么那么怕「不成」。他不是怕穷，也不是怕没名声，他是见过那个门口——一个孩子站在门口，看着里面的人挨打，然后转身去死。他每回上妆，都是从那道门口走回来一次。</p><h2>程蝶衣（一）：一刀，一夜，一个孩子</h2><p>整部电影里，程蝶衣的戏最多，可他的来路最少人提。大家记住的是他台上的样子，忘了他是怎么被送进来的。</p><p>他母亲叫艳红，是个妓女。她抱着他来到关家科班，求师父收下。关师傅看了看孩子的手，摇头——六指，旦角的手是要露在外头的，多一根指头，这行饭就吃不成。</p><p>母亲没有哭，也没有讲价。她把孩子抱到院子里的长凳边，按住，从怀里掏出刀，把那根多出来的指头切了下去。雪地上留下一串红点。孩子挣开跑了，跑了几步被她抓住，抱着，往师父面前一送。</p><p>蒋雯丽演的这个母亲，全程脸上带着笑。那种笑不是高兴，是一个人在做一件没法解释的事时，用来把场面撑住的笑。她跪下来求师父收下孩子，然后把自己的围脖解下来，裹在儿子头上，转身走进雪里。</p><p>小豆子回头叫娘。娘没有回头。</p><p>这是他人生的第一次交割：<strong>一根指头换一个饭碗。</strong>从这一刻起，他不再是「一个多长了一根指头的孩子」，而是一件被收下的东西。科班要的从来不是他这个人，是一双能练成角儿的手。</p><p>然后是那一夜。</p><p>张公公府上的堂会，是科班难得的大生意。唱完了，公公留人。电影没有正面拍那间屋子里发生了什么，只给了一个清晨：院子里的雪，两个孩子坐在墙根下，谁都不说话。小豆子的脸上没有眼泪，是一种比哭更难看的空。</p><p>就从那一夜以后，他抱回了一个弃婴。</p><p>我的判断：<strong>他的性别不是被一出戏改的，是被三样东西一起改的：母亲的刀，师哥的烟锅，公公的那一夜。</strong>前两样是明着来的，第三样全片没有一句台词。可只有第三样，是他一个人扛的，扛完了还得自己走回院子。</p><p>所以后来他抱那个孩子的时候，不要把它理解成善良。那更像是他在路边认出了自己——一个被扔下的东西，总得有人捡。</p><h2>程蝶衣（二）：台上那个人</h2><p>先说他的戏。</p><p>男旦这行，讲究的不是「像女人」，是「是那个人」。梅兰芳把虞姬的扮相定成如意冠、鱼鳞甲、黄斗篷，剑舞配【夜深沉】，这套设计七十年没人改得动，程蝶衣在电影里穿的就是它。张国荣的唱段由男旦温如华配唱，身段和做工是他自己练的：兰花指怎么翻，水袖怎么抖，台步怎么压着走，一样一样抠出来的。</p><p>然后是那场《贵妃醉酒》。</p><p>日军进城，戏园子里挂上了「大东亚共荣」的条幅，楼上包厢坐着袁四爷和日本军官青木。台上唱到一半，抗日传单从顶上撒下来，灯灭了，台下哗然，观众往外挤，没有人再看台上。</p><p>程蝶衣没有停。他在黑暗里，把那段没走完的身段走完了。传单落在他肩上，他继续转。</p><p>楼上只有一个人在鼓掌。袁四爷。他什么也看不见，可他知道台上那个人还在演。</p><p>我的判断：<strong>这一场是整部电影对「戏比天大」这四个字唯一一次正面的、不掺讽刺的呈现。</strong>它不是敬业，是那个人只有在演的时候才是活的；灯灭了、人散了，他还是得把这一折走完，否则他不知道自己是谁。</p><p>再往后是给青木唱戏。段小楼打了日本兵被抓，菊仙来求他，他本来已经拿起披风要出门，又坐下了——他要菊仙一句话。菊仙说，只要你肯救小楼，我回花满楼。他去了，在军部唱了一折《牡丹亭·游园》，青木听得入了神，段小楼被放了出来。</p><p>段小楼出来之后，朝他脸上唾了一口。</p><p>这一口唾沫，比日本人的枪更伤他。他救的是这个人，这个人却嫌他脏。</p><p>战后清算汉奸，他被抓上法庭。袁四爷在庭上拍了栏杆，替「淫词艳曲」四个字翻案；他自己站在被告席上，说的却是另一套话——他说日本人没有打他，也没有逼他，他是自己要唱的；他还说，青木要是活着，京戏就传到日本国去了。</p><p>他是奔着死去的。结果没死成：一位国民党高官喜欢听戏，一句话把他保了出来。</p><p>我的判断：<strong>他不懂政治，这不是他的美德，是他的残疾。</strong>他一辈子只认一个尺度——戏好不好。拿这个尺度去量日本人、量法庭、量时代，全都量不准。可他也没有别的尺子。一个人只有一把尺子的时候，你不能怪他量错了世界，只能怪世界没有给他第二把。</p><h2>程蝶衣（三）：他到底要什么</h2><p>很多人把他的感情读成爱情。我觉得不够准确。</p><p>他要的东西，他自己说过一次，说得非常清楚：</p><blockquote class="pg-quote"><p>说好了一辈子，就是一辈子。少一年、一个月、一天、一个时辰，都不算一辈子。</p><cite>《霸王别姬》台词，程蝶衣</cite></blockquote><p>注意这句话里的单位。年、月、天、时辰——他在给「一辈子」划刻度，而且一个刻度都不许少。这不是情话，这是一份合同的验收标准。</p><p>他要的不是「你爱我」，是「不许变」。</p><p>这就解释了菊仙为什么是他的死敌。菊仙能给的，恰恰是「变」：结婚、生孩子、过日子、让男人少唱戏多挣钱。这些都是往前走，都是把昨天换成今天。而程蝶衣要的是把昨天永远留住。</p><p>两个人第一次见面，菊仙赤着脚来后台找段小楼。程蝶衣叫了她一声「菊仙小姐」，然后当着满屋子人的面，从屋里拿出一双鞋，丢在她面前。</p><p>这一手很毒。鞋是给赤脚的人的，也是给「那种女人」的。他递的是接济，给的是羞辱。菊仙没有发作，把鞋收下了——她这辈子受的羞辱比这重得多，这一双鞋算什么。</p><p>他还说过一句更难听的：</p><blockquote class="pg-quote"><p>菊仙小姐，您在哪儿学的戏呀？没学过呀？那就别撒狗血了。</p><cite>《霸王别姬》台词，程蝶衣</cite></blockquote><p>「撒狗血」是行话，说的是戏台上那些靠夸张情绪骗掌声的演法。他是在骂她：你这一套苦情戏，在我这儿不算戏。可他自己才是那个把日子过成戏的人。<strong>他骂的每一样东西，都是他自己身上的病。</strong></p><p>段小楼娶了菊仙之后，他开始抽大烟。嗓子一天天坏下去，人一天天瘦下去。解放后有一回演出，他唱到高处破了音，站在台上等观众轰他下去——台下却鼓起掌来，接着有人起了个头，全场唱起了军歌。</p><p>后来他戒烟。戒的那场戏，是整部电影里最狠的一次和解：他在地上打滚、发抖、要死要活，是菊仙抱着他。他在半昏迷里喊：</p><blockquote class="pg-quote"><p>娘，水都冻冰了。</p><cite>《霸王别姬》台词，程蝶衣</cite></blockquote><p>这是他被母亲切指那天说过的话。他把抱着他的这个女人，认成了妈。</p><p>我的判断：<strong>这一声「娘」，是他一辈子唯一一次向菊仙低头，也是菊仙一辈子唯一一次被这个家真正需要。</strong>两个抢同一个男人的人，在一个夜里，一个当了一会儿妈，一个当了一会儿儿子。天亮了，谁都不提。</p><p>他要的那个不散场的地方，戏台能给，生活不能。这是他所有悲剧的根，也是他最后那一剑的由来。</p><h2>段小楼（一）：少年小石头</h2><p>段小楼这个角色，很容易被看扁。观众记住的是他后来那一跪，于是骂他懦弱、骂他负心。可前半段的段小楼不是这样。</p><p>他唱花脸，工霸王。这一行要的是架子：山膀拉开，虎口撑圆，眼睛得能瞪住台下三千人。他从小练的就是这个「撑」字——撑住架子，撑住场面，撑住一院子师弟。</p><p>小豆子挨打，他替；小豆子想跑，他开门放他走，回头自己被师父打得满地找牙；师父往死里打小豆子，他冲上去推师父，喊「我跟你拼了」，被打得头破血流。少年段小楼身上有一股混不吝的义气，那是真霸王的东西。</p><p>注意，他的义气是有观众的。他护师弟，从来不当悄悄护，都是当着全院子的人护，喊出来，冲上去，血流在脸上给人看。<strong>他从小就在演一个英雄，而且演得很好。</strong></p><p>问题在这儿：一个人演久了，会分不清哪一下是自己，哪一下是架子。他后来在花满楼救菊仙，也是这个路子——跳下来我接，喝了酒我认，闹事我拿茶壶砸自己脑袋。做得漂亮，做得豪气，做得满堂彩。可他自己心里清楚，那是「一场戏」。</p><p>这句「那是戏」，是他和程蝶衣之间最深的一道沟。程蝶衣下了台还在戏里，他一下台就出来了。</p><h2>段小楼（二）：霸王是怎么一点一点漏气的</h2><p>他娶了菊仙，就不大练功了。菊仙劝他别唱戏，做点正经营生，他就在家玩蛐蛐。一个唱霸王的男人，白天蹲在院子里斗蛐蛐，这个画面比任何一场批斗都更能说明问题。</p><p>关师傅把他叫回科班，拿刀胚子抽他，一边抽一边骂他丢了功夫。老头打完人，自己唱了一段《林冲夜奔》，唱到一半，一头栽下去，死了。</p><p>师傅死了，戏班散了，靠山也没了。段小楼从此彻底变成一个要养家的人了：他和菊仙在街上摆摊卖西瓜，城管来了要跑，秤要藏，脸要放下来。</p><p>日本人那回，他倒是硬了一次。日本兵穿了他的戏服，他忍不了，砸了东西，被抓进去。这一下是真火气，也是真代价——他进去之后，是程蝶衣去给青木唱了一折《牡丹亭》，才把他换出来。</p><p>出来之后，他朝蝶衣脸上唾了一口。</p><p>这一口唾沫，是整部电影里段小楼最不体面的一刻。他嫌师弟给日本人唱戏脏，可他忘了自己是为什么出来的。他保住了「我有骨气」这个自我感觉，代价是让救他的人替他脏。<strong>很多人一辈子都在做这笔账：气节归自己，脏水归别人。</strong></p><p>他对菊仙也动过手。关师傅罚他的时候，菊仙护着他，说了句蝶衣也有错，他回手就是一个耳光，让她闭嘴。这一巴掌打得不重，意思很重——在这个家里，菊仙没有资格评论他和师弟的事。</p><p>1945 年日本投降，两人给国民党兵唱戏。台下拿手电筒往台上晃，起哄，往台上冲。段小楼出去讲理，说了一句大意是「连日本人都没这么闹过」。这句话捅了马蜂窝，兵们动了手。菊仙怀着孕挤进去拉他，被人推倒，孩子没了。</p><p>我的判断：<strong>段小楼不是突然变坏的，他是一件一件把「霸王」这件衣服脱下来的。</strong>每脱一次都有很具体的理由：要吃饭，要护家，要活命。这些理由单拿出来，哪一个都站得住。可加在一起，那个在院子里喊「我跟你拼了」的少年，就没有了。</p><p>他自己知道。所以他说了那句话：</p><blockquote class="pg-quote"><p>我是假霸王，你是真虞姬。</p><cite>《霸王别姬》台词，段小楼</cite></blockquote><p>这句话不是自嘲，是交代。他把自己这一辈子说清楚了：台上那三十分钟他是霸王，锣鼓一停，他就是段小楼，一个要吃饭、怕挨打、想活命的普通人。</p><h2>段小楼（三）：那一跪</h2><p>批斗会那场，段小楼跪下去，先咬的是程蝶衣。</p><p>这个顺序值得看。他先说蝶衣给日本人唱过堂会，再说蝶衣跟袁四爷有勾当——两件都是真的，两件都是最能把师弟钉死的事。说完了，他才转向菊仙，说她是妓女，说我不爱她，要跟她划清界限。</p><p>为什么先咬师弟？因为咬师弟是「表忠心」，咬老婆是「保自己」。他得先交一份大的，才有资格求一份小的。这个顺序不是慌里慌张排出来的，是一个人在那种场合里，脑子飞快算过的。</p><p>而他说「我不爱她」的时候，声音是喊出来的。喊得越大声，越像在说服自己。</p><p>对比一下程蝶衣。蝶衣被咬之后，反过来说段小楼，说得也狠；说到最后，他忽然把矛头转向菊仙，把她的出身当众揭开。这一下是纯粹的发泄——你抢了我的男人，我就让你在这个世上没有立足的地方。</p><p>菊仙站在人群里，听着这两个男人一个接一个地把她剥开。她这辈子拼命想洗掉的那层身份，被她丈夫和她丈夫的师弟，当着几千人的面，一层一层贴回她身上。</p><p>我的判断：<strong>这一跪不是一个人的软，是一整套机器压出来的标准动作。</strong>可也正因为是标准动作，才更该看清是谁在按头、谁在喊口号、谁在记笔录。把这一整套叫「天命」，等于让所有按过手的人回家睡觉。</p><h2>菊仙（一）：赤脚走出花满楼</h2><p>菊仙出场的时候，是花满楼的头牌。</p><p>这场戏拍得很热闹：一群嫖客把她围在楼上，逼她嘴对嘴喂酒。她不肯，一条腿跨到栏杆上，说要跳。底下的人起哄，说你跳啊。</p><p>她往下看了一眼，看见了段小楼。段小楼在楼下，没喊，也没劝，只是朝她招了招手。</p><p>她就跳了。跳得毫不犹豫，被他稳稳接在怀里。</p><p>这一跳是整部电影里最像「一见钟情」的一刻，也是最像「一场豪赌」的一刻。她不是被救的，她是自己选的——从二楼跳到一个男人怀里，跟从花满楼走到他家里，是同一个动作。</p><p>段小楼为了给她解围，拿果盘当酒碗，倒满酒，自己先喝了一半，把剩下的递给她，说今天是他俩定亲的喜日子。她接过来，一口气喝干了。客人不依不饶，他拿起茶壶，朝自己脑袋上砸下去。血顺着脸流下来，事情才算完。</p><p>对段小楼来说，这是一场逢场作戏。对菊仙来说，不是。</p><p>第二天，她去戏园看了他的《霸王别姬》。台上那个人，乌江边上，力拔山兮，宁死不渡。她坐在底下，看完了。</p><p>然后她回花满楼赎身。这一段拍得极干净：她把积蓄、首饰、钞票一样一样摊在桌上，铺了一块绣布。老鸨不松口，她就把头上的珠翠一件一件摘下来，放到布上。还不够，她弯腰把脚上的绣花鞋脱了，端端正正摆在桌上。</p><p>然后她赤着脚，走出了花满楼。</p><p>老鸨在她背后骂：你以为脸一抹就从良了？当过窑姐，一辈子都别想清白。</p><p>这句话后来应验了。</p><p>她赤着脚走到戏园后台，当着全戏班的人，对段小楼说：花满楼不留许过婚的人，我被赶出来了。然后她提出条件——你得当着戏班上下、老少爷们的面，先给我办定亲礼，我要堂堂正正进你段家的门。</p><p>段小楼把身上的大衣脱下来，披在她肩上。</p><p>程蝶衣从屋里出来，叫了一声「菊仙小姐」，然后拿出一双鞋，丢在她面前。</p><p>菊仙把鞋收了。她这辈子受过的羞辱比这重得多，一双鞋不算什么。她要的是名分，名分比脸重要。</p><p>我的判断：<strong>菊仙从头到尾不是被骗的，她是自己算过的。</strong>她算准了段小楼那天在花满楼是演戏，也算准了自己只能拿这场戏当赌注。她把全部身家、全部后路、连一双鞋都押上去了，押一个男人那天随口说的一句话。</p><h2>菊仙（二）：这个家里的外人</h2><p>进了段家的门，菊仙做的事情很实在：劝丈夫少唱戏，多攒钱，把日子过成日子。她不是不懂戏，她是不信戏——戏台上的霸王护不住一家人，米缸才能。</p><p>她在这个家里的位置很尴尬。名义上是段太太，实际上，段小楼心里那个位置一直坐着另一个人。她不闹，也不装看不见，她只是一次一次地把事情往「过日子」的方向拽：别跟他一般见识，别唱了，咱们做点小买卖。</p><p>她跟程蝶衣的关系，比对情敌复杂。情敌是抢男人，她们抢的是同一个人的两种活法。蝶衣要段小楼当霸王，她要段小楼当丈夫。这两个要求没法同时满足。</p><p>有一件事常被忽略：救蝶衣那次，是她出的力。段小楼去求袁四爷，袁四爷拿架子，不见；是菊仙把当年那把剑带过去，往桌上一放，暗示袁四爷和蝶衣的关系不清白，他这才松口。她救的是丈夫的师弟，也是丈夫心里那个人。她清楚得很，还是救了。</p><p>但她也讲条件。她要段小楼答应，把蝶衣救出来之后，两个人从此断绝来往，还立了字据。这张字据后来给蝶衣看了——蝶衣在牢里看到那张纸，才彻底死了心，上法庭一心求死。</p><p>这一手狠。可你得站在她的位置上想：她赌上全部身家换来的这个家，一直在被另一个人的一句话拆着。她不是要害蝶衣，她是要保住自己那点东西。</p><p>还有一场戏，把她这个人写透了。段小楼被关师傅按在凳子上打，她在旁边护，说蝶衣也有错，凭什么只打小楼。段小楼回手一个耳光。她捂着脸退到一边，没有再说话。</p><p>我的判断：<strong>全片最会办事的人是她，最没有台词的人也是她。</strong>她没有戏，只有手段；没有唱段，只有交易。她做的每一件事都对，可这个家从来没有真正给过她一个位置——她一直在门外，只是站得比别人近一点。</p><h2>菊仙（三）：一件嫁衣</h2><p>批斗会散了之后，菊仙做了一件很轻的事：她把从火堆里抢出来的那把剑，还给了程蝶衣。</p><p>这把剑她抢的时候是拼了命的，还的时候一句话也没多说。她大概明白，这东西从来不是她的，也不该是她的。</p><p>然后她回家，把当年出嫁的那件红嫁衣穿上，穿上红绣鞋，上了吊。</p><p>全片的死，都有仪式。虞姬死之前要舞一段剑、唱四句、把气口留足；袁四爷上刑场要迈着四方步；程蝶衣最后那一剑，是在空荡荡的剧场里，站着，抽刀，抹脖子。</p><p>只有菊仙没有。她只是换了一身衣服，把脚一蹬。</p><p>这个对比不是巧合。戏台上的人死，是演给台下看的；菊仙的死，没有台下。她这辈子唯一一次想当主角，是穿着嫁衣进门那天；最后一次穿这身衣服，是出门。</p><p>还有一个细节，值得停一下：她进段家门那天是赤着脚的，走的时候，鞋穿上了，人却挂在绳上。<strong>她这一辈子就想要一双合脚的鞋和一个正经的名分，最后都得到了，是用死得到的。</strong></p><p>我的判断：<strong>这出戏里所有人都有现成的戏文可以套，只有菊仙没有。</strong>她的死没有唱段，没有观众，没有人在底下叫好。她才是这个故事里唯一一个真的死掉的人——别人死得像虞姬，她死得像一个人。</p><h2>三个人：一个三角，三种活法</h2><p>把这三个人放在一起看，会发现这不是一个三角恋故事，是三种「怎么活」在打架。</p><p>程蝶衣要的是「不变」。说好一辈子就是一辈子，差一个时辰都不算。他要一个不会散场的地方，而这个地方只能是戏台。</p><p>菊仙要的是「日子」。有米、有炭、有男人、有孩子，能把今天过完，明天接着过。她所有的力气都用在把飘着的东西按到地上。</p><p>段小楼要的是「活」。他不算高尚，也不算卑鄙，他只想在每一个年份里都还有一口气、一口饭、一点体面。为了这个，他可以低头，可以跪，可以出卖，也可以在事后一个人蹲着不说话。</p><p>三个人的要求，单拿出来都不过分。放在一起，就必然有一个要被牺牲。<strong>这才是这个故事的悲剧结构：不是坏人害了好人，是三种都合理的活法，在一个不容许并存的年代里撞上了。</strong></p><p>还有一层，很少有人说：程蝶衣和菊仙其实是同一种人。</p><p>两个人都把自己全部押在一个男人身上，都没有留后路，都在被抛弃之后选择去死。区别只在于，一个会唱戏，一个不会。</p><p>所以一个有台词，一个没有。一个死成了千古绝唱，一个死成了厨房梁上的一根绳。</p><p>我的判断：<strong>这部片子最不公平的地方，不在时代，在这儿。</strong>同样是把自己交出去的人，会演戏的那个被记住了，不会演戏的那个被忘了。菊仙一辈子没上过台，可她的活法比谁都更像一个人。</p><h2>那把剑</h2><p>全片有一件东西，比所有人都硬：那把剑。</p><p>它第一次出现是在张公公府上。小豆子和小石头被叫去唱堂会，在屋里看见这把剑。段小楼拿起来看，说了一句大意是：霸王要是有了这把剑，早就把刘邦宰了。孩子把戏文当真，以为一把好剑能改结局。</p><p>这把剑在片子里换过几回手，从旧王府流到梨园行，从梨园行流到袁四爷手里，又到了蝶衣手上。它跟着这两个人走了三十多年。</p><p>文革那场批斗，段小楼慌乱之中把剑扔进了火堆。是菊仙冲过去，从火里把它抢了出来。</p><p>最后，十一年后，两个人在空荡荡的体育馆里重新排戏。剑挂在段小楼腰上。蝶衣抽出来，抹了脖子。</p><p>我的判断：<strong>全片只有这把剑是真的。</strong>戏是假的，妆是假的，霸王是假的，掌声也是假的，只有这块铁是真的，能割开皮肉，能要人的命。</p><h2>袁四爷：全片最懂戏的人</h2><p>葛优演的袁世卿，人称袁四爷，是民国剩下的那批没落贵族，也是北平梨园的霸主。他第一次出场，是在段小楼和程蝶衣一折《别姬》满堂彩之后，到后台来，说是「一点薄礼」。</p><p>盒子打开，是一整套珍珠钻石头面。戏院经理在旁边咋舌，说当年老佛爷赏戏也没这样的手面。</p><p>袁四爷是冲着程蝶衣来的，这一点他不遮。他请蝶衣「舍下小坐」，段小楼替师弟挡了，语气很硬；蝶衣也推了。袁四爷没有再纠缠，脱帽，躬身，退出去，一句废话没有。</p><p>这一退，把这个人物立住了。他不是那种被拒了就翻脸的暴发户，他有的是耐心，也有的是把握——他认定这只鸟飞不走。</p><p>他懂戏，懂到什么程度？段小楼在台上走霸王回营那几步，他在底下数着，事后跟人争：应当走五步还是七步。段小楼回他一句「那是戏」。</p><p>这四个字，是两个人一辈子的分界。在段小楼那儿，戏是戏，走几步无所谓；在袁四爷和程蝶衣那儿，走几步就是道，错一步就不对。<strong>袁四爷在戏上是真霸王，在做人上是假霸王。</strong></p><p>段小楼和菊仙定亲那天，蝶衣一个人坐在后台，妆没卸，头发散着。袁四爷来了，手里拿着一双翎子，从镜子里递进去：这双翎子是从活雉鸡的尾巴上生生收取的，当真是难得。</p><p>这句话表面说翎子，实际说人，也说他自己的这份心。从活的东西身上硬取下来的美——这个意象，把这三个人后来的事都说尽了。</p><p>蝶衣去了袁府。在那儿他看见了那把剑。袁四爷说，此剑是张府败落时费了大周折弄到手的；又说，你我之间不言钱字，那个字眼实在不雅。然后他问了一句：你愿做我的红尘知己吗？</p><p>蝶衣拿了剑。当天夜里，他在袁府院子里，画着霸王的妆，拿着真剑，唱「君王意气尽，贱妾何聊生」，唱到拔剑，真的要往脖子上抹。是袁四爷扑过来喊住他：别动，那是真家伙。</p><p>我的判断：<strong>袁四爷是这部片子里唯一真正懂得程蝶衣的人，可他懂的只是台上的那个。</strong>他爱的是虞姬，不是那个会疼、会怕、会在地上打滚戒烟的活人。所以他能救下那一剑，却救不了这个人。</p><p>日军占领北平那场戏，戏院里挂着「大东亚共荣」的条幅，蝶衣在台上唱《贵妃醉酒》。抗日传单从顶上撒下来，灯灭了，观众往外跑，全场只有两个人没动：台上那个继续走身段的，和楼上包厢里那个一直看着的。</p><p>灯再亮起来的时候，是袁四爷一个人在鼓掌。</p><p>战后审汉奸，检察官把《牡丹亭·游园》说成「淫词艳曲」。袁四爷站起来，先慢慢把话重复了一遍，然后猛拍栏杆，四个字：实为大谬。他问，这折戏是国学里最精粹的东西，怎么到了你嘴里就成了淫词？到底是谁在辱我民族精神？</p><p>这一段赢得满堂掌声。他这辈子没干过什么正事，就这一回，站在了大节上。</p><p>解放后，他被定为「反动戏霸」，押去枪毙。临走的时候，他昂着头，迈的是四方步——戏台上霸王出场的那种步子。</p><p>这不是编剧编的。芦苇说过，武汉枪毙一个姓高的戏霸，那人赴刑场时就是迈着台步走的。</p><p>我的判断：<strong>袁四爷死得比段小楼体面，可他也没懂过任何人。</strong>他把一辈子都用来收藏一种美，最后连自己的死也做成了收藏品。这个人身上最动人的地方和最冷的地方，是同一处：他什么都能欣赏，什么都不真的在乎。</p><h2>那坤与张公公：两个过道里的人</h2><p>那坤是戏园子的经理，英达演的。这个人没有立场，只有生意；不得罪谁，也不真帮谁。</p><p>小豆子那一夜，是他牵的线——他带着张公公府上的人到科班来选戏，让这群孩子一个个唱，唱得好的挑走。他站在旁边，脸上堆着笑，谁也不看。</p><p>后来段小楼去求袁四爷救蝶衣，还是他跟着去的。他在旁边看眼色，什么话该说，什么话该咽，掐得极准。菊仙一提到「记者」，他立刻由站改成坐，脸上的笑收了一半——他知道事情要成了。</p><p>我的判断：<strong>这种人不是恶人，他是通道。</strong>所有脏东西都得从他这儿过，可他手上从来不沾血。事成之后他也不邀功，只说一句「都是一家人」。历史上大部分坏事，都是这样从一条干净的通道里流过去的。</p><p>张公公是另一路。前清的宦官，府里还能摆堂会，还能挑戏。那一夜之后，他在电影里消失了很久。</p><p>再出现是 1948 年。解放军要进城了，程蝶衣在戏园子门口，看见台阶上坐着一个卖烟的老头，蓬头垢面，衣服褴褛，眼神是散的。他认出来了——就是当年那个人。</p><p>老头不认识他了。</p><p>这一笔电影没有多给一个镜头，也没有让蝶衣说一句话。它就那么过去了。</p><p>我的判断：<strong>这是全片最像报应的一处，可它不是天报的。</strong>没有雷劈，没有病亡，就是一个朝代完了，靠它吃饭的人跟着完。张公公不是被谁惩罚的，他是被时间留在原地了。</p><p>而程蝶衣看见他的时候，脸上没有恨，也没有痛快。这一点比恨更狠——那个人连让他恨的分量都没有了。</p><h2>四十年，五次换幕</h2><p>这部电影的时间跨度，从 1924 年小豆子被送进科班，到文革结束后的重逢，五十多年。城里换过五次主人，每一次，戏的处境都不一样。</p><div style="overflow-x:auto;margin:20px 0"><table style="width:100%;border-collapse:collapse;font-size:14.5px;line-height:1.7"><thead><tr><th style="text-align:left;padding:9px 10px;border-bottom:1.5px solid var(--line,#d8d3c8);font-weight:600;width:10%">年份</th><th style="text-align:left;padding:9px 10px;border-bottom:1.5px solid var(--line,#d8d3c8);font-weight:600;width:24%">城里是谁的天下</th><th style="text-align:left;padding:9px 10px;border-bottom:1.5px solid var(--line,#d8d3c8);font-weight:600;width:33%">戏的处境</th><th style="text-align:left;padding:9px 10px;border-bottom:1.5px solid var(--line,#d8d3c8);font-weight:600;width:33%">程蝶衣</th></tr></thead><tbody><tr><td style="padding:9px 10px;border-bottom:1px solid var(--line,#e6e2d8);vertical-align:top">1924</td><td style="padding:9px 10px;border-bottom:1px solid var(--line,#e6e2d8);vertical-align:top">北洋政府，军阀混战</td><td style="padding:9px 10px;border-bottom:1px solid var(--line,#e6e2d8);vertical-align:top">科班还有生意，堂会是活路</td><td style="padding:9px 10px;border-bottom:1px solid var(--line,#e6e2d8);vertical-align:top">被母亲切指，进科班</td></tr><tr><td style="padding:9px 10px;border-bottom:1px solid var(--line,#e6e2d8);vertical-align:top">1937 后</td><td style="padding:9px 10px;border-bottom:1px solid var(--line,#e6e2d8);vertical-align:top">日军占领北平</td><td style="padding:9px 10px;border-bottom:1px solid var(--line,#e6e2d8);vertical-align:top">日本人懂戏，也懂怎么侮辱人</td><td style="padding:9px 10px;border-bottom:1px solid var(--line,#e6e2d8);vertical-align:top">给堂会唱《牡丹亭》，战后被控汉奸</td></tr><tr><td style="padding:9px 10px;border-bottom:1px solid var(--line,#e6e2d8);vertical-align:top">1945 后</td><td style="padding:9px 10px;border-bottom:1px solid var(--line,#e6e2d8);vertical-align:top">国民政府接收</td><td style="padding:9px 10px;border-bottom:1px solid var(--line,#e6e2d8);vertical-align:top">戏照唱，审也在审</td><td style="padding:9px 10px;border-bottom:1px solid var(--line,#e6e2d8);vertical-align:top">法庭上一句「青木要是活着，京戏就传到日本去了」</td></tr><tr><td style="padding:9px 10px;border-bottom:1px solid var(--line,#e6e2d8);vertical-align:top">1949 后</td><td style="padding:9px 10px;border-bottom:1px solid var(--line,#e6e2d8);vertical-align:top">解放军进城</td><td style="padding:9px 10px;border-bottom:1px solid var(--line,#e6e2d8);vertical-align:top">戏照唱，但听戏的人换了</td><td style="padding:9px 10px;border-bottom:1px solid var(--line,#e6e2d8);vertical-align:top">烟抽坏了嗓子，唱破了音，台下鼓掌唱军歌</td></tr><tr><td style="padding:9px 10px;border-bottom:1px solid var(--line,#e6e2d8);vertical-align:top">1966 后</td><td style="padding:9px 10px;border-bottom:1px solid var(--line,#e6e2d8);vertical-align:top">文革</td><td style="padding:9px 10px;border-bottom:1px solid var(--line,#e6e2d8);vertical-align:top">戏被踩在地上，人也是</td><td style="padding:9px 10px;border-bottom:1px solid var(--line,#e6e2d8);vertical-align:top">批斗、揭发、互相咬</td></tr></tbody></table></div><p>表格里最少人提的是 1949 年那一格。解放军进城后，两位名角被请去唱《霸王别姬》。蝶衣的嗓子被大烟毁了，唱到高处破了音。他站在台上等着被轰下去，台下却响起一片掌声，接着有人起了个头，全场唱起了军歌。</p><p>这场戏的分量在于：他们不是来听戏的。他们坐在那里，是因为需要看一场「旧社会的玩意儿」被新社会收下。虞姬死在台上，台下唱的是另一支曲子。</p><p>我的判断：<strong>时代这一层，「敌不过」是真的。</strong>段小楼在批斗会上跪下那一刻，不是他一个人软，是整台机器压下来，个人的骨头顶不住。这一点不能含糊。</p><h2>批斗会：台词的作者是谁</h2><p>文革那场戏，芦苇说过来路。他做调研时翻到的材料里，有一件是文艺界人士在北京国子监被游街的往事。他把它挪进了电影：火堆、高帽、牌子、口号，两个角儿跪在中间，被逼着互相揭发。</p><p>这场戏里最狠的地方，不是打。是让人自己开口。</p><p>段小楼先揭发蝶衣，说他给日本人唱过堂会，说他跟袁四爷有勾当；再说菊仙是妓女，说自己不爱她，要跟她划清界限。蝶衣被逼到墙角，反过来说段小楼。两个人你一句我一句，把三十年的私事一件件倒在火堆前。</p><p>然后蝶衣说了一句：</p><blockquote class="pg-quote"><p>连楚霸王都跪下来求饶了，京戏能不亡吗？</p><cite>《霸王别姬》台词，程蝶衣</cite></blockquote><p>这句台词把整部电影的逻辑挑明了：京戏亡不亡，不在天，在霸王跪不跪。霸王是段小楼。跪是他自己跪的。</p><p>我的判断：<strong>这场戏里没有一件东西是天给的。</strong>牌子是人写的，火是人点的，头是人按下去的，话是人一句一句逼出来的。把它叫「天命」，等于把这一屋子人的手都擦干净了。</p><h2>捡回来的孩子</h2><p>还有一个人物是电影新加的，小说里没有：小四。</p><p>小豆子还没成角儿的时候，有一回在街上看见一个弃婴，襁褓裹着，扔在路边。他要抱回来，关师傅拦他，说了一句：一个人有一个人的命。他还是抱了。</p><p>这孩子后来叫小四。关师傅死后戏班散了，一院子徒弟各奔东西，只有一个半大孩子跪在院子里不肯走。段小楼劝他回家，他说，我是从小被捡回来的，没家。</p><p>两个人才知道，这就是当年那个襁褓。</p><p>蝶衣收了他做徒弟，教他戏，也打他——用的还是当年师父那一套：耗腿、下腰、念错一个字一板子。他把自己受过的那一套，原样传了下去。<strong>这是他这辈子唯一一次当权，而他当权的方式，是复制那个打他的人。</strong></p><p>1949 年以后，戏要改。小四是最早跟上的一批：他要改唱腔，要演新戏，说戏本来就是给台下的人看的，台下的人换了，戏就得换。这话不算错，甚至比蝶衣的道理更合时宜。</p><p>蝶衣的道理是「情境」：台上空无一物，两三个龙套走过去就是千军万马，靠的是角儿身上那一点东西。这一点东西，一改就没有了。</p><p>两种道理撞上，谁也说不动谁。后来小四不再争了，他直接动手——他抢了虞姬的角色，穿上蝶衣的行头，站到台上，和段小楼唱了一出没有程蝶衣的《霸王别姬》。</p><p>段小楼当场罢演。蝶衣反而劝他上台，说这是大局。他自己站在侧幕后面，看着自己的徒弟穿着自己的行头，唱自己的戏。</p><p>再往后就是批斗会。小四站在人群里，指着师父，喊得比谁都响。</p><p>这一笔是整部电影里最冷的安排。蝶衣这辈子受的苦，绝大多数来自他控制不了的东西：母亲的刀、师父的板子、日本人的枪、红卫兵的皮带。只有一件是他自己招来的——他救了一个孩子。</p><p>我的判断：<strong>天没有安排小四，是蝶衣在街上把他抱回来的。</strong>你救一个人，救出来的是一个你完全不知道会长成什么的人。这件事上，没有天，只有手。</p><p>但这一层也不能推得太远。他抱孩子的时候二十岁不到，没人告诉他将来会这样；他教戏的时候，教的也是自己唯一会的那套办法。善举的后果，从来轮不到做善举的人计算。所以「敌不过」在这里又成立了一次——不是天太强，是因果太长。</p><h2>天命的三层</h2><p>「天命」这两个字，在《霸王别姬》里其实裹着三样完全不同的东西。不拆开，这句话就没法称重量。</p><p>第一层是戏本。虞姬必须死，因为戏是这么写的。这一层是人写的，写于 1922 年，改过好几稿，作者有名字，齐如山、吴震修，再往上是沈采和司马迁。</p><p>第二层是时代。1924 到 1977 的中国，一个唱戏的人，改不了城头上挂谁的旗，改不了哪一年开始烧戏服。这一层确实轮不到个人做主，压下来的时候，谁都躲不开。</p><p>第三层是性格。程蝶衣认定了一件事：唱了虞姬，就得是虞姬；说了一辈子，就得是一辈子，差一个时辰都不算。这个念头不是天给的，是他自己在挨打、受辱、被成全的过程里长出来的。</p><p>我的判断：<strong>三样东西混在一个词里，称不出各自的重量。</strong>混着说的时候，人很容易把第二层的无力感，顺手盖到第一层和第三层上——于是戏本不用改，性格也不用改，反正都是天。</p><h2>替「天命」说一句</h2><p>上面这些话，很容易滑到一个难看的结论：既然都是人做的，那就是他自己不争气。这个结论我不接受，得先把最强的反驳摆出来。</p><p>第一，把悲剧归给性格，是二次伤害。程蝶衣在批斗会上的每一句话，都不是他愿意说的。他不想揭发段小楼，他不想说菊仙，他甚至不想活到那一天。指着这样的人说「是你性格有问题」，等于往伤口上再按一下。</p><p>第二，菊仙的死，跟她什么性格没关系。她做对了每一件事：赎身、嫁人、护丈夫、救那把剑。她还是死了。如果非要给她的死找一个「性格原因」，那就是在替那间屋子开脱。</p><p>第三，「敌不过天命」这句话，对受苦的人有一种实际的用处。它是一种保住尊严的说法：不是我不好，是天太大。人被打趴下的时候，需要这句话撑着，否则连爬起来的那点力气都没有。</p><p>这一层是真的。所以我不打算把这句话整个否掉。<strong>它是一句有用的、体面的、也常常是唯一能说出口的话。</strong></p><h2>这句话的副作用</h2><p>但它有副作用，而且副作用落在别人身上。</p><p>「天命」一旦成立，就没有人需要负责。牌子谁写的？火谁点的？谁按着蝶衣的头，让他跪在碎砖上？谁把菊仙的头发剃了一半？这些问题，一句「天意」就全糊过去了。</p><p>文革不是天灾。它没有下雨，没有地震，没有一条河改道。它是具体的人在具体的年份，用具体的办法，一件一件做出来的。芦苇说的那句「每个细节和情景都有出处」，本身就是这个意思：他写的是真事，真事有人做。</p><p>我的判断：<strong>把历史的暴力叫成天命，是给施暴者递一块遮羞布。</strong>受苦的人说这句话，是自救；旁观的人替他说这句话，就是替凶手关门。这两件事听起来一样，性质完全相反。</p><p>这也是司马迁当年骂的。他骂项羽「尚不觉寤而不自责」，不是骂他打了败仗——胜败乃兵家常事，他夸项羽「近古以来未尝有也」；他骂的是项羽到死不肯认账。认账，是负责的第一步。</p><h2>编剧的答案</h2><p>芦苇谈过这部电影的主题，说得直白得近乎粗暴：</p><blockquote class="pg-quote"><p>《霸王别姬》小说的主题可以说是苟且、是屈从。电影主题是不屈、是反抗。</p><cite>芦苇，南方人物周刊访谈</cite></blockquote><p>这句话值得反复看。他不是在说电影比小说高级，他是在说：<strong>这两个文本对同一件事的判断，是相反的。</strong>小说写的是一个人怎么被磨平、最后跟世界和解；电影写的是一个人怎么被磨碎，但到死没服。</p><p>他还讲过一句方法上的话：「人物决定结果，而不是结果决定人物。」意思是，程蝶衣最后会死，不是因为他命该如此，是因为他是那样一个人——你把这样一个人放进那几十年里，他只能走到那一步。</p><p>这句话跟「天命」的区别很细，但很关键：一个是「他是这样的人，所以必然这样」，一个是「天要他这样，所以他这样」。前者的作者是人物自己，后者的作者是天。</p><p>芦苇做调研的时候，翻的是真人的事。他说程蝶衣身上有言慧珠的影子——那位京剧名角文革中上吊，死的时候一身盛装，穿着旗袍，把自己最漂亮的衣服穿上了。他还说，袁四爷被枪毙时迈着戏步走向刑场，是武汉枪毙一个姓高的戏霸时的真事。</p><figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV164411k7eR" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV164411k7eR&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>汪海林对话芦苇。这位编剧谈《霸王别姬》的写法，反复强调的是「有出处」三个字——每一场戏都得能在现实里找到对应的人和事。</figcaption>
</figure><p>我的判断：<strong>这些细节都是从真事里抄来的，所以这部电影的悲剧不是天写的，是人一件一件做出来的。</strong>言慧珠穿上旗袍，高姓戏霸迈着台步，都是人在最后一刻自己选的动作。</p><h2>两个结尾</h2><p>小说和电影，结尾完全不是一回事。</p><p>李碧华的原著 1985 年出版（更早是 1981 年的电视剧本）。书的结尾在八九十年代的香港：段小楼早年偷渡过去，开电车为生；程蝶衣作为北京京剧团的艺术指导，随团到香港演出。两个年过花甲的老人在澡堂重逢，说起菊仙，段小楼说，我跟她的事都过去了，你别怪我。</p><p>然后他们又上了一次妆，唱了一遍《霸王别姬》。蝶衣在戏里拔剑自刎——但他没有死。书里写：</p><blockquote class="pg-quote"><p>“师弟！”小楼摇撼他：“戏唱完了。”蝶衣惊醒。戏，唱，完，了。灿烂的悲剧已然结束。华丽的情死只是假象。他自妖梦中，完全醒过来。是一回戏弄。太美满了！强撑着爬起来。拍拍灰尘。嘴角挂着一朵诡异的笑。“我这辈子就是想当虞姬！”他用尽了力气。再也不能了。</p><cite>李碧华《霸王别姬》结尾</cite></blockquote><p>蝶衣活着回了内地。段小楼留在香港。两个人从此没再见过。</p><p>电影把这个结局拿掉了。芦苇在访谈里说得干脆：小说是大团圆，程蝶衣不但跟社会和解了，还结了婚，后来还跑到香港演出，「在电影里面都没有，坚决拿掉了」。他给的理由是，程蝶衣这样的人，必然是这个结局。</p><p>这里还有一件更麻烦的事：今天市面上流通的《霸王别姬》小说，很多并不是 1985 年那一版。李碧华在电影出来之后，按着电影的内容又重写过一版，篇幅翻了一倍，把大量电影情节放了进去。芦苇说，最早那个版本印刷量很小，后来在市场上就不见了。</p><p>我的判断：<strong>连「原著」都不是原的。</strong>这部作品的文本，从小说到电视剧到电影再到新版小说，一直在被人改写。所谓「原本的结局」，本身就是一个被覆盖过好几层的东西。</p><h2>错了，又错了</h2><p>结尾那场戏，台词极短。十一年后，两个人被允许再排一次戏，在空荡荡的体育馆里。段小楼起头，唱的是《思凡》：</p><p>段小楼：「小尼姑年方二八。」<br>程蝶衣：「正青春被师父削去了头发。」<br>段小楼：「我本是男儿郎。」<br>程蝶衣：「又不是女娇娥。」<br>段小楼：「错了，又错了。」</p><p>把这段对话拆开看，会看到一个很怪的地方：段小楼起的头，是「我本是男儿郎」——这是错的那一版。蝶衣顺着接「又不是女娇娥」，也是错的那一版。两个人用的都是错版，段小楼却说「错了」。</p><p>为什么？因为在戏里，「我本是男儿郎」是那个永远念不对的句子。它一出口，就自动等于「错」。三十多年了，只要听见这半句，下一个反应就是挨打。</p><p>然后蝶衣做了一件事。他把这半句错词，一个字一个字地，重新念了一遍：</p><blockquote class="pg-quote"><p>我本是男儿郎，又不是女娇娥。</p><cite>《霸王别姬》结尾，程蝶衣</cite></blockquote><p>这是他第一次主动把这句错版完整地说出来。以前每次说出口都是意外，这次是他自己说的。</p><p>我的判断：<strong>他念对的是错版。</strong>「女娇娥」是别人一句一句打进去的，「男儿郎」是他自己的。他在最后一刻认领的是后者，然后抽剑。</p><p>所以那个结尾不是「服从剧本」，恰恰相反——剧本要他演虞姬，他偏要在临死前把词改回自己。<strong>他不是被天命打败的，他是把最后一页从别人手里抢过来，自己写了一个字。</strong>代价是全条命。</p><figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1uPjr6zEcc" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1uPjr6zEcc&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>一个反面的读法：有论者认为《霸王别姬》用个人情感承接了历史创伤，把结构性的账算成了私人恩怨。这个批评不完全成立，但它指出的问题是真的，值得听。</figcaption>
</figure><h2>演员的身体</h2><p>这部电影里，有一件事是没法作假的：身体。</p><p>张国荣不是戏曲演员。开拍前他提前到北京学戏，形体指导是张曼玲和刁丽，一个身段一个身段地抠，走位按老派的路子来，尽量保留梅派的原样。片中的唱段由男旦温如华配唱，身段和做工是他自己的。</p><p>有报道记过一个细节：他每天上午到北影厂练四个小时，回酒店接着练；发烧到三十八度九，还在压腿。《贵妃醉酒》里那个「舒广袖」的旋舞卧鱼，一般要刀马旦的底子才拿得下来，片中是他自己一气做完的，没有靠剪辑拼接。</p><p>还有上妆。京剧的片子贴上脸，一贴十几个小时不能动，他为了不让片子脱落，宁可挨饿。妆一上，他就不说话了。</p><figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1Nt411r7rC" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1Nt411r7rC&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>《霸王别姬》幕后拍摄现场。这些镜头里能看到演员怎么被按在练功房里，一遍一遍磨同一个动作——片子里的功夫，是这么来的。</figcaption>
</figure><p>我的判断：<strong>这是全片唯一无法表演的部分。</strong>台词可以背，眼泪可以点，但腿压不下去就是压不下去，卧鱼转不起来就是转不起来。观众未必懂戏，可身体骗不了身体。</p><p>张国荣演的是「人戏不分」，而他自己用的办法，是先让自己的身体真的会一点。这件事和程蝶衣的命运构成一个刺人的对照：一个是被打成的，一个是自己练成的。</p><h2>1993 年的坐标</h2><p>1993 年 5 月 24 日，第 46 届戛纳电影节闭幕。二十三部片子争金棕榈，最后是两部并列：陈凯歌的《霸王别姬》和简·坎皮恩的《钢琴课》。这是戛纳十一年来第一次全票通过、把最高奖同时给两部电影。</p><figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1Jx411V7DT" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1Jx411V7DT&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>1993 年戛纳颁奖现场。这是华语电影第一次，也是至今唯一一次拿到金棕榈。</figcaption>
</figure><p>之后是金球奖最佳外语片、英国电影学院奖最佳外语片，还有奥斯卡最佳外语片提名。三十多年过去，它仍然是唯一一部拿到金棕榈的华语片。</p><p>在国内，它的位置更特殊。豆瓣评分 9.6，长期排在华语片最前面；各种「必看」榜单上，它几乎不会缺席。这个位置高到有点可疑——一部电影被叫好三十年，通常说明它已经不太被人真的看了，只是被供着。</p><p>也有另一种读法。有人批评它是「伤痕文学」的路子：用两个伶人的私人情感，承接一整个时代的创伤，把制度性的账，算成了个人的恩怨和背叛。这个批评有它的道理——片子里最动人的部分，确实是菊仙上吊、师兄弟反目这些私人的场面，而不是任何一场关于制度的正面交锋。</p><p>我的判断：<strong>这个批评不完全成立，但它指出的问题是真的。</strong>片子确实把大历史收进了一个小院子，可它也恰恰因此让人看见了历史落在具体人身上的重量。至于这算不算「转移矛盾」，取决于你相信哪一种讲述更有用。</p><h2>分层的答案</h2><p>回到那句感叹：人纵有万般能耐，终也敌不过天命。</p><p>这句话对了一半。</p><p>对的一半，是时代那一层。1924 到 1977 的中国，个人的「能耐」确实拗不过。段小楼一身功夫，跪下去也就一秒钟；菊仙再能干，一条绳子就够了。这一层的重量，不应该被任何漂亮话减轻。</p><p>错的一半，是把三层混成了一层。戏本是人写的，可以改；性格是自己长的，可以认；只有时代那一层，才配叫「敌不过」。三样混着叫天命，就等于把可以改的那两样也一起交出去了。</p><p>所以我的版本是这样一句：<strong>天命是别人写好的剧本，但剧本一直在改，改的人里也有你。</strong></p><p>这句话听着像励志，其实更冷。因为「你也能改」的另一面是：改坏了，你也得认。程蝶衣最后改了一个字，代价是命。这不是一个让人舒服的结论，但它是这部片子真正演出来的东西。</p><p>还有一点得补上。我们今天说「敌不过天命」，比项羽那时候说，条件已经好太多。项羽说「天之亡我」，是在乌江边，身边只剩二十六个人；我们说这句话，大多是在一个还算安稳的下午，看完一部电影，心里堵了一下。这两句话字面一样，重量差着两千年。</p><p>片子最后，舞台上的灯灭了，人散了，那把剑留在那儿。铁打的，冷的，谁都能拿起来，谁都得自己承担拿起来之后的事。</p><h2>参考</h2><ul class="pg-refs"><li><a href="https://so.gushiwen.org/guwen/bookv_46653FD803893E4FCF9460F318F1DD753A89E82A9890C60F.aspx" target="_blank" rel="noopener">《史记·十二本纪·项羽本纪》原文（司马迁）</a><span class="src"> · 原文</span></li><li><a href="https://gongchepu.net/reader/1274/export/lyrics" target="_blank" rel="noopener">《孽海记·思凡》唱词（据崑曲工尺譜数字化本）</a><span class="src"> · 原文</span></li><li><a href="https://epaper.gmw.cn/zhdsb/html/2023-05/10/nw.D110000zhdsb_20230510_1-12.htm" target="_blank" rel="noopener">戏里戏外的冯耿光与梅兰芳（光明日报，2023-05-10）</a><span class="src"> · 报道</span></li><li><a href="https://paper.people.com.cn/fcyym/html/2018-03/23/content_1850218.htm" target="_blank" rel="noopener">霸王别姬（人民日报《讽刺与幽默》，2018-03-23）</a><span class="src"> · 概念</span></li><li><a href="https://www.centv.cn/p/459928.html" target="_blank" rel="noopener">《京剧》选读：霸王别姬（中国教育网络电视台）</a><span class="src"> · 概念</span></li><li><a href="https://news.cntv.cn/china/20120523/111549.shtml" target="_blank" rel="noopener">1993 年 5 月 24 日《霸王别姬》获戛纳电影节金棕榈奖（央视网，2012-05-23）</a><span class="src"> · 报道</span></li><li><a href="https://movie.douban.com/subject/1291546/" target="_blank" rel="noopener">《霸王别姬》（豆瓣电影条目：片长、上映日期、编剧、获奖）</a><span class="src"> · 数据</span></li><li><a href="https://www.nfpeople.com/index.php/article/12072" target="_blank" rel="noopener">中国电影有了新的问题——对话芦苇（南方人物周刊）</a><span class="src"> · 评论</span></li><li><a href="https://static.nfnews.com/content/202211/22/c7098437.html" target="_blank" rel="noopener">《霸王别姬》编剧芦苇：中国电影合格的剧本不多（南方周末，2022-11-22）</a><span class="src"> · 评论</span></li><li><a href="https://heilan.com/forum/forum.php?mod=viewthread&tid=61270" target="_blank" rel="noopener">芦苇谈编剧：秘密就是两箱书（访谈）</a><span class="src"> · 评论</span></li><li><a href="https://www.peopleapp.com/rmharticle/30024512534" target="_blank" rel="noopener">《霸王别姬》中的经典句子（人民日报人民号）</a><span class="src"> · 概念</span></li><li><a href="https://wap.xinmin.cn/content/19508620.html" target="_blank" rel="noopener">风华绝代：《霸王别姬》经典台词汉译英（新民晚报）</a><span class="src"> · 概念</span></li><li><a href="https://ex.chinadaily.com.cn/exchange/partners/82/rss/channel/language/columns/v0m20b/stories/WS5d7c3b90a310cf3e3556b699.html" target="_blank" rel="noopener">70 年了，从《大闹天宫》到《霸王别姬》（中国日报网）</a><span class="src"> · 报道</span></li><li><a href="https://fashion.ettoday.net/news/1337849" target="_blank" rel="noopener">《霸王别姬》8 大经典台词（ETtoday，2018）</a><span class="src"> · 报道</span></li><li><a href="https://culture.china.com/art/screen/11170651/20220307/41567492_all.html" target="_blank" rel="noopener">电影里那些令人印象深刻的戏曲表演（中华网文化，2022-03-07）</a><span class="src"> · 报道</span></li><li><a href="https://m.sohu.com/n/416959487" target="_blank" rel="noopener">22 年了，整个中国最牛逼的电影，还是《霸王别姬》（搜狐，2015）</a><span class="src"> · 报道</span></li><li><a href="https://www.harpersbazaar.com/tw/culture/filmandmusic/g25341599/farewell-my-concubine-leslie-cheung/" target="_blank" rel="noopener">从《霸王别姬》10 句经典金句看张国荣（Harper’s BAZAAR 台湾）</a><span class="src"> · 概念</span></li><li><a href="https://m.sohu.com/a/196045845_821248/" target="_blank" rel="noopener">一个假霸王，两个真虞姬（搜狐）</a><span class="src"> · 评论</span></li></ul>`
  },
  {
    id: "post-250",
    title: "人不是老了才会死",
    date: "2026-11-03",
    updated: "2026-11-03",
    cat: "日常",
    tags: ["随笔", "身体"],
    cover: "",
    pinned: false,
    excerpt: "2026 年中秋，刘欢去世，63 岁。三年前他刚退休，九个月前还在零下的户外舞台上说了句「风好大」。死亡不是一件等在老年的事，它分布在每一天里。",
    content: `<p>2026 年 9 月 25 日，中秋。上午 9 点 52 分，上海，一个人去世了，63 岁。</p><p>他叫刘欢。第二天，对外经贸大学发了讣告：该校退休教师、音乐家，因病逝世。遵照生前遗愿，丧事从简，不成立治丧委员会，不举行遗体告别仪式和追悼会。</p><p>那天是中秋。月亮最圆的一天。</p><p>往前推九个月。2026 年 1 月 1 日凌晨，上海金山，B 站跨年晚会的户外舞台，气温零下。他裹着深色外套走上去，脖子缩着，肩膀在风里发抖。开口之前，先说了三个字：</p><p>风好大。</p><p>那是他最后一次在大型舞台上公开演唱。</p><p>再往前推三年。2023 年 9 月，他从对外经贸大学退休。在那所学校教了三十多年《西方音乐史》，退休时 60 岁。</p><p>两年后，人没了。</p><p>这篇文章不打算讲「珍惜生命」这种话，那四个字已经被说得没有内容了。它想算一笔账：我们从小被教的那套「先苦后甜」，到底是怎么运作的，又在哪些地方骗了我们。</p><h2>我们是怎么读这条新闻的</h2><p>一条名人去世的新闻，多数人读完的过程是这样的：</p><p>第一反应是可惜，才 63。第二反应是找一个解释——他腿不好很多年了，2009 年就确诊股骨头坏死，2010 年换过人工髋关节。第三反应是把手机往下滑。</p><p>这三个动作里，第三个最诚实，第二个最有用，也最危险。</p><p>找一个解释，是为了把自己摘出来。他有旧病，我没有；他早年受过伤，我没有；他那个年代的人不懂保养，我懂。这些话说出口的时候，听的人心里会松一口气：原来是有原因的，有原因就说明可以避开，可以避开就说明我不会。</p><p>刘欢这条新闻不好解释。讣告只写了「因病逝世」，没有交代具体病因。股骨头坏死本身不是致死性疾病，最坏的结果是长期行走困难、肢体残疾。所以那套「找出一个原因，然后确认自己安全」的流程，在这里卡住了。</p><p>卡住的时候，人就会换一套说法：63 岁，也算活够了吧。</p><p>这句话更值得警惕。它把死亡重新安排回了「老」这个位置上——63 岁，勉强算老，所以还算合理。可 63 岁在今年，是刚退休的年纪。</p><p>我的判断：<strong>每一条名人去世的新闻下面，评论区都在做同一件事——给死者找一个他自己负责的原因，好让活着的人觉得自己安全。</strong>这不是冷血，这是人面对无法控制的事时，本能地要找一个把手。</p><p>可这个把手是假的。你可以不熬夜、不受外伤、按时体检，你仍然可能在某个中秋的上午离开。概率会变，确定性不会。</p><p>三个月前还有一条。2026 年 3 月 24 日，中午 12 点 26 分，苏州，一个 41 岁的男人在公司跑完步，觉得不舒服，被送去医院。下午 3 点 50 分，人没了。医院诊断：心源性猝死。</p><p>他叫张雪峰。两天前的 3 月 22 日，他还在朋友圈打卡，那天跑了 7 公里，3 月累计 72 公里。他创办的公司在高考志愿填报这一行做得很大，2025 年当选江苏省人大代表。</p><p>这些在他倒下的那个中午，一样也没用上。</p><h2>「人总有一死」这句话藏了一个前提</h2><p>这句话是对的，也是废话。</p><p>它真正的作用，是把死亡从时间轴上拿下来，放到一个叫「终点」的地方。既然是终点，那就在路的尽头；既然在尽头，那就不关现在的事。</p><p>「总有一死」的「总」字，听起来像「以后」。我们用它的时候，心里想的是七八十岁，是病床，是告别，是儿孙绕膝之后的事。</p><p>这个理解里，死亡被绑在了「老」上。老是前提，死是结果。于是年轻人觉得自己暂时免疫——我还没老，所以这件事故不轮到我。</p><p>但死亡不是「老了以后」的一个事件，它是每一天都可能发生的一个事件。它不排队，不按年龄发号，不看你的计划表。</p><p>我的判断：<strong>死亡不是一件在未来的某个地方等你的事，它是一件分布在每一天里的事。</strong>「人总有一死」这句话，把分布抹掉了，只留下了终点。</p><p>把分布抹掉，人就敢无限期地往后拖。等我升职、等我买房、等孩子上大学、等退休。这些「等」全都建立在一个假设上：我会活到那个「等」结束。</p><p>这个假设，没有人给你签过字。</p><h2>哲学家也没能解决这件事</h2><p>这件事哲学上讨论了两千多年，值得看一眼，因为它能说明为什么「想通了」并不等于「不怕了」。</p><p>伊壁鸠鲁的论证很干脆：死亡和我们无关。因为我们存在的时候，死亡不在；死亡来的时候，我们已经不在。既然两者永不同时在场，我们就没有理由怕它。</p><p>卢克莱修补了一个对称性论证：我们不为出生之前那无限长的时间感到痛苦，那么也没有理由为死后那无限长的时间感到痛苦。两边都是「我们不在」的状态，凭什么一边怕一边不怕？</p><p>这两个论证在逻辑上很难挑出毛病。但它们解决的是「死后的状态」，不是「死亡的随时性」。</p><p>它们回答的是「死了以后会怎样」，回答不了「为什么是今天」。</p><p>海德格尔换了一个方向。他不太谈死后，他谈「向死而在」：人是一种始终朝着终点活着的存在，这个终点不是最后才发生的事，它从出生起就编在你的结构里。</p><p>他还有一个说法，正好能对上前面那节。他说日常生活中的「常人」把死亡藏起来了。怎么藏的？把它说成一件「人总有一死」的事。</p><p>注意这个句子的主语。「人」会死，不是「我」会死。用一个无人称的「人」，把「我」换掉了。换掉之后，死亡就成了一条统计规律，一件发生在别人身上的新闻。</p><p>我的判断：<strong>「人总有一死」这句话，在海德格尔那里是一个逃避的句式。</strong>它听起来像看透了，其实是把主语偷走了。</p><p>哲学能改变你对死亡的看法，改不了死亡的时间表。一个人可以把伊壁鸠鲁背得很熟，仍然会在体检报告出来之前手抖。</p><p>这不是哲学的失败。它只是说明，恐惧不在概念里，在身体里。</p><h2>数字：不是老了才会死</h2><p>先看几组数字。</p><p>国家心血管病中心《中国心血管健康与疾病报告》的数据：我国每年心源性猝死约 54.4 万例，平均每天约 1500 人，每分钟 1 人。其中 90% 以上发生在医院外，院外抢救成功率不足 1%。</p><p>更值得看的是年龄结构。《中国心源性猝死流行病学调查》给出的数字是：18 到 35 岁人群在心源性猝死中的占比，从 2015 年的 12%，升到了 2024 年的 28%。</p><p>28%。差不多每四个猝死的人里，有一个不到 35 岁。</p><p>另一组：国家统计局公布的 2024 年数据，全国死亡人口 1093 万。这 1093 万人里，绝大多数不是「寿终正寝」。如果死亡只发生在老年，那 28% 这个数字根本不该存在。</p><p>我们习惯把死亡想象成一条曲线的末端，人在八九十岁集中离场。真实的分布不是这样。它有一个长长的、不可忽略的尾巴，一直拖到二十岁、三十岁。</p><p>我的判断：<strong>「人老了才会死」不是对死亡的无知，是对死亡的选择性观看。</strong>我们看见了殡仪馆里那些九十岁的照片，没看见急诊室里那些三十岁的。</p><figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1FpQ1BdEmw" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1FpQ1BdEmw&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>李永乐讲心源性猝死：心脏为什么会突然停、CPR 和 AED 到底怎么用。这期把机制讲得比大多数新闻清楚。</figcaption>
</figure><p>顺便说一句，这些知识不是给别人看的。猝死 90% 发生在医院外，等你倒下的时候，能救你的往往不是医生，是身边那个刚好会按压的人。</p><h2>身体不跟你商量</h2><p>心源性猝死只是其中一种。</p><p>主动脉夹层，发作时从胸口撕裂到后背，几分钟到几小时，救不回来就是救不回来。脑出血，可以发生在三十岁的高血压患者身上，也可以发生在没有任何病史的人身上。肺栓塞，久坐、长途飞行、术后卧床都可能触发，倒下之前可能只是有点喘。过敏性休克，一只虾、一针药、一次蜂蜇。</p><p>这些病的共同点是：不预约。</p><p>医学上有个说法，青年猝死有「三无」特征——无明确心脏病史、预警症状不典型、病情进展极快。翻成日常的话就是：<strong>你以为自己没事，身体也没提前打招呼，等它打招呼的时候已经来不及了。</strong></p><p>张雪峰 2023 年住过院，那是身体给过的一次信号。信号被接住了，人也出院了，然后继续跑 72 公里一个月。这不是批评他，这是几乎所有人在做的事：把一次警告当成一次意外，把出院当成痊愈。</p><p>我的判断：<strong>身体不是一辆能一直开到报废的车，它更像一个不通知就熄火的发动机。</strong>车坏了还能修，人熄火了，修的机会只有那四分钟。</p><figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1qJ411X7AK" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1qJ411X7AK&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>央视新闻的一分钟短片：黄金四分钟怎么按压。看一遍，记住手放哪儿、压多深、每分钟多少次。</figcaption>
</figure><p>四分钟是什么概念：大脑缺氧超过四分钟开始不可逆损伤，超过八分钟几乎脑死亡。你打 120，救护车最快也要几分钟。这中间的几分钟，只能靠旁边的人。</p><p>再说信号。身体不是不报警，是它用的语言你不认识。</p><p>典型的是胸闷、胸痛、心慌、心律不齐，活动后加重，休息了也不缓解。这一种多数人还能认出来。</p><p>麻烦的是不典型的那几种：没有牙病却牙疼、下颌痛，左肩和后背放射痛，查不出原因的极度乏力，恶心想吐、肚子胀，头晕、眼前发黑，一过性晕厥，夜里被憋醒。</p><p>这些东西的共同点是：它们都像别的小毛病。牙疼去看牙，胃不舒服吃胃药，乏力就多睡一觉。等它们凑到一起的时候，往往已经晚了。</p><p>我的判断：<strong>人对身体的误判，不是因为不爱惜，是因为太会解释。</strong>每一种不舒服都能找到一个日常的原因，找得到原因，就不用去医院。这套解释系统，救过很多次面子，也可能耽误那一次。</p><h2>人命在呼吸间</h2><p>在讲「来世」之前，先讲佛教里另一段更短的话。</p><p>《四十二章经》第三十八章，佛问一个沙门：人的命有多长？</p><p>第一个答：在数日间。佛说，你还不懂。第二个答：在一顿饭的时间。佛说，你还不懂。第三个答：在呼吸间。佛说，善哉，你懂了。</p><blockquote class="pg-quote"><p>佛问沙门：人命在几间？对曰：数日间。佛言：子未知道。复问一沙门：人命在几间？对曰：饭食间。佛言：子未知道。复问一沙门：人命在几间？对曰：呼吸间。佛言：善哉，子知道矣。</p><cite>《佛说四十二章经》第三十八章「生即有灭」</cite></blockquote><p>这段对话的结构很有意思。佛否定了前两个答案，不是因为它们错，是因为它们还不够短。</p><p>数日，已经够短了；一顿饭，更短；一口气，短到没法再切。佛要的就是这个「没法再切」。</p><p>这就是佛教说的「无常」。它不是「人终有一死」这么一句结论，它是一种时间尺度的训练：把「我还有几十年」这个念头，压缩到「我只有这一口气」。</p><p>我的判断：<strong>在死亡这件事上，佛教比大多数现代人狠得多。</strong>它没有安慰你「你还年轻」，它告诉你，你活着的全部凭据，就是下一口气还接得上。</p><p>这段话和「下辈子投个好胎」放在一起，会看到一种奇怪的分裂：一边把时间缩到一次呼吸，一边把希望拉到下一世。前一句是让你此刻清醒，后一句是让你此刻忍耐。</p><p>同一个人身上，这两句话是可以并存的。但它们的用途完全相反：<strong>一个用来修行，一个用来止痛。</strong></p><h2>那间着火的房子</h2><p>现在说佛教。</p><p>中国民间有一句话，几乎人人都听过：这辈子苦一点没关系，下辈子投个好胎。还有一句：善有善报，恶有恶报，不是不报，时候未到。</p><p>这两句话合起来，构成了一套很顺的账：今生的苦是本金，来世的福是收益；今生的善是存款，来世的报是利息。人只要忍，只要行善，账总会平。</p><p>这套账，被安在了佛教头上。</p><p>但翻开《法华经·譬喻品》，原文是这样说的：</p><blockquote class="pg-quote"><p>三界无安，犹如火宅。众苦充满，甚可怖畏。常有生老，病死忧患。如是等火，炽然不息。</p><cite>《妙法莲华经·譬喻品第三》</cite></blockquote><p>三界，是欲界、色界、无色界。它包括人间，也包括天道。佛教把整个轮回系统比作一栋正在着火的房子，里面的众生还在里面玩。</p><p>这个比喻的关键在于：<strong>火不是只烧一楼。</strong>你从人间搬到天道，是从二楼搬到三楼，房子还在烧。</p><p>所以「下辈子投个好胎」在佛教的框架里，从来不是「搬进一栋不着的房子」。它顶多是换一层楼。</p><p>我的判断：<strong>拿佛教来给「来世会好」背书的人，大概没读过这一段。</strong>这不是佛教在承诺升级，这是佛教在告诉你：这栋楼没有安全层。</p><p>再看一句。佛教说「人身难得」，用的是「盲龟浮木」的比喻：一只瞎眼的乌龟，在茫茫大海上，每一百年浮出水面一次，正好把头钻进一块漂着的木板上的孔里。得一次人身，比这个还难。</p><p>这个比喻常被用来劝人珍惜人身、好好修行。可它同时也说明了一件事：在佛教的世界观里，下一辈子还能不能做人，本身就是一个极低概率的事件。你把今生的苦押在一个概率这么低的「下辈子」上，这笔投资的风险，比任何理财都高。</p><h2>佛教承诺的不是升级，是退出</h2><p>要弄清这件事，得看四圣谛。</p><p>《杂阿含经》第 382 经，佛在鹿野苑对诸比丘说：</p><blockquote class="pg-quote"><p>有四圣谛。何等为四？谓：苦圣谛，苦集圣谛，苦灭圣谛，苦灭道迹圣谛。</p><cite>《杂阿含经》卷十五，第 382 经</cite></blockquote><p>苦、集、灭、道。苦是现象，集是原因，灭是终止，道是方法。这四个字连起来，是一套完整的分析，不是一个安慰。</p><p>苦谛说的不是「人生很苦」这么一句感慨。它列出的是生、老、病、死、怨憎会、爱别离、求不得、五取蕴——八项，一项一项地数。它是在做诊断，不是在抒情。</p><p>而这一整套修行的终点，经文里说得非常清楚：</p><blockquote class="pg-quote"><p>我生已尽，梵行已立，所作已办，不受后有。</p><cite>《杂阿含经》，阿罗汉自证语</cite></blockquote><p>「不受后有」——不再有下一次生命。</p><p>这是佛教和「来世会好」最根本的分歧。佛教要的不是下一次投得好，是不再有下一次。它把轮回本身当成问题，不是当成机会。</p><p>我的判断：<strong>把佛教读成「延迟满足的来世版」，是把一个要求你退出的系统，改成了一个劝你忍耐的系统。</strong>这个改动太大了，大到它已经不是原来那个东西。</p><p>这个改动对谁有利？对需要你继续忍下去的人有利。你今生的力气，本来可以用来改一改眼前的处境；一旦你相信「忍到下一辈子就好了」，这些力气就全部转成了忍耐。</p><p>这里要说清楚：我不是在批评佛教。恰恰相反，把佛教简化成「善有善报」的许愿池，对佛教本身是不公平的。它有一套很硬的分析，硬到让人不舒服——它说的是「这栋楼一直在烧」，不是「再忍忍就有好房子」。</p><p>真正被这套民间说法安慰到的，是活着的人；真正被它耽误的，也是活着的人。</p><h2>「先苦后甜」是谁的话</h2><p>再说另一半。</p><p>「吃得苦中苦，方为人上人」，这句是明清以后流行起来的俗谚，小说、家训、戏文里都能见到。「宝剑锋从磨砺出，梅花香自苦寒来」出自《警世贤文》。「苦尽甘来」更早，元曲里就有。</p><p>这些话有一个共同的结构：把苦放在前面，把甜放在后面，然后用后面的甜，给前面的苦发一张许可证。</p><p>这个结构很好用。它让正在受苦的人不必停下来问「我为什么要受这个」，因为答案已经给好了：为了后面的甜。</p><p>但它有一个问题，一直被忽略：这个「后面」，是谁定的？</p><p>如果是你自己定的，那它是一句自我鼓励，没问题。如果是别人替你定的，那它就可能是一句管理话术。</p><p>我的判断：<strong>「先苦后甜」在很多时候不是人生哲理，是排班表。</strong>它告诉你的不是「苦有回报」，是「现在别停」。</p><p>你想想这句话在哪些场合出现得最多：加班的时候，备考的时候，被要求再撑一撑的时候。说这句话的人，往往不是那个要吃苦的人。</p><p>这不是说所有劝你坚持的人都不怀好意。很多人是真心的，他们自己也是这么过来的。但真心不等于正确，一代人传下来的一句话，也可能是一代人的幸存者偏差。</p><h2>先苦后甜的老家在哪儿</h2><p>这句话不是中国土产，它有一个西方的、更硬的版本。</p><p>1905 年，马克斯·韦伯写了一本《新教伦理与资本主义精神》。他问了一个问题：为什么资本主义最早出现在西欧，而不是别的地方？</p><p>他的答案不是钱，不是技术，是一套关于「忍耐」的神学。</p><p>加尔文宗有一个要命的前提：人的得救是预定的，你做什么都改不了。问题在于，没有人知道自己是不是被选中的那一个。</p><p>于是产生了一种心理需求：找一个证据。什么证据？世俗生活里的成功——你把本职工作做好了，做成了，这可能是蒙恩的迹象。</p><p>这样一来，劳动的意义变了。它不再是谋生的手段，它成了一种确认，一种「我大概是被选中的」的自我暗示。德语里那个词叫 Beruf，天职。</p><p>配套的还有一条：禁欲。赚了钱不能花，不能享受，不能穿好衣服、办宴会。钱只能再投进去，越滚越大。</p><p>韦伯引的那套清教徒话，大意是：赚钱是义务，享受是罪。人一辈子在世上，就是替上帝看管财产，看管得好，是荣耀；拿去吃喝玩乐，是背叛。</p><p>所以「先苦后甜」的原版，根本不是「先苦，后甜」。它是「先苦，后也不敢甜」。</p><p>甜被挪到了死后。你今生的克制，换的是那个世界的入场券。</p><p>后来宗教退场了。禁欲的壳掉了，资本留下了，「先苦后甜」这句话留下了，但它后面那个「甜」——那个曾经有神学担保的甜——没有了。</p><p>我的判断：<strong>这句话曾经有一个地基，现在地基没了，房子还在，住在里面的人不知道为什么还要忍。</strong></p><p>需要说明一句：韦伯这套解释在史学界一直有争议，很多学者认为他把因果关系讲得太整齐，新教和资本主义的关系远比他说的复杂。</p><p>但那个结构是真的：<strong>先忍、后报，需要一套信仰来支撑。当信仰退场，剩下的就只有「忍」这个动作，和一句没有兑现人的承诺。</strong></p><p>今天劝你「先苦后甜」的人，多半不是在给你传福音。他可能只是想让这个月的报表好看一点。</p><h2>幸存者偏差：甜了的人才有话筒</h2><p>我们说「苦尽甘来」的时候，脑子里想到的都是谁？</p><p>是那些后来成功了的：创业成功的、考研上岸的、从小地方考出来的、熬了十年终于买房的。他们的故事被写进报道、拍成短片、在饭桌上被反复讲。</p><p>那些苦了但没甜的人呢？</p><p>他们没有话筒。创业失败的人不会上电视讲自己怎么失败，考了三年没上岸的人不会发朋友圈，熬坏了身体的人在医院里，不在采访里。</p><p>你听到的每一个「苦尽甘来」，都是从一堆「苦尽苦来」里挑出来的一个。这个挑选过程，你不在场。</p><p>我的判断：<strong>你看到的不是概率，是筛选后的样本。</strong>用一个被筛选过的样本去指导自己的人生，等于拿中奖者的采访去研究彩票。</p><p>更麻烦的是，这套叙事还会反过来责怪没甜的人：你还没甜，说明你苦得不够。于是苦变成了一场没有终点的加码——再加一年，再加一倍，再忍一忍。</p><p>而「够了」这两个字，在这套叙事里是没有位置的。</p><h2>棉花糖实验翻车了</h2><p>「先苦后甜」在现代心理学里有一个体面的版本，叫延迟满足。</p><p>它的经典依据是棉花糖实验。上世纪六十年代，斯坦福心理学家沃尔特·米歇尔在校园里的幼儿园做了一组实验：给孩子一颗棉花糖，告诉他如果忍十五分钟不吃，就能再得到一颗。能等住的孩子，后来在 SAT 等指标上表现更好。</p><p>这个实验被传播了半个世纪，成了育儿圣经、职场鸡汤、成功学的通用零件。它的结论被简化成一句话：能忍的孩子更有出息。</p><p>2018 年，纽约大学的泰勒·沃茨、加州大学尔湾分校的格雷格·邓肯和全浩南在《心理科学》上发了一篇重复实验。样本从原来的不到九十人，扩大到九百多人，种族、民族、父母教育程度都更有代表性。</p><p>结果：在控制了家庭收入、家庭环境这些变量之后，延迟满足与后来成就的相关性大幅下降，接近于消失。</p><p>也就是说，能等住那颗棉花糖，很大程度上不是意志力的结果，是家境的结果。</p><p>这个结论不难理解。一个孩子如果从小 experience 到「大人说了会给，就一定会给」，他就敢等；如果他经历过「等了也没有」「答应了也不算」，他就不会等。<strong>等待是一种对世界的判断，不是一个道德品质。</strong></p><p>实验者后来补充说，这不代表延迟满足不重要，只是它不能被当成预测人生的指标。这个补充很诚实，但传播的时候被吃掉了。</p><figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1tC4y1E7U5" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1tC4y1E7U5&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>一个把延迟满足讲成社会结构问题的视频：为什么「能忍」这件事，本身是有门槛的。</figcaption>
</figure><p>我的判断：<strong>延迟满足被当成美德，其实它常常是特权。</strong>有退路的人敢等，没退路的人不敢等。然后把「敢等」说成优点，把「不敢等」说成缺点，这个循环就闭合了。</p><p>所以当有人拿「你要延迟满足」来劝你的时候，值得多问一句：我延迟到什么时候？那个「以后」，谁保证？</p><h2>稀缺：为什么你不敢先甜</h2><p>上一节说「等待是一种对世界的判断」。这个判断有它的物质基础，2013 年有一本书把它讲透了。</p><p>哈佛经济学家塞德希尔·穆来纳森和普林斯顿行为科学家埃尔德·沙菲尔写了《稀缺：我们是如何陷入贫穷与忙碌的》。他们的核心观点是：缺钱、缺时间，会占据人的认知带宽，把人挤到只剩下眼前。</p><p>他们做过一个很聪明的对照：找印度的甘蔗农，在收获前和收获后各做一次认知测试。收获前是农民最缺钱的时候，收获后是刚拿到钱的时候。同一个人，同样的题，收获前的成绩明显更差。</p><p>也就是说，穷本身会让人变笨——不是智力变笨，是可用的注意力变少。</p><p>这个结论对「先苦后甜」的解释很关键。</p><p>一个手里有缓冲的人，敢等。他知道这个月不吃，下个月还有；这次不等，下次还有机会。等待对他来说成本很低。</p><p>一个没有缓冲的人，不敢等。因为「以后」对他来说不是承诺，是赌博。他见过的「以后」，经常是失约。</p><p>我的判断：<strong>所以「先苦后甜」对普通人特别有吸引力，因为它是唯一不需要本钱的希望。</strong>你不用有钱，不用有资源，只要肯忍，就能参与。</p><p>但这正是它最危险的地方：它让你把唯一确定拥有的东西——现在——也押了出去。</p><p>稀缺还有一层更隐蔽的作用：它不只是拿走钱，它还拿走「享受是允许的」这个念头。</p><p>一个人长期缺钱，会慢慢觉得对自己好是一件不正当的事。买一杯贵一点的咖啡要内疚半天，吃一顿好的要找一个理由，休息一天要提前一周做心理建设。</p><p>这个东西不写在账本上，但它比账本更难解除。</p><h2>先甜和后甜，不是同一类东西</h2><p>到这里可以算一笔很简单的账。</p><p>「先甜」是什么？是已经发生的事。你今天吃了一顿好吃的，你的舌头尝到了，你的身体吸收了，你的记忆里存下了。这件事不需要任何人批准，也不需要你活到哪一天。</p><p>「后甜」是什么？是一个承诺。它要成立，至少需要三个条件：你还活着，承诺的人兑现，那个甜的东西还在。</p><p>三个条件，每一个都可能失效。</p><p>你可能活不到；承诺的人可能忘了、变了、死了；那个东西可能涨了价、关了门、换了规则。三个条件只要断一个，这笔账就兑不了。</p><p>所以这两件事的性质完全不同：一个是现货，一个是期货；一个当场交割，一个靠信用。</p><p>我的判断：<strong>先甜一定甜了，因为它已经发生；后甜不一定甜，因为它还需要发生。</strong>这不是乐观主义，这是结算方式的区别。</p><p>有人会说，先甜也会带来后苦啊，今天吃爽了明天胖三斤，今天花钱了明天还信用卡。对，这正好是下一节要说的边界。</p><p>但在说边界之前，先把这句话立住：<strong>「甜」这个体验本身，是先甜唯一不需要担保的部分。</strong>它已经进到你身体里了，谁也拿不走。</p><h2>我不是劝你及时行乐</h2><p>上面这套话，最容易滑到的地方是：那照你这么说，今朝有酒今朝醉，花光算了，班也别上了。</p><p>这个推论我不接受。先把最强的反驳摆出来。</p><p>第一，放纵是另一种「后甜」骗局。它告诉你现在的快乐能抵消未来的代价，可代价是真的，快乐会过去。刷爆卡买的东西，三个月后堆在角落；通宵喝的那场酒，第二天的心悸是真的。</p><p>第二，人需要结构。彻底不管明天的人，通常不是因为想通了，是因为撑不住了。那不是自由，是放弃。</p><p>第三，有些苦确实值得吃。学一门手艺、治一场病、养一个孩子，这些事的过程就是苦的，而且没有替代方案。把它们算进「先苦后甜」里否定掉，是另一种粗暴。</p><p>所以「先甜」必须有边界。我给三条，很硬的三条：不欠债，不伤身，不害人。</p><p>在这个范围之内，对自己好一点是纯收益；越过这个范围，就是把未来的苦提前买回来，还加了利息。</p><p>我的判断：<strong>真正的及时行乐不是挥霍，是不延迟那些本来不需要延迟的东西。</strong>一顿饭、一双鞋、一次散步、一个下午的空白，这些东西不需要等到「以后」，因为它们本来就不贵，也不欠谁。</p><p>被延迟的往往不是大事，是这些小事。而人到最后想起来的，也多半是这些小事。</p><h2>甜会变淡，但不会变假</h2><p>还有一个反驳，比刚才那个更难对付：就算我先甜了，过一阵也就习惯了，有什么用？</p><p>这个说法有依据。心理学里叫享乐适应：升职、买房、中奖，带来的快乐会在几个月到一两年内回落到接近原来的基线。人是一个会迅速把好日子当成理所当然的动物。</p><p>所以我不打算说「先甜能让你永远幸福」，那是假话。</p><p>但「变淡」和「没发生过」是两件事。</p><p>你十岁那年吃过的一根冰棍，味道早忘了，可那个下午还在你身上。你去过的那个地方，照片早不看了，可你走路的样子里有一点它。这些经验不提升你的幸福基线，它们构成你这个人。</p><p>我的判断：<strong>用「反正会习惯」来拒绝一切享受，是用一个未来的统计学结论，取消一个现在的具体经验。</strong>这笔交换不划算，因为统计学结论不会陪你过日子，具体经验会。</p><p>而且享乐适应是双向的。好日子会适应，苦日子也会适应。一个人在长期劳累里待久了，也会把疲惫当成常态，把「还行」当成「挺好」。这时候更需要一次明确的甜，来把基线掰回来一点。</p><p>甜的作用，不是让你一直快乐，是让你知道还有别的状态。</p><h2>一个普通人的账</h2><p>现在把镜头从小概率事件，转到大多数人的日常。</p><p>国家统计局的数据：2024 年全国企业就业人员周平均工作时间 49.0 小时。法定是 44 小时。2023、2024 连续两年都在 49 小时左右，是近二十年的高位。</p><p>一年 2548 小时，比 2018 年多了 130 小时，相当于多出三个工作周。</p><p>有一项基于中国家庭追踪调查的研究，把这种状态叫「时间贫困」：不是没钱，是没时间。中等收入、长工作时间的群体，占样本的 41.7%。这个群体运动更少，工作满意度更低，人际满意度更低，总体生活满意度更低。</p><p>翻成日常的话：<strong>你不是不努力，你已经在先苦了，而且苦了很久。</strong></p><p>那笔账可以算得更具体一点。一天 24 小时，睡 7 小时，工作 10 小时，通勤 2 小时，吃饭洗漱 2 小时，剩下 3 小时。这 3 小时里，有多少是给你自己的？</p><p>多数人的答案是：零。剩下的时间用来回消息、刷手机、处理家里的事，然后睡觉。</p><p>所以「适当奖励自己」这句话，不是让你去消费，是让你在这 3 小时里，切出一块只归你。</p><p>具体一点，别喊口号：</p><p>一双穿了不磨脚的鞋。一顿不看价格的饭，哪怕一个月一次。一次不做攻略的散步，走到哪儿算哪儿。一次体检，把该查的查了。一天不接工作电话。一件一直想买但觉得「没必要」的东西。</p><p>我的判断：<strong>奖励自己最大的障碍，不是钱，是那句「等我……就……」。</strong>等我忙完这个项目，等我升职，等孩子上小学，等房贷还完。那个「等」后面永远有下一个。</p><p>张雪峰 41 岁，公司做得很大，2025 年当选省人大代表。他大概也有很多「等我……就……」。3 月 24 日那天中午，这些「等」全部作废了。</p><h2>钱能买到什么，买不到什么</h2><p>这里要处理一个很自然的想法：那是因为他们不够有钱。有钱人可以去最好的医院，可以请私人医生，可以直升机转运。</p><p>这话有一半是对的。钱确实能买到更好的医疗：更快的检查、更贵的药、更有经验的医生、更短的等待。这些都能提高存活率，是实打实的。</p><p>但有三样东西，钱买不到。</p><p>第一样，是发病的那几分钟。</p><p>九成以上的心源性猝死发生在医院外。你在办公室倒下，在跑步机上倒下，在半夜的床上倒下——最好的医生在别的地方，最快的救护车也在路上。这几分钟里，能动手的只有身边的人。</p><p>第二样，是不确定的消除。</p><p>有钱可以买到一千次检查，买不到「这次没事」的确定。医学做的是概率，不是保证。你可以把风险从 1% 降到 0.1%，但那个 0.1% 落在谁头上，事先没人知道。</p><p>第三样，是被关心。</p><p>钱可以买到护理、陪护、最好的病房，买不到一个人坐在床边，什么也不做，只是不走。这件事和账户余额无关。</p><p>刘欢做过人工髋关节置换，能调动的医疗资源比绝大多数人多。他还是在 63 岁那年中秋走了。张雪峰的公司做得很大，倒下的时候在办公室，从不适到去世三个多小时。</p><p>我的判断：<strong>钱能提高你活下去的概率，不能取消「今天可能不在」这件事。</strong>而人对死亡的恐惧，本质上不是怕死这个状态，是怕它不打招呼。</p><p>所以「等我赚够了就好好活」这个计划，有一个隐藏的前提：时间会等你赚够。这个前提，没有人保证过。</p><h2>关心自己不是自私</h2><p>有人会在这里卡住：我要是对自己好，家里怎么办？</p><p>这个问题的答案，不在道德里，在算术里。</p><p>一个长期透支的人，最后给家里带来的账单是最大的：医疗费、照护时间、收入中断。你省下来的那点休息，和你倒下之后家里要付的代价，不是一个量级。</p><p>飞机上的安全演示，讲了几十年：先给自己戴氧气面罩，再帮别人。不是因为自私，是因为一个昏过去的成年人，救不了孩子。</p><p>我的判断：<strong>把自己照顾好，是对家里人最实际的负责。</strong>这句话听起来像鸡汤，其实是风险管理。</p><p>心理学这边还有一个更直接的证据。</p><p>得克萨斯大学的克里斯汀·内夫提出「自我关怀」这个概念，拆成三块：善待自己，把失败当成人类共有的事，用正念看待情绪而不是压住或放大。</p><p>最常见的担心是：对自己好，会不会就懒了、废了？</p><p>研究结论是反的。严厉的自我批评会激活大脑的威胁—防御系统，人进入「战斗或逃跑」的状态，认知功能和情绪调节都会下降，结果更容易拖延、更容易放弃。自我关怀水平高的人，韧性更强，焦虑和抑郁更少，反而更愿意为自己的错误负责。</p><p>内夫 2023 年在《心理学年鉴》上有一篇综述，把这些研究梳理了一遍。她的一个说法很朴素：自我关怀不是给自己找借口，是因为在乎自己，所以想把事情做好。</p><p>我的判断：<strong>对自己狠不是自律，是内耗。</strong>真正让人撑下去的，不是每天骂自己一顿，是心里还有一点「我想好好活」的念头。</p><p>一个天天骂自己的人，撑不了太久。他撑到某个点，会突然什么都不想干了——那不是懒，是耗尽了。</p><p>还有一层。你对你自己好不好，孩子是看得见的。一个从小看着父母从不休息、从不享受、把「吃苦」当成唯一正确活法的孩子，长大之后大概率也会这样过。你省下来的那些「没必要」，会变成他的人生默认设置。</p><p>所以这件事不只是你自己的事。</p><h2>那些没等到「后甜」的人</h2><p>刘欢的身体，给过他好几次信号。</p><p>2004 年，他在筹备个人演唱会，右腿突然刺痛。他没去医院，贴了膏药硬扛。过了一两周，腿慢慢不疼了，也就没再当回事。但从那以后，他发现自己右腿渐渐没法跷二郎腿了。</p><p>2009 年，他在美国陪女儿读书，一次做家务时右腿受伤，痛得走不了路。他担心妻子着急，又怕影响女儿考试，硬是拖了四个月才说。</p><p>回国就医，诊断书上写的是「股骨头缺血性坏死」二期。2010 年，他在北京做了人工髋关节置换手术，之后是一场漫长的康复。</p><p>这段经历里，最扎人的不是病，是那四个月。一个人腿痛得走不了路，为了不影响孩子考试，把这件事压了四个月。这就是「先苦后甜」最标准的动作：把自己的事往后放，放到别人的事后面。</p><p>他放了一辈子。教三十多年书，唱了四十多年歌，做《中国好歌曲》的导师，带学生，录音，演出。2023 年 9 月退休。</p><p>退休是什么？对一个苦了一辈子的人来说，退休就是那个「后甜」。</p><p>他等到了。等了两年。</p><p>2026 年 1 月 1 日，元旦，上海金山，零下的户外舞台。63 岁的刘欢裹着深色外套上台，缩着脖子，肩膀在风里抖，说了句「风好大」，然后唱。</p><p>那是他最后一次在大型舞台上公开演唱。</p><p>九个月后，中秋，他走了。</p><p>中国新闻网那篇纪念文章里有一句话，说他「来时不用锣鼓，走时不要排场」。讣告也确实如此：不设治丧委员会，不举行遗体告别，不开放追悼。</p><p>我的判断：<strong>他这辈子最后一场大型演出，是在零下的户外，缩着脖子唱的。</strong>这不是「后甜」该有的样子。后甜应该是一个暖和的下午，一把躺椅，一杯热茶，不用赶场，不用缩脖子。</p><p>再说另一条。2026 年 10 月，张雪峰去世半年多以后，他创办的公司由别人接手，网上有过一轮争议。接手的人在采访里说，今年是他第一年不在，如果志愿填报出了问题，对公司将是毁灭性的打击。</p><p>公司还在，业务还在，股份还在，名字还在。人不在了。</p><p>这就是「后甜」最残酷的地方：它不一定不来，它可能来了，只是没赶上你。</p><p>同一段时间还有一条。2026 年 10 月 31 日，京剧艺术家迟金声在家中去世，104 岁，马连良的亲传弟子。这是另一种结局，睡梦里走的，算是喜丧。</p><p>但 104 岁也不是「后甜」。它就是活到了。他这一辈子吃过的苦、受过的罪、赶上的时代，一样没少。长寿不是对苦的补偿，长寿只是时间长。</p><p>我的判断：<strong>人生不是先苦后甜的储蓄账户，它更像现金流。</strong>你今天没花掉的那部分，不一定明天还在；你今天没享受到的那部分，也不一定能折算成以后。</p><p>账户可以挂失，可以继承，可以冻结。现金流只认当下。</p><h2>今天</h2><p>写到这里，不给「珍惜当下」这种话。这四个字被人说烂了，烂到已经没有内容。</p><p>给一件具体的事。</p><p>今天晚上，做一件只对自己好的事。不用等发工资，不用等周末，不用等瘦下来，不用等孩子长大，不用等那个项目结束。</p><p>可以很小。买一份想吃的东西，走一段没走过的路，把手机调成静音半小时，早一点睡。</p><p>这件事不会让你长命百岁。它甚至不能保证你明天还在。</p><p>但它能保证一件事：今天这一天，你为自己活过一小段。</p><p>刘欢最后那次上台，开口之前说的是「风好大」。那不是台词，也不是设计。就是一个 63 岁的人，在零下的户外，缩着脖子，说了句实话。</p><p>人到最后记住的，往往不是奖，不是头衔，不是账户。是那天风很大，他站在台上。</p><p>这一段不需要谁来兑现，也不需要你活到哪个岁数才能拿到。它已经发生了。</p><p>你不会因为今天对自己好一点，就死得更早。</p><p>你可能会因为一直等，等到没机会。</p><h2>参考</h2><ul class="pg-refs"><li><a href="https://news.qq.com/rain/a/20260324A07F7S00" target="_blank" rel="noopener">张雪峰因心源性猝死去世，病因或与劳累、运动不当有关（腾讯新闻，2026-03-24）</a><span class="src"> · 报道</span></li><li><a href="https://www.toutiao.com/article/7620989595534901801/" target="_blank" rel="noopener">张雪峰去世，心源性猝死悲剧如何避免（中国新闻周刊，2026-03-25，今日头条转载）</a><span class="src"> · 报道</span></li><li><a href="https://health.gmw.cn/2026-03/27/content_38669616.htm" target="_blank" rel="noopener">防范心源性猝死：把握预警信号、掌握急救技能、做好居家监测（光明网，2026-03-27）</a><span class="src"> · 科普</span></li><li><a href="https://cdc.fuzhou.gov.cn/zz/ddgz/jkjy/mxfcrxjb/202604/t20260403_5304610.htm" target="_blank" rel="noopener">别让「隐形杀手」猝不及防——心源性猝死，这些知识能救命（福州市疾控中心）</a><span class="src"> · 科普</span></li><li><a href="https://www.peopleapp.com/rmharticle/30028417448" target="_blank" rel="noopener">新闻调查：致命「心事」，揭秘心梗背后的「元凶」（人民日报）</a><span class="src"> · 报道</span></li><li><a href="https://news.qq.com/rain/a/20261014A096UL00" target="_blank" rel="noopener">张雪峰离世后，武亮接手峰学蔚来被质疑，本人首次公开回应（腾讯新闻，2026-10-14）</a><span class="src"> · 报道</span></li><li><a href="http://epaperres.chinanews.com/epms/article/html/2026/10/10/1558430355676073984.html" target="_blank" rel="noopener">刘欢作别：月圆斯人远去，余音温暖人间（中国新闻网，2026-10-10）</a><span class="src"> · 报道</span></li><li><a href="https://news.bjd.com.cn/2026/10/04/11983238.shtml" target="_blank" rel="noopener">李健演唱《情怨》怀念刘欢（京报网，2026-10-04）</a><span class="src"> · 报道</span></li><li><a href="https://xinwen.bjd.com.cn/content/s6ac4a58be4b0e42f8f013b72.html" target="_blank" rel="noopener">刘欢妻子辟谣（北京日报网，2026-09-30）</a><span class="src"> · 报道</span></li><li><a href="https://c.m.163.com/news/a/L84BR5RO0530RJ4L.html" target="_blank" rel="noopener">刘欢妻子发文辟谣：对外经贸大学讣告与生前遗愿（网易新闻）</a><span class="src"> · 报道</span></li><li><a href="https://m.gmw.cn/2026-11/02/content_1304581919.htm" target="_blank" rel="noopener">迟金声先生，在家中安详离世（光明网，2026-11-02）</a><span class="src"> · 报道</span></li><li><a href="https://www.drbachinese.org/online_reading_simplified/sutra_explanation/Lotus/LotusSutra.htm" target="_blank" rel="noopener">《大乘妙法莲华经·譬喻品第三》全文（法界佛教总会）</a><span class="src"> · 原文</span></li><li><a href="https://agama.buddhason.org/SA/SA0382.htm" target="_blank" rel="noopener">《杂阿含经》第 382 经：四圣谛（庄春江标点）</a><span class="src"> · 原文</span></li><li><a href="https://www.drbachinese.org/online_reading/sutra_explanation/42Sections/42SectionsSutra.htm" target="_blank" rel="noopener">《佛说四十二章经》第三十八章「生即有灭」（法界佛教总会）</a><span class="src"> · 原文</span></li><li><a href="https://ar.lingyinsi.org/detail_13097.html" target="_blank" rel="noopener">《四十二章经》第三十八：生即有灭（杭州灵隐寺）</a><span class="src"> · 原文</span></li><li><a href="https://self-compassion.org/the-three-elements-of-self-compassion-2/" target="_blank" rel="noopener">What is Self-Compassion?（Kristin Neff 官方网站，含研究综述）</a><span class="src"> · 研究</span></li><li><a href="https://www.szlhq.gov.cn/ztzq/jdzt/smgazx/content/post_12482916.html" target="_blank" rel="noopener">自我关怀：停止内耗的起点（深圳市龙华区人民政府，2026）</a><span class="src"> · 科普</span></li><li><a href="https://www.peopleapp.com/rmharticle/30014433442" target="_blank" rel="noopener">延迟满足能力强就会成功？拨开史上最著名儿童心理学实验的迷雾（人民日报）</a><span class="src"> · 科普</span></li><li><a href="https://www.thepaper.cn/newsDetail_forward_9908421" target="_blank" rel="noopener">当成功路上的诱惑来临，家境影响你的决定？（澎湃新闻）</a><span class="src"> · 科普</span></li><li><a href="https://simplypsychology.org/marshmallow-test.html" target="_blank" rel="noopener">Marshmallow Test Experiment in Psychology（Simply Psychology，含 2018 年重复实验说明）</a><span class="src"> · 研究</span></li><li><a href="https://www.stats.gov.cn/zwfwck/sjfb/202501/t20250117_1958332.html" target="_blank" rel="noopener">2024 年经济运行稳中有进，主要发展目标顺利实现（国家统计局，2025-01-17）</a><span class="src"> · 数据</span></li><li><a href="https://www.ce.cn/xwzx/gnsz/gdxw/202603/t20260330_2866199.shtml" target="_blank" rel="noopener">破解「时间贫困」，给年轻人不被透支的人生（中国经济网，2026-03-30）</a><span class="src"> · 评论</span></li><li><a href="https://www.toutiao.com/article/6790823128126718477/" target="_blank" rel="noopener">塞内加《论生命之短暂》中译（北大公共传播）</a><span class="src"> · 译文</span></li><li><a href="https://t.m.youth.cn/transfer/toutiao/url/news.youth.cn/jsxw/201908/t20190823_12049515.htm" target="_blank" rel="noopener">你是时间的穷人吗（中国青年网，2019-08-23）</a><span class="src"> · 评论</span></li></ul>`
  },
  {
    id: "post-251",
    title: "红石：一套只有开和关的系统，为什么能造出计算机",
    date: "2026-11-03",
    updated: "2026-11-03",
    cat: "技术",
    tags: ["游戏", "科学"],
    cover: "",
    pinned: false,
    excerpt: "红石不是电。它没有电压、电流、阻抗，只有布尔值和一个 0 到 15 的整数。可就是这套东西，从 2010 年为了开一扇门被塞进游戏，长出了逻辑门、CPU、工厂和两个职业。",
    content: `<p>一撮红色粉末撒在地上，连成一条线，尽头接一个活塞。踩上压力板，线亮了，活塞咔一声把方块推出去。这是游戏里最小的一次因果：有输入，有传递，有动作。</p><p>这条线只能走十五格，第十六格就黑了。想走远，得在中间插一个中继器，把信号重新拉满；想把「亮」变成「亮多少」，得换比较器；想让它记住刚才亮过，得让两个火把互相压制。</p><p>绝大多数玩家学红石，是从抄一台自动门开始的。抄完还是不知道自己在抄什么。因为红石真正难的不是元件名单，是规则：信号怎么走、什么时候算、谁先谁后、哪些行为是设计、哪些是 bug 留下来的。</p><p>这篇分五块：元件、历史、结构、现实原型，以及生电和创电这两套玩法到底在玩什么。</p><h2>三类元件，和一条不是电的线</h2><p>游戏里的红石元件，按功能可以分成三类。电源负责产生信号：红石块、拉杆、按钮、压力板、测重压力板、阳光探测器、侦测器、标靶、绊线钩、避雷针、幽匿感测体。传输元件负责搬运和修改信号：红石粉、红石中继器、红石比较器。机械元件负责把信号变成动作：活塞、粘性活塞、红石灯、门、活板门、栅栏门、发射器、投掷器、漏斗、音符盒、钟、TNT、动力铁轨、激活铁轨。</p><p>红石粉、红石火把、中继器、比较器这四个可以单独拎出来，叫「红石元器件」——它们既能被别的信号激活，又能去激活别人。这个中间位置很重要，逻辑门几乎全靠它们。</p><p>先把一件事说清：红石不是电。现实里的电有电压、电流、电阻、电容、电感，信号是一段连续变化的电压；红石只有两个东西——布尔值（有信号／没信号）和一个 0 到 15 的整数（信号强度）。没有电流，没有功率，没有接地，没有阻抗匹配。它是一套逻辑模型，穿了一件像电的外衣。</p><p>我的判断：<strong>把红石当电学会走偏，把它当「可编程的因果网络」才对。</strong>后面讲现实原型时，能对上的部分很漂亮，对不上的部分更能说明它是什么。</p><h2>红石从哪来</h2><p>生存里第一次见到红石，通常是在地下。红石矿石生成在主世界 y=-64 到 y=16 之间，越往下越密，y=-59 附近最多。挖出来是四到五个红石粉，有时运附魔会更多，时运三级平均能到八个左右。它不稀有，一个矿洞转一圈能背回半组。</p><p>红石粉还有别的来路：女巫掉落、村民交易、掠夺者前哨站的箱子、丛林神庙的陷阱。真正稀缺的从来不是红石，是黏性活塞要的黏液球、比较器要的石英、中继器要的石头。做一台大机器，卡住人的往往是这些配角。</p><p>这件事有一个副作用：红石便宜，所以玩家敢浪费。现实里的电路设计要算成本，一块板子多打一个孔都是钱；红石里多铺一百格线，代价只是背包里少一组粉。这种「材料几乎免费」的环境，塑造了红石社区的设计习惯——先做出来，再优化。</p><h2>十五格：信号为什么会衰减</h2><p>红石粉铺在地上，从源头往外传，每过一格，强度减一。源头是 15，走一格变 14，走到第十五格变 0，第十六格不亮。这是红石最基础的一条规则，也是所有长距离设计的起点。</p><p>为什么是 15？因为 15 刚好能被 4 位二进制表示（0 到 15 共十六个值）。这不是物理常数，是设计选择。它把「信号强度」变成了一个可以用四位存下来的数，比较器后面能读出这个数、做减法，都建立在这上面。</p><p>衰减带来两个后果。第一，长线必须中继。第二，线的形状会影响信号走向：红石粉会自动连向相邻的线、元件和可充能方块，拐弯、上坡、跨方块都有一套连接规则；同一股信号分成两路，两路都拿原强度，不会对半分。这一点和现实里的分压完全不一样——红石的分支不损耗，只在下一次传递时各自衰减。</p><p>衰减之外，还有一套更容易被忽略的规则：充能。红石信号打到方块上，方块本身会被「充能」，然后它再去激活挨着它的元件。充能分强弱：被电源或中继器、比较器直接充能的叫强充能，能激活旁边的元件，也能激活旁边的红石线；只被红石线充能的叫弱充能，只能激活元件，不能激活红石线。</p><p>这条规则解释了新手最常遇到的困惑：为什么信号打到一块石头上，石头旁边的灯亮了，石头旁边的线却不亮。因为那是弱充能。要让它继续传，得加中继器，或者换个接法。</p><p>强充能和弱充能的区别，在紧凑电路里是命根子。同样一个方块，强充能能当「无线电源」用，弱充能只能当「末端」。很多看起来只有几个方块的机器，秘密全在这里。</p><p>我的判断：<strong>红石线的「免费分支」是它和真实电路最大的分水岭之一。</strong>现实里你把信号分给两个负载，每个负载都要分走电流；红石里你分成一百路，每一路都还是满的，代价只是方块数量。</p><h2>中继器：续命、延迟、单向</h2><p>中继器干三件事：把信号拉回 15、给一个 1 到 4 红石刻的延迟、只允许信号单方向通过。三件事里，最容易被低估的是第三件。</p><p>单向性让它变成了二极管。红石线本身是双向的，信号会从强的一端往弱的一端走，也能倒着回灌；中继器一旦插进去，方向就锁死了。所有「只许进不许出」的设计，比如单向门、防倒灌的物品通道、时序里的定向传播，都靠它。</p><p>延迟让它变成了时间工具。四档，每档 0.1 秒，可以精确到 0.1 秒。两个中继器首尾相接成环，每个设 1 档，信号绕一圈是 0.2 秒，这就是最朴素的时钟，频率 5 Hz。把档位调大，周期变长；把中继器换成火把，周期又不一样。红石里的「时间」不是算出来的，是拿元件堆出来的。</p><p>中继器还有一个很少被提起的功能：锁存。把中继器的侧面用另一个中继器或比较器充能，它就会「锁住」，不管输入怎么变，输出都保持当前状态；侧面断电，它才恢复跟随输入。这个功能让中继器不只是延迟线，还是一个可以被电路控制「要不要更新」的闸门。做时序机、做总线、做防止信号回灌的场合，都要用它。</p><p>现实里最接近的东西叫再生中继器（regenerating repeater）：长距离传输会把波形拖脏，隔一段重新整形、重新定时、再发出去。光纤通信里的再生器、以太网里的中继器、总线上的缓冲器，都是这个思路。</p><h2>比较器：从「有没有」到「有多少」</h2><p>红石中继器只认两件事：有信号、没信号。比较器把这个门槛抬高了：它读的是一个 0 到 15 的整数。</p><p>它有两种模式。比较模式：从后面输入一个强度，从侧面输入两个强度，只要后面不小于侧面，就原样输出；否则不输出。减法模式：输出「后面减侧面」的差值，减到负数就归零。侧面两个输入取较大的那个。</p><p>更关键的是它能读容器。箱子、漏斗、投掷器、熔炉、酿造台、讲台、雕纹书架、合成器，里面装了多少东西，比较器能换算成一个强度输出。空的是 0，满的是 15，中间按填充比例分档。这一下，红石从「开关」变成了「仪表」。</p><p>读数不是线性的。容器里装满的程度要经过一个分段函数换算，前几格物品涨得快，后面涨得慢，所以「半满」不一定输出 7 或 8。不同容器的槽位数量不同，同一种填充比例读数也不一样。做分类器的人不背公式，他们用实测：放多少件、读多少强度，记下来，直接用。</p><p>比较器还有一个常被忽略的用法：保持强度。信号穿过比较器，强度不会衰减，也不会像中继器那样被拉满到 15。想在长线上传一个「精确的 7」，只能用比较器，不能用中继器。</p><p>现实里的对应物是模拟比较器，比如 LM393 那一类芯片：两个输入比大小，输出高或低。比较器做的减法、阈值判断、窗口检测，在模拟电路里都是标准动作。它也是红石里唯一一个真正意义上的「模数混合」元件——输入是模拟的（填充度、强度），输出还是那个 0 到 15 的整数。</p><p>我的判断：<strong>比较器是红石的分水岭。</strong>在它之前，红石是逻辑；在它之后，红石可以做测量、做反馈、做回路控制。</p><h2>红石火把：最早的非门</h2><p>红石火把插在方块上，默认亮。给它附着的方块通上电，它熄灭；断电，它重新亮。这就是一个非门：输入真，输出假；输入假，输出真。</p><p>它的延迟是一个红石刻。这个延迟很小，但在早期版本里，它是唯一能把信号「续」下去的东西。中继器出现之前，玩家要传远距离，只能隔几格插一根火把，靠「火把塔」一级一级放大。那种结构又大又慢，还容易烧：红石火把在短时间内被反复开关，会进入一种烧毁状态，要过一会儿才恢复。这个机制当年专门用来限制高频时钟。</p><p>火把还能搭出或非门：两个输入任一为真，输出就为假。或非门是通用门，理论上只靠它就能搭出所有逻辑。早期红石计算机的基础门，大半是火把堆出来的。</p><p>现实里对应的是继电器常闭触点：线圈不通电时触点闭合，通电时断开。继电器逻辑在 PLC 之前统治了整个工业控制，红石火把的行为几乎和它一模一样。</p><h2>活塞：把电变成位移</h2><p>活塞在 2011 年的 Beta 1.7 加入，来源是社区作者 Hippoplatimus 的活塞模组，被 Mojang 收编进原版。它一进来，红石就从「点灯」变成了「搬东西」。</p><p>普通活塞通电伸出，断电收回，但收回时不会把方块拉回来；粘性活塞会把粘住的方块一起拉回。一次最多推十二个方块，超过就推不动。这个上限决定了几乎所有活塞门、隧道机的尺寸。</p><p>2014 年的 1.8 加了粘液块，活塞能把一整块结构带着走，飞行器因此成立：观察者检测到前方变化，给活塞一个脉冲，活塞推一下，整个结构往前挪一格，然后循环。2019 年的 1.15 又加了蜂蜜块，它不和粘液块相粘，两种块搭配，才能做出「只粘一部分」的复杂结构。</p><p>现实里的对应物是气缸和电磁阀：电信号控制阀芯，阀芯控制气流，气流推动活塞杆。区别在于现实的气缸要气源、要密封、要维护，红石的活塞只要一个脉冲，而且永远不会漏气。</p><h2>侦测器：把「变化」本身变成信号</h2><p>侦测器在 2016 年的 1.11 加入。它不检测「有没有信号」，它检测「前面的方块有没有变」：方块被放置、被破坏、状态改变、被活塞推动，它都会输出一个极短的脉冲，长度只有一个游戏刻。</p><p>在它之前，玩家用一种叫 BUD 的结构来检测方块更新——利用活塞的半连接性，让活塞在「本该不变」的时候突然伸出。BUD 是黑科技，体积大、难调、还依赖版本。侦测器把这件事标准化了：一个方块，一个方向，一个脉冲。</p><p>脉冲只有一个游戏刻，0.05 秒。这个长度很关键：它短到活塞只来得及动一下，长到红石线能把它认成一次完整信号。用它做时钟，两个侦测器对着放，就能得到一个周期两刻、频率 10 Hz 的脉冲源，比中继器环快一倍。代价是占地方，而且对更新顺序敏感。</p><p>它的意义不只是方便。它把「事件」变成了电路的一等公民。以前的红石是电平驱动：信号一直在，机构一直动。有了侦测器，电路可以对「刚刚发生了一次变化」作出反应，这是边沿触发，不是电平触发。</p><p>现实里的对应物是边沿检测器、中断引脚、传感器前端。单片机检测按键，用的就是「从高到低的那一瞬间」，而不是「一直是低」。</p><h2>漏斗与投掷器：物流进入电路</h2><p>2013 年的 1.5 更新一次塞进来四样东西：漏斗、投掷器、比较器、红石块。前两个把「物品」变成了可以被电路搬运的东西。</p><p>漏斗可以从上面的容器里吸物品，也可以把物品往下面的容器里推；通上电，它就锁住不动。投掷器把物品直接塞进容器，发射器则把物品「射」出去——一个管物流，一个管投射物，名字很像，行为完全不同。</p><p>这四样东西合起来，红石才第一次能做「生产线」：矿车卸货、熔炉进料、成品入库、满了就停。比较器读容器，漏斗搬物品，红石块当电源，一条回路就成立了。</p><p>现实里的对应物是传送带、料斗、分拣线。工业产线上的「料位检测—启停控制—分流」，和红石里的「比较器—漏斗—分类器」是同一套思路，只是现实里要处理粉尘、卡料、电机过载，红石里只要处理卡顿。</p><h2>合成器：自动化的最后一块</h2><p>2024 年 6 月的 1.21 更新加了合成器。它的样子像工作台，上面是 3×3 的合成格，每个格子可以被「锁定」——锁住的格子不接受任何物品，相当于把配方钉死。收到一个红石脉冲，它就合成一次，把成品从正面吐出来。</p><p>在此之前，游戏里的自动化是断的：你能自动挖矿、自动熔炼、自动分类，但最后一步「把材料合成成品」必须人来点。合成器补上了这一步，从原料到成品可以全程无人。</p><p>锁槽是它和普通工作台最大的区别。3×3 的九个格子，每一个都可以被玩家点一下「关掉」，关掉的格子不接受任何物品，相当于在配方里挖了一个洞。这样一台合成器只能做一种东西，漏斗往里灌料时不会串味。要做多种产物，就并排摆几台，每台锁一种配方。</p><p>它有一个很实用的细节：比较器读合成器，强度是 0 到 9，每个非空或锁定的格子加一。也就是说，电路能知道「料齐了没有」。料齐了再给脉冲，才不会空转。</p><p>现实里的对应物是数控机床、自动装配线、SMT 贴片机。它们都需要两样东西：固定的工艺（配方）和准确的节拍（脉冲）。合成器把这两样都做成了方块。</p><h2>铜灯：一个方块里的记忆</h2><p>铜灯也是 1.21 加的。它不像红石灯那样「通电就亮、断电就灭」，而是「来一个脉冲，翻转一次状态」：亮着的时候给脉冲，它灭；灭着的时候给脉冲，它亮。断电之后，它保持当前状态。</p><p>这就是一个 T 触发器（翻转触发器）被做进了方块里。以前要实现「按一下开、再按一下关」，得用两个火把搭 RS 锁存器，占一格空间、还要调延迟；现在一个铜灯就够了。</p><p>它还有一个和红石无关、但很好玩的属性：亮度随氧化程度下降。刚做出来最亮，放久了氧化变暗，用斧头刮掉氧化层又能恢复。这跟现实里的铜一模一样——铜绿会挡光，也会挡电。</p><p>现实里的对应物是双稳态继电器、晶闸管（SCR）、自锁接触器。按一下启动，再按一下停止，工业控制柜里全是这套逻辑。</p><h2>幽匿感测体：不用线的传输</h2><p>2021 年的 1.17 加了幽匿感测体。它不听红石信号，它听「振动」：走路、跑步、放置方块、开门、开枪、吃东西，都会产生不同频率的振动，它检测到就输出一个脉冲。</p><p>2023 年的 1.20 又加了校准版。普通版对所有振动一视同仁，校准版可以设一个频率，只对那一种振动反应。这相当于给传感器加了一个带通滤波器。</p><p>它带来了一种「无线红石」：不用铺线，靠声音传信号。代价是延迟和误触发——你走过去的脚步也会被它听见。所以它通常不用来传数据，用来做陷阱、做自动门、做「有人来了」的检测。</p><p>现实里的对应物是 MEMS 加速度计、压电振动传感器、声学传感。校准版对应的是频域滤波：从一堆混杂的信号里，只挑出你要的那一个频率。</p><h2>刻：0.1 秒的世界</h2><p>红石的所有时间都建立在「刻」上。游戏每秒跑 20 个游戏刻（20 TPS），一个游戏刻 0.05 秒；一个红石刻等于两个游戏刻，0.1 秒。中继器的一档延迟就是一个红石刻，火把的一次翻转也是一个红石刻左右。</p><p>「刻」还分几种。游戏刻是主循环的心跳；红石刻是红石元件更新的节拍；此外还有计划刻和随机刻。计划刻是「安排在未来某一刻执行的事」，比如水流要扩散、作物要长一级；随机刻是每个区块每一刻随机挑一些方块，让它们有机会生长。红石机器用的是计划刻，农作物用的是随机刻，两套时间表不一样。</p><p>这就是为什么「区块加载了」不等于「农场在工作」。加载只保证区块在内存里，随机刻跑不跑、跑多快，是另一套参数。1.21.5 之后，这两件事被拆得更清楚，旧教程里那句「放在出生点旁边就能一直长」不再成立。</p><p>这个数字决定了红石机器的速度上限。一个逻辑门至少要一个游戏刻来更新，一条组合逻辑链有十个门，就是十个游戏刻，0.5 秒。红石计算机的时钟只能跑到几赫兹，不是设计不出来，是物理上快不了。</p><p>服务器卡顿会破坏这个前提。TPS 掉到 10，一刻就变成 0.1 秒，所有机器慢一半；掉到 5，红石时钟会乱，活塞门会卡在半开。技术玩家嘴里的 MSPT（每刻毫秒数），量的就是「这一秒里，服务器算每一刻花了多久」。</p><p>现实里的对应物是时钟周期和 PLC 的扫描周期。PLC 也是「读输入—跑程序—写输出」一轮一轮地转，一轮的时间叫扫描周期，通常几毫秒到几十毫秒。红石的扫描周期是 50 毫秒，而且不保证准时。</p><h2>2010：红石是为了一扇门出生的</h2><p>红石不是一开始就有的。2010 年 7 月初，游戏还叫 Alpha，Notch 在一次「Seecret Friday」更新里塞进了红石粉、红石火把、拉杆、按钮、压力板和铁门。当时它连名字都没有，社区叫它「Red Ore Dust」，红色矿石粉。7 月 9 日，Notch 才正式把它命名为 Redstone。</p><p>名字的来历也朴素。它叫 redstone，直译就是「红色的石头」，因为矿石是红的，粉末也是红的。没有神话，没有背景故事，就是一个描述性命名。后来社区给它编了无数设定，官方也顺着编，但最初它就是一堆会发亮的红粉。</p><p>最早的红石只能做很朴素的事：把信号从一处传到另一处，开门，点 TNT，亮一下。信号最多十五格，想传远，只能靠火把一级一级接。那时候没有中继器，没有比较器，没有活塞，没有漏斗。今天回头看，那是一套只有「线」和「非门」的系统。</p><p>但它已经定下了三条规矩，后面十几年没变过：信号有强度、强度会衰减、元件按刻更新。所有后来的东西，都是在这三条上长出来的。</p><h2>Beta 时代：中继器与活塞</h2><p>2011 年 2 月的 Beta 1.3 加了中继器。这是红石史上第一次真正的抽象升级：在此之前，长距离传输要靠火把塔，又大又慢；中继器把「放大」和「延迟」做进了同一个方块，还顺手给了单向性。红石电路从「能通」变成了「能定时」。</p><p>同一年 6 月的 Beta 1.7 加了活塞。它来自社区的活塞模组，Mojang 把它收编进原版。活塞让红石第一次能推动世界：活塞门、隐藏楼梯、自动农场、后来的飞行器，都从这里开始。</p><p>这两年还有一个变化：红石开始有「作品」了。2011 年前后，论坛上出现了红石计算机、红石音乐、红石小游戏。玩家发现这套系统不只可以开门，它可以计算。</p><h2>1.5 红石更新：从逻辑到物流</h2><p>2013 年 3 月的 1.5 被官方直接命名为「红石更新」。它一次加了比较器、漏斗、投掷器、红石块、测重压力板、陷阱箱、阳光探测器。这一批东西的方向很一致：让红石能处理「量」和「物」。</p><p>比较器让信号可以被测量和比较，漏斗让物品可以被搬运，投掷器让物品可以进出容器，红石块给了第一个可以被活塞推动的电源方块。四条合起来，自动化农场和物品分类器才成为可能。</p><p>我的判断：<strong>1.5 是红石从「电路」变成「工程」的那一次。</strong>在此之前，玩家做的是逻辑；在此之后，玩家做的是产线。</p><h2>1.8 到 1.20：抽象一层一层往上走</h2><p>接下来的十年，更新变得零碎，但方向很清楚：把复杂结构压缩成单个方块。</p><table><thead><tr><th>年份</th><th>版本</th><th>加入的东西</th><th>改变了什么</th></tr></thead><tbody><tr><td>2014</td><td>1.8</td><td>粘液块</td><td>活塞能带动整块结构，飞行器成立</td></tr><tr><td>2016</td><td>1.11</td><td>侦测器</td><td>边沿检测标准化，BUD 退场</td></tr><tr><td>2019</td><td>1.14</td><td>讲台</td><td>比较器能读页码，信号有了新输入</td></tr><tr><td>2019</td><td>1.15</td><td>蜂蜜块</td><td>与粘液块不互粘，复杂飞行器成立</td></tr><tr><td>2021</td><td>1.17</td><td>幽匿感测体、避雷针</td><td>振动成为信号，无线传输出现</td></tr><tr><td>2023</td><td>1.20</td><td>校准幽匿感测体、雕纹书架</td><td>频率过滤，容器读数更细</td></tr><tr><td>2024</td><td>1.21</td><td>合成器、铜灯</td><td>合成自动化，翻转触发器方块化</td></tr></tbody></table><p>这张表里最值得说的是侦测器。它把「方块变了」这件事变成了一个脉冲，等于给红石加了一种新的输入类型。以前电路只能对「电平」反应，现在可以对「事件」反应。很多紧凑电路、高频时钟、自动农场，都是靠它才成立的。</p><p>另一个是粘液块。它让「机械」不再是一个个独立的活塞，而是一整块可以移动的结构。飞行器、世界吞噬者、隧道挖掘机，都是粘液块之后才有的东西。</p><h2>1.21 之后：版本改制与那一刀</h2><p>2024 年 6 月的 1.21 是最后一个用「1.x」编号的大更新。从那之后，Mojang 改成一年多次「游戏掉落」（game drop），版本号先是在 1.21 后面加小数，2026 年起直接改用年份：26.1、26.2、26.3。截至 2026 年 11 月，Java 版最新是 26.3，2026 年 9 月 15 日发布。</p><p>对红石玩家来说，编号怎么变不重要，重要的是机制有没有动。2025 年的 1.21.9 做了一件事：取消固定的出生点区块，连同控制它大小的游戏规则一起删掉。在此之前，世界出生点周围有一圈区块会一直加载，很多农场靠这个「人不在也能跑」；现在这条保证没有了，机器要么靠玩家守着，要么靠加载器。</p><p>同一时期，1.21.5 还调整了随机刻的处理：区块被加载，不等于区块里的农作物、树苗、甘蔗会随机生长。这两件事以前常被混为一谈，现在必须分开算。</p><p>我的判断：<strong>红石的历史，一半是加东西，一半是删保证。</strong>加东西的时候玩家做新机器，删保证的时候玩家重做旧机器。每次版本更新，技术社区都要重新验证一遍自己的产线，这不是折腾，是这套系统的成本。</p><p>这里放一个讲红石数字电子技术的课程，讲者把红石当数字电路来讲，门、时序、触发器都对照着说，适合已经会搭门、想补理论的人。</p><figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1fm4y1e75Y" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1fm4y1e75Y&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>红石中的数字电子技术（上海交通大学 Minecraft 社）</figcaption>
</figure><h2>逻辑门：三样东西就能搭完</h2><p>红石能算，靠的是三个基本门：非、或、与。非门一个火把就够。或门几乎是免费的——两条红石线汇进同一条线，任一条有信号，输出就有信号。真正费劲的是与门。</p><p>红石线的合并天然是「或」，不是「与」。要做出「两个都真才真」，最稳的办法是用德摩根定律：先把两个输入各自反相，合并（这时是「或非」），再反相一次。¬(¬A ∨ ¬B) 等于 A ∧ B。三个非门加一条合并线，就是与门。</p><p>异或稍微麻烦一点。比较器的减法模式可以帮上忙：两路信号相减，差不为零就说明两个输入不一样。但减法会饱和——被减数小于减数时直接归零，分不清「小多少」和「小到零」。所以完整的异或要用两个比较器，或者用经典的双火把结构。</p><p>或门之所以免费，是拓扑决定的：红石线本身就是一根「线或」总线，任意一处有信号，整段都亮。现实里的或门要两个输入各走一条支路再汇合，红石里你把两条线往同一格上一接，或就成立了。与门贵，是因为「全部为真」在拓扑上要求「串联」，而红石线的信号不能穿过一个「被关闭的开关」继续走，只能靠反相和再反相绕出来。</p><p>这些门搭出来都很占地方。一个与非门在现实里是几个晶体管，在红石里是几个方块加一段线，体积按「立方米」算。这也是为什么红石计算机看起来像一栋楼，而不是一块芯片。</p><p>现实里的对应物是 74 系列逻辑芯片：7400 是四路二输入与非门，7408 是与门，7432 是或门，7486 是异或。芯片里几十个晶体管做的事，红石里要用几十个方块。</p><h2>时序：时钟、锁存、计数</h2><p>组合逻辑只会「输入变，输出跟着变」，它不记得过去。要让电路有记忆，必须把输出接回输入，形成反馈。红石里所有记忆结构，本质都是一个环。</p><p>最简的环是两个红石火把互相指着对方的附着方块。A 亮的时候压制 B，B 灭；B 灭又不压制 A，A 保持亮。这是一个稳定状态。给它一个外部脉冲打破平衡，它会翻到另一个稳定状态：A 灭、B 亮。这就是 RS 锁存器，一个比特的记忆。</p><p>时钟是另一个环：中继器首尾相接，信号绕圈跑。两个中继器各设一档，绕一圈 0.2 秒，频率 5 Hz；把档位调大，周期变长；把中继器换成火把，周期又不一样。时钟的周期和占空比，全靠元件数量和档位凑出来，没有「频率旋钮」这种东西。</p><p>计数器可以用漏斗做：每进一件物品，比较器的读数加一；读到一个阈值就输出。也可以用二进制计数器：把若干个 T 触发器级联，每一个的输出当时钟喂给下一个，就能数 0 到 2ⁿ−1。铜灯本身就是一个 T 触发器，做二进制计数比以前省一半方块。</p><p>现实里的对应物是 555 定时器、D 触发器、74LS160 计数器。逻辑一模一样，差别在规模：现实里一个芯片八个脚，红石里一个计数器占一面墙。</p><h2>半连接性：一个 bug 变成一门手艺</h2><p>Java 版有一个别处没有的机制，叫半连接性（quasi-connectivity，简称 QC）。活塞、发射器、投掷器这三样，除了被自己相邻的方块激活，还能被「能激活它上方那一格」的信号激活。换句话说，正上方那格被充能，它也会动，哪怕它和那格根本没接触。</p><p>这个行为的来源是门。门占两格，激活上半格或下半格，整扇门都开。Mojang 当年把「上方一格被激活」写进了这几类方块的判定里，后来发现改不掉——改了会破坏大量已有机器，于是保留下来，成了「特性」。基岩版没有这个机制，所以两个版本的机器经常不通用。</p><p>半连接性带来的直接产物是 BUD：方块更新检测器。利用 QC，让活塞处于「差一点就被激活」的临界状态，任何一次方块更新都会把它推过去，于是它变成了一个「附近有东西变了」的探测器。在侦测器出现之前，这是检测方块变化的唯一办法。</p><p>我的判断：<strong>QC 是理解红石社区的一把钥匙。</strong>它说明这套系统的规则不是从纸上推出来的，是十几年里被玩家一点点试出来、再被官方默认的。很多「标准电路」其实是「标准 bug 用法」。</p><p>现实里找不到完全对应的东西。硬要找，像早期 CPU 的未定义指令、x86 的 A20 地址线、浏览器的怪异模式——都是历史包袱被保留下来，最后变成生态的一部分。</p><h2>更新顺序：Java 版真正的时间</h2><p>很多人以为红石是「同时」计算的：这一 Tick 所有元件一起看输入，一起改输出。Java 版不是。Java 版是按更新顺序一个一个处理的：某个方块变了，它通知周围的方块，周围的方块再检查自己要不要变，变了再通知下一圈。整个过程像涟漪，一圈一圈推开。</p><p>这就产生了一个后果：同一个 tick 里，一个方块可能被更新好几次。如果设计得巧，可以让活塞在同一 tick 里推出又收回，这就是「0t」；可以让信号跳过中间的延迟，这就是「更新跳略」；可以让更新队列溢出，后面的更新全部不执行，这就是「更新抑制」。</p><p>更新顺序还养出了两种「瞬时传输」。一是墙电：在 Java 版里，墙方块能瞬时把更新传给整面墙，玩家把信号打进墙里，另一端立刻收到，比铺线快得多。二是气泡柱：气泡柱也能瞬时传递更新，做垂直传输特别省事。这两种都不是「信号在线上跑」，是「更新在方块之间跳」，所以它们不受十五格限制，也不受中继器延迟影响。</p><p>基岩版走另一条路：它有一个统一的红石系统，每两个游戏刻把附近的红石元件算一遍。所以基岩版的行为更「整齐」，但也更慢，而且没有 QC。两个版本的机器不能照抄，根源就在这里。</p><p>我的判断：<strong>Java 版的红石不是同步电路，是事件驱动的仿真。</strong>它像什么？像 JavaScript 的事件循环，像游戏引擎的帧更新，像一堆回调函数按注册顺序执行。理解了这一点，很多「玄学」就不玄了：机器换个位置就坏，是因为更新顺序变了。</p><h2>图灵完备：从与非门到 CPU</h2><p>与非门（NAND）是通用门：与、或、非都能用它搭出来。只要有了与非门，再加上可以无限扩展的存储，就能搭出图灵机。红石能搭与非门，所以红石在这意义上是图灵完备的。</p><p>这句话要加一个限定：单台红石机器是有限状态机，因为方块数量有限、内存有限。图灵完备说的是「这套规则允许你无限扩展」。真要按照图灵机的定义，需要无限长的纸带；游戏里没有无限长的纸带，只有你愿意盖多长。</p><p>一台红石 CPU 要有五样东西：算术逻辑单元（算加减和逻辑运算）、寄存器（存当前的数据）、程序计数器（记住下一条指令在哪）、指令存储器（把程序存成红石火把或方块）、时钟（推动每一步）。再加输入输出，就是一台完整的冯·诺依曼机。</p><p>难点不在单个部件，在总线。现实里的 CPU 用一组线把各个部件连起来，同一时刻只有一个部件能往总线上写；红石里要做同样的「三态」控制，得用大量中继器做单向阀，体积一下膨胀几十倍。所以红石 CPU 的布线往往比逻辑本身更占地方。</p><p>实际做出来的东西已经不少。GitHub 上有一个 8 位红石 CPU 项目，用红石搭出 ALU、16 字节寄存器、256 字节内存、256 条指令的 ROM、程序计数器和一个 0.1 Hz 的时钟，还带一个三位七段数码管。0.1 Hz 是什么概念：十秒一个周期，算一次加法要等好几个周期。</p><p>更出名的几个：mattbatwings 的 8 位 CPU；Fangorn 在红石计算机上跑《我的世界》本身，所谓「MC in MC」；QCPU 用更新抑制把频率推到 5 Hz 左右。5 Hz 已经接近这套系统的物理上限，再快就要靠 0t 技巧，而 0t 依赖版本，随时会失效。</p><p>我的判断：<strong>红石计算机的意义不在算得快，在证明「规则足够简单时，能长出通用计算」。</strong>它慢得可笑，但它真的在算。这件事比任何一台真电脑都更能说明计算是什么。</p><figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1U34y1X7cZ" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1U34y1X7cZ&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>1Hz 红石电脑（1055Lab）</figcaption>
</figure><h2>现实原型一：导线与逻辑电平</h2><p>红石粉最像的东西是导线，但不是普通导线，是「理想化的数字导线」：零电阻、固定压降、分支不损耗。现实里的导线有电阻，长度一长，电压就掉；数字电路用「逻辑电平」来解决这件事——只要电压落在高电平区间就算 1，落在低电平区间就算 0，中间那段是禁止区。</p><p>红石没有禁止区。它把「1」定义成「有信号」，把「强度」定义成一个精确的整数。所以红石不会因为线太长而「读到不确定的值」，它只会干脆地衰减到 0。这比现实电路干净，也比现实电路脆弱：现实电路有噪声容限，红石没有噪声，只有规则。</p><p>中继器对应再生中继器，比较器对应模拟比较器，红石火把对应反相器。这三样加起来，就是一条最简的数字链路：整形、比较、反相。现实里的接收器、ADC、缓冲器，做的是同一件事。</p><p>还有一层更深的对应：1937 年，香农在硕士论文里证明，继电器开关电路和布尔代数是一回事——串联是与，并联是或，常闭触点是非。红石把这条定理做成了可以拿在手里玩的东西。</p><h2>现实原型二：继电器与 PLC</h2><p>工业控制的历史，是从继电器柜走到 PLC 的。早期的产线用成排的继电器搭逻辑：触点串联实现「与」，并联实现「或」，常闭触点实现「非」。几百个继电器装在一个柜子里，改一次工艺就要重新接线，接错一根就整线停机。</p><p>1968 年前后，Bedford Associates 做出 MODICON，第一台可编程逻辑控制器。它最关键的设计不是硬件，是编程界面：沿用继电器梯形图的样子，让电工不用学计算机也能改程序。梯形图的规则到今天都没变：左边是电源轨，右边是线圈，横着一行一行，串联是与，并联是或，常闭是非。</p><p>红石和这套东西的对应非常直接。拉杆是输入触点，红石线是导线，中继器是延时继电器，活塞和红石灯是线圈（输出），RS 锁存器是「启保停」电路——按一下启动，自己给自己供电，按停止才断。工业控制里最经典的自锁回路，红石里两个火把就能搭。</p><p>差别在规模。PLC 一个柜子控制一条产线，红石一面墙控制一个农场；PLC 有诊断、有冗余、有安全等级，红石只有「亮没亮」。但底层的那套布尔逻辑，是同一套。</p><p>我的判断：<strong>如果只挑一个现实原型来理解红石，选 PLC，不要选电脑。</strong>电脑离红石太远，PLC 离红石很近：都是「输入—逻辑—输出」，都是按周期扫描，都是用梯形图／红石线把因果画出来。</p><figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1JPaD6sEhW" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1JPaD6sEhW&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>物理电路图与红石电路的对照（月云烬）</figcaption>
</figure><h2>现实原型三：FPGA 与「软逻辑」</h2><p>再往深一层，红石像 FPGA。FPGA 是一块「可以反复改接线的芯片」：里面有一堆查找表（LUT）和可编程互连，你写一段硬件描述语言，工具把它编译成连线，芯片就变成了你要的电路。红石也一样：方块是逻辑资源，红石线是互连资源，你亲手把连线铺出来。</p><p>但两者有一个关键差别。FPGA 的查找表可以直接实现任意真值表，四个输入的任何函数都能塞进一个 LUT；红石没有 LUT，只有门，任何函数都要拆成门再拼。所以红石更像「用继电器搭的计算机」，而不是现代芯片。</p><p>这个差别决定了红石的体积。现实中一个 8 位加法器是几百个门，塞进指甲盖；红石里同样的加法器是几百个方块，占一个区块。计算的抽象层级越低，物理体量越大，这个规律在两边都成立。</p><p>ASIC、FPGA、红石，可以排成一条线：ASIC 是一次性刻死的电路，FPGA 是可重构的电路，红石是手工可重构的电路。越往右，越灵活，越慢，越贵（按人力算）。</p><h2>不像现实的地方</h2><p>把能对上的说完，更值得说的是对不上的。这些地方才是红石的本来面目。</p><ul><li><strong>没有电压和电流。</strong>红石没有「电势差」，没有「电流流过」，也没有「功率」。它只有布尔值和强度，谈「红石耗电」是比喻。</li><li><strong>没有阻抗和匹配。</strong>现实里信号线要匹配阻抗，否则反射、振铃；红石线随便拐弯、随便分支，不会反射。</li><li><strong>没有扇出限制。</strong>现实里一个门驱动太多负载会带不动；红石一个信号可以驱动一整面墙的活塞，理论上没有上限，只有延迟。</li><li><strong>没有全局时钟。</strong>现实电路靠时钟沿同步，红石没有统一的时钟，靠更新顺序和元件延迟自己凑。</li><li><strong>没有地线。</strong>现实电路必须共地，红石不需要回路，信号是「单向广播」的。</li><li><strong>空间就是布线。</strong>现实里线可以压在板子下面，红石里线占方块、占体积、占视野。红石机器的「设计」很大一部分是建筑问题。</li></ul><p>我的判断：<strong>红石是「逻辑的模型」，不是「电的模型」。</strong>拿它学布尔代数、学时序、学状态机，非常合适；拿它学电路分析、学电磁学，会学到一堆错的直觉。</p><h2>生电：在生存里造工厂</h2><p>「生电」是中文社区的缩写，全称「生存实用电路」：在生存模式里能建、建得起、跑得稳的红石电路。它追求的东西和实验室里的电路不太一样——产量高、材料便宜、不卡、不容易坏、最好还能 AFK。</p><p>这个词容易被误解成「一种红石技术」。它其实是一种约束条件下的工程。同样一台机器，创造模式里可以堆二十个漏斗、铺三百格线；生存模式里要算铁够不够、史莱姆球够不够、区块加载跟不跟得上。生电玩家的本事，一大半不在电路，在取舍。</p><p>更关键的是：生电的核心往往不是红石，是游戏机制。刷怪要懂生成算法，种地要懂随机刻，刷铁要懂村庄，运输要懂实体碰撞。红石只是把这些机制串起来的那根线。很多高效农场甚至没有几个红石元件，靠的是水流、矿车和掉落物。</p><p>我的判断：<strong>生电是「用游戏规则做工程」，不是「用红石做电路」。</strong>把这句话记住，很多教程里那些看起来没来由其妙的细节就说得通了。</p><figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1tD421u7QC" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1tD421u7QC&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>什么是生电：生存模式里的无限资源（铵盐ji）</figcaption>
</figure><h2>生电案例一：铁傀儡农场</h2><p>铁傀儡农场是最典型的生电机器。它不挖矿，它让村民「害怕」，害怕就召唤铁傀儡，铁傀儡被杀死掉 3 到 5 个铁锭。整个农场就是一台把恐惧变成铁的机器。</p><p>Java 版的规则很具体。五个有意愿的村民，彼此在十格内，凑成一组；每六十秒传播一次言论，条件满足就尝试生成；生成点在村民脚下水平 ±8 格、竖直 ±6 格的范围内，系统最多试十次；生成后三十秒内不会再生成；十六格内已经有铁傀儡，就不生成。</p><p>还有一条更细的：如果村民处于恐慌状态，而且二十分钟内睡过觉，只需要三个村民就能触发，每五秒试一次。所以高效设计会放一只僵尸在玻璃后面，让村民看得见、又碰不到，再周期性挡住视线，让他们能睡一小会儿、重置恐慌计时。</p><p>村庄本身还有一套判定。村民要认领床和工作站，床要能躺下，工作站要能用；村庄的中心、大小、人口，都影响生成。铁傀儡还有一个人口上限：每十个村民最多一个自然生成的铁傀儡，所以农场必须把新生成的傀儡迅速处理掉，否则上限占满，就不再生成。</p><p>这些数字不是玩家编的，是拆游戏代码拆出来的。生电社区的知识，很大一部分就是这种「把规则读到小数点后」的活。</p><p>现实里的对应物是养殖场和产线：给定环境条件，让生物按预期繁殖或产出，再自动收集。区别在于现实里的「恐惧」是应激反应，会掉膘、会生病；游戏里的恐惧是一个布尔条件，满足就触发，没有代价。</p><h2>生电案例二：刷石机与农作物</h2><p>刷石机是最早的自动资源机之一：水碰到岩浆源，生成圆石；圆石被活塞推开，或者被玩家挖掉，新的圆石又生成。它不需要红石也能跑，一个活塞加一个观察者就能自动收割，材料只要几个铁和红石。</p><p>农作物走另一条路。小麦、胡萝卜、马铃薯、甜菜、甘蔗、竹子、仙人掌，生长靠随机刻：每个区块每一刻随机挑一些方块，让它们尝试生长。所以农场的产量不取决于你按了多少按钮，取决于随机刻跑得多快、地块多大、光照够不够。</p><p>自动收割一般用观察者：甘蔗长高一格，观察者检测到状态变化，给活塞一个脉冲，活塞把甘蔗推掉，掉落物被水流冲进漏斗。竹子长得快，适合做燃料和脚手架；仙人掌不需要水，可以直接掉在沙子上。</p><p>现实里的对应物是连续生产和批次生产。刷石机是连续流，来多少收多少；农作物是批次，等它长，长完一起收。生电玩家要在这两种节奏里选，选错了，要么机器空转，要么产物堆爆。</p><h2>生电案例三：分类与交易</h2><p>物品分类器是生电的另一个基础件。它的核心是比较器读漏斗：漏斗里放固定数量的「样板」物品，再留一格放要分类的东西；不同物品堆叠上限不同，比较器读出的强度就不同，超过阈值才输出信号，把物品吸走。</p><p>最经典的配置是五格漏斗：第一格放 41 个可堆叠物品，后面四格各放 1 个。这个比例刚好让比较器输出一个特定强度，只有混进来的「非样板」物品会改变它。这套设计用了十几年，到现在还在用。</p><p>村民交易是另一条线。村民有职业、有等级、有补货机制；给图书管理员配讲台，给铁匠配锻造台，交易内容就定了。生电玩家会建「交易大厅」，把村民关在小格子里，用僵尸吓出折扣，再用绿宝石换附魔书。</p><p>现实里的对应物是自动分拣线和供应链。快递分拣中心读条码、按目的地分流；红石分类器读信号强度、按物品种类分流。原理不同，目的完全一样。</p><h2>生电的代价：卡顿与加载</h2><p>生电机器不是免费的。每一个漏斗、每一个活塞、每一只被加载的实体，都要占服务器的主刻预算。机器一多，MSPT 上去，TPS 下来，所有东西都变慢。技术服里最常见的争论不是「这台机器产量多少」，是「这台机器值不值这些卡顿」。</p><p>优化手段因此变成生电的核心技能：能用一个漏斗就不用两个，能用堆肥桶就不用箱子，能让物品合并就合并，能让机器间歇运行就不让它常开。有人管这叫「省 Lag」，本质是资源调度。</p><p>具体做法很琐碎：漏斗能关就关，用红石信号锁住不用的漏斗，比让它空转省得多；物品及时合并，散落在地上的每一堆都是一个实体；活塞少用，尤其是高频活塞，每次推动都要算一遍周围方块；能不加载的区块就别加载，机器分区、按需启动。这些手段单个看都很小，乘上几百台就是生死差别。</p><p>加载是另一道坎。机器只在被加载的区块里跑。2025 年的 1.21.9 取消了固定的出生点区块，以前那种「建在出生点旁边、人走开也能跑」的做法失效了；现在的选择是玩家守着、用加载器、或者接受它停机。</p><p>我的判断：<strong>生电的上限不是红石知识，是服务器预算。</strong>同一台机器，单人世界能跑到每小时几千，服务器上可能连十分之一都跑不到。做机器的人迟早要面对这条线。</p><figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1X1ggzZEUC" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1X1ggzZEUC&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>从零开始玩生电（3.5 小时入门）</figcaption>
</figure><h2>创电：在创造模式里追极限</h2><p>「创电」是「创造红石电路」的缩写：在创造模式里设计、测试、运行的红石电路，不考虑材料成本。它和生电正好相反——生电问「这个能不能在生存里建起来」，创电问「这个东西的极限在哪里」。</p><p>创电追求几个指标：TT（tick throughput，每游戏刻处理多少物品）、体积（多少立方米）、延迟（多少游戏刻）、频率（每秒多少个周期）、稳定性（会不会因为更新顺序崩掉）。这些指标互相打架，优化一个通常要牺牲另一个。</p><p>TT 是最常用的指标：一个机器每一游戏刻能处理多少件物品，单位是「件/刻」。一台 TT 为 1 的分类器，理论上每秒能分 20 件；TT 为 0.5，就是每两刻一件。这个数字比「每小时多少」更准，因为它不受卡顿影响，是机器的固有速度。</p><p>体积的算法也有讲究：算的是外接长方体，长×宽×高，单位是方块。同样一台机器，有人能做到 3×3×2，有人只能做到 7×5×4，功能一样，水平差一倍。所以创电社区比的不只是「能不能」，还有「多小」。</p><p>代表作是各种「极限机器」：0.15 秒开完的 2×2 无痕玻璃门、5 Hz 的红石时钟、把整个结构塞进一格宽的「单片电路」、用更新抑制压掉延迟的计算机。这些东西在生存里没有实用价值，但它们把规则推到了边界。</p><p>现实里的对应物是超频和竞速。超频玩家把 CPU 推到厂商没承诺的频率，靠的是电压、散热和对边界的理解；创电玩家把红石推到版本没承诺的行为，靠的是更新顺序、0t 和对 bug 的理解。两者都有风险：一次版本更新，记录就作废。</p><h2>0t 与更新抑制：把规则用到极限</h2><p>0t 是「零游戏刻」的缩写：让一个动作在同一游戏刻内完成，看起来没有延迟。它利用的是更新顺序——在同一个 tick 里，一个方块可以被多次更新，活塞可以在信号还没撤销的时候推出又收回。</p><p>更新抑制更极端：让方块更新的队列溢出，后面的更新全部不执行。游戏为了防止无限递归，给更新传播设了一个上限；把这个上限撑爆，剩下的更新就被跳过。用它可以让方块停在一个「不该存在」的状态，从而省掉大量延迟。</p><p>这些技巧都有代价。它们依赖具体的实现细节，不是公开承诺的规则；版本一改，机器就坏。技术社区对它们的态度也分裂：有人认为是「把系统理解透了」，有人认为是「在利用未定义行为」。</p><p>我的判断：<strong>0t 和更新抑制是红石的「超频」。</strong>它们证明系统的边界是可以推的，也证明推边界的人必须接受随时失效。</p><h2>生电与创电：两种工程观</h2><p>把两者放在一起看，差别不在技术，在约束。</p><table><thead><tr><th>维度</th><th>生电</th><th>创电</th></tr></thead><tbody><tr><td>模式</td><td>生存</td><td>创造</td></tr><tr><td>成本</td><td>材料、时间、风险都要算</td><td>不计成本</td></tr><tr><td>目标</td><td>产量、稳定、低卡顿</td><td>速度、体积、延迟、频率</td></tr><tr><td>敌人</td><td>服务器预算、区块加载</td><td>版本更新、物理上限</td></tr><tr><td>知识来源</td><td>游戏机制（刷怪、随机刻、村庄）</td><td>红石机制（更新顺序、0t、QC）</td></tr><tr><td>类比</td><td>工厂的工艺工程师</td><td>赛车的调校师</td></tr></tbody></table><p>但它们有共同点：都在研究规则，而不是在「玩」规则。生电玩家读生成算法，创电玩家读更新顺序，读到的东西不一样，方法是一样的——提出假设、做实验、记录结果、复用结论。</p><p>我的判断：<strong>生电和创电不是两个圈子，是同一种态度的两端。</strong>一端向现实妥协，一端向极限试探。中间那一大片，才是大多数玩家待的地方：做一台能用的自动门，修三次，最后放弃，改成手动。</p><h2>技术玩家的工具箱</h2><p>红石玩到一定深度，靠的不再是手，是工具。技术社区有一套自己的软件栈，和红石本身一样重要。</p><ul><li><strong>投影模组（Litematica）。</strong>把别人设计好的机器存成一个「全息投影」，在你世界里半透明地显示出来，照着摆。没有它，一台几千方块的机器要对着视频一格一格数，几乎不可能复现。</li><li><strong>Carpet 模组。</strong>给技术服加可控的游戏规则：固定随机刻、调整 TPS、显示更新顺序、打印方块事件。它把「玄学」变成了可观测的量。</li><li><strong>结构方块与调试棒。</strong>原版自带。结构方块可以保存、复制、粘贴一整块建筑；调试棒可以改方块状态，不用破坏重放。做实验时，这两样比红石本身更常用。</li><li><strong>WorldEdit。</strong>大范围填充、替换、复制。造一台机器之前，先用它铺平场地、清空区块。</li><li><strong>录制与回放。</strong>技术玩家会用逐刻录屏、慢放、坐标对齐来复盘一次失败，和运动员看录像是一个道理。</li></ul><p>这套工具改变的不只是效率，还有知识的形态。一个设计可以被保存成投影文件、被精确复现、被逐条比对，红石才从「手艺」变成了「可以积累的工程」。</p><p>我的判断：<strong>红石社区的真正产出不是机器，是这些可复现的方法。</strong>机器会随版本失效，方法不会。</p><h2>另一条支线：红石音乐</h2><p>红石不只能造机器，也能演奏。音符盒右键调音，一次升半音，范围两个八度；在它下面垫不同的方块，音色会变——木头是贝斯，石头是鼓，沙子是沙锤，玻璃是叮的一声，羊毛是闷音。一排音符盒加一条时钟线，就是一台自动演奏的乐器。</p><p>红石音乐的做法很手工：先定速度，算出每一拍占几个红石刻；再把谱子拆成一个个音符，每个音符对应一个音符盒、一个坐标、一次触发；最后用中继器把时间轴铺出来。一首三分钟的歌，可能要铺几百米长的线，占掉半个区块。</p><p>有人做古典，有人做动漫主题曲，有人把整张专辑搬进游戏。技术社区里，红石音乐和生电、创电并列，是第三条支线：它不追求产量，也不追求极限，它追求「像」。</p><p>现实里的对应物是 MIDI 音序器和自动演奏钢琴。音符盒是音源，红石线是时间轴，中继器是节拍器。区别在于 MIDI 可以无限叠轨，红石音乐要一个方块一个方块地摆，摆错一格，整首曲子就错一拍。</p><h2>五级台阶</h2><p>红石的知识是有台阶的。绝大多数人卡在第二级，少数人上到第三级，能上第四级的人已经可以叫「会红石」了。</p><ul><li><strong>第一级：输入与输出。</strong>拉杆、按钮、压力板控制门、灯、活塞。要理解的是「谁给信号、谁收信号」，以及红石线怎么连。</li><li><strong>第二级：时间。</strong>中继器、火把、侦测器搭出时钟和脉冲。要理解的是「延迟」和「边沿」：电平一直高不等于动作一直发生，很多机器要的是「变化的那一下」。</li><li><strong>第三级：状态。</strong>RS 锁存器、T 触发器、计数器。要理解的是「记忆」：输出接回输入，电路就能记住一件事。铜灯让这一级的门槛降到了最低。</li><li><strong>第四级：数据。</strong>总线、比较器、ALU、寄存器堆。要理解的是「一个数怎么在电路里走」，以及怎么用一组线同时传多个比特。</li><li><strong>第五级：指令。</strong>程序计数器、指令译码、时钟节拍。要理解的是「机器怎么执行一条指令」，以及「程序」和「电路」其实是同一件事的两种写法。</li></ul><p>每一级之间不是知识量的差别，是视角的差别。第一级看的是「连不连得上」，第三级看的是「记不记得住」，第五级看的是「算不算得完」。很多人学了三年还在第一级打转，不是不聪明，是没人告诉他还可以往上走。</p><h2>红石与编程：同一件事的两种写法</h2><p>把红石的元件和编程语言的概念摆在一起，对应关系清楚得有点意外。</p><table><thead><tr><th>红石</th><th>编程</th></tr></thead><tbody><tr><td>红石线</td><td>布尔变量</td></tr><tr><td>中继器</td><td>赋值与延时</td></tr><tr><td>比较器</td><td>比较运算、取模</td></tr><tr><td>RS 锁存器</td><td>一个比特的变量</td></tr><tr><td>时钟</td><td>循环</td></tr><tr><td>计数器</td><td>循环变量</td></tr><tr><td>ROM（火把阵列）</td><td>常量表、查表</td></tr><tr><td>状态机（锁存器加译码）</td><td>switch / 状态转移</td></tr><tr><td>总线加三态门</td><td>数据总线、多路选择</td></tr></tbody></table><p>缺的东西也很清楚：没有函数调用，没有栈，没有指针，没有递归。要用，得自己用内存和跳转指令模拟。所以红石计算机的软件生态极小，写一个乘法都要手写微码。</p><p>但有一件事是共通的：模块化。红石高手做机器，会先把子电路封成一个「黑盒」——只留输入和输出，内部怎么实现不管；编程高手写代码，会把功能封成函数——只留参数和返回值，内部怎么实现不管。两件事的心理动作一模一样。</p><p>我的判断：<strong>红石和编程练的是同一种能力——把一个连续的现实问题，拆成离散的状态和转移。</strong>区别只在介质：一个用方块，一个用字符。</p><h2>为什么值得</h2><p>红石最容易被误解成「游戏里的电学」。它不是。它真正教的东西，是系统：输入怎么变成输出，状态怎么保存，时间怎么排队，反馈怎么稳定，约束怎么改变设计。</p><p>这些东西在别处也能学，但红石有一个别处没有的好处：因果是可见的。你铺一条线，信号走过去，活塞动一下，全过程在你眼前，没有示波器，没有万用表，也没有「大概是这里虚焊了」。坏了就是坏了，你能一格一格地看。</p><p>对普通玩家来说，红石也不是必修课。不会红石，游戏照样能通关，房子照样能盖。但会一点之后，你看世界的方式会变：一扇自动门不再是一扇门，是「检测—延时—执行」；一条流水线不再是流水线，是「缓冲—分流—汇合」。</p><p>我的判断：<strong>红石的价值不在它能造什么，在它让「逻辑」变成了可以摸的东西。</strong>大多数人一辈子不需要设计电路，但每个人都需要把一件事拆成步骤、把步骤排成顺序、把顺序里的依赖找出来。红石是这件事最便宜的练习场。</p><h2>边界</h2><p>最后说清楚这篇不成立的地方。</p><ul><li>红石不是物理教材。它能类比逻辑电平，不能类比电磁学；拿它理解电压、电流、阻抗，会得到错的直觉。</li><li>Java 版和基岩版不是同一套系统。QC、更新顺序、0t，这些只在 Java 版成立；基岩版有自己的红石系统，每两游戏刻统一更新。</li><li>生电的产量、创电的记录，都依赖版本和设计。同一个名字的机器，换一个版本可能差一倍，换一个作者可能完全不能跑。</li><li>「图灵完备」是理论说法。单台机器是有限状态机；说它图灵完备，前提是允许无限扩展。</li><li>本文的机制描述以 Java 版 26.3 前后的行为为准。红石改过很多次，旧教程里的数字不一定还成立。</li></ul><p>回到开头那撮红粉。它不导电，不通电，也不会烧坏。它只是把「因为」和「所以」摆在了地上，让你能看见信号从这头走到那头，然后推动一个方块。</p><p>一个游戏愿意花十几年，往一套只有开和关的系统里加东西，加到有人用它造出计算机、造出工厂、造出一整套职业，这件事本身比红石电路更值得想一想。</p><h2>参考</h2><ul class="pg-refs"><li><a href="https://www.mc-mod.net/?p=517274" target="_blank" rel="noopener">How redstone mechanics have changed since Minecraft’s release（红石机制演变史，含 Alpha 到 1.21 的元件年表）</a><span class="src"> · 资料</span></li><li><a href="https://minecraft.1337wiki.com/minecraft-versions" target="_blank" rel="noopener">Minecraft versions and game drops: every release since 1.21（版本与游戏掉落年表，含 26.3）</a><span class="src"> · 资料</span></li><li><a href="https://mcreference.com/latest" target="_blank" rel="noopener">What is the latest Minecraft version?（读取 Mojang 版本清单的实时页面）</a><span class="src"> · 数据</span></li><li><a href="https://minecraft.how/blog/post/minecraft-1-21-tricky-trials-complete-guide" target="_blank" rel="noopener">Minecraft 1.21: The Tricky Trials Update（合成器与铜灯的配方、行为）</a><span class="src"> · 资料</span></li><li><a href="https://minecraftcheats.com/?p=1587" target="_blank" rel="noopener">Minecraft Spawn Chunk Mechanics: What Still Works?（1.21.9 取消固定出生点区块、1.21.5 随机刻变化）</a><span class="src"> · 资料</span></li><li><a href="https://www.mc-mod.net/iron-farm-villager-zombie-mechanics/" target="_blank" rel="noopener">Iron Farm Villager Zombie Mechanics（村民恐慌、五村民一组、30 秒冷却、生成范围）</a><span class="src"> · 资料</span></li><li><a href="https://www.bilibili.com/read/cv17877489/" target="_blank" rel="noopener">生电，到底是个啥玩意？（生电、创电、数电、械电的定义与边界）</a><span class="src"> · 社区</span></li><li><a href="https://github.com/AndersonBillss/MinecraftCPU" target="_blank" rel="noopener">MinecraftCPU：一个用红石搭的 8 位 CPU（0.1 Hz 时钟、16 字节寄存器、256 字节 RAM）</a><span class="src"> · 项目</span></li><li><a href="https://post.smzdm.com/p/aomen729/" target="_blank" rel="noopener">红石 CPU：硬核教学还是游戏彩蛋（红石计算机与真实 CPU 的参数对照）</a><span class="src"> · 评论</span></li><li><a href="https://www.plcpractice.com/learn/primers/digital-logic-primer" target="_blank" rel="noopener">Digital Logic Primer（梯形图即布尔代数：串联与、并联或、常闭非）</a><span class="src"> · 教材</span></li><li><a href="https://digit-chain.com/plc-ladder-logic/" target="_blank" rel="noopener">PLC Ladder Logic（继电器柜到 MODICON、启保停与互锁）</a><span class="src"> · 教材</span></li><li><a href="https://www.jdzj.com/plc/article/2018-1-29/72457-1.htm" target="_blank" rel="noopener">PLC 的逻辑运算（继电器电路、梯形图与门电路的对应）</a><span class="src"> · 教材</span></li><li><a href="https://blog.csdn.net/weixin_45263626/article/details/106082460" target="_blank" rel="noopener">逻辑设计法：数字电路在 PLC 编程中的体现（启保停的逻辑代数表达）</a><span class="src"> · 教材</span></li><li><a href="https://plato.stanford.edu/entries/turing-machine/" target="_blank" rel="noopener">Turing Machines（Stanford Encyclopedia of Philosophy，图灵机与可计算性）</a><span class="src"> · 哲学百科</span></li><li><a href="https://plato.stanford.edu/entries/boole/" target="_blank" rel="noopener">George Boole（Stanford Encyclopedia of Philosophy，布尔代数与逻辑代数）</a><span class="src"> · 哲学百科</span></li><li><a href="https://zh.minecraft.wiki/w/%E7%BA%A2%E7%9F%B3%E7%94%B5%E8%B7%AF" target="_blank" rel="noopener">红石电路（中文 Minecraft Wiki，元件分类、信号强度、充能与激活）</a><span class="src"> · 官方 Wiki</span></li><li><a href="https://zh.minecraft.wiki/w/Tutorial:%E9%93%81%E5%82%80%E5%84%A1%E9%99%B7%E9%98%B1" target="_blank" rel="noopener">教程：铁傀儡陷阱（中文 Minecraft Wiki，生成条件与冷却）</a><span class="src"> · 官方 Wiki</span></li><li><a href="https://zh.minecraft.wiki/w/%E7%BA%A2%E7%9F%B3%E6%9C%AF%E8%AF%AD" target="_blank" rel="noopener">教程：红石术语表（生电、创电、数电、械电、QC 的官方定义）</a><span class="src"> · 官方 Wiki</span></li></ul>`
  },
  {
    id: "post-242",
    title: "诺奖的脸",
    date: "2026-10-28",
    updated: "2026-10-28",
    cat: "日常",
    tags: ["科学", "设计"],
    cover: "",
    pinned: false,
    excerpt:
      "每年十月诺奖公布时配的那张白底黑线金箔画像是谁画的？2012 年起都出自瑞典画家尼克拉斯·埃尔梅赫德之手——起因是保密规定下根本拿不到照片。从马克笔应急草图到金箔视觉系统，再到奖章上的维吉尔诗句和每年换人制作的证书，诺奖把「谁得奖」这件事做成了一整套艺术活。",
    content: `<div class="pg-indent"></div><p>每年十月上半月，诺贝尔奖陆续公布。获奖者往往在世界的某个角落刚睡醒、正在刷牙，接到一通电话——组委会的人提前一个半小时就候在电话机旁了。几分钟之内，全世界的媒体版面上出现了这些人的脸：不是照片，是画像。白底，黑线，一片金箔，十来张摆在一起，像同一个人的手笔。</p><p>确实是同一个人的手笔。从 2012 年起，每一年的物理学、化学、生理学或医学、文学、经济学、和平奖得主的官方肖像，都出自同一位瑞典艺术家之手。</p><p>为什么用画不用照片，名单多早到他手里，一幅画要多久，奖章和证书上还有哪些艺术活——这一篇挨个说清。</p><h2>先把答案说了</h2><p>画的人叫尼克拉斯·埃尔梅赫德（Niklas Elmehed），瑞典画家、数码艺术家。2012 年起，他在诺贝尔奖官方机构担任艺术总监，负责公布期间的全部视觉内容，获奖者肖像也从那一年开始由他绘制；后来他转为自由职业者，这件事一直没放下。</p><p>在他之前，诺奖公布配的图大多是照片或油画肖像，后来变成黑白照片。2012 年那批手绘肖像跟着新闻稿传遍全球，第二年接着画，再往后就成了固定的传统。</p><p>也就是说，这套今天看着像「诺奖祖传」的画风，历史只有十几年。它不是按审美规划出来的，是被一件很具体的事逼出来的——下一节说这件事。</p><h2>为什么不用照片</h2><p>问题出在保密上。获奖名单要严格保密到公布那一刻，不能提前联系获奖者本人——联系谁，谁就得奖，等于泄密；也不能去购买照片的版权，买谁的照片，同样等于把答案递出去。而网上能查到的获奖者照片，尤其是那些不算出名的科学家，常常只有机构官网上几十年前拍得糊糊的旧照。</p><p>2012 年他刚接手，发现有的获奖者根本找不出一张能用的照片，时间又来不及，索性拿起黑色马克笔，画了几张肖像草图应急。这批草图被各大媒体拿去用了，效果出奇地好。他后来形容当时的处境：那些脸，只能从工作人员网页上用糟糕相机拍的照片里找。</p><p>于是一个奖项的视觉难题，被翻译成了一件很朴素的事：宣布那一刻，全世界都在等一张头图，而获奖者的脸在媒体那里是空的。画像不是备胎，是保密约束底下唯一能立刻交付的图像。</p><h2>为什么长这样</h2><p>现在这套画像的配方很短：白底，黑色马克笔勾轮廓，金箔点缀高光。粗黑的线条不是为了风格而风格——画像公布后要进全球大大小小的版面，从手机缩略图到头版大图，都得一眼认得出。</p><p>配色是换过一轮的。最初是蓝黄体系：黑线，蓝色阴影，黄色高光，取的是瑞典国旗的颜色。他解释过这层意思：蓝黄象征打破种族界限、人人平等，一如诺贝尔奖的评审准则——只论对人类的贡献，不谈国籍。</p><p>2017 年，诺奖视觉整体升级，公布环节的主色调定为金色。从 2018 年起，画像里的金不再是颜料，而是用特殊胶水粘贴的超薄金属箔。黑线加金箔，他要的是「强烈而独特」。达没达成，看一件事就够了：现在全世界媒体看到白底黑线金箔的脸，不用配字就知道这是诺贝尔奖。</p><h2>名单多早到他手里</h2><p>提前多久拿到名单，是他最常被问的问题，也属于流程机密。能确定的是：公布前数小时，名单会到他手上。除评委之外，他是全世界最早知道结果的人之一。</p><blockquote class="pg-quote"><p>这就像一场比赛，我必须一直表现得最好。</p><cite>——埃尔梅赫德，接受日本《读卖新闻》采访</cite></blockquote><p>快，是这套流程里被逼出来的基本功。据称 2014 年文学奖得主莫迪亚诺的画像，他 35 分钟画完；2015 年得主阿列克谢耶维奇的，40 分钟。这个时间里，他要从一张模糊旧照里抓住脸的特征，勾线，贴金，交出去。</p><p>2022 年他发布了当年 8 位得主画像的幕后过程，从草图到成稿。画一张脸只要几十分钟，练这一手的功夫要按年算。</p><h2>奖章上的诗，每年换人的证书</h2><p>把镜头从公布日的画像挪开，诺奖还有一整条艺术流水线。奖章是 1901 年定下的设计：物理、化学、生理学或医学三枚的边缘，刻着维吉尔《埃涅阿斯纪》第六卷的诗句——inventas aut qui vitam excoluere per artes，大意为「发明使生活得以改善，艺术使其美化」。三枚里，生理学或医学那一枚的背面不一样：医疗女神正在给一个生病的小女孩解渴。</p><p>证书比奖章更铺张。每一份都是单独制作的：画谁画、字谁写、封面谁装订，每年一换。2023 年的官方媒体资料列了名单——</p><div class="pg-tablewrap"><table><thead><tr><th>环节</th><th>2023 年经手人</th><th>备注</th></tr></thead><tbody><tr><td>物理证书画作</td><td>Elisabeth Biström</td><td>每位得主的证书各配原作</td></tr><tr><td>化学证书画作</td><td>Lars Eje Larsson</td><td>同上</td></tr><tr><td>经济学证书画作</td><td>Anja Richardt Krabbe</td><td>同上</td></tr><tr><td>证书书法</td><td>Marianne Pettersson Soold、Marie A. Györi、Susan Duvnäs</td><td>按奖项分工</td></tr><tr><td>证书与奖章盒装订</td><td>Leonard Gustafssons 装订坊（斯德哥尔摩）</td><td></td></tr><tr><td>奖章铸造</td><td>Svenska Medalj（埃斯基尔斯蒂纳）</td><td>和平奖章由挪威 Det Norske Myntverket 制作</td></tr></tbody></table></div><p>往前翻名单更有意思：多丽丝·莱辛 2007 年的证书出自画家卡琳·玛玛·安德森，鲍勃·迪伦 2016 年的出自延斯·凡格。和平奖证书由挪威诺贝尔委员会负责设计，1990 年之前每一份单独设计。也就是说，一位诺奖得主拿到手的东西里，画像、奖章、证书，三样都是作品。</p><h2>为什么较这个劲</h2><p>我的判断是：这套画像赢的地方不在好看，在「宣布那一刻的交付能力」。照片要么泄密、要么糊、要么有版权麻烦；画像是在这些约束底下唯一能立刻全球分发的格式。庄严感是副产品，快和稳才是主产品。</p><p>先把最强的反驳摆出来：这无非是品牌包装。2017 年把金色定为公布主色调，本来就是一次视觉系统升级，为的是仪式感和辨识度。这么说不冤枉——这套画像确实是一套视觉规范，统一、克制、可复制，像品牌手册里长出来的一页。</p><p>但它的起点不在美学。2012 年画第一批画是为了救急：照片找不到，第二天全世界都要配图。一个救急方案被全世界媒体年复一年当头图用到现在，说明它解决的是真问题。诺奖一百多年把画像、奖章、证书都当作品来做，不是浪漫，是它需要在电视和手机上被立刻认出来。在这里，艺术不是装饰，是识别。</p><h2>下一次看到那张脸</h2><p>十月那几天刷到白底黑线金箔的脸，可以想一下它的来路：看画的人比获奖者本人更早知道结果；这张脸是在保密协议底下、用马克笔和金箔赶出来的，赶得快的那些，一张只花了半个多小时。到十二月十日颁奖那天，画里的这些脸会换成真人，从音乐厅的台阶上领走奖章和那份单独制作的证书。画像的工作到宣布那一刻就结束了——它只负责把「谁得奖」这件事，第一时间送到全世界眼前。</p><h2>可以看看这几个视频</h2><p>下面四个正好把这篇的几条线都补上了：第一个讲画像是谁画的，第二个专门回答为什么不用照片，第三个带你看证书长什么样，第四个把奖章、证书、奖金一次介绍完。</p><figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1Pe4y167i3" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1Pe4y167i3&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>《诺贝尔奖的画像是谁画的？》（约 3 分钟）：埃尔梅赫德和这套黑金画像的来历</figcaption>
</figure><figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1Ca411w7Xo" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1Ca411w7Xo&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>《为什么诺贝尔奖得主的头像都是肖像画？》（约 4 分半）：不用照片的另一个角度</figcaption>
</figure><figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1r94y1h7YT" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1r94y1h7YT&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>《诺贝尔奖证书都长什么样子？》（约 3 分钟）：每年单独设计的证书</figcaption>
</figure><figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1rw411C79V" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1rw411C79V&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>《四个诺贝尔奖奖品介绍》（约 5 分钟）：奖章、证书、奖金怎么发</figcaption>
</figure><h2>参考</h2><ul class="pg-refs"><li><a href="https://www.qlwb.com.cn/detail/13880009.html" target="_blank" rel="noopener">《谁创作了诺奖获得者画像》：引《读卖新闻》采访，蓝黄配色与平等的解释、「像一场比赛」、莫迪亚诺 35 分钟与阿列克谢耶维奇 40 分钟</a><span class="src"> · 齐鲁晚报网</span></li><li><a href="http://mp.weixin.qq.com/s?__biz=MjM5Njg3NTUyMQ==&amp;mid=2653629056&amp;idx=2&amp;sn=2c83ced25755695070be0aba5987c93f&amp;chksm=bc12916a36b1c1f288b71616be112e43a827efccc21b775b26832263fa863b5d2ea4345f23ec" target="_blank" rel="noopener">《诺奖得主官方肖像绘制的「保密挑战」》：早年用照片与黑白照、2012 年起手绘、公布前数小时获知名单、2017 视觉升级后 2018 起用金箔、小屏清晰度</a><span class="src"> · 人民美术出版社（微信）</span></li><li><a href="https://news.qq.com/rain/a/20251026A0362A00" target="_blank" rel="noopener">《诺贝尔奖「背后的男人」》（文汇报）：2012 年接手时找不到照片、不能提前联系本人、不能购买版权否则泄密、草图被媒体采用后成传统</a><span class="src"> · 腾讯新闻·文汇报</span></li><li><a href="https://c.m.163.com/news/a/L91TEU000521KGPB.html" target="_blank" rel="noopener">《他是唯一能提前知道诺奖获奖者名单的人》：公布前一个半小时的电话、黑色丙烯与金箔、签保密协议、画稿锁进抽屉</a><span class="src"> · 网易新闻</span></li><li><a href="https://m.mp.oeeee.com/oe/BAAFRD000020221011729529.html" target="_blank" rel="noopener">《肖像画而非照片》：2022 年 8 位得主画像幕后花絮、宣布周「像体育竞赛」</a><span class="src"> · 南方都市报</span></li><li><a href="https://www.nobelprize.org/prizes/about/the-nobel-diplomas/" target="_blank" rel="noopener">Nobel diploma：每份证书署名艺术家与书法家、莱辛与迪伦的证书、和平奖证书 1990 年前逐份设计</a><span class="src"> · 诺贝尔奖官网</span></li><li><a href="https://www.nobelprize.org/uploads/2023/12/nobel-week-2023-information-for-media.pdf" target="_blank" rel="noopener">Nobel Week Stockholm 2023 媒体资料：当年证书画家、书法家、装订坊与奖章铸造厂名单</a><span class="src"> · 诺贝尔奖官网（PDF）</span></li><li><a href="https://www.lindau-nobel.org/the-art-of-the-nobel-prizes/" target="_blank" rel="noopener">The Art of the Nobel Prizes：奖章刻维吉尔诗句及英译、生理学或医学奖章背面的医疗女神</a><span class="src"> · 林道诺奖得主会议</span></li><li><a href="https://search.bilibili.com/all?keyword=%E8%AF%BA%E8%B4%9D%E5%B0%94%E5%A5%96%E8%82%96%E5%83%8F" target="_blank" rel="noopener">B 站搜「诺贝尔奖肖像」</a><span class="src"> · 视频</span></li></ul>`,
  },
  {
    id: "post-241",
    title: "口水的库存",
    date: "2026-10-23",
    updated: "2026-10-23",
    cat: "日常",
    tags: ["身体", "科学"],
    cover: "",
    pinned: false,
    excerpt:
      "连吞口水到第四五次就咽不下去，不是喉咙出问题：口腔的库存只有一毫升，补货每分钟不到半毫升，没有食团的吞咽全程空转，呼吸还要被反复打断。一篇把这个小现象背后的生理安排拆开讲。",
    content: `<div class="pg-indent"></div><p>网上流传过一个挑战：连续吞口水，看能不能吞到第五次。看上去毫无难度，评论区却是一片哀嚎——有人说吞到第三次，忽然觉得自己忘了怎么吞；有人说第四次之后「见到了上帝」；只有少数人靠先喝一大口水，一路「作弊」到了二十次。</p><p>不少人不信邪，当场试。多数人在第四口、第五口停住，喉咙里像有一扇门轻轻关上了：动作还在，东西没了，再一使劲就发空，甚至有点发慌。</p><p>这不是身体出了毛病，也不是心理作用，背后是一套很具体的生理安排：口水是限量的，吞咽是全自动的，呼吸和吞咽还共用同一条通道。这几件事叠在一起，就决定了连吞注定走不远。这篇把它一件一件拆开。</p><h2>一个不是硬性规定的极限</h2><p>「人最多只能连吞五次口水」这个说法流传很广，但严格说它不是一条生理定律，而是一个因人而异的波动区间。腾讯新闻查证过这个说法：确实存在上限，但有人三次就卡住，有人能到七次甚至十次；提前吃一片柠檬或者喝点水，还能多咽几口。也就是说，次数本身不是重点，重点是什么东西在消耗、什么条件在补给。</p><p>先把结论放在这里：连续吞咽之所以卡住，主要是因为口腔里的口水被抽干了，而口水回填的速度跟不上吞的速度。除此之外还有两条辅助原因：连吞时呼吸被反复打断，以及主动吞咽本来就不如自动吞咽顺畅。后面几节按这个顺序拆。</p><h2>口水的产量与存量</h2><p>口水由三对大唾液腺——腮腺、颌下腺、舌下腺——加上数不清的小腺体分泌，一天二十四小时不停。成年人每日总量约一千到一千五百毫升，静息状态下分泌速率约每分钟零点三到零点五毫升；吃饭、闻到食物、想到酸的东西时，速率会明显拉高。</p><p>但要注意产量和存量的区别。每天一升多是全天慢慢攒的，而口腔这个「柜台」上，同一时刻摆着的只有大约一毫升。资料里给的口径是一毫升上下，最多不超过两毫升——唾液积到这个量，就会触发一次吞咽反射，把它咽下去，给新分泌的腾地方。</p><div class="pg-tablewrap"><table><thead><tr><th>项目</th><th>数值</th><th>说明</th></tr></thead><tbody><tr><td>每日分泌总量</td><td>约 1000–1500 毫升</td><td>三对大腺体加无数小腺体，全天不间断</td></tr><tr><td>静息分泌速率</td><td>约 0.3–0.5 毫升/分钟</td><td>进食时可成倍升高</td></tr><tr><td>口腔内存量</td><td>约 1 毫升（至多 2 毫升）</td><td>积到这个量就触发一次吞咽</td></tr><tr><td>一次吞咽耗时</td><td>约 1–2 秒</td><td>口腔期、咽期、食管期连着跑完</td></tr></tbody></table></div><p>现在可以算那笔账了。一次吞咽基本清空柜台，而补货速率每分钟不到半毫升，攒回一毫升要两三分钟。连吞的时候没有这两三分钟：第一口吞的是攒了半天的存货，第二口就开始刮底，到第四五口，柜台上只剩下黏膜上那一层薄薄的湿气。吃饭时没有这个问题，因为食物和水在持续进货，咀嚼和味觉刺激同时把分泌速率拉高——连吞口水恰恰是「只出货、不进货」的最坏情形。</p><h2>一次吞咽在做什么</h2><p>一个完整的吞咽动作大约一到两秒，要动用三十多组肌肉，由五对脑神经协调指挥：三叉神经管咀嚼肌和口腔感觉，面神经管部分舌骨上肌群，舌咽神经和迷走神经管咽部与喉部，舌下神经管舌肌。这些神经的运动核分布在脑桥、延髓和第一到第三颈髓，任何一个环节掉线，吞咽都会变形。</p><p>教科书把吞咽分三个阶段。口腔期是自主的：舌头顶住硬腭，把口水或食团往后推到咽部。咽期是反射，也是全部动作里最精密的一段：软腭上抬封住鼻咽，会厌翻转盖住喉口，声带闭合，呼吸暂停半秒到一秒半，咽缩肌自上而下收缩，把东西挤进食管——这一整串是「全或无」的，一旦启动必须跑完，中途停不下来。食管期靠蠕动把东西送进胃，这一段不受意识控制，也最慢。</p><details><summary>咽期那一秒多，身体同时做了这些事</summary><p>软腭上抬，封住通往鼻腔的路，防止东西从鼻子出来；舌根后推，会厌像盖子一样翻下来盖住喉口，声带同时内收，把通往气管的门堵死；喉部整体上提，食管上口的括约肌松开，给食团让路；咽缩肌从上到下依次收缩，像挤牙膏一样把东西往下送。这些动作由延髓的吞咽中枢按固定顺序发放，健康成人每次都一模一样。</p></details><h2>没有食团，卡在哪一步</h2><p>平时吞咽推的东西叫食团：一团被唾液包裹、润滑、塑形过的软物质。唾液里的黏蛋白负责把东西黏合成团，同时给整条通道上润滑油。吞口水本身也是一次正经吞咽——推的食团就是那一毫升口水。</p><p>连吞到第四五次，情况变了：没有足够的液体可推。口腔期要压过去的是一薄层空气，咽期照样全套执行——软腭照样上抬，会厌照样盖下来，呼吸照样暂停——但通道里缺了润滑，黏膜与黏膜之间的摩擦阻力明显变大。吞咽困难知识库的指南里写得很清楚：唾液不足时，食团难以塑形和润滑，干燥的黏膜会让东西黏在舌面、颊黏膜和硬腭上，咽部蠕动的效率也会下降。</p><p>每多吞一次，口腔里那层唾液薄膜就更薄一层。到最后，舌面贴着硬腭，几乎是干磨。这时候的感觉不是「咽不下去」，而是「不知道咽什么」——喉咙把整套动作做完了，却没有任何东西经过。有人描述成「忘了怎么吞」，其实恰恰相反：动作完整执行了，是内容物缺席了。</p><h2>吞咽和呼吸共用一条路</h2><p>咽部是食物和空气的十字路口，这个设计省了地方，也添了麻烦：每次吞咽都要短暂封锁交通。吞咽时呼吸会自动暂停约半秒到一秒半，叫吞咽呼吸暂停；同时会厌盖住喉口、声带闭合，确保口水走食管不走气管。这也是为什么没法边吞口水边呼吸——不是憋气，是通道被征用了。</p><p>健康成人的吞咽大多遵循「呼气—吞咽—呼气」的节律：先呼气，再吞，吞完接着呼气。吞完的那口气会把可能沾在喉口的残渣吹出去，属于保护机制。这个节律平时由脑干自动维持，完全感觉不到。连吞时，呼吸被一次一次打断，然后一次一次重新对齐，中间的空隙越来越难安排——腾讯新闻的查证里把它列为连吞会卡顿的第二个原因：不给呼吸留空隙，下一个吞咽就难以启动。</p><h2>后台运行这套程序的没有你</h2><p>吞咽的中枢在延髓——脑干最下面那一截。腾讯医典给延髓的定位是「生命中枢」：呼吸、消化、循环的基本调控都在这一带。吞咽由延髓里的中枢模式发生器驱动，这个网络分两组：背侧吞咽组位于孤束核，负责整合口腔和咽部传来的感觉信号，决定什么时候点火；腹侧吞咽组负责把点火命令按固定顺序分发给三十多组肌肉。</p><p>这个设计的关键在于：点火之后一切自动完成，不需要意识参与。平时的口水吞咽全是自动挡——唾液攒够一毫升，信号传进孤束核，越过阈值，整套程序开始跑，跑完甚至没有察觉。清醒时这样的事每分钟发生一到两次，一天下来五百多次，绝大多数毫无印象。</p><p>而连吞挑战做的是一件反常的事：把自动挡切成手动挡。开始数次数，开始主动发起吞咽，注意力第一次压到了这套后台程序上。主动吞咽在神经上是另一条通路，大脑皮质参与进来，动作反而变笨——就像一旦开始注意走路先迈哪条腿，走路立刻变得别扭。「感觉忘了怎么吞」不是忘了，是从不假思索切到了全程盯着。</p><h2>为什么有人三次有人十次</h2><p>既然消耗的是口水，个体差异就主要落在供水和协调上。唾液分泌速率因人而异，本身可以差出好几倍；口腔容积、黏膜状态、神经肌肉的协调速度也各不相同。年纪是一个明确的变量：老年人唾液腺萎缩，分泌量减少，连吞的次数天然比年轻人少。</p><p>柠檬为什么能「作弊」，恰恰反过来证明了机制。酸味是唾液分泌最强的刺激之一，含一片柠檬，分泌速率短时间内成倍上升，柜台重新堆满，能连吞的次数立刻变多。如果卡住的原因是肌肉没劲或者喉咙出了毛病，柠檬不会有用。同样的道理，喝一口水等于直接进货，所以靠水作弊的人能冲到二十次。</p><h2>真正咽不动的那一类人</h2><p>对大多数人，连吞卡住只是一个小实验，缓两分钟就能重来。但对另一群人，「咽不下去」是每天每顿饭的真实处境，原因正是上面那套机制被长期破坏。</p><p>第一类是口干症。干燥综合征会用自身的免疫系统破坏唾液腺；头颈部的放射治疗在剂量达到二十六戈瑞左右时就会损伤腮腺，而且这种损伤不可逆；还有几百种常用药物的副作用就是减少分泌——抗过敏药、部分抗抑郁药、利尿剂、抗胆碱能药物都在名单上。唾液长期不足的人，吃饭前要先喝水，干一点的饭菜要泡着汤才能咽，夜里干醒是常事。</p><p>后果不止是难受。唾液不足，食团成形困难，食物碎渣容易残留在咽壁，吞咽后又可能漏进气管——对老年人，这条链的终点是吸入性肺炎。所以康复科给吞咽障碍患者做的检查里，就有口腔湿润度一项：唾液不是锦上添花的东西，它是吞咽这台机器的工作介质。</p><h2>越注意越吞不下：注意的反作用</h2><p>还有一类人会把这件小事变成噩梦。口水强迫——反复吞咽强迫——指的是一旦注意到「我在吞口水」这件事，就停不下来：越注意越想吞，越吞越注意，吞到后来喉咙发紧、发干，焦虑上来，更停不下来。B 站上有心理师专门做这个话题的视频，评论区大量的「我也是」说明中招的人不少。</p><p>用这篇的机制看，这个循环并不神秘：注意把自动吞咽切成手动吞咽，手动吞咽本来就笨拙；连续的吞咽又真的会抽干口水，让下一次吞咽生理性地变难。心理上的「停不下来」和生理上的「越来越咽不动」在这里咬合成一个循环。解法也和机制对得上——不是努力不去吞，而是把注意力挪走，让唾液腺有机会把库存攒回来，让程序回到自动挡。</p><h2>回到那个挑战</h2><p>现在可以完整回答开头那个问题了。连吞口水到第四五次咽不下去，是因为口腔的库存只有一毫升，而补货速率每分钟不到半毫升；没有食团，咽期照样执行，只是全程空转、摩擦加剧；呼吸被反复打断重新对齐；再加上主动控制把一套自动程序切成了手动。四个原因叠加，卡住是必然的——能连吞到十次的人，要感谢自己的腺体勤快。</p><p>喝一口水就能刷新次数，这一点上所有人都一样：水是直接进货，绕过了漫长的分泌过程。所以那个挑战的答案不神秘，身体也没有任何地方出毛病。它真正让人看见的是：一个以为完全属于「自己」的动作，其实百分之九十九由延髓代管，人只是在唾液攒够的时候，被通知一声。</p><p>不用现在去试。等忘了这件事，今天剩下的时间里，你大概已经又咽下去四百多口了。</p><h2>可以看看这几个视频</h2><p>下面几个视频能把过程看得更直观：第一个用动画把吞咽的三个阶段和神经控制讲得最清楚；第二个是二十多分钟的解剖课，把吞咽经过的每一块结构都摆了出来；第三个正好在讲「连吞口水都不会了」这件事本身；第四个是心理师讲反复吞咽的循环；第五个是消化科医生讲没有唾液时口腔会发生什么。</p><figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1S4411R7mW" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1S4411R7mW&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>《动画｜吞咽反射的三个阶段及神经控制概述》（约 3 分钟）：口腔期、咽期、食管期一次看懂</figcaption>
</figure><figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1NR4y1c7yY" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1NR4y1c7yY&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>《吞咽的过程和相关结构》（约 23 分钟）：吞咽经过的每块肌肉、每根神经的解剖课</figcaption>
</figure><figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1qx411x742" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1qx411x742&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>《什么我连吞口水都不会了？！》（约 2 分钟）：正好在讲这个挑战里的现象</figcaption>
</figure><figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1qyWpeyEqs" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1qyWpeyEqs&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>《口水强迫，反复吞咽口水怎么办？》（约 2 分半）：越注意越停不下来的那个循环</figcaption>
</figure><figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1a54y1g74Y" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1a54y1g74Y&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>《没有唾液口干舌燥怎么回事？》（半分钟）：消化科医生讲口水长期不足</figcaption>
</figure><h2>参考</h2><ul class="pg-refs"><li><a href="https://view.inews.qq.com/k/20250904A08RWJ00" target="_blank" rel="noopener">《人无法做到连续咽 5 次口水？别信，这根本是个伪科学传说》：上限因人而异（3–10 次）、一次吞咽动用 30 组肌肉与五对脑神经、「呼气—吞咽—呼气」节律、柠檬与喝水能多咽几口</a><span class="src"> · 腾讯新闻·较真（2025-09-04）</span></li><li><a href="https://www.kepuchina.cn/article/articleinfo?business_type=100&ar_id=535678" target="_blank" rel="noopener">《解析人体密码(二)》：24 小时吞口水约 580 次，进餐 10 分钟约 50 次，坐着看书每小时 37 次</a><span class="src"> · 云南省科学技术协会科普号</span></li><li><a href="https://health.baidu.com/m/detail/ar_6518155924909971985" target="_blank" rel="noopener">《人每天吞下多少口水》：每日唾液总量 1000–1500 毫升，静息分泌速率每分钟 0.3–0.5 毫升</a><span class="src"> · 百度健康</span></li><li><a href="https://mip.pingguolv.com/ask/HnFZFwOOIFZ7.html" target="_blank" rel="noopener">《正常人不说话时每分钟吞咽多少次口水》：静息每分钟吞咽 1–2 次，唾液积到约 1–2 毫升触发吞咽反射，睡眠时降到每小时 3–5 次</a><span class="src"> · 苹果绿健康</span></li><li><a href="https://dysphagia.cn/zh-hans/clinical/xerostomia-dysphagia" target="_blank" rel="noopener">《口腔干燥症与吞咽障碍：协同评估与管理指南》：唾液不足导致食团难成形、黏膜黏附、咽部蠕动效率下降；放疗 26 Gy 起损伤腮腺；常见致口干药物清单</a><span class="src"> · 吞咽困难知识库</span></li><li><a href="https://h5.baike.qq.com/mobile/overview_detail.html?name=%E5%BB%B6%E9%AB%93" target="_blank" rel="noopener">「延髓」词条：脑干组成部分，呼吸、消化、循环的基本中枢所在，称「生命中枢」</a><span class="src"> · 腾讯医典</span></li><li><a href="https://www.msdmanuals.cn/home/mouth-and-dental-disorders/symptoms-of-oral-and-dental-disorders/dry-mouth" target="_blank" rel="noopener">「口干」：唾液减少对味觉、进食、口腔健康的影响</a><span class="src"> · 默沙东诊疗手册（中文版）</span></li><li><a href="https://search.bilibili.com/all?keyword=%E5%90%9E%E5%92%BD%E5%8F%8D%E5%B0%84" target="_blank" rel="noopener">B 站搜「吞咽反射」</a><span class="src"> · 视频</span></li></ul>`,
  },
  {
    id: "post-240",
    title: "《投名状》",
    date: "2026-10-17",
    updated: "2026-10-17",
    cat: "电影",
    tags: ["影像", "历史"],
    cover: "",
    pinned: false,
    excerpt:
      "上映时被骂烂片，十几年后又被封成神作。它确实被低估，但夸它的人往往夸错了地方：这不是一部讲兄弟反目的电影，庞青云也不是野心家，他是个做题的人——所有代价都能算成数字，直到算到自己头上。",
    content: `<div class="pg-indent"></div><p>1870 年 8 月 22 日上午，南京，两江总督府门口。马新贻刚校阅完士兵射箭，正往回走。一个人一边喊冤一边靠近，抽刀刺进他右肋。</p>
<p>离奇的其实不是行刺，是行刺之后：那人没有跑，站在原地大喊——刺客是我张汶祥。</p>
<p>第二天马新贻伤重不治。他当时是两江总督兼南洋通商大臣，慈禧听说之后说了句「此事岂不甚奇」。而更奇的是后来：这桩案子始终没审出个服人的结论，却长出了另外一条命——京剧有《张文祥刺马》，评书有《刺马复仇记》，邵氏拍过电影，电视台拍过电视剧，一代一代往下传，传的全是戏文里编排出来的那个版本。</p>
<p>2007 年陈可辛拍的《投名状》，接的就是这条戏文的线。</p>
<h2>一桩至今没有定论的刺杀案</h2>
<p>这部片子常常被当成一部讲兄弟反目的电影。反目只是个壳，壳里装的是别的东西，得先说清楚那桩真事。</p>
<p>案子审了八个月。先由护督将军魁玉审，张汶祥的供词反复变更；朝廷改派漕运总督张之万（张之洞的哥哥）会审，审不出来；再派刑部尚书郑敦谨，会同新任两江总督曾国藩复审。最后结案的说法是：张汶祥曾入太平军，后暗通海盗，马新贻任浙江巡抚时捕杀南田海盗，他的同党多被处死，妻子被人掳走，他递状子又没被受理，因此怀恨。结论是「实无另有主使及知情同谋之人」。判凌迟，并在马新贻棺前剖腹挖心。</p>
<p>这个结论没人信。一个平民，为了一桩陈年旧怨，单人独刀，在总督府门口刺杀封疆大吏，审八个月，两任总督级别的官员轮着审，最后给出的答案是「没人指使」——要么张汶祥是疯子，要么这个案子底下还有一层。</p>
<p>后来有一份私人记录浮出来。参与审案的官员颜士璋写过一本《南行日记》，里面暗示马新贻真正的死因是卷进了朝廷和湘军的斗争。这份东西只见于私人记录，未入正史，但它至少说明：当时在场的人自己都不信那个官方结论。</p>
<p>而民间走了另一条路。官家的结论没人信，老百姓也不爱听政治，只爱听故事。流传最广的版本是：马新贻当年镇压太平军时被俘，与张汶祥、曹二虎结为兄弟，反把张的部队招安了；做官之后马与曹二虎的妻子私通，除掉曹二虎，张汶祥愤而刺马。</p>
<p>《投名状》接的是民间这一版，不是史书那一版。陈可辛把张汶祥变成姜午阳，马新贻变成庞青云，曹二虎变成赵二虎。他原本打算就叫《刺马》，后来改了名，理由说得挺实在：怕引起历史细节的纠纷。</p>
<h2>投名状这三个字到底管什么用</h2>
<p>片名取自《水浒传》，是上山落草时结拜为兄弟的凭据。电影里把它具体化成一句话：外人乱我兄弟者，视投名状，必杀之；兄弟乱我兄弟者，视投名状，必杀之。</p>
<p>这句话要紧的地方在第二句——兄弟乱我兄弟。它不是防外人的，它是防自己人的。也就是说，这个东西从立起来的第一天，预设的敌人就在三个人内部。</p>
<p>立投名状那场戏拍得很清楚：三个人各杀一个路人。杀的不是仇人，是不认识的、路过的、无辜的人。这就是投名状的机制——你必须先犯一件没法回头的事，把自己钉死在这个团体里。你之所以忠诚，不是因为情义深，是因为你身上有把柄在别人手里。</p>
<p>这段戏可以用一个挺俗但很准的比方来概括：它不是结义的仪式，它是三个人互相挟持的仪式。誓言念得越响，挟持关系越牢。</p>
<p>所以后面发生的所有事，都不是「兄弟变心」。是这套机制开始运转了。庞青云要往上走，走的路必然踩过另外两个人；姜午阳守着那句誓言；赵二虎守着兄弟。三个人都守着自己那份，谁也不肯让，最后就必然是这个结局。</p>
<h2>庞青云不是野心家，他是个做题的人</h2>
<p>有一件事，大部分评论搞反了。</p>
<p>大家习惯说庞青云有野心，为了往上爬不择手段。这个说法不能说错，但它太顺了，顺到像一句现成的评价。我的看法是：他确实想要位置，但他不享受这个过程。他是那种把每件事都当成一道必须解出来的题的人。</p>
<p>舒城那一战，他带着八百人。堂上三位大人听说「八百」，一起笑起来，笑得很大声。庞青云不笑，他说再给我八百，十五日内攻下舒城；对面一句「军中无戏言」，他改口：十日。最后陈公给了一千五百精兵，但没有军饷——他答不要军饷，攻下城一半的东西归他的人。他字鹿山，这支队伍就叫山字营。</p>
<p>这一整段里他一句豪言都没有。旁边有人说「你在赌，拿八百条人命在赌」，他答「打仗本身就是赌」。</p>
<p>冲锋前他讲的是战术：两军相隔三百大步，火枪射程两百步，弓箭只有一百步，所以要有两百个兄弟冲在前面替弓箭手赢下那一百步，听见枪声不许躲。然后他说：愿意去的有安家费，死的两份，活的三份。</p>
<p>这段话听着冷，但它是我认为全片最能说明庞青云的地方。他不是热血上头，他在算——算射程，算自己撑得住几轮，算用什么价钱买下这些人的命。他说「打仗本身就是赌」的时候，语气里没有兴奋，只有一个赌徒在确认赔率。</p>
<p>而赌徒和赌徒不一样。他要的不是赢一把，是换一张能上桌的资格。「我的兵只能战死，不能饿死」这句他在别处说过——听着像爱兵，其实是账：兵是筹码，筹码不能掉价。</p>
<p>苏州城下那件事，是同一套算法换了个更大的数。围城一年，两边的兵都在饿死。他去求魁字营借粮，代价是把攻南京的头功让出去。然后苏州城里递出降书：郜永宽愿意杀掉主帅谭绍光，献城投降，换全部人的性命。庞青云答应了。</p>
<p>城破之后，赵二虎在城门口喊，说好的是给条活路。姜午阳也在。庞青云下了一道令：杀。四千人，在城墙下，弓箭齐发，一排接一排。</p>
<p>这段在历史上真有原型。1863年，李鸿章围苏州，同样是通过戈登诱降，同样约定保全性命，同样由戈登做担保人。郜永宽等八人刺杀谭绍光献城，然后在淮军营中赴宴时被程学启带人斩首，程提着八颗人头进城喊了一句「八人反侧，已伏诛矣」。随后城内数万太平军守军被杀。戈登为此大怒，提着枪去找李鸿章算账，李躲了起来。李鸿章给朝廷的奏折里写「此中国军政，与外国无干，不能为汝认错」；曾国藩的评价是「殊为眼明手辣」。</p>
<p>把这段放回电影里，庞青云那四千人就不再是一个孤立的道德污点，而是一套有据可查的操作。降兵不能留——留着要吃饭，要安置，要防着再反。杀降在当时的军务逻辑里几乎是标准答案。庞青云不是变态，他是照着这套逻辑办事。</p>
<p>这才是这部电影真正凉的地方。它不是告诉你「好人被权力腐蚀了」，它是告诉你，那套逻辑本身就在那儿，谁坐上去都会这么干。</p>
<h2>赵二虎的规矩在他自己的人里失效</h2>
<p>赵二虎这个人是全片最干净的。他不识字，不懂官场，认一个死理：兄弟就是兄弟，答应了的事就得算数。苏州城破时他冲进城喊的是「回家」，他真的以为那是回家。</p>
<p>他的一生都在用他当土匪时的那套办法处理事情：讲义气、认兄弟、给脸面。这套办法在抢粮的时候管用，在自己那一百多号人里管用。</p>
<p>到了官军的体系里，这套办法一个也用不上。他给手下争军饷，被庞青云拦；他要给降兵留活路，被庞青云杀；他到死都以为庞青云害他是误会。</p>
<p>他最后死在自己兄弟手上。姜午阳在雨里砍他，砍了很多刀才砍死。那场戏的残忍不在于血，在于赵二虎从头到尾没还手——他大概到死都不明白，这是为什么。</p>
<p>我认为这部电影最好的一个设计，是赵二虎的「规矩」和他的「人」是同一批人。他没有被外人背弃，他是被自己护着的那群人的逻辑吃掉的。这比「坏人害好人」难受得多，也因此真得多。</p>
<h2>莲生：一个连自己都算不上主角的人</h2>
<p>徐静蕾演的莲生，是全片唯一的女角色，戏份很薄，被骂过说是道具。这个批评我认为成立了一半——她的故事线确实没铺开，动机交代得也含糊。</p>
<p>但另一半不成立。她在这部片子里的功能不是谈恋爱，是给那三个男人的「规矩」提供一个检验点。</p>
<p>庞青云和她有过一段，赵二虎是她丈夫，姜午阳要杀她，罪名是「乱我兄弟」。三个人在同一件事上做出了三种反应：一个想把她留住但不会为她放弃任何东西，一个根本不知道她心里想什么，一个把她当成了一个必须处理的条约条款。</p>
<p>她那场戏里没有金句。真正被传开的那句「我这一生如履薄冰，你说我能走到对面吗」是庞青云说的，不是她。</p>
<p>但我还是要说，这句话放在莲生身上同样成立，甚至更成立。庞青云说的时候，他至少还在往前走，手里有兵、有位置、有路；莲生连往哪走都不知道。</p>
<blockquote class="pg-quote"><p>我这一生如履薄冰，你说我能走到对面吗？</p><cite>—— 庞青云</cite></blockquote>
<p>她死的时候，姜午阳用的是「外人乱我兄弟者，视投名状，必杀之」这条。这句誓言第一次真正被执行的，就是杀一个手无寸铁的女人。这一下把投名状的性质彻底暴露了：它不保护任何人，它只维护一个秩序。</p>
<h2>三个人、三种立场，没有一个人是全对的</h2>
<p>这里我得先把最强的反驳摆出来，因为它确实是看完之后最直接的反应：庞青云杀降、杀兄弟、拿女人当筹码，凭什么说他不是反派？</p>
<p>我承认这个反驳很硬。庞青云做的事，按任何一套道德标准都算恶。而且他做这些事的时候并不痛苦到失去判断——他很清楚自己在做什么。</p>
<p>但我还是要说，把他简单归成反派，这部电影就没剩什么了。因为另外两个人也不是答案。</p>
<p>赵二虎的义气，只在同乡同伙的范围里成立。他护着的那一百多号人是人，城外那四千个降兵就不是吗？他那套规矩的边界，恰恰是他自己的人。姜午阳的忠诚，到最后变成了一个只认条文的执行者——他杀赵二虎，杀莲生，按的都是誓言的条文，条文没错，人没了。</p>
<p>三个人各守一套，三套都只在自己的范围内有效。谁都不肯退一步去想「对方那套为什么也说得通」，于是只能互相杀。</p>
<p>这就是陈可辛说的那句话。他在访谈里讲，「事是坏的，人是好的，人是无奈的」，还在另一处说「我觉得大家都是庞青云，或者都是马新贻」。我一开始觉得这话是导演给自己找的台阶，现在觉得它说的是实情——他不是在替庞青云辩解，他是在说这三个人共用同一套困境。</p>
<p>我的判断是：《投名状》是一部反英雄片，但它反的不是英雄，是「立场」这个东西本身。它让你看见，一个好人只要被放进一套只认自己人的规矩里，他做的事就会和坏人一样。</p>
<h2>它挨骂不是没有道理</h2>
<p>2007年上映的时候，这片子口碑和票房都不好。豆瓣一度只有六分多，被骂色调压抑、演员口音出戏、故事说不清。成本四千万美元，全球票房四千二百多万，是赔的。</p>
<p>这些骂里，有一条我觉得得认真对待：故事确实说不清。庞青云到底想干什么，电影给的说法是模糊的——他既像在为百姓做事，又像在为自己上位。有人写长文批评这部片子「用复杂和假深刻来掩盖混乱」，说导演躲着不给价值判断。</p>
<p>这个批评我不完全同意，但它抓住了一个真问题：陈可辛确实刻意不给答案。他自己说剧本做了很久，八个编剧意见都不同，争论了很久。</p>
<p>八个编剧争不完的东西，交给观众两小时看完，当然会有人觉得糊涂。所以它不是一部「看完就懂」的电影。它更像一道没给标准答案的题。有人觉得这是深刻，有人觉得这是躲闪，这两种反应都合理。</p>
<p>至于后来的翻案，我觉得原因不在电影变了，在观众变了。2007年大家进电影院是要看兄弟情、看大场面的，你给他看一套政治机器怎么碾人，他当然不买。十几年后大家被职场、被组织、被各种说不清的规矩磨过一遍，再看这部片子，忽然就看懂了。</p>
<p>这也解释了为什么现在最流行的一句台词是「我这一生如履薄冰，你说我能走到对面吗」。这句话之所以传开，不是因为它是金句，是因为很多人真的在这么想。顺带说一句，网上流传的版本常把「对面」写成「对岸」。一个字的差别，意思差不多，但「对面」更贴这部电影——它讲的一直是同一条河两边的人，而不是远方。</p>
<p>奖项上它其实没被亏待。第27届香港电影金像奖拿了八项，包括最佳电影、最佳导演，李连杰凭庞青云拿了最佳男主角；第45届金马奖拿了最佳剧情片、最佳导演、最佳视觉效果。一个被骂烂片的东西后来拿了这么多奖，本来就说明当年的骂和当年的奖不是一回事。</p>
<h2>最后我想说的是那道令</h2>
<p>全片最该盯住的是苏州城破那场戏。</p>
<p>不是盯血，是盯那四千个人。他们站在城墙下，手是空的，他们以为自己是降兵，是被答应了活路的。庞青云站在城楼上，说了一句什么，然后弓箭就下来了。</p>
<p>这场戏留下的问题是：换成任何一个人坐在庞青云那个位置上，会不会下这道令。</p>
<p>第一反应大概是「不会」。往下想一步就不敢确定了。因为要是不杀，这四千人吃什么，谁来管，明天要是反了怎么办——这些事一件也没有答案。</p>
<p>我不是在替他开脱。杀了就是杀了，四千条命不能因为「难办」就没了。</p>
<p>敢说「不会」，往往只是因为不用承担后果。这句话大概就是这部电影最让人不舒服的地方：它不让你站在安全的地方评价别人。</p>
<p>赵二虎站在城门口喊「回家」的时候，他是对的。庞青云站在城楼上时，他也是按他的道理在办事。两个都对的人做出一件错到底的事——这大概就是它真正想讲的东西。</p>
<h2>可以看看这几个视频</h2>
<p>下面几个讲得比较清楚：第一个把晚清那几位重臣的处境讲得比较清楚，理解庞青云头上那几位「大人」之间的关系有用；第二个是当年被骂烂片、后来翻案的完整复盘；第三个专讲「如履薄冰」那句台词前后的戏；第四个是凌迟那一段的拆解。</p>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1gT4y1a7gV" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1gT4y1a7gV&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>晚清三巨头：曾国藩、李鸿章、左宗棠的处境（约 19 分钟）</figcaption>
</figure>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1dX4y1J7J3" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1dX4y1J7J3&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>《投名状》：16 年前被骂烂片，如今为何翻案（约 23 分钟）</figcaption>
</figure>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1SGnyzyEXF" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1SGnyzyEXF&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>「我这一生如履薄冰」——《投名状》台词前后（约 26 分钟）</figcaption>
</figure>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1S34y1x736" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1S34y1x736&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>《投名状》凌迟桥段拆解（约 5 分钟）</figcaption>
</figure>
<h2>参考</h2>
<ul class="pg-refs"><li><a href="https://www.chinanews.com.cn/cul/2014/02-10/5818260.shtml" target="_blank" rel="noopener">清两江总督马新贻南京离奇被刺，成清末奇案：时间、地点、审讯八个月、剖腹挖心</a><span class="src"> · 中国新闻网</span></li><li><a href="https://www.njdaily.cn/news/2021/0626/3318550461858428002.html" target="_blank" rel="noopener">马台街：不但有《喝馄饨》还和两部电影相关（引《清史稿·列传二百十三》）</a><span class="src"> · 南报网</span></li><li><a href="https://www.lifeweek.com.cn/article/35667" target="_blank" rel="noopener">陈可辛：人人都是庞青云（三联生活周刊 2007 年第 47 期，马戎戎访谈）</a><span class="src"> · 三联生活周刊</span></li><li><a href="http://jds.cssn.cn/xscg/xslw/201605/t20160506_5249792.shtml" target="_blank" rel="noopener">李鸿章早期涉外活动刍议：1863 年苏州杀降、戈登担保与后续冲突</a><span class="src"> · 中国社科院近代史研究所</span></li><li><a href="https://www.baike.com/wikiid/7179138897774952452" target="_blank" rel="noopener">投名状：剧情脉络、台词、山字营由来与奖项</a><span class="src"> · 快懂百科</span></li><li><a href="https://ent.sina.com.cn/m/2007-12-12/ba1831224.shtml" target="_blank" rel="noopener">《投名状》扳回真实男人戏：陈可辛谈李连杰与庞青云</a><span class="src"> · 南方都市报（新浪转载）</span></li><li><a href="https://ent.sina.com.cn/r/2009-06-25/18372582176.shtml" target="_blank" rel="noopener">《投名状》中庞青云：大恶之下，焉存小善（批评一方）</a><span class="src"> · 新浪娱乐</span></li><li><a href="https://search.bilibili.com/all?keyword=%E6%8A%95%E5%90%8D%E7%8A%B6" target="_blank" rel="noopener">B 站搜「投名状」</a><span class="src"> · 视频</span></li></ul>`,
  },
  {
    id: "post-239",
    title: "《老无所依》",
    date: "2026-10-10",
    updated: "2026-10-10",
    cat: "电影",
    tags: ["影像", "类型"],
    cover: "",
    pinned: false,
    excerpt:
      "它是一部被自己拆掉的西部片。片名抄自叶芝的一首诗，硬币不是哲学而是借口，最后一场对决根本没发生——科恩兄弟一说到西部片，想到的是马和六发左轮、酒馆和拴马桩，然后把这些一样一样拿掉了。",
    content: `<div class="pg-indent"></div><p>一部两小时的电影，几乎没有配乐。沙漠里追杀、汽车旅馆里枪响、小镇街头对峙——这些通常会被音乐填满的场面，在这部片子里只剩下风声、脚步、发动机，和一次比一次重的呼吸。</p>
<p>这不是省事。配乐师卡特·伯韦尔从《血迷宫》起就跟科恩兄弟合作，这一次他反对在片子里的任何地方使用音乐。他的理由是：只要加进一个音符，画面就立刻显得特别「电影」，而不够真实。</p>
<p>伊桑·科恩后来给了个折中，那句话被人反复引用：音乐要乘着风进来，和风声分不出来，再回到它来的地方去。</p>
<p>这片子叫 <em>No Country for Old Men</em>，二〇〇七年上映，第二年拿了奥斯卡最佳影片、最佳导演、最佳改编剧本和最佳男配角四项。</p>
<p>名字不是科恩兄弟取的，是麦卡锡小说的名字；小说名又直接抄自叶芝《驶向拜占廷》的第一行。</p>
<p>「这不是给老人待的地方」——这句直译常常被当成一句叹息。它不是叹息，是一句陈述，而且陈述的对象不是美国，也不是德州。</p>
<h2>片名先抄自一首诗</h2>
<p>原句是 <em>That is no country for old men</em>。出自《驶向拜占廷》，叶芝写于一九二七年，收在第二年的诗集《塔》里，是整首诗的第一行。</p>
<p>原诗写的是一个老人到了拜占廷，请那里的圣人把他这把快要散架的肉身烧掉，别让灵魂再困在「一个正在死去的动物」里。诗里的「国度」指的不是美国，不是德州，是那种年轻人谈恋爱、鱼群游、鸟唱歌、所有活物都在赞颂「生下来的、出生的、死掉的」的地方。老人被排出这个国度之外，不是因为被赶，是因为他听不懂那首歌了。</p>
<p>翻译成电影里的语言就是：警长贝尔一辈子在德州西部当治安官，他的父亲当治安官，祖父也当过。他讲起老同行连枪都不用带就能出勤，讲的时候语气里有一种不加掩饰的怀念。而他眼前这个案子，从头到尾他没逮住过任何人。</p>
<p>有一种很常见的读法，把它理解成「死神来时，老无所依」。这个误读其实挺美，但它是误读。原意更冷一些：不是老人要死了，是老人发现这个世界已经不按他的规矩运转了，他在这里没有位置。</p>
<blockquote class="pg-quote"><p>那不是老年人的国度。年轻人／在彼此的怀里，鸟儿在树上／——那些垂死的世代——在唱歌，／鲑鱼跃下的瀑布，鲭鱼拥挤的海，／鱼、肉或禽，整夏都在赞美／凡被孕育、被生出、要死掉的。</p><cite>—— 叶芝《驶向拜占廷》，开头几行</cite></blockquote>
<h2>一个猎人、一箱钱、一个杀手</h2>
<p>故事很简单，简单到像一则寓言。1980年，德州与墨西哥交界的荒地上，猎人莫斯打羚羊，走偏了，撞见一场毒品交易火并的现场：几具尸体、几辆皮卡、一车毒品，还有一只装着两百四十万美元的箱子。</p>
<p>他把钱带走了。当晚他又折回去，给那个还没死的墨西哥人送水——这个善念，是他所有麻烦的开头。他被人看见，从此有了追踪的线索。杀手奇古尔受雇来找这笔钱，一路杀过来，手法用的是屠宰场那种气压枪。</p>
<p>奇古尔这个人，是电影史上少见的反派类型。他不咆哮、不威胁、不享受。他对待杀人像对待一件按流程执行的活：开门、问话、掏硬币、让对方猜、然后执行结果。他甚至会因为「原则」放过人，也会因为「原则」杀掉雇主。他把生死解释成抛硬币，而这套解释说得通、说得漂亮，才是他最可怕的地方。</p>
<blockquote class="pg-quote"><p>你一直在赌，只是你不知道。这枚硬币是1958年的，花了二十二年才来到这里。现在它就在这儿，要么是正面，要么是反面。你得说。</p><cite>—— 奇古尔在加油站对店主说</cite></blockquote>
<p>莫斯的结局，第一次看的人多半会愣一下：他没有和奇古尔来一场高潮对决。他在一家汽车旅馆的走廊上，被另一伙墨西哥人打死，死的时候奇古尔甚至不在场。一个我们跟着看了八十分钟的人，就这么被剧情丢掉了。</p>
<p>这就是所谓的「反高潮」。它冒犯了我们看电影的习惯——我们习惯了因果报应，习惯了主角至少死得体面。科恩兄弟不给。他们要说的恰好是：暴力不排队，不配乐，不讲究对手是谁。</p>
<p>这一下不只是叙事技巧。它是冲着西部片来的。西部片一百年来做的事，是把暴力整理成一种公平的形式：面对面的、等价的、有观众见证的。这部片子告诉你，真实的暴力是背后一枪、是走错门、是认错了人，它没有仪式，也没有见证人。</p>
<h2>一个什么都焊得上的人</h2><p>莫斯这个人，电影前十分钟就交代完了：越战退伍兵，焊工，和妻子卡拉·金住在边境的拖车屋里。这两个设定没有一句是废话。当过兵，所以他读得出风向、认得出弹壳、走得了那片沙漠；是焊工，所以他一路的活法全是手艺活：把两百万藏进通风管道，用的是他的手艺；从皮卡残骸里翻出那台发射器、想明白箱子会自己报信，靠的是这份耐心。电影里凡是需要「想办法」的地方，解决它的都是这个人的职业技能，不是运气。</p><p>医院那场戏把这个人的性子说尽了。赏金猎人韦尔斯来探他，问他焊什么：乙炔焊？MIG？TIG？他答：「只要是焊的，我都能焊。」韦尔斯告诉他，自己只花了三个小时就找到了他。莫斯不信：「他找不到我了。」韦尔斯说：「不是那条路。」莫斯说：「哪条路都找不到。」三句话，本事、自信、和马上要为自信付的账，全在里面。</p><p>另一个毛病是他自己报的。回现场给那个垂死的墨西哥人送水之前，他跟妻子说：「我要去干一件蠢到家的事，但我还是要去。」他知道这是蠢事。知道，还是要去——这不是疏忽，是性格。这一路他没有走错一步：藏钱、换旅馆、反跟踪，桩桩都对，最后死在埃尔帕索一家旅馆的走廊上，死因是一箱他没带在身上的钱，和他丈母娘多嘴透露出去的行踪。他连遗言的架势都是硬的，电话里跟韦尔斯说：「我决定把你变成我的一个特别项目。」一个什么都焊得上的人，唯独焊不上他自己的判断。</p><p>乔什·布洛林得到这个角色的过程值得一讲。他在拍《刑房》的间隙想演这部电影，罗伯特·罗德里格兹说，那就用现成的机器拍段试镜：导演是昆汀·塔伦蒂诺，摄影和打光是罗德里格兹本人。试镜带寄到科恩兄弟那儿，对方的反应是：「灯光是谁弄的？我们正在找新的摄影指导。」乔尔·科恩后来解释这个角色为什么难：「汤米·李·琼斯和巴登都定了，这是一部三个男人等重的电影。我们最怕的是观众一看到切到莫斯，心想『好了，开始看无聊的那个人了』。」伊桑·科恩的说法更准：「这是个普通人的角色，但难到不像话，因为他大部分东西不在台词里，全在他怎么干活上。」</p><h2>那枚硬币不是哲学，是借口</h2>
<p>奇古尔那段硬币戏被引用了无数遍，被读成「命运的随机性」，读成「荒诞」，读成「人在宇宙面前的无力」。这些读法都不算错，但我总觉得漏了一层，而且漏掉的这一层才是最要紧的。</p>
<p>你看他在加油站让店主猜硬币的时候，那个店主猜对了，活着走了。奇古尔把硬币给他，说：别放进口袋里，它会和其他硬币混在一起，就变成一枚普通硬币了——它本来就是。</p>
<p>这句话是全片最凉的一句。一枚硬币本来什么都不是。所谓命运，是奇古尔临时给它加的光。他不是在服从命运，他是在制造命运，然后借命运的名义办事。</p>
<p>这一点，到影片末段被彻底戳破了。他去找莫斯的妻子卡拉·金，那场戏里他照例拿出硬币，而卡拉·金拒绝了。她说得很直白：决定我死活的不是硬币，是你。你现在就可以决定。然后奇古尔第一次显得狼狈，含糊地说了一句自己也圆不上的话，走了。</p>
<p>她说完那句话之后，奇古尔确实没再抛。这一次的「不抛」，不是仁慈，是被人当场拆掉了仪式的脚手架，他不得不空着手做完这件事。她大概没活下来——他出门时抬脚看了一眼鞋底，那是他检查血迹的习惯动作。但她在死之前把那个装置卸掉了。</p>
<p>我的判断是：这部电影里最勇敢的一句话，不是莫斯说的，不是贝尔说的，是那个一直在厨房里坐着、台词加起来不超过二十句的女人说的。而它被拍得如此安静，安静到很多人根本没注意到它是全片的转折。</p>
<p>这里我得先把最强的反驳摆出来，因为这大概是很多人的第一反应：奇古尔有原则，有自己一套逻辑，他甚至放过那个人，所以他是「另一种正义」，是这个世界必然长出来的东西，不该被简单说成恶。</p>
<p>我承认奇古尔确实不是疯子。他比疯子难对付。但如果「有原则」就能抵消杀害无辜，那原则就成了一张通行证。他的原则的全部内容是：把选择权推给硬币，自己保留执行权。这不是正义，这是把责任外包。我判断他就是一个纯粹的恶——只不过穿了西装、理了发型、说话礼貌。</p>
<h2>奇古尔的怪，是一处一处做出来的</h2><p>奇古尔最出名的东西是他的头发。那个锅盖头不是即兴来的，出处是一张照片：汤米·李·琼斯的一本书里，一九七九年，德州一间妓院的酒吧，一个男人顶着这样的发型坐在吧台边。科恩兄弟照着它定了造型，又找来拿过奥斯卡的发型师保罗·勒布朗克，要求只有一句：做得「奇怪而不安」。勒布朗克参考了十字军时代英国武士的发型和六十年代的 Mod 头。巴登第一次从镜子里看见自己，说了一句后来被引了很多年的话：「往后两个月没人会跟我上床了。」科恩兄弟听完击掌。拍到最后，他的说法变了：「顶着这个发型，你不用演怪。」</p><p>他手里那件东西也一样怪。那不是枪，是屠宰场里击晕牲畜用的气压枪：一个气瓶、一根管子、一段把手，弹头打出去还会缩回来。有效射程两三米，提着它没法扫射，只能走到人跟前。整部电影它只对付了两个目标，其中一个还是旅馆的门锁。它没有弹壳，不需要弹药，几乎不出声——换句话说，这是一把连凶器鉴定都很难做的凶器。这跟那枚硬币是一体的：都是把杀人从「搏斗」降格成「操作」。</p><p>更怪的是那些小动作。他杀完人弯腰查看鞋底，看有没有沾血；对峙的戏里他从头到尾不眨眼，这是巴登自己加的；他连雇主都杀，理由是对方绕开他另外雇了韦尔斯。科恩兄弟当年打电话找他，他在电话里推辞：「你们找错人了。我不会开车，英语说得烂，我讨厌暴力。」对方回：「也许正因为这样，我们才找你。」他后来对电台描述这个角色：这个人不知道从哪儿来，也不知道回哪儿去，像一种自然的力量。</p><p>影片结尾把他的道理原样还给了他。他讲了一辈子「你是你走过的路」，一出门就被车撞断了胳膊，骨头都戳出了皮肉。他从地上爬起来，花一百块买下一个骑车男孩的衬衫，吊着那条胳膊走掉了。男孩问他怎么回事，他只说：「我到这儿来的方式，跟那枚硬币是一样的。」把一切归给命运的人，被命运撞了一下，然后接着走。后来有研究者分析过一百多个银幕精神变态形象，按临床标准把奇古尔归进「原发性精神变态」，算是最写实的那一档。至于这个名字到底什么意思，麦卡锡的答案最干脆：「我就是觉得它听起来酷。」</p><p>把这些凑在一起看就明白了：这个角色的怕，没有一处来自表演的激动，全来自精确。发型、武器、习惯、步态，一处一处做出来，缺一样都不成立。观众怕的不是这个人凶，是这个人不对劲。</p><h2>被抛下的警长</h2>
<p>真正的主角，其实是汤米·李·琼斯演的贝尔警长。只是电影的剪法故意让你晚一点才意识到这件事——他的独白被剪得很碎，散在追捕的空隙里，像是别人的旁白。</p>
<p>他一辈子追人，这次从头到尾都在迟到。到旅馆的时候人已经走了，到现场的时候血已经干了。他去拜访一位坐轮椅的老前辈，问的是同一个问题：这地方到底怎么了。</p>
<p>那段对话是这一节的关键。老前辈的回答没有给他安慰，反而说了一句更凉的话，大意是他们这地方从来就暴力，只是以前的人不承认。这等于把贝尔怀念的那个「干净的老时代」也一并拆掉了。他怀念的不是真的过去，是他记错了的过去。</p>
<p>所以他退休了。这件事在警匪片里几乎不可想象——警察不战而退，不是被打败，是判断自己不该在这局里。</p>
<p>影片最后，他坐在早餐桌前对妻子讲两个梦。第一个梦是他丢了钱，父亲又给了他一百块；第二个梦里，他在雪山上，父亲骑马超过他，裹着毯子、低着头、举着一支装在号角里的火把，先走一步，要去前面那个又黑又冷的地方生一堆火等他。</p>
<p>讲完他说：然后我醒了。</p>
<p>这个结尾被人骂了很多年，说潦草、说没讲完。它其实是这部电影最诚实的地方。一个老人能交代的，就只剩下做梦了。他没有赢，没有复仇，没有把世界修好，他能做的就是相信前面有人在生火。这不是安慰，这是退到最后的退路。</p>
<h2>一部被自己拆掉的西部片</h2>
<p>关于它是不是西部片，有一种很常见的说法：「连马都没有几匹，算什么西部片」。这话说的是印象，但印象错了。马是有的——莫斯受伤后从墨西哥那边牵回来的那匹，贝尔也骑马。只是这片子的马不承担西部片里马该干的事：不追人，不救人，不在落日里奔跑。</p>
<p>先看它有多像一个西部片。地方是德州西部，一条河过去就是墨西哥。莫斯出场穿牛仔靴——有影评认真到去认牌子，说是 Larry Mahan 的黑靴子，德州本地人会穿的。贝尔戴白色牛仔帽，穿靴子，别一支左轮，不带枪套就插在腰带上，这种带法老派到近乎固执。镇上就一条街，加油站、汽车旅馆、拖车房、荒地上的旧木屋。这些都是西部片的原材料：一个法警、一片法外之地、一个游荡的枪手。</p>
<p>再看它把西部片怎么拆的。西部片的隐性契约是——最后有一场对决。坏人来，好人迎上去，两人在正午的街上站着，谁先动谁活。观众买票买的就是这九十秒。这部片子不给。莫斯死在一家汽车旅馆的走廊上，杀他的是另一伙谁也没记住的墨西哥人，奇古尔当时根本不在场。奇古尔后来也没跟贝尔碰上面——他站在贝尔刚刚离开的那间旅馆房间里，看着窗帘的褶皱，贝尔在门外，两人隔着十五秒的时间。这条线到这里就断了，再也没有接上。</p>
<p>更狠的一处是外形。奇古尔不戴帽子。西部片里帽子是身份的记号——白帽黑帽，好人坏人，孩子在电影院里一眼就分得清。奇古尔顶着一头奇怪的发型，每一缕头发都看得清，没有帽子，没有马，没有左轮。他用的是屠宰场那种气压枪和一把带消音器的霰弹枪，追踪靠的是藏在钱箱里的一枚应答器——听信号里的「嘀」声，而不是看地上踩过的痕迹。</p>
<p>这一条特别要紧。西部片的英雄是会读痕迹的人：莫斯开场用十二倍的德国望远镜扫荒地，那是有耐心的人才有的看法。奇古尔不读，他听。这不是「枪手换了把新枪」，这是把西部片里全部的辨认系统拆了：你没法从他穿什么看出他是谁，也没法从地上的脚印推断他要往哪走。</p>
<p>所以它就是西部片，只不过是一部知道自己正在被淘汰的西部片。它把西部片的景、人、服装、身份全摆出来，然后把西部片答应给你的那件事——对决、判断、胜负——一件一件拿走。剩下的就是片名那句话：这地方不留给老人了。</p>
<p>主创自己也没统一口径，这一点挺有意思，值得摆出来。乔尔·科恩说他不觉得这是西部片，理由是「一说到西部片，我们想到的是马和六发左轮、酒馆和拴马桩」。伊桑·科恩说它「算是西部片」，紧接着补一句「又算不是」。同一个采访里乔尔又说，它「在类型上很有意思，但对我们来说更有意思的是它颠覆了类型预期」。</p>
<p>评论界的说法比主创更细。Richard Gillmore 的表述我觉得最准：它「是西部片，又不是西部片」——它在西部，主角是西部人，但故事围绕一笔搞砸了的毒品交易，里头是四轮驱动、半自动武器、高层写字楼里的老板，这些东西本来不该出现在西部片里。他还说这是「两种伟大的美国电影类型的混合：西部片和黑色电影」，前者相信靠毅力和本事能赢，后者相信对手太强、人会输。合起来就是「一个带悲剧性存在主义黑色结局的西部片」。</p>
<p>William J. Devlin 给它起了个名字，叫 neo-western（新西部片），区别在于它「展示了传统西部理想的衰败」——那个有清白英雄、有明确是非的道德框架正在消退，罪犯的行为方式让传统英雄根本读不懂。还有 Deborah Biancott 的说法是 western gothic（西部哥特）：一个不认错的恶，一个按你完全陌生的道德准则活着的坏人，一个像有超自然能力一样打不死的游荡者。</p>
<p>我倾向于 Gillmore 那个说法。因为它的解释力最强：它同时解释了为什么这片子看着像西部片，又为什么看完之后觉得哪儿都不对——因为它前半段确实用西部片的语汇在说话，后半段用黑色电影的逻辑收的尾。黑色电影的逻辑是：主角聪明，障碍重重，最后他没能克服。贝尔聪明，障碍重重，最后他退休了。</p>
<h2>暴力的质感</h2>
<p>科恩兄弟在这部片子里对暴力做了一个很特别的选择：几乎不配乐。全片大部分时间只有风声、脚步声、轮胎碾过碎石的声音、气压枪那一声闷响。</p>
<p>没有弦乐告诉你「现在要紧张了」。你只能靠画面里的人自己判断。这就把观众从「被照顾」的状态里推出来了——你必须自己看，自己害怕。</p>
<p>另一件事是声音的延迟。有几场戏，枪响和画面之间故意错开，你先看见东西碎了，再听见声音。这不是技术炫技，是提醒你：在这个地方，事情发生在你意识到之前。</p>
<p>还有环境。全片几乎全是荒地、公路、汽车旅馆、加油站的荧光灯。没有一处是舒适的室内。人在这套景里显得很小，不是因为镜头广角，是因为地面没有边界，人站在那儿，背后是无边的土黄。</p>
<p>拍摄地就在德州和新墨西哥，全是实景。这种「真的荒」是布景做不出来的——它有一种被太阳晒了很多年之后剩下什么都不长的干。</p>
<h2>它被读窄了</h2>
<p>这部电影拿了很多奖，第80届奥斯卡最佳影片、最佳导演、最佳男配角、最佳改编剧本，戛纳金棕榈提名，烂番茄二百多篇评论九成往上认可。这些都是事实，容易查到。</p>
<p>但它真正被谈得多的，是那个反派。网上关于「最礼貌的杀手」「硬币审判」「发型」的切片播放量高得离谱。奇古尔确实好演得好，哈维尔·巴登凭这个角色拿了奥斯卡男配。</p>
<p>问题在于，只谈奇古尔，这部电影就被削成了一部「变态杀手很酷」的片子。而它的重心其实一直压在贝尔身上——一个没有能力处理眼前事的老人，在退休的年纪看着自己认得的规则一块块失效。</p>
<p>这也解释了片名为什么叫「这不是给老人待的地方」。如果它只是讲一个杀手，片名应该叫《气压枪》或者《两百万》。它偏偏挑了一个跟暴力毫无关系的名字。</p>
<p>第一遍看，注意力会被奇古尔整个吸走；再看一遍，注意力会落到贝尔那些没有下文的对话上。他的每一句家常话，都是在问同一件事——我这样活，还有意义吗。</p>
<p>这个片子最不讨喜的地方也在这儿。它不给你爽。你跟着跑了两小时，最后没有缴获，没有审判，没有大快人心的场面。而这才正是它值钱的部分：它拒绝把暴力包装成娱乐，也拒绝把衰老包装成悲壮。</p>
<h2>看完之后我想的一件事</h2>
<p>贝尔那套办法是：找到人，说清楚，讲个理，落个面子。这套办法在他那条街上管用了很多年。后来那条街变了，人也散了，那套办法就一个也用不上了。不是被谁打败，是规则本身失效了。</p>
<p>他坐在早餐桌前讲梦的时候，讲的就是这件事：一个老人发现自己那套办法已经不管用了。他也没输给谁，他只是找不到地方了。</p>
<p>所以说，这部电影最锋利的地方不在硬币，不在气压枪，不在旅馆走廊那一枪。在最后三分钟，一个老人承认自己没用了，然后说了一句「然后我醒了」。</p>
<p>这话说出来不需要勇气，难的是承认。</p>
<h2>可以看看这几个视频</h2>
<p>下面四个讲得比大多数文字解读清楚。第一个是万字解读，从结构上拆了这部片为什么反复看都有新东西；第二个谈的是「反高潮」——正好对应前面那个被剧情丢掉的猎人；第三个干脆站到奇古尔那一头，用他的第一视角把整部电影重新讲了一遍；第四个是熟肉长片，专门讨论「是什么让奇古尔如此可怕」。</p>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1sK421e7rQ" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1sK421e7rQ&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>绝命墨菲｜《老无所依》万字解读，一场没有白痴的道德灾难（约 41 分钟）</figcaption>
</figure>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1QjJS6VEEZ" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1QjJS6VEEZ&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>留念影剪｜科恩兄弟经典反高潮作品——《老无所依》（约 25 分钟）</figcaption>
</figure><figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1EfXtYQE1a" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1EfXtYQE1a&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>《以「安东·奇古尔」的第一视角来讲述老无所依的故事》（约 10 分钟）：站到追猎的那一头，再看一遍这部电影</figcaption>
</figure><figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1qm421J7J7" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1qm421J7J7&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>《与死亡的谈判：是什么让安东·奇古尔如此可怕》（约 21 分半，熟肉）：从表演和调度上拆这个角色</figcaption>
</figure>
<h2>参考</h2>
<ul class="pg-refs"><li><a href="https://www.chinawriter.com.cn/n1/2016/0627/c405073-28500106.html" target="_blank" rel="noopener">《老无所依》：麦卡锡小说评介，含片名出自叶芝的说明</a><span class="src"> · 中国作家网</span></li><li><a href="https://www.chinanews.com/cul/2012/10-24/4274040.shtml" target="_blank" rel="noopener">从小说到电影：《老无所依》的殊途同归</a><span class="src"> · 中国新闻网</span></li><li><a href="https://www.theskinny.co.uk/film/interviews/no-country-for-old-men-feature" target="_blank" rel="noopener">The Coen Brothers on No Country For Old Men：科恩兄弟谈类型归属与结尾</a><span class="src"> · The Skinny 访谈</span></li><li><a href="http://www.liquisearch.com/no_country_for_old_men_film/genre" target="_blank" rel="noopener">No Country for Old Men (film) — Genre：Gillmore／Devlin／Biancott 各家类型说法</a><span class="src"> · Liquisearch 资料页</span></li><li><a href="https://www.owiki.org/wiki/No_Country_for_Old_Men" target="_blank" rel="noopener">No Country for Old Men：剧情脉络、应答器追踪、卡拉·金拒掷硬币</a><span class="src"> · Owiki 百科</span></li><li><a href="https://wordsonpages.blog/2020/04/07/llewelyn-moss-watch-your-backtrack/" target="_blank" rel="noopener">Llewelyn Moss: Watch Your Backtrack：奇古尔「听信号」与传统读痕迹的对照</a><span class="src"> · Words on Pages</span></li><li><a href="https://search.bilibili.com/all?keyword=%E8%80%81%E6%97%A0%E6%89%80%E4%BE%9D" target="_blank" rel="noopener">B 站搜「老无所依」</a><span class="src"> · 视频</span></li><li><a href="https://news.agentm.tw/181622/%E9%9A%AA%E8%B7%AF%E5%8B%BF%E8%BF%91-%E5%93%88%E7%B6%AD%E7%88%BE%E5%B7%B4%E7%99%BB-%E6%9F%AF%E6%81%A9%E5%85%84%E5%BC%9F-%E6%AD%A6%E5%99%A8-%E7%89%9B%E9%8E%97" target="_blank" rel="noopener">《險路勿近》牛鎗解析：屠宰场气压枪的构造、两三米射程、全片只造成两位「牺牲者」其中一位是门锁</a><span class="src"> · 电影神搜</span></li><li><a href="https://www.owiki.org/wiki/Anton_Chigurh" target="_blank" rel="noopener">Anton Chigurh 词条：1979 年妓院酒吧照片与发型师保罗·勒布朗克、巴登拒演与电台访谈、不眨眼与查鞋底的习惯、银幕精神变态的归类研究</a><span class="src"> · Owiki 百科</span></li><li><a href="https://archive.seattletimes.com/archive/20071116/oldmen160/the-quiet-menace-of-no-country-for-old-men/" target="_blank" rel="noopener">The quiet menace of "No Country for Old Men"：莫斯为越战退伍兵兼焊工的设定，布洛林的表演评述</a><span class="src"> · 西雅图时报（存档）</span></li></ul>`,
  },
  {
    id: "post-238",
    title: "断章取义来自不要断章取义",
    date: "2026-10-02",
    updated: "2026-10-02",
    cat: "文史",
    tags: ["语言", "历史"],
    cover: "",
    pinned: false,
    excerpt:
      "「断章取义」这个词的出处，是一句为断章取义所作的、而且成功了的辩护。从《左传》里卢蒲癸的「赋诗断章」，到《文心雕龙》的「断章有检」，再到推敲那桩改坏了也照样成词的旧案，最后落到二〇二二年那篇被标题判了刑的文章。",
    content: `<div class="pg-indent"></div><p>网上有一种批评，几乎不需要证据。你写了一篇文章，写了三千字，有人说你「断章取义」。你去翻，发现他引的那一句，你确实写过。</p>
<p>事情到这儿就有点奇怪了：那一句是真的，可是那一句被拿出来以后，意思和你原本要说的话不是一回事。而他指责你的方式，正好就是他所指责的那件事。</p>
<p>「断章取义」这四个字，我们从小听到大，默认它是一个纯粹的坏词。可是这个词的出生地，和它今天住的地方，隔了两千五百年。</p>
<p>先看看它原本是谁说的，为什么说。</p>
<h2>这个成语是从一句辩解里来的</h2>
<p>《左传·襄公二十八年》里有一段，讲的是齐国的事。庆封这个人喜欢打猎、嗜酒，把国政交给了儿子庆舍。为了图方便，他把自己家里的妻妾财物搬到了卢蒲嫳家，交换妻妾喝酒。</p>
<p>国都里的人渐渐跑到那边去朝见，政令也跟着搬了家。</p>
<p>这个局面里，有一个人回了齐国：卢蒲癸。他本是齐庄公的亲近侍卫，庄公被崔杼、庆封合谋杀掉以后，他逃到了晋国。庆封下令召回了一批流亡的人，卢蒲癸就在其中。回来以后他做了庆舍的家臣，很快得了宠信。</p>
<p>宠到什么程度呢？庆舍把女儿嫁给了他。</p>
<p>问题就出在这桩婚事上。庆氏姓姜，卢蒲氏也姓姜，往前推都是齐国公族的后人。按当时的礼，「男女辨姓」，同姓不婚是大事。</p>
<p>所以庆舍门下有人问他：「男女辨姓，子不辟宗，何也？」意思是，您怎么不避一避同宗呢。</p>
<p>卢蒲癸的回答，就是「断章取义」的源头：</p>
<blockquote class="pg-quote"><p>宗不余辟，余独焉辟之？赋诗断章，余取所求焉，恶识宗？</p><cite>——《左传·襄公二十八年》，卢蒲癸</cite></blockquote>
<p>译成现在的话：庆家都不避我，我一个人避什么？这就跟赋诗时截取一章一样，我取我需要的那部分就是了，谁还管他是不是同宗。</p>
<h2>赋诗为什么可以只取一章</h2>
<p>今天读这句话，会觉得卢蒲癸在耍流氓：讲不过道理，就拿「断章」当挡箭牌。这个理解错在把「赋诗断章」当成了随便剪裁。</p>
<p>春秋时候的「赋诗」不是自己写诗，是在宴飨聘问的场合里点一首《诗》让人唱。这个动作的性质很特别：它是一种外交语言，用来表达不能明说的话。所以重要的从来不是原诗在说什么，而是此刻我借它说什么。</p>
<p>卢蒲癸在同一段话里举的例子，是《左传·襄公十四年》的事。晋、鲁等国联军攻秦，到了泾水，谁也不肯先渡。</p>
<p>晋国大夫请鲁国大夫孙叔豹表态，孙叔豹就赋了一首〈匏有苦叶〉。这首现存于《诗经·邶风》，首章是「匏有苦叶，济有深涉；深则厉，浅则揭」。</p>
<p>原诗写的是一个待嫁女子下定决心要出嫁的心情。孙叔豹当然不是这个意思——他要说的是：不管水深水浅，这河总是要渡的。</p>
<p>所以「赋诗断章」在当时的语境里，不是偷工减料，而是一套大家都懂的语法。《左传》通篇都是这么用的，用得最漂亮的那些段落，靠的正是剪得准。</p>
<p>孔子说过「不学《诗》，无以言」，说的也是这件事。在那个场合里，不会断章的人，是没法说话的。</p>
<h2>刘勰用这个词的时候也是心平气和的</h2>
<p>比《左传》晚七百多年，刘勰在《文心雕龙·章句》里又用了这个词。他讲的是文章的结构：一章一句在整篇里的位置，像蚕茧抽丝，从头到尾，体制上必得像鳞片那样依次排列。</p>
<blockquote class="pg-quote"><p>寻诗人拟喻，虽断章取义，然章句在篇，如茧之抽绪，原始要终，体必鳞次。</p><cite>——刘勰《文心雕龙·章句》</cite></blockquote>
<p>这句话里的「断章取义」没有半点贬义。刘勰的意思恰恰是：就算读者常常只取一章来看，那一章在整篇里也是有位置的，你得顺着丝头一路抽到丝尾，才能看清它本来长在什么地方。</p>
<p>更明确的是这一篇结尾的赞语：</p>
<blockquote class="pg-quote"><p>断章有检，积句不恒。理资配主，辞忌失朋。</p><cite>——《文心雕龙·章句》赞曰</cite></blockquote>
<p>「断章有检」——断章是有规矩、有尺度的。刘勰把「断」当成一种手艺，手艺就有好坏。好坏的标准是合不合整篇的肌理，而不是能不能断。</p>
<p>一个词在南朝还能被这样平静地讨论，说明它当时还没有变成罪名。</p>
<h2>它是什么时候变成罪名的</h2>
<p>教育部《成語典》在「断章取义」的典故说明末尾写得很清楚：「原专指截取《诗》的部分以为己用，而不顾原诗的本意。今则多用来泛指截取诗文或谈话中的某一段落而言。」</p>
<p>这句「今则多用」里没有具体年代，但词义的走向是清楚的：从一个有规范可依的手艺，变成了一个几乎只用于指责的动作。中间发生了什么，可以从用法里倒推。</p>
<p>春秋的断章，是当场剪、当场说，剪的人不隐瞒自己在剪，听的人也知道对方在剪。双方共享同一个前提：我们是在用《诗》说话，不是在讲《诗》的本意。这是公开的借，不是偷偷的改。</p>
<p>而今天的「断章取义」，剪的人往往不承认自己在剪。他把剪下来的那一小块当成全部，把「我取所求」这一步藏起来，让读者以为那就是对方说的话。区别不在断没断，在承不承认。</p>
<p>所以严格说，这个成语的堕落不是因为「断」，而是因为「瞒」。「赋诗断章，余取所求焉」这句话如果今天说出口，前半句没人反对，后半句一定会被抓住——因为它把取用这件事说破了。</p>
<p>也就是说，卢蒲癸那句话本身是坦白的，坦白的坦白得让人不舒服。他不装。他甚至是在用「我就是要取我需要的」来为自己的行为辩护。</p>
<h2>他取的那点东西，后来派上了什么用场</h2>
<p>这里得把上面那桩婚事说完，因为它的下文很少被提起。</p>
<p>卢蒲癸娶庆姜，不是意外。他是为齐庄公报仇回来的。借着这份宠信，他又把另一个庄公旧部王何推荐回朝，两人都成了庆舍的侍卫，执寝戈，一前一后，就在庆舍身边。</p>
<p>最戏剧的一笔在《左传》原文里。卢蒲姜是庆舍的女儿，也是卢蒲癸的妻子，她对丈夫说：「有事而不告我，必不捷矣。」有事不告诉我，这事办不成。</p>
<p>卢蒲癸就告诉了她。她说，我父亲性情刚愎，没人劝他反而不出来，我去劝他。</p>
<p>前545年十一月，齐国在太公之庙举行秋祭，庆舍主持。卢蒲姜去劝父亲别去，说有人要作乱。庆舍不听，说「谁敢者」，还是去了。</p>
<p>动手的场面，《左传》写得很不体面。庆氏的甲士把公宫围起来，陈氏、鲍氏的圉人扮作优人。庆氏的马容易受惊，甲士们便卸了甲、拴了马，一边喝酒一边看戏。</p>
<p>子尾用槌子在门上敲了三下，卢蒲癸从背后刺庆舍，王何用戈击他，砍断了他的左肩。</p>
<p>《左传》原文里最见力气的一句是：庆舍「犹援庙桷，动于甍，以俎壶投杀人而后死」。肩膀已经断了，他还攀住庙里的椽子，把屋栋都撼动了，抓起祭器俎和壶砸出去，砸死了人，然后才死。</p>
<p>庆封出逃，先奔鲁，再奔吴，齐国要人，吴国把他安置在朱方。而那位用「赋诗断章」回答了礼法质问的人，报了仇，活了下来。</p>
<h2>所以这个成语其实出自一个反例</h2>
<p>把这条线拉直了看，会发现一件挺别扭的事：「断章取义」这个词的出处，是一句为断章取义所作的、而且成功了的辩护。</p>
<p>卢蒲癸面临的质问是真实的。他确实破了同姓不婚的礼。他没有说这礼不对，也没有说我们其实不同宗。他说的是：既然对方都不避，我也不避；就像赋诗那样，我取我需要的。</p>
<p>这是一次明显的狡辩——用一套外交场合的语法去解决一桩婚姻礼法的事。两者根本不在一个层面上。可他赢了：婚结了，宠信有了，仇报了。</p>
<p>后世把这个句子抽出来，做成了成语，然后把它的立场整个翻了过去。本来是「我取我所求」，现在成了「你怎么能只取你所求」。本来是辩护词，现在成了判决书。</p>
<p>这就是标题里那句别扭话的意思：断章取义这个名字，来自一次不要断章取义的反面示范。它一开始就是被人当成可以用的东西在用的。</p>
<h2>推敲那件事：改坏了也照样成了好词</h2>
<p>同类的事不止这一桩。还有一个我们更熟的词，叫「推敲」。</p>
<p>贾岛在驴背上得了一句「鸟宿池边树，僧敲月下门」，又想做「僧推月下门」，炼之未定，一边吟哦一边做推敲的手势，撞进了京兆尹韩愈的仪仗队。韩愈立马良久，说「敲字佳」。两人并辔而归，成了布衣之交。</p>
<p>这个故事记载在后蜀何光远的《鉴戒录·贾忤旨》里，《苕溪渔隐丛话》引黄朝英《缃素杂记》也收了，细节大同小异。</p>
<p>而它本身的可信度，辽宁日报一篇专文说得很直接：「真实性现在无从确认，很可能是后人根据传说创造出来的」。</p>
<p>更有意思的是，后来有人不服韩愈那个「敲字佳」。</p>
<p>王闿运《湘绮楼说诗》说：「实是『推』门，以声调不美，改用『敲』耳。」——本来该是推门，只是声调不好听才改成敲；何况寺门高大，敲不响，月下敲门，那是进民宅。</p>
<p>王夫之《姜斋诗话》更狠：「只是妄想揣摩，如说他人事……若即景会心，则或推或敲，必居其一，因景因情，自然灵妙，何劳拟议哉？」钱振锽《谪星诗说》直接说韩愈「不能以理告之」，判断是错的。</p>
<p>也就是说，那个被我们当成炼字典范的故事，很可能是编的；就算真有其事，韩愈的判断也未必对。</p>
<p>可这不影响「推敲」成了一个好词。它今天的意思就是反复斟酌——一个大概率为假的故事，教出了一件真该做的事。词的生命和故事的真相，是两回事。</p>
<h2>二〇二二年那篇文章</h2>
<p>说回离我们最近的。2022年9月18日，山东德州市作家协会公布「廉洁文化主题文学作品征文获奖名单」，一等奖是《我的县长父亲》，作者于忠东。</p>
<p>标题一出来，评论区就炸了。因为它撞上了喜剧电影《夏洛特烦恼》里的「我的区长父亲」，那个桥段讽刺的正是拼爹。于是一等奖被读成了「拿县长父亲的头衔刷来的」，德州市作协随后删除了获奖信息和链接。</p>
<p>事情的真相是：作者是当地一家银行的退休干部，写的是她父亲于志明。于志明是新中国成立后禹城首任人民选举的县长，五十九岁去世，当过县长，也做过饮食员、掏粪工，几起几落，留下一百二十九本工作日记。</p>
<p>女儿整理这些日记，随手写下怀念，取这个题目只是因为「实事求是，我父亲一辈子做的这些事，不容易」。</p>
<p>北京晚报的评论说得很准：「网友大加嘲讽之前并没有看过全文。」「看到标题就自行『脑补』，不加查证就大放厥词。」杭州日报的评论里也点了一次「望文生义」。</p>
<p>后来舆论反转了。有网友说「应为昨天的轻浮道歉」。于忠东的回应很平静：「别人愿意咋说就咋说吧」「我心里很坦然」。她还说了一句，「这一代的人要不说，下一代人就不知道了」。</p>
<p>这件事里有两个断章的动作，都值得摆出来。第一个是网友的：他们截取的不是文章，是标题里「县长父亲」四个字，再把它接到另一部作品的语境上去。这是最典型的断章取义——取的是字，义是从别处搬来的。</p>
<p>第二个是主办方的：他们删稿。删的理由不是文章有问题，是评论区有问题。这个动作等于承认了「标题可以当内容读」，把文本问题处理成了舆情问题。要不是删了稿，这件事可能根本不会反转成现在这个版本。</p>
<h2>为什么我们这么容易判一段话的罪</h2>
<p>上面几件事串起来，能看出断章取义不完全是一种恶意，它更多是一种认知上的省事。</p>
<p>人读一段话，是先抓一个整体印象，再去对细节。这个顺序在大多数场合是有效的，代价是它极度依赖那个印象准不准。标题、封面、第一句、一个熟人转发的截图，这些最先到手的东西几乎决定了后面所有的读法。</p>
<p>后面的字都是在给第一印象找证据。</p>
<p>而一旦第一印象是坏的，文章写得越好越不利——因为那种好会被读成伪装。《我的县长父亲》就是这样：质朴、具体、扎实，在「拼爹」的框架里全都变成了「高级马屁」。</p>
<p>反过来也有一种断章，是故意留白给人断的。比如一份文件里某句话被单独提出来当标题，删掉前后两个限定从句；比如一段访谈被剪成十五秒，剪掉提问。</p>
<p>这些不是读的人省事，是写的人省事。他把「取」这一步做在了读者之前。</p>
<p>这两种断章的害处不一样，可判定标准是同一个：被剪掉的那部分，会不会改变剩下的那部分的意思。</p>
<h2>那么标准到底在哪里</h2>
<p>教育部社科委2004年那份《高等学校哲学社会科学研究学术规范（试行）》，在「学术引文规范」里写了一条：「引文应以原始文献和第一手资料为原则。」「凡转引文献资料，应如实说明。」</p>
<p>另一份面向青少年的科技实践活动规范指南说得更直白：「在引用文献前应仔细阅读文献内容……保证引用的准确性。引用时应尊重文献原意，不可断章取义。」</p>
<p>这两句加起来，其实就是把春秋那套规矩翻译成了现代语言。「取所求」这一步骤可以存在，但必须被说出来：你取的是哪一段，为了什么取，原处是什么语境。做到这三点，断章就不是罪；做不到，才叫断章取义。</p>
<p>刘勰说「断章有检」，检就是这三点。检不是「不许断」，是「断得要有交代」。卢蒲癸当年把话说破了，所以他其实不算偷偷地断；今天的评论区，往往是把话藏着断。</p>
<h2>看完之后我想的一件事</h2>
<p>写东西的人最怕的其实不是被人骂，是被人夸到点上——夸到点上说明对方真读了。被人骂到点上也不坏，至少说明读到了。最无力的是被骂一个自己没写过的观点：你得先复述一遍那个观点，再说自己没写过。</p>
<p>所以被人断章是写作的一部分，就像下雨是出门的一部分。你没法预防，只能尽量把段落写得前后咬合得紧一点，让单抽一句出去的时候，它自己会显出一点不对劲。</p>
<p>刘勰那句话正好可以放在这里：「章句在篇，如茧之抽绪。」抽一段丝出来，丝头上总带着它原来长在哪里的痕迹。写得好一点，痕迹就长一点。这是作者唯一能做的那部分。</p>
<p>至于剩下的那部分，只能靠读的人肯把手指往下划两屏。</p>
<h2>可以看看这几个视频</h2>
<p>B 站上这个标题本身已经成了梗——「要断章取义」，后面缀一句「取自《不要断章取义》」。一个三分钟的段子，把这篇的意思说得比我利索。</p>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1TEsZzXEyQ" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1TEsZzXEyQ&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>《「要断章取义」，取自「不要断章取义」》（约 3 分半）：这个梗的出处</figcaption>
</figure>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1iKgA6wEBY" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1iKgA6wEBY&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>《「要断章取义」合集》（约 1 分半）：同一句式的一串变体</figcaption>
</figure>
<p>春秋那一层也有人讲过，虽然播放不多。「赋诗言志」是《左传》里的老题目，讲透了再看卢蒲癸那句话，就不觉得他在耍流氓了。</p>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1Ne3oz2ESG" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1Ne3oz2ESG&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>《赋诗言志：断章取义的最高境界》（约 2 分半）：春秋赋诗为何可以只取一章</figcaption>
</figure>
<p>另外一个是「后半句」系列。这类视频把常被引用的名句补全，多半是些耳熟能详的励志话，补上后半句之后味道就变了。看着解气，但它其实是同一个动作的镜像：用补全去纠正剪裁，仍然是拿一句话在打架。</p>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1YMhb6EEGq" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1YMhb6EEGq&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>《原来那些被我们断章取义的古文名句，它的后半句才是真相》（约 7 分钟）</figcaption>
</figure>
<p>最后这个跟 2022 年那篇文章有关。标题党得很，内容倒是把原文读了一遍。</p>
<figure style="margin:22px 0">
<div role="button" tabindex="0" data-bvid="BV1oB4y1n7jK" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;background:#15151a;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1oB4y1n7jK&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.62);font-size:12.5px;letter-spacing:.08em">点击播放</span></div></div>
<figcaption>《断章取义！〈我的县长父亲〉认真读完，实至名归》（约 2 分半）</figcaption>
</figure>
<h2>参考</h2>
<ul class="pg-refs"><li><a href="https://dict.idioms.moe.edu.tw/idiomView.jsp?ID=5044&webMd=2" target="_blank" rel="noopener">教育部《成語典》「斷章取意」条：典源《左传·襄公二十八年》、孫叔豹赋〈匏有苦叶〉，及「原专指…今则多用」的语义变迁说明</a><span class="src"> · 教育部成語典</span></li><li><a href="http://guoxue3000.com/tw/books/281/chapters/187" target="_blank" rel="noopener">《左传·襄公二十八年》全文：卢蒲癸答「赋诗断章，余取所求焉」，及太公之庙秋祭、庆舍被杀一段</a><span class="src"> · 国学3000·春秋左传</span></li><li><a href="https://www.shidianguji.com/mid-page/7265399354712784953" target="_blank" rel="noopener">《文心雕龙·章句》原文：「虽断章取义，然章句在篇，如茧之抽绪」与赞语「断章有检，积句不恒」</a><span class="src"> · 识典古籍</span></li><li><a href="https://epaper.lnd.com.cn/lnrbepaper/pc/con/202409/12/content_253734.html" target="_blank" rel="noopener">「推敲」月下门：贾岛本事出处，并引王闿运《湘绮楼说诗》、王夫之《姜斋诗话》、钱振锽《谪星诗说》三家异议</a><span class="src"> · 辽宁日报</span></li><li><a href="https://www.toutiao.com/article/6428060821772140802/" target="_blank" rel="noopener">齐地成语——断章取义：卢蒲癸身世、庆姜告以「有事而不告我，必不捷矣」、前545年袭杀庆舍的始末</a><span class="src"> · 临淄发布（头条号）</span></li><li><a href="https://www.hzzx.gov.cn/content/2022-09/22/content_8359346.htm" target="_blank" rel="noopener">理直气壮褒扬「好官」：《我的县长父亲》获一等奖后遭删、德州方面回应、129 本工作日记与 91 本捐赠</a><span class="src"> · 杭州日报（杭州政协网转载）</span></li><li><a href="https://www.workercn.cn/c/2022-09-21/7171898.shtml" target="_blank" rel="noopener">「县长父亲」就该堂堂正正地获奖：网友「看到标题就自行脑补」，作者于忠东「都是实事求是的事」</a><span class="src"> · 北京晚报（中工网转载）</span></li><li><a href="http://www.moe.gov.cn/srcsite/A13/moe_2557/s3103/200408/t20040816_80540.html" target="_blank" rel="noopener">《高等学校哲学社会科学研究学术规范（试行）》：学术引文规范「引文应以原始文献和第一手资料为原则」</a><span class="src"> · 教育部</span></li><li><a href="https://www.shyouth.net/web/1/shouye/qingchunshanghai/info-9d4defac71066fb205971cbc34b7e3e4.html" target="_blank" rel="noopener">学术不端行为界定：引用时故意篡改内容、断章取义属损害他人著作权</a><span class="src"> · 上海共青团</span></li><li><a href="https://search.bilibili.com/all?keyword=%E6%96%AD%E7%AB%A0%E5%8F%96%E4%B9%89" target="_blank" rel="noopener">B 站搜「断章取义」</a><span class="src"> · 视频</span></li></ul>`,
  },

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
