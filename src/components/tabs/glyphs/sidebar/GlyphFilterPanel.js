import AutoSacrificeAdvancedTab from './AutoSacrificeAdvancedTab.js'
import AutoSacrificeEffectTab from './AutoSacrificeEffectTab.js'
import GlyphComponent from '../../../GlyphComponent.js'
import SliderComponent from '../../../SliderComponent.js'

export default {
  name: 'GlyphFilterPanel',
  components: {
    AutoSacrificeEffectTab,
    AutoSacrificeAdvancedTab,
    SliderComponent,
    GlyphComponent,
  },
  data() {
    return {
      mode: AUTO_GLYPH_SCORE.LOWEST_SACRIFICE,
      effectCount: 0,
      lockedTypes: GlyphTypes.locked.map((e) => e.id),
      advancedType: GLYPH_TYPES[0],
      alchemyUnlocked: false,
      // Note: there are two units at play: strength is from 1..3.5+; rarity is 0..100
      rarityThresholds: GLYPH_TYPES.mapToObject(
        (e) => e,
        () => 0
      ),
      autoRealityForFilter: player.options.autoRealityForFilter,
    }
  },
  computed: {
    modes() {
      return AUTO_GLYPH_SCORE
    },
    glyphTypes() {
      return GlyphTypes.list.filter((e) => !this.lockedTypes.includes(e.id))
    },
    raritySliderProps() {
      return {
        min: 0,
        max: 100,
        width: '18rem',
        valueInDot: true,
        tooltip: 'never',
        'dot-width': '2.2rem',
        'dot-height': '1.6rem',
        'dot-class': 'c-glyph-sacrifice-options__rarity-slider-handle',
        'bg-class': 'c-glyph-sacrifice-options__rarity-slider-bg',
        'process-class': 'c-glyph-sacrifice-options__rarity-slider-process',
        style: {
          'margin-left': '1rem',
        },
      }
    },
    glyphIconProps() {
      return {
        size: '3rem',
        'glow-blur': '0.3rem',
        'glow-spread': '0.1rem',
        'text-proportion': 0.66,
      }
    },
    questionmarkTooltip() {
      return `所有符文选项都会被评分，并与基于所选模式的阈值进行比较。
        得分最高的符文将被选中，但如果低于阈值仍会被献祭。
        （点击查看更多详情）`
    },
    autoRealityTooltip() {
      return `如果自动现实开启，将忽略所有其他设置，并在没有符文会被保留时立即重启现实`
    },
    unlockedModes() {
      return Object.values(this.modes).filter((idx) => this.isUnlocked(idx))
    },
  },
  methods: {
    update() {
      this.effectCount = player.reality.glyphs.filter.simple
      this.mode = AutoGlyphProcessor.scoreMode
      for (const type of generatedTypes) {
        this.rarityThresholds[type] = AutoGlyphProcessor.types[type].rarity
      }
      this.lockedTypes = GlyphTypes.locked.map((e) => e.id)
      this.alchemyUnlocked = Ra.unlocks.unlockGlyphAlchemy.canBeApplied
    },
    optionClass(idx) {
      const icon = this.modeIcon(idx)
      return ['c-glyph-sacrifice-options__option', idx === this.mode ? 'c-glyph-sacrifice-options__option--active' : 'c-glyph-sacrifice-options__option--inactive', icon]
    },
    modeIcon(idx) {
      switch (idx) {
        case this.modes.LOWEST_SACRIFICE:
          return 'fas fa-burn'
        case this.modes.EFFECT_COUNT:
          return 'fas fa-list-ul'
        case this.modes.RARITY_THRESHOLD:
          return 'fas fa-gem'
        case this.modes.SPECIFIED_EFFECT:
          return 'fas fa-tasks'
        case this.modes.EFFECT_SCORE:
          return 'fas fa-list-ol'
        case this.modes.LOWEST_ALCHEMY:
          return 'fas fa-atom'
        case this.modes.ALCHEMY_VALUE:
          return 'fas fa-flask'
        default:
          throw Error('Unrecognized glyph filter mode')
      }
    },
    strengthThreshold(type) {
      return rarityToStrength(this.rarityThresholds[type])
    },
    advancedTypeSelectStyle(type) {
      const color = GlyphAppearanceHandler.getBorderColor(type.id)
      return type.id === this.advancedType
        ? {
            color,
            'text-shadow': `0 0 0.25rem ${color}, 0 0 0.5rem ${color}, 0 0 0.75rem ${color}, 0 0 1rem ${color}`,
          }
        : {}
    },
    setMode(m) {
      AutoGlyphProcessor.scoreMode = m
      player.reality.hasCheckedFilter = false
    },
    setRarityThreshold(id, value) {
      AutoGlyphProcessor.types[id].rarity = value
    },
    setEffectCount(event) {
      const inputValue = event.target.value
      if (!isNaN(inputValue)) {
        this.effectCount = Math.clamp(inputValue, 0, 8)
        player.reality.glyphs.filter.simple = this.effectCount
      }
    },
    filterMode(index) {
      return AutoGlyphProcessor.filterModeName(index)
    },
    isUnlocked(index) {
      switch (index) {
        case this.modes.LOWEST_SACRIFICE:
        case this.modes.EFFECT_COUNT:
        case this.modes.RARITY_THRESHOLD:
        case this.modes.SPECIFIED_EFFECT:
        case this.modes.EFFECT_SCORE:
          return true
        case this.modes.LOWEST_ALCHEMY:
        case this.modes.ALCHEMY_VALUE:
          return this.alchemyUnlocked
        default:
          throw Error('Unrecognized glyph filter mode')
      }
    },
    // Clicking bumps the rarity over to adjacent thresholds between rarities; normal clicks move to the higher one
    // and shift-clicks move to the lower one. There is a loop-around that makes 100 go to 0 next and vice versa
    bumpRarity(type) {
      const rarityThresholds = GlyphRarities.map((r) => strengthToRarity(r.minStrength))
      let newRarity
      if (ui.view.shiftDown) {
        const lower = rarityThresholds.filter((s) => s < this.rarityThresholds[type])
        newRarity = lower.length === 0 ? 100 : lower.max()
      } else {
        // Note: As the minimum of an empty array is zero, this wraps around to 0% again if clicked at 100% rarity
        newRarity = rarityThresholds.filter((s) => s > this.rarityThresholds[type]).min()
      }
      this.setRarityThreshold(type, newRarity)
    },
    showFilterHowTo() {
      ui.view.h2pForcedTab = GameDatabase.h2p.tabs.filter((tab) => tab.name === 'Advanced Glyph Mechanics')[0]
      Modal.h2p.show()
    },
    getSymbol(type) {
      return CosmeticGlyphTypes[type].currentSymbol.symbol
    },
    toggleAutoReality() {
      player.options.autoRealityForFilter = !player.options.autoRealityForFilter
      this.autoRealityForFilter = player.options.autoRealityForFilter
      player.reality.hasCheckedFilter = false
    },

    exportFilterSettings() {
      const filter = player.reality.glyphs.filter
      const serializeType = (settings) => [settings.rarity, settings.score, settings.effectCount, settings.specifiedMask, settings.effectScores.join('/')].join(',')
      const simpleData = [filter.select, filter.simple, filter.trash].join('|')
      const typeData = ALCHEMY_BASIC_GLYPH_TYPES.map((t) => serializeType(filter.types[t])).join('|')
      copyToClipboard(GameSaveSerializer.encodeText(`${simpleData}|${typeData}`, 'glyph filter'))
      GameUI.notify.info('筛选设置已导出到剪贴板')
    },
    importFilterSettings() {
      Modal.importFilter.show()
    },
  },
  template: `
  <div class="l-glyph-sacrifice-options c-glyph-sacrifice-options l-glyph-sidebar-panel-size">
    <div class="c-glyph-sacrifice-options c-glyph-sacrifice-options-container">
      <div
        class="c-filter-extra-btns c-top-left"
        data-v-glyph-filter-panel
      >
        <i
          v-tooltip="'导出筛选设置'"
          class="fas fa-file-export l-top-left-btn"
          @click="exportFilterSettings"
          data-v-glyph-filter-panel
        />
        <i
          v-tooltip="'导入筛选设置'"
          class="fas fa-file-import l-top-left-btn"
          @click="importFilterSettings"
          data-v-glyph-filter-panel
        />
      </div>
      <div
        class="c-filter-extra-btns c-top-right"
        data-v-glyph-filter-panel
      >
        <i
          v-tooltip="autoRealityTooltip"
          class="fas fa-recycle l-top-right-btn"
          :class="{ 'o-quick-reality' : autoRealityForFilter }"
          @click="toggleAutoReality"
          data-v-glyph-filter-panel
        />
        <i
          v-tooltip="questionmarkTooltip"
          class="fas fa-question-circle l-top-right-btn o-borderless"
          @click="showFilterHowTo"
          data-v-glyph-filter-panel
        />
      </div>
      当前筛选模式：
      <br>
      {{ filterMode(mode) }}
      <br>
      <div class="c-glyph-filter-mode-container">
        <div
          v-for="index in unlockedModes"
          :key="index"
          :class="optionClass(index)"
          @click="setMode(index)"
        >
          <div class="c-glyph-sacrifice-options__option__tooltip">
            {{ filterMode(index) }}
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="mode === modes.LOWEST_SACRIFICE"
      class="c-glyph-sacrifice-options__advanced"
    >
      <br>
        符文评分基于类型分配。优先选择属于总符文献祭值最低类型的符文。
      <br>
      <br>
        此模式不会保留任何符文，而是始终献祭所选的符文。
    </div>
    <div
      v-if="mode === modes.EFFECT_COUNT"
      class=" c-glyph-sacrifice-options__advanced"
    >
      <br>
      选择至少拥有
      <input
        ref="effectCount"
        type="number"
        min="0"
        max="8"
        class="c-auto-sac-effect-tab__input"
        :value="effectCount"
        @blur="setEffectCount"
      >
      个词条的符文。词条数量相等时，优先选择稀有度更高的符文。
    </div>
    <div
      v-if="mode === modes.RARITY_THRESHOLD"
      class="l-glyph-sacrifice-options__rarity-sliders"
    >
      <span class="c-glyph-sacrifice-options__advanced">
        所有低于以下稀有度阈值的符文将被献祭。
      </span>
      <div
        v-for="type in glyphTypes"
        :key="type.id"
        class="l-glyph-sacrifice-options__rarity-slider-div"
      >
        <span @click="bumpRarity(type.id)">
          <GlyphComponent
            :glyph="{type: type.id, strength: strengthThreshold(type.id) }"
            v-bind="glyphIconProps"
            class="o-clickable"
            GlyphFilterPanel
          />
        </span>
        <SliderComponent
          v-bind="raritySliderProps"
          :value="rarityThresholds[type.id]"
          :width="'100%'"
          @input="setRarityThreshold(type.id, $event)"
        />
      </div>
    </div>
    <div
      v-if="mode === modes.SPECIFIED_EFFECT"
      class="c-glyph-sacrifice-options__advanced"
    >
      <div>
        符文类型：
        <span
          v-for="type in glyphTypes"
          :key="type.id"
          v-tooltip=""
          class="l-glyph-sacrifice-options__advanced-type-select c-glyph-sacrifice-options__advanced-type-select"
          :style="advancedTypeSelectStyle(type)"
          @click="advancedType=type.id"
        >
          {{ getSymbol(type.id) }}
        </span>
      </div>
      <br>
      <div class="l-glyph-sacrifice-options__rarity-slider-div">
        <span @click="bumpRarity(advancedType)">
          <GlyphComponent
            :glyph="{type: advancedType, strength: strengthThreshold(advancedType) }"
            v-bind="glyphIconProps"
            class="o-clickable"
            GlyphFilterPanel
          />
        </span>
        <SliderComponent
          v-bind="raritySliderProps"
          :value="rarityThresholds[advancedType]"
          :width="'100%'"
          @input="setRarityThreshold(advancedType, $event)"
        />
      </div>
      <template v-for="type in glyphTypes">
        <AutoSacrificeEffectTab
          v-show="type.id === advancedType"
          :key="type.id"
          :glyph-type="type.id"
        />
      </template>
    </div>
<div
      v-if="mode === modes.EFFECT_SCORE"
      class="c-glyph-sacrifice-options__advanced"
    >
      <div>
        符文类型：
        <span
          v-for="type in glyphTypes"
          :key="type.id"
          v-tooltip="type.id.capitalize()"
          class="l-glyph-sacrifice-options__advanced-type-select c-glyph-sacrifice-options__advanced-type-select"
          :style="advancedTypeSelectStyle(type)"
          @click="advancedType=type.id"
        >
          {{ getSymbol(type.id) }}
        </span>
      </div>
      <br>
      <template v-for="type in glyphTypes">
        <AutoSacrificeAdvancedTab
          v-show="type.id === advancedType"
          :key="type.id"
          :glyph-type="type.id"
        />
      </template>
    </div>
    <div
      v-if="mode === modes.LOWEST_ALCHEMY"
      class="c-glyph-sacrifice-options__advanced"
    >
      <br>
        符文评分基于当前炼金资源总量。优先选择关联炼金资源总量最低的符文类型。
      <br>
      <br>
        此模式不会保留任何符文。
    </div>
    <div
      v-if="mode === modes.ALCHEMY_VALUE"
      class="c-glyph-sacrifice-options__advanced"
    >
      <br>
        符文将根据<i>当前</i>精炼值分配价值，并考虑类型特定的资源上限。优先选择价值最高的符文；会导致达到资源上限的符文实际价值较低。
      <br>
      <br>
        此模式不会保留任何符文。
    </div>
  </div>
  `,
}
