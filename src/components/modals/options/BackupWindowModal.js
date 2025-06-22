import BackupEntry from "./BackupEntry.js";
import ModalWrapper from "../ModalWrapper.js";
import PrimaryButton from "../../PrimaryButton.js";

import { AutoBackupSlots } from "../../../core/storage/index.js";
import { STEAM } from "../../../env.js";

export default {
  name: "BackupWindowModal",
  components: {
    ModalWrapper,
    BackupEntry,
    PrimaryButton
  },
  data() {
    return {
      // Used to force a key-swap whenever a save happens, to make unused slots immediately update
      nextSave: 0,
      ignoreOffline: false,
    };
  },
  computed: {
    backupSlots: () => AutoBackupSlots,
    deleteText: () => (STEAM ? "完全卸载游戏" : "清除浏览器缓存"),
  },
  watch: {
    ignoreOffline(newValue) {
      player.options.loadBackupWithoutOffline = newValue;
    },
  },
  methods: {
    update() {
      this.nextSave = Object.values(GameStorage.lastBackupTimes).map(t => t && t.backupTimer).sum();
      this.ignoreOffline = player.options.loadBackupWithoutOffline;
    },
    offlineOptionClass() {
      return {
        "c-modal__confirmation-toggle__checkbox": true,
        "c-modal__confirmation-toggle__checkbox--active": this.ignoreOffline
      };
    },
    toggleOffline() {
      this.ignoreOffline = !this.ignoreOffline;
    },
    importAsFile(event) {
      // This happens if the file dialog is canceled instead of a file being selected
      if (event.target.files.length === 0) return;

      const reader = new FileReader();
      reader.onload = function() {
        GameStorage.importBackupsFromFile(reader.result);
      };
      reader.readAsText(event.target.files[0]);
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
      游戏根据在线或离线时长创建自动备份：
      <br>
      在线备份：仅在游戏开启时计时
      <br>
      离线备份：仅存储至最长计时槽位
      <br>
      加载任意备份时，当前存档将自动保存至末位槽位。
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
          禁用离线进度加载
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
      这些备份仍与游戏存档存储在同一位置，若你在游戏外执行删除存档的操作（例如{{ deleteText }}），备份仍会丢失。你可使用下方按钮将全部备份以文件形式一次性导入/导出：
      <div
        class="c-backup-file-ops"
        data-v-backup-window-modal
      >
        <PrimaryButton
          class="o-btn-file-ops"
          onclick="GameStorage.exportBackupsAsFile()"
          data-v-backup-window-modal
        >
          以文件形式导出
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
          <label for="file">导入存档文件</label>
        </PrimaryButton>
      </div>
      你的三个存档槽位各自拥有独立的备份集合。
    </div>
  </ModalWrapper>
  `
};