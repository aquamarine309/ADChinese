import { MultiplierTabHelper } from './helper-functions.js'
import { MultiplierTabIcons } from './icons.js'

// See index.js for documentation
export const gamespeed = {
  total: {
    name: '游戏速度',
    displayOverride: () => {
      if (Enslaved.isStoringRealTime) return `设置为 ${format(0)}（存储真实时间）`
      if (EternityChallenge(12).isRunning) return `${formatX(1)}/${formatInt(1000)}（固定）`
      const curr = getGameSpeedupFactor()

      const bh = MultiplierTabHelper.blackHoleSpeeds()
      const currBH = bh.current
      const avgBH = bh.average

      const avgSpeed = Enslaved.isAutoReleasing ? getGameSpeedupForDisplay() : (curr / currBH) * avgBH
      const avgString = `（当前）| ${formatX(avgSpeed, 2, 2)}（平均）`
      return `${formatX(curr, 2, 2)}${curr === avgSpeed ? '' : avgString}`
    },
    multValue: () => getGameSpeedupForDisplay(),
    isActive: () => PlayerProgress.seenAlteredSpeed(),
    dilationEffect: () => (Effarig.isRunning ? Effarig.multDilation : 1),
    isDilated: true,
    overlay: ['Δ', `<i class="fas fa-clock" />`, `<i class="fas fa-circle" />`],
  },
  glyph: {
    name: '装备的符文',
    multValue: () => getAdjustedGlyphEffect('timespeed'),
    powValue: () => getAdjustedGlyphEffect('effarigblackhole'),
    isActive: () => PlayerProgress.realityUnlocked() && !EternityChallenge(12).isRunning,
    icon: MultiplierTabIcons.GENERIC_GLYPH,
  },
  blackHoleCurr: {
    name: '当前黑洞加速',
    multValue: () => MultiplierTabHelper.blackHoleSpeeds().current,
    isActive: () => BlackHole(1).isUnlocked && !BlackHoles.arePaused && !EternityChallenge(12).isRunning,
    icon: MultiplierTabIcons.BLACK_HOLE,
  },
  blackHoleAvg: {
    name: '平均黑洞加速',
    multValue: () => MultiplierTabHelper.blackHoleSpeeds().average,
    isActive: () => BlackHole(1).isUnlocked && !BlackHoles.arePaused && !EternityChallenge(12).isRunning,
    icon: MultiplierTabIcons.BLACK_HOLE,
  },
  achievementMult: {
    name: '30 V成就里程碑 - 成就乘数',
    multValue: () =>
      Math.pow(
        VUnlocks.achievementBH.effectOrDefault(1),
        BlackHoles.list.countWhere((bh) => bh.isUnlocked)
      ),
    isActive: () => !BlackHoles.arePaused && VUnlocks.achievementBH.canBeApplied && !EternityChallenge(12).isRunning,
    icon: MultiplierTabIcons.ACHIEVEMENT,
  },
  pulsing: {
    name: '自动释放存储时间',
    multValue: () => (Enslaved.isAutoReleasing ? Math.max(Enslaved.autoReleaseSpeed / getGameSpeedupFactor(), 1) : getGameSpeedupFactor()),
    isActive: () => Enslaved.canRelease() && Enslaved.isAutoReleasing && !EternityChallenge(12).isRunning,
    icon: MultiplierTabIcons.BH_PULSE,
  },
  singularity: {
    name: '奇点里程碑 - 基于奇点的游戏速度',
    multValue: () => SingularityMilestone.gamespeedFromSingularities.effectOrDefault(1),
    isActive: () => SingularityMilestone.gamespeedFromSingularities.canBeApplied && !EternityChallenge(12).isRunning,
    icon: MultiplierTabIcons.SINGULARITY,
  },
  pelle: {
    name: '佩勒升级 - 可重复的游戏速度',
    multValue: () => PelleUpgrade.timeSpeedMult.effectValue.toNumber(),
    isActive: () => Pelle.isDoomed && !EternityChallenge(12).isRunning,
    icon: MultiplierTabIcons.PELLE,
  },

  ec12: {
    name: '永恒挑战 12',
    multValue: () => 0.001 / getGameSpeedupForDisplay(),
    isActive: () => EternityChallenge(12).isRunning,
    icon: MultiplierTabIcons.CHALLENGE('eternity'),
  },
  chargingBH: {
    name: '黑洞充能',
    // multValue 中的 0 无关紧要；如果此升级不可用，子标签会被 1x 总效果隐藏
    multValue: () => (Ra.unlocks.autoPulseTime.canBeApplied ? 0.01 : 0),
    isActive: () => Enslaved.isStoringGameTime,
    icon: MultiplierTabIcons.BLACK_HOLE,
  },
  invertedBH: {
    name: '反转黑洞',
    multValue: () => player.blackHoleNegative,
    isActive: () => BlackHoles.areNegative,
    icon: MultiplierTabIcons.CHALLENGE('eternity'),
  },
  nerfLaitela: {
    name: '莱特拉的现实',
    powValue: () => Math.clampMax(Time.thisRealityRealTime.totalMinutes / 10, 1),
    isActive: () => Laitela.isRunning,
    icon: MultiplierTabIcons.GENERIC_LAITELA,
  },
}
