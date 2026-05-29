const CACHE_NAME = 'sgw-v16';
const ASSETS = [
  '/shangaowanren-app/',
  '/shangaowanren-app/index.html',
  '/shangaowanren-app/manifest.json',
  '/shangaowanren-app/icons/icon-192x192.png',
  '/shangaowanren-app/icons/icon-512x512.png',
  '/shangaowanren-app/sw.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => 
    Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

self.addEventListener('message', e => {
  if(e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});
