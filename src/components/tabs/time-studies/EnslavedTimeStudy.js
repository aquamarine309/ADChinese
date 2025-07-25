export default {
  name: "EnslavedTimeStudy",
  props: {
    setup: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isVisible: player.celestials.enslaved.hasSecretStudy,
    };
  },
  computed: {
    enslavedTT: () => 100,
    styleObject() {
      return {
        top: `${this.setup.top}rem`,
        left: `${this.setup.left}rem`
      };
    },
    classObject() {
      return {
        "l-time-study": true,
        "o-time-study": true,
        "o-time-study--bought": true,
        "o-time-study-normal": true,
        "o-time-study-normal--bought": true,
        "o-time-study--enslaved": true,
        "o-time-study--enslaved-unlocked": this.isVisible,
      };
    }
  },
  methods: {
    update() {
      this.isVisible = Enslaved.isRunning && player.celestials.enslaved.hasSecretStudy;
    },
    handleClick() {
      if (!Enslaved.isRunning || player.celestials.enslaved.hasSecretStudy) return;
      player.celestials.enslaved.hasSecretStudy = true;
      EnslavedProgress.secretStudy.giveProgress();
      Currency.timeTheorems.add(this.enslavedTT);
    },
  },
  template: `
  <button
    ref="study"
    :class="classObject"
    :style="styleObject"
    @click="handleClick"
  >
    <span>
      … 你的 … 潜力无穷 …
      <br>
      <br>
      价格：{{ format(-enslavedTT) }} 时间之理
    </span>
  </button>
  `
};