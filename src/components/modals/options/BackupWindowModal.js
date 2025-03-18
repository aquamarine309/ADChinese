import BackupEntry from './BackupEntry.js'
import ModalWrapper from '../ModalWrapper.js'
import PrimaryButton from '../../PrimaryButton.js'

import { AutoBackupSlots } from '../../../core/storage/index.js'
import { STEAM } from '../../../env.js'

export default {
  name: 'BackupWindowModal',
  components: {
    ModalWrapper,
    BackupEntry,
    PrimaryButton,
  },
  data() {
    return {
      // Used to force a key-swap whenever a save happens, to make unused slots immediately update
      nextSave: 0,
      ignoreOffline: false,
    }
  },
  computed: {
    backupSlots: () => AutoBackupSlots,
    deleteText: () => (STEAM ? '完全卸载游戏' : '清除浏览器cookie'),
  },
  watch: {
    ignoreOffline(newValue) {
      player.options.loadBackupWithoutOffline = newValue
    },
  },
  methods: {
    update() {
      this.nextSave = Object.values(GameStorage.lastBackupTimes)
        .map((t) => t && t.backupTimer)
        .sum()
      this.ignoreOffline = player.options.loadBackupWithoutOffline
    },
    offlineOptionClass() {
      return {
        'c-modal__confirmation-toggle__checkbox': true,
        'c-modal__confirmation-toggle__checkbox--active': this.ignoreOffline,
      }
    },
    toggleOffline() {
      this.ignoreOffline = !this.ignoreOffline
    },
    importAsFile(event) {
      // This happens if the file dialog is canceled instead of a file being selected
      if (event.target.files.length === 0) return

      const reader = new FileReader()
      reader.onload = function () {
        GameStorage.importBackupsFromFile(reader.result)
      }
      reader.readAsText(event.target.files[0])
    },
  },
  template: `
<ModalWrapper>
    <template #header>
      自动备份存档
    </template>
    <div
      class="c-info c-modal--short"
      data-v-backup-window-modal
    >
      游戏会根据您在线或离线的时长自动创建备份。
      在线备份的计时器仅在游戏运行时生效，而离线备份仅保存到适用计时器最长的存档槽。
      此外，每当从此处加载备份时，您的当前存档会保存到最后一个存档槽。
      <div
        class="c-modal__confirmation-toggle"
        @click="toggleOffline"
      >
        <div :class="offlineOptionClass()">
          <span
            v-if="ignoreOffline"
            class="fas fa-check"
          />
        </div>
        <span class="c-modal__confirmation-toggle__text">
          加载时禁用离线进度
        </span>
      </div>
      <div
        class="c-entry-container"
        data-v-backup-window-modal
      >
        <BackupEntry
          v-for="slot in backupSlots"
          :key="nextSave + slot.id"
          class="l-backup-entry"
          :slot-data="slot"
          data-v-backup-window-modal
        />
      </div>
      这些备份仍存储在您的游戏存档相同的位置，如果您执行任何可能删除存档的外部操作（例如{{ deleteText }}），备份仍可能丢失。
      您可以使用以下按钮将所有备份一次性导入/导出为文件：
      <div
        class="c-backup-file-ops"
        data-v-backup-window-modal
      >
        <PrimaryButton
          class="o-btn-file-ops"
          onclick="GameStorage.exportBackupsAsFile()"
          data-v-backup-window-modal
        >
          导出为文件
        </PrimaryButton>
        <PrimaryButton
          class="o-btn-file-ops"
          data-v-backup-window-modal
        >
          <input
            class="c-file-import"
            type="file"
            accept=".txt"
            @change="importAsFile"
          >
          <label for="file">从文件导入</label>
        </PrimaryButton>
      </div>
      您的三个存档槽各自拥有独立的备份集。
    </div>
  </ModalWrapper>
  `,
}
