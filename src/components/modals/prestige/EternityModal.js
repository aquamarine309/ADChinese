import ResetModal from "./ResetModal.js";

export default {
  name: "EternityModal",
  components: {
    ResetModal
  },
  data() {
    return {
      exitingEC: false,
      startingIP: new Decimal(),
      gainedEternityPoints: new Decimal(),
      gainedEternities: new Decimal()
    };
  },
  computed: {
    message() {
      return PlayerProgress.eternityUnlocked()
        ? `Eternity will reset everything except Achievements, Challenge records, and anything under the General header
          on the Statistics tab.`
        : `Eternity will reset everything except Achievements, Challenge records, and anything under the General header
          on the Statistics tab. You will also gain an Eternity Point and unlock various upgrades.`;
    },
    gainedEPOnEternity() {
      return `永恒后你将获得 ${format(this.gainedEternities, 2)} 永恒次数和 ${format(this.gainedEternityPoints, 2)} 个永恒点数。`;
    },
    startWithIP() {
      return this.startingIP.gt(0)
        ? `You will start your next Eternity with ${format(this.startingIP, 2)} infinity points.`
        : ``;
    },
    eternityChallenge() {
      const ec = EternityChallenge.current;
      if (ec.isFullyCompleted) {
        return `Eternity Challenge ${ec.id} is already fully completed.`;
      }
      if (!Perk.studyECBulk.isBought) {
        return `You will gain one completion of Eternity Challenge ${ec.id}.`;
      }
      const gainedCompletions = ec.gainedCompletionStatus.gainedCompletions;
      return `你将获得 ${formatInt(gainedCompletions)} 次永恒挑战 ${ec.id} 的完成次数。`;
    }
  },
  methods: {
    update() {
      this.exitingEC = EternityChallenge.isRunning;
      this.startingIP = Currency.infinityPoints.startingValue;
      this.gainedEternityPoints = gainedEternityPoints();
      this.gainedEternities = gainedEternities();
    },
    handleYesClick() {
      animateAndEternity();
      EventHub.ui.offAll(this);
    }
  },
  template: `
  <ResetModal
    :header="exitingEC ? 'Complete Eternity Challenge' : 'You are about to Eternity'"
    :message="message"
    :gained-resources="gainedEPOnEternity"
    :starting-resources="startWithIP"
    :confirm-fn="handleYesClick"
    :alternate-condition="exitingEC"
    :alternate-text="exitingEC ? eternityChallenge : undefined"
    confirm-option="eternity"
  />
  `
};