import * as Electron from "../steam/bindings/electron.js";

export function openExternalLink(url) {
  if (Electron.isModuleLoaded()) {
    Electron.openExternal(url);
  } else {
    window.open(url, "_blank").focus();
  }
}
