import AutobuyerIntervalLabel from "./AutobuyerIntervalLabel.js";
import AutobuyerModeButton from "./AutobuyerModeButton.js";
import AutobuyerSingleToggleLabel from "./AutobuyerSingleToggleLabel.js";

// This component contains individual autobuyers within groups of related autobuyers (eg. an individual AD autobuyer
// within the all-ADs-in-a-row layout)
export default {
  name: "SingleAutobuyerInRow",
  components: {
    AutobuyerSingleToggleLabel,
    AutobuyerIntervalLabel,
    AutobuyerModeButton
  },
  props: {
    autobuyer: {
      type: Object,
      required: true
    },
    showIndividual: Boolean,
    parentDisabled: Boolean,
  },
  data() {
    return {
      isVisible: false,
    };
  },
  computed: {
    name() {
      return this.autobuyer.name;
    },
    hasMode() {
      return this.autobuyer.mode !== undefined;
    },
  },
  methods: {
    update() {
      const buyer = this.autobuyer;
      this.isVisible = buyer.isUnlocked || buyer.isBought;
    },
  },
  template: `
  <span
    v-if="isVisible"
    class="c-autobuyer-box-slot"
  >
    <AutobuyerSingleToggleLabel
      :autobuyer="autobuyer"
      :parent-disabled="parentDisabled"
    />
    {{ name }}
    <AutobuyerIntervalLabel
      v-if="showIndividual"
      :autobuyer="autobuyer"
    />
    <AutobuyerModeButton
      v-if="hasMode"
      :autobuyer="autobuyer"
    />
  </span>
  `
};