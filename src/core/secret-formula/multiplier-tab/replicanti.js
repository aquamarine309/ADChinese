import { DC } from '../../constants.js'

import { MultiplierTabIcons } from './icons.js'

// See index.js for documentation
export const replicanti = {
  total: {
    name: '复制器速度',
    multValue: () => totalReplicantiSpeedMult(Replicanti.amount.gt(replicantiCap())),
    isActive: () => PlayerProgress.eternityUnlocked(),
    overlay: ['Ξ'],
  },
  achievement: {
    name: '成就 134',
    // 在 Replicanti 代码中明确为 2，且在 Replicanti 数量检查内
    multValue: 2,
    isActive: () => Achievement(134).canBeApplied && Replicanti.amount.lte(replicantiCap()) && !Pelle.isDoomed,
    icon: MultiplierTabIcons.ACHIEVEMENT,
  },
  timeStudy: {
    name: '时间研究',
    multValue: () => {
      const preReality = Effects.product(TimeStudy(62), TimeStudy(213)) * (TimeStudy(132).isBought ? 1.5 : 1)
      return preReality * (Perk.studyPassive.isBought && TimeStudy(132).isBought ? 2 : 1)
    },
    isActive: () => PlayerProgress.eternityUnlocked() && !Pelle.isDoomed,
    icon: MultiplierTabIcons.TIME_STUDY,
  },
  glyph: {
    name: '符文效果',
    multValue: () => {
      const baseEffect = (Pelle.isDoomed ? DC.D1 : getAdjustedGlyphEffect('replicationspeed')).times(Pelle.specialGlyphEffect.replication)
      const alteredEffect = Math.clampMin(Decimal.log10(Replicanti.amount) * getSecondaryGlyphEffect('replicationdtgain'), 1)
      return GlyphAlteration.isAdded('replication') ? baseEffect.times(alteredEffect) : baseEffect
    },
    isActive: () => PlayerProgress.realityUnlocked() && (!Pelle.isDoomed || Pelle.specialGlyphEffect.replication > 1),
    icon: MultiplierTabIcons.GENERIC_GLYPH,
  },
  amplifierRep: {
    name: '现实升级 - 复制放大器',
    multValue: () => RealityUpgrade(2).effectOrDefault(1),
    isActive: () => PlayerProgress.realityUnlocked() && !Pelle.isDoomed,
    icon: MultiplierTabIcons.UPGRADE('reality'),
  },
  realityUpgrade1: {
    name: '现实升级 - 宇宙重影',
    multValue: () => RealityUpgrade(6).effectOrDefault(1),
    isActive: () => PlayerProgress.realityUnlocked() && !Pelle.isDoomed,
    icon: MultiplierTabIcons.UPGRADE('reality'),
  },
  realityUpgrade2: {
    name: '现实升级 - 快速复现',
    multValue: () => RealityUpgrade(23).effectOrDefault(1),
    isActive: () => PlayerProgress.realityUnlocked() && !Pelle.isDoomed,
    icon: MultiplierTabIcons.UPGRADE('reality'),
  },
  alchemy: {
    name: '炼金资源 - 复制',
    multValue: () => AlchemyResource.replication.effectOrDefault(1),
    isActive: () => Ra.unlocks.unlockGlyphAlchemy.canBeApplied && !Pelle.isDoomed,
    icon: MultiplierTabIcons.ALCHEMY,
  },
  ra: {
    name: '太阳神升级 - 基于 TT 的乘数',
    multValue: () => Ra.unlocks.continuousTTBoost.effects.replicanti.effectOrDefault(1),
    isActive: () => Ra.unlocks.continuousTTBoost.isUnlocked,
    icon: MultiplierTabIcons.GENERIC_RA,
  },
  pelle: {
    name: '佩勒冲击 - 腐败裂隙',
    multValue: () => PelleRifts.decay.effectValue,
    isActive: () => Pelle.isDoomed && PelleRifts.decay.effectValue.gt(1),
    icon: MultiplierTabIcons.PELLE,
  },
  iap: {
    name: '商店标签购买',
    multValue: () => ShopPurchase.replicantiPurchases.currentMult,
    isActive: () => ShopPurchaseData.totalSTD > 0 && ShopPurchase.replicantiPurchases.currentMult > 1,
    icon: MultiplierTabIcons.IAP,
  },
}
