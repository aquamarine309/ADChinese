export default {
  name: "CreditsDisplay",
  props: {
    isModal: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    people() { return GameDatabase.credits.people; },
    roles() { return GameDatabase.credits.roles; },
    isS12EndDisplay() { return this.$viewModel.theme === "S12" && !this.isModal; },
  },
  methods: {
    relevantPeople(role) {
      return this.people
        .filter(x => (typeof x.roles === "number" ? x.roles === role : x.roles.includes(role)))
        .sort((a, b) => a.name.localeCompare(b.name));
    },
  },
  template: `
  <div
    :class="{ 'c-credits-s12-end': isS12EndDisplay }"
    data-v-credits-display
  >
    <h1
      v-if="!isModal"
      class="c-credits-header"
      data-v-credits-display
    >
      反物质维度
    </h1>

    <div
      v-for="role in roles.count"
      :key="role"
    >
      <h2
        class="c-credits-section"
        data-v-credits-display
      >
        {{ roles[role] }}
      </h2>
      <div
        :class="{ 'l-credits--bulk': relevantPeople(role).length > 10}"
        data-v-credits-display
      >
        <div
          v-for="person in relevantPeople(role)"
          :key="person.name"
          class="c-credit-entry"
          data-v-credits-display
        >
          {{ person.name }}
          <span v-if="person.name2">
            ({{ person.name2 }})
          </span>
        </div>
      </div>
    </div>

    <br><br><br><br><br><br><br><br><br>
    <h1
      class="c-credits-header"
      data-v-credits-display
    >
      感谢游玩！
    </h1>
  </div>
  `
};