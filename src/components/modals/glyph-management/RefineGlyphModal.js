import ModalWrapperChoice from '../ModalWrapperChoice.js'

export default {
  name: 'RefineGlyphModal',
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
      resourceAmount: 0,
      resourceUnlocked: false,
      gain: 0,
      after: 0,
      cap: 0,
      confirmedRefine: false,
    }
  },
  computed: {
    glyph() {
      return Glyphs.findByInventoryIndex(this.idx)
    },
    resource() {
      return GlyphSacrificeHandler.glyphAlchemyResource(this.glyph)
    },
    resourceName() {
      return this.resource.name
    },
  },
  methods: {
    update() {
      const resource = this.resource
      this.resourceAmount = resource.amount
      this.resourceUnlocked = resource.isUnlocked
      this.gain = GlyphSacrificeHandler.glyphRefinementGain(this.glyph)
      this.cap = GlyphSacrificeHandler.glyphEffectiveCap(this.glyph)

      this.after = this.resourceAmount + this.gain

      const newGlyph = Glyphs.findByInventoryIndex(this.idx)
      if (this.glyph !== newGlyph && !this.confirmedRefine) {
        // 为什么需要 confirmedRefine：请参考 SacrificeGlyphModal.vue

        this.emitClose()
        Modal.message.show('所选符文的位置已更改或已被其他方式修改！')
      }
    },
    handleYesClick() {
      this.confirmedRefine = true
      GlyphSacrificeHandler.refineGlyph(this.glyph)
    },
  },
  template: `
  <ModalWrapperChoice
    option="glyphRefine"
    @confirm="handleYesClick"
  >
    <template #header>
      你即将精炼一个符文
    </template>
    <div
      v-if="resourceUnlocked"
      class="c-modal-message__text"
    >
      精炼符文会将其从你的库存中移除，作为回报，
      你的 {{ resourceName }} 炼金资源将从
      {{ format(resourceAmount, 2, 2) }} 增加至 {{ format(after, 2, 2) }}。
      此符文最多可将你的 {{ resourceName }} 资源提升至 {{ format(cap, 2, 2) }}。
    </div>
    <div
      v-else
      class="c-modal-message__text"
    >
      你无法获得任何 {{ resourceName }} 炼金资源，因为你尚未解锁此符文的资源。
      你仍然可以精炼它，但不会发生任何变化。建议改为献祭该符文。
    </div>
  </ModalWrapperChoice>
  `,
}
