import ModalWrapper from "./ModalWrapper.js";
import PrimaryButton from "../PrimaryButton.js";

export default {
  name: "EnslavedHintsModal",
  components: {
    ModalWrapper,
    PrimaryButton
  },
  data() {
    return {
      currentStored: 0,
      nextHintCost: 0,
      canGetHint: false,
      shownEntries: [],
      realityHintsLeft: 0,
      glyphHintsLeft: 0,
      hints: 0,
    };
  },
  computed: {
    hintCost() {
      return `${format(TimeSpan.fromMilliseconds(this.nextHintCost).totalYears, 2)} 年`;
    },
    formattedStored() {
      return `${format(TimeSpan.fromMilliseconds(this.currentStored).totalYears, 2)} 年`;
    },
    hasProgress(id) {
      return this.progressEntries.some(entry => entry.id === id);
    },
    // Note: This calculation seems to behave extremely poorly if the goal has been raised more than 12 hints worth
    // of cost bumps and I'm not entirely sure why. There's probably a numerical issue I can't quite figure out, but
    // considering that much cost raising can't happen in practice I think I'm just going to leave it be.
    timeEstimate() {
      if (this.currentStored >= this.nextHintCost) return "";

      // Relevant values are stored as milliseconds, so multiply the rate by 1000 to get to seconds
      const storeRate = 1000 * (Enslaved.isStoringGameTime
        ? Enslaved.currentBlackHoleStoreAmountPerMs
        : getGameSpeedupFactor());
      const alreadyWaited = this.currentStored / storeRate;
      const decaylessTime = this.nextHintCost / storeRate;

      // Check if decay is irrelevant and don't do the hard calculations if so
      const minCostEstimate = (TimeSpan.fromYears(1e40).totalMilliseconds - this.currentStored) / storeRate;
      if (TimeSpan.fromSeconds(minCostEstimate).totalDays > this.hints) {
        return TimeSpan.fromSeconds(minCostEstimate).toStringShort(true);
      }

      // Decay is 3x per day, but the math needs decay per second
      const K = Math.pow(3, 1 / 86400);
      const x = decaylessTime * Math.log(K) * Math.pow(K, alreadyWaited);
      const timeToGoal = productLog(x) / Math.log(K) - alreadyWaited;
      return TimeSpan.fromSeconds(timeToGoal).toStringShort(true);
    }
  },
  methods: {
    update() {
      this.currentStored = player.celestials.enslaved.stored;
      this.nextHintCost = Enslaved.nextHintCost;
      this.canGetHint = this.currentStored >= this.nextHintCost;
      this.shownEntries = [];

      this.realityHintsLeft = EnslavedProgress.all.length;
      for (const prog of EnslavedProgress.all) {
        if (prog.hasHint) {
          this.shownEntries.push([false, prog]);
          this.realityHintsLeft--;
        }
      }

      const glyphHintCount = player.celestials.enslaved.glyphHintsGiven;
      for (let hintNum = 0; hintNum < glyphHintCount; hintNum++) {
        this.shownEntries.push([true, GameDatabase.celestials.enslaved.glyphHints[hintNum]]);
      }
      this.glyphHintsLeft = GameDatabase.celestials.enslaved.glyphHints.length - glyphHintCount;

      this.hints = Enslaved.hintCostIncreases;
    },
    giveRealityHint(available) {
      if (available <= 0 || !Enslaved.spendTimeForHint()) return;
      EnslavedProgress.all.filter(prog => !prog.hasHint).randomElement().unlock();
    },
    giveGlyphHint(available) {
      if (available <= 0 || !Enslaved.spendTimeForHint()) return;
      player.celestials.enslaved.glyphHintsGiven++;
    }
  },
  template: `
  <ModalWrapper>
    <template #header>
      无名氏的现实中的裂缝
    </template>
    <div class="c-enslaved-hint-modal c-modal--short">
      <div>
        这个现实似乎在抵抗你为了能完成它所付出的努力。你已经完成了这些事情：
      </div>
      <br>
      <div
        v-for="(entry, index) in shownEntries"
        :key="index"
      >
        <div v-if="!entry[0]">
          <span v-if="entry[1].hasHint && !entry[1].hasProgress">
            <i
              class="c-icon-wrapper fas fa-question-circle"
              data-v-enslaved-hints-modal
            />
            <b>你还没搞明白这个提示意味着什么。</b>
          </span>
          <span v-else>
            <i
              class="c-icon-wrapper fa-solid fa-house-crack"
              data-v-enslaved-hints-modal
            />
            <b>无名氏的现实中出现了一个裂缝！</b>
          </span>
          <br>
          - {{ entry[1].hintInfo }}
          <br>
          - {{ entry[1].hasProgress ? entry[1].completedInfo : "?????" }}
        </div>
        <div v-else>
          <i class="fa-solid fa-shapes" /> <b>符文提示：</b>
          <br>
          {{ entry[1] }}
        </div>
        <br>
      </div>
      <div v-if="realityHintsLeft + glyphHintsLeft > 0">
        你可以花些时间寻找现实中的更多裂缝，但每个提示花费的存储时间将使下一次所需的存储时间增加{{ formatInt(3) }}倍。这个成本增加将在{{ formatInt(24) }}小时内逐渐消失，弄清提示的含义将立即将成本除以{{ formatInt(2) }}。成本不能降到低于{{ format(1e40) }}年。
        <br><br>
        下一个提示将花费{{ hintCost }}的存储时间。你目前有{{ formattedStored }}。
        <span v-if="currentStored < nextHintCost">
          如果你为黑洞充能{{ timeEstimate }}，将获得此提示。
        </span>
        <br><br>
        <PrimaryButton
          :enabled="realityHintsLeft > 0 && canGetHint"
          class="l-enslaved-hint-button"
          @click="giveRealityHint(realityHintsLeft)"
          data-v-enslaved-hints-modal
        >
          获得一个关于这个现实本身的提示（还有 {{ formatInt(realityHintsLeft) }} 个）
        </PrimaryButton>
        <br>
        <PrimaryButton
          :enabled="glyphHintsLeft > 0 && canGetHint"
          class="l-enslaved-hint-button"
          @click="giveGlyphHint(glyphHintsLeft)"
          data-v-enslaved-hints-modal
        >
          获得一个关于符文配置的提示（还有 {{ formatInt(glyphHintsLeft) }} 个）
        </PrimaryButton>
      </div>
      <div v-else>
        <b>没有更多的提示了。</b>
      </div>
    </div>
  </ModalWrapper>
  `
};