import { GameProgress, ProgressChecker } from "../../../core/storage/progress-checker.js";

import CatchupGroup from "./CatchupGroup.js";
import PrimaryButton from "../../PrimaryButton.js";

export default {
  name: "CatchupModal",
  components: {
    CatchupGroup,
    PrimaryButton,
  },
  props: {
    diff: {
      type: Number,
      required: true
    }
  },
  computed: {
    progressStage: () => ProgressChecker.getProgressStage(player).id,
    suggestedResource() {
      return GameProgress(this.progressStage).suggestedResource;
    },
    timeString() {
      // If diff is zero, that means we opened it up via the button and don't need the text for last opening
      if (!this.diff) return null;
      return `It has been ${TimeSpan.fromMilliseconds(this.diff).toString()} since you last loaded up the game.`;
    },
    titleText() {
      return this.diff ? "Content Catch-up" : "Content Summary";
    }
  },
  methods: {
    stageName(stage) {
      return GameProgress(stage).name;
    }
  },
  template: `
  <div class="c-modal-away-progress">
    <div class="c-modal-away-progress__header">
      {{ titleText }}
    </div>
    <div>
      {{ timeString }}
      If you need a refresher, here is a quick summary of all the content you have unlocked so far from the beginning of
      the game, separated into different stages of progression. These are only very brief descriptions; you can check
      the related How To Play entries by clicking the contents title or <i class="fas fa-question-circle" /> icons
      to view more detailed information.
    </div>
    <div
      class="l-catchup-group-container"
      :style="{ 'height' : \`\${Math.clamp(3 * progressStage + 5, 15, 35)}rem\` }"
      data-v-catchup-modal
    >
      <CatchupGroup
        v-for="group of progressStage"
        :key="group"
        :group="group"
        :name="stageName(group)"
      />
    </div>
    <span
      class="c-suggestion-text"
      data-v-catchup-modal
    >
      Based on your current progression, it will probably be useful to try to increase your {{ suggestedResource }}.
    </span>
    <div
      class="l-confirm-padding"
      data-v-catchup-modal
    >
      <PrimaryButton
        @click="emitClose"
      >
        Confirm
      </PrimaryButton>
    </div>
  </div>
  `
};