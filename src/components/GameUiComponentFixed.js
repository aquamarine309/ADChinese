import CelestialQuoteHistoryDisplay from "./modals/celestial-quotes/CelestialQuoteHistoryDisplay.js";
import CelestialQuoteModal from "./modals/celestial-quotes/CelestialQuoteModal.js";
import CreditsContainer from "./tabs/celestial-pelle/CreditsContainer.js";
import FadeAway from "./tabs/celestial-pelle/FadeAway.js";
import HowToPlay from "./HowToPlay.js";
import ModalProgressBar from "./modals/ModalProgressBar.js";
import ModernSidebar from "./ui-modes/modern/ModernSidebar.js";
import NewGame from "./tabs/celestial-pelle/NewGame.js";
import PopupModal from "./modals/PopupModal.js";
import SaveTimer from "./SaveTimer.js";
import SpectateGame from "./SpectateGame.js";
import SpeedrunStatus from "./SpeedrunStatus.js";
import TimeTheoremShop from "./tabs/time-studies/tt-shop/TimeTheoremShop.js";

export default {
  name: "GameUiComponentFixed",
  components: {
    HowToPlay,
    TimeTheoremShop,
    ModernSidebar,
    SaveTimer,
    SpeedrunStatus,
    PopupModal,
    ModalProgressBar,
    CelestialQuoteModal,
    CelestialQuoteHistoryDisplay,
    FadeAway,
    CreditsContainer,
    SpectateGame,
    NewGame
  },
  data() {
    return {
      ending: false
    };
  },
  computed: {
    view() {
      return this.$viewModel;
    },
    hideIfMatoFullscreen() {
      return {
        visibility: ui.view.tabs.reality.automator.fullScreen ? "hidden" : "visible"
      };
    }
  },
  methods: {
    update() {
      this.ending = GameEnd.endState >= END_STATE_MARKERS.FADE_AWAY && !GameEnd.creditsClosed;
    }
  },
  template: `
  <!-- Hide the button if the automator is in fullscreen mode: Nothing here needs to be visible during fullscreen -->
  <div
    id="ui-fixed"
    class="c-game-ui--fixed"
    data-v-game-ui-component-fixed
  >
    <div
      id="notification-container"
      class="l-notification-container"
    />
    <HowToPlay :style="hideIfMatoFullscreen" />
    <TimeTheoremShop
      v-if="view.subtab === 'studies'"
      class="l-time-studies-tab__tt-shop"
    />
    <ModernSidebar
      v-if="view.newUI && view.theme !== 'S12'"
      :style="hideIfMatoFullscreen"
    />
    <SaveTimer :style="hideIfMatoFullscreen" />
    <SpeedrunStatus :style="hideIfMatoFullscreen" />
    <template v-if="view.theme !== 'S12'">
      <ModalProgressBar v-if="view.modal.progressBar" />
      <CelestialQuoteModal
        v-else-if="view.quotes.current"
        :quote="view.quotes.current"
      />
      <CelestialQuoteHistoryDisplay
        v-else-if="view.quotes.history"
        :quotes="view.quotes.history"
      />
      <PopupModal
        v-else-if="view.modal.current"
        :modal="view.modal.current"
      />
      <ModalProgressBar v-if="view.modal.progressBar" />
      <FadeAway v-if="ending" />
      <CreditsContainer v-if="ending" />
      <NewGame v-if="ending" />
      <SpectateGame />
    </template>
  </div>
  `
};