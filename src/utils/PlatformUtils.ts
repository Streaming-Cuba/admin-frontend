import * as WindowUtils from "./WindowUtils";

/**
 * Open the event details in the platform using a new browser tab
 * @param identifier Event identifier
 */
export function openEvent(identifier: string) {
  const url = `${process.env.REACT_APP_PLATFORM_URL}/event/${identifier}`;
  WindowUtils.openNewTab(url);
}

export function resolveMediaUrl(path: string) {
  return `https://media.streamingcuba.com/${path}`
}
