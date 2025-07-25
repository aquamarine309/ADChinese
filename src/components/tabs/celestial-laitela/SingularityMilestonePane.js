import SingularityMilestoneComponent from "./SingularityMilestoneComponent.js";

export default {
  name: "SingularityMilestonePane",
  components: {
    SingularityMilestoneComponent
  },
  data() {
    return {
      milestones: [],
      hasNew: false,
      shouldGlow: false,
    };
  },
  computed: {
    classObject() {
      return {
        "o-dark-matter-dimension-button--ascend": this.hasNew && this.shouldGlow
      };
    },
  },
  methods: {
    update() {
      this.milestones = SingularityMilestones.nextMilestoneGroup;
      this.hasNew = SingularityMilestones.unseenMilestones.length !== 0;
      this.shouldGlow = player.celestials.laitela.milestoneGlow;
    },
  },
  template: `
  <div class="c-laitela-next-milestones">
    <div
      class="o-laitela-singularity-modal-button"
      onclick="Modal.singularityMilestones.show()"
      :class="classObject"
    >
      显示所有里程碑
    </div>
    <SingularityMilestoneComponent
      v-for="milestone in milestones"
      :key="milestone.id"
      :milestone="milestone"
      :suppress-glow="true"
    />
  </div>
  `
};