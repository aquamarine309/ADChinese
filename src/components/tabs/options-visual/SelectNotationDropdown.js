export default {
  name: "SelectNotationDropdown",
  computed: {
    notations: () => Notations.all,
  },
  template: `
  <div class="l-select-notation">
    <div class="l-select-notation__inner">
      <div
        v-for="notation in notations"
        :key="notation.name"
        class="o-primary-btn l-select-notation__item c-select-notation__item"
        @click="notation.setAsCurrent()"
      >
        {{ notation.chineseName }}
      </div>
    </div>
  </div>
  `
};
