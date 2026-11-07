---
id: "post-179"
title: "复杂系统与蝴蝶效应：混沌里没有小事"
date: "2022-09-26"
updated: "2022-09-26"
cat: "技术"
tags: ["科学", "概念", "经济", "技术", "城市"]
cover: ""
pinned: false
excerpt: "三个小数位的差别，能让两个月的预报分叉。"
---

<p>1961 年冬天，麻省理工学院的一间办公室里，爱德华·洛伦兹把初始值 0.506127 抄成了 0.506。</p>
<p>他跑的是一个十二个方程的简化大气模型，机器是 Royal McBee 的 LGP-30，打印纸只保留三位小数。</p>
<p>第一次输出和上一轮的前半段几乎重合，跑到模拟的第二个月，两条曲线分开了，天气走向完全不同。</p>
<p>三个小数位，一只被误读了六十年的蝴蝶。</p>
<h2>三个小数位</h2>
<p>洛伦兹当时在做数值天气预报试验。他以为是自己算错了，把每一步都检查了一遍。机器没有故障，方程也没有写错。</p>
<p>差别只有一个：上一轮他从内存里取了完整的六位小数，这一轮他手输的是打印纸上的三位。</p>
<p>他把这件事写成论文，1963 年发表在《大气科学杂志》上，标题是《确定性非周期流》。</p>
<p>确定性，指方程里没有随机项；非周期，指解不会重复。两条加在一起，就是后来所说的混沌：规则完全确定，长期行为却无法预测。</p>
<p>随机性有两种。一种来自掷骰子，一种来自你不知道全部初始条件。后者更麻烦，因为你连「不知道多少」都不知道。</p>
<h2>蝴蝶这个词是谁加的</h2>
<p>1972 年，洛伦兹在美国科学促进会做了一次报告。题目后来被印成一句话：</p>
<blockquote><p>Does the Flap of a Butterfly’s Wings in Brazil Set Off a Tornado in Texas?</p></blockquote>
<p>这是个问句，他的答案是否定的。</p>
<p>他想说的不是「一只蝴蝶能造出龙卷风」，而是「一只蝴蝶级别的扰动，足以让两周后的预报失效」。前者是因果神话，后者是可预报性上限。</p>
<p>这两句话常被混着用。混用的后果是，任何结果出来以后，都能倒推出一只蝴蝶。</p>
<p>把蝴蝶效应用来解释已经发生的事，几乎总能成立，也因此几乎不提供信息。</p>
<h2>非线性才放大，线性会吸收</h2>
<p>关键在系统的性质。</p>
<p>线性稳定系统有回复力。钟摆被推一下，摆幅衰减，最后回到中间。往池塘丢一颗石子，涟漪散开，水面复原。</p>
<p>非线性系统可以有正反馈。大气里，一块空气被抬升，膨胀冷却，水汽凝结放热，继续抬升。扰动被自己放大。</p>
<p>所以「混沌里没有小事」这句话，只对特定系统成立。多数日常系统会把扰动吃掉。</p>
<p>工程上更是如此。电网有备用容量，飞控有冗余传感器，TCP 有拥塞窗口。这些都是设计来吸收小偏差的。</p>
<p>判断一个系统会不会放大，看它有没有正反馈、有没有贴近临界点，而不是看它复杂不复杂。</p>
<h2>复杂系统与混沌不是一回事</h2>
<p>这两个词经常被当成同义词，其实不是。</p>
<p>混沌讲的是低维、确定、对初值敏感。洛伦兹的模型只有十二个变量，写下来一页纸，照样不可长期预测。</p>
<p>复杂系统讲的是另一件事：大量不完全相同的单元，彼此连接、彼此适应、带反馈。交通、市场、免疫系统、城市，都是这一类。</p>
<p>复杂系统里当然有混沌的一面，但它还有别的性质：幂律分布、网络结构、临界状态、路径依赖。这些性质不靠「初值敏感」解释。</p>
<p>分清这两件事有用。复杂系统里，有些量很稳，有些量很不稳。一条路的平均车流量可以估得很准，某一辆车在第几分钟经过哪个路口，估不准。</p>
<p>如果只记住「混沌」，容易得出「什么都预测不了」的结论。真实情况是，预测的对象要挑：轨迹难，分布容易。</p>
<h2>预报员怎么和它相处</h2>
<p>既然初值不可能测准，那就别赌单一答案。</p>
<p>欧洲中期天气预报中心的做法是集合预报：把初始场加上一组微小扰动，跑五十一次，看结果散成什么样。</p>
<p>预报员给出的不是「明天下雨」，是「五十一个成员里有三十个认为下雨」。</p>
<p>科普中国的一篇文章把上限说得很直白：一个完美的大气模式，也只有两周左右的可预报性。目前全球模式对环流形势的预报能力，大约在五到十天。</p>
<a href="https://www.kepuchina.cn/article/articleinfo?business_type=100&ar_id=272872" target="_blank" rel="noopener">经常吐槽天气预报？天气预报真的没有以前准了吗（科普中国）</a>
<p>混沌研究给出的不是「无法预测」，是「预测必须带误差条」。</p>
<div role="button" tabindex="0" data-bvid="BV1SzM2zDER6" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.6em 0;background:#15151a;border-radius:12px;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1SzM2zDER6&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.45);display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.92);font-size:13.5px;max-width:82%;text-align:center;line-height:1.5">手把手带你推出蝴蝶效应，你会发现对混沌的理解都是错的</span><span style="color:rgba(255,255,255,.45);font-size:12px">新石器公园 · 89.2 万播放</span></div></div>
<h2>反面：放大是有条件的</h2>
<p>最强反驳在这里，而且它成立。</p>
<p>第一，混沌不等于没有规律。系统被约束在一个有界区域内，长期行为的统计特征可以很稳定。天气每天不同，气候的平均态可以预报。厄尔尼诺、季风、温度带，都是这么算的。</p>
<p>第二，很多蝴蝶效应叙事忽略了吸引子。轨迹乱跑，但跑不出那个区域。所以「小原因大结果」不等于「结果无法无天」。</p>
<p>第三，也是最有力的一条：如果小扰动真的必然放大，工程就没法做了。而工程一直在做，靠的就是冗余、反馈、限幅。</p>
<p>这三条我都认，但只认到「有边界的放大」。离开临界点，系统会自己回到稳态；贴近临界点，一点偏差就能换一条轨。</p>
<p>所以蝴蝶效应真正的用处，是判断一个系统离临界点有多远。</p>
<h2>收口</h2>
<p>想亲手看一次，不用超算。二十行代码的 logistic 映射就够：x 取 0 到 1 之间，每次乘 3.9 再乘（1 减 x）。</p>
<p>取 0.5 跑五十步，记下序列；再取 0.500000001 跑五十步。</p>
<p>把两条序列画在同一张图上。前十几步重合，之后分开，分到看不出关系。</p>
<p>那个分叉的位置，比任何比喻都清楚。</p>
<h2>参考</h2>
<ul>
<li><a href="https://www.scholarpedia.org/article/Butterfly_effect" target="_blank" rel="noopener">Butterfly effect（Scholarpedia）</a> <span class="src">· 百科</span></li>
<li><a href="https://www.kepuchina.cn/article/articleinfo?business_type=100&ar_id=272872" target="_blank" rel="noopener">经常吐槽天气预报？天气预报真的没有以前准了吗（科普中国）</a> <span class="src">· 科普</span></li>
<li><a href="https://www.kepuchina.cn/article/articleinfo?ar_id=714045&business_type=100" target="_blank" rel="noopener">混沌百态：蝴蝶轻轻振翅的力量（科普中国）</a> <span class="src">· 科普</span></li>
<li><a href="https://arxiv.org/abs/nlin/0101029" target="_blank" rel="noopener">Predictability: a way to characterize complexity（Physics Reports，2002）</a> <span class="src">· 论文</span></li>
<li><a href="https://www.bilibili.com/video/BV1SzM2zDER6" target="_blank" rel="noopener">手把手带你推出蝴蝶效应，你会发现对混沌的理解都是错的（新石器公园）</a> <span class="src">· 视频</span></li>
</ul>
