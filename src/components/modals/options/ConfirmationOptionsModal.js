import ConfirmationOptionsEntry from "./ConfirmationOptionsEntry.js";
import ModalWrapperOptions from "./ModalWrapperOptions.js";

export default {
  name: "ConfirmationOptionsModal",
  components: {
    ModalWrapperOptions,
    ConfirmationOptionsEntry,
  },
  computed: {
    count() {
      return ConfirmationTypes.index.length;
    },
    noConfirmations() {
      return ConfirmationTypes.index.every(x => !x.isUnlocked());
    }
  },
  template: `
  <ModalWrapperOptions class="c-modal-options__large">
    <template #header>
      确认选项
    </template>
    <div class="c-modal-options__button-container">
      <span v-if="noConfirmations">
        暂无需要确认的操作，若有相关操作将显示于此。
      </span>
      <ConfirmationOptionsEntry
        v-for="entryNumber in count"
        :key="entryNumber"
        :index="entryNumber - 1"
      />
    </div>
  </ModalWrapperOptions>
  `
};