import ModalCloseButton from "./ModalCloseButton.js";

export default {
  name: "ModalWrapper",
  components: {
    ModalCloseButton,
  },
  methods: {
    closeModal() {
      EventHub.dispatch(GAME_EVENT.CLOSE_MODAL);
    }
  },
  template: `
  <div class="c-modal__inner">
    <div
      class="c-modal__header"
      data-v-modal-wrapper
    >
      <ModalCloseButton @click="closeModal" />
      <span
        v-if="$slots.header"
        class="c-modal__title"
      >
        <slot name="header" />
      </span>
    </div>
    <slot />
  </div>
  `
};