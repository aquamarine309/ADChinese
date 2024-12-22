export default {
  name: "StudyTreeInfo",
  props: {
    headerText: {
      type: String,
      required: true,
    },
    treeStatus: {
      type: Object,
      required: true,
    },
  },
  template: `
  <div
    class="c-tree-info"
    data-v-study-tree-info
  >
    <span
      class="l-tree-info-header"
      v-html="headerText"
      data-v-study-tree-info
    />
    <div
      v-if="treeStatus.firstPaths"
      class="l-modal-import-tree__tree-info-line"
    >
      维度路径：{{ treeStatus.firstPaths }}
    </div>
    <div
      v-if="treeStatus.secondPaths"
      class="l-modal-import-tree__tree-info-line"
    >
      游玩风格路径：{{ treeStatus.secondPaths }}
    </div>
    <div
      v-if="treeStatus.ec > 0"
      class="l-modal-import-tree__tree-info-line"
    >
      永恒挑战：{{ treeStatus.ec }} {{ treeStatus.startEC ? "（自动开始）" : "" }}
    </div>
  </div>
  `
};