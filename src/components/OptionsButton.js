import PrimaryButton from "./PrimaryButton.js";

export default {
  name: "OptionsButton",
  components: {
    PrimaryButton
  },
  template: `
  <PrimaryButton
    class="o-primary-btn--option l-options-grid__button"
    @click="emitClick"
  >
    <slot />
  </PrimaryButton>
  `
};