export default {
  name: "CatchupEntry",
  props: {
    info: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      focusedResourceId: -1,
      tabToOpen: String,
    };
  },
  computed: {
    config() {
      return this.info.config;
    },
    hasDedicatedH2p() {
      return this.config.openH2pEntry !== undefined;
    },
  },
  methods: {
    isFocusedResource(info) {
      this.focusedResourceId = info.id;
      if (this.focusedResourceId === -1) return true;
      const focusedResourceName = GameDatabase.catchupResources[this.focusedResourceId].name;
      if (focusedResourceName !== info.name) return true;
      return this.tabToOpen = focusedResourceName;
    },
    showHowTo() {
      ui.view.h2pForcedTab = GameDatabase.h2p.tabs.filter(
        tab => tab.alias === (this.hasDedicatedH2p ? this.config.openH2pEntry : this.tabToOpen))[0];
      Modal.h2p.show();
    },
  },
  template: `
  <div
    class="c-modal-catchup-entry"
    data-v-catchup-entry
  >
    <span
      class="c-resource-name"
      :info="info"
      :is-focused="isFocusedResource(info)"
      @click="showHowTo"
      data-v-catchup-entry
    >
      <span
        class="c-underline"
        data-v-catchup-entry
      >{{ info.name }}</span>: <i class="fas fa-question-circle" />
    </span> {{ info.description }}
  </div>
  `
};