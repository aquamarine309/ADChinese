export default {
  name: 'SaveTimer',
  data() {
    return {
      currentTime: 0,
      cloudSaveEnabled: false,
      lastLocalSave: 0,
      lastCloudSave: 0,
      showTimeSinceSave: false,
      saveDisabled: false,
    }
  },
  computed: {
    timeString() {
      const localStr = timeDisplayShort(this.currentTime - this.lastLocalSave)
      const cloudStr = timeDisplayShort(this.currentTime - this.lastCloudSave)
      return this.cloudSaveEnabled ? `${localStr} （本地） | ${cloudStr} （云端）` : localStr
    },
  },
  methods: {
    update() {
      this.currentTime = Date.now()
      this.cloudSaveEnabled = player.options.cloudEnabled && Cloud.loggedIn
      this.lastLocalSave = GameStorage.lastSaveTime
      this.lastCloudSave = GameStorage.lastCloudSave
      this.showTimeSinceSave = player.options.showTimeSinceSave
      this.saveDisabled = GameEnd.endState >= END_STATE_MARKERS.INTERACTIVITY_DISABLED
    },
    save() {
      GameStorage.save(false, true)
    },
  },
  template: `
  <div
    v-if="showTimeSinceSave"
    class="o-save-timer"
    @click="save"
    data-v-save-timer
  >
    <b v-if="saveDisabled">已经没有什么好保存的了😇</b>
    <span v-else>距离上次存档：{{ timeString }}</span>
  </div>
  `,
}
