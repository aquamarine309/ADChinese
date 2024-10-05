import PelleRift from "./PelleRift.js";

export default {
  name: "PelleBarPanel",
  components: {
    PelleRift
  },
  data() {
    return {
      decayRate: 0,
      isCollapsed: false,
    };
  },
  computed: {
    collapseIcon() {
      return this.isCollapsed
        ? "fas fa-expand-arrows-alt"
        : "fas fa-compress-arrows-alt";
    },
    strikes() {
      return PelleStrikes.all;
    }
  },
  methods: {
    update() {
      this.decayRate = Pelle.riftDrainPercent;
      this.isCollapsed = player.celestials.pelle.collapsed.rifts;
    },
    toggleCollapse() {
      player.celestials.pelle.collapsed.rifts = !this.isCollapsed;
    },
  },
  template: `
  <div
    class="l-pelle-panel-container"
    data-v-pelle-bar-panel
  >
    <div
      class="c-pelle-panel-title"
      data-v-pelle-bar-panel
    >
      <i
        :class="collapseIcon"
        class="c-collapse-icon-clickable"
        @click="toggleCollapse"
        data-v-pelle-bar-panel
      />
      佩勒冲击和裂痕
    </div>
    <div
      v-if="!isCollapsed"
      class="l-pelle-content-container"
      data-v-pelle-bar-panel
    >
      点击裂痕的填充条，可以填充裂痕
      <br>
      <span v-if="strikes.length > 1">你不能同时填充超过两个裂痕。</span>
      <br v-else>
      填充裂痕时，每秒消耗对应资源的 {{ formatPercents(decayRate) }}。
      <br>
      未填充裂痕时，裂痕的效果仍然生效，效果的强度基于已填充的资源总量。
      <b
        class="o-strike-warning"
        data-v-pelle-bar-panel
      >佩勒冲击的削弱永久存在，不受末日重置影响！</b>
      <div
        class="c-pelle-bar-container"
        data-v-pelle-bar-panel
      >
        <PelleRift
          v-for="strike in strikes"
          :key="strike.config.id"
          :strike="strike"
          data-v-pelle-bar-panel
        />
      </div>
    </div>
  </div>
  `
};