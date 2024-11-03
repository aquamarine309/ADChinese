import { DC } from "../../constants.js";

const rebuyable = props => {
  props.cost = () => props.initialCost * Math.pow(props.costMult, player.reality.imaginaryRebuyables[props.id]);
  const { effect } = props;
  if (props.isDecimal) props.effect = () => Decimal.pow(effect, player.reality.imaginaryRebuyables[props.id]);
  else props.effect = () => effect * player.reality.imaginaryRebuyables[props.id];
  if (!props.formatEffect) props.formatEffect = value => `+${format(value, 2, 2)}`;
  props.formatCost = value => format(value, 2, 0);
  return props;
};

export const imaginaryUpgrades = [
  rebuyable({
    name: "时间强化器",
    id: 1,
    initialCost: 3,
    costMult: 60,
    description: () => `时间放大器的倍率增加 ${format(0.15, 2, 2)}`,
    effect: 0.15
  }),
  rebuyable({
    name: "复制强化器",
    id: 2,
    initialCost: 4,
    costMult: 60,
    description: () => `复制放大器的倍率增加 ${format(0.15, 2, 2)}`,
    effect: 0.15
  }),
  rebuyable({
    name: "永恒强化器",
    id: 3,
    initialCost: 1,
    costMult: 40,
    description: () => `永恒放大器的倍率增加 ${format(0.4, 2, 2)}`,
    effect: 0.4
  }),
  rebuyable({
    name: "超光速强化器",
    id: 4,
    initialCost: 5,
    costMult: 80,
    description: () => `超光速放大器的倍率增加 ${format(0.15, 2, 2)}`,
    effect: 0.15
  }),
  rebuyable({
    name: "无界强化器",
    id: 5,
    initialCost: 1,
    costMult: 30,
    description: () => `无界放大器的倍率增加 ${format(0.6, 2, 2)}`,
    effect: 0.6
  }),
  rebuyable({
    name: "椭圆物质",
    id: 6,
    initialCost: 1e4,
    costMult: 500,
    description: () => `现实机器的上限 ${formatX(1e100)}`,
    effect: 1e100,
    formatEffect: value => formatX(value),
    isDecimal: true
  }),
  rebuyable({
    name: "符文保证",
    id: 7,
    initialCost: 2e5,
    costMult: 500,
    description: () => `符文不稳定性的起始等级增加 ${formatInt(200)}`,
    effect: 200,
    formatEffect: value => `起始等级 +${formatInt(value)}`
  }),
  rebuyable({
    name: "无边双曲",
    id: 8,
    initialCost: 1e7,
    costMult: 800,
    description: () => `所有无限维度的倍率乘 ${format("1e100000")}`,
    effect: DC.E100000,
    formatEffect: value => formatX(value),
    isDecimal: true
  }),
  rebuyable({
    name: "宇宙细丝",
    id: 9,
    initialCost: 1e9,
    costMult: 1000,
    description: () => `提升星系的效果`,
    effect: 0.03,
    formatEffect: value => `+${formatPercents(value)}`,
  }),
  rebuyable({
    name: "凝聚之熵",
    id: 10,
    initialCost: 8e9,
    costMult: 2000,
    description: () => `提升获得奇点的数量`,
    effect: 1,
    formatEffect: value => formatX(1 + value, 2)
  }),
  {
    name: "干涉之嫌",
    id: 11,
    cost: 5e7,
    requirement: () => `${format(1e90)} 遗迹碎片（你拥有 ${format(player.celestials.effarig.relicShards, 2)}）`,
    hasFailed: () => false,
    checkRequirement: () => player.celestials.effarig.relicShards >= 1e90,
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER,
    description: "基于当前反物质总量，时间维度获得指数加成",
    effect: () => 1 + Math.log10(player.records.totalAntimatter.log10()) / 100,
    formatEffect: value => formatPow(value, 0, 4),
    isDisabledInDoomed: true
  },
  {
    name: "幻象之果",
    id: 12,
    cost: 5e7,
    requirement: () => `单个符文等级因子的权重为 ${formatInt(100)} 时，获得一个等级为 ${formatInt(9000)} 的符文`,
    hasFailed: () => false,
    checkRequirement: () => Object.values(player.celestials.effarig.glyphWeights).some(w => w === 100) &&
      gainedGlyphLevel().actualLevel >= 9000,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    description: "基于可重复购买虚幻升级的数量，获得免费的维度提升",
    effect: () => 2e4 * ImaginaryUpgrades.totalRebuyables,
    formatEffect: value => `${format(value, 1)}`,
    isDisabledInDoomed: true
  },
  {
    name: "信息之瞬",
    id: 13,
    cost: 5e7,
    requirement: () => `在无名氏的现实中，获得 ${format(Number.MAX_VALUE, 2)} 现实机器。`,
    hasFailed: () => !Enslaved.isRunning,
    // This is for consistency with the UI, which displays an amplified "projected RM" value on the reality button
    checkRequirement: () => Enslaved.isRunning &&
      MachineHandler.uncappedRM.times(simulatedRealityCount(false) + 1).gte(Number.MAX_VALUE),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "基于虚幻升级的购买数量，提升虚幻机器的上限",
    effect: () => 1 + ImaginaryUpgrades.totalRebuyables / 20 + ImaginaryUpgrades.totalSinglePurchase / 2,
    formatEffect: value => formatX(value, 2, 1),
    isDisabledInDoomed: true
  },
  {
    name: "入侵之忆",
    id: 14,
    cost: 3.5e8,
    formatCost: x => format(x, 1),
    requirement: () => `在永恒挑战5 中，计数频率达到 ${format("1e75000000000")} /秒`,
    hasFailed: () => false,
    checkRequirement: () => EternityChallenge(5).isRunning && Tickspeed.perSecond.exponent >= 7.5e10,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => `将所有维度每次购买的倍数提高到 ${formatPow(1.5, 0, 1)}`,
    effect: 1.5,
    isDisabledInDoomed: true
  },
  {
    name: "理想之构",
    id: 15,
    cost: 1e9,
    requirement: () => `在始终没有第一无限维度的前提下，达到 ${format("1e1500000000000")} 反物质`,
    hasFailed: () => player.requirementChecks.reality.maxID1.gt(0),
    checkRequirement: () => player.requirementChecks.reality.maxID1.eq(0) && player.antimatter.exponent >= 1.5e12,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    // This upgrade lock acts in multiple different conditions, but isn't 100% foolproof and also blocks a few edge
    // cases which technically should be allowed but would be hard to communicate in-game. Forbidden actions are:
    // - Purchasing any ID (edge case: this is acceptable for ID2-8 inside EC2 or EC10)
    // - Purchasing any TD with any amount of EC7 completions (edge case: acceptable within EC1 or EC10)
    // - Entering EC7 with any amount of purchased TD
    description: () => `${
      Pelle.isDoomed ? "解锁" : "将反物质维度转化成连续统，解锁"
    }维度之神莱特拉`,
  },
  {
    name: "无质动量",
    id: 16,
    cost: 3.5e9,
    formatCost: x => format(x, 1),
    requirement: () => `两次在 ${formatInt(30)} 秒内完成莱特拉的现实`,
    hasFailed: () => false,
    checkRequirement: () => Laitela.maxAllowedDimension <= 6,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "解锁第二暗物质维度",
  },
  {
    name: "手性振荡",
    id: 17,
    cost: 6e9,
    requirement: () => `在自动凝聚中，一次性获得至少 ${formatInt(20)} 个奇点`,
    hasFailed: () => false,
    checkRequirement: () => Singularity.singularitiesGained >= 20 &&
      Currency.darkEnergy.gte(Singularity.cap * SingularityMilestone.autoCondense.effectOrDefault(Infinity)),
    checkEvent: GAME_EVENT.SINGULARITY_RESET_BEFORE,
    description: "解锁第三暗物质维度",
  },
  {
    name: "维度对称",
    id: 18,
    cost: 1.5e10,
    formatCost: x => format(x, 1),
    requirement: () => `星系总量达到 ${formatInt(80000)}`,
    hasFailed: () => false,
    checkRequirement: () => Replicanti.galaxies.total + player.galaxies +
      player.dilation.totalTachyonGalaxies >= 80000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "解锁第四暗物质维度",
  },
  {
    name: "辐射之命",
    id: 19,
    cost: 2.8e10,
    formatCost: x => format(x, 1),
    requirement: () => `在一次现实中，时间研究的个数始终不大于 ${formatInt(8)} 时，计数频率上的连续统达到 ${formatInt(3.85e6)}`,
    hasFailed: () => player.requirementChecks.reality.maxStudies > 8,
    checkRequirement: () => player.requirementChecks.reality.maxStudies <= 8 &&
      Tickspeed.continuumValue >= 3.85e6,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    lockEvent: () => `时间研究的数量大于 ${formatInt(8)}`,
    description: "解锁暗物质湮灭"
  },
  {
    name: "真空加速",
    id: 20,
    cost: 3e12,
    requirement: () => `连续统至少达到 ${formatPercents(1)}`,
    hasFailed: () => false,
    checkRequirement: () => Laitela.matterExtraPurchaseFactor >= 2,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => `你可以自动购买可重复购买的虚幻升级，虚幻机器数量的增速是原来的 ${formatInt(10)} 倍`,
    effect: 10,
    isDisabledInDoomed: true
  },
  {
    name: "消解存在",
    id: 21,
    cost: 1e13,
    requirement: () => `单次现实全程禁用连续统时，达到 ${format("1e7400000000000")} 反物质`,
    hasFailed: () => !player.requirementChecks.reality.noContinuum,
    checkRequirement: () => player.requirementChecks.reality.noContinuum &&
      Currency.antimatter.value.log10() >= 7.4e12,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    lockEvent: "启用连续统",
    description: "基于虚幻机器的数量，提升湮灭加成的倍率",
    effect: () => Math.clampMin(Math.pow(Math.log10(Currency.imaginaryMachines.value) - 10, 3), 1),
    formatEffect: value => formatX(value, 2, 1),
    isDisabledInDoomed: true
  },
  {
    name: "全面终结",
    id: 22,
    cost: 1.5e14,
    formatCost: x => format(x, 1),
    requirement: () => `装备至少 ${formatInt(4)} 个诅咒符文时，在鹿颈长的现实中达到 ${format("1e150000000000")} 反物质`,
    // Note: 4 cursed glyphs is -12 glyph count, but equipping a positive glyph in the last slot is allowed
    hasFailed: () => !Effarig.isRunning || player.requirementChecks.reality.maxGlyphs > -10,
    checkRequirement: () => Effarig.isRunning && player.requirementChecks.reality.maxGlyphs < -10 &&
      Currency.antimatter.value.exponent >= 1.5e11,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => `所有符文种类的已献祭数值提升到 ${format(1e100)}`,
    effect: 1e100,
    isDisabledInDoomed: true
  },
  {
    name: "共面纯化",
    id: 23,
    cost: 6e14,
    requirement: () => `装备符文的数量不大于 ${formatInt(0)} 时，在太阳神的现实中符文等级达到 ${formatInt(20000)}`,
    hasFailed: () => !Ra.isRunning || player.requirementChecks.reality.maxGlyphs > 0,
    checkRequirement: () => Ra.isRunning && player.requirementChecks.reality.maxGlyphs <= 0 &&
      gainedGlyphLevel().actualLevel >= 20000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "基于超立方体数量，提升获得免费维度提升的数量",
    effect: () => Math.floor(0.25 * Math.pow(Tesseracts.effectiveCount, 2)),
    formatEffect: value => formatX(value),
    isDisabledInDoomed: true
  },
  {
    name: "绝对废止",
    id: 24,
    cost: 6e14,
    // We unfortunately don't have the UI space to be more descriptive on this button without causing text overflow,
    // so hopefully the additional modals (from the upgrade lock) will mostly communicate the idea that this is under
    // the same conditions as hard V's Post-destination
    requirement: () => `黑洞完全反转时，在太阳神的现实中获得 ${formatInt(13000)} 个反物质星系`,
    hasFailed: () => !Ra.isRunning || player.requirementChecks.reality.slowestBH > 1e-300,
    checkRequirement: () => Ra.isRunning && player.requirementChecks.reality.slowestBH <= 1e-300 &&
      player.galaxies >= 13000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    // Three locking events: uninvert, discharge, and entering (but not auto-completing) EC12
    description: "基于奇点数量，提升获得免费维度提升的强度",
    effect: () => Decimal.pow(player.celestials.laitela.singularities, 300),
    formatEffect: value => `${formatX(value, 2, 1)}`,
    isDisabledInDoomed: true
  },
  {
    name: "彻底抹除",
    id: 25,
    cost: 1.6e15,
    formatCost: x => format(x, 1),
    requirement: () => `在莱特拉的现实中，至少 ${formatInt(4)} 个符文槽为空，禁用所有维度，达成现实。`,
    hasFailed: () => !Laitela.isRunning || Laitela.maxAllowedDimension !== 0 ||
      Glyphs.activeWithoutCompanion.length > 1,
    checkRequirement: () => Laitela.isRunning && Laitela.maxAllowedDimension === 0 &&
      Glyphs.activeWithoutCompanion.length <= 1 && TimeStudy.reality.isBought,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    lockEvent: "装备另一个类型不是同伴的符文",
    description: "解锁反物质之神佩勒",
  },
];
