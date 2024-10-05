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
    deleteText: () => (STEAM ? "fully uninstalling the game" : "clearing your browser cookies"),
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
      Automatic Backup Saves
    </template>
    <div
      class="c-info c-modal--short"
      data-v-backup-window-modal
    >
      The game makes automatic backups based on time you have spent online or offline.
      Timers for online backups only run when the game is open, and offline backups only save to the slot
      with the longest applicable timer.
      Additionally, your current save is saved into the last slot any time a backup from here is loaded.
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
          Load with offline progress disabled
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
      These backups are still stored in the same place as your game save and can still be lost if you do anything
      external to the game which would delete your save itself, such as {{ deleteText }}. You can import/export
      all backups at once as files, using these buttons:
      <div
        class="c-backup-file-ops"
        data-v-backup-window-modal
      >
        <PrimaryButton
          class="o-btn-file-ops"
          onclick="GameStorage.exportBackupsAsFile()"
          data-v-backup-window-modal
        >
          Export as file
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
          <label for="file">Import from file</label>
        </PrimaryButton>
      </div>
      Each of your three save slots has its own separate set of backups.
    </div>
  </ModalWrapper>
  `
};