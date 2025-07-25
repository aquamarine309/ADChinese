import ModalWrapper from "./ModalWrapper.js";
import StdStoreRow from "./StdStoreRow.js";
import { SteamRuntime } from "../../steam/index.js";

export default {
  name: "StdStoreModal",
  components: {
    ModalWrapper,
    StdStoreRow
  },
  data() {
    return {
      macPurchaser: false,
    };
  },
  methods: {
    update() {
      this.macPurchaser = SteamRuntime.hasPendingPurchaseConfirmations;
    },
    macConfirm() {
      SteamRuntime.validatePurchases();
    }
  },
  template: `
  <ModalWrapper class="c-shop-modal">
    <template #header>
      投币支持开发者
    </template>
    <span v-if="macPurchaser">
      <button class="o-shop-button-button" @click="macConfirm()">Confirm Purchase to Receive STDs</button>
      <br><span>(Required on Mac)</span><br>
    </span>
    <div class="l-modal-store-content">
      <img src="./public/images/std_coin.png">
      <div class="c-modal-store-buttons">
        <StdStoreRow
          :amount="30"
          :cost="2.99"
        />
        <StdStoreRow
          :amount="60"
          :cost="4.99"
        />
        <StdStoreRow
          :amount="140"
          :cost="9.99"
        />
        <StdStoreRow
          :amount="300"
          :cost="19.99"
        />
        <StdStoreRow
          :amount="1000"
          :cost="49.99"
        />
      </div>
    </div>
  </ModalWrapper>
  `
};