import ModalWrapperChoice from "./ModalWrapperChoice.js";

export default {
  name: "SwitchAutomatorEditorModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    callback: {
      type: Function,
      required: false,
      default: () => ({})
    },
    lostBlocks: {
      type: Number,
      required: false,
      default: 0,
    }
  },
  data() {
    return {
      errorCount: 0,
      isCurrentlyBlocks: false
    };
  },
  computed: {
    currentScriptID: {
      get() {
        return this.$viewModel.tabs.reality.automator.editorScriptID;
      },
      set(value) {
        this.$viewModel.tabs.reality.automator.editorScriptID = value;
      }
    },
    otherMode() {
      return this.isCurrentlyBlocks ? "文本" : "积木";
    }
  },
  methods: {
    update() {
      this.errorCount = AutomatorData.currentErrors().length;
      this.isCurrentlyBlocks = player.reality.automator.type === AUTOMATOR_TYPE.BLOCK;
    },
    toggleAutomatorMode() {
      AutomatorBackend.changeModes(this.currentScriptID);
      this.callback?.();
    }
  },
  template: `
  <ModalWrapperChoice
    option="switchAutomatorMode"
    @confirm="toggleAutomatorMode"
  >
    <template #header>
      将自动机切换为{{ otherMode }}编辑器
    </template>
    <div class="c-modal-message__text">
      这将停止正在运行的自动机！
      <div v-if="errorCount">
        <br>
        你的脚本存在一些错误，这些错误可能无法正确转换为{{ otherMode }}模式。继续操作将使自动机尝试解析这些行，但部分信息可能会丢失或转换不当。
      </div>
      <!-- Note: this can only ever appear on text-to-block -->
      <b v-if="lostBlocks">
        <br>
        警告：你的脚本当前存在一些无法被解释为特定命令的行。由于没有可转换的块，这些行最终将被删除。若循环或 IF 语句开头出现错误，则可能会删除脚本的较大篇幅！
        <span
          class="l-lost-text"
          data-v-switch-automator-editor-modal
        >
          切换编辑器模式将会导致不可逆地失去 {{ formatInt(lostBlocks) }} 行代码！
        </span>
      </b>
      <br>
      <span
        class="l-lost-text"
        data-v-switch-automator-editor-modal
      >
        不建议隐藏此提示，因为如果你的脚本在尝试切换模式时出现错误，可能会导致部分脚本立即不可逆地丢失。
      </span>
      <br>
      <br>
      你确定你要切换到 {{ otherMode }} 编辑器吗？
    </div>
    <template #confirm-text>
      切换模式
    </template>
  </ModalWrapperChoice>
  `
};