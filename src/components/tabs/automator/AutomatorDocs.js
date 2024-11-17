import { AUTOMATOR_TYPE } from "../../../core/automator/automator-backend.js";
import AutomatorBlocks from "./AutomatorBlocks.js";
import AutomatorButton from "./AutomatorButton.js";
import AutomatorDataTransferPage from "./AutomatorDataTransferPage.js";
import AutomatorDefinePage from "./AutomatorDefinePage.js";
import AutomatorDocsCommandList from "./AutomatorDocsCommandList.js";
import AutomatorDocsIntroPage from "./AutomatorDocsIntroPage.js";
import AutomatorDocsTemplateList from "./AutomatorDocsTemplateList.js";
import AutomatorErrorPage from "./AutomatorErrorPage.js";
import AutomatorEventLog from "./AutomatorEventLog.js";
import AutomatorScriptDropdownEntryList from "./AutomatorScriptDropdownEntryList.js";
import ExpandingControlBox from "../../ExpandingControlBox.js";

export const AutomatorPanels = {
  INTRO_PAGE: 0,
  COMMANDS: 1,
  ERRORS: 2,
  EVENTS: 3,
  DATA_TRANSFER: 4,
  CONSTANTS: 5,
  TEMPLATES: 6,
  BLOCKS: 7
};

