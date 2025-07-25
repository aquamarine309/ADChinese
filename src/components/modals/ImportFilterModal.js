import ImportFilterSingleType from "./ImportFilterSingleType.js";
import ModalWrapperChoice from "./ModalWrapperChoice.js";
import PrimaryButton from "../PrimaryButton.js";

export default {
  name: "ImportFilterModal",
  components: {
    ModalWrapperChoice,
    PrimaryButton,
    ImportFilterSingleType
  },
  data() {
    return {
      currentSettings: {},
      input: "",
    };
  },
  computed: {
    inputIsValid() {
      let decoded;
      try {
        decoded = GameSaveSerializer.decodeText(this.input, "glyph filter");
        return decoded.length > 0 && decoded.match(/^[0-9,.|/-]*$/u) !== null;
      } catch {
        return false;
      }
    },
    parsedSettings() {
      if (!this.inputIsValid) return null;

      const decoded = GameSaveSerializer.decodeText(this.input, "glyph filter");
      const parts = decoded.split("|");
      const typeInfo = {};
      let partIndex = 3;
      for (const type of ALCHEMY_BASIC_GLYPH_TYPES) {
        if (!type) continue;
        const subparts = parts[partIndex].split(",");
        typeInfo[type] = {
          rarity: Number(subparts[0]),
          score: Number(subparts[1]),
          effectCount: Number(subparts[2]),
          specifiedMask: Number(subparts[3]),
          effectScores: subparts[4].split("/").map(s => Number(s)),
        };
        partIndex++;
      }

      return {
        select: Number(parts[0]),
        simple: Number(parts[1]),
        trash: Number(parts[2]),
        types: typeInfo,
      };
    },
    selectStr() {
      return this.changedValue(this.parsedSettings.select, this.currentSettings.select,
        x => AutoGlyphProcessor.filterModeName(x));
    },
    basicCountStr() {
      return this.changedValue(this.parsedSettings.simple, this.currentSettings.simple, formatInt);
    },
    trashStr() {
      return this.changedValue(this.parsedSettings.trash, this.currentSettings.trash,
        x => AutoGlyphProcessor.trashModeDesc(x));
    },
    // Hide effarig if it hasn't been unlocked yet
    availableTypes() {
      return ALCHEMY_BASIC_GLYPH_TYPES.filter(t => !GlyphTypes.locked.map(e => e.id).includes(t));
    },
    settingTooltipText() {
      return `Mouseover each box for more details. ✔ and ✘ symbols denote an effect
        selected/unselected for Specified Effect mode.`;
    }
  },
  mounted() {
    this.$refs.input.select();
  },
  methods: {
    update() {
      this.currentSettings = JSON.parse(JSON.stringify(player.reality.glyphs.filter));
    },
    changedValue(oldVal, newVal, applyFn) {
      if (oldVal === newVal) return "（无变化）";
      return `${applyFn(oldVal)} ➜ ${applyFn(newVal)}`;
    },
    importFilter() {
      if (this.parsedSettings === null) return;
      this.emitClose();
      player.reality.glyphs.filter = this.parsedSettings;
    },
  },
  template: `
  <ModalWrapperChoice
    :show-cancel="!inputIsValid"
    :show-confirm="false"
  >
    <template #header>
      导入符文筛选设置
    </template>
    注意：除当前选择的模式外，导入的符文筛选设置将覆盖所有模式的设置。
    <input
      ref="input"
      v-model="input"
      type="text"
      class="c-modal-input c-modal-import__input"
      @keyup.enter="importSave"
      @keyup.esc="emitClose"
    >
    <div class="c-modal-import__save-info">
      <div v-if="!input" />
      <div v-else-if="inputIsValid">
        <b>选择模式：</b> {{ selectStr }}
        <br>
        <b>效果数量：</b> {{ basicCountStr }}
        <br>
        <b>不符合的符文：</b> {{ trashStr }}
        <br>
        <u><b>Type-specific Settings</b></u> <span :ach-tooltip="settingTooltipText">
          <i class="fas fa-question-circle" />
        </span>
        <br>
        <ImportFilterSingleType
          v-for="type in availableTypes"
          :key="type"
          class="c-single-type"
          :type="type"
          :curr-settings="currentSettings.types[type]"
          :new-settings="parsedSettings.types[type]"
          data-v-import-filter-modal
        />
      </div>
      <div v-else>
        导入的符文筛选无效
      </div>
    </div>

    <PrimaryButton
      v-if="inputIsValid"
      class="o-primary-btn--width-medium c-modal-message__okay-btn c-modal__confirm-btn"
      @click="importFilter"
    >
      导入
    </PrimaryButton>
  </ModalWrapperChoice>
  `
};
