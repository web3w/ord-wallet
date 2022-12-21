/* eslint-disable no-underscore-dangle */
import { CONTENT_SCRIPT_PORT } from '../content-scripts/message-types';
import type { LegacyMessageFromContentScript } from '../content-scripts/message-types';
import {
  handleLegacyExternalMethodFormat,
  inferLegacyMessage,
} from './legacy-external-message-handler';
import internalBackgroundMessageHandler from './messageHandlers';

function deleteTimer(port) {
  if (port._timer) {
    clearTimeout(port._timer);
    delete port._timer;
  }
}
function forceReconnect(port) {
  deleteTimer(port);
  port.disconnect();
}

// Listen for connection to the content-script - port for two-way communication
chrome.runtime.onConnect.addListener((port) => {
  if (port.name !== CONTENT_SCRIPT_PORT) return;
  port._timer = setTimeout(forceReconnect, 250e3, port);
  port.onMessage.addListener((message: LegacyMessageFromContentScript, port) => {
    if (inferLegacyMessage(message)) {
      void handleLegacyExternalMethodFormat(message, port);
      // eslint-disable-next-line no-useless-return
      return;
    }
  });
  port.onDisconnect.addListener(deleteTimer);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  void internalBackgroundMessageHandler(message, sender, sendResponse);
  // Listener fn must return `true` to indicate the response will be async
  return true;
});