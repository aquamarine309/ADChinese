export default {
  name: "SaveFileName",
  components: {
  },
  data() {
    return {
      saveFileName: ""
    };
  },
  methods: {
    update() {
      this.saveFileName = player.options.saveFileName;
    },
    removeNotAvailableCharacters(input) {
      return input.replace(/[^a-zA-Z0-9 -]/gu, "");
    },
    handleChange(event) {
      const newName = this.removeNotAvailableCharacters(event.target.value.trim());
      player.options.saveFileName = newName;
      event.target.value = newName;
    }
  },
  template: `
  <div class="o-primary-btn o-primary-btn--option o-primary-btn--input l-options-grid__button">
    <b>Save file name:</b>
    <span ach-tooltip="Set a custom name (up to 16 alphanumeric characters, including space and hyphen)">
      <input
        class="c-custom-save-name__input"
        type="text"
        maxlength="16"
        placeholder="Custom save name"
        :value="saveFileName"
        @change="handleChange"
        data-v-save-file-name
      >
    </span>
  </div>
  `
};