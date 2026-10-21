const fs=require('fs');
const s=fs.readFileSync('tiktok-profile.html','utf8');
console.log('Bytes:',s.length);
console.log([...new Set(s.match(/(?:video\/|"id":")[0-9]{18,20}/g)||[])].slice(0,25));
