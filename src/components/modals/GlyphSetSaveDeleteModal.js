import GlyphSetPreview from "../GlyphSetPreview.js";
import ModalWrapperChoice from "./ModalWrapperChoice.js";

export default {
  name: "GlyphSetSaveDeleteModal",
  components: {
    ModalWrapperChoice,
    GlyphSetPreview
  },
  props: {
    glyphSetId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      glyphSet: []
    };
  },
  methods: {
    update() {
      this.glyphSet = Glyphs.copyForRecords(player.reality.glyphs.sets[this.glyphSetId].glyphs);
    },
    handleYesClick() {
      player.reality.glyphs.sets[this.glyphSetId].glyphs = [];
      EventHub.dispatch(GAME_EVENT.GLYPH_SET_SAVE_CHANGE);
    },
  },
  template: `
  <ModalWrapperChoice
    option="deleteGlyphSetSave"
    @confirm="handleYesClick"
  >
    <template #header>
      删除这组符文预设
    </template>
    <div class="c-modal-message__text">
      Please confirm your desire to delete this Glyph Set:
      <GlyphSetPreview
        :is-in-modal="true"
        :glyphs="glyphSet"
      />
      This will not affect your actual Glyphs, only the saved preset.
    </div>
    <template #confirm-text>
      删除
    </template>
  </ModalWrapperChoice>
  `
};