import NewTimeDimensionRow from './ModernTimeDimensionRow.js'
import PrimaryButton from '../../PrimaryButton.js'

export default {
  name: 'NewTimeDimensionsTab',
  components: {
    PrimaryButton,
    NewTimeDimensionRow,
  },
  data() {
    return {
      totalUpgrades: 0,
      multPerTickspeed: 0,
      tickspeedSoftcap: 0,
      timeShards: new Decimal(0),
      upgradeThreshold: new Decimal(0),
      shardsPerSecond: new Decimal(0),
      incomeType: '',
      areAutobuyersUnlocked: false,
      showLockedDimCostNote: true,
    }
  },
  computed: {
    costIncreases: () => TimeDimension(1).costIncreaseThresholds,
  },
  methods: {
    update() {
      this.showLockedDimCostNote = !TimeDimension(8).isUnlocked && player.realities >= 1
      this.totalUpgrades = player.totalTickGained
      this.multPerTickspeed = FreeTickspeed.multToNext
      this.tickspeedSoftcap = FreeTickspeed.softcap
      this.timeShards.copyFrom(Currency.timeShards)
      this.upgradeThreshold.copyFrom(FreeTickspeed.fromShards(Currency.timeShards.value).nextShards)
      this.shardsPerSecond.copyFrom(TimeDimension(1).productionPerSecond)
      this.incomeType = EternityChallenge(7).isRunning ? 'Eighth Infinity Dimensions' : 'Time Shards'
      this.areAutobuyersUnlocked = Autobuyer.timeDimension(1).isUnlocked
    },
    maxAll() {
      tryUnlockTimeDimensions()
      maxAllTimeDimensions()
    },
    toggleAllAutobuyers() {
      toggleAllTimeDims()
    },
  },
  template: `
  <div class="l-time-dim-tab l-centered-vertical-tab">
    <div class="c-subtab-option-container">
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        @click="maxAll"
      >
        购买最大数量
      </PrimaryButton>
      <PrimaryButton
        v-if="areAutobuyersUnlocked"
        class="o-primary-btn--subtab-option"
        @click="toggleAllAutobuyers"
      >
        自动购买器状态切换
      </PrimaryButton>
    </div>
<div>
  <p>
    你已从
    <span class="c-time-dim-description__accent">{{ format(timeShards, 2, 1) }}</span>个时间碎片中获得了
    <span class="c-time-dim-description__accent">{{ formatInt(totalUpgrades) }}</span>次计数频率升级。
  </p>

  <p>
    下次计数频率升级将在
    <span class="c-time-dim-description__accent">{{ format(upgradeThreshold, 2, 1) }}</span>时解锁，每获得一次计数频率升级，该数值将以
    <span class="c-time-dim-description__accent">{{ formatX(multPerTickspeed, 2, 2) }}</span>的倍率增长。
  </p>
</div>

<div>
  当计数频率升级超过{{ formatInt(tickspeedSoftcap) }}次后，后续每次升级所需资源将开始递增。
</div>

<div>
  你当前每秒获得 {{ format(shardsPerSecond, 2, 0) }} 个时间碎片。
</div>

<div class="l-dimensions-container">
  <NewTimeDimensionRow
    v-for="tier in 8"
    :key="tier"
    :tier="tier"
    :are-autobuyers-unlocked="areAutobuyersUnlocked"
  />
</div>

<div>
  时间维度成本在{{ format(costIncreases[0], 2, 2) }}和
  {{ format(costIncreases[1]) }}永恒点数时会出现跃升，
  <br>
  在超过{{ format(costIncreases[2]) }}永恒点数后，成本增长将显著加快。
  
  <div v-if="showLockedDimCostNote">
    按住Shift键可查看未解锁时间维度所需的永恒点数。
  </div>
  
  当第8时间维度购买数量超过{{ format(1e8) }}后，将不再提供乘数加成。
</div>
</div>
  `,
}
