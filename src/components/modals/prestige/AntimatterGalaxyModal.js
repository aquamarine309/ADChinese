import ModalWrapperChoice from "../ModalWrapperChoice.js";

export default {
  name: "AntimatterGalaxyModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    bulk: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      newGalaxies: 0,
      keepAntimatter: false,
      perkANRBought: false,
      keepDimBoost: false
    };
  },
  computed: {
    topLabel() {
      if (this.bulk) return `你将购买 ${formatInt(this.newGalaxies)} 个反物质星系`;
      return `你将购买一个反物质星系`;
    },
    message() {
      const resetResouces = [];
      if (Pelle.isDoomed) resetResouces.push("反物质", "反物质维度", "计数频率提升");
      if (!this.perkANRBought) resetResouces.push("反物质维度", "计数频率提升");
      if (!this.keepDimBoost) resetResouces.push("维度提升");
      if (!this.keepAntimatter && !this.perkANRBought) resetResouces.push("反物质");
      const resetList = makeEnumeration(resetResouces);
      let tickspeedFixed = "";
      if (InfinityChallenge(3).isRunning) {
        tickspeedFixed = `无限挑战 ${InfinityChallenge(3).id}`;
      } else if (Ra.isRunning) {
        tickspeedFixed = `${Ra.displayName}的现实`;
      }
      const tickspeedInfo = (tickspeedFixed === "")
        ? "计数频率升级将获得小幅提升。"
        : `计数频率升级不会获得加成，因为你当前处于${tickspeedFixed}中。`;
      const message = (resetList === "")
        ? `这将不会重置任何东西，并且${tickspeedInfo}`
        : `这将重置${resetList}。然而，${tickspeedInfo}`;

      if (this.bulk) return `你确定要购买
      ${formatInt(this.newGalaxies)} 个反物质星系吗？ ${message}`;
      return `你确定要购买一个反物质星系吗？ ${message}`;
    }
  },
  created() {
    this.on$(GAME_EVENT.DIMBOOST_AFTER, () =>
      (BreakInfinityUpgrade.autobuyMaxDimboosts.isBought ? undefined : this.emitClose()));
  },
  methods: {
    update() {
      if (this.bulk) {
        const req = Galaxy.requirement;
        const dim = AntimatterDimension(req.tier);
        const bulk = bulkBuyBinarySearch(dim.totalAmount, {
          costFunction: x => Galaxy.requirementAt(x).amount,
          cumulative: false,
        }, player.galaxies);
        if (bulk) {
          this.newGalaxies = Galaxy.buyableGalaxies(Math.round(dim.totalAmount.toNumber())) - player.galaxies;
        }
      }
      this.keepAntimatter = Achievement(111).isUnlocked;
      this.perkANRBought = Perk.antimatterNoReset.canBeApplied;
      this.keepDimBoost = (Achievement(143).isUnlocked && !Pelle.isDoomed) ||
        PelleUpgrade.galaxyNoResetDimboost.canBeApplied;
    },
    handleYesClick() {
      requestGalaxyReset(this.bulk);
      EventHub.ui.offAll(this);
    }
  },
  template: `
  <ModalWrapperChoice
    option="antimatterGalaxy"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ topLabel }}
    </template>

    <div class="c-modal-message__text">
      {{ message }}
    </div>
  </ModalWrapperChoice>
  `
}