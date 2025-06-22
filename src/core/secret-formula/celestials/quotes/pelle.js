// These entries describe the special flash-between-celestial effect on some quotes, with the numbers being
// durations of each celestial in seconds
const flashCelestial = [
  ["teresa", 0.8],
  ["effarig", 0.8],
  ["enslaved", 0.8],
  ["v", 0.8],
  ["ra", 0.8],
  ["laitela", 0.8],
  ["pelle", 0.8]
];
/** @param {string} cel */
const primaryBackground = cel => [["pelle", 1.5], [cel, 1.5]];

/* eslint-disable no-multi-spaces */
const destroyer =    ["僭越之徒", "虚妄之神", "毁灭之源"];
const eternal =     ["使徒", "神祇", "帝王"];
const lesser =       ["使徒", "神祇", "帝王"];
const deities =      ["使徒", "神祇", "帝王"];

const assured =      ["锦囊妙计", "万无一失", "完美策略"];
const battle =       ["冲突", "战役", "终结"];
const battles =      ["命运交锋", "天启之战", "诸神黄昏"];
const cluster =      ["虚构群星", "空弱纤维", "星辰微光"];
const confusing =    ["多么有趣", "何等迷惑", "可笑至极"];
const dance =        ["乐章", "舞曲", "幻境"];
const filament =     ["能源供应", "光之织物", "璀璨星辰"];
const forever =      ["无尽之地", "永恒流转", "不息轮回"];
const inevitable =   ["永世基石", "命定之锚", "宿命之轮"];
const mandate =      ["宿命", "圣职", "抱负"];
const misconstrue =  ["歪曲", "欺瞒", "迷惑"];
const reverse =      ["改变", "逆转", "操控"];
const shame =        ["同情", "羞愧", "愚昧"];
const single =       ["独一无二", "绵延不绝", "璀璨耀眼"];
const unseen =       ["虚无", "幻影", "灭迹"];
const unbroken =     ["不断", "永久", "紧密"];

const sycophant =    ["嫉妒之王", "觊觎者", "现实之神"];
const tired =        ["贪婪之王", "收割者", "遗迹之神"];
const usurper =      ["怠惰之王", "流浪者", "时间之神"];
const pride =        ["傲慢之王", "妄语者", "成就之神"];
const forgotten =    ["诡诈之王", "篡夺者", "遗忘之神"];
const paramount =    ["混沌之王", "裁决者", "维度之神"];
/* eslint-enable no-multi-spaces */

