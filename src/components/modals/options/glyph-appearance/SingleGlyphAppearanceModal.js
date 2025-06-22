import GlyphCustomizationSingleType from "./GlyphCustomizationSingleType.js";
import ModalWrapperOptions from "../ModalWrapperOptions.js";
import PrimaryButton from "../../../PrimaryButton.js";

export default {
  name: "SingleGlyphAppearanceModal",
  components: {
    ModalWrapperOptions,
    GlyphCustomizationSingleType,
    PrimaryButton
  },
  props: {
    glyphId: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      // This is here to force a re-render if the appearance is set to the default values
      defaultKeySwap: false,
    };
  },
  computed: {
    glyphType() {
      return Glyphs.findById(this.glyphId).type;
    },
    cosmeticTypes() {
      return GlyphAppearanceHandler.availableTypes;
    },
    glyph() {
      return Glyphs.findById(this.glyphId);
    }
  },
  created() {
    // This force-closes the modal only if another glyph is dragged into the panel
    EventHub.logic.on(GAME_EVENT.GLYPH_VISUAL_CHANGE, () => {
      this.$recompute("glyph");
      if (!this.defaultKeySwap) this.emitClose();
    });
  },
  methods: {
    update() {
      this.defaultKeySwap = true;
    },
    setType(type) {
      if (type && this.glyph.fixedCosmetic) return;
      this.glyph.color = undefined;
      this.glyph.symbol = undefined;
      if (this.glyph.fixedCosmetic) this.glyph.cosmetic = this.glyph.fixedCosmetic;
      else this.glyph.cosmetic = type;
      this.defaultKeySwap = false;
      EventHub.dispatch(GAME_EVENT.GLYPH_VISUAL_CHANGE);
    },
    cosmeticTypeClass(type) {
      return {
        "o-primary-btn--subtab-option": true,
        "o-active-type": type === this.glyph.cosmetic
      };
    }
  },
  template: `
  <ModalWrapperOptions class="c-modal-options__large">
    <template #header>
      修改单个符文外观
    </template>
    <PrimaryButton
      class="o-primary-btn--subtab-option"
      @click="setType(undefined)"
    >
      重置符文外观
    </PrimaryButton>
    <GlyphCustomizationSingleType
      :key="defaultKeySwap"
      :type="glyphType"
      :glyph-id="glyphId"
    />
    <div v-if="cosmeticTypes && glyph.fixedCosmetic">
      不能修改这个符文的外观！
    </div>
    <div
      v-else-if="cosmeticTypes"
      class="c-special-type"
      data-v-single-glyph-appearance-modal
    >
      使用特定的自定义类型：
      <PrimaryButton
        v-for="type in cosmeticTypes"
        :key="type"
        :class="cosmeticTypeClass(type)"
        @click="setType(type)"
        data-v-single-glyph-appearance-modal
      >
        {{ type }}
      </PrimaryButton>
    </div>
  </ModalWrapperOptions>
  `
};