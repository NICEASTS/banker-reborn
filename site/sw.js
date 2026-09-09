'use strict';
const BUILD="58cd6ccc98b0ab55",FILES=["./app.a1a14b8440e8ad0e.css","./game.67b952e68c00e424.js","./index.html","./manifest.webmanifest","./resources/376e3379a34e6a60/assets/art/city-v1.jpg","./resources/376e3379a34e6a60/assets/art/cover-v1.jpg","./resources/376e3379a34e6a60/assets/art/office-v1.jpg","./resources/376e3379a34e6a60/assets/audio/chapter.wav","./resources/376e3379a34e6a60/assets/audio/choice.wav","./resources/376e3379a34e6a60/assets/audio/promotion.wav","./resources/376e3379a34e6a60/assets/bank-dawn.jpg","./resources/376e3379a34e6a60/assets/icons/arrow-on.png","./resources/376e3379a34e6a60/assets/icons/arrow.png","./resources/376e3379a34e6a60/assets/icons/book-on.png","./resources/376e3379a34e6a60/assets/icons/book.png","./resources/376e3379a34e6a60/assets/icons/car-on.png","./resources/376e3379a34e6a60/assets/icons/car.png","./resources/376e3379a34e6a60/assets/icons/career-on.png","./resources/376e3379a34e6a60/assets/icons/career.png","./resources/376e3379a34e6a60/assets/icons/chart-on.png","./resources/376e3379a34e6a60/assets/icons/chart.png","./resources/376e3379a34e6a60/assets/icons/check-on.png","./resources/376e3379a34e6a60/assets/icons/check.png","./resources/376e3379a34e6a60/assets/icons/chevron-on.png","./resources/376e3379a34e6a60/assets/icons/chevron.png","./resources/376e3379a34e6a60/assets/icons/clock-on.png","./resources/376e3379a34e6a60/assets/icons/clock.png","./resources/376e3379a34e6a60/assets/icons/desk-on.png","./resources/376e3379a34e6a60/assets/icons/desk.png","./resources/376e3379a34e6a60/assets/icons/health-on.png","./resources/376e3379a34e6a60/assets/icons/health.png","./resources/376e3379a34e6a60/assets/icons/home-on.png","./resources/376e3379a34e6a60/assets/icons/home.png","./resources/376e3379a34e6a60/assets/icons/leaf-on.png","./resources/376e3379a34e6a60/assets/icons/leaf.png","./resources/376e3379a34e6a60/assets/icons/menu-on.png","./resources/376e3379a34e6a60/assets/icons/menu.png","./resources/376e3379a34e6a60/assets/icons/people-on.png","./resources/376e3379a34e6a60/assets/icons/people.png","./resources/376e3379a34e6a60/assets/icons/save-on.png","./resources/376e3379a34e6a60/assets/icons/save.png","./resources/376e3379a34e6a60/assets/icons/search-on.png","./resources/376e3379a34e6a60/assets/icons/search.png","./resources/376e3379a34e6a60/assets/icons/shield-on.png","./resources/376e3379a34e6a60/assets/icons/shield.png","./resources/376e3379a34e6a60/assets/icons/sun-on.png","./resources/376e3379a34e6a60/assets/icons/sun.png","./resources/376e3379a34e6a60/assets/portraits/chen-v1.jpg","./resources/376e3379a34e6a60/assets/portraits/he-v1.jpg","./resources/376e3379a34e6a60/assets/portraits/jiang-v1.jpg","./resources/376e3379a34e6a60/assets/portraits/lin-v1.jpg","./resources/376e3379a34e6a60/assets/portraits/liu-v1.jpg","./resources/376e3379a34e6a60/assets/portraits/lu-v1.jpg","./resources/376e3379a34e6a60/assets/portraits/qiao-v1.jpg","./resources/376e3379a34e6a60/assets/portraits/ren-v1.jpg","./resources/376e3379a34e6a60/assets/portraits/shen-v1.jpg","./resources/376e3379a34e6a60/assets/portraits/su-v1.jpg","./resources/376e3379a34e6a60/assets/portraits/tang-v1.jpg","./resources/376e3379a34e6a60/assets/portraits/wen-v1.jpg","./resources/376e3379a34e6a60/assets/portraits/xu-v1.jpg","./resources/376e3379a34e6a60/assets/portraits/yu-v1.jpg","./resources/376e3379a34e6a60/assets/portraits/zhao-v1.jpg","./resources/376e3379a34e6a60/assets/portraits/zhou-v1.jpg","./resources/376e3379a34e6a60/icon-512.png"];
const ROOT=self.registration.scope,PREFIX='xinhe-offline:'+new URL(ROOT).pathname+':',CACHE=PREFIX+BUILD;
const urls=FILES.map(file=>new URL(file,ROOT).href),allowed=new Set(urls);
self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    try{await cache.addAll(urls.map(url=>new Request(url,{cache:'reload'})));}
    catch(error){await caches.delete(CACHE);throw error;}
    // An update waits for the player's explicit save-and-update action.
  })());
});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const old=(await caches.keys()).filter(key=>key.startsWith(PREFIX));
    const keep=new Set([...old.slice(-2),CACHE]);
    await Promise.all(old.filter(key=>!keep.has(key)).map(key=>caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('message',event=>{
  if(event.data?.type==='ACTIVATE_UPDATE'&&event.source?.url?.startsWith(ROOT))event.waitUntil(self.skipWaiting());
});
self.addEventListener('fetch',event=>{
  const request=event.request,url=new URL(request.url);
  if(request.method!=='GET'||url.origin!==new URL(ROOT).origin||!url.href.startsWith(ROOT))return;
  const clean=new URL(url);clean.search='';clean.hash='';
  const navigation=request.mode==='navigate'&&(clean.href===ROOT||clean.href===new URL('index.html',ROOT).href);
  if(!navigation&&!allowed.has(clean.href)&&!clean.pathname.includes('/resources/'))return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    const response=await cache.match(navigation?new URL('index.html',ROOT).href:clean.href);
    if(response)return response;
    // Keep a prior hashed asset available while an older open page finishes reloading.
    if(!navigation){for(const key of (await caches.keys()).filter(key=>key.startsWith(PREFIX)&&key!==CACHE)){
      const old=await (await caches.open(key)).match(clean.href);if(old)return old;
    }}
    return fetch(request);
  })());
});
