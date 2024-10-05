import ArmageddonButton from "../../tabs/celestial-pelle/ArmageddonButton.js";
import RealityCurrencyHeader from "../../RealityCurrencyHeader.js";

import HeaderTickspeedInfo from "../HeaderTickspeedInfo.js";

import RealityButton from "./RealityButton.js";

// This component contains antimatter and antimatter rate at the start of the game, as well as some additional
// information depending on the UI (tickspeed for Classic, game speed for Modern). Everything but antimatter is
// removed once Reality is unlocked, to make room for the reality button
export default {
  name: "HeaderCenterContainer",
  components: {
    HeaderTickspeedInfo,
    RealityCurrencyHeader,
    RealityButton,
    ArmageddonButton,
  },
  data() {
    return {
      shouldDisplay: true,
      isModern: false,
      hasRealityButton: false,
      isDoomed: false,
      antimatter: new Decimal(0),
      antimatterPerSec: new Decimal(0),
    };
  },
  methods: {
    update() {
      this.shouldDisplay = player.break || !Player.canCrunch;
      if (!this.shouldDisplay) return;

      this.isModern = player.options.newUI;
      this.isDoomed = Pelle.isDoomed;
      this.antimatter.copyFrom(Currency.antimatter);
      this.hasRealityButton = PlayerProgress.realityUnlocked() || TimeStudy.reality.isBought;
      if (!this.hasRealityButton) this.antimatterPerSec.copyFrom(Currency.antimatter.productionPerSecond);
    },
  },
  template: `
  <div
    v-if="shouldDisplay"
    class="c-prestige-button-container"
  >
    <span>你拥有 <span class="c-game-header__antimatter">{{ format(antimatter, 2, 1) }}</span> 反物质。</span>
    <div
      v-if="hasRealityButton"
      class="c-reality-container"
      data-v-header-center-container
    >
      <RealityCurrencyHeader />
      <ArmageddonButton
        v-if="isDoomed"
        :is-header="true"
      />
      <RealityButton v-else />
    </div>
    <div v-else>
      你每秒获得 {{ format(antimatterPerSec, 2) }} 反物质。
      <br>
      <HeaderTickspeedInfo />
    </div>
  </div>
  `
};