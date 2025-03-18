import ModalWrapperChoice from '../ModalWrapperChoice.js'

export default {
  name: 'PurgeAllRejectedGlyphsModal',
  components: {
    ModalWrapperChoice,
  },
  data() {
    return {
      isRefining: false,
    }
  },
  computed: {
    refiningOrSacrificing() {
      if (this.isRefining) return `精炼`
      return `献祭`
    },
    topLabel() {
      return `你即将${this.refiningOrSacrificing}所有被拒绝的符文`
    },
    message() {
      const negativeWarning = AutoGlyphProcessor.hasNegativeEffectScore() ? ` 请注意，你的某些效果过滤器评分为负值，这可能会导致你失去一些通常希望保留的符文。` : ''
      return `你确定要${this.refiningOrSacrificing}所有被拒绝的符文吗？这将移除所有根据当前符文过滤器设置会被拒绝的符文。${negativeWarning}`
    },
    extraMessage() {
      if (this.glyphsDeleted === 0) return `这不会移除任何符文。`
      if (this.glyphsDeleted === this.glyphsTotal) return `这将移除你所有的符文。`
      return `此过程将移除 ${this.glyphsDeleted}/${this.glyphsTotal} 个符文。`
    },

    // 这两个不需要是响应式的，因为每当符文发生变化时，模态框会自动关闭
    glyphsTotal() {
      return Glyphs.inventory.filter((slot) => slot !== null).length
    },
    glyphsDeleted() {
      return Glyphs.deleteAllRejected(false)
    },
  },
  methods: {
    update() {
      this.isRefining = GlyphSacrificeHandler.isRefining
    },
    handleYesClick() {
      Glyphs.deleteAllRejected(true)
    },
  },
  template: `
  <ModalWrapperChoice
    option="sacrificeAll"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ topLabel }}
    </template>
    <div class="c-modal-message__text">
      {{ message }}
    </div>
    <br>
    <div class="c-modal-hard-reset-danger">
      {{ extraMessage }}
    </div>
  </ModalWrapperChoice>
  `,
}
