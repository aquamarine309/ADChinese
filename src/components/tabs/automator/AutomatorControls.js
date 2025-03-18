import AutomatorButton from './AutomatorButton.js'
import AutomatorModeSwitch from './AutomatorModeSwitch.js'

export default {
  name: 'AutomatorControls',
  components: {
    AutomatorButton,
    AutomatorModeSwitch,
  },
  data() {
    return {
      isRunning: false,
      isPaused: false,
      repeatOn: false,
      justCompleted: false,
      forceRestartOn: false,
      followExecution: false,
      hasErrors: false,
      currentLine: 0,
      statusName: '',
      editingName: '',
      editingDifferentScript: false,
      currentChars: 0,
      hasUndo: false,
      hasRedo: false,
    }
  },
  computed: {
    fullScreen() {
      return this.$viewModel.tabs.reality.automator.fullScreen
    },
    currentScriptID() {
      return this.$viewModel.tabs.reality.automator.editorScriptID
    },
    playTooltip() {
      if (this.isPaused) return '恢复自动机执行'
      if (!this.isRunning) return '启动自动机'
      return '暂停自动机执行'
    },
    playButtonClass() {
      return {
        'c-automator__button--active': this.isRunning,
        'fa-play': !this.isRunning && !this.isPaused,
        'fa-pause': this.isRunning,
        'fa-eject': this.isPaused,
      }
    },
    statusText() {
      // Pad with leading zeroes based on script length to prevent text jitter on fast scripts. This technically fails
      // for scripts with more than 99999 lines, but scripts that long will be prevented elsewhere
      const digits = Math.clampMin(Math.ceil(Math.log10(AutomatorBackend.currentScriptLength + 1)), 1)
      let lineNum = `0000${this.currentLine}`
      lineNum = lineNum.slice(lineNum.length - digits)

      if (this.isPaused) return `已暂停: "${this.statusName}" (暂停于行 ${lineNum})`
      if (this.isRunning) return `正在运行: "${this.statusName}" (行 ${lineNum})`
      if (this.hasErrors) return `已停止: "${this.statusName}" 存在错误 (无法运行)`
      return `已停止：将开始运行 "${this.statusName}"`
    },
    maxScriptChars() {
      return AutomatorData.MAX_ALLOWED_SCRIPT_CHARACTERS
    },
  },
  methods: {
    update() {
      this.isRunning = AutomatorBackend.isRunning
      this.isPaused = AutomatorBackend.isOn && !this.isRunning
      this.repeatOn = AutomatorBackend.state.repeat
      this.justCompleted = AutomatorBackend.hasJustCompleted
      this.forceRestartOn = AutomatorBackend.state.forceRestart
      this.followExecution = AutomatorBackend.state.followExecution
      this.hasErrors = AutomatorData.currentErrors().length !== 0
      this.currentLine = AutomatorBackend.currentLineNumber

      // When the automator isn't running, the script name contains the last run script instead of the
      // to-be-run script, which is the currently displayed one in the editor
      this.statusName = this.isPaused || this.isRunning ? AutomatorBackend.scriptName : AutomatorBackend.currentEditingScript.name
      this.duplicateStatus = AutomatorBackend.hasDuplicateName(this.statusName)
      this.editingDifferentScript = (this.isRunning || this.isPaused) && AutomatorBackend.currentEditingScript.id !== AutomatorBackend.currentRunningScript.id

      this.currentChars = AutomatorData.singleScriptCharacters()
      this.hasUndo = AutomatorData.undoBuffer.length > 0
      this.hasRedo = AutomatorData.redoBuffer.length > 0
    },
    rewind: () => AutomatorBackend.restart(),
    play() {
      if (this.hasErrors) {
        // This shouldn't be needed but someone's save was still on MODE.RUN when the script had errors so this
        // is just an additional layer of failsafe in case something goes wrong
        AutomatorBackend.mode = AUTOMATOR_MODE.PAUSED
        return
      }
      if (this.isRunning) {
        AutomatorBackend.pause()
        return
      }
      if (player.reality.automator.type === AUTOMATOR_TYPE.BLOCK) this.$emit('automatorplay')
      if (AutomatorBackend.isOn) AutomatorBackend.mode = AUTOMATOR_MODE.RUN
      else AutomatorBackend.start(this.currentScriptID)
    },
    stop: () => AutomatorBackend.stop(),
    step() {
      if (AutomatorBackend.isOn) AutomatorBackend.mode = AUTOMATOR_MODE.SINGLE_STEP
      else AutomatorBackend.start(this.currentScriptID, AUTOMATOR_MODE.SINGLE_STEP)
    },
    repeat: () => AutomatorBackend.toggleRepeat(),
    restart: () => AutomatorBackend.toggleForceRestart(),
    follow: () => AutomatorBackend.toggleFollowExecution(),
    undo: () => AutomatorData.undoScriptEdit(),
    redo: () => AutomatorData.redoScriptEdit(),
  },
  template: `
<div
    class="c-automator__controls l-automator__controls"
    data-v-automator-controls
  >
    <div
      class="c-automator-control-row l-automator-button-row"
      data-v-automator-controls
    >
      <div
        class="c-button-group"
        data-v-automator-controls
      >
        <AutomatorButton
          v-tooltip="'回退自动机到第一条指令'"
          class="fa-fast-backward"
          @click="rewind"
          data-v-automator-controls
        />
        <AutomatorButton
          v-tooltip="{
            content: playTooltip,
            hideOnTargetClick: false
          }"
          :class="playButtonClass"
          @click="play"
          data-v-automator-controls
        />
        <AutomatorButton
          v-tooltip="'停止自动机并重置位置'"
          class="fa-stop"
          @click="stop"
          data-v-automator-controls
        />
        <AutomatorButton
          v-tooltip="'单步执行下一行'"
          class="fa-step-forward"
          @click="step"
          data-v-automator-controls
        />
        <AutomatorButton
          v-tooltip="'脚本运行结束时自动重新启动'"
          class="fa-sync-alt"
          :class="{ 'c-automator__button--active' : repeatOn }"
          @click="repeat"
          data-v-automator-controls
        />
        <AutomatorButton
          v-tooltip="'在完成或重启现实时自动重新激活当前脚本'"
          class="fa-reply"
          :class="{ 'c-automator__button--active' : forceRestartOn }"
          @click="restart"
          data-v-automator-controls
        />
        <AutomatorButton
          v-tooltip="'跟随当前执行的指令自动滚动'"
          class="fa-indent"
          :class="{ 'c-automator__button--active' : followExecution }"
          @click="follow"
          data-v-automator-controls
        />
        <span
          v-if="fullScreen"
          class="c-automator__status-text c-automator__status-text--small"
          :class="{ 'c-automator__status-text--error' : currentChars > maxScriptChars }"
          data-v-automator-controls
        >
          This script: {{ formatInt(currentChars) }}/{{ formatInt(maxScriptChars) }}
        </span>
      </div>
      <div
        class="c-button-group"
        data-v-automator-controls
      >
        <AutomatorButton
          v-tooltip="'撤销'"
          class="fa-arrow-rotate-left"
          :class="{ 'c-automator__button--inactive' : !hasUndo }"
          @click="undo"
          data-v-automator-controls
        />
        <AutomatorButton
          v-tooltip="'重做'"
          class="fa-arrow-rotate-right"
          :class="{ 'c-automator__button--inactive' : !hasRedo }"
          @click="redo"
          data-v-automator-controls
        />
        <AutomatorModeSwitch />
      </div>
    </div>
    <div
      class="l-automator-button-row"
      data-v-automator-controls
    >
      <span
        v-if="duplicateStatus"
        v-tooltip="'多个脚本使用了此名称！'"
        class="fas fa-exclamation-triangle c-automator__status-text c-automator__status-text--error"
        data-v-automator-controls
      />
      <span
        v-if="editingDifferentScript"
        v-tooltip="'编辑器显示的脚本与正在运行的自动机脚本不一致'"
        class="fas fa-circle-exclamation c-automator__status-text c-automator__status-text--warning"
        data-v-automator-controls
      />
      <span
        v-if="justCompleted"
        v-tooltip="'自动机已完成执行上一个脚本'"
        class="fas fa-circle-check c-automator__status-text"
        data-v-automator-controls
      />
      <span
        class="c-automator__status-text"
        :class="{ 'c-automator__status-text--error' : hasErrors && !(isRunning || isPaused) }"
        data-v-automator-controls
      >
        {{ statusText }}
      </span>
    </div>
  </div>
  `,
}
