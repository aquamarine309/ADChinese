import DesktopIcons from "./desktop-icons.js";

let isSelectingIcon = false;
export default {
  name: "DesktopIcons",
  data() {
    return {
      DesktopIcons
    };
  },
  mounted() {
    document.body.addEventListener("click", this.clearSelected);
  },
  beforeDestroy() {
    document.body.removeEventListener("click", this.clearSelected);
    this.clearSelected();
  },
  methods: {
    clearSelected() {
      if (isSelectingIcon) return;
      DesktopIcons.selected = -1;
    },
    handleClick(idx) {
      // This makes what everything is doing clearer
      // eslint-disable-next-line no-negated-condition
      if (DesktopIcons.selected !== idx) {
        DesktopIcons.selected = idx;
        isSelectingIcon = true;
        setTimeout(() => isSelectingIcon = false, 0);
      } else {
        DesktopIcons.entries[idx].action();
      }
    }
  },
  template: `
  <div
    class="c-s12-desktop-icons-container"
    data-v-desktop-icons
  >
    <div
      v-for="(icon, idx) in DesktopIcons.entries"
      :key="icon.name"
      class="c-s12-desktop-icon"
      :class="{ 'c-s12-desktop-icon--selected': DesktopIcons.selected === idx, }"
      @click="handleClick(idx)"
      data-v-desktop-icons
    >
      <div
        class="c-s12-desktop-icon__inner"
        data-v-desktop-icons
      >
        <img
          :src="\`./public/images/s12/\${icon.image}\`"
          class="c-s12-desktop-icon__img"
          data-v-desktop-icons
        >
        <div
          class="c-s12-desktop-icon__text"
          data-v-desktop-icons
        >
          {{ icon.name }}
        </div>
      </div>
    </div>
  </div>
  `
};