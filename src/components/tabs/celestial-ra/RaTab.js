import CelestialQuoteHistory from '../../CelestialQuoteHistory.js'
import RaPet from './RaPet.js'
import RaPetRemembranceButton from './RaPetRemembranceButton.js'

export default {
  name: 'RaTab',
  components: {
    RaPet,
    RaPetRemembranceButton,
    CelestialQuoteHistory,
  },
  data() {
    return {
      memoriesPerChunk: 0,
      showReality: false,
      isRaCapped: false,
      totalLevels: 0,
      showRemembrance: false,
      hasRemembrance: false,
      remembranceReq: 0,
      remembranceMult: 1,
      remembranceNerf: 1,
      petWithRemembrance: '',
      isRunning: false,
      memoryBoosts: '',
    }
  },
  computed: {
    laitelaUnlock: () => Laitela.isUnlocked,
    pets: () => [
      {
        pet: Ra.pets.teresa,
        scalingUpgradeVisible: () => Ra.unlocks.chargedInfinityUpgrades.isUnlocked,
        scalingUpgradeText: () => `你可以充能 ${formatInt(Ra.totalCharges)} 个无限升级。`,
      },
      {
        pet: Ra.pets.effarig,
        scalingUpgradeVisible: () => AlchemyResources.all.filter((r) => r.isUnlocked).length > 0,
        scalingUpgradeText: () => {
          const resources = AlchemyResources.all.filter((r) => r.isUnlocked).length
          return `你已解锁 ${formatInt(resources)} 个炼金资源。`
        },
      },
      {
        pet: Ra.pets.enslaved,
        scalingUpgradeVisible: () => Ra.unlocks.improvedStoredTime.isUnlocked,
        scalingUpgradeText: () =>
          `存储的游戏时间 ${formatX(Ra.unlocks.improvedStoredTime.effects.gameTimeAmplification.effectOrDefault(1), 2)}, 且存储现实时间的上限 +${formatInt(
            Ra.unlocks.improvedStoredTime.effects.realTimeCap.effectOrDefault(0) / (1000 * 3600)
          )} 小时。`,
      },
      {
        pet: Ra.pets.v,
        scalingUpgradeVisible: () => Ra.unlocks.unlockHardV.isUnlocked,
        scalingUpgradeText: () => {
          const triadCount = Ra.unlocks.unlockHardV.effectOrDefault(0)
          return `你已解锁了 ${formatInt(triadCount)} 个三体研究。`
        },
      },
    ],
    petStyle() {
      return {
        color: this.petWithRemembrance === '' ? 'white' : this.pets.find((pet) => pet.pet.key === this.petWithRemembrance).pet.color,
      }
    },
    runButtonClassObject() {
      return {
        'c-ra-run-button__icon': true,
        'c-ra-run-button__icon--running': this.isRunning,
        'c-celestial-run-button--clickable': !this.isDoomed,
        'o-pelle-disabled-pointer': this.isDoomed,
      }
    },
    runDescription() {
      return GameDatabase.celestials.descriptions[4].effects().split('\n')
    },
    memoryDescription() {
      return `在太阳神的现实中，天神记忆的记忆块将根据某些资源的数量生成。`
    },
    isDoomed: () => Pelle.isDoomed,
  },
  methods: {
    update() {
      this.memoriesPerChunk = Ra.productionPerMemoryChunk
      this.isRaCapped = Ra.totalPetLevel === 100
      this.totalLevels = Ra.totalPetLevel
      this.showRemembrance = Ra.unlocks.effarigUnlock.canBeApplied
      this.hasRemembrance = Ra.remembrance.isUnlocked
      this.remembranceReq = Ra.remembrance.requiredLevels
      this.remembranceMult = Ra.remembrance.multiplier
      this.remembranceNerf = Ra.remembrance.nerf
      this.petWithRemembrance = Ra.petWithRemembrance
      this.isRunning = Ra.isRunning
      this.memoryBoosts = Ra.memoryBoostResources
    },
    startRun() {
      if (this.isDoomed) return
      Modal.celestials.show({ name: '太阳神的', number: 4 })
    },
    toggleMode() {
      Ra.toggleMode()
    },
  },
  template: `
  <div class="l-ra-celestial-tab">
    <div class="c-ra-memory-header">
      <CelestialQuoteHistory celestial="ra" />
      <div v-if="!isRaCapped">
        每个记忆块每秒生成一个基础记忆<span v-if="memoriesPerChunk > 1">，
          已提升至每秒 {{ format(memoriesPerChunk, 2, 3) }} 个记忆</span>。
        <br>
        存储现实时间会阻止记忆块的生成，但记忆仍会正常获取。
        <span v-if="memoriesPerChunk > 1">
          <br>
          此提升由 {{ memoryBoosts }} 引起。
        </span>
      </div>
      <div v-else>
        已重获所有记忆。
      </div>
    </div>
    <div>
      鼠标悬停进度条下方的图标以查看升级描述，
      <br>
      并悬停 <i class="fas fa-question-circle" /> 图标以获取特定资源信息。
    </div>
    <div class="l-ra-all-pets-container">
      <RaPet
        v-for="(pet, i) in pets"
        :key="i"
        :pet-config="pet"
      />
    </div>
    <div class="l-ra-non-pets">
      <button class="c-ra-run-button">
        <h2 :class="{ 'o-pelle-disabled': isDoomed }">
          <span v-if="isRunning">你目前在太阳神的现实中</span>
          <span v-else>开始太阳神的现实</span>
        </h2>
        <div
          :class="runButtonClassObject"
          @click="startRun"
        >
          <span class="c-ra-run-button__icon__sigil fas fa-sun" />
        </div>
        <span
          v-for="(line, lineId) in runDescription"
          :key="lineId + '-ra-run-desc'"
        >
          {{ line }}
        </span>
        <br>
        <span>
          {{ memoryDescription }}
        </span>
      </button>
      <div
        v-if="showRemembrance && !isRaCapped"
        class="c-ra-remembrance-unlock"
      >
        <h1 :style="petStyle">
          追思
        </h1>
        <span :style="petStyle">
          正在追思的天神获得的记忆块 {{ formatX(remembranceMult) }}. 其他天神获得的记忆块 {{ formatX(remembranceNerf, 1, 1) }}.
        </span>
        <div
          v-if="hasRemembrance"
          class="c-ra-remembrance-unlock-inner"
        >
          <RaPetRemembranceButton
            v-for="(pet, i) in pets"
            :key="i"
            :pet-config="pet"
          />
        </div>
        <div
          v-else
          class="c-ra-remembrance-unlock-inner"
        >
          总共获得 {{ formatInt(remembranceReq) }} 个天神记忆等级以解锁（你还需要 {{ formatInt(remembranceReq - totalLevels) }} 个）
        </div>
      </div>
    </div>
  </div>
  `,
}
