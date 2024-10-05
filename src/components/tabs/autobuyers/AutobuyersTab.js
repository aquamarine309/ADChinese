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
      return `${formatInt(player.options.updateRate)} ms`;
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
      Autobuyer intervals and time-based settings are always <b>real time</b> and therefore
      <br>
      unaffected by anything which may alter how fast the game itself is running.
      <br>
      <br>
    </div>
    <div v-if="!hasInfinity">
      Challenges for upgrading autobuyers are unlocked by reaching Infinity.
    </div>
    <b>Autobuyers with no displayed bulk have unlimited bulk by default.</b>
    <b>
      Antimatter Dimension Autobuyers can have their bulk upgraded once interval is below {{ formatInt(100) }} ms.
    </b>
    <b v-if="hasInstant">Autobuyers with "Instant" interval will trigger every game tick ({{ gameTickLength }}).</b>
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