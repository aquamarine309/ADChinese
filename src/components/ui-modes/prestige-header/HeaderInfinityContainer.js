import BigCrunchButton from "./BigCrunchButton.js";

export default {
  name: "HeaderInfinityContainer",
  components: {
    BigCrunchButton,
  },
  data() {
    return {
      showContainer: false,
      infinityPoints: new Decimal(0),
      isTesseractUnlocked: false,
      tesseractCost: new Decimal(0),
      tesseractText: "",
    };
  },
  methods: {
    update() {
      this.showContainer = player.break || PlayerProgress.infinityUnlocked();
      this.infinityPoints.copyFrom(Currency.infinityPoints.value.floor());
      this.isTesseractUnlocked = Enslaved.isCompleted;
      this.tesseractCost = Tesseracts.nextCost;
      this.tesseractText = this.tesseractProgress();
    },
    tesseractProgress() {
      const progress = this.infinityPoints.add(1).log10() / this.tesseractCost.log10();
      if (progress > 1) return `<b>（${formatPercents(1)}）</b>`;
      return `（${formatPercents(progress, 2, 2)}）`;
    },
  },
  template: `
  <div
    v-if="showContainer"
    class="c-prestige-button-container"
  >
    <div
      class="c-infinity-points"
      data-v-header-infinity-container
    >
      你拥有
      <span class="c-game-header__ip-amount">{{ format(infinityPoints, 2) }}</span>
      无限点数。
      <span
        v-if="isTesseractUnlocked"
        v-html="tesseractText"
      />
    </div>
    <BigCrunchButton />
  </div>
  `
};