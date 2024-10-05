import wordShift from "../../../core/word-shift.js";

import CustomizeableTooltip from "../../CustomizeableTooltip.js";

export default {
  name: "PelleRiftBar",
  components: {
    CustomizeableTooltip
  },
  props: {
    rift: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      isActive: false,
      isMaxed: false,
      percentage: 0,
      reducedTo: 0,
      hasEffectiveFill: false,
      selectedHoverMilestone: this.rift.milestones[0],
      // Converts 1 rem to number of px
      remToPx: parseInt(getComputedStyle(document.documentElement).fontSize, 10),
      effects: [],
      selectedMilestoneResourceText: "",
      selectedMilestoneDescriptionText: "",
    };
  },
  computed: {
    tooltipArrowStyle() {
      return {
        borderTop: "0.55rem solid var(--color-pelle--base)"
      };
    }
  },
  methods: {
    update() {
      const rift = this.rift;
      this.effects = rift.effects;
      this.isActive = rift.isActive;
      this.isMaxed = rift.isMaxed || Pelle.hasGalaxyGenerator;
      this.percentage = rift.percentage;
      this.reducedTo = rift.reducedTo;
      this.hasEffectiveFill = rift.config.key === "decay" && PelleRifts.chaos.milestones[0].canBeApplied;

      this.selectedMilestoneResourceText = this.milestoneResourceText(this.selectedHoverMilestone);
      this.selectedMilestoneDescriptionText = this.milestoneDescriptionText(this.selectedHoverMilestone);
    },
    hasMilestone(ms) {
      return ms.canBeApplied;
    },
    milestoneResourceText(milestone) {
      const rift = this.rift;
      return `${formatPercents(milestone.requirement)}
      (${this.formatRift(rift.config.percentageToFill(milestone.requirement))} \
      ${rift.id === 3 ? wordShift.wordCycle(PelleRifts.decay.name) : rift.drainResource})`;
    },
    milestoneDescriptionText(milestone) {
      if (typeof milestone.description === "string") return milestone.description;
      return milestone.description();
    },
    // One-off formatting function; needs to format large Decimals and a small number assumed to be an integer percent
    formatRift(value) {
      return typeof value === "number" ? `${formatInt(100 * value)}%` : format(value, 2);
    },
    toggle() {
      if (!this.isMaxed) this.rift.toggle();
    },
    barOverlay() {
      const overfill = this.percentage > 1;
      return {
        "o-pelle-rift-bar-permanent": !overfill && this.hasEffectiveFill,
        "o-pelle-rift-bar-overfilled": overfill,
      };
    },
    handleMilestoneRequirementTooltipDisplay(event) {
      const mouseX = event.clientX - this.$refs.pelleRiftBar.getBoundingClientRect().x;

      const milestonesCloseTo = this.rift.milestones.filter(m => {
        // Gets distance from the milestone bar in terms of rem
        // 31.6: the width of the bar is 32 rem, but adjusted to a border with 0.2rem on both sides
        const dist = Math.abs((m.requirement * 31.6) - mouseX / this.remToPx);
        if (dist < 1) m.dist = dist;
        return dist < 1;
      }).map(m => {
        const dist = m.dist;
        delete m.dist;
        // Temporarily store the distance without recalculation to sort the list by distance
        // and get the closest item
        return { dist, m };
      });

      if (milestonesCloseTo.length) {
        this.selectedHoverMilestone = milestonesCloseTo.sort((a, b) => a.dist - b.dist)[0].m;
      }
    },
    tooltipContentClass() {
      const hasMilestone = this.hasMilestone(this.selectedHoverMilestone);
      return {
        "c-pelle-milestone-tooltip": true,
        "c-pelle-milestone-tooltip--unlocked": hasMilestone
      };
    },
  },
  template: `
  <div
    ref="pelleRiftBar"
    class="c-pelle-rift-bar"
    :class="{
      'c-pelle-rift-bar-overfill-container': percentage > 1,
      'c-pelle-rift-bar--idle': !isActive && !isMaxed,
      'c-pelle-rift-bar--filling': isActive
    }"
    @mousemove="handleMilestoneRequirementTooltipDisplay"
    @click="toggle"
    data-v-pelle-rift-bar
  >
    <div
      class="l-overflow-hidden"
      data-v-pelle-rift-bar
    >
      <!-- Note: These are separate because permanent and animated fill both use the same positional attributes -->
      <div
        :class="barOverlay()"
        data-v-pelle-rift-bar
      />
      <div
        class="o-pelle-rift-bar-fill"
        :style="{
          width: \`\${Math.clampMax(percentage * 100, 100)}%\`,
        }"
        data-v-pelle-rift-bar
      />
      <div
        v-if="reducedTo < 1"
        class="o-pelle-rift-bar-reducedto"
        :style="{
          width: \`\${Math.clampMax(100 - reducedTo * 100, 100)}%\`,
        }"
        data-v-pelle-rift-bar
      />
      <!-- This bar overlay adds the shadow within the bar so the ugly edges don't show -->
      <div
        class="o-pelle-rift-bar-overlay"
        data-v-pelle-rift-bar
      />
      <div
        v-if="isActive && !isMaxed"
        class="o-pelle-rift-bar-active-fill"
        data-v-pelle-rift-bar
      />
      <div
        v-for="(milestone, idx) in rift.milestones"
        :key="'milestone-line-' + idx"
        class="o-pelle-rift-bar-milestone-line"
        :class="{
          'o-pelle-rift-bar-milestone-line--unlocked': hasMilestone(milestone),
          'o-pelle-rift-bar-milestone-line--disabled': reducedTo < milestone.requirement
        }"
        :style="{
          left: \`calc(\${milestone.requirement * 100}% - 0.25rem)\`
        }"
        data-v-pelle-rift-bar
      />
    </div>
    <div
      class="o-pelle-rift-bar-percentage"
      data-v-pelle-rift-bar
    >
      {{ formatPercents(percentage, 3) }}
      <span v-if="!isMaxed">({{ isActive ? "正在填充" : "待机" }})</span>
    </div>
    <CustomizeableTooltip
      class="o-pelle-rift-bar-milestone-hover-container"
      :tooltip-class="tooltipContentClass()"
      :tooltip-arrow-style="tooltipArrowStyle"
      :left="\`calc(\${selectedHoverMilestone.requirement * 100}% - 0.1rem)\`"
      content-class="o-pelle-rift-bar-milestone-hover-area"
      data-v-pelle-rift-bar
    >
      <template #tooltipContent>
        {{ selectedMilestoneResourceText }}
        <br>
        <br>
        {{ selectedMilestoneDescriptionText }}
      </template>
    </CustomizeableTooltip>
  </div>
  `
};