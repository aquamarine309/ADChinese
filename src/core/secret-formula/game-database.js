import { multiplierTabTree, multiplierTabValues } from "./multiplier-tab/index.js";

import { achievements } from "./achievements/index.js";
import { awayProgressTypes } from "./away-progress-types.js";
import { catchupResources } from "./catchup-resources.js";
import { celestials } from "./celestials/index.js";
import { challenges } from "./challenges/index.js";
import { changelog } from "./changelog.js";
import { confirmationTypes } from "./confirmation-types.js";
import { credits } from "./credits.js";
import { discordRichPresence } from "./discord-rich-presence.js";
import { eternity } from "./eternity/index.js";
import { h2p } from "./h2p.js";
import { infinity } from "./infinity/index.js";
import { news } from "./news.js";
import { progressStages } from "./progress-checker.js";
import { reality } from "./reality/index.js";
import { shopPurchases } from "./shop-purchases.js";
import { sidebarResources } from "./sidebar-resources.js";
import { speedrunMilestones } from "./speedrun-milestones.js";
import { startupTips } from "./startup-tips.js";
import { tabNotifications } from "./tab-notifications.js";
import { tabs } from "./tabs.js";

export const GameDatabase = {
  achievements,
  awayProgressTypes,
  catchupResources,
  celestials,
  challenges,
  changelog,
  confirmationTypes,
  credits,
  discordRichPresence,
  eternity,
  h2p,
  infinity,
  multiplierTabTree,
  multiplierTabValues,
  news,
  progressStages,
  reality,
  sidebarResources,
  shopPurchases,
  speedrunMilestones,
  startupTips,
  tabNotifications,
  tabs
};

window.GameDatabase = GameDatabase;

window.mapGameData = function mapGameData(gameData, mapFn) {
  const result = [];
  for (const data of gameData) {
    result[data.id] = mapFn(data);
  }
  return result;
};

window.mapGameDataToObject = function mapGameDataToObject(gameData, mapFun) {
  const array = Object.entries(gameData);
  const out = {};
  for (let idx = 0; idx < array.length; idx++) {
    out[array[idx][0]] = mapFun(array[idx][1]);
  }
  return {
    all: Object.values(out),
    ...out
  };
};