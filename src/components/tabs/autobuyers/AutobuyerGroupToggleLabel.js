import AutobuyerToggleLabel from "./AutobuyerToggleLabel.js";

export default {
  name: "AutobuyerGroupToggleLabel",
  components: {
    AutobuyerToggleLabel
  },
  props: {
    isActive: Boolean,
    name: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      isDisabled: false,
    };
  },
  methods: {
    update() {
      this.isDisabled = !player.auto.autobuyersOn;
    },
  },
  template: `
  <AutobuyerToggleLabel
    :is-active="isActive"
    :is-disabled="isDisabled"
    :name="name"
    @click="emitClick"
  />
  `
};