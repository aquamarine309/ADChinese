export default {
  name: "ModernAntimatterGalaxyRow",
  data() {
    return {
      type: GALAXY_TYPE.NORMAL,
      galaxies: {
        normal: 0,
        replicanti: 0,
        dilation: 0
      },
      requirement: {
        tier: 1,
        amount: 0
      },
      canBeBought: false,
      distantStart: 0,
      remoteStart: 0,
      lockText: null,
      canBulkBuy: false,
      creditsClosed: false,
      scalingText: {
        distant: null,
        remote: null,
      },
      hasTutorial: false,
    };
  },
  computed: {
    isDoomed: () => Pelle.isDoomed,
    dimName() {
      return AntimatterDimension(this.requirement.tier).shortDisplayName;
    },
    buttonText() {
      if (this.lockText !== null) return this.lockText;
      const reset = [];
      if (!Achievement(111).isUnlocked) reset.push("维度");
      if (!Achievement(143).isUnlocked) reset.push("维度提升");
      return reset.length === 0
        ? `增强计数频率升级的效果`
        : `重置${makeEnumeration(reset)}的数量，增强计数频率升级的效果`;
    },
    sumText() {
      const parts = [Math.max(this.galaxies.normal, 0)];
      if (this.galaxies.replicanti > 0) parts.push(this.galaxies.replicanti);
      if (this.galaxies.dilation > 0) parts.push(this.galaxies.dilation);
      const sum = parts.map(this.formatGalaxies).join(" + ");
      if (parts.length >= 2) {
        return `${sum} = ${this.formatGalaxies(parts.sum())}`;
      }
      return sum;
    },
    typeName() {
      switch (this.type) {
        case GALAXY_TYPE.NORMAL: return "反物质星系";
        case GALAXY_TYPE.DISTANT: return "遥远星系";
        case GALAXY_TYPE.REMOTE: return "极远星系";
      }
      return undefined;
    },
    hasIncreasedScaling() {
      return this.type !== GALAXY_TYPE.NORMAL;
    },
    costScalingText() {
      switch (this.type) {
        case GALAXY_TYPE.DISTANT:
          return `${formatInt(this.distantStart)} 个星系后星系价格大幅增长`;
        case GALAXY_TYPE.REMOTE: {
          const scalings = [
            { type: "遥远", function: "二次方", amount: this.distantStart },
            { type: "极远", function: "指数", amount: this.remoteStart }
          ];
          return `星系价格增速：${scalings.sort((a, b) => a.amount - b.amount)
            .map(scaling => `${scaling.function}（超过 ${this.formatGalaxies(scaling.amount)} 个${scaling.type}星系）`)
            .join("，")}`;
        }
      }
      return undefined;
    },
    classObject() {
      return {
        "o-primary-btn o-primary-btn--new o-primary-btn--dimension-reset": true,
        "tutorial--glow": this.canBeBought && this.hasTutorial,
        "o-primary-btn--disabled": !this.canBeBought,
        "o-pelle-disabled-pointer": this.creditsClosed
      };
    }
  },
  methods: {
    update() {
      this.type = Galaxy.type;
      this.galaxies.normal = player.galaxies + GalaxyGenerator.galaxies;
      this.galaxies.replicanti = Replicanti.galaxies.total;
      this.galaxies.dilation = player.dilation.totalTachyonGalaxies;
      const requirement = Galaxy.requirement;
      this.requirement.amount = requirement.amount;
      this.requirement.tier = requirement.tier;
      this.canBeBought = requirement.isSatisfied && Galaxy.canBeBought;
      this.distantStart = EternityChallenge(5).isRunning ? 0 : Galaxy.costScalingStart;
      this.remoteStart = Galaxy.remoteStart;
      this.lockText = Galaxy.lockText;
      this.canBulkBuy = EternityMilestone.autobuyMaxGalaxies.isReached;
      this.creditsClosed = GameEnd.creditsEverClosed;
      if (this.isDoomed) {
        this.scalingText = {
          distant: this.formatGalaxies(this.distantStart),
          remote: this.formatGalaxies(Galaxy.remoteStart),
        };
      }
      this.hasTutorial = Tutorial.isActive(TUTORIAL_STATE.GALAXY);
    },
    buyGalaxy(bulk) {
      if (!this.canBeBought) return;
      manualRequestGalaxyReset(this.canBulkBuy && bulk);
    },
    formatGalaxies(num) {
      return num > 1e8 ? format(num, 2) : formatInt(num);
    },
  },
  template: `
  <div class="reset-container galaxy">
    <h4>{{ typeName }} ({{ sumText }})</h4>
    <span>需要：{{ formatInt(requirement.amount) }} {{ dimName }} 反物质维度</span>
    <span v-if="hasIncreasedScaling">{{ costScalingText }}</span>
    <button
      :class="classObject"
      @click.exact="buyGalaxy(true)"
      @click.shift.exact="buyGalaxy(false)"
    >
      {{ buttonText }}
      <div
        v-if="hasTutorial"
        class="fas fa-circle-exclamation l-notification-icon"
      />
    </button>
  </div>
  `
};