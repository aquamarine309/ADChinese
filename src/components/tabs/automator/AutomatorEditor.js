import AutomatorBlockEditor from "./AutomatorBlockEditor.js";
import AutomatorControls from "./AutomatorControls.js";
import AutomatorTextEditor from "./AutomatorTextEditor.js";

export default {
  name: "AutomatorEditor",
  components: {
    AutomatorBlockEditor,
    AutomatorTextEditor,
    AutomatorControls,
  },
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
  },
  created() {
    this.on$(GAME_EVENT.GAME_LOAD, () => this.onGameLoad());
    this.on$(GAME_EVENT.AUTOMATOR_SAVE_CHANGED, () => this.onGameLoad());
    this.updateCurrentScriptID();
  },
  methods: {
    update() {
      this.automatorType = player.reality.automator.type;
      if (!AutomatorBackend.isOn && AutomatorTextUI.editor && AutomatorData.needsRecompile) {
        AutomatorTextUI.editor.performLint();
      }
    },
    onGameLoad() {
      this.updateCurrentScriptID();
    },
    updateCurrentScriptID() {
      const storedScripts = player.reality.automator.scripts;
      this.currentScriptID = player.reality.automator.state.editorScript;
      // This shouldn't happen if things are loaded in the right order, but might as well be sure.
      if (storedScripts[this.currentScriptID] === undefined) {
        this.currentScriptID = Number(Object.keys(storedScripts)[0]);
        player.reality.automator.state.editorScript = this.currentScriptID;
        AutomatorData.clearUndoData();
      }
      // This may happen if the player has errored textmato scripts and switches to them while in blockmato mode
      if (BlockAutomator.hasUnparsableCommands(this.currentScript) &&
        player.reality.automator.type === AUTOMATOR_TYPE.BLOCK) {
        Modal.message.show(`Some incomplete blocks were unrecognizable - defaulting to text editor.`);

        // AutomatorBackend.changeModes initializes the new editor and savefile state from BlockAutomator.lines, which
        // will be empty if this is running upon game load - this ends up wiping the entire script. So we instead set
        // the new script content external to that method call to keep most of the script intact
        const erroredScript = AutomatorData.currentScriptText();
        AutomatorBackend.changeModes(this.currentScriptID);
        player.reality.automator.scripts[this.currentScriptID].content = erroredScript;
        this.automatorType = AUTOMATOR_TYPE.TEXT;
      }
      this.$nextTick(() => BlockAutomator.updateEditor(this.currentScript));
    },
  },
  template: `
  <div
    class="l-automator-pane"
    data-v-automator-editor
  >
    <AutomatorControls data-v-automator-editor />
    <AutomatorTextEditor
      v-if="isTextAutomator"
      :current-script-id="currentScriptID"
      data-v-automator-editor
    />
    <AutomatorBlockEditor
      v-if="!isTextAutomator"
      data-v-automator-editor
    />
  </div>
  `
};