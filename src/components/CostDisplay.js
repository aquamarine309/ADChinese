import { isDecimal, isFunction, isNumber } from "../utility/index.js";

/* eslint-disable no-empty-function */
export default {
  name: "CostDisplay",
  props: {
    config: {
      type: Object,
      required: false,
      default: undefined
    },
    br: {
      type: Boolean,
      required: false
    },
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: "价格：",
      required: false
    }
  },
  data() {
    return {
      isVisible: false,
      cost: 0
    };
  },
  watch: {
    config: {
      immediate: true,
      handler(config) {
        this.updateFunction = () => { };
        const cost = config?.cost;
        this.isVisible = cost !== undefined;
        if (!this.isVisible) return;
        this.formatCost = config.formatCost ?? format;

        if (isNumber(cost)) {
          this.cost = cost;
          return;
        }

        if (isDecimal(cost)) {
          this.cost = Decimal.fromDecimal(cost);
          return;
        }

        if (!isFunction(cost)) {
          throw new Error(`CostDisplay config.cost has unsupported type "${typeof cost}"`);
        }

        const value = cost();

        if (isNumber(value)) {
          this.cost = value;
          this.updateFunction = () => this.cost = cost();
          return;
        }

        if (isDecimal(value)) {
          this.cost = Decimal.fromDecimal(value);
          this.updateFunction = () => this.cost.copyFrom(cost());
          return;
        }

        throw new Error(`CostDisplay config.cost is a function which returns` +
          ` unsupported type "${typeof value}"`);
      }
    }
  },
  beforeCreate() {
    this.updateFunction = () => { };
  },
  methods: {
    update() {
      this.updateFunction();
    }
  },
  template: `
  <span v-if="isVisible">
    <br v-if="br">
    {{ label }} {{ formatCost(cost) }} {{ name }}
  </span>
  `
};