export default {
  name: "EternityPointsHeader",
  data() {
    return {
      eternityPoints: new Decimal()
    };
  },
  methods: {
    update() {
      this.eternityPoints.copyFrom(Currency.eternityPoints.value.floor());
    }
  },
  template: `
  <div class="c-eternity-tab__header">
    你拥有
    <span class="c-eternity-tab__eternity-points">{{ format(eternityPoints, 2) }}</span>
    永恒点数
  </div>
  `
};