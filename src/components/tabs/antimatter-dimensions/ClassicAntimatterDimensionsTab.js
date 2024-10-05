import AntimatterDimensionProgressBar from "./AntimatterDimensionProgressBar.js";
import AntimatterDimensionRow from "./ClassicAntimatterDimensionRow.js";
import AntimatterDimensionsTabHeader from "./ClassicAntimatterDimensionsTabHeader.js";
import AntimatterGalaxyRow from "./ClassicAntimatterGalaxyRow.js";
import DimensionBoostRow from "./ClassicDimensionBoostRow.js";
import PrimaryButton from "../../PrimaryButton.js";
import TickspeedRow from "./TickspeedRow.js";

export default {
  name: "ClassicAntimatterDimensionsTab",
  components: {
    PrimaryButton,
    AntimatterDimensionRow,
    AntimatterDimensionsTabHeader,
    AntimatterGalaxyRow,
    DimensionBoostRow,
    AntimatterDimensionProgressBar,
    TickspeedRow,
  },
  data() {
    return {
      hasDimensionBoosts: false,
      isQuickResetAvailable: false,
      isSacrificeUnlocked: false,
      buy10Mult: new Decimal(0),
      currentSacrifice: new Decimal(0),
      hasRealityButton: false,
      multiplierText: ""
    };
  },
  methods: {
    update() {
      this.hasDimensionBoosts = player.dimensionBoosts > 0;
      this.isQuickResetAvailable = Player.isInAntimatterChallenge && Player.antimatterChallenge.isQuickResettable;
      this.isSacrificeUnlocked = Sacrifice.isVisible;
      this.buy10Mult.copyFrom(AntimatterDimensions.buyTenMultiplier);
      this.currentSacrifice.copyFrom(Sacrifice.totalBoost);
      this.hasRealityButton = PlayerProgress.realityUnlocked() || TimeStudy.reality.isBought;
      const sacText = this.isSacrificeUnlocked
        ? ` | 献祭加成：${formatX(this.currentSacrifice, 2, 2)}`
        : "";
      this.multiplierText = `购买10个维度的加成倍数：${formatX(this.buy10Mult, 2, 2)}${sacText}`;
    },
    quickReset() {
      softReset(-1, true, true);
    }
  },
  template: `
  <div class="l-old-ui-antimatter-dim-tab">
    <AntimatterDimensionsTabHeader />
    {{ multiplierText }}
    <TickspeedRow />
    <div class="l-dimensions-container">
      <AntimatterDimensionRow
        v-for="tier in 8"
        :key="tier"
        :tier="tier"
      />
      <DimensionBoostRow />
      <AntimatterGalaxyRow />
    </div>
    <PrimaryButton
      v-if="isQuickResetAvailable"
      class="o-primary-btn--quick-reset"
      @click="quickReset"
    > 
      <span v-if="hasDimensionBoosts">失去一个维度提升，再进行一次维度提升重置</span>
      <span v-else>进行一次无加成的维度提升</span>
    </PrimaryButton>
    <div
      class="l-flex"
      data-v-classic-antimatter-dimensions-tab
    />
    <AntimatterDimensionProgressBar class="l-antimatter-dim-tab__progress_bar" />
  </div>
  `
};