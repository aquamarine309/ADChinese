import ModalWrapperChoice from '../ModalWrapperChoice.js'

export default {
  name: 'PurgeAllUnprotectedGlyphsModal',
  components: {
    ModalWrapperChoice,
  },
  data() {
    return {
      isRefining: false,
      isSacrificing: false,
    }
  },
  computed: {
    refiningSacrificingOrDeleting() {
      if (this.isRefining) return `精炼`
      if (this.isSacrificing) return `献祭`
      return `删除`
    },
    topLabel() {
      return `你正要${this.refiningSacrificingOrDeleting}所有未保护的符文`
    },
    message() {
      return `你真的想要${this.refiningSacrificingOrDeleting} 所有仓库中未保护的符文吗?`
    },
    extraMessage() {
      if (this.glyphsDeleted === 0) return `这会${this.refiningSacrificingOrDeleting}啥也没有。`
      if (this.glyphsDeleted === this.glyphsTotal) {
        return `这会${this.refiningSacrificingOrDeleting}你所有的符文`
      }
      return `这会${this.refiningSacrificingOrDeleting} 
        ${formatInt(this.glyphsDeleted)}/${formatInt(this.glyphsTotal)}你的符文`
    },

    // These two don't need to be reactive since the modal force-closes itself whenever glyphs change
    glyphsTotal() {
      return Glyphs.inventory.filter((slot) => slot !== null).length
    },
    glyphsDeleted() {
      return Glyphs.autoClean(0, false)
    },
  },
  methods: {
    update() {
      this.isRefining = GlyphSacrificeHandler.isRefining
      this.isSacrificing = GlyphSacrificeHandler.canSacrifice
    },
    handleYesClick() {
      Glyphs.deleteAllUnprotected()
    },
  },
  template: `
  <ModalWrapperChoice
    option="sacrificeAll"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ topLabel }}
    </template>
    <div class="c-modal-message__text">
      {{ message }}
    </div>
    <br>
    <div class="c-modal-hard-reset-danger">
      {{ extraMessage }}
    </div>
  </ModalWrapperChoice>
  `,
}
