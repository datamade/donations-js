const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("sw.js", {
        scope: "./",
      });
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

const textSection = document.querySelector("section");

const fetchData = async () => {
  const time = new Date();
  const url = `data?time=${time}`;
  const result = await fetch(url);
  textSection.textContent = await result.text();
};

registerServiceWorker();

// https://stackoverflow.com/a/62596701
// seems a better way to do this?
navigator.serviceWorker.getRegistration().then(function (reg) {
  // There's an active SW, but no controller for this tab.
  if (reg.active && !navigator.serviceWorker.controller) {
    // Perform a soft reload to load everything from the SW and get
    // a consistent set of resources.
    window.location.reload();
  }
});
document.getElementById("data_fetch").addEventListener("click", fetchData);
