import PrimaryButton from "../../PrimaryButton.js";
import PrimaryToggleButton from "../../PrimaryToggleButton.js";

export default {
  name: "EPMultiplierButton",
  components: {
    PrimaryButton,
    PrimaryToggleButton
  },
  data() {
    return {
      isAutobuyerActive: false,
      isAutoUnlocked: false,
      isAffordable: false,
      multiplier: new Decimal(),
      cost: new Decimal()
    };
  },
  computed: {
    upgrade() {
      return EternityUpgrade.epMult;
    },
    autobuyer() {
      return Autobuyer.epMult;
    },
    classObject() {
      if (this.isDoomed) {
        return {
          "o-eternity-upgrade": true,
          "o-eternity-upgrade--useless": !this.isAffordable,
          "o-pelle-disabled-pointer": true,
          "o-pelle-disabled": true,
        };
      }
      return {
        "o-eternity-upgrade": true,
        "o-eternity-upgrade--available": this.isAffordable,
        "o-eternity-upgrade--unavailable": !this.isAffordable
      };
    },
    isDoomed: () => Pelle.isDoomed,
  },
  watch: {
    isAutobuyerActive(newValue) {
      Autobuyer.epMult.isActive = newValue;
    }
  },
  methods: {
    update() {
      const upgrade = this.upgrade;
      this.isAutoUnlocked = this.autobuyer.isUnlocked;
      this.isAutobuyerActive = this.autobuyer.isActive;
      this.multiplier.copyFrom(upgrade.effectValue);
      this.cost.copyFrom(upgrade.cost);
      this.isAffordable = upgrade.isAffordable;
    },
    purchaseUpgrade() {
      if (RealityUpgrade(15).isLockingMechanics) RealityUpgrade(15).tryShowWarningModal();
      else this.upgrade.purchase();
    }
  },
  template: `
  <div
    class="l-spoon-btn-group l-margin-top"
    data-v-ep-multiplier-button
  >
    <button
      :class="classObject"
      @click="purchaseUpgrade"
    >
      <div :class="{ 'o-pelle-disabled': isDoomed }">
        将所有来源的永恒点数乘以 {{ formatX(5) }}
        <br>
        当前：{{ formatX(multiplier, 2, 0) }}
      </div>
      <br>
      价格：{{ format(cost, 2, 0) }} 永恒点数
    </button>
    <PrimaryButton
      class="l--spoon-btn-group__little-spoon o-primary-btn--small-spoon"
      @click="upgrade.buyMax(false)"
    >
      购买最大数量
    </PrimaryButton>
    <PrimaryToggleButton
      v-if="isAutoUnlocked"
      v-model="isAutobuyerActive"
      label="自动购买永恒点数倍增："
      class="l--spoon-btn-group__little-spoon o-primary-btn--small-spoon"
    />
  </div>
  `
};