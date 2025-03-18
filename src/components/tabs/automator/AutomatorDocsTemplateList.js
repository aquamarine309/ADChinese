export default {
  name: 'AutomatorDocsTemplateList',
  data() {
    return {
      isBlock: false,
      blockTemplates: [],
      selectedTemplateID: -1,
    }
  },
  computed: {
    templates: () => GameDatabase.reality.automator.templates.scripts,
    pasteText() {
      return this.isBlock ? `创建一个特殊区块，您可以将其拖入自动机中您希望放置的位置。然后它会自动填充模板所需的所有单独区块` : `将模板文本复制到剪贴板。您可以直接将模板文本粘贴到自动机中的任意位置`
    },
  },
  methods: {
    update() {
      this.isBlock = player.reality.automator.type === AUTOMATOR_TYPE.BLOCK
      this.blockTemplates = AutomatorData.blockTemplates
    },
    showModal(template) {
      Modal.automatorScriptTemplate.show(template)
    },
    unpackTemplateBlocks(event) {
      const templateBlocks = this.blockTemplates[this.selectedTemplateID].blocks
      const beforeBlocks = BlockAutomator.lines.slice(0, event.newIndex)
      // Note that slice will also pick up the Vue observer, so we need to remove that as well
      const afterBlocks = BlockAutomator.lines.slice(event.newIndex).filter((b) => b.cmd)

      // Remap IDs, in case the template gets added more than once
      const maxExistingID = Math.max(...BlockAutomator._idArray.filter((id) => id))
      const minTemplateID = Math.min(...templateBlocks.map((b) => b.id))
      const blocksToAdd = []
      for (const block of templateBlocks) {
        blocksToAdd.push({
          ...block,
          id: block.id + maxExistingID - minTemplateID + 1,
        })
      }
      BlockAutomator.lines = beforeBlocks
      BlockAutomator.lines.push(...blocksToAdd)
      BlockAutomator.lines.push(...afterBlocks)
      BlockAutomator.updateIdArray()
    },
    setIndex(index) {
      this.selectedTemplateID = index
    },
  },
  template: `
<div>
  这些模板可以让您在自动脚本编辑器中执行一些更常见的操作。它们可能比手动编写的脚本稍慢，但不需要您有任何编程经验即可使用。点击以下任意按钮将打开一个带有输入字段的提示框，生成一个可以放入自动脚本的模板。
  <button
    v-for="template in templates"
    :key="template.name"
    class="o-primary-btn c-automator-docs-template--button l-automator__button"
    @click="showModal(template)"
    data-v-automator-docs-template-list
  >
    模板：{{ template.name }}
  </button>
  由于您当前处于 {{ isBlock ? "块" : "文本" }} 编辑器中，此面板将 {{ pasteText }}。
  <br>
  <br>
  <draggable
    v-if="isBlock"
    :key="blockTemplates.length"
    class="template-container"
    :list="blockTemplates"
    :group="{ name: 'code-blocks', pull: 'clone', put: false }"
    :sort="false"
    @end="unpackTemplateBlocks"
    data-v-automator-docs-template-list
  >
    <div
      v-for="(template, i) in blockTemplates"
      :key="i"
      class="o-automator-command o-automator-block-list draggable-blocks"
      @dragstart="setIndex(i)"
      data-v-automator-docs-template-list
    >
      {{ template.name }}
    </div>
  </draggable>
</div>
  `,
}
