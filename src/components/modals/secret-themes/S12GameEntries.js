import S12Games from "./s12-games.js";

let isSelectingGame = false;
export default {
  name: "S12Games",
  data() {
    return {
      S12Games
    };
  },
  mounted() {
    document.body.addEventListener("click", this.clearSelected);
  },
  beforeDestroy() {
    document.body.removeEventListener("click", this.clearSelected);
    this.clearSelected();
  },
  methods: {
    clearSelected() {
      if (isSelectingGame) return;
      S12Games.selected = -1;
    },
    handleClick(idx) {
      // This makes what everything is doing clearer
      // eslint-disable-next-line no-negated-condition
      if (S12Games.selected !== idx) {
        S12Games.selected = idx;
        isSelectingGame = true;
        setTimeout(() => isSelectingGame = false, 0);
      } else {
        window.open(S12Games.entries[idx].link);
      }
    }
  },
  template: `
  <div
    class="c-s12-games-container"
    data-v-s12-game-entries
  >
    <div
      v-for="(game, idx) in S12Games.entries"
      :key="game.name"
      class="c-s12-game"
      :class="{ 'c-s12-game--selected': S12Games.selected === idx, }"
      @click="handleClick(idx)"
      data-v-s12-game-entries
    >
      <div
        class="c-s12-game__inner"
        data-v-s12-game-entries
      >
        <img
          :src="\`./public/images/s12/\${game.image}\`"
          class="c-s12-game__img"
          data-v-s12-game-entries
        >
        <div
          class="c-s12-game__text"
          data-v-s12-game-entries
        >
          {{ game.name }}
        </div>
      </div>
    </div>
  </div>
  `
};