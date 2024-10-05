import ModalWrapper from "../ModalWrapper.js";

export default {
  name: "HotkeysModal",
  components: {
    ModalWrapper
  },
  data() {
    return {
      updateIndicies: [],
      visible: [],
      timeStudyUnlocked: false,
      glyphSacUnlocked: false,
      isElectron: false
    };
  },
  computed: {
    moreShiftKeyInfo() {
      const shiftKeyFunctions = [];
      if (this.timeStudyUnlocked) {
        shiftKeyFunctions.push("while buying Time Studies to buy all up until that point");
        shiftKeyFunctions.push("to save Time Study Trees");
      }
      if (this.glyphSacUnlocked) {
        shiftKeyFunctions.push("to purge Glyphs");
      }
      const shiftKeyInfo = makeEnumeration(shiftKeyFunctions);
      return (shiftKeyInfo === "")
        ? ""
        : `You can hold Shift ${shiftKeyInfo}.`;
    },
    hotkeyCount() {
      return shortcuts.length;
    },
    shortcutNames() {
      return shortcuts.map(x => x.name);
    },
    shortcutKeys() {
      return shortcuts.map(x => x.keys.map(key => this.format(key)));
    }
  },
  created() {
    for (let i = 0; i < this.hotkeyCount; i++) {
      const visible = shortcuts[i].visible;
      if (typeof visible === "function") {
        this.updateIndicies.push(i);
      } else {
        this.visible[i] = visible;
      }
    }
  },
  methods: {
    update() {
      for (const index of this.updateIndicies) {
        this.$set(this.visible, index, shortcuts[index].visible());
      }
      const progress = PlayerProgress.current;
      this.timeStudyUnlocked = progress.isEternityUnlocked;
      this.glyphSacUnlocked = RealityUpgrade(19).isBought;

      // ElectronRuntime is a global which only exists on Steam (throws a ReferenceError on web)
      try {
        this.isElectron = ElectronRuntime.isActive;
      } catch {
        this.isElectron = false;
      }
    },
    format(x) {
      switch (x) {
        case "mod":
          return "CTRL/⌘";
        default:
          return x.toUpperCase();
      }
    }
  },
  template: `
  <ModalWrapper>
    <template #header>
      Hotkey List
    </template>
    <span
      class="c-modal-hotkeys l-modal-hotkeys"
      data-v-hotkeys-modal
    >
      <div
        class="l-modal-hotkeys__column"
        data-v-hotkeys-modal
      >
        <div
          class="l-modal-hotkeys-row"
          data-v-hotkeys-modal
        >
          <span
            class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name"
            data-v-hotkeys-modal
          >Buy 1 Dimension</span>
          <kbd>SHIFT</kbd><kbd>1</kbd>-<kbd>SHIFT</kbd><kbd>8</kbd>
        </div>
        <div
          class="l-modal-hotkeys-row"
          data-v-hotkeys-modal
        >
          <span
            class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name"
            data-v-hotkeys-modal
          >Buy 10 Dimensions</span>
          <kbd>1</kbd>-<kbd>8</kbd>
        </div>
        <div
          v-for="index in hotkeyCount"
          :key="index"
        >
          <span
            v-if="visible[index - 1]"
            class="l-modal-hotkeys-row"
            data-v-hotkeys-modal
          >
            <span
              class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name"
              data-v-hotkeys-modal
            >{{ shortcutNames[index - 1] }}</span>
            <kbd
              v-for="(key, i) in shortcutKeys[index - 1]"
              :key="i"
            >
              {{ key }}
            </kbd>
          </span>
        </div>
      </div>
      <div
        class="l-modal-hotkeys__column l-modal-hotkeys__column--right"
        data-v-hotkeys-modal
      >
        <div
          class="l-modal-hotkeys-row"
          data-v-hotkeys-modal
        >
          <span
            class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name"
            data-v-hotkeys-modal
          >Modifier Key</span>
          <kbd>SHIFT</kbd>
        </div>
        <span
          class="c-modal-hotkeys__shift-description"
          data-v-hotkeys-modal
        >
          Shift is a modifier key that shows additional information on certain things
          and adjusts the function of certain buttons.
          <br>
          {{ moreShiftKeyInfo }}
        </span>
        <br>
        <div
          class="l-modal-hotkeys-row"
          data-v-hotkeys-modal
        >
          <span
            class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name"
            data-v-hotkeys-modal
          >Autobuyer Controls</span>
          <kbd>ALT</kbd>
        </div>
        <span
          class="c-modal-hotkeys__shift-description"
          data-v-hotkeys-modal
        >
          Alt is a modifier key that, when pressed in conjunction with any key that has a corresponding autobuyer,
          will toggle said autobuyer.
          <br>
          When pressing both Alt and Shift, you can toggle buying singles or buying max for the Antimatter Dimension
          and Tickspeed Autobuyers instead.
        </span>
        <br>
        <div
          class="l-modal-hotkeys-row"
          data-v-hotkeys-modal
        >
          <span
            class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name"
            data-v-hotkeys-modal
          >Tab Movement</span>
          <div>
            <kbd>←</kbd><kbd>↓</kbd><kbd>↑</kbd><kbd>→</kbd>
          </div>
        </div>
        <span
          class="c-modal-hotkeys__shift-description"
          data-v-hotkeys-modal
        >
          Using the Arrow Keys will cycle you through the game's pages.
          The Up and Down arrows cycle you through tabs,
          and the Left and Right arrows cycle you through that tab's subtabs.
        </span>
        <br>
        <div
          class="l-modal-hotkeys-row"
          data-v-hotkeys-modal
        >
          <span
            class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name"
            data-v-hotkeys-modal
          >Numpad Support</span>
        </div>
        <span
          class="c-modal-hotkeys__shift-description"
          data-v-hotkeys-modal
        >
          Due to technical reasons, pressing a numpad key will purchase 10 of a Dimension if possible, but pressing
          a numpad key with <kbd>SHIFT</kbd> will not buy a single Dimension. It may instead, depending on your device,
          cause the page to scroll or change game tabs. <kbd>ALT</kbd> will still work as expected.
        </span>
        <template v-if="isElectron">
          <br>
          <div
            class="l-modal-hotkeys-row"
            data-v-hotkeys-modal
          >
            <span
              class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name"
              data-v-hotkeys-modal
            >Window Zoom</span>
            <kbd>-</kbd><kbd>0</kbd><kbd>+</kbd>
          </div>
          <span
            class="c-modal-hotkeys__shift-description"
            data-v-hotkeys-modal
          >
            To adjust zoom level, hold <kbd>ctrl</kbd> and press either <kbd>-</kbd> or <kbd>+</kbd> to decrease or
            increase zoom. <kbd>ctrl</kbd><kbd>0</kbd> will reset zoom to 100%.
          </span>
          <br>
          <div
            class="l-modal-hotkeys-row"
          >
            <span class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name">Fullscreen</span>
            <kbd>F10</kbd>
          </div>
          <span
            class="c-modal-hotkeys__shift-description"
            data-v-hotkeys-modal
          >
            To enter or exit fullscreen, press <kbd>F10</kbd>.
          </span>
        </template>
      </div>
    </span>
  </ModalWrapper>
  `
};