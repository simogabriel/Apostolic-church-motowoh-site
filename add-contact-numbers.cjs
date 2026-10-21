const fs=require('fs');const root='motowoh-church/dist/';let app=fs.readFileSync(root+'app.js','utf8');
const marker='<p class="muted">Mitondo Newtown<br>Limbe, Cameroon</p>';
if(!app.includes(marker))throw Error('Contact address not found');
app=app.replace(marker,marker+'<div class="contact-phones"><h3>Call us</h3><a href="tel:+237670204421">(+237) 670 204 421</a><a href="tel:+237678456659">(+237) 678 456 659</a></div>');fs.writeFileSync(root+'app.js',app);
let translations=fs.readFileSync(root+'translations.js','utf8');translations=translations.replace('const french = Object.fromEntries([','const french = Object.fromEntries([["Call us","Appelez-nous"],');fs.writeFileSync(root+'translations.js',translations);
let html=fs.readFileSync(root+'index.html','utf8');html=html.replace('</head>','    <link rel="stylesheet" href="contact-details.css">\n</head>');fs.writeFileSync(root+'index.html',html);
let sw=fs.readFileSync(root+'sw.js','utf8');sw=sw.replace('motowoh-offline-v9','motowoh-offline-v10').replace('const FILES=[',"const FILES=['contact-details.css',");fs.writeFileSync(root+'sw.js',sw);
