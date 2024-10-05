import BigCrunchButton from "../BigCrunchButton.js";
import HeaderBlackHole from "../HeaderBlackHole.js";
import HeaderChallengeDisplay from "../HeaderChallengeDisplay.js";
import HeaderChallengeEffects from "../HeaderChallengeEffects.js";
import HeaderPrestigeGroup from "../HeaderPrestigeGroup.js";
import NewsTicker from "../NewsTicker.js";

import GameSpeedDisplay from "../../GameSpeedDisplay.js";


export default {
  name: "ModernUi",
  components: {
    BigCrunchButton,
    HeaderChallengeDisplay,
    HeaderChallengeEffects,
    NewsTicker,
    HeaderBlackHole,
    HeaderPrestigeGroup,
    GameSpeedDisplay,
  },
  data() {
    return {
      bigCrunch: false,
      hasReality: false,
      newGameKey: "",
    };
  },
  computed: {
    news() {
      return this.$viewModel.news;
    },
    topMargin() {
      return this.$viewModel.news ? "" : "margin-top: 3.9rem";
    }
  },
  methods: {
    update() {
      const crunchButtonVisible = !player.break && Player.canCrunch;
      this.bigCrunch = crunchButtonVisible && Time.bestInfinityRealTime.totalMinutes > 1;
      this.hasReality = PlayerProgress.realityUnlocked();
      // This only exists to force a key-swap after pressing the button to start a new game; the news ticker can break
      // if it isn't redrawn
      this.newGameKey = Pelle.isDoomed;
    },
    handleClick() {
      if (PlayerProgress.infinityUnlocked()) manualBigCrunchResetRequest();
      else Modal.bigCrunch.show();
    }
  },
  template: `
  <div id="page">
    <link
      rel="stylesheet"
      type="text/css"
      href="./public/stylesheets/new-ui-styles.css"
    >
    <div
      :key="newGameKey"
      class="game-container"
      :style="topMargin"
    >
      <NewsTicker
        v-if="news"
      />
      <BigCrunchButton />
      <div
        v-if="!bigCrunch"
        class="tab-container"
      >
        <HeaderPrestigeGroup />
        <div class="information-header">
          <HeaderChallengeDisplay />
          <HeaderChallengeEffects />
          <GameSpeedDisplay v-if="hasReality" />
          <br v-if="hasReality">
          <HeaderBlackHole />
        </div>
        <slot />
      </div>
    </div>
  </div>
  `
};