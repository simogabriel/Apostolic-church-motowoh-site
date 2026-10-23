const french=new URLSearchParams(location.search).get('lang')==='fr';
document.documentElement.lang=french?'fr':'en';
const videos=[
 {id:'7697941525740768529',en:'Youth choir ministration',fr:'Ministère de la chorale des jeunes'},
 {id:'7697497930042772757',en:'Sunday service at Motowoh',fr:'Culte du dimanche à Motowoh'},
 {id:'7695766012792294676',en:'Moments of worship · 11 October 2026',fr:'Moments d’adoration · 11 octobre 2026'},
 {id:'7695105319822806273',en:'An invitation to church',fr:'Une invitation à l’église'},
 {id:'7692741317536861461',en:'Worship with Elder Enow',fr:'Adoration avec l’ancien Enow'}
];
let index=0,paused=matchMedia('(prefers-reduced-motion: reduce)').matches,watching=false;
const stage=document.querySelector('#video-stage'),dots=document.querySelector('#video-dots');
const label=(en,fr)=>french?fr:en;
const note=()=>document.querySelector('#media-note').textContent=watching?label('Video playback needs an internet connection.','La lecture des vidéos nécessite une connexion Internet.'):label('Select a video to pause the carousel and watch.','Sélectionnez une vidéo pour arrêter le carrousel et la regarder.');
function pauseLabel(){const button=document.querySelector('#pause');button.textContent=paused?'▷':'Ⅱ';button.setAttribute('aria-label',paused?label('Resume carousel','Reprendre le carrousel'):label('Pause carousel','Mettre le carrousel en pause'))}
function show(next){index=(next+videos.length)%videos.length;watching=false;const video=videos[index];stage.replaceChildren();const button=document.createElement('button');button.id='watch';button.type='button';button.setAttribute('aria-label',label('Play video: ','Lire la vidéo : ')+video[french?'fr':'en']);const image=new Image();image.id='cover';image.alt=video[french?'fr':'en'];image.src='assets/tiktok-'+video.id+'.jpg';const icon=document.createElement('span');icon.className='play-icon';icon.setAttribute('aria-hidden','true');icon.textContent='▶';button.append(image,icon);button.onclick=play;stage.append(button);document.querySelector('#video-title').textContent=video[french?'fr':'en'];document.querySelector('#counter').textContent=`0${index+1} / 05`;document.querySelector('#video-link').href='https://www.tiktok.com/@tacc.motowoh.medi/video/'+video.id;[...dots.children].forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));note()}
function play(){paused=true;watching=true;pauseLabel();const iframe=document.createElement('iframe');iframe.title=videos[index][french?'fr':'en'];iframe.src='https://www.tiktok.com/player/v1/'+videos[index].id+'?autoplay=1&controls=1&rel=0';iframe.allow='autoplay; fullscreen; encrypted-media';iframe.allowFullscreen=true;stage.replaceChildren(iframe);note()}
videos.forEach((video,i)=>{const button=document.createElement('button');button.type='button';button.setAttribute('aria-label',label('Show video ','Afficher la vidéo ')+(i+1));button.onclick=()=>show(i);dots.append(button)});
document.querySelector('#previous').onclick=()=>show(index-1);document.querySelector('#next').onclick=()=>show(index+1);
document.querySelector('#previous').setAttribute('aria-label',label('Previous video','Vidéo précédente'));document.querySelector('#next').setAttribute('aria-label',label('Next video','Vidéo suivante'));
document.querySelector('#pause').onclick=()=>{paused=!paused;if(!paused&&watching)show(index);pauseLabel()};
document.querySelector('#video-link').textContent=label('Watch on TikTok ↗','Voir sur TikTok ↗');document.querySelector('#profile-link').textContent=label('View all videos ↗','Voir toutes les vidéos ↗');
document.querySelector('.video-carousel').addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();show(index+1)}if(event.key==='ArrowLeft'){event.preventDefault();show(index-1)}});
setInterval(()=>{if(!paused&&!watching&&!document.hidden&&!document.querySelector('.video-carousel').contains(document.activeElement))show(index+1)},1100);
show(0);pauseLabel();
