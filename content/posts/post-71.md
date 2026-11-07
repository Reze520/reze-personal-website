---
id: "post-71"
title: "token 是怎么算钱的"
date: "2026-05-14"
updated: "2026-05-14"
cat: "技术"
tags: ["技术", "钱", "消费", "社会", "AI"]
cover: ""
pinned: false
excerpt: "有次室友问我 token 是什么，我讲了一半，发现自己讲不明白。这个词在计算机里有两个意思：登录用的凭证，和模型切词的单位。这篇主要讲后一个——文字怎么被切开、中文为什么更费 token、一次 API 请求里那些参数各管什么、账单到底是怎么算出来的。"
---

<p>有次室友问我 token 是什么，我讲了一半，发现自己讲不明白。</p>
<p>后来去查，才知道是我把两件事搅在一起说了。</p>
<p>token 在计算机里先是一个登录用的东西。你登录一个网站，服务器发给你一串字符，之后每次请求都带上它，服务器验一下就知道你是谁。写法是 <code>Authorization: Bearer &lt;token&gt;</code>，Bearer 的意思是持有者——不认人，只认牌子。所以这串东西泄露出去，性质是权限被转移了，不只是信息被看见了。</p>
<p>这个意思先放下。真正难讲的是另一个：模型眼里的 token。</p>
<h2>模型不读字</h2>
<p>语言模型不处理文字，它处理整数。</p>
<p>你输入一句话，先经过一个叫分词器的东西，被切成若干片段，每个片段对应词表里的一个编号。模型看到的是「[15496, 995, 11, 612]」这样一串数字，输出时再把编号还原成片段，拼回文字。</p>
<p>这个片段就叫 token。</p>
<p>所以模型的世界里没有「字」和「词」这两个单位，只有 token。一个字可能是一个 token，也可能半个字就是一个 token，还可能两个字合成一个 token。它跟语言学没关系，只跟统计频次有关。</p>
<h2>怎么切</h2>
<p>主流做法是 BPE，字节对编码。</p>
<p>思路很笨：先把所有文本拆成单个字节，然后统计哪两个相邻片段在语料里一起出现得最多，把它们合并成一个新片段，加进词表。重复这个动作几万次到几十万次，词表就长成了。</p>
<p>结果是高频组合会自己浮出来。英语里 <code>ing</code>、<code>tion</code>、<code>the</code> 这类片段出现太多，早就被合并成独立 token；而罕见的人名、地名、化学式没有足够频次，只能被切碎成好几块。</p>
<p>词表大小各家用得不一样。GPT-2 是五万出头，后来的模型到了十万、二十万级。词表越大，同样一段话切出来的 token 越少，但输出层的计算量也越大，是个权衡。</p>
<h2>中文为什么贵</h2>
<p>英文一个字母占一个字节，中文一个汉字在 UTF-8 里占三个字节。分词器是从字节起家做合并的，中文天生就站在不利的位置上。</p>
<p>实际测下来，常用的汉字大致一个到两个 token，生僻字可能到三个。同样一段意思，中文消耗的 token 往往比英文多。</p>
<p>粗略换算可以记这两个数：英文一个 token 大约四个字符，或者四分之三个单词；中文一个 token 大约半个到一个汉字。</p>
<p>这也解释了那个常见现象——明明是用中文提问，账单却不见得便宜。</p>
<h2>一次 API 请求长什么样</h2>
<p>模型本身跑在别人的服务器上，你要用它，只能通过网络把文字送过去。这个送法就是 API。</p>
<p>一次请求大致是这样：往一个地址 POST 一段 JSON，里面写上用哪个模型、你要说的话，然后拿回模型的回答。说话的部分叫 <code>messages</code>，是一个数组，每一项有个 <code>role</code> 字段——<code>system</code> 是给它定的规矩，<code>user</code> 是你说的，<code>assistant</code> 是它之前说过的。</p>
<p><code>system</code> 那一条值得单独说。它不占你打字的位置，但每次请求都会完整地送进去，也完整地算钱。把一大段说明塞进 system，等于每一轮都在为它付费。</p>
<p>请求里还有几个参数，含义常被误解：</p>
<p><code>temperature</code> 控制概率分布的陡峭程度。设成 0，模型每步都选概率最高的那个 token，输出几乎固定；调高，低概率的词也有机会被选中，输出变散。它不是「创造力」旋钮，只是改变了采样分布的形状。</p>
<p><code>top_p</code> 是另一种截断法：只保留累计概率达到 p 的那些候选，其余的扔掉。它和 temperature 都作用于同一个分布，一般只调一个。</p>
<p><code>max_tokens</code> 限制输出长度。它限制的是输出，不管输入。</p>
<p><code>stream</code> 设成 true，返回不再是等全部生成完一次性给你，而是一段一段推过来。网页上那种字一个个往外蹦的效果就是它。底层用的是 SSE，一条条 <code>data:</code> 开头的行。</p>
<p>请求结束时会有个 <code>finish_reason</code>，告诉你为什么停：<code>stop</code> 是自然说完，<code>length</code> 是撞到了 <code>max_tokens</code>，<code>tool_calls</code> 是它要调用工具，<code>content_filter</code> 是被内容策略拦了。输出被截断的时候，这个字段是唯一能告诉你原因的线索。</p>
<h2>钱是怎么算的</h2>
<p>计费按 token，而且输入和输出分开计价，输出通常贵三到四倍。</p>
<p>原因在生成方式。输入是一次性并行处理的，所有 token 同时算完；输出是一个一个蹦的，每生成一个 token，都要把前面所有内容重新过一遍。所以同样数量的 token，输出那边要花更多算力。</p>
<p>这也带来一个实用推论：把话说短是能省钱的。同一个问题，啰嗦的提示词不只是显得啰嗦，是真的更贵。</p>
<h2>上下文窗口</h2>
<p>上下文窗口是一次请求能装下的最大 token 数，输入加输出算在一起。</p>
<p>它有上限，因为注意力机制要让每个 token 和前面所有 token 建立关联，长度翻倍，这部分计算量大约翻四倍。窗口开得越大，成本涨得越快。</p>
<p>装不下的时候有几种处理：直接截断最早的内容、把旧对话压成摘要、或者把资料存在外部，需要时再检索进来。最后这种叫 RAG，检索增强生成。</p>
<p>模型聊久了会忘事，不是它记性差，是早期内容已经被挤出去了。</p>
<h2>另一条路：embedding</h2>
<p>除了生成文字，模型还能把一段文本压成一串固定长度的数字，叫向量，这个过程叫 embedding。</p>
<p>向量的每个维度没有名字，但位置有意义：意思相近的句子，向量在空间里的方向也相近。判断相近程度常用余弦相似度，就是算两个向量的夹角。</p>
<p>维度是模型定的，常见的一千多到三千多。向量存进专门的数据库，就能做语义搜索——搜「怎么退票」，能找到写着「改签与退款规则」的那一条，哪怕一个字都不重合。</p>
<p>这一套是搜索、推荐、知识库问答的地基，和生成是两条并行的能力。</p>
<h2>剩下的常听到的几个</h2>
<p><code>function calling</code> 或者叫工具调用：模型不执行任何东西，它只是输出一段结构化的 JSON，说明「我想调用这个函数，参数是这些」。真正去执行的是你的代码，执行完把结果再送回给它。它负责决定调什么，不负责调。</p>
<p><code>fine-tuning</code> 微调：在预训练模型的基础上，用你自己的数据再训一轮，让它的风格或格式更贴合你的场景。它改变的是模型本身，和提示词工程不是一回事。</p>
<p><code>rate limit</code> 限流：服务方对单位时间内的请求数和 token 数设的上限。撞上了返回 429，响应头里通常会告诉你还要等多久。</p>
<p><code>API key</code>：调用接口的凭证，一串长期有效的字符。它等价于账户权限，不能写进前端代码，也不能提交到代码仓库。</p>
<h2>最后</h2>
<p>回到室友那个问题。</p>
<p>token 原来指凭证——老式地铁的圆牌、寄存处的牌子、游戏厅的代币，本身不值钱，值钱的是它代表的东西。</p>
<p>计算机借了它两次。一次代表权利，一次代表意义。前者是一张签了字的通行证，后者是一段文字被切开后的一小块。</p>
<p>两个意思共用同一个词，所以怎么讲都容易讲岔。</p>
<h2 id="refs">参考</h2>
<ul class="pg-refs"><li><a href="https://platform.openai.com/tokenizer" target="_blank" rel="noopener">OpenAI Tokenizer（贴一段话直接看被切成什么样）</a> <span class="src">· 工具</span></li><li><a href="https://github.com/openai/tiktoken" target="_blank" rel="noopener">tiktoken（OpenAI 的分词库，可离线数 token）</a> <span class="src">· 代码</span></li><li><a href="https://huggingface.co/docs/tokenizers" target="_blank" rel="noopener">Hugging Face Tokenizers 文档（各种分词算法与实现）</a> <span class="src">· 文档</span></li><li><a href="https://arxiv.org/abs/1508.07909" target="_blank" rel="noopener">Neural Machine Translation of Rare Words with Subword Units（Sennrich et al., 2016，BPE 用于翻译的原始论文）</a> <span class="src">· 原文</span></li><li><a href="https://platform.openai.com/docs/api-reference" target="_blank" rel="noopener">OpenAI API Reference（参数与返回字段的官方说明）</a> <span class="src">· 文档</span></li><li><a href="https://openai.com/api/pricing/" target="_blank" rel="noopener">OpenAI 定价页（输入与输出的单位价格）</a> <span class="src">· 定价</span></li><li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events" target="_blank" rel="noopener">Server-sent events（MDN，流式返回的底层机制）</a> <span class="src">· 文档</span></li></ul>
