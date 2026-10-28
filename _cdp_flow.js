// 交互流程测试：node _cdp_flow.js <url> <outPrefix>
// 走一遍「首页 → 点生活 → 点第一篇 → 点返回」，每步截图 + 打印关键状态
const { spawn } = require("child_process");
const fs = require("fs");

const url = process.argv[2];
const prefix = process.argv[3] || "_flow";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const PORT = 9600 + Math.floor(Math.random() * 300);

const proc = spawn(EDGE, [
  "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-sandbox",
  "--disable-dev-shm-usage", `--remote-debugging-port=${PORT}`,
  "--window-size=1440,1000", "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  let tabs = null;
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json`);
      tabs = await r.json();
      if (tabs.length) break;
    } catch (e) {}
    await sleep(250);
  }
  if (!tabs) throw new Error("browser not ready");
  const page = tabs.find((t) => t.type === "page") || tabs[0];
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); }
  };
  const send = (method, params = {}) => new Promise((res) => {
    const i = ++id; pending.set(i, res);
    ws.send(JSON.stringify({ id: i, method, params }));
  });
  await new Promise((r) => (ws.onopen = r));
  await send("Page.enable");
  await send("Runtime.enable");

  const ev = async (expr) => {
    const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
    return r && r.result ? r.result.value : undefined;
  };
  const shot = async (name) => {
    const s = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(`${prefix}-${name}.png`, Buffer.from(s.data, "base64"));
  };

  await send("Page.navigate", { url });
  await sleep(9000);

  // 1. 首页：点「生活」分类
  const clicked = await ev(`(function(){
    var b = document.querySelector('#g-tabs .g-tab[data-cat="生活"]');
    if (!b) return 'no-tab';
    b.click();
    return 'ok';
  })()`);
  console.log("click 生活:", clicked);
  await sleep(900);
  console.log("after tab  hash:", await ev("location.hash"));
  console.log("after tab  tabs:", await ev("document.querySelector('#g-tabs .g-tab[aria-pressed=true]').getAttribute('data-cat')"));
  await shot("1-life");

  // 2. 滚动一点，再点第一篇
  await ev("window.scrollTo(0, document.querySelector('#g-list').getBoundingClientRect().top + window.scrollY + 120)");
  await sleep(700);
  const yBefore = await ev("Math.round(window.pageYOffset)");
  console.log("y before open:", yBefore);
  const pid = await ev(`(function(){
    var a = document.querySelector('#g-list a[href^="post.html"]');
    if (!a) return '';
    var h = a.getAttribute('href');
    a.click();
    return h;
  })()`);
  console.log("click post:", pid);
  await sleep(1800);
  console.log("src store:", await ev("sessionStorage.getItem('reze-list-src')"));
  console.log("post hash:", await ev("location.hash"));
  console.log("back link:", await ev("(document.querySelector('.g-article a.back')||{}).getAttribute && document.querySelector('.g-article a.back').getAttribute('href')"));
  console.log("back text:", await ev("(document.querySelector('.g-article a.back')||{}).textContent"));
  await shot("2-post");

  // 3. 点返回
  await ev("document.querySelector('.g-article a.back').click()");
  await sleep(1800);
  console.log("back hash:", await ev("location.hash"));
  console.log("back tabs:", await ev("(document.querySelector('#g-tabs .g-tab[aria-pressed=true]')||{}).getAttribute && document.querySelector('#g-tabs .g-tab[aria-pressed=true]').getAttribute('data-cat')"));
  console.log("back y:", await ev("Math.round(window.pageYOffset)"));
  await shot("3-back");

  // 4. 刷新看分类是否还在
  await send("Page.reload");
  await sleep(5000);
  console.log("reload hash:", await ev("location.hash"));
  console.log("reload tabs:", await ev("(document.querySelector('#g-tabs .g-tab[aria-pressed=true]')||{}).getAttribute && document.querySelector('#g-tabs .g-tab[aria-pressed=true]').getAttribute('data-cat')"));
  await shot("4-reload");

  ws.close();
  proc.kill();
  process.exit(0);
}

main().catch((e) => { console.error(e.message); proc.kill(); process.exit(1); });
