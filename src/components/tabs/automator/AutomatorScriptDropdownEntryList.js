export default {
  name: "AutomatorScriptDropdownEntryList",
  data() {
    return {
      isBlock: false,
      currentScriptID: 0,
      runningScriptID: 0,
      isRunning: false,
      isPaused: false,
      canMakeNewScript: false,
    };
  },
  computed: {
    scripts() {
      return Object.values(player.reality.automator.scripts).map(script => ({
        id: script.id,
        name: script.name,
      }));
    },
    currentScriptContent() {
      return player.reality.automator.scripts[this.currentScriptID].content;
    },
    currentScript() {
      return CodeMirror.Doc(this.currentScriptContent, "automato").getValue();
    },
    scriptCount() {
      return Object.keys(player.reality.automator.scripts).length;
    },
    maxScriptCount() {
      return AutomatorData.MAX_ALLOWED_SCRIPT_COUNT;
    },
  },
  created() {
    this.currentScriptID = player.reality.automator.state.editorScript;
    // Deleted script names potentially persist within the vue component unless we clear them
    this.on$(GAME_EVENT.AUTOMATOR_SAVE_CHANGED, () => {
      this.$recompute("scripts");
    });
  },
  methods: {
    update() {
      this.isBlock = player.reality.automator.type === AUTOMATOR_TYPE.BLOCK;
      this.runningScriptID = AutomatorBackend.state.topLevelScript;
      this.isRunning = AutomatorBackend.isRunning;
      this.isPaused = AutomatorBackend.isOn && !AutomatorBackend.isRunning;
      this.canMakeNewScript = this.scriptCount < this.maxScriptCount;
    },
    changeScriptID(newID) {
      this.currentScriptID = newID;
      player.reality.automator.state.editorScript = newID;
      this.updateCurrentScriptID();
    },
    createNewScript() {
      const newScript = AutomatorBackend.newScript();
      player.reality.automator.state.editorScript = newScript.id;
      this.updateCurrentScriptID();
      this.$parent.$parent.rename();
    },
    updateCurrentScriptID() {
      const storedScripts = player.reality.automator.scripts;
      this.currentScriptID = player.reality.automator.state.editorScript;
      // This shouldn't happen if things are loaded in the right order, but might as well be sure.
      if (storedScripts[this.currentScriptID] === undefined) {
        this.currentScriptID = Number(Object.keys(storedScripts)[0]);
        player.reality.automator.state.editorScript = this.currentScriptID;
      }
      if (this.isBlock) this.$nextTick(() => BlockAutomator.updateEditor(this.currentScript));
      this.$parent.openRequest = false;
      AutomatorData.clearUndoData();
    },
    dropdownLabel(script) {
      const labels = [];
      if (script.id === this.currentScriptID) labels.push("正在查看");
      if (script.id === this.runningScriptID) {
        if (this.isRunning) labels.push("正在进行");
        else if (this.isPaused) labels.push("paused");
      }
      const status = labels.length ? `（${labels.join("，")}）` : "";
      return `${script.name} ${status}`;
    },
    labelClassObject(id) {
      const highlightRunning = this.isRunning || this.isPaused;
      return {
        "c-automator-docs-script-select": true,
        "l-active-script": id === this.runningScriptID && highlightRunning,
        "l-selected-script": id === this.currentScriptID && (id !== this.runningScriptID || !highlightRunning),
      };
    }
  },
  template: `
  <div :key="scripts.length">
    <div
      v-for="script in scripts"
      :key="script.id"
      class="l-script-option c-script-option-hover-effect"
      :class="labelClassObject(script.id)"
      @click="changeScriptID(script.id)"
      data-v-automator-script-dropdown-entry-list
    >
      {{ dropdownLabel(script) }}
    </div>
    <div
      v-if="canMakeNewScript"
      class="l-create-script c-automator-docs-script-select c-script-option-hover-effect"
      @click="createNewScript()"
      data-v-automator-script-dropdown-entry-list
    >
      <i>创建一个新脚本 （已有 {{ formatInt(scriptCount) }} / {{ formatInt(maxScriptCount) }}）</i>
    </div>
    <div
      v-else
      class="l-create-script c-automator-docs-script-select l-max-scripts"
      data-v-automator-script-dropdown-entry-list
    >
      <i>你最多只能有 {{ formatInt(maxScriptCount) }} 个脚本！</i>
    </div>
  </div>
  `
};