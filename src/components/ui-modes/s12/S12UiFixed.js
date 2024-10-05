import CelestialQuoteHistoryDisplay from "../../modals/celestial-quotes/CelestialQuoteHistoryDisplay.js";
import CelestialQuoteModal from "../../modals/celestial-quotes/CelestialQuoteModal.js";
import CreditsContainer from "../../tabs/celestial-pelle/CreditsContainer.js";
import FadeAway from "../../tabs/celestial-pelle/FadeAway.js";
import ModalProgressBar from "../../modals/ModalProgressBar.js";
import NewGame from "../../tabs/celestial-pelle/NewGame.js";
import PopupModal from "../../modals/PopupModal.js";
import SpectateGame from "../../SpectateGame.js";

import S12Taskbar from "./S12Taskbar.js";

export default {
  name: "S12UiFixed",
  components: {
    PopupModal,
    ModalProgressBar,
    CelestialQuoteModal,
    CelestialQuoteHistoryDisplay,
    FadeAway,
    CreditsContainer,
    SpectateGame,
    NewGame,
    S12Taskbar,
  },
  data() {
    return {
      ending: false
    };
  },
  computed: {
    view() {
      return this.$viewModel;
    }
  },
  methods: {
    update() {
      this.ending = GameEnd.endState >= END_STATE_MARKERS.FADE_AWAY && !GameEnd.creditsClosed;
    }
  },
  template: `
  <span>
    <div
      class="c-game-ui--fixed"
      data-v-s12-ui-fixed
    >
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
      <FadeAway v-if="ending" />
      <CreditsContainer v-if="ending" />
      <NewGame v-if="ending" />
      <SpectateGame />
    </div>
    <S12Taskbar />
  </span>
  `
};