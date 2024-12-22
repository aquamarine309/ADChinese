import { S12Windows } from "./windows.js";

export default {
  name: "TaskbarIcon",
  props: {
    tab: {
      type: Object,
      required: true
    },
    tabPosition: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isAvailable: true,
      isHidden: false,
      hasNotification: false,
      S12Windows,
    };
  },
  computed: {
    isCurrentTab() {
      return this.tab.isOpen && !S12Windows.isMinimised;
    },
    tabName() {
      return this.tab.name;
    }
  },
  methods: {
    update() {
      this.isAvailable = this.tab.isAvailable;
      this.isHidden = this.tab.isHidden;
      this.hasNotification = this.tab.hasNotification;
      S12Windows.tabs.tabButtonPositions[this.tab.id] = this.getSubtabsPosition();
    },
    getSubtabsPosition() {
      if (!this.$refs.taskbarIcon) return "0px";
      return this.$refs.taskbarIcon.offsetLeft + this.$refs.taskbarIcon.offsetWidth / 2;
    },
  },
  template: `
  <div
    ref="taskbarIcon"
    :class="{
      'c-taskbar-icon': true,
      'c-taskbar-icon--active': isCurrentTab
    }"
    :title="tab.name"
    @mouseenter="S12Windows.tabs.setHoveringTab(tab)"
    @mouseleave="S12Windows.tabs.unsetHoveringTab()"
    @click="tab.show(true); S12Windows.isMinimised = false; S12Windows.tabs.unsetHoveringTab(true);"
    data-v-taskbar-icon
  >
    <img
      class="c-taskbar-icon__image"
      :src="\`./public/images/s12/\${tab.key}.png\`"
      data-v-taskbar-icon
    >
    <div
      v-if="hasNotification"
      class="fas fa-circle-exclamation l-notification-icon"
    />
  </div>
  `
};