import { blockifyTextAutomator } from "../../../core/automator/index.js";

export default {
  name: "AutomatorModeSwitch",
  data() {
    return {
      automatorType: 0,
    };
  },
  computed: {
    currentScriptID: {
      get() {
        return this.$viewModel.tabs.reality.automator.editorScriptID;
      },
      set(value) {
        this.$viewModel.tabs.reality.automator.editorScriptID = value;
      }
    },
    currentScriptContent() {
      return player.reality.automator.scripts[this.currentScriptID].content;
    },
    currentScript() {
      return CodeMirror.Doc(this.currentScriptContent, "automato").getValue();
    },
    isTextAutomator() {
      return this.automatorType === AUTOMATOR_TYPE.TEXT;
    },
    automatorModeTooltip() {
      if (this.automatorType === AUTOMATOR_TYPE.BLOCK) return "Switch to the text editor";
      return "Switch to the block editor";
    },
    tutorialClass() {
      return {
        "tutorial--glow": ui.view.tutorialState === TUTORIAL_STATE.AUTOMATOR && ui.view.tutorialActive
      };
    },
  },
  created() {
    this.on$(GAME_EVENT.GAME_LOAD, () => this.onGameLoad());
    this.on$(GAME_EVENT.AUTOMATOR_SAVE_CHANGED, () => this.onGameLoad());
    this.updateCurrentScriptID();
  },
  methods: {
    update() {
      this.automatorType = player.reality.automator.type;
    },
    onGameLoad() {
      this.updateCurrentScriptID();
    },
    updateCurrentScriptID() {
      const storedScripts = player.reality.automator.scripts;
      this.currentScriptID = player.reality.automator.state.editorScript;
      // This shouldn't happen if things are loaded in the right order, but might as well be sure.
      if (storedScripts[this.currentScriptID] === undefined) {
        this.currentScriptID = Object.keys(storedScripts)[0];
        player.reality.automator.state.editorScript = this.currentScriptID;
        AutomatorData.clearUndoData();
      }
      if (BlockAutomator.hasUnparsableCommands(this.currentScript) &&
        player.reality.automator.type === AUTOMATOR_TYPE.BLOCK) {
        Modal.message.show(`Some script commands were unrecognizable - defaulting to text editor.`);
        AutomatorBackend.changeModes(this.currentScriptID);
      }
      this.$nextTick(() => BlockAutomator.updateEditor(this.currentScript));
    },
    toggleAutomatorMode() {
      const currScript = player.reality.automator.scripts[this.currentScriptID].content;
      const hasTextErrors = this.automatorType === AUTOMATOR_TYPE.TEXT &&
        (BlockAutomator.hasUnparsableCommands(currScript) || AutomatorData.currentErrors().length !== 0);

      if (player.options.confirmations.switchAutomatorMode && (hasTextErrors || AutomatorBackend.isRunning)) {
        const blockified = blockifyTextAutomator(currScript);

        // We explicitly pass in 0 for lostBlocks if converting from block to text since nothing is ever lost in that
        // conversion direction
        const lostBlocks = this.automatorType === AUTOMATOR_TYPE.TEXT
          ? blockified.validatedBlocks - blockified.visitedBlocks
          : 0;
        Modal.switchAutomatorEditorMode.show({
          callBack: () => this.$recompute("currentScriptContent"),
          lostBlocks,
        });
      } else {
        AutomatorBackend.changeModes(this.currentScriptID);
      }
      AutomatorData.clearUndoData();
    }
  },
  template: `
  <button
    v-tooltip="{
      content: automatorModeTooltip,
      hideOnTargetClick: false
    }"
    :class="{
      'c-slider-toggle-button': true,
      'c-slider-toggle-button--right': isTextAutomator,
      ...tutorialClass
    }"
    @click="toggleAutomatorMode"
    data-v-automator-mode-switch
  >
    <i class="fas fa-cubes" />
    <i class="fas fa-code" />
  </button>
  `
};