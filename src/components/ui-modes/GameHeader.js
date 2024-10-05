import HeaderBlackHole from "./HeaderBlackHole.js";
import HeaderChallengeDisplay from "./HeaderChallengeDisplay.js";
import HeaderChallengeEffects from "./HeaderChallengeEffects.js";
import HeaderPrestigeGroup from "./HeaderPrestigeGroup.js";

import GameSpeedDisplay from "../GameSpeedDisplay.js";

export default {
  name: "GameHeader",
  components: {
    HeaderChallengeDisplay,
    HeaderChallengeEffects,
    HeaderBlackHole,
    HeaderPrestigeGroup,
    GameSpeedDisplay,
  },
  data() {
    return {
      hasReality: false,
    };
  },
  methods: {
    update() {
      this.hasReality = PlayerProgress.realityUnlocked();
    },
  },
  template: `
  <div>
    <HeaderChallengeDisplay />
    <HeaderChallengeEffects />
    <HeaderPrestigeGroup />
    <GameSpeedDisplay v-if="hasReality" />
    <br v-if="hasReality">
    <HeaderBlackHole />
  </div>
  `
};