import AnnihilationButton from "./AnnihilationButton.js";
import CelestialQuoteHistory from "../../CelestialQuoteHistory.js";
import DarkMatterDimensionGroup from "./DarkMatterDimensionGroup.js";
import LaitelaAutobuyerPane from "./LaitelaAutobuyerPane.js";
import LaitelaRunButton from "./LaitelaRunButton.js";
import PrimaryButton from "../../PrimaryButton.js";
import SingularityMilestonePane from "./SingularityMilestonePane.js";
import SingularityPane from "./SingularityPane.js";

export default {
  name: "LaitelaTab",
  components: {
    LaitelaRunButton,
    SingularityPane,
    SingularityMilestonePane,
    DarkMatterDimensionGroup,
    AnnihilationButton,
    LaitelaAutobuyerPane,
    CelestialQuoteHistory,
    PrimaryButton
  },
  data() {
    return {
      isDoomed: false,
      darkMatter: new Decimal(0),
      darkMatterGain: new Decimal(0),
      isDMCapped: false,
      maxDarkMatter: new Decimal(0),
      darkEnergy: 0,
      matterExtraPurchasePercentage: 0,
      autobuyersUnlocked: false,
      singularityPanelVisible: false,
      singularitiesUnlocked: false,
      singularityCap: 0,
      singularityWaitTime: 0,
      showAnnihilation: false
    };
  },
  computed: {
    styleObject() {
      return {
        color: this.isDMCapped ? "var(--color-bad)" : "",
      };
    },
  },
  methods: {
    update() {
      this.isDoomed = Pelle.isDoomed;
      this.darkMatter.copyFrom(Currency.darkMatter);
      this.isDMCapped = this.darkMatter.eq(Number.MAX_VALUE);
      this.maxDarkMatter.copyFrom(Currency.darkMatter.max);
      this.darkEnergy = player.celestials.laitela.darkEnergy;
      this.matterExtraPurchasePercentage = Laitela.matterExtraPurchaseFactor - 1;
      this.autobuyersUnlocked = SingularityMilestone.darkDimensionAutobuyers.canBeApplied ||
        SingularityMilestone.darkDimensionAutobuyers.canBeApplied ||
        SingularityMilestone.autoCondense.canBeApplied ||
        Laitela.darkMatterMult > 1;
      this.singularityPanelVisible = Currency.singularities.gt(0);
      this.singularitiesUnlocked = Singularity.capIsReached || this.singularityPanelVisible;
      this.singularityCap = Singularity.cap;
      this.singularityWaitTime = TimeSpan.fromSeconds((this.singularityCap - this.darkEnergy) /
        Currency.darkEnergy.productionPerSecond).toStringShort();
      this.showAnnihilation = Laitela.annihilationUnlocked;

      const d1 = DarkMatterDimension(1);
      this.darkMatterGain = d1.amount.times(d1.powerDM).divide(d1.interval).times(1000);
    },
    maxAll() {
      Laitela.maxAllDMDimensions(4);
    },
    showLaitelaHowTo() {
      ui.view.h2pForcedTab = GameDatabase.h2p.tabs.filter(tab => tab.name === "Lai'tela")[0];
      Modal.h2p.show();
    },
  },
  template: `
  <div class="l-laitela-celestial-tab">
    <CelestialQuoteHistory celestial="laitela" />
    <div class="c-subtab-option-container">
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        @click="showLaitelaHowTo()"
      >
        点击以查看莱特拉详情
      </PrimaryButton>
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        @click="maxAll"
      >
        最大化暗物质维度
      </PrimaryButton>
    </div>
    <div class="o-laitela-matter-amount">
      你拥有
      <span :style="styleObject">{{ format(darkMatter, 2) }}</span>
      暗物质<span v-if="isDMCapped"> （已达到上限）</span>。
      <span v-if="!isDMCapped">（{{ format(darkMatterGain, 2, 2) }}/秒）</span>
    </div>
    <div class="o-laitela-matter-amount">
      <span v-if="!isDoomed">你最多获得过 <span :style="styleObject">{{ format(maxDarkMatter, 2) }}</span> 暗物质，
        提供 {{ formatPercents(matterExtraPurchasePercentage, 2) }} 连续统加成。
      </span>
      <span v-else>
        暗物质的最大数量为 <span :style="styleObject">{{ format(maxDarkMatter, 2) }}</span>。
      </span>
    </div>
    <div class="o-laitela-matter-amount">
      暗物质维度不受存储现实时间的影响。
    </div>
    <h2
      v-if="!singularitiesUnlocked"
      class="c-laitela-singularity-container"
    >
      {{ singularityWaitTime }} 后解锁奇点。（{{ format(darkEnergy, 2, 2) }}/{{ format(singularityCap, 2) }} 暗能量）
    </h2>
    <SingularityPane v-if="singularitiesUnlocked" />
    <LaitelaAutobuyerPane v-if="autobuyersUnlocked" />
    <div class="l-laitela-mechanics-container">
      <LaitelaRunButton />
      <div>
        <DarkMatterDimensionGroup />
        <AnnihilationButton v-if="showAnnihilation" />
      </div>
      <SingularityMilestonePane v-if="singularityPanelVisible" />
    </div>
  </div>
  `
};