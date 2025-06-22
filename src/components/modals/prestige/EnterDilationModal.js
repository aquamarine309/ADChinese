import FullScreenAnimationHandler from "../../../core/full-screen-animation-handler.js";

import ModalWrapperChoice from "../ModalWrapperChoice.js";

export default {
  name: "EnterDilationModal",
  components: {
    ModalWrapperChoice
  },
  computed: {
    message() {
      return `Dilating time will start a new Eternity, and all Dimension multiplier's exponents and
        tickspeed multiplier's exponent will be reduced to ${formatPow(0.75, 2, 2)}. If you can Eternity while Dilated,
        your Tachyon Particles will be increased to a value based on your highest antimatter and any Tachyon Particle
        multipliers you have.`;
    },
    entranceLabel() {
      return `你确定要进行时间膨胀吗？`;
    },
    EPSinceLabel() {
      if (player.dilation.lastEP.eq(-1)) {
        return "这是你的第一次时间膨胀";
      }
      if (!isInCelestialReality() && Ra.unlocks.unlockDilationStartingTP.canBeApplied) {
        return `You already have the maximum feasible amount of Tachyon Particles you can attain due to
          Teresa's Level ${formatInt(25)} reward.`;
      }
      return `你上次以 ${format(player.dilation.lastEP, 2, 2)} 永恒点数完成了时间膨胀。`;
    }
  },
  methods: {
    handleYesClick() {
      if (player.dilation.active) return;
      if (player.options.animations.dilation && !FullScreenAnimationHandler.isDisplaying) {
        // Strike trigger happens within the delayed dilation callback in this function
        animateAndDilate();
      } else {
        startDilatedEternity();
        if (Pelle.isDoomed) PelleStrikes.dilation.trigger();
      }
    },
  },
  template: `
  <ModalWrapperChoice
    option="dilation"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ entranceLabel }}
    </template>
    <div class="c-modal-message__text">
      {{ EPSinceLabel }}
      <br>
      <br>
      {{ message }}
    </div>
    <template #confirm-text>
      进入
    </template>
  </ModalWrapperChoice>
  `
};