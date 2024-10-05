import ClassicInfinityDimensionsTab from "./ClassicInfinityDimensionsTab.js";
import ModernInfinityDimensionsTab from "./ModernInfinityDimensionsTab.js";

export default {
  name: "InfinityDimensionsTab",
  components: {
    ClassicInfinityDimensionsTab,
    ModernInfinityDimensionsTab
  },
  computed: {
    activeComponent() {
      return this.$viewModel.newUI
        ? "ModernInfinityDimensionsTab"
        : "ClassicInfinityDimensionsTab";
    }
  },
  template: `
  <component :is="activeComponent" />
  `
};