import AutobuyerBox from "./AutobuyerBox.js";
import AutobuyerDropdownEntry from "./AutobuyerDropdownEntry.js";
import AutobuyerInput from "./AutobuyerInput.js";
import AutobuyerIntervalButton from "./AutobuyerIntervalButton.js";
import ExpandingControlBox from "../../ExpandingControlBox.js";

export default {
  name: "BigCrunchAutobuyerBox",
  components: {
    AutobuyerBox,
    AutobuyerIntervalButton,
    AutobuyerInput,
    ExpandingControlBox,
    AutobuyerDropdownEntry
  },
  props: {
    isModal: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      isDoomed: false,
      postBreak: false,
      hasMaxedInterval: false,
      mode: AUTO_CRUNCH_MODE.AMOUNT,
      hasAdditionalModes: false,
      increaseWithMult: true,
    };
  },
  computed: {
    autobuyer: () => Autobuyer.bigCrunch,
    modes: () => [
      AUTO_CRUNCH_MODE.AMOUNT,
      AUTO_CRUNCH_MODE.TIME,
      AUTO_CRUNCH_MODE.X_HIGHEST,
    ],
    amountMode: () => AUTO_ETERNITY_MODE.AMOUNT
  },
  watch: {
    increaseWithMult(newValue) {
      this.autobuyer.increaseWithMult = newValue;
    }
  },
  methods: {
    update() {
      this.isDoomed = Pelle.isDoomed;
      this.postBreak = player.break;
      this.hasMaxedInterval = this.autobuyer.hasMaxedInterval;
      this.mode = this.autobuyer.mode;
      this.hasAdditionalModes = this.autobuyer.hasAdditionalModes;
      this.increaseWithMult = this.autobuyer.increaseWithMult;
    },
    modeProps(mode) {
      switch (mode) {
        case AUTO_CRUNCH_MODE.AMOUNT: return {
          title: "Big Crunch at X IP",
          input: {
            property: "amount",
            type: "decimal"
          },
        };
        case AUTO_CRUNCH_MODE.TIME: return {
          title: "Seconds between Crunches",
          input: {
            property: "time",
            type: "float"
          },
        };
        case AUTO_CRUNCH_MODE.X_HIGHEST: return {
          title: "X times highest IP",
          input: {
            property: "xHighest",
            type: "decimal"
          },
        };
      }
      throw new Error("Unknown Auto Crunch mode");
    },
    modeName(mode) {
      return this.modeProps(mode).title;
    },
  },
  template: `
  <AutobuyerBox
    :autobuyer="autobuyer"
    :show-interval="!postBreak"
    :is-modal="isModal"
    name="Automatic Big Crunch"
  >
    <template
      v-if="!hasMaxedInterval"
      #intervalSlot
    >
      <AutobuyerIntervalButton :autobuyer="autobuyer" />
    </template>
    <template
      v-else-if="postBreak"
      #intervalSlot
    >
      <ExpandingControlBox
        v-if="hasAdditionalModes"
        :auto-close="true"
      >
        <template #header>
          <div class="o-primary-btn c-autobuyer-box__mode-select c-autobuyer-box__mode-select-header">
            ▼ Current Setting: ▼
            <br>
            {{ modeName(mode) }}
          </div>
        </template>
        <template #dropdown>
          <AutobuyerDropdownEntry
            :autobuyer="autobuyer"
            :modes="modes"
            :mode-name-fn="modeName"
          />
        </template>
      </ExpandingControlBox>
      <span v-else>
        {{ modeProps(mode).title }}:
      </span>
    </template>
    <template
      v-if="postBreak"
      #toggleSlot
    >
      <AutobuyerInput
        :key="mode"
        :autobuyer="autobuyer"
        v-bind="modeProps(mode).input"
      />
    </template>
    <template
      v-if="postBreak && mode === amountMode"
      #checkboxSlot
    >
      <label
        class="o-autobuyer-toggle-checkbox o-clickable"
        data-v-big-crunch-autobuyer-box
      >
        <input
          v-model="increaseWithMult"
          type="checkbox"
          class="o-clickable"
          data-v-big-crunch-autobuyer-box
        >
        Dynamic amount
      </label>
    </template>
  </AutobuyerBox>
  `
};