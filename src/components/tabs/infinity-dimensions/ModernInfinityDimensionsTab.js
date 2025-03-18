import InfinityDimensionRow from './ModernInfinityDimensionRow.js'
import PrimaryButton from '../../PrimaryButton.js'

export default {
  name: 'ModernInfinityDimensionsTab',
  components: {
    PrimaryButton,
    InfinityDimensionRow,
  },
  data() {
    return {
      infinityPower: new Decimal(0),
      dimMultiplier: new Decimal(0),
      powerPerSecond: new Decimal(0),
      isEC7Running: false,
      isEC8Running: false,
      EC8PurchasesLeft: 0,
      isEC9Running: false,
      isEnslavedRunning: false,
      isAnyAutobuyerUnlocked: false,
      conversionRate: 0,
      nextDimCapIncrease: 0,
      tesseractCost: new Decimal(0),
      totalDimCap: 0,
      canBuyTesseract: false,
      enslavedCompleted: false,
      boughtTesseracts: 0,
      extraTesseracts: 0,
      creditsClosed: false,
      showLockedDimCostNote: true,
    }
  },
  computed: {
    tesseractCountString() {
      const extra = this.extraTesseracts > 0 ? ` + ${format(this.extraTesseracts, 2, 2)}` : ''
      return `${formatInt(this.boughtTesseracts)}${extra}`
    },
  },
  methods: {
    update() {
      this.showLockedDimCostNote = !InfinityDimension(8).isUnlocked
      this.isEC9Running = EternityChallenge(9).isRunning
      this.infinityPower.copyFrom(Currency.infinityPower)
      this.conversionRate = InfinityDimensions.powerConversionRate
      if (this.isEC9Running) {
        this.dimMultiplier.copyFrom(Decimal.pow(Math.max(this.infinityPower.log2(), 1), 4).max(1))
      } else {
        this.dimMultiplier.copyFrom(this.infinityPower.pow(this.conversionRate).max(1))
      }
      this.powerPerSecond.copyFrom(InfinityDimension(1).productionPerSecond)
      this.isEC7Running = EternityChallenge(7).isRunning
      this.isEC8Running = EternityChallenge(8).isRunning
      if (this.isEC8Running) {
        this.EC8PurchasesLeft = player.eterc8ids
      }
      this.isEnslavedRunning = Enslaved.isRunning
      this.isAnyAutobuyerUnlocked = Autobuyer.infinityDimension(1).isUnlocked
      this.nextDimCapIncrease = Tesseracts.nextTesseractIncrease
      this.tesseractCost.copyFrom(Tesseracts.nextCost)
      this.totalDimCap = InfinityDimensions.totalDimCap
      this.canBuyTesseract = Tesseracts.canBuyTesseract
      this.enslavedCompleted = Enslaved.isCompleted
      this.boughtTesseracts = Tesseracts.bought
      this.extraTesseracts = Tesseracts.extra
      this.creditsClosed = GameEnd.creditsEverClosed
    },
    maxAll() {
      InfinityDimensions.buyMax()
    },
    toggleAllAutobuyers() {
      toggleAllInfDims()
    },
    buyTesseract() {
      Tesseracts.buyTesseract()
    },
  },
  template: `
  <div class="l-infinity-dim-tab">
    <div class="c-subtab-option-container">
      <PrimaryButton
        v-if="!isEC8Running"
        class="o-primary-btn--subtab-option"
        @click="maxAll"
      >
        购买最大数量
      </PrimaryButton>
      <PrimaryButton
        v-if="isAnyAutobuyerUnlocked && !isEC8Running"
        class="o-primary-btn--subtab-option"
        @click="toggleAllAutobuyers"
      >
        自动购买器状态切换
      </PrimaryButton>
    </div>
    <div>
      <p>
        你拥有
        <span class="c-infinity-dim-description__accent">{{ format(infinityPower, 2, 1) }}</span>
        无限之力。
        <br>
        <span v-if="!isEC9Running">
          增加
          <span class="c-infinity-dim-description__accent">{{ formatPow(conversionRate, 2, 3) }}</span>
        </span>
        <span v-else>
          转化
        </span>
        为
        <span v-if="!isEC9Running">反物质维度</span>
        <span v-else>时间维度</span>
        提供
        <span class="c-infinity-dim-description__accent">{{ formatX(dimMultiplier, 2, 1) }}</span>
        的加成。
      </p>
    </div>
    <div
      v-if="enslavedCompleted"
      class="l-infinity-dim-tab__enslaved-reward-container"
    >
      <button
        class="c-infinity-dim-tab__tesseract-button"
        :class="{
          'c-infinity-dim-tab__tesseract-button--disabled': !canBuyTesseract,
          'o-pelle-disabled-pointer': creditsClosed
        }"
        @click="buyTesseract"
      >
        <p>
          购买一个超立方体（{{ tesseractCountString }}）
        </p>
        <p>无限维度的数量上限增加 {{ format(nextDimCapIncrease, 2) }}</p>
        <p><b>价格：{{ format(tesseractCost) }} 无限点数</b></p>
      </button>
    </div>
    <div v-if="isEnslavedRunning">
      所有无限维度都只能购买一次。
    </div>
    <div v-else>
      除第八无限维度外，所有无限维度均限最多购买 {{ format(totalDimCap, 2) }} 次。
    </div>
    <div v-if="isEC7Running">你每秒能得到 {{ format(powerPerSecond, 2, 0) }} 第七维度。</div>
    <div v-else>你每秒能得到 {{ format(powerPerSecond, 2, 0) }} 无限之力。</div>
    <b
      v-if="isEC8Running"
      class="l-infinity-dim-tab__ec8-purchases"
    >
      你还能买 {{ formatInt(EC8PurchasesLeft) }} 次。
    </b>
    <div class="l-dimensions-container">
      <InfinityDimensionRow
        v-for="tier in 8"
        :key="tier"
        :tier="tier"
      />
    </div>
    <div v-if="showLockedDimCostNote">
      按住shift查看解锁新无限维度所需的无限点数
    </div>
  </div>
  `,
}
