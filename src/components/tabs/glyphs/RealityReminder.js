export default {
  name: 'RealityReminder',
  data() {
    return {
      canReality: false,
      isVisible: false,
      isExpanded: false,
      ecCount: 0,
      missingAchievements: 0,
      unpurchasedDilationUpgrades: 0,
      currLog10EP: 0,
      cheapestLog10TD: 0,
      multEPLog10Cost: 0,
      purchasableTS: 0,
      hasDilated: 0,
      availableCharges: 0,
    }
  },
  computed: {
    suggestions() {
      const arr = []
      if (this.purchasableTS > 0) {
        arr.push(`购买更多时间研究（${formatInt(this.purchasableTS)} 个可用）`)
      }
      if (this.missingAchievements > 0) {
        arr.push(`完成剩余的成就（${formatInt(this.missingAchievements)} 个未完成）`)
      }
      if (this.unpurchasedDilationUpgrades > 0) {
        arr.push(`购买剩余的膨胀升级（${formatInt(this.unpurchasedDilationUpgrades)} 个未购买）`)
      }
      if (this.currLog10EP > 1.3 * this.cheapestLog10TD) {
        arr.push(`购买更多时间维度（最低价：${format(Decimal.pow10(this.cheapestLog10TD))} EP）`)
      }
      if (this.currLog10EP > 1.3 * this.multEPLog10Cost) {
        arr.push(`购买更多 ${formatX(5)} EP（成本：${format(Decimal.pow10(this.multEPLog10Cost))} EP）`)
      }
      if (this.ecCount < 60) {
        arr.push(`完成剩余的永恒挑战（已完成：${formatInt(this.ecCount)}/${formatInt(60)}）`)
      }
      if (!this.hasDilated) {
        arr.push('执行一次膨胀永恒')
      }
      if (this.availableCharges > 0) {
        arr.push(`充能更多无限升级（${formatInt(this.availableCharges)} 个可用）`)
      }
      return arr
    },
    canBeExpanded() {
      return this.canReality && this.suggestions.length !== 0
    },
    styleObject() {
      const color = !this.canReality || this.canBeExpanded ? 'var(--color-bad)' : 'var(--color-good)'
      // 同时包含 is 和 canBe 以在所有建议完成后强制将高度恢复到最小尺寸
      const height = this.canBeExpanded && this.isExpanded ? `${6.5 + 1.5 * this.suggestions.length}rem` : '5rem'
      return {
        color,
        height,
      }
    },
    clickText() {
      return `（点击以${this.isExpanded ? '收起' : '展开'}）`
    },
    realityReminderClass() {
      return {
        'c-reality-reminder': true,
        'c-reality-reminder-pointer': this.canBeExpanded,
      }
    },
    dropDownIconClass() {
      return this.isExpanded ? 'far fa-minus-square' : 'far fa-plus-square'
    },
  },
  created() {
    // Collapsing it after every reality resets the height to its fixed minimum value, stopping screen jitter
    this.on$(GAME_EVENT.REALITY_RESET_AFTER, () => (this.isExpanded = false))
  },
  methods: {
    update() {
      this.canReality = TimeStudy.reality.isBought
      this.isVisible = !isInCelestialReality()
      this.ecCount = EternityChallenges.completions
      this.missingAchievements = Achievements.preReality.countWhere((a) => !a.isUnlocked)
      // Repeatable dilation upgrades don't have isBought, but do have boughtAmount
      this.unpurchasedDilationUpgrades = DilationUpgrade.all.countWhere((u) => (u.isBought === undefined ? u.boughtAmount === 0 : !u.isBought) && !u.config.pelleOnly)
      this.currLog10EP = player.eternityPoints.log10()
      this.cheapestLog10TD = Math.min(...TimeDimensions.all.map((x) => x.cost.log10()))
      this.multEPLog10Cost = EternityUpgrade.epMult.cost.log10()
      this.purchasableTS = NormalTimeStudyState.studies.countWhere((s) => s && s.canBeBought && !s.isBought)
      this.hasDilated = Perk.startTP.canBeApplied ? player.dilation.lastEP.gt(0) : player.dilation.tachyonParticles.gt(0)
      this.availableCharges = Ra.chargesLeft
    },
    clicked() {
      if (!this.canBeExpanded) return
      this.isExpanded = !this.isExpanded
    },
  },
  template: `
  <div
    v-if="isVisible"
    :class="realityReminderClass"
    :style="styleObject"
    @click="clicked"
    data-v-reality-reminder
  >
    <span v-if="!canReality">
      你仍然需要在时间研究标签页解锁现实。
    </span>
    <span v-else-if="suggestions.length === 0">
      准备现实！你已经解锁了本次现实中所有的可升级项。
    </span>
    <span v-else>
      <i :class="dropDownIconClass" />
      你可能需要在现实前做 {{ formatInt(suggestions.length) }} 件事情. {{ clickText }}
      <div
        v-if="isExpanded"
        class="l-suggestions"
      >
        <br>
        <div
          v-for="suggestion in suggestions"
          :key="suggestion"
          data-v-reality-reminder
        >
          {{ suggestion }}
        </div>
      </div>
    </span>
  </div>
  `,
}
