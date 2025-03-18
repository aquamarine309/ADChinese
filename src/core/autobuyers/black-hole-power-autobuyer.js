import { AutobuyerState } from './autobuyer.js'

export class BlackHolePowerAutobuyerState extends AutobuyerState {
  get data() {
    return player.auto.blackHolePower.all[this.id - 1]
  }

  get name() {
    return `黑洞 ${this.id} 力量`
  }

  get isUnlocked() {
    return Ra.unlocks.blackHolePowerAutobuyers.canBeApplied
  }

  get hasUnlimitedBulk() {
    return true
  }

  tick() {
    const bh = BlackHole(this.id)
    while (Currency.realityMachines.gte(bh.powerUpgrade.cost)) bh.powerUpgrade.purchase()
  }

  static get entryCount() {
    return 2
  }
  static get autobuyerGroupName() {
    return '黑洞力量'
  }
  static get isActive() {
    return player.auto.blackHolePower.isActive
  }
  static set isActive(value) {
    player.auto.blackHolePower.isActive = value
  }
}
