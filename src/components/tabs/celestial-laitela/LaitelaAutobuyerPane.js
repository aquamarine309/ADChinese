import PrimaryToggleButton from "../../PrimaryToggleButton.js";

export default {
  name: "LaitelaAutobuyerPane",
  components: {
    PrimaryToggleButton
  },
  data() {
    return {
      hasDimension: false,
      hasAscension: false,
      hasSingularity: false,
      hasAnnihilated: false,
      dimension: false,
      ascension: false,
      singularity: false,
      annihilation: false,

      maxAutobuy: 0,
      maxAutoAscend: 0,
      autoSingularityFactor: 0,
    };
  },
  computed: {
    autobuyStr() {
      return this.maxAutobuy === 4
        ? "开启（所有暗物质维度）"
        : `开启（最大第 ${this.maxAutobuy} 暗物质维度）`;
    },
    autoAscendStr() {
      return this.maxAutoAscend === 4
        ? "开启（所有暗物质维度）"
        : `开启（最大第 ${this.maxAutoAscend} 暗物质维度）`;
    },
    autoSingularityStr() {
      return this.autoSingularityFactor === 1
        ? "达到上限"
        : `达到上限的 ${formatX(this.autoSingularityFactor, 2, 2)}`;
    },
  },
  watch: {
    dimension(newValue) {
      player.auto.darkMatterDims.isActive = newValue;
    },
    ascension(newValue) {
      player.auto.ascension.isActive = newValue;
    },
    singularity(newValue) {
      player.auto.singularity.isActive = newValue;
    },
    annihilation(newValue) {
      player.auto.annihilation.isActive = newValue;
    },
  },
  methods: {
    update() {
      this.hasDimension = Autobuyer.darkMatterDims.isUnlocked;
      this.hasAscension = Autobuyer.darkMatterDimsAscension.isUnlocked;
      this.hasSingularity = Autobuyer.singularity.isUnlocked;
      this.hasAnnihilated = Autobuyer.annihilation.isUnlocked;
      const auto = player.auto;
      this.dimension = auto.darkMatterDims.isActive;
      this.ascension = auto.ascension.isActive;
      this.singularity = auto.singularity.isActive;
      this.annihilation = auto.annihilation.isActive;

      this.maxAutobuy = SingularityMilestone.darkDimensionAutobuyers.effectValue;
      this.maxAutoAscend = SingularityMilestone.ascensionAutobuyers.effectValue;
      this.autoSingularityFactor = SingularityMilestone.autoCondense.effectValue;
    },
  },
  template: `
  <div
    v-if="hasDimension || hasAscension || hasSingularity || hasAnnihilated"
    class="c-laitela-singularity-container"
  >
    <PrimaryToggleButton
      v-if="hasDimension"
      v-model="dimension"
      class="c-laitela-automation-toggle"
      label="自动购买暗物质维度："
      :on="autobuyStr"
    />
    <PrimaryToggleButton
      v-if="hasAscension"
      v-model="ascension"
      class="c-laitela-automation-toggle"
      label="自动飞升："
      :on="autoAscendStr"
    />
    <PrimaryToggleButton
      v-if="hasSingularity"
      v-model="singularity"
      class="c-laitela-automation-toggle"
      label="自动凝聚："
      :on="autoSingularityStr"
    />
    <PrimaryToggleButton
      v-if="hasAnnihilated"
      v-model="annihilation"
      class="c-laitela-automation-toggle"
      label="自动湮灭："
    />
  </div>
  `
};