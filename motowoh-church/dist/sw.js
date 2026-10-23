const CACHE='motowoh-offline-v22';
const FILES=['motion.css','assets/facebook-worship.jpg','apostolic-brand.css','weekly-services.css','page-navigation.js','page-navigation.css','contact-details.css','heritage.css','mobile-navigation.css',"media-carousel.js","media-carousel.css","assets/tiktok-7697941525740768529.jpg","assets/tiktok-7697497930042772757.jpg","assets/tiktok-7695766012792294676.jpg","assets/tiktok-7695105319822806273.jpg","assets/tiktok-7692741317536861461.jpg",'./','index.html','styles.css','refinements.css','gallery.css','navigation.css','welcome.css','app.js','translations.js','offline.js','tiktok-feed.html','assets/logo.png','assets/main photo.jpg','assets/discrit pastor.jpg','assets/carousel.jpg','assets/carousel1.jpg','assets/carousel2.jpg','assets/carousel3.jpg','assets/carousel4.jpg'];
self.addEventListener('install',event=>event.waitUntil((async()=>{const cache=await caches.open(CACHE);await cache.addAll(FILES);await self.skipWaiting()})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(key=>key.startsWith('motowoh-offline-')&&key!==CACHE).map(key=>caches.delete(key)));await self.clients.claim()})()));
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin)return;
 // Limit caching to the public site files; never cache sign-in or API requests.
 const known=FILES.some(file=>new URL(file,self.registration.scope).pathname===url.pathname);
 if(!known&&request.mode!=='navigate')return;
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE);
  const key=new Request(url.origin+url.pathname);
  const cached=await cache.match(key);
  if(url.pathname.includes('/assets/')&&cached)return cached;
  try{
   const response=await fetch(request);
   if(known&&response.ok&&response.type==='basic'&&!response.redirected)await cache.put(key,response.clone());
   return response;
  }catch(error){
   if(cached)return cached;
   if(request.mode==='navigate'){const shell=await cache.match(new URL('index.html',self.registration.scope));if(shell)return shell}
   throw error;
  }
 })());
});
