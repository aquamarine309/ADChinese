import AutomatorDocsManPage from './AutomatorDocsManPage.js'

export default {
  name: 'AutomatorDocsCommandList',
  components: {
    AutomatorDocsManPage,
  },
  data() {
    return {
      selectedCommand: -1,
    }
  },
  computed: {
    categoryNames: () => GameDatabase.reality.automator.categoryNames,
    commands: () => GameDatabase.reality.automator.commands,
  },
  methods: {
    commandsInCategory(category) {
      return this.commands.filter((c) => c.category === category && c.isUnlocked())
    },
  },
  template: `
<div>
  <div v-if="selectedCommand !== -1">
    <button
      class="c-automator-docs--button l-return-button fas fa-arrow-left"
      @click="selectedCommand = -1"
      data-v-automator-docs-command-list
    />
    返回命令列表
  </div>
  <AutomatorDocsManPage
    v-if="selectedCommand !== -1"
    :command="commands[selectedCommand]"
    data-v-automator-docs-command-list
  />
  <div
    v-else
    class="c-automator-docs-page"
    data-v-automator-docs-command-list
  >
    点击带下划线的命令以查看有关语法、用法和功能的更多详细信息。
    <br>
    <br>
    <span>命令列表：</span>
    <br>
    <div
      v-for="(category, i) in categoryNames"
      :key="i"
    >
      {{ category }} ({{ commandsInCategory(i).length }} 个命令)
      <div
        v-for="command in commandsInCategory(i)"
        :key="command.id"
        class="c-automator-docs-page__link l-command-group"
        @click="selectedCommand = command.id"
        data-v-automator-docs-command-list
      >
        <span v-if="command.isUnlocked()">
          {{ command.keyword }}
        </span>
      </div>
    </div>
    <br>
    <span>
      注意：在每个命令的 SYNTAX 说明中，<u>带下划线</u>的输入是<i>必填</i>的，而[方括号]中的输入是可选的（如果使用，应输入<i>不带</i>方括号的内容）。
      其他部分应按原样输入。除非另有说明，所有输入都不区分大小写。某些命令可能有多种有效格式，将显示在不同的行中。
    </span>
  </div>
</div>
  `,
}
