// 打开页面，等渲染完，检查图片加载情况
const fs = require("fs");
const { spawn } = require("child_process");
const os = require("os");
const path = require("path");

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = 9334;
const [url, expr] = process.argv.slice(2);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const profile = path.join(os.tmpdir(), "edgeprobe-" + Date.now());
  const proc = spawn(EDGE, ["--headless=new", "--disable-gpu", "--hide-scrollbars",
    "--no-first-run", `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    "about:blank"], { stdio: "ignore" });

  let page = null;
  for (let i = 0; i < 40 && !page; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      page = list.find((t) => t.type === "page");
    } catch (e) {}
    if (!page) await sleep(300);
  }
  if (!page) throw new Error("调试端口没起来");

  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();
  const send = (method, params = {}) => new Promise((res, rej) => {
    const mid = ++id;
    pending.set(mid, { res, rej });
    ws.send(JSON.stringify({ id: mid, method, params }));
  });
  await new Promise((r) => (ws.onopen = r));
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) {
      const { res, rej } = pending.get(m.id);
      pending.delete(m.id);
      m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result);
    }
  };

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 1400, height: 1000, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url });
  await sleep(6000);

  const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
  console.log(JSON.stringify(r.result.value, null, 2));
  ws.close();
  proc.kill();
}

main().catch((e) => { console.error("失败:", e.message); process.exit(1); });
