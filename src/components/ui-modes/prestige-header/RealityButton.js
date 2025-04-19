export default {
  name: "RealityButton",
  data() {
    return {
      canReality: false,
      showSpecialEffect: false,
      hasRealityStudy: false,
      machinesGained: new Decimal(),
      projectedRM: new Decimal(),
      newIMCap: 0,
      realityTime: 0,
      glyphLevel: 0,
      nextGlyphPercent: 0,
      nextMachineEP: 0,
      shardsGained: 0,
      currentShardsRate: 0,
      bestShardRate: 0,
      bestShardRateVal: 0,
      ppGained: 0,
      celestialRunText: ["", "", "", "", ""]
    };
  },
  computed: {
    formatMachinesGained() {
      if (this.machinesGained.gt(0)) return `获得的现实机器数量：${format(this.machinesGained, 2)}`;
      return "现实机器已达上限";
    },
    formatMachineStats() {
      if (!PlayerProgress.realityUnlocked() && this.nextMachineEP.gt("1e8000")) {
        return `（已达到本次现实的上限！）`;
      }
      if (this.machinesGained.gt(0) && this.machinesGained.lt(100)) {
        return `（下一个需 ${format(this.nextMachineEP, 2)} 永恒点数）`;
      }
      if (this.machinesGained.eq(0) && this.newIMCap === 0) {
        return `（预计获得 ${format(this.projectedRM, 2)} 现实机器）`;
      }
      if (this.newIMCap !== 0) {
        return `（虚幻机器上限：${formatMachines(0, this.newIMCap)}）`;
      }
      if (this.machinesGained.lt(Number.MAX_VALUE)) {
        return `（${format(this.machinesGained.divide(this.realityTime), 2, 2)} 现实机器/分钟）`;
      }
      return "";
    },
    formatGlyphLevel() {
      if (this.glyphLevel >= 10000) return `符文等级：${formatInt(this.glyphLevel)}`;
      return `符文等级：${formatInt(this.glyphLevel)} （下一级进度：${this.nextGlyphPercent}）`;
    },
    showShardsRate() {
      return this.currentShardsRate;
    },
    shardsGainedText() {
      return `${format(this.shardsGained, 2)} 遗迹碎片`;
    },
    classObject() {
      return {
        "c-reality-button--unlocked": this.canReality,
        "c-reality-button--locked": !this.canReality,
        "c-reality-button--special": this.showSpecialEffect,
      };
    }
  },
  methods: {
    percentToNextGlyphLevelText() {
      const glyphState = getGlyphLevelInputs();
      let level = glyphState.actualLevel;
      if (!isFinite(level)) level = 0;
      const decimalPoints = this.glyphLevel > 1000 ? 0 : 1;
      return `${formatPercents(Math.min(((level - Math.floor(level))), 0.999), decimalPoints)}`;
    },
    update() {
      this.hasRealityStudy = TimeStudy.reality.isBought;
      this.canReality = isRealityAvailable();
      this.showSpecialEffect = this.hasSpecialReward();
      if (!this.canReality) {
        this.shardsGained = 0;
        return;
      }
      function EPforRM(rm) {
        const adjusted = Decimal.divide(rm, MachineHandler.realityMachineMultiplier);
        if (adjusted.lte(1)) return Decimal.pow10(4000);
        if (adjusted.lte(10)) return Decimal.pow10(4000 / 27 * (adjusted.toNumber() + 26));
        let result = Decimal.pow10(4000 * (adjusted.log10() / 3 + 1));
        if (!PlayerProgress.realityUnlocked() && result.gte("1e6000")) {
          result = result.div("1e6000").pow(4).times("1e6000");
        }
        return result;
      }

      const multiplier = simulatedRealityCount(false) + 1;
      this.projectedRM = MachineHandler.gainedRealityMachines.times(multiplier)
        .clampMax(MachineHandler.hardcapRM);
      this.newIMCap = MachineHandler.projectedIMCap;
      this.machinesGained = this.projectedRM.clampMax(MachineHandler.distanceToRMCap);
      this.realityTime = Time.thisRealityRealTime.totalMinutes;
      this.glyphLevel = gainedGlyphLevel().actualLevel;
      this.nextGlyphPercent = this.percentToNextGlyphLevelText();
      this.nextMachineEP = EPforRM(this.machinesGained.plus(1));
      this.ppGained = multiplier;
      this.shardsGained = Effarig.shardsGained * multiplier;
      this.currentShardsRate = (this.shardsGained / Time.thisRealityRealTime.totalMinutes);
      this.bestShardRate = player.records.thisReality.bestRSmin * multiplier;
      this.bestShardRateVal = player.records.thisReality.bestRSminVal * multiplier;

      const teresaReward = this.formatScalingMultiplierText(
        "符文献祭",
        Teresa.runRewardMultiplier,
        Math.max(Teresa.runRewardMultiplier, Teresa.rewardMultiplier(Currency.antimatter.value)));
      const teresaThreshold = this.formatThresholdText(
        Teresa.rewardMultiplier(Currency.antimatter.value) > Teresa.runRewardMultiplier,
        player.celestials.teresa.bestRunAM,
        "反物质");
      this.celestialRunText = [
        [Teresa.isRunning, teresaReward, teresaThreshold]];
    },
    handleClick() {
      if (this.canReality) {
        requestManualReality();
      }
    },
    formatScalingMultiplierText(resource, before, after) {
      return `${resource} ${formatX(before, 2, 2)} ➜ ${formatX(after, 2, 2)}`;
    },
    formatThresholdText(condition, threshold, resourceName) {
      if (condition) return "";
      return `（${format(threshold, 2, 2)} ${resourceName} 以提升）`;
    },
    // Make the button have a visual animation if Realitying will give a reward
    hasSpecialReward() {
      if (Teresa.isRunning && Teresa.rewardMultiplier(Currency.antimatter.value) > Teresa.runRewardMultiplier) {
        return true;
      }
      return Currency.eternityPoints.value.exponent > 4000 &&
        ((Effarig.isRunning && !EffarigUnlock.reality.isUnlocked) || (Enslaved.isRunning && !Enslaved.isCompleted));
    }
  },
  template: `
  <div class="l-reality-button">
    <button
      class="c-reality-button infotooltip"
      :class="classObject"
      @click="handleClick"
    >
      <div class="l-reality-button__contents">
        <template v-if="canReality">
          <div class="c-reality-button__header">
            开始一次新的现实
          </div>
          <div>{{ formatMachinesGained }} {{ formatMachineStats }}</div>
          <div>{{ formatGlyphLevel }}</div>
        </template>
        <template v-else-if="hasRealityStudy">
          <div>达到 {{ format("1e4000") }} 永恒点数以进行现实</div>
        </template>
        <template v-else>
          <div>购买解锁现实的时间研究以解锁现实</div>
        </template>
        <div
          v-if="canReality"
          class="infotooltiptext"
        >
          <div>获得的其他资源</div>
          <div>{{ formatInt(ppGained) }} 复兴点数</div>
          <div v-if="shardsGained !== 0">
            {{ shardsGainedText }} （{{ format(currentShardsRate, 2) }}/分钟）
            <br>
            在 {{ format(bestShardRateVal, 2) }} 遗迹碎片时达到峰值：{{ format(bestShardRate, 2) }}/分钟 
          </div>
          <div
            v-for="(celestialInfo, i) in celestialRunText"
            :key="i"
          >
            <span v-if="celestialInfo[0]">
              {{ celestialInfo[1] }}
              <br>
              {{ celestialInfo[2] }}
            </span>
          </div>
        </div>
      </div>
    </button>
  </div>
  `
};