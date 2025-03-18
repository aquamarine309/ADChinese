import AutomatorDataTransferSingleEntry from './AutomatorDataTransferSingleEntry.js'

export default {
  name: 'AutomatorDataTransferPage',
  components: {
    AutomatorDataTransferSingleEntry,
  },
  data() {
    return {
      scripts: 0,
    }
  },
  computed: {
    maxScriptCount: () => AutomatorData.MAX_ALLOWED_SCRIPT_COUNT,
  },
  created() {
    this.loadScripts()
    this.on$(GAME_EVENT.AUTOMATOR_SAVE_CHANGED, () => {
      this.loadScripts()
    })
  },
  methods: {
    loadScripts() {
      this.scripts = Object.values(player.reality.automator.scripts).map((script) => ({
        id: script.id,
        name: script.name,
      }))
    },
  },
  template: `
<div
  class="l-panel-padding"
  data-v-automator-data-transfer-page
>
  此页面允许您导入和导出带有附加数据的脚本；编码文本还将包括脚本中使用的任何时间研究预设或常量的数据。这将使您更容易在不同存档文件之间传输可用的脚本，但由于研究预设和常量的空间有限，您可能需要在过程中覆盖现有数据。从此页面导出的数据也将以与导入单个脚本数据相同的方式导入。
  <br>
  <br>
  注意：在注释中提到的常量名称或完整的研究购买命令也将被视为脚本中“使用”的内容。这是有意为之，因为注释被假定为指示脚本本身尝试使用预设或常量执行的操作。
  <br>
  <br>
  <div
    v-for="(script, id) in scripts"
    :key="id"
  >
    <AutomatorDataTransferSingleEntry
      class="l-entry-margin"
      :script="script"
      data-v-automator-data-transfer-page
    />
  </div>
</div>
  `,
}
