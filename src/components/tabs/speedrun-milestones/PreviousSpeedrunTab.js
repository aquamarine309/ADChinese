import PreviousSpeedrunInfo from "./PreviousSpeedrunInfo.js";
import PrimaryButton from "../../PrimaryButton.js";
import SpeedrunMilestoneCompare from "./SpeedrunMilestoneCompare.js";

export default {
  name: "PreviousSpeedrunTab",
  components: {
    PrimaryButton,
    SpeedrunMilestoneCompare,
    PreviousSpeedrunInfo,
  },
  data() {
    return {
      milestoneTimes: [],
      isSpectating: false,
      selectedRun: 0,
      runPage: 0,
    };
  },
  computed: {
    milestones: () => GameDatabase.speedrunMilestones,
    previousRuns() {
      const keys = Object.keys(player.speedrun.previousRuns);
      const allRuns = [];
      for (const key of keys) {
        const run = player.speedrun.previousRuns[key];
        run.id = Number(key);
        allRuns.push(run);
      }
      return allRuns;
    },
    bestPreviousTimes() {
      const recLength = GameDatabase.speedrunMilestones.length + 1;
      const bestTimes = Array.repeat(0, recLength);
      const bestRunIndices = [...bestTimes];
      for (const index of Object.keys(player.speedrun.previousRuns)) {
        const run = player.speedrun.previousRuns[index].records;
        for (let rec = 0; rec < recLength; rec++) {
          if (run[rec] !== 0 && (run[rec] < bestTimes[rec] || bestTimes[rec] === 0)) {
            bestTimes[rec] = run[rec];
            bestRunIndices[rec] = index;
          }
        }
      }

      const milestoneList = Array.repeat({}, recLength);
      for (let rec = 0; rec < recLength; rec++) {
        milestoneList[rec] = { time: bestTimes[rec], index: bestRunIndices[rec] };
      }
      return milestoneList;
    },
    numRuns() {
      return Object.keys(this.previousRuns).length;
    },
    highestIndex() {
      return Math.max(this.previousRuns.map(k => Number(k.id)).max(), player.records.fullGameCompletions);
    },
    spectateText() {
      return this.isSpectating
        ? "Numbers here are unaffected by END so that you can see your final records."
        : null;
    }
  },
  methods: {
    update() {
      this.milestoneTimes = [...player.speedrun.records];
      this.isSpectating = GameEnd.endState > END_STATE_MARKERS.SPECTATE_GAME;
    },
    selectRun(index) {
      this.selectedRun = index;
    },
    findRun(index) {
      return this.previousRuns.find(r => r?.id === 10 * this.runPage + index);
    },
    changePage(dir) {
      this.runPage = Math.clamp(this.runPage + dir, 0, Math.floor(this.highestIndex / 10));
    }
  },
  template: `
  <div
    class="c-previous-runs"
    data-v-previous-speedrun-tab
  >
    <b>到目前为止，你已完成了 {{ format(numRuns, 0, 0, x => x) }} 次速通。</b>
    <b>Statistics of previous runs are below, mouseover icons for more details.</b>
    <b>Click the magnifying glass to compare the milestones on a particular run to this run.</b>
    <b>{{ spectateText }}</b>
    <br>
    <div
      v-if="highestIndex > 10"
      class="c-run-page-nav"
      data-v-previous-speedrun-tab
    >
      <PrimaryButton
        class="o-primary-btn--subtab-option fas fa-arrow-left"
        :class="{ 'o-primary-btn--disabled' : runPage === 0 }"
        @click="changePage(-1)"
        data-v-previous-speedrun-tab
      />
      Showing runs {{ 10 * runPage + 1 }} to {{ 10 * (runPage + 1) }} ({{ highestIndex }} total runs)
      <PrimaryButton
        class="o-primary-btn--subtab-option fas fa-arrow-right"
        :class="{ 'o-primary-btn--disabled' : runPage + 1 > highestIndex / 10 }"
        @click="changePage(1)"
        data-v-previous-speedrun-tab
      />
    </div>
    <div
      class="c-previous-runs"
      data-v-previous-speedrun-tab
    >
      <span
        v-for="entry in 10"
        :key="entry"
        data-v-previous-speedrun-tab
      >
        <span
          v-if="10 * runPage + entry <= highestIndex"
          class="c-single-run"
          data-v-previous-speedrun-tab
        >
          <PrimaryButton
            v-if="findRun(entry)"
            class="o-primary-btn--subtab-option fas fa-magnifying-glass"
            :class="{ 'o-selected-btn' : selectedRun === 10 * runPage + entry }"
            @click="selectRun(10 * runPage + entry)"
            data-v-previous-speedrun-tab
          />
          <PreviousSpeedrunInfo
            :prev-run-info="findRun(entry)"
            :index="10 * runPage + entry"
            data-v-previous-speedrun-tab
          />
        </span>
      </span>
    </div>
    <br>
    <div
      class="c-legend"
      data-v-previous-speedrun-tab
    >
      <div
        class="c-legend-cell"
        data-v-previous-speedrun-tab
      >
        <span
          class="o-box l-milestone-none"
          data-v-previous-speedrun-tab
        /> Not reached this run
      </div>
      <div
        class="c-legend-cell"
        data-v-previous-speedrun-tab
      >
        <span
          class="o-box l-milestone-slow"
          data-v-previous-speedrun-tab
        /> Slower than comparison
      </div>
      <div
        class="c-legend-cell"
        data-v-previous-speedrun-tab
      >
        <span
          class="o-box l-milestone-fast"
          data-v-previous-speedrun-tab
        /> Faster than comparison
      </div>
      <div
        class="c-legend-cell"
        data-v-previous-speedrun-tab
      >
        <span
          class="o-box l-milestone-fastest"
          data-v-previous-speedrun-tab
        /> Faster than best
      </div>
    </div>
    <div
      class="l-speedrun-milestone-tab"
      data-v-previous-speedrun-tab
    >
      <SpeedrunMilestoneCompare
        v-for="milestone in milestones"
        :key="milestone.id"
        :milestone="milestone"
        :curr-time="milestoneTimes[milestone.id]"
        :ref-time="selectedRun ? previousRuns.find(run => run.id === selectedRun).records[milestone.id] : null"
        :best-time="bestPreviousTimes[milestone.id].time"
        :run-indices="[selectedRun, bestPreviousTimes[milestone.id].index]"
        data-v-previous-speedrun-tab
      />
    </div>
  </div>
  `
};