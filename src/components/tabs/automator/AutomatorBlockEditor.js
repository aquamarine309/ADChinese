import draggable from "../../../../modules/vuedraggable.js";

import AutomatorBlockSingleRow from "./AutomatorBlockSingleRow.js";
import { blockifyTextAutomator } from "../../../core/automator/index.js";

export default {
  name: "AutomatorBlockEditor",
  components: {
    AutomatorBlockSingleRow,
    draggable
  },
  computed: {
    lines: {
      get() {
        return this.$viewModel.tabs.reality.automator.lines;
      },
      set(value) {
        this.$viewModel.tabs.reality.automator.lines = value;
      }
    },
    numberOfLines() {
      return this.lines.reduce((a, l) => a + BlockAutomator.numberOfLinesInBlock(l), 0);
    },
  },
  mounted() {
    BlockAutomator.initialize();
    AutomatorData.recalculateErrors();
    BlockAutomator.editor.scrollTo(0, BlockAutomator.previousScrollPosition);
    BlockAutomator.gutter.style.bottom = `${BlockAutomator.editor.scrollTop}px`;
  },
  methods: {
    update() {
      if (AutomatorBackend.state.followExecution) AutomatorBackend.jumpToActiveLine();
      const targetLine = AutomatorBackend.isOn
        ? BlockAutomator.lineNumberFromBlockID(BlockAutomator.currentBlockId)
        : -1;
      AutomatorHighlighter.updateHighlightedLine(targetLine, LineEnum.Active);
    },
    setPreviousScroll() {
      BlockAutomator.previousScrollPosition = this.$refs.blockEditorElement.scrollTop;
      BlockAutomator.gutter.style.bottom = `${BlockAutomator.editor.scrollTop}px`;
    },
    parseRequest() {
      BlockAutomator.updateIdArray();
      AutomatorData.recalculateErrors();
      BlockAutomator.parseTextFromBlocks();
    },
    updateBlock(block, id) {
      this.lines[this.lines.findIndex(x => x.id === id)] = block;
      this.parseRequest();
    },
    deleteBlock(id) {
      const idx = this.lines.findIndex(x => x.id === id);
      this.lines.splice(idx, 1);
      this.parseRequest();
    },
  },
  template: `
  <div
    class="c-automator-block-editor--container"
    data-v-automator-block-editor
  >
    <div
      ref="editorGutter"
      class="c-automator-block-editor--gutter"
      data-v-automator-block-editor
    >
      <div
        v-for="i in numberOfLines"
        :key="i"
        class="c-automator-block-line-number"
        :style="{
          top: \`\${(i - 1) * 3.45}rem\`
        }"
        data-v-automator-block-editor
      >
        {{ i }}
      </div>
    </div>
    <div
      ref="blockEditorElement"
      class="c-automator-block-editor"
      @scroll="setPreviousScroll()"
      data-v-automator-block-editor
    >
      <draggable
        v-model="lines"
        group="code-blocks"
        class="c-automator-blocks"
        ghost-class="c-automator-block-row-ghost"
        @end="parseRequest"
        data-v-automator-block-editor
      >
        <AutomatorBlockSingleRow
          v-for="(block, lineNum) in lines"
          :key="block.id + 10000 * lineNum"
          :block="block"
          :update-block="updateBlock"
          :delete-block="deleteBlock"
          data-v-automator-block-editor
        />
      </draggable>
    </div>
  </div>
  `
};

export const BlockAutomator = {
  editor: null,
  gutter: null,
  _idArray: [],

  initialize() {
    this.editor = document.getElementsByClassName("c-automator-block-editor")[0];
    this.gutter = document.getElementsByClassName("c-automator-block-editor--gutter")[0];
  },

  get lines() {
    return ui.view.tabs.reality.automator.lines;
  },

  set lines(arr) {
    ui.view.tabs.reality.automator.lines = arr;
    this.updateIdArray();
  },

  get currentBlockId() {
    if (AutomatorBackend.stack.isEmpty) return false;
    return this._idArray[AutomatorBackend.stack.top.lineNumber - 1];
  },

  // _idArray contains a mapping from all text lines to block IDs in the blockmato, where only lines with
  // actual commands have defined values. This means that every time a closing curly brace } occurs, all further
  // line numbers between on block will be one less than the corresponding text line number
  lineNumber(textLine) {
    const skipLines = this._idArray.map((id, index) => (id ? -1 : index + 1)).filter(v => v !== -1);
    return textLine - skipLines.countWhere(line => line <= textLine);
  },

  lineNumberFromBlockID(id) {
    return this.lineNumber(this._idArray.indexOf(id) + 1);
  },

  // This gets called from many places which do block editor error checking for the purpose of a responsive UI, so
  // we use checkID to distinguish between scripts to check. When not given, we assume it's the currently-displayed
  // script; otherwise we need to be careful because we're in the process of changing scripts
  parseTextFromBlocks(checkID) {
    const content = this.parseLines(BlockAutomator.lines).join("\n");
    const automatorID = checkID ?? ui.view.tabs.reality.automator.editorScriptID;
    AutomatorData.recalculateErrors();
    AutomatorBackend.saveScript(automatorID, content);
  },

  updateEditor(scriptText) {
    const lines = blockifyTextAutomator(scriptText).blocks;
    this.lines = lines;
    return lines;
  },

  hasUnparsableCommands(text) {
    const blockified = blockifyTextAutomator(text);
    return blockified.validatedBlocks !== blockified.visitedBlocks;
  },

  generateText(block, indentation = 0) {
    // We add an extra trailing space here and remove double-spaces at the end because this makes some conversion
    // errors slightly less harsh; some errors which wiped entire lines now just fail to parse arguments instead
    let parsed = `${"\t".repeat(indentation)}${block.cmd} `;

    parsed = parsed
      .replace("COMMENT", "//")
      .replace("BLOB", "blob  ");

    if (block.canWait && block.nowait) {
      parsed = parsed.replace(/(\S+)/u, "$1 NOWAIT");
    }
    if (block.respec) parsed += ` RESPEC`;

    const propsToCheck = ["genericInput1", "compOperator", "genericInput2", "singleSelectionInput", "singleTextInput"];
    for (const prop of propsToCheck) {
      if (block[prop]) parsed += ` ${block[prop]}`;
    }

    if (block.cmd === "IF" || block.cmd === "WHILE" || block.cmd === "UNTIL") parsed += " {";

    return parsed.replace("  ", " ");
  },

  parseLines(l, indentation = 0) {
    const lines = [];
    for (let i = 0; i < l.length; i++) {
      lines.push(this.generateText(l[i], indentation));
      if (l[i].cmd === "IF" || l[i].cmd === "WHILE" || l[i].cmd === "UNTIL") {
        lines.push(...this.parseLines(l[i].nest, indentation + 1));
        lines.push(`${"\t".repeat(indentation)}}`);
      }
    }

    return lines;
  },

  blockIdArray(blocks) {
    const output = [];
    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      output.push(b.id);
      if (b.nested) output.push(...this.blockIdArray(b.nest), undefined);
    }
    return output;
  },

  updateIdArray() {
    this._idArray = this.blockIdArray(this.lines);
  },

  numberOfLinesInBlock(block) {
    return block.nested ? Math.max(block.nest.reduce((v, b) => v + this.numberOfLinesInBlock(b), 1), 2) : 1;
  },

  clearEditor() {
    // I genuinely don't understand why this needs to be done asynchronously, but removing the setTimeout makes this
    // method not do anything at all. Even setting the array in the console without the setTimeout works fine.
    setTimeout(() => this.lines = [], 0);
  },

  previousScrollPosition: 0,
};