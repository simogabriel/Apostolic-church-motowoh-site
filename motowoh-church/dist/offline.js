// All five carousel photographs are local and cached before offline use.
if('serviceWorker' in navigator){
 window.addEventListener('load',()=>{
  navigator.serviceWorker.register('sw.js').catch(error=>console.warn('Offline support could not be enabled:',error.message));
 });
}
