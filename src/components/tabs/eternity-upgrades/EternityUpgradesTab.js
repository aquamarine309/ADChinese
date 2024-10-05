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
      The cost for the {{ formatX(5) }} multiplier jumps at {{ format(costIncreases[0]) }},
      {{ formatPostBreak(costIncreases[1], 2) }}, and {{ formatPostBreak(costIncreases[2]) }} Eternity Points.
      <br>
      The cost increases super-exponentially after {{ formatPostBreak(costIncreases[3]) }} Eternity Points.
    </div>
  </div>
  `
};