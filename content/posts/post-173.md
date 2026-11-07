---
id: "post-173"
title: "深度伪造：眼见不再为实"
date: "2024-11-28"
updated: "2024-11-28"
cat: "技术"
tags: ["AI", "社会", "钱", "技术", "说话"]
cover: ""
pinned: false
excerpt: "一段三秒音频就能换一张脸，防线的位置该往后挪了。"
---

<p>2023 年 4 月，福州。一家科技公司的法人郭先生接到微信视频，屏幕里是他认识的「好友」。</p>
<p>对方说在外地投标，需要 430 万元保证金走一笔公司账，还发来转账截图。</p>
<p>视频里那张脸、那个口型、那句称呼都对得上。他没去查钱到没到账，十分钟里分几笔转了出去。</p>
<p>后来警方通报，视频里的脸是 AI 换的。</p>
<h2>一张脸的制作成本</h2>
<p>2017 年，Reddit 上出现一个叫 deepfakes 的账号，把色情片里的脸换成演员的脸。那时做一段几分钟的视频，要几千帧素材、一块好显卡、几十个小时的训练。</p>
<p>2024 年 1 月，香港。跨国工程公司奥雅纳（Arup）的一名财务职员收到「英国总部 CFO」的短信，被拉进一场多人视频会议。屏幕里坐着四五个人，都是他认识的高管。</p>
<p>会议开得很短，指令很急：机密交易，现在就转。接下来的日子里，他分 15 次把 2 亿港元打进 5 个本地账户。一周后他向总部核实，才知道那场会议里只有他一个是真人。</p>
<p>骗子用的素材全部公开：公司宣传片、高管采访、行业峰会录像。</p>
<p>伪造的门槛从来不在算法，在素材。而素材是我们自己一段一段传上去的。</p>
<a href="https://www.chinadaily.com.cn/a/202408/16/WS66c2c173a31060630b923cad.html" target="_blank" rel="noopener">Deep sham（中国日报，2024-08-16）</a>
<h2>信任是怎么被绕过去的</h2>
<p>人对影像的校验极省力。看一张脸，零点几秒就完成，不经过推理。文字要读，声音要辨，脸几乎不用。</p>
<p>诈骗的设计顺着这条省力的路走。先用「机密」切断核对流程，再用视频会议压住怀疑，最后把 2 亿拆成 15 笔，让每一笔都不至于让人当场停下。</p>
<p>包头警方在通报里提到过一种通用破法：让对方多做几个动作，多回答几个问题。预录的视频撑不住回合制对话。</p>
<p>办案民警这样描述这套技术的成本：</p>
<blockquote><p>通过深度学习特定算法，把目标人物的人脸、表情、声音嫁接进模仿的视频里。成本低、合成速率高、检测鉴别难度大，一般人很难发现伪装痕迹。<br>——常州市公安局民警陈歆怡，央视新闻，2023 年 10 月</p></blockquote>
<p>这段话里最该记住的是最后半句。「一般人很难发现」不在技术的缺陷里，在产品说明书里。</p>
<div role="button" tabindex="0" data-bvid="BV1nH4y1h73U" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.6em 0;background:#15151a;border-radius:12px;cursor:pointer" onclick="var f=document.createElement(&#39;iframe&#39;);f.src=&#39;https://player.bilibili.com/player.html?bvid=BV1nH4y1h73U&amp;page=1&amp;high_quality=1&amp;danmaku=0&amp;autoplay=0&#39;;f.allowFullscreen=true;f.setAttribute(&#39;scrolling&#39;,&#39;no&#39;);f.setAttribute(&#39;frameborder&#39;,&#39;0&#39;);f.style.cssText=&#39;position:absolute;top:0;left:0;width:100%;height:100%;border:0&#39;;this.innerHTML=&#39;&#39;;this.appendChild(f);this.style.background=&#39;#000&#39;;this.style.cursor=&#39;default&#39;;this.onclick=null"><div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;pointer-events:none"><span style="width:54px;height:54px;border-radius:50%;border:1.5px solid rgba(255,255,255,.45);display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;padding-left:4px;box-sizing:border-box">&#9654;</span><span style="color:rgba(255,255,255,.92);font-size:13.5px;max-width:82%;text-align:center;line-height:1.5">反诈民警在春晚现场科普 AI 诈骗</span><span style="color:rgba(255,255,255,.45);font-size:12px">山东卫视 · 146.5 万播放</span></div></div>
<h2>检测这一侧的账</h2>
<p>2019 年，慕尼黑工业大学等机构发布了 FaceForensics++。他们用 1000 段原始视频生成了 180 万帧篡改画面，给检测模型当训练集。</p>
<p>在未压缩的测试集上，最好的模型准确率超过 95%。一旦视频被重新压缩，数字明显往下掉。跨到另一种生成方法上，掉得更狠。</p>
<p>检测器学的是某一种伪造留下的指纹。指纹一换，模型就瞎。这不是工程没做好，是问题本身的结构：判别器永远在追生成器的上一代。</p>
<p>还有基数问题。假设某平台的检测准确率是 99%，每天过一亿条视频，误报就是一百万条。人工复核跟不上，最后只能放宽阈值，把真的也漏掉。</p>
<a href="https://arxiv.org/abs/1901.08971" target="_blank" rel="noopener">FaceForensics++: Learning to Detect Manipulated Facial Images（arXiv，2019）</a>
<p>所以检测适合放在平台侧做批量筛，不适合交给一个人在视频通话里临场判断。</p>
<h2>反面：伪造也做过正经事</h2>
<p>到这儿必须摆一个相反的证据。</p>
<p>深度伪造不是只为骗人长的。影视里给演员去老化、给外语片做口型对齐、给失语者重建声音，用的是同一套技术。语音克隆让渐冻症患者在失去发声能力之后，还能用自己原来的音色说话。这些用途没有受害者。</p>
<p>更强的反驳指向归因。把信任崩塌算在技术上，等于假设从前的人靠「眼见」建立信任。可照片时代有摆拍和修图，电话时代有冒充，熟人社会里有顶替。人从来不是靠像素信任，是靠渠道、机构、可追责的关系。</p>
<p>我认这一半。技术没有制造轻信，它把冒充的成本压到了接近零。过去骗一个人要上门、要演技、要运气；现在要一段三秒音频和一张正面照。</p>
<p>成本变了，防线的位置就得跟着变。防线不该加在「辨真假」上，该加在「换通道」上。</p>
<h2>法规把责任放在了哪</h2>
<p>2023 年 1 月 10 日，《互联网信息服务深度合成管理规定》施行。两年后，配套的标识规则也落地了。</p>
<p>2025 年 9 月 1 日，《人工智能生成合成内容标识办法》施行，要求显式标识（用户看得见的提示）与隐式标识（写进文件元数据的来源信息）同时存在。</p>
<a href="https://www.cac.gov.cn/2025-03/14/c_1743654684782215.htm" target="_blank" rel="noopener">《人工智能生成合成内容标识办法》（国家网信办，2025-03-14）</a>
<p>这套规则能管住愿意标注的人。管不住一开始就打算骗的人，他们会裁剪、转码、录屏，把隐式标识洗掉。</p>
<p>它真正的用处不在事前拦截，在事后追溯：让一段视频有出生证明，让平台和工具厂商留下可查的记录。</p>
<h2>收口</h2>
<p>给家里定一条规矩，一行字就够：任何视频、语音里提出的转账要求，先挂断，用通讯录里的号码回拨。</p>
<p>回拨这个动作不解决深度伪造，它绕开了深度伪造。骗子能伪造脸，伪造不了你手机里存的那个号码。</p>
<p>把这一行写在纸上，贴在冰箱门上。它比任何一款检测软件都先到位。</p>
<h2>参考</h2>
<ul>
<li><a href="https://ysxw.cctv.cn/article.html?item_id=11839984986926591357" target="_blank" rel="noopener">AI 换脸搭配声音合成，「好友」以假乱真骗走钱款（央视新闻，2023-10-30）</a> <span class="src">· 报道</span></li>
<li><a href="https://www.chinadaily.com.cn/a/202408/16/WS66c2c173a31060630b923cad.html" target="_blank" rel="noopener">Deep sham（中国日报，2024-08-16）</a> <span class="src">· 报道</span></li>
<li><a href="https://www.cac.gov.cn/2025-03/14/c_1743654684782215.htm" target="_blank" rel="noopener">关于印发《人工智能生成合成内容标识办法》的通知（国家网信办，2025-03-14）</a> <span class="src">· 政策</span></li>
<li><a href="https://www.cac.gov.cn/2022-12/11/c_1672221949354811.htm" target="_blank" rel="noopener">《互联网信息服务深度合成管理规定》（国家网信办，2022-12-11）</a> <span class="src">· 政策</span></li>
<li><a href="https://arxiv.org/abs/1901.08971" target="_blank" rel="noopener">FaceForensics++: Learning to Detect Manipulated Facial Images（arXiv，2019）</a> <span class="src">· 论文</span></li>
<li><a href="https://www.bilibili.com/video/BV1nH4y1h73U" target="_blank" rel="noopener">反诈民警在春晚现场科普 AI 诈骗（山东卫视）</a> <span class="src">· 视频</span></li>
</ul>
