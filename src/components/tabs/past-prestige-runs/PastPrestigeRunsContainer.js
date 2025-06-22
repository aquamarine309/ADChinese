function averageRun(allRuns) {
  // Filter out all runs which have the default infinite value for time, but if we're left with no valid runs then we
  // take just one entry so that the averages also have the same value and we don't get division by zero.
  let runs = allRuns.filter(run => run[0] !== Number.MAX_VALUE);
  if (runs.length === 0) runs = [allRuns[0]];

  const longestRow = allRuns.map(r => r.length).max();
  const avgAttr = [];
  for (let index = 0; index < longestRow; index++) {
    if (typeof runs[0][index] === "string") {
      avgAttr.push("");
      continue;
    }
    const isNumber = typeof runs[0][index] === "number";
    const total = runs.map(run => run[index]).reduce(isNumber ? Number.sumReducer : Decimal.sumReducer);
    avgAttr.push(isNumber ? total / runs.length : Decimal.div(total, runs.length));
  }
  return avgAttr;
}

export default {
  name: "PastPrestigeRunsContainer",
  props: {
    layer: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isRealityUnlocked: false,
      resourceType: false,
      selectedResources: [],
      resourceTitles: [],
      showRealTime: false,
      runs: [],
      hasEmptyRecord: false,
      shown: true,
      hasChallenges: false,
      longestRow: 0,
      hasIM: false,
    };
  },
  computed: {
    averageRun() {
      return averageRun(this.runs);
    },
    dropDownIconClass() {
      return this.shown ? "far fa-minus-square" : "far fa-plus-square";
    },
    points() {
      const rawText = this.layer.currency;
      return rawText === "现实机器" && this.hasIM ? "虚幻机器上限" : rawText;
    },
    condition() {
      return this.layer.condition();
    },
    plural() {
      return this.layer.plural;
    },
    singular() {
      return this.layer.name;
    },
    getRuns() {
      return this.layer.getRuns;
    },
    hasRealTime: () => PlayerProgress.seenAlteredSpeed(),
  },
  methods: {
    update() {
      this.runs = this.clone(this.getRuns());
      this.hasEmptyRecord = this.runs[0][0] === Number.MAX_VALUE;
      this.runs.push(this.averageRun);
      this.isRealityUnlocked = PlayerProgress.current.isRealityUnlocked;
      this.shown = player.shownRuns[this.singular];
      this.resourceType = player.options.statTabResources;
      this.showRate = this.resourceType === RECENT_PRESTIGE_RESOURCE.RATE;
      this.hasChallenges = this.runs.map(r => this.challengeText(r)).some(t => t);
      this.hasIM = MachineHandler.currentIMCap > 0;

      // We have 4 different "useful" stat pairings we could display, but this ends up being pretty boilerplatey
      const names = [this.points, `${this.points}增长率`, this.plural, `${this.singular}增长率`];
      switch (this.resourceType) {
        case RECENT_PRESTIGE_RESOURCE.ABSOLUTE_GAIN:
          this.selectedResources = [0, 2];
          break;
        case RECENT_PRESTIGE_RESOURCE.RATE:
          this.selectedResources = [1, 3];
          break;
        case RECENT_PRESTIGE_RESOURCE.CURRENCY:
          this.selectedResources = [0, 1];
          break;
        case RECENT_PRESTIGE_RESOURCE.PRESTIGE_COUNT:
          this.selectedResources = [2, 3];
          break;
        default:
          throw new Error("Unrecognized Statistics tab resource type");
      }
      this.resourceTitles = [names[this.selectedResources[0]], names[this.selectedResources[1]]];

      // Entries always have all values, but sometimes the trailing ones will be blank or zero which we want to hide
      const lastIndex = arr => {
        let val = arr.length;
        while (val > 0) {
          const curr = arr[val - 1];
          if (typeof curr === "string" && curr !== "") return val;
          if (typeof curr !== "string" && Decimal.neq(curr, 0)) return val;
          val--;
        }
        return 0;
      };
      this.longestRow = this.runs.map(r => lastIndex(r)).max();
    },
    clone(runs) {
      return runs.map(run =>
        run.map(item =>
          (item instanceof Decimal ? Decimal.fromDecimal(item) : item)
        )
      );
    },
    infoArray(run, index) {
      let name;
      if (index === 0) name = "上一次";
      else if (index === 10) name = "平均";
      else name = `${formatInt(index + 1)} 次之前`;

      const cells = [name, this.gameTime(run)];
      if (this.hasRealTime) cells.push(this.realTime(run));

      const resources = [this.prestigeCurrencyGain(run), this.prestigeCurrencyRate(run),
        this.prestigeCountGain(run), this.prestigeCountRate(run)];
      cells.push(resources[this.selectedResources[0]]);
      cells.push(resources[this.selectedResources[1]]);

      if (this.hasChallenges) cells.push(this.challengeText(run));
      for (let i = 0; i < this.layer.extra?.length && cells.length <= this.longestRow; i++) {
        if (!this.layer.showExtra[i]()) continue;
        const formatFn = this.layer.formatExtra[i];
        const val = run[i + 5] ?? 0;
        if (this.layer.allowRate[i] && this.showRate) cells.push(this.rateText(run, run[i + 5]));
        else cells.push(formatFn(val));
      }

      return cells;
    },
    infoCol() {
      const cells = ["Run", this.hasRealTime ? "游戏时间" : "Time in Run"];
      if (this.hasRealTime) cells.push("现实时间");
      cells.push(...this.resourceTitles);
      if (this.hasChallenges) cells.push("挑战");

      for (let index = 0; index < this.layer.extra?.length && cells.length <= this.longestRow; index++) {
        if (!this.layer.showExtra[index]()) continue;
        cells.push((this.layer.allowRate[index] && this.showRate)
          ? this.layer.rateString[index]
          : this.layer.extra[index]);
      }
      return cells;
    },
    gameTime(run) {
      return timeDisplayShort(run[0]);
    },
    realTime(run) {
      return timeDisplayShort(run[1]);
    },
    prestigeCurrencyGain(run) {
      if (this.hasIM && this.layer.name === "现实") return `${format(run[7], 2)} 虚幻机器`;
      return `${format(run[2], 2)} ${this.points}`;
    },
    prestigeCountGain(run) {
      return `${format(run[3], 2)} ${this.plural}`;
    },
    prestigeCurrencyRate(run) {
      if (this.hasIM && this.layer.name === "现实") return "N/A";
      return this.rateText(run, run[2]);
    },
    prestigeCountRate(run) {
      return this.rateText(run, run[3]);
    },
    rateText(run, amount) {
      const time = run[1];
      const rpm = ratePerMinute(amount, time);
      return Decimal.lt(rpm, 1)
        ? `${format(Decimal.mul(rpm, 60), 2, 2)} 每小时`
        : `${format(rpm, 2, 2)} 每分钟`;
    },
    challengeText(run) {
      return run[4];
    },
    toggleShown() {
      player.shownRuns[this.singular] = !player.shownRuns[this.singular];
    },
    cellStyle(col, isHeader) {
      let width;
      switch (col) {
        case 0:
          // "X ago" is really short
          width = "9rem";
          break;
        case 3:
        case 4:
          // Prestige currency is long, but the reality table can be shorter due to smaller numbers
          width = this.layer.name === "现实" ? "15rem" : "20rem";
          break;
        case 5:
          // Challenges can potentially be very long, but this is glyph level in the reality table
          width = this.layer.name === "现实" ? "10rem" : "20rem";
          break;
        default:
          width = "13rem";
      }
      return {
        width,
        border: "0.05rem solid #999999",
        margin: "-0.05rem",
        padding: "0.2rem 0",
        "border-bottom-width": isHeader ? "0.3rem" : "0.1rem",
        "font-weight": isHeader ? "bold" : null,
        color: "var(--color-text)",
      };
    }
  },
  template: `
  <div v-if="condition">
    <div
      class="c-past-runs-header"
      @click="toggleShown"
    >
      <span class="o-run-drop-down-icon">
        <i :class="dropDownIconClass" />
      </span>
      <span>
        <h3>最近 {{ formatInt(10) }} 次{{ singular }}：</h3>
      </span>
    </div>
    <div v-show="shown">
      <div
        class="c-row-container"
        data-v-past-prestige-runs-container
      >
        <span
          v-for="(entry, col) in infoCol()"
          :key="col"
          :style="cellStyle(col, true)"
        >
          {{ entry }}
        </span>
      </div>
      <div
        v-for="(run, index) in runs"
        :key="index"
      >
        <span
          v-if="run[0] === Number.MAX_VALUE"
          class="c-empty-row"
          data-v-past-prestige-runs-container
        >
          <i v-if="index === 10">
            无可用{{ singular }}时无法计算平均值。
          </i>
          <i v-else>
            尚未完成第 {{ formatInt(index + 1) }} 次{{ singular }}。
          </i>
        </span>
        <span
          v-else
          class="c-row-container"
          data-v-past-prestige-runs-container
        >
          <span
            v-for="(entry, col) in infoArray(run, index)"
            :key="10 * index + col"
            :style="cellStyle(col, false)"
          >
            {{ entry }}
          </span>
        </span>
      </div>
      <br>
    </div>
  </div>
  `
};