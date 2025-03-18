import ModalWrapperChoice from './ModalWrapperChoice.js'

export default {
  name: 'UndoGlyphModal',
  components: {
    ModalWrapperChoice,
  },
  data() {
    return {
      showStoredGameTime: false,
    }
  },
  methods: {
    update() {
      this.showStoredGameTime = Enslaved.isUnlocked
    },
    realityInvalidate() {
      this.emitClose()
      Modal.message.show('Glyph Undo can only undo with a Reality!', { closeEvent: GAME_EVENT.REALITY_RESET_AFTER })
    },
    handleYesClick() {
      this.emitClose()
      Glyphs.undo()
    },
  },
  template: `
 <ModalWrapperChoice
    option="glyphUndo"
    @confirm="handleYesClick"
  >
    <template #header>
      你正要取消装备符文
    </template>
    <div
      class="c-modal-message__text c-text-wrapper"
      data-v-undo-glyph-modal
    >
      最后装备的符文将被移除。
      现实将被重置，但某些内容会恢复到装备符文时的状态：
      <br>
      <div
        class="c-text-wrapper"
        data-v-undo-glyph-modal
      >
        <br>- 反物质、无限点数和永恒点数
        <br>- 膨胀升级、快子粒子和膨胀时间
        <br>- 时间定理和永恒挑战的完成情况
        <br>- 时间维度和现实的解锁
        <br>- 当前无限/永恒/现实中的时间
        <span v-if="showStoredGameTime"><br>- 存储的游戏时间</span>
      </div>
      <br>
      请注意，如果你使某些内容的特殊条件失效（例如在不生产反物质的情况下完成现实的成就），即使取消操作后它们仍将保持失效状态。在这些情况下，你需要在不使用取消操作的情况下，在单个现实中完成这些条件。
    </div>
  </ModalWrapperChoice>
  `,
}
