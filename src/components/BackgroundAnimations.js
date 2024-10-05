import BlobSnowflakes from "./BlobSnowflakes.js";
import TachyonParticles from "./tabs/time-dilation/TachyonParticles.js";

export default {
  name: "BackgroundAnimations",
  components: {
    BlobSnowflakes,
    TachyonParticles
  },
  data() {
    return {
      blob: false,
      animateTachyons: false
    };
  },
  methods: {
    update() {
      this.blob = Theme.currentName() === "S11";
      this.animateTachyons = player.options.animations.tachyonParticles &&
        Tabs.current[this.$viewModel.subtab].name === "Time Dilation";
    }
  },
  template: `
  <div
    id="ui-background-animations"
    class="l-background-animations"
  >
    <BlobSnowflakes v-if="blob" />
    <TachyonParticles v-if="animateTachyons" />
  </div>
  `
};