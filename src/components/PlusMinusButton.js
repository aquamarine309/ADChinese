export default {
  name: "PlusMinusButton",
  props: {
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    iconClass() {
      return `fas fa-${this.type}`;
    }
  },
  template: `
  <div
    v-repeating-click="{ delay: 500 }"
    class="c-ad-slider__button"
    @firstclick="$emit('click')"
    @repeatclick="$emit('click')"
    data-v-plus-minus-button
  >
    <div :class="iconClass" />
  </div>
  `
};