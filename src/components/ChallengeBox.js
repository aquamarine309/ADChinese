import HintText from './HintText.js'

export default {
  name: 'ChallengeBox',
  components: {
    HintText,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    isUnlocked: {
      type: Boolean,
      required: true,
    },
    isRunning: {
      type: Boolean,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      required: true,
    },
    lockedAt: {
      type: Decimal,
      required: false,
      default: undefined,
    },
    overrideLabel: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      inC1: Boolean,
      infinities: new Decimal(0),
    }
  },
  computed: {
    buttonClassObject() {
      const challengeLocked = !(this.isCompleted || this.isRunning || this.inC1 || this.isUnlocked)
      // It's important to disable the cursor for Normal Challenge 1, challenges that are running, or
      // for challenges unable to be unlocked and not unlocked.
      const challengeNotEnterable = !this.isUnlocked || this.isRunning || this.name === '挑战1'
      return {
        'o-challenge-btn': true,
        'o-challenge-btn--broken': this.overrideLabel.length > 0 && this.name !== '挑战1',
        'o-challenge-btn--broken-alt': this.overrideLabel.length > 0 && this.name === '挑战10',
        'o-challenge-btn--running': this.isRunning || this.inC1,
        'o-challenge-btn--completed': this.isCompleted && this.isUnlocked,
        'o-challenge-btn--unlocked': !this.isCompleted && this.isUnlocked,
        'o-challenge-btn--locked': challengeLocked,
        'o-challenge-btn--unenterable': challengeNotEnterable,
      }
    },
    buttonText() {
      if (this.overrideLabel.length > 0) return this.overrideLabel
      if (this.isRunning || this.inC1) return '正在进行'
      if (this.isCompleted) return '已完成'
      if (this.isUnlocked) return '开始挑战'
      const lockedText = this.lockedAt === undefined ? '' : `（${formatInt(this.infinities)}/${formatInt(this.lockedAt)}）`
      return `已锁定${lockedText}`
    },
  },
  methods: {
    update() {
      this.inC1 = this.name === '挑战1' && !this.isCompleted && !Player.isInAntimatterChallenge
      this.infinities.copyFrom(Currency.infinities)
    },
  },
  template: `
  <div class="c-challenge-box l-challenge-box">
    <HintText
      type="challenges"
      class="l-hint-text--challenge"
    >
    {{ name }}
    </HintText>
    <slot name="top" />
    <div class="l-challenge-box__fill" />
    <button
      :class="buttonClassObject"
      @click="$emit('start')"
      data-v-challenge-box
    >
      {{ buttonText }}
    </button>
    <slot name="bottom" />
  </div>
  `,
}
