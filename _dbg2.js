const { spawn } = require("child_process");
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const PORT = 9821;
const proc = spawn(EDGE, ["--headless=new","--disable-gpu","--no-sandbox",`--remote-debugging-port=${PORT}`,"--window-size=1440,1000","about:blank"],{stdio:"ignore"});
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
(async()=>{
  let tabs; for(let i=0;i<40;i++){try{const r=await fetch(`http://127.0.0.1:${PORT}/json`);tabs=await r.json();if(tabs.length)break;}catch(e){} await sleep(250);}
  const page=tabs.find(t=>t.type==="page")||tabs[0];
  const ws=new WebSocket(page.webSocketDebuggerUrl); let id=0; const mp=new Map();
  ws.onmessage=(e)=>{
    const m=JSON.parse(e.data);
    if(m.id&&mp.has(m.id)){mp.get(m.id)(m.result);mp.delete(m.id);}
    if(m.method==="Runtime.exceptionThrown"){
      const d=m.params.exceptionDetails;
      console.log("EXC:", (d.exception&&d.exception.description||d.text||"").split("\n").slice(0,6).join(" | "));
    }
    if(m.method==="Runtime.consoleAPICalled" && m.params.type==="error"){
      console.log("CONSOLE.ERR:", m.params.args.map(a=>a.value||a.description||"").join(" ").slice(0,400));
    }
  };
  const send=(method,params={})=>new Promise(res=>{const i=++id;mp.set(i,res);ws.send(JSON.stringify({id:i,method,params}));});
  await new Promise(r=>ws.onopen=r);
  await send("Runtime.enable"); await send("Page.enable");
  await send("Page.navigate",{url:"http://127.0.0.1:8791/index.html"});
  await sleep(8000);
  const ev=async(x)=>{const r=await send("Runtime.evaluate",{expression:x,returnByValue:true,awaitPromise:true}); return r&&r.result?r.result.value:(r&&r.exceptionDetails?("EVAL-ERR "+JSON.stringify(r.exceptionDetails).slice(0,300)):undefined);};
  console.log("typeof applyRoute:", await ev("typeof applyRoute"));
  console.log("typeof markListSource:", await ev("typeof markListSource"));
  console.log("storage test:", await ev("(function(){try{sessionStorage.setItem('t','1');var v=sessionStorage.getItem('t');sessionStorage.removeItem('t');return v;}catch(e){return 'ERR '+e.message;}})()"));
  console.log("boot marker:", await ev("typeof mountHome"));
  ws.close(); proc.kill(); process.exit(0);
})().catch(e=>{console.error(e.message||e); proc.kill(); process.exit(1);});
