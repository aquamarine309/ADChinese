export default {
  name: "DarkMatterDimensionRow",
  props: {
    tier: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isUnlocked: false,
      ascension: 0,
      hasAscended: false,
      powerDMPerAscension: 0,
      interval: 0,
      powerDM: new Decimal(0),
      powerDE: 0,
      intervalCost: 0,
      powerDMCost: 0,
      powerDECost: 0,
      amount: new Decimal(0),
      canBuyInterval: false,
      canBuyPowerDM: false,
      canBuyPowerDE: false,
      isIntervalCapped: false,
      timer: 0,
      timerPecent: 0,
      intervalAscensionBump: 10000,
      intervalAfterAscension: 0,
      darkEnergyPerSecond: 0,
      portionDE: 0,
      productionPerSecond: new Decimal(0),
      percentPerSecond: 0,
      hoverOverAscension: false,
    };
  },
  computed: {
    name() {
      return `${DarkMatterDimension(this.tier).shortDisplayName}暗物质维度`;
    },
    ascensionText() {
      return `(⯅${formatInt(this.ascension)})`;
    },
    intervalClassObject() {
      return {
        "o-dark-matter-dimension-button": true,
        "o-dark-matter-dimension-button--available": this.canBuyInterval,
        "o-dark-matter-dimension-button--ascend": this.isIntervalCapped
      };
    },
    darkMatterClassObject() {
      return {
        "o-dark-matter-dimension-button": true,
        "o-dark-matter-dimension-button--available": this.hoverOverAscension || this.canBuyPowerDM,
        "o-dark-matter-dimension-button--accent": this.hoverOverAscension
      };
    },
    darkEnergyClassObject() {
      return {
        "o-dark-matter-dimension-button": true,
        "o-dark-matter-dimension-button--available": this.hoverOverAscension || this.canBuyPowerDE,
        "o-dark-matter-dimension-button--accent": this.hoverOverAscension
      };
    },
    intervalText() {
      const interval = this.hoverOverAscension ? this.intervalAfterAscension : this.interval;
      const str = interval > 1000 ? `${format(interval / 1000, 2, 2)}秒` : `${format(interval, 2, 2)}毫秒`;
      const line1 = this.hoverOverAscension ? `<b>${str}</b>` : str;

      let line2;
      if (this.isIntervalCapped) line2 = this.hoverOverAscension ? "飞升时 ➜" : "飞升！";
      else line2 = `价格：${this.formatDMCost(this.intervalCost)} 暗物质`;
      return ` ${line1}<br>${line2}`;
    },
    darkMatterText() {
      const dm = this.powerDM.times(this.hoverOverAscension ? this.powerDMPerAscension : 1);
      const str = `暗物质 ${formatX(dm, 2, 2)}`;
      const line1 = this.hoverOverAscension ? `<b>${str}</b>` : str;

      const ascMult = this.powerDMPerAscension * this.interval / this.intervalAfterAscension;
      const line2 = this.hoverOverAscension
        ? `${formatX(ascMult, 2, 2)} / 秒`
        : `价格：${this.formatDMCost(this.powerDMCost)} 暗物质`;
      return `${line1}<br>${line2}`;
    },
    darkEnergyText() {
      const de = this.powerDE * (this.hoverOverAscension ? POWER_DE_PER_ASCENSION : 1);
      const str = `暗能量 +${format(de, 2, 4)}`;
      const line1 = this.hoverOverAscension ? `<b>${str}</b>` : str;
      const ascMult = POWER_DE_PER_ASCENSION * this.interval / this.intervalAfterAscension;
      const line2 = this.hoverOverAscension
        ? `${formatX(ascMult, 2, 2)} / 秒`
        : `价格：${this.formatDMCost(this.powerDECost)} 暗物质`;
      return `${line1}<br>${line2}`;
    },
    ascensionTooltip() {
      return `间隔已达到上限 ${formatInt(DarkMatterDimension(this.tier).intervalPurchaseCap)} 毫秒。
        飞升后间隔乘以 ${formatInt(this.intervalAscensionBump)}，
        暗物质产量乘以 ${formatInt(this.powerDMPerAscension)}，并且暗能量乘以 ${formatInt(POWER_DE_PER_ASCENSION)}。`;
    }
  },
  methods: {
    update() {
      const dim = DarkMatterDimension(this.tier);
      this.isUnlocked = dim.isUnlocked;
      this.ascension = dim.ascensions;
      this.hasAscended = this.ascension > 0;
      this.powerDMPerAscension = dim.powerDMPerAscension;
      this.interval = dim.interval;
      this.powerDM.copyFrom(dim.powerDM);
      this.powerDE = dim.powerDE;
      this.intervalCost = dim.intervalCost;
      this.powerDMCost = dim.powerDMCost;
      this.powerDECost = dim.powerDECost;
      this.amount.copyFrom(dim.amount);
      this.canBuyInterval = dim.canBuyInterval;
      this.canBuyPowerDM = dim.canBuyPowerDM;
      this.canBuyPowerDE = dim.canBuyPowerDE;
      this.isIntervalCapped = dim.interval <= dim.intervalPurchaseCap;
      this.timer = dim.timeSinceLastUpdate;
      this.timerPercent = this.timer / this.interval;
      this.intervalAscensionBump = SingularityMilestone.ascensionIntervalScaling.effectOrDefault(1200);
      this.intervalAfterAscension = dim.intervalAfterAscension;
      this.darkEnergyPerSecond = dim.productionPerSecond;
      this.portionDE = this.darkEnergyPerSecond / Currency.darkEnergy.productionPerSecond;
      this.productionPerSecond = this.dimensionProduction(this.tier);
      this.percentPerSecond = Decimal.divide(this.productionPerSecond, this.amount).toNumber();
      if (!this.isIntervalCapped) this.hoverOverAscension = false;
    },
    handleIntervalClick() {
      if (this.isIntervalCapped) DarkMatterDimension(this.tier).ascend();
      else DarkMatterDimension(this.tier).buyInterval();
    },
    buyPowerDM() {
      DarkMatterDimension(this.tier).buyPowerDM();
    },
    buyPowerDE() {
      DarkMatterDimension(this.tier).buyPowerDE();
    },
    // All the values are internally Decimals and technically allowed to go above Infinity. This is a special case
    // however; it looks better in-game if we just format it as Infinity instead, as the resource used for these costs
    // is itself hardcapped at e308 and we specifically want to format here (and nowhere else) as Infinity.
    formatDMCost(cost) {
      return cost.gt(Number.MAX_VALUE) ? Notations.current.infinite : format(cost, 2);
    },
    dimensionProduction(tier) {
      if (tier === 4) return SingularityMilestone.dim4Generation.effectOrDefault(0);
      const prodDim = DarkMatterDimension(tier + 1);
      return prodDim.amount.times(prodDim.powerDM).divide(prodDim.interval).times(1000);
    },
    hoverState(state) {
      if (!this.isIntervalCapped) return;
      this.hoverOverAscension = state;
    }
  },
  template: `
  <div
    v-if="isUnlocked"
    class="c-dark-matter-dimension-container"
  >
    <div class="o-dark-matter-dimension-amount">
      {{ name }}<span v-if="hasAscended"> {{ ascensionText }}</span>: {{ format(amount, 2) }}
    </div>
    <div>
      平均增速：{{ format(productionPerSecond, 2, 2) }}/秒
      （+{{ formatPercents(percentPerSecond, 2, 2) }}/秒）
    </div>
    <div class="c-dark-matter-dimension-buttons">
      <button
        :class="intervalClassObject"
        @click="handleIntervalClick"
        @mouseover="hoverState(true)"
        @mouseleave="hoverState(false)"
      >
        <span
          v-if="isIntervalCapped"
          :ach-tooltip="ascensionTooltip"
        >
          <i class="fas fa-question-circle" />
        </span>
        <span v-html="intervalText" />
      </button>
      <button
        :class="darkMatterClassObject"
        @click="buyPowerDM"
      >
        <span v-html="darkMatterText" />
      </button>
      <button
        :class="darkEnergyClassObject"
        @click="buyPowerDE"
      >
        <span v-html="darkEnergyText" />
      </button>
    </div>
    <div v-if="interval > 200">
      时刻：{{ formatInt(timer) }} 毫秒（{{ formatPercents(timerPercent, 1) }}）
    </div>
    <div v-else>
      {{ format(1000 / interval, 2, 2) }} 时刻 / 秒
    </div>
    <div>
      暗能量：{{ format(darkEnergyPerSecond, 2, 4) }}/秒（总量的 {{ formatPercents(portionDE, 1) }}）
    </div>
  </div>
  `
};