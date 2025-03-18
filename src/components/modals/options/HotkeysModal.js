import ModalWrapper from '../ModalWrapper.js'

export default {
  name: 'HotkeysModal',
  components: {
    ModalWrapper,
  },
  data() {
    return {
      updateIndicies: [],
      visible: [],
      timeStudyUnlocked: false,
      glyphSacUnlocked: false,
      isElectron: false,
    }
  },
  computed: {
    moreShiftKeyInfo() {
      const shiftKeyFunctions = []
      if (this.timeStudyUnlocked) {
        shiftKeyFunctions.push('与购买时间研究树时，用来购买所有上面的节点')
        shiftKeyFunctions.push('来节省时间树槽位')
      }
      if (this.glyphSacUnlocked) {
        shiftKeyFunctions.push('献祭符文')
      }
      const shiftKeyInfo = makeEnumeration(shiftKeyFunctions)
      return shiftKeyInfo === '' ? '' : `你可以按住 Shift ${shiftKeyInfo}.`
    },
    hotkeyCount() {
      return shortcuts.length
    },
    shortcutNames() {
      return shortcuts.map((x) => x.name)
    },
    shortcutKeys() {
      return shortcuts.map((x) => x.keys.map((key) => this.format(key)))
    },
  },
  created() {
    for (let i = 0; i < this.hotkeyCount; i++) {
      const visible = shortcuts[i].visible
      if (typeof visible === 'function') {
        this.updateIndicies.push(i)
      } else {
        this.visible[i] = visible
      }
    }
  },
  methods: {
    update() {
      for (const index of this.updateIndicies) {
        this.$set(this.visible, index, shortcuts[index].visible())
      }
      const progress = PlayerProgress.current
      this.timeStudyUnlocked = progress.isEternityUnlocked
      this.glyphSacUnlocked = RealityUpgrade(19).isBought

      // ElectronRuntime is a global which only exists on Steam (throws a ReferenceError on web)
      try {
        this.isElectron = ElectronRuntime.isActive
      } catch {
        this.isElectron = false
      }
    },
    format(x) {
      switch (x) {
        case 'mod':
          return 'CTRL/⌘'
        default:
          return x.toUpperCase()
      }
    },
  },
  template: `
<ModalWrapper>
    <template #header>
      快捷键列表
    </template>
    <span
      class="c-modal-hotkeys l-modal-hotkeys"
      data-v-hotkeys-modal
    >
      <div
        class="l-modal-hotkeys__column"
        data-v-hotkeys-modal
      >
        <div
          class="l-modal-hotkeys-row"
          data-v-hotkeys-modal
        >
          <span
            class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name"
            data-v-hotkeys-modal
          >购买1个维度</span>
          <kbd>SHIFT</kbd><kbd>1</kbd>-<kbd>SHIFT</kbd><kbd>8</kbd>
        </div>
        <div
          class="l-modal-hotkeys-row"
          data-v-hotkeys-modal
        >
          <span
            class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name"
            data-v-hotkeys-modal
          >购买10个维度</span>
          <kbd>1</kbd>-<kbd>8</kbd>
        </div>
        <div
          v-for="index in hotkeyCount"
          :key="index"
        >
          <span
            v-if="visible[index - 1]"
            class="l-modal-hotkeys-row"
            data-v-hotkeys-modal
          >
            <span
              class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name"
              data-v-hotkeys-modal
            >{{ shortcutNames[index - 1] }}</span>
            <kbd
              v-for="(key, i) in shortcutKeys[index - 1]"
              :key="i"
            >
              {{ key }}
            </kbd>
          </span>
        </div>
      </div>
      <div
        class="l-modal-hotkeys__column l-modal-hotkeys__column--right"
        data-v-hotkeys-modal
      >
        <div
          class="l-modal-hotkeys-row"
          data-v-hotkeys-modal
        >
          <span
            class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name"
            data-v-hotkeys-modal
          >修饰键</span>
          <kbd>SHIFT</kbd>
        </div>
        <span
          class="c-modal-hotkeys__shift-description"
          data-v-hotkeys-modal
        >
          Shift 是一个修饰键，用于在某些内容上显示额外信息，并调整某些按钮的功能。
          <br>
          {{ moreShiftKeyInfo }}
        </span>
        <br>
        <div
          class="l-modal-hotkeys-row"
          data-v-hotkeys-modal
        >
          <span
            class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name"
            data-v-hotkeys-modal
          >自动购买器控制</span>
          <kbd>ALT</kbd>
        </div>
        <span
          class="c-modal-hotkeys__shift-description"
          data-v-hotkeys-modal
        >
          Alt 是一个修饰键，当与任何具有对应自动购买器的键一起按下时，将切换该自动购买器。
          <br>
          当同时按下 Alt 和 Shift 时，你可以切换反物质维度和计数频率自动购买器的购买方式（单个或最大）。
        </span>
        <br>
        <div
          class="l-modal-hotkeys-row"
          data-v-hotkeys-modal
        >
          <span
            class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name"
            data-v-hotkeys-modal
          >标签页切换</span>
          <div>
            <kbd>←</kbd><kbd>↓</kbd><kbd>↑</kbd><kbd>→</kbd>
          </div>
        </div>
        <span
          class="c-modal-hotkeys__shift-description"
          data-v-hotkeys-modal
        >
          使用方向键可以循环浏览游戏的页面。
          上下箭头可以循环浏览标签页，左右箭头可以循环浏览该标签页的子标签页。
        </span>
        <br>
        <div
          class="l-modal-hotkeys-row"
          data-v-hotkeys-modal
        >
          <span
            class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name"
            data-v-hotkeys-modal
          >小键盘支持</span>
        </div>
        <span
          class="c-modal-hotkeys__shift-description"
          data-v-hotkeys-modal
        >
          由于技术原因，按下小键盘键将尽可能购买10个维度，但按下小键盘键与 <kbd>SHIFT</kbd> 不会购买单个维度。根据你的设备，它可能会导致页面滚动或切换游戏标签页。<kbd>ALT</kbd> 仍将按预期工作。
        </span>
        <template v-if="isElectron">
          <br>
          <div
            class="l-modal-hotkeys-row"
            data-v-hotkeys-modal
          >
            <span
              class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name"
              data-v-hotkeys-modal
            >窗口缩放</span>
            <kbd>-</kbd><kbd>0</kbd><kbd>+</kbd>
          </div>
          <span
            class="c-modal-hotkeys__shift-description"
            data-v-hotkeys-modal
          >
            要调整缩放级别，按住 <kbd>ctrl</kbd> 并按下 <kbd>-</kbd> 或 <kbd>+</kbd> 来减小或增加缩放。<kbd>ctrl</kbd><kbd>0</kbd> 将重置缩放为100%。
          </span>
          <br>
          <div
            class="l-modal-hotkeys-row"
          >
            <span class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name">全屏</span>
            <kbd>F10</kbd>
          </div>
          <span
            class="c-modal-hotkeys__shift-description"
            data-v-hotkeys-modal
          >
            要进入或退出全屏，按下 <kbd>F10</kbd>。
          </span>
        </template>
      </div>
    </span>
  </ModalWrapper>
  `,
}
