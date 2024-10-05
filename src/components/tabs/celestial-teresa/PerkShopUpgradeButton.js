import CostDisplay from "../../CostDisplay.js";
import DescriptionDisplay from "../../DescriptionDisplay.js";
import EffectDisplay from "../../EffectDisplay.js";

export default {
  name: "PerkShopUpgradeButton",
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
      isAvailableForPurchase: false,
      isCapped: false,
    };
  },
  computed: {
    isDoomed: () => Pelle.isDoomed,
    classObject() {
      return {
        "o-teresa-shop-button": true,
        "o-teresa-shop-button--available": this.isAvailableForPurchase && !this.isCapped,
        "o-teresa-shop-button--capped": this.isCapped,
        "o-teresa-shop-button--pelle-disabled": this.isDoomed &&
          (this.upgrade === PerkShopUpgrade.musicGlyph || this.upgrade === PerkShopUpgrade.fillMusicGlyph)
      };
    },
  },
  methods: {
    update() {
      this.isAvailableForPurchase = this.upgrade.isAvailableForPurchase;
      this.isCapped = this.upgrade.isCapped;
    }
  },
  template: `
  <div class="l-spoon-btn-group">
    <button
      :class="classObject"
      @click="upgrade.purchase()"
      data-v-perk-shop-upgrade-button
    >
      <DescriptionDisplay
        :config="upgrade.config"
        :length="70"
      />
      <br>
      <EffectDisplay :config="upgrade.config" />
      <br>
      <CostDisplay
        v-if="!isCapped"
        :config="upgrade.config"
        name="Perk Point"
      />
    </button>
  </div>
  `
};