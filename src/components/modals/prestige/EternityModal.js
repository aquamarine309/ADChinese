import ResetModal from './ResetModal.js'

export default {
  name: 'EternityModal',
  components: {
    ResetModal,
  },
  data() {
    return {
      exitingEC: false,
      startingIP: new Decimal(),
      gainedEternityPoints: new Decimal(),
      gainedEternities: new Decimal(),
    }
  },
  computed: {
    message() {
      return PlayerProgress.eternityUnlocked()
        ? `永恒将重置所有内容，但成就、挑战记录和“统计”选项卡里“常规”标题下的任何内容除外。`
        : `永恒将重置所有内容，但成就、挑战记录和“统计”选项卡里“常规”标题下的任何内容除外。你也会获得永恒点数，解锁多种升级。`
    },
    gainedEPOnEternity() {
      return `永恒后你将获得 ${format(this.gainedEternities, 2)} 永恒次数和 ${format(this.gainedEternityPoints, 2)} 个永恒点数。`
    },
    startWithIP() {
      return this.startingIP.gt(0) ? `下次永恒时你将获得 ${format(this.startingIP, 2)} 无限点数。` : ``
    },
    eternityChallenge() {
      const ec = EternityChallenge.current
      if (ec.isFullyCompleted) {
        return `永恒挑战${ec.id}已被完全完成`
      }
      if (!Perk.studyECBulk.isBought) {
        return `你会获得永恒挑战${ec.id}的一次完成。`
      }
      const gainedCompletions = ec.gainedCompletionStatus.gainedCompletions
      return `你将获得 ${formatInt(gainedCompletions)} 次永恒挑战 ${ec.id} 的完成次数。`
    },
  },
  methods: {
    update() {
      this.exitingEC = EternityChallenge.isRunning
      this.startingIP = Currency.infinityPoints.startingValue
      this.gainedEternityPoints = gainedEternityPoints()
      this.gainedEternities = gainedEternities()
    },
    handleYesClick() {
      animateAndEternity()
      EventHub.ui.offAll(this)
    },
  },
  template: `
  <ResetModal
    :header="exitingEC ? '完成永恒挑战' : '你将要进行永恒'"
    :message="message"
    :gained-resources="gainedEPOnEternity"
    :starting-resources="startWithIP"
    :confirm-fn="handleYesClick"
    :alternate-condition="exitingEC"
    :alternate-text="exitingEC ? eternityChallenge : undefined"
    confirm-option="eternity"
  />
  `,
}
