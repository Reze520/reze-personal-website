---
id: "post-158"
title: "信息茧房：推荐系统筛掉的那部分世界"
date: "2023-09-05"
updated: "2023-09-05"
cat: "技术"
tags: ["社会", "算法", "消费", "技术", "哲学"]
cover: ""
pinned: false
excerpt: "推荐系统优化的不是你，是你留下的概率。茧房的代价是偶遇消失。"
---

<p>地铁里，一排人低头，拇指以差不多的节奏上划。屏幕亮起，换一个，再亮起。</p>
<p>没人抬头。也没人知道自己下一条会看到什么，除了后台那个正在算的模型。</p>
<p>推荐系统常被说成「猜你喜欢」。更准确的说法是，它在猜你会在哪一条上停住。</p>
<p>这两件事的差别，决定了你看到的世界有多宽。</p>
<h2>一条视频要过三道门</h2>
<p>推荐不是一个模型，是一条流水线。</p>
<p>第一道是召回：从几千万条内容里捞出几千条候选。靠的是标签、向量、协同过滤——和你相似的人看过什么。</p>
<p>第二道是排序：给每一条打分，预测你会不会点、会看多久、会不会点赞。分数高的往前提。</p>
<p>第三道是重排：去重、控频、插广告、保证多样性。这一步最像编辑，也最少被讨论。</p>
<p>三道工序里，真正的目标函数只有几个：停留时长、完播率、互动率、次日留存。你喜欢什么，只是达成这些目标的中间变量。</p>
<p><strong>它优化的不是你，是你留下的概率。</strong></p>
<p>一个模型如果发现「愤怒的标题能让人多停两秒」，它就会多推愤怒的标题。它不判断愤怒好不好，只判断愤怒有没有用。</p>
<h2>过滤气泡与回声室，两笔账</h2>
<p>中文语境里，这两个词常被当成一个用。它们的账其实要分开记。</p>
<p>过滤气泡是帕里泽 2011 年提出的：算法在你看不见的地方替你筛，你以为看到的是世界，其实是你自己的画像。</p>
<p>回声室是桑斯坦更早的说法：一群人自己选同类，观点在内部反复放大，越说越确信。</p>
<p>前者的问题在平台，后者的问题在社群。分开记，才知道该找谁。</p>
<p>中国 2022 年 3 月 1 日施行的《互联网信息服务算法推荐管理规定》，把「算法选择权」写成了条文。</p>
<p>条文要求：应当向用户提供不针对其个人特征的选项，或者便捷的关闭算法推荐服务的选项；用户选择关闭的，应当立即停止提供相关服务。</p>
<p>这条规定的意义不在技术，在于它承认了一件事：<strong>默认的推荐不是中立，它是一种编辑。</strong></p>
<h2>被筛掉的是偶遇</h2>
<p>旧媒体有一层算法给不了的东西：版面。</p>
<p>一份报纸，国际版在第一叠，副刊在最后一叠。你不关心的那条政变，会在翻页时撞进眼睛。你没法选择不看，只能选择翻过去。</p>
<p>信息流没有版面，只有队列。队列按你的反应排序，不会把你不关心的东西硬塞给你。</p>
<p>于是偶遇消失了。你不知道隔壁行业在发生什么，不知道对立立场的人怎么论证，不知道一个你从未搜索过的国家长什么样。</p>
<p>长尾确实被解放了：小众手艺、冷门学科、地方戏曲，都能找到观众。这是算法的功劳，不该抹掉。</p>
<p>但共同背景也在消失。以前大家看同一份晚报，吵架时至少有同一套事实；现在各自拿着一套截图，连「事实是什么」都要先吵一轮。</p>
<blockquote><p>「社交媒体与搜索引擎，与个体之间的意识形态距离增加相关；但同样这些渠道，也增加了个体接触光谱另一侧材料的机会。……效应的量级相对温和。」（Flaxman、Goel、Rao，2016，译文）</p></blockquote>
<h2>反面证据：茧房可能被说大了</h2>
<p>上面这段引文，来自一项规模不小的研究。三位研究者调取了五万名美国用户的浏览记录，结论是双向的：社媒和搜索确实让人群分化，同时也增加了个人接触对立立场的机会。</p>
<p>还有一个更容易被忽略的发现：绝大多数在线新闻消费，仍然发生在人们直接打开常看媒体的首页。算法推荐的占比，没有想象中那么大。</p>
<p>这动摇了「茧房全怪算法」的叙事。</p>
<p>另一层反驳更不客气：人本来就有确认偏误。在没有算法的年代，人们也只看自己爱看的报纸，只在同温层里聊天。算法放大了一个旧毛病，没有发明它。</p>
<p>还有一点：平台要留存，就必须给新鲜感。纯同质的推荐会让人腻，所以模型里留着探索项，会推一些你没看过的东西。茧房不是密不透风的。</p>
<p>下面这个视频把算法放回传播史里看，正好补上「平台为什么必须不断制造新鲜刺激」这一层。</p>
<div role="button" tabindex="0" data-bvid="BV1bw4m1k7R3" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.6em 0;background:#15151a;border-radius:12px;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1bw4m1k7R3&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.45);display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.92);font-size:13.5px;max-width:82%;text-align:center;line-height:1.5">信息茧房？平台造神？来聊聊算法对人类社会的影响</span><span style="color:rgba(255,255,255,.45);font-size:12px">新石器公园 · 46.5 万播放</span></div></div>
<p>我的判断是：把一切归给算法，是一种偷懒。它免除了用户的选择、内容供给方的投机，以及公共媒体缺位的责任。但反过来断言茧房不存在，也站不住。</p>
<p>真正的问题不在「你会不会看到不同意见」，而在「不同意见以什么顺序出现在你面前」。</p>
<h2>收口</h2>
<p>茧房不是你看不到别的声音。是每一个声音都按你的舒适度排好了队。</p>
<p>所以能做的动作很小：下一次推荐页里出现一个你不想点开的封面，点开，看完三十秒再划走。</p>
<p>或者更彻底一点，把个性化推荐关一天。看看首页变成什么样。那个样子，是别人每天看到的世界。</p>
<h2>参考</h2>
<ul>
<li><a href="https://www.cac.gov.cn/2022-01/04/c_1642894606258238.htm" target="_blank" rel="noopener">互联网信息服务算法推荐管理规定（中央网信办，2022-01-04）</a> <span class="src">· 政策</span></li>
<li><a href="https://academic.oup.com/poq/article/80/S1/298/2223402" target="_blank" rel="noopener">Filter Bubbles, Echo Chambers, and Online News Consumption（Public Opinion Quarterly，2016-03-22）</a> <span class="src">· 论文</span></li>
<li><a href="https://baike.baidu.com/item/%E4%BF%A1%E6%81%AF%E8%8C%A7%E6%88%BF" target="_blank" rel="noopener">信息茧房（百度百科）</a> <span class="src">· 百科</span></li>
<li><a href="https://www.bilibili.com/video/BV1bw4m1k7R3" target="_blank" rel="noopener">信息茧房？平台造神？来聊聊算法对人类社会的影响（B站，新石器公园）</a> <span class="src">· 视频</span></li>
</ul>
