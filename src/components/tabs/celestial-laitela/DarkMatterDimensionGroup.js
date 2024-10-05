import DarkMatterDimensionRow from "./DarkMatterDimensionRow.js";

export default {
  name: "DarkMatterDimensionGroup",
  components: {
    DarkMatterDimensionRow
  },
  template: `
  <span>
    <DarkMatterDimensionRow
      v-for="tier in 4"
      :key="tier"
      :tier="tier"
    />
  </span>
  `
};