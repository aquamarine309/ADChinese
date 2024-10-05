export default {
  name: "ClassicSubtabButton",
  props: {
    subtab: {
      type: Object,
      required: true
    },
    parentName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isAvailable: false,
      hasNotification: false,
      isCurrentSubtab: false,
      tabName: ""
    };
  },
  computed: {
    classObject() {
      return {
        "o-tab-btn": true,
        "o-tab-btn--secondary": true,
        "o-subtab-btn--active": this.isCurrentSubtab,
        "o-tab-btn--infinity": this.parentName === "Infinity",
        "o-tab-btn--eternity": this.parentName === "Eternity",
        "o-tab-btn--reality": this.parentName === "Reality",
        "o-tab-btn--celestial": this.parentName === "Celestials"
      };
    },
  },
  methods: {
    update() {
      this.isAvailable = this.subtab.isAvailable;
      this.hasNotification = this.subtab.hasNotification;
      this.isCurrentSubtab = this.subtab.isOpen && Theme.currentName() !== "S9";
      this.tabName = Pelle.transitionText(
        this.subtab.name,
        this.subtab.name,
        Math.max(Math.min(GameEnd.endState - (this.subtab.id) % 4 / 10, 1), 0)
      );
    }
  },
  template: `
  <button
    v-if="isAvailable"
    :class="classObject"
    @click="subtab.show(true)"
    data-v-classic-subtab-button
  >
    {{ tabName }}
    <div
      v-if="hasNotification"
      class="fas fa-circle-exclamation l-notification-icon"
    />
  </button>
  `
};