import ModalWrapper from "../ModalWrapper.js";

export default {
  name: "ModalWrapperOptions",
  components: {
    ModalWrapper
  },
  template: `
  <ModalWrapper class="c-modal-options l-modal-options">
    <template #header>
      <slot name="header" />
    </template>
    <slot />
  </ModalWrapper>
  `
};