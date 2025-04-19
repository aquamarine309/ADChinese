export default {
  name: "NewGame",
  data() {
    return {
      opacity: 0,
      visible: false,
      hasMoreCosmetics: false,
      selectedSetName: "",
    };
  },
  computed: {
    style() {
      return {
        opacity: this.opacity,
        visibility: this.visible ? "visible" : "hidden",
      };
    }
  },
  methods: {
    update() {
      this.visible = GameEnd.endState > END_STATE_MARKERS.SHOW_NEW_GAME && !GameEnd.removeAdditionalEnd;
      this.opacity = (GameEnd.endState - END_STATE_MARKERS.SHOW_NEW_GAME) * 2;
      this.hasMoreCosmetics = GlyphAppearanceHandler.lockedSets.length > 0;
      this.selectedSetName = GlyphAppearanceHandler.chosenFromModal?.name ?? "未选定（随机选择）";
    },
    startNewGame() {
      NG.startNewGame();
    },
    openSelectionModal() {
      Modal.cosmeticSetChoice.show();
    }
  },
  template: `
  <div
    class="c-new-game-container"
    :style="style"
    data-v-new-game
  >
    <h2>
      重置整个游戏，保留自动机脚本、研究预设、隐藏主题、隐藏成就、选项设置和同伴符文。
    </h2>
    <h3>你可以使用右上角的按钮，查看此时的游戏。</h3>
    <div
      class="c-new-game-button-container"
      data-v-new-game
    >
      <button
        class="c-new-game-button"
        @click="startNewGame"
        data-v-new-game
      >
        再玩一遍？
      </button>
    </div>
    <br>
    <h3 v-if="hasMoreCosmetics">
      通关游戏之后，你可以选择一组符文皮肤。当你再次进行现实之后，你可以用已解锁的符文皮肤，自由地改变符文的外观。符文皮肤不会为游戏提供加成。
      <br>
      <button
        class="c-new-game-button"
        @click="openSelectionModal"
        data-v-new-game
      >
        选择一组符文皮肤
      </button>
      <br>
      <br>
      选中的皮肤：{{ selectedSetName }}
    </h3>
    <h3 v-else>
      你已解锁所有符文皮肤！
    </h3>
    <br>
    <h3>
      你也可以导入“speedrun”，以进入带有统计追踪信息的速通模式，重新开始游戏。
    </h3>
  </div>
  `
};