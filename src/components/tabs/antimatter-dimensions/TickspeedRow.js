export default {
  name: "TickspeedRow",
  data() {
    return {
      purchasedTickspeed: 0,
      freeTickspeed: 0,
      isVisible: false,
      mult: new Decimal(0),
      cost: new Decimal(0),
      isAffordable: false,
      tickspeed: new Decimal(0),
      gameSpeedMult: 1,
      galaxyCount: 0,
      isContinuumActive: false,
      continuumValue: 0,
      hasTutorial: false,
      hasRealityButton: false,
      isEC9: false,
    };
  },
  computed: {
    classObject() {
      return {
        "l-tickspeed-container": true,
        "l-tickspeed-container--hidden": !this.isVisible
      };
    },
    multiplierDisplay() {
      if (InfinityChallenge(3).isRunning) return `所有反物质维度获得乘
        ${formatX(1.05 + this.galaxyCount * 0.005, 3, 3)} 加成`;
      const tickmult = this.mult;
      return `${formatX(tickmult.reciprocal(), 2, 3)} 加成 / 升级。`;
    },
    tickspeedDisplay() {
      return `计数频率：${format(this.tickspeed, 2, 3)} / 秒`;
    },
    continuumString() {
      return formatFloat(this.continuumValue, 2);
    },
    upgradeCount() {
      const purchased = this.purchasedTickspeed;
      if (!this.freeTickspeed) return `已购买 ${formatInt(purchased)} 个`;
      if (purchased === 0 || this.isContinuumActive) return `${formatInt(this.freeTickspeed)} 个免费升级`;
      return `购买的 ${formatInt(purchased)} 个 + 免费的 ${formatInt(this.freeTickspeed)} 个`;
    }
  },
  methods: {
    update() {
      this.hasRealityButton = PlayerProgress.realityUnlocked() || TimeStudy.reality.isBought;
      this.purchasedTickspeed = player.totalTickBought;
      this.freeTickspeed = FreeTickspeed.amount;
      this.isEC9 = EternityChallenge(9).isRunning;
      this.isVisible = Tickspeed.isUnlocked || this.isEC9;
      if (!this.isVisible) return;
      this.mult.copyFrom(Tickspeed.multiplier);
      this.cost.copyFrom(Tickspeed.cost);
      this.isAffordable = Tickspeed.isAvailableForPurchase && Tickspeed.isAffordable;
      this.tickspeed.copyFrom(Tickspeed.perSecond);
      this.gameSpeedMult = getGameSpeedupForDisplay();
      this.galaxyCount = player.galaxies;
      this.isContinuumActive = Laitela.continuumActive;
      if (this.isContinuumActive) this.continuumValue = Tickspeed.continuumValue;
      this.hasTutorial = Tutorial.isActive(TUTORIAL_STATE.TICKSPEED);
    },
    buttonClass() {
      return {
        "o-primary-btn": true,
        "tickspeed-btn": true,
        "o-primary-btn--disabled": !this.isAffordable && !this.isContinuumActive,
        "o-non-clickable o-continuum": this.isContinuumActive,
        "tutorial--glow": this.isAffordable && this.hasTutorial
      };
    },
  },
  template: `
  <div
    :class="classObject"
    data-v-tickspeed-row
  >
    <div
      class="tickspeed-buttons"
      data-v-tickspeed-row
    >
      <button
        v-tooltip="upgradeCount"
        :class="buttonClass()"
        onclick="buyTickSpeed()"
        data-v-tickspeed-row
      >
        <span v-if="isContinuumActive">
          计数频率连续统：{{ continuumString }}
        </span>
        <span v-else-if="isEC9">
          不可购买计数频率（永恒挑战 9）
        </span>
        <span v-else>
          计数频率价格: {{ format(cost) }}
        </span>
        <div
          v-if="hasTutorial"
          class="fas fa-circle-exclamation l-notification-icon"
        />
      </button>
      <button
        v-if="!isContinuumActive"
        class="o-primary-btn tickspeed-max-btn"
        :class="{ 'o-primary-btn--disabled': !isAffordable && !isContinuumActive }"
        onclick="buyMaxTickSpeed()"
        data-v-tickspeed-row
      >
        购买最大数量
      </button>
    </div>
    <div
      v-if="hasRealityButton"
      class="tickspeed-labels"
      data-v-tickspeed-row
    >
      {{ tickspeedDisplay }} | {{ multiplierDisplay }}
    </div>
  </div>
  `
};