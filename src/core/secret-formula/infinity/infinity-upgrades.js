import { DC } from "../../constants.js";

function dimInfinityMult() {
  return Currency.infinitiesTotal.value.times(0.2).plus(1);
}
function chargedDimInfinityMult() {
  return 1 + Math.log10(Math.max(1, Currency.infinitiesTotal.value.pLog10())) * Math.sqrt(Ra.pets.teresa.level) / 150;
}

export const infinityUpgrades = {
  totalTimeMult: {
    id: "timeMult",
    cost: 1,
    description: "反物质维度获得基于游玩时间的倍数加成",
    effect: () => Math.pow(Time.totalTimePlayed.totalMinutes / 2, 0.15),
    formatEffect: value => formatX(value, 2, 2),
    charged: {
      description: "反物质维度获得基于总游戏时间和特蕾莎等级的指数加成",
      effect: () => 1 +
        Math.log10(Math.log10(Time.totalTimePlayed.totalMilliseconds)) *
        Math.pow(Ra.pets.teresa.level, 0.5) / 150,
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  dim18mult: {
    id: "18Mult",
    cost: 1,
    checkRequirement: () => InfinityUpgrade.totalTimeMult.isBought,
    description: "第一和第八反物质维度获得基于无限次数的倍数加成",
    effect: () => dimInfinityMult(),
    formatEffect: value => formatX(value, 1, 1),
    charged: {
      description: "第一和第八反物质维度获得基于无限次数和特蕾莎等级的指数加成",
      effect: () => chargedDimInfinityMult(),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  dim27mult: {
    id: "27Mult",
    cost: 1,
    checkRequirement: () => InfinityUpgrade.buy10Mult.isBought,
    description: "第二和第七反物质维度获得基于无限次数的倍数加成",
    effect: () => dimInfinityMult(),
    formatEffect: value => formatX(value, 1, 1),
    charged: {
      description: "第二和第七反物质维度获得基于无限次数和特蕾莎等级的指数加成",
      effect: () => chargedDimInfinityMult(),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  dim36mult: {
    id: "36Mult",
    cost: 1,
    checkRequirement: () => InfinityUpgrade.dim18mult.isBought,
    description: "第三和第六反物质维度获得基于无限次数的倍数加成",
    effect: () => dimInfinityMult(),
    formatEffect: value => formatX(value, 1, 1),
    charged: {
      description: "第三和第六反物质维度获得基于无限次数和特蕾莎等级的指数加成",
      effect: () => chargedDimInfinityMult(),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  dim45mult: {
    id: "45Mult",
    cost: 1,
    checkRequirement: () => InfinityUpgrade.dim27mult.isBought,
    description: "第四和第五反物质维度获得基于无限次数的倍数加成",
    effect: () => dimInfinityMult(),
    formatEffect: value => formatX(value, 1, 1),
    charged: {
      description: "第四和第五反物质维度获得基于无限次数和特蕾莎等级的指数加成",
      effect: () => chargedDimInfinityMult(),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  resetBoost: {
    id: "resetBoost",
    cost: 1,
    checkRequirement: () => InfinityUpgrade.dim36mult.isBought,
    description: () =>
      `维度提升和反物质星系对维度的需求减少 ${formatInt(9)}`,
    effect: 9,
    charged: {
      description: () => "基于特蕾莎等级降低维度提升的需求",
      effect: () => 1 / (1 + Math.sqrt(Ra.pets.teresa.level) / 10),
      formatEffect: value => formatX(value, 4, 4)
    }
  },
  buy10Mult: {
    id: "dimMult",
    cost: 1,
    description: () => `增加购买${formatInt(10)}个反物质维度的倍数加成。`,
    effect: () => 1.1,
    formatEffect: () => `${formatX(2, 0, 1)} ➜ ${formatX(2.2, 0, 1)}`,
    charged: {
      description: () => `每买${formatInt(10)}个反物质维度的倍数基于特蕾莎等级获得指数加成`,
      effect: () => 1 + Ra.pets.teresa.level / 200,
      formatEffect: value => formatPow(value, 3, 3)
    }
  },
  galaxyBoost: {
    id: "galaxyBoost",
    cost: 2,
    checkRequirement: () => InfinityUpgrade.dim45mult.isBought,
    description: "反物质星系的效果加倍",
    effect: 2,
    charged: {
      description: "所有星系基于特蕾莎等级获得加成",
      effect: () => 2 + Math.sqrt(Ra.pets.teresa.level) / 100,
      formatEffect: value => `+${formatPercents(value - 1)}`
    }
  },
  thisInfinityTimeMult: {
    id: "timeMult2",
    cost: 3,
    description: "反物质维度获得基于当前无限所花费的时间的倍数加成",
    effect: () => Decimal.max(Math.pow(Time.thisInfinity.totalMinutes / 4, 0.25), 1),
    formatEffect: value => formatX(value, 2, 2),
    charged: {
      description:
        "反物质维度获得基于当前无限所花费的时间和特蕾莎等级的指数加成",
      effect: () => 1 +
        Math.log10(Math.log10(Time.thisInfinity.totalMilliseconds + 100)) *
        Math.sqrt(Ra.pets.teresa.level) / 150,
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  unspentIPMult: {
    id: "unspentBonus",
    cost: 5,
    checkRequirement: () => InfinityUpgrade.thisInfinityTimeMult.isBought,
    description: "第一反物质维度获得基于未花费的无限点数的倍数加成",
    effect: () => Currency.infinityPoints.value.dividedBy(2).pow(1.5).plus(1),
    formatEffect: value => formatX(value, 2, 2),
    charged: {
      description: "基于未使用的无限点数获得第一个反物质维度倍数，然后由特蕾莎等级提供指数加成",
      effect: () => Currency.infinityPoints.value.dividedBy(2).pow(Math.sqrt(Ra.pets.teresa.level) * 1.5).plus(1),
      formatEffect: value => formatX(value, 2, 2)
    }
  },
  dimboostMult: {
    id: "resetMult",
    cost: 7,
    checkRequirement: () => InfinityUpgrade.unspentIPMult.isBought,
    description: "增加维度提升的倍数加成",
    effect: () => 2.5,
    formatEffect: () => `${formatX(2, 0, 1)} ➜ ${formatX(2.5, 0, 1)}`,
    charged: {
      description: "维度提升倍率获得基于特蕾莎等级的指数加成",
      effect: () => 1 + Ra.pets.teresa.level / 200,
      formatEffect: value => formatPow(value, 3, 3)
    }
  },
  ipGen: {
    id: "passiveGen",
    cost: 10,
    checkRequirement: () => InfinityUpgrade.dimboostMult.isBought,
    description: () => `依据你最快一次无限用时的 ${formatInt(10)} 分之一的速度自动生成无限点数`,
    // Cutting corners: this is not actual effect, but it is totalIPMult that is displyed on upgrade
    effect: () => (Teresa.isRunning || V.isRunning || Pelle.isDoomed ? DC.D0 : GameCache.totalIPMult.value),
    formatEffect: value => {
      if (Teresa.isRunning || V.isRunning) return "在本次现实中被禁用";
      if (Pelle.isDoomed) return "已禁用";
      if (player.records.bestInfinity.time >= 999999999999) return `${format(value, 2)} /无穷年`;
      return `${format(value, 2)} / ${Time.bestInfinity.times(10).toStringShort()}`;
    },
    charged: {
      description: () =>
        `基于即将获得的现实机器，每秒获得一定比例的现实机器，并随特蕾莎等级增加`,
      effect: () => Math.pow(Ra.pets.teresa.level, 2) *
        Ra.unlocks.continuousTTBoost.effects.autoPrestige.effectOrDefault(1),
      formatEffect: value => formatX(value, 2, 1)
    }
  },
  skipReset1: {
    id: "skipReset1",
    cost: 20,
    description: () =>
      `每次重置后开始于 ${formatInt(1)} 个维度提升，并自动解锁第五反物质维度`,
  },
  skipReset2: {
    id: "skipReset2",
    cost: 40,
    checkRequirement: () => InfinityUpgrade.skipReset1.isBought,
    description: () =>
      `每次重置后开始于 ${formatInt(2)} 个维度提升，并自动解锁第六反物质维度`,
  },
  skipReset3: {
    id: "skipReset3",
    cost: 80,
    checkRequirement: () => InfinityUpgrade.skipReset2.isBought,
    description: () =>
      `每次重置后开始于 ${formatInt(3)} 个维度提升，并自动解锁第七反物质维度`,
  },
  skipResetGalaxy: {
    id: "skipResetGalaxy",
    cost: 300,
    checkRequirement: () => InfinityUpgrade.skipReset3.isBought,
    description: () =>
      `每次重置后开始于 ${formatInt(4)} 个维度提升和一个反物质星系，并自动解锁第八反物质维度`,
  },
  ipOffline: {
    id: "ipOffline",
    cost: 1000,
    checkRequirement: () => Achievement(41).isUnlocked,
    description: () => (player.options.offlineProgress
      ? `仅在离线时，自动获得无限点数，速度为未使用 “最大” 按钮时所取得的最佳 “无限点数/分钟” 的 ${formatPercents(0.5)}.`
      : "此升级将在离线时产生无限点数，但目前已禁用离线进度"),
    effect: () => (player.options.offlineProgress
      ? player.records.thisEternity.bestIPMsWithoutMaxAll.times(TimeSpan.fromMinutes(1).totalMilliseconds / 2)
      : DC.D0),
    isDisabled: () => !player.options.offlineProgress,
    formatEffect: value => `${format(value, 2, 2)} 无限点数/分钟`,
  },
  ipMult: {
    id: "ipMult",
    cost: () => InfinityUpgrade.ipMult.cost,
    checkRequirement: () => Achievement(41).isUnlocked,
    costCap: DC.E6E6,
    costIncreaseThreshold: DC.E3E6,
    description: () => `将所有来源的无限点乘以 ${formatX(2)}`,
    // Normally the multiplier caps at e993k or so with 3300000 purchases, but if the cost is capped then we just give
    // an extra e7k to make the multiplier look nice
    effect: () => (player.IPMultPurchases >= 3300000 ? DC.E1E6 : DC.D2.pow(player.IPMultPurchases)),
    cap: () => Effarig.eternityCap ?? DC.E1E6,
    formatEffect: value => formatX(value, 2, 2),
  }
};
