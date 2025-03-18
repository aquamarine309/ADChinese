import ModalWrapperChoice from '../ModalWrapperChoice.js'

export default {
  name: 'ResetRealityModal',
  components: {
    ModalWrapperChoice,
  },
  data() {
    return {
      isDoomed: false,
      canReality: false,
    }
  },
  computed: {
    resetTerm() {
      return this.isDoomed ? '末日' : '现实'
    },
  },
  methods: {
    update() {
      this.isDoomed = Pelle.isDoomed
      this.canReality = isRealityAvailable()
    },
    handleYesClick() {
      beginProcessReality(getRealityProps(true))
      EventHub.ui.offAll(this)
    },
  },
  template: `
  <ModalWrapperChoice
    option="resetReality"
    @confirm="handleYesClick"
  >
    <template #header>
      你即将重置你的{{ resetTerm }}
    </template>
    <div
      class="c-modal-message__text"
      data-v-reset-reality-modal
    >
      这将使你重置到{{ resetTerm }}的起点，
      你将不会从当前{{ resetTerm }}的进度中获得任何奖励。
      <br>
      <br>
      你确定要这样做吗？
      <div
        v-if="canReality"
        class="c-has-rewards"
        data-v-reset-reality-modal
      >
        <br>
        你目前可以完成一次现实以获取所有正常奖励，但如果你在此处重置，将不会获得这些奖励。
        要获取奖励，请使用“创建新现实”按钮。
      </div>
      <br>
    </div>
    <template #confirm-text>
      重置
    </template>
  </ModalWrapperChoice>
  `,
}
