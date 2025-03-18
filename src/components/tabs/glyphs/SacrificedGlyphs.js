import { DC } from '../../../core/constants.js'

import TypeSacrifice from './TypeSacrifice.js'

export default {
  name: 'SacrificedGlyphs',
  components: {
    TypeSacrifice,
  },
  data() {
    return {
      anySacrifices: false,
      hasDragover: false,
      hasAlteration: false,
      hideAlteration: false,
      maxSacrifice: 0,
      teresaMult: 0,
      lastMachinesTeresa: new Decimal(0),
    }
  },
  computed: {
    types: () => GLYPH_TYPES.filter((type) => type !== 'cursed' && type !== 'companion'),
    lastMachines() {
      return this.lastMachinesTeresa.lt(DC.E10000) ? `${format(this.lastMachinesTeresa, 2)} 现实机器` : `${format(this.lastMachinesTeresa.dividedBy(DC.E10000), 2)} 虚幻机器`
    },
    dropDownIconClass() {
      return this.hideAlteration ? 'far fa-plus-square' : 'far fa-minus-square'
    },
    isDoomed() {
      return Pelle.isDoomed
    },
    addThreshold() {
      return GlyphAlteration.additionThreshold
    },
    empowerThreshold() {
      return GlyphAlteration.empowermentThreshold
    },
    boostThreshold() {
      return GlyphAlteration.boostingThreshold
    },
    cosmeticTypes: () => CosmeticGlyphTypes,
    addStyle() {
      return { color: GlyphAlteration.baseAdditionColor() }
    },
    empowerStyle() {
      return { color: GlyphAlteration.baseEmpowermentColor() }
    },
    boostStyle() {
      return { color: GlyphAlteration.baseBoostColor() }
    },
    hasSeenRealityGlyph() {
      return player.reality.glyphs.createdRealityGlyph
    },
  },
  created() {
    this.on$(GAME_EVENT.GLYPH_VISUAL_CHANGE, () => {
      this.$recompute('cosmeticTypes')
    })
  },
  methods: {
    update() {
      this.anySacrifices = GameCache.logTotalGlyphSacrifice !== 0
      this.hasAlteration = Ra.unlocks.alteredGlyphs.canBeApplied
      this.hideAlteration = player.options.hideAlterationEffects
      this.maxSacrifice = GlyphSacrificeHandler.maxSacrificeForEffects
      this.teresaMult = Teresa.runRewardMultiplier
      this.lastMachinesTeresa.copyFrom(player.celestials.teresa.lastRepeatedMachines)
    },
    dragover(event) {
      if (Pelle.isDoomed) return
      if (!event.dataTransfer.types.includes(GLYPH_MIME_TYPE)) return
      event.preventDefault()
      this.hasDragover = true
    },
    dragleave(event) {
      if (
        this.isDoomed ||
        !event.relatedTarget ||
        !event.relatedTarget.classList ||
        event.relatedTarget.classList.contains('c-current-glyph-effects') ||
        event.relatedTarget.classList.contains('c-sacrificed-glyphs__header') ||
        event.relatedTarget.classList.contains('l-sacrificed-glyphs__type') ||
        event.relatedTarget.classList.contains('l-sacrificed-glyphs__type-symbol') ||
        event.relatedTarget.classList.contains('l-sacrificed-glyphs__type-amount') ||
        event.relatedTarget.classList.contains('c-sacrificed-glyphs__type-new-amount') ||
        event.relatedTarget.classList.length === 0
      )
        return
      this.hasDragover = false
    },
    drop(event) {
      if (this.isDoomed || !event.dataTransfer.types.includes(GLYPH_MIME_TYPE)) return
      const id = parseInt(event.dataTransfer.getData(GLYPH_MIME_TYPE), 10)
      if (isNaN(id)) return
      const glyph = Glyphs.findById(id)
      if (!glyph) return
      GlyphSacrificeHandler.sacrificeGlyph(glyph, true)
      this.hasDragover = false
    },
    toggleAlteration() {
      player.options.hideAlterationEffects = !player.options.hideAlterationEffects
    },
    glyphSymbol(type) {
      return this.cosmeticTypes[type].currentSymbol.symbol
    },
  },
  template: `
  <div
    class="c-current-glyph-effects l-current-glyph-effects"
    :class="{'c-sacrificed-glyphs--dragover': hasDragover}"
    @dragover="dragover"
    @dragleave="dragleave"
    @drop="drop"
  >
    <div class="l-sacrificed-glyphs__help">
      <span
        v-if="isDoomed"
        class="pelle-current-glyph-effects"
      >你不能在被毁灭的现实中献祭符文。
        
      </span>
      <span v-else>
        <div>拖拽符文到此或按住Shift键点击进行献祭</div>
        <div>确认提示可在设置或按住Ctrl键禁用</div>
      </span>
    </div>
    <div v-if="hasAlteration">
      <span
        class="c-altered-glyphs-toggle-button"
        @click="toggleAlteration"
      >
        <i :class="dropDownIconClass" />
        <b>异变符文</b>
      </span>
      <br>
      <div v-if="hideAlteration">
        （已隐藏详情，点击以打开）
      </div>
      <div v-else>
        当某种符文类型的总献祭值高于以下数值时
该符文类型的某个效果将得到提升：
        <br><br>
        <b>
          <span :style="addStyle">{{ format(addThreshold) }} - 一些符文词条获得附加效果</span>
          <br>
          <span :style="empowerStyle">{{ format(empowerThreshold) }} - 大幅度改善一些符文词条的效果公式</span>
          <br>
          <span :style="boostStyle">{{ format(boostThreshold) }} - 基于符文献祭，提供额外加成</span>
        </b>
        <br><br>
        符文献祭值到达{{ format(maxSacrifice) }}后无法进行献祭。
      </div>
    </div>
    <br>
    <div class="c-sacrificed-glyphs__header">
      符文献祭加成：
    </div>
    <div v-if="anySacrifices && !isDoomed">
      <div v-if="teresaMult > 1">
       符文献祭值乘数为： {{ formatX(teresaMult, 2, 2) }};
        上次特蕾莎中的现实机器数值为： {{ lastMachines }}.
        <span v-if="hasSeenRealityGlyph">
          现实符文不受乘数和异变影响
        </span>
      </div>
      <template v-for="type in types">
        <TypeSacrifice
          :key="type + glyphSymbol(type)"
          :type="type"
          :has-dragover="hasDragover"
        />
      </template>
    </div>
    <div
      v-else-if="isDoomed"
      class="pelle-current-glyph-effects"
    >
      在被毁灭的现实中，禁用符文献祭和异变符文的效果。
    </div>
    <div v-else>
      你还没有献祭任何符文！
    </div>
  </div>
  `,
}
