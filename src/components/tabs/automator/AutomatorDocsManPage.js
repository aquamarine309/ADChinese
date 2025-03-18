export default {
  name: 'AutomatorDocsManPage',
  props: {
    command: {
      type: Object,
      required: true,
    },
  },
  computed: {
    description() {
      const desc = this.command.description
      return typeof desc === 'function' ? desc() : desc
    },
  },
  template: `
  <div class="c-automator-docs-page">
    <b>名称</b>
    <div
      class="c-automator-docs-page__indented"
      v-html="command.keyword"
    />
    <b>语法</b>
    <div
      class="c-automator-docs-page__indented"
      v-html="command.syntax"
    />
    <template v-if="command.description">
      <b>描述</b>
      <div
        class="c-automator-docs-page__indented"
        v-html="description"
      />
    </template>
    <template v-for="section in command.sections">
      <b :key="section.name">{{ section.name }}</b>
      <template v-for="item in section.items">
        <div
          :key="item.header"
          class="c-automator-docs-page__indented"
        >
          <div v-html="item.header" />
          <div
            class="c-automator-docs-page__indented"
            v-html="item.description"
          />
        </div>
      </template>
    </template>
    <template v-if="command.examples">
      <b>示例</b>
      <div
        v-for="example in command.examples"
        :key="example"
        class="c-automator-docs-page__indented"
        v-html="example"
      />
    </template>
  </div>
  `,
}
