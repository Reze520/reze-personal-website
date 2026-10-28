// 检查页面是否加载了「最新」的 main.js（本地服务器专用）
const fs = require("fs");
const path = require("path");
const target = path.join(__dirname, "assets/js/main.js");
const want = fs.readFileSync(target, "utf8");
// 用 CDP 拉页面里实际执行的源码
const { spawn } = require("child_process");
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const PORT = 9841;
const proc = spawn(EDGE, ["--headless=new","--disable-gpu","--no-sandbox",`--remote-debugging-port=${PORT}`,"about:blank"],{stdio:"ignore"});
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
(async()=>{
  let tabs; for(let i=0;i<40;i++){try{const r=await fetch(`http://127.0.0.1:${PORT}/json`);tabs=await r.json();if(tabs.length)break;}catch(e){} await sleep(250);}
  const page=tabs.find(t=>t.type==="page")||tabs[0];
  const ws=new WebSocket(page.webSocketDebuggerUrl); let id=0; const mp=new Map();
  ws.onmessage=(e)=>{const m=JSON.parse(e.data); if(m.id&&mp.has(m.id)){mp.get(m.id)(m.result);mp.delete(m.id);}};
  const send=(method,params={})=>new Promise(res=>{const i=++id;mp.set(i,res);ws.send(JSON.stringify({id:i,method,params}));});
  await new Promise(r=>ws.onopen=r);
  await send("Runtime.enable");
  const ev=async(x)=>{const r=await send("Runtime.evaluate",{expression:x,returnByValue:true,awaitPromise:true}); return r&&r.result?r.result.value:undefined;};
  await send("Page.navigate",{url:"http://127.0.0.1:8791/index.html"});
  await sleep(6000);
  const fetched = await ev("fetch('assets/js/main.js').then(r=>r.text())");
  console.log("server len:", fetched ? fetched.length : "null", "disk len:", want.length, "same:", fetched === want);
  console.log("has markListSource in served:", fetched ? fetched.includes("markListSource") : "n/a");
  ws.close(); proc.kill(); process.exit(0);
})().catch(e=>{console.error(e.message||e); proc.kill(); process.exit(1);});
