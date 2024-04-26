let receipts = [];

const filterData = async ({ request, preloadResponsePromise }) => {

  const requestUrl = new URL(request.url);

  if (
    requestUrl.hostname === self.location.hostname &&
    requestUrl.pathname === "/data"
  ) {
    const params = Object.fromEntries(requestUrl.searchParams);
    return new Response(JSON.stringify(receipts), {
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return fetch(request);
  }
};

const enableNavigationPreload = async () => {
  if (self.registration.navigationPreload) {
    // Enable navigation preloads!
    await self.registration.navigationPreload.enable();
  }
};

const fetchReceipts = async () => {
  console.log('fetching receipts');
  const response = await fetch("https://puddle.datamade.us/il_campaign_disclosure-e738565/receipts.json?_sort=id&received_date__gte=2024-01-01&_labels=on")
  receipts = await response.json();
  console.log(receipts);
}

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
  event.waitUntil(enableNavigationPreload());
});

self.addEventListener("install", (event) => {
  self.skipWaiting();
  fetchReceipts();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    filterData({
      request: event.request,
      preloadResponsePromise: event.preloadResponse,
    }),
  );
});
