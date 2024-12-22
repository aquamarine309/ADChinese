export default {
  name: "ClassicTabButton",
  props: {
    tab: {
      type: Object,
      required: true
    },
    tabPosition: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isAvailable: false,
      hasNotification: false
    };
  },
  computed: {
    isCurrentTab() {
      return this.tab.isOpen && Theme.currentName() !== "S9";
    },
    tabName() {
      return this.tab.name;
    }
  },
  methods: {
    update() {
      this.isAvailable = this.tab.isAvailable;
      this.hasNotification = this.tab.hasNotification;
    }
  },
  template: `
  <button
    v-if="isAvailable"
    :class="
      [tab.config.UIClass,
       { 'o-tab-btn--active': isCurrentTab }]
    "
    class="o-tab-btn"
    @click="tab.show(true)"
    data-v-classic-tab-button
  >
    {{ tabName }}
    <div
      v-if="hasNotification"
      class="fas fa-circle-exclamation l-notification-icon"
    />
  </button>
  `
};