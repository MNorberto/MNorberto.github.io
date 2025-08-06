// Service Worker for offline support
const CACHE_NAME = 'tech-blog-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/tags.html',
  '/styles.css',
  '/script.js',
  '/components.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});