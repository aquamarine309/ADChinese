export default {
  name: "HiddenSubtabsButton",
  props: {
    subtab: {
      type: Object,
      required: true
    },
    tab: {
      type: Object,
      required: true
    },
    changeEnabled: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      hidable: false,
      hidden: false,
    };
  },
  computed: {
    isCurrentSubtab() {
      return this.tab.id === Tabs.current.id &&
        this.subtab.id === Tabs.current._currentSubtab.id;
    },
    classObject() {
      return {
        "c-hide-modal-tab-button": true,
        "c-hide-modal-button--active": !this.hidden,
        "c-hide-modal-button--inactive": this.hidden,
        "c-hide-modal-button--always-visible": !this.hidable || this.isCurrentSubtab,
        [`c-hide-modal-tab-button--${this.tab.key}`]: !this.isCurrentSubtab,
      };
    },
    isModernUI() {
      return this.$viewModel.newUI;
    },
  },
  methods: {
    update() {
      this.hidable = this.subtab.hidable;
      this.hidden = this.subtab.isHidden && this.hidable;
    },
    toggleVisibility() {
      if (!this.changeEnabled) return;
      this.subtab.toggleVisibility();
    },
  },
  template: `
  <div
    v-tooltip="hidable ? isCurrentSubtab ? 'You cannot hide the tab you are on' : '' : 'Options tabs cannot be hidden'"
    :class="classObject"
    @click="toggleVisibility"
    data-v-hidden-subtabs-button
  >
    <div
      class="l-hide-modal-button"
      data-v-hidden-subtabs-button
    >
      <div
        v-if="isModernUI"
        class="l-hide-modal-button__subtab-icon"
        v-html="subtab.symbol"
        data-v-hidden-subtabs-button
      />
      <div
        class="l-hide-modal-button__subtab-name"
        data-v-hidden-subtabs-button
      >
        {{ subtab.name }}
      </div>
    </div>
  </div>
  `
};