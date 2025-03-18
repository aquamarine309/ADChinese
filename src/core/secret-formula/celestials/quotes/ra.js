export const raQuotes = {
  unlock: {
    id: 0,
    lines: ['一…一个访客？', '我在这儿呢！我就是你要找的存在…我想是的…', '我又是谁？', '哦想起来了，我是记忆之神。'],
  },
  realityEnter: {
    id: 1,
    lines: ['我好长时间没见过别人了…', '你能让我想起他们吗？', '我能给你力量作为交换。'],
  },
  teresaStart: {
    id: 2,
    requirement: () => Ra.pets.teresa.level >= 2,
    lines: ['特…蕾…莎…', '我好像想起来了。'],
  },
  teresaLate: {
    id: 3,
    requirement: () => Ra.pets.teresa.level >= 15,
    lines: ['在我的印象中，特蕾莎是管机器的。', '祂的商店我去过几次。', '等等，好像谁也有个商店，对吧？'],
  },
  effarigStart: {
    id: 4,
    requirement: () => Ra.pets.effarig.level >= 2,
    lines: ['鹿…颈…长', '我记得鹿颈长很友好。'],
  },
  effarigLate: {
    id: 5,
    requirement: () => Ra.pets.effarig.level >= 15,
    lines: ['鹿颈长很挑剔吗？', '而且我想到一个可怕的现实…', '那是关于…受难的？'],
  },
  enslavedStart: {
    id: 6,
    requirement: () => Ra.pets.enslaved.level >= 2,
    lines: ['我完全记不起祂了……'],
  },
  enslavedLate: {
    id: 7,
    requirement: () => Ra.pets.enslaved.level >= 15,
    lines: ['我开始回忆起来了…', '我为什么在这儿…', '我为什么孤身一人…', '救救我。'],
  },
  vStart: {
    id: 8,
    requirement: () => Ra.pets.v.level >= 2,
    lines: ['我见过祂吗？', '如此的孤单，然而乐意如此…'],
  },
  vLate: {
    id: 9,
    requirement: () => Ra.pets.v.level >= 15,
    lines: ['我好像见过祂一次…', '我想起那些成就了。'],
  },
  remembrance: {
    id: 10,
    requirement: () => Ra.remembrance.isUnlocked,
    lines: ['我记起来什么了！', '看看这个！', '追思！', '我现在可以更专注于回忆祂们了！'],
  },
  midMemories: {
    id: 11,
    requirement: () => Ra.totalPetLevel >= 50,
    lines: ['现实是我的家，但我不能创造我自己的现实。', '我只能复制朋友们的现实。', '但…为什么我开始听到低语？', '祂们在寻求帮助吗？'],
  },
  lateMemories: {
    id: 12,
    requirement: () => Ra.totalPetLevel >= 80,
    lines: ['我认为祂们在告诉我停下。', '你…你是什么存在？', '发生了什么？', '我做错了什么？！'],
  },
  maxLevels: {
    id: 13,
    requirement: () => Ra.totalPetLevel === Ra.maxTotalPetLevel,
    lines: ['最终，我忆起全部。', '这使我灭亡的黑暗。', '莱特拉…', '祂们把我灭亡是对的。', '我的权能…', '已被腐化的祂们窃取。', '请离开这里。', '我不希望你被祂们伤害。'],
  },
}
