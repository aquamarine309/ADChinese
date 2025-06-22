import AwayProgressOptionsEntry from "./AwayProgressOptionsEntry.js";
import ModalWrapperOptions from "./ModalWrapperOptions.js";

export default {
  name: "AwayProgressOptionsModal",
  components: {
    AwayProgressOptionsEntry,
    ModalWrapperOptions,
  },
  computed: {
    all() {
      return AwayProgressTypes.showOption;
    }
  },
  template: `
  <ModalWrapperOptions
    class="l-wrapper"
    data-v-modal-wrapper-options
  >
    <template #header>
      离线进度选项
    </template>
    <div class="c-modal-options__button-container">
      <AwayProgressOptionsEntry
        v-for="name of all"
        :key="name"
        :name="name"
      />
    </div>
    注：所选资源仅在增长时显示。
  </ModalWrapperOptions>
  `
};