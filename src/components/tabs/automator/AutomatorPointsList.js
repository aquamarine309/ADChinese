export default {
  name: "AutomatorPointsList",
  data() {
    return {
      totalPoints: 0,
    };
  },
  computed: {
    pointsForAutomator: () => AutomatorPoints.pointsForAutomator,
    fromPerks: () => AutomatorPoints.pointsFromPerks,
    fromUpgrades: () => AutomatorPoints.pointsFromUpgrades,
    perkSources: () => AutomatorPoints.perks,
    upgradeSources: () => AutomatorPoints.upgrades,
    otherSources: () => GameDatabase.reality.automator.otherAutomatorPoints,
    automatorInterval: () => AutomatorBackend.currentInterval,
  },
  methods: {
    update() {
      this.totalPoints = AutomatorPoints.totalPoints;
    },
    textColor(hasBought) {
      return {
        color: hasBought ? "var(--color-good)" : "var(--color-bad)"
      };
    }
  },
  template: `
  <div>
    <div
      class="l-header"
      data-v-automator-points-list
    >
      You have {{ formatInt(totalPoints) }} / {{ formatInt(pointsForAutomator) }}
      Automator Points towards unlocking the Automator.
      <br>
      You gain Automator Points from the following sources:
    </div>
    <div
      class="l-automator-points-list-container"
      data-v-automator-points-list
    >
      <div
        class="l-automator-points-list-side-col c-automator-points-list-col"
        data-v-automator-points-list
      >
        <span
          class="c-automator-points-list-symbol fas fa-project-diagram"
          data-v-automator-points-list
        />
        <span
          class="c-automator-points-list-ap--large"
          data-v-automator-points-list
        >{{ formatInt(fromPerks) }} AP</span>
        <span
          class="l-large-text"
          data-v-automator-points-list
        >
          Perks
        </span>
        <div
          v-for="perk in perkSources"
          :key="perk.id"
          class="c-automator-points-list-single-entry"
          :style="textColor(perk.isBought)"
          data-v-automator-points-list
        >
          <span
            class="c-automator-points-list-perk-label"
            data-v-automator-points-list
          >{{ perk.label }}</span>
          - {{ perk.shortDescription }}
          <span
            class="c-automator-points-list-ap"
            data-v-automator-points-list
          >{{ formatInt(perk.automatorPoints) }} AP</span>
        </div>
      </div>
      <div
        class="l-automator-points-list-center-col"
        data-v-automator-points-list
      >
        <div
          v-for="source in otherSources"
          :key="source.name"
          class="c-automator-points-list-cell"
          data-v-automator-points-list
        >
          <span
            class="c-automator-points-list-ap--large"
            data-v-automator-points-list
          >{{ formatInt(source.automatorPoints()) }} AP</span>
          <span
            class="l-large-text"
            data-v-automator-points-list
          >
            {{ source.name }}
          </span>
          <br>
          <br>
          <span
            :style="textColor(source.automatorPoints() > 0)"
            data-v-automator-points-list
          >
            {{ source.shortDescription() }}
          </span>
          <span
            class="c-automator-points-list-symbol"
            v-html="source.symbol"
            data-v-automator-points-list
          />
        </div>
      </div>
      <div
        class="l-automator-points-list-side-col c-automator-points-list-col"
        data-v-automator-points-list
      >
        <span
          class="c-automator-points-list-symbol fas fa-arrow-up"
          data-v-automator-points-list
        />
        <span
          class="c-automator-points-list-ap--large"
          data-v-automator-points-list
        >{{ formatInt(fromUpgrades) }} AP</span>
        <span
          class="l-large-text"
          data-v-automator-points-list
        >
          Reality Upgrades
        </span>
        <div
          v-for="upgrade in upgradeSources"
          :key="upgrade.id"
          class="c-automator-points-list-single-entry l-upgrade-list"
          :style="textColor(upgrade.isBought)"
          data-v-automator-points-list
        >
          <b>{{ upgrade.name }}</b>
          <span
            class="c-automator-points-list-ap"
            data-v-automator-points-list
          >{{ formatInt(upgrade.automatorPoints) }} AP</span>
          <br>
          {{ upgrade.shortDescription }}
        </div>
      </div>
    </div>
    <br>
    <div>
      The Automator allows (amongst other things) buying full Time Study Trees, entering Eternity Challenges,
      or starting Dilation.
      <br>
      It can also force prestige events on certain conditions independently from your Autobuyers or modify
      some of your Autobuyer settings.
      <br>
      The speed of the Automator gradually increases as you get more Realities. If unlocked right now,
      it would run {{ format(1000 / automatorInterval, 2, 2) }} commands per real-time second.
    </div>
  </div>
  `
};