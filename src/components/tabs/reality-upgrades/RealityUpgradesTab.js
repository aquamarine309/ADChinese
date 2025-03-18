import RealityUpgradeButton from './RealityUpgradeButton.js'

export default {
  name: 'RealityUpgradesTab',
  components: {
    RealityUpgradeButton,
  },
  computed: {
    // 获取所有现实升级
    upgrades: () => RealityUpgrades.all,

    // 成本增长提示
    costScalingTooltip: () => `价格在超过 ${format(1e30)} 现实机器后会更快增长，然后在超过 ${format(Decimal.NUMBER_MAX_VALUE, 1)} 现实机器后会进一步加速增长`,

    // 可能性提示
    possibleTooltip: () => `带格子图案的升级在当前现实中无法解锁。带条纹图案的升级仍然可以解锁。`,

    // 锁定提示
    lockTooltip: () => `此功能仅在您尚未满足条件或解锁该升级时生效。`,
  },
  methods: {
    id(row, column) {
      return (row - 1) * 5 + column - 1
    },
  },
  template: `
<div class="l-reality-upgrade-grid">
    <div
      class="c-reality-upgrade-infotext"
      data-v-reality-upgrades-tab
    >
      鼠标悬停 <i class="fas fa-question-circle" /> 图标以获取更多信息。
      <br>
      第一行的升级可以无限次购买，但花费会逐渐增加
      <span :ach-tooltip="costScalingTooltip">
        <i class="fas fa-question-circle" />
      </span>
      ，其余升级为一次性购买。
      <br>
      一次性升级还有解锁条件，一旦完成，将永久解锁在任何时间购买该升级的能力。
      <span :ach-tooltip="possibleTooltip">
        <i class="fas fa-question-circle" />
      </span>
      <br>
      默认情况下，未解锁的升级显示其条件和效果；已解锁的升级显示其效果、当前加成和花费。按住Shift可切换此行为。
      <br>
      你可以按住Shift点击带有 <i class="fas fa-lock-open" /> 的升级，使游戏阻止你在本次现实中执行任何可能导致无法满足其解锁条件的操作。
      <span :ach-tooltip="lockTooltip">
        <i class="fas fa-question-circle" />
      </span>
      <br>
      每完成一行升级购买，你的符文等级将增加 {{ formatInt(1) }}。
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
  `,
}
