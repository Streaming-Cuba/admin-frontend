/**
 * Open a URL in a new browser tab
 * @param url Url to open in the new tab
 */
 export function openNewTab(url: string) {
    window.open(url, "__blank");
  }