export default {
  name: "GameSpeedDisplay",
  props: {
  },
  data() {
    return {
      baseSpeed: 0,
      pulsedSpeed: 0,
      hasSeenAlteredSpeed: false,
      isStopped: false,
      isEC12: false,
      isPulsing: false,
    };
  },
  computed: {
    baseSpeedText() {
      if (this.isStopped) {
        return "已停止（储存现实时间）";
      }
      const speed = this.formatNumber(this.baseSpeed);
      if (this.isEC12) {
        return `${speed} （固定值）`;
      }
      return speed;
    },
    pulseSpeedText() {
      return this.formatNumber(this.pulsedSpeed);
    },
    baseText() {
      if (!this.hasSeenAlteredSpeed) return null;
      return this.baseSpeed === 1
        ? "游戏目前以正常速度运行。"
        : `游戏速度倍率：${this.baseSpeedText}`;
    }
  },
  methods: {
    update() {
      this.baseSpeed = getGameSpeedupFactor();
      this.pulsedSpeed = getGameSpeedupForDisplay();
      this.hasSeenAlteredSpeed = PlayerProgress.seenAlteredSpeed();
      this.isStopped = Enslaved.isStoringRealTime;
      this.isEC12 = EternityChallenge(12).isRunning;
      this.isPulsing = (this.baseSpeed !== this.pulsedSpeed) && Enslaved.canRelease(true);
    },
    formatNumber(num) {
      if (num >= 0.001 && num < 10000 && num !== 1) {
        return format(num, 3, 3);
      }
      if (num < 0.001) {
        return `${formatInt(1)} / ${format(1 / num, 2)}`;
      }
      return `${format(num, 2)}`;
    }
  },
  template: `
  <span
    class="c-gamespeed"
    data-v-game-speed-display
  >
    <span>
      {{ baseText }}
    </span>
    <span v-if="isPulsing">（<i class="fas fa-expand-arrows-alt u-fa-padding" /> {{ pulseSpeedText }}）</span>
  </span>
  `
};