import ClassicTimeDimensionsTab from "./ClassicTimeDimensionsTab.js";
import ModernTimeDimensionsTab from "./ModernTimeDimensionsTab.js";

export default {
  name: "TimeDimensionsTab",
  components: {
    ClassicTimeDimensionsTab,
    ModernTimeDimensionsTab
  },
  computed: {
    activeComponent() {
      return this.$viewModel.newUI
        ? "ModernTimeDimensionsTab"
        : "ClassicTimeDimensionsTab";
    }
  },
  template: `
  <component :is="activeComponent" />
  `
};