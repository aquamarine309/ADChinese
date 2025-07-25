import { STEAM } from "../../env.js";
import { SteamRuntime } from "../../steam/index.js";
import Payments from "../../core/payments.js";

export default {
  name: "StdStoreRow",
  props: {
    amount: {
      type: Number,
      required: true
    },
    cost: {
      type: Number,
      required: true
    }
  },
  methods: {
    purchase() {
      if (STEAM) {
        SteamRuntime.purchaseIAP(this.amount);
      } else {
        Payments.buyMoreSTD(this.amount, this.cost);
      }
    }
  },
  template: `
  <div class="c-modal-store-btn-container">
    <div class="o-modal-store-label">
      {{ amount }} 硬币
    </div>
    <button
      class="o-modal-store-btn"
      @click="purchase"
    >
      $<span>{{ cost }}</span>
    </button>
  </div>
  `
};