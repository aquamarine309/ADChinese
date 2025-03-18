import ModalWrapperChoice from '../ModalWrapperChoice.js'

export default {
  name: 'PurgeGlyphModal',
  components: {
    ModalWrapperChoice,
  },
  props: {
    harsh: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    threshold() {
      return this.harsh ? 1 : 5
    },
    extraMessage() {
      if (this.glyphsDeleted === 0) return `这不会清除任何符文。`
      if (this.glyphsDeleted === this.glyphsTotal) return `这将清除你所有的符文。`
      return `${this.harsh ? `严格清除` : `清除`}将删除
        ${formatInt(this.glyphsDeleted)}/${formatInt(this.glyphsTotal)}
        个符文。`
    },
    explanation() {
      if (this.harsh) return `严格清除会删除那些在你库存中严格劣于其他符文的符文。例如，如果一个符文的所有效果与另一个符文相同，但所有效果的值都更差，那么它将被删除。`
      return `清除会删除那些严格劣于其他符文的符文，同时保留足够多的符文以装备一套完整的符文组合。这与严格清除类似，但普通清除在找到五个更好的符文（而不是仅一个）之前不会删除任何符文。`
    },
    topLabel() {
      return `你即将${this.harsh ? `严格清除` : `清除`}你的符文`
    },

    // 这两个不需要是响应式的，因为每当符文发生变化时，模态框会自动关闭
    glyphsTotal() {
      return Glyphs.inventory.filter((slot) => slot !== null).length
    },
    glyphsDeleted() {
      return Glyphs.autoClean(this.threshold, false)
    },
  },
  methods: {
    handleYesClick() {
      Glyphs.autoClean(this.threshold, true)
    },
  },
  template: `
  <ModalWrapperChoice
    option="autoClean"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ topLabel }}
    </template>
    <div class="c-modal-message__text">
      这可能会清除你库存中那些你以后可能还想使用的符文。清除将根据你的清除模式删除符文。你确定要这样做吗？
      <br>
      <br>
      {{ explanation }}
    </div>
    <br>
    <div class="c-modal-hard-reset-danger">
      {{ extraMessage }}
    </div>
  </ModalWrapperChoice>`,
}
