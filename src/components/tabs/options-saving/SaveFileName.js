export default {
  name: 'SaveFileName',
  components: {},
  data() {
    return {
      saveFileName: '',
    }
  },
  methods: {
    update() {
      this.saveFileName = player.options.saveFileName
    },
    removeNotAvailableCharacters(input) {
      return input.replace(/[^a-zA-Z0-9 -]/gu, '')
    },
    handleChange(event) {
      const newName = this.removeNotAvailableCharacters(event.target.value.trim())
      player.options.saveFileName = newName
      event.target.value = newName
    },
  },
  template: `
  <div class="o-primary-btn o-primary-btn--option o-primary-btn--input l-options-grid__button">
    <b>Save file name:</b>
    <span ach-tooltip="设置自定义名称（最多 16 个字母数字字符，包括空格和连字符）">
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
  `,
}
