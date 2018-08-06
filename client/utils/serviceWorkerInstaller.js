export default async function init() {
  // eslint-disable-next-line no-undef
  if ('serviceWorker' in navigator) {
    // eslint-disable-next-line no-undef
    await navigator.serviceWorker.register('./serviceWorker.js');
  }
}
