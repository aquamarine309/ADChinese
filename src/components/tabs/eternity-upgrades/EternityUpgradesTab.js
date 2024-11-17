import EPMultiplierButton from "./EPMultiplierButton.js";
import EternityUpgradeButton from "./EternityUpgradeButton.js";

export default {
  name: "EternityUpgradesTab",
  components: {
    EternityUpgradeButton,
    EPMultiplierButton
  },
  computed: {
    grid() {
      return [
        [
          EternityUpgrade.idMultEP,
          EternityUpgrade.idMultEternities,
          EternityUpgrade.idMultICRecords
        ],
        [
          EternityUpgrade.tdMultAchs,
          EternityUpgrade.tdMultTheorems,
          EternityUpgrade.tdMultRealTime,
        ]
      ];
    },
    costIncreases: () => EternityUpgrade.epMult.costIncreaseThresholds.map(x => new Decimal(x))
  },
  methods: {
    formatPostBreak
  },
  template: `
  <div
    class="l-eternity-upgrades-grid"
    data-v-eternity-upgrades-tab
  >
    <div
      v-for="(row, i) in grid"
      :key="i"
      class="l-eternity-upgrades-grid__row"
      data-v-eternity-upgrades-tab
    >
      <EternityUpgradeButton
        v-for="upgrade in row"
        :key="upgrade.id"
        :upgrade="upgrade"
        class="l-eternity-upgrades-grid__cell"
        data-v-eternity-upgrades-tab
      />
    </div>
    <EPMultiplierButton data-v-eternity-upgrades-tab />
    <div>
      永恒点数倍增的价格在 {{ format(costIncreases[0]) }}, {{ format(costIncreases[1], 2) }} 和 {{ formatPostBreak(costIncreases[2]) }} 永恒点数时加速增长。
      <br>
      永恒点数超过 {{ formatPostBreak(costIncreases[3]) }} 后，价格呈超指数增长。
    </div>
  </div>
  `
};