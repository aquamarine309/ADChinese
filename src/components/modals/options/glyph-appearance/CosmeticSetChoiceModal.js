import CosmeticSetDropdown from "./CosmeticSetDropdown.js";
import ExpandingControlBox from "../../../ExpandingControlBox.js";
import GlyphComponent from "../../../GlyphComponent.js";
import ModalWrapperChoice from "../../ModalWrapperChoice.js";

export default {
  name: "CosmeticSetChoiceModal",
  components: {
    ModalWrapperChoice,
    ExpandingControlBox,
    CosmeticSetDropdown,
    GlyphComponent
  },
  data() {
    return {
      initialSet: "",
      currentSet: "",
    };
  },
  computed: {
    lockedSets() {
      return GlyphAppearanceHandler.lockedSets;
    },
    cosmeticTypes() {
      return CosmeticGlyphTypes.list.filter(t => t.isCosmetic && t.isUnlocked).map(t => t.id);
    },
    setName() {
      return this.currentSet?.name ?? "None Selected";
    },
    setContents() {
      const contents = [];
      // We explicitly pass in x => x as the formatting function in order to override END formatting; if we don't,
      // this modal will show END symbols/colors when opened at game completion
      if (this.symbols) contents.push(`${this.symbols.length} 符号`);
      if (this.colors) contents.push(`${this.colors.length} 配色`);
      return contents.join(" 和 ");
    },
    symbols() {
      return this.currentSet.symbol;
    },
    colors() {
      return this.currentSet.color;
    },
    glyphIconProps() {
      return {
        size: "3rem",
        "glow-blur": "0.3rem",
        "glow-spread": "0.1rem",
        "text-proportion": 0.66,
      };
    },
  },
  created() {
    this.initialSet = GlyphAppearanceHandler.chosenFromModal;
    GlyphAppearanceHandler.setInModal = this.initialSet;
  },
  methods: {
    update() {
      this.currentSet = GlyphAppearanceHandler.setInModal;
    },
    chooseSet() {
      GlyphAppearanceHandler.chosenFromModal = this.currentSet;
    },
    cancelSet() {
      GlyphAppearanceHandler.chosenFromModal = this.initialSet;
      this.emitClose();
    },
    fakeGlyph(color) {
      return {
        type: "power",
        strength: 1,
        color,
      };
    },
  },
  template: `
  <ModalWrapperChoice
    :cancel-fn="cancelSet"
    @confirm="chooseSet"
  >
    <template #header>
      选择一组符文皮肤
    </template>
    <div
      class="c-center"
      data-v-cosmetic-set-choice-modal
    >
      <ExpandingControlBox
        class="o-primary-btn c-dropdown-btn"
        data-v-cosmetic-set-choice-modal
      >
        <template #header>
          <div
            class="c-dropdown-header"
            data-v-cosmetic-set-choice-modal
          >
            ▼ 可选符文皮肤 ▼
            <br>
            {{ setName }}
          </div>
        </template>
        <template #dropdown>
          <CosmeticSetDropdown />
        </template>
      </ExpandingControlBox>
      <div v-if="currentSet">
        "{{ currentSet.name }}"皮肤包含以下 {{ setContents }}：
        <br>
        <span
          v-for="symbol of symbols"
          :key="symbol"
          class="o-single-symbol"
          data-v-cosmetic-set-choice-modal
        >
          {{ symbol }}
        </span>
        <br>
        <span
          v-for="color of colors"
          :key="color"
          class="o-single-glyph"
          data-v-cosmetic-set-choice-modal
        >
          <GlyphComponent
            v-bind="glyphIconProps"
            :glyph="fakeGlyph(color)"
          />
        </span>
      </div>
    </div>
  </ModalWrapperChoice>
  `
};