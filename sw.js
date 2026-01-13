const CACHE_NAME = 'portal-pmi-v1';
const urlsToCache = [
  '/',
  './manifest.json',        // Cache file manifest
  './peserta/index.html',    // <--- INI KUNCINYA (Sesuai lokasi file kamu)
  '/index.html',
  '/icon-192.png',
  '/icon-512.png'
];

// Instal Service Worke
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch Strategy (Network First, agar Iframe GAS selalu load terbaru)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});

// Update Service Worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
