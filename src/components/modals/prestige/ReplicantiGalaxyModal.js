import ModalWrapperChoice from '../ModalWrapperChoice.js'

export default {
  name: 'ReplicantiGalaxyModal',
  components: {
    ModalWrapperChoice,
  },
  data() {
    return {
      replicanti: new Decimal(),
      divideReplicanti: false,
      canBeBought: 0,
    }
  },
  computed: {
    topLabel() {
      return `你将要购买 ${formatInt(this.canBeBought)} 个复制器星系`
    },
    message() {
      const reductionString = this.divideReplicanti
        ? ` 每个复制器星系生成时将你的复制器除以 ${format(Number.MAX_VALUE, 2, 2)}
          (${format(this.replicanti, 2, 2)} to
          ${format(this.replicanti.divide(Decimal.NUMBER_MAX_VALUE.pow(this.canBeBought)), 2, 2)})`
        : `将你的复制器重置到 ${formatInt(1)}`
      return `复制星系提升计数频率升级的方式与反物质星系相同。但它不会
        增加反物质星系的成本，也不会受到反物质星系乘数的影响。
        它将 ${reductionString}.`
    },
  },
  methods: {
    update() {
      this.replicanti.copyFrom(player.replicanti.amount)
      this.divideReplicanti = Achievement(126).isUnlocked
      this.canBeBought = Replicanti.galaxies.gain
      if (this.replicanti.lt(Number.MAX_VALUE)) this.emitClose()
    },
    handleYesClick() {
      replicantiGalaxy(false)
    },
  },
  template: `
  <ModalWrapperChoice
    option="replicantiGalaxy"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ topLabel }}
    </template>
    <div class="c-modal-message__text">
      {{ message }}
    </div>
  </ModalWrapperChoice>
  `,
}
