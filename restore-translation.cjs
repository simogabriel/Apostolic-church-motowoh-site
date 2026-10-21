const fs=require('fs'),cp=require('child_process');
const root='motowoh-church';
let t=cp.execFileSync('git',['show','HEAD:dist/translations.js'],{cwd:root,encoding:'utf8'});
t=t.replace('const french = Object.fromEntries([','const french = Object.fromEntries([\n["Glimpses of our church family, gathered in fellowship.","Quelques moments de notre famille spirituelle, réunie dans la communion fraternelle."],');
fs.writeFileSync(root+'/dist/translations.js',t);
