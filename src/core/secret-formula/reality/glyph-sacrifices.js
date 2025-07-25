export const glyphSacrifice = {
  "power": {
    id: "power",
    effect: added => {
      if (Pelle.isDisabled("glyphsac")) return 0;
      const sac = player.reality.glyphs.sac.power + (added ?? 0);
      const capped = Math.clampMax(sac, GlyphSacrificeHandler.maxSacrificeForEffects);
      const base = Math.log10(capped + 1) / Math.log10(GlyphSacrificeHandler.maxSacrificeForEffects);
      return Math.floor(750 * Math.pow(base, 1.2));
    },
    description: amount => {
      const sacCap = GlyphSacrificeHandler.maxSacrificeForEffects;
      const nextDistantGalaxy = Math.pow(10, Math.pow((amount + 1) / 750, 1 / 1.2) * Math.log10(sacCap)) - 1;
      const nextGalaxyText = amount < 750
        ? `（下一个需要 ${format(nextDistantGalaxy, 2, 2)}）`
        : "";
      return `遥远星系的价格增长推迟 ${formatInt(amount)} 星系 ${nextGalaxyText}`;
    },
    cap: () => GlyphSacrificeHandler.maxSacrificeForEffects
  },
  "infinity": {
    id: "infinity",
    effect: added => {
      if (Pelle.isDisabled("glyphsac")) return 1;
      const sac = player.reality.glyphs.sac.infinity + (added ?? 0);
      const capped = Math.clampMax(sac, GlyphSacrificeHandler.maxSacrificeForEffects);
      return 1 + Math.log10(1 + Math.pow(capped, 0.2) / 100);
    },
    description: amount => `购买第八无限维度的倍率加成 ${formatX(amount, 2, 2)}`,
    cap: () => GlyphSacrificeHandler.maxSacrificeForEffects
  },
  "time": {
    id: "time",
    effect: added => {
      if (Pelle.isDisabled("glyphsac")) return 1;
      const sac = player.reality.glyphs.sac.time + (added ?? 0);
      const capped = Math.clampMax(sac, GlyphSacrificeHandler.maxSacrificeForEffects);
      return Math.pow(1 + Math.pow(capped, 0.2) / 100, 2);
    },
    description: amount => `购买第八时间维度的倍率加成 ${formatX(amount, 2, 2)}`,
    cap: () => GlyphSacrificeHandler.maxSacrificeForEffects
  },
  "replication": {
    id: "replication",
    effect: added => {
      if (Pelle.isDisabled("glyphsac")) return 0;
      const sac = player.reality.glyphs.sac.replication + (added ?? 0);
      const capped = Math.clampMax(sac, GlyphSacrificeHandler.maxSacrificeForEffects);
      const base = Math.log10(capped + 1) / Math.log10(GlyphSacrificeHandler.maxSacrificeForEffects);
      return Math.floor(1500 * Math.pow(base, 1.2));
    },
    description: amount => {
      const sacCap = GlyphSacrificeHandler.maxSacrificeForEffects;
      const nextDistantGalaxy = Math.pow(10, Math.pow((amount + 1) / 1500, 1 / 1.2) * Math.log10(sacCap)) - 1;
      const nextGalaxyText = amount < 1500
        ? `（下一个需要 ${format(nextDistantGalaxy, 2, 2)}）`
        : "";
      return `复制器星系的价格增长推迟 ${formatInt(amount)} 星系 ${nextGalaxyText}`;
    },
    cap: () => GlyphSacrificeHandler.maxSacrificeForEffects
  },
  "dilation": {
    id: "dilation",
    effect: added => {
      if (Pelle.isDisabled("glyphsac")) return 1;
      const sac = player.reality.glyphs.sac.dilation + (added ?? 0);
      const capped = Math.clampMax(sac, GlyphSacrificeHandler.maxSacrificeForEffects);
      const exponent = 0.32 * Math.pow(Math.log10(capped + 1) /
        Math.log10(GlyphSacrificeHandler.maxSacrificeForEffects), 0.1);
      return Math.pow(Math.clampMin(capped, 1), exponent);
    },
    description: amount => `获得的超光速粒子 ${formatX(amount, 2, 2)}`,
    cap: () => GlyphSacrificeHandler.maxSacrificeForEffects
  },
  "effarig": {
    id: "effarig",
    effect: added => {
      if (Pelle.isDisabled("glyphsac")) return 0;
      const sac = player.reality.glyphs.sac.effarig + (added ?? 0);
      // This doesn't use the GlyphSacrificeHandler cap because it hits its cap (+100%) earlier
      const capped = Math.clampMax(sac, 1e70);
      return 2 * Math.log10(capped / 1e20 + 1);
    },
    description: amount => `符文稀有度额外 +${formatPercents(amount / 100, 2)}`,
    cap: () => 1e70
  },
  "reality": {
    id: "reality",
    effect: added => {
      if (Pelle.isDisabled("glyphsac")) return 0;
      const sac = player.reality.glyphs.sac.reality + (added ?? 0);
      // This cap is only feasibly reached with the imaginary upgrade, but we still want to cap it at a nice number
      return Math.clampMax(1 + Math.sqrt(sac) / 15, 100);
    },
    description: amount => `获得记忆块的数量 ${formatX(amount, 2, 3)}`,
    cap: () => GlyphSacrificeHandler.maxSacrificeForEffects
  }
};
