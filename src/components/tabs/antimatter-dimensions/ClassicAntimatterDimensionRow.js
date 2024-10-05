import GenericDimensionRowText from "../../GenericDimensionRowText.js";
import PrimaryButton from "../../PrimaryButton.js";

export default {
  name: "ClassicAntimatterDimensionRow",
  components: {
    GenericDimensionRowText,
    PrimaryButton
  },
  props: {
    tier: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      end: false,
      isUnlocked: false,
      isCapped: false,
      multiplier: new Decimal(0),
      amount: new Decimal(0),
      bought: 0,
      boughtBefore10: 0,
      rateOfChange: new Decimal(0),
      singleCost: new Decimal(0),
      until10Cost: new Decimal(0),
      isAffordable: false,
      isAffordableUntil10: false,
      isContinuumActive: false,
      continuumValue: 0,
      isShown: false,
      isCostsAD: false,
      formattedAmount: null,
      hasTutorial: false,
    };
  },
  computed: {
    isDoomed: () => Pelle.isDoomed,
    name() {
      return `${AntimatterDimension(this.tier).shortDisplayName}反物质维度`;
    },
    amountText() {
      if (this.formattedAmount) return this.formattedAmount;
      const amount = this.tier < 8 ? format(this.amount, 2) : formatInt(this.amount);
      return `${amount} (${formatInt(this.boughtBefore10)})`;
    },
    singleText() {
      if (this.isCapped) return "已达到上限";
      const prefix = this.showCostTitle(this.singleCost) ? "价格：" : "";
      const suffix = this.isCostsAD ? `${this.costUnit}` : "反物质";
      return `${prefix} ${format(this.singleCost)} ${suffix}`;
    },
    until10Text() {
      if (this.isCapped) return "已被无名氏粉碎";
      if (this.isContinuumActive) return `连续统：${this.continuumString}`;

      const prefix = `买到 ${formatInt(10)} 个，${this.showCostTitle(this.until10Cost) ? "价格" : ""}`;
      const suffix = this.isCostsAD ? `${this.costUnit}` : "反物质";
      return `${prefix} ${format(this.until10Cost)} ${suffix}`;
    },
    continuumString() {
      return formatFloat(this.continuumValue, 2);
    },
    showRow() {
      return this.isShown || this.isUnlocked || this.amount.gt(0);
    },
    boughtTooltip() {
      if (this.isCapped) return `无名氏阻止你购买超过 ${formatInt(1)} 个第八维`;
      if (this.isContinuumActive) return "连续统生产所有反物质维度";
      return `已购买 ${formatInt(this.bought)} 次`;
    },
    costUnit() {
      return `${AntimatterDimension(this.tier - 2).shortDisplayName}维`;
    },
    buySingleClass() {
      return {
        "o-primary-btn--buy-ad o-primary-btn--buy-single-ad c-dim-tooltip-container": true,
        "l-dim-row-small-text": this.isLongText(this.singleText) || !this.showCostTitle(this.singleCost),
      };
    },
    buyTenClass() {
      return {
        "o-primary-btn--buy-ad o-primary-btn--buy-dim c-dim-tooltip-container": true,
        "o-primary-btn--buy-10-ad": !this.isContinuumActive,
        "o-primary-btn--continuum-ad o-continuum": this.isContinuumActive,
        "l-dim-row-small-text": this.isLongText(this.until10Text) && !this.isContinuumActive
      };
    }
  },
  methods: {
    update() {
      const tier = this.tier;
      if (tier === 8 && this.isDoomed) this.formattedAmount = formatInt(this.amount);
      if (tier > DimBoost.maxDimensionsUnlockable) return;
      const dimension = AntimatterDimension(tier);
      this.isUnlocked = dimension.isAvailableForPurchase;
      this.isCapped = tier === 8 && Enslaved.isRunning && dimension.bought >= 1;
      this.multiplier.copyFrom(dimension.multiplier);
      this.amount.copyFrom(dimension.totalAmount);
      this.totalAmount = dimension.totalAmount;
      this.bought = dimension.bought;
      this.boughtBefore10 = dimension.boughtBefore10;
      this.singleCost.copyFrom(dimension.cost);
      this.until10Cost.copyFrom(dimension.costUntil10);
      if (tier < 8) {
        this.rateOfChange.copyFrom(dimension.rateOfChange);
      }
      this.isAffordable = dimension.isAffordable;
      this.isAffordableUntil10 = dimension.isAffordableUntil10;
      this.isContinuumActive = Laitela.continuumActive;
      if (this.isContinuumActive) this.continuumValue = dimension.continuumValue;
      this.isShown =
        (DimBoost.totalBoosts > 0 && DimBoost.totalBoosts + 3 >= tier) || PlayerProgress.infinityUnlocked();
      this.isCostsAD = NormalChallenge(6).isRunning && tier > 2 && !this.isContinuumActive;
      this.hasTutorial = (tier === 1 && Tutorial.isActive(TUTORIAL_STATE.DIM1)) ||
        (tier === 2 && Tutorial.isActive(TUTORIAL_STATE.DIM2));
    },
    buySingle() {
      if (this.isContinuumActive) return;
      buyOneDimension(this.tier);
    },
    buyUntil10() {
      if (this.isContinuumActive) return;
      buyManyDimension(this.tier);
    },
    showCostTitle(value) {
      return value.exponent < 1000000;
    },
    isLongText(str) {
      return str.length > 20;
    },
    tutorialClass() {
      return {
        "l-glow-container": true,
        "tutorial--glow": this.isAffordable && this.hasTutorial
      };
    },
  },
  template: `
  <div
    v-show="showRow"
    class="c-dimension-row c-antimatter-dim-row l-dimension-single-row"
    :class="{ 'c-dim-row--not-reached': !isUnlocked }"
    data-v-classic-antimatter-dimension-row
  >
    <GenericDimensionRowText
      :tier="tier"
      :name="name"
      :multiplier-text="formatX(multiplier, 2, 2)"
      :amount-text="amountText"
      :rate="rateOfChange"
    />
    <div
      class="l-dim-row-multi-button-container"
      data-v-classic-antimatter-dimension-row
    >
      <PrimaryButton
        v-if="!isContinuumActive"
        :enabled="isAffordable && !isCapped && isUnlocked"
        :class="buySingleClass"
        @click="buySingle"
        data-v-classic-antimatter-dimension-row
      >
        <div
          :class="tutorialClass()"
          data-v-classic-antimatter-dimension-row
        >
          {{ singleText }}
        </div>
        <div
          class="c-dim-purchase-count-tooltip"
          data-v-classic-antimatter-dimension-row
        >
          {{ boughtTooltip }}
        </div>
        <div
          v-if="hasTutorial"
          class="fas fa-circle-exclamation l-notification-icon"
          data-v-classic-antimatter-dimension-row
        />
      </PrimaryButton>
      <PrimaryButton
        :enabled="(isAffordableUntil10 || isContinuumActive) && !isCapped && isUnlocked"
        :class="buyTenClass"
        @click="buyUntil10"
        data-v-classic-antimatter-dimension-row
      >
        {{ until10Text }}
        <div
          class="c-dim-purchase-count-tooltip"
          data-v-classic-antimatter-dimension-row
        >
          {{ boughtTooltip }}
        </div>
      </PrimaryButton>
    </div>
  </div>
  `
};