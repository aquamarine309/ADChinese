import ModalWrapperChoice from './ModalWrapperChoice.js'

export default {
  name: 'SacrificeModal',
  components: {
    ModalWrapperChoice,
  },
  data() {
    return {
      currentMultiplier: new Decimal(),
      nextMultiplier: new Decimal(),
    }
  },
  computed: {
    message() {
      if (Achievement(118).isUnlocked && !Pelle.isDoomed) {
        return `维度献祭将根据你献祭时的第 1 反物质维度数量，提升第 8 反物质维度的效果。`
      }
      return `维度献祭将移除你所有的第 1 到第 7 反物质维度（成本和倍率保持不变），
        并根据献祭的第 1 反物质维度总量提升第 8 反物质维度的效果。恢复生产需要时间。`
    },
    multiplierText() {
      return `当前倍率为 ${formatX(this.currentMultiplier, 2, 2)}，献祭后将增加至
        ${formatX(this.nextMultiplier, 2, 2)}。`
    },
  },
  methods: {
    update() {
      this.currentMultiplier.copyFrom(Sacrifice.totalBoost)
      this.nextMultiplier.copyFrom(Sacrifice.nextBoost.times(Sacrifice.totalBoost))
    },
    handleYesClick() {
      sacrificeReset()
    },
  },
  template: `
  <ModalWrapperChoice
    option="sacrifice"
    @confirm="handleYesClick"
  >
    <template #header>
      维度献祭
    </template>
    <div class="c-modal-message__text">
      {{ message }}
    </div>
    <br>
    <div class="c-modal-message__text">
      {{ multiplierText }}
      <br>
    </div>
  </ModalWrapperChoice>
  `,
}
