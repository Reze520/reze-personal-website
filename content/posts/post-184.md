---
id: "post-184"
title: "算法偏见：被继承的旧账"
date: "2023-09-06"
updated: "2023-09-06"
cat: "技术"
tags: ["AI", "社会", "消费", "劳动", "技术"]
cover: ""
pinned: false
excerpt: "亚马逊的招聘引擎给「女子象棋俱乐部」降分。历史怎么被写成代码，又怎么被复制。"
---

<p>2018 年 10 月 10 日，路透社发了一条独家。亚马逊的招聘引擎，不喜欢女人。</p>
<p>简历里写「女子象棋俱乐部队长」，分数会被压低；两所女子学院的毕业生，评级被下调。</p>
<p>这套系统 2014 年开始做，2015 年就发现了问题，改过关键词，2017 年初整个团队解散。</p>
<p>它没有恶意。它只是把过去十年的招聘结果，当成了标准答案。</p>
<h2>十年简历教出的一课</h2>
<p>这套系统干的活很朴素：看简历，打分，一到五星，像给商品评分。</p>
<p>训练它的材料，是公司十年里收到的简历。工程团队建了 500 个岗位模型，让它认 5 万个词。</p>
<p>十年里，技术岗的简历大多来自男性。系统从中读出的规律很简单：像男性的，更像会被录用的人。</p>
<p>路透社的原文写得很直：这套系统教会了自己，男性候选人更可取。</p>
<p>它没有「性别」这个字段。它靠代理变量工作：社团名称、毕业院校、动词的选择、在一家公司待了多久。</p>
<p>工程师把「women」这类词调成中性之后，问题没有解决。偏好已经长在权重里，不在词表里。</p>
<p>这是偏见最难处理的地方。删掉一个特征，它会自己找下一个。</p>
<h2>三条来源</h2>
<p>算法偏见通常从三个口子进来。</p>
<p>数据。历史里有什么，模型就学什么。招聘、信贷、警务、医疗，凡是按过去批不批来训练的，都在复制过去的批法。</p>
<p>目标函数。你让它优化「录用后的绩效」，它就会去找与绩效相关的一切，包括邮编和姓名。</p>
<p>部署。模型在哪个场景用、谁读它的输出、有没有人推翻它，决定了偏见会不会变成决定。</p>
<p>三条里，第三条最容易被忽略。同一个模型，放在「给建议」的位置和放在「自动淘汰」的位置，后果差一个量级。</p>
<h2>被放大的那一部分</h2>
<p>有人会说，人也有偏见，机器只是学人。</p>
<p>差别在规模与一致性。</p>
<p>一个面试官的偏见，最多影响他见过的几千份简历。一套系统的偏见，会被复制到每一个使用它的公司。</p>
<p>人的偏见不稳定。同一个人上午宽松，下午严格，还会因为一句回答改主意。机器的偏见稳定、可复现、带着小数点。</p>
<p>稳定本来是优点。用在偏见上，它变成了放大器。</p>
<p>还有一层：数字会给人客观感。一个 3.7 分看起来比「我觉得他不太合适」更有依据，尽管前者只是后者的自动化版本。</p>
<h2>两次执法，两种偏见</h2>
<p>2023 年 8 月，美国平等就业机会委员会了结了它的第一起 AI 招聘歧视案。</p>
<p>iTutorGroup 的申请软件把女性 55 岁以上、男性 60 岁以上的申请者自动拒绝，两百多人被筛掉。</p>
<p>公司赔了 36.5 万美元，承诺不再收集出生日期。</p>
<p>这个案子和亚马逊案不是一回事。亚马逊是模型自己学出来的偏好，iTutorGroup 是人把年龄阈值写进了代码。</p>
<p>两件事都被叫作算法偏见，责任归属完全不同。前者要问数据治理，后者要问谁写了那一行。</p>
<p>把它们混在一起谈，会得到一个错误的结论：只要算法公平了，歧视就解决了。</p>
<h2>最强反驳：机器更可审计</h2>
<p>替算法说话的最强理由，是它可测量。</p>
<p>人类的面试偏见无法审计。你没法给一位面试官装一个公平性指标，也没法复现他昨天为什么否掉那个人。</p>
<p>算法可以。2018 年，Buolamwini 和 Gebru 的 Gender Shades 测了三家商用性别识别系统：深色皮肤女性的错误率最高到 34.7%，浅色皮肤男性只有 0.8%。</p>
<p>这个数字登出来之后，厂商改了模型。换成人类面试官，你连这个 34.7% 都拿不到。</p>
<p>所以「算法有偏见」这个指控，反过来也证明了算法可以被追责。这是它比人强的地方。</p>
<blockquote><p>不得根据消费者的偏好、交易习惯等特征，利用算法在交易价格等交易条件上实施不合理的差别待遇等违法行为。</p></blockquote>
<p>（《互联网信息服务算法推荐管理规定》第二十一条，2022 年 3 月 1 日施行。）</p>
<p>规章点到的是价格上的差别待遇，另加未成年人、老年人、劳动者几类具体场景。招聘、信贷、医疗里的同类机制，还靠个案去碰。</p>
<h2>公平没有唯一解</h2>
<p>但可审计不等于可修好。</p>
<p>2016 年，Kleinberg、Mullainathan 和 Raghavan 证明了一件不舒服的事：在有基础比率的预测里，群体校准、误差平衡、不同群体的假阳假阴率相等，三者无法同时满足。</p>
<p>翻成人话：你可以让分数在每个群体里都准，也可以让两个群体的错误率一样，但不能都要。</p>
<p>这不是工程没做好，是数学上做不到。选哪一个，是一次价值排序，不是一次调参。</p>
<p>所以「消除算法偏见」这个说法，许了一个不存在的诺。能做的是另一件事：把选了哪种公平写在明处，允许人质疑。</p>
<div role="button" tabindex="0" data-bvid="BV1Ad4y137As" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.6em 0;background:#15151a;border-radius:12px;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1Ad4y137As&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.45);display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.92);font-size:13.5px;max-width:82%;text-align:center;line-height:1.5">世界上有公平的算法吗</span><span style="color:rgba(255,255,255,.45);font-size:12px">虎嗅视频 · 3.6 万播放</span></div></div>
<h2>收口</h2>
<p>下次在招聘网站填表，看到「毕业院校」是必填项，可以停两秒。</p>
<p>想一想这个字段在替谁说话：它在描述你，还是在描述和你同校那批人的平均结果。</p>
<p>想完还是得填。但那两秒里，你已经知道这套筛选不是中立的。</p>
<h2>参考</h2>
<ul>
<li><a href="https://globalnews.ca/news/4532172/amazon-jobs-ai-bias/" target="_blank" rel="noopener">Amazon ditched AI recruiting tool that didn't like women（Reuters／Global News，2018-10-10）</a> <span class="src">· 报道</span></li>
<li><a href="https://www.sullcrom.com/insights/blogs/2023/August/EEOC-Settles-First-AI-Discrimination-Lawsuit" target="_blank" rel="noopener">EEOC Settles First AI-Discrimination Lawsuit（Sullivan &amp; Cromwell，2023-08）</a> <span class="src">· 评论</span></li>
<li><a href="https://www.cac.gov.cn/2022-01/04/c_1642894606364259.htm" target="_blank" rel="noopener">互联网信息服务算法推荐管理规定（国家网信办，2022-01-04）</a> <span class="src">· 法规</span></li>
<li><a href="https://proceedings.mlr.press/v81/buolamwini18a.html" target="_blank" rel="noopener">Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification（Buolamwini &amp; Gebru，PMLR，2018）</a> <span class="src">· 论文</span></li>
<li><a href="https://arxiv.org/abs/1609.05807" target="_blank" rel="noopener">Inherent Trade-Offs in the Fair Determination of Risk Scores（Kleinberg 等，arXiv，2016）</a> <span class="src">· 论文</span></li>
<li><a href="https://www.bilibili.com/video/BV1Ad4y137As" target="_blank" rel="noopener">世界上有公平的算法吗（虎嗅视频）</a> <span class="src">· 视频</span></li>
</ul>
