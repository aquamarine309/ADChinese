import ModalWrapperChoice from "./ModalWrapperChoice.js";

export default {
  name: "UpgradeMechanicLockModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    upgrade: {
      type: Object,
      required: true
    },
    isImaginary: {
      type: Boolean,
      required: true,
    },
    specialLockText: {
      type: String,
      required: false,
      default: null,
    }
  },
  computed: {
    upgradeStr() {
      return this.isImaginary ? "虚幻升级" : "现实升级";
    },
    lockEvent() {
      return this.specialLockText ?? this.upgrade.lockEvent;
    }
  },
  methods: {
    disableLock() {
      this.upgrade.setMechanicLock(false);
    }
  },
  template: `
  <ModalWrapperChoice
    @confirm="disableLock"
  >
    <template #header>
      {{ upgradeStr }} Condition Lock
    </template>
    <div class="c-modal-message__text">
      你确定要{{ lockEvent }}吗？现在这么做会导致你
      <span
        class="l-emphasis"
        data-v-upgrade-mechanic-lock-modal
      >
        未能满足 {{ upgradeStr }} "{{ upgrade.name }}" 的要求。
      </span>
      <span :ach-tooltip="upgrade.requirement">
        <i class="fas fa-question-circle" />
      </span>
      <br>
      <br>
      选择“取消”将关闭此对话框而不产生任何效果，而选择“禁用锁定”将禁用此升级的要求检查，并防止此消息再次出现，除非你重新开启。
      <br>
      <br>
      这两个选项都不会执行你刚刚尝试的操作，因此你需要重新尝试。
    </div>
    <template #confirm-text>
      禁用锁定
    </template>
  </ModalWrapperChoice>
  `
};