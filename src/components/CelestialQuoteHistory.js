export default {
  name: "CelestialQuoteHistory",
  props: {
    celestial: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isShown: false,
      name: ""
    };
  },
  computed: {
    color() {
      return this.celestial === "laitela" ? `var(--color-laitela--accent)` : `var(--color-${this.celestial}--base)`;
    }
  },
  methods: {
    update() {
      this.isShown = Celestials[this.celestial].quotes.all.some(x => x.isUnlocked);
      if (this.isShown) this.name = Celestials[this.celestial].displayName;
    },
    show() {
      Quote.showHistory(Celestials[this.celestial].quotes.all);
    },
  },
  template: `
  <button
    v-if="isShown"
    class="c-celestial-quote-history--button"
    :style="{
      '--scoped-cel-color': color
    }"
    @click="show"
    data-v-celestial-quote-history
  >
    {{ name }}语录
  </button>
  `
};