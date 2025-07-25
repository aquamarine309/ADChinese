import { blockifyTextAutomator } from "../../core/automator/index.js";
import ModalWrapper from "./ModalWrapper.js";

export default {
  name: "AutomatorScriptTemplate",
  components: {
    ModalWrapper,
  },
  props: {
    warnings: {
      type: Function,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    inputs: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      templateInputs: {},
      buttonTextStrings: [],
      invalidInputCount: 0,
      templateProps: null,
      currentPreset: "",
      isBlock: false,
    };
  },
  computed: {
    presets: () => player.timestudy.presets,
    params: () => GameDatabase.reality.automator.templates.paramTypes,
    validWarnings() {
      return this.invalidInputCount === 0
        ? this.warnings().concat(this.templateScript?.warnings)
        : this.warnings();
    },
    templateScript() {
      if (this.invalidInputCount !== 0) return null;
      return new ScriptTemplate(this.templateProps, this.name);
    }
  },
  // Many props in this component are generated dynamically from a GameDB entry, but Vue can only give reactive
  // behavior to props that exist on declaration. We need all the dynamically generated inputs to be reactive, so we
  // specifically $set them here on initialization; additionally we give them a default value so that later function
  // calls don't error out from undefined inputs.
  created() {
    for (const input of this.inputs) {
      const boolProp = this.paramTypeObject(input.type).boolDisplay;
      if (boolProp) {
        this.$set(this.templateInputs, input.name, false);
        this.buttonTextStrings[input.name] = boolProp[1];
      } else {
        this.$set(this.templateInputs, input.name, "");
        this.invalidInputCount++;
      }
    }
  },
  methods: {
    update() {
      this.isBlock = player.reality.automator.type === AUTOMATOR_TYPE.BLOCK;
    },
    paramTypeObject(name) {
      return this.params.find(p => p.name === name);
    },
    isValid(input) {
      const typeObject = this.paramTypeObject(input.type);
      return typeObject.isValidString ? typeObject.isValidString(this.templateInputs[input.name]) : true;
    },
    validityClass(input) {
      if (input.name === "treeStudies" && this.currentPreset !== "") {
        return "c-automator-template-textbox--preset";
      }
      return this.isValid(input)
        ? undefined
        : "c-automator-template-textbox--invalid";
    },
    loadPreset(name, id) {
      this.templateInputs.treeStudies = name ? `NAME ${name}` : `ID ${id}`;
      this.updateTemplateProps();
    },
    loadCurrent() {
      this.templateInputs.treeStudies = GameCache.currentStudyTree.value.exportString;
      this.updateTemplateProps();
    },
    updateTemplateProps() {
      this.templateProps = {};
      this.invalidInputCount = 0;
      for (const input of this.inputs) {
        const typeObj = this.paramTypeObject(input.type);
        const mapFn = x => (typeObj.map ? typeObj.map(x) : x);
        this.templateProps[input.name] = mapFn(this.templateInputs[input.name]);
        if (!this.isValid(input)) this.invalidInputCount++;
      }

      // We treat treeStudies as a special prop which will set treePreset if it matches the format "NAME [name]"
      const nameMatch = this.templateProps.treeStudies.match(/^NAME (.{1,4})$/u);
      const idMatch = this.templateProps.treeStudies.match(/^ID (\d)$/u);

      if (nameMatch) {
        const nameStr = nameMatch ? nameMatch[1] : "";
        this.currentPreset = this.presets.find(x => x.name === nameStr).name;
      } else if (idMatch) {
        const idStr = idMatch ? idMatch[1] : "";
        this.currentPreset = this.presets.some((x, y) => y === idStr - 1) ? idStr : "";
      }

      this.templateProps.treePreset = this.currentPreset === "" ? null : this.currentPreset;
    },
    updateButton(input) {
      this.templateInputs[input.name] = !this.templateInputs[input.name];
      const boolProp = this.paramTypeObject(input.type).boolDisplay;
      this.buttonTextStrings[input.name] = boolProp[this.templateInputs[input.name] ? 0 : 1];
      this.updateTemplateProps();
    },
    copyAndClose() {
      if (this.isBlock) {
        const newTemplateBlock = {
          name: `模板：${this.name}`,
          blocks: blockifyTextAutomator(this.templateScript.script).blocks
        };
        AutomatorData.blockTemplates.push(newTemplateBlock);
        GameUI.notify.info("已创建模板");
      } else {
        copyToClipboard(this.templateScript.script);
        GameUI.notify.info("已将模板复制到剪贴板");
      }
      this.emitClose();
    }
  },
  template: `
  <ModalWrapper class="c-automator-template-container">
    <template #header>
      {{ name }} 模板
    </template>
    <div class="c-automator-template-description">
      {{ description }}
    </div>
    <div class="c-automator-template-inputs">
      <b>所需信息：</b>
      <br>
      使用研究树预设：
      <button
        v-for="(preset, presetNumber) in presets"
        :key="preset.name"
        class="o-primary-btn o-load-preset-button-margin"
        data-v-automator-script-template
        @click="loadPreset(preset.name, presetNumber + 1)"
      >
        {{ preset.name ? preset.name : presetNumber + 1 }}
      </button>
      <button
        class="o-primary-btn o-load-preset-button-margin"
        @click="loadCurrent"
        data-v-automator-script-template
      >
        <i>当前研究树</i>
      </button>
      <div
        v-for="input in inputs"
        :key="input.name"
        class="c-automator-template-entry"
      >
        {{ input.prompt }}:
        <span v-if="paramTypeObject(input.type).boolDisplay">
          <button
            class="o-primary-btn"
            @click="updateButton(input)"
          >
            {{ buttonTextStrings[input.name] }}
          </button>
        </span>
        <span v-else>
          <input
            ref="templateInputs[input.name]"
            v-model="templateInputs[input.name]"
            type="text"
            class="c-automator-template-textbox"
            :class="validityClass(input)"
            @input="updateTemplateProps"
            data-v-automator-script-template
          >
        </span>
      </div>
    </div>
    <div class="c-automator-template-warnings">
      <b>Possible things to consider:</b>
      <div v-if="validWarnings.length !== 0">
        <div
          v-for="warning in validWarnings"
          :key="warning"
          class="c-automator-template-entry"
        >
          {{ warning }}
        </div>
      </div>
      <div v-else>
        （模板出现的错误会在这里显示）
      </div>
      <br>
      <br>
    </div>
    <button
      v-if="invalidInputCount === 0"
      class="o-primary-btn"
      @click="copyAndClose"
    >
      {{ isBlock ? "创建模板" : "复制模板到剪贴板" }}并关闭此弹窗
    </button>
    <button
      v-else
      class="o-primary-btn o-primary-btn--disabled"
    >
      不可创建模板（有 {{ formatInt(invalidInputCount) }} 个错误的输入）
    </button>
  </ModalWrapper>
  `
};