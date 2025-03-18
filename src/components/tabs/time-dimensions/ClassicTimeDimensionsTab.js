import PrimaryButton from '../../PrimaryButton.js'
import TimeDimensionRow from './ClassicTimeDimensionRow.js'

export default {
  name: 'ClassicTimeDimensionsTab',
  components: {
    PrimaryButton,
    TimeDimensionRow,
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
      this.shardsPerSecond.copyFrom(TimeDimension(1).productionPerRealSecond)
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
        Max all
      </PrimaryButton>
      <PrimaryButton
        v-if="areAutobuyersUnlocked"
        class="o-primary-btn--subtab-option"
        @click="toggleAllAutobuyers"
      >
        Toggle all autobuyers
      </PrimaryButton>
    </div>
    <div>
      <p> 你已从 
        <span class="c-time-dim-description__accent">{{ format(timeShards, 2, 1) }}</span> 个时间碎片中获得了 
        <span class="c-time-dim-description__accent">{{ formatInt(totalUpgrades) }}</span> 次计数频率升级。 
      </p> 
      <p> 下一次计数频率升级将在 <span class="c-time-dim-description__accent">{{ format(upgradeThreshold, 2, 1) }}</span> 
      时解锁，每获得一次计数频率升级，该数值将以 <span class="c-time-dim-description__accent">{{ formatX(multPerTickspeed, 2, 2) }}</span> 的倍率增长。 
      </p>
    </div>
    <div>
      每次升级需要的时间碎片会在 {{ formatInt(tickspeedSoftcap) }} 次计数频率升级后开始增加.
    </div>
    <div>
      你每秒钟获得 {{ format(shardsPerSecond, 2, 0) }} {{ incomeType }} 时间碎片.
    </div>
    <div class="l-dimensions-container">
      <TimeDimensionRow
        v-for="tier in 8"
        :key="tier"
        :tier="tier"
        :are-autobuyers-unlocked="areAutobuyersUnlocked"
      />
    </div>
    <div>
      Time Dimension costs jump at {{ format(costIncreases[0], 2, 2) }} and
      {{ format(costIncreases[1]) }} Eternity Points,
      <br>
      and costs increase much faster after {{ format(costIncreases[2]) }} Eternity Points.
      <br>
      <div v-if="showLockedDimCostNote">
        Hold shift to see the Eternity Point cost for locked Time Dimensions.
      </div>
      Any 8th Time Dimensions purchased above {{ format(1e8) }} will not further increase the multiplier.
    </div>
  </div>
  `,
}
