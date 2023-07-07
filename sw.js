var CACHE_NAME = 'omron-pwa-sample-caches';
var urlsToCache = [
    '/',
    '/index.html',
    '/index-pwa2.html',
    '/app.js',
];

self.addEventListener('install', function(event) {
    event.waitUntil(caches
        .open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(caches
        .match(event.request)
        .then(function(response) {
            return response ? response : fetch(event.request);
        })
    );
});

// プッシュイベント
self.addEventListener("push", (event) => {
  let data = event.data.text();
  data = JSON.parse(data);
  const options = {
      body: data.body,
      icon: data.icon,
      actions: [
          { action: "yes", title: "yes" },
          { action: "no", title: "no" },
      ],
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});

// プッシュ通知をクリックしたときのイベント
self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    if (event.action === "yes") {
     console.log('clicked yes');
    } else if (event.action === "no") {
     console.log('clicked no');
    } else {
      console.log('something else');
    }
});

// Notification表示
self.addEventListener('message', function (event) {
  self.registration.showNotification(event.data);
});






