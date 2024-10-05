import OfflineSpeedupButton from "../OfflineSpeedupButton.js";

export default {
  name: "ModalProgressBar",
  components: {
    OfflineSpeedupButton,
  },
  computed: {
    progress() {
      return this.$viewModel.modal.progressBar;
    },
    foregroundStyle() {
      return {
        width: `${this.progress.current / this.progress.max * 100}%`,
      };
    },
    remainingTime() {
      const timeSinceStart = Date.now() - this.progress.startTime;
      const ms = timeSinceStart * (this.progress.max - this.progress.current) / this.progress.current;
      return TimeSpan.fromMilliseconds(ms).toStringShort();
    },
    buttons() {
      return this.progress.buttons || [];
    }
  },
  template: `
  <div
    class="l-modal-overlay c-modal-overlay progress-bar-modal"
    data-v-modal-progress-bar
  >
    <div
      class="c-modal"
      data-v-modal-progress-bar
    >
      <div
        class="modal-progress-bar"
        data-v-modal-progress-bar
      >
        <div
          class="modal-progress-bar__label"
          data-v-modal-progress-bar
        >
          {{ progress.label }}
        </div>
        <div>
          {{ progress.info() }}
        </div>
        <div
          class="modal-progress-bar__margin"
          data-v-modal-progress-bar
        >
          <div>
            {{ progress.progressName }}: {{ formatInt(progress.current) }}/{{ formatInt(progress.max) }}
          </div>
          <div>
            Remaining: {{ remainingTime }}
          </div>
          <div
            class="modal-progress-bar__hbox"
            data-v-modal-progress-bar
          >
            <div
              class="modal-progress-bar__bg"
              data-v-modal-progress-bar
            >
              <div
                class="modal-progress-bar__fg"
                :style="foregroundStyle"
                data-v-modal-progress-bar
              />
            </div>
          </div>
        </div>
        <div
          class="modal-progress-bar__buttons"
          data-v-modal-progress-bar
        >
          <OfflineSpeedupButton
            v-for="(button, id) in buttons"
            :key="id"
            :button="button"
            :progress="progress"
          />
        </div>
      </div>
    </div>
  </div>
  `
};