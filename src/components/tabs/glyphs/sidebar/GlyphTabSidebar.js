import GlyphFilterPanel from "./GlyphFilterPanel.js";
import GlyphInventoryManagementPanel from "./GlyphInventoryManagementPanel.js";
import GlyphRejectionPanel from "./GlyphRejectionPanel.js";
import GlyphSetSavePanel from "./GlyphSetSavePanel.js";

export default {
  name: "GlyphTabSidebar",
  components: {
    GlyphInventoryManagementPanel,
    GlyphFilterPanel,
    GlyphSetSavePanel,
    GlyphRejectionPanel,
  },
  data() {
    return {
      type: 0,
      sidebarEnum: {},
      unlockedFilter: false,
      unlockedSets: false,
      unlockedAlchemy: false,
      hasMoreOptions: false,
      hasRefined: false,
    };
  },
  computed: {
    isDoomed() {
      return Pelle.isDoomed;
    }
  },
  methods: {
    update() {
      this.type = player.reality.showSidebarPanel;
      this.sidebarEnum = GLYPH_SIDEBAR_MODE;
      this.unlockedFilter = EffarigUnlock.glyphFilter.isUnlocked;
      this.unlockedSets = EffarigUnlock.setSaves.isUnlocked;
      this.unlockedAlchemy = Ra.unlocks.unlockGlyphAlchemy.canBeApplied;
      // We always have inventory management available, but there's no point in showing options if it's the only one
      this.hasMoreOptions = this.unlockedFilter || this.unlockedSets || this.unlockedAlchemy;
      this.hasRefined = AlchemyResources.all.map(res => res.amount).some(a => a > 0);
    },
    setSidebarState(state) {
      player.reality.showSidebarPanel = state;
    },
    sidebarClass(index) {
      return {
        "l-glyph-sidebar-button": true,
        "c-glyph-sidebar-button": true,
        "c-glyph-sidebar-button--active": index === player.reality.showSidebarPanel,
        "l-glyph-sidebar-button--attention": index === this.sidebarEnum.SACRIFICE_TYPE &&
          !this.hasRefined && !this.isDoomed
      };
    }
  },
  template: `
  <div class="l-glyph-sidebar-option-container">
    <div
      v-if="hasMoreOptions"
      class="l-glyph-sidebar-tab-container"
    >
      <button
        :class="sidebarClass(sidebarEnum.INVENTORY_MANAGEMENT)"
        @click="setSidebarState(sidebarEnum.INVENTORY_MANAGEMENT)"
      >
        仓库管理
      </button>
      <button
        v-if="unlockedFilter"
        :class="sidebarClass(sidebarEnum.FILTER_SETTINGS)"
        @click="setSidebarState(sidebarEnum.FILTER_SETTINGS)"
      >
        符文筛选
      </button>
      <button
        v-if="unlockedSets"
        :class="sidebarClass(sidebarEnum.SAVED_SETS)"
        @click="setSidebarState(sidebarEnum.SAVED_SETS)"
      >
        符文预设
      </button>
      <button
        v-if="unlockedAlchemy"
        :class="sidebarClass(sidebarEnum.SACRIFICE_TYPE)"
        @click="setSidebarState(sidebarEnum.SACRIFICE_TYPE)"
      >
        献祭类型
      </button>
    </div>
    <GlyphInventoryManagementPanel
      v-if="type === sidebarEnum.INVENTORY_MANAGEMENT"
      :has-more-options="hasMoreOptions"
    />
    <GlyphFilterPanel v-else-if="type === sidebarEnum.FILTER_SETTINGS && unlockedFilter" />
    <GlyphSetSavePanel v-else-if="type === sidebarEnum.SAVED_SETS && unlockedSets" />
    <GlyphRejectionPanel v-else-if="type === sidebarEnum.SACRIFICE_TYPE && unlockedAlchemy" />
  </div>
  `
};