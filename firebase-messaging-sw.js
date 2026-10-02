importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({apiKey:'AIzaSyBh-AffcnGehHFc2HR1JmnY5UZ0J_WzmuA',authDomain:'lankaalert-2ee5c.firebaseapp.com',projectId:'lankaalert-2ee5c',storageBucket:'lankaalert-2ee5c.firebasestorage.app',messagingSenderId:'952831337674',appId:'1:952831337674:web:5f7e92837460397fa9c033'});
const messaging=firebase.messaging();
const CACHE='lankaalert-national-shell-v38';
const CORE=[
  './app.html','./offline-guide.html','./privacy.html','./manifest.webmanifest',
  './css/style.css','./css/v20-system.css','./css/v22-beautiful.css','./css/v23-hazard-cards.css','./css/v26-national.css','./css/v30-icon-system.css','./css/v31-emergency-refactor.css','./css/v33-premium-weather.css','./css/v34-ai-premium.css','./css/premium-light.css','./css/v15-3-video-fixes.css','./css/v15-4-rise-gauges.css','./css/v17-ui-fixes.css','./css/v17-2-ui.css','./css/trustcraft-inspired.css','./css/sinhala-apple-typography.css','./css/final-ui-cleanup.css','./css/home-forecast-ui-fix.css','./css/ios-interaction-polish.css','./css/settings-premium.css','./css/v18-ios-harmony.css','./css/settings-vibe-global.css','./css/v18-1-refinements.css','./css/v18-2-targeted.css','./css/v18-3-user-request.css','./css/v18-4-friend-fixes.css','./css/v18-8-final.css','./css/v19-android-ui.css','./css/v20-rivers-map.css','./css/v21-dialog-ui.css','./css/v23-privacy-alert-fix.css','./css/v36-national-features.css','./css/v37-a11y-switch-contrast-fix.css',
  './js/dmc-config.js','./js/custom-icons.js','./js/ios-interaction-polish.js','./js/ui-shell.js','./js/navigation-failsafe.js','./js/v17-2-ui.js','./js/r2-upload.js','./js/app.js','./js/settings-premium.js','./js/super-ui.js','./js/semifinal-upgrade.js','./js/multihazard.js','./js/national-runtime.js','./js/v18-3-user-request.js','./js/v18-4-friend-fixes.js','./js/v18-8-fixes.js','./js/v19-live-dmc.js','./js/v20-rivers.js','./js/v21-dialog-nav.js','./js/national-features.js','./js/national-v38-expansion.js','./js/guide-content.js','./js/risk-engine.js','./js/i18n.js','./js/districts.js','./js/firebase-init.js','./data/historical-disasters.json','./data/official-alerts.json','./icon.svg','./icon-192.png','./icon-512.png','./favicon-16.png','./favicon-32.png','./favicon-48.png','./apple-touch-icon.png'
];
const ASSET_HOSTS=[
  'unpkg.com','www.gstatic.com','tiles.openfreemap.org','tile.openstreetmap.org','basemaps.cartocdn.com'
];

async function putSafe(cache,key,response){try{if(response&&response.ok!==false)await cache.put(key,response.clone());}catch(_){} }
function isCacheableCrossOrigin(url){return ASSET_HOSTS.some(h=>url.hostname===h||url.hostname.endsWith('.'+h));}

self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(async c=>{await Promise.allSettled(CORE.map(async u=>{try{const r=await fetch(u,{cache:'no-store'});if(r.ok)await c.put(u,r);}catch(_){}}));}).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('lankaalert-national-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});

self.addEventListener('message',event=>{
  if(event.data?.type==='CACHE_FULL_SHELL')event.waitUntil(caches.open(CACHE).then(async c=>{await Promise.allSettled(CORE.map(async u=>{try{const r=await fetch(u,{cache:'no-store'});if(r.ok)await c.put(u,r);}catch(_){}}));}));
});

self.addEventListener('fetch',event=>{
  const req=event.request;if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin && !isCacheableCrossOrigin(url))return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    if(url.origin===self.location.origin){
      try{const res=await fetch(req);if(res.ok)putSafe(cache,req,res);return res;}catch(_){return (await cache.match(req))||cache.match('./app.html');}
    }
    const cached=await cache.match(req);if(cached)return cached;
    try{const res=await fetch(req);if(res&& (res.ok || res.type==='opaque'))putSafe(cache,req,res);return res;}catch(_){return new Response('',{status:504,statusText:'Offline'});}
  })());
});

messaging.onBackgroundMessage(payload=>{const n=payload.notification||{};self.registration.showNotification(n.title||'LankaAlert — Alert',{body:n.body||'නව ආරක්ෂක අනතුරු ඇඟවීමක් ඇත.',tag:payload.messageId||'lankaalert-alert',renotify:true,data:{url:'/app.html'}})});
self.addEventListener('notificationclick',event=>{event.notification.close();event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{for(const c of list){if('focus' in c)return c.focus()}return clients.openWindow(event.notification.data?.url||'/app.html')}))});
