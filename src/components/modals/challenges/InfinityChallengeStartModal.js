import ModalWrapperChoice from '../ModalWrapperChoice.js'

export default {
  name: 'InfinityChallengeStartModal',
  components: {
    ModalWrapperChoice,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  computed: {
    challenge() {
      return InfinityChallenge(this.id)
    },
    challengeIsCompleted() {
      return this.challenge.isCompleted
    },
    message() {
      return `你将进行大坍缩（如果可能），并在挑战中开始一次新的无限，同时激活所有挑战特定的限制和修改。
        要完成挑战${this.challengeIsCompleted ? '' : '并获得奖励'}，
        你必须达到挑战目标：
        ${format(InfinityChallenge(this.id).goal)} 反物质。
        无论拥有何种升级，你都不会以任何维度提升或星系开始。`
    },
    entranceLabel() {
      return `你即将进入无限挑战 ${this.id}`
    },
    reward() {
      let rewardDescription = this.challenge._config.reward.description
      if (typeof rewardDescription === 'function') {
        rewardDescription = rewardDescription()
      }
      return `完成此挑战的奖励是：${rewardDescription}`
    },
    condition() {
      let conditionOfChallenge = this.challenge._config.description
      if (typeof conditionOfChallenge === 'function') {
        conditionOfChallenge = conditionOfChallenge()
      }
      return `在此无限挑战中，${conditionOfChallenge}`
    },
  },
  created() {
    this.on$(GAME_EVENT.ETERNITY_RESET_AFTER, this.emitClose)
    this.on$(GAME_EVENT.REALITY_RESET_AFTER, this.emitClose)
  },
  methods: {
    handleYesClick() {
      this.challenge.start()
    },
  },
  template: `
  <ModalWrapperChoice
    option="challenges"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ entranceLabel }}
    </template>
    <div class="c-modal-message__text">
      {{ message }}
      <br><br>
      {{ condition }}
    </div>
    <div
      v-if="!challengeIsCompleted"
      class="c-modal-message__text"
    >
      <br>
      {{ reward }}
    </div>
    <template #confirm-text>
      开始
    </template>
  </ModalWrapperChoice>
  `,
}
