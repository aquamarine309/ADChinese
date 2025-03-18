export default {
  name: 'GlyphCleanButtonGroup',
  data() {
    return {
      glyphSacrificeUnlocked: false,
      hasPerkShop: false,
      hasFilter: false,
      inventory: [],
      isRefining: false,
      removeCount: 0,
    }
  },
  computed: {
    removeString() {
      if (this.isRefining) return '精炼'
      if (this.glyphSacrificeUnlocked) return '献祭'
      return '移除'
    },
    autoCleanTooltip() {
      return `${this.removeString}在各方面都不如其他符文的符文${this.hasPerkShop ? '（忽略音乐符文）' : ''}`
    },
    harshAutoCleanTooltip() {
      return `${this.removeString}在各方面都不如任何其他符文的符文${this.hasPerkShop ? '（包括音乐符文）' : ''}`
    },
    deleteRejectedTooltip() {
      const negativeWarning = AutoGlyphProcessor.hasNegativeEffectScore() ? ' 你还有一些负面效果过滤器分数；这可能会移除一些你通常想保留的符文！' : ''
      return this.removeCount === 0 ? `这不会移除任何符文，请调整你的过滤器设置以移除一些符文。` : `这将移除 ${formatInt(this.removeCount)} 个符文！${negativeWarning}`
    },
  },
  methods: {
    update() {
      this.glyphSacrificeUnlocked = GlyphSacrificeHandler.canSacrifice && !Pelle.isDoomed
      this.hasPerkShop = TeresaUnlocks.shop.canBeApplied
      this.hasFilter = EffarigUnlock.glyphFilter.isUnlocked
      this.inventory = Glyphs.inventory.map(GlyphGenerator.copy)
      this.isRefining = AutoGlyphProcessor.sacMode === AUTO_GLYPH_REJECT.REFINE || AutoGlyphProcessor.sacMode === AUTO_GLYPH_REJECT.REFINE_TO_CAP
      this.removeCount = this.inventory.filter((g) => g !== null && g.idx >= Glyphs.protectedSlots && !AutoGlyphProcessor.wouldKeep(g)).length
    },
    autoClean() {
      if (player.options.confirmations.autoClean) {
        Modal.glyphPurge.show({ harsh: false })
      } else {
        Glyphs.autoClean(5)
      }
    },
    harshAutoClean() {
      if (player.options.confirmations.autoClean) {
        Modal.glyphPurge.show({ harsh: true })
      } else {
        Glyphs.autoClean(1)
      }
    },
    deleteAllUnprotected() {
      if (player.options.confirmations.sacrificeAll) {
        Modal.deleteAllUnprotectedGlyphs.show()
      } else {
        Glyphs.autoClean(0)
      }
    },
    deleteAllRejected() {
      if (player.options.confirmations.sacrificeAll) {
        Modal.deleteAllRejectedGlyphs.show()
      } else {
        Glyphs.deleteAllRejected(true)
      }
    },
    slotClass(index) {
      return index < Glyphs.protectedSlots ? 'c-glyph-inventory__protected-slot' : 'c-glyph-inventory__slot'
    },
  },
  template: `
  <div
    v-if="glyphSacrificeUnlocked"
    class="o-glyph-inventory-management-group"
  >
    <div class="l-glyph-sacrifice-options__header">
      移除更弱的符文
    </div>
    <button
      class="c-glyph-inventory-option"
      @click="autoClean"
    >
      净化符文
      <div class="c-glyph-inventory-option__tooltip">
        {{ autoCleanTooltip }}
      </div>
    </button>
    <button
      class="c-glyph-inventory-option"
      @click="harshAutoClean"
    >
      严格净化符文
      <div class="c-glyph-inventory-option__tooltip">
        {{ harshAutoCleanTooltip }}
      </div>
    </button>
    <button
      class="c-glyph-inventory-option"
      @click="deleteAllUnprotected"
    >
      {{ removeString }} 所有未保护的符文
    </button>
    <button
      v-if="hasFilter"
      class="c-glyph-inventory-option"
      @click="deleteAllRejected"
    >
      {{ removeString }} 所有未筛选的符文
      <div
        class="c-glyph-inventory-option__tooltip l-rejected-tooltip"
        data-v-glyph-clean-button-group
      >
        {{ deleteRejectedTooltip }}
      </div>
    </button>
  </div>
  `,
}
