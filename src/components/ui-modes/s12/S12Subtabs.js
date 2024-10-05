import { S12Windows } from "./windows.js";

export default {
  name: "S12Subtabs",
  props: {
    tab: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      isAvailable: true,
      isHidden: false,
      subtabVisibilities: [],
      tabName: "",
      S12Windows,
      windowWidth: 0,
      left: "0px",
      useCompact: false,
    };
  },
  methods: {
    update() {
      this.isAvailable = this.tab.isAvailable;
      this.isHidden = this.tab.isHidden;
      this.subtabVisibilities = this.tab.subtabs.map(x => x.isAvailable);
      this.windowWidth = window.innerWidth;
      this.useCompact = this.subtabVisibilities.reduce((a, v) => a + v) * 180 > window.innerWidth - 10;

      this.left = this.getSubtabsPosition();
    },
    isCurrentSubtab(id) {
      return player.options.lastOpenSubtab[this.tab.id] === id && !S12Windows.isMinimised;
    },
    getSubtabsPosition() {
      if (!this.$refs.subtabs) return "0px";
      const centerPt = S12Windows.tabs.tabButtonPositions[this.tab.id];
      const subtabsWidth = this.$refs.subtabs.offsetWidth;
      const minLeft = 5 + subtabsWidth / 2, maxLeft = this.windowWidth - minLeft;
      // Reference isAvailable and isHidden so this gets updated correctly
      return (this.isAvailable, this.isHidden, `${Math.clamp(centerPt, minLeft, maxLeft)}px`);
    },
  },
  template: `
  <div
    ref="subtabs"
    class="c-s12-subtabs"
    :class="{
      'c-s12-subtabs--show': S12Windows.tabs.hoveringTab === tab.id,
      'c-s12-subtabs--compact': useCompact,
    }"
    :style="{ left }"
    @mouseenter="S12Windows.tabs.setHoveringTab(tab)"
    @mouseleave="S12Windows.tabs.unsetHoveringTab()"
    data-v-s12-subtabs
  >
    <template
      v-for="(subtab, index) in tab.subtabs"
    >
      <div
        v-if="subtabVisibilities[index]"
        :key="index"
        class="c-s12-subtab-btn"
        :class="{ 'c-s12-subtab-btn--active': isCurrentSubtab(subtab.id) }"
        @click="subtab.show(true); S12Windows.isMinimised = false; S12Windows.tabs.unsetHoveringTab(true);"
        data-v-s12-subtabs
      >
        <span
          class="c-s12-subtab-btn__text"
          data-v-s12-subtabs
        >
          <span
            v-if="useCompact"
            class="c-s12-subtab-btn__symbol--small"
            v-html="subtab.symbol"
            data-v-s12-subtabs
          />
          {{ subtab.name }}
        </span>
        <span
          v-if="!useCompact"
          class="c-s12-subtab-btn__symbol"
          v-html="subtab.symbol"
          data-v-s12-subtabs
        />
        <div
          v-if="subtab.hasNotification"
          class="fas fa-circle-exclamation l-notification-icon"
        />
      </div>
    </template>
  </div>
  `
};