export default {
  name: "SpeedrunStatus",
  data() {
    return {
      isActive: false,
      isSegmented: false,
      usedSTD: false,
      hasStarted: false,
      startDate: 0,
      saveName: "",
      timePlayedStr: "",
      offlineProgress: false,
      offlineFraction: 0,
      mostRecent: {},
      isCollapsed: false,
      timeSince: 0,
      seedText: 0,
      canModifySeed: false,
      isComplete: false,
    };
  },
  computed: {
    statusText() {
      if (this.isComplete) return `<span style="color: var(--color-good)">已完成！</span>`;
      return this.hasStarted
        ? `<span style="color: var(--color-good)">正在进行！</span>`
        : `<span style="color: var(--color-bad)">未开始</span>`;
    },
    segmentText() {
      return this.isSegmented ? "分段速通（导出和导入存档）" : "单段速通（无存档导出导入）";
    },
    iapText() {
      return this.usedSTD ? "已使用应用内购" : "不使用应用内购";
    },
    offlineText() {
      const stateText = this.offlineProgress
        ? `<span style="color: var(--color-good)">启用</span>`
        : `<span style="color: var(--color-bad)">已禁用</span>`;
      const fractionText = this.offlineFraction === 0
        ? "未使用离线进度"
        : `离线进度用时 ${formatPercents(this.offlineFraction, 2)}`;
      return `${stateText} （${fractionText}（`;
    },
    collapseIcon() {
      return this.isCollapsed
        ? "fas fa-expand-arrows-alt"
        : "fas fa-compress-arrows-alt";
    }
  },
  methods: {
    update() {
      const speedrun = player.speedrun;
      this.isActive = speedrun.isActive;
      this.canModifySeed = Speedrun.canModifySeed();
      // Short-circuit if speedrun isn't active; updating some later stuff can cause vue errors outside of speedruns
      if (!this.isActive) return;
      this.isSegmented = speedrun.isSegmented;
      this.usedSTD = speedrun.usedSTD;
      this.hasStarted = speedrun.hasStarted;
      this.startDate = speedrun.startDate;
      this.saveName = speedrun.name;
      this.isCollapsed = speedrun.hideInfo;
      this.isComplete = Achievement(188).isUnlocked;

      this.timePlayedStr = Time.realTimePlayed.toStringShort();
      this.offlineProgress = player.options.offlineProgress;
      this.offlineFraction = speedrun.offlineTimeUsed / Math.clampMin(player.records.realTimePlayed, 1);
      this.mostRecent = Speedrun.mostRecentMilestone();
      this.timeSince = Time.realTimePlayed.minus(TimeSpan.fromMilliseconds(speedrun.records[this.mostRecent] ?? 0))
        .toStringShort();
      this.seedText = Speedrun.seedModeText();
    },
    milestoneName(id) {
      const db = GameDatabase.speedrunMilestones;
      return id === 0 ? "无" : db.find(m => m.id === id).name;
    },
    changeName() {
      if (this.hasStarted) return;
      Modal.changeName.show();
    },
    collapseText() {
      return this.isCollapsed ? "展开" : `点击以收起速通信息`;
    },
    toggleCollapse() {
      player.speedrun.hideInfo = !this.isCollapsed;
    },
    openSeedModal() {
      if (!this.canModifySeed) return;
      Modal.modifySeed.show();
    }
  },
  template: `
  <div
    v-if="isActive"
    class="c-speedrun-status"
    data-v-speedrun-status
  >
    <div v-if="!isCollapsed">
      <b>速通状态（<span v-html="statusText" />）</b>
      <br>
      <span
        :class="{ 'c-speedrun-status--can-change': !hasStarted }"
        @click="changeName"
        data-v-speedrun-status
      >
        玩家名：{{ saveName }}
      </span>
      <br>
      <i>{{ segmentText }}</i>
      <br>
      <i>{{ iapText }}</i>
      <br>
      <span
        :class="{ 'c-speedrun-status--can-change': canModifySeed }"
        @click="openSeedModal()"
        data-v-speedrun-status
      >{{ seedText }}</span>
      <br>
      自开始以来所经历的现实时间：{{ timePlayedStr }}
      <br>
      离线进度：<span v-html="offlineText" />
      <br>
      Most Recent Milestone: {{ milestoneName(mostRecent) }} <span v-if="mostRecent">({{ timeSince }} ago)</span>
      <br>
    </div>
    <div
      class="c-speedrun-status--collapse"
      @click="toggleCollapse"
      data-v-speedrun-status
    >
      <i
        :class="collapseIcon"
        data-v-speedrun-status
      />
      {{ collapseText() }}
      <i 
        :class="collapseIcon"
        data-v-speedrun-status
      />
    </div>
  </div>
  `
};