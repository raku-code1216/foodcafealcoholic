const CACHE_NAME = 'fca-pwa-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  // 只處理同網域請求並直接走網絡，確保 CSV 資料庫永遠最新、亦不干擾地圖與 IG 嵌入
  if (url.origin !== self.location.origin) return;
  event.respondWith(fetch(event.request));
});
