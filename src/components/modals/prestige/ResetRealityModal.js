import ModalWrapperChoice from "../ModalWrapperChoice.js";

export default {
  name: "ResetRealityModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      isDoomed: false,
      canReality: false,
    };
  },
  computed: {
    resetTerm() { return this.isDoomed ? "Armageddon" : "Reality"; },
  },
  methods: {
    update() {
      this.isDoomed = Pelle.isDoomed;
      this.canReality = isRealityAvailable();
    },
    handleYesClick() {
      beginProcessReality(getRealityProps(true));
      EventHub.ui.offAll(this);
    }
  },
  template: `
  <ModalWrapperChoice
    option="resetReality"
    @confirm="handleYesClick"
  >
    <template #header>
      You are about to reset your {{ resetTerm }}
    </template>
    <div
      class="c-modal-message__text"
      data-v-reset-reality-modal
    >
      This will reset you to the start of your {{ resetTerm }},
      giving you no rewards from your progress in your current {{ resetTerm }}.
      <br>
      <br>
      Are you sure you want to do this?
      <div
        v-if="canReality"
        class="c-has-rewards"
        data-v-reset-reality-modal
      >
        <br>
        You can currently complete a Reality for all its normal rewards, which you will not receive if you
        Reset here. To get rewards, use the "Make a new Reality" button.
      </div>
      <br>
    </div>
    <template #confirm-text>
      Reset
    </template>
  </ModalWrapperChoice>
  `
};