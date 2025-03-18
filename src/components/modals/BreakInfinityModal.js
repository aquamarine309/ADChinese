import ModalWrapperChoice from './ModalWrapperChoice.js'

export default {
  name: 'BreakInfinityModal',
  components: {
    ModalWrapperChoice,
  },
  computed: {
    message() {
      const infinity = formatPostBreak(Number.MAX_VALUE, 2)
      return `打破无限将允许你获得超过 ${infinity} 的反物质${PlayerProgress.eternityUnlocked() ? '。' : `，并允许你读取超过 ${infinity} 的数字。`}
        在超过 ${infinity} 反物质后，维度和技术频率升级的成本将增长得更快。
        你将基于超过 ${infinity} 的反物质产量获得额外的无限点数。\
        ${EternityMilestone.keepAutobuyers.isReached ? '' : `\n它还将解锁打破无限升级，并最大化所有普通挑战的自动购买器。`}`.split('\n')
    },
  },
  methods: {
    handleYesClick() {
      breakInfinity()
    },
  },
  template: `
  <ModalWrapperChoice
    :show-cancel="false"
    @confirm="handleYesClick"
  >
    <template #header>
      你正要打破无限
    </template>
    <div class="c-modal-message__text">
      <span
        v-for="(line, index) in message"
        :key="index"
      >
        {{ line }} <br>
      </span>
    </div>
    <template #confirm-text>
      打破
    </template>
  </ModalWrapperChoice>
  `,
}
