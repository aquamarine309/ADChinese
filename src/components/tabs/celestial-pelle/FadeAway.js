export default {
  name: "FadeAway",
  data() {
    return {
      opacity: 0
    };
  },
  methods: {
    update() {
      this.opacity = (GameEnd.endState - END_STATE_MARKERS.FADE_AWAY) / 2;
    }
  },
  template: `
  <div
    class="c-background-overlay"
    :style="{
      opacity,
      pointerEvents: opacity > 1 ? 'auto' : 'none'
    }"
    data-v-fade-away
  />
  `
};