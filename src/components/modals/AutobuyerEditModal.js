import BigCrunchAutobuyerBox from "../tabs/autobuyers/BigCrunchAutobuyerBox.js";
import DimensionBoostAutobuyerBox from "../tabs/autobuyers/DimensionBoostAutobuyerBox.js";
import EternityAutobuyerBox from "../tabs/autobuyers/EternityAutobuyerBox.js";
import GalaxyAutobuyerBox from "../tabs/autobuyers/GalaxyAutobuyerBox.js";
import ModalWrapper from "../modals/ModalWrapper.js";
import RealityAutobuyerBox from "../tabs/autobuyers/RealityAutobuyerBox.js";

export default {
  name: "AutobuyerEditModal",
  components: {
    BigCrunchAutobuyerBox,
    DimensionBoostAutobuyerBox,
    EternityAutobuyerBox,
    GalaxyAutobuyerBox,
    ModalWrapper,
    RealityAutobuyerBox,
  },
  computed: {
    header() {
      return `编辑自动购买器`;
    },
    message() {
      // We have to have this edge-case due to a weird happening where you could open this modal
      // during the Reality animation, which would then show an empty modal.
      return Autobuyers.hasAutobuyersForEditModal
        ? `通过此弹窗，你可以编辑自动购买器中的各项数值。`
        : `你当前没有可在此显示的自动购买器。`;
    },
  },
  template: `
  <ModalWrapper>
    <template #header>
      {{ header }}
    </template>
    <div
      class="c-modal-message__text-fit"
      data-v-autobuyer-edit-modal
    >
      <span>
        {{ message }}
      </span>
    </div>
    <!--
      We only include these autobuyers as these are (probably) the ones that users will want to change
      most often.
    -->
    <RealityAutobuyerBox
      class="c-reality-pos"
      is-modal
      data-v-autobuyer-edit-modal
    />
    <EternityAutobuyerBox
      class="c-eternity-pos"
      is-modal
      data-v-autobuyer-edit-modal
    />
    <BigCrunchAutobuyerBox
      class="c-infinity-pos"
      is-modal
      data-v-autobuyer-edit-modal
    />
    <GalaxyAutobuyerBox is-modal />
    <DimensionBoostAutobuyerBox is-modal />
  </ModalWrapper>
  `
};