import LoadGameEntry from "./LoadGameEntry.js";
import ModalWrapperOptions from "./options/ModalWrapperOptions.js";

export default {
  name: "LoadGameModal",
  components: {
    ModalWrapperOptions,
    LoadGameEntry
  },
  template: `
  <ModalWrapperOptions>
    <template #header>
      存档选择：
    </template>
    <LoadGameEntry
      v-for="id in 3"
      :key="id"
      :save-id="id - 1"
      class="c-entry-border"
      data-v-load-game-modal
    />
  </ModalWrapperOptions>
  `
};