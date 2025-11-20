const CACHE_NAME = "budget-app-v3";  // <-- bumped version
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest"
  // add icons here if/when you have them
];

self.addEventListener("install", (event) => {
  self.skipWaiting(); // activate this SW immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
