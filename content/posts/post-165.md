---
id: "post-165"
title: "AGI 估值泡沫：算力堆不出真智能"
date: "2026-12-25"
updated: "2026-12-25"
cat: "技术"
tags: ["AI", "经济", "钱", "消费", "社会"]
cover: ""
pinned: false
excerpt: "6500 亿美元买来的算力，正在等一份还没出现的收入表。"
---

<p>2026 年 2 月，四家美国科技公司交出下一年的预算：亚马逊 2000 亿美元，字母表 1850 亿，Meta 1350 亿，微软接近 1050 亿。</p>
<p>加在一起，6500 亿美元。彭博社称，这是本世纪以来规模最大的企业资本开支周期。</p>
<p>财报公布后，四家公司市值合计蒸发超过 9500 亿美元。花钱的人还没说话，掏钱买股票的人先慌了。</p>
<h2>资本开支的斜率</h2>
<p>拉长看，这条曲线更陡。2024 年四家合计约 2560 亿美元，2025 年 4270 亿，2026 年 6500 亿以上，两年翻了一倍半。</p>
<p>巨头们的说法一致：这是下一个赢者通吃的市场，谁停谁出局。DA Davidson 的分析师 Gil Luria 讲得更直白，没有一家愿意在竞赛里掉队。</p>
<a href="http://dz.jjckb.cn/www/pages/webpage2009/html/2026-02/24/content_113883.htm" target="_blank" rel="noopener">科技巨头 AI 竞争持续升温 投资回报风险引担忧（经济参考报，2026-02-24）</a>
<p>资本开支的性质却常被说混。它不是一年烧掉的现金，而是摊到五到十年的折旧。用一年收入去对比一年的总投入，缺口会被放大。</p>
<p>可即便按五年摊销，这笔钱也要每年变出上千亿美元的新增收入才划得来。而全球 AI 产品的年收入，离这个量级还有距离。</p>
<h2>算力的边际收益</h2>
<p>过去几年，行业信一条经验规律：参数多十倍，能力上一个台阶。这条规律支撑了大部分估值模型。</p>
<p>它正在失效。公开高质量语料的存量见底，是第一个硬约束。英文网页被反复抓取，书籍与论文的版权越来越贵，剩下的增量要靠合成数据补。</p>
<p>第二个约束是电。国际能源署测算，全球数据中心用电量将从 2024 年的 415 太瓦时增至 2030 年的约 945 太瓦时。电不是有钱就能立刻变出来的东西，电网扩容以年为单位。</p>
<p>第三个约束最容易被忽略：评测。能力涨没涨，靠 benchmark 判断；benchmark 又被训练数据污染。分数在涨，用户感知到的提升却在变薄。</p>
<div role="button" tabindex="0" data-bvid="BV1FExY68EGm" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.6em 0;background:#15151a;border-radius:12px;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1FExY68EGm&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.45);display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.92);font-size:13.5px;max-width:82%;text-align:center;line-height:1.5">战争、油价、加息都来了，AI 还在狂欢？重看 1999 年互联网泡沫</span><span style="color:rgba(255,255,255,.45);font-size:12px">市场48小时 · 1.1 万播放</span></div></div>
<h2>合成数据的近亲繁殖</h2>
<p>2023 年 5 月，六位研究者挂出一篇预印本，标题很刺眼：《递归的诅咒：用生成数据训练会让模型遗忘》。2024 年 7 月，论文上了《自然》。</p>
<p>他们做的事不复杂：拿一个模型，用它自己的输出接着训练，一代一代往下传。</p>
<p>结果是分布尾部先消失。罕见事件、少见说法、少数群体的表达，被一次次平均掉。几代之后，模型开始输出重复、平滑、看起来正确却没有信息量的句子。</p>
<p>论文把这种现象叫模型崩溃。它算不上某次事故，更像统计上的必然：每一代都在拟合上一代的近似，误差累积，世界被磨平。</p>
<p>这对估值是个坏消息。支撑 scaling law 的前提是数据管够，而人类写的高质量文本是有限的。合成数据能补数量，补不了分布。</p>
<h2>对齐税</h2>
<p>另一个不常被提起的成本，是安全。</p>
<p>InstructGPT 的论文里有一组对照：经过人类反馈微调后，模型在指令遵循上大幅提升，但在 SQuAD、DROP、HellaSwag 这些基准上出现回退。研究者把这种能力损失称为对齐税。</p>
<p>税率的含义很实际：想让模型更听话、更少越界，就得让出一部分能力。安全不是免费附加的插件。</p>
<p>商业公司于是面对一个取舍。交税，产品更稳但更笨；不交税，跑分漂亮但事故率高。估值模型通常假设两者可以兼得，现实里只能选一个折中。</p>
<p>这也解释了一个现象：发布会上的演示越来越像，真到了长尾任务上，差距立刻显出来。被修剪过的能力，恰好修剪掉了最难的部分。</p>
<h2>收入在哪里</h2>
<p>红杉资本的 David Cahn 在 2024 年算过一笔账。把英伟达的数据中心收入乘以二，补上机房、电力、发电机的成本，再乘以二，给下游留五成毛利。</p>
<p>算出来的结论是：AI 行业每年需要约 6000 亿美元的新增收入，才能覆盖当年的算力投入。他当时估的缺口是 5000 亿。</p>
<p>MIT NANDA 在 2025 年的报告里给了另一组数字：企业级生成式 AI 试点中，只有约 5% 带来了可测量的收入加速，其余停在演示阶段。</p>
<p>一边是每年数千亿美元的资本开支，一边是落地率个位数。两者之间的落差，就是「泡沫」这个词的来历。</p>
<p>落差之下，市场看公司的尺子也在换：</p>
<blockquote><p>估值体系的核心变量正从「增长的速度」转向「增长的质量」。</p></blockquote>
<h2>反面：泡沫论也可能是错的</h2>
<p>先摆最强的反驳。历史上，铁路修得太多，倒闭了一批公司，但铁路留下来了；光纤铺得过剩，2000 年崩盘，但宽带留下来了。</p>
<p>基础设施过剩不等于技术无效。真正被清算的是估值，不是能力。用泡沫破裂去证明 AI 没用，是把两件事混为一谈。</p>
<p>第二个反驳关于时间尺度。看空的声音从 2023 年就没停过，而英伟达的市值在那两年里屡创新高。预测泡沫的人，往往对了方向，错了时点。</p>
<p>第三个反驳更硬：需求确实在涨。推理调用量一路上行，token 单价掉了一个数量级，用量补上了价格。有人用杰文斯悖论解释这件事：效率提高，总消耗反而更大。</p>
<p>所以我只认一半。资本开支的斜率确实超过了收入曲线，这个缺口是真的；但把它读成「AI 是骗局」，就跳过了太多中间环节。</p>
<p>我的判断是：算力能堆出更强的模型，堆不出通用智能。瓶颈已经从芯片移到了数据、评测和组织采用。泡沫若破，破的是「再投一倍就能到 AGI」这个叙事。</p>
<h2>收口</h2>
<p>下次看到某家公司宣布千亿级数据中心，先翻到财报的折旧那一行，再找它 AI 业务的收入那一行。</p>
<p>两个数字放在一起看，比任何一篇泡沫论都清楚。你不需要判断 AGI 什么时候来，只需要知道这笔账由谁在付。</p>
<h2>参考</h2>
<ul>
<li><a href="http://dz.jjckb.cn/www/pages/webpage2009/html/2026-02/24/content_113883.htm" target="_blank" rel="noopener">科技巨头 AI 竞争持续升温 投资回报风险引担忧（经济参考报，2026-02-24）</a> <span class="src">· 报道</span></li>
<li><a href="http://i5.ce.cn/finance/stock/gsgdbd/202602/t20260212_2769436.shtml" target="_blank" rel="noopener">科技四巨头高额资本支出带来的三重启示（中国经济网，2026-02-12）</a> <span class="src">· 评论</span></li>
<li><a href="https://arxiv.org/abs/2305.17493" target="_blank" rel="noopener">The Curse of Recursion: Training on Generated Data Makes Models Forget（arXiv，2023-05）</a> <span class="src">· 论文</span></li>
<li><a href="https://arxiv.org/abs/2203.02155" target="_blank" rel="noopener">Training language models to follow instructions with human feedback（arXiv，2022-03）</a> <span class="src">· 论文</span></li>
<li><a href="https://www.fortunechina.com/shangye/c/2025-08/21/content_468048.htm" target="_blank" rel="noopener">麻省理工学院报告：企业 95% 的 AI 项目以失败告终（财富中文网，2025-08-21）</a> <span class="src">· 报道</span></li>
<li><a href="https://finance.huanqiu.com/article/4QGvKrOsT84" target="_blank" rel="noopener">全球 AI 竞赛持续升温 美国四大科技公司年资本支出计划达 6500 亿美元（环球网，2026-02）</a> <span class="src">· 报道</span></li>
<li><a href="https://fortune.com/2024/08/05/global-500-sequoia-roelof-botha-openai-robinhood" target="_blank" rel="noopener">Are we headed for a massive AI hangover?（Fortune，2024-08-05）</a> <span class="src">· 报道</span></li>
<li><a href="https://www.bilibili.com/video/BV1FExY68EGm" target="_blank" rel="noopener">战争、油价、加息都来了，AI 还在狂欢？重看 1999 年互联网泡沫（市场48小时）</a> <span class="src">· 视频</span></li>
</ul>
