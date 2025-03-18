import { IntervaledAutobuyerState } from './autobuyer.js'

export class DilationUpgradeAutobuyerState extends IntervaledAutobuyerState {
  get _upgradeName() {
    return ['dtGain', 'galaxyThreshold', 'tachyonGain'][this.id - 1]
  }

  get data() {
    return player.auto.dilationUpgrades.all[this.id - 1]
  }

  get name() {
    return [`膨胀时间乘数`, `超光速粒子阈值`, '超光速粒子乘数'][this.id - 1]
  }

  get interval() {
    return (1000 * Perk.autobuyerFasterDilation.effectOrDefault(1)) / PerkShopUpgrade.autoSpeed.effectOrDefault(1)
  }

  get isUnlocked() {
    return Perk.autobuyerDilation.isEffectActive && !Pelle.isDoomed
  }

  get resetTickOn() {
    return PRESTIGE_EVENT.REALITY
  }

  get bulk() {
    return Effects.product(PerkShopUpgrade.bulkDilation, Perk.dilationAutobuyerBulk)
  }

  tick() {
    super.tick()
    const upgradeName = this._upgradeName
    DilationUpgrade[upgradeName].purchase(this.bulk)
  }

  static get entryCount() {
    return 3
  }
  static get autobuyerGroupName() {
    return '膨胀升级'
  }
  static get isActive() {
    return player.auto.dilationUpgrades.isActive
  }
  static set isActive(value) {
    player.auto.dilationUpgrades.isActive = value
  }
}
