import { DC } from "../../constants.js";

export const GlyphCombiner = Object.freeze({
  /**
   * @param {number[]} x
   * @returns {number}
   */
  add: x => x.reduce(Number.sumReducer, 0),
  /**
   * @param {number[]} x
   * @returns {number}
   */
  multiply: x => x.reduce(Number.prodReducer, 1),
  /**
   * For exponents, the base value is 1, so when we add two exponents a and b we want to get a + b - 1,
   * so that if a and b are both close to 1 so is their sum. In general, when we add a list x of exponents,
   * we have to add 1 - x.length to the actual sum, so that if all the exponents are close to 1 the result
   * is also close to 1 rather than close to x.length.
   * @param {number[]} x
   * @returns {number}
   */
  addExponents: x => x.reduce(Number.sumReducer, 1 - x.length),
  /**
   * @param {Decimal[]} x
   * @returns {Decimal}
   */
  multiplyDecimal: x => x.reduce(Decimal.prodReducer, DC.D1)
});

export const glyphEffects = {
  timepow: {
    id: "timepow",
    bitmaskIndex: 0,
    isGenerated: true,
    glyphTypes: ["time"],
    singleDesc: "时间维度指数 +{value}",
    totalDesc: "时间维度倍率 ^{value}",
    shortDesc: "时间维度指数 +{value}",
    effect: (level, strength) => 1.01 + Math.pow(level, 0.32) * Math.pow(strength, 0.45) / 75,
    formatEffect: x => format(x, 3, 3),
    formatSingleEffect: x => format(x - 1, 3, 3),
    combine: GlyphCombiner.addExponents,
    enabledInDoomed: true,
  },
  timespeed: {
    id: "timespeed",
    bitmaskIndex: 1,
    isGenerated: true,
    glyphTypes: ["time"],
    singleDesc: "游戏速度 ×{value}",
    totalDesc: "游戏速度 ×{value}",
    genericDesc: "游戏速度倍率",
    shortDesc: "游戏速度 ×{value}",
    effect: (level, strength) => (GlyphAlteration.isEmpowered("time")
      ? 1 + Math.pow(level, 0.35)
      : 1 + Math.pow(level, 0.3) * Math.pow(strength, 0.65) / 20),
    formatEffect: x => format(x, 3, 3),
    combine: GlyphCombiner.multiply,
    alteredColor: () => GlyphAlteration.getEmpowermentColor("time"),
    alterationType: ALTERATION_TYPE.EMPOWER,
    enabledInDoomed: true,
  },
  timeetermult: {
    id: "timeetermult",
    bitmaskIndex: 2,
    isGenerated: true,
    glyphTypes: ["time"],
    singleDesc: "获得 {value} 倍永恒次数",
    totalDesc: "获得 ×{value} 倍永恒次数",
    genericDesc: "永恒次数倍率",
    shortDesc: "永恒次数 ×{value}",
    effect: (level, strength) => Math.pow((strength + 3) * level, 0.9) *
      Math.pow(3, GlyphAlteration.sacrificeBoost("time")),
    formatEffect: x => format(x, 2, 2),
    combine: GlyphCombiner.multiply,
    alteredColor: () => GlyphAlteration.getBoostColor("time"),
    alterationType: ALTERATION_TYPE.BOOST
  },
  timeEP: {
    id: "timeEP",
    bitmaskIndex: 3,
    isGenerated: true,
    glyphTypes: ["time"],
    singleDesc: () => (GlyphAlteration.isAdded("time")
      ? "永恒点数获取量 \n×{value} [且 ^]{value2}"
      : "永恒点数获取量 ×{value}"),
    totalDesc: () => (GlyphAlteration.isAdded("time")
      ? "永恒点数获取量 ×{value} 且 ^{value2}"
      : "永恒点数获取量 ×{value}"),
    genericDesc: () => (GlyphAlteration.isAdded("time")
      ? "永恒点数倍数和指数加成"
      : "永恒点数获取量"),
    shortDesc: () => (GlyphAlteration.isAdded("time")
      ? "永恒点数 ×{value} 且 ^{value2}"
      : "永恒点数 ×{value}"),
    effect: (level, strength) => Math.pow(level * strength, 3) * 100,
    formatEffect: x => format(x, 2, 3),
    combine: GlyphCombiner.multiply,
    conversion: x => 1 + Math.log10(x) / 1000,
    formatSecondaryEffect: x => format(x, 4, 4),
    alteredColor: () => GlyphAlteration.getAdditionColor("time"),
    alterationType: ALTERATION_TYPE.ADDITION
  },
  dilationDT: {
    id: "dilationDT",
    bitmaskIndex: 4,
    isGenerated: true,
    glyphTypes: ["dilation"],
    singleDesc: "获得 ×{value} 倍膨胀时间 ",
    totalDesc: "获得 ×{value} 倍膨胀时间",
    shortDesc: "膨胀时间 ×{value}",
    effect: (level, strength) => (GlyphAlteration.isEmpowered("dilation")
      ? DC.D1_005.pow(level).times(15)
      : Decimal.pow(level * strength, 1.5).times(2)),
    formatEffect: x => format(x, 2, 1),
    combine: GlyphCombiner.multiplyDecimal,
    alteredColor: () => GlyphAlteration.getEmpowermentColor("dilation"),
    alterationType: ALTERATION_TYPE.EMPOWER
  },
  dilationgalaxyThreshold: {
    id: "dilationgalaxyThreshold",
    bitmaskIndex: 5,
    isGenerated: true,
    glyphTypes: ["dilation"],
    singleDesc: "超光速粒子星系阈值 ×{value}",
    genericDesc: "超光速粒子星系价格倍率",
    shortDesc: "超光速粒子星系阈值 ×{value}",
    effect: (level, strength) => 1 - Math.pow(level, 0.17) * Math.pow(strength, 0.35) / 100 -
      GlyphAlteration.sacrificeBoost("dilation") / 50,
    formatEffect: x => format(x, 3, 3),
    alteredColor: () => GlyphAlteration.getBoostColor("dilation"),
    alterationType: ALTERATION_TYPE.BOOST,
    combine: effects => {
      const prod = effects.reduce(Number.prodReducer, 1);
      return prod < 0.4
        ? { value: 0.4 - Math.pow(0.4 - prod, 1.7), capped: true }
        : { value: prod, capped: false };
    },
    enabledInDoomed: true,
  },
  dilationTTgen: {
    // TTgen slowly generates TT, value amount is per second, displayed per hour
    id: "dilationTTgen",
    bitmaskIndex: 6,
    isGenerated: true,
    glyphTypes: ["dilation"],
    singleDesc: () => (GlyphAlteration.isAdded("dilation")
      ? "每小时生成 {value} 时间之理[\n且时间之理生成量] ×{value2}"
      : "每小时生成 {value} 时间之理"),
    totalDesc: () => (GlyphAlteration.isAdded("dilation")
      ? "每小时生成 {value} 时间之理且时间之理生成量 ×{value2}"
      : "每小时生成 {value} 时间之理"),
    genericDesc: () => (GlyphAlteration.isAdded("dilation")
      ? "时间之理生成和倍数"
      : "时间之理生成"),
    shortDesc: () => (GlyphAlteration.isAdded("dilation")
      ? "{value} 时间之理/小时 且 时间之理生成量 ×{value2}"
      : "{value} 时间之理/小时"),
    effect: (level, strength) => Math.pow(level * strength, 0.5) / 10000,
    /** @type {function(number): string} */
    formatEffect: x => format(3600 * x, 2, 2),
    combine: GlyphCombiner.add,
    conversion: x => Math.clampMin(Math.pow(10000 * x, 1.6), 1),
    formatSecondaryEffect: x => format(x, 2, 2),
    alteredColor: () => GlyphAlteration.getAdditionColor("dilation"),
    alterationType: ALTERATION_TYPE.ADDITION
  },
  dilationpow: {
    id: "dilationpow",
    bitmaskIndex: 7,
    isGenerated: true,
    glyphTypes: ["dilation"],
    singleDesc: "时间膨胀时反物质维度指数 +{value}",
    totalDesc: "时间膨胀时反物质维度倍率 ^{value}",
    genericDesc: "时间膨胀时反物质维度 ^x",
    shortDesc: "膨胀时反物质维度指数 +{value}",
    effect: (level, strength) => 1.1 + Math.pow(level, 0.7) * Math.pow(strength, 0.7) / 25,
    formatEffect: x => format(x, 2, 2),
    formatSingleEffect: x => format(x - 1, 2, 2),
    combine: GlyphCombiner.addExponents,
    enabledInDoomed: true,
  },
  replicationspeed: {
    id: "replicationspeed",
    bitmaskIndex: 8,
    isGenerated: true,
    glyphTypes: ["replication"],
    singleDesc: "复制速度 ×{value}",
    totalDesc: "复制速度 ×{value}",
    genericDesc: "复制速度",
    shortDesc: "复制速度 ×{value}",
    effect: (level, strength) => (GlyphAlteration.isEmpowered("replication")
      ? DC.D1_007.pow(level).times(10)
      : Decimal.times(level, strength).times(3)),
    formatEffect: x => format(x, 2, 1),
    combine: GlyphCombiner.multiplyDecimal,
    alteredColor: () => GlyphAlteration.getEmpowermentColor("replication"),
    alterationType: ALTERATION_TYPE.EMPOWER
  },
  replicationpow: {
    id: "replicationpow",
    bitmaskIndex: 9,
    isGenerated: true,
    glyphTypes: ["replication"],
    singleDesc: "复制器效果指数 +{value}",
    totalDesc: "复制器效果 ^{value}",
    shortDesc: "复制器效果指数 +{value}",
    effect: (level, strength) => 1.1 + Math.pow(level, 0.5) * strength / 25 +
      GlyphAlteration.sacrificeBoost("replication") * 3,
    formatEffect: x => format(x, 2, 2),
    formatSingleEffect: x => format(x - 1, 2, 2),
    combine: GlyphCombiner.addExponents,
    alteredColor: () => GlyphAlteration.getBoostColor("replication"),
    alterationType: ALTERATION_TYPE.BOOST,
    enabledInDoomed: true,
  },
  replicationdtgain: {
    id: "replicationdtgain",
    bitmaskIndex: 10,
    isGenerated: true,
    glyphTypes: ["replication"],
    singleDesc: () => (GlyphAlteration.isAdded("replication")
      ? `每 ${format(DC.E10000)} 复制器，\n膨胀时间获取速度 [和复制速度] +{value}`
      : `每 ${format(DC.E10000)} 复制器，\n膨胀时间获取速度 +{value}`),
    totalDesc: () => (GlyphAlteration.isAdded("replication")
      ? `每 ${format(DC.E10000)} 复制器，膨胀时间获取速度 [和复制速度] +{value}`
      : `每 ${format(DC.E10000)} 复制器，膨胀时间获取速度 +{value}`),
    genericDesc: () => (GlyphAlteration.isAdded("replication")
      ? "复制器提供的膨胀时间和复制速度加成"
      : "复制器提供膨胀时间加成"),
    shortDesc: () => (GlyphAlteration.isAdded("replication")
      ? `每 ${format(DC.E10000)} 复制器，膨胀时间获取速度 [和复制速度] +{value}`
      : `每 ${format(DC.E10000)} 复制器，膨胀时间获取速度 +{value}`),
    effect: (level, strength) => 0.0003 * Math.pow(level, 0.3) * Math.pow(strength, 0.65),
    formatEffect: x => format(10000 * x, 2, 2),
    formatSingleEffect: x => format(10000 * x, 2, 2),
    // It's bad to stack this one additively (N glyphs acts as a DT mult of N) or multiplicatively (the raw number is
    // less than 1), so instead we do a multiplicative stacking relative to the "base" effect of a level 1, 0% glyph.
    // We also introduce a 3x mult per glyph after the first, so that stacking level 1, 0% glyphs still has an effect.
    // This is still just a flat DT mult when stacking multiple glyphs, but at least it's bigger than 2 or 3.
    combine: effects => ({
      value: effects.length === 0 ? 0 : effects.reduce(Number.prodReducer, Math.pow(0.0001, 1 - effects.length)),
      capped: false
    }),
    conversion: x => x,
    formatSecondaryEffect: x => format(x, 2, 3),
    formatSingleSecondaryEffect: x => format(x, 5, 5),
    alteredColor: () => GlyphAlteration.getAdditionColor("replication"),
    alterationType: ALTERATION_TYPE.ADDITION,
  },
  replicationglyphlevel: {
    id: "replicationglyphlevel",
    bitmaskIndex: 11,
    isGenerated: true,
    glyphTypes: ["replication"],
    singleDesc: () => `符文等级因子中复制器的指数：\n^${format(0.4, 1, 1)} ➜ ^(${format(0.4, 1, 1)} + {value})`,
    totalDesc: () => `符文等级因子中复制器的指数：^${format(0.4, 1, 1)} ➜ ^(${format(0.4, 1, 1)} + {value})`,
    genericDesc: "符文等级因子中复制器的指数",
    shortDesc: "符文等级因子中复制器的指数 +{value}",
    effect: (level, strength) => Math.pow(Math.pow(level, 0.25) * Math.pow(strength, 0.4), 0.5) / 50,
    formatEffect: x => format(x, 3, 3),
    combine: effects => {
      let sum = effects.reduce(Number.sumReducer, 0);
      if (effects.length > 2) sum *= 6 / (effects.length + 4);
      return sum > 0.1
        ? { value: 0.1 + 0.2 * (sum - 0.1), capped: true }
        : { value: sum, capped: effects.length > 2 };
    },
    enabledInDoomed: true,
  },
  infinitypow: {
    id: "infinitypow",
    bitmaskIndex: 12,
    isGenerated: true,
    glyphTypes: ["infinity"],
    singleDesc: "无限维度指数 +{value}",
    totalDesc: "无限维度倍率 ^{value}",
    shortDesc: "无限维度指数 +{value}",
    effect: (level, strength) => 1.007 + Math.pow(level, 0.21) * Math.pow(strength, 0.4) / 75 +
      GlyphAlteration.sacrificeBoost("infinity") / 50,
    formatEffect: x => format(x, 3, 3),
    formatSingleEffect: x => format(x - 1, 3, 3),
    combine: GlyphCombiner.addExponents,
    alteredColor: () => GlyphAlteration.getBoostColor("infinity"),
    alterationType: ALTERATION_TYPE.BOOST,
    enabledInDoomed: true,
  },
  infinityrate: {
    id: "infinityrate",
    bitmaskIndex: 13,
    isGenerated: true,
    glyphTypes: ["infinity"],
    singleDesc: () => `无限之力加成效果：\n^${formatInt(7)} ➜ ^(${formatInt(7)} + {value})`,
    totalDesc: () => `无限之力加成效果：^${formatInt(7)} ➜ ^(${formatInt(7)} + {value})`,
    genericDesc: "无限之力加成效果",
    shortDesc: "无限之力加成效果 +{value}",
    effect: (level, strength) => Math.pow(level, 0.2) * Math.pow(strength, 0.4) * 0.04,
    formatEffect: x => format(x, 2, 2),
    combine: GlyphCombiner.add,
    enabledInDoomed: true,
  },
  infinityIP: {
    id: "infinityIP",
    bitmaskIndex: 14,
    isGenerated: true,
    glyphTypes: ["infinity"],
    singleDesc: () => (GlyphAlteration.isAdded("infinity")
      ? "无限点数获取量 \n×{value} [且 ^]{value2}"
      : "无限点数获取量 ×{value}"),
    totalDesc: () => (GlyphAlteration.isAdded("infinity")
      ? "无限点数获取量 ×{value} 且 ^{value2}"
      : "无限点数获取量 ×{value}"),
    genericDesc: () => (GlyphAlteration.isAdded("infinity")
      ? "无限点数倍数和指数加成"
      : "无限点数获取量加成"),
    shortDesc: () => (GlyphAlteration.isAdded("infinity")
      ? "无限点数 ×{value} 且 ^{value2}"
      : "无限点数 ×{value}"),
    effect: (level, strength) => Math.pow(level * (strength + 1), 6) * 10000,
    formatEffect: x => format(x, 2, 3),
    combine: GlyphCombiner.multiply,
    // eslint-disable-next-line no-negated-condition
    softcap: value => ((Effarig.eternityCap !== undefined) ? Math.min(value, Effarig.eternityCap.toNumber()) : value),
    conversion: x => 1 + Math.log10(x) / 1800,
    formatSecondaryEffect: x => format(x, 4, 4),
    alteredColor: () => GlyphAlteration.getAdditionColor("infinity"),
    alterationType: ALTERATION_TYPE.ADDITION
  },
  infinityinfmult: {
    id: "infinityinfmult",
    bitmaskIndex: 15,
    isGenerated: true,
    glyphTypes: ["infinity"],
    singleDesc: "获得 {value} 倍无限次数",
    totalDesc: "获得 {value} 倍无限次数",
    genericDesc: "无限次数倍率",
    shortDesc: "无限次数 ×{value}",
    effect: (level, strength) => (GlyphAlteration.isEmpowered("infinity")
      ? DC.D1_02.pow(level)
      : Decimal.pow(level * strength, 1.5).times(2)),
    formatEffect: x => format(x, 2, 1),
    combine: GlyphCombiner.multiplyDecimal,
    alteredColor: () => GlyphAlteration.getEmpowermentColor("infinity"),
    alterationType: ALTERATION_TYPE.EMPOWER
  },
  powerpow: {
    id: "powerpow",
    bitmaskIndex: 16,
    isGenerated: true,
    glyphTypes: ["power"],
    singleDesc: () => (GlyphAlteration.isAdded("power")
      ? "反物质维度指数 +{value}\n[反物质星系价格 ×]{value2}"
      : "反物质维度指数 +{value}"),
    totalDesc: () => (GlyphAlteration.isAdded("power")
      ? "反物质维度倍率 ^{value} 且反物质星系价格 ×{value2}"
      : "反物质维度倍率 ^{value}"),
    genericDesc: () => (GlyphAlteration.isAdded("power")
      ? "反物质维度倍率 ^x 和反物质星系价格倍率"
      : "反物质维度倍率 ^x"),
    shortDesc: () => (GlyphAlteration.isAdded("power")
      ? "反物质维度指数 +{value} 且反物质星系价格 ×{value2}"
      : "反物质维度指数 +{value}"),
    effect: (level, strength) => 1.015 + Math.pow(level, 0.2) * Math.pow(strength, 0.4) / 75,
    formatEffect: x => format(x, 3, 3),
    formatSingleEffect: x => format(x - 1, 3, 3),
    combine: GlyphCombiner.addExponents,
    conversion: x => 2 / (x + 1),
    formatSecondaryEffect: x => format(x, 3, 3),
    alteredColor: () => GlyphAlteration.getAdditionColor("power"),
    alterationType: ALTERATION_TYPE.ADDITION,
    enabledInDoomed: true,
  },
  powermult: {
    id: "powermult",
    bitmaskIndex: 17,
    isGenerated: true,
    glyphTypes: ["power"],
    singleDesc: "反物质维度倍率 ×{value}",
    shortDesc: "反物质维度倍率 ×{value}",
    effect: (level, strength) => (GlyphAlteration.isEmpowered("power")
      ? DC.D11111.pow(level * 220)
      : Decimal.pow(level * strength * 10, level * strength * 10)),
    formatEffect: x => formatPostBreak(x, 2, 0),
    combine: GlyphCombiner.multiplyDecimal,
    alteredColor: () => GlyphAlteration.getEmpowermentColor("power"),
    alterationType: ALTERATION_TYPE.EMPOWER,
    enabledInDoomed: true,
  },
  powerdimboost: {
    id: "powerdimboost",
    bitmaskIndex: 18,
    isGenerated: true,
    glyphTypes: ["power"],
    singleDesc: "维度提升倍率 ×{value}",
    genericDesc: "维度提升倍率",
    shortDesc: "维度提升倍率 ×{value}",
    effect: (level, strength) => Math.pow(level * strength, 0.5) *
      Math.pow(1 + GlyphAlteration.sacrificeBoost("power"), 3),
    formatEffect: x => format(x, 2, 2),
    combine: GlyphCombiner.multiply,
    alteredColor: () => GlyphAlteration.getBoostColor("power"),
    alterationType: ALTERATION_TYPE.BOOST,
    enabledInDoomed: true,
  },
  powerbuy10: {
    id: "powerbuy10",
    bitmaskIndex: 19,
    isGenerated: true,
    glyphTypes: ["power"],
    singleDesc: () => `购买 ${formatInt(10)} 个反物质维度的倍率 {value}`,
    totalDesc: () => `购买 ${formatInt(10)} 个反物质维度的倍率 ×{value}`,
    genericDesc: () => `增加购买 ${formatInt(10)} 个反物质维度的加成`,
    shortDesc: () => `购买 ${formatInt(10)} 个反物质维度的倍率 ×{value}`,
    effect: (level, strength) => 1 + level * strength / 12,
    formatEffect: x => format(x, 2, 2),
    combine: GlyphCombiner.addExponents,
    enabledInDoomed: true,
  },
  effarigrm: {
    id: "effarigrm",
    bitmaskIndex: 20,
    isGenerated: true,
    glyphTypes: ["effarig"],
    singleDesc: "现实机器获取量 ×{value}",
    genericDesc: "现实机器获取量",
    shortDesc: "现实机器 ×{value}",
    effect: (level, strength) => (GlyphAlteration.isEmpowered("effarig")
      ? Math.pow(level, 1.5)
      : Math.pow(level, 0.6) * strength),
    formatEffect: x => format(x, 2, 2),
    combine: GlyphCombiner.multiply,
    alteredColor: () => GlyphAlteration.getEmpowermentColor("effarig"),
    alterationType: ALTERATION_TYPE.EMPOWER
  },
  effarigglyph: {
    id: "effarigglyph",
    bitmaskIndex: 21,
    isGenerated: true,
    glyphTypes: ["effarig"],
    singleDesc: "符文不稳定性的起始等级 +{value}",
    genericDesc: "符文不稳定性推迟出现",
    shortDesc: "符文不稳定性的起始等级 +{value}",
    effect: (level, strength) => Math.floor(10 * Math.pow(level * strength, 0.5)),
    formatEffect: x => formatInt(x),
    combine: GlyphCombiner.add,
  },
  effarigblackhole: {
    id: "effarigblackhole",
    bitmaskIndex: 22,
    isGenerated: true,
    glyphTypes: ["effarig"],
    singleDesc: "游戏速度指数 +{value}",
    totalDesc: "游戏速度 ^{value}",
    genericDesc: "游戏速度 ^x",
    shortDesc: "游戏速度指数 +{value}",
    effect: (level, strength) => 1 + Math.pow(level, 0.25) * Math.pow(strength, 0.4) / 75,
    formatEffect: x => format(x, 3, 3),
    formatSingleEffect: x => format(x - 1, 3, 3),
    combine: GlyphCombiner.addExponents,
  },
  effarigachievement: {
    id: "effarigachievement",
    bitmaskIndex: 23,
    isGenerated: true,
    glyphTypes: ["effarig"],
    singleDesc: "成就加成的指数 +{value}",
    totalDesc: "成就加成 ^{value}",
    genericDesc: "成就加成 ^x",
    shortDesc: "成就加成的指数 +{value}",
    effect: (level, strength) => 1 + Math.pow(level, 0.4) * Math.pow(strength, 0.6) / 60 +
      GlyphAlteration.sacrificeBoost("effarig") / 10,
    formatEffect: x => format(x, 3, 3),
    formatSingleEffect: x => format(x - 1, 3, 3),
    combine: GlyphCombiner.addExponents,
    alteredColor: () => GlyphAlteration.getBoostColor("effarig"),
    alterationType: ALTERATION_TYPE.BOOST
  },
  effarigforgotten: {
    id: "effarigforgotten",
    bitmaskIndex: 24,
    isGenerated: true,
    glyphTypes: ["effarig"],
    singleDesc: () => (GlyphAlteration.isAdded("effarig")
      ? `购买 ${formatInt(10)} 个维度的倍率 ^{value} [且\n维度提升倍率 ^]{value2}`
      : `购买 ${formatInt(10)}个反物质维度的加成^{value}`),
    totalDesc: () => (GlyphAlteration.isAdded("effarig")
      ? `购买 ${formatInt(10)} 个维度的倍率 ^{value} 且维度提升倍率 ^{value2}`
      : `购买 ${formatInt(10)} 个反物质维度的倍率 ^{value}`),
    genericDesc: () => (GlyphAlteration.isAdded("effarig")
      ? `购买 ${formatInt(10)} 个维度和维度提升倍率 ^x`
      : `“买 ${formatInt(10)} 个”的倍率 ^x`),
    shortDesc: () => (GlyphAlteration.isAdded("effarig")
      ? `购买 ${formatInt(10)} 个维度的倍率^{value}，维度提升倍率^{value2}`
      : `购买 ${formatInt(10)} 个维度的倍率 ^{value}`),
    effect: (level, strength) => 1 + 2 * Math.pow(level, 0.25) * Math.pow(strength, 0.4),
    formatEffect: x => format(x, 2, 2),
    combine: GlyphCombiner.multiply,
    conversion: x => Math.pow(x, 0.4),
    formatSecondaryEffect: x => format(x, 2, 2),
    alteredColor: () => GlyphAlteration.getAdditionColor("effarig"),
    alterationType: ALTERATION_TYPE.ADDITION
  },
  effarigdimensions: {
    id: "effarigdimensions",
    bitmaskIndex: 25,
    isGenerated: true,
    glyphTypes: ["effarig"],
    singleDesc: "所有维度指数 +{value}",
    totalDesc: "所有维度 ^{value}",
    genericDesc: "所有维度 ^x",
    shortDesc: "所有维度指数 +{value}",
    effect: (level, strength) => 1 + Math.pow(level, 0.25) * Math.pow(strength, 0.4) / 500,
    formatEffect: x => format(x, 3, 3),
    formatSingleEffect: x => format(x - 1, 3, 3),
    combine: GlyphCombiner.addExponents,
  },
  effarigantimatter: {
    id: "effarigantimatter",
    bitmaskIndex: 26,
    isGenerated: true,
    glyphTypes: ["effarig"],
    singleDesc: () => `反物质产量： ${formatInt(10)}^x ➜ ${formatInt(10)}^(x^{value})`,
    genericDesc: "反物质产量指数",
    shortDesc: "反物质产量指数 ^{value}",
    effect: (level, strength) => 1 + Math.pow(level, 0.25) * Math.pow(strength, 0.4) / 5000,
    formatEffect: x => format(x, 4, 4),
    combine: GlyphCombiner.multiply,
  },
  timeshardpow: {
    id: "timeshardpow",
    bitmaskIndex: 27,
    isGenerated: true,
    // This gets explicitly added to time glyphs elsewhere (once unlocked)
    glyphTypes: [],
    singleDesc: "时间碎片指数 +{value}",
    totalDesc: "时间碎片获取 ^{value}",
    genericDesc: "时间碎片 ^x",
    shortDesc: "时间碎片指数 +{value}",
    effect: (level, strength) => 1 + (strength / 3.5) * Math.pow(level, 0.35) / 400,
    formatEffect: x => format(x, 3, 3),
    formatSingleEffect: x => format(x - 1, 3, 3),
    combine: GlyphCombiner.addExponents,
    enabledInDoomed: true,
  },
  cursedgalaxies: {
    id: "cursedgalaxies",
    bitmaskIndex: 0,
    isGenerated: false,
    glyphTypes: ["cursed"],
    singleDesc: `所有星系强度 -{value}`,
    totalDesc: "所有星系削弱 {value}",
    shortDesc: "星系削弱 {value}",
    // Multiplies by 0.768 per glyph
    effect: level => Math.pow(level, -0.03),
    formatEffect: x => formatPercents(1 - x, 2),
    combine: GlyphCombiner.multiply,
  },
  curseddimensions: {
    id: "curseddimensions",
    bitmaskIndex: 1,
    isGenerated: false,
    glyphTypes: ["cursed"],
    singleDesc: "所有维度倍率 ^{value}",
    shortDesc: "所有维度 ^{value}",
    // Multiplies by 0.734 per glyph
    effect: level => Math.pow(level, -0.035),
    formatEffect: x => format(x, 3, 3),
    combine: GlyphCombiner.multiply,
  },
  cursedtickspeed: {
    id: "cursedtickspeed",
    bitmaskIndex: 2,
    isGenerated: false,
    glyphTypes: ["cursed"],
    singleDesc: "时间维度提供的计数频率升级阈值乘以 {value}",
    totalDesc: "时间维度提供的计数频率升级阈值增加 {value}",
    shortDesc: "时间维度提供的计数频率升级阈值增加 {value}",
    // Additive 3.82 per glyph
    effect: level => Math.clampMin(Math.log10(level), 1),
    formatEffect: x => format(x, 3, 3),
    combine: GlyphCombiner.add,
  },
  cursedEP: {
    id: "cursedEP",
    bitmaskIndex: 3,
    isGenerated: false,
    glyphTypes: ["cursed"],
    singleDesc: "永恒点数除以 {value}",
    totalDesc: "永恒点数除以 {value}",
    shortDesc: "永恒点数除以 {value}",
    // Divides e666.6 per glyph
    effect: level => Decimal.pow10(-level / 10),
    formatEffect: x => format(x.reciprocal()),
    combine: GlyphCombiner.multiplyDecimal,
  },
  realityglyphlevel: {
    id: "realityglyphlevel",
    bitmaskIndex: 4,
    isGenerated: false,
    glyphTypes: ["reality"],
    singleDesc: "已装备的基础符文等级增加 {value}",
    totalDesc: "已装备的基础符文等级 +{value}",
    shortDesc: "基础符文等级 +{value}",
    effect: level => Math.floor(Math.sqrt(level * 90)),
    formatEffect: x => formatInt(x),
    combine: GlyphCombiner.add,
  },
  realitygalaxies: {
    id: "realitygalaxies",
    bitmaskIndex: 5,
    isGenerated: false,
    glyphTypes: ["reality"],
    singleDesc: "所有星系增强 {value}",
    totalDesc: "所有星系强度 +{value}",
    shortDesc: "星系增强 {value}",
    effect: level => 1 + Math.pow(level / 100000, 0.5),
    formatEffect: x => formatPercents(x - 1, 2),
    combine: GlyphCombiner.multiply,
  },
  realityrow1pow: {
    id: "realityrow1pow",
    bitmaskIndex: 6,
    isGenerated: false,
    glyphTypes: ["reality"],
    singleDesc: "现实升级中“放大器”的倍率 ^{value}",
    totalDesc: "现实升级中“放大器”的倍率 ^{value}",
    shortDesc: "现实升级中“放大器”的倍率 ^{value}",
    effect: level => 1 + level / 125000,
    formatEffect: x => format(x, 3, 3),
    combine: GlyphCombiner.addExponents,
  },
  realityDTglyph: {
    id: "realityDTglyph",
    bitmaskIndex: 7,
    isGenerated: false,
    glyphTypes: ["reality"],
    singleDesc: () => `符文等级因子中膨胀时间的指数：\n^${format(1.3, 1, 1)} ➜ ^(${format(1.3, 1, 1)} + {value})`,
    totalDesc: () => `符文等级因子中膨胀时间的指数：^${format(1.3, 1, 1)} ➜ ^(${format(1.3, 1, 1)} + {value})`,
    genericDesc: "符文等级因子中膨胀时间的指数",
    shortDesc: "符文等级因子中膨胀时间的指数 +{value}",
    // You can only get this effect on level 25000 reality glyphs anyway, might as well make it look nice
    effect: () => 0.1,
    formatEffect: x => format(x, 2, 2),
    combine: GlyphCombiner.add,
  },
  companiondescription: {
    id: "companiondescription",
    bitmaskIndex: 8,
    isGenerated: false,
    glyphTypes: ["companion"],
    singleDesc: "它没有任何效果，只是在那里对你微笑，在你的梦中呢喃，并让所有对你不利者灭亡。这独一无二的符文将永远不会离开你。",
    totalDesc: "+{value} 幸福度",
    shortDesc: "不想伤害你",
    effect: () => {
      if (Enslaved.isRunning) return 0;
      const cursedCount = Glyphs.active.countWhere(g => g?.type === "cursed");
      if (cursedCount > 0) return Math.pow(0.2 + 0.2 * Math.random(), cursedCount);
      return 0.4 + 0.6 * Math.random();
    },
    formatEffect: x => formatPercents(x, 2, 2),
    combine: GlyphCombiner.add,
    enabledInDoomed: true,
  },
  companionEP: {
    id: "companionEP",
    bitmaskIndex: 9,
    isGenerated: false,
    glyphTypes: ["companion"],
    singleDesc: "感谢你对游戏的奉献！你在第一次现实中获得了 {value} 永恒点数。",
    shortDesc: "它非常、非常爱你",
    totalDesc: () => ((Enslaved.isRunning || Glyphs.active.countWhere(g => g?.type === "cursed")) ? "帮帮我" : "好耶！"),
    // The EP value for this is entirely encoded in rarity, but level needs to be present to
    // make sure the proper parameter is being used. The actual glyph level shouldn't do anything.
    // eslint-disable-next-line no-unused-vars
    effect: (level, strength) => Decimal.pow10(1e6 * strengthToRarity(strength)),
    formatEffect: x => formatPostBreak(x, 2),
    combine: GlyphCombiner.multiplyDecimal,
    enabledInDoomed: true,
  }
};
