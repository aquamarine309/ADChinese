export default {
  name: "PreviousSpeedrunInfo",
  props: {
    // This will be undefined for records which don't exist in the speedrun history
    prevRunInfo: {
      type: Object,
      required: false,
      default: () => {}
    },
    index: {
      type: Number,
      required: true,
    },
  },
  computed: {
    segmentAttr() {
      return {
        icon: `fas o-icon ${this.prevRunInfo.isSegmented ? "fa-stopwatch-20" : "fa-stopwatch"}`,
        text: this.prevRunInfo.isSegmented ? "Segmented" : "Single Segment",
      };
    },
    stdAttr() {
      return {
        icon: `fas fa-coins o-icon ${this.prevRunInfo.usedSTD ? "l-icon-on" : "l-icon-off"}`,
        text: this.prevRunInfo.usedSTD ? "Used STD Upgrades" : "No STDs used",
      };
    },
    offlineAttr() {
      const offlineFrac = this.prevRunInfo.offlineTimeUsed / this.prevRunInfo.records.max();
      let symbol;
      if (offlineFrac === 0) symbol = "fa-eye";
      else if (offlineFrac < 0.1) symbol = "fa-computer";
      else if (offlineFrac < 0.6) symbol = "fa-moon";
      else symbol = "fa-power-off";
      return {
        icon: `fas o-icon ${symbol}`,
        text: `${offlineFrac === 0 ? "No" : formatPercents(offlineFrac, 1)} Offline Time`,
      };
    },
    seedAttr() {
      let symbol;
      switch (this.prevRunInfo.seedSelection) {
        case SPEEDRUN_SEED_STATE.UNKNOWN:
          symbol = "fa-question";
          break;
        case SPEEDRUN_SEED_STATE.FIXED:
          symbol = "fa-gamepad";
          break;
        case SPEEDRUN_SEED_STATE.RANDOM:
          symbol = "fa-dice";
          break;
        case SPEEDRUN_SEED_STATE.PLAYER:
          symbol = "fa-user-pen";
          break;
        default:
          throw new Error("Unrecognized speedrun seed option in previous run subtab");
      }

      return {
        icon: `fas ${symbol} o-icon`,
        text: Speedrun.seedModeText(this.prevRunInfo),
      };
    },
    iconAttrs() {
      return [this.offlineAttr, this.segmentAttr, this.stdAttr, this.seedAttr];
    },
    startDate() {
      return Time.toDateTimeString(this.prevRunInfo.startDate);
    },
    finalTime() {
      return TimeSpan.fromMilliseconds(this.prevRunInfo.records.max()).toStringShort(true, true);
    },
  },
  template: `
  <div
    v-if="prevRunInfo"
    class="c-icon-container"
    data-v-previous-speedrun-info
  >
    <span>Run {{ index }}</span>
    <span>{{ prevRunInfo.name }}</span>
    <span
      v-for="attr in iconAttrs"
      :key="attr.icon"
      v-tooltip="attr.text"
      :class="attr.icon"
      data-v-previous-speedrun-info
    />
    <span>Started: {{ startDate }}</span>
    <span>Final Time: {{ finalTime }}</span>
  </div>
  <div
    v-else
    class="c-no-record"
    data-v-previous-speedrun-info
  >
    No speedrun records found for run {{ index }}.
  </div>
  `
};