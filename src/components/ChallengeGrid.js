import ChallengeGridCell from "./ChallengeGridCell.js";

export default {
  name: "ChallengeGrid",
  components: {
    ChallengeGridCell
  },
  props: {
    challenges: {
      type: Array,
      required: true
    },
    isChallengeVisible: {
      type: Function,
      required: false,
      default: () => true
    }
  },
  template: `
  <div class="l-challenge-grid">
    <ChallengeGridCell
      v-for="challenge in challenges"
      :key="challenge.id"
      :challenge="challenge"
      :is-challenge-visible="isChallengeVisible"
    >
      <slot :challenge="challenge" />
    </ChallengeGridCell>
  </div>
  `
};