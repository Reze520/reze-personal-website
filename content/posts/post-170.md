---
id: "post-170"
title: "智能密度：每瓦特电能产出的智能"
date: "2025-10-27"
updated: "2025-10-27"
cat: "技术"
tags: ["AI", "概念", "经济", "钱", "消费"]
cover: ""
pinned: false
excerpt: "算力竞赛数到最后，比的是一度电能换来多少可用的智能。"
---

<p>一座超大规模数据中心，吃电的量级相当于一座中等城市。机柜里的卡不休息，冷却系统也不休息，电表转得比任何一台服务器风扇都快。</p>
<p>国际能源署算过总账：2024 年全球数据中心用电 415 太瓦时，占全球用电的 1.5%，和英国全年用电差不多。到 2030 年，这个数字预计翻倍到 945 太瓦时。</p>
<p>讨论算力竞赛时，人们习惯数卡。真正卡住进度的，常常是变电站。</p>
<h2>智能密度的三层含义</h2>
<p>智能密度这个说法，常被拿来衡量芯片：每瓦电能跑多少算力。挪到系统层面，意思就变成每度电能产出多少可用的智能。</p>
<p>拆开看有三层。第一层是芯片，同样任务用更少的焦耳，靠制程、架构、稀疏计算。</p>
<p>第二层是机房。PUE 这个指标衡量总用电里有几成真正喂给了 IT 设备。全国算力中心的平均 PUE，2025 年 6 月已经降到 1.42，也就是每 1 度电干活，额外花 0.42 度在冷却和配电上。</p>
<p>第三层是模型。同一个问题，用一千个 token 的思维链和用一百个 token 直接回答，电费差十倍。蒸馏、量化、混合专家，都是在做这一层的密度。</p>
<p>单柜功率的变化最直观。早年的机柜十几千瓦，风冷足够；如今装满加速卡的机柜可以到上百千瓦，风冷吹不透，只能换成液冷。冷却方式一变，机房的整套设计都得重做。</p>
<p>三层乘起来，才是真实的成本。只盯芯片的每瓦性能，会漏掉后面两层的大头。</p>
<div role="button" tabindex="0" data-bvid="BV1UXDXBsEpT" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.6em 0;background:#15151a;border-radius:12px;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1UXDXBsEpT&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.45);display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.92);font-size:13.5px;max-width:82%;text-align:center;line-height:1.5">算力、能源与大国重器：中美 AI 电力格局</span><span style="color:rgba(255,255,255,.45);font-size:12px">BlueDot_蓝点 · 1.8 万播放</span></div></div>
<h2>电费如何进入成本表</h2>
<p>训练一次前沿模型，电费在总成本里占比不算最高，芯片折旧才是。但推理不一样。</p>
<p>推理是每天二十四小时都在发生的支出。用户越多、调用越频繁，电费越像一条持续放血的口子。</p>
<p>中国移动的判断是，未来三年推理算力的年复合增速接近训练算力的四倍，到 2028 年推理规模会超过训练。这个转向一旦成立，能效就从工程指标变成了毛利指标。</p>
<p>同样的模型，智能密度高一倍，单位请求的成本就低一半。价格战打到最后，拼的就是这个。</p>
<p>这也解释了选址。内蒙古、宁夏、贵州这些地方，电价低、气候冷、绿电多，数据中心愿意往那儿搬。美国对应的是德州、爱荷华、俄勒冈。</p>
<h2>电网成了新的审批口</h2>
<p>钱能买卡，买不到电。美国的并网排队动辄数年，变压器交货周期拉长到两年以上，燃气轮机的订单排到本十年末。</p>
<p>国际能源署预计，2024 到 2030 年，美国数据中心用电增量会占全美用电需求增量的近一半。摩根士丹利测算，2025 到 2028 年美国数据中心的累计电力缺口将达 47 吉瓦，相当于九个迈阿密的用电量。</p>
<p>北京大学的一位研究者给过一个更直观的数：前沿模型训练的峰值电力需求，每年以 2.2 到 2.9 倍的速度膨胀。</p>
<p>中国这边，信通院做了三种情景。到 2030 年，算力中心用电在中情景下超过 4000 亿千瓦时，占全社会用电 3%；高情景下超过 7000 亿千瓦时，占 5.3%。</p>
<blockquote><p>电力供给不足已成为制约 AI 算力扩张的核心瓶颈。</p></blockquote>
<p>这句话出自《人民日报海外版》2026 年 2 月的一篇报道。它把问题从芯片战拉回了物理世界。</p>
<h2>能效提高之后</h2>
<p>有人会问：能效一直在进步，单位任务耗电每年都在降，总量为什么还会涨？</p>
<p>这是杰文斯悖论的老问题。单次推理变便宜，用的人就变多，调用次数涨得比单价跌得更快。省下来的电，被新增的需求吃掉了。</p>
<p>国际能源署的模型里也有高能效情景。即便硬件和软件效率大幅改善，2030 年的总用电仍在增长，只是斜率缓一些。</p>
<a href="https://www.iea.org/reports/energy-and-ai" target="_blank" rel="noopener">Energy and AI（国际能源署，2025）</a>
<p>所以智能密度不是省电的口号，它决定的是增长的上限。密度高的公司，同样一度电可以服务更多用户，在价格战里活得更久。</p>
<h2>反面：密度不是能力的度量</h2>
<p>最强的反驳是：智能没法按焦耳换算。</p>
<p>一道小学算术和一个需要长链推理的证明，token 数差几十倍，价值却可能反过来。用每瓦特产出的 token 数排名，等于奖励短回答、惩罚深思。</p>
<p>第二个反驳关于代价。蒸馏和量化能提高密度，但会掉点，尤其是长尾任务。一味追求密度，会把模型修剪成只会答常见题的样子。</p>
<p>第三个反驳关于探索。前沿研究本来就浪费：大量实验失败，算力打了水漂。用密度考核实验室，等于禁止试错，最后只能做渐进改良。</p>
<p>还有一个现实问题：电价便宜的地方，往往缺网络、缺人才、缺客户。把竞赛简化成电费，会看不见产业链的其他环节。</p>
<p>我认这些反驳，但只认到这一步：智能密度是成本指标，不是能力指标。它决定谁能把 AI 用得起、用得广，不决定谁先做出 AGI。</p>
<p>两家公司密度相同，一家可能做成基础设施，另一家可能只是便宜的 API。差别在模型能力，不在电表。</p>
<h2>收口</h2>
<p>打开手机的电池用量页面，看排在第一的那个 App，再想一下它背后一天调了多少次模型。</p>
<p>然后查一下你所在省份的工商业电价，和最近一个智算中心的选址。两个数字放在一起，很多关于算力的新闻就不用再猜了。</p>
<h2>参考</h2>
<ul>
<li><a href="https://www.iea.org/reports/energy-and-ai" target="_blank" rel="noopener">Energy and AI（国际能源署 IEA，2025）</a> <span class="src">· 报告</span></li>
<li><a href="https://paper.people.com.cn/rmrbhwb/pc/attachement/202602/26/6de9a2a3-e231-48e1-b081-acc80a6ac655.pdf" target="_blank" rel="noopener">拆解 AI 背后的「国际能耗账单」（人民日报海外版，2026-02-26）</a> <span class="src">· 报道</span></li>
<li><a href="http://dz.jjckb.cn/www/pages/webpage2009/html/2025-08/25/content_109670.htm" target="_blank" rel="noopener">有序引导设施建设 算力布局政策体系将持续完善（经济参考报，2025-08-25）</a> <span class="src">· 报道</span></li>
<li><a href="https://gxj.gz.gov.cn/hd/cjwt/zcjd/content/post_10733390.html" target="_blank" rel="noopener">政府工作报告首提「算电协同」，这项新基建怎么搞（广州市工业和信息化局，2026-03）</a> <span class="src">· 报道</span></li>
<li><a href="https://arxiv.org/abs/2311.16863" target="_blank" rel="noopener">Power Hungry Processing: Watts Driving the Cost of AI Deployment?（arXiv，2023-11）</a> <span class="src">· 论文</span></li>
<li><a href="https://www.bilibili.com/video/BV1UXDXBsEpT" target="_blank" rel="noopener">算力、能源与大国重器：中美 AI 电力格局（BlueDot_蓝点）</a> <span class="src">· 视频</span></li>
</ul>
