import { DC } from "../../constants.js";

// I tried to make it relatively simple to add more locks; the idea is that you give it a value here
// and then it's all handled in the backend
// If you need to lock a challenge, set lockedAt to a new Decimal variable reflective of a desired number of Infinities
// They will always be unlocked post-eternity

export const normalChallenges = [
  {
    id: 1,
    legacyId: 1,
    isQuickResettable: false,
    description() {
      return PlayerProgress.eternityUnlocked()
        ? "首次在挑战之外达到无限。"
        : "首次达到无限。";
    },
    name: "1st Antimatter Dimension Autobuyer",
    reward: "升级第一维度自动购买间隔的能力",
    lockedAt: DC.D0,
  },
  {
    id: 2,
    legacyId: 2,
    isQuickResettable: false,
    description:
      () => `购买任何东西都将会停止产出，不过会在接下来的${formatInt(3)}分钟内逐渐恢复。`,
    name: "2nd Antimatter Dimension Autobuyer",
    reward: "升级第二维度自动购买间隔的能力",
    lockedAt: DC.D0,
  },
  {
    id: 3,
    legacyId: 3,
    isQuickResettable: false,
    description:
      `大幅度削弱第一反物质维度的效果，不过可以得到一个指数增长的加成。该加成会在进行维度提升或购买反物质星系后重置。`,
    name: "3rd Antimatter Dimension",
    reward: "升级第三维度自动购买间隔的能力",
    lockedAt: DC.D0,
  },
  {
    id: 4,
    legacyId: 8,
    isQuickResettable: false,
    description: "购买反物质维度会自动清除所有更低位面的反物质维度，类似一次不提供加成的维度献祭。",
    name: "4th Antimatter Dimension Autobuyer",
    reward: "升级第四维度自动购买间隔的能力",
    lockedAt: DC.D0,
  },
  {
    id: 5,
    legacyId: 6,
    isQuickResettable: false,
    description:
      () => `购买计数频率获得的倍率从 ${formatX(1.080, 0, 3)} 开始而不是 ${formatX(1.1245, 0, 3)}.`,
    name: "5th Antimatter Dimension Autobuyer",
    reward: "升级第五维度自动购买间隔的能力",
    lockedAt: DC.D0,
  },
  {
    id: 6,
    legacyId: 10,
    isQuickResettable: false,
    description: () => `购买反物质维度时不消耗反物质，而是按另外的价格消耗其上 ${formatInt(2)} 层的反物质维度。`,
    name: "6th Antimatter Dimension Autobuyer",
    reward: "升级第六维度自动购买间隔的能力",
    lockedAt: DC.D0,
  },
  {
    id: 7,
    legacyId: 9,
    isQuickResettable: false,
    description: () =>
      `购买 ${formatInt(10)} 个反物质维度获得的加成减少至 ${formatX(1)}. 不过这一加成在每次维度提升后会增加 ${formatX(0.2, 1, 1)}，直到到达 ${formatX(2)} 的上限。`,
    name: "7th Antimatter Dimension Autobuyer",
    reward: "升级第七维度自动购买间隔的能力",
    lockedAt: DC.D0,
  },
  {
    id: 8,
    legacyId: 11,
    isQuickResettable: false,
    description: `维度提升不再提供倍率加成且无法购买反物质星系。维度献祭被大幅度加强，但它会重置除了计数频率之外的一切。`,
    name: "8th Antimatter Dimension Autobuyer",
    reward: "升级第八维度自动购买间隔的能力",
    lockedAt: DC.D0,
  },
  {
    id: 9,
    legacyId: 5,
    isQuickResettable: true,
    description: () => `购买单个计数频率升级或 ${formatInt(10)} 个反物质维度之后，价格相等的其它东西将会涨价到下一个档位。`,
    name: "Tickspeed Autobuyer",
    reward: "升级计数频率自动购买间隔的能力",
    lockedAt: DC.D0,
  },
  {
    id: 10,
    legacyId: 4,
    isQuickResettable: false,
    description: () => `只有 ${formatInt(6)} 个反物质维度，同时提高维度提升和反物质星系的价格。`,
    name: "Automated Dimension Boosts",
    reward: "自动购买维度提升",
    lockedAt: DC.D16,
  },
  {
    id: 11,
    legacyId: 12,
    isQuickResettable: true,
    description: () => `从你购买第二反物质维度开始，正物质将会出现并逐渐增加。如果正物质超过了反物质，那么将会触发一次不提供加成的维度提升。`,
    name: "Automated Antimatter Galaxies",
    reward: "自动购买反物质星系",
    lockedAt: DC.D16,
  },
  {
    id: 12,
    legacyId: 7,
    isQuickResettable: false,
    description: () => `每个反物质维度生产比其低 ${formatInt(2)} 层的反物质维度。第二反物质维度生产反物质。第二、第四和第六维度的产量增加。`,
    name: "Automated Big Crunches",
    reward: "自动大坍缩",
    lockedAt: DC.D16,
  }
];
