(()=>{
 const button=document.querySelector('.bible-motion');
 if(!button)return;
 let paused=false;
 try{paused=localStorage.getItem('motowoh-motion')==='paused'}catch{}
 function update(){
  document.documentElement.dataset.motion=paused?'paused':'running';
  button.setAttribute('aria-pressed',String(paused));
  button.setAttribute('aria-label',document.documentElement.lang==='fr'?'Mettre les animations en pause':'Pause site animations');
  button.title=document.documentElement.lang==='fr'?'Activer ou suspendre les animations':'Toggle site animations';
 }
 button.addEventListener('click',()=>{paused=!paused;try{localStorage.setItem('motowoh-motion',paused?'paused':'running')}catch{}update()});
 new MutationObserver(update).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 update();
})();
