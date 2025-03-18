import ResetModal from './ResetModal.js'

export default {
  name: 'BigCrunchModal',
  components: {
    ResetModal,
  },
  data() {
    return {
      gainedInfinities: new Decimal(),
      gainedInfinityPoints: new Decimal(),
      startingBoosts: 0,
      startingAM: 10,
      willStartWithGalaxy: false,
    }
  },
  computed: {
    isFirstInfinity() {
      return !PlayerProgress.infinityUnlocked()
    },
    message() {
      const info = this.isFirstInfinity ? this.firstInfinityInfo : ``
      return `达到无限后，一切维度、维度提升和反物质星系都将被重置 ${info}`
    },
    firstInfinityInfo() {
      return `作为回报，你将获得一个无限点数（缩写：IP）。它可用于购买多个升级，你可以
在“无限”标签页中找到这些升级。你还将获得一个无限次数，它会在“统计数据”标签页中显示。`
    },
    ipGainInfo() {
      return `你将获得 ${format(this.gainedInfinities, 2, 0)} 无限次数和 ${format(this.gainedInfinityPoints, 2, 0)} 永恒点数。`
    },
    startingResources() {
      const gainedResources = []
      if (this.startingAM.gte(10)) gainedResources.push(`${format(this.startingAM, 2, 1)} 反物质`)
      if (this.startingBoosts > 0) gainedResources.push(`${format(this.startingBoosts)} 个维度提升`)
      if (this.willStartWithGalaxy) gainedResources.push(`${format(1)} 个星系`)

      return `你将会以 ${makeEnumeration(gainedResources)} 开始下一次无限。`
    },
  },
  methods: {
    update() {
      this.gainedInfinities = gainedInfinities().round()
      this.gainedInfinityPoints = gainedInfinityPoints().round()
      this.startingBoosts = DimBoost.startingDimensionBoosts
      this.startingAM = Currency.antimatter.startingValue
      this.willStartWithGalaxy = InfinityUpgrade.skipResetGalaxy.isBought
    },
    handleYesClick() {
      bigCrunchResetRequest()
      EventHub.ui.offAll(this)
      if (this.isFirstInfinity) {
        setTimeout(
          () =>
            Modal.message.show(
              `每次手动触发“无限”后都会出现该动画。
              如果要禁用，可在“选项”选项卡中进行设置。
              任何第一次看到游戏中的视觉动画效果时都可以这样做。`,
              {},
              3
            ),
          2000
        )
      }
    },
  },
  template: `
  <ResetModal
    header="你正要前往无限"
    :message="message"
    :gained-resources="ipGainInfo"
    :starting-resources="startingResources"
    :confirm-fn="handleYesClick"
    :alternate-condition="isFirstInfinity"
    :alternate-text="message"
    :confirm-option="isFirstInfinity ? undefined : 'bigCrunch'"
  />
  `,
}
