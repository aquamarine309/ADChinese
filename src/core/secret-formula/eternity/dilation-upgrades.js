import { DC } from "../../constants.js";

function rebuyableCost(initialCost, increment, id) {
  return Decimal.multiply(initialCost, Decimal.pow(increment, player.dilation.rebuyables[id]));
}
function rebuyable(config) {
  return {
    id: config.id,
    cost: () => rebuyableCost(config.initialCost, config.increment, config.id),
    initialCost: config.initialCost,
    increment: config.increment,
    description: config.description,
    effect: () => config.effect(player.dilation.rebuyables[config.id]),
    formatEffect: config.formatEffect,
    formatCost: config.formatCost,
    purchaseCap: config.purchaseCap,
    reachedCap: () => player.dilation.rebuyables[config.id] >= config.purchaseCap,
    pelleOnly: Boolean(config.pelleOnly),
    rebuyable: true
  };
}

export const dilationUpgrades = {
  dtGain: rebuyable({
    id: 1,
    initialCost: 1e4,
    increment: 10,
    description: () =>
      ((SingularityMilestone.dilatedTimeFromSingularities.canBeApplied || Achievement(187).canBeApplied)
        ? `获得 ${formatX(2 * Effects.product(           SingularityMilestone.dilatedTimeFromSingularities,           Achievement(187)), 2, 2)} 倍膨胀时间`
        : "获得的膨胀时间加倍"),
    effect: bought => {
      const base = 2 * Effects.product(
        SingularityMilestone.dilatedTimeFromSingularities,
        Achievement(187)
      );
      return Decimal.pow(base, bought);
    },
    formatEffect: value => {
      const nonInteger = SingularityMilestone.dilatedTimeFromSingularities.canBeApplied ||
        Achievement(187).canBeApplied;
      return formatX(value, 2, nonInteger ? 2 : 0);
    },
    formatCost: value => format(value, 2),
    purchaseCap: Number.MAX_VALUE
  }),
  galaxyThreshold: rebuyable({
    id: 2,
    initialCost: 1e6,
    increment: 100,
    description: () =>
      (Perk.bypassTGReset.isBought && !Pelle.isDoomed
        ? "重置超光速粒子星系的数量，降低它们的阈值"
        : "重置膨胀时间和超光速粒子星系的数量，降低它们的阈值"),
    // The 38th purchase is at 1e80, and is the last purchase.
    effect: bought => (bought < 38 ? Math.pow(0.8, bought) : 0),
    formatEffect: effect => {
      if (effect === 0) return `${formatX(getTachyonGalaxyMult(effect), 4, 4)}`;
      const nextEffect = effect === Math.pow(0.8, 37) ? 0 : 0.8 * effect;
      return `${formatX(getTachyonGalaxyMult(effect), 4, 4)} ➜
        下一级：${formatX(getTachyonGalaxyMult(nextEffect), 4, 4)}`;
    },
    formatCost: value => format(value, 2),
    purchaseCap: 38
  }),
  tachyonGain: rebuyable({
    id: 3,
    initialCost: 1e7,
    increment: 20,
    description: () => {
      if (Pelle.isDoomed) return `获得 ${formatInt(1)} 倍超光速粒子`;
      if (Enslaved.isRunning) return `获得 ${Math.pow(3, Enslaved.tachyonNerf).toFixed(2)} 倍超光速粒子`;
      return "获得三倍的超光速粒子";
    },
    effect: bought => {
      if (Pelle.isDoomed) return DC.D1.pow(bought);
      return DC.D3.pow(bought);
    },
    formatEffect: value => formatX(value, 2),
    formatCost: value => format(value, 2),
    purchaseCap: Number.MAX_VALUE
  }),
  doubleGalaxies: {
    id: 4,
    cost: 5e6,
    description: () => `获得双倍的超光速粒子星系，最大数量为 ${formatInt(500)} 个基础星系`,
    effect: 2
  },
  tdMultReplicanti: {
    id: 5,
    cost: 1e9,
    description: () => {
      const rep10 = replicantiMult().pLog10();
      let multiplier = "0.1";
      if (rep10 > 9000) {
        const ratio = DilationUpgrade.tdMultReplicanti.effectValue.pLog10() / rep10;
        if (ratio < 0.095) {
          multiplier = ratio.toFixed(2);
        }
      }
      return `时间维度获得复制器倍率 ${formatPow(multiplier, 1, 3)} 的加成，这个加成超过 ${formatX(DC.E9000)} 后减弱`;
    },
    effect: () => {
      let rep10 = replicantiMult().pLog10() * 0.1;
      rep10 = rep10 > 9000 ? 9000 + 0.5 * (rep10 - 9000) : rep10;
      return Decimal.pow10(rep10);
    },
    formatEffect: value => formatX(value, 2, 1)
  },
  ndMultDT: {
    id: 6,
    cost: 5e7,
    description: "基于膨胀时间的数量给予反物质维度倍数加成，此倍数不受时间膨胀的影响",
    effect: () => Currency.dilatedTime.value.pow(308).clampMin(1),
    formatEffect: value => formatX(value, 2, 1)
  },
  ipMultDT: {
    id: 7,
    cost: 2e12,
    description: "无限点数获得基于膨胀时间的倍数加成",
    effect: () => Currency.dilatedTime.value.pow(1000).clampMin(1),
    formatEffect: value => formatX(value, 2, 1),
    cap: () => Effarig.eternityCap
  },
  timeStudySplit: {
    id: 8,
    cost: 1e10,
    description: "你可以在时间研究树的维度分叉上选择所有路径"
  },
  dilationPenalty: {
    id: 9,
    cost: 1e11,
    description: () => `减弱时间膨胀的减益效果`,
    effect: 1.05,
  },
  ttGenerator: {
    id: 10,
    cost: 1e15,
    description: "通过超光速粒子产生时间之理",
    effect: () => Currency.tachyonParticles.value.div(20000),
    formatEffect: value => `${format(value, 2, 1)}/秒`
  },
  dtGainPelle: rebuyable({
    id: 11,
    initialCost: 1e14,
    increment: 100,
    pelleOnly: true,
    description: () => `获得 ${formatX(5)} 倍膨胀时间`,
    effect: bought => Decimal.pow(5, bought),
    formatEffect: value => formatX(value, 2),
    formatCost: value => format(value, 2),
    purchaseCap: Number.MAX_VALUE
  }),
  galaxyMultiplier: rebuyable({
    id: 12,
    initialCost: 1e15,
    increment: 1000,
    pelleOnly: true,
    description: "成倍增加获得的超光速粒子星系，在超光速粒子星系翻倍升级后生效",
    effect: bought => bought + 1,
    formatEffect: value => `${formatX(value, 2)} ➜ ${formatX(value + 1, 2)}`,
    formatCost: value => format(value, 2),
    purchaseCap: Number.MAX_VALUE
  }),
  tickspeedPower: rebuyable({
    id: 13,
    initialCost: 1e16,
    increment: 1e4,
    pelleOnly: true,
    description: "增强计数频率",
    effect: bought => 1 + bought * 0.03,
    formatEffect: value => `${formatPow(value, 2, 2)} ➜ ${formatPow(value + 0.03, 2, 2)}`,
    formatCost: value => format(value, 2),
    purchaseCap: Number.MAX_VALUE
  }),
  galaxyThresholdPelle: {
    id: 14,
    cost: 1e45,
    pelleOnly: true,
    description: "超光速粒子星系阈值是原来的立方根",
    effect: 1 / 3
  },
  flatDilationMult: {
    id: 15,
    cost: 1e55,
    pelleOnly: true,
    description: () => `基于当前永恒点数获得更多膨胀时间`,
    effect: () => 1e9 ** Math.min((Math.max(player.eternityPoints.log10() - 1500, 0) / 2500) ** 1.2, 1),
    formatEffect: value => formatX(value, 2, 2)
  },
};
