export default {
  name: "ModernSidebarCurrency",
  data() {
    return {
      sidebarID: 0,
      resourceName: "",
      resourceValue: new Decimal(0)
    };
  },
  computed: {
    resourceDB: () => GameDatabase.sidebarResources,
    numDBEntries() {
      return this.resourceDB.length;
    },
    resource() {
      // With "default" sorting, return the latest unlocked resource - otherwise, return the specified one
      return this.sidebarID === 0
        ? this.resourceDB.filter(e => e.isAvailable()).sort((a, b) => b.id - a.id)[0]
        : this.resourceDB.find(e => e.id === this.sidebarID);
    },
    displayValue() {
      // RM + iM seems to cause strange, undesirable linebreaks
      return this.resource.formatValue(this.resourceValue).replace(" + ", "+");
    }
  },
  methods: {
    update() {
      this.sidebarID = player.options.sidebarResourceID;
      this.resourceName = this.resource.resourceName ?? this.resource.optionName;
      this.resourceValue.copyFrom(this.resource.value());
    },
    cycleResource(dir) {
      const oldID = this.sidebarID;
      this.sidebarID = (this.sidebarID + this.numDBEntries + dir) % this.numDBEntries;
      while (this.sidebarID !== oldID) {
        if (this.resource.isAvailable()) break;
        this.sidebarID = (this.sidebarID + this.numDBEntries + dir) % this.numDBEntries;
      }
      player.options.sidebarResourceID = this.sidebarID;
    },
    containerClass() {
      return {
        "c-sidebar-resource": true,
        "c-sidebar-resource-default": this.sidebarID === 0,
      };
    },
    styleObject() {
      const strLen = this.displayValue.length;
      return {
        transform: `scale(${strLen < 10 ? 1 : 10 / strLen})`,
      };
    }
  },
  template: `
  <div
    :class="containerClass()"
    @click.exact="cycleResource(1)"
    @click.shift.exact="cycleResource(-1)"
    data-v-modern-sidebar-currency
  >
    <h2
      :class="resource.formatClass"
      :style="styleObject()"
      data-v-modern-sidebar-currency
    >
      {{ displayValue }}
    </h2>
    <div
      class="c-sidebar-resource__information"
      data-v-modern-sidebar-currency
    >
      <span
        class="c-sidebar-resource__name"
        data-v-modern-sidebar-currency
      >{{ resourceName }}</span>
    </div>
  </div>
  `
};