import wordShift from "../../../core/word-shift.js";

import PelleUpgrade from "./PelleUpgrade.js";

export default {
  name: "GalaxyGeneratorPanel",
  components: {
    PelleUpgrade
  },
  data() {
    return {
      isUnlocked: false,
      galaxies: 0,
      generatedGalaxies: 0,
      galaxiesPerSecond: 0,
      cap: 0,
      isCapped: false,
      capRift: null,
      sacrificeActive: false,
      isCollapsed: false,
      barWidth: 0,
      capRiftName: "",
    };
  },
  computed: {
    collapseIcon() {
      return this.isCollapsed
        ? "fas fa-expand-arrows-alt"
        : "fas fa-compress-arrows-alt";
    },
    upgrades() {
      return GalaxyGeneratorUpgrades.all;
    },
    galaxyText() {
      let text = format(Math.max(this.galaxies, 0), 2);
      if (this.galaxies < 0) text += ` [${format(this.galaxies, 2)}]`;
      return text;
    },
    sacrificeText() {
      return this.capRift.galaxyGeneratorText.replace("$value", this.capRiftName);
    },
    emphasisedStart() {
      return Math.pow(this.generatedGalaxies / this.cap, 0.45);
    }
  },
  methods: {
    update() {
      this.isUnlocked = Pelle.hasGalaxyGenerator;
      this.isCapped = GalaxyGenerator.isCapped;
      this.isCollapsed = player.celestials.pelle.collapsed.galaxies && !this.isCapped;
      if (this.isCollapsed || !this.isUnlocked) return;
      this.galaxies = player.galaxies + GalaxyGenerator.galaxies;
      this.generatedGalaxies = GalaxyGenerator.generatedGalaxies;
      this.galaxiesPerSecond = GalaxyGenerator.gainPerSecond;
      this.cap = GalaxyGenerator.generationCap;
      this.capRift = GalaxyGenerator.capRift;
      this.sacrificeActive = GalaxyGenerator.sacrificeActive;
      this.barWidth = (this.isCapped ? this.capRift.reducedTo : this.emphasisedStart);
      if (this.capRift) this.capRiftName = wordShift.wordCycle(this.capRift.name);
    },
    increaseCap() {
      if (GalaxyGenerator.isCapped) GalaxyGenerator.startSacrifice();
    },
    toggleCollapse() {
      player.celestials.pelle.collapsed.galaxies = !this.isCollapsed;
    },
    unlock() {
      player.celestials.pelle.galaxyGenerator.unlocked = true;
      Pelle.quotes.galaxyGeneratorUnlock.show();
    }
  },
  template: `
  <div
    class="l-pelle-panel-container"
    data-v-pelle-galaxy-generator-panel
  >
    <div
      class="c-pelle-panel-title"
      data-v-pelle-galaxy-generator-panel
    >
      <i
        v-if="!isCapped"
        :class="collapseIcon"
        class="c-collapse-icon-clickable"
        @click="toggleCollapse"
        data-v-pelle-galaxy-generator-panel
      />
      星系生成器
    </div>
    <div
      v-if="!isCollapsed"
      class="l-pelle-content-container"
      data-v-pelle-galaxy-generator-panel
    >
      <div v-if="isUnlocked">
        <div>
          你总共拥有
          <span
            class="c-galaxies-amount"
            data-v-pelle-galaxy-generator-panel
          >{{ galaxyText }}</span>
          个星系。 
          <span
            class="c-galaxies-amount"
            data-v-pelle-galaxy-generator-panel
          >+{{ format(galaxiesPerSecond, 2, 1) }}/s</span>
        </div>
        <div>
          <button
            class="c-increase-cap"
            :class="{
              'c-increase-cap-available': isCapped && capRift && !sacrificeActive,
              'tutorial--glow': cap === Infinity
            }"
            @click="increaseCap"
            data-v-pelle-galaxy-generator-panel
          >
            <div
              class="c-increase-cap-background"
              :style="{ 'width': \`\${barWidth * 100}%\` }"
              data-v-pelle-galaxy-generator-panel
            />
            <div
              v-if="isCapped && capRift"
              class="c-increase-cap-text"
              data-v-pelle-galaxy-generator-panel
            >
              {{ sacrificeText }}。<br><br>
              <span
                v-if="!sacrificeActive"
                class="c-big-text"
                data-v-pelle-galaxy-generator-panel
              >
                献祭你的{{ capRiftName }}
              </span>
              <span
                v-else
                class="c-big-text"
                data-v-pelle-galaxy-generator-panel
              >
                除去所有的 {{ capRiftName }}…
              </span>
            </div>
            <div
              v-else
              class="c-increase-cap-text c-medium-text"
              data-v-pelle-galaxy-generator-panel
            >
              已生成 {{ format(generatedGalaxies, 2) }} / {{ format(cap, 2) }} 个星系
            </div>
          </button>
        </div>
        <div
          class="l-galaxy-generator-upgrades-container"
          data-v-pelle-galaxy-generator-panel
        >
          <PelleUpgrade
            v-for="upgrade in upgrades"
            :key="upgrade.config.id"
            :upgrade="upgrade"
            :galaxy-generator="true"
            data-v-pelle-galaxy-generator-panel
          />
        </div>
      </div>
      <button
        v-else
        class="c-generator-unlock-button"
        @click="unlock"
        data-v-pelle-galaxy-generator-panel
      >
        解锁星系生成器
      </button>
    </div>
  </div>
  `
};