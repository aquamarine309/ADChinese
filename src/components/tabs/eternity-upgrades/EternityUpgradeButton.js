import CostDisplay from "../../CostDisplay.js";
import DescriptionDisplay from "../../DescriptionDisplay.js";
import EffectDisplay from "../../EffectDisplay.js";

export default {
  name: "EternityUpgradeButton",
  components: {
    DescriptionDisplay,
    EffectDisplay,
    CostDisplay
  },
  props: {
    upgrade: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isBought: false,
      isAffordable: false
    };
  },
  computed: {
    classObject() {
      return {
        "o-eternity-upgrade": true,
        "o-eternity-upgrade--bought": this.isBought,
        "o-eternity-upgrade--available": !this.isBought && this.isAffordable,
        "o-eternity-upgrade--unavailable": !this.isBought && !this.isAffordable
      };
    },
    hasEU2() {
      return Perk.autounlockEU2.canBeApplied;
    }
  },
  methods: {
    update() {
      const upgrade = this.upgrade;
      this.isBought = upgrade.isBought;
      this.isAffordable = upgrade.isAffordable;
    }
  },
  template: `
  <button
    :class="classObject"
    @click="upgrade.purchase()"
  >
    <DescriptionDisplay :config="upgrade.config" />
    <EffectDisplay
      br
      :config="upgrade.config"
    />
    <div v-if="!isBought && hasEU2">
      Auto: {{ format(upgrade.config.cost / 1e10) }} Eternity Points
    </div>
    <CostDisplay
      v-else-if="!isBought"
      br
      :config="upgrade.config"
      name="Eternity Point"
    />
  </button>
  `
};