import ButtonCycle from "../../../ButtonCycle.js";
import ToggleButton from "../../../ToggleButton.js";

export default {
  name: "GlyphAutosortButtonGroup",
  components: {
    ToggleButton,
    ButtonCycle
  },
  data() {
    return {
      autoSort: 0,
      showScoreFilter: false,
      autoCollapse: false,
      showAutoAutoClean: false,
      autoAutoClean: false,
      applyFilterToPurge: false,
    };
  },
  computed: {
    sortModes() {
      // These are the keys for AUTO_SORT_MODE, with SCORE only added conditionally if unlocked
      const availableSortModes = ["无", "等级", "强度", "词条"];
      if (this.showScoreFilter) availableSortModes.push("分数");
      return availableSortModes;
    },
    questionMarkTooltip() {
      return `The automatic settings below will apply after every Reality`;
    },
    keepTooltip() {
      return "If set to ON, Glyphs which your filter accepts will never be auto-purged even if they are worse";
    }
  },
  watch: {
    autoSort(newValue) {
      player.reality.autoSort = newValue;
    },
    autoCollapse(newValue) {
      player.reality.autoCollapse = newValue;
    },
    autoAutoClean(newValue) {
      player.reality.autoAutoClean = newValue;
    },
    applyFilterToPurge(newValue) {
      player.reality.applyFilterToPurge = newValue;
    },
  },
  methods: {
    update() {
      this.autoSort = player.reality.autoSort;
      this.showScoreFilter = EffarigUnlock.glyphFilter.isUnlocked;
      this.autoCollapse = player.reality.autoCollapse;
      this.showAutoAutoClean = VUnlocks.autoAutoClean.canBeApplied;
      this.autoAutoClean = player.reality.autoAutoClean;
      this.applyFilterToPurge = player.reality.applyFilterToPurge;
    },
  },
  template: `
  <div class="o-glyph-inventory-management-group">
    <div class="l-glyph-sacrifice-options__header">
      <div
        v-tooltip="questionMarkTooltip"
        class="o-questionmark"
      >
        ?
      </div>
      自动符文排序：
    </div>
    <ButtonCycle
      v-model="autoSort"
      class="c-glyph-inventory-option"
      text="自动排序模式："
      :labels="sortModes"
    />
    <ToggleButton
      v-model="autoCollapse"
      class="c-glyph-inventory-option"
      label="自动清除空格："
    />
    <ToggleButton
      v-if="showAutoAutoClean"
      v-model="autoAutoClean"
      class="c-glyph-inventory-option"
      label="现实后自动净化符文仓库："
    />
    <ToggleButton
      v-if="showAutoAutoClean"
      v-model="applyFilterToPurge"
      class="c-glyph-inventory-option"
      label="符合符文筛选条件的符文不会被自动净化："
      tooltip-class="c-glyph-inventory-option__tooltip"
      :tooltip-content="keepTooltip"
    />
  </div>
  `
};