// Footer page links always start at the top, including the current page link.
document.querySelectorAll('footer a[href^="#"]').forEach(link=>{
 link.addEventListener('click',event=>{
  if(event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
  const page=link.hash.slice(1);
  if(!['home','about','outreach','vision','contact'].includes(page))return;
  event.preventDefault();
  if(location.hash!==link.hash)history.pushState(null,'',link.hash);
  render();
  const heading=document.querySelector('main h1')||document.querySelector('main');
  heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});
  window.scrollTo({top:0,left:0,behavior:'instant'});
 });
});
const scrollBehavior=()=>matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth';
document.querySelector('#scroll-to-top').addEventListener('click',()=>window.scrollTo({top:0,left:0,behavior:scrollBehavior()}));
document.querySelector('#scroll-to-bottom').addEventListener('click',()=>window.scrollTo({top:document.documentElement.scrollHeight,left:0,behavior:scrollBehavior()}));
