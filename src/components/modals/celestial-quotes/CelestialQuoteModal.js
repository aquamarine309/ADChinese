import CelestialQuoteLineBasicInteractable from "./templates/CelestialQuoteLineBasicInteractable.js";

export default {
  name: "CelestialQuoteModal",
  components: {
    CelestialQuoteLineBasicInteractable
  },
  props: {
    quote: {
      type: Object,
      required: true
    }
  },
  template: `
  <div class="l-modal-overlay c-modal-overlay">
    <CelestialQuoteLineBasicInteractable
      class="c-quote-overlay"
      :quote="quote"
      data-v-celestial-quote-modal
    />
  </div>
  `
};