---
id: "post-161"
title: "AI 主权与算力自主：不愿只当模型消费者"
date: "2024-04-11"
updated: "2024-04-11"
cat: "技术"
tags: ["AI", "政治", "经济", "钱", "消费"]
cover: ""
pinned: false
excerpt: "模型能买，算力能租，可「换得起」这个选项一旦交出去，就收不回来了。"
---

<p>一台在深圳组装的服务器，芯片从海外运来，权重从网上下载，云账单按月付给硅谷。这条链跑得太顺，顺到很少有人追问：哪一环断了，自己还接不接得上。</p>
<p>接口涨价、服务下线、区域封禁，这类通知每隔一阵就会出现在开发者的邮箱里。收到的人这才意识到，自己并不拥有那套智能，只是租用。</p>
<p>租约可以续，也可以不续。这就是「AI 主权」这个词开始流行的背景。</p>
<h2>租来的智能</h2>
<p>用别人的模型，和用别人的电，表面上差不多：付费、接入、使用。差别在退出成本。</p>
<p>电可以换供应商，闸刀一拉就完事。模型换一家，要重写提示词、重跑评测、重调业务逻辑，客服话术和审核规则也得跟着改。</p>
<p>切换越贵，议价权越少。涨价你只能接受，条款变更你只能同意，服务关停你只能连夜迁移。</p>
<p>所以「AI 主权」说的不是关起门来造一个自己的聊天机器人，而是保留换得起的能力。这个能力分三层：芯片与算力、模型权重、语料与评测。</p>
<p>三层里最容易被忽略的是第三层。前两层可以花钱买，第三层买不到，只能一字节一字节地攒。</p>
<h2>算力被写进国家文件</h2>
<p>2023 年 12 月，国家发展改革委等五部门印发《关于深入实施「东数西算」工程 加快构建全国一体化算力网的实施意见》。文件里有一句判断：</p>
<blockquote><p>算力是数字经济时代的新型生产力。</p></blockquote>
<p>这句话把算力从企业成本项挪到了基础设施的位置。文件给出的目标很具体：到 2025 年底，国家枢纽节点地区各类新增算力占全国新增算力的 60% 以上，新建数据中心绿电占比超过 80%。</p>
<p>数字也确实在涨。IDC 与浪潮信息联合发布的报告显示，2024 年中国智能算力规模达 725.3 EFLOPS，同比增长 74.1%。</p>
<p>2025 年的预计值是 1037.3 EFLOPS。新华社 2026 年 7 月的报道里，2025 年智能算力总规模已经是 1590 EFLOPS。</p>
<a href="https://www.news.cn/tech/20250218/0c42a29782c34054b4e7d46861ea54bc/c.html" target="_blank" rel="noopener">2025 年我国智能算力规模预计增长 43%（新华网，2025-02-18）</a>
<p>但算力数字和智能水平之间，隔着一整套软件栈。卡买回来，互联带宽跟不上，调度平台不成熟，集群利用率就上不去。文件里那句「盘活存量算力资源」，说的正是这个尴尬。</p>
<div role="button" tabindex="0" data-bvid="BV11buJzqEm9" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.6em 0;background:#15151a;border-radius:12px;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV11buJzqEm9&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.45);display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.92);font-size:13.5px;max-width:82%;text-align:center;line-height:1.5">国产显卡到底能不能跑 AI？摩尔线程 MTT S4000 云实测</span><span style="color:rgba(255,255,255,.45);font-size:12px">Nenly同学 · 15.7 万播放</span></div></div>
<h2>母语在训练集里的份额</h2>
<p>阿里研究院《大模型训练数据白皮书》给过一组比例：全球网站内容里，英文占 59.8%，中文占 1.3%。在大模型常用的 Common Crawl 语料库里，中文约占 4.8%。</p>
<p>比例决定默认值。模型见过的世界以英文为主，它的常识、举例、价值排序，就按那套语料的形状长出来。</p>
<p>问它一个只有本地人才知道的事，短板立刻露出来。某条街道的旧名、某个县医院的新院区、某句方言里的贬义，英文语料里没有，它就只能编一个听起来很像的答案。</p>
<p>这就是「母语大模型」真正的分量。它不在民族情绪上，而在减少一道翻译损耗：让中文的问题不必先被压成英文的骨架，再译回来。</p>
<p>不过语料多也不等于语料好。中文互联网里有大量洗稿、拼接、机器生成的内容，堆量只会把噪声一起喂进去。中文语料库的电子化、网络化程度也偏低，这是国内大模型共同的短板。</p>
<h2>发展中国家的两笔账</h2>
<p>联合国 AI 高级别咨询机构 2024 年 9 月发布的报告里，有一组对比：高收入国家 52% 的受访专家认为，AI 对经济的明显拉动三年内就会显现；低收入国家持同样看法的只有 32%。</p>
<p>IMF 的「人工智能准备指数」也不客气。截至 2024 年 4 月，发达国家 0.68，新兴市场 0.46，低收入国家 0.32。指数由基础设施、研发能力、人才、监管四项合成，差距最大的是基础设施。</p>
<p>同一份联合国报告还指出，全球高性能计算集群几乎没有一座落在发展中国家境内。这句话比任何情绪都更能解释焦虑的来源。</p>
<p>账其实有两笔。一笔是买不起：卡、电、机房、人才，样样是外汇。另一笔是买了也改不动：权重闭源，接口随时变，数据要出境，本地场景接不进去。</p>
<p>第二笔账更难受。农业、医疗、教育这些最需要本地化的场景，恰恰最依赖数据不出境、模型能本地部署。租来的服务在这类场景里，往往连合规这一关都过不去。</p>
<h2>反面：自建全套未必划算</h2>
<p>最强的反驳来自规模经济。训练一个前沿模型动辄数亿美元，多数国家的全年研发预算都不够。买 API 更便宜、更快，也更不容易出错。</p>
<p>开源权重又让「拥有」和「训练」脱了钩。拿一个开放模型做微调，成本可能只有自研的百分之一。照这个逻辑，追求全栈自建纯属浪费。</p>
<p>第二个反驳更尖锐：主权话语很容易变成补贴的理由。过去几年，一些地方建了智算中心，机柜亮着灯，利用率却长期在一成上下。文件里写「坚决避免区域间盲目无序竞争」，防的就是这个。</p>
<p>第三个反驳指向内部。模型是本国的不等于公民有主权。平台垄断数据、算法不公开、申诉没有入口，用户照样没有议价权。把所有问题都推给国界，会顺手放过国内那部分权力。</p>
<p>这三条我都认，但只认一半。全栈自建不经济，可切换能力是必需品。它更像粮食储备：不必每样都自己种，但得有最低库存和第二条进货渠道。</p>
<p>主权的计量单位其实不是国家，是选择权。一个国家能换模型，一家公司能换云，一个人在服务条款变更时能走掉，这才叫有主权。反之，口号喊得再响，也只是换个房东。</p>
<h2>收口</h2>
<p>今晚可以花五分钟做两件事。打开你常用的那个模型，问它一个只有本地人才知道的问题：你所在街道的旧名字，或者你们县医院新院区在哪条路。</p>
<p>然后翻到服务条款，看它把你的数据存在哪个区域，删号之后多久真正清除。</p>
<p>两个答案都不难拿到。它们比任何一份白皮书都更能说明，你手里这套智能，到底是自己的，还是租的。</p>
<h2>参考</h2>
<ul>
<li><a href="https://www.gov.cn/zhengce/zhengceku/202401/content_6924596.htm" target="_blank" rel="noopener">关于深入实施「东数西算」工程加快构建全国一体化算力网的实施意见（中国政府网，2023-12-25）</a> <span class="src">· 政策</span></li>
<li><a href="https://www.news.cn/tech/20250218/0c42a29782c34054b4e7d46861ea54bc/c.html" target="_blank" rel="noopener">2025 年我国智能算力规模预计增长 43%（新华网，2025-02-18）</a> <span class="src">· 报道</span></li>
<li><a href="https://www.xinhuanet.com/liangzi/20260723/cbb58354e7be4ec08a114126ba6008c9/c.html" target="_blank" rel="noopener">「人工智能+」加速赋能千行百业（新华网，2026-07-23）</a> <span class="src">· 报道</span></li>
<li><a href="https://www.cankaoxiaoxi.com/pages/2025/01/15/637f5c72fa074be5aee4b2bdfd1f48b4.html" target="_blank" rel="noopener">AI 可能加剧全球不平等（参考消息，2025-01-15）</a> <span class="src">· 报道</span></li>
<li><a href="https://baike.baidu.com/item/%E5%A4%A7%E6%A8%A1%E5%9E%8B%E8%AE%AD%E7%BB%83%E8%AF%AD%E6%96%99%E5%BA%93" target="_blank" rel="noopener">大模型训练语料库（百度百科）</a> <span class="src">· 百科</span></li>
<li><a href="https://www.bilibili.com/video/BV11buJzqEm9" target="_blank" rel="noopener">国产显卡到底能不能跑 AI？摩尔线程 MTT S4000 云实测（Nenly同学）</a> <span class="src">· 视频</span></li>
</ul>
