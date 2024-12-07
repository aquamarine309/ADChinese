import EternityButton from "./EternityButton.js";
import UnlockInfinityDimButton from "./UnlockInfinityDimButton.js";

export default {
  name: "HeaderEternityContainer",
  components: {
    EternityButton,
    UnlockInfinityDimButton,
  },
  data() {
    return {
      showContainer: false,
      showEP: false,
      showNextEP: false,
      eternityPoints: new Decimal(0),
      nextEP: new Decimal(0),
    };
  },
  methods: {
    update() {
      this.showContainer = player.break || PlayerProgress.eternityUnlocked();
      this.showEP = PlayerProgress.eternityUnlocked();
      this.eternityPoints.copyFrom(Currency.eternityPoints.value.floor());
      this.showNextEP = Player.canEternity && player.records.thisReality.maxEP.lt(100) &&
        gainedEternityPoints().lt(100);
      if (this.showNextEP) this.nextEP.copyFrom(requiredIPForEP(gainedEternityPoints().floor().toNumber() + 1));
    },
  },
  template: `
  <div
    v-if="showContainer"
    class="c-prestige-button-container"
  >
    <div
      v-if="showEP"
      class="c-eternity-points"
      data-v-header-eternity-container
    >
      你拥有
      <span class="c-game-header__ep-amount">{{ format(eternityPoints, 2) }}</span> 永恒点数。
      <span v-if="showNextEP">（下一个永恒点数需要 {{ format(nextEP, 1) }} 无限点数）</span>
    </div>
    <UnlockInfinityDimButton />
    <EternityButton />
  </div>
  `
};