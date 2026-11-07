---
id: "post-81"
title: "0x5f3759df"
date: "2026-08-10"
updated: "2026-08-10"
cat: "技术"
tags: ["技术", "钱", "社会", "AI", "历史"]
cover: ""
pinned: false
excerpt: "一个十六进制常数，十行代码，一句脏话。它的作者追了二十年也没有定论，而它算的东西，今天每一帧画面、每一次模型推理里都还在发生。"
---

<p>你在游戏里往前走，远处的山在慢慢变大。山上的光也跟着变：朝着太阳的那一面越来越亮，背光的那一面越来越暗。</p>
<p>这件事看起来天经地义。可要让它在电脑上算出来，得先回答一个很小的问题——这块石头，是朝哪边的？</p>
<p>朝哪边，数学上叫「法线」。法线必须是一根长度刚好等于 1 的箭头。长了短了，光就落错地方：石头会亮得像塑料，或者暗得像一块煤。</p>
<p>把一根箭头削到长度 1，得先算它的长度——三个数各自平方，加起来，开根号。二十多年前，一台电脑一秒钟要做几百万次这件事。开根号太慢了。</p>
<p>有人用十行代码绕过了它，代价是写下一个谁也解释不清的常数。</p>
<p>先看这个数字。</p>
<p>1597463007。写成十六进制是 0x5f3759df。</p>
<p>它在 1999 年的一段代码里只出现一次，旁边跟着一句反问，问的是这行到底在干什么。这段代码算的东西，你打游戏、渲染一张图、让模型生成一句话，背后都在发生。</p>
<p>写下它的人，到现在没有定论。它比它所在的那个游戏，至少老十年。</p>
<h2>一个数，十行代码</h2>
<p>先说它躺的地方。</p>
<p>1999 年 12 月 2 日，id Software 发行《Quake III Arena》。2005 年 8 月 19 日，在 QuakeCon 上，John Carmack 宣布把 id Tech 3 引擎的源码以 GPLv2 放出。压缩包 5.6MB，挂在 id 的 FTP 上。</p>
<p>程序员拆开这个包，在 <code>code/game/q_math.c</code> 里翻到了这个函数：</p>
<pre><code>float Q_rsqrt( float number )
{
	long i;
	float x2, y;
	const float threehalfs = 1.5F;
	x2 = number * 0.5F;
	y  = number;
	i  = * ( long * ) &amp;y;						// evil floating point bit level hacking
	i  = 0x5f3759df - ( i &gt;&gt; 1 );
	y  = * ( float * ) &amp;i;
	y  = y * ( threehalfs - ( x2 * y * y ) );   // 1st iteration
//	y  = y * ( threehalfs - ( x2 * y * y ) );   // 2nd iteration, this can be removed
	return y;
}</code></pre>
<p>原文的缩进就是这样。除了最后一行，全都顶格，连函数体都不缩。id 的代码风格一向如此，不整齐，但能跑。</p>
<p>0x5f3759df 那一行的末尾，原文本来还跟着一句注释。字面太糙，我这里不照抄，只留那个意思。</p>
<p>写下这行的人，在写这行的时候，自己也在问同一个问题。</p>
<p>这是整段代码最要紧的一处细节。它说明这个技巧在诞生的时候，连使用它的人都不能完整地解释它。他知道它能跑，知道它够快，知道结果够用。至于为什么一个整数减法能算出平方根倒数，那是二十年后才被人一行一行拆开的。</p>
<p>你给我的那版注释，把这句话换成了「核心神来之笔，直接给出一个极接近答案的初始猜测值」。</p>
<p>这句话本身没错，说得也清楚。但它把「惊讶」改成了「解释」。原句的口气里有一种东西，是后来所有的注释都补不回来的：写下它的人，和读它的人，站在同一个位置上。</p>
<h2>它算的是什么东西</h2>
<p>函数名 <code>Q_rsqrt</code>。Q 是 Quake 的前缀，id 的数学函数都带这个字母。rsqrt 是 reciprocal square root，平方根倒数。</p>
<p>你要算的是 1 除以根号 x。</p>
<p>举个具体的例子。给一个三维向量 (3, 4, 0)，长度是 5。要把它的长度变成 1，每个分量除以 5。</p>
<p>除以 5 好办，乘 0.2。可如果长度是 √14，除以 √14 就别扭了。所以实际写法是先求长度的倒数，再乘上去：</p>
<p>归一化后的 v = v × (1 / |v|)</p>
<p>而 |v| = √(x² + y² + z²)。平方根藏在里面，倒数也藏在里面。这就是 rsqrt 出现的地方。</p>
<p>为什么图形学天天要干这件事。</p>
<p>光照公式里有一个点积 N·L，N 是表面法线，L 是指向光源的向量。点积的几何意义是 |N| |L| cosθ。当 N 和 L 都是单位向量时，两个模长都是 1，点积直接等于 cosθ，也就是亮度。当两个向量的模长不等于 1，你还得额外除两次。</p>
<p>所以每个顶点、每个像素、每条光线，进入光照计算之前都要先归一化。</p>
<p>一帧要算多少次。一个中等复杂度的场景，五万个三角形，每个三角形三个顶点，每个顶点一次归一化，十五万次。六十帧就是每秒九百万次。反射、折射、粒子、雾效，每一项都在同一个数上再加一遍。</p>
<p><code>q_math.c</code> 里最直接的调用者是 <code>VectorNormalizeFast</code>：</p>
<pre><code>// fast vector normalize routine that does not check to make sure
// that length != 0, nor does it return length, uses rsqrt approximation
void VectorNormalizeFast( vec3_t v )
{
	float ilength;
	ilength = Q_rsqrt( DotProduct( v, v ) );
	v[0] *= ilength;
	v[1] *= ilength;
	v[2] *= ilength;
}</code></pre>
<p>上面那两行注释值得读一遍。「不检查长度是否为 0，不返回长度，使用 rsqrt 近似」。三个否定，三个为了让路而拆掉的护栏。</p>
<p>同一个文件里还有 <code>Q_fabs</code>：</p>
<pre><code>float Q_fabs( float f ) {
	int tmp = * ( int * ) &amp;f;
	tmp &amp;= 0x7FFFFFFF;
	return * ( float * ) &amp;tmp;
}</code></pre>
<p>求绝对值，不调用 <code>fabs</code>，把 32 位里的符号位直接抹成 0。同一套思路，同一个作者群，同一种世界观：数字的表示是可以被撬开的，撬开之后有捷径。</p>
<p>这两段代码放在一起，比单独看 <code>Q_rsqrt</code> 更能说明那个年代的 id 在干什么。他们把浮点数当成一堆可以被手动摆放的比特。</p>
<h2>1999 年，这一步有多贵</h2>
<p>先给数字。</p>
<p>x87 的浮点单元上，<code>fsqrt</code> 在 Pentium 和 Pentium II 上大约 69 个周期，<code>fdiv</code> 大约 35 到 40 个周期。写 <code>1.0f / sqrtf(x)</code>，两个都要跑，串起来超过 100 个周期。</p>
<p>Pentium III 450MHz，一个周期 2.2 纳秒。107 个周期是 236 纳秒。</p>
<p>每秒九百万次，就是 2.1 秒。而一帧只有 16.7 毫秒。</p>
<p>光是把开方算完，预算已经超了几十倍。慢一点还能忍。这个已经超预算几十倍，效果根本做不出来。</p>
<p>这套代码走完全程大约 10 到 15 个周期，只算初始猜测的话 5 个。一笔整数读、一次右移、一次整数减法、一笔整数写、两次浮点乘法、两次浮点减法。全是流水线上最便宜的操作，没有一个需要进除法器。</p>
<p>差距是七到二十倍。</p>
<p>那个年代的标准做法是查表。</p>
<p>1990 年代初，通用的平方根倒数算法是从一张查找表里取初值，再用牛顿法修。表通常几百到几千项，每项四个字节，几 KB。精度可控，速度也还行。</p>
<p>问题在缓存。Quake 3 的渲染循环里，纹理、顶点、光照图、可见性数据都在抢同一块 L1。一张几 KB 的表插进去，等于从别人碗里夹菜。</p>
<p>这段代码把表也省了。它用一行减法，从数字自己身上把初值读出来。</p>
<h2>第一步：借一双眼睛</h2>
<p>要理解这行代码，得先看一个 32 位浮点数在内存里到底长什么样。</p>
<p>IEEE 754 单精度，32 位，切三段：</p>
<div class="g-tablewrap"><table><thead><tr><th>段</th><th>位数</th><th>含义</th></tr></thead><tbody><tr><td>S</td><td>1</td><td>符号，0 是正，1 是负</td></tr><tr><td>E</td><td>8</td><td>指数，存的是 e + 127，叫移码</td></tr><tr><td>M</td><td>23</td><td>尾数，存的是小数点后面那一段</td></tr></tbody></table></div>
<p>一个正数 x，写成二进制科学计数法是 x = 2^e × (1 + m)，其中 m 落在 [0, 1) 之间。存进去的时候，E 存 e + 127，M 存 m × 2²³。</p>
<p>把这个 32 位整体当成一个无符号整数读出来，得到：</p>
<p>I = E × 2²³ + M = 2²³ × (e + 127 + m)</p>
<p>这一步就是代码里的 <code>i = *(long*)&amp;y;</code>。</p>
<p><code>&amp;y</code> 拿到 y 的地址，强制转成 <code>long*</code>，再解引用。编译器不会做任何转换，它只是把同一块内存的四个字节按整数解释了一遍。这叫类型双关（type punning）。</p>
<p>这里有两个坑，都要说明。</p>
<p>第一，这在 C 标准里是未定义行为。叫「严格别名」（strict aliasing）规则：编译器有权假设不同类型的指针不指向同一块内存，于是可以把你这段读写重排、合并、甚至删掉。正确写法是用 <code>memcpy</code>，或者 C++20 的 <code>std::bit_cast</code>。当年没有这些，大家都这么写，编译器也没那么激进。</p>
<p>第二，<code>long</code> 在 32 位系统上是 4 字节，在 64 位 Linux 和 macOS 上是 8 字节（LP64 模型）。把这段代码原样搬到 64 位机器上，<code>*(long*)&amp;y</code> 会一次读八个字节，把 y 后面四个字节也吃进去。结果先是垃圾，然后是崩溃。Quake 3 的 64 位移植版（ioquake3）把它改成了 <code>int</code>。</p>
<p>这段代码是给 1999 年的 32 位机器写的。它是给 1999 年的 32 位机器写的一段有条件的工程代码，没打算被搬到别处。</p>
<h2>第二步：位模式就是对数</h2>
<p>现在到了核心。</p>
<p>上一步得到 I ≈ 2²³ × (e + 127 + m)。</p>
<p>另一边，x 的以 2 为底的对数是：</p>
<p>log₂ x = log₂(2^e × (1 + m)) = e + log₂(1 + m)</p>
<p>把这两个式子摆在一起看。I 除以 2²³ 是 e + 127 + m。log₂ x 是 e + log₂(1+m)。</p>
<p>差在哪里？差在 m 和 log₂(1+m)。</p>
<p>而这两个东西，在 [0, 1) 这个区间上长得非常像。</p>
<p>m = 0 时，log₂(1+0) = 0，两者相等。m = 1 时，log₂ 2 = 1，两者也相等。中间呢？m = 0.5 时，log₂ 1.5 ≈ 0.585，比 0.5 大了 0.085。整段的最大偏差就在这附近，约 0.086。</p>
<p>所以可以写：</p>
<p>log₂(1 + m) ≈ m + σ</p>
<p>σ 是一个常数修正项，用来把这 0.086 的鼓包尽量摊平。摊平之后，两侧各留一半。</p>
<p>代回去：</p>
<p>log₂ x ≈ e + m + σ</p>
<p>而 I / 2²³ = e + 127 + m，所以 e + m = I / 2²³ - 127。再代一次：</p>
<p>log₂ x ≈ I / 2²³ - 127 + σ</p>
<p>整理成 I 的表达式：</p>
<p>I ≈ 2²³ × (log₂ x + 127 - σ)</p>
<p>这就是整段代码的支点。</p>
<p>它说的是：<strong>一个浮点数的整数位模式，约等于它的以 2 为底的对数，乘上一个固定的比例，再加一个固定的偏移。</strong></p>
<p>要取对数，不用算。读出来就是。</p>
<p>这句话听起来像作弊，但它是 IEEE 754 的设计带出来的副产品。当年定标准的人把指数放在高位、尾数放在低位，是为了让浮点数的比较可以用整数比较来做。他们顺手也把对数编码进去了，只是没人当时想到。</p>
<p>σ 取多少？</p>
<p>代码里的 0x5f3759df 可以反推。把它除以 2²³ 得 190.4324，除以 1.5 得 126.9549，用 127 减掉，剩下 0.04505。</p>
<p>所以 0x5f3759df 里藏着的 σ 是 0.04505。</p>
<p>这个数和上面那个 0.086 的鼓包对得上：把鼓包从中间劈开，两边各 0.043。0.045 就在这个量级上，稍偏一点。为什么偏这一点，后面会讲，那是整篇文章最有意思的一段。</p>
<h2>第三步：为什么是右移一位</h2>
<p>现在看那行代码。</p>
<p>它要做的事情，在对数域里只有两个动作。</p>
<p>第一，把 log₂ x 乘上 -0.5。因为 y = x^(-1/2)，所以 log₂ y = -0.5 × log₂ x。</p>
<p>第二，把结果重新塞回浮点数的格式里。</p>
<p>在整数域里，这两个动作各有对应。乘 -0.5 等于「除以 2 再取负」。除以 2 就是右移一位。取负就是拿一个常数去减。所以 <code>0x5f3759df - (i &gt;&gt; 1)</code> 里的两个操作，一个管除二，一个管取负。</p>
<p>整条推导可以一步一步摆出来。</p>
<p>目标 y 的位模式：</p>
<p>I_y ≈ 2²³ × (log₂ y + 127 - σ)</p>
<p>把 log₂ y = -0.5 × log₂ x 代进去：</p>
<p>I_y ≈ 2²³ × (-0.5 × log₂ x + 127 - σ)</p>
<p>再用一次 x 的近似式，把 log₂ x 换成 I_x：</p>
<p>-0.5 × log₂ x ≈ -0.5 × (I_x / 2²³ - 127 + σ) = -I_x / 2²⁴ + 63.5 - 0.5σ</p>
<p>代回去，合并：</p>
<p>I_y ≈ -I_x / 2 + 2²³ × (190.5 - 1.5σ)</p>
<p>到这里就结束了。右边三项，对应代码里的三个动作：</p>
<div class="g-tablewrap"><table><thead><tr><th>项</th><th>值</th><th>对应</th></tr></thead><tbody><tr><td>2²³ × 190.5</td><td>1598029824 = 0x5f400000</td><td>常数的高位部分</td></tr><tr><td>1.5σ × 2²³</td><td>566817 = 0x8a621</td><td>从常数里扣掉的修正</td></tr><tr><td>-I_x / 2</td><td>-(i &gt;&gt; 1)</td><td>右移一位再取负</td></tr></tbody></table></div>
<p>0x5f400000 减去 0x8a621，等于 0x5f3759df。</p>
<p>对上了。</p>
<p>190.5 这个数值得说一句。它是 1.5 × 127。为什么乘 1.5？</p>
<p>因为 127 是浮点数的指数偏移量。你在对数域里把 log 乘了 -0.5，但整数域里的数带着这个偏移，偏移不能跟着乘 -0.5（它是个加性常数，跟乘法无关）。所以你得先把它剥掉，再重新加一份完整的。一减一加，系数从 -0.5 变成 +1.5。</p>
<p>换句话说，这个 1.5 是「一次减、一次加」留下的痕迹。推导里没有任何魔法，全是记账。</p>
<p>然后看那个 0x8a621。</p>
<p>它等于 566817，占总量的 0.035%。整段代码的全部精度来源，就在这 0.035% 的修正上。你把 σ 设成 0，常数就是 0x5f400000，误差会从 3.4% 涨到 5% 以上。你把这 0.035% 调准一点，误差就掉到 3.42%。</p>
<p>一个三万五千分之一的修正，撑起了整段代码。这就是为什么它看起来像魔法：改动小到肉眼看不见，效果大到能跑游戏。</p>
<h2>第四步：牛顿迭代</h2>
<p>初始猜测的误差是 3.4%。这个精度够不够？</p>
<p>对一帧画面来说，法线方向差 3.4%，光照会偏，高光会跳，边缘会闪。不够。</p>
<p>所以要修。修的工具是牛顿法，这个东西比这段代码老两百多年。</p>
<p>要解的是 1/√x = y，两边平方再取倒数，等价于 1/y² = x。构造一个函数：</p>
<p>f(y) = 1/y² - x</p>
<p>求它的零点。导数 f'(y) = -2/y³。牛顿迭代的公式是：</p>
<p>y_next = y - f(y) / f'(y)</p>
<p>代进去，化简：</p>
<p>y_next = y - (1/y² - x) / (-2/y³)= y + y/2 - x·y³/2= y × (1.5 - 0.5 × x × y²)</p>
<p>现在回头看那行代码：</p>
<pre><code>y  = y * ( threehalfs - ( x2 * y * y ) );</code></pre>
<p><code>threehalfs</code> 是 1.5。<code>x2</code> 是 <code>number * 0.5F</code>，也就是 0.5x。<code>x2 * y * y</code> 就是 0.5xy²。一模一样。</p>
<p>为什么选 f(y) = 1/y² - x，不选 f(y) = y² - 1/x？</p>
<p>因为后者的导数里会出现 1/x²，迭代公式里会带除法。而除法正是你想要避开的东西。前一种形式，化简之后只剩乘法和减法，一个除法都没有。</p>
<p>这个选择本身就是设计。它不只是在算一个数，它在算一个「用最便宜的运算能算出来的数」。</p>
<p>误差怎么传。</p>
<p>设当前相对误差是 e，也就是 y = (1+e)/√x。代进迭代公式，化简之后得到：</p>
<p>e_next ≈ 1.5 e² + 0.5 e³</p>
<p>二次项主导。所以误差的平方级缩小，有效位数每次翻倍。</p>
<p>3.42% 进去，0.178% 出来。0.178% 再进去，0.00047% 出来。</p>
<p>看这三个数：10⁻²、10⁻³、10⁻⁶。每迭代一次，小数点后多两位。</p>
<p>代码里第二次迭代被注释掉了，旁边写着 <code>this can be removed</code>。</p>
<p>为什么可以删掉。</p>
<p>因为 0.18% 对人眼已经足够。一个法线偏 0.18%，光照强度差 0.18%，在 8 位色深的显示器上（每级 0.4%）连一个色阶都不到。你花五到十个周期去修一个看不见的误差，不划算。</p>
<p>这就是 id 的工程判断：在人眼分辨不出的地方，把精度全部扔掉。</p>
<p>还有一层。Quake 3 里的近似远不止 <code>Q_rsqrt</code> 这一处。它的光照贴图是 16 位的，纹理默认压缩，阴影是预烘焙的，反射用的是环境贴图，实时追踪那个年代还跑不动。整个引擎建立在一层一层的「够用」上。这段代码只是最露骨的那一层。</p>
<h2>手算一遍</h2>
<p>拿 2 走一遍。</p>
<p>2.0 的位模式是 0x40000000，拆成二进制：</p>
<p>0100 0000 0000 0000 0000 0000 0000 0000</p>
<p>符号位 0。指数位 10000000，是 128，减掉偏移 127，实际指数 1。尾数位全零。</p>
<p>所以这个数是 1.0 × 2¹。对。</p>
<p>当整数读出来，i = 0x40000000 = 1073741824。</p>
<p>右移一位，i &gt;&gt; 1 = 0x20000000。</p>
<p>常数减，0x5f3759df − 0x20000000 = 0x3f3759df。</p>
<p>再当浮点读回来。0x3f3759df 拆开：</p>
<p>0011 1111 0011 0111 0101 1001 1101 1111</p>
<p>符号位 0。指数位 01111110，是 126，实际指数 −1。尾数位 01101110101100111011111。</p>
<p>值等于 1.4324 × 2⁻¹，也就是 0.7162。</p>
<p>真值 1/√2 = 0.70710678。差 +1.29%。</p>
<p>进牛顿迭代。x2 = 1.0，threehalfs = 1.5：</p>
<p>0.7162 × (1.5 − 0.7162²) = 0.7162 × (1.5 − 0.5129) = 0.7162 × 0.9871 = 0.7069</p>
<p>真值 0.707107，差 −0.025%。</p>
<p>一步，从 1.29% 到 0.025%。差了五十倍。</p>
<p>整条路摆成表：</p>
<div class="g-tablewrap"><table><thead><tr><th>步骤</th><th>值</th></tr></thead><tbody><tr><td>x</td><td>2.0</td></tr><tr><td>位模式</td><td>0x40000000</td></tr><tr><td>右移一位</td><td>0x20000000</td></tr><tr><td>减 0x5f3759df</td><td>0x3f3759df</td></tr><tr><td>读回浮点</td><td>0.71621507</td></tr><tr><td>真值 1/√2</td><td>0.70710678</td></tr><tr><td>初值误差</td><td>+1.2881%</td></tr><tr><td>一次迭代</td><td>0.70693004</td></tr><tr><td>迭代后误差</td><td>−0.0250%</td></tr></tbody></table></div>
<p>同样的流程跑几个不同的数，结果如下。这张表是我按 32 位浮点位运算算的，不是抄的：</p>
<div class="g-tablewrap"><table><thead><tr><th>x</th><th>初值</th><th>真值</th><th>初值误差</th><th>一次迭代</th><th>迭代后误差</th></tr></thead><tbody><tr><td>0.25</td><td>1.93243015</td><td>2</td><td>−3.3785%</td><td>1.99661430</td><td>−0.1693%</td></tr><tr><td>0.5</td><td>1.43243015</td><td>1.41421356</td><td>+1.2881%</td><td>1.41386008</td><td>−0.0250%</td></tr><tr><td>1</td><td>0.96621507</td><td>1</td><td>−3.3785%</td><td>0.99830715</td><td>−0.1693%</td></tr><tr><td>2</td><td>0.71621507</td><td>0.70710678</td><td>+1.2881%</td><td>0.70693004</td><td>−0.0250%</td></tr><tr><td>4</td><td>0.48310754</td><td>0.5</td><td>−3.3785%</td><td>0.49915357</td><td>−0.1693%</td></tr><tr><td>10</td><td>0.32685754</td><td>0.31622777</td><td>+3.3614%</td><td>0.31568579</td><td>−0.1714%</td></tr><tr><td>100</td><td>0.10319876</td><td>0.1</td><td>+3.1988%</td><td>0.09984488</td><td>−0.1551%</td></tr><tr><td>1000</td><td>0.03056043</td><td>0.03162278</td><td>−3.3594%</td><td>0.03156984</td><td>−0.1674%</td></tr></tbody></table></div>
<p>扫两万个点（从 2⁻¹⁰ 到 2²⁰，步长千分之一点五），初值最大相对误差 3.4366%，一次迭代后 0.1751%。和 Lomont 的暴力测试对得上。</p>
<p>看 0.25、1、4 那一列，误差都是 −3.3785%。0.5 和 2 都是 +1.2881%。</p>
<p>两组的差别有来源。</p>
<h2>误差的形状</h2>
<p>0.25、0.5、1、2、4 这五个数，尾数全是零，只差指数。但误差分成两组。</p>
<p>原因在右移。</p>
<p>浮点数的位模式是 E × 2²³ + M。右移一位，等于</p>
<p>(E ÷ 2) × 2²³ + (E mod 2) × 2²² + (M ÷ 2)</p>
<p>中间那一项 (E mod 2) × 2²² 是关键。E 是偶数时它是 0，新尾数等于 M 的一半。E 是奇数时它是 0x400000，新尾数凭空多出 0.5。</p>
<p>而 E 的奇偶由实际指数 e 决定：E = e + 127，127 是奇数，所以 e 是偶数时 E 是奇数，e 是奇数时 E 是偶数。</p>
<p>于是：</p>
<ul><li>x = 0.25 = 2⁻²，e = −2（偶），右移时尾数多进 0.5，猜出来偏小，误差 −3.38%</li><li>x = 0.5 = 2⁻¹，e = −1（奇），尾数不多，猜出来偏大，误差 +1.29%</li></ul>
<p>一条很干净的规律：<strong>误差的符号，由指数 e 的奇偶决定。</strong></p>
<p>尾数不全零的时候，这个规律还在，只是被尾数本身的影响盖住一部分。总的误差区间是 −3.3785% 到 +3.4366%。</p>
<p>这也解释了一个视觉现象。一个物体从近处走向远处，它到相机的距离每翻一倍，指数就变一次，初值误差就翻一次符号。不做牛顿迭代的话，光照会在明暗交界处轻微跳动。</p>
<p>迭代一次之后，−0.1693% 和 −0.0250%，都在千分之二以内。看不出来。</p>
<blockquote>
<p>「The following code is the fast inverse square root implementation from Quake III Arena, stripped of C comments.」</p>
<p class="src">—— Chris Lomont,《Fast Inverse Square Root》, 普渡大学技术报告, 2003-02</p>
</blockquote>
<h2>那个数到底有多好</h2>
<p>2003 年 2 月，普渡大学数学系的 Chris Lomont 写了一篇 12 页的技术报告，标题就叫《Fast Inverse Square Root》。</p>
<p>他做了三件事。</p>
<p>第一，把这个近似拆成一个误差函数，解析地算出来。</p>
<p>第二，求出让初值误差最小的常数，得到 0x5f37642f。</p>
<p>第三，拿它跑测试，发现结果反过来了。</p>
<p>Lomont 在全浮点范围内跑了三组数，每组测三种状态（只用初值、一次迭代、两次迭代）。表格如下：</p>
<div class="g-tablewrap"><table><thead><tr><th>常数</th><th>初值误差</th><th>一次迭代后</th><th>两次迭代后</th></tr></thead><tbody><tr><td>0x5f3759df（原版）</td><td>3.43756%</td><td>0.175228%</td><td>4.66×10⁻⁴%</td></tr><tr><td>0x5f37642f（理论最优初值）</td><td>3.42128%</td><td>0.1775854%</td><td>4.77521×10⁻⁴%</td></tr><tr><td>0x5f375a86（迭代后最优）</td><td>3.43652%</td><td>0.175124%</td><td>4.65437×10⁻⁴%</td></tr></tbody></table></div>
<p>第二行是关键。</p>
<p>0x5f37642f 的初值误差是 3.42128%，比原版的 3.43756% 小。这在理论上完全正确，它是用 Mathematica 的 <code>FindMinimum</code> 求出来的极小点。</p>
<p>但迭代一次之后，它变成 0.1775854%，比原版的 0.175228% 大。</p>
<p>也就是说：初值更好的那个常数，成果更差。</p>
<p>Lomont 在论文里直接写了这个困惑：「分析正确预测了新常数在实践中会更好地逼近。可奇怪的是，经过一次牛顿迭代后，它的最大相对误差反而更高。这又提出了那个问题：原始代码里的常数到底是怎么得出来的？」</p>
<p>他自己给了一个解释：牛顿迭代在引入误差，而这部分误差没有进入最初的优化目标。</p>
<p>你优化的是初值，你要的是终值。中间隔着一个非线性变换，最优解就搬家了。</p>
<p>于是他换了目标函数，重新暴力搜索：找那个「迭代一两次之后误差最小」的常数。搜出来是 0x5f375a86。</p>
<p>它在一次迭代后是 0.175124%，比原版好 0.0001 个百分点。</p>
<p>好多少？万分之六。</p>
<p>Lomont 把这句话写进了论文结尾：如果可能，我想问问原作者，这个常数是推导出来的，还是试出来的？</p>
<p>这个问题到 2026 年也没有答案。但从数字上可以推出一点东西。</p>
<p>三个常数，0x5f3759df、0x5f37642f、0x5f375a86，彼此只差 80 和 167。换成 σ，分别是 0.04504657、0.04504021、0.04503330。差别在小数点后第五位。</p>
<p>这说明误差曲面在最优解附近极其平坦。你随便走一步，误差只变千分之几。反过来说，一个人手工试，能试到离最优万分之一的地方，也已经很惊人了。</p>
<p>2018 年，Moroz、Walczyk、Hrynchyshyn、Holimath、Cieśliński 五个人在《Applied Mathematics and Computation》上发了一篇论文，第一次把这个算法严格化。他们的结论之一是：最优常数依赖于你后面做几次牛顿迭代。做一次和做两次，最优值不同。</p>
<p>所以「0x5f3759df 算不算最优」，这个问法本身就不完整。得先问「配几次迭代」。</p>
<p>2021 年，同一批人里的三个（Walczyk、Moroz、Cieśliński）又往前走了一步。</p>
<p>他们的思路是：既然误差分布不对称，那就别只调常数，把牛顿迭代里的系数也调歪。</p>
<p>把 1.5 换成 1.68191391，把 0.5 换成 0.703952009，常数换成 0x5f200000，一次迭代的误差从 0.18% 降到 0.065%，两次迭代到 3×10⁻⁷。</p>
<p>运算量没变。只是三个数字换了。</p>
<p>这件事说明，这段代码的优化空间在 1999 年远远没有被走完。0x5f3759df 是一个人在没有计算机辅助搜索的年代，靠手感和试错摸到的一个点。后面四十年，数学家们一直在往它旁边挪。</p>
<h2>换个位宽也成立</h2>
<p>这套推导不依赖 32 位。</p>
<p>双精度是 11 位指数（偏移 1023）、52 位尾数。同样的公式，同样的 σ，只是位宽变了。Lomont 给的双精度常数是 0x5fe6ec85e7de30da，后来 Matthew Robertson 算出更准的 0x5fe6eb50c7b537a9，Charles McEniry 给出的是 0x5fe6eb50c7b537aa，精度介于两者之间。</p>
<p>这个公式还能推广到别的幂。开立方、四次方根、任意有理次幂，都能用同一套「位模式当对数 + 牛顿修正」的办法做出来。2021 年有一篇论文专门做微控制器上的立方根，用的是同一套推导。</p>
<p>所以 0x5f3759df 属于一个家族，它是里面最出名的那一个。</p>
<h2>这个家族的其他成员</h2>
<p>0x5f3759df 出名，但它背后有一整类技巧。列几个，说明这个思路能走多远。</p>
<p><strong>快速对数。</strong> 同一套近似，把 float 的位模式读成整数，直接当定点对数用，误差约 0.043。游戏引擎做 HDR 色调映射、做光照累加（在对数域相加等于相乘），用的就是这个。</p>
<p><strong>快速指数。</strong> 反过来，把一个定点对数塞进 float 的位模式，得到 2 的幂。和上面那条配对使用。</p>
<p><strong>对数数制（LNS）。</strong> 整台机器都用对数表示数字，乘除法退化成加减法。1962 年 Mitchell 那篇论文之后，1970 年代真有人造过这种计算机。今天在 DSP 和某些神经网络加速器里还有实现。</p>
<p><strong>定点数。</strong> Doom 那个年代连浮点都不敢用，坐标是 16.16 定点（高 16 位整数，低 16 位小数）。Quake 才开始大量用 float。这个转变本身就属于 1990 年代。</p>
<p><strong>神经网络量化。</strong> 把 32 位浮点压成 8 位整数，反量化时乘一个 scale，那个 scale 常常在对数域里算。做法和 LNS 一脉相承。</p>
<p><strong>Hacker's Delight 第 11 章。</strong> Henry Warren 那本书里有一章叫 “Integer Logarithms”，把这些技巧收了进去。想系统看这一类东西，从那里开始。</p>
<p>它们的共同点是：不去算那个数学函数，去动那个数的表示。</p>
<p>这大概是整个家族最值钱的一句话。</p>
<h2>这个数是谁写的</h2>
<p>按流传最广的版本，答案是 John Carmack。</p>
<p>这个版本很顺：Quake 是他写的，id 的引擎是他写的，那个年代最有名的程序员就是他。代码里有一句自己也没说清的话，有一个看不懂的常数，有一个改变游戏行业的结果。合理。</p>
<p>而且它有一个证据：这段代码确实在 id 的仓库里，签着 id 的版权头。</p>
<p>问题是 Carmack 自己不认。</p>
<p>源码公开之后，图形论坛 Beyond3D 上有人开始追这件事。追得最凶的是 Rys Sommefeldt，他没有停在猜测上，直接写了一封邮件去问。</p>
<p>Carmack 回了。他说这段代码跟他无关，他也不认为 Michael Abrash 写过——Abrash 是 id 的另一位优化专家，《Graphics Programming Black Book》的作者，也是当时最可能写出这种东西的人。Carmack 给了另一个名字：Terje Mathisen。</p>
<p>Mathisen 是挪威人，汇编优化圈子里很有名，1990 年代帮 id 优化过 Quake 的渲染循环。</p>
<p>Sommefeldt 又去问 Mathisen。Mathisen 回信说：1990 年代初我确实写过类似的实现，但那段代码跟我写的不一样。</p>
<p>线索断了。</p>
<p>然后是第三个名字：Gary Tarolli。</p>
<p>Tarolli 是 3dfx 的联合创始人。3dfx 做 Voodoo，是 1990 年代末 3D 加速卡的霸主，Quake 3 的 Glide 接口就是给它做的。Sommefeldt 把代码发过去，Tarolli 说他见过，而且用了很多年，还自己调过那个常数。</p>
<p>在哪见的？在 SGI。</p>
<p>1980 年代末到 1990 年代初，Tarolli 在给 SGI 的 Indigo 工作站做项目。Indigo 是 1991 年的机器，图形性能在当时是顶级的。他在那台机器上大量用这段代码，并且承认自己对常数 R 的取值做过一些改进。</p>
<p>但他也说，发明权不归他。</p>
<p>到这一步，追查看起来要停在「SGI 内部，某个不知名的人」上了。</p>
<p>然后 Greg Walsh 出现了。</p>
<p>没人去找他。他自己看到帖子，主动联系了 Sommefeldt。他说：这段代码是我写的。</p>
<p>Walsh 当时在 Ardent Computer 工作。这是一家 1985 年成立的公司，做带向量处理器的图形小型机，产品叫 Titan。公司寿命不长，1990 年代初就并进了 Stellar 然后消失。Walsh 的工作是给那些用不上向量硬件的软件找一条快的路，平方根倒数就是其中一个瓶颈。</p>
<p>而他说，这个想法的种子来自和 Cleve Moler 的讨论。</p>
<p>Cleve Moler 是 MATLAB 的作者，MathWorks 的创始人。他当时在研究牛顿-拉夫逊逼近，也在 Ardent 待过。</p>
<p>一个搞数值分析的人，一个搞图形硬件的工程师，在同一个公司里讨论怎么用近似换速度——这件事本身就说明了这个算法的出身。这件事本身就说明了这个算法的出身：它从数值分析和硬件工程的交叉地带长出来，不属于任何一边。</p>
<p>Tarolli 是从哪拿到这段代码的？他是 Kubota 的顾问，Kubota 是 Ardent 的投资方。他大约在 1994 年把这段代码带到了 3dfx。</p>
<p>于是就形成了一条链：</p>
<p>Ardent（1980 年代末，Walsh 写）→ SGI Indigo（Tarolli 用，改常数）→ 3dfx（1994 年前后）→ id Software（1999 年，进 Quake 3）</p>
<p>中间还漏了一环：这段代码怎么从 3dfx 到 id 的，没有确切记录。3dfx 和 id 的关系很近，Quake 3 是第一批原生支持 Glide 的游戏，两边的工程师有大量往来。可能是一封邮件，可能是一次会议，也可能是一份共享的代码库。这个环节永远查不清了。</p>
<p>Sommefeldt 自己在文章里也说了：没有决定性的证据。Walsh 的说法是目前最可信的版本，因为它能解释所有已知的细节，而且当事人主动认领。</p>
<p>但「最可信」和「确定」之间还有距离。</p>
<p>顺便，这也是为什么我前面说「它比 Quake 3 至少老十年」。如果 Walsh 是在 1980 年代末写的，那它诞生的时候，Quake 还没影，id 还是个做横版游戏的小公司，3dfx 还没成立。</p>
<h2>一个技巧在同行之间传了十年</h2>
<p>这段历史里最值得想的一点，「谁写的」还在其次，「为什么会有好几个人都写过」才是要点。</p>
<p>Carmack 猜 Mathisen，说明 Mathisen 写过。Mathisen 说自己写过类似的。Tarolli 说自己用过、改过。Walsh 说自己原创。Moler 说自己在研究牛顿逼近。</p>
<p>五个人，四个国家，三个公司，时间跨度十几年。他们都碰过这个东西。</p>
<p>这说明 0x5f3759df 属于一个时代的技术共识，跟天才的灵光关系不大。1980 年代末到 1990 年代初，做图形的人普遍面临同一个问题：软件要算几百万次平方根倒数，硬件帮不上忙，怎么办？</p>
<p>答案在同一个方向上：把浮点数的位模式当对数用。</p>
<p>这个想法在当时不算特别稀奇。稀奇的是把它做到 3.4% 的精度，并且只花五个周期。</p>
<p>所以「作者是谁」这个问题，答案可能不止一个人。Walsh 写了这个具体的实现，但这个思路在当时已经飘在空气里了。</p>
<h2>更早：1962 年的 Mitchell</h2>
<p>如果继续往前追，会追到一篇 1962 年的论文。</p>
<p>John N. Mitchell，NCR 公司，标题是《Computer Multiplication and Division Using Binary Logarithms》，发在 IRE Transactions on Electronic Computers，1962 年 8 月，第 11 卷第 4 期，512 到 517 页。</p>
<p>这篇论文里有一个近似，是整条血脉的源头。</p>
<p>把一个二进制数写成 p = 2^n × (1 + x)，其中 x 是尾数部分，落在 [0, 1)。取对数：</p>
<p>log₂ p = n + log₂(1 + x)</p>
<p>然后 Mitchell 做了一个非常大胆的替换：</p>
<p>log₂(1 + x) ≈ x</p>
<p>这个近似在 x = 0 和 x = 1 时是精确的，中间最大偏 0.086。和前面讲的 σ 来源是同一个鼓包。</p>
<p>但这个近似有一个惊人的性质：n + x 这个值，正好就是 p 的二进制表示（把最高位的那个 1 换成小数点）。</p>
<p>举个例子。p = 5，二进制是 101。写成 1.01 × 2²，n = 2，x = 0.01（二进制），也就是 0.25。n + x = 2.25。而 log₂ 5 = 2.322。差 0.07。</p>
<p>2.25 这个数，写成二进制是 10.01。而 5 的二进制是 101。你把 101 的小数点往左挪一位，就是 10.1。再补个零，10.01。</p>
<p>也就是说：取对数这个操作，在二进制里就是把小数点挪一下。</p>
<p>那么乘法呢？两个数相乘，对数相加。而对数相加，在二进制里就是两个位模式直接相加（带着进位）。</p>
<p>所以：<strong>乘法可以用一次整数加法来完成，误差不超过 1/9。</strong></p>
<p>这就是 Mitchell 论文的标题：用二进制对数做乘除法。</p>
<p>1962 年，没有浮点单元，没有 GPU，做一次乘法要几十个周期。用加法代替乘法，即使误差 11%，在当时的很多场合也是划算的。</p>
<p>这篇论文后来被引用了六十年。它成了对数数制（logarithmic number system, LNS）的起点，也是所有「用位模式近似对数」的技巧的祖宗。</p>
<p>现在回头看 0x5f3759df。</p>
<p>它做的正是 Mitchell 那件事：把位模式当对数，在对数域里做运算（开方变成除以二），再变回位模式。区别在于，Mitchell 用它做乘法，Walsh 用它做平方根倒数；Mitchell 用的是加法，Walsh 用的是减法和移位。</p>
<p>同一个原理，换了个方向用。</p>
<p>所以这个常数算不上孤立的奇迹。它是一条从 1962 年延伸到 1999 年的路上的一个路标。</p>
<h2>1997 年，Blinn 把它带进了图形学</h2>
<p>中间还有一站。</p>
<p>Jim Blinn 是计算机图形学那本经典教材《Jim Blinn's Corner》系列的作者，也是 NASA 喷气推进实验室的图形研究员。他给 IEEE Computer Graphics and Applications 写了很多年专栏。</p>
<p>1997 年，他写了一篇叫《Floating-Point Tricks》的专栏文章，在里面演示了平方根倒数的一个简单近似。</p>
<p>这篇文章在图形学圈子里流传很广。它把「浮点数的位模式可以被当对数用」这件事，从数值分析的论文里，搬到了做游戏和做渲染的人能读到的地方。</p>
<p>Quake 3 的开发者大概率读过。1990 年代末，做 3D 引擎的人人手一份 Blinn 的专栏。</p>
<p>这条线索让整件事变得不那么神秘：1999 年，一个 id 的程序员在写渲染代码，他需要快的 rsqrt，他记得 Blinn 写过这个技巧，或者他在哪个代码库里见过这段实现，他把它抄了过来，改了个常数，在末尾留了一句自己也没把握的注。</p>
<p>这才是工程代码真实的传播方式。没有天才，只有传递。</p>
<h2>时间线</h2>
<p>把上面这些东西按年份摆一遍：</p>
<div class="g-tablewrap"><table><thead><tr><th>年份</th><th>事件</th></tr></thead><tbody><tr><td>1962</td><td>Mitchell 发表用二进制对数做乘除法的论文</td></tr><tr><td>1985</td><td>Ardent Computer 成立，做 Titan 图形小型机</td></tr><tr><td>1980 年代末</td><td>Greg Walsh 在 Ardent 写出这段实现，与 Cleve Moler 讨论过</td></tr><tr><td>1991</td><td>SGI Indigo 上市，Gary Tarolli 在项目中大量使用并调整常数</td></tr><tr><td>1994 前后</td><td>Tarolli 把代码带到 3dfx</td></tr><tr><td>1997</td><td>Jim Blinn 在 IEEE CG&amp;A 专栏发表《Floating-Point Tricks》</td></tr><tr><td>1999</td><td>12 月 2 日，Quake III Arena 发售，代码进 q_math.c</td></tr><tr><td>2002—2003</td><td>这段代码出现在 Usenet 和 gamedev.net，开始有人追问</td></tr><tr><td>2003</td><td>2 月，Chris Lomont 发表 12 页分析，提出 0x5f375a86</td></tr><tr><td>2005</td><td>8 月 19 日，id Tech 3 源码以 GPLv2 公开，5.6MB</td></tr><tr><td>2007</td><td>Charles McEniry 写出更完整的数学分析</td></tr><tr><td>2011 前后</td><td>Rys Sommefeldt 在 Beyond3D 完成溯源，确认 Greg Walsh</td></tr><tr><td>2012</td><td>Matthew Robertson 给出更精确的 64 位常数</td></tr><tr><td>2018</td><td>Moroz 等五人在 Applied Mathematics and Computation 发表严格分析</td></tr><tr><td>2021</td><td>Walczyk 等人改进牛顿系数，误差再降 2.7 倍</td></tr><tr><td>2021</td><td>同一批人做出微控制器上的立方根版本</td></tr></tbody></table></div>
<p>六十年，从一篇 NCR 公司的论文，到一个游戏引擎里的一个问号。</p>
<h2>三个条件</h2>
<p>这个技巧能在 Quake 3 里爆发，是因为三个条件同时成立。</p>
<p><strong>问题足够高频。</strong> 一帧几万次，一秒几百万次。如果只是偶尔算一次，调库函数就好，优化的收益盖不住写错的成本。</p>
<p><strong>精度要求足够松。</strong> 人眼分辨不出 0.18% 的光照差异。换成金融清算、轨道力学、医学影像，这个误差没人敢收。</p>
<p><strong>硬件足够慢。</strong> 如果 CPU 有一条周期的 rsqrt，整套技巧就没有存在必要。</p>
<p>三个条件在 1999 年同时成立。</p>
<p>到了 2005 年，第三个条件破了，SSE 普及。到了 2015 年，第一个条件也变了，GPU 接管了绝大部分顶点和像素计算，CPU 上跑的 rsqrt 越来越少。</p>
<p>所以这段代码有一个很窄的窗口，大约十五年。</p>
<p>这也解释了一个现象：后来的游戏引擎不再写这种东西，它们直接调硬件指令。技巧没有失传，它被搬进了硅里，换了个地方活着。</p>
<p>窗口关上之后，代码还在。这就是所有经典代码的命运：它的价值从「能用」转成「能读」。</p>
<h2>1999 年，它先进在哪</h2>
<p>先说一句容易说错的话。</p>
<p>这段代码的先进之处不在「快」，在「便宜」。</p>
<p>快是相对的，1999 年快，今天不快。便宜是结构性的：它把一次浮点开方加一次浮点除法，换成了七次整数或浮点加减乘。前者要走除法器，一百多个周期；后者全在流水线上，十几个周期。</p>
<div class="g-tablewrap"><table><thead><tr><th>方法</th><th>周期（Pentium II/III 估算）</th><th>最大相对误差</th><th>依赖</th></tr></thead><tbody><tr><td><code>1.0f / sqrtf(x)</code></td><td>约 107</td><td>精确到 1 ulp</td><td>x87</td></tr><tr><td>查表 + 一次迭代</td><td>约 20—30</td><td>可控</td><td>几 KB 查找表，占缓存</td></tr><tr><td><code>Q_rsqrt</code> 一次迭代</td><td>约 10—15</td><td>0.175%</td><td>无</td></tr><tr><td><code>Q_rsqrt</code> 只用初值</td><td>约 5</td><td>3.44%</td><td>无</td></tr><tr><td><code>rsqrtss</code></td><td>约 2</td><td>0.037%（12 位）</td><td>Pentium III 及以上</td></tr></tbody></table></div>
<p>表里最后一行最扎眼：硬件指令又快又准，1999 年就有了。</p>
<p>那为什么还要自己写？</p>
<p>因为 Quake 3 的系统需求写着 Pentium II 233MHz。这个「II」是关键。Pentium III 在 1999 年 1 月发布，Quake 3 在 12 月发售，中间隔了十一个月。十一个月里，Pentium III 的装机量接近于零。买得起它的人，显卡大概是 Voodoo 2 或者 TNT2，正在玩《半条命》。</p>
<p>绝大多数玩家的机器是 Pentium II、赛扬 A、K6-2。这些 CPU 上没有 <code>rsqrtss</code>。</p>
<p>而且就算有，你也得为它单独写一条代码路径，运行时检测 CPU 特性，再跳转。Quake 3 的代码里确实有 SIMD 分支（3DNow!、SSE），但那些是给特定模块用的，主体数学库还是这段 C。</p>
<p>所以 1999 年的现实是：一段纯 C、不依赖任何扩展、能在任何 32 位机器上编译、五个周期出初值的代码，比一条需要新 CPU 的指令更有价值。</p>
<p>这是工程判断，跟技术水平无关。</p>
<p>还有一层，「够用」的边界画得很准。</p>
<p>0.175% 的误差，在 8 位色深的显示器上是 0.4% 一个色阶。差半个色阶，人眼看不出来。而如果为了这半个色阶去跑第二次牛顿迭代，多花五到十个周期，帧率掉一档。</p>
<p>这个判断需要知道两件事：误差会怎么传（法线 → 点积 → 光照 → 像素），人眼能分辨多少（8 位色深，0.4%）。两件事都知道，才敢删掉第二次迭代。</p>
<h2>今天为什么不能直接抄</h2>
<p>2010 年以后，这段代码在 64 位机器上基本是坏的。</p>
<p>三个原因。</p>
<p>第一个，<code>long</code> 变长了。Windows 是 LLP64 模型，<code>long</code> 还是 4 字节，能用。Linux 和 macOS 是 LP64，<code>long</code> 是 8 字节。<code>*(long*)&amp;y</code> 会读八个字节，把 y 后面四个字节也吃进去。编译器不一定报错，运行时给你一个垃圾值。</p>
<p>第二个，严格别名。C 标准说，通过不同类型的指针访问同一块内存是未定义行为。GCC 从 3.x 开始默认开启 <code>-fstrict-aliasing</code>，理论上可以把这段代码优化成任何东西。实践中因为写回发生在解引用之后，编译器通常不敢乱动，但这是运气。标准没给你任何保证。</p>
<p>第三个，编译器变聪明了。开 <code>-ffast-math</code> 之后，现代 clang 和 GCC 会直接把你写的 <code>1.0f / sqrtf(x)</code> 换成 <code>vrsqrtss</code> 加三次乘法。你手写这段，反而比编译器生成的慢。</p>
<p>正确的现代写法长这样：</p>
<pre><code>#include &lt;stdint.h&gt;
#include &lt;string.h&gt;
float inv_sqrt(float x) {
    float x2 = x * 0.5f;
    uint32_t i;
    memcpy(&amp;i, &amp;x, sizeof i);      /* 类型双关，合法 */
    i = 0x5f3759dfu - (i &gt;&gt; 1);
    memcpy(&amp;x, &amp;i, sizeof i);
    return x * (1.5f - x2 * x * x);  /* 一次牛顿迭代 */
}</code></pre>
<p><code>memcpy</code> 在编译期会被优化成一条寄存器移动，没有函数调用开销。C++20 有 <code>std::bit_cast</code>，更干净。</p>
<p>但即使这样改完，在现代 x86 上它还是比 <code>_mm_rsqrt_ss</code> 慢两到三倍。这段代码的实用价值，在 2000 年代中期就已经交出去了。</p>
<p>它还有一个从来没解决的老问题：只对正数有效。</p>
<p>输入 0，<code>0x5f3759df - (0 &gt;&gt; 1)</code> 得到 0x5f3759df，转回浮点是 1.6×10¹⁹，牛顿迭代一次之后还是巨大。输入负数，符号位进到整数里，右移是算术右移，结果完全是垃圾，返回 NaN。</p>
<p>原版没有做任何检查。<code>VectorNormalizeFast</code> 的注释里写着「不检查长度是否为 0」。零向量进来，出来的是 NaN，然后这个 NaN 会传进光照计算，最后在屏幕上变成一块黑或者一块白。</p>
<p>这是「够用」的另一面：它连边界都不管。</p>
<h2>它还有用吗</h2>
<p>有，在两个地方。</p>
<p>第一个是没有 FPU 的微控制器。</p>
<p>ARM Cortex-M0 和 M0+ 不带硬件浮点，浮点运算靠软件模拟。一次 <code>1.0f/sqrtf(x)</code> 在 M0 上要几百个周期。而这段代码只要整数移位、整数减法、三次整数乘加，在 48MHz 的 M0 上大约 30 到 50 个周期。</p>
<p>一个数量级的差距。</p>
<p>2021 年 Moroz 那批人做的立方根版本，目标平台就是微控制器。他们干这个跟怀旧无关，是因为真的有人在用 8 位和 32 位单片机做电机控制、做传感器融合，那里每一微秒都算钱。</p>
<p>第二个是教学。</p>
<p>把这段代码拆开讲一遍，等于把 IEEE 754、对数、牛顿法、误差分析、浮点精度、编译器优化全串起来了。CMU 的 15-213、伯克利的 CS61C、国内很多计算机系统课，都拿它当案例。</p>
<p>一个案例能覆盖六七个知识点，这种材料不多。</p>
<h2>它的边界</h2>
<p>前面说了它怎么工作。这一节说它什么时候不工作。</p>
<p><strong>输入必须是正数。</strong> 零会得到巨大的数，负数会得到 NaN。原版没有检查，靠调用者自己保证。在渲染循环里，这倚仗的是「向量长度不可能为零」这个前提。前提一破，屏幕上就是黑洞或者白斑。</p>
<p><strong>只对 32 位 IEEE 754 有效。</strong> 换 double、换 fp16、换 bfloat16，常数全要重算。1990 年代有些机器用非 IEEE 的浮点格式，那段代码在那些机器上是垃圾。</p>
<p><strong>精度有天花板。</strong> 一次迭代 0.18%，两次 0.0005%。想要 1 ulp 的精度（和 <code>1.0f/sqrtf(x)</code> 完全一致），得迭代三次，那还不如直接调库函数。</p>
<p><strong>long 必须是 4 字节。</strong> 这个前提在 2010 年代之后大面积失效。LP64 平台上，这段代码要么崩，要么算出垃圾。</p>
<p><strong>它有未定义行为。</strong> 严格别名那条规则，编译器有权不认账。今天能跑，换个编译器版本可能就不跑。</p>
<p><strong>它比硬件慢。</strong> 有 SSE 之后一直如此。今天在 x86 上，它比 <code>rsqrtss</code> 慢两到三倍。</p>
<p>六条，一条比一条致命。所以它在 2026 年的位置很清楚：一段该被读、被拆、被讲的代码，一段只在没有 FPU 的微控制器上还值得抄的代码。</p>
<h2>它美在哪</h2>
<p>这一段是你要的。我尽量说得实一点，不抒情。</p>
<p>它的美可以拆成三层，每层都对应一个学科。</p>
<p>第一层，表示层。</p>
<p>IEEE 754 把指数放在高位、尾数放在低位，本意是让浮点数的比较可以用整数比较来做。副作用是，这 32 位整体读出来，约等于这个数的以 2 为底的对数。</p>
<p>这个副作用没有被设计，它是长出来的。当年定标准的人没想过有人会这么用。而这段代码的全部力量，来自它发现了这个副作用，并且把它当成主功能用。</p>
<p>第二层，代数层。</p>
<p>在对数域里，开平方是除以 2，取倒数是取负。这两个操作搬到整数域，就是右移一位和用常数减。</p>
<p>三行 C 代码，完成了一次「域变换」。它先把问题搬到一个运算更便宜的空间里，在那里解决，再搬回来。</p>
<p>这个手法在数学里很老（傅里叶变换、拉普拉斯变换都是干这个的），但在系统编程里，它通常需要几百行代码和一堆复数。这里只用了三个操作符。</p>
<p>第三层，数值层。</p>
<p>初值误差 3.4%，不够。加一次牛顿迭代，误差平方，掉到 0.18%。够了，停。</p>
<p>这一层的美在于「停」。它知道什么时候该停。多迭代一次能到 0.0005%，但没人需要 0.0005%。在一段被调用几百万次的代码里，多余的精度就是浪费的帧。</p>
<p>三层叠起来，三行代码跨了计算机体系结构、数学、数值分析三个领域。而且每一层都必需，少一层就跑不起来。</p>
<p>可这些加起来，都比不上它最有名的那一处。</p>
<p>它最有名的地方，是末尾那半行没解释的注释。</p>
<p>0x5f3759df 后面本来挂着一句注释。那句话什么也没有解释，只是在问：这一行到底在干什么。</p>
<p>这说明写下它的人，在 1999 年，只知道这行代码能跑，不知道它为什么能跑。他把它留在那里，没有删掉，没有改成一句正经注释。</p>
<p>这是一种很罕见的状态：一个工程师承认自己不完全理解自己写下的东西，但依然把它用在了一个要卖几百万份的产品里。</p>
<p>后来的所有分析，Lomont 的 12 页，Moroz 他们的期刊论文，六十年的数学，都在替这一个问号做注脚。</p>
<p>还有一件事。</p>
<p>这段代码不完美。0x5f3759df 算不上最优常数，0x5f375a86 才是。后者在 2003 年就被算出来了，比原版好万分之六。</p>
<p>但「不完美」恰恰是它可信的地方。如果它是 0x5f375a86，那它一定是算出来的，一定有论文，一定有作者署名。可它是 0x5f3759df，一个在最优解旁边偏了一点点的数，一个只能靠手感和试错摸到的数。</p>
<p>一个人，在 1980 年代末，没有 Mathematica，没有暴力搜索，没有误差函数，把一个常数调到了距离理论最优万分之几的地方。</p>
<p>这件事比「数学上最优」更让人信服。因为它证明了工程直觉在某种情况下能逼近数学结论。</p>
<h2>这段代码能教什么</h2>
<p>把它当教材，能讲五件事，每一件都比「0x5f3759df 是什么」更重要。</p>
<p><strong>一，表示即算法。</strong></p>
<p>一个数的存储格式，决定了你能对它做什么运算。IEEE 754 把对数编码进了位模式，于是「取对数」这个操作的成本变成零。换一种表示，同一个问题可能便宜一百倍。</p>
<p>这件事在别处也成立。数据库把行存改成列存，聚合查询快十倍。图像把 RGB 转成 YUV，压缩率上一个台阶。稀疏矩阵把零跳过去存，乘法从 O(n³) 掉到 O(nnz)。</p>
<p>选表示，比选算法更值钱。</p>
<p><strong>二，近似加一步修正，能打赢精确计算。</strong></p>
<p>3.4% 的初值加一次迭代得到 0.18%，成本十几个周期。精确计算一百多个周期。</p>
<p>这个结构在数值计算里到处都是：查表加插值、粗网格加局部细化、预训练加微调、草图加精修。先要一个粗糙的方向，再往正确的地方推一步。比一步到位便宜得多。</p>
<p><strong>三，常数能承载信息。</strong></p>
<p>0x5f3759df 里每一位都对应浮点格式里的一个位置，它的偏差对应着对数曲线的弯曲程度。一个十六进制常数，是一整套推导压出来的。</p>
<p>把结论压进常数，这个做法在密码学（S 盒）、图形学（色彩矩阵）、编译器（哈希种子）里都有。</p>
<p><strong>四，边界条件得自己守。</strong></p>
<p>原版不检查零，不检查负数，不检查 <code>long</code> 的宽度。它把责任推给调用者。这在 1999 年的游戏引擎里是合理交易，在任何公共库里都是灾难。</p>
<p>同一段代码，放在不同位置，标准不一样。</p>
<p><strong>五，承认不懂也是一种注释。</strong></p>
<p>那一行末尾的疑问，比一整页推导更能说明这段代码的性质：它是对的，但没人完全知道为什么。</p>
<p>原注释本来可以写得更体面。写下它的人选择留下实话。好的注释不总是解释，有时候是承认。</p>
<h2>硬件里也是同一套</h2>
<p>现代 GPU 的 rsqrt 是一条指令。它内部怎么做的？</p>
<p>公开资料不多，但 ISA 文档和逆向分析给出的图像一致：一张小查找表，加一个多项式修正，再加一次牛顿迭代。</p>
<p>Intel 的 SSE <code>rsqrtss</code> 是 12 位精度，实现是一张压缩过的查找表，用尾数高位索引，低几位做修正。AMD 早期的 3DNow! <code>pfrsqrt</code> 也是查表，精度类似。</p>
<p>GPU 上更彻底。整条指令延迟四到八个周期，吞吐一到两个周期一条。精度在半精度模式下更松，在双精度模式下要走慢路径。</p>
<p>也就是说，硬件做的这件事，和这段 1999 年的 C 代码在结构上一致：<strong>先用最便宜的方式给一个粗糙初值，再用一次修正推到够用。</strong></p>
<p>区别只在介质。软件用整数移位和减法，硬件用 ROM 表和修正电路。</p>
<p>这也解释了这段代码为什么死了：它做的那件事，被做进了硅里。同一个算法，从指令变成了晶体管。</p>
<h2>它现在在你身边的哪些地方</h2>
<p>前面讲的是它怎么来的。这一节换个方向，说它现在还在哪些地方跑。</p>
<p>不讲算法，讲你碰得到的东西。</p>
<h3>一、你打游戏时看见的每一块光</h3>
<p>一帧画面里有几万个三角形。每个三角形带三个顶点，每个顶点带一根法线。</p>
<p>法线是三个数。要把它削成单位长度，先算长度：三个数各自平方，加起来，开根号。再用三个数各除以这个长度。</p>
<p>换一种写法，就是三个数各乘一次 1/√(x²+y²+z²)。</p>
<p>《Quake 3》里的 <code>VectorNormalizeFast</code> 干的就是这件事。它把 <code>sqrt</code> 换掉，一行调用，省下十几个周期。</p>
<p>今天的显卡把这一步做进了硬件。一条 <code>rsqrt.approx.f32</code>，四个周期出结果，一条能同时算 128 个数。</p>
<p>数一下量：1080p 一帧约 207 万像素，一秒 60 帧，一秒 1.24 亿个像素的光照计算。顶点法线是每个顶点都要过一遍。</p>
<h3>二、手机地图转一个角度</h3>
<p>你在手机上用两根手指把地图转过来，再往下压一点，楼就立起来了，成 45 度角。</p>
<p>这一下，手机做了两件事。</p>
<p>一件是把每栋楼的朝向算成单位向量。</p>
<p>另一件是把陀螺仪和加速度计读出的三个数归一化，判断手机现在是横着、竖着、还是斜着。</p>
<p>两件事都是 1/√x。手机芯片里有专门的指令，ARM 的 NEON 上叫 <code>vrsqrte</code>，一条指令同时算四个数。</p>
<h3>三、AI 说话的时候</h3>
<p>一句话生成到一半，模型内部要算一次「注意力」：现在这个字，该回头看前面哪几个字。</p>
<p>算法是把每个字的向量跟别的字的向量点乘，再除以 √d。d 是向量的维度，常见是 64，√64 等于 8。</p>
<p>为什么除：不除，点乘的结果会随着维度变大而膨胀，进 softmax 一饱和，梯度就没了，模型训练不动。</p>
<p>再往下，每一层还有归一化。老版本用 LayerNorm，除以标准差，标准差就是 √方差。新版本用 RMSNorm，更省，只除 √(平均平方)。</p>
<p>落到具体数：平均平方是 0.0004，开根号是 0.02，这一层的输出整体除 0.02。这一步一亿次，就得一亿次开方。</p>
<p>还有优化器。Adam 每一步要算 v/(√v̂ + ε)，分母又是一个开根号。</p>
<p>自己不写代码也没关系。在 CPU 上跑推理，编译器加一个 <code>-ffast-math</code>，就会自动把这些地方换成近似指令。</p>
<p>数一下量：一个 7B 参数的模型，32 层，输入 4096 个 token，一次前向传播大约 10 亿次平方根倒数。训练还要反向，再翻几倍。</p>
<h3>四、照片比对、以图搜图、给你推视频</h3>
<p>一张脸在机器眼里是一串数，512 个，或者 128 个。</p>
<p>判断两张脸像不像，算的是这两串数之间的夹角。夹角越小越像。这个数叫余弦相似度。</p>
<p>余弦相似度 = 点乘 ÷（长度 × 长度）。两个长度各要一次开方。</p>
<p>「以图搜图」、短视频推荐、指纹比对、声纹解锁、论文查重，用的都是这一套。</p>
<p>数一下量：一个向量库要在十亿条里找最像的十条，就得算十亿次余弦相似度。</p>
<p>所以工业界的向量库都做了一件事：入库时先把每条向量归一化好，查询时只算点乘。开方从十亿次降到十万次。</p>
<p>这是这段代码的思路挪了个地方：能提前算的，别在现场算。</p>
<h3>五、声音</h3>
<p>手机开免提，对方的声音忽大忽小。设备会自动把音量调平。</p>
<p>调平的依据是这一段声音的「均方根」：每个采样点平方，取平均，开根号。</p>
<p>要把它抬到目标音量，就得乘一个 1/√(平均平方)。</p>
<p>降噪耳机、会议软件的自动增益、录音软件的电平表、视频网站的响度统一，都在算这个。</p>
<p>3D 游戏里的声音还有一层：离你越远越轻，强度按距离的平方衰减，也就是 1/r²。算这个衰减系数，又是一次开方。</p>
<p>你听到的「音量稳定」，背后是一次又一次开根号。</p>
<h3>六、算相关性、算风险</h3>
<p>两个变量有多相关，算的是皮尔逊相关系数。分母是两个标准差的乘积，标准差就是 √方差。</p>
<p>金融里衡量一只基金值不值，用夏普比率：收益 ÷ 波动率。波动率是收益率的标准差，又是一个开根号。</p>
<p>推荐系统里判断两个用户口味像不像，用的是同一套。</p>
<p>这些计算今天在几千万行的表上跑，开方是里面最便宜也最常见的一步。</p>
<h3>七、物理引擎：绳子、布、爆炸</h3>
<p>游戏里的绳子会甩，布料会皱，爆炸的碎片会四散。</p>
<p>物理引擎每一步做的事，是把所有约束的方向摆正：绳子这一端往哪拉，两个物体撞上的那个面朝哪，两个粒子之间往哪个方向排斥。</p>
<p>方向要归一化，归一化要 1/√x。</p>
<p>一秒钟 60 步，一步几千个约束。一个稍微像样的场景，一秒几十万次。</p>
<h3>八、定位</h3>
<p>GPS 解位置，本质是解一组方程：每颗卫星给一个距离，四个未知数。</p>
<p>解法是最小二乘。里面要把方向向量归一化，不然误差会放大。</p>
<p>手机里的惯性导航，把加速度积分成位移之前，得先知道手机的姿态。姿态矩阵要正交化，正交化又是一次归一化。</p>
<h3>这八件事的共同点</h3>
<p>摆在一起看，会发现它们要的都不是「一个平方根倒数」。</p>
<p>它们要的是同一句话：先把手上的东西变成标准长度，再拿去做比较、做叠加、做投影。</p>
<p>这个动作在图形学里叫归一化，在统计里叫标准化，在机器学习里叫归一，在物理里叫单位化。名字不一样，数学上是同一件事。</p>
<p>而只要你要标准化，就要除以一个长度。长度是开方来的。所以就要 1/√x。</p>
<p>这就是它没死的原因。它服务的那个动作，是所有定量学科的公共动作。</p>
<p>换了一件衣服。从整数位运算变成了硬件指令，从 C 代码变成了 PTX。但那个形式没变：归一化需要 1/√x，而 1/√x 值得用最便宜的方式算。</p>
<p>这才是这段代码真正的遗产。那十行倒在其次，要紧的是那个判断。</p>
<h2>十行代码的余生</h2>
<p>Quake 3 之后，这段代码没有消失，它散开了。</p>
<p>id 自己的下一个引擎 idTech4（《Doom 3》，2004 年）里有一个 <code>idMath::InvSqrt</code>，思路一样，写法收敛成了 C++ 类方法。引擎从 C 走到 C++，这个技巧跟着走。</p>
<p>2005 年源码以 GPL 放开之后，ioquake3 项目接手维护。他们做的第一件事之一，就是把 <code>long</code> 改成 <code>int</code>，让它在 64 位机器上能编译。这一步改完，那段代码在新机器上才重新变成「能跑的代码」，在那之前它是一段随时会崩的代码。</p>
<p>再往后，它跟着 Quake 3 的源码进了无数个地方：衍生引擎、图形学课程、CTF 逆向题、面试题、技术博客。有人在 T 恤上印 0x5f3759df，有人把它纹在手臂上。</p>
<p>一个常数能有这种待遇，原因不在它有多难。原因在它有多「刚好」：一行看不懂的代码，一个解释不清的常数，一个没人回答的疑问，一段能跑的程序。四个东西凑在一起，正好是一个可以反复讲的故事。</p>
<p>它成了一个样本。讲浮点数的人拿它当例子，讲编译器优化的人拿它当例子，讲开源考古的人拿它当例子。同一段十行代码，被四个领域各自认领了一遍。</p>
<h2>那个数</h2>
<p>最后回到数字本身。</p>
<p>0x5f3759df 只对一个 32 位的、符合 IEEE 754 格式的、正的单精度浮点数有效。</p>
<p>换成双精度，它得重算。换成 bfloat16、fp16、tf32，它得重算。换成 1990 年代那些不遵守 IEEE 标准的浮点格式，它直接失效。</p>
<p>它是历史在一个特定硬件上凝固下来的形状——只对那一代机器有效。</p>
<p>换一台机器，这个数就得重算。</p>
<p>而那一句「这到底在干什么」，换一代人也还在问。</p>
<h2>附一：原始代码，逐行</h2>
<details>
<summary>附：Q_rsqrt 全部八行</summary>
<div style="padding:2px 0 6px">
<pre><code>float Q_rsqrt( float number )
{
	long i;                                  // 32 位整数，用来装浮点数的比特
	float x2, y;
	const float threehalfs = 1.5F;           // 牛顿迭代里的 3/2
	x2 = number * 0.5F;                      // 预先算好 x/2
	y  = number;
	i  = * ( long * ) &amp;y;                    // 类型双关：把 float 的 32 位当整数读
	i  = 0x5f3759df - ( i &gt;&gt; 1 );            // 右移一位（除以 2），再用魔数减（取负并校准）
	y  = * ( float * ) &amp;i;                    // 再读回浮点
	y  = y * ( threehalfs - ( x2 * y * y ) );// 一次牛顿迭代
	return y;
}</code></pre>
<p style="font-size:13.5px;color:rgba(200,195,215,.7);margin-top:8px">原始代码里还有三层条件编译：<code>#if !idppc</code> 包住整个函数（PowerPC 用 AltiVec 的 <code>vec_rsqrte</code>），<code>#ifndef Q3_VM</code> 和 <code>#ifdef __linux__</code> 包住一句 <code>assert(!isnan(y))</code>。也就是说，只有在 Linux 上编译游戏本体时，才会检查结果是不是 NaN。</p>
</div>
</details>
<h2>附二：推导全过程</h2>
<details>
<summary>附表：从 IEEE 754 到 0x5f3759df，六步</summary>
<div style="padding:2px 0 6px">
<div class="g-tablewrap" style="overflow-x:auto;margin:1.2em 0">
<table style="font-size:13.5px;width:100%;min-width:620px;border-collapse:collapse">
<thead><tr><th style="text-align:left">步骤</th><th style="text-align:left">式子</th><th style="text-align:left">说明</th></tr></thead>
<tbody>
<tr><td>1</td><td>x = 2<sup>e</sup>(1+m)</td><td>浮点数的二进制科学计数法，m ∈ [0,1)</td></tr>
<tr><td>2</td><td>I = 2<sup>23</sup>(e+127+m)</td><td>把 32 位整体当整数读</td></tr>
<tr><td>3</td><td>log₂(1+m) ≈ m + σ</td><td>对数曲线的线性替代，σ ≈ 0.04505</td></tr>
<tr><td>4</td><td>I ≈ 2<sup>23</sup>(log₂x + 127 − σ)</td><td>步骤 2、3 合并，得到「位即对数」</td></tr>
<tr><td>5</td><td>I<sub>y</sub> ≈ −I<sub>x</sub>/2 + 2<sup>23</sup>(190.5 − 1.5σ)</td><td>代入 log₂y = −0.5·log₂x</td></tr>
<tr><td>6</td><td>0x5f400000 − 0x8a621 = 0x5f3759df</td><td>2<sup>23</sup>×190.5 = 0x5f400000，1.5σ×2<sup>23</sup> = 0x8a621</td></tr>
</tbody>
</table>
</div>
<p style="font-size:13.5px;color:rgba(200,195,215,.7);margin-top:8px">其中 190.5 = 1.5 × 127。这个 1.5 来自「先剥掉一次指数偏移，再加回一次完整的」，有出处。</p>
</div>
</details>
<h2>附三：误差实测与后续改进</h2>
<details>
<summary>附表：三组常数、四种方法</summary>
<div style="padding:2px 0 6px">
<div class="g-tablewrap" style="overflow-x:auto;margin:1.2em 0">
<table style="font-size:13.5px;width:100%;min-width:680px;border-collapse:collapse">
<thead><tr><th style="text-align:left">方法</th><th style="text-align:left">常数</th><th style="text-align:left">一次迭代</th><th style="text-align:left">两次迭代</th></tr></thead>
<tbody>
<tr><td>Quake 3 原版</td><td>0x5f3759df</td><td>0.175228%</td><td>4.66×10⁻⁴%</td></tr>
<tr><td>Lomont 初值最优</td><td>0x5f37642f</td><td>0.1775854%</td><td>4.775×10⁻⁴%</td></tr>
<tr><td>Lomont 迭代后最优</td><td>0x5f375a86</td><td>0.175124%</td><td>4.654×10⁻⁴%</td></tr>
<tr><td>Walczyk 等 2021</td><td>0x5f200000 + 调系数</td><td>0.065%</td><td>3.17×10⁻⁵%</td></tr>
<tr><td>SSE rsqrtss</td><td>硬件</td><td>0.037%</td><td>—</td></tr>
</tbody>
</table>
</div>
<p style="font-size:13.5px;color:rgba(200,195,215,.7);margin-top:8px">前四行的数据出自 Lomont 2003 与 Walczyk、Moroz、Cieśliński 2021，全浮点范围暴力测试。第五行是 Intel 手册给出的保证：|相对误差| ≤ 1.5 × 2⁻¹²。</p>
</div>
</details>
<h2>附四：相关视频</h2>
<p>下面四个视频，播放量都核过。第一个是中文里讲得最完整的一版，第二个补 IEEE 754 的基础，第三个偏历史，第四个是逐行拆解。</p>
<div role="button" tabindex="0" data-bvid="BV18j411i7bp" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.6em 0;background:#15151a;border-radius:12px;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV18j411i7bp&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.45);display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.92);font-size:13.5px;max-width:82%;text-align:center;line-height:1.5">什么代码让程序员之神感叹「卧槽」？改变游戏行业的平方根倒数算法</span><span style="color:rgba(255,255,255,.45);font-size:12px">量子位 · 133.5 万播放</span></div></div>
<div role="button" tabindex="0" data-bvid="BV1UP4y1R7bB" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.6em 0;background:#15151a;border-radius:12px;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1UP4y1R7bB&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.45);display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.92);font-size:13.5px;max-width:82%;text-align:center;line-height:1.5">IEEE 754 单精度浮点数的转换，32 位浮点数</span><span style="color:rgba(255,255,255,.45);font-size:12px">卿青娥 · 18.9 万播放</span></div></div>
<div role="button" tabindex="0" data-bvid="BV12i421D7VX" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.6em 0;background:#15151a;border-radius:12px;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV12i421D7VX&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.45);display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.92);font-size:13.5px;max-width:82%;text-align:center;line-height:1.5">太神奇了！0x5f3759df 是何方神圣？如何彻底改变了游戏行业？</span><span style="color:rgba(255,255,255,.45);font-size:12px">Ph-D-Vlog · 9.7 万播放</span></div></div>
<div role="button" tabindex="0" data-bvid="BV1WcvpB9E3v" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.6em 0;background:#15151a;border-radius:12px;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1WcvpB9E3v&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.45);display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.92);font-size:13.5px;max-width:82%;text-align:center;line-height:1.5">一行代码，比 sqrt 还快！0x5f3759df 到底怎么做到的？</span><span style="color:rgba(255,255,255,.45);font-size:12px">二次元的麦斯 · 3.2 万播放</span></div></div>
<h2 id="refs">参考</h2>
<ul class="pg-refs">
<li>id Software，《Quake III Arena》源码，<code>code/game/q_math.c</code>，1999。GPLv2 发布于 2005 年 8 月 19 日。<a href="https://github.com/id-Software/Quake-III-Arena" target="_blank" rel="noopener">github.com/id-Software/Quake-III-Arena</a></li>
<li>Chris Lomont，《Fast Inverse Square Root》，普渡大学技术报告，2003 年 2 月。<a href="https://www.lomont.org/papers/2003/InvSqrt.pdf" target="_blank" rel="noopener">lomont.org/papers/2003/InvSqrt.pdf</a></li>
<li>John N. Mitchell，《Computer Multiplication and Division Using Binary Logarithms》，IRE Transactions on Electronic Computers，第 11 卷第 4 期，512–517 页，1962 年 8 月。</li>
<li>Jim Blinn，《Floating-Point Tricks》，IEEE Computer Graphics and Applications，第 17 卷第 4 期，80–84 页，1997 年。</li>
<li>Leonid V. Moroz、Cezary J. Walczyk、Andriy Hrynchyshyn、Vijay Holimath、Jan L. Cieśliński，《Fast calculation of inverse square root with the use of magic constant — analytical approach》，Applied Mathematics and Computation，第 316 卷，245–255 页，2018 年。<a href="https://doi.org/10.1016/j.amc.2017.08.025" target="_blank" rel="noopener">doi.org/10.1016/j.amc.2017.08.025</a></li>
<li>Cezary J. Walczyk、Leonid V. Moroz、Jan L. Cieśliński，《Improving the accuracy of the fast inverse square root algorithm》，arXiv:1802.06302，2018 年。<a href="https://arxiv.org/abs/1802.06302" target="_blank" rel="noopener">arxiv.org/abs/1802.06302</a></li>
<li>Charles McEniry，《The Mathematics Behind the Fast Inverse Square Root Function Code》，2007 年。</li>
<li>Rys Sommefeldt 在 Beyond3D 论坛关于 fast inverse square root 起源的两次追踪，含 Carmack、Mathisen、Tarolli、Walsh 的邮件往来。</li>
<li>Henry S. Warren，《Hacker's Delight》第二版，Addison-Wesley，2012 年。</li>
<li>Intel，《Intel 64 and IA-32 Architectures Software Developer's Manual》，RCPPS / RSQRTPS / RSQRTSS 条目。</li>
<li>Matthew Robertson 关于 64 位双精度魔数的计算，2012 年。</li>
<li>Jan Kadlec 关于调整牛顿迭代系数的实验，2010 年。</li>
<li>Wikipedia，《Fast inverse square root》与《Id Tech 3》条目。</li>
<li>科学空间，《Mitchell 近似：乘法变为加法，误差不超过 1/9》，2020 年。<a href="https://kexue.fm/archives/7991" target="_blank" rel="noopener">kexue.fm/archives/7991</a></li>
<li>Matrix67，《旧闻一则：神秘的 0x5f3759df 不可思议的 Quake III 源码》。<a href="http://www.matrix67.com/blog/archives/362" target="_blank" rel="noopener">matrix67.com/blog/archives/362</a></li>
</ul>
