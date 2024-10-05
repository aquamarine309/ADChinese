import ClassicAntimatterDimensionsTab from "./ClassicAntimatterDimensionsTab.js";
import ModernAntimatterDimensionsTab from "./ModernAntimatterDimensionsTab.js";

export default {
  name: "AntimatterDimensionsTab",
  components: {
    ClassicAntimatterDimensionsTab,
    ModernAntimatterDimensionsTab
  },
  computed: {
    activeComponent() {
      return this.$viewModel.newUI
        ? "ModernAntimatterDimensionsTab"
        : "ClassicAntimatterDimensionsTab";
    }
  },
  template: `
  <component :is="activeComponent" />
  `
};