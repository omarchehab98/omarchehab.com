self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('omarchehab-com')
      .then(function(cache) {
        return cache.addAll([
          '/',
          '/dist/css/bundle.min.css',
          '/dist/js/bundle.min.js',
          '/dist/fonts/glyphicons-halflings-regular.eot',
          '/dist/fonts/glyphicons-halflings-regular.svg',
          '/dist/fonts/glyphicons-halflings-regular.ttf',
          '/dist/fonts/glyphicons-halflings-regular.woff',
          '/dist/fonts/glyphicons-halflings-regular.woff2'
        ]);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});