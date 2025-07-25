import AutobuyerGroupToggleLabel from "./AutobuyerGroupToggleLabel.js";
import AutobuyerIntervalLabel from "./AutobuyerIntervalLabel.js";
import SingleAutobuyerInRow from "./SingleAutobuyerInRow.js";

// This component is the container for an individual group of autobuyers, such as all of the AD autobuyers in the
// single-row layout once they're all maxed and have the same parameters
export default {
  name: "MultipleAutobuyersBox",
  components: {
    AutobuyerIntervalLabel,
    AutobuyerGroupToggleLabel,
    SingleAutobuyerInRow,
  },
  props: {
    type: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      continuumActive: false,
      anyUnlocked: false,
      displayLabelAsGroup: false,
      parentActive: false,
    };
  },
  computed: {
    autobuyers() {
      return this.type.zeroIndexed;
    },
    name() {
      return this.type.groupName;
    },
    entryCount() {
      return this.type.entryCount;
    },
    rowCount() {
      return Math.ceil(this.entryCount / 8);
    },
    entryCountPerRow() {
      return this.rowCount === 1 ? this.entryCount : 5;
    },
    boxSize() {
      // The 1% reduced flex-basis is used to prevent wrapping due to the margins.
      return `flex: 1 0 ${100 / this.entryCountPerRow - 1}%`;
    },
    isADBox() {
      return this.name === Autobuyer.antimatterDimension.groupName;
    },
    showAutobuyers() {
      // Only display the Antimatter Dimension Autobuyers if the bulk is the same and there are any of them unlocked
      if (this.isADBox) return this.anyUnlocked && this.displayLabelAsGroup;
      return this.anyUnlocked;
    },
  },
  methods: {
    update() {
      this.continuumActive = Laitela.continuumActive;
      const type = this.type;
      this.anyUnlocked = type.anyUnlocked;
      this.displayLabelAsGroup = (type.allMaxedInterval ?? true) && (type.allUnlimitedBulk ?? true);
      this.parentActive = type.isActive;
    },
    toggleGroup() {
      this.type.toggle();
    }
  },
  template: `
  <span
    v-if="showAutobuyers && !(isADBox && continuumActive)"
    class="c-autobuyer-box-row"
  >
    <AutobuyerGroupToggleLabel
      :is-active="parentActive"
      :name="name"
      @click="toggleGroup"
    />
    <div class="l-autobuyer-box__title">
      {{ name }}<br>自动购买器
      <!-- If we're showing as a group, then all attributes are the same and we can arbitrarily take the first one -->
      <AutobuyerIntervalLabel
        v-if="displayLabelAsGroup"
        :autobuyer="autobuyers[0]"
      />
    </div>
    <div class="l-autobuyer-box__autobuyers">
      <template
        v-for="(autobuyer, id) in autobuyers"
      >
        <SingleAutobuyerInRow
          :key="id"
          class="l-autobuyer-box__autobuyers-internal"
          :style="boxSize"
          :autobuyer="autobuyer"
          :show-individual="!displayLabelAsGroup"
          :parent-disabled="!parentActive"
        />
        <br
          v-if="id % entryCountPerRow === entryCountPerRow"
          :key="id"
        >
      </template>
    </div>
  </span>
  <span
    v-else-if="isADBox && continuumActive"
    class="c-autobuyer-box-row"
  >
    连续统将取代自动购买反物质维度和计数频率的功能，你将基于你的购买次数，自动获得连续的生产倍率加成。
  </span>
  `
};