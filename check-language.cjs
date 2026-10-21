const fs=require('fs'),vm=require('vm'),assert=require('assert');const dir='motowoh-church/dist/';
const app=fs.readFileSync(dir+'app.js','utf8');const translations=fs.readFileSync(dir+'translations.js','utf8');
const context={document:{querySelector:()=>({})},WeakMap,location:{hash:'#about'}};vm.createContext(context);
vm.runInContext(translations.slice(0,translations.indexOf("document.addEventListener('DOMContentLoaded'")),context);
vm.runInContext(app.slice(0,app.indexOf('let timer;')),context);
const pages=vm.runInContext('Object.fromEntries(Object.entries(pages).map(([k,v])=>[k,v()]))',context);
const dict=vm.runInContext('french',context);const missing=new Set();
for(const html of [...Object.values(pages),fs.readFileSync(dir+'index.html','utf8').replace(/<head>[\s\S]*?<\/head>/,'')]){
 for(const m of html.matchAll(/>([^<>]+)</g)){let t=m[1].replaceAll('&nbsp;','\u00a0').trim();if(!/[A-Za-z]{3}/.test(t)||t==='Tacc Motowoh Media'||t==='Mitondo Newtown'||t==='ENG'||t==='FR')continue;
 if(!dict[t])missing.add(t);
 }
}
console.log('Untranslated text:',[...missing]);
assert.equal(missing.size,0);
assert(fs.readFileSync(dir+'index.html','utf8').includes('data-language="fr"'));
assert.equal(vm.runInContext("translateString('Sunday · 8:30 a.m.–12:30 p.m.')",context),'Dimanche · 8 h 30–12 h 30');
console.log('All five pages and header/footer translation coverage verified.');
