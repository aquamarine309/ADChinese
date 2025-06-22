import ModalWrapperChoice from "../ModalWrapperChoice.js";

export default {
  name: "ReplicantiGalaxyModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      replicanti: new Decimal(),
      divideReplicanti: false,
      canBeBought: 0,
    };
  },
  computed: {
    topLabel() {
      return `你将要购买 ${formatInt(this.canBeBought)} 个复制器星系`;
    },
    message() {
      return `复制器星系对计数频率的提升效果与反物质星系相同，但不会增加反物质星系价格，也不受反物质星系专属倍率影响。其代价是：${this.divideReplicanti
       ? `每购买一个复制器星系，需将复制器除以 ${format(Number.MAX_VALUE, 2, 2)}（${format(this.replicanti, 2, 2)} → ${format(this.replicanti.divide(Decimal.NUMBER_MAX_VALUE.pow(this.canBeBought)), 2, 2)}）`  
      : `将复制器重置为 ${formatInt(1)}`}。`
    }
  },
  methods: {
    update() {
      this.replicanti.copyFrom(player.replicanti.amount);
      this.divideReplicanti = Achievement(126).isUnlocked;
      this.canBeBought = Replicanti.galaxies.gain;
      if (this.replicanti.lt(Number.MAX_VALUE)) this.emitClose();
    },
    handleYesClick() {
      replicantiGalaxy(false);
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
  `
};
