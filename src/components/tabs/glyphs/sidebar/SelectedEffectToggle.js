export default {
  name: "SelectedEffectToggle",
  props: {
    effect: {
      type: Object,
      required: true
    },
    glyphType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isActive: false,
      noExclude: false,
      effarigSettings: {
        effarigrm: false,
        effarigglyph: false
      }
    };
  },
  computed: {
    color() {
      return GlyphAppearanceHandler.getBorderColor(this.glyphType);
    },
    description() {
      return this.effect.genericDesc;
    },
    classObject() {
      return this.isActive ? "c-auto-sac-type-tab__effect-desc--active" : "c-auto-sac-type-tab__effect-desc--inactive";
    },
    // This is hardcoded here since there is only one case ever, and that adding generic dynamic support to multiple
    // pairs/groups of effects is both out of design scope and an unacceptable performance hit to amplified realities
    exclusionTooltip() {
      if (this.noExclude) return "";

      const effarigSettings = this.effarigSettings;
      if (effarigSettings.RM && effarigSettings.glyph &&
        (this.effect.id === "effarigrm" || this.effect.id === "effarigglyph")) {
        return "RM multiplier and Glyph instability cannot occur together on the same Glyph!";
      }
      if (this.effect.id === "effarigrm" && effarigSettings.glyph) {
        return "This effect is mutually exclusive with Glyph instability!";
      }
      if (this.effect.id === "effarigglyph" && effarigSettings.RM) {
        return "This effect is mutually exclusive with RM multiplier!";
      }
      return "";
    },
    isExcluded() {
      return this.exclusionTooltip !== "";
    },
    effarigBits() {
      const effectDB = GameDatabase.reality.glyphEffects;
      return {
        RM: effectDB.effarigrm.bitmaskIndex,
        glyph: effectDB.effarigglyph.bitmaskIndex,
      };
    }
  },
  methods: {
    update() {
      this.isActive = (AutoGlyphProcessor.types[this.glyphType].specifiedMask & (1 << this.effect.bitmaskIndex)) !== 0;
      const effarigMask = AutoGlyphProcessor.types.effarig.specifiedMask;
      this.effarigSettings = {
        RM: (effarigMask & (1 << this.effarigBits.RM)) !== 0,
        glyph: (effarigMask & (1 << this.effarigBits.glyph)) !== 0
      };
      this.noExclude = Ra.unlocks.glyphEffectCount.canBeApplied;
    },
    toggleSelection() {
      AutoGlyphProcessor.types[this.glyphType].specifiedMask ^= 1 << this.effect.bitmaskIndex;
    },
    setEffectCount(event) {
      const inputValue = event.target.value;
      if (!isNaN(inputValue)) {
        this.autoSacrificeSettings.effectCount = Math.clamp(inputValue, 0, 8);
      }
    },
  },
  template: `
  <div
    v-tooltip="exclusionTooltip"
    :class="classObject"
    @click="toggleSelection()"
    data-v-selected-effect-toggle
  >
    <span>
      <i
        v-if="isExcluded"
        class="fas fa-exclamation l-dock l-dock-left"
        data-v-selected-effect-toggle
      />
      {{ description }}
      <i
        v-if="isExcluded"
        class="fas fa-exclamation l-dock l-dock-right"
        data-v-selected-effect-toggle
      />
    </span>
    <i
      v-if="isActive"
      class="fas fa-check c-selected-effect-toggle-indicator--active"
      :style="{ 'background-color': color }"
      data-v-selected-effect-toggle
    />
  </div>
  `
};