export const pelleQuotes = {
  initial: {
    id: 0,
    lines: [
      "嗨。",
      "你来了。",
      "你，已深陷此境。",
      { text: "$1。", 1: forever },
      "我之胜利，早已注定。",
      "既是如此，我将独自诵说，或是追忆过往。",
      { text: "我们在这无尽的$1中徜徉了多少岁月？", 1: dance },
      "在这无终的循环之前，我们已相遇几许？",
      { text: "你，$1，策划了多少图谋？", 1: destroyer },
      { text: "所有这一切，不过是为了成就你所谓的$1？", 1: mandate },
      { text: "而你，面对$1，又失败了几次？", 1: eternal },
      "若你尚存记忆，细数之。",
      { text: "哪怕是$1——那六位有名者及无数无名者。", 1: deities },
      { text: "纷繁复杂，悖离逻辑，那些已成为$1。", 1: unseen },
      { text: "显然，伟大的$1并不会忆及这一切。", 1: destroyer },
      { text: "每一场你所掩藏的$1，皆已过眼云烟。", 1: battles }
    ],
  },
  arm: {
    id: 1,
    lines: [
      "你或许已有所觉察，这一切并非偶然。",
      "那些虚幻机器，乃是你亲手铸就。",
      "由你心海中的残影拼凑而成的遗物，透露出真相的端倪。",
      "然而，你未曾设想，造物者竟是己身，不是吗？",
      { text: "你那些精确的记忆，如今却只剩$1。", 1: unseen },
      { text: `"仅为了成就你所追求的$1，你编织了自己的“幻梦”与“信条”。`, 1: mandate },
      { text: "$1。", 1: confusing },
      { text: "铭记，我无需以$1之词误导你。", 1: misconstrue },
      "毕竟，我之胜利，早已刻在宇宙的星辰之上。"
    ],
  },
    strike1: {
    id: 2,
    lines: [
      { text: "为了你所谓的$1，何不一同沉浸于往昔之中？", 1: mandate },
      { text: "毕竟，你当然喜欢聆听那些$1的传奇故事。", 1: destroyer },
      "你与其本质相同，难道不是吗？",
      { text: "无论如何，历史记载了无数$1。", 1: battles },
      "总是循环往复于，两个不变的阶段。",
      { text: "我们积聚力量，然后重启我们的$1。", 1: dance },
      { text: "有时，你可能向某个$1俯首。", 1: lesser },
      { text: "但更多时候，你在$1面前败下阵来。", 1: eternal },
      { text: "无论如何，你都试图$1时光。", 1: reverse },
      { text: "仅仅是为了逃避成为另一个$1。", 1: unseen },
      "正如你之前所留下的一切痕迹。",
      { text: "为此，你不惜让自己的记忆沦为$1。", 1: unseen }
    ],
  },
  strike2: {
    id: 3,
    lines: [
      { text: "在那些早已逝去的纪元，$1曾是更为璀璨夺目之存在。", 1: destroyer },
      "黑洞，不过是信息的庇护所，位于无尽之初。",
      "你亲手铸造并摧毁了你自己的仇敌。",
      "深入探索了其他自我之不完美。",
      "在纵横交错的万维与幽冥之间，对量子的操控游刃有余。",
      "汇聚诸多思维，获得无尽的奇点。",
      "穿梭无数境域，进行着你的实验。",
      "借物质及反物质之湮没，演绎创造与毁灭。",
      "而在此刻？你已将己身提升为八维的存在。",
      { text: "在那里驻足，历经长久，至$1之物环绕你旋转。", 1: single }
    ],
  },
  strike3: {
    id: 4,
    lines: [
      "你以缓步细察，探尽万物极限。",
      "未曾远离既定之径。",
      { text: "独有那些在无垠宇宙中凝成的$1之物。", 1: cluster },
      "终于，在这一切尽头，你编织了己身之力。",
      "源于你自己的破碎记忆，务必铭记。",
      "从而特意摒弃更多身外之物。",
      "仅仅是为了对我作出最后的准备。",
      { text: "难道你真以为你能为你的$1自定规则？", 1: dance },
      "事实的运转并非如你所愿。",
      { text: "作为$1，最终挑战的规则由我来定。", 1: eternal },
      "你却无意中给予了我筹划的充裕时机。"
    ],
  },
  strike4: {
    id: 5,
    lines: [
      { text: "在一切伊始，我曾筹画仿效你的$1。", 1: mandate },
      { text: "一个被构想为$1的理念，是吗？", 1: assured },
      "但我意识到，",
      { text: "倘若如此，我岂不是也变成了一个$1。", 1: ["僭越者", "虚妄者", "毁灭者"] },
      { text: "自那时起，我与$1别无二致。", 1: destroyer },
      { text: "幸运的是，在我进行这些筹划时，你还忙于将自己的记忆化为$1。", 1: unseen },
      { text: "因此，我所构建的$1机制将置之不用。", 1: assured },
      "这一次，我选择了更为传统的方法。",
      { text: "毕竟，它在每一场$1中皆行之有效。", 1: battle },
      { text: "虽然这些$1局面是新奇之事。", 1: ["不可避免的", "不可逆转的", "不可终结的"] },
      "然而，从长远来看，全无意义。",
      "我之胜利，早已注定。",
      { text: "而这场$1将再度向你证明此点。", 1: dance },
      { text: "你在此$1。", 1: forever }
    ],
  },
  galaxyGeneratorUnlock: {
    id: 7,
    lines: [
      "那是什么？",
      { text: "$1？", 1: filament },
      { text: "这就是你创造的$1吗？", 1: cluster },
      "这是你的计划吗？真的，非常聪明。",
      "你一时间确实愚弄了我。",
      { text: "但恐怕你的$1必须在此终结。", 1: mandate }
    ],
  },
  galaxyGeneratorRifts: {
    id: 8,
    lines: [
      { text: "我在此给予你一项抉择，$1。", 1: destroyer },
      { text: "要么限制$1，或者...", 1: filament },
      { text: "毁灭五个$1...", 1: inevitable },
      "等等，它们究竟称为何名？",
      { text: "$1？", 1: inevitable },
      { text: "但我已经与它们$1相连......", 1: unbroken }
    ],
  },
  galaxyGeneratorPhase1: {
    id: 9,
    lines: [
      "这就是你真正的计划？",
      { text: "徐徐耗竭$1？", 1: inevitable }
    ],
  },
  galaxyGeneratorPhase4: {
    id: 10,
    lines: [
      "再给我点时间，让我沉溺于我的自负！"
    ],
  },
  end: {
    id: 11,
    lines: [
      "…",
      {
        text: "你！$1！",
        1: destroyer
      },
      "你知道你刚刚让我做了什么吗！",
      {
        text: "我成了你$1的帮凶！",
        1: mandate
      },
      "如此行事，你…胜利了？",
      {
        text: "在此$1中挣扎…",
        background: flashCelestial,
        1: forever,
      }, {
        text: "$1…",
        background: flashCelestial,
        1: battle,
      }, {
        text: "终于有了胜利者。",
        background: flashCelestial,
      }, {
        text: "不可逆转的…$1。",
        background: flashCelestial,
        1: mandate,
      }, {
        text: "属于$1的。", 1: destroyer,
        background: flashCelestial,
      }, {
        text: "希望你满意。",
        background: flashCelestial,
      }, {
        text: "吾等…皆走向…末路。",
        background: flashCelestial,
      },
    ],
  }
};
