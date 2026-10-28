// 用法：node _cdp_eval.js <url> <js表达式> [waitMs]
const { spawn } = require("child_process");
const url = process.argv[2];
const expr = process.argv[3];
const wait = parseInt(process.argv[4] || "4500", 10);
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const PORT = 9600 + Math.floor(Math.random() * 300);
const proc = spawn(EDGE, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-sandbox",
  `--remote-debugging-port=${PORT}`, "--window-size=1440,1000", "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  let tabs = null;
  for (let i = 0; i < 40; i++) {
    try { tabs = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json(); if (tabs.length) break; } catch (e) {}
    await sleep(250);
  }
  const page = tabs.find(t => t.type === "page") || tabs[0];
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let id = 0; const pending = new Map();
  ws.onmessage = (ev) => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); } };
  const send = (method, params = {}) => new Promise(res => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  await new Promise(r => (ws.onopen = r));
  await send("Runtime.enable"); await send("Page.enable");
  await send("Page.navigate", { url });
  await sleep(wait);
  const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
  console.log(JSON.stringify(r.result && r.result.value !== undefined ? r.result.value : r, null, 2));
  ws.close(); proc.kill(); process.exit(0);
})().catch(e => { console.error(e.message); proc.kill(); process.exit(1); });
