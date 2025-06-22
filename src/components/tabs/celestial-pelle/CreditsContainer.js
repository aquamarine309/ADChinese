import CreditsDisplay from "../../CreditsDisplay.js";

export default {
  name: "CreditsContainer",
  components: {
    CreditsDisplay
  },
  data() {
    return {
      rolling: false,
      scroll: 0,
      audio: null,
      isMuted: false,
    };
  },
  computed: {
    creditStyles() {
      return {
        bottom: `${this.scroll}px`,
        display: this.rolling ? "block" : "none"
      };
    },
    muteStyle() {
      return {
        top: `calc(${this.scroll + 20}px - 100vh)`,
        display: this.rolling ? "block" : "none"
      };
    },
    muteIconClass() {
      return this.isMuted ? "fa-volume-xmark" : "fa-volume-high";
    },
    celestialDisplays() {
      return {
        teresa: Teresa.symbol,
        effarig: Effarig.symbol,
        enslaved: Enslaved.symbol,
        v: V.symbol,
        ra: Ra.symbol,
        laitela: Laitela.symbol,
        pelle: Pelle.symbol
      };
    }
  },
  watch: {
    rolling(newVal, oldVal) {
      if (GameEnd.creditsEverClosed) return;
      if (!oldVal && newVal && this.audio === null) {
        this.audio = new Audio(`../../../../public/audio/credits.mp3`);
        this.audio.play();
      }
    }
  },
  created() {
    // Use a hardcoded 33ms in order to make the end credits scroll smoothly; if the player normally plays
    // at a much slower rate, this causes the credits to have a jumpy-looking scroll. Since this is a setting
    // which persists across new games, we want to make sure we still preserve the old value too
    const oldRate = player.options.updateRate;
    player.options.updateRate = 33;
    GameOptions.refreshUpdateRate();
    player.options.updateRate = oldRate;
  },
  methods: {
    update() {
      const height = (this.$refs.creditsDisplay?.offsetHeight || 0) + innerHeight;
      this.rolling = GameEnd.endState > END_STATE_MARKERS.CREDITS_START;
      this.scroll = (
        Math.clampMax(GameEnd.endState, END_STATE_MARKERS.CREDITS_END) - END_STATE_MARKERS.CREDITS_START
      ) / (END_STATE_MARKERS.SONG_END - END_STATE_MARKERS.CREDITS_START) * height;
      if (this.audio) this.audio.volume = this.isMuted
        ? 0
        : Math.clamp((GameEnd.endState - END_STATE_MARKERS.CREDITS_START), 0, 0.3);
    },
  },
  template: `
  <div
    class="c-credits-container"
    :style="creditStyles"
    data-v-credits-container
  >
    <i
      class="c-mute-button fa-solid"
      :class="muteIconClass"
      :style="muteStyle"
      @click="isMuted = !isMuted"
      data-v-credits-container
    />
    <div
      v-for="(celSymbol, celIndex) in celestialDisplays"
      :key="celIndex + '-end-credit-symbol-disp'"
      class="c-credits-cel-symbol"
      :class="\`c-\${celIndex}-credits\`"
      v-html="celSymbol"
      data-v-credits-container
    />
    <span ref="creditsDisplay">
      <CreditsDisplay />
    </span>
  </div>
  `
};