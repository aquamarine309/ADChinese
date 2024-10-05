import ChallengeGrid from "../../ChallengeGrid.js";
import ChallengeTabHeader from "../../ChallengeTabHeader.js";
import NormalChallengeBox from "./NormalChallengeBox.js";

export default {
  name: "NormalChallengesTab",
  components: {
    ChallengeGrid,
    ChallengeTabHeader,
    NormalChallengeBox
  },
  computed: {
    challenges() {
      return NormalChallenges.all;
    }
  },
  template: `
  <div class="l-challenges-tab">
    <ChallengeTabHeader />
    <div>
      Some Normal Challenges have requirements to be able to run that challenge.
    </div>
    <div>
      If you have an active Big Crunch Autobuyer, it will attempt to Crunch
      as soon as possible when reaching Infinite antimatter.
    </div>
    <ChallengeGrid
      v-slot="{ challenge }"
      :challenges="challenges"
    >
      <NormalChallengeBox :challenge="challenge" />
    </ChallengeGrid>
  </div>
  `
};