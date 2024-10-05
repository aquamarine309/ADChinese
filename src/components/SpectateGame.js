import PrimaryButton from "./PrimaryButton.js";

export default {
  name: "SpectateGame",
  components: { PrimaryButton },
  data() {
    return {
      showSpectate: Boolean
    };
  },
  methods: {
    update() {
      this.showSpectate = GameEnd.endState > END_STATE_MARKERS.SPECTATE_GAME;
      this.endState = GameEnd.endState;
    },
    swap() {
      GameEnd.creditsClosed = !GameEnd.creditsClosed;
      if (!GameEnd.creditsEverClosed) GameEnd.creditsEverClosed = true;
    }
  },
  template: `
  <div
    v-if="showSpectate"
    :key="endState"
  >
    <PrimaryButton
      class="c-swap-button o-primary-btn--modal-close c-modal__close-btn tutorial--glow"
      @click="swap"
      data-v-spectate-game
    >
      <i class="fas fa-sync" />
    </PrimaryButton>
  </div>
  `
};