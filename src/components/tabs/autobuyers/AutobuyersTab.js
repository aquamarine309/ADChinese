import AutobuyerToggles from "./AutobuyerToggles.js";
import BigCrunchAutobuyerBox from "./BigCrunchAutobuyerBox.js";
import DimensionAutobuyerBox from "./DimensionAutobuyerBox.js";
import DimensionBoostAutobuyerBox from "./DimensionBoostAutobuyerBox.js";
import EternityAutobuyerBox from "./EternityAutobuyerBox.js";
import GalaxyAutobuyerBox from "./GalaxyAutobuyerBox.js";
import OpenModalHotkeysButton from "../../OpenModalHotkeysButton.js";
import RealityAutobuyerBox from "./RealityAutobuyerBox.js";
import SimpleAutobuyersMultiBox from "./SimpleAutobuyersMultiBox.js";
import TickspeedAutobuyerBox from "./TickspeedAutobuyerBox.js";

export default {
  name: "AutobuyersTab",
  components: {
    AutobuyerToggles,
    OpenModalHotkeysButton,
    RealityAutobuyerBox,
    EternityAutobuyerBox,
    BigCrunchAutobuyerBox,
    GalaxyAutobuyerBox,
    DimensionBoostAutobuyerBox,
    TickspeedAutobuyerBox,
    DimensionAutobuyerBox,
    SimpleAutobuyersMultiBox
  },
  data() {
    return {
      hasInfinity: false,
      hasContinuum: false,
      displayADAutobuyersIndividually: false,
      hasInstant: false,
    };
  },
  computed: {
    // It only makes sense to show this if the player has seen gamespeed-altering effects, but we should keep it there
    // permanently as soon as they have
    hasSeenGamespeedAlteringEffects() {
      return PlayerProgress.seenAlteredSpeed();
    },
    gameTickLength() {
      return `${formatInt(player.options.updateRate)} 毫秒`;
    }
  },
  methods: {
    update() {
      this.hasInfinity = PlayerProgress.infinityUnlocked();
      this.hasContinuum = Laitela.continuumActive;
      this.checkADAutoStatus();
    },
    checkADAutoStatus() {
      const ad = Autobuyer.antimatterDimension;
      // Since you don't need to buy autobuyers in Doomed and unbought ones are hidden, we can check if only the
      // autobuyers you can see (ie, have unlocked) have been maxed.
      if (Pelle.isDoomed) {
        this.displayADAutobuyersIndividually = !ad.zeroIndexed.filter(x => x.isUnlocked)
          .every(x => x.hasUnlimitedBulk && x.hasMaxedInterval);
        return;
      }
      this.hasInstant = ad.hasInstant;
      this.displayADAutobuyersIndividually = !ad.collapseDisplay;
    },
  },
  template: `
  <div class="l-autobuyers-tab">
    <AutobuyerToggles />
    <OpenModalHotkeysButton />
    <div v-if="hasSeenGamespeedAlteringEffects">
      自动购买器间隔与时间相关设置始终采用<b>现实时间</b>计算，因此
      <br>
      不受任何可能改变游戏运行速度的因素影响。
      <br>
      <br>
    </div>
    <div v-if="!hasInfinity">
      解锁自动购买器升级的挑战需在达成无限状态后开启。
    </div>
    <b>未显示数量限制的自动购买器默认拥有无限数量处理能力。</b>
    <b>
      反物质维度自动购买器的批量操作升级需在触发间隔低于 {{ formatInt(100) }} 毫秒时解锁。
    </b>
    <b v-if="hasInstant">间隔为“立即”的自动购买器将在每个游戏时刻（{{ gameTickLength }}）触发。</b>
    <RealityAutobuyerBox
      class="c-reality-pos"
      data-v-autobuyers-tab
    />
    <EternityAutobuyerBox
      class="c-eternity-pos"
      data-v-autobuyers-tab
    />
    <BigCrunchAutobuyerBox
      class="c-infinity-pos"
      data-v-autobuyers-tab
    />
    <GalaxyAutobuyerBox />
    <DimensionBoostAutobuyerBox />
    <TickspeedAutobuyerBox v-if="!hasContinuum" />
    <template v-if="displayADAutobuyersIndividually">
      <DimensionAutobuyerBox
        v-for="tier in 8"
        :key="tier"
        :tier="tier"
      />
    </template>
    <SimpleAutobuyersMultiBox />
  </div>
  `
};