/* Service Worker: офлайн-кэш приложения */
const CACHE = "foodday-v8";
// относительные пути от корня SW — корректно работает и на GitHub Pages (/репозиторий/)
const BASE = self.location.href.replace("sw.js", "");
const ASSETS = [
  "", "index.html", "app.js", "style.css",
  "manifest.webmanifest", "icon.svg",
  "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable.png"
].map((p) => BASE + p);
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.registration.scope)
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", (e) => {
  // кэшируем только GET внутри нашего scope (важно для GitHub Pages)
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || !url.href.startsWith(self.registration.scope)) return;
  e.respondWith(
    caches.match(e.request).then((hit) => hit || fetch(e.request).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match(BASE + "index.html")))
  );
});
