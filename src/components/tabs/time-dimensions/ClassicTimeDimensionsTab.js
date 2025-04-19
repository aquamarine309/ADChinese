import PrimaryButton from "../../PrimaryButton.js";
import TimeDimensionRow from "./ClassicTimeDimensionRow.js";

export default {
  name: "ClassicTimeDimensionsTab",
  components: {
    PrimaryButton,
    TimeDimensionRow
  },
  data() {
    return {
      totalUpgrades: 0,
      multPerTickspeed: 0,
      tickspeedSoftcap: 0,
      timeShards: new Decimal(0),
      upgradeThreshold: new Decimal(0),
      shardsPerSecond: new Decimal(0),
      incomeType: "",
      areAutobuyersUnlocked: false,
      showLockedDimCostNote: true,
    };
  },
  computed: {
    costIncreases: () => TimeDimension(1).costIncreaseThresholds,
  },
  methods: {
    update() {
      this.showLockedDimCostNote = !TimeDimension(8).isUnlocked && player.realities >= 1;
      this.totalUpgrades = player.totalTickGained;
      this.multPerTickspeed = FreeTickspeed.multToNext;
      this.tickspeedSoftcap = FreeTickspeed.softcap;
      this.timeShards.copyFrom(Currency.timeShards);
      this.upgradeThreshold.copyFrom(FreeTickspeed.fromShards(Currency.timeShards.value).nextShards);
      this.shardsPerSecond.copyFrom(TimeDimension(1).productionPerRealSecond);
      this.incomeType = EternityChallenge(7).isRunning ? "第八无限维度" : "时间碎片";
      this.areAutobuyersUnlocked = Autobuyer.timeDimension(1).isUnlocked;
    },
    maxAll() {
      tryUnlockTimeDimensions();
      maxAllTimeDimensions();
    },
    toggleAllAutobuyers() {
      toggleAllTimeDims();
    }
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
        你已获得
        <span class="c-time-dim-description__accent">{{ formatInt(totalUpgrades) }}</span>计数频率升级。
      </p>
      </p>
        你拥有 <span class="c-time-dim-description__accent">{{ format(timeShards, 2, 1) }}</span> 时间碎片。
      </p>
      <p>
        下一个维度提升需要
        <span class="c-time-dim-description__accent">{{ format(upgradeThreshold, 2, 1) }}</span>，每获得一个计数频率升级增加
        <span class="c-time-dim-description__accent">{{ formatX(multPerTickspeed, 2, 2) }}</span>。
      </p>
    </div>
    <div>
      计数频率所需的时间碎片会在 {{ formatInt(tickspeedSoftcap) }} 个升级后增加。
    </div>
    <div>
      你每秒获得 {{ format(shardsPerSecond, 2, 0) }} 个{{ incomeType }}。
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
      时间维度的价格倍率在 {{ format(costIncreases[0], 2, 2) }} 和
      {{ format(costIncreases[1]) }} 永恒点数时增加。
      <br>
      {{ format(costIncreases[2]) }} 永恒点数后，进一步提高时间维度的价格倍率。
      <br>
      <div v-if="showLockedDimCostNote">
        按住Shift键可查看它的价格。
      </div>
      Any 8th Time Dimensions purchased above {{ format(1e8) }} will not further increase the multiplier.
    </div>
  </div>
  `

};