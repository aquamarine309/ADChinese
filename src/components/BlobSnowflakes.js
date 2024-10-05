import BlobBackground from "./BlobBackground.js";
import BlobSnowflake from "./BlobSnowflake.js";

export default {
  name: "BlobSnowflakes",
  components: {
    BlobSnowflake,
    BlobBackground,
  },
  data() {
    return {
      animateBackground: false,
      count: 0,
      initialized: false,
      bounds: {
        x: 0,
        y: 0
      }
    };
  },
  mounted() {
    this.updateSize();
    window.addEventListener("resize", this.updateSize);
    this.initialized = true;
  },
  destroyed() {
    window.removeEventListener("resize", this.updateSize);
  },
  methods: {
    update() {
      this.animateBackground = player.options.animations.background;
      this.count = player.options.animations.blobSnowflakes;
    },
    updateSize() {
      this.bounds.x = document.documentElement.clientWidth;
      this.bounds.y = document.documentElement.clientHeight;
    }
  },
  template: `
  <div v-if="initialized">
    <svg
      v-if="animateBackground"
      class="c-blob-snowflake-container"
      data-v-blob-snowflakes
    >
      <BlobSnowflake
        v-for="i in count"
        :key="i"
        :bounds="bounds"
      />
    </svg>
    <svg
      v-else
      class="c-blob-background-container"
      data-v-blob-snowflakes
    >
      <BlobBackground
        v-for="i in count"
        :key="i"
        :bounds="bounds"
      />
    </svg>
  </div>
  `
};