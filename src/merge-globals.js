/* eslint-disable import/newline-after-import, import/first, import/order */
function mergeIntoGlobal(object) {
  for (const key in object) {
    if (key === "default") {
      // Skip default exports
      continue;
    }
    const value = object[key];
    const existingValue = window[key];
    if (existingValue !== undefined) {
      throw `Property ${key} already exists in global context`;
    }

    window[key] = value;
  }
}

import * as Utils from "./core/utils.js";
mergeIntoGlobal(Utils);

import * as GameDB from "./core/secret-formula/index.js";
mergeIntoGlobal(GameDB);

// This is a list of legacy stuff, please don't add
// any more globals to the component files

import * as AutomatorBlockEditor from "./components/tabs/automator/AutomatorBlockEditor.js";
mergeIntoGlobal(AutomatorBlockEditor);

import * as AutomatorBlocks from "./components/tabs/automator/AutomatorBlocks.js";
mergeIntoGlobal(AutomatorBlocks);

import * as AutomatorTextEditor from "./components/tabs/automator/AutomatorTextEditor.js";
mergeIntoGlobal(AutomatorTextEditor);


import * as PerksTab from "./components/tabs/perks/PerksTab.js";
mergeIntoGlobal(PerksTab);

// End of legacy stuff

import * as core from "./core/globals.js";
mergeIntoGlobal(core);

import * as game from "./game.js";
mergeIntoGlobal(game);