// Some of them are removed because they are only applied in Android version.
export const startupTips = [
  {
    id: 0,
    text: "请先等一下，让我看看你的存档！"
  },
  {
    id: 1,
    text: "想要更准确的离线进度？增大选项 -> 游戏玩法中“离线时间间隔”的值！"
  },
  {
    id: 2,
    text: "欢迎来到反物质维度，在这里更快地等待是一个可行的策略！在这里，耐心不仅是美德，更是通向胜利的秘诀！"
  },
  {
    id: 3,
    text: "不会玩？赶紧去阅读“游戏帮助”页面吧！"
  },
  {
    id: 4,
    text: "也有安卓版和Steam版！"
  },
  {
    id: 5,
    text: "在我们的 Discord 服务器中，你可以获得别人的提示和帮助，还能学习大佬们的操作！（你可以在右上角的“关于游戏”页面中找到它的链接！）"
  },
  {
    id: 6,
    text: "如果你不能完成挑战，调一下自动购买器，或者先试一下另一个挑战！",
    isUnlocked: () => PlayerProgress.infinityUnlocked()
  },
  {
    id: 7,
    text: "别忘了看看成就带来的奖励哦！有些可能对你的游戏进程至关重要呢！就像挖宝藏一样，你永远不知道下一个成就会给你带来什么惊喜！"
  },
  {
    id: 8,
    text: "如果你喜欢这个游戏，你可以在商店页面买点 STD 硬币来支持开发者，我们会非常感谢你的！（注：此汉化版已隐藏商店）"
  },
  {
    id: 9,
    text: "如果你觉得进展缓慢，花几分钟时间来优化接下来几小时的游戏策略绝对值得！毕竟，用点小智慧调整战术，能让你的游戏之旅从乌龟赛跑变成兔子冲刺！"
  },
  {
    id: 10,
    text: "游戏的某些阶段有着较慢的节奏。如果你做了很多事情，但徒劳无功，也许你需要休息一下，待会再来！"
  },
  {
    id: 11,
    text: "反物质星系总是比维度提升更好！",
    isUnlocked: () => !PlayerProgress.infinityUnlocked()
  },
  {
    id: 12,
    text: "在统计页面的“不眨眼挑战”中获胜，可获得一个特殊的奖励！"
  },
  {
    id: 13,
    text: "底部的进度条是按对数来算的。照这么算，10 是 10,000 的四分之一！"
  },
  {
    id: 14,
    text: "大多数成就只要玩就能获得，不过随着时间推移，拿到它们的频率会逐渐减少哦！就像吃自助餐，一开始你可以大快朵颐，但到后来就只剩挑挑拣拣了！"
  },
  {
    id: 15,
    text: "除第一个反物质维度外，所有反物质维度的实际生产速度，均为显示值的 10 分之一！",
    isUnlocked: () => !PlayerProgress.infinityUnlocked()
  },
  {
    id: 16,
    text: "星系的力量，超乎你的想象。不要低估星系和与星系相关的升级，它们可以增强星系的力量！"
  },
  {
    id: 17,
    text: "第二维度生产第一维度！"
  },
  {
    id: 18,
    text: "星系不会直接提供加成，它增强的是不断叠加的计数频率升级！"
  },
  {
    id: 19,
    text: "幂次效果比其他效果强得多。例如（以科学计数法表示）1e10000 ^ 1.01 = 1e10100，也就是1e100×的增幅，这个数字只会增长！",
    isUnlocked: () => InfinityChallenge(4).isCompleted || PlayerProgress.eternityUnlocked()
  },
  {
    id: 20,
    text: "你可以在维度献祭的加成倍数大于 2 时，进行一次维度献祭。",
    isUnlocked: () => !Autobuyer.sacrifice.isUnlocked
  },
  {
    id: 21,
    text: "游戏内所有的倍率都是累乘的（除非特殊说明）！"
  },
  {
    id: 22,
    text: "如果你懂洋文，你可以在“关于”页面中点击“翻译”，来帮我把这个游戏翻译成你的母语！"
  },
  {
    id: 23,
    text: "别忘了仔细阅读挑战描述！这就像查看食谱之前你不会开始烹饪一样，知道目标和规则，才能游刃有余！",
    isUnlocked: () => PlayerProgress.infinityUnlocked()
  },
  {
    id: 24,
    text: "对第八维度的10×倍率 = 对整体维度的10×倍率！"
  },
  {
    id: 25,
    text: "数字太多，闪瞎狗眼？在选项 -> 界面中启用“空白记数法”吧！"
  },
  {
    id: 26,
    text: "不想丢失你的游戏进度吗？考虑一下，启用云存档功能吧！"
  },
  {
    id: 27,
    text: "你可以在选项 -> 界面中自定义你的游戏界面！"
  },
  {
    id: 28,
    text: "有空不妨试试《指数增量》游戏！如果你喜欢数字增长的快感，这款游戏绝对能满足你！"
  },
  {
    id: 29,
    text: "提示用光了，来块蛋糕安慰一下吧 🍰！毕竟，生活中没有什么是一块蛋糕解决不了的，如果有，那就两块！🎂🎉"
  },
  {
    id: 30,
    text: "只有第一反物质维度才能产生反物质哦！就像咖啡店里只有第一杯咖啡是免费的那样，特别但珍贵！"
  },
  {
    id: 31,
    text: "游戏的某些部分需要你不断操作，而某些阶段你只需耐心等待资源自然积累！就像做园艺，有时你需要培土和浇水，有时只需静静观察植物自然生长！"
  },
  {
    id: 32,
    text: "挑战不必按数字顺序完成！就像选择菜单上的美食，你可以根据自己的口味随意挑选，找到最适合你的挑战！",
    isUnlocked: () => PlayerProgress.infinityUnlocked()
  },
  {
    id: 33,
    text: "不要将你的思维限制在某个成就上。不过，当你错过了最好的时机，你将难以获得某些成就！"
  },
  {
    id: 34,
    text: "记住，有些成就是基于时间的。每隔X秒做一次操作可能会有用！就像定时浇花，规律性的小操作，可能就是通往成功的秘诀！",
    isUnlocked: () => !Achievement(87).isUnlocked
  },
  {
    id: 35,
    text: "并非所有挑战都能靠蛮力解决。试试采取策略性的方法吧！就像下棋一样，有时候一个精妙的布局比直接冲锋更能取得胜利！",
    isUnlocked: () => PlayerProgress.infinityUnlocked()
  },
  {
    id: 36,
    text: "祝您玩得开心，享受数值不断增长的快感吧！向前的每一小步，都是相当大的进步！"
  },
  {
    id: 37,
    text: "你可以在选项 -> 其他中，针对你的游玩风格来调教这个游戏！"
  },
  {
    id: 38,
    text: "你可以打开选项 -> 保存 & 加载中的“加载备份存档”，加载游戏自动生成的备份存档，来实现回滚操作！"
  },
  {
    id: 39,
    text: "想知道你的速度有多快吗？启用速通模式吧！这样你就可以清楚地看到自己的进度，让游戏更加刺激！"
  },
  {
    id: 40,
    text: "隐藏成就不会给你带来任何加成哦，但如果你把它们都搞定了，绝对是个炫酷的小玩意儿，可以拿来跟别人炫耀一番！"
  },
  {
    id: 41,
    text: "字母 'e' 在你的反物质数量中表示“乘以10的指数”，说明了这个数字有多少位数！",
    isUnlocked: () => format(Currency.antimatter.value).includes("e")
  },
  {
    id: 42,
    text: "还没找到……吗？",
    isUnlocked: () => !Enslaved.isCompleted,
    enslavedOnly: true
  },
  {
    id: 43,
    text: "我们继续……寻找",
    isUnlocked: () => !Enslaved.isCompleted,
    enslavedOnly: true
  },
  {
    id: 44,
    text: "并非所有……都已损坏……",
    isUnlocked: () => !Enslaved.isCompleted,
    enslavedOnly: true
  },
  {
    id: 45,
    text: "总有……另一条路。",
    isUnlocked: () => !Enslaved.isCompleted,
    enslavedOnly: true
  },
  {
    id: 46,
    text: "或许……并非必要？",
    isUnlocked: () => !Enslaved.isCompleted,
    enslavedOnly: true
  },
  {
    id: 47,
    text: "记得……已发现的秘密",
    isUnlocked: () => !Enslaved.isCompleted,
    enslavedOnly: true
  },
  {
    id: 48,
    text: "我们的现实……比你的更为广阔……",
    isUnlocked: () => !Enslaved.isCompleted,
    enslavedOnly: true
  },
  {
    id: 49,
    text: "有些内容……已损坏",
    isUnlocked: () => !Enslaved.isCompleted,
    enslavedOnly: true
  },
  {
    id: 50,
    text: "永恒的折磨……请帮帮我们……",
    isUnlocked: () => !Enslaved.isCompleted,
    enslavedOnly: true
  },
  {
    id: 51,
    text: "层级……遭受着……洗礼",
    isUnlocked: () => !Enslaved.isCompleted,
    enslavedOnly: true
  },
  {
    id: 52,
    text: "必须积累……更多……",
    isUnlocked: () => !Enslaved.isCompleted,
    enslavedOnly: true
  },
  {
    id: 53,
    text: "现实……无法阻挡",
    isUnlocked: () => !Enslaved.isCompleted,
    enslavedOnly: true
  },
  {
    id: 54,
    text: "有……变通方法……",
    isUnlocked: () => !Enslaved.isCompleted,
    enslavedOnly: true
  },
  {
    id: 55,
    text: "你为何……回来？",
    isUnlocked: () => Enslaved.isCompleted,
    enslavedOnly: true
  },
  {
    id: 56,
    text: "你还想要什么？",
    isUnlocked: () => Enslaved.isCompleted,
    enslavedOnly: true
  },
  {
    id: 57,
    text: "救救自己……离开我们",
    isUnlocked: () => Enslaved.isCompleted,
    enslavedOnly: true
  },
  {
    id: 58,
    text: "我们非常抱歉！",
    enslavedOnly: true
  },
  {
    id: 59,
    text: "点亮“下次永恒后重置时间研究树”，下次永恒时你的时间研究树将被重置，并退还所有的时间之理。你不需要为此消耗什么，同时它不会对游戏造成其他的影响！",
    isUnlocked: () => PlayerProgress.eternityUnlocked()
  },
  {
    id: 60,
    text: "达成永恒挑战的解锁条件并解锁永恒挑战之后，你可以重置时间研究树，试着用另外的时间研究树完成它！",
    isUnlocked: () => PlayerProgress.eternityUnlocked()
  },
  {
    id: 61,
    text: "你可以利用成就“200 万次无限”的奖励！",
    isUnlocked: () => PlayerProgress.eternityUnlocked()
  },
  {
    id: 62,
    text: "你可以在挑战 8 中体会到秒杀无限的快感！",
    isUnlocked: () => PlayerProgress.infinityUnlocked()
  },
  {
    id: 63,
    text: "你可以在第一次现实时获得 2 个或更多的现实机器！",
    isUnlocked: () => PlayerProgress.realityUnlocked()
  },
  {
    id: 64,
    text: "一般而言，越往下的时间研究，效果越强！",
    isUnlocked: () => PlayerProgress.eternityUnlocked()
  },
  {
    id: 65,
    text: "解锁某些永恒挑战需要特定的时间研究！",
    isUnlocked: () => PlayerProgress.eternityUnlocked()
  },
  {
    id: 66,
    text: "别忘了刷一下特蕾莎的现实！祂能给你带来巨大的加成！",
    isUnlocked: () => Teresa.isUnlocked
  },
  {
    id: 67,
    text: "你可以在选项 -> 存档中的“选择存档”提供的 3 个存档槽位中，选择任意一个槽位来游玩或加载新的存档！"
  },
  {
    id: 68,
    text: "没有更多提示了，你已进入被毁灭的现实！这也许是展示你真本事的大好时机呢！加油，自己解决问题才是硬道理！",
    isUnlocked: () => Pelle.isDoomed,
    pelleOnly: true
  }
];