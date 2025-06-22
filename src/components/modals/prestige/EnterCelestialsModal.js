import EnterCelestialsRaPet from "./EnterCelestialsRaPet.js";
import ModalWrapperChoice from "../ModalWrapperChoice.js";

export default {
  name: "EnterCelestialsModal",
  components: {
    ModalWrapperChoice,
    EnterCelestialsRaPet,
  },
  props: {
    number: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      laitelaFastest: 3600,
      teresaBestAM: new Decimal(),
      teresaRunMult: 0,
      effarigDone: false,
      effarigLayer: "",
      enslavedDone: false,
      laitelaTime: "",
    };
  },
  computed: {
    effects() {
      return GameDatabase.celestials.descriptions[this.number].effects().split("\n");
    },
    description() {
      const description = GameDatabase.celestials.descriptions[this.number].description;
      return description ? description() : "";
    },
    topLabel() {
      return `${this.name}的现实`;
    },
    message() {
      return `进行一次现实重置，随后进入${this.name}。在祂的现实中，你将：`;
    },
    extraLine() {
      switch (this.number) {
        case 0:
          return this.teresaBestAM.eq(1)
            ? `你还没有解锁特蕾莎的现实的奖励。 解锁该奖励需要购买解锁现实的时间研究，并完成一次现实。`
            : `你在特蕾莎的现实中最多获得 ${format(this.teresaBestAM, 2, 2)} 反物质，符文献祭效果的指数 ${formatX(this.teresaRunMult, 2)}.`;
        case 1: return this.effarigDone
          ? "已完成鹿颈长的所有层级！"
          : `你现在在 ${this.effarigLayer} 层级。`;
        case 2: return this.enslavedDone
          ? "我们……的帮助……还不够……"
          : "我们……能帮一下……让我们……帮一下";
        case 3: return "";
        case 4: return `在太阳神的现实中，一些资源将基于它们的数量，生成记忆块，进而获得天神记忆。`;
        case 5: return this.laitelaFastest >= 300
          ? "你尚未完成莱特拉的该层级现实。"
          : `完成此层级的最快用时为 ${this.laitelaTime}.`;
        case 6: return "";
        default: throw new Error(`Attempted to start an Unknown Celestial in Celestial Modal Confirmation.`);
      }
    }
  },
  methods: {
    update() {
      this.teresaBestAM.copyFrom(player.celestials.teresa.bestRunAM);
      this.teresaRunMult = Teresa.runRewardMultiplier;
      const effarigStage = Effarig.currentStage;
      this.effarigDone = effarigStage === EFFARIG_STAGES.COMPLETED;
      this.effarigLayer = [null, "无限", "永恒", "现实"][effarigStage];
      this.enslavedDone = Enslaved.isCompleted;
      this.laitelaFastest = player.celestials.laitela.fastestCompletion;
      this.laitelaTime = TimeSpan.fromSeconds(this.laitelaFastest).toStringShort();
    },
    handleYesClick() {
      beginProcessReality(getRealityProps(true));
      switch (this.number) {
        case 0: return Teresa.initializeRun();
        case 1: return Effarig.initializeRun();
        case 2: return Enslaved.initializeRun();
        case 3: return V.initializeRun();
        case 4: return Ra.initializeRun();
        case 5: return Laitela.initializeRun();
        case 6: throw new Error(`Attempted to start Pelle through EnterCelestialsModal instead of ArmageddonModal`);
        default: throw new Error(`Attempted to start an Unknown Celestial in Celestial Modal Confirmation.`);
      }
    },
  },
  template: `
  <ModalWrapperChoice @confirm="handleYesClick">
    <template #header>
      {{ topLabel }}
    </template>
    <div
      class="c-modal-message__text"
      data-v-enter-celestials-modal
    >
      {{ message }}
      <br>
      <br>
      <div
        class="c-modal-celestial__run-effects"
        data-v-enter-celestials-modal
      >
        <div
          v-for="(effect, i) in effects"
          :key="i"
          class="c-modal-celestial__run-effects__line"
          data-v-enter-celestials-modal
        >
          <b v-if="effect.trim()">&bull;</b>
          <b>&nbsp;</b>
          {{ effect }}
        </div>
      </div>
      <div
        v-if="description"
        class="reality-description"
        data-v-enter-celestials-modal
      >
        <br><br>
        {{ description }}
      </div>
      <br><br>
      <div>
        {{ extraLine }}
      </div>
      <span v-if="number === 4">
        <EnterCelestialsRaPet
          v-for="id in 4"
          :key="id"
          :pet-id="id - 1"
        />
      </span>
    </div>
    <template #confirm-text>
      进行挑战
    </template>
  </ModalWrapperChoice>
  `
};