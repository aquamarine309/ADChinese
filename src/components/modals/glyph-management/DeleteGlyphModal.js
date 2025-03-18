import ModalWrapperChoice from '../ModalWrapperChoice.js'

export default {
  name: 'DeleteGlyphModal',
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
      confirmedDelete: false,
    }
  },
  computed: {
    glyph() {
      return Glyphs.findByInventoryIndex(this.idx)
    },
  },
  methods: {
    update() {
      const newGlyph = Glyphs.findByInventoryIndex(this.idx)
      if (this.glyph !== newGlyph && !this.confirmedDelete) {
        // Why is confirmedDelete here: refer to SacrificeGlyphModal.vue

        this.emitClose()
        Modal.message.show('被选中的符文改变位置了，啥？')
      }
    },
    handleYesClick() {
      this.confirmedDelete = true
      Glyphs.removeFromInventory(this.glyph)
    },
  },
  template: `
  <ModalWrapperChoice @confirm="handleYesClick">
    <template #header>
      你正要删除符文
    </template>
    <div class="c-modal-message__text">
      删除符文会将其从你的仓库中移除！
      <div class="c-modal-hard-reset-danger">
        你在解锁符文献祭之前这样做没有任何加成！
      </div>
    </div>
  </ModalWrapperChoice>
  `,
}
