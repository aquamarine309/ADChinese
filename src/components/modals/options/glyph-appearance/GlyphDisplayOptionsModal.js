import SelectGlyphInfoDropdown, { GlyphInfo } from "../SelectGlyphInfoDropdown.js";

import ExpandingControlBox from "../../../ExpandingControlBox.js";
import GlyphCustomization from "./GlyphCustomization.js";
import ModalOptionsToggleButton from "../../../ModalOptionsToggleButton.js";
import ModalWrapperOptions from "../ModalWrapperOptions.js";

export default {
  name: "GlyphDisplayOptionsModal",
  components: {
    ExpandingControlBox,
    ModalOptionsToggleButton,
    ModalWrapperOptions,
    SelectGlyphInfoDropdown,
    GlyphCustomization,
  },
  data() {
    return {
      newGlyphs: false,
      showUnequippedGlyphIcon: false,
      glyphEffectDots: false,
      glyphBG: 0,
      glyphInfoType: 0,
      showGlyphInfoByDefault: false,
      glyphBorders: false,
      highContrastRarity: false,
      swapGlyphColors: false,
    };
  },
  computed: {
    infoLabel() {
      return GlyphInfo.labels[this.glyphInfoType];
    },
    glyphBGStr() {
      switch (this.glyphBG) {
        case GLYPH_BG_SETTING.AUTO:
          return "自动";
        case GLYPH_BG_SETTING.LIGHT:
          return "明亮";
        case GLYPH_BG_SETTING.DARK:
          return "黑暗";
        default:
          throw new Error("Unrecognized Glyph BG setting");
      }
    }
  },
  watch: {
    newGlyphs(newValue) {
      player.options.showNewGlyphIcon = newValue;
      EventHub.dispatch(GAME_EVENT.GLYPH_VISUAL_CHANGE);
    },
    showUnequippedGlyphIcon(newValue) {
      player.options.showUnequippedGlyphIcon = newValue;
      EventHub.dispatch(GAME_EVENT.GLYPH_VISUAL_CHANGE);
    },
    glyphEffectDots(newValue) {
      player.options.showHintText.glyphEffectDots = newValue;
      EventHub.dispatch(GAME_EVENT.GLYPH_VISUAL_CHANGE);
    },
    showGlyphInfoByDefault(newValue) {
      player.options.showHintText.showGlyphInfoByDefault = newValue;
      EventHub.dispatch(GAME_EVENT.GLYPH_VISUAL_CHANGE);
    },
    glyphBorders(newValue) {
      player.options.glyphBorders = newValue;
      EventHub.dispatch(GAME_EVENT.GLYPH_VISUAL_CHANGE);
    },
    highContrastRarity(newValue) {
      player.options.highContrastRarity = newValue;
      EventHub.dispatch(GAME_EVENT.GLYPH_VISUAL_CHANGE);
    },
    swapGlyphColors(newValue) {
      player.options.swapGlyphColors = newValue;
      EventHub.dispatch(GAME_EVENT.GLYPH_VISUAL_CHANGE);
    },
  },
  methods: {
    update() {
      const options = player.options;
      this.newGlyphs = options.showNewGlyphIcon;
      this.showUnequippedGlyphIcon = options.showUnequippedGlyphIcon;
      this.glyphEffectDots = options.showHintText.glyphEffectDots;
      this.glyphBG = player.options.glyphBG;
      this.glyphInfoType = options.showHintText.glyphInfoType;
      this.showGlyphInfoByDefault = options.showHintText.showGlyphInfoByDefault;
      this.glyphBorders = options.glyphBorders;
      this.highContrastRarity = options.highContrastRarity;
      this.swapGlyphColors = options.swapGlyphColors;
    },
    noEffectStyle() {
      if (this.glyphInfoType !== 0) return null;
      return {
        "background-color": "var(--color-disabled)",
      };
    },
    cycleBG() {
      player.options.glyphBG = (player.options.glyphBG + 1) % Object.keys(GLYPH_BG_SETTING).length;
      EventHub.dispatch(GAME_EVENT.GLYPH_VISUAL_CHANGE);
    },
  },
  template: `
  <ModalWrapperOptions
    class="c-modal-options__glyph"
    data-v-glyph-display-options-modal
  >
    <template #header>
      符文显示选项
    </template>
    <div
      class="c-glyph-visual-options c-modal--short"
      data-v-glyph-display-options-modal
    >
      <div
        class="c-modal-options__button-container"
        data-v-glyph-display-options-modal
      >
        <ModalOptionsToggleButton
          v-model="newGlyphs"
          text="标记新获得的符文："
        />
        <ModalOptionsToggleButton
          v-model="showUnequippedGlyphIcon"
          text="标记卸下的符文："
        />
        <ModalOptionsToggleButton
          v-model="glyphEffectDots"
          text="符文上显示词条对应的点："
        />
        <ModalOptionsToggleButton
          v-model="glyphBorders"
          text="华丽符文边框："
        />
        <button
          class="o-primary-btn o-primary-btn--modal-option"
          @click="cycleBG()"
          data-v-glyph-display-options-modal
        >
          符文背景颜色：{{ glyphBGStr }}
        </button>
        <ModalOptionsToggleButton
          v-model="showGlyphInfoByDefault"
          :style="noEffectStyle()"
          text="在符文上显示额外符文信息："
        />
        <ModalOptionsToggleButton
          v-model="highContrastRarity"
          text="符文稀有度采用高对比度配色："
        />
        <ModalOptionsToggleButton
          v-model="swapGlyphColors"
          text="交换符文边框和符文符号的颜色："
        />
        <ExpandingControlBox
          class="o-primary-btn c-dropdown-btn"
          data-v-glyph-display-options-modal
        >
          <template #header>
            <div
              class="c-dropdown-header"
              data-v-glyph-display-options-modal
            >
              ▼ 额外符文信息： ▼
              <br>
              {{ infoLabel }}
            </div>
          </template>
          <template #dropdown>
            <SelectGlyphInfoDropdown />
          </template>
        </ExpandingControlBox>
      </div>
      <GlyphCustomization />
    </div>
  </ModalWrapperOptions>
  `
};