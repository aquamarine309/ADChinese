import { DC } from '../../constants.js'

const rebuyable = (props) => {
  props.cost = () => getHybridCostScaling(player.reality.rebuyables[props.id], 1e30, props.initialCost, props.costMult, props.costMult / 10, DC.E309, 1e3, props.initialCost * props.costMult)
  const { effect } = props
  props.effect = () => Math.pow(effect + ImaginaryUpgrade(props.id).effectOrDefault(0), player.reality.rebuyables[props.id] * getAdjustedGlyphEffect('realityrow1pow'))
  props.description = () => props.textTemplate(ImaginaryUpgrade(props.id).effectValue === 0 ? formatInt(effect) : format(effect + ImaginaryUpgrade(props.id).effectValue, 2, 2))
  props.formatEffect = (value) => formatX(value, 2, 0)
  props.formatCost = (value) => format(value, 2, 0)
  return props
}

export const realityUpgrades = [
  rebuyable({
    name: '时间放大器',
    id: 1,
    initialCost: 1,
    costMult: 30,
    textTemplate: (value) => `获得膨胀时间的速度提高 ${value} 倍`,
    effect: 3,
  }),
  rebuyable({
    name: '复制放大器',
    id: 2,
    initialCost: 1,
    costMult: 30,
    textTemplate: (value) => `获得复制器的速度提高 ${value} 倍`,
    effect: 3,
  }),
  rebuyable({
    name: '永恒放大器',
    id: 3,
    initialCost: 2,
    costMult: 30,
    textTemplate: (value) => `获得 ${value} 倍永恒次数`,
    effect: 3,
  }),
  rebuyable({
    name: '超光速放大器',
    id: 4,
    initialCost: 2,
    costMult: 30,
    textTemplate: (value) => `获得 ${value} 倍超光速粒子`,
    effect: 3,
  }),
  rebuyable({
    name: '无界放大器',
    id: 5,
    initialCost: 3,
    costMult: 50,
    textTemplate: (value) => `获得 ${value} 倍无限次数`,
    effect: 5,
  }),
  {
    name: '宇宙重影',
    id: 6,
    cost: 15,
    requirement: '未使用复制器星系完成第一次永恒',
    // Note that while noRG resets on eternity, the reality-level check will be false after the first eternity.
    // The noRG variable is eternity-level as it's also used for an achievement check
    hasFailed: () => !(player.requirementChecks.eternity.noRG && player.requirementChecks.reality.noEternities),
    checkRequirement: () => player.requirementChecks.eternity.noRG && player.requirementChecks.reality.noEternities,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    lockEvent: '获得一个复制器星系',
    description: '基于复制器星系数量加速复制器的获取速度',
    effect: () => 1 + Replicanti.galaxies.total / 50,
    formatEffect: (value) => formatX(value, 2, 2),
  },
  {
    name: '无尽造物',
    id: 7,
    cost: debugOptions.getRMNegativePriceFlag() ? -1e20 : 15,
    requirement: '至多**个反物质星系完成第一次无限',
    hasFailed: () => !(player.galaxies <= 1 && player.requirementChecks.reality.noInfinities),
    checkRequirement: () => player.galaxies <= 1 && player.requirementChecks.reality.noInfinities,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    canLock: true,
    lockEvent: '获得一个反物质星系',
    description: '基于反物质星系的数量加成无限次数',
    effect: () => 1 + player.galaxies / 30,
    formatEffect: (value) => formatX(value, 2, 2),
  },
  {
    name: '逆理成就',
    id: 8,
    cost: 15,
    requirement: '没有自动获得成就完成第一次永恒',
    hasFailed: () => player.reality.gainedAutoAchievements,
    checkRequirement: () => !player.reality.gainedAutoAchievements,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    // We don't have lockEvent because the modal can never show up for this upgrade
    description: '成就提升超光速粒子的获得数量',
    effect: () => Math.sqrt(Achievements.power),
    formatEffect: (value) => formatX(value, 2, 2),
  },
  {
    name: '词阈扩张',
    id: 9,
    cost: 15,
    requirement: () => `只装备一个符文时，在一次永恒中获得 ${format('1e4000')} 永恒点数，该符文的等级不低于 ${formatInt(3)}`,
    hasFailed: () => {
      const invalidEquippedGlyphs = Glyphs.activeWithoutCompanion.length > 1 || (Glyphs.activeWithoutCompanion.length === 1 && Glyphs.activeWithoutCompanion[0].level < 3)
      const hasValidGlyphInInventory = Glyphs.inventory.countWhere((g) => g && g.level >= 3) > 0
      return invalidEquippedGlyphs || (Glyphs.activeWithoutCompanion.length === 0 && !hasValidGlyphInInventory)
    },
    checkRequirement: () => Currency.eternityPoints.exponent >= 4000 && Glyphs.activeWithoutCompanion.length === 1 && Glyphs.activeWithoutCompanion[0].level >= 3,
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    canLock: true,
    // There are two locking events - equipping a glyph with too low a level, and equipping a second glyph
    description: '增加一个符文槽',
    effect: () => 1,
  },
  {
    name: '生存延续',
    id: 10,
    cost: 15,
    requirement: () => `至少${formatPostBreak(DC.E400)}无限点数完成第一次手动永恒`,
    hasFailed: () => !player.requirementChecks.reality.noEternities,
    checkRequirement: () => Currency.infinityPoints.exponent >= 400 && player.requirementChecks.reality.noEternities,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    lockEvent: '永恒',
    bypassLock: () => Currency.infinityPoints.exponent >= 400,
    description: () => `每次现实开始时，拥有${formatInt(100)}永恒次数(同样适用于本次现实)`,
    automatorPoints: 15,
    shortDescription: () => `开局获得 ${formatInt(100)} 永恒次数`,
    effect: () => 100,
  },
  {
    name: '无垠涌动',
    id: 11,
    cost: 50,
    requirement: () => `${format(Currency.infinitiesBanked.value, 2)}/${format(DC.E12)} 储存的无限次数`,
    checkRequirement: () => Currency.infinitiesBanked.exponent >= 12,
    checkEvent: [GAME_EVENT.ETERNITY_RESET_AFTER, GAME_EVENT.REALITY_FIRST_UNLOCKED],
    description: () => `每秒获得 ${formatPercents(0.1)} 的无限次数`,
    automatorPoints: 5,
    shortDescription: () => `持续获得无限次数`,
    effect: () => gainedInfinities().times(0.1),
    formatEffect: (value) => `${format(value)} 无限次数/秒`,
  },
  {
    name: '先验存在',
    id: 12,
    cost: 50,
    requirement: () => `不完成永恒挑战 1, 一次永恒获得至少 ${format(DC.E70)} 永恒点数`,
    hasFailed: () => EternityChallenge(1).completions !== 0,
    checkRequirement: () => Currency.eternityPoints.exponent >= 70 && EternityChallenge(1).completions === 0,
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    canLock: true,
    lockEvent: '完成永恒挑战 1',
    description: '永恒点数获得基于现实次数和时间之理的加成',
    effect: () =>
      Currency.timeTheorems.value
        .minus(DC.E3)
        .clampMin(2)
        .pow(Math.log2(Math.min(Currency.realities.value, 1e4)))
        .clampMin(1),
    formatEffect: (value) => formatX(value, 2, 2),
  },
  {
    name: '遥控律序',
    id: 13,
    cost: 50,
    requirement: () => `没有第 5-8 时间维度时，一次永恒获得 ${format(DC.E4000)} 永恒点数`,
    hasFailed: () => !Array.range(5, 4).every((i) => TimeDimension(i).amount.equals(0)),
    checkRequirement: () => Currency.eternityPoints.exponent >= 4000 && Array.range(5, 4).every((i) => TimeDimension(i).amount.equals(0)),
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    canLock: true,
    lockEvent: '购买一个高于第四时间维度的时间维度',
    description: () => `解锁自动购买时间维度和自动购买 ${formatX(5)} 永恒点数倍增，和更多的自动永恒选项`,
    automatorPoints: 10,
    shortDescription: () => `自动购买时间维度、${formatX(5)} 永恒点数倍增、更多的自动永恒选项`,
  },
  {
    name: '永恒流转',
    id: 14,
    cost: 50,
    requirement: () => `${format(Currency.eternities.value, 2)}/${format(1e7)} 永恒次数`,
    checkRequirement: () => Currency.eternities.gte(1e7),
    checkEvent: [GAME_EVENT.ETERNITY_RESET_AFTER, GAME_EVENT.REALITY_FIRST_UNLOCKED],
    description: '每秒获得与现实次数相等的永恒次数',
    automatorPoints: 5,
    shortDescription: () => `持续获得永恒次数`,
    effect: () => Currency.realities.value * Ra.unlocks.continuousTTBoost.effects.eternity.effectOrDefault(1),
    formatEffect: (value) => `${format(value)} 永恒次数/秒`,
  },
  {
    name: '永谜悖谬',
    id: 15,
    cost: 50,
    requirement: () => `不购买永恒点数 ${formatX(5)} 升级，拥有 ${format(DC.E10)} 永恒点数`,
    hasFailed: () => player.epmultUpgrades !== 0,
    checkRequirement: () => Currency.eternityPoints.exponent >= 10 && player.epmultUpgrades === 0,
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    canLock: true,
    lockEvent: () => `购买一个永恒点数 ${formatX(5)} 升级`,
    description: () => `基于永恒点数 ${formatX(5)} 升级的数量，提升获得超光速粒子的数量。`,
    effect: () => Math.max(Math.sqrt(Decimal.log10(EternityUpgrade.epMult.effectValue)) / 9, 1),
    formatEffect: (value) => formatX(value, 2, 2),
  },
  {
    name: '奇珍差异',
    id: 16,
    cost: 1500,
    requirement: () => `装备 ${formatInt(4)} 个稀有度大于或等于"罕见"的符文，进行一次现实（已装备 ${formatInt(Glyphs.activeWithoutCompanion.countWhere((g) => g && g.strength >= 1.5))} 个）`,
    hasFailed: () => {
      const availableGlyphs = Glyphs.inventory.countWhere((g) => g && g.strength >= 1.5)
      const equipped = Glyphs.activeWithoutCompanion.countWhere((g) => g.strength >= 1.5)
      const availableSlots = Glyphs.activeSlotCount - Glyphs.activeList.length
      return equipped + Math.min(availableGlyphs, availableSlots) < 4
    },
    checkRequirement: () => Glyphs.activeWithoutCompanion.countWhere((g) => g.strength >= 1.5) === 4,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    description: '提高符文稀有度',
    effect: 1.3 * debugOptions.getGlyphRarityMultiplier(),
    formatCost: (value) => format(value, 1, 0),
  },
  {
    name: '潜势双生',
    id: 17,
    cost: 1500,
    requirement: () =>
      `装备 ${formatInt(4)} 个词条数大于等于 ${formatInt(2)} 的符文，进行一次现实（已装备 ${formatInt(
        Glyphs.activeWithoutCompanion.countWhere((g) => g && countValuesFromBitmask(g.effects) >= 2)
      )} 个）`,
    hasFailed: () => {
      const availableGlyphs = Glyphs.inventory.countWhere((g) => g && countValuesFromBitmask(g.effects) >= 2)
      const equipped = Glyphs.activeWithoutCompanion.countWhere((g) => countValuesFromBitmask(g.effects) >= 2)
      const availableSlots = Glyphs.activeSlotCount - Glyphs.activeList.length
      return equipped + Math.min(availableGlyphs, availableSlots) < 4
    },
    checkRequirement: () => Glyphs.activeWithoutCompanion.countWhere((g) => countValuesFromBitmask(g.effects) >= 2) === 4,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    description: () => `符文以 ${formatPercents(0.5)} 的概率，多出现一个词条`,
    effect: 0.5,
    formatCost: (value) => format(value, 1, 0),
  },
  {
    name: '永恒测度',
    id: 18,
    cost: 1500,
    requirement: () => `装备 ${formatInt(4)} 个等级大于等于 ${formatInt(10)} 的符文，进行一次现实（已装备 ${formatInt(Glyphs.activeWithoutCompanion.countWhere((g) => g && g.level >= 10))} 个）`,
    hasFailed: () => {
      const availableGlyphs = Glyphs.inventory.countWhere((g) => g && g.level >= 10)
      const equipped = Glyphs.activeWithoutCompanion.countWhere((g) => g.level >= 10)
      const availableSlots = Glyphs.activeSlotCount - Glyphs.activeList.length
      return equipped + Math.min(availableGlyphs, availableSlots) < 4
    },
    checkRequirement: () => Glyphs.activeWithoutCompanion.countWhere((g) => g.level >= 10) === 4,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    description: '基于永恒次数加成符文等级',
    effect: () => Math.max(Math.sqrt(Currency.eternities.value.plus(1).log10()) * 0.45, 1 * debugOptions.getRealityPerkGlyphLevelExponent()),
    formatCost: (value) => format(value, 1, 0),
  },
  {
    name: '净化赋能',
    id: 19,
    cost: 1500,
    requirement: () => `拥有基本符文的总数达到 ${formatInt(30)} （你已拥有 ${formatInt(Glyphs.allGlyphs.countWhere((g) => g.type !== 'companion'))} 个)`,
    hasFailed: () => Glyphs.allGlyphs.countWhere((g) => g.type !== 'companion') < 30,
    checkRequirement: () => Glyphs.allGlyphs.countWhere((g) => g.type !== 'companion') >= 30,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    description: '你可以献祭符文来获得永久加成',
    formatCost: (value) => format(value, 1, 0),
  },
  {
    name: '奇点宇称',
    id: 20,
    cost: 1500,
    requirement: () => `解锁黑洞后，游戏内总时间达到 ${formatInt(100)} 天（当前：${Time.timeSinceBlackHole.toStringShort(false)}）`,
    hasFailed: () => !BlackHole(1).isUnlocked && Currency.realityMachines.lt(100),
    checkRequirement: () => Time.timeSinceBlackHole.totalDays >= 100 && BlackHole(1).isUnlocked,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: '解锁第二黑洞',
    automatorPoints: 10,
    shortDescription: () => `第二黑洞`,
    formatCost: (value) => format(value, 1, 0),
  },
  {
    name: '宇宙合璧',
    id: 21,
    cost: 100000,
    requirement: () => `所有种类的星系总数达到 ${formatInt(Replicanti.galaxies.total + player.galaxies + player.dilation.totalTachyonGalaxies)}/${formatInt(2800)}`,
    checkRequirement: () => Replicanti.galaxies.total + player.galaxies + player.dilation.totalTachyonGalaxies >= 2800,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => `极远星系的价格增长，推迟到 ${formatInt(1e5)} 星系生效`,
    effect: 1e5,
  },
  {
    name: '超越时光',
    id: 22,
    cost: 100000,
    requirement: () => `${format(Currency.timeShards.value, 1)}/${format(DC.E28000)}时间碎片`,
    checkRequirement: () => Currency.timeShards.exponent >= 28000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: '基于你在本次现实中消耗的时间获得时间维度的倍率加成。',
    effect: () => Decimal.pow10(Math.pow(1 + 2 * Math.log10(Time.thisReality.totalDays + 1), 1.6)),
    formatEffect: (value) => formatX(value, 2, 2),
  },
  {
    name: '快速复现',
    id: 23,
    cost: 100000,
    requirement: () => `在游戏内时间 ${formatInt(15)} 分钟内进行一次现实 (当前最佳: ${Time.bestReality.toStringShort()})`,
    hasFailed: () => Time.thisReality.totalMinutes / debugOptions.getGlobalSpeedFactor() >= 15,
    checkRequirement: () => Time.thisReality.totalMinutes / debugOptions.getGlobalSpeedFactor() < 15,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    description: '基于最快达成现实的时间加成复制器速度',
    effect: () => 15 / Math.clamp(Time.bestReality.totalMinutes, 1 / 12, 15),
    cap: 180,
    formatEffect: (value) => formatX(value, 2, 2),
  },
  {
    name: '合成之象',
    id: 24,
    cost: 100000,
    requirement: () => `不装备符文时，一次现实获得${formatInt(5000)}现实机器`,
    hasFailed: () => Glyphs.activeWithoutCompanion.length > 0,
    checkRequirement: () => MachineHandler.gainedRealityMachines.gte(5000) && Glyphs.activeWithoutCompanion.length === 0,
    canLock: true,
    lockEvent: '装备一个类型不是同伴的符文',
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    description: '增加一个符文槽',
    effect: () => 1,
  },
  {
    name: '轻松现实',
    id: 25,
    cost: 100000,
    requirement: () => `到达 ${format(DC.E11111)} 永恒点数（最佳：${format(player.records.bestReality.bestEP, 2)} 永恒点数）`,
    checkRequirement: () => player.records.bestReality.bestEP.exponent >= 11111,
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    description: '解锁自动现实，及其对应的自动机指令',
    automatorPoints: 100,
    shortDescription: () => `自动现实`,
  },
]
