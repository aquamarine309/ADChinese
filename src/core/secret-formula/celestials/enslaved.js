export const enslaved = {
  // These entries will be unlocked in no particular order
  progress: {
    hintsUnlocked: {
      id: 0,
      hint: "无名氏想帮忙，但提示得等上一阵子。",
      condition: () => `在现实中超过 ${formatInt(5)} 小时还没完成它；现实外的时间算作 ${formatPercents(0.4)}。计时器在现实解锁后启动，但会连续累积。`,
    },
    ec1: {
      id: 1,
      hint: "这就奇了怪了，自动永恒挑战似乎有点工作不正常。",
      condition: () => `一次性完成超过 ${formatInt(5)} 次永恒挑战 1`,
    },
    feelEternity: {
      id: 2,
      hint: "在这个现实里，无限似乎比平常更破碎了，但这还能修复吗？",
      condition: "尝试修复无限，却误触了“感受永恒”按钮。",
    },
    ec6: {
      id: 3,
      hint: `有些挑战虽然难，但也能换来些增益，想想看这里有没有比平时更好的挑战。`,
      condition: () => `在完成 ${formatInt(5)} 次后再次进入永恒挑战 6，以使用其更便宜的复制器星系。`,
    },
    c10: {
      id: 4,
      hint: "有没有一种可能，你可以不通过第八维度来获得反物质星系。",
      condition: "利用挑战 10 来获得多于一个反物质星系，因为那里只有 6 个反物质维度",
    },
    secretStudy: {
      id: 5,
      hint: "时间研究 12? 那是什么？",
      condition: () => `点击隐藏的时间研究，额外获得 ${formatInt(100)} 时间之理`,
    },
    storedTime: {
      id: 6,
      hint: "似乎这个现实的某些部分如果等得够久就会消失。",
      condition: "在这个现实里释放了超过一年的游戏时间",
    },
    challengeCombo: {
      id: 7,
      hint: "能不能用一个挑战绕过另一个挑战的限制？",
      condition: "在永恒挑战 6 中，进入挑战 10",
    },
  },
  // These get unlocked sequentially
  glyphHints: [
    "无限符文和膨胀符文的效果被强力封印了，它们在这里毫无作用。",
    "力量符文和时间符文在这里非常管用。",
    `在这里，只有词条正确的鹿颈长符文才管用，不过完成这个现实，并不需要鹿颈长符文。你或许需要一个复制符文，但也许你不需要它。也许，复制符文在这里不如力量符文和时间符文。`
  ]
};
