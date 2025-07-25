export default {
  name: "RaUpgradeIcon",
  props: {
    unlock: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isUnlocked: false,
      level: 0,
      description: "",
    };
  },
  computed: {
    petID() {
      return this.unlock.pet.id;
    },
    petName() {
      return this.unlock.pet.name;
    },
    icon() {
      return this.unlock.displayIcon;
    },
    classObject() {
      return {
        "c-ra-upgrade-icon": true,
        "c-ra-upgrade-icon--inactive": !this.isUnlocked,
        [`c-ra-upgrade-icon--${this.petID}`]: true
      };
    },
    isUseless() {
      return this.unlock.disabledByPelle;
    }
  },
  methods: {
    update() {
      const unlock = this.unlock;
      this.isUnlocked = unlock.isUnlocked;
      this.level = unlock.level;
      this.description = unlock.reward;
    }
  },
  template: `
  <div
    :class="classObject"
    data-v-ra-upgrade-icon
  >
    <div
      v-html="icon"
    />
    <div class="c-ra-pet-upgrade__tooltip">
      <div class="c-ra-pet-upgrade__tooltip__name">
        {{ petName }} 等级 {{ formatInt(level) }}
      </div>
      <div
        class="c-ra-pet-upgrade__tooltip__description"
        :class="{ 'o-pelle-disabled': isUseless }"
      >
        {{ description }}
      </div>
    </div>
  </div>
  `
};