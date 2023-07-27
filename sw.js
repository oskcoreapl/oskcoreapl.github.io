var CACHE_NAME = 'omron-pwa-sample-caches';
var urlsToCache = [
    '/',
    '/index.html',
    '/index-2.html',
    '/app.js',
    '/camera.js',
];

importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyCYdYr5rNUw6HoOyw3_Zw0ZVU4SjLrWXmc',
  authDomain: 'samplecamera-b59f7.firebaseapp.com',
  // databaseURL: 'https://project-id.firebaseio.com',
  projectId: 'samplecamera-b59f7',
  storageBucket: 'samplecamera-b59f7.appspot.com',
  messagingSenderId: '752024537605',
  appId: '1:752024537605:web:1c14a676c6dca8cc6aea6c',
  measurementId: 'G-3PK8NZZGEP'
});
const messaging = firebase.messaging();
var token = messaging.getToken({vapidKey: 'BHgu6ZJ1uEM7VYHZbuuPJaTgJQlB6wT8llfJ_n0yOwLovQIxs4smKLbQm5_JhPz5wecdjw-qvHJCxBu3m2VhqxU'});
console.log('got token: ', token);

messaging.onMessage((payload) => {
  console.log('Message received. ', payload);
  // ...
});

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = 'Background Message';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});


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
  console.log('catch push notification');
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






