import ModalWrapperChoice from "./ModalWrapperChoice.js";
import PrimaryButton from "../PrimaryButton.js";
import StudyStringLine from "./StudyStringLine.js";

import StudyStringPreview from "./time-study-modal-preview/StudyStringPreview.js";
import StudyTreeInfo from "./StudyTreeInfo.js";

let savedImportString = "";

export default {
  name: "StudyStringModal",
  components: {
    ModalWrapperChoice,
    StudyStringLine,
    PrimaryButton,
    StudyStringPreview,
    StudyTreeInfo
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    deleting: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  data() {
    return {
      input: "",
      name: "",
      respecAndLoad: false,
      canEternity: false
    };
  },
  computed: {
    // This modal is used by both study importing and preset editing, but is given an id of -1 when importing
    isImporting() {
      return this.id === -1;
    },
    // This represents the state reached from importing into an empty tree
    importedTree() {
      if (!this.inputIsValidTree) return {};
      const importedTree = new TimeStudyTree(this.truncatedInput);
      const newStudiesArray = importedTree.purchasedStudies.map(s => this.studyString(s));
      return {
        timeTheorems: importedTree.spentTheorems[0],
        spaceTheorems: importedTree.spentTheorems[1],
        newStudies: makeEnumeration(newStudiesArray),
        newStudiesArray,
        invalidStudies: importedTree.invalidStudies,
        firstPaths: makeEnumeration(importedTree.dimensionPaths),
        secondPaths: makeEnumeration(importedTree.pacePaths),
        ec: importedTree.ec,
        startEC: importedTree.startEC,
        hasInfo: makeEnumeration(importedTree.dimensionPaths) || importedTree.ec > 0,
      };
    },
    // This is only shown when importing; when modifying a preset we assume that generally the current state of the
    // tree is irrelevant because if it mattered then the player would simply import instead
    combinedTree() {
      if (!this.inputIsValidTree) return {};
      const currentStudyTree = GameCache.currentStudyTree.value;
      const combinedTree = this.combinedTreeObject;
      const newStudiesArray = combinedTree.purchasedStudies
        .filter(s => !currentStudyTree.purchasedStudies.includes(s)).map(s => this.studyString(s));
      // To start an EC using the ! functionality, we want to make sure all the following are true:
      // - The imported string needs to end with "!" (this is parsed out in time-study-tree.js and stored into the
      //   canStart prop for tree objects)
      // - We can unlock the EC in the string. This requires either no EC currently unlocked, or we coincidentally
      //   already have it unlocked
      // - The ECs in the tree object and the import string MUST match; the only EC we want to try to enter is the
      //   one which is being imported, and the tree object will contain a different EC if we already have one
      const stringEC = TimeStudyTree.getECFromString(this.truncatedInput);
      const hasExclamationPoint = combinedTree.startEC;
      const canUnlockEC = [0, stringEC].includes(player.challenge.eternity.current);
      const hasECMismatch = combinedTree.ec !== stringEC;
      return {
        timeTheorems: combinedTree.spentTheorems[0] - currentStudyTree.spentTheorems[0],
        spaceTheorems: combinedTree.spentTheorems[1] - currentStudyTree.spentTheorems[1],
        newStudies: makeEnumeration(newStudiesArray),
        newStudiesArray,
        firstPaths: makeEnumeration(combinedTree.dimensionPaths),
        secondPaths: makeEnumeration(combinedTree.pacePaths),
        ec: combinedTree.ec,
        startEC: hasExclamationPoint && canUnlockEC && !hasECMismatch,
        hasInfo: makeEnumeration(combinedTree.dimensionPaths) || combinedTree.ec > 0,
      };
    },
    combinedTreeObject() {
      const combinedTree = new TimeStudyTree();
      combinedTree.attemptBuyArray(TimeStudyTree.currentStudies, false);
      combinedTree.attemptBuyArray(combinedTree.parseStudyImport(this.truncatedInput), true);
      return combinedTree;
    },
    modalTitle() {
      if (this.deleting) return `删除时间研究预设“${this.name}”`;
      return this.isImporting ? "导入时间研究树" : `编辑时间研究预设“${this.name}”`;
    },
    invalidMessage() {
      if (!this.inputIsValidTree || this.importedTree.invalidStudies.length === 0) return null;
      // Pad the input with non-digits which we remove later in order to not cause erroneous extra matches within IDs
      // and limit the string length to stop excessive UI stretch
      let coloredString = `#${this.truncatedInput}#`;
      if (coloredString.length > 300) coloredString = `${coloredString.slice(0, 297)}...`;

      for (const study of this.importedTree.invalidStudies) {
        const id = `${study}`.match(/(EC)?(\d+)/u);
        const num = parseInt(id[2], 10);
        switch (id[1]) {
          case "EC":
            coloredString = coloredString.replaceAll(new RegExp(`\\|(${num})`, "gu"),
              `|<span style="color: var(--color-bad);">$1</span>`);
            break;
          default:
            coloredString = coloredString.replaceAll(new RegExp(`(\\D)(${num})(\\D)`, "gu"),
              `$1<span style="color: var(--color-bad);">$2</span>$3`);
            break;
        }
      }
      return `无效的时间研究 ID：${coloredString.replaceAll("#", "").replaceAll(",", ", ")}
        <br><br>`;
    },
    truncatedInput() {
      return TimeStudyTree.truncateInput(this.input);
    },
    hasInput() {
      return this.truncatedInput !== "";
    },
    inputIsValid() {
      return this.inputIsValidTree || this.inputIsSecret;
    },
    inputIsValidTree() {
      return TimeStudyTree.isValidImportString(this.truncatedInput);
    },
    inputIsSecret() {
      // Turning text into hash is troublesome.
      // And nobody cares whatever I uses hash.
      // - ADChinese Developer
      return this.input === "时间研究树";
    },
    confirmText() {
      if (this.deleting) return "删除";
      return this.isImporting ? "导入" : "保存";
    }
  },
  watch: {
    input(newInput) {
      savedImportString = newInput;
    }
  },
  // Needs to be assigned in created() or else they will end up being undefined when importing
  created() {
    const preset = player.timestudy.presets[this.id];
    this.input = preset ? preset.studies : savedImportString;
    this.name = preset ? preset.name : "";
  },
  mounted() {
    this.$refs.input.select();
  },
  methods: {
    update() {
      this.canEternity = Player.canEternity;
    },
    confirm() {
      if (this.deleting) {
        this.deletePreset();
      } else if (this.isImporting) {
        if (this.respecAndLoad && Player.canEternity) {
          player.respec = true;
          const tree = new TimeStudyTree(this.truncatedInput);
          animateAndEternity(() => TimeStudyTree.commitToGameState(tree.purchasedStudies, false, tree.startEC));
          return;
        }
        this.importTree();
      } else {
        this.savePreset();
      }
    },
    convertInputShorthands() {
      this.input = TimeStudyTree.formatStudyList(this.input);
    },
    importTree() {
      if (!this.inputIsValid) return;
      if (this.inputIsSecret) SecretAchievement(37).unlock();
      savedImportString = "";
      this.emitClose();
      // We need to use a combined tree for committing to the game state, or else it won't buy studies in the imported
      // tree are only reachable if the current tree is already bought
      TimeStudyTree.commitToGameState(this.combinedTreeObject.purchasedStudies, false, this.combinedTree.startEC);
    },
    savePreset() {
      if (this.inputIsValid) {
        player.timestudy.presets[this.id].studies = this.input;
        GameUI.notify.eternity(`研究树 ${this.name} 已成功导出`);
        this.emitClose();
      }
    },
    deletePreset() {
      const name = player.timestudy.presets[this.id].name;
      const presetName = name ? `时间研究预设“${name}”` : "时间研究预设";
      player.timestudy.presets[this.id].studies = "";
      player.timestudy.presets[this.id].name = "";
      GameUI.notify.eternity(`${presetName} 已从槽位 ${this.id + 1} 中删除`);
    },
    studyString(study) {
      return study instanceof ECTimeStudyState ? `EC${study.id}` : `${study.id}`;
    }
  },
  template: `
  <ModalWrapperChoice
    :show-cancel="!inputIsValid"
    :show-confirm="inputIsValid"
    class="c-modal-import-tree"
    @confirm="confirm"
    data-v-study-string-modal
  >
    <template #header>
      {{ modalTitle }}
    </template>
    <input
      ref="input"
      v-model="input"
      type="text"
      maxlength="1500"
      class="c-modal-input c-modal-import-tree__input"
      :class="{ 'l-delete-input' : deleting }"
      :disabled="deleting"
      @keyup.enter="confirm"
      @keyup.esc="emitClose"
      data-v-study-string-modal
    >
    <div
      class="c-two-column"
      data-v-study-string-modal
    >
      <div
        class="c-study-info l-modal-import-tree__tree-info"
        data-v-study-string-modal
      >
        <div v-if="inputIsSecret">
          ???
        </div>
        <template v-else-if="inputIsValidTree">
          <div
            v-if="invalidMessage"
            class="l-modal-import-tree__tree-info-line"
            v-html="invalidMessage"
            data-v-study-string-modal
          />
          <StudyStringLine
            v-if="isImporting"
            :tree="combinedTree"
            :into-empty="false"
          />
          <StudyStringLine
            :tree="importedTree"
            :into-empty="true"
          />
          <StudyTreeInfo
            v-if="deleting && importedTree.hasInfo"
            header-text="Study Preset contains:"
            :tree-status="importedTree"
          />
          <StudyTreeInfo
            v-if="!deleting && !isImporting && importedTree.hasInfo"
            header-text="加载后状态（<b>无时间研究</b>）："
            :tree-status="importedTree"
          />
          <StudyTreeInfo
            v-if="!deleting && combinedTree.hasInfo"
            header-text="加载后状态（<b>当前时间研究</b>）："
            :tree-status="combinedTree"
          />
        </template>
        <div v-if="!deleting && !inputIsValidTree && hasInput">
          无效的时间研究树
        </div>
      </div>
      <div
        class="c-study-preview"
        data-v-study-string-modal
      >
        <StudyStringPreview
          :show-preview="inputIsValidTree"
          :new-studies="!isImporting || (canEternity && respecAndLoad) ? importedTree.newStudiesArray
            : combinedTree.newStudiesArray"
          :disregard-current-studies="!isImporting || (canEternity && respecAndLoad)"
        />
      </div>
    </div>
    <div v-if="!isImporting && inputIsValidTree">
      <br>
      <PrimaryButton
        v-if="!deleting"
        v-tooltip="'此操作将格式化研究预设文本，例如：将 \\'a,b,c|d\\' 转换为 \\'a, b, c | d\\'。'"
        @click="convertInputShorthands"
      >
        格式化预设文本
      </PrimaryButton>
    </div>
    <span v-if="isImporting">
      <br>
      <div
        v-tooltip="canEternity ? '' : '你当前无法进行永恒，因此将仅执行常规加载。'"
        class="c-modal__confirmation-toggle"
        @click="respecAndLoad = !respecAndLoad"
        data-v-study-string-modal
      >
        <div
          :class="{
            'c-modal__confirmation-toggle__checkbox': true,
            'c-modal__confirmation-toggle__checkbox--active': respecAndLoad,
          }"
          data-v-study-string-modal
        >
          <span
            v-if="respecAndLoad"
            class="fas fa-check"
          />
        </div>
        <span
          class="c-modal__confirmation-toggle__text"
          data-v-study-string-modal
        >
          同时重置时间研究树并永恒
          <span
            v-if="!canEternity"
            class="c-modal__confirmation-toggle__warning"
            data-v-study-string-modal
          >
            !
          </span>
        </span>
      </div>
    </span>
    <template #confirm-text>
      {{ confirmText }}
    </template>
  </ModalWrapperChoice>
  `
};