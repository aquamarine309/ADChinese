import ImaginaryUpgradeButton from './ImaginaryUpgradeButton.js'

export default {
  name: 'ImaginaryUpgradesTab',
  components: {
    ImaginaryUpgradeButton,
  },
  data() {
    return {
      baseRMCap: new Decimal(),
      capRM: new Decimal(),
      scaleTime: 0,
      capStr: '',
    }
  },
  computed: {
    upgrades: () => ImaginaryUpgrades.all,
    lockTooltip: () => `需求锁定只能防止手动和自动操作。任何相关的升级不会被禁用，仍有可能导致需求失败。
`,
  },
  methods: {
    update() {
      this.baseRMCap.copyFrom(MachineHandler.baseRMCap)
      this.capRM.copyFrom(MachineHandler.hardcapRM)
      this.scaleTime = MachineHandler.scaleTimeForIM
      this.capStr = formatMachines(MachineHandler.hardcapRM, MachineHandler.currentIMCap)
    },
    id(row, column) {
      return (row - 1) * 5 + column - 1
    },
  },
  template: `
  <div class="l-reality-upgrade-grid">
    <div
      class="c-cap-text"
      data-v-imaginary-upgrades-tab
    >
      你的机器上限为 <span class="c-reality-tab__reality-machines">{{ capStr }}</span>。
    </div>
    <div
      class="c-info-text"
      data-v-imaginary-upgrades-tab
    >
      你已达到现实的极限，无法持有超过 {{ format(capRM) }} 的现实机器。
      <br>
      超过 {{ format(baseRMCap) }} 的机器将提高你可以拥有的虚幻机器的上限。
      <br>
      虚幻机器会随时间被动获得，直到达到上限，但随着接近上限，获得速度呈指数级减慢。
      <br>
      每 {{ formatInt(scaleTime) }} 秒，你的当前数量与上限之间的虚幻机器差额将减半。
      <br>
      <br>
      前两组升级可以无限购买，其余的升级是一次性升级，除了需要虚幻机器外，还需要解锁条件。
      <br>
      虚幻升级的视觉效果与现实升级标签中的升级相同。
      <span :ach-tooltip="lockTooltip">
        <i class="fas fa-question-circle" />
      </span>
    </div>
    <div
      v-for="row in 5"
      :key="row"
      class="l-reality-upgrade-grid__row"
    >
      <ImaginaryUpgradeButton
        v-for="column in 5"
        :key="id(row, column)"
        :upgrade="upgrades[id(row, column)]"
      />
    </div>
  </div>
  `,
}
