import MultipleAutobuyersBox from "./MultipleAutobuyersBox.js";
import MultipleSingleAutobuyersGroup from "./MultipleSingleAutobuyersGroup.js";

// This component, for some reason, contains every single autobuyer except for tickspeed and prestiges
export default {
  name: "SimpleAutobuyersMultiBox",
  components: {
    MultipleAutobuyersBox,
    MultipleSingleAutobuyersGroup
  },
  computed: {
    multiple() {
      return Autobuyers.display[0];
    },
  },
  template: `
  <span class="l-autobuyers-tab">
    <MultipleAutobuyersBox
      v-for="(type, id) in multiple"
      :key="id"
      :type="type"
    />
    <MultipleSingleAutobuyersGroup />
  </span>
  `
};