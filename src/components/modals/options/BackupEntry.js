import PrimaryButton from '../../PrimaryButton.js'

import { BACKUP_SLOT_TYPE } from '../../../core/storage/index.js'

export default {
  name: 'BackupEntry',
  components: {
    PrimaryButton,
  },
  props: {
    slotData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currTime: 0,
    }
  },
  computed: {
    save() {
      return GameStorage.loadFromBackup(this.slotData.id)
    },
    progressStr() {
      if (!this.save) return '(空)'

      // These will be checked in order; the first nonzero resource will be returned
      const resources = [this.save.celestials.pelle.realityShards, this.save.reality.iMCap, this.save.reality.realityMachines, this.save.eternityPoints, this.save.infinityPoints, this.save.antimatter]
      const names = ['现实碎片', '虚幻机器上限', '现实机器', '永恒点数', '无限点数', '反物质']

      for (let index = 0; index < resources.length; index++) {
        const val = new Decimal(resources[index])
        if (val.gt(0)) return `${names[index]}: ${formatPostBreak(val, 2)}`
      }

      // In practice this should never happen, unless a save triggers on the same tick the very first AD1 is bought
      return '无资源'
    },
    slotType() {
      const formattedTime = this.slotData.intervalStr?.()
      switch (this.slotData.type) {
        case BACKUP_SLOT_TYPE.ONLINE:
          return `每 ${formattedTime} 在线时间进行保存`
        case BACKUP_SLOT_TYPE.OFFLINE:
          return `每 ${formattedTime} 离线时间进行保存`
        case BACKUP_SLOT_TYPE.RESERVE:
          return '预加载存档'
        default:
          throw new Error('Unrecognized backup save type')
      }
    },
    lastSaved() {
      const lastSave = GameStorage.lastBackupTimes[this.slotData.id]?.date ?? 0
      return lastSave ? `上次保存时间: ${TimeSpan.fromMilliseconds(this.currTime - lastSave)} ago` : '槽位当前未被使用'
    },
  },
  methods: {
    update() {
      this.currTime = Date.now()
    },
    load() {
      if (!this.save) return
      // This seems to be the only way to properly hide the modal after the save is properly loaded,
      // since the offline progress modal appears nearly immediately after clicking the button
      Modal.hide()

      // We still save to the reserve slot even if we're loading from it, so we temporarily store the
      // save-to-be-loaded into a string in this scope so that it doesn't get overwritten by the current save
      const toLoad = this.save
      GameStorage.saveToReserveSlot()

      GameStorage.ignoreBackupTimer = true
      GameStorage.offlineEnabled = player.options.loadBackupWithoutOffline ? false : undefined
      GameStorage.oldBackupTimer = player.backupTimer
      GameStorage.loadPlayerObject(toLoad)
      GameUI.notify.info(`游戏加载自 #${this.slotData.id}`)
      GameStorage.loadBackupTimes()
      GameStorage.ignoreBackupTimer = false
      GameStorage.offlineEnabled = undefined
      GameStorage.resetBackupTimer()
      GameStorage.save(true)
    },
  },
  template: `
  <div
    class="c-bordered-entry"
    data-v-backup-entry
  >
    <h3>槽位 #{{ slotData.id }}:</h3>
    <span>{{ progressStr }}</span>
    <span>
      {{ slotType }}
    </span>
    <span
      class="c-fixed-height"
      data-v-backup-entry
    >{{ lastSaved }}</span>
    <PrimaryButton
      class="o-primary-btn--width-medium"
      :class="{ 'o-primary-btn--disabled' : !save }"
      @click="load()"
    >
      Load
    </PrimaryButton>
  </div>
  `,
}
