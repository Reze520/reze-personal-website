---
id: "post-50"
title: "跟借用检查器较劲的三个月"
date: "2024-08-03"
updated: "2024-08-03"
cat: "技术"
tags: ["技术", "钱", "AI", "历史", "语言"]
cover: ""
pinned: false
excerpt: "2022 年秋天我笑一个群友学 Rust，结果三个月后被打脸的是我自己。写了个几十行的小工具，被借用检查器骂了几十回。"
---

<p>论坛里常有这种帖子，标题大概是「我打算抽空学一下 Rust」。</p>
<p>底下第一条回复几乎固定：又来一个被「Rust 是未来」洗脑的。</p>
<p>这种反应可以理解。Stack Overflow 的开发者调查里，Rust 连续好几年排在「最受喜爱语言」第一。但「喜爱」和「真用」是两码事——就像大家都说向往西藏，真买票去的没几个。</p>
<p>不过这两年，打脸的是回复的那一方。</p>
<h2>一道编译错误</h2>
<p>楼主学了一个多月，贴出一段代码：几十行，能并发地去抓十几个接口再把结果拼起来。没什么正经用途，就是给自己的小项目抓点公开数据。</p>
<p>他说了一句话，很值得留意：「写完之后基本不用管内存，编译器把我可能会犯的错全拦在编译阶段了。」</p>
<p>论坛里最常见的入门方式，是先抄一段能跑的代码，改改看。Rust 也一样。装工具链就一行 curl 命令，比装 Go 环境还顺。然后照教程写个最基础的：</p>
<pre><code>let mut s = String::from(“hello”);
let r1 = &amp;mut s;
let r2 = &amp;mut s;
println!(“{} {}”, r1, r2);</code></pre>
<p>在 Java 和 Go 的思维里，这有什么问题？借了两个可变引用，又没同时改，打印一下完事。</p>
<p>结果 cargo build 直接报红。错误信息的意思是：你不能在同一作用域里对 s 借出第二个可变引用，因为已经有一个了。</p>
<p>第一次看到这个报错的人，多半会盯着那行红字看很久。不是看不懂英文，是心里不服——明明只是打印，又没改数据。</p>
<p>后来才明白，Rust 的规矩简单粗暴到有点不讲理：一个值，要么同时被好多人「只读」地借走（多个 &amp;T），要么只能被一个人「又能读又能改」地借走（一个 &amp;mut T），这两种状态不能共存。</p>
<p>官方管这叫 Aliasing XOR Mutability。翻译过来：别名和可变，你俩只能活一个。</p>
<h2>所有权</h2>
<p>Rust 最劝退人的概念叫「所有权」（ownership）。</p>
<blockquote><p>Ownership is Rust's most unique feature and it enables Rust to make memory safety guarantees without needing a garbage collector.<br>—— The Rust Programming Language，第 4 章</p></blockquote>
<p>教科书的说法是：每一个值都有一个被称为所有者的变量，当所有者离开作用域，值就被丢弃。</p>
<p>听着像绕口令。一个比较好懂的办法是这样想：</p>
<p>你借了朋友一本书。这本书「属于」你，你负责还。你看完了，把书还回去（作用域结束，drop），这很正常。</p>
<p>但 Rust 还有一条更狠的规矩：书在你手里的时候，你不能说「我把它同时借给另外两个人，还都让他们拿笔在上面划重点」。</p>
<p>要么大家都只能看不能划（共享只读），要么只有一个人能看能划（独占可变）。一旦有人想划，别人手里「看」的权限立刻作废。</p>
<p>还有个叫「移动」（move）的东西，第一次见几乎都会愣一下：</p>
<pre><code>let a = String::from(“hi”);
let b = a;
// 这里再用 a 就会编译报错，a 已经不拥有那个字符串了</code></pre>
<p>赋值还能把原变量弄失效？</p>
<p>但这恰恰是为了不让人踩 C++ 那种坑：浅拷贝完两个指针指向同一块内存，一个释放了，另一个就成了野指针。</p>
<p>Rust 的选择是：宁可让你编译不过，也不让这种事在线上半夜炸。</p>
<p>所以刚学那两周，怀疑人生是常态。写个读文件的小脚本，光是为了让一个字符串能在函数之间正确传过去又传回来，就能跟编译器耗一下午。</p>
<p>那种感觉像你本来骑车骑得好好的，突然有人告诉你，从现在起骑车之前要先考一个「平衡证」，而且考官是个一点情面都不讲的机器。</p>
<h2>它到底解决了什么</h2>
<p>为什么微软、谷歌、Cloudflare 这种级别的公司，是真把 Rust 用在生产环境里，而不是写篇博客喊喊口号？</p>
<p>数字挺吓人。微软和谷歌都公布过自家的研究：全部安全漏洞里，内存安全相关的占了七成以上。</p>
<p>一个写了二十年的代码库，十次出事有七次是因为「不该访问的那块内存被访问了」——野指针、用完释放了还在用、数组越界。C 和 C++ 性能没得说，但这类 bug 是骨子里的老毛病。</p>
<p>Rust 的解法不是在运行时加个垃圾回收器（那样会有停顿，性能敏感的场景受不了），而是把整类错误在编译期摁死。</p>
<p>谷歌给过一组 Android 的数据：从 2019 年到 2024 年，新代码里逐步用 Rust 替代 C++，内存安全漏洞占全部漏洞的比例从 76% 掉到 24%。不是少了几个，是腰斩再腰斩。</p>
<p>Cloudflare 那个案例更具体。他们原来用 Nginx 扛流量，Nginx 是多进程模型，每个 worker 各管各的连接，A 进程开的连接 B 进程用不了，结果就是大量重复的 TCP/TLS 握手，费 CPU 也费时间。</p>
<p>后来他们用 Rust 写了个叫 Pingora 的代理，基于 Tokio 异步运行时改成多线程，连接池全局共享。实测 CPU 降了 70%，内存降了三分之一。</p>
<p>对 Cloudflare 这种体量，省下来的每一分 CPU 都是真金白银的电费和机房成本。</p>
<p>微软那边更绝。Azure CTO Mark Russinovich 直接公开说，C 和 C++「应该被认为已过时」，因为微软七成的补丁都在修内存安全漏洞。</p>
<p>Windows 的图形接口 GDI 已经塞了三万多行 Rust 进去，核心加密库 SymCrypt 也用 Rust 重写了，目的就是能做形式化验证。</p>
<p>看到这些材料，「Rust 就是个玩具语言」那种优越感，基本就没了。</p>
<h2>真做点东西会碰到什么</h2>
<p>看别人夸没用，得动手。论坛里多数人会挑一个特别小的练手项目：写个命令行工具，把某个后台接口返回的 JSON 整理成表格打印出来。</p>
<p>选它是因为需求简单，但又会碰到「网络请求 + 解析 + 字符串处理」这套组合，够折腾一阵。</p>
<p>网络请求用 reqwest，解析用 serde 和 serde_json，这两个库在 Rust 生态里算是明星级成熟了。</p>
<p>写的过程中，有几件事是公认的。</p>
<p><strong>一是 cargo 这个工具链舒服。</strong> cargo new 建项目、cargo add 加依赖（自动改 Cargo.toml）、cargo clippy 做比很多项目自带的 lint 还严的检查、cargo fmt 自动格式化、cargo test 跑测试。一个命令管从头到尾。</p>
<p><strong>二是编译器报错人性化。</strong> 别的语言报错经常甩一行看不懂的堆栈，Rust 的报错经常是：「你这里借用了 s，但下面第 12 行 s 被移动了，所以这里不能再借。」</p>
<p>它甚至会在错误信息里画箭头、标行号，有时候还贴心地来一句「你也许想用 clone()？」。很多新手说是被编译器手把手教出来的，这话不夸张。</p>
<p><strong>三是异步那套，爽和晕同时来。</strong> 顺手加并发、同时请求五六个接口再合并，用 tokio 的 join! 写起来意外干净。但理解 future、await 要花几天，因为 Rust 的异步不是语言内置的魔法，是一套零成本抽象，底层机制得懂一点，否则报错还是看不懂。</p>
<p>最后跑起来，四十多行核心代码，编译完是个几兆的二进制，丢服务器上直接 ./tool 就能跑，不用装运行时。</p>
<div role="button" tabindex="0" data-bvid="BV1hC411b7J2" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.6em 0;background:#15151a;border-radius:12px;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1hC411b7J2&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.45);display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.92);font-size:13.5px;max-width:82%;text-align:center;line-height:1.5">为啥Rust要人为指明生命周期</span><span style="color:rgba(255,255,255,.45);font-size:12px">wharton0 · 4,493 播放</span></div></div>
<div role="button" tabindex="0" data-bvid="BV1zf421q7Bc" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.6em 0;background:#15151a;border-radius:12px;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1zf421q7Bc&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.45);display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.92);font-size:13.5px;max-width:82%;text-align:center;line-height:1.5">【编程】带你攻略 Rust 所有权</span><span style="color:rgba(255,255,255,.45);font-size:12px">feintk · 2,269 播放</span></div></div>
<h2>生命周期</h2>
<p>所有权和借用还只是入门。真正劝退人的是「生命周期」（lifetime）标注。</p>
<p>事情是这样的：写一个函数，接收一个字符串的引用，返回它的某个切片，也是个引用。</p>
<p>在别的语言里这理所当然。但在 Rust 里，编译器会问：你返回的那个引用，它指向的数据，到底能活多久？</p>
<p>如果调用方手里那个字符串在函数结束时就没了，返回的引用就成了悬空指针——这正是 Rust 死活不让发生的事。</p>
<p>于是得写成这样：</p>
<pre><code>fn longest&lt;'a&gt;(x: &amp;'a str, y: &amp;'a str) -&gt; &amp;'a str {
    if x.len() &gt; y.len() { x } else { y }
}</code></pre>
<p>那个 'a 不是变量，是「生命周期参数」，意思是：返回的引用的有效期，和 x、y 里较短的那个绑定。</p>
<p>第一次见到这串符号，第一反应通常是「这语言是不是在故意为难人」。</p>
<p>但它逼你把「这个引用什么时候会失效」在代码里写清楚，而不是靠运气和约定。C++ 里那些「返回了局部变量的指针」的经典 bug，在 Rust 这儿连编译都过不了。</p>
<p>代价是：生命周期标错的时候，编译器报的错误经常比问题本身还难懂。有时候甩一大段 help 文字，读了三遍才发现它其实是在说「你这两个引用的生命周期对不上」。</p>
<p>有人把桌面壁纸换成了 Rust 官方的生命周期图解，天天看，看得快吐。</p>
<h2>和 Go 比</h2>
<p>Go 也有指针，但 Go 有垃圾回收器（GC），不用管内存什么时候释放，运行时帮你收拾。</p>
<p>这带来巨大的省心，代价是偶尔的 GC 停顿。对绝大多数项目无所谓，但对延迟要精确到微秒的系统，就是个麻烦。</p>
<p>Rust 的卖点恰恰是没有 GC，却又比 C++ 安全。它靠前面那套所有权，在编译期就算好每个值什么时候该释放，生成的机器码里直接插入释放逻辑，运行时不依赖任何后台线程来打扫。</p>
<p>换句话说，它把 GC 的工作，提前到编译阶段一次性干完。</p>
<p>同样的事用 Go 写，十分钟能跑起来。但要改成高并发、还要绝对不能出 data race 的版本，Go 的 race detector 只能在测试时发现部分问题，Rust 是在编译时就拦。</p>
<p>这不是说 Go 不好。Go 胜在简单、上手快、资料多；Rust 胜在能写出「几乎不可能在内存和并发上出错」的代码，代价是写的时候累、编译的时候等、学的时候劝退。</p>
<p>比较实际的态度是：能三行代码搞定的事，用 Go 或者 Python，图个省事；但凡涉及「高性能 + 高并发 + 谁写错谁背锅」的核心部分，认真考虑 Rust。</p>
<p>没必要跟自己较劲非得全程 Rust，也没必要因为怕难就彻底不碰。</p>
<h2>它真有那么神吗</h2>
<p>得说点反话，免得这篇看起来像 Rust 传教文。</p>
<p><strong>编译是真的慢。</strong> 项目稍微大一点，cargo build 等得人想去泡杯茶。增量编译好一些，但 clean 之后重新来一遍，那个等待很折磨。</p>
<p><strong>写代码也慢。</strong> 得不停跟编译器商量，很多时候逻辑明明是对的，但过不了它的检查，得绕个弯用 clone 或者把生命周期标清楚。那个 'a 的标注，学三个月的人偶尔还会写错。</p>
<p><strong>生态有坑。</strong> crates.io 上很多库还停在 0.x 版本，意思是作者随时可能来个 breaking change，升级一下依赖，代码就炸了。</p>
<p>ORM 这块尤其拉胯。diesel 功能强但学习曲线陡，SeaORM 新一点，但不如 Java 的 Hibernate 或者 Python 的 SQLAlchemy 成熟。</p>
<p>拿 Rust 写那些一天三变的需求、一堆 CRUD，会被它的严谨拖到怀疑人生。</p>
<p>真正落地得好的姿势，是像 AWS、Cloudflare 那样：核心的高性能、高并发、安全敏感那层用 Rust，上层编排用 Go 或者 Python，发挥各自长处。</p>
<p>别听谁忽悠「用 Rust 重写一切」，那是在给自己找不痛快。</p>
<p>还有个现实问题：会 Rust 的人不好找。楼主后来想找人一起做那个小项目，聊了几个都说太难，卡在生命周期和 trait 上就放下了。</p>
<p>这不是语言的问题，是人和时间的问题。</p>
<h2>空值的处理</h2>
<p>有一个后来会「真香」的设计，是它对「空」的处理。</p>
<p>别的语言里最经典的崩溃来源之一，就是空指针（null pointer）——你以为一个变量有值，结果它是 null，一访问就炸。Tony Hoare 自己都管 null 叫「十亿美元的错误」。</p>
<p>Rust 里没有 null。它用两个枚举类型替代：Option 表示「可能有值也可能没有」，Result 表示「可能成功也可能失败」。</p>
<p>你没法假装一个可能不存在的值「肯定存在」，因为类型系统逼你在代码里把「没有」的情况显式处理掉。要么 match 一下分情况，要么用 unwrap（但 unwrap 在确实是空的时候会直接 panic，等于把雷摆在台面上而不是埋起来）。</p>
<p>刚接触的时候会觉得啰嗦：不就是个可能为空的值，至于写这么多分支？</p>
<p>后来在 Go 里写多了 if err != nil 之后才回过味来。Go 是让「错误处理」变成每个函数都要写的样板，Rust 是把「可能出错」焊死在类型里，编译期逼你想清楚。</p>
<p>两种哲学，Rust 那个更让人安心：你不可能忘了处理错误，因为不处理就编译不过。</p>
<p>代价是代码里到处是 match 和 ? 操作符，初看确实啰嗦。但啰嗦在这里是 feature，不是 bug。它啰嗦，是因为它不许你偷懒。</p>
<h2>现在回头看</h2>
<p>2024 年之后，Rust 在 AI 基础设施这块又火了一波。</p>
<p>大模型推理引擎 candle 是 Rust 写的，Qdrant、SurrealDB 这些向量数据库也是 Rust。逻辑也通：AI 底层那堆对性能、并发、内存安全都极苛刻的引擎，正好是 Rust 的主场。</p>
<p>Python 写原型，Rust 写引擎，正在变成一种标配。</p>
<p>当年那个半夜发帖的人，后来怎么样了，帖子里没说。</p>
<p>但有一点是确定的：以前「内存安全」被当成 C++ 程序员自己该操心的事，跟用高级语言的人无关。现在越来越多的人明白，那七成的安全漏洞，本来就不该由人来防，该由编译器在门口就拦住。</p>
<p>Rust 干的事，说白了就是把「靠自觉」变成「靠强制」。这事儿看着不讲理，但架不住它真的管用。</p>
<p>所以值不值得学 Rust？</p>
<p>别冲着「未来语言」这种虚头巴脑的理由去学，也别指望学会了就能接活挣钱。</p>
<p>找个自己真正想做的小东西，逼自己用 Rust 写一遍。被编译器骂个几十回之后，再看代码，眼光会不自觉地变——会开始想「这块内存谁在管」「这个引用会不会有人偷偷改」。</p>
<p>这种思维习惯，比学会一门语言值钱。</p>
<p>至于那个借用检查器，骂它的人后来多半不骂了。它不是在刁难你，它只是在替你记着你记不住的那些账。</p>
<h2 id="refs">参考</h2>
<ul class="pg-refs">
<li><a href="https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html" target="_blank" rel="noopener">《The Rust Programming Language》第 4 章「Understanding Ownership」（官方书）</a> <span class="src">· 官方文档</span></li>
<li><a href="https://doc.rust-lang.org/rust-by-example/scope/lifetime.html" target="_blank" rel="noopener">《Rust by Example》生命周期一节</a> <span class="src">· 官方文档</span></li>
<li><a href="https://doc.rust-lang.org/error_codes/E0502.html" target="_blank" rel="noopener">Rust 编译器错误索引 E0502／E0499（借用冲突的官方解释）</a> <span class="src">· 官方文档</span></li>
<li><a href="https://rust-lang.github.io/rfcs/2094-nll.html" target="_blank" rel="noopener">Niko Matsakis 关于借用检查器（NLL）的设计笔记</a> <span class="src">· RFC</span></li>
<li><a href="https://survey.stackoverflow.co/2024/technology#most-loved-dreaded-and-wanted" target="_blank" rel="noopener">Stack Overflow 2024 开发者调查（Rust 连续多年「最受喜爱语言」）</a> <span class="src">· 数据</span></li>
<li><a href="https://blog.rust-lang.org/2019/11/07/Async-await-stable.html" target="_blank" rel="noopener">Rust 官方博客关于 async 与借用检查的历史讨论</a> <span class="src">· 官方博客</span></li>
<li><a href="https://go.dev/doc/faq#no_generics" target="_blank" rel="noopener">Go 官方 FAQ 中关于「没有泛型」的说明</a> <span class="src">· 官方文档</span></li>
</ul>
