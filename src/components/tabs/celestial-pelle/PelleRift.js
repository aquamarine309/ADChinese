import wordShift from "../../../core/word-shift.js";

import PelleRiftBar from "./PelleRiftBar.js";
import PelleStrike from "./PelleStrike.js";

export default {
  name: "PelleRift",
  components: {
    PelleStrike,
    PelleRiftBar
  },
  props: {
    strike: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      hasStrike: false,
      isActive: false,
      isMaxed: false,
      totalFill: new Decimal(),
      resource: new Decimal(),
      hasEffectiveFill: false,
      effects: []
    };
  },
  computed: {
    rift() {
      return this.strike.rift;
    },
    // We treat the 3rd rift slightly differently because it drains the 2nd rift, meaning it needs the word cycle
    // and a bit of additional UI info
    specialRift() {
      return this.rift.id === 3;
    },
    infoTooltip() {
      return `The Replicanti requirement for the 2nd Rift is based on the total amount you have ever filled, including
        any amount drained to fill this Rift.`;
    }
  },
  methods: {
    update() {
      this.hasStrike = this.strike.hasStrike;
      if (!this.hasStrike) return;
      const rift = this.rift;
      this.effects = this.rift.effects;
      this.isActive = rift.isActive;
      this.isMaxed = rift.isMaxed || Pelle.hasGalaxyGenerator;
      this.setValue("totalFill", rift.totalFill);
      this.setValue("resource", rift.fillCurrency.value);
      this.hasEffectiveFill = rift.key === "decay" && PelleRifts.chaos.milestones[0].canBeApplied;
    },
    // One rift has a number and the others are all Decimals; this reduces boilerplate for setting multiple values
    setValue(key, value) {
      if (typeof value === "number") this[key] = value;
      else this[key].copyFrom(value);
    },
    // One-off formatting function; needs to format large Decimals and a small number assumed to be a percentage
    formatRift(value) {
      return typeof value === "number" ? `${formatInt(100 * value)}%` : format(value, 2);
    },
    riftName() {
      return wordShift.wordCycle(this.rift.name, true);
    },
    drainResource() {
      return this.specialRift
        ? wordShift.wordCycle(this.rift.drainResource)
        : this.rift.drainResource;
    }
  },
  template: `
  <div
    v-if="hasStrike"
    class="c-pelle-single-bar"
    data-v-pelle-rift
  >
    <div
      class="c-pelle-rift"
      data-v-pelle-rift
    >
      <div
        class="c-pelle-rift-row"
        data-v-pelle-rift
      >
        <div
          class="c-pelle-rift-column c-pelle-rift-status"
          data-v-pelle-rift
        >
          <h2
            class="c-pelle-rift-name-header"
            data-v-pelle-rift
          >
            {{ riftName() }}
          </h2>
          <div
            class="c-pelle-rift-rift-info-container"
            data-v-pelle-rift
          >
            <div
              v-for="(effect, idx) in effects"
              :key="idx"
              data-v-pelle-rift
            >
              {{ effect || "" }}
            </div>
          </div>
        </div>
        <div
          class="c-pelle-rift-column"
          data-v-pelle-rift
        >
          <PelleStrike
            :strike="strike"
            data-v-pelle-rift
          />
          <PelleRiftBar
            :rift="rift"
            data-v-pelle-rift
          />
        </div>
        <div
          class="c-pelle-rift-status"
          data-v-pelle-rift
        >
          <div
            class="c-pelle-rift-fill-status"
            data-v-pelle-rift
          >
            <h2
              class="c-pelle-rift-name-header"
              data-v-pelle-rift
            >
              {{ riftName() }}
            </h2>
            <div
              class="c-pelle-rift-rift-info-container"
              data-v-pelle-rift
            >
              消耗 {{ drainResource() }} 填充。
              <span
                v-if="specialRift"
                :ach-tooltip="infoTooltip"
                data-v-pelle-rift
              >
                <i
                  class="fas fa-question-circle"
                  data-v-pelle-rift
                />
              </span>
              <br>
              <template v-if="!isMaxed">
                当前数量：{{ formatRift(resource) }}
              </template>
              <br>
              已填充：{{ formatRift(rift.totalFill) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
};