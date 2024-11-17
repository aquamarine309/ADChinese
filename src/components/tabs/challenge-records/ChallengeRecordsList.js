export default {
  name: "ChallengeRecordsList",
  props: {
    name: {
      type: String,
      required: true
    },
    start: {
      type: Number,
      required: true
    },
    times: {
      type: Array,
      required: true
    }
  },
  computed: {
    timeSum() {
      return this.times.sum();
    },
    completedAllChallenges() {
      return this.timeSum < Number.MAX_VALUE;
    }
  },
  methods: {
    timeDisplayShort,
    completionString(time) {
      return time < Number.MAX_VALUE
        ? `时间纪录：${timeDisplayShort(time)}`
        : "尚未完成";
    }
  },
  template: `
  <div>
    <br>
    <div
      v-for="(time, i) in times"
      :key="i"
    >
      <span>{{ name }} {{ start + i }} {{ completionString(time) }}</span>
    </div>
    <br>
    <div v-if="completedAllChallenges">
      {{ name }}时间纪录的总和是 {{ timeDisplayShort(timeSum) }}
    </div>
    <div v-else>
      所有{{ name }}尚未完成
    </div>
  </div>
  `
};