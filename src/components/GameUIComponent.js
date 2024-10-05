import BackgroundAnimations from "./BackgroundAnimations.js";
import ClassicUi from "./ui-modes/classic/ClassicUi.js";
import GameUiComponentFixed from "./GameUiComponentFixed.js";
import ModernUi from "./ui-modes/modern/ModernUi.js";
import TabComponents from "./tabs/index.js";

import S12DesktopIcons from "./ui-modes/s12/DesktopIcons.js";
import S12Ui from "./ui-modes/s12/S12Ui.js";
import S12UiFixed from "./ui-modes/s12/S12UiFixed.js";

export default {
  name: "GameUIComponent",
  components: {
    ...TabComponents,
    ClassicUi,
    ModernUi,
    GameUiComponentFixed,
    BackgroundAnimations,
    S12Ui,
    S12UiFixed,
    S12DesktopIcons,
  },
  computed: {
    view() {
      return this.$viewModel;
    },
    isThemeS12() {
      return this.view.theme === "S12";
    },
    uiLayout() {
      if (this.isThemeS12) return "S12Ui";
      return this.view.newUI ? "ModernUi" : "ClassicUi";
    },
    containerClass() {
      return this.view.newUI ? "new-ui" : "old-ui";
    },
    page() {
      const subtab = Tabs.current[this.$viewModel.subtab];
      return subtab.config.component;
    },
    themeCss() {
      return `./public/stylesheets/theme-${this.view.theme}.css`;
    }
  },
  template: `
  <div
    v-if="view.initialized"
    id="ui-container"
    :class="containerClass"
    class="ui-wrapper"
    data-v-game-ui-component
  >
    <div
      id="ui"
      class="c-game-ui"
    >
      <component :is="uiLayout">
        <component
          :is="page"
          class="c-game-tab"
        />
      </component>
      <S12DesktopIcons v-if="isThemeS12" />
      <link
        v-if="view.theme !== 'Normal'"
        type="text/css"
        rel="stylesheet"
        :href="themeCss"
      >
    </div>
    <GameUiComponentFixed v-if="!isThemeS12" />
    <BackgroundAnimations v-if="!isThemeS12" />
    <S12UiFixed v-if="isThemeS12" />
  </div>
  `
};