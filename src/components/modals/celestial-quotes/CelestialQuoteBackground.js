export default {
  name: "CelestialQuoteBackground",
  props: {
    celestialSymbols: {
      // Array elements are String
      type: Array,
      required: true
    },
    celestials: {
      // Array elements are [String, Number]
      type: Array,
      required: true
    },
    primary: {
      type: Boolean,
      required: true
    },
  },
  computed: {
    modalClass() {
      return {
        "l-modal-celestial-quote": true,
      };
    },
  },
  methods: {
    styleObject(celEntry, opac, isText) {
      const baseCol = `var(--color-${celEntry[0]}--base)`;
      if (celEntry[0] === "laitela") {
        return {
          color: `var(--color-${celEntry[0]}--accent)`,
          background: isText ? undefined : baseCol,
          opacity: opac * celEntry[1]
        };
      }
      return {
        color: baseCol,
        opacity: opac * celEntry[1]
      };
    },
  },
  template: `
  <div
    :class="modalClass"
    data-v-celestial-quote-background
  >
    <span
      v-for="(celestial, index) in celestials"
      :key="index"
      class="c-modal-celestial-quote c-modal-celestial-quote__symbol"
      :style="styleObject(celestial, 0.2, true)"
      v-html="celestialSymbols[index]"
      data-v-celestial-quote-background
    />
    <span
      v-for="(celestial, index) in celestials"
      :key="index + 10"
      class="c-modal-celestial-quote c-modal-celestial-quote__shadow"
      :style="styleObject(celestial, 1, false)"
      data-v-celestial-quote-background
    />
    <span
      v-for="(celestial, index) in celestials"
      :key="index + 20"
      class="c-modal-celestial-quote c-modal-celestial-quote__text"
      :style="styleObject(celestial, 1, true)"
      data-v-celestial-quote-background
    >
      <slot />
    </span>
  </div>
  `
};