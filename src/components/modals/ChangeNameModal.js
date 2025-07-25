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
      This can no longer be changed once the timer starts, and there is a limit of {{ formatInt(40) }} characters.
    </i>
    <div>
      Your new name will be {{ actualName }}
    </div>
    <template #confirm-text>
      Change Name
    </template>
  </ModalWrapperChoice>
  `
};