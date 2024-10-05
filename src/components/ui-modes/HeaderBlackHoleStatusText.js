export default {
  name: "HeaderBlackHoleStatusText",
  props: {
    blackHole: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isUnlocked: false,
      state: "",
    };
  },
  computed: {
    id() {
      return this.blackHole.id;
    }
  },
  methods: {
    update() {
      this.isUnlocked = this.blackHole.isUnlocked;
      this.state = this.blackHole.displayState;
    }
  },
  template: `
  <span v-if="isUnlocked">
    🌀{{ id }}:<span v-html="state" />
  </span>
  `
};