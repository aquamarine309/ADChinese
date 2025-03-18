import { DC } from '../../constants.js'

import { MultiplierTabHelper } from './helper-functions.js'
import { MultiplierTabIcons } from './icons.js'

// See index.js for documentation
export const tickspeed = {
  total: {
    name: '总计数频率',
    displayOverride: () => {
      const tickRate = Tickspeed.perSecond
      const activeDims = MultiplierTabHelper.activeDimCount('AD')
      const dimString = MultiplierTabHelper.pluralizeDimensions(activeDims)
      return `${format(tickRate, 2, 2)}/秒作用于${formatInt(activeDims)} ${dimString}
        ➜ ${formatX(tickRate.pow(activeDims), 2, 2)}`
    },
    fakeValue: DC.E100,
    multValue: () => Tickspeed.perSecond.pow(MultiplierTabHelper.activeDimCount('AD')),
    isActive: () => Tickspeed.perSecond.gt(1) && effectiveBaseGalaxies() > 0,
    dilationEffect: () => (Effarig.isRunning ? Effarig.tickDilation : 1),
    overlay: ["<i class='fa-solid fa-clock' />"],
    icon: MultiplierTabIcons.TICKSPEED,
  },
  base: {
    name: '来自成就的基础计数频率',
    displayOverride: () => {
      const val = DC.D1.dividedByEffectsOf(Achievement(36), Achievement(45), Achievement(66), Achievement(83))
      return `${format(val, 2, 2)}/秒`
    },
    multValue: () => new Decimal.pow10(100 * MultiplierTabHelper.decomposeTickspeed().base),
    isActive: () => [36, 45, 66, 83].some((a) => Achievement(a).canBeApplied),
    icon: MultiplierTabIcons.ACHIEVEMENT,
  },
  upgrades: {
    name: '计数频率升级',
    displayOverride: () => `${formatInt(Tickspeed.totalUpgrades)} 总计`,
    multValue: () => new Decimal.pow10(100 * MultiplierTabHelper.decomposeTickspeed().tickspeed),
    isActive: true,
    icon: MultiplierTabIcons.PURCHASE('AD'),
  },
  galaxies: {
    name: '星系',
    displayOverride: () => {
      const ag = player.galaxies + GalaxyGenerator.galaxies
      const rg = Replicanti.galaxies.total
      const tg = player.dilation.totalTachyonGalaxies
      return `${formatInt(ag + rg + tg)} 总计`
    },
    multValue: () => new Decimal.pow10(100 * MultiplierTabHelper.decomposeTickspeed().galaxies),
    isActive: true,
    icon: MultiplierTabIcons.GALAXY,
  },
  pelleTickspeedPow: {
    name: '计数频率膨胀升级',
    powValue: () => DilationUpgrade.tickspeedPower.effectValue,
    isActive: () => DilationUpgrade.tickspeedPower.canBeApplied,
    icon: MultiplierTabIcons.UPGRADE('dilation'),
  },
}

export const tickspeedUpgrades = {
  purchased: {
    name: '已购买的计数频率升级',
    displayOverride: () => (Laitela.continuumActive ? formatFloat(Tickspeed.continuumValue, 2, 2) : formatInt(player.totalTickBought)),
    multValue: () => Decimal.pow10(Laitela.continuumActive ? Tickspeed.continuumValue : player.totalTickBought),
    isActive: () => true,
    icon: MultiplierTabIcons.PURCHASE('AD'),
  },
  free: {
    name: '来自时间维度的计数频率升级',
    displayOverride: () => formatInt(player.totalTickGained),
    multValue: () => Decimal.pow10(player.totalTickGained),
    isActive: () => Currency.timeShards.gt(0),
    icon: MultiplierTabIcons.SPECIFIC_GLYPH('time'),
  },
}
