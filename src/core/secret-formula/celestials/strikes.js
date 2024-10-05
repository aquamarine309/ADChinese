import { DC } from "../../constants.js";
import wordShift from "../../word-shift.js";

export const pelleStrikes = {
  infinity: {
    id: 1,
    requirementDescription: "达到无限",
    penaltyDescription: () => `反物质维度效果调整至 ${formatPow(0.5, 1, 1)}`,
    rewardDescription: () => `解锁 ${wordShift.wordCycle(PelleRifts.vacuum.name)} 并重获永久保留的自动无限`,
    rift: () => PelleRifts.vacuum
  },
  powerGalaxies: {
    id: 2,
    requirementDescription: "购买星系升级",
    penaltyDescription: () => `无限维度效果调整至 ${formatPow(0.5, 1, 1)}`,
    rewardDescription: () => `解锁 ${wordShift.wordCycle(PelleRifts.decay.name)}`,
    rift: () => PelleRifts.decay
  },
  eternity: {
    id: 3,
    requirementDescription: "达到永恒",
    penaltyDescription: () => `复制器速度在${format(DC.E2000)}后减缓`,
    rewardDescription: () => `解锁 ${wordShift.wordCycle(PelleRifts.chaos.name)}`,
    rift: () => PelleRifts.chaos
  },
  ECs: {
    id: 4,
    requirementDescription: () => `达到 ${formatInt(115)} 时间之理`,
    penaltyDescription: () => `在永恒挑战中 ${wordShift.wordCycle(PelleRifts.vacuum.name)} 的无限点数倍数加成变为原来的${formatPercents(0.3)}，上限为挑战目标的${formatPercents(0.15)}`,
    rewardDescription: () => `解锁 ${wordShift.wordCycle(PelleRifts.recursion.name)}`,
    rift: () => PelleRifts.recursion
  },
  dilation: {
    id: 5,
    requirementDescription: "膨胀时间",
    penaltyDescription: "时间膨胀永久生效",
    rewardDescription: () => `末日后保留解锁时间膨胀的时间研究，并解锁
      ${wordShift.wordCycle(PelleRifts.paradox.name)}`,
    rift: () => PelleRifts.paradox
  }
};
