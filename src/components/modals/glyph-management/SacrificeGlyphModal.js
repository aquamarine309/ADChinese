import ModalWrapperChoice from '../ModalWrapperChoice.js'

export default {
  name: 'SacrificeGlyphModal',
  components: {
    ModalWrapperChoice,
  },
  props: {
    idx: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      currentGlyphSacrifice: 0,
      gain: 0,
      confirmedSacrifice: false,
    }
  },
  computed: {
    glyph() {
      return Glyphs.findByInventoryIndex(this.idx)
    },
    message() {
      return `你确定要献祭这个符文吗？你已献祭的 ${this.glyph.type} 符文的总力量将从 ${format(this.currentGlyphSacrifice, 2, 2)} 增加至
      ${format(this.currentGlyphSacrifice + this.gain, 2, 2)}。`
    },
  },
  methods: {
    update() {
      this.currentGlyphSacrifice = player.reality.glyphs.sac[this.glyph.type]
      this.gain = GlyphSacrificeHandler.glyphSacrificeGain(this.glyph)

      const newGlyph = Glyphs.findByInventoryIndex(this.idx)
      if (this.glyph !== newGlyph && !this.confirmedSacrifice) {
        // ConfirmedSacrifice 在这里是因为当你确认献祭一个符文时，
        // 即使符文已成功献祭，此模态消息仍会显示。
        // 我不太清楚 eventHub 的工作原理，或者将 UI 更新放在献祭之前是否会破坏某些功能，
        // 所以这是我目前能想到的最佳解决方案。 - Scar

        this.emitClose()
        Modal.message.show('所选符文的位置已更改或已被其他方式修改！')
      }
    },
    handleYesClick() {
      this.confirmedSacrifice = true
      GlyphSacrificeHandler.sacrificeGlyph(this.glyph, true)
    },
  },
  template: `
  <ModalWrapperChoice
    option="glyphSacrifice"
    @confirm="handleYesClick"
  >
    <template #header>
      你即将献祭一个符文
    </template>
    <div class="c-modal-message__text">
      {{ message }}
    </div>
  </ModalWrapperChoice>
  `,
}
