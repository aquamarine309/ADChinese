import GlyphComponent from '../../GlyphComponent.js'
import ModalWrapperChoice from '../ModalWrapperChoice.js'
import PrimaryButton from '../../PrimaryButton.js'

export default {
  name: 'RealityModal',
  components: {
    PrimaryButton,
    ModalWrapperChoice,
    GlyphComponent,
  },
  data() {
    return {
      firstReality: false,
      hasSpace: true,
      hasChoice: false,
      hasFilter: false,
      glyphs: [],
      bestLevel: 0,
      levelDifference: 0,
      selectedGlyph: undefined,
      canRefresh: false,
      level: 0,
      simRealities: 0,
      realityMachines: new Decimal(),
      shardsGained: 0,
      effarigUnlocked: false,
      willAutoPurge: false,
    }
  },
  computed: {
    firstRealityText() {
      return `现实重置将重置除挑战记录和统计选项卡中“通用”标题下的内容外的所有内容。
        前 ${formatInt(13)} 行成就也会被重置，但你每 ${timeDisplayNoDecimals(30 * 60000)} 会自动恢复一个成就。
        你还将根据永恒点数获得现实机器，一个等级基于你的永恒点数、复制体和膨胀时间的符文，
        一个可用于生活质量升级的增益点数，并解锁各种升级。`
    },
    canSacrifice() {
      return RealityUpgrade(19).isEffectActive
    },
    warnText() {
      if (!this.hasChoice) {
        return `你目前每次现实只能获得一个符文选项。你可以通过取消此弹窗并购买“起始”增益
          来解锁从多个符文中选择的能力。`
      }

      if (this.hasFilter && this.selectedGlyph === undefined) {
        return `如果你不选择一个符文，系统将根据你的符文过滤器自动选择一个。`
      }
      return this.selectedGlyph === undefined ? `你必须选择一个符文才能继续。` : null
    },
    gained() {
      const gainedResources = []
      gainedResources.push(`${formatInt(this.simRealities)} 现实次数`)
      gainedResources.push(`${formatInt(this.simRealities)} 个复兴点数`)
      gainedResources.push(`${format(this.realityMachines, 2)} 个现实机器`)
      if (this.effarigUnlocked) {
        gainedResources.push(`${format(this.shardsGained, 2)} 个遗迹碎片`)
      }
      return `你将获得 ${makeEnumeration(gainedResources)}`
    },
    levelStats() {
      // 由于需要 >、< 和 =，且 = 需要不同的格式，阅读起来有点麻烦。
      return `现实时获得一个等级为 ${formatInt(this.level)} 的符文，它的等级
        ${
          this.level === this.bestLevel
            ? '与你最高等级的符文相同'
            : `比你最高等级的符文${this.level > this.bestLevel ? '高' : '低'}
        ${formatInt(this.levelDifference)}`
        }。`
    },
    confirmationToDisable() {
      return ConfirmationTypes.glyphSelection.isUnlocked() ? '符文选择' : undefined
    },
    canConfirm() {
      return this.firstReality || this.selectedGlyph !== undefined || this.hasFilter
    },
  },
  created() {
    this.getGlyphs()
    GlyphSelection.realityProps = getRealityProps(false, false)
  },
  methods: {
    update() {
      this.firstReality = player.realities === 0
      this.hasChoice = Perk.firstPerk.isEffectActive
      this.effarigUnlocked = TeresaUnlocks.effarig.canBeApplied
      this.hasFilter = EffarigUnlock.glyphFilter.isUnlocked
      this.level = gainedGlyphLevel().actualLevel
      this.simRealities = 1 + simulatedRealityCount(false)
      this.hasSpace = GameCache.glyphInventorySpace.value >= this.simRealities
      const simRMGained = MachineHandler.gainedRealityMachines.times(this.simRealities)
      this.realityMachines.copyFrom(simRMGained.clampMax(MachineHandler.distanceToRMCap))
      this.shardsGained = Effarig.shardsGained * (simulatedRealityCount(false) + 1)
      this.willAutoPurge = player.reality.autoAutoClean
      if (this.firstReality) return
      for (let i = 0; i < this.glyphs.length; ++i) {
        const currentGlyph = this.glyphs[i]
        const newGlyph = GlyphSelection.glyphList(GlyphSelection.choiceCount, gainedGlyphLevel(), { isChoosingGlyph: false })[i]
        if (currentGlyph.level === newGlyph.level) continue
        currentGlyph.level = newGlyph.level
        currentGlyph.effects = newGlyph.effects
      }
      this.bestLevel = player.records.bestReality.glyphLevel
      this.levelDifference = Math.abs(this.bestLevel - this.level)
    },
    glyphClass(index) {
      return {
        'l-modal-glyph-selection__glyph': true,
        'l-modal-glyph-selection__glyph--selected': this.selectedGlyph === index,
      }
    },
    getGlyphs() {
      this.canRefresh = true
      this.glyphs = GlyphSelection.upcomingGlyphs
    },
    select(index) {
      this.selectedGlyph = index
    },
    confirmModal(sacrifice) {
      if (!this.canConfirm) return
      if (sacrifice) {
        // Sac isn't passed through confirm so we have to close it manually
        this.emitClose()
      }
      startManualReality(sacrifice, this.selectedGlyph)
    },
  },
  template: `
  <ModalWrapperChoice
    :option="confirmationToDisable"
    :show-confirm="canConfirm"
    @confirm="confirmModal(false)"
    data-v-reality-modal
  >
    <template #header>
      你正要进行一次现实
    </template>
    <div
      v-if="firstReality"
      class="c-modal-message__text"
      data-v-reality-modal
    >
      {{ firstRealityText }}
    </div>

    <div
      class="c-modal-message__text"
      data-v-reality-modal
    >
      {{ gained }}
    </div>
    <div
      v-if="!firstReality"
      class="l-glyph-selection__row"
      data-v-reality-modal
    >
      <GlyphComponent
        v-for="(glyph, index) in glyphs"
        :key="index"
        :class="glyphClass(index)"
        :glyph="glyph"
        :is-in-modal="true"
        :ignore-modified-level="true"
        :show-sacrifice="canSacrifice"
        @click.native="select(index)"
        data-v-reality-modal
      />
    </div>
    <div v-if="!firstReality">
      {{ levelStats }}
      <br>
      <b class="o-warning">
        {{ warnText }}
      </b>
    </div>
    <div v-if="simRealities > 1">
      <br>
      选中该符文后游戏将计算剩余的现实，随后游戏将基于符文筛选的设置，自动选择另外 {{ formatInt(simRealities - 1) }} 个符文。
    </div>
    <div v-if="willAutoPurge">
      <br>
      已启用符文仓库自动净化，选中的符文在自动净化触发后可能不会在符文仓库中出现。
    </div>
    <div
      v-if="!hasSpace"
      class="o-warning"
      data-v-reality-modal
    >
      <span v-if="simRealities > 1">
        You will be simulating more Realities than you have open inventory space for;
        this may result in some Glyphs being Sacrificed.
      </span>
      <span v-else>
        你的符文仓库没有可用空间，选中的符文将被
        {{ canSacrifice ? "献祭" : "移除" }}！
      </span>
    </div>
    <div v-if="confirmationToDisable">
      <br>
      你可以通过按住shift点击现实按钮来强制此模态框出现（即使你关闭了它）
    <template
      v-if="canSacrifice && canConfirm"
      #extra-buttons
    >
      <PrimaryButton
        class="o-primary-btn--width-medium c-modal-message__okay-btn"
        @click="confirmModal(true)"
        data-v-reality-modal
      >
        献祭
      </PrimaryButton>
    </template>
  </ModalWrapperChoice>
  `,
}
