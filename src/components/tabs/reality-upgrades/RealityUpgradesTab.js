import RealityUpgradeButton from "./RealityUpgradeButton.js";

export default {
  name: "RealityUpgradesTab",
  components: {
    RealityUpgradeButton
  },
  computed: {
    upgrades: () => RealityUpgrades.all,
    maxValue: () => Decimal.NUMBER_MAX_VALUE
  },
  methods: {
    id(row, column) {
      return (row - 1) * 5 + column - 1;
    }
  },
  template: `
  <div class="l-reality-upgrade-grid">
    <div
      class="c-reality-upgrade-infotext"
      data-v-reality-upgrades-tab
    >
      第一组升级可以无限购买，但在超过 {{ format(1e30) }} 和 {{ format(maxValue, 1) }} 现实机器后价格增加得更快。
      <br>
      其余的升级是一次性升级，除了需要现实机器外，还需要解锁条件。
      <br>
      一旦完成这些要求，你可以在任何时候永久解锁这些升级。方格背景的升级在此现实中无法解锁，而条纹背景的升级在此现实中仍然可以解锁。
      <br>
      锁定的升级会显示其需求和默认描述，解锁后显示其效果、当前加成以及价格，按住Shift键可切换至该状态。
      <br>
      你可以用Shift点击某些升级来启用锁定条件，以防止游戏在此现实中进行任何会导致你未能满足其解锁条件的操作。
      <br>
      每购买一组完整的现实升级，将多获得一级符文等级。
      <br>
      （购买第一组现实升级的这一效果仅应用一次）
    </div>
    <div
      v-for="row in 5"
      :key="row"
      class="l-reality-upgrade-grid__row"
    >
      <RealityUpgradeButton
        v-for="column in 5"
        :key="id(row, column)"
        :upgrade="upgrades[id(row, column)]"
      />
    </div>
  </div>
  `
};