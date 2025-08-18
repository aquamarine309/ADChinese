import { DC } from "../../constants.js";

export const normalAchievements = [
  {
    id: 11,
    name: "从零开始",
    description: "购买第一维度。",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 12,
    name: "100个反物质算多了",
    description: "购买第二维度。",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 13,
    name: "《半衰期 3》确认发布",
    description: "购买第三维度。",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 14,
    name: "四里求生",
    description: "购买第四维度。",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 15,
    name: "五维冲击",
    description: "购买第五维度。",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 16,
    name: "6 不是 9",
    get description() {
      return Enslaved.isRunning
        ? "购买一个第六维度（这并没有什么特殊作用）"
        : "购买第六维度。";
    },
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 17,
    name: "幸运的 7",
    description: "购买第七维度。",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 18,
    name: "8 不是无限",
    get description() {
      return Enslaved.isRunning
        ? "购买一个第八反物质维度（别被骗了）"
        : "购买第八维度。";
    },
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 21,
    name: "永无止境！",
    description: "达到无限。",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `起始反物质数量为 ${formatInt(100)}。`; },
    effect: 100
  },
  {
    id: 22,
    name: "假新闻！",
    get description() { return `发现 ${formatInt(50)} 条不同的新闻消息。`; },
    checkRequirement: () => NewsHandler.uniqueTickersSeen >= 50,
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER
  },
  {
    id: 23,
    name: "九九归一",
    get description() { return `正好有 ${formatInt(99)} 个第八维度。`; },
    checkRequirement: () => AntimatterDimension(8).amount.eq(99),
    get reward() { return `第八维度增强 ${formatPercents(0.1)}。`; },
    effect: 1.1
  },
  {
    id: 24,
    name: "反物质末日",
    get description() { return `获得超过 ${format(DC.E80)} 反物质。`; },
    checkRequirement: () => Currency.antimatter.exponent >= 80,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 25,
    name: "加足马力",
    get description() { return `购买 ${formatInt(10)} 维度提升。`; },
    checkRequirement: () => DimBoost.purchasedBoosts >= 10,
    checkEvent: GAME_EVENT.DIMBOOST_AFTER
  },
  {
    id: 26,
    name: "翻越高墙",
    description: "购买一个反物质星系。",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.GALAXY_RESET_BEFORE
  },
  {
    id: 27,
    name: "双子星系",
    get description() { return `购买 ${formatInt(2)} 个反物质星系。`; },
    checkRequirement: () => player.galaxies >= 2,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER
  },
  {
    id: 28,
    name: "徒劳无功",
    get description() {
      return `当你有超过 ${format(DC.E150)} 个第一维度时，购买一个第一维度。`;
    },
    checkRequirement: () => AntimatterDimension(1).amount.exponent >= 150,
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    get reward() { return `第一维度增强 ${formatPercents(0.1)}。`; },
    effect: 1.1
  },
  {
    id: 31,
    name: "我忘记削弱它了",
    get description() { return `任一反物质维度的倍增器超过 ${formatX(DC.E31)}。`; },
    checkRequirement: () => AntimatterDimensions.all.some(x => x.multiplier.exponent >= 31),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `第一维度增强 ${formatPercents(0.05)}。`; },
    effect: 1.05
  },
  {
    id: 32,
    name: "诸神之乐",
    get description() { return `从维度献祭中获得超过 ${formatX(600)}倍的倍数加成。(第八维度自动购买挑战除外)`; },
    checkRequirement: () => !NormalChallenge(8).isOnlyActiveChallenge && Sacrifice.totalBoost.gte(600),
    checkEvent: GAME_EVENT.SACRIFICE_RESET_AFTER,
    get reward() {
      return `提升维度献祭的效果。
      ${Sacrifice.getSacrificeDescription({ "Achievement32": false, "Achievement57": false, "Achievement88": false })} ➜
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": false, "Achievement88": false })}`;
    },
    effect: 0.1,
  },
  {
    id: 33,
    name: "很多无限",
    get description() { return `达到无限 ${formatInt(10)} 次。`; },
    checkRequirement: () => Currency.infinities.gte(10),
    checkEvent: GAME_EVENT.BIG_CRUNCH_AFTER
  },
  {
    id: 34,
    name: "你 8 需要",
    description: "没有第八维度时达到无限",
    checkRequirement: () => AntimatterDimension(8).totalAmount.eq(0),
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `第一维度至第七维度的效果增强 ${formatPercents(0.02)}。`; },
    effect: 1.02
  },
  {
    id: 35,
    name: "你还真敢睡？",
    get description() {
      return `离线时间超过 ${formatInt(6)} 小时。`;
    },
    checkRequirement: () => Date.now() - player.lastUpdate >= 21600000,
    checkEvent: GAME_EVENT.GAME_TICK_BEFORE
  },
  {
    id: 36,
    name: "幽闭恐惧",
    get description() {
      return `只用 ${formatInt(1)} 反物质星系达到无限。大坍缩后重置反物质星系数量。`;
    },
    checkRequirement: () => player.galaxies === 1,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `起始计数频率提升 ${format(1.02, 2, 2)} 倍。`; },
    effect: 1 / 1.02
  },
  {
    id: 37,
    name: "那太快了！",
    get description() { return `在 ${formatInt(2)} 小时内达到无限。`; },
    checkRequirement: () => Time.thisInfinityRealTime.totalHours <= 2,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `起始反物质数量为 ${formatInt(5000)}`; },
    effect: 5000
  },
  {
    id: 38,
    name: "破除迷信",
    get description() {
      return `不进行维度献祭，购买反物质星系。（反物质星系的数量在无限时重置。)`;
    },
    checkRequirement: () => player.requirementChecks.infinity.noSacrifice,
    checkEvent: GAME_EVENT.GALAXY_RESET_BEFORE
  },
  {
    id: 41,
    name: "无需 DLC",
    get description() { return `购买 ${formatInt(16)} 个无限升级。`; },
    checkRequirement: () => player.infinityUpgrades.size >= 16,
    checkEvent: [
      GAME_EVENT.INFINITY_UPGRADE_BOUGHT,
      GAME_EVENT.REALITY_RESET_AFTER,
      GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT
    ],
    get reward() {
      return `解锁两个新的无限升级 - ${formatX(2)} 无限点数倍增器和离线时生成无限点数。`;
    },
  },
  {
    id: 42,
    name: "超级疯子",
    get description() {
      return `在拥有多于 ${format(DC.E63)} 反物质时，你每秒获得的反物质数量超过你拥有的反物质数量。`;
    },
    checkRequirement: () =>
      Currency.antimatter.exponent >= 63 &&
      Currency.antimatter.productionPerSecond.gt(Currency.antimatter.value),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 43,
    name: "反客为主",
    description:
      "使第八反物质维度的加成倍数最高，第七反物质维度的加成倍数第二高，依此类推。",
    checkRequirement: () => {
      const multipliers = Array.range(1, 8).map(tier => AntimatterDimension(tier).multiplier);
      for (let i = 0; i < multipliers.length - 1; i++) {
        if (multipliers[i].gte(multipliers[i + 1])) return false;
      }
      return true;
    },
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `每个反物质维度获得与层数成比例的提升(第八维度获得 ${formatPercents(0.08)}, 第七维度获得 ${formatPercents(0.07)}, 依此类推)。`;
    }
  },
  {
    id: 44,
    name: "超越之 30 秒",
    get description() {
      return `你每秒获得的反物质数量超过你拥有的反物质数量，并持续 ${formatInt(30)} 秒。`;
    },
    checkRequirement: () => AchievementTimers.marathon1
      .check(Currency.antimatter.productionPerSecond.gt(Currency.antimatter.value), 30),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
  },
  {
    id: 45,
    name: "比土豆还快",
    get description() { return `计数频率超过 ${format(DC.E29)} 每秒。`; },
    checkRequirement: () => Tickspeed.current.exponent <= -26,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `起始计数频率提升 ${formatX(1.02, 0, 2)} 倍。`; },
    effect: 0.98
  },
  {
    id: 46,
    name: "多维度",
    get description() { return `除第八维度外的所有反物质维度达到 ${format(DC.E12)} 。`; },
    checkRequirement: () => AntimatterDimension(7).amount.exponent >= 12,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 47,
    name: "挑战狂魔",
    get description() { return `完成 ${formatInt(3)} 个普通挑战。`; },
    checkRequirement: () => NormalChallenges.all.countWhere(c => c.isCompleted) >= 3,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT],
  },
  {
    id: 48,
    name: "初出茅庐",
    get description() { return `完成所有的普通挑战`; },
    checkRequirement: () => NormalChallenges.all.countWhere(c => !c.isCompleted) === 0,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT],
    get reward() { return `所有反物质维度增强 ${formatPercents(0.1)}。`; },
    effect: 1.1
  },
  {
    id: 51,
    name: "极限突破",
    description: "打破无限。",
    checkRequirement: () => player.break,
    checkEvent: [GAME_EVENT.BREAK_INFINITY, GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT],
  },
  {
    id: 52,
    name: "自动化时代",
    description: "维度和计数频率自动购买器工作的时间间隔达到最小值。",
    checkRequirement: () => Autobuyer.antimatterDimension.zeroIndexed.concat(Autobuyer.tickspeed)
      .every(a => a.isUnlocked && a.hasMaxedInterval),
    checkEvent: [GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT]
  },
  {
    id: 53,
    name: "这当然不值得",
    description: "所有自动购买器工作的时间间隔达到最小值。",
    // The upgradeable autobuyers are dimensions, tickspeed, dimension boost,
    // galaxy, and big crunch (the ones you get from normal challenges).
    // We don't count autobuyers which can be upgraded via e.g. perks as upgradeable.
    checkRequirement: () => Autobuyers.upgradeable
      .every(a => a.isUnlocked && a.hasMaxedInterval),
    checkEvent: [GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT]
  },
  {
    id: 54,
    name: "健步如飞",
    get description() { return `在 ${formatInt(10)} 分钟内达到无限。`; },
    checkRequirement: () => Time.thisInfinityRealTime.totalMinutes <= 10,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `起始反物质数量为 ${format(5e5)}`; },
    effect: 5e5
  },
  {
    id: 55,
    name: "永远没多远",
    get description() { return `在 ${formatInt(1)} 分钟内达到无限。`; },
    checkRequirement: () => Time.thisInfinityRealTime.totalMinutes <= 1,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `起始反物质数量为 ${format(5e10)}`; },
    effect: 5e10
  },
  {
    id: 56,
    name: "死伤枕藉",
    get description() {
      return `在 ${formatInt(3)} 分钟内完成第二维度自动购买器挑战（挑战2）`;
    },
    checkRequirement: () => NormalChallenge(2).isOnlyActiveChallenge && Time.thisInfinityRealTime.totalMinutes <= 3,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `在无限最初的 ${formatInt(3)} 分钟内所有反物质维度更强。`;
    },
    effect: () => Math.max(6 / (Time.thisInfinity.totalMinutes + 3), 1),
    effectCondition: () => Time.thisInfinity.totalMinutes < 3,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 57,
    name: "神授之礼",
    get description() {
      return `在 ${formatInt(3)} 分钟内完成第八维度自动购买器挑战（挑战8）`;
    },
    checkRequirement: () => NormalChallenge(8).isOnlyActiveChallenge && Time.thisInfinityRealTime.totalMinutes <= 3,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `提升维度献祭的效果。
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": false, "Achievement88": false })} ➜
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": true, "Achievement88": false })}`;
    },
    effect: 0.1
  },
  {
    id: 58,
    name: "挺不错的",
    get description() { return `在 ${formatInt(3)} 分钟内完成计数频率自动购买器挑战（挑战9）。`; },
    checkRequirement: () => NormalChallenge(9).isOnlyActiveChallenge && Time.thisInfinityRealTime.totalMinutes <= 3,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `每买 ${formatInt(10)} 个反物质维度的倍数增加 ${formatPercents(0.01)}。`;
    },
    effect: 1.01
  },
  {
    id: 61,
    name: "虎背熊腰",
    get description() {
      return `将所有自动购买器的批量购买提升至 ${formatInt(Autobuyer.antimatterDimension.bulkCap)}。`;
    },
    checkRequirement: () => Autobuyer.antimatterDimension.zeroIndexed.every(x => x.hasMaxedBulk),
    checkEvent: [GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT,
      GAME_EVENT.SAVE_CONVERTED_FROM_PREVIOUS_VERSION],
    reward: "自动购买维度时，批量购买的数量不受限制。"
  },
  {
    id: 62,
    name: "哦，你… 你还在这里吗？",
    get description() { return `达到 ${format(DC.E8)} 无限点数/分钟。`; },
    checkRequirement: () => Player.bestRunIPPM.exponent >= 8,
    checkEvent: GAME_EVENT.BIG_CRUNCH_AFTER
  },
  {
    id: 63,
    name: "新的开始",
    description: "开始产生无限之力。",
    checkRequirement: () => Currency.infinityPower.gt(1),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 64,
    name: "不死之身",
    description: "在普通挑战中，不购买维度提升和反物质星系达到无限。",
    checkRequirement: () => player.galaxies === 0 && DimBoost.purchasedBoosts === 0 && NormalChallenge.isRunning,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `第一维度至第四维度增强 ${formatPercents(0.25)}。`; },
    effect: 1.25
  },
  {
    id: 65,
    name: "小菜一碟",
    get description() { return `所有挑战的完成用时之和小于 ${formatInt(3)} 分钟。`; },
    checkRequirement: () => Time.challengeSum.totalMinutes < 3,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER],
    get reward() {
      return `在无限最初的 ${formatInt(3)} 分钟内所有反物质维度更强，但仅在挑战中生效。`;
    },
    effect: () => (Player.isInAnyChallenge ? Math.max(4 / (Time.thisInfinity.totalMinutes + 1), 1) : 1),
    effectCondition: () => Player.isInAnyChallenge && Time.thisInfinity.totalMinutes < 3,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 66,
    name: "比方土豆还快。",
    get description() { return `计数频率超过 ${format(DC.E58)} 每秒。`; },
    checkRequirement: () => Tickspeed.current.exponent <= -55,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `起始计数频率提升 ${formatX(1.02, 0, 2)} 倍。`; },
    effect: 0.98
  },
  {
    id: 67,
    name: "无限挑战",
    description: "完成一个无限挑战。",
    checkRequirement: () => InfinityChallenges.completed.length > 0,
    checkEvent: [GAME_EVENT.INFINITY_CHALLENGE_COMPLETED, GAME_EVENT.REALITY_RESET_AFTER]
  },
  {
    id: 68,
    name: "你再次这么做，就是为了正确地完成成就？",
    get description() {
      return `在 ${formatInt(10)} 秒内完成第三维度自动购买器挑战（挑战3）。`;
    },
    checkRequirement: () => NormalChallenge(3).isOnlyActiveChallenge && Time.thisInfinityRealTime.totalSeconds <= 10,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `第一维度增强 ${formatPercents(0.5)}。`; },
    effect: 1.5
  },
  {
    id: 71,
    name: "错误909：找不到维度",
    get description() {
      return `在第二反物质维度自动购买器挑战（挑战2）中，仅有 ${formatInt(1)} 个第一维度且没有其他维度、维度提升和反物质星系时达到无限。`
    },
    checkRequirement: () =>
      NormalChallenge(2).isOnlyActiveChallenge &&
      AntimatterDimension(1).amount.eq(1) &&
      DimBoost.purchasedBoosts === 0 &&
      player.galaxies === 0,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `第一维度增强 ${formatInt(3)} 倍。`; },
    effect: 3
  },
  {
    id: 72,
    name: "拿不住了",
    get description() {
      return `所有反物质维度的倍数超过 ${formatX(Decimal.NUMBER_MAX_VALUE, 1)}。`;
    },
    checkRequirement: () => AntimatterDimensions.all.every(x => x.multiplier.gte(Decimal.NUMBER_MAX_VALUE)),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `所有反物质维度增强 ${formatPercents(0.1)}。`; },
    effect: 1.1
  },
  {
    id: 73,
    name: "不存在的成就",
    get description() { return `获得 ${formatPostBreak(DC.D9_9999E9999, 4)} 反物质。`; },
    checkRequirement: () => Currency.antimatter.gte(DC.D9_9999E9999),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "基于当前反物质，给予反物质维度倍数加成",
    effect: () => Currency.antimatter.value.pow(0.00002).plus(1),
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    id: 74,
    name: "一秒都不给我",
    get description() { return `所有挑战的用时之和小于 ${formatInt(5)} 秒。`; },
    checkRequirement: () => Time.challengeSum.totalSeconds < 5,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER],
    get reward() { return `在挑战中，所有的反物质维度增强 ${formatPercents(0.4)}`; },
    effect: 1.4,
    effectCondition: () => Player.isInAnyChallenge
  },
  {
    id: 75,
    name: "新的维度？？？",
    description: "解锁第四无限维度",
    checkRequirement: () => InfinityDimension(4).isUnlocked,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "你的成就提供的倍数加成作用于无限维度。",
    effect: () => Achievements.power
  },
  {
    id: 76,
    name: "每个维度都有一个",
    get description() { return `玩游戏 ${formatInt(8)} 天。`; },
    checkRequirement: () => Time.totalTimePlayed.totalDays >= 8,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "基于游戏时长，给予反物质维度极小的倍数加成。",
    effect: () => Math.max(Math.pow(Time.totalTimePlayed.totalDays / 2, 0.05), 1),
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    id: 77,
    name: "百万富翁",
    get description() { return `达到 ${format(1e6)} 无限之力。`; },
    checkRequirement: () => Currency.infinityPower.exponent >= 6,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 78,
    name: "眨眼之间",
    get description() { return `在 ${formatInt(250)} 毫秒内完成无限。`; },
    checkRequirement: () => Time.thisInfinityRealTime.totalMilliseconds <= 250,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `起始反物质数量为 ${format(5e25)}`;
    },
    effect: 5e25
  },
  {
    id: 81,
    name: "我超喜欢游戏设计的！",
    get description() { return `在 ${formatInt(15)} 秒内完成无限挑战 5。`; },
    checkRequirement: () => InfinityChallenge(5).isRunning && Time.thisInfinityRealTime.totalSeconds <= 15,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE
  },
  {
    id: 82,
    name: "梅开二度",
    get description() { return `完成 ${formatInt(8)} 个无限挑战。`; },
    checkRequirement: () => InfinityChallenges.completed.length === 8,
    checkEvent: [GAME_EVENT.INFINITY_CHALLENGE_COMPLETED, GAME_EVENT.REALITY_RESET_AFTER],
  },
  {
    id: 83,
    name: "您可以获得50个反物质星系？！？！",
    get description() { return `获得 ${formatInt(50)} 个反物质星系。`; },
    checkRequirement: () => player.galaxies >= 50,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    get reward() { return `每一个反物质星系使计数频率增加 ${formatPercents(0.05)}。`; },
    effect: () => DC.D0_95.pow(player.galaxies),
    formatEffect: value => `${formatX(value.recip(), 2, 2)}`
  },
  {
    id: 84,
    name: "这有点多",
    get description() { return `获得 ${formatPostBreak("1e35000")} 反物质。`; },
    checkRequirement: () => Currency.antimatter.exponent >= 35000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "未花费的反物质越多，反物质维度的效果越强。",
    effect: () => Currency.antimatter.value.pow(0.00002).plus(1),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 85,
    name: "你的无限点数全归我们了",
    get description() { return `一次大坍缩获得超过 ${format(DC.E150)} 无限点数。`; },
    checkRequirement: () => gainedInfinityPoints().exponent >= 150,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `从大坍缩中获得额外 ${formatX(4)} 倍的无限点数。`; },
    effect: 4
  },
  {
    id: 86,
    name: "扭曲时间？",
    get description() { return `每次计数频率升级达到 ${formatX(1000)} 计数频率/秒。`; },
    checkRequirement: () => Tickspeed.multiplier.recip().gte(1000),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `星系增强 ${formatPercents(0.01)}。`; },
    effect: 1.01
  },
  {
    id: 87,
    name: "200万次无限",
    get description() { return `达到无限 ${format(DC.D2E6)} 次。`; },
    checkRequirement: () => Currency.infinities.gt(DC.D2E6),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `无限超过 ${formatInt(5)} 秒时，给予 ${formatX(250)} 倍无限次数。`;
    },
    effect: 250,
    effectCondition: () => Time.thisInfinity.totalSeconds > 5
  },
  {
    id: 88,
    name: "另请高明",
    get description() {
      return `在一次维度献祭中获得一个 ${formatX(Decimal.NUMBER_MAX_VALUE, 1, 0)} 倍数加成。`;
    },
    checkRequirement: () => Sacrifice.nextBoost.gte(Decimal.NUMBER_MAX_VALUE),
    checkEvent: GAME_EVENT.SACRIFICE_RESET_BEFORE,
    get reward() {
      return `提升维度献祭的效果。
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": true, "Achievement88": false })} ➜
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": true, "Achievement88": true })}`;
    },
    effect: 0.1
  },
  {
    id: 91,
    name: "神之速度",
    get description() {
      return `在 ${formatInt(2)} 秒内进行大坍缩并获得不少于 ${format(DC.E200)} 无限点数。`;
    },
    checkRequirement: () => gainedInfinityPoints().exponent >= 200 && Time.thisInfinityRealTime.totalSeconds <= 2,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `在无限最初的 ${formatInt(5)} 秒内所有的反物质维度大幅增强。`;
    },
    effect: () => Math.max((5 - Time.thisInfinity.totalSeconds) * 60, 1),
    effectCondition: () => Time.thisInfinity.totalSeconds < 5,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 92,
    name: "绝不刹车！",
    get description() {
      return `在 ${formatInt(20)} 秒内进行大坍缩并获得不少于 ${format(DC.E250)} 无限点数。`;
    },
    checkRequirement: () => gainedInfinityPoints().exponent >= 250 && Time.thisInfinityRealTime.totalSeconds <= 20,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `在无限最初的 ${formatInt(60)} 秒内所有的反物质维度大幅增强。`;
    },
    effect: () => Math.max((1 - Time.thisInfinity.totalMinutes) * 100, 1),
    effectCondition: () => Time.thisInfinity.totalMinutes < 1,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 93,
    name: "极限超频",
    get description() { return `一次大坍缩获得超过 ${format(DC.E300)} 无限点数。`; },
    checkRequirement: () => gainedInfinityPoints().exponent >= 300,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `从大坍缩中获得额外 ${formatX(4)} 倍的无限点数。`; },
    effect: 4
  },
  {
    id: 94,
    name: "4.3333 分钟的无限",
    get description() { return `达到 ${format(DC.E260)} 无限之力。`; },
    checkRequirement: () => Currency.infinityPower.exponent >= 260,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "获得的无限之力加倍。",
    effect: 2
  },
  {
    id: 95,
    name: "这安全吗？",
    get description() { return `在 ${formatInt(1)} 小时内获得 ${format(Decimal.NUMBER_MAX_VALUE, 1, 0)} 个复制器。`; },
    get reward() { return `无限时保留复制器和${formatInt(1)}个复制器星系。`; },
    checkRequirement: () =>
      (Replicanti.amount.eq(Decimal.NUMBER_MAX_VALUE) || player.replicanti.galaxies > 0) &&
      Time.thisInfinityRealTime.totalHours <= 1,
    checkEvent: GAME_EVENT.REPLICANTI_TICK_AFTER
  },
  {
    id: 96,
    name: "时间是相对的",
    description: "达到永恒",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE
  },
  {
    id: 97,
    name: "如履薄冰",
    get description() { return `所有无限挑战的用时之和小于 ${format(6.66, 2, 2)} 秒。`; },
    checkRequirement: () => Time.infinityChallengeSum.totalSeconds < 6.66,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER],
  },
  {
    id: 98,
    name: "无限零度",
    description: "解锁第八无限维度",
    checkRequirement: () => InfinityDimension(8).isUnlocked,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 101,
    name: "缺一少七",
    description: "不购买第一维度至第七维度达到永恒。",
    checkRequirement: () => player.requirementChecks.eternity.onlyAD8,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE
  },
  {
    id: 102,
    name: "永恒的一英里",
    description: "获得所有的永恒里程碑。",
    checkRequirement: () => EternityMilestone.all.every(m => m.isReached),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 103,
    name: "又一个不存在的成就",
    get description() { return `达到 ${formatPostBreak(DC.D9_99999E999, 5, 0)} 无限点数。`; },
    checkRequirement: () => Currency.infinityPoints.exponent >= 1000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `更好的无限点数公式。log(x)/${formatInt(308)} ➜ log(x)/${formatFloat(307.8, 1)}`;
    },
    effect: 307.8
  },
  {
    id: 104,
    name: "这不是永恒",
    get description() { return `Eternity in under ${formatInt(30)} seconds。`; },
    checkRequirement: () => Time.thisEternity.totalSeconds <= 30,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    get reward() { return `开始永恒时拥有 ${format(5e25)} 无限点数。`; },
    effect: 5e25
  },
  {
    id: 105,
    name: "无限时间",
    get description() { return `一次永恒中，从时间维度获得${formatInt(308)}个计数频率升级。`; },
    checkRequirement: () => player.totalTickGained >= 308,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "第一时间维度获得基于计数频率的加成",
    effect: () => Tickspeed.perSecond.pow(0.000005),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 106,
    name: "蜂群",
    get description() { return `每 ${formatInt(15)} 秒获得 ${formatInt(10)} 个复制器星系。`; },
    checkRequirement: () => Replicanti.galaxies.total >= 10 && Time.thisInfinity.totalSeconds <= 15,
    checkEvent: GAME_EVENT.REPLICANTI_TICK_AFTER
  },
  {
    id: 107,
    name: "无需指南",
    get description() { return `无限次数小于 ${formatInt(10)} 时，达到永恒。`; },
    checkRequirement: () => Currency.infinities.lt(10),
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE
  },
  {
    id: 108,
    name: "9 是买得起的！",
    get description() { return `在 ${formatInt(9)} 个复制器时永恒。`; },
    checkRequirement: () => Replicanti.amount.round().eq(9),
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE
  },
  {
    id: 111,
    name: "渐入佳境",
    get description() {
      return `在你过去的 ${formatInt(10)} 次无限中，每次无限至少比上一次无限的无限点数高 ${format(Decimal.NUMBER_MAX_VALUE, 1, 0)} 倍。`;
    },
    checkRequirement: () => {
      if (player.records.recentInfinities.some(i => i[0] === Number.MAX_VALUE)) return false;
      const infinities = player.records.recentInfinities.map(run => run[2]);
      for (let i = 0; i < infinities.length - 1; i++) {
        if (infinities[i].lt(infinities[i + 1].times(Decimal.NUMBER_MAX_VALUE))) return false;
      }
      return true;
    },
    checkEvent: GAME_EVENT.BIG_CRUNCH_AFTER,
    reward: "购买维度提升或反物质星系时，不会重置反物质的数量。"
  },
  {
    id: 112,
    name: "一去不返",
    get description() { return `所有无限挑战的用时之和小于 ${formatInt(750)} 毫秒。`; },
    checkRequirement: () => Time.infinityChallengeSum.totalMilliseconds < 750,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER]
  },
  {
    id: 113,
    name: "永恒是新的无限",
    get description() { return `在 ${formatInt(250)} 毫秒内达到永恒。`; },
    checkRequirement: () => Time.thisEternity.totalMilliseconds <= 250,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    get reward() { return `多获得 ${formatX(2)} 倍的永恒次数`; },
    effect: 2,
  },
  {
    id: 114,
    name: "折戟沉沙",
    description: "永恒挑战失败一次。",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.CHALLENGE_FAILED,
    reward: "成就感逐渐消失。",
    // 不显示，无需翻译
    effect: () => "Sense of accomplishment (fading)"
  },
  {
    id: 115,
    name: "双重挑战",
    description: "在一个永恒挑战中开始一个无限挑战。",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 116,
    name: "无需无限",
    get description() { return `无限次数小于或等于 ${formatInt(1)} 时，达到永恒。`; },
    checkRequirement: () => Currency.infinities.lte(1),
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    reward: "无限点数获得基于无限次数的倍数加成。",
    effect: () => Decimal.pow(Currency.infinitiesTotal.value.clampMin(1), LOG10_2 / 4).powEffectOf(TimeStudy(31)),
    cap: () => Effarig.eternityCap,
    formatEffect: value => {
      // Since TS31 is already accounted for in the effect prop, we need to "undo" it to display the base value here
      const mult = formatX(value, 2, 2);
      return TimeStudy(31).canBeApplied
        ? `${formatX(value.pow(1 / TimeStudy(31).effectValue), 2, 1)} （解锁时间研究 31 之后：${mult}）`
        : mult;
    }
  },
  {
    id: 117,
    name: "维度提升现已上架华润万家！",
    get description() { return `一次购买 ${formatInt(750)} 个维度提升。`; },
    checkRequirement: ([bulk]) => bulk >= 750,
    checkEvent: GAME_EVENT.DIMBOOST_AFTER,
    get reward() {
      return `维度提升对反物质维度的倍率提升 ${formatPercents(0.01)}。`;
    },
    effect: 1.01
  },
  {
    id: 118,
    name: "超过九千",
    get description() { return `维度献祭提供的倍数加成达到 ${formatPostBreak(DC.E9000)}。`; },
    checkRequirement: () => Sacrifice.totalBoost.exponent >= 9000,
    checkEvent: GAME_EVENT.SACRIFICE_RESET_AFTER,
    reward: `维度献祭不会重置反物质维度。已启用的自动购买器在每个时间间隔进行一次购买。`,
  },
  {
    id: 121,
    name: "无限的无限点数",
    get description() { return `达到 ${formatPostBreak("1e30008")} 无限点数。`; },
    checkRequirement: () => Currency.infinityPoints.exponent >= 30008,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 122,
    name: "你已经死了。",
    description: "不购买第二维度至第八维度达到永恒。",
    checkRequirement: () => player.requirementChecks.eternity.onlyAD1,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE
  },
  {
    id: 123,
    name: "5 个永恒后更新",
    get description() { return `完成 ${formatInt(50)} 个不同的永恒挑战。`; },
    checkRequirement: () => EternityChallenges.completions >= 50,
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER
  },
  {
    id: 124,
    name: "细水长流",
    get description() {
      return `在单次无限中，你每秒获得的无限之力数量超过你拥有的无限之力，并持续 ${formatInt(60)} 秒。`;
    },
    checkRequirement: () => AchievementTimers.marathon2
      .check(
        !EternityChallenge(7).isRunning &&
        InfinityDimension(1).productionPerSecond.gt(Currency.infinityPower.value),
        60
      ),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 125,
    name: "饕餮盛宴",
    get description() {
      return `没有任何无限次数，并且没有第一反物质维度，在当前永恒中达到 ${format(DC.E90)} 无限点数。`;
    },
    checkRequirement: () => Currency.infinityPoints.exponent >= 90 &&
      player.requirementChecks.eternity.noAD1 && Currency.infinities.eq(0),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "基于本次无限中花费的时间，给予无限点倍数加成。",
    effect() {
      const thisInfinity = Time.thisInfinity.totalSeconds * 10 + 1;
      return DC.D2.pow(Math.log(thisInfinity) * Math.min(Math.pow(thisInfinity, 0.11), 500));
    },
    cap: () => Effarig.eternityCap,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 126,
    name: "流行音乐",
    get description() { return `复制器星系数量是反物质星系的 ${formatInt(180)} 倍。`; },
    checkRequirement: () => Replicanti.galaxies.total >= 180 * player.galaxies && player.galaxies > 0,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `获得复制器星系时，你的复制器数量将除以 ${format(Decimal.NUMBER_MAX_VALUE, 1, 0)} ，而不是重置为 ${formatInt(1)}。`;
    },
  },
  {
    id: 127,
    name: "天外有天？",
    get description() { return `达到 ${format(Decimal.NUMBER_MAX_VALUE, 1, 0)} 永恒点数。`; },
    checkRequirement: () => Currency.eternityPoints.gte(Decimal.NUMBER_MAX_VALUE),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 128,
    name: "我怎么才能摆脱你呢？",
    get description() { return `无需任何时间研究达到 ${formatPostBreak("1e22000")} 无限点数。`; },
    checkRequirement: () => Currency.infinityPoints.exponent >= 22000 && player.timestudy.studies.length === 0,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "时间维度的当前产量等于原有产量和你拥有的时间研究数量的乘积。",
    effect: () => Math.max(player.timestudy.studies.length, 1),
    formatEffect: value => `${formatX(value)}`
  },
  {
    id: 131,
    name: "不道德的消费",
    get description() { return `获得 ${format(DC.D2E9)} 储存的无限次数。`; },
    checkRequirement: () => Currency.infinitiesBanked.gt(DC.D2E9),
    checkEvent: [GAME_EVENT.ETERNITY_RESET_AFTER, GAME_EVENT.SAVE_CONVERTED_FROM_PREVIOUS_VERSION],
    get reward() {
      return `多获得 ${formatX(2)} 倍的无限次数，同时 ${formatPercents(0.05)} 的无限次数在永恒之后转化为储存的无限次数。`;
    },
    effects: {
      infinitiesGain: 2,
      bankedInfinitiesGain: () => Currency.infinities.value.times(0.05).floor()
    }
  },
  {
    id: 132,
    name: "独特雪花",
    get description() {
      return `在本次永恒中，获得${formatInt(569)}个反物质星系，且没有任何复制器星系。`;
    },
    checkRequirement: () => player.galaxies >= 569 && player.requirementChecks.eternity.noRG,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    reward: "超光速粒子和膨胀时间获得基于反物质星系的倍数加成。",
    effect: () => 1.22 * Math.max(Math.pow(player.galaxies, 0.04), 1),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 133,
    name: "反正我从来不喜欢无限这玩意",
    get description() {
      return `不购买无限维度和 ${formatX(2)} 无限点倍增升级，达到 ${formatPostBreak(DC.E200000)} 无限点数。`;
    },
    checkRequirement: () =>
      Array.dimensionTiers.map(InfinityDimension).every(dim => dim.baseAmount === 0) &&
      player.IPMultPurchases === 0 &&
      Currency.infinityPoints.exponent >= 200000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "开始永恒时，所有无限挑战解锁且已完成。"
  },
  {
    id: 134,
    name: "得寸进尺",
    get description() { return `达到 ${formatPostBreak(DC.E18000)} 个复制器。`; },
    checkRequirement: () => Replicanti.amount.exponent >= 18000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `在少于${format(replicantiCap(), 1)}复制器时，你获得复制器的速度为${formatInt(2)}倍。`;
    }
  },
  {
    id: 135,
    name: "比土豆^286078还快。",
    get description() { return `计数频率超过 ${formatPostBreak("1e8296262")} 每秒。`; },
    checkRequirement: () => Tickspeed.current.exponent <= -8296262,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 136,
    name: "我跟你讲，时间是相对的",
    description: "膨胀时间。",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 137,
    name: "你终于考虑到时间膨胀了！",
    get description() {
      return `时间膨胀时，在 ${formatInt(1)} 分钟内获得 ${formatPostBreak("1e260000")} 反物质。`;
    },
    checkRequirement: () =>
      Currency.antimatter.exponent >= 260000 &&
      Time.thisEternity.totalMinutes <= 1 &&
      player.dilation.active,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `在时间膨胀中获得的膨胀时间和时间之理 ${formatX(2)}。`; },
    effect: () => (player.dilation.active ? 2 : 1),
  },
  {
    id: 138,
    name: "这是我为了摆脱你必须做的事。",
    get description() {
      return `时间膨胀时，无需任何时间研究达到 ${formatPostBreak("1e26000")} 无限点数。`;
    },
    checkRequirement: () =>
      player.timestudy.studies.length === 0 &&
      player.dilation.active &&
      Currency.infinityPoints.exponent >= 26000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "移除活跃和挂机路径中时间研究 131 和 133 中的削弱项目。"
  },
  {
    id: 141,
    name: "回归现实",
    description: "进行一次现实。",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() {
      return `无限点数 ${formatX(4)}, 购买 ${formatInt(10)} 个反物质维度的倍数加成 +${format(0.1, 0, 1)}。`;
    },
    effects: {
      ipGain: 4,
      buyTenMult: 0.1
    }
  },
  {
    id: 142,
    name: "这怎么用？",
    description: "解锁自动机。",
    checkRequirement: () => Player.automatorUnlocked,
    checkEvent: [GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_BOUGHT, GAME_EVENT.PERK_BOUGHT,
      GAME_EVENT.BLACK_HOLE_UNLOCKED],
    get reward() { return `维度提升的效果增强 ${formatPercents(0.5)}。`; },
    effect: 1.5,
  },
  {
    id: 143,
    name: "出神入化",
    get description() {
      return `在你过去的 ${formatInt(10)} 次永恒中，每次永恒至少比上一次永恒后获得的永恒点数高 ${format(Decimal.NUMBER_MAX_VALUE, 1, 0)} 倍。`;
    },
    checkRequirement: () => {
      if (player.records.recentEternities.some(i => i[0] === Number.MAX_VALUE)) return false;
      const eternities = player.records.recentEternities.map(run => run[2]);
      for (let i = 0; i < eternities.length - 1; i++) {
        if (eternities[i].lt(eternities[i + 1].times(Decimal.NUMBER_MAX_VALUE))) return false;
      }
      return true;
    },
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    reward: "购买星系不再重置维度提升。"
  },
  {
    id: 144,
    name: "这是《星际穿越》的梗吗？",
    description: "解锁黑洞。",
    checkRequirement: () => BlackHole(1).isUnlocked,
    checkEvent: GAME_EVENT.BLACK_HOLE_UNLOCKED,
  },
  {
    id: 145,
    name: "本末倒置",
    description: "单个黑洞的冷却时间小于其持续时间。",
    checkRequirement: () => BlackHoles.list.some(bh => bh.interval < bh.duration),
    checkEvent: GAME_EVENT.BLACK_HOLE_UPGRADE_BOUGHT,
    get reward() { return `黑洞的冷却时间缩短 ${formatPercents(0.1)}。`; },
    effect: 0.9
  },
  {
    id: 146,
    name: "伟大复兴",
    description: "购买复兴树的所有节点。",
    checkRequirement: () => player.reality.perks.size === Perks.all.length,
    checkEvent: GAME_EVENT.PERK_BOUGHT,
    get reward() { return `符文稀有度 +${formatPercents(0.01)}。`; },
    effect: 1
  },
  {
    id: 147,
    name: "现实专精",
    description: "购买所有的现实升级。",
    checkRequirement: () => RealityUpgrades.allBought,
    checkEvent: GAME_EVENT.REALITY_UPGRADE_BOUGHT,
    reward: "解锁现实之神特蕾莎。"
  },
  {
    id: 148,
    name: "皇家同花顺",
    description: "装备每种基本类型的符文各一个时，达成现实。",
    checkRequirement: () => BASIC_GLYPH_TYPES
      .every(type => Glyphs.activeList.some(g => g.type === type)),
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    reward: "基于已装备符文类型的数量，提升符文等级。",
    effect: () => (new Set(Glyphs.activeWithoutCompanion.map(g => g.type))).size,
    formatEffect: value => `+${formatInt(value)}`
  },
  {
    id: 151,
    name: "你真的 8 需要",
    get description() {
      return `在一次无限中，不购买第八反物质维度，获得 ${formatInt(800)} 个反物质星系。`;
    },
    checkRequirement: () => player.galaxies >= 800 && player.requirementChecks.infinity.noAD8,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    reward: "解锁成就之神薇。"
  },
  {
    id: 152,
    name: "还有更多的符文吗？",
    get description() { return `符文仓库中有 ${formatInt(100)} 个符文。`; },
    checkRequirement: () => Glyphs.inventoryList.length >= 100,
    checkEvent: GAME_EVENT.GLYPHS_CHANGED
  },
  {
    id: 153,
    name: "无需贵物",
    description: "在现实全程不生产反物质的情况下，进行现实。",
    checkRequirement: () => player.requirementChecks.reality.noAM,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
  },
  {
    id: 154,
    name: "多快才叫快",
    get description() { return `在游戏内时间 ${formatInt(5)} 秒内达成现实。`; },
    checkRequirement: () => Time.thisReality.totalSeconds <= 5,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() { return `现实时有 ${formatPercents(0.1)} 的概率，获得的现实次数和复兴点数 ${formatX(2)}。`; },
    effect: 0.1
  },
  {
    id: 155,
    name: "成就 #15983",
    get description() { return `游戏内时间达到 ${formatInt(137)} 亿年。`; },
    checkRequirement: () => Time.totalTimePlayed.totalYears > 13.7e9,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `黑洞的持续时间延长 ${formatPercents(0.1)}。`; },
    effect: 1.1
  },
  {
    id: 156,
    name: "世界一流退学",
    description: "不购买时间之理，进行现实。",
    checkRequirement: () => player.requirementChecks.reality.noPurchasedTT,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() { return `生产的时间之理 ${formatX(2.5, 0, 1)}, 同时获得一张免费的麦当劳™优惠券。`; },
    effect: 2.5
  },
  {
    id: 157,
    name: "效果拔群！",
    get description() { return `获得一个 ${formatInt(4)} 词条的符文。`; },
    checkRequirement: () => Glyphs.activeList.concat(Glyphs.inventoryList).map(
      glyph => getGlyphEffectsFromBitmask(glyph.effects, 0, 0)
        .filter(effect => effect.isGenerated).length
    ).max() >= 4,
    checkEvent: GAME_EVENT.GLYPHS_CHANGED
  },
  {
    id: 158,
    name: "无底深渊",
    description: "两个黑洞永久启动。",
    checkRequirement: () => BlackHole(1).isPermanent && BlackHole(2).isPermanent,
    checkEvent: GAME_EVENT.BLACK_HOLE_UPGRADE_BOUGHT,
    get reward() { return `黑洞强度增加 ${formatPercents(0.1)}。`; },
    effect: 1.1
  },
  {
    id: 161,
    name: "小伙子，你来错地儿了",
    get description() { return `时间膨胀时获得 ${formatPostBreak(DC.E1E8)} 反物质。`; },
    checkRequirement: () => Currency.antimatter.exponent >= 100000000 && player.dilation.active,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 162,
    name: "终得圆满",
    description: "一次性购买所有的时间研究。",
    checkRequirement: () => player.timestudy.studies.length >= 58,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 163,
    name: "这其实超简单的！只是有亿点麻烦！",
    get description() {
      return `单次现实中，在游戏内时间 ${formatInt(1)} 秒内，完成所有的永恒挑战 ${formatInt(5)} 次。`;
    },
    checkRequirement: () => EternityChallenges.all.map(ec => ec.completions).min() >= 5 &&
      Time.thisReality.totalSeconds <= 1,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 164,
    name: "无限的无限",
    get description() { return `无限次数达到 ${format(Decimal.NUMBER_MAX_VALUE, 1)}。`; },
    checkRequirement: () => Currency.infinitiesTotal.gte(Decimal.NUMBER_MAX_VALUE),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `获得的无限次数 ${formatX(1024)}。`; },
    effect: 1024
  },
  {
    id: 165,
    name: "完美平衡",
    get description() { return `各个符文等级因子的权重相等时，获得一个等级为 ${formatInt(5000)} 的符文。`; },
    checkRequirement: () => gainedGlyphLevel().actualLevel >= 5000 &&
      ["repl", "dt", "eternities"].every(
        i => player.celestials.effarig.glyphWeights[i] === player.celestials.effarig.glyphWeights.ep),
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    reward: "你可以自动调整符文等级因子的权重。"
  },
  {
    id: 166,
    name: "不错不错。",
    get description() { return `获得一个等级恰好为 ${formatInt(6969)} 的符文。`; },
    checkRequirement: () => gainedGlyphLevel().actualLevel === 6969,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() { return `符文等级 +${formatInt(69)}。`; },
    effect: 69
  },
  {
    id: 167,
    name: "层级先生？抱歉，您不在名单上。",
    get description() { return `达到 ${format(Decimal.NUMBER_MAX_VALUE, 1, 0)} 现实机器。`; },
    checkRequirement: () => Currency.realityMachines.gte(Decimal.NUMBER_MAX_VALUE),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "基于当前现实机器的数量，获得更多的现实机器。",
    effect: () => Math.clampMin(1, Currency.realityMachines.value.log2()),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 168,
    name: "行百里者半五十",
    get description() { return `太阳神中的总记忆等级达到 ${formatInt(50)}。`; },
    checkRequirement: () => Ra.totalPetLevel >= 50,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `你可以多获得 ${formatPercents(0.1)} 的记忆。`; },
    effect: 1.1
  },
  {
    id: 171,
    name: "诸神之悦",
    description: "献祭所有种类可献祭的符文至少一次。",
    checkRequirement: () => Object.values(player.reality.glyphs.sac).every(s => s > 0),
    checkEvent: GAME_EVENT.GLYPHS_CHANGED,
    get reward() { return `符文献祭的效果 ${formatX(2)}。`; },
    effect: 2,
  },
  {
    id: 172,
    name: "现实漫游指南",
    get description() {
      return `没有充能的无限升级、不装备符文、不购买任何三体研究时，一次现实获得${format(Decimal.NUMBER_MAX_VALUE, 1)}现实机器。`;
    },
    checkRequirement: () => MachineHandler.gainedRealityMachines.gte(Decimal.NUMBER_MAX_VALUE) &&
      player.celestials.ra.charged.size === 0 && Glyphs.activeWithoutCompanion.length === 0 &&
      player.requirementChecks.reality.noTriads,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
  },
  {
    id: 173,
    name: "还是一个不存在的成就",
    get description() { return `达到 ${formatPostBreak(DC.D9_99999E999, 5, 0)} 现实机器。`; },
    checkRequirement: () => player.reality.realityMachines.gte(DC.D9_99999E999),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 174,
    name: "这个啊，您不是有两个了吗？",
    description: "获得一个奇点。",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.SINGULARITY_RESET_BEFORE
  },
  {
    id: 175,
    name: "第一个反历史学家",
    get description() { return `所有的炼金资源达到 ${formatInt(Ra.alchemyResourceCap)}。`; },
    checkRequirement: () => AlchemyResources.all.every(x => x.amount >= Ra.alchemyResourceCap),
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER,
    get reward() {
      return `炼金资源“协同”的效果可以大于 ${formatPercents(1)}, 炼金资源“动量”效果的增速 ${formatX(10)}。`;
    },
    effect: 10,
  },
  {
    id: 176,
    name: "妈妈已经数到 3 了",
    description: "进行一次暗物质湮灭",
  },
  {
    id: 177,
    name: "难如登天的一英里",
    description: "所有的奇点里程碑，均解锁至少一次。",
    checkRequirement: () => SingularityMilestones.all.every(x => x.completions > 0),
    checkEvent: GAME_EVENT.SINGULARITY_RESET_AFTER,
  },
  {
    id: 178,
    name: "灭世者",
    get description() { return `获得 ${formatInt(100000)} 个反物质星系。`; },
    checkRequirement: () => player.galaxies >= 100000,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    get reward() { return `星系增强 ${formatPercents(0.01)}。`; },
    effect: 1.01
  },
  {
    id: 181,
    displayId: 666,
    name: "永恒的反物质维度",
    description: "毁灭你的现实。",
    checkRequirement: () => Pelle.isDoomed,
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER,
  },
  {
    id: 182,
    name: "再来一遍",
    description: "重获自动购买所有反物质维度的能力。",
    checkRequirement: () => PelleUpgrade.antimatterDimAutobuyers1.canBeApplied &&
      PelleUpgrade.antimatterDimAutobuyers2.canBeApplied,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 183,
    name: "似曾相识",
    description: "在被毁灭的现实中，完成无限挑战5。",
    checkRequirement: () => Pelle.isDoomed && InfinityChallenge(5).isCompleted,
    checkEvent: GAME_EVENT.INFINITY_CHALLENGE_COMPLETED,
    // Weirdly specific reward? Yes, its V's ST bonus because we forgot to disable it
    // when balancing Pelle and only realised too late.
    get reward() { return `所有的反物质维度 ${formatPow(1.0812403840463596, 0, 3)}`; },
    effect: 1.0812403840463596
  },
  {
    id: 184,
    name: "三振出局！",
    description: "发生三次佩勒冲击。",
    checkRequirement: () => PelleStrikes.eternity.hasStrike,
    checkEvent: GAME_EVENT.PELLE_STRIKE_UNLOCKED
  },
  {
    id: 185,
    name: "八十又七年前",
    description: "发生四次佩勒冲击。",
    checkRequirement: () => PelleStrikes.ECs.hasStrike,
    checkEvent: GAME_EVENT.PELLE_STRIKE_UNLOCKED
  },
  {
    id: 186,
    displayId: 181,
    name: "病态的爱",
    description: `在被毁灭的现实中，购买时间研究 181。`,
  },
  {
    id: 187,
    name: "膨胀时间持有者",
    description: "在被毁灭的现实中，解锁时间膨胀。",
    checkRequirement: () => PelleStrikes.dilation.hasStrike,
    checkEvent: GAME_EVENT.PELLE_STRIKE_UNLOCKED,
    // We forgot to disable a singularity milestone while balancing Pelle; now it's disabled
    // and this upgrade has the same effect as it used to.
    get reward() {
      return `可重复购买的膨胀升级购买数量的加成倍率 ${formatX(1.35, 0, 2)}。`;
    },
    effect: 1.35
  },
  {
    id: 188,
    name: "剧终",
    description: "通关游戏。",
    checkRequirement: () => GameEnd.endState > END_STATE_MARKERS.GAME_END && !GameEnd.removeAdditionalEnd,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
];
