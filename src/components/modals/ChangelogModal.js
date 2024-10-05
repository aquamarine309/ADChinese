import ModalCloseButton from "./ModalCloseButton.js";

export default {
  name: "ChangelogModal",
  components: {
    ModalCloseButton,
  },
  data() {
    return {
      entryId: 0,
    };
  },
  computed: {
    shownEntry: {
      get() {
        return GameDatabase.changelog[this.entryId];
      },
      set(entry) {
        this.entryId = entry.id;
      }
    },
    entries() {
      return GameDatabase.changelog;
    }
  },
  methods: {
    setShownEntry(tab) {
      this.shownEntry = tab;
      this.$refs.changelogBody.scrollTop = 0;
    },
    formatDate(date) {
      return date.map(n => (Math.log10(n) >= 2 ? n : `0${n}`.slice(-2))).join("-");
    }
  },
  template: `
  <div
    class="l-changelog-modal"
    data-v-changelog-modal
  >
    <ModalCloseButton @click="emitClose" />
    <div
      class="l-changelog-header"
      data-v-changelog-modal
    >
      <div
        class="c-changelog-title"
        data-v-changelog-modal
      >
        Changelog
      </div>
    </div>
    <div
      class="l-changelog-container"
      data-v-changelog-modal
    >
      <div
        class="l-changelog-search-tab"
        data-v-changelog-modal
      >
        <div
          class="l-changelog-tab-list"
          data-v-changelog-modal
        >
          <div
            v-for="entry in entries"
            :key="entry.id"
            class="o-changelog-tab-button"
            :class="{
              'o-changelog-tab-button--selected': entry === shownEntry
            }"
            @click="setShownEntry(entry)"
            data-v-changelog-modal
          >
            {{ formatDate(entry.date) }}
          </div>
        </div>
      </div>
      <div
        class="l-changelog-info"
        data-v-changelog-modal
      >
        <div
          class="c-changelog-body--title"
          data-v-changelog-modal
        >
          {{ formatDate(shownEntry.date) }}<span v-if="shownEntry.name">: "{{ shownEntry.name }}" update</span>
        </div>
        <div
          ref="changelogBody"
          class="l-changelog-body c-changelog-body"
          v-html="shownEntry.info"
          data-v-changelog-modal
        />
      </div>
    </div>
  </div>
  `
};