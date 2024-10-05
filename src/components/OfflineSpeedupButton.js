import PrimaryButton from "./PrimaryButton.js";

export default {
  name: "OfflineSpeedupButton",
  components: {
    PrimaryButton,
  },
  props: {
    button: {
      type: Object,
      required: true
    },
    progress: {
      type: Object,
      required: true
    },
  },
  computed: {
    canBeClicked() {
      return this.button.condition(this.progress.current, this.progress.max);
    },
    buttonClass() {
      return {
        "o-primary-btn--width-medium": true,
        "o-primary-btn--disabled": !this.canBeClicked,
      };
    }
  },
  methods: {
    buttonClicked() {
      if (!this.canBeClicked) return;
      this.button.click();
    }
  },
  template: `
  <PrimaryButton
    :class="buttonClass"
    @click="buttonClicked"
  >
    {{ button.text }}
  </PrimaryButton>
  `
};