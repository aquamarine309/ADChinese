import InfinityUpgradeButton from '../../InfinityUpgradeButton.js'
import IpMultiplierButton from './IpMultiplierButton.js'
import PrimaryButton from '../../PrimaryButton.js'

export default {
  name: 'InfinityUpgradesTab',
  components: {
    PrimaryButton,
    InfinityUpgradeButton,
    IpMultiplierButton,
  },
  data() {
    return {
      isUseless: false,
      chargeUnlocked: false,
      totalCharges: 0,
      chargesUsed: 0,
      disCharge: false,
      ipMultSoftCap: 0,
      ipMultHardCap: 0,
      eternityUnlocked: false,
      bottomRowUnlocked: false,
      styleOfColumnBg: undefined,
    }
  },
  computed: {
    grid() {
      return [
        [InfinityUpgrade.totalTimeMult, InfinityUpgrade.dim18mult, InfinityUpgrade.dim36mult, InfinityUpgrade.resetBoost],
        [InfinityUpgrade.buy10Mult, InfinityUpgrade.dim27mult, InfinityUpgrade.dim45mult, InfinityUpgrade.galaxyBoost],
        [InfinityUpgrade.thisInfinityTimeMult, InfinityUpgrade.unspentIPMult, InfinityUpgrade.dimboostMult, InfinityUpgrade.ipGen],
        [InfinityUpgrade.skipReset1, InfinityUpgrade.skipReset2, InfinityUpgrade.skipReset3, InfinityUpgrade.skipResetGalaxy],
      ]
    },
    allColumnUpgrades() {
      return this.grid.flat()
    },
    disChargeClassObject() {
      return {
        'o-primary-btn--subtab-option': true,
        'o-primary-btn--charged-respec-active': this.disCharge,
      }
    },
    offlineIpUpgrade: () => InfinityUpgrade.ipOffline,
  },
  watch: {
    disCharge(newValue) {
      player.celestials.ra.disCharge = newValue
    },
  },
  created() {
    this.on$(GAME_EVENT.INFINITY_UPGRADE_BOUGHT, () => this.setStyleOfColumnBg())
    this.on$(GAME_EVENT.INFINITY_UPGRADE_CHARGED, () => this.setStyleOfColumnBg())
    this.on$(GAME_EVENT.INFINITY_UPGRADES_DISCHARGED, () => this.setStyleOfColumnBg())

    this.setStyleOfColumnBg()
  },
  methods: {
    update() {
      this.isUseless = Pelle.isDoomed
      this.chargeUnlocked = Ra.unlocks.chargedInfinityUpgrades.canBeApplied && !Pelle.isDoomed
      this.totalCharges = Ra.totalCharges
      this.chargesUsed = Ra.totalCharges - Ra.chargesLeft
      this.disCharge = player.celestials.ra.disCharge
      this.ipMultSoftCap = GameDatabase.infinity.upgrades.ipMult.costIncreaseThreshold
      this.ipMultHardCap = GameDatabase.infinity.upgrades.ipMult.costCap
      this.eternityUnlocked = PlayerProgress.current.isEternityUnlocked
      this.bottomRowUnlocked = Achievement(41).isUnlocked
    },
    btnClassObject(column) {
      const classObject = {
        'l-infinity-upgrade-grid__cell': true,
      }
      if (column > 0) {
        // Indexing starts from 0, while css classes start from 2 (and first column has default css class)
        classObject[`o-infinity-upgrade-btn--color-${column + 1}`] = true
      }
      return classObject
    },
    getColumnColor(location) {
      if (location.isCharged) return 'var(--color-teresa--base)'
      if (location.isBought) return 'var(--color-infinity)'
      return 'transparent'
    },
    setStyleOfColumnBg() {
      this.styleOfColumnBg = this.grid.map((col) => ({
        background: `linear-gradient(to bottom,
          ${this.getColumnColor(col[0])} 15%,
          ${this.getColumnColor(col[1])} 35% 40%,
          ${this.getColumnColor(col[2])} 60% 65%,
          ${this.getColumnColor(col[3])} 85% 100%`,
      }))
    },
  },
  template: `
<div
    class="l-infinity-upgrades-tab"
    data-v-infinity-upgrades-tab
  >
    <div
      v-if="chargeUnlocked"
      class="c-subtab-option-container"
      data-v-infinity-upgrades-tab
    >
      <PrimaryButton
        :class="disChargeClassObject"
        @click="disCharge = !disCharge"
        data-v-infinity-upgrades-tab
      >
        在下个现实重置无限升级充能
      </PrimaryButton>
    </div>
    <div v-if="chargeUnlocked">
      已充能{{ formatInt(chargesUsed) }}/{{ formatInt(totalCharges) }}个无限升级。
      充能无限升级会改变其效果。
      <br>
      按住Shift显示充能无限升级。你可以在重启现实时免费重置选择。
    </div>
    <div v-if="isUseless">
      处于被毁灭现实中时无法充能无限升级。
    </div>
    <br>
    每列中的升级必须从上至下依次购买。
    <br>
    <div
      class="l-infinity-upgrade-grid l-infinity-upgrades-tab__grid"
      data-v-infinity-upgrades-tab
    >
      <div
        v-for="(column, columnId) in grid"
        :key="columnId"
        class="c-infinity-upgrade-grid__column"
        data-v-infinity-upgrades-tab
      >
        <InfinityUpgradeButton
          v-for="upgrade in column"
          :key="upgrade.id"
          :upgrade="upgrade"
          :class="btnClassObject(columnId)"
          data-v-infinity-upgrades-tab
        />
        <div
          class="c-infinity-upgrade-grid__column--background"
          :style="styleOfColumnBg[columnId]"
          data-v-infinity-upgrades-tab
        />
      </div>
    </div>
    <div
      v-if="bottomRowUnlocked"
      class="l-infinity-upgrades-bottom-row"
      data-v-infinity-upgrades-tab
    >
      <IpMultiplierButton
        class="l-infinity-upgrades-tab__mult-btn"
        data-v-infinity-upgrades-tab
      />
      <InfinityUpgradeButton
        :upgrade="offlineIpUpgrade"
        :class="btnClassObject(1)"
        data-v-infinity-upgrades-tab
      />
    </div>
    <div v-if="eternityUnlocked && bottomRowUnlocked">
      当拥有超过{{ formatPostBreak(ipMultSoftCap) }}无限点数时，
      <br>
      无限点数倍率会变得更昂贵，且在超过{{ formatPostBreak(ipMultHardCap) }}无限点数后无法购买。
    </div>
  </div>
  `,
}
