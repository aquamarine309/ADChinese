export default {
  name: "SingularityPane",
  data() {
    return {
      darkEnergy: 0,
      darkEnergyGainPerSecond: 0,
      singularities: 0,
      singularityCapIncreases: 0,
      canPerformSingularity: false,
      unlockedBulkSingularity: false,
      singularityCap: 0,
      baseTimeToSingularity: 0,
      currentTimeToSingularity: 0,
      extraTimeAfterSingularity: 0,
      singularitiesGained: 0,
      autoSingularityFactor: 0,
      perStepFactor: 0,
      isAutoEnabled: false,
      hasAutoSingularity: false,
      nextLowerStep: 0,
      willCondenseOnDecrease: false,
    };
  },
  computed: {
    isDoomed: () => Pelle.isDoomed,
    singularityFormText() {
      const formText = this.singularitiesGained === 1 ? "凝聚所有暗能量以得到一个奇点"
        : `凝聚所有暗能量以得到 ${format(this.singularitiesGained, 2)} 个奇点`;
      if (this.canPerformSingularity) {
        return formText;
      }
      return `达到 ${format(this.singularityCap)} 暗能量以${formText}`;
    },
    singularityWaitText() {
      let singularityTime = this.currentTimeToSingularity;
      if (this.canPerformSingularity) {
        singularityTime += this.extraTimeAfterSingularity;
        if (!this.isAutoEnabled) return "";
        return singularityTime > 0
          ? `（${TimeSpan.fromSeconds(singularityTime).toStringShort()} 后自动凝聚奇点）`
          : "（将立即自动凝聚）";
      }
      return `（${TimeSpan.fromSeconds(singularityTime).toStringShort()} 后获得足够的暗能量）`;
    },
    baseSingularityTime() {
      return TimeSpan.fromSeconds(this.baseTimeToSingularity).toStringShort();
    },
    additionalSingularityTime() {
      return TimeSpan.fromSeconds(this.extraTimeAfterSingularity).toStringShort();
    },
    manualSingularityRate() {
      const totalTime = this.baseTimeToSingularity;
      return this.formatRate(this.singularitiesGained / totalTime);
    },
    autoSingularityRate() {
      if (this.hasAutoSingularity && !this.isAutoEnabled) return "自动凝聚已关闭";
      const totalTime = this.baseTimeToSingularity + this.extraTimeAfterSingularity;
      return this.formatRate(this.singularitiesGained / totalTime);
    },
    decreaseTooltip() {
      if (this.singularityCapIncreases === 0) return "You cannot decrease the cap any further!";
      const singularities = this.singularitiesGained / this.perStepFactor;
      return this.willCondenseOnDecrease
        ? `Decreasing the cap will immediately auto-condense for
          ${format(singularities, 2)} Singularities!`
        : null;
    },
    increaseTooltip() {
      return this.singularityCapIncreases >= 50
        ? "You cannot increase the cap any further!"
        : null;
    }
  },
  methods: {
    update() {
      const laitela = player.celestials.laitela;
      this.darkEnergy = Currency.darkEnergy.value;
      this.darkEnergyGainPerSecond = Currency.darkEnergy.productionPerSecond;
      this.singularities = Currency.singularities.value;
      this.singularityCapIncreases = laitela.singularityCapIncreases;
      this.canPerformSingularity = Singularity.capIsReached;
      this.unlockedBulkSingularity = Currency.singularities.gte(10);
      this.singularityCap = Singularity.cap;
      this.baseTimeToSingularity = Singularity.timePerCondense;
      this.currentTimeToSingularity = Singularity.timeUntilCap;
      this.extraTimeAfterSingularity = Singularity.timeDelayFromAuto;
      this.singularitiesGained = Singularity.singularitiesGained;
      this.autoSingularityFactor = SingularityMilestone.autoCondense.effectOrDefault(Infinity);
      this.perStepFactor = Singularity.gainPerCapIncrease;
      this.isAutoEnabled = player.auto.singularity.isActive && SingularityMilestone.autoCondense.canBeApplied;
      this.hasAutoSingularity = Number.isFinite(this.autoSingularityFactor);
      this.nextLowerStep = this.singularityCap * this.autoSingularityFactor / 10;
      this.willCondenseOnDecrease = this.isAutoEnabled && this.darkEnergy > this.nextLowerStep;
    },
    doSingularity() {
      Singularity.perform();
    },
    increaseCap() {
      Singularity.increaseCap();
    },
    decreaseCap() {
      Singularity.decreaseCap();
    },
    formatRate(rate) {
      if (rate < 1 / 60) return `${format(3600 * rate, 2, 3)} 每小时`;
      if (rate < 1) return `${format(60 * rate, 2, 3)} 每分钟`;
      return `${format(rate, 2, 3)} 每秒`;
    },
    condenseClassObject() {
      return {
        "c-laitela-singularity": true,
        "c-laitela-singularity--active": this.canPerformSingularity && !this.isDoomed,
        "o-pelle-disabled": this.isDoomed,
        "o-pelle-disabled-pointer": this.isDoomed,
      };
    }
  },
  template: `
  <div class="c-laitela-singularity-container">
    <div>
      <h2>
        你拥有 {{ format(singularities, 2) }} 奇点。
      </h2>
      <button
        :class="condenseClassObject()"
        @click="doSingularity"
      >
        <h2>
          {{ singularityFormText }}
        </h2>
        <br v-if="singularityWaitText !== ''">
        <h2>
          {{ singularityWaitText }}
        </h2>
      </button>
    </div>
    <div v-if="singularities !== 0">
      <div class="o-laitela-matter-amount">
        你拥有 {{ format(darkEnergy, 2, 4) }} 暗能量。（+{{ format(darkEnergyGainPerSecond, 2, 4) }}/秒）
      </div>
      <div v-if="unlockedBulkSingularity">
        <button
          class="c-laitela-singularity__cap-control"
          :class="{ 'c-laitela-singularity__cap-control--available' : singularityCapIncreases > 0 }"
          :ach-tooltip="decreaseTooltip"
          @click="decreaseCap"
          data-v-singularity-pane
        >
          降低上限
        </button>
        <button
          class="c-laitela-singularity__cap-control"
          :class="{ 'c-laitela-singularity__cap-control--available' : singularityCapIncreases < 50 }"
          :ach-tooltip="increaseTooltip"
          @click="increaseCap"
          data-v-singularity-pane
        >
          增加上限
        </button>
        <br>
        每提升一次上限，凝聚所需的暗能量 {{ formatX(10) }}, 通过凝聚获得的奇点数量 {{ formatX(perStepFactor) }}。
      </div>
      <div v-else>
        <br>
        达到 {{ format(10) }} 奇点后可以<br>一次性获得多个奇点
        <br>
      </div>
      <br>
      每 {{ baseSingularityTime }} <span v-if="hasAutoSingularity">（自动）</span>凝聚：
      
      <span v-if="hasAutoSingularity && autoSingularityFactor !== 1">
        （+{{ additionalSingularityTime }}）
      </span>
      <br>
      奇点凝聚速度：{{ manualSingularityRate }}
      <br>
      <span v-if="hasAutoSingularity && autoSingularityFactor !== 1">
        自动奇点凝聚速度：{{ autoSingularityRate }}
      </span>
    </div>
  </div>
  `
};