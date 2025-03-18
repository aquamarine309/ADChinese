import GlyphComponent from '../../../GlyphComponent.js'
import GlyphCustomizationSingleType from './GlyphCustomizationSingleType.js'
import PrimaryButton from '../../../PrimaryButton.js'
import PrimaryToggleButton from '../../../PrimaryToggleButton.js'

export default {
  name: 'GlyphCustomization',
  components: {
    GlyphCustomizationSingleType,
    PrimaryButton,
    PrimaryToggleButton,
    GlyphComponent,
  },
  data() {
    return {
      enabled: false,
      // This is here to force a re-render if the appearance is set to the default values
      defaultKeySwap: false,
      selectedIndex: 0,
    }
  },
  computed: {
    cosmeticTypes() {
      // We want to sort the base types in a way consistent with type orders within most of the rest of the game. We
      // can safely slice the first 5 and insert them back in the correct order because they'll always be unlocked.
      const nonBaseTypes = CosmeticGlyphTypes.list
        .filter((t) => t.canCustomize)
        .map((t) => t.id)
        .slice(5)
      const sortedBase = ['power', 'infinity', 'replication', 'time', 'dilation']
      return sortedBase.concat(nonBaseTypes)
    },
    glyphIconProps() {
      return {
        size: '2.5rem',
        'glow-blur': '0.3rem',
        'glow-spread': '0.1rem',
        'text-proportion': 0.7,
      }
    },
    hasCustomSets() {
      return GlyphAppearanceHandler.unlockedSets.length > 0
    },
    hasSpecialTypes() {
      return GlyphAppearanceHandler.availableTypes.length > 0
    },
  },
  watch: {
    enabled(newValue) {
      player.reality.glyphs.cosmetics.active = newValue
      EventHub.dispatch(GAME_EVENT.GLYPH_VISUAL_CHANGE)
    },
  },
  methods: {
    update() {
      this.enabled = player.reality.glyphs.cosmetics.active
      this.defaultKeySwap = true
    },
    resetAll() {
      const cosmetics = player.reality.glyphs.cosmetics
      cosmetics.symbolMap = {}
      cosmetics.colorMap = {}
      this.defaultKeySwap = false
      EventHub.dispatch(GAME_EVENT.GLYPH_VISUAL_CHANGE)
    },
    resetSingle() {
      const cosmetics = player.reality.glyphs.cosmetics
      const currType = this.cosmeticTypes[this.selectedIndex]
      cosmetics.symbolMap[currType] = undefined
      cosmetics.colorMap[currType] = undefined
      this.defaultKeySwap = false
      EventHub.dispatch(GAME_EVENT.GLYPH_VISUAL_CHANGE)
    },
    fakeGlyph(type) {
      let typeName = 'power'
      if (type === 'reality') typeName = 'reality'
      if (type === 'cursed') typeName = 'cursed'
      return {
        // This are just dummy values to make sure that GlyphComponent doesn't throw errors; only the cosmetic aspects
        // will end up being visible in this case anyway (as they override anything type would otherwise show). Type
        // looks particularly odd because reality glyphs need that passed in for the color animation, and cursed ones
        // are inverted, but power is an okay placeholder for anything else. We can't pass in type or else it will error
        // out with cosmetic types.
        type: typeName,
        strength: 1,
        cosmetic: type,
      }
    },
    typeClass(index) {
      return {
        'c-single-type': true,
        'o-disabled-cosmetics': !this.enabled,
        'c-type-current': this.selectedIndex === index,
        'c-type-other': this.selectedIndex !== index,
      }
    },
    resetIndividual() {
      for (const glyph of Glyphs.allGlyphs) {
        if (!glyph.fixedCosmetic) glyph.cosmetic = undefined
      }
      this.defaultKeySwap = false
      EventHub.dispatch(GAME_EVENT.GLYPH_VISUAL_CHANGE)
    },
  },
  template: `
  <div
    class="c-glyph-customization-group"
    data-v-glyph-customization
  >
    <b>自定义符文外观</b>
    <PrimaryToggleButton
      v-model="enabled"
      class="o-primary-btn--subtab-option"
      on="已启用"
      off="已禁用"
      data-v-glyph-customization
    />
    <br>
    <div v-if="hasCustomSets">
      Reset Appearances to Default:
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        :class="{ 'o-primary-btn--disabled' : !enabled }"
        @click="resetAll"
        data-v-glyph-customization
      >
        全部类型
      </PrimaryButton>
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        :class="{ 'o-primary-btn--disabled' : !enabled }"
        @click="resetSingle"
        data-v-glyph-customization
      >
        这个类型
      </PrimaryButton>
      <br>
      <i>这不会重置任何单独修改的符文。</i>
      <br>
      <br>
      符文类型：
      <br>
      <div
        class="c-type-selection"
        data-v-glyph-customization
      >
        <div
          v-for="(type, index) in cosmeticTypes"
          :key="type"
          :class="typeClass(index)"
          @click="selectedIndex = index"
          data-v-glyph-customization
        >
          <GlyphComponent
            v-tooltip="type.capitalize()"
            v-bind="glyphIconProps"
            :glyph="fakeGlyph(type)"
          />
        </div>
      </div>
      <GlyphCustomizationSingleType
        :key="selectedIndex + enabled + defaultKeySwap"
        :type="cosmeticTypes[selectedIndex]"
      />
            注意：某些选项可能会导致某些主题与某些字形类型的色彩对比度或可读性非常差。
    </div>
    <div v-else>
      您目前没有可用的选项来更改符文的默认外观。要解锁一些，请访问
      商店标签页或击败游戏。
      <br>
      <br>
      <span v-if="hasSpecialTypes">
        启用此设置后，您可以将单个符文更改为您已解锁的特殊外观类型。

      </span>
      <span v-else>
        启用或禁用该选项目前没有任何作用。
      </span>
    </div>
    <PrimaryButton
      class="o-primary-btn--subtab-option"
      @click="resetIndividual"
      data-v-glyph-customization
    >
      重置所有独立修改的符文外观
    </PrimaryButton>
  </div>
  `,
}
