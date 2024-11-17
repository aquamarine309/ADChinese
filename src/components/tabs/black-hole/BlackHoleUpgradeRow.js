import BlackHoleUpgradeButton from "./BlackHoleUpgradeButton.js";

export default {
  name: "BlackHoleUpgradeRow",
  components: {
    BlackHoleUpgradeButton
  },
  props: {
    blackHole: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isUnlocked: false,
      isPermanent: false,
      intervalVal: 0,
      durationVal: 0,
    };
  },
  computed: {
    blackHoleDescription() {
      return this.blackHole.description(false);
    },
    intervalConfig() {
      return {
        upgrade: this.blackHole.intervalUpgrade,
        description: () => `黑洞的冷却时间减少 ${this.blackHoleDescription}`,
        effectTitle: "Current interval",
        formatEffect: () => TimeSpan.fromSeconds(this.blackHole.rawInterval).toStringShort(false)
      };
    },
    powerConfig() {
      return {
        upgrade: this.blackHole.powerUpgrade,
        description: () => `Make ${this.blackHoleDescription} ${formatPercents(0.35)} stronger`,
        effectTitle: "Current power",
        formatEffect: value => formatX(value, 2, 2)
      };
    },
    durationConfig() {
      return {
        upgrade: this.blackHole.durationUpgrade,
        description: () => `Extend ${this.blackHoleDescription}'s duration by ${formatPercents(0.3)}`,
        effectTitle: "Current duration",
        formatEffect: () => TimeSpan.fromSeconds(this.blackHole.duration).toStringShort(false)
      };
    }
  },
  methods: {
    update() {
      const bh = this.blackHole;
      this.isUnlocked = bh.isUnlocked;
      this.isPermanent = bh.isPermanent;
      // We pull directly from the black hole data here (and in formatEffect above) because there are other sources
      // which also affect them, and this is the only place where these values are displayed directly in-game. Then
      // we use these values as keys so that the buttons are forced to re-render immediately if they're ever changed
      this.intervalVal = bh.rawInterval;
      this.durationVal = bh.duration;
    }
  },
  template: `
  <div
    v-if="isUnlocked"
    class="l-black-hole-upgrade-grid__row"
  >
    <BlackHoleUpgradeButton
      v-if="!isPermanent"
      :key="intervalVal"
      :config="intervalConfig"
    />
    <BlackHoleUpgradeButton :config="powerConfig" />
    <BlackHoleUpgradeButton
      v-if="!isPermanent"
      :key="durationVal"
      :config="durationConfig"
    />
  </div>
  `
};