import wordShift from "../../../core/word-shift.js";

import EffectDisplay from "../../EffectDisplay.js";
import HintText from "../../HintText.js";

export default {
  name: "NormalAchievement",
  components: {
    EffectDisplay,
    HintText
  },
  props: {
    achievement: {
      type: Object,
      required: true
    },
    isObscured: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      isDisabled: false,
      isUnlocked: false,
      isMouseOver: false,
      isCancer: false,
      showUnlockState: false,
      realityUnlocked: false,
      garbleTimer: 0,
      garbleKey: 0,
      achievementTime: 0,
    };
  },
  computed: {
    id() {
      return this.achievement.id;
    },
    displayId() {
      return this.config.displayId ?? this.id;
    },
    config() {
      return this.achievement.config;
    },
    styleObject() {
      return {
        "background-position": `-${(this.achievement.column - 1) * 104}px -${(this.achievement.row - 1) * 104}px`
      };
    },
    classObject() {
      return {
        "o-achievement": true,
        "o-achievement--disabled": this.isDisabled,
        "o-achievement--locked": !this.isUnlocked && !this.isDisabled && !this.isObscured,
        "o-achievement--unlocked": this.isUnlocked,
        "o-achievement--waiting": !this.isUnlocked && this.isPreRealityAchievement && !this.isDisabled,
        "o-achievement--blink": !this.isUnlocked && this.id === 78 && !this.isDisabled,
        "o-achievement--normal": !this.isCancer && !this.isObscured,
        "o-achievement--cancer": this.isCancer && !this.isObscured,
        "o-achievement--hidden": this.isObscured,
      };
    },
    indicatorIconClass() {
      if (this.isUnlocked) return "fas fa-check";
      if (this.isPreRealityAchievement && !this.isDisabled) return "far fa-clock";
      return "fas fa-times";
    },
    indicatorClassObject() {
      return {
        "o-achievement__indicator": true,
        "o-achievement__indicator--disabled": this.isDisabled,
        "o-achievement__indicator--locked": !this.isUnlocked && !this.isPreRealityAchievement && !this.isDisabled,
        "o-achievement__indicator--waiting": !this.isUnlocked && this.isPreRealityAchievement && !this.isDisabled,
      };
    },
    rewardClassObject() {
      return {
        "o-achievement__reward": true,
        "o-achievement__reward--disabled": this.isDisabled,
        "o-achievement__reward--locked": !this.isUnlocked && !this.isPreRealityAchievement && !this.isDisabled,
        "o-achievement__reward--waiting": !this.isUnlocked && this.isPreRealityAchievement && !this.isDisabled,
      };
    },
    isPreRealityAchievement() {
      return this.realityUnlocked && this.achievement.row <= 13;
    },
    hasReward() {
      return this.config.reward !== undefined && !this.isObscured;
    },
    // The garble templates themselves can be static, and shouldn't be recreated every render tick
    garbledNameTemplate() {
      return this.makeGarbledTemplate(this.config.name);
    },
    garbledIDTemplate() {
      return this.makeGarbledTemplate(this.displayId);
    },
    garbledDescriptionTemplate() {
      return this.makeGarbledTemplate(this.config.description);
    },
    achievedTime() {
      if (!player.speedrun.isActive) return null;
      if (this.achievementTime === undefined) return "尚未达成";
      return this.achievementTime === 0
        ? "在开始速通时选定"
        : `${TimeSpan.fromMilliseconds(this.achievementTime).toStringShort()} 后获得`;
    }
  },
  beforeDestroy() {
    clearTimeout(this.mouseOverInterval);
  },
  methods: {
    update() {
      this.isDisabled = Pelle.disabledAchievements.includes(this.id) && Pelle.isDoomed;
      this.isUnlocked = this.achievement.isUnlocked && !this.isDisabled;
      this.isCancer = Theme.current().name === "S4" || player.secretUnlocks.cancerAchievements;
      this.showUnlockState = player.options.showHintText.achievementUnlockStates;
      this.realityUnlocked = PlayerProgress.realityUnlocked();

      this.processedName = this.processText(this.config.name, this.garbledNameTemplate);
      this.processedId = this.processText(this.displayId, this.garbledIDTemplate);
      this.processedDescription = this.processText(this.config.description, this.garbledDescriptionTemplate);

      // This uses key-swapping to force the garbled achievements to re-render their text, because otherwise they
      // would remain static. Keys for non-garbled achievements won't change, and all keys remain unique.
      this.garbleTimer++;
      if (this.isObscured) {
        this.garbleKey = 10 * this.id + Math.floor(this.garbleTimer / 3);
      } else {
        this.garbleKey = this.id;
      }
      if (player.speedrun.isActive) this.achievementTime = player.speedrun.achievementTimes[this.id];
    },
    onMouseEnter() {
      clearTimeout(this.mouseOverInterval);
      this.isMouseOver = true;
    },
    onMouseLeave() {
      this.mouseOverInterval = setTimeout(() => this.isMouseOver = false, 300);
    },
    // We don't want to expose the original text for Pelle achievements, so we generate a random string with the same
    // length of the original text in order to make something that fits reasonably within their respective places
    makeGarbledTemplate(input) {
      // Input might be either text or number
      const text = `${input}`;
      let garbled = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") garbled += " ";
        else {
          const n = text[i].charCodeAt();
          // Essentially seeded randomness so that the static parts of the randomized text are deterministic
          garbled += String.fromCharCode(33 + ((n * n + i * i) % 93));
        }
      }
      return garbled;
    },
    // When appropriate, garbles input text for achievements on the last row. Otherwise leaves it unchanged
    processText(unmodified, garbledTemplate) {
      if (!this.isObscured) return unmodified;

      // The garbling effect often replaces spaces with non-spaces, which affects line length and can cause individual
      // lines to become long enough that they can't word-wrap. To address that, we take the template as a reference
      // and put spaces back into the same spots, ensuring that text can't overflow any worse than the original text
      const raw = wordShift.randomCrossWords(garbledTemplate);
      let modified = "";
      for (let i = 0; i < raw.length; i++) {
        if (garbledTemplate[i] === " ") modified += " ";
        else modified += raw[i];
      }
      return modified;
    }
  },
  template: `
  <div
    :class="classObject"
    :style="styleObject"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    data-v-normal-achievement
  >
    <HintText
      :key="garbleKey"
      type="achievements"
      class="l-hint-text--achievement"
      data-v-normal-achievement
    >
      {{ processedId }}
    </HintText>
    <div
      class="o-achievement__tooltip"
      data-v-normal-achievement
    >
      <template v-if="isMouseOver">
        <div
          class="o-achievement__tooltip__name"
          data-v-normal-achievement
        >
          {{ processedName }} ({{ processedId }})
        </div>
        <div
          class="o-achievement__tooltip__description"
          data-v-normal-achievement
        >
          {{ processedDescription }}
        </div>
        <div
          v-if="config.reward"
          class="o-achievement__tooltip__reward"
          data-v-normal-achievement
        >
          <span
            v-if="!isObscured"
            :class="{ 'o-pelle-disabled': isDisabled }"
            data-v-normal-achievement
          >
            奖励：{{ config.reward }}
            <EffectDisplay
              v-if="config.formatEffect"
              br
              :config="config"
            />
          </span>
        </div>
        <div
          v-if="achievedTime"
          class="o-achievement-time"
          data-v-normal-achievement
        >
          {{ achievedTime }}
        </div>
      </template>
    </div>
    <div
      v-if="showUnlockState"
      :class="indicatorClassObject"
      data-v-normal-achievement
    >
      <i :class="indicatorIconClass" />
    </div>
    <div
      v-if="hasReward"
      :class="rewardClassObject"
      data-v-normal-achievement
    >
      <i class="fas fa-star" />
    </div>
  </div>
  `
};