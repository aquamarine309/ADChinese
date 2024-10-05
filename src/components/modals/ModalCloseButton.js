import PrimaryButton from "../PrimaryButton.js";

export default {
  name: "ModalCloseButton",
  components: {
    PrimaryButton
  },
  template: `
  <PrimaryButton
    class="o-primary-btn--modal-close c-modal__close-btn"
    @click="emitClick"
  >
    &times;
  </PrimaryButton>
  `
};