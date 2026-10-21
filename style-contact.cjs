const fs=require('fs');const root='motowoh-church/dist/';let app=fs.readFileSync(root+'app.js','utf8');const original="'Visit us in Mitondo Newtown, Limbe. Come for worship, Bible study or a time of prayer.')}";
const replacement="'Visit us in Mitondo Newtown, Limbe. Come for worship, Bible study or a time of prayer.').replace('class=\"page-hero\"','class=\"page-hero contact-page-hero\"')}";
if(!app.includes(original))throw Error('Contact hero not found');app=app.replace(original,replacement);fs.writeFileSync(root+'app.js',app);
let sw=fs.readFileSync(root+'sw.js','utf8').replace('motowoh-offline-v12','motowoh-offline-v13');fs.writeFileSync(root+'sw.js',sw);