export default {
  name: "AutomatorDocs",
  components: {
    AutomatorButton,
    AutomatorDocsCommandList,
    AutomatorErrorPage,
    AutomatorEventLog,
    AutomatorDataTransferPage,
    AutomatorBlocks,
    AutomatorDocsIntroPage,
    AutomatorDocsTemplateList,
    AutomatorDefinePage,
    AutomatorScriptDropdownEntryList,
    ExpandingControlBox,
  },
  data() {
    return {
      isBlock: false,
      infoPaneID: 1,
      errorCount: 0,
      editingName: false,
      isNameTooLong: false,
      scripts: [],
      runningScriptID: 0,
      totalChars: 0,
      scriptCount: 0,
      canMakeNewScript: true
    };
  },
  computed: {
    fullScreen: {
      get() {
        return this.$viewModel.tabs.reality.automator.fullScreen;
      },
      set(value) {
        this.$viewModel.tabs.reality.automator.fullScreen = value;
        AutomatorData.isEditorFullscreen = value;
      }
    },
    fullScreenIconClass() {
      return this.fullScreen ? "fa-compress-arrows-alt" : "fa-expand-arrows-alt";
    },
    fullScreenTooltip() {
      return this.fullScreen ? "退出全屏模式" : "打开全屏模式";
    },
    errorTooltip() {
      return `你的脚本有 ${format(this.errorCount)} 个错误。`;
    },
    nameTooltip() {
      return this.isNameTooLong
        ? `脚本名称限制为 ${formatInt(AutomatorData.MAX_ALLOWED_SCRIPT_NAME_LENGTH)} 字符。`
        : "";
    },
    currentScriptID: {
      get() {
        return this.$viewModel.tabs.reality.automator.editorScriptID;
      },
      set(value) {
        this.$viewModel.tabs.reality.automator.editorScriptID = value;
        if (AutomatorTextUI.editor) AutomatorTextUI.editor.performLint();
      }
    },
    currentScriptContent() {
      return player.reality.automator.scripts[this.currentScriptID].content;
    },
    currentScript() {
      return CodeMirror.Doc(this.currentScriptContent, "automato").getValue();
    },
    errorStyle() {
      return {
        "background-color": this.errorCount === 0 ? "" : "red"
      };
    },
    maxTotalChars() {
      return AutomatorData.MAX_ALLOWED_TOTAL_CHARACTERS;
    },
    maxScriptCount() {
      return AutomatorData.MAX_ALLOWED_SCRIPT_COUNT;
    },
    panelEnum() {
      return AutomatorPanels;
    },
    importTooltip() {
      return this.canMakeNewScript
        ? "导入单个自动机脚本或数据"
        : "脚本数量已达到上限";
    },
    currentEditorScriptName() {
      return this.scripts.find(s => s.id === this.currentScriptID).name;
    },
  },
  watch: {
    infoPaneID(newValue) {
      player.reality.automator.currentInfoPane = newValue;
    }
  },
  created() {
    this.on$(GAME_EVENT.GAME_LOAD, () => this.onGameLoad());
    this.on$(GAME_EVENT.AUTOMATOR_SAVE_CHANGED, () => this.onGameLoad());
    this.on$(GAME_EVENT.AUTOMATOR_TYPE_CHANGED, () => this.openMatchingAutomatorTypeDocs());
    this.onGameLoad();
  },
  destroyed() {
    this.fullScreen = false;
  },
  methods: {
    update() {
      this.isBlock = player.reality.automator.type === AUTOMATOR_TYPE.BLOCK;
      this.infoPaneID = player.reality.automator.currentInfoPane;
      this.errorCount = AutomatorData.currentErrors().length;
      this.runningScriptID = AutomatorBackend.state.topLevelScript;
      this.totalChars = AutomatorData.totalScriptCharacters();
      this.scriptCount = Object.keys(player.reality.automator.scripts).length;
      this.canMakeNewScript = this.scriptCount < this.maxScriptCount;
      this.currentScriptID = player.reality.automator.state.editorScript;
    },
    exportScript() {
      const toExport = AutomatorBackend.exportCurrentScriptContents();
      if (toExport) {
        copyToClipboard(toExport);
        GameUI.notify.automator("当前自动机脚本已导出到剪贴板");
      } else {
        GameUI.notify.error("Could not export blank Automator script!");
      }
    },
    importScript() {
      if (!this.canMakeNewScript) return;
      Modal.importScriptData.show();
    },
    onGameLoad() {
      this.updateCurrentScriptID();
      this.updateScriptList();
      this.fixAutomatorTypeDocs();
    },
    updateScriptList() {
      this.scripts = Object.values(player.reality.automator.scripts).map(script => ({
        id: script.id,
        name: script.name,
      }));
    },
    updateCurrentScriptID() {
      AutomatorData.recalculateErrors();
      const storedScripts = player.reality.automator.scripts;
      this.currentScriptID = player.reality.automator.state.editorScript;
      // This shouldn't happen if things are loaded in the right order, but might as well be sure.
      if (storedScripts[this.currentScriptID] === undefined) {
        this.currentScriptID = Number(Object.keys(storedScripts)[0]);
        player.reality.automator.state.editorScript = this.currentScriptID;
        AutomatorData.clearUndoData();
      }

      // This gets checked whenever the editor pane is foricibly changed to a different script, which may or may not
      // have block-parsable commands. It additionally also gets checked on new script creation, where we need to
      // suppress the error modal instead
      if (this.isBlock && BlockAutomator.hasUnparsableCommands(this.currentScript) && this.currentScript !== "") {
        AutomatorBackend.changeModes(this.currentScriptID);
        Modal.message.show("Some script commands were unrecognizable - defaulting to text editor.");
      }

      this.$nextTick(() => {
        BlockAutomator.updateEditor(this.currentScript);
        if (!this.isBlock && AutomatorTextUI.editor) AutomatorTextUI.editor.performLint();
      });
    },
    fixAutomatorTypeDocs() {
      const automator = player.reality.automator;
      if (automator.currentInfoPane === AutomatorPanels.COMMANDS && automator.type === AUTOMATOR_TYPE.BLOCK) {
        this.openMatchingAutomatorTypeDocs();
      }
      if (automator.currentInfoPane === AutomatorPanels.BLOCKS && automator.type === AUTOMATOR_TYPE.TEXT) {
        this.openMatchingAutomatorTypeDocs();
      }
    },
    openMatchingAutomatorTypeDocs() {
      const automator = player.reality.automator;
      automator.currentInfoPane = automator.type === AUTOMATOR_TYPE.BLOCK
        ? AutomatorPanels.BLOCKS
        : AutomatorPanels.COMMANDS;
    },
    rename() {
      this.editingName = true;
      this.$nextTick(() => {
        this.updateCurrentScriptID();
        this.$refs.renameInput.value = player.reality.automator.scripts[this.currentScriptID].name;
        this.$refs.renameInput.focus();
      });
    },
    deleteScript() {
      Modal.automatorScriptDelete.show({ scriptID: this.currentScriptID });
    },
    nameEdited() {
      // Trim off leading and trailing whitespace
      const trimmed = this.$refs.renameInput.value.match(/^\s*(.*?)\s*$/u);
      let newName = "";
      if (trimmed.length === 2 && trimmed[1].length > 0) newName = trimmed[1];

      if (newName.length > AutomatorData.MAX_ALLOWED_SCRIPT_NAME_LENGTH) {
        this.isNameTooLong = true;
        return;
      }
      this.isNameTooLong = false;
      player.reality.automator.scripts[this.currentScriptID].name = newName;
      this.updateScriptList();
      this.$nextTick(() => this.editingName = false);
    },
    activePanelClass(id) {
      return {
        "c-automator__button--active": this.infoPaneID === id,
      };
    }
  },
  template: `
  <div
    class="l-automator-pane"
    data-v-automator-docs
  >
    <div
      class="c-automator__controls l-automator__controls"
      data-v-automator-docs
    >
      <div
        class="l-automator-button-row"
        data-v-automator-docs
      >
        <AutomatorButton
          v-tooltip="'Automator Introduction'"
          class="fa-circle-info"
          :class="activePanelClass(panelEnum.INTRO_PAGE)"
          @click="infoPaneID = panelEnum.INTRO_PAGE"
          data-v-automator-docs
        />
        <AutomatorButton
          v-tooltip="'Scripting Information'"
          class="fa-list"
          :class="activePanelClass(panelEnum.COMMANDS)"
          @click="infoPaneID = panelEnum.COMMANDS"
          data-v-automator-docs
        />
        <AutomatorButton
          v-tooltip="errorTooltip"
          :style="errorStyle"
          class="fa-exclamation-triangle"
          :class="activePanelClass(panelEnum.ERRORS)"
          @click="infoPaneID = panelEnum.ERRORS"
          data-v-automator-docs
        />
        <AutomatorButton
          v-tooltip="'Extended Data Transfer'"
          class="fa-window-restore"
          :class="activePanelClass(panelEnum.DATA_TRANSFER)"
          @click="infoPaneID = panelEnum.DATA_TRANSFER"
          data-v-automator-docs
        />
        <AutomatorButton
          v-tooltip="'View recently executed commands'"
          class="fa-eye"
          :class="activePanelClass(panelEnum.EVENTS)"
          @click="infoPaneID = panelEnum.EVENTS"
          data-v-automator-docs
        />
        <AutomatorButton
          v-tooltip="'Modify defined constants'"
          class="fa-book"
          :class="activePanelClass(panelEnum.CONSTANTS)"
          @click="infoPaneID = panelEnum.CONSTANTS"
          data-v-automator-docs
        />
        <AutomatorButton
          v-tooltip="'Template Creator List'"
          class="fa-file-code"
          :class="activePanelClass(panelEnum.TEMPLATES)"
          @click="infoPaneID = panelEnum.TEMPLATES"
          data-v-automator-docs
        />
        <AutomatorButton
          v-if="isBlock"
          v-tooltip="'Command menu for Block editor mode'"
          class="fa-cubes"
          :class="activePanelClass(panelEnum.BLOCKS)"
          @click="infoPaneID = panelEnum.BLOCKS"
          data-v-automator-docs
        />
        <span
          v-if="fullScreen"
          class="c-automator__status-text c-automator__status-text--small"
          :class="{ 'c-automator__status-text--error' : totalChars > maxTotalChars }"
          data-v-automator-docs
        >
          所有脚本：{{ formatInt(totalChars) }}/{{ formatInt(maxTotalChars) }}
        </span>
        <AutomatorButton
          v-tooltip="fullScreenTooltip"
          :class="fullScreenIconClass"
          class="l-automator__expand-corner"
          @click="fullScreen = !fullScreen"
          data-v-automator-docs
        />
      </div>
      <div
        class="l-automator-button-row"
        data-v-automator-docs
      >
        <AutomatorButton
          v-tooltip="'Export single automator script'"
          class="fa-file-export"
          @click="exportScript"
          data-v-automator-docs
        />
        <AutomatorButton
          v-tooltip="importTooltip"
          class="fa-file-import"
          :class="{ 'c-automator__status-text--error' : !canMakeNewScript }"
          @click="importScript"
          data-v-automator-docs
        />
        <div
          class="l-automator__script-names"
          data-v-automator-docs
        >
          <template v-if="!editingName">
            <ExpandingControlBox
              class="l-automator__scripts-dropdown"
              :auto-close="true"
              data-v-automator-docs
            >
              <template #header>
                <div
                  class="c-automator-docs-script-select"
                  data-v-automator-docs
                >
                  ▼ 当前脚本：{{ currentEditorScriptName }}
                </div>
              </template>
              <template #dropdown>
                <AutomatorScriptDropdownEntryList
                  :key="scriptCount"
                  data-v-automator-docs
                />
              </template>
            </ExpandingControlBox>
            <AutomatorButton
              v-tooltip="'Rename script'"
              class="far fa-edit"
              @click="rename"
              data-v-automator-docs
            />
          </template>
          <input
            v-else
            ref="renameInput"
            v-tooltip="nameTooltip"
            class="l-automator__rename-input c-automator__rename-input"
            :class="{ 'c-long-name-box' : isNameTooLong }"
            @blur="nameEdited"
            @keyup.enter="$refs.renameInput.blur()"
            data-v-automator-docs
          >
        </div>
        <AutomatorButton
          v-tooltip="'Delete this script'"
          class="fas fa-trash"
          @click="deleteScript"
          data-v-automator-docs
        />
      </div>
    </div>
    <div
      class="c-automator-docs l-automator-pane__content"
      data-v-automator-docs
    >
      <AutomatorDocsIntroPage v-if="infoPaneID === panelEnum.INTRO_PAGE" data-v-automator-docs />
      <AutomatorDocsCommandList v-else-if="infoPaneID === panelEnum.COMMANDS" data-v-automator-docs />
      <AutomatorErrorPage v-else-if="infoPaneID === panelEnum.ERRORS" data-v-automator-docs />
      <AutomatorEventLog v-else-if="infoPaneID === panelEnum.EVENTS" data-v-automator-docs />
      <AutomatorDataTransferPage v-else-if="infoPaneID === panelEnum.DATA_TRANSFER" data-v-automator-docs />
      <AutomatorDefinePage v-else-if="infoPaneID === panelEnum.CONSTANTS" data-v-automator-docs />
      <AutomatorDocsTemplateList v-else-if="infoPaneID === panelEnum.TEMPLATES" data-v-automator-docs />
      <AutomatorBlocks v-else-if="infoPaneID === panelEnum.BLOCKS" data-v-automator-docs />
    </div>
  </div>
  `
};