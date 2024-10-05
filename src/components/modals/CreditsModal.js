import CreditsDisplay from "../CreditsDisplay.js";
import ModalWrapper from "./ModalWrapper.js";

export default {
  name: "CreditsModal",
  components: {
    CreditsDisplay,
    ModalWrapper
  },
  template: `
  <ModalWrapper
    class="l-credits-modal c-credits-modal"
    data-v-credits-modal
  >
    <template #header>
      <h1 class="c-game-header__antimatter">
        Antimatter Dimensions
      </h1>
    </template>
    <div
      class="c-credits-modal__body"
      data-v-credits-modal
    >
      <CreditsDisplay :is-modal="true" />
    </div>
  </ModalWrapper>
  `
};