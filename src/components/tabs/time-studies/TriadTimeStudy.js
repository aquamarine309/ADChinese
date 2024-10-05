import DescriptionDisplay from "../../DescriptionDisplay.js";
import EffectDisplay from "../../EffectDisplay.js";
import HintText from "../../HintText.js";
import TimeStudyButton from "./TimeStudyButton.js";

export default {
  name: "TriadTimeStudy",
  components: {
    DescriptionDisplay,
    EffectDisplay,
    HintText,
    TimeStudyButton
  },
  props: {
    setup: {
      type: Object,
      required: true
    }
  },
  computed: {
    study() {
      return this.setup.study;
    },
    id() {
      return this.study.id;
    },
    config() {
      return this.study.config;
    },
  },
  template: `
  <TimeStudyButton
    :setup="setup"
    class="o-time-study--triad"
    :show-st-cost="true"
  >
    <HintText
      type="studies"
      class="l-hint-text--time-study"
    >
      {{ id }} Triad
    </HintText>
    <DescriptionDisplay :config="study.config" />
    <EffectDisplay
      br
      :config="study.config"
    />
  </TimeStudyButton>
  `

};