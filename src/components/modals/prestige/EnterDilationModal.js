import FullScreenAnimationHandler from '../../../core/full-screen-animation-handler.js'

import ModalWrapperChoice from '../ModalWrapperChoice.js'

export default {
  name: 'EnterDilationModal',
  components: {
    ModalWrapperChoice,
  },
  computed: {
    message() {
      return `时间膨胀将开始一次新的永恒，所有维度乘数的指数和
        时间速度乘数的指数将减少至 ${formatPow(0.75, 2, 2)}。如果你在膨胀期间完成永恒，
        你的超光速粒子将基于你的最高反物质值和任何超光速粒子乘数增加。`
    },
    entranceLabel() {
      return `你即将进入时间膨胀`
    },
    EPSinceLabel() {
      if (player.dilation.lastEP.eq(-1)) {
        return '这是你的第一次时间膨胀'
      }
      if (!isInCelestialReality() && Ra.unlocks.unlockDilationStartingTP.canBeApplied) {
        return `由于特蕾莎的第 ${formatInt(25)} 级奖励，你已经获得了可达到的最大超光速粒子数量。`
      }
      return `你上次完成时间膨胀时的永恒点数为 ${format(player.dilation.lastEP, 2, 2)}。`
    },
  },
  methods: {
    handleYesClick() {
      if (player.dilation.active) return
      if (player.options.animations.dilation && !FullScreenAnimationHandler.isDisplaying) {
        // 在延迟膨胀回调中触发 Strike
        animateAndDilate()
      } else {
        startDilatedEternity()
        if (Pelle.isDoomed) PelleStrikes.dilation.trigger()
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
  `,
}
