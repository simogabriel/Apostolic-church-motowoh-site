const fs=require('fs');
const wait=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const targets=await (await fetch('http://127.0.0.1:9222/json')).json();
 const target=targets.find(t=>t.type==='page');
 const ws=new WebSocket(target.webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
 let id=0;const pending=new Map(),errors=[];
 ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);if(p){pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result)}}if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.text)};
 const send=(method,params={})=>new Promise((resolve,reject)=>{const key=++id;pending.set(key,{resolve,reject});ws.send(JSON.stringify({id:key,method,params}))});
 const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value};
 await send('Runtime.enable');await send('Page.enable');
 await send('Page.navigate',{url:'http://127.0.0.1:4173'});await wait(1800);
 const results=[];let failures=0;
 for(const width of [320,375,600,768,820,1024,1280,1440]){
  await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<600});
  for(const lang of ['en','fr']){
   await evaluate(`document.querySelector('[data-language="${lang}"]').click()`);
   for(const page of ['home','about','outreach','vision','contact']){
    await evaluate(`location.hash='${page}'`);await wait(120);
    const result=await evaluate(`(()=>{const w=innerWidth;return {width:w,lang:document.documentElement.lang,page:'${page}',overflow:document.documentElement.scrollWidth>w+1,offenders:[...document.querySelectorAll('body *')].filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&(r.right>w+1||r.left< -1)&&getComputedStyle(el).position!=='absolute'}).slice(0,5).map(el=>el.tagName+'.'+el.className)}})()`);
    if(result.overflow){failures++;console.log('OVERFLOW',JSON.stringify(result))}results.push(result);
   }
   if(width<=1024){
    const open=await evaluate(`(()=>{const b=document.querySelector('.menu-toggle');b.click();return b.getAttribute('aria-expanded')==='true'&&getComputedStyle(document.querySelector('nav')).display!=='none'})()`);
    await evaluate(`document.querySelector('nav a[href="#about"]').click()`);await wait(100);
    const menu={open,closed:await evaluate(`document.querySelector('.menu-toggle').getAttribute('aria-expanded')==='false'`)};
    if(!menu.open||!menu.closed){failures++;console.log('MENU FAILURE',width,lang,menu)}
   }
  }
 }
 await evaluate("document.querySelector('[data-language=fr]').click();location.hash='home'");await wait(150);await send('Page.reload');await wait(800);
 const remembered=await evaluate("document.documentElement.lang");if(remembered!=='fr'){failures++;console.log('Language not remembered')}
 for(const [name,width,lang] of [['mobile',375,'fr'],['tablet',768,'fr'],['desktop',1440,'en']]){
  await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<600});
  await evaluate(`document.querySelector('[data-language="${lang}"]').click();location.hash='home';scrollTo(0,0)`);await wait(200);
  const image=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
  fs.writeFileSync(`qa-${name}.png`,Buffer.from(image.data,'base64'));
 }
 console.log(JSON.stringify({layouts:results.length,failures,runtimeErrors:errors,languagePersistence:remembered==='fr',screenshots:['qa-mobile.png','qa-tablet.png','qa-desktop.png']}));
 fs.writeFileSync('responsive-qa.json',JSON.stringify({results,failures,errors},null,2));
 await send('Browser.close');ws.close();process.exit(failures||errors.length?1:0);
})().catch(e=>{console.error(e);process.exit(1)});
