import InformationModalButton from "./InformationModalButton.js";
import ModalCloseButton from "./ModalCloseButton.js";

export default {
  name: "InformationModal",
  components: {
    ModalCloseButton,
    InformationModalButton
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
        关于游戏
      </div>
    </div>
    <div
      class="c-info-body"
      data-v-information-modal
    >
      《反物质维度》是由芬兰开发者 Hevipelle 创作的放置增量游戏，最初是 2016 年的个人项目，后由大型开发测试团队共同完善。
      <br>
      <br>
      游戏采用渐进式分层玩法，包含多重声望系统。“游戏帮助”按钮提供进度攻略指南。
    </div>
    <div
      class="l-socials"
      data-v-information-modal
    >
      <InformationModalButton
        name="GitHub 仓库"
        icon="fa-brands fa-github"
        link="https://github.com/IvarK/AntimatterDimensionsSourceCode"
      />
      <InformationModalButton
        name="Reddit 社区"
        icon="fa-brands fa-reddit-alien"
        link="https://www.reddit.com/r/AntimatterDimensions/"
      />
      <InformationModalButton
        name="Discord 服务器"
        icon="fa-brands fa-discord"
        link="https://discord.gg/ST9NaXa"
      />
      <InformationModalButton
        name="Google Play 商店"
        icon="fa-brands fa-google-play"
        link="https://play.google.com/store/apps/details?id=kajfosz.antimatterdimensions"
      />
      <InformationModalButton
        name="Steam 平台"
        icon="fa-brands fa-steam"
        link="https://store.steampowered.com/app/1399720/Antimatter_Dimensions/"
      />
      <InformationModalButton
        name="开发团队"
        icon="fa-solid fa-users"
        show-modal="credits"
      />
      <InformationModalButton
        name="更新日志"
        icon="fa-solid fa-file-lines"
        show-modal="changelog"
      />
    </div>
  </div>
  `
};