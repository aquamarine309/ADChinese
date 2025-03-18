export default {
  name: 'AutomatorDocsIntroPage',
  template: `
<div>
  欢迎来到《反物质维度》自动脚本编辑器！
  <br>
  <br>
  本页面是一个介绍页面，为您提供了一个关于自动脚本编辑器功能的广泛概述。具体功能的详细信息可以在“如何游玩”或相关标签页中找到（如有）。
  <br>
  <br>
  <b>脚本语言：</b> 自动脚本编辑器使用一种自定义脚本语言来为您执行某些游戏操作。点击
  <div
    class="fas fa-list c-automator-button-icon"
    data-v-automator-docs-intro-page
  /> 以查看可用命令列表。您还可以在
  <div
    class="fas fa-book c-automator-button-icon"
    data-v-automator-docs-intro-page
  /> 页面上定义常量，作为各种值的简写名称。
  <br>
  <br>
  <b>布局：</b> 自动脚本编辑器本身分为两部分；左侧包含您的脚本以及用于启动、停止和重复执行的控制按钮，右侧包含自动脚本编辑器的信息。点击右上角的
  <div
    class="fas fa-expand-arrows-alt c-automator-button-icon"
    data-v-automator-docs-intro-page
  /> 可以将自动脚本编辑器扩展到整个浏览器页面，以便更轻松地进行编辑。
  <br>
  <br>
  <b>编辑器模式：</b> 您可以使用两种不同的编辑器来编写自动脚本——块编辑器（默认）和文本编辑器。您可以通过左侧右上角的开关在两种编辑器模式之间切换。请注意，存在错误的脚本可能无法在两种模式之间正确转换，这可能会导致部分脚本被删除。
  <br>
  <br>
  <b>创建脚本：</b> 您可以使用第二行按钮中的下拉菜单在多个脚本之间切换或创建新脚本。当前脚本可以通过
  <div
    class="fas fa-edit c-automator-button-icon"
    data-v-automator-docs-intro-page
  /> 和
  <div
    class="fas fa-trash c-automator-button-icon"
    data-v-automator-docs-intro-page
  /> 按钮进行重命名或删除。自动脚本编辑器始终包含至少一个脚本供您编辑；删除最后一个脚本将自动创建一个新的空白脚本。
  <br>
  <br>
  <b>编写脚本：</b> 在块编辑器中，脚本是通过进入块标签
  <div
    class="fas fa-cubes c-automator-button-icon"
    data-v-automator-docs-intro-page
  /> 创建的，而在文本编辑器中，脚本是通过在左侧的文本框中输入创建的。在任何编辑器模式下，您还可以使用模板生成器
  <div
    class="fas fa-file-code c-automator-button-icon"
    data-v-automator-docs-intro-page
  /> 中的一些预置脚本。您可以使用
  <div
    class="fas fa-arrow-rotate-left c-automator-button-icon"
    data-v-automator-docs-intro-page
  /> 或
  <div
    class="fas fa-arrow-rotate-right c-automator-button-icon"
    data-v-automator-docs-intro-page
  /> 或相应的快捷键来撤销或重做有限次数的编辑。切换、转换或删除脚本时，编辑历史将被清除。
  <br>
  <br>
  <b>调试：</b> 您有两个主要工具来修复脚本：错误日志
  <div
    class="fas fa-exclamation-triangle c-automator-button-icon"
    data-v-automator-docs-intro-page
  />（当您的脚本无法运行时使用）和事件日志
  <div
    class="fas fa-eye c-automator-button-icon"
    data-v-automator-docs-intro-page
  />（当脚本运行但未达到预期效果时使用）。
  <br>
  <br>
  <b>导入/导出：</b> 自动脚本可以通过
  <div
    class="fas fa-file-export c-automator-button-icon"
    data-v-automator-docs-intro-page
  /> 和
  <div
    class="fas fa-file-import c-automator-button-icon"
    data-v-automator-docs-intro-page
  /> 按钮以文本格式导出和导入。如果需要，您还可以访问其他扩展导出选项
  <div
    class="fas fa-window-restore c-automator-button-icon"
    data-v-automator-docs-intro-page
  />。
  <br>
  <br>
  <b>脚本保存：</b> 脚本更改不会在所有条件下立即保存到您的计算机；有关更多详细信息，请查看自动脚本编辑器的“如何游玩”条目。此外，为了减少延迟，自动脚本面板上方显示了两个字符限制。
</div>
  `,
}
