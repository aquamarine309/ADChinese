import S12Subtabs from "./S12Subtabs.js";
import TaskbarIcon from "./TaskbarIcon.js";

import { S12Windows } from "./windows.js";

const startupSound = new Audio("../../../../public/audio/s12-startup.mp3");
export default {
  name: "S12Taskbar",
  components: {
    TaskbarIcon,
    S12Subtabs,
  },
  data() {
    return {
      isHidden: false,
      tabVisibilities: [],
      S12Windows,
      startupSound,
    };
  },
  computed: {
    tabs: () => Tabs.newUI
  },
  methods: {
    update() {
      this.isHidden = AutomatorData.isEditorFullscreen;
      this.tabVisibilities = Tabs.newUI.map(x => !x.isHidden && x.isAvailable);
    },
  },
  template: `
  <span
    v-if="!isHidden"
  >
    <div
      class="c-taskbar"
      data-v-s12-taskbar
    >
      <img
        class="c-start-icon"
        src="./public/images/s12/win7-start-menu-inactive.png"
        @click="startupSound.play()"
        data-v-s12-taskbar
      >
      <template
        v-for="(tab, tabPosition) in tabs"
      >
        <TaskbarIcon
          v-if="tabVisibilities[tabPosition]"
          :key="tab.name"
          :tab="tab"
          :tab-position="tabPosition"
        />
      </template>
      <div
        class="c-s12-show-desktop"
        @click="S12Windows.isMinimised = true;"
        data-v-s12-taskbar
      />
    </div>
    <template
      v-for="(tab, tabPosition) in tabs"
    >
      <S12Subtabs
        v-if="tabVisibilities[tabPosition]"
        :key="tab.name"
        :tab="tab"
      />
    </template>
  </span>
  `
};