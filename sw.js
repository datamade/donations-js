
const filterData = async ({ request, preloadResponsePromise  }) => {
  // First try to get the resource from the cache
  const requestUrl = new URL(request.url);

  if (requestUrl.hostname === self.location.hostname && requestUrl.pathname === "/data") {
    const params = Object.fromEntries(requestUrl.searchParams);
    console.log(params);
    return new Response(JSON.stringify(params),  {headers: { 'Content-Type': 'application/json' }});
   
    
  } else {
  
  return fetch(request)
  }
};

const enableNavigationPreload = async () => {
  if (self.registration.navigationPreload) {
    // Enable navigation preloads!
    await self.registration.navigationPreload.enable();
  }
};

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
  event.waitUntil(enableNavigationPreload());
});

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    filterData({
      request: event.request,
      preloadResponsePromise: event.preloadResponse,
    })
  );
});
