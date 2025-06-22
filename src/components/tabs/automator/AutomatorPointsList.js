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
      你有 {{ formatInt(totalPoints) }} / {{ formatInt(pointsForAutomator) }} 自动点数，用于解锁自动机。
      <br>
      你可以通过以下来源获得自动点数：
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
          复兴树
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
          >{{ formatInt(perk.automatorPoints) }} 自动点数</span>
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
          >{{ formatInt(source.automatorPoints()) }} 自动点数</span>
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
        >{{ formatInt(fromUpgrades) }} 自动点数</span>
        <span
          class="l-large-text"
          data-v-automator-points-list
        >
          现实升级
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
          >{{ formatInt(upgrade.automatorPoints) }} 自动点数</span>
          <br>
          {{ upgrade.shortDescription }}
        </div>
      </div>
    </div>
    <br>
    <div>
      自动机可以购买时间研究、进入永恒挑战或进入时间膨胀。
      <br>
      自动机使用一种自定义的脚本语言。除未提及的其他自动化功能外，它能购买完整的时间研究树，进入永恒挑战或启动时间膨胀。在某些条件下，它还可以无视自动购买器的设置，强制进行重置（无限/永恒/现实），或修改一些自动购买器设置。
      <br>
      自动机的运行速度会随着现实次数的不断增加而逐渐加快。如果自动机现在解锁，它将以每秒 {{ format(1000 / automatorInterval, 2, 2) }} 条指令的速度运行。
    </div>
  </div>
  `
};