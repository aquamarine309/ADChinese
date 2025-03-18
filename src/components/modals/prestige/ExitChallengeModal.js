import ModalWrapperChoice from '../ModalWrapperChoice.js'

export default {
  name: 'ExitChallengeModal',
  components: {
    ModalWrapperChoice,
  },
  props: {
    challengeName: {
      type: String,
      required: true,
    },
    normalName: {
      type: String,
      required: true,
    },
    hasHigherLayers: {
      type: Boolean,
      required: true,
    },
    exitFn: {
      type: Function,
      required: true,
    },
  },
  computed: {
    isCelestial() {
      return this.challengeName.match('Reality')
    },
    isRestarting() {
      return this.isCelestial ? player.options.retryCelestial : player.options.retryChallenge
    },
  },
  methods: {
    handleYesClick() {
      this.exitFn()
      EventHub.ui.offAll(this)
    },
  },
  template: `
  <ModalWrapperChoice
    option="exitChallenge"
    @confirm="handleYesClick"
  >
    <template #header>
      你正要{{ isRestarting ? "重启" : "退出" }} {{ challengeName }}
    </template>

    <div class="c-modal-message__text">
      <span v-if="isRestarting">
        你会立即重新进入{{ challengeName }} 在确认模态框之后。
      </span>
      <span v-else>
        这会让你回到 {{ normalName }} 而没有任何限制。
      </span>
      <span v-if="hasHigherLayers">
        来自更高层级的限制效果依然继续适用。
      </span>
    </div>
    <template #confirm-text>
      {{ isRestarting ? "重启" : "退出" }}
    </template>
  </ModalWrapperChoice>
  `,
}
