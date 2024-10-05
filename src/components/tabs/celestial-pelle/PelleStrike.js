import ExpandingControlBox from "../../ExpandingControlBox.js";

export default {
  name: "PelleStrike",
  components: {
    ExpandingControlBox
  },
  props: {
    strike: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      strikeReward: ""
    };
  },
  methods: {
    update() {
      this.strikeReward = this.strike.reward();
    }
  },
  template: `
  <div
    class="c-pelle-strike-container"
    data-v-pelle-strike
  >
    <ExpandingControlBox
      container-class="c-pelle-strike"
      data-v-pelle-strike
    >
      <template #header>
        <div
          class="c-pelle-strike-header"
          data-v-pelle-strike
        >
          ▼ {{ strike.requirement }} ▼
        </div>
      </template>
      <template #dropdown>
        <div
          class="c-pelle-strike-dropdown"
          data-v-pelle-strike
        >
          <span>Penalty: {{ strike.penalty }}</span>
          <br>
          <span>Reward: {{ strikeReward }}</span>
        </div>
      </template>
    </ExpandingControlBox>
  </div>
  `
};