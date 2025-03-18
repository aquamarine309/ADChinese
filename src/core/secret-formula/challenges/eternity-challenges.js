import { DC } from '../../constants.js'

const specialInfinityGlyphDisabledEffectText = () => (PelleRifts.chaos.milestones[1].canBeApplied ? '同时，无限符文的佩勒附加词条无效。' : '')

export const eternityChallenges = [
  {
    id: 1,
    description: '时间维度已禁用。',
    goal: DC.E1800,
    goalIncrease: DC.E200,
    reward: {
      description: '基于你在本次永恒中消耗的时间获得时间维度的倍率加成。',
      effect: (completions) => Decimal.pow(Math.max(player.records.thisEternity.time / 10, 0.9), 0.3 + completions * 0.05),
      formatEffect: (value) => formatX(value, 2, 1),
    },
    // These will get notation-formatted and scrambled between for the final goal
    scrambleText: ['1e2600', '1e201600'],
  },
  {
    id: 2,
    description: '无限维度已禁用。',
    goal: DC.E975,
    pelleGoal: DC.E1750,
    goalIncrease: DC.E175,
    reward: {
      description: '获得基于无限之力的第一无限维度的倍数加成。',
      effect: (completions) => Currency.infinityPower.value.pow(1.5 / (700 - completions * 100)).clampMin(1),
      cap: DC.E100,
      formatEffect: (value) => formatX(value, 2, 1),
    },
  },
  {
    id: 3,
    description: '第五维度至第八维度什么都不会生产。禁用维度献祭。',
    goal: DC.E600,
    pelleGoal: DC.E925,
    goalIncrease: DC.E75,
    reward: {
      description: () => `增加购买${formatInt(10)}个反物质维度的加成。`,
      effect: (completions) => completions * 0.72,
      formatEffect: (value) => `+${format(value, 2, 2)}`,
    },
  },
  {
    id: 4,
    description: `禁用所有的无限次数倍增器和生成器。`,
    goal: DC.E2750,
    goalIncrease: DC.E550,
    restriction: (completions) => Math.max(16 - 4 * completions, 0),
    checkRestriction: (restriction) => Currency.infinities.lte(restriction),
    formatRestriction: (restriction) => (restriction === 0 ? '没有任何无限次数' : `在 ${formatInt(restriction)} 无限次数以内`),
    failedRestriction: '(你的无限次数超过上限)',
    reward: {
      description: '基于未消费的无限点数获得无限维度的加成。',
      effect: (completions) => Currency.infinityPoints.value.pow(0.003 + completions * 0.002),
      cap: DC.E200,
      formatEffect: (value) => formatX(value, 2, 1),
    },
  },
  {
    id: 5,
    description: () => `星系价格立刻开始增加（通常在 ${formatInt(100)} 星系时开始）。 维度提升价格增速大幅增加。`,
    goal: DC.E750,
    pelleGoal: DC.E1400,
    goalIncrease: DC.E400,
    reward: {
      description: '推迟遥远星系的价格增长',
      effect: (completions) => completions * 5,
      formatEffect: (value) => `${formatInt(value)} 星系后开始`,
    },
  },
  {
    id: 6,
    // The asterisk, if present, will get replaced with strings generated from the scramble text
    description: () => {
      if (Enslaved.isRunning) return '你*，但是最大复制器星系升级的价格会大大降低。'
      return '你无法正常地获得反物质星系，但是最大复制器星系升级的价格会大大降低。'
    },
    goal: DC.E850,
    pelleGoal: DC.E1500,
    goalIncrease: DC.E250,
    reward: {
      description: '进一步降低反物质维度的价格增速',
      effect: (completions) => completions * 0.2,
      formatEffect: (value) => {
        const total = Math.round(Player.dimensionMultDecrease + Effects.sum(EternityChallenge(6).reward)) - value
        return `-${format(value, 2, 1)} (${formatX(total, 2, 1)} total)`
      },
    },
    scrambleText: ['无法正常地获得反物质星系', '랜法正㮾䂇齎反物㦂彁系'],
  },
  {
    id: 7,
    description: '第一时间维度生产第八无限维度，不生产时间碎片。第一无限维度生产第七维度，而不是无限之力。 同时，计数频率也直接影响无限维度和时间维度。',
    goal: DC.E2000,
    pelleGoal: DC.E2700,
    goalIncrease: DC.E530,
    effect: () => TimeDimension(1).productionPerSecond,
    reward: {
      description: '第一时间维度生产第八无限维度',
      effect: (completions) =>
        TimeDimension(1)
          .productionPerSecond.pow(completions * 0.2)
          .minus(1)
          .clampMin(0),
      formatEffect: (value) => `${format(value, 2, 1)} 每秒`,
    },
  },
  {
    id: 8,
    description: () => `你只能购买无限维度 ${formatInt(50)} 次，购买复制器升级 ${formatInt(40)} 次。禁用自动购买无限维度和复制器升级。`,
    goal: DC.E1300,
    pelleGoal: DC.E2800,
    goalIncrease: DC.E900,
    reward: {
      description: '无限之力提升复制器星系的效果',
      effect: (completions) => {
        const infinityPower = Math.log10(Currency.infinityPower.value.pLog10() + 1)
        return Math.max(0, Math.pow(infinityPower, 0.03 * completions) - 1)
      },
      formatEffect: (value) => formatPercents(value, 2),
    },
  },
  {
    id: 9,
    description: () => `你不能购买计数频率升级。无限之力以极低的效果加成时间维度。${specialInfinityGlyphDisabledEffectText()}`,
    goal: DC.E1750,
    pelleGoal: DC.E2900,
    goalIncrease: DC.E250,
    reward: {
      description: '基于时间碎片的无限维度倍数加成',
      effect: (completions) => Currency.timeShards.value.pow(completions * 0.1).clampMin(1),
      cap: DC.E400,
      formatEffect: (value) => formatX(value, 2, 1),
    },
  },
  {
    id: 10,
    description: () => {
      let description = `禁用时间维度和无限维度。你的反物质维度将取得基于无限次数的巨大提速。（无限次数${formatPow(950)}）。 ${specialInfinityGlyphDisabledEffectText()}`
      EternityChallenge(10).applyEffect((v) => (description += ` 当前: ${formatX(v, 2, 1)}`))
      return description
    },
    goal: DC.E3000,
    pelleGoal: DC.E3200,
    goalIncrease: DC.E300,
    effect: () => Decimal.pow(Currency.infinitiesTotal.value, 950).clampMin(1).pow(TimeStudy(31).effectOrDefault(1)),
    reward: {
      description: '时间维度基于无限次数获得加成',
      effect: (completions) => {
        const mult = Currency.infinitiesTotal.value
          .times(2.783e-6)
          .pow(0.4 + 0.1 * completions)
          .clampMin(1)
        return mult.powEffectOf(TimeStudy(31))
      },
      formatEffect: (value) => {
        // Since TS31 is already accounted for in the effect prop, we need to "undo" it to display the base value here
        const mult = formatX(value, 2, 1)
        return TimeStudy(31).canBeApplied ? `${formatX(value.pow(1 / TimeStudy(31).effectValue), 2, 1)} （时间研究 31 之后：${mult}）` : mult
      },
    },
  },
  {
    id: 11,
    description: () => `除了从无限之力和维度提升 (给予反物质维度) 获得的倍数外，禁用其他所有维度倍数。 ${specialInfinityGlyphDisabledEffectText()}`,
    goal: DC.E450,
    pelleGoal: DC.E11200,
    goalIncrease: DC.E200,
    pelleGoalIncrease: DC.E1400,
    reward: {
      description: '进一步降低计数频率的价格增速',
      effect: (completions) => completions * 0.07,
      formatEffect: (value) => {
        const total = Math.round(Player.tickSpeedMultDecrease + Effects.sum(EternityChallenge(11).reward)) - value
        return `-${format(value, 2, 2)}（总计 ${formatX(total, 2, 2)} ）`
      },
    },
  },
  {
    id: 12,
    description: () =>
      PlayerProgress.realityUnlocked() ? `游戏速度放慢 ${formatInt(1000)} 倍，并禁用其它影响游戏速度的机制。${specialInfinityGlyphDisabledEffectText()}` : `游戏速度放慢 ${formatInt(1000)} 倍。`,
    goal: DC.E110000,
    pelleGoal: DC.E208000,
    goalIncrease: DC.E12000,
    restriction: (completions) => Math.max(10 - 2 * completions, 1) / 10,
    checkRestriction: (restriction) => Time.thisEternity.totalSeconds / debugOptions.getGlobalSpeedFactor() < restriction,
    formatRestriction: (restriction) => `在 ${format(restriction, 0, 1)} 游戏秒内.`,
    failedRestriction: '(你超过了挑战时限，挑战失败)',
    reward: {
      description: '降低无限维度的价格增幅',
      effect: (completions) => 1 - completions * 0.008,
      formatEffect: (value) => `x${formatPow(value, 3, 3)}`,
    },
  },
]
