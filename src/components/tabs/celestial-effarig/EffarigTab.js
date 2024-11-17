import CelestialQuoteHistory from "../../CelestialQuoteHistory.js";
import EffarigRunUnlockReward from "./EffarigRunUnlockReward.js";
import EffarigUnlockButton from "./EffarigUnlockButton.js";

export default {
  name: "EffarigTab",
  components: {
    EffarigUnlockButton,
    EffarigRunUnlockReward,
    CelestialQuoteHistory,
  },
  data() {
    return {
      relicShards: 0,
      shardRarityBoost: 0,
      shardPower: 0,
      shardsGained: 0,
      currentShardsRate: 0,
      amplification: 0,
      amplifiedShards: 0,
      amplifiedShardsRate: 0,
      runUnlocked: false,
      quote: "",
      isRunning: false,
      vIsFlipped: false,
      relicShardRarityAlwaysMax: false
    };
  },
  computed: {
    shopUnlocks: () => [
      EffarigUnlock.adjuster,
      EffarigUnlock.glyphFilter,
      EffarigUnlock.setSaves
    ],
    runUnlock: () => EffarigUnlock.run,
    runUnlocks: () => [
      EffarigUnlock.infinity,
      EffarigUnlock.eternity,
      EffarigUnlock.reality
    ],
    symbol: () => GLYPH_SYMBOLS.effarig,
    runButtonOuterClass() {
      return {
        "l-effarig-run-button": true,
        "c-effarig-run-button": true,
        "c-effarig-run-button--running": this.isRunning,
        "c-effarig-run-button--not-running": !this.isRunning,
        "c-celestial-run-button--clickable": !this.isDoomed,
        "o-pelle-disabled-pointer": this.isDoomed
      };
    },
    runButtonInnerClass() {
      return this.isRunning ? "c-effarig-run-button__inner--running" : "c-effarig-run-button__inner--not-running";
    },
    runDescription() {
      return `${GameDatabase.celestials.descriptions[1].effects()}\n
      ${GameDatabase.celestials.descriptions[1].description()}`;
    },
    showShardsRate() {
      return this.currentShardsRate;
    },
    isDoomed: () => Pelle.isDoomed,
  },
  watch: {
    isRunning() {
      this.$recompute("runDescription");
    }
  },
  methods: {
    update() {
      this.relicShards = Currency.relicShards.value;
      this.shardRarityBoost = Effarig.maxRarityBoost / 100;
      this.shardPower = Ra.unlocks.maxGlyphRarityAndShardSacrificeBoost.effectOrDefault(1);
      this.shardsGained = Effarig.shardsGained;
      this.currentShardsRate = (this.shardsGained / Time.thisRealityRealTime.totalMinutes);
      this.amplification = simulatedRealityCount(false);
      this.amplifiedShards = this.shardsGained * (1 + this.amplification);
      this.amplifiedShardsRate = (this.amplifiedShards / Time.thisRealityRealTime.totalMinutes);
      this.quote = Effarig.quote;
      this.runUnlocked = EffarigUnlock.run.isUnlocked;
      this.isRunning = Effarig.isRunning;
      this.vIsFlipped = V.isFlipped;
      this.relicShardRarityAlwaysMax = Ra.unlocks.extraGlyphChoicesAndRelicShardRarityAlwaysMax.canBeApplied;
    },
    startRun() {
      if (this.isDoomed) return;
      Modal.celestials.show({ name: "Effarig's", number: 1 });
    },
    createCursedGlyph() {
      Glyphs.giveCursedGlyph();
    }
  },
  template: `
  <div class="l-teresa-celestial-tab">
    <CelestialQuoteHistory celestial="effarig" />
    <div class="l-effarig-shop-and-run">
      <div class="l-effarig-shop">
        <div class="c-effarig-relics">
          你拥有 {{ format(relicShards, 2, 0) }} 遗迹碎片。
          <br>
          <span v-if="relicShardRarityAlwaysMax">
            即将获得的符文稀有度+{{ formatPercents(shardRarityBoost, 2) }}
          </span>
          <span v-else>
            即将获得的符文稀有度将在 {{ formatPercents(0) }} 和 {{ formatPercents(shardRarityBoost, 2) }} 之间随机增加
          </span>
          <span v-if="shardPower > 1">
            <br>
            符文献祭加成提升至 {{ formatPow(shardPower, 0, 2) }}
          </span>
        </div>
        <div
          class="c-effarig-relic-description"
          data-v-effarig-tab
        >
          你将在下次现实中获得 {{ format(shardsGained, 2) }} 遗迹碎片（{{ format(currentShardsRate, 2) }}/分钟）。
          <span v-if="amplification !== 0">
            <br>
            Due to amplification of your current Reality,
            <br>
            you will actually gain a total of
            {{ format(amplifiedShards, 2) }} Relic Shards ({{ format(amplifiedShardsRate, 2) }}/min).
          </span>
        </div>
        <div
          class="c-effarig-relic-description"
          data-v-effarig-tab
        >
          <br>
          更多的永恒点数会略微增加获得的遗迹碎片数量。更多不同的符文效果会显著增加获得的遗迹碎片数量。
        </div>
        <EffarigUnlockButton
          v-for="(unlock, i) in shopUnlocks"
          :key="i"
          :unlock="unlock"
        />
        <EffarigUnlockButton
          v-if="!runUnlocked"
          :unlock="runUnlock"
        />
        <button
          v-if="vIsFlipped"
          class="c-effarig-shop-button c-effarig-shop-button--available"
          @click="createCursedGlyph"
        >
          获得一个诅咒符文……
        </button>
      </div>
      <div
        v-if="runUnlocked"
        class="l-effarig-run"
      >
        <div class="c-effarig-run-description">
          <span :class="{ 'o-pelle-disabled': isDoomed }">
            进入鹿颈长的现实。
          </span>
        </div>
        <div
          :class="runButtonOuterClass"
          @click="startRun"
        >
          <div
            :class="runButtonInnerClass"
            :button-symbol="symbol"
          >
            {{ symbol }}
          </div>
        </div>
        <div class="c-effarig-run-description">
          {{ runDescription }}
        </div>
        <EffarigRunUnlockReward
          v-for="(unlock, i) in runUnlocks"
          :key="i"
          :unlock="unlock"
        />
      </div>
    </div>
  </div>
  `
};