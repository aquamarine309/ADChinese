import HiddenTabGroup from './HiddenTabGroup.js'
import ModalWrapperOptions from '../ModalWrapperOptions.js'
import PrimaryButton from '../../../PrimaryButton.js'

export default {
  name: 'HiddenTabsModal',
  components: {
    HiddenTabGroup,
    ModalWrapperOptions,
    PrimaryButton,
  },
  data() {
    return {
      isEnslaved: false,
      isAlmostEnd: false,
    }
  },
  computed: {
    tabs: () => Tabs.currentUIFormat,
  },
  methods: {
    update() {
      this.isEnslaved = Enslaved.isRunning
      this.isAlmostEnd = Pelle.hasGalaxyGenerator
    },
    showAllTabs() {
      for (const tab of this.tabs) {
        tab.unhideTab()
        for (const subtab of tab.subtabs) subtab.unhideTab()
      }
    },
  },
  template: `
<ModalWrapperOptions
    class="l-wrapper"
    data-v-hidden-tabs-modal
  >
    <template #header>
      修改可见选项卡
    </template>
    <div class="c-modal--short">
      点击按钮可切换显示选项卡的打开/关闭。
      <br>
      某些选项卡无法隐藏，您也无法隐藏当前选项卡。
      <br>
      取消隐藏所有子选项卡都被隐藏的选项卡也会取消隐藏所有子选项卡，隐藏所有子选项卡也会隐藏该选项卡。
      <br>
      <div v-if="isAlmostEnd">
        解锁星系生成器后，您无法隐藏选项卡。
      </div>
      <div v-if="isEnslaved">
        <br>
        <i>你必须...看到所有地方...</i>
        <br>
        （在此现实中，您无法隐藏选项卡）
      </div>
      <PrimaryButton
        @click="showAllTabs"
      >
        显示所有选项卡
      </PrimaryButton>
      <HiddenTabGroup
        v-for="(tab, index) in tabs"
        :key="index"
        :tab="tab"
        :change-enabled="!isEnslaved && !isAlmostEnd"
        class="l-hide-modal-tab-container"
      />
    </div>
  </ModalWrapperOptions>
  `,
}
