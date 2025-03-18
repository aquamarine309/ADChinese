import InformationModalButton from './InformationModalButton.js'
import ModalCloseButton from './ModalCloseButton.js'

export default {
  name: 'InformationModal',
  components: {
    ModalCloseButton,
    InformationModalButton,
  },
  template: `
  <div
    class="l-information-modal c-information-modal"
    data-v-information-modal
  >
    <ModalCloseButton @click="emitClose" />
    <div
      class="l-h2p-header"
      data-v-information-modal
    >
      <div
        class="c-h2p-title"
        data-v-information-modal
      >
        关于本游戏
      </div>
    </div>
    <div
      class="c-info-body"
      data-v-information-modal
    >
    《反物质维度》是芬兰开发者 Hevipelle 制作的一款闲置增量游戏。该游戏于 2016
      年立项，之后由一个由开发人员和测试人员组成的大型团队进行了扩展。
      <br>
      <br>
      游戏的玩法层层展开，并有多个声望层。“如何游玩” 按钮包含了有关游戏进展的有用信息。
    </div>
    <div
      class="l-socials"
      data-v-information-modal
    >
      <InformationModalButton
        name="GitHub repository"
        icon="fa-brands fa-github"
        link="https://github.com/IvarK/AntimatterDimensionsSourceCode"
      />
      <InformationModalButton
        name="r/AntimatterDimensions"
        icon="fa-brands fa-reddit-alien"
        link="https://www.reddit.com/r/AntimatterDimensions/"
      />
      <InformationModalButton
        name="Antimatter Dimensions Discord Server"
        icon="fa-brands fa-discord"
        link="https://discord.gg/ST9NaXa"
      />
      <InformationModalButton
        name="Antimatter Dimensions on Google Play"
        icon="fa-brands fa-google-play"
        link="https://play.google.com/store/apps/details?id=kajfosz.antimatterdimensions"
      />
      <InformationModalButton
        name="Antimatter Dimensions on Steam"
        icon="fa-brands fa-steam"
        link="https://store.steampowered.com/app/1399720/Antimatter_Dimensions/"
      />
      <InformationModalButton
        name="Credits"
        icon="fa-solid fa-users"
        show-modal="credits"
      />
      <InformationModalButton
        name="Game Changelog"
        icon="fa-solid fa-file-lines"
        show-modal="changelog"
      />
    </div>
  </div>
  `,
}
