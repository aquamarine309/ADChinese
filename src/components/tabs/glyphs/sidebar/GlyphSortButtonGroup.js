export default {
  name: 'GlyphSortButtonGroup',
  data() {
    return {
      showScoreFilter: false,
    }
  },
  methods: {
    update() {
      this.showScoreFilter = EffarigUnlock.glyphFilter.isUnlocked
    },
    sortByLevel() {
      Glyphs.sortByLevel()
    },
    sortByPower() {
      Glyphs.sortByPower()
    },
    sortByScore() {
      Glyphs.sortByScore()
    },
    sortByEffect() {
      Glyphs.sortByEffect()
    },
    collapseEmpty() {
      Glyphs.collapseEmptySlots()
    },
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
        按等级降序
      </div>
    </button>
    <button
      class="c-glyph-inventory-option"
      @click="sortByPower"
    >
      按强度排序
      <div class="c-glyph-inventory-option__tooltip">
        按等级x稀有度降序
      </div>
    </button>
    <button
      class="c-glyph-inventory-option"
      @click="sortByEffect"
    >
      按词条排序
      <div class="c-glyph-inventory-option__tooltip">
        按符文词条分组
      </div>
    </button>
    <button
      v-if="showScoreFilter"
      class="c-glyph-inventory-option"
      @click="sortByScore"
    >
      按分数排序
      <div class="c-glyph-inventory-option__tooltip">
        按筛选分数降序
      </div>
    </button>
    <button
      class="c-glyph-inventory-option"
      @click="collapseEmpty"
    >
      清除空格
      <div class="c-glyph-inventory-option__tooltip">
        将所有符文移动到最早的空格
      </div>
    </button>
  </div>
  `,
}
