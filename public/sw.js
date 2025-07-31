/*
 * Service worker for the Slom Slom PWA.
 *
 * This file caches the core static assets so that the app can load
 * even when the network is unavailable.  The cache name should be
 * incremented manually whenever assets change to force an update.
 */
const CACHE_NAME = 'slomslom-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/audio/sample.wav',
  '/video/sample.mp4',
  '/pdfs/sample1.pdf',
  '/pdfs/sample2.pdf',
  '/pdfs/sample3.pdf'
];

self.addEventListener('install', (event) => {
  // Pre‑cache all of the app shell files.
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  // Clean up old caches by iterating through all cache names and deleting
  // any that are not the current.
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Respond from cache first if available, otherwise go to network.
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});