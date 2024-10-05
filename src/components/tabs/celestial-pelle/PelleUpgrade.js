import CostDisplay from "../../CostDisplay.js";
import CustomizeableTooltip from "../../CustomizeableTooltip.js";
import DescriptionDisplay from "../../DescriptionDisplay.js";

export default {
  name: "PelleUpgrade",
  components: {
    DescriptionDisplay,
    CostDisplay,
    CustomizeableTooltip
  },
  props: {
    upgrade: {
      type: Object,
      required: true
    },
    faded: {
      type: Boolean,
      required: false
    },
    galaxyGenerator: {
      type: Boolean,
      required: false,
    },
    showImprovedEstimate: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      canBuy: false,
      isBought: false,
      purchases: 0,
      currentTimeEstimate: new Decimal(0),
      projectedTimeEstimate: new Decimal(0),
      isCapped: false,
      hovering: false,
      hasRemnants: false,
      galaxyCap: 0,
      notAffordable: false
    };
  },
  computed: {
    config() {
      return this.upgrade.config;
    },
    effectText() {
      if (!this.config.formatEffect) return false;
      const prefix = this.isCapped ? "已达到上限：" : "当前：";
      const formattedEffect = x => this.config.formatEffect(this.config.effect(x));
      const value = formattedEffect(this.purchases);
      const next = (!this.isCapped && this.hovering)
        ? formattedEffect(this.purchases + 1)
        : undefined;
      return { prefix, value, next };
    },
    timeEstimate() {
      if (!this.hasTimeEstimate || !this.hasRemnants) return null;
      if (this.notAffordable) return "Never affordable due to Generated Galaxy cap";
      return this.currentTimeEstimate;
    },
    hasTimeEstimate() {
      return !(this.canBuy ||
        this.isBought ||
        this.isCapped ||
        (this.galaxyGenerator && this.config.currencyLabel !== "星系")
      );
    },
    shouldEstimateImprovement() {
      return this.showImprovedEstimate && this.hasTimeEstimate;
    },
    estimateImprovement() {
      if (!this.shouldEstimateImprovement) return "";
      if (!Pelle.canArmageddon) return `${this.currentTimeEstimate}`;
      // If the improved value is still "> 1 year" then we only show it once
      if (this.projectedTimeEstimate.startsWith(">")) return this.projectedTimeEstimate;
      return `${this.currentTimeEstimate} ➜ ${this.projectedTimeEstimate}`;
    },
  },
  methods: {
    update() {
      this.canBuy = this.upgrade.canBeBought && !this.faded;
      this.isBought = this.upgrade.isBought;
      this.isCapped = this.upgrade.isCapped;
      this.purchases = player.celestials.pelle.rebuyables[this.upgrade.config.id];
      this.currentTimeEstimate = TimeSpan
        .fromSeconds(this.secondsUntilCost(this.galaxyGenerator ? GalaxyGenerator.gainPerSecond
          : Pelle.realityShardGainPerSecond).toNumber())
        .toTimeEstimate();
      this.projectedTimeEstimate = TimeSpan
        .fromSeconds(this.secondsUntilCost(Pelle.nextRealityShardGain).toNumber())
        .toTimeEstimate();
      this.hasRemnants = Pelle.cel.remnants > 0;
      this.galaxyCap = GalaxyGenerator.generationCap;
      const genDB = GameDatabase.celestials.pelle.galaxyGeneratorUpgrades;
      this.notAffordable = (this.config === genDB.additive || this.config === genDB.multiplicative) &&
        (Decimal.gt(this.upgrade.cost, this.galaxyCap - GalaxyGenerator.generatedGalaxies + player.galaxies));
    },
    secondsUntilCost(rate) {
      const value = this.galaxyGenerator ? player.galaxies + GalaxyGenerator.galaxies : Currency.realityShards.value;
      return Decimal.sub(this.upgrade.cost, value).div(rate);
    },
  },
  template: `
  <button
    class="c-pelle-upgrade"
    :class="{
      'c-pelle-upgrade--unavailable': !canBuy && !(isBought || isCapped),
      'c-pelle-upgrade--bought': isBought || isCapped,
      'c-pelle-upgrade--faded': faded,
      'c-pelle-upgrade--galaxyGenerator': galaxyGenerator
    }"
    @click="!faded && upgrade.purchase()"
    @mouseover="hovering = true"
    @mouseleave="hovering = false"
    data-v-pelle-upgrade
  >
    <CustomizeableTooltip
      :show="shouldEstimateImprovement"
      left="50%"
      top="0"
      data-v-pelle-upgrade
    >
      <template #tooltipContent>
        {{ estimateImprovement }}
      </template>
    </CustomizeableTooltip>
    <CustomizeableTooltip
      v-if="timeEstimate"
      left="50%"
      top="0"
      content-class="l-fill-container"
      data-v-pelle-upgrade
    >
      <template #tooltipContent>
        {{ timeEstimate }}
      </template>
    </CustomizeableTooltip>
    <DescriptionDisplay :config="config" />
    <div
      class="l-pelle-upgrade-gap"
      data-v-pelle-upgrade
    />
    <div v-if="effectText">
      {{ effectText.prefix }} {{ effectText.value }}
      <template v-if="effectText.next">
        ➜ <span
          :class="{
            'c-improved-effect': canBuy,
            'c-improved-effect--unavailable': !canBuy,
          }"
          data-v-pelle-upgrade
        >
          {{ effectText.next }}
        </span>
      </template>
      <div
        class="l-pelle-upgrade-gap"
        data-v-pelle-upgrade
      />
    </div>
    <CostDisplay
      v-if="!isCapped"
      :config="config"
      :name="galaxyGenerator ? config.currencyLabel : '现实碎片'"
      data-v-pelle-upgrade
    />
  </button>
  `
};