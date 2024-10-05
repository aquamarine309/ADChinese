import { openExternalLink } from "../../utility/open-external-link.js";

export default {
  name: "InformationModalButton",
  props: {
    name: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: false,
      default: null
    },
    showModal: {
      type: String,
      required: false,
      default: null
    },
  },
  methods: {
    openAssociatedModal() {
      Modal[this.showModal].show();
    },
    openLink() {
      openExternalLink(this.link);
    }
  },
  template: `
  <span
    :ach-tooltip="name"
    class="c-socials--icon__wrapper"
    data-v-information-modal-button
  >
    <a
      v-if="link"
      class="c-socials--icon"
      @click="openLink"
      data-v-information-modal-button
    >
      <i :class="icon" />
    </a>
    <a
      v-else
      class="c-socials--icon"
      @click="openAssociatedModal"
      data-v-information-modal-button
    >
      <i :class="icon" />
    </a>
  </span>
  `
};