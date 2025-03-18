import PrimaryButton from '../../PrimaryButton.js'
import PrimaryToggleButton from '../../PrimaryToggleButton.js'

export default {
  name: 'AutobuyerToggles',
  components: {
    PrimaryButton,
    PrimaryToggleButton,
  },
  data() {
    return {
      isDoomed: false,
      autobuyersOn: false,
      showContinuum: false,
      disableContinuum: false,
      allAutobuyersDisabled: false,
    }
  },
  watch: {
    autobuyersOn(newValue) {
      player.auto.autobuyersOn = newValue
    },
    disableContinuum(newValue) {
      if (ImaginaryUpgrade(21).isLockingMechanics && !newValue) {
        ImaginaryUpgrade(21).tryShowWarningModal()
        return
      }
      Laitela.setContinuum(!newValue)
    },
  },
  methods: {
    update() {
      this.isDoomed = Pelle.isDoomed
      this.autobuyersOn = player.auto.autobuyersOn
      this.showContinuum = Laitela.isUnlocked
      this.disableContinuum = player.auto.disableContinuum
      this.allAutobuyersDisabled = Autobuyers.unlocked.every((autobuyer) => !autobuyer.isActive)
    },
    toggleAllAutobuyers() {
      for (const autobuyer of Autobuyers.unlocked) {
        autobuyer.isActive = this.allAutobuyersDisabled
      }
    },
  },
  template: `
  <div class="c-subtab-option-container">
    <PrimaryToggleButton
      v-model="autobuyersOn"
      on="暂停自动购买器"
      off="恢复自动购买器"
      class="o-primary-btn--subtab-option"
    />
    <PrimaryButton
      class="o-primary-btn--subtab-option"
      @click="toggleAllAutobuyers()"
    >
      {{ allAutobuyersDisabled ? "启用" : "禁用" }}所有自动购买器
    </PrimaryButton>
    <span v-if="isDoomed">
      <PrimaryButton
        v-if="showContinuum"
        class="o-primary-btn--subtab-option"
      >
        连续统已禁用
      </PrimaryButton>
    </span>
    <span v-else>
      <PrimaryToggleButton
        v-if="showContinuum"
        v-model="disableContinuum"
        on="启用连续统"
        off="禁用连续统"
        class="o-primary-btn--subtab-option"
      />
    </span>
  </div>
  `,
}
