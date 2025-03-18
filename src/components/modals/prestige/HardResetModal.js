import ModalWrapperChoice from '../ModalWrapperChoice.js'

export default {
  name: 'HardResetModal',
  components: {
    ModalWrapperChoice,
  },
  data() {
    return {
      input: '',
    }
  },
  computed: {
    willHardReset() {
      return this.input === 'Shrek is love, Shrek is life'
    },
    hasExtraNG() {
      return player.records.fullGameCompletions > 0
    },
    hasSpeedrun() {
      return player.speedrun.isUnlocked
    },
  },
  destroyed() {
    if (this.willHardReset) SecretAchievement(38).unlock()
  },
  methods: {
    hardReset() {
      if (this.willHardReset) GameStorage.hardReset()
      this.input = ''
    },
  },
  template: `
<ModalWrapperChoice
    :show-cancel="!willHardReset"
    :show-confirm="willHardReset"
    confirm-class="o-primary-btn--width-medium c-modal__confirm-btn c-modal-hard-reset-btn"
    @confirm="hardReset"
  >
    <template #header>
      硬重置
    </template>
    <div class="c-modal-message__text">
      请确认您要硬重置此存档槽。
      <span class="c-modal-hard-reset-danger">删除存档不会解锁任何秘密内容。</span>
      <br>
      输入“Shrek is love, Shrek is life”以确认。
      <div class="c-modal-hard-reset-danger">
        此操作将清除您的存档。
        <span v-if="hasExtraNG">
          <br>
          这还将移除您通过完成游戏解锁的所有符文装饰！
        </span>
        <span v-if="hasSpeedrun">
          <br>
          您将失去速通能力。若要重新开始速通，请使用“开始速通”按钮。
        </span>
      </div>
    </div>
    <input
      ref="input"
      v-model="input"
      type="text"
      class="c-modal-input c-modal-hard-reset__input"
      @keyup.esc="emitClose"
    >
    <div class="c-modal-hard-reset-info">
      <div
        v-if="willHardReset"
        class="c-modal-hard-reset-danger"
      >
        短语已确认 - 继续操作将不可逆地删除您的存档！
      </div>
      <div v-else>
        输入正确短语以执行硬重置。
      </div>
    </div>
    <template #confirm-text>
      硬重置
    </template>
  </ModalWrapperChoice>
  `,
}
