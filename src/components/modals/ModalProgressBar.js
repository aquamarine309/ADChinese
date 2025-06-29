import OfflineSpeedupButton from "../OfflineSpeedupButton.js";

export default {
  name: "ModalProgressBar",
  components: {
    OfflineSpeedupButton,
  },
  data() {
    return {
      tipIndex: 0
    }
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
    },
    startupTips: () => getAvailableStartupTips().sort(() => Math.random() - 0.5),
    currentTip() {
      return this.startupTips[this.tipIndex].config.text;
    },
    tipCount() {
      return this.startupTips.length;
    },
    singleTip() {
      return this.tipCount === 1;
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
            剩余：{{ remainingTime }}
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
        <div
          class="l-startup-tips-container"
          data-v-modal-progress-bar
        >
          <div
            v-if="!singleTip"
            class="o-startup-tip-count"
          >
            {{ formatInt(tipIndex + 1) }} / {{ formatInt(tipCount) }}
          </div>
          <div
            v-if="!singleTip"
            class="o-startup-tips-toggle-btn"
            @click="tipIndex = (tipIndex + tipCount - 1) % tipCount"
            data-v-modal-progress-bar
          >
            <i class="fas fa-caret-left" />
          </div>
          <div class="o-startup-tips-text">{{ currentTip }}</div>
          <div
            v-if="!singleTip"
            class="o-startup-tips-toggle-btn"
            @click="tipIndex = (tipIndex + 1) % tipCount"
            data-v-modal-progress-bar
          >
            <i class="fas fa-caret-right" />
          </div>
        </div>
      </div>
    </div>
  </div>
  `
};