const fs=require('fs'),cp=require('child_process');const root='motowoh-church';
const local=fs.readFileSync(root+'/dist/translations.js','utf8');
let base=cp.execFileSync('git',['show','HEAD:dist/translations.js'],{cwd:root,encoding:'utf8'});
const pairs=new Map();for(const m of local.matchAll(/\[\s*"(?:\\.|[^"\\])*"\s*,\s*"(?:\\.|[^"\\])*"\s*\]/g)){try{const [key,value]=JSON.parse(m[0]);pairs.set(key,value)}catch{}}
// Keep the current wording while rebuilding a complete, valid dictionary.
const end=base.indexOf(']);');base=base.slice(0,end)+',\n'+[...pairs].map(p=>JSON.stringify(p)).join(',\n')+base.slice(end);fs.writeFileSync(root+'/dist/translations.js',base);
