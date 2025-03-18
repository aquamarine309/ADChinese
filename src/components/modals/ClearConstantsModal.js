import ModalWrapperChoice from './ModalWrapperChoice.js'

export default {
  name: 'ClearConstantsModal',
  components: {
    ModalWrapperChoice,
  },
  data() {
    return {
      constantCount: 0,
    }
  },
  methods: {
    update() {
      this.constantCount = Object.keys(player.reality.automator.constants).length
      if (this.constantCount === 0) this.emitClose()
    },
    deleteConstants() {
      player.reality.automator.constants = {}
      player.reality.automator.constantSortOrder = []
    },
  },
  template: `
  <ModalWrapperChoice
    @confirm="deleteConstants"
  >
    <template #header>
      删除自动机常量
    </template>
    <div class="c-modal-message__text">
      你确定要删除自动机中所有已定义的 {{formatInt(constantCount)}} 个常量吗？
      <br>
      <span
        class="l-lost-text"
        data-v-clear-constants-modal
      >
        这个删除操作是不可逆的！
      </span>
    </div>
    <template #confirm-text>
      删除所有常量
    </template>
  </ModalWrapperChoice>
  `,
}
