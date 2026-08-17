import ModalWrapperChoice from "./ModalWrapperChoice.js";

export default {
  name: "SacrificeModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      currentMultiplier: new Decimal(),
      nextMultiplier: new Decimal(),
    };
  },
  computed: {
    message() {
      if (Achievement(118).isUnlocked && !Pelle.isDoomed) {
        return `维度献祭会根据你在献祭时拥有的第一反物质维度数量，为第八反物质维度提供加成。`;
      }
      return `维度献祭将移除你所有的第一至第七反物质维度（价格和倍数保持不变），根据献祭的第一反物质维度总量为第八反物质维度提供加成。恢复生产需要一定时间。`;
    },
    multiplierText() {
      return `当前倍数为 ${formatX(this.currentMultiplier, 2, 2)}，维度献祭后将提升至 ${formatX(this.nextMultiplier, 2, 2)}。`;
    },
  },
  methods: {
    update() {
      this.currentMultiplier.copyFrom(Sacrifice.totalBoost);
      this.nextMultiplier.copyFrom(Sacrifice.nextBoost.times(Sacrifice.totalBoost));
    },
    handleYesClick() {
      sacrificeReset();
    }
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
  `
};