import SplitPane from "../../../../modules/vue-split-pane.js";

import AutomatorDocs from "./AutomatorDocs.js";
import AutomatorEditor from "./AutomatorEditor.js";
import AutomatorPointsList from "./AutomatorPointsList.js";

export default {
  name: "AutomatorTab",
  components: {
    SplitPane,
    AutomatorEditor,
    AutomatorPointsList,
    AutomatorDocs
  },
  data() {
    return {
      automatorUnlocked: false,
      interval: 0,
      currentChars: 0,
      totalChars: 0,
      withinLimit: false,
    };
  },
  computed: {
    fullScreen() {
      return this.$viewModel.tabs.reality.automator.fullScreen;
    },
    tabClass() {
      if (!this.fullScreen) return undefined;
      return "c-automator-tab--full-screen";
    },
    fullScreenIconClass() {
      return this.fullScreen ? "fa-compress-arrows-alt" : "fa-expand-arrows-alt";
    },
    intervalText() {
      const speedupText = `每次现实使其运行速度提高 ${formatPercents(0.006, 1)}，最高可达每秒 ${formatInt(1000)}.`;
      return this.interval === 1
        ? `自动机正以最大速度运行
（每秒 ${formatInt(1000)} 条指令）`
        : `自动机每秒运行 ${format(1000 / this.interval, 2, 2)} 条指令
          ${speedupText}`;
    },
    maxScriptChars() {
      return AutomatorData.MAX_ALLOWED_SCRIPT_CHARACTERS;
    },
    maxTotalChars() {
      return AutomatorData.MAX_ALLOWED_TOTAL_CHARACTERS;
    },
  },
  methods: {
    update() {
      this.automatorUnlocked = Player.automatorUnlocked;
      this.interval = AutomatorBackend.currentInterval;
      this.currentChars = AutomatorData.singleScriptCharacters();
      this.totalChars = AutomatorData.totalScriptCharacters();
      this.withinLimit = AutomatorData.isWithinLimit();
    }
  },
  template: `
  <div
    :class="tabClass"
    class="c-automator-tab l-automator-tab"
    data-v-automator-tab
  >
    <div v-if="automatorUnlocked">
      <div>
        {{ intervalText }}
      </div>
      <span
        :class="{ 'c-overlimit': currentChars > maxScriptChars }"
        data-v-automator-tab
      >
        此脚本：{{ formatInt(currentChars) }} / {{ formatInt(maxScriptChars) }}
      </span>
      |
      <span
        :class="{ 'c-overlimit': totalChars > maxTotalChars }"
        data-v-automator-tab
      >
        所有脚本：{{ formatInt(totalChars) }} / {{ formatInt(maxTotalChars) }}
      </span>
      <br>
      <span
        v-if="!withinLimit"
        class="c-overlimit"
        data-v-automator-tab
      >
        （因字符数量超过限制，无法保存你所做的修改！)
      </span>
      <div
        class="c-automator-split-pane"
        data-v-automator-tab
      >
        <SplitPane
          :min-percent="44"
          :default-percent="50"
          split="vertical"
          data-v-automator-tab
        >
          <template #paneL>
            <AutomatorEditor />
          </template>
          <template #paneR>
            <AutomatorDocs />
          </template>
        </SplitPane>
      </div>
    </div>
    <AutomatorPointsList v-else />
  </div>
  `
};