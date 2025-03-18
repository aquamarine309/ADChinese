import { GameProgress, ProgressChecker } from '../../../core/storage/progress-checker.js'

import CatchupGroup from './CatchupGroup.js'
import PrimaryButton from '../../PrimaryButton.js'

export default {
  name: 'CatchupModal',
  components: {
    CatchupGroup,
    PrimaryButton,
  },
  props: {
    diff: {
      type: Number,
      required: true,
    },
  },
  computed: {
    progressStage: () => ProgressChecker.getProgressStage(player).id,
    suggestedResource() {
      return GameProgress(this.progressStage).suggestedResource
    },
    timeString() {
      // If diff is zero, that means we opened it up via the button and don't need the text for last opening
      if (!this.diff) return null
      return `It has been ${TimeSpan.fromMilliseconds(this.diff).toString()} since you last loaded up the game.`
    },
    titleText() {
      return this.diff ? '内容小结' : '内容概览'
    },
  },
  methods: {
    stageName(stage) {
      return GameProgress(stage).name
    },
  },
  template: `
<div class="c-modal-away-progress">
    <div class="c-modal-away-progress__header">
      {{ titleText }}
    </div>
    <div>
      {{ timeString }}
      如果您需要回顾，以下是您从游戏开始至今解锁的所有内容的快速摘要，按不同的进展阶段分类。这些只是非常简短的描述；您可以点击内容标题或 <i class="fas fa-question-circle" /> 图标查看相关“如何游玩”条目，以获取更详细的信息。
    </div>
    <div
      class="l-catchup-group-container"
      :style="{ 'height' : \`\${Math.clamp(3 * progressStage + 5, 15, 35)}rem\` }"
      data-v-catchup-modal
    >
      <CatchupGroup
        v-for="group of progressStage"
        :key="group"
        :group="group"
        :name="stageName(group)"
      />
    </div>
    <span
      class="c-suggestion-text"
      data-v-catchup-modal
    >
      根据您当前的进展，尝试提升您的 {{ suggestedResource }} 可能会很有帮助。
    </span>
    <div
      class="l-confirm-padding"
      data-v-catchup-modal
    >
      <PrimaryButton
        @click="emitClose"
      >
        确认
      </PrimaryButton>
    </div>
  </div>
  `,
}
