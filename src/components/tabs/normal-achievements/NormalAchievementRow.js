import NormalAchievement from "./NormalAchievement.js";

export default {
  name: "NormalAchievementRow",
  components: {
    NormalAchievement
  },
  props: {
    row: {
      type: Array,
      required: true
    },
    isObscured: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      isCompleted: false,
      isHidden: false
    };
  },
  computed: {
    classObject() {
      return {
        "l-achievement-grid__row": true,
        "c-achievement-grid__row--completed": this.isCompleted
      };
    }
  },
  methods: {
    update() {
      this.isCompleted = this.row.every(a => a.isUnlocked);
      this.isHidden = this.isCompleted && player.options.hideCompletedAchievementRows;
    }
  },
  template: `
  <div
    v-if="!isHidden"
    :class="classObject"
  >
    <normal-achievement
      v-for="(achievement, i) in row"
      :key="i"
      :achievement="achievement"
      :is-obscured="isObscured"
      class="l-achievement-grid__cell"
    />
  </div>
  `
};