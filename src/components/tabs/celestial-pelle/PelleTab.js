import CelestialQuoteHistory from "../../CelestialQuoteHistory.js";
import GalaxyGeneratorPanel from "./PelleGalaxyGeneratorPanel.js";
import PelleBarPanel from "./PelleBarPanel.js";
import PelleUpgradePanel from "./PelleUpgradePanel.js";

export default {
  name: "PelleTab",
  components: {
    PelleBarPanel,
    PelleUpgradePanel,
    GalaxyGeneratorPanel,
    CelestialQuoteHistory
  },
  data() {
    return {
      isDoomed: false,
      canEnterPelle: false,
      completedRows: 0,
      cappedResources: 0,
      hasStrike: false,
      hasGalaxyGenerator: false
    };
  },
  computed: {
    symbol() {
      return Pelle.symbol;
    },
    totalRows() {
      return Achievements.prePelleRows.length;
    },
    totalAlchemyResources() {
      return AlchemyResources.all.length;
    }
  },
  methods: {
    update() {
      this.isDoomed = Pelle.isDoomed;
      if (!this.isDoomed) {
        this.completedRows = Achievements.prePelleRows.countWhere(r => r.every(a => a.isUnlocked));
        this.cappedResources = AlchemyResources.all.countWhere(r => r.capped);
        this.canEnterPelle = this.completedRows === this.totalRows &&
          this.cappedResources === this.totalAlchemyResources;
      }
      this.hasStrike = PelleStrikes.all.some(s => s.hasStrike);
      this.hasGalaxyGenerator = PelleRifts.recursion.milestones[2].canBeApplied || GalaxyGenerator.spentGalaxies > 0;
    },
    toggleBought() {
      Pelle.cel.showBought = !Pelle.cel.showBought;
      this.$recompute("upgrades");
    },
    showModal() {
      Modal.pelleEffects.show();
    },
    enterDoomModal() {
      Modal.armageddon.show();
    }
  },
  template: `
  <div
    class="l-pelle-celestial-tab"
    data-v-pelle-tab
  >
    <div
      v-if="isDoomed"
      class="l-pelle-all-content-container"
      data-v-pelle-tab
    >
      <CelestialQuoteHistory
        celestial="pelle"
        data-v-pelle-tab
      />
      <div
        class="button-container"
        data-v-pelle-tab
      >
        <button
          class="o-pelle-button"
          @click="showModal"
          data-v-pelle-tab
        >
          显示被毁灭的现实中的效果
        </button>
      </div>
      <br>
      <GalaxyGeneratorPanel
        v-if="hasGalaxyGenerator"
        data-v-pelle-tab
      />
      <PelleBarPanel
        v-if="hasStrike"
        data-v-pelle-tab
      />
      <PelleUpgradePanel data-v-pelle-tab />
    </div>
    <button
      v-else-if="canEnterPelle"
      class="pelle-doom-button"
      @click="enterDoomModal"
      data-v-pelle-tab
    >
      毁灭<br>你的<br>现实
      <div
        class="pelle-icon-container"
        data-v-pelle-tab
      >
        <span
          class="pelle-icon"
          data-v-pelle-tab
        >{{ symbol }}</span>
      </div>
    </button>
    <div
      v-else
      class="pelle-unlock-requirements"
      data-v-pelle-tab
    >
     你需要拥有前 {{ formatInt(totalRows) }} 行的所有成就，同时所有的炼金资源达到上限才能解锁反物质之神佩勒。
     <br>
     <br>
     已完成前 {{ formatInt(completedRows) }}/{{ formatInt(totalRows) }} 行的所有成就
     <br>
     {{ formatInt(cappedResources) }} / {{ formatInt(totalAlchemyResources) }} 个炼金资源达到上限。 
    </div>
  </div>
  `
};