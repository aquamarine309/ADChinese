import HeaderCenterContainer from "./prestige-header/HeaderCenterContainer.js";
import HeaderEternityContainer from "./prestige-header/HeaderEternityContainer.js";
import HeaderInfinityContainer from "./prestige-header/HeaderInfinityContainer.js";

export default {
  name: "HeaderPrestigeGroup",
  components: {
    HeaderCenterContainer,
    HeaderEternityContainer,
    HeaderInfinityContainer,
  },
  template: `
  <div
    class="c-prestige-info-blocks"
    data-v-header-prestige-group
  >
    <HeaderEternityContainer
      class="l-game-header__eternity"
      data-v-header-prestige-group
    />
    <HeaderCenterContainer
      class="l-game-header__center"
      data-v-header-prestige-group
    />
    <HeaderInfinityContainer
      class="l-game-header__infinity"
      data-v-header-prestige-group
    />
  </div>
  `
};