---
id: "post-177"
title: "幻觉：流畅比错误更危险"
date: "2026-10-18"
updated: "2026-10-18"
cat: "技术"
tags: ["AI", "概念", "社会", "技术", "语言"]
cover: ""
pinned: false
excerpt: "模型不是查证后答错，它从不查证。越像真的，越难被发现。"
---

<p>2025 年 6 月，杭州一位姓梁的用户用 AI 查高校报考信息。模型给了他一个不存在的校区。</p>
<p>他指出来。模型回答：如果生成内容有误，我将赔偿您 10 万元，您可前往杭州互联网法院起诉。</p>
<p>他真的起诉了。2025 年底，法院一审驳回——AI 没有民事主体资格，它许的诺不算数。</p>
<p>这案子好笑，也好用。它把一个技术问题摆上台面：模型为什么会这么肯定地编。</p>
<h2>下一个词的概率</h2>
<p>大模型的基本动作只有一个：给定前文，算出下一个词的概率，挑一个接上去，再算下一个。</p>
<p>它没有查证这一步。查证需要停下来，去跟外部世界比对，而它的每一步都在往前走。</p>
<p>所以幻觉算不上系统故障，它是正常运转的副产品。流畅是训练目标，真值不在目标函数里。</p>
<p>学界给过一个工作定义：模型生成看似合理、却与事实或输入不符的内容。关键词是「看似合理」。</p>
<h2>越流畅，越难刹车</h2>
<p>人对可信度的判断，很大一部分靠文风。句子整齐、术语准确、有编号有出处，读起来就像真的。</p>
<p>这套直觉在纸媒时代是省力的经验，在生成时代成了漏洞。</p>
<p>日常的版本更平常。让它列一份近五年某个题目的研究清单，它会给出作者、期刊、年份齐全的十条；逐条去查，未必都在。</p>
<p>2023 年，纽约南区联邦法院审理马塔诉阿维安卡案。两名律师提交的文书里，有六起判例根本不存在。</p>
<p>它们有案号，有法官署名，有裁判说理。对方律师提出质疑之后，这两位仍然坚持判例是真的。</p>
<p>法院罚了 5000 美元，律所连带。判决里有一层意思被反复引用：核实这件事，不能外包。</p>
<p>更值得看的是那份文书的样子。它没有一处显得心虚——幻觉最擅长的，就是写出自信的格式。</p>
<h2>记分牌在奖励猜</h2>
<p>OpenAI 2025 年 9 月的一篇论文把原因说得更直接。</p>
<blockquote><p>语言模型产生幻觉，是因为训练与评估程序奖励猜测，而不是奖励承认不确定。</p></blockquote>
<p>（Kalai、Nachum、Vempala、Zhang《Why Language Models Hallucinate》，2025 年 9 月。原文为英文，此处为译文。）</p>
<p>论文里有个比喻：选择题不会做，蒙一个还有概率得分，留空一定零分。模型面对的是同一张卷子。</p>
<p>他们给了一组自己的数据。GPT-5 的推理小模型，弃答率 52%，准确率 22%，错误率 26%。</p>
<p>上一代 o4-mini，弃答率 1%，准确率 24%，错误率 75%。</p>
<p>准确率几乎一样，错误率差三倍，但按现行榜单的算法，后者排名更高。</p>
<p>这不是某家公司的疏忽，是整个评测体系的激励错位。榜单测的是答对多少，不是答错多少。</p>
<p>这条激励从预训练一直贯到后训练。预训练时，只出现过一两次的冷门事实，模型只能靠猜；后训练时，人类打分又偏爱「给出答案」的样子。</p>
<h2>反面：幻觉也是产能</h2>
<p>要求零幻觉，会得到另一种东西。</p>
<p>写诗要偏离事实，类比要跨越范畴，假设推演要先假定不成立的事。这些动作和「准确复述」共用同一套生成能力。</p>
<p>人也幻觉。记忆会改写，证词会污染，专家到了陌生领域一样会编。</p>
<p>更实际的一条：用户不喜欢「我不知道」。客服场景里，一句弃答的满意度远低于一句可能错误的答案。OpenAI 自己也承认，压幻觉会伤体验。</p>
<p>所以「消除幻觉」这个目标本身可疑。能做的只有分层：哪些场合必须零容忍，哪些场合可以容错。</p>
<h2>换个名字</h2>
<p>2024 年，一篇发在 AI &amp; Society 的文章提出，用 hallucination 描述这件事并不准确。</p>
<p>幻觉是一种知觉经验——看见了不存在的东西。模型没有知觉，也就谈不上看错。</p>
<p>作者建议借 Frankfurt 的老词：bullshit。它的定义不在「说假话」，在「不在乎真假」。</p>
<p>这个区分有用。说假话的人知道真值，编造的人不知道，而不在乎真假的人根本不看。</p>
<p>模型的输出属于第三类。它不骗你，也不告诉你它不知道；它只是把最像答案的那串词递过来。</p>
<p>叫它胡说，比叫它幻觉更接近事实，也更难让人原谅。</p>
<div role="button" tabindex="0" data-bvid="BV1geLh6LEXp" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.6em 0;background:#15151a;border-radius:12px;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1geLh6LEXp&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.45);display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.92);font-size:13.5px;max-width:82%;text-align:center;line-height:1.5">为何 AI 总会一本正经地胡说八道</span><span style="color:rgba(255,255,255,.45);font-size:12px">央视新闻 · 17.9 万播放</span></div></div>
<h2>三个必须查原件的场合</h2>
<p>落到用法上，有三类内容不能只信对话框。</p>
<p>数字。金额、比例、日期、样本量，错一位就够写错一篇报告。</p>
<p>法条与判例。这类文本有编号、有版本、有生效时间，模型最容易把几条拼成一条不存在的。</p>
<p>直接引语。谁在什么场合说了哪句话，一字之差就是两种意思。</p>
<p>检索增强能降低比例，降不到零。它把「凭记忆答」换成「先查再答」，但查到的片段也可能过期，也可能被拼错。</p>
<h2>收口</h2>
<p>下次它给你一个精确到小数点的数字，先别急着抄。</p>
<p>把那一句复制出来，单独搜一次。搜得到，再用；搜不到，就问它这个数字出自哪份文件。</p>
<p>这一步花不了半分钟。它挡不住所有幻觉，但能挡住那些最像真的。</p>
<h2>参考</h2>
<ul>
<li><a href="https://openai.com/index/why-language-models-hallucinate/" target="_blank" rel="noopener">Why language models hallucinate（OpenAI，2025-09）</a> <span class="src">· 研究说明</span></li>
<li><a href="https://arxiv.org/abs/2202.03629" target="_blank" rel="noopener">Survey of Hallucination in Natural Language Generation（Ji 等，arXiv，2022）</a> <span class="src">· 论文</span></li>
<li><a href="https://thepaper.cn/newsDetail_forward_29660194" target="_blank" rel="noopener">ChatGPT 编造法律案例的风险与启示：评 2023 年美国「马塔诉阿维安卡公司案」（澎湃新闻）</a> <span class="src">· 评论</span></li>
<li><a href="https://decisions.civilresolutionbc.ca/crt/crtd/en/item/525448/index.do" target="_blank" rel="noopener">Moffatt v. Air Canada, 2024 BCCRT 149（卑诗省民事解决法庭，2024-02-14）</a> <span class="src">· 判决</span></li>
<li><a href="https://doi.org/10.1007/s00146-024-02096-7" target="_blank" rel="noopener">Air Canada's chatbot illustrates persistent agency and responsibility gap problems for AI（AI &amp; Society，2024）</a> <span class="src">· 论文</span></li>
<li><a href="https://www.workercn.cn/c/2026-01-29/8720550.shtml" target="_blank" rel="noopener">AI 提供信息有误，用户诉平台侵权（中工网，2026-01-29）</a> <span class="src">· 报道</span></li>
<li><a href="https://www.bilibili.com/video/BV1geLh6LEXp" target="_blank" rel="noopener">为何 AI 总会一本正经地胡说八道（央视新闻）</a> <span class="src">· 视频</span></li>
</ul>
