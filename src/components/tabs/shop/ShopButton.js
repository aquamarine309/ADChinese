export default {
  name: "ShopButton",
  props: {
    purchase: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      currentMult: 0,
      nextMult: 0,
      canAfford: false,
      iapDisabled: false,
      cost: 0,
      hasChosen: false,
      chosenSet: "",
      lockedCount: 0,
    };
  },
  computed: {
    isSingleCosmeticSet() {
      return this.purchase.config.key === "singleCosmeticSet";
    },
    isAllCosmeticSets() {
      return this.purchase.config.key === "allCosmeticSets";
    },
    // Note: This will always be false on non-cosmetic buttons and thus will never disable them in purchaseButtonObject
    allSetsUnlocked() {
      return (this.isSingleCosmeticSet || this.isAllCosmeticSets) && !this.lockedCount;
    }
  },
  methods: {
    update() {
      this.currentMult = this.purchase.currentMultForDisplay;
      this.nextMult = this.purchase.nextMultForDisplay;
      this.canAfford = this.purchase.canBeBought;
      this.iapDisabled = !ShopPurchaseData.isIAPEnabled;
      this.cost = Math.clampMin(this.purchase.cost, 0);
      this.hasChosen = GlyphAppearanceHandler.chosenFromModal !== null;
      this.chosenSet = GlyphAppearanceHandler.chosenFromModal?.name ?? "未选择";
      this.lockedCount = GlyphAppearanceHandler.lockedSets.length;
    },
    openSelectionModal() {
      Modal.cosmeticSetChoice.show();
    },
    performPurchase() {
      if (this.isSingleCosmeticSet && !this.hasChosen) {
        return;
      }
      this.purchase.purchase();
    },
    purchaseButtonObject() {
      const lockCosmetics = (this.isSingleCosmeticSet && !this.hasChosen) || this.allSetsUnlocked;
      return {
        "o-shop-button-button": true,
        "o-shop-button-button--disabled": !this.canAfford || lockCosmetics
      };
    }
  },
  template: `
  <div
    class="c-shop-button-container"
    data-v-shop-button
  >
    <div
      class="o-shop-button-description"
      data-v-shop-button
    >
      {{ purchase.description }}
      <br>
      <span
        v-if="purchase.shouldDisplayMult"
        class="o-shop-button-multiplier"
        :class="{ 'o-shop-button-multiplier--disabled': iapDisabled }"
        data-v-shop-button
      >
        当前 {{ purchase.formatEffect(currentMult) }}，下一级：{{ purchase.formatEffect(nextMult) }}
      </span>
    </div>
    <div>
      <div v-if="isSingleCosmeticSet">
        <div
          v-if="allSetsUnlocked"
          class="o-shop-button-multiplier"
          data-v-shop-button
        >
          已解锁所有符文皮肤！
        </div>
        <div v-else>
          <button
            class="o-shop-button-button"
            @click="openSelectionModal"
            data-v-shop-button
          >
            选择符文皮肤
          </button>
          已选择：{{ chosenSet }}
        </div>
      </div>
      <div
        v-if="isAllCosmeticSets"
        class="o-shop-button-multiplier"
        data-v-shop-button
      >
        <div v-if="allSetsUnlocked">
          All Sets unlocked!
        </div>
        <div v-else>
          将解锁 {{ formatInt(lockedCount) }} 个
        </div>
      </div>
    </div>
    <button
      :class="purchaseButtonObject()"
      @click="performPurchase"
      data-v-shop-button
    >
      价格：{{ cost }}
      <img
        src="./public/images/std_coin.png"
        class="o-shop-button-button__img"
        data-v-shop-button
      >
    </button>
    <div
      v-if="!purchase.isUnlocked()"
      class="o-shop-button-locked-text"
      data-v-shop-button
    >
      这将影响尚未解锁的功能（{{ purchase.lockText }}）
    </div>
  </div>
  `
};