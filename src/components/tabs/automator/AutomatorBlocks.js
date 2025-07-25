import draggable from "../../../../modules/vuedraggable.js";

export default {
  name: "AutomatorBlocks",
  components: {
    draggable
  },
  data() {
    return {
      allBlocks: automatorBlocks.filter(b => !AUTOMATOR_BLOCKS_BLACKLIST.includes(b.cmd)),
      blocks: []
    };
  },
  methods: {
    update() {
      this.blocks = this.allBlocks.filter(b => (b.isUnlocked?.() ?? true));
    },
    clone(block) {
      const b = {
        ...block,
        id: UIID.next()
      };

      if (block.nested && !block.nest) b.nest = [];
      AutomatorData.recalculateErrors();
      return b;
    },
  },
  template: `
  <draggable
    class="o-drag-cancel-region"
    group="code-blocks"
    ghost-class="null-block"
    draggable=".draggable-blocks"
    data-v-automator-blocks
  >
    <p>
      将这些积木块拖放至左侧区域！积木块名称与参考页命令对应，但放置后会改变外观，以更自然的方式描述其功能。若积木块外观变化，拖拽时将显示替代文本作为提示。
    </p>
    <br>
    <p>  
      <span class="c-automator-input-optional">棕色</span>输入框为可选参数，<span class="c-automator-input-required">青色</span>输入框为必填参数。  
      <span class="c-automator-block-row-error">红色</span>输入框存在错误，必须修正后才能运行脚本。详情请查看脚本信息面板。  
    </p>  
    <p>  
      下拉菜单中带*号的选项将替换为文本框。点击文本框右侧的<i class="fa-solid fa-circle-xmark" />可恢复为下拉菜单。  
    </p>
    <draggable
      class="block-container"
      :list="blocks"
      :group="{ name: 'code-blocks', pull: 'clone', put: false }"
      :sort="false"
      :clone="clone"
      data-v-automator-blocks
    >
      <div
        v-for="block in blocks"
        :key="block.id"
        v-tooltip="block.alias"
        class="o-automator-command o-automator-block-list draggable-blocks"
        data-v-automator-blocks
      >
        {{ block.cmd }}
      </div>
    </draggable>
    <p>
      注意：积木块及其内容将计入字符限制，计算规则等同于以文本模式输入命令时的计数方式。
    </p>
  </draggable>
  `
};

const AUTOMATOR_BLOCKS_COMPARISON_OPERATORS = ["<", ">", ">=", "<="];
const AUTOMATOR_BLOCKS_COMPARISON_CURRENCIES = [
  "AM", "IP", "EP", "RM", "INFINITIES", "BANKED INFINITIES", "ETERNITIES", "REALITIES",
  "PENDING IP", "PENDING EP", "PENDING TP", "PENDING RM", "PENDING GLYPH LEVEL",
  "DT", "TP", "RG", "REP", "TT", "TOTAL TT", "TOTAL COMPLETIONS", "PENDING COMPLETIONS",
  "EC1 COMPLETIONS", "EC2 COMPLETIONS", "EC3 COMPLETIONS", "EC4 COMPLETIONS",
  "EC5 COMPLETIONS", "EC6 COMPLETIONS", "EC7 COMPLETIONS", "EC8 COMPLETIONS",
  "EC9 COMPLETIONS", "EC10 COMPLETIONS", "EC11 COMPLETIONS", "EC12 COMPLETIONS",
];

const AUTOMATOR_BLOCKS_RESETS = ["INFINITY", "ETERNITY", "REALITY"];

/**
 *  @property {String} cmd          Name of automator command
 *  @property {String} alias        Displayed name of automator command, acting as a more natural-sounding variant. Uses
 *    cmd if undefined.
 *  @property {Array: String} allowedPatterns   Allowed patterns for input types, specified single-capital-letter props
 *  @property {Array: String} [A-Z]             Classes of allowed inputs, to be used in allowedPatterns. Note that
 *    elements which begin with an asterisk are replaced with text inputs upon selection, and single-entry classes will
 *    be automatically replaced with a text input or unmodifiable text as appropriate
 *  @property {Array: String} targets           List of keys to be used for assigning inputs to props of automator
 *    commands. Each entry is associated with the index of the character in allowedPatterns
 *  @property {Boolean} nested      Whether or not the command is the header of a loop in the automator
 *  @property {Boolean} canWait     Whether or not the command can be run in a non-blocking way
 *  @property {Boolean} canRespec   Whether or not the command has an associated respec option
 *  @property {Function @return Boolean} isUnlocked    Function returning the unlock state of the command; if false,
 *    the command will not appear. Assumed to be true if prop is not present
 */
export const automatorBlocks = [
  {
    cmd: "STUDIES RESPEC",
    alias: "RESPEC TIME STUDIES"
  }, {
    cmd: "STUDIES LOAD",
    alias: "LOAD STUDY PRESET",
    allowedPatterns: ["AB"],
    A: ["ID", "NAME"],
    B: ["*"],
    targets: ["singleSelectionInput", "singleTextInput"],
    canWait: true
  }, {
    cmd: "STUDIES PURCHASE",
    alias: "PURCHASE STUDIES",
    allowedPatterns: ["A"],
    A: ["*"],
    targets: ["singleTextInput"],
    canWait: true
  }, {
    cmd: "INFINITY",
    canWait: true
  }, {
    cmd: "ETERNITY",
    canRespec: true,
    canWait: true
  }, {
    cmd: "REALITY",
    canRespec: true,
    canWait: true,
    isUnlocked: () => RealityUpgrade(25).isBought
  }, {
    cmd: "UNLOCK",
    allowedPatterns: ["AB", "C"],
    A: ["EC"],
    B: ["*"],
    C: ["DILATION"],
    targets: ["singleSelectionInput", "singleTextInput"],
    canWait: true
  }, {
    cmd: "START",
    allowedPatterns: ["AB", "C"],
    A: ["EC"],
    B: ["*"],
    C: ["DILATION"],
    targets: ["singleSelectionInput", "singleTextInput"],
  }, {
    cmd: "AUTO",
    alias: "CHANGE AUTOBUYER SETTING",
    allowedPatterns: ["AB"],
    A: AUTOMATOR_BLOCKS_RESETS,
    B: ["ON", "OFF", "* AUTOBUYER SETTING"],
    targets: ["singleSelectionInput", "singleTextInput"],
  }, {
    cmd: "BLACK HOLE",
    alias: "TURN BLACK HOLE",
    allowedPatterns: ["A"],
    A: ["ON", "OFF"],
    targets: ["singleSelectionInput"],
    isUnlocked: () => BlackHole(1).isUnlocked
  }, {
    cmd: "STORE GAME TIME",
    alias: "SET GAME TIME STORAGE TO",
    allowedPatterns: ["A"],
    A: ["ON", "OFF", "USE"],
    targets: ["singleSelectionInput"],
    isUnlocked: () => Enslaved.isUnlocked
  }, {
    cmd: "NOTIFY",
    alias: "GAME NOTIFICATION:",
    allowedPatterns: ["A"],
    A: ["*"],
    targets: ["singleTextInput"],
  }, {
    cmd: "COMMENT",
    alias: "NOTE:",
    allowedPatterns: ["A"],
    A: ["*"],
    targets: ["singleTextInput"],
  }, {
    cmd: "WAIT",
    alias: "PAUSE AUTOMATOR UNTIL",
    allowedPatterns: ["A", "DE", "BCB"],
    A: AUTOMATOR_BLOCKS_RESETS,
    B: [...AUTOMATOR_BLOCKS_COMPARISON_CURRENCIES, "* SPECIFIED CONSTANT"],
    C: AUTOMATOR_BLOCKS_COMPARISON_OPERATORS,
    D: ["BLACK HOLE"],
    E: ["OFF", "BH1", "BH2"],
    targets: ["genericInput1", "compOperator", "genericInput2"]
  }, {
    cmd: "PAUSE",
    alias: "PAUSE AUTOMATOR FOR",
    allowedPatterns: ["A"],
    A: ["*"],
    targets: ["singleTextInput"],
  }, {
    cmd: "IF",
    alias: "ENTER BLOCK IF",
    allowedPatterns: ["ABA"],
    A: [...AUTOMATOR_BLOCKS_COMPARISON_CURRENCIES, "* SPECIFIED CONSTANT"],
    B: AUTOMATOR_BLOCKS_COMPARISON_OPERATORS,
    targets: ["genericInput1", "compOperator", "genericInput2"],
    nested: true
  }, {
    cmd: "UNTIL",
    alias: "REPEAT BLOCK UNTIL",
    allowedPatterns: ["A", "BCB"],
    A: AUTOMATOR_BLOCKS_RESETS,
    B: [...AUTOMATOR_BLOCKS_COMPARISON_CURRENCIES, "* SPECIFIED CONSTANT"],
    C: AUTOMATOR_BLOCKS_COMPARISON_OPERATORS,
    targets: ["genericInput1", "compOperator", "genericInput2"],
    nested: true
  }, {
    cmd: "WHILE",
    alias: "REPEAT BLOCK WHILE",
    allowedPatterns: ["ABA"],
    A: [...AUTOMATOR_BLOCKS_COMPARISON_CURRENCIES, "* SPECIFIED CONSTANT"],
    B: AUTOMATOR_BLOCKS_COMPARISON_OPERATORS,
    targets: ["genericInput1", "compOperator", "genericInput2"],
    nested: true
  }, {
    cmd: "BLOB"
  }, {
    cmd: "STOP",
    alias: "STOP EXECUTION"
  }
];
const AUTOMATOR_BLOCKS_BLACKLIST = ["BLOB"];

export const automatorBlocksMap = automatorBlocks.mapToObject(b => b.cmd, b => b);