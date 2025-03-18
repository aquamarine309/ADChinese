import HoverMenu from './HoverMenu.js'

export default {
  name: 'TimeStudySaveLoadButton',
  components: {
    HoverMenu,
  },
  props: {
    saveslot: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      name: '',
      displayName: '',
      canEternity: false,
    }
  },
  computed: {
    preset() {
      return player.timestudy.presets[this.saveslot - 1]
    },
  },
  methods: {
    update() {
      this.name = player.timestudy.presets[this.saveslot - 1].name
      this.displayName = this.name === '' ? this.saveslot : this.name
      this.canEternity = Player.canEternity
    },
    nicknameBlur(event) {
      const newName = event.target.value.slice(0, 4).trim()
      if (!this.isASCII(newName)) return

      const existingNames = player.timestudy.presets.map((p) => p.name)
      if (existingNames.includes(newName)) return

      this.preset.name = newName
      this.name = this.preset.name
    },
    hideContextMenu() {
      this.$viewModel.currentContextMenu = null
    },
    // This is largely done because of UI reasons - there is no Unicode specification for character width, which means
    // that arbitrary Unicode inputs can allow for massive text overflow
    isASCII(input) {
      // eslint-disable-next-line no-control-regex
      return !/[^\u0000-\u00ff]/u.test(input)
    },
    save() {
      this.hideContextMenu()
      this.preset.studies = GameCache.currentStudyTree.value.exportString
      const presetName = this.name ? `时间研究树以"${this.name}"的名称` : '时间研究树'
      GameUI.notify.eternity(`${presetName}保存到槽位 ${this.saveslot}`)
    },
    load() {
      this.hideContextMenu()
      if (this.preset.studies) {
        // We need to use a combined tree for committing to the game state, or else it won't buy studies in the imported
        // tree are only reachable if the current tree is already bought
        const combinedTree = new TimeStudyTree()
        combinedTree.attemptBuyArray(TimeStudyTree.currentStudies, false)
        combinedTree.attemptBuyArray(combinedTree.parseStudyImport(this.preset.studies), true)
        TimeStudyTree.commitToGameState(combinedTree.purchasedStudies, false, combinedTree.startEC)

        const presetName = this.name ? `预设时间研究树“${this.name}` : '预设时间研究树'
        GameUI.notify.eternity(`已从槽位 ${presetName} 加载${presetName}`)
      } else {
        Modal.message.show('该预设时间研究树目前没有时间研究')
      }
    },
    respecAndLoad() {
      if (Player.canEternity) {
        player.respec = true
        const newTree = new TimeStudyTree()
        newTree.attemptBuyArray(newTree.parseStudyImport(this.preset.studies))
        animateAndEternity(() => TimeStudyTree.commitToGameState(newTree.purchasedStudies, false, newTree.startEC))
      }
    },
    deletePreset() {
      this.hideContextMenu()
      if (this.preset.studies) Modal.studyString.show({ id: this.saveslot - 1, deleting: true })
      else Modal.message.show('该预设时间研究树目前没有时间研究')
    },
    handleExport() {
      this.hideContextMenu()
      copyToClipboard(this.preset.studies)
      const presetName = this.name ? `Study preset "${this.name}"` : 'Study preset'
      GameUI.notify.eternity(`${presetName} 从 ${this.saveslot} 导出至剪切板`)
    },
    edit() {
      Modal.studyString.show({ id: this.saveslot - 1 })
    },
  },
  template: `
  <HoverMenu
    class="l-tt-save-load-btn__wrapper"
    data-v-time-study-save-load-button
  >
    <template #object>
      <button
        class="l-tt-save-load-btn c-tt-buy-button c-tt-buy-button--unlocked"
        @click.shift.exact="save"
        @click.exact="load"
        data-v-time-study-save-load-button
      >
        {{ displayName }}
      </button>
    </template>
    <template #menu>
      <div
        class="l-tt-save-load-btn__menu c-tt-save-load-btn__menu"
        data-v-time-study-save-load-button
      >
        <span ach-tooltip="设置自定义名称（最多 4 个 ASCII 字符）">
          <input
            type="text"
            size="4"
            maxlength="4"
            class="l-tt-save-load-btn__menu-rename c-tt-save-load-btn__menu-rename"
            :value="name"
            @keyup.esc="hideContextMenu"
            @blur="nicknameBlur"
            data-v-time-study-save-load-button
          >
        </span>
        <div
          class="l-tt-save-load-btn__menu-item c-tt-save-load-btn__menu-item"
          @click="edit"
          data-v-time-study-save-load-button
        >
          编辑
        </div>
        <div
          class="l-tt-save-load-btn__menu-item c-tt-save-load-btn__menu-item"
          @click="handleExport"
          data-v-time-study-save-load-button
        >
          导出
        </div>
        <div
          class="l-tt-save-load-btn__menu-item c-tt-save-load-btn__menu-item"
          @click="save"
          data-v-time-study-save-load-button
        >
          保存
        </div>
        <div
          class="l-tt-save-load-btn__menu-item"
          data-v-time-study-save-load-button
        >
          <div
            class="c-tt-save-load-btn__menu-item"
            @click="load"
            data-v-time-study-save-load-button
          >
            加载
          </div>
          <div
            class="c-tt-save-load-btn__menu-item__hover-options"
            data-v-time-study-save-load-button
          >
            <div
              :class="{
                'c-tt-save-load-btn__menu-item__hover-option': true,
                'c-tt-save-load-btn__menu-item__hover-option--disabled': !canEternity,
              }"
              @click="respecAndLoad"
              data-v-time-study-save-load-button
            >
              重置并加载
            </div>
          </div>
        </div>
        <div
          class="l-tt-save-load-btn__menu-item c-tt-save-load-btn__menu-item"
          @click="deletePreset"
          data-v-time-study-save-load-button
        >
          删除
        </div>
      </div>
    </template>
  </HoverMenu>
  `,
}
