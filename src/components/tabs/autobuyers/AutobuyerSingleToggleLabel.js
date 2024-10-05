import AutobuyerToggleLabel from "./AutobuyerToggleLabel.js";

export default {
  name: "AutobuyerSingleToggleLabel",
  components: {
    AutobuyerToggleLabel
  },
  props: {
    autobuyer: {
      type: Object,
      required: true
    },
    parentDisabled: Boolean,
  },
  data() {
    return {
      isActive: false,
      isDisabled: false,
    };
  },
  computed: {
    name() {
      return this.autobuyer.name;
    },
  },
  methods: {
    update() {
      this.isActive = this.autobuyer.isActive;
      this.isDisabled = !player.auto.autobuyersOn || this.parentDisabled;
    },
    toggle() {
      this.autobuyer.toggle();
    },
  },
  template: `
  <AutobuyerToggleLabel
    :is-active="isActive"
    :is-disabled="isDisabled"
    :name="name"
    @click="toggle"
  />
  `
};