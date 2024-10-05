import { DC } from "../../constants.js";

export const effarigUnlocks = {
  adjuster: {
    id: 0,
    description: "可调节符文等级因子的权重",
    cost: 1e7,
    onPurchased: () => {
      Effarig.quotes.unlockWeights.show();
      ui.view.tabs.reality.openGlyphWeights = true;
      Tab.reality.glyphs.show();
    }
  },
  glyphFilter: {
    id: 1,
    description: "符文筛选",
    cost: 2e8,
    onPurchased: () => {
      Effarig.quotes.unlockGlyphFilter.show();
      player.reality.showSidebarPanel = GLYPH_SIDEBAR_MODE.FILTER_SETTINGS;
    }
  },
  setSaves: {
    id: 2,
    description: "保存符文配置",
    cost: 3e9,
    onPurchased: () => {
      Effarig.quotes.unlockSetSaves.show();
      player.reality.showSidebarPanel = GLYPH_SIDEBAR_MODE.SAVED_SETS;
    }
  },
  run: {
    id: 3,
    description: "鹿颈长的现实",
    cost: 5e11,
    onPurchased: () => {
      Effarig.quotes.unlockRun.show();
    }
  },
  infinity: {
    id: 4,
    label: "无限",
    get description() {
      return `无限次数提升复制器上限
      无限次数增加你的复制器星系上限
      在鹿颈长的现实中基础无限点获取上限为 ${format(DC.E200)}
      在鹿颈长的现实中每种类型的无限点倍率上限为 ${format(DC.E50)}`;
    },
  },
  eternity: {
    id: 5,
    label: "永恒",
    get description() {
      return `永恒次数生成无限次数
      在鹿颈长的现实中无限点数不再有任何限制
      解锁无名氏`;
    },
  },
  reality: {
    id: 6,
    label: "现实",
    get description() {
      return "解锁鹿颈长符文（你只能装备一个鹿颈长符文）";
    },
  }
};
