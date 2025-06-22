import PrimaryButton from "../../PrimaryButton.js";

export default {
  name: "PerkPointLabel",
  components: {
    PrimaryButton
  },
  data() {
    return {
      pp: 0,
      treeLayout: 0,
      physicsEnabled: false,
      physicsOverride: false,
    };
  },
  computed: {
    layoutText() {
      return PerkLayouts[this.treeLayout].buttonText;
    },
    physicsText() {
      const enableStr = (this.physicsOverride ?? this.physicsEnabled) ? "已启用" : "已禁用";
      return `${enableStr}${this.physicsOverride === undefined ? "" : " （固定）"}`;
    }
  },
  created() {
    this.treeLayout = player.options.perkLayout;
    this.physicsOverride = PerkLayouts[this.treeLayout].forcePhysics;
  },
  methods: {
    update() {
      this.pp = Math.floor(Currency.perkPoints.value);
      this.physicsEnabled = player.options.perkPhysicsEnabled;
    },
    togglePhysics() {
      if (this.physicsOverride !== undefined) return;
      player.options.perkPhysicsEnabled = !player.options.perkPhysicsEnabled;
      PerkNetwork.setPhysics(player.options.perkPhysicsEnabled);
    },
    physicsClassObject() {
      return {
        "o-primary-btn c-button-physics": true,
        "o-primary-btn--disabled": this.physicsOverride !== undefined
      };
    },
    centerTree() {
      PerkNetwork.resetPosition(true);
    },
    straightenEdges() {
      PerkNetwork.setEdgeCurve(false);
      PerkNetwork.setEdgeCurve(true);
    },
    cycleLayout() {
      // Step forward once, but if this lands us on a locked layout, keep stepping until it doesn't
      let newIndex = (player.options.perkLayout + 1) % PerkLayouts.length;
      while (!(PerkLayouts[newIndex].isUnlocked?.() ?? true)) {
        newIndex = (newIndex + 1) % PerkLayouts.length;
      }

      player.options.perkLayout = newIndex;
      this.treeLayout = newIndex;
      this.physicsOverride = PerkLayouts[this.treeLayout].forcePhysics;
      PerkNetwork.currentLayout = PerkLayouts[this.treeLayout];
      PerkNetwork.setPhysics(player.options.perkPhysicsEnabled);
      PerkNetwork.moveToDefaultLayoutPositions(this.treeLayout);
    }
  },
  template: `
  <div
    class="c-perk-tab__header"
    data-v-perk-point-label
  >
    你拥有 <span class="c-perk-tab__perk-points" data-v-perk-point-label>{{ format(pp, 2) }}</span> 复兴点数。
    <br>
    复兴树的选择是永久性的，不能重置。
    <br>
    菱形的复兴节点也会提供自动点数。
    <br>
    <div
      class="perk-settings"
      data-v-perk-point-label
    >
      <PrimaryButton
        class="o-primary-btn c-button-perk-layout"
        @click="cycleLayout"
        data-v-perk-point-label
      >
        复兴树布局：{{ layoutText }}
      </PrimaryButton>
      <PrimaryButton
        :class="physicsClassObject()"
        @click="togglePhysics"
        data-v-perk-point-label
      >
        物理效果：{{ physicsText }}
      </PrimaryButton>
      <br>
      <PrimaryButton
        class="o-primary-btn"
        @click="centerTree"
        data-v-perk-point-label
      >
        基于 START 居中复兴树
      </PrimaryButton>
      <PrimaryButton
        class="o-primary-btn"
        @click="straightenEdges"
        data-v-perk-point-label
      >
        矫直边缘
      </PrimaryButton>
    </div>
  </div>
  `
};
