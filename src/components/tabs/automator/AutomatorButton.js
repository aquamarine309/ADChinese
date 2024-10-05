export default {
  name: "AutomatorButton",
  template: `
  <button
    class="c-automator__button l-automator__button fas"
    @click="emitClick"
    data-v-automator-button
  />
  `
};