import ArmageddonButton from "./ArmageddonButton.js";
import PelleUpgradeVue from "./PelleUpgrade.js";
import RemnantGainFactor from "./RemnantGainFactor.js";

export default {
  name: "PelleUpgradePanel",
  components: {
    ArmageddonButton,
    PelleUpgradeVue,
    RemnantGainFactor,
  },
  data() {
    return {
      showBought: false,
      isCollapsed: false,
      isHovering: false,
      remnants: 0,
      realityShards: new Decimal(0),
      shardRate: new Decimal(0),
      upgrades: [],
      boughtUpgrades: []
    };
  },
  computed: {
    collapseIcon() {
      return this.isCollapsed
        ? "fas fa-expand-arrows-alt"
        : "fas fa-compress-arrows-alt";
    },
    rebuyables: () => PelleUpgrade.rebuyables,
    visibleUpgrades() { return this.upgrades.slice(0, 5); },
    fadedUpgrades() { return this.upgrades.slice(5, 10); },
    allUpgrades() {
      let upgrades = [];
      if (this.showBought) upgrades = this.boughtUpgrades;
      upgrades = upgrades.concat(this.visibleUpgrades);
      return upgrades;
    },
    showImprovedEstimate() {
      return this.isHovering && !this.shardRate.eq(0);
    }
  },
  methods: {
    update() {
      this.showBought = Pelle.cel.showBought;
      this.isCollapsed = player.celestials.pelle.collapsed.upgrades;
      this.remnants = Pelle.cel.remnants;
      this.realityShards.copyFrom(Pelle.cel.realityShards);
      this.shardRate.copyFrom(Pelle.realityShardGainPerSecond);
      this.upgrades = PelleUpgrade.singles.filter(u => !u.isBought);
      this.boughtUpgrades = PelleUpgrade.singles.filter(u => u.isBought);
    },
    toggleBought() {
      Pelle.cel.showBought = !Pelle.cel.showBought;
      this.$recompute("upgrades");
    },
    toggleCollapse() {
      player.celestials.pelle.collapsed.upgrades = !this.isCollapsed;
    }
  },
  template: `
  <div
    class="l-pelle-panel-container"
    data-v-pelle-upgrade-panel
  >
    <div
      class="c-pelle-panel-title"
      data-v-pelle-upgrade-panel
    >
      <i
        :class="collapseIcon"
        class="c-collapse-icon-clickable"
        @click="toggleCollapse"
        data-v-pelle-upgrade-panel
      />
      佩勒升级
    </div>
    <div
      v-if="!isCollapsed"
      class="l-pelle-content-container"
      data-v-pelle-upgrade-panel
    >
      <div
        class="c-armageddon-container"
        data-v-pelle-upgrade-panel
      >
        <div>
          <div
            class="c-armageddon-button-container"
            @mouseover="isHovering = true"
            @mouseleave="isHovering = false"
            data-v-pelle-upgrade-panel
          >
            <ArmageddonButton data-v-pelle-upgrade-panel />
          </div>
          <RemnantGainFactor
            :hide="showImprovedEstimate"
            data-v-pelle-upgrade-panel
          />
        </div>
        <div
          class="c-armageddon-resources-container"
          data-v-pelle-upgrade-panel
        >
          <div>
            你拥有 <span
              class="c-remnants-amount"
              data-v-pelle-upgrade-panel
            >{{ format(remnants, 2) }}</span> 遗物。
          </div>
          <div>
            你拥有 <span
              class="c-remnants-amount"
              data-v-pelle-upgrade-panel
            >{{ format(realityShards, 2) }}</span> 现实碎片。
            <span
              class="c-remnants-amount"
              data-v-pelle-upgrade-panel
            >+{{ format(shardRate, 2, 2) }}/s</span>
          </div>
        </div>
      </div>
      <div
        class="c-pelle-upgrade-container"
        data-v-pelle-upgrade-panel
      >
        <PelleUpgradeVue
          v-for="upgrade in rebuyables"
          :key="upgrade.config.id"
          :upgrade="upgrade"
          :show-improved-estimate="showImprovedEstimate"
          data-v-pelle-upgrade-panel
        />
      </div>
      <button
        class="o-pelle-button"
        @click="toggleBought"
        data-v-pelle-upgrade-panel
      >
        {{ showBought ? "显示已购买的升级" : "隐藏已购买的升级" }}
      </button>
      <div
        v-if="allUpgrades.length"
        class="c-pelle-upgrade-container"
        data-v-pelle-upgrade-panel
      >
        <PelleUpgradeVue
          v-for="upgrade in allUpgrades"
          :key="upgrade.config.id"
          :upgrade="upgrade"
          :show-improved-estimate="showImprovedEstimate"
          data-v-pelle-upgrade-panel
        />
        <PelleUpgradeVue
          v-for="upgrade in fadedUpgrades"
          :key="upgrade.config.id"
          :upgrade="upgrade"
          faded
          data-v-pelle-upgrade-panel
        />
      </div>
      <div v-else>
        已解锁全部升级！
      </div>
    </div>
  </div>
  `
};