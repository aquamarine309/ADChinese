import AutomatorDocsManPage from "./AutomatorDocsManPage.js";

export default {
  name: "AutomatorDocsCommandList",
  components: {
    AutomatorDocsManPage
  },
  data() {
    return {
      selectedCommand: -1,
    };
  },
  computed: {
    categoryNames: () => GameDatabase.reality.automator.categoryNames,
    commands: () => GameDatabase.reality.automator.commands,
  },
  methods: {
    commandsInCategory(category) {
      return this.commands.filter(c => c.category === category && c.isUnlocked());
    }
  },
  template: `
  <div>
    <div v-if="selectedCommand !== -1">
      <button
        class="c-automator-docs--button l-return-button fas fa-arrow-left"
        @click="selectedCommand = -1"
        data-v-automator-docs-command-list
      />
      Return to the Command List
    </div>
    <AutomatorDocsManPage
      v-if="selectedCommand !== -1"
      :command="commands[selectedCommand]"
      data-v-automator-docs-command-list
    />
    <div
      v-else
      class="c-automator-docs-page"
      data-v-automator-docs-command-list
    >
      Click on an underlined command to see more details on syntax, usage, and functionality.
      <br>
      <br>
      <span>Command List:</span>
      <br>
      <div
        v-for="(category, i) in categoryNames"
        :key="i"
      >
        {{ category }} ({{ commandsInCategory(i).length }} commands)
        <div
          v-for="command in commandsInCategory(i)"
          :key="command.id"
          class="c-automator-docs-page__link l-command-group"
          @click="selectedCommand = command.id"
          data-v-automator-docs-command-list
        >
          <span v-if="command.isUnlocked()">
            {{ command.keyword }}
          </span>
        </div>
      </div>
      <br>
      <span>
        Note: In the SYNTAX note on each command, <u>underlined</u> inputs are <i>required</i> inputs which you must
        fill and inputs in [square brackets] are optional (if used, they should be input <i>without</i> the brackets).
        Any other parts should be typed in as they appear. Unless otherwise stated, all of the inputs are
        case-insensitive. Some commands may have more than one valid format, which will appear on separate lines.
      </span>
    </div>
  </div>
  `
};