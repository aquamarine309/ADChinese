import { createEntryInfo } from "./breakdown-entry-info.js";
import MultiplierBreakdownEntry from "./MultiplierBreakdownEntry.js";

const MULT_TAB_OPTIONS = [
  { id: 0, key: "AM", text: "Antimatter Production" },
  { id: 1, key: "tickspeed", text: "Tickspeed" },
  { id: 2, key: "AD", text: "Antimatter Dimensions" },
  { id: 3, key: "IP", text: "Infinity Points" },
  { id: 4, key: "ID", text: "Infinity Dimensions" },
  { id: 5, key: "infinities", text: "Infinities" },
  { id: 6, key: "replicanti", text: "Replicanti Speed" },
  { id: 7, key: "EP", text: "Eternity Points" },
  { id: 8, key: "TD", text: "Time Dimensions" },
  { id: 9, key: "eternities", text: "Eternities" },
  { id: 10, key: "DT", text: "Dilated Time" },
  { id: 11, key: "gamespeed", text: "Game Speed" },
];

export default {
  name: "MultiplierBreakdownTab",
  components: {
    MultiplierBreakdownEntry
  },
  data() {
    return {
      availableOptions: [],
      currentID: player.options.multiplierTab.currTab,
    };
  },
  computed: {
    currentKey() {
      return MULT_TAB_OPTIONS.find(opt => opt.id === this.currentID).key;
    },
    resource() {
      return createEntryInfo(`${this.currentKey}_total`);
    },
    resourceSymbols() {
      return GameDatabase.multiplierTabValues[this.currentKey].total.overlay;
    }
  },
  methods: {
    update() {
      this.availableOptions = MULT_TAB_OPTIONS.map(opt => ({
        ...opt,
        isActive: this.checkActiveKey(opt.key)
      })).filter(opt => opt.isActive);
    },
    checkActiveKey(key) {
      const act = GameDatabase.multiplierTabValues[key].total.isActive;
      return typeof act === "function" ? act() : act;
    },
    accessProp(prop) {
      return typeof prop === "function" ? prop() : prop;
    },
    subtabClassObject(option) {
      return {
        "c-multiplier-subtab-btn": true,
        "c-multiplier-subtab-btn--active": option.key === this.currentKey,
      };
    },
    clickSubtab(index) {
      this.currentID = this.availableOptions[index].id;
      player.options.multiplierTab.currTab = MULT_TAB_OPTIONS.find(opt => opt.key === this.currentKey).id;
    }
  },
  template: `
  <div
    class="c-stats-tab"
    data-v-multiplier-breakdown-tab
  >
    <div
      class="l-multiplier-subtab-btn-container"
      data-v-multiplier-breakdown-tab
    >
      <button
        v-for="(option, index) in availableOptions"
        :key="option.key + option.isActive"
        :class="subtabClassObject(option)"
        @click="clickSubtab(index)"
        data-v-multiplier-breakdown-tab
      >
        {{ option.text }}
      </button>
    </div>
    <div
      class="c-list-container"
      data-v-multiplier-breakdown-tab
    >
      <span
        v-for="symbol in resourceSymbols"
        :key="symbol"
      >
        <span
          class="c-symbol-overlay"
          v-html="symbol"
          data-v-multiplier-breakdown-tab
        />
      </span>
      <MultiplierBreakdownEntry
        :key="resource.key"
        :resource="resource"
        :is-root="true"
        data-v-multiplier-breakdown-tab
      />
      <div
        class="c-multiplier-tab-text-line"
        data-v-multiplier-breakdown-tab
      >
        Note: Entries are only expandable if they contain multiple sources which can be different values.
        For example, any effects which affect all Dimensions of any type equally will not expand into a
        list of eight identical numbers.
        <br>
        <b>
          Some entries may cause lag if expanded out fully. Resizing happens over 200 ms (instead of instantly)
          in order to reduce possible adverse effects due to photosensitivity. This may cause some visual weirdness
          after prestige events.
        </b>
      </div>
    </div>
  </div>
  `
};