export default {
  name: 'BreakInfinityButton',
  data() {
    return {
      isBroken: false,
      isUnlocked: false,
      isEnslaved: false,
    }
  },
  computed: {
    classObject() {
      return {
        'o-infinity-upgrade-btn': true,
        'o-infinity-upgrade-btn--color-2': true,
        'o-infinity-upgrade-btn--available': this.isUnlocked,
        'o-infinity-upgrade-btn--unavailable': !this.isUnlocked,
        'o-infinity-upgrade-btn--feel-eternity': this.isEnslaved,
        'o-infinity-upgrade-btn--unclickable': this.isBroken && !this.isEnslaved,
      }
    },
    tooltip() {
      if (this.isEnslaved) return '...亘古叠加于亘古叠加于亘古叠加于亘古叠加于亘古叠加于...'
      return undefined
    },
    text() {
      if (this.isEnslaved) return '感受永恒'
      return this.isBroken ? '已打破无限' : '打破无限'
    },
  },
  methods: {
    update() {
      this.isBroken = player.break
      this.isUnlocked = Autobuyer.bigCrunch.hasMaxedInterval
      this.isEnslaved = Enslaved.isRunning
    },
    clicked() {
      if (this.isEnslaved) Enslaved.feelEternity()
      else if (!this.isBroken && this.isUnlocked) Modal.breakInfinity.show()
    },
  },
  template: `
  <button
    v-tooltip="tooltip"
    :class="classObject"
    @click="clicked"
  >
    {{ text }}
  </button>
  `,
}
