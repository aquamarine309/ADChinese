export default {
  name: "ArmageddonButton",
  props: {
    isHeader: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      remnantsGain: 0,
      realityShardGain: new Decimal(0),
      nextRealityShardGain: new Decimal(0),
      canArmageddon: false,
    };
  },
  computed: {
    remnants() {
      return format(this.remnantsGain, 2, this.remnantsGain > 1 ? 0 : 2);
    },
    buttonClassObject() {
      return {
        "c-armageddon-button": true,
        "l-armageddon-button": !this.isHeader,
        "l-reality-button": this.isHeader,
        "l-armageddon-button--header": this.isHeader,
        "c-armageddon-button--unavailable": !this.canArmageddon
      };
    }
  },
  methods: {
    update() {
      this.remnantsGain = Pelle.remnantsGain;
      this.realityShardGain.copyFrom(Pelle.realityShardGainPerSecond);
      this.nextRealityShardGain.copyFrom(Pelle.nextRealityShardGain);
      this.canArmageddon = Pelle.canArmageddon;
    },
    manualArmageddon() {
      if (!this.canArmageddon) return;

      if (player.options.confirmations.armageddon) Modal.armageddon.show();
      else Pelle.armageddon(true);
    }
  },
  template: `
  <button
    :class="buttonClassObject"
    @click="manualArmageddon"
    data-v-armageddon-button
  >
    <span v-if="isHeader">你无法逃离已被毁灭的现实！<br></span>
    <span
      class="c-remnant-gain-display"
      data-v-armageddon-button
    >
      末日后获得
      <span class="c-remnant-gain">{{ remnants }}</span>
      遗物
    </span>
    <br>
    现实碎片
    <span
      class="c-reality-shard-gain"
      data-v-armageddon-button
    >{{ format(realityShardGain, 2, 2) }}</span>/秒 ➜
    <span
      class="c-reality-shard-gain"
      data-v-armageddon-button
    >{{ format(nextRealityShardGain, 2, 2) }}</span>/秒
  </button>
  `
};