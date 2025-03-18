import { DC } from '../../../core/constants.js'

import CelestialQuoteHistory from '../../CelestialQuoteHistory.js'
import CustomizeableTooltip from '../../CustomizeableTooltip.js'
import GlyphSetPreview from '../../GlyphSetPreview.js'
import PerkShopUpgradeButton from './PerkShopUpgradeButton.js'

export default {
  name: 'TeresaTab',
  components: {
    GlyphSetPreview,
    PerkShopUpgradeButton,
    CelestialQuoteHistory,
    CustomizeableTooltip,
  },
  data() {
    return {
      pour: false,
      time: new Date().getTime(),
      pouredAmount: 0,
      isPouredAmountCapped: false,
      rm: new Decimal(0),
      percentage: '',
      possibleFillPercentage: '',
      rmMult: 0,
      bestAM: new Decimal(0),
      bestAMSet: [],
      lastMachines: new Decimal(0),
      runReward: 0,
      perkPoints: 0,
      hasReality: false,
      hasEPGen: false,
      hasPerkShop: false,
      raisedPerkShop: false,
      isRunning: false,
      canUnlockNextPour: false,
    }
  },
  computed: {
    unlockInfos: () => TeresaUnlocks.all,
    pouredAmountCap: () => Teresa.pouredAmountCap,
    showRunReward() {
      return this.bestAM.gt(1)
    },
    upgrades() {
      const upgrades = [PerkShopUpgrade.glyphLevel, PerkShopUpgrade.rmMult, PerkShopUpgrade.bulkDilation, PerkShopUpgrade.autoSpeed, PerkShopUpgrade.musicGlyph]
      if (this.raisedPerkShop) upgrades.push(PerkShopUpgrade.fillMusicGlyph)
      return upgrades
    },
    runButtonClassObject() {
      return {
        'c-teresa-run-button__icon': true,
        'c-teresa-run-button__icon--running': this.isRunning,
        'c-celestial-run-button--clickable': !this.isDoomed,
        'o-pelle-disabled-pointer': this.isDoomed,
      }
    },
    pourButtonClassObject() {
      return {
        'o-teresa-shop-button': true,
        'c-teresa-pour': true,
        'o-teresa-shop-button--available': !this.isPouredAmountCapped,
        'o-teresa-shop-button--capped': this.isPouredAmountCapped,
        'c-teresa-pour--unlock-available': this.canUnlockNextPour,
        'c-disabled-pour': this.isPouredAmountCapped,
      }
    },
    pourText() {
      return this.isPouredAmountCapped ? '已填充满' : '进贡现实机器'
    },
    runDescription() {
      return GameDatabase.celestials.descriptions[0].effects()
    },
    lastMachinesString() {
      return this.lastMachines.lt(DC.E10000) ? `${format(this.lastMachines, 2)} 现实机器` : `${format(this.lastMachines.dividedBy(DC.E10000), 2)} 虚幻机器`
    },
    unlockInfoTooltipArrowStyle() {
      return {
        borderRight: '0.5rem solid var(--color-teresa--base)',
      }
    },
    isDoomed: () => Pelle.isDoomed,
  },
  methods: {
    update() {
      const now = new Date().getTime()
      if (this.pour) {
        const diff = (now - this.time) / 1000
        Teresa.pourRM(diff)
      } else {
        Teresa.timePoured = 0
      }
      this.time = now
      this.pouredAmount = player.celestials.teresa.pouredAmount
      this.isPouredAmountCapped = this.pouredAmount === this.pouredAmountCap
      this.percentage = `${(Teresa.fill * 100).toFixed(2)}%`
      this.possibleFillPercentage = `${(Teresa.possibleFill * 100).toFixed(2)}%`
      this.rmMult = Teresa.rmMultiplier
      this.hasReality = TeresaUnlocks.run.isUnlocked
      this.hasEPGen = TeresaUnlocks.epGen.isUnlocked
      this.hasPerkShop = TeresaUnlocks.shop.isUnlocked
      this.raisedPerkShop = Ra.unlocks.perkShopIncrease.canBeApplied
      this.bestAM.copyFrom(player.celestials.teresa.bestRunAM)
      this.bestAMSet = Glyphs.copyForRecords(player.celestials.teresa.bestAMSet)
      this.lastMachines.copyFrom(player.celestials.teresa.lastRepeatedMachines)
      this.runReward = Teresa.runRewardMultiplier
      this.perkPoints = Currency.perkPoints.value
      this.rm.copyFrom(Currency.realityMachines)
      this.isRunning = Teresa.isRunning
      this.canUnlockNextPour = TeresaUnlocks.all.filter((unlock) => this.rm.plus(this.pouredAmount).gte(unlock.price) && !unlock.isUnlocked).length > 0
    },
    startRun() {
      if (this.isDoomed) return
      Modal.celestials.show({ name: '特蕾莎的', number: 0 })
    },
    unlockDescriptionHeight(unlockInfo) {
      const maxPrice = TeresaUnlocks[Teresa.lastUnlock].price
      const pos = Math.log1p(unlockInfo.price) / Math.log1p(maxPrice)
      return `calc(${(100 * pos).toFixed(2)}% - 0.1rem)`
    },
    hasUnlock(unlockInfo) {
      return unlockInfo.isUnlocked
    },
    unlockInfoTooltipClass(unlockInfo) {
      return {
        'c-teresa-unlock-description': true,
        'c-teresa-unlock-description--unlocked': this.hasUnlock(unlockInfo),
      }
    },
  },
  template: `
  <div class="l-teresa-celestial-tab">
    <CelestialQuoteHistory celestial="teresa" />
    <div>
      你拥有 {{ format( rm, 2, 2) }} 现实机器。
    </div>
    <div class="l-mechanics-container">
      <div
        v-if="hasReality"
        class="l-teresa-mechanic-container"
      >
        <div class="c-teresa-unlock c-teresa-run-button">
          <span :class="{ 'o-pelle-disabled': isDoomed }">
            开启特蕾莎的现实。
          </span>
          <div
            :class="runButtonClassObject"
            @click="startRun()"
          >
            Ϟ
          </div>
          {{ runDescription }}
          <br><br>
          <div>
            基于在其中获取的反物质数量，这个现实可以被重复击败以获取更强的奖励
            <br><br>
            <span v-if="showRunReward">
              
              <GlyphSetPreview
                text="Teresa's Best Glyph Set"
                :text-hidden="true"
                :force-name-color="false"
                :glyphs="bestAMSet"
              />
            </span>
            <span v-else>
              你还没有完成特蕾莎的现实。
            </span>
          </div>
        </div>
        <div
          v-if="showRunReward"
          class="c-teresa-unlock"
        >
          特蕾莎的现实奖励：符文献祭加成 {{ formatX(runReward, 2, 2) }}
        </div>
        <div
          v-if="hasEPGen"
          class="c-teresa-unlock"
        >
          <span :class="{ 'o-pelle-disabled': isDoomed }">
            每秒钟，你获得本次现实永恒点数峰值的 {{ formatPercents(0.01) }}。
          </span>
        </div>
      </div>
      <div class="l-rm-container l-teresa-mechanic-container">
        <button
          :class="pourButtonClassObject"
          @mousedown="pour = true"
          @touchstart="pour = true"
          @mouseup="pour = false"
          @touchend="pour = false"
          @mouseleave="pour = false"
          data-v-teresa-tab
        >
          {{ pourText }}
        </button>
        <div class="c-rm-store">
          <div
            class="c-rm-store-inner c-rm-store-inner--light"
            :style="{ height: possibleFillPercentage}"
          />
          <div
            class="c-rm-store-inner"
            :style="{ height: percentage}"
          >
            <div class="c-rm-store-label">
              现实机器 {{ formatX(rmMult, 2, 2) }}
              <br>
              {{ format(pouredAmount, 2, 2) }}/{{ format(pouredAmountCap, 2, 2) }}
            </div>
          </div>
          <CustomizeableTooltip
            v-for="unlockInfo in unlockInfos"
            :key="unlockInfo.id"
            content-class="c-teresa-unlock-description--hover-area"
            :bottom="unlockDescriptionHeight(unlockInfo)"
            right="0"
            mode="right"
            :show="true"
            :tooltip-arrow-style="unlockInfoTooltipArrowStyle"
            :tooltip-class="unlockInfoTooltipClass(unlockInfo)"
          >
            <template #mainContent>
              <div
                class="c-teresa-milestone-line"
                :class="{ 'c-teresa-milestone-line--unlocked': hasUnlock(unlockInfo) }"
              />
            </template>
            <template #tooltipContent>
              <b :class="{ 'o-pelle-disabled': unlockInfo.pelleDisabled }">
                {{ format(unlockInfo.price, 2, 2) }}: {{ unlockInfo.description }}
              </b>
            </template>
          </CustomizeableTooltip>
        </div>
      </div>
      <div
        v-if="hasPerkShop"
        class="c-teresa-shop"
      >
        <span class="o-teresa-pp">
          你拥有 {{ format(perkPoints, 2, 0) }} 复兴点数。
        </span>
        <PerkShopUpgradeButton
          v-for="upgrade in upgrades"
          :key="upgrade.id"
          :upgrade="upgrade"
        />
        现在您可以修改符文的外观，使其看起来像音乐符文。
      </div>
      <div
        v-else
        class="l-rm-container-labels l-teresa-mechanic-container"
      />
    </div>
  </div>
  `,
}
