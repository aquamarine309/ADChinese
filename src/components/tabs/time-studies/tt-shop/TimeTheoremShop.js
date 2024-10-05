import PrimaryToggleButton from "../../../PrimaryToggleButton.js";
import TimeStudySaveLoadButton from "./TimeStudySaveLoadButton.js";
import TimeTheoremBuyButton from "./TimeTheoremBuyButton.js";

export default {
  name: "TimeTheoremShop",
  components: {
    PrimaryToggleButton,
    TimeTheoremBuyButton,
    TimeStudySaveLoadButton
  },
  data() {
    return {
      theoremAmount: new Decimal(0),
      theoremGeneration: new Decimal(0),
      totalTimeTheorems: new Decimal(0),
      shopMinimized: false,
      minimizeAvailable: false,
      hasTTAutobuyer: false,
      isAutobuyerOn: false,
      budget: {
        am: new Decimal(0),
        ip: new Decimal(0),
        ep: new Decimal(0)
      },
      costs: {
        am: new Decimal(0),
        ip: new Decimal(0),
        ep: new Decimal(0)
      },
      showST: false,
      STamount: 0,
      hasTTGen: false,
      showTTGen: false,
      invertTTgenDisplay: false,
    };
  },
  computed: {
    minimized() {
      return this.minimizeAvailable && this.shopMinimized;
    },
    formatTimeTheoremType() {
      if (this.theoremAmount.gte(1e6)) {
        return format;
      }
      if (!(Teresa.isRunning || Enslaved.isRunning) &&
        getAdjustedGlyphEffect("dilationTTgen") > 0 && !DilationUpgrade.ttGenerator.isBought) {
        return formatFloat;
      }
      return formatInt;
    },
    TTgenRateText() {
      if (this.theoremGeneration.lt(1 / 3600)) {
        return `你每 ${TimeSpan.fromSeconds(
          this.theoremGeneration.reciprocal().toNumber()).toStringShort(false)} 获得一个时间之理。`;
      }
      if (this.theoremGeneration.lt(0.1)) {
        return `你每小时获得 ${format(this.theoremGeneration.times(3600), 2, 2)} 时间之理。`;
      }
      return `你每秒获得 ${format(this.theoremGeneration, 2, 2)} 时间之理。`;
    },
    totalTimeTheoremText() {
      return `你拥有 ${this.formatTimeTheoremType(this.totalTimeTheorems, 2, 2)} 时间之理。`;
    },
    minimizeArrowStyle() {
      return {
        transform: this.minimized ? "rotate(-180deg)" : "",
        transition: "all 0.25s ease-out"
      };
    },
    saveLoadText() {
      return this.$viewModel.shiftDown ? "Save:" : "Load:";
    },
    shopBottomRowHeightStyle() {
      return {
        height: this.hasTTAutobuyer ? "6.7rem" : "4.4rem",
      };
    }
  },
  watch: {
    isAutobuyerOn(newValue) {
      Autobuyer.timeTheorem.isActive = newValue;
    },
    invertTTgenDisplay(newValue) {
      player.options.invertTTgenDisplay = newValue;
    },
  },
  methods: {
    minimize() {
      player.timestudy.shopMinimized = !player.timestudy.shopMinimized;
    },
    formatAM(am) {
      return `${format(am)} 反物质`;
    },
    buyWithAM() {
      TimeTheorems.buyOne(false, "am");
    },
    formatIP(ip) {
      return `${format(ip)} 无限点数`;
    },
    buyWithIP() {
      TimeTheorems.buyOne(false, "ip");
    },
    formatEP(ep) {
      return `${format(ep, 2, 0)} 永恒点数`;
    },
    buyWithEP() {
      TimeTheorems.buyOne(false, "ep");
    },
    buyMaxTheorems() {
      TimeTheorems.buyMax(false);
    },
    update() {
      this.theoremAmount.copyFrom(Currency.timeTheorems);
      this.theoremGeneration.copyFrom(getTTPerSecond().times(getGameSpeedupForDisplay()));
      this.totalTimeTheorems.copyFrom(Currency.timeTheorems.max);
      this.shopMinimized = player.timestudy.shopMinimized;
      this.hasTTAutobuyer = Autobuyer.timeTheorem.isUnlocked;
      this.isAutobuyerOn = Autobuyer.timeTheorem.isActive;
      this.minimizeAvailable = DilationUpgrade.ttGenerator.isBought || this.hasTTAutobuyer;
      const budget = this.budget;
      budget.am.copyFrom(TimeTheoremPurchaseType.am.currency);
      budget.ip.copyFrom(TimeTheoremPurchaseType.ip.currency);
      budget.ep.copyFrom(TimeTheoremPurchaseType.ep.currency);
      const costs = this.costs;
      costs.am.copyFrom(TimeTheoremPurchaseType.am.cost);
      costs.ip.copyFrom(TimeTheoremPurchaseType.ip.cost);
      costs.ep.copyFrom(TimeTheoremPurchaseType.ep.cost);
      this.showST = V.spaceTheorems > 0 && !Pelle.isDoomed;
      this.STamount = V.availableST;
      this.hasTTGen = this.theoremGeneration.gt(0);
      this.showTTGen = this.hasTTGen && (ui.view.shiftDown === this.invertTTgenDisplay);
      this.invertTTgenDisplay = player.options.invertTTgenDisplay;
    },
    toggleTTgen() {
      this.invertTTgenDisplay = !this.invertTTgenDisplay;
    }
  },
  template: `
  <div
    class="time-theorem-buttons"
    data-v-time-theorem-shop
  >
    <div
      class="ttshop-container ttshop-background"
      data-v-time-theorem-shop
    >
      <div
        data-role="page"
        class="ttbuttons-row ttbuttons-top-row"
        data-v-time-theorem-shop
      >
        <button
          class="l-tt-save-load-btn c-tt-buy-button c-tt-buy-button--unlocked"
          onClick="Modal.preferredTree.show()"
          data-v-time-theorem-shop
        >
          <i class="fas fa-cog" />
        </button>
        <p
          class="timetheorems"
          data-v-time-theorem-shop
        >
          <span
            class="c-tt-amount"
            data-v-time-theorem-shop
          >
            {{ formatTimeTheoremType(theoremAmount, 2, 0) }} 时间之理
          </span>
          <span v-if="showST">
            <br>
            {{ formatInt(STamount) }} 空间之理
          </span>
        </p>
        <div
          class="l-load-tree-area"
          data-v-time-theorem-shop
        >
          <div
            class="l-tree-load-button-wrapper"
            data-v-time-theorem-shop
          >
            <span
              class="c-ttshop__save-load-text"
              data-v-time-theorem-shop
            >{{ saveLoadText }}</span>
            <TimeStudySaveLoadButton
              v-for="saveslot in 6"
              :key="saveslot"
              :saveslot="saveslot"
            />
          </div>
          <div
            class="tt-gen-container"
            data-v-time-theorem-shop
          >
            <span
              v-if="hasTTGen"
              class="checkbox-margin"
              ach-tooltip="This shows TT generation by default and total TT if you hold shift.
                Check this box to swap this behavior."
                data-v-time-theorem-shop
            >
              <input
                v-model="invertTTgenDisplay"
                type="checkbox"
                :value="invertTTgenDisplay"
                class="o-clickable"
                @input="toggleTTgen()"
                data-v-time-theorem-shop
              >
            </span>
            <span v-if="showTTGen">
              {{ TTgenRateText }}
            </span>
            <span v-else>
              {{ totalTimeTheoremText }}
            </span>
          </div>
        </div>
      </div>
      <div
        v-if="!minimized"
        class="ttbuttons-row"
        :style="shopBottomRowHeightStyle"
        data-v-time-theorem-shop
      >
        <TimeTheoremBuyButton
          :budget="budget.am"
          :cost="costs.am"
          :format-cost="formatAM"
          :action="buyWithAM"
        />
        <TimeTheoremBuyButton
          :budget="budget.ip"
          :cost="costs.ip"
          :format-cost="formatIP"
          :action="buyWithIP"
        />
        <TimeTheoremBuyButton
          :budget="budget.ep"
          :cost="costs.ep"
          :format-cost="formatEP"
          :action="buyWithEP"
        />
        <div
          class="l-tt-buy-max-vbox"
          data-v-time-theorem-shop
        >
          <button
            v-if="!minimized"
            class="o-tt-top-row-button c-tt-buy-button c-tt-buy-button--unlocked"
            @click="buyMaxTheorems"
            data-v-time-theorem-shop
          >
            购买最大数量
          </button>
          <PrimaryToggleButton
            v-if="!minimized && hasTTAutobuyer"
            v-model="isAutobuyerOn"
            class="o-tt-autobuyer-button c-tt-buy-button c-tt-buy-button--unlocked"
            label="自动："
            data-v-time-theorem-shop
          />
        </div>
      </div>
      <div
        v-else
        class="ttbuttons-row ttbuttons-bottom-row-hide"
        data-v-time-theorem-shop
      />
    </div>
    <button
      v-if="minimizeAvailable"
      class="ttshop-minimize-btn ttshop-background"
      @click="minimize"
      data-v-time-theorem-shop
    >
      <span
        class="minimize-arrow"
        :style="minimizeArrowStyle"
        data-v-time-theorem-shop
      >▼</span>
    </button>
  </div>
  `
};