import { DC } from "../../constants.js";

function rebuyable(config) {
  const effectFunction = config.effect || (x => x);
  const { id, maxUpgrades, description, isDisabled, noLabel, onPurchased } = config;
  return {
    rebuyable: true,
    id,
    cost: () => config.initialCost * Math.pow(config.costIncrease, player.infinityRebuyables[config.id]),
    maxUpgrades,
    description,
    effect: () => effectFunction(player.infinityRebuyables[config.id]),
    isDisabled,
    // There isn't enough room in the button to fit the EC reduction and "Next:" at the same time while still
    // presenting all the information in an understandable way, so we only show it if the upgrade is maxed
    formatEffect: config.formatEffect ||
      (value => {
        const afterECText = config.afterEC ? config.afterEC() : "";
        return value === config.maxUpgrades
          ? `当前：${formatX(10 - value)} ${afterECText}`
          : `当前：${formatX(10 - value)} | 下一级：${formatX(10 - value - 1)}`;
      }),
    formatCost: value => format(value, 2, 0),
    noLabel,
    onPurchased
  };
}

export const breakInfinityUpgrades = {
  totalAMMult: {
    id: "totalMult",
    cost: 1e4,
    description: "基于产生的总反物质，给予反物质维度倍数加成",
    effect: () => Math.pow(player.records.totalAntimatter.exponent + 1, 0.5),
    formatEffect: value => formatX(value, 2, 2)
  },
  currentAMMult: {
    id: "currentMult",
    cost: 5e4,
    description: "基于当前反物质，给予反物质维度倍数加成",
    effect: () => Math.pow(Currency.antimatter.exponent + 1, 0.5),
    formatEffect: value => formatX(value, 2, 2)
  },
  galaxyBoost: {
    id: "postGalaxy",
    cost: 5e11,
    description: () => `星系增强 ${formatPercents(0.5)}`,
    effect: 1.5
  },
  infinitiedMult: {
    id: "infinitiedMult",
    cost: 1e5,
    description: "基于无限次数，给予反物质维度倍数加成",
    effect: () => 1 + Currency.infinitiesTotal.value.pLog10() * 10,
    formatEffect: value => formatX(value, 2, 2)
  },
  achievementMult: {
    id: "achievementMult",
    cost: 1e6,
    description: "基于已完成的成就数，给予反物质维度倍数加成",
    effect: () => Math.max(Math.pow((Achievements.effectiveCount - 30), 3) / 40, 1),
    formatEffect: value => formatX(value, 2, 2)
  },
  slowestChallengeMult: {
    id: "challengeMult",
    cost: 1e7,
    description: "基于最慢的普通挑战时间，给予反物质维度倍数加成",
    effect: () => Decimal.clampMin(50 / Time.worstChallenge.totalMinutes, 1),
    formatEffect: value => formatX(value, 2, 2),
    hasCap: true,
    cap: DC.D3E4
  },
  infinitiedGen: {
    id: "infinitiedGeneration",
    cost: 2e7,
    description: "基于最快的无限被动生成无限次数",
    effect: () => player.records.bestInfinity.time,
    formatEffect: value => {
      if (value === Number.MAX_VALUE && !Pelle.isDoomed) return "没有无限次数生成";
      let infinities = DC.D1;
      infinities = infinities.timesEffectsOf(
        RealityUpgrade(5),
        RealityUpgrade(7),
        Ra.unlocks.continuousTTBoost.effects.infinity
      );
      infinities = infinities.times(getAdjustedGlyphEffect("infinityinfmult"));
      const timeStr = Time.bestInfinity.totalMilliseconds <= 50
        ? `${TimeSpan.fromMilliseconds(100).toStringShort()}（已达到上限）`
        : `${Time.bestInfinity.times(2).toStringShort()}`;
      return `${format(infinities)} 无限次数 / ${timeStr}`;
    }
  },
  autobuyMaxDimboosts: {
    id: "autobuyMaxDimboosts",
    cost: 5e9,
    description: "解锁自动购买最大维度提升"
  },
  autobuyerSpeed: {
    id: "autoBuyerUpgrade",
    cost: 1e15,
    description: "通过普通挑战解锁或提升性能的自动购买器，它们的工作速度加倍"
  },
  tickspeedCostMult: rebuyable({
    id: 0,
    initialCost: 1e6,
    costIncrease: 5,
    maxUpgrades: 8,
    description: "降低无限之后的计数频率价格增速",
    afterEC: () => (EternityChallenge(11).completions > 0
      ? `永恒挑战 11 之后：${formatX(Player.tickSpeedMultDecrease, 2, 2)}`
      : ""
    ),
    noLabel: true,
    onPurchased: () => GameCache.tickSpeedMultDecrease.invalidate()
  }),
  dimCostMult: rebuyable({
    id: 1,
    initialCost: 1e7,
    costIncrease: 5e3,
    maxUpgrades: 7,
    description: "降低无限之后的反物质维度价格增速",
    afterEC: () => (EternityChallenge(6).completions > 0
      ? `永恒挑战 6 之后：: ${formatX(Player.dimensionMultDecrease, 2, 2)}`
      : ""
    ),
    noLabel: true,
    onPurchased: () => GameCache.dimensionMultDecrease.invalidate()
  }),
  ipGen: rebuyable({
    id: 2,
    initialCost: 1e7,
    costIncrease: 10,
    maxUpgrades: 10,
    effect: value => Player.bestRunIPPM.times(value / 20),
    description: () => {
      let generation = `自动生产你过去 10 次无限中最佳的无限点/分钟的 ${formatInt(5 * player.infinityRebuyables[2])}%`;
      if (!BreakInfinityUpgrade.ipGen.isCapped) {
        generation += ` ➜ ${formatInt(5 * (1 + player.infinityRebuyables[2]))}%`;
      }
      return generation;
    },
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `${format(value, 2, 1)} 无限点数/分钟`,
    noLabel: false
  })
};
