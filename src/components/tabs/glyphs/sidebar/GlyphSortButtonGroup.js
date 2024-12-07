export default {
  name: "GlyphSortButtonGroup",
  data() {
    return {
      showScoreFilter: false,
    };
  },
  methods: {
    update() {
      this.showScoreFilter = EffarigUnlock.glyphFilter.isUnlocked;
    },
    sortByLevel() {
      Glyphs.sortByLevel();
    },
    sortByPower() {
      Glyphs.sortByPower();
    },
    sortByScore() {
      Glyphs.sortByScore();
    },
    sortByEffect() {
      Glyphs.sortByEffect();
    },
    collapseEmpty() {
      Glyphs.collapseEmptySlots();
    }
  },
  template: `
  <div class="o-glyph-inventory-management-group">
    <div class="l-glyph-sacrifice-options__header">
      符文排序：
    </div>
    <button
      class="c-glyph-inventory-option"
      @click="sortByLevel"
    >
      按等级排序
      <div class="c-glyph-inventory-option__tooltip">
        Arranges by decreasing Glyph level
      </div>
    </button>
    <button
      class="c-glyph-inventory-option"
      @click="sortByPower"
    >
      按强度排序
      <div class="c-glyph-inventory-option__tooltip">
        Arranges by decreasing level×rarity
      </div>
    </button>
    <button
      class="c-glyph-inventory-option"
      @click="sortByEffect"
    >
      按词条排序
      <div class="c-glyph-inventory-option__tooltip">
        Groups Glyphs together based on effects
      </div>
    </button>
    <button
      v-if="showScoreFilter"
      class="c-glyph-inventory-option"
      @click="sortByScore"
    >
      按分数排序
      <div class="c-glyph-inventory-option__tooltip">
        Arranges by decreasing Glyph filter score
      </div>
    </button>
    <button
      class="c-glyph-inventory-option"
      @click="collapseEmpty"
    >
      清除空格
      <div class="c-glyph-inventory-option__tooltip">
        Moves all Glyphs to the earliest empty slots
      </div>
    </button>
  </div>
  `
};