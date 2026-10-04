export default {
  name: "ShowFormulaButton",
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  methods: {
    showFormula() {
      Modal.formulaGraph.show({ config: this.config });
    }
  },
  template: `
    <i
      v-if="config.formula"
      class="fas fa-question o-show-formula-button"
      @click="showFormula"
    />
  `
};