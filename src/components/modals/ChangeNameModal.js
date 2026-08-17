import ModalWrapperChoice from "./ModalWrapperChoice.js";

export default {
  name: "ChangeNameModal",
  components: {
    ModalWrapperChoice,
  },
  data() {
    return {
      input: "",
      actualName: ""
    };
  },
  created() {
    this.input = player.speedrun.name;
    this.actualName = Speedrun.generateName(this.input);
  },
  mounted() {
    this.$refs.input.select();
  },
  methods: {
    updateName() {
      this.actualName = Speedrun.generateName(this.input);
    },
    confirmChange() {
      player.speedrun.name = this.actualName;
      this.emitClose();
    },
  },
  template: `
  <ModalWrapperChoice @confirm="confirmChange">
    <template #header>
      修改速通玩家名称
    </template>
    <input
      ref="input"
      v-model="input"
      type="text"
      class="c-modal-input c-modal-import__input"
      @keyup="updateName"
      @keyup.enter="confirmChange"
      @keyup.esc="emitClose"
    >
    <i>
      一旦计时器开始，名称将无法再更改，且字符数上限为 {{ formatInt(40) }} 个。
    </i>
    <div>
      你的新名称将是 {{ actualName }}。
    </div>
    <template #confirm-text>
      修改名称
    </template>
  </ModalWrapperChoice>
  `
};