const fs=require('fs');const root='motowoh-church/dist/';
let app=fs.readFileSync(root+'app.js','utf8');if(!app.includes('},6000)'))throw Error('Carousel timer not found');app=app.replace('},6000)','},1100)');fs.writeFileSync(root+'app.js',app);
const pairs=[
['A place to worship, learn and pray throughout the week.','Un lieu pour adorer, apprendre et prier tout au long de la semaine.'],
['All times are local to Cameroon.','Tous les horaires sont indiqués à l’heure du Cameroun.'],
["Worship with us through praise, prayer, fellowship and the teaching of God's Word.",'Adorez avec nous dans la louange, la prière, la communion fraternelle et l’enseignement de la Parole de Dieu.'],
['A welcoming gathering for you and your family','Une rencontre accueillante pour vous et votre famille'],
["Open the Scriptures with us and discover how God's Word speaks to everyday life.",'Ouvrez les Écritures avec nous et découvrez comment la Parole de Dieu éclaire la vie quotidienne.'],
['Learn, reflect and grow together','Apprendre, réfléchir et grandir ensemble'],
["Join us in prayer as we seek God's presence and support one another.",'Rejoignez-nous dans la prière pour rechercher la présence de Dieu et nous soutenir mutuellement.'],
['Everyone is welcome to pray with us','Chacun est le bienvenu pour prier avec nous'],
['THE\n                APOSTOLIC CHURCH','L’ÉGLISE APOSTOLIQUE'],
['The Apostolic Church, Motowoh\n                District','L’Église Apostolique, district de Motowoh']
];
let t=fs.readFileSync(root+'translations.js','utf8');t=t.replace('const french = Object.fromEntries([','const french = Object.fromEntries([\n'+pairs.map(p=>JSON.stringify(p)+',').join('\n'));fs.writeFileSync(root+'translations.js',t);
