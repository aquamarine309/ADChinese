import ModalWrapperChoice from '../ModalWrapperChoice.js'

export default {
  name: 'EternityChallengeStartModal',
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
      return EternityChallenge(this.id)
    },
    challengeIsCompleted() {
      return this.challenge.isFullyCompleted
    },
    message() {
      return `你将进行一次永恒（如果可能）并进入挑战限定永恒，激活挑战相关的限制和加成。
        为了完成挑战${this.challengeIsCompleted ? '' : ' 并获取奖励'},
        你必须达到挑战目标
        ${format(this.challenge.currentGoal)}无限点数。你最多能完成挑战
        ${formatInt(5)}次，每次目标和奖励都会增加。`
    },
    entranceLabel() {
      return `你正要进入永恒挑战${this.id}`
    },
    reward() {
      let rewardDescription = this.challenge._config.reward.description
      if (typeof rewardDescription === 'function') {
        rewardDescription = rewardDescription()
      }
      return `完成挑战的奖励是：${rewardDescription}`
    },
    condition() {
      let conditionOfChallenge = this.challenge._config.description
      if (typeof conditionOfChallenge === 'function') {
        conditionOfChallenge = conditionOfChallenge()
      }
      return `在挑战内部，${conditionOfChallenge}`
    },
  },
  created() {
    this.on$(GAME_EVENT.ETERNITY_RESET_AFTER, this.emitClose)
    this.on$(GAME_EVENT.REALITY_RESET_AFTER, this.emitClose)
  },
  methods: {
    handleYesClick() {
      this.challenge.start(true)
      EventHub.ui.offAll(this)
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
