import { MatterScale } from "./matter-scale.js";
import PrimaryButton from "../../PrimaryButton.js";

export default {
  name: "StatisticsTab",
  components: {
    PrimaryButton
  },
  data() {
    return {
      isDoomed: false,
      realTimeDoomed: TimeSpan.zero,
      totalAntimatter: new Decimal(0),
      realTimePlayed: TimeSpan.zero,
      timeSinceCreation: 0,
      uniqueNews: 0,
      totalNews: 0,
      secretAchievementCount: 0,
      infinity: {
        isUnlocked: false,
        count: new Decimal(0),
        banked: new Decimal(0),
        projectedBanked: new Decimal(0),
        bankRate: new Decimal(0),
        hasBest: false,
        best: TimeSpan.zero,
        this: TimeSpan.zero,
        thisReal: TimeSpan.zero,
        bestRate: new Decimal(0),
      },
      eternity: {
        isUnlocked: false,
        count: new Decimal(0),
        hasBest: false,
        best: TimeSpan.zero,
        this: TimeSpan.zero,
        thisReal: TimeSpan.zero,
        bestRate: new Decimal(0),
      },
      reality: {
        isUnlocked: false,
        count: 0,
        best: TimeSpan.zero,
        bestReal: TimeSpan.zero,
        this: TimeSpan.zero,
        thisReal: TimeSpan.zero,
        totalTimePlayed: TimeSpan.zero,
        bestRate: new Decimal(0),
        bestRarity: 0,
      },
      matterScale: [],
      lastMatterTime: 0,
      paperclips: 0,
      fullTimePlayed: 0,
    };
  },
  computed: {
    fullGameCompletions() {
      return player.records.fullGameCompletions;
    },
    startDate() {
      return Time.toDateTimeString(player.records.gameCreatedTime);
    },
    saveAge() {
      return TimeSpan.fromMilliseconds(this.timeSinceCreation);
    },
  },
  methods: {
    update() {
      const records = player.records;
      this.totalAntimatter.copyFrom(records.totalAntimatter);
      this.realTimePlayed.setFrom(records.realTimePlayed);
      this.fullTimePlayed = TimeSpan.fromMilliseconds(records.previousRunRealTime + records.realTimePlayed);
      this.uniqueNews = NewsHandler.uniqueTickersSeen;
      this.totalNews = player.news.totalSeen;
      this.secretAchievementCount = SecretAchievements.all.filter(a => a.isUnlocked).length;
      this.timeSinceCreation = Date.now() - player.records.gameCreatedTime;

      const progress = PlayerProgress.current;
      const isInfinityUnlocked = progress.isInfinityUnlocked;
      const infinity = this.infinity;
      const bestInfinity = records.bestInfinity;
      infinity.isUnlocked = isInfinityUnlocked;
      if (isInfinityUnlocked) {
        infinity.count.copyFrom(Currency.infinities);
        infinity.banked.copyFrom(Currency.infinitiesBanked);
        infinity.projectedBanked = new Decimal(0).plusEffectsOf(
          Achievement(131).effects.bankedInfinitiesGain,
          TimeStudy(191)
        );
        infinity.bankRate = infinity.projectedBanked.div(Math.clampMin(33, records.thisEternity.time)).times(60000);
        infinity.hasBest = bestInfinity.time < 999999999999;
        infinity.best.setFrom(bestInfinity.time);
        infinity.this.setFrom(records.thisInfinity.time);
        infinity.bestRate.copyFrom(bestInfinity.bestIPminEternity);
      }

      const isEternityUnlocked = progress.isEternityUnlocked;
      const eternity = this.eternity;
      const bestEternity = records.bestEternity;
      eternity.isUnlocked = isEternityUnlocked;
      if (isEternityUnlocked) {
        eternity.count.copyFrom(Currency.eternities);
        eternity.hasBest = bestEternity.time < 999999999999;
        eternity.best.setFrom(bestEternity.time);
        eternity.this.setFrom(records.thisEternity.time);
        eternity.bestRate.copyFrom(bestEternity.bestEPminReality);
      }

      const isRealityUnlocked = progress.isRealityUnlocked;
      const reality = this.reality;
      const bestReality = records.bestReality;
      reality.isUnlocked = isRealityUnlocked;

      if (isRealityUnlocked) {
        reality.count = Math.floor(Currency.realities.value);
        reality.best.setFrom(bestReality.time);
        reality.bestReal.setFrom(bestReality.realTime);
        reality.this.setFrom(records.thisReality.time);
        reality.totalTimePlayed.setFrom(records.totalTimePlayed);
        // Real time tracking is only a thing once reality is unlocked:
        infinity.thisReal.setFrom(records.thisInfinity.realTime);
        infinity.bankRate = infinity.projectedBanked.div(Math.clampMin(33, records.thisEternity.realTime)).times(60000);
        eternity.thisReal.setFrom(records.thisEternity.realTime);
        reality.thisReal.setFrom(records.thisReality.realTime);
        reality.bestRate.copyFrom(bestReality.RMmin);
        reality.bestRarity = Math.max(strengthToRarity(bestReality.glyphStrength), 0);
      }
      this.updateMatterScale();

      this.isDoomed = Pelle.isDoomed;
      this.realTimeDoomed.setFrom(player.records.realTimeDoomed);
      this.paperclips = player.news.specialTickerData.paperclips;
    },
    formatDecimalAmount(value) {
      return value.gt(1e9) ? format(value, 3) : formatInt(Math.floor(value.toNumber()));
    },
    // Only updates once per second to reduce jitter
    updateMatterScale() {
      if (Date.now() - this.lastMatterTime > 1000) {
        this.matterScale = MatterScale.estimate(Currency.antimatter.value);
        this.lastMatterTime = Date.now();
      }
    },
    realityClassObject() {
      return {
        "c-stats-tab-title": true,
        "c-stats-tab-reality": !this.isDoomed,
        "c-stats-tab-doomed": this.isDoomed,
      };
    }
  },
  template: `
  <div
    class="c-stats-tab"
    data-v-statistics-tab
  >
    <div>
      <PrimaryButton onclick="Modal.catchup.show(0)">
        View Content Summary
      </PrimaryButton>
      <div
        class="c-stats-tab-title c-stats-tab-general"
        data-v-statistics-tab
      >
        常规
      </div>
      <div
        class="c-stats-tab-general"
        data-v-statistics-tab
      >
        <div>您总共制造了 {{ format(totalAntimatter, 2, 1) }} 个反物质。</div>
        <div>你已经玩了{{ realTimePlayed }}。（现实时间）</div>
        <div v-if="reality.isUnlocked">
          游戏中的你经历了 {{ reality.totalTimePlayed }} 的游戏内时间
        </div>
        <div>
          你的存档创建于 {{ startDate }} （{{ saveAge }} 之前）
        </div>
        <br>
        <div>
          你已阅读 {{ formatInt(totalNews) }} 条新闻。
        </div>
        <div>
          你已发现 {{ formatInt(uniqueNews) }} 条不同的新闻消息。
        </div>
        <div>
          你已解锁 {{ formatInt(secretAchievementCount) }} 个隐藏成就。
        </div>
        <div v-if="paperclips">
          你拥有 {{ formatInt(paperclips) }} 个无用回形针。
        </div>
        <div v-if="fullGameCompletions">
          <br>
          <b>
            您已通关游戏 {{ formatInt(fullGameCompletions) }} 次。
            <br>
            总计游玩了 {{ fullTimePlayed }}。
          </b>
        </div>
      </div>
      <div>
        <br>
        <div
          class="c-matter-scale-container c-stats-tab-general"
          data-v-statistics-tab
        >
          <div
            v-for="(line, i) in matterScale"
            :key="i"
          >
            {{ line }}
          </div>
          <br v-if="matterScale.length < 2">
          <br v-if="matterScale.length < 3">
        </div>
      </div>
      <br>
    </div>
    <div
      v-if="infinity.isUnlocked"
      class="c-stats-tab-subheader c-stats-tab-general"
      data-v-statistics-tab
    >
      <div
        class="c-stats-tab-title c-stats-tab-infinity"
        data-v-statistics-tab
      >
        无限
      </div>
      <div>
        你的无限次数是 {{ formatDecimalAmount(infinity.count) }}。
      </div>
      <div v-if="infinity.banked.gt(0)">
        你有 {{ formatDecimalAmount(infinity.banked.floor()) }} 储存的无限次数。
      </div>
      <div v-if="infinity.hasBest">
        你最快的无限用时 {{ infinity.best.toStringShort() }}。
      </div>
      <div v-else>
        你本次永恒中不存在最快的无限用时。
      </div>
      <div>
        你已在本次无限中花费 {{ infinity.this.toStringShort() }}。
        <span v-if="reality.isUnlocked">
          （{{ infinity.thisReal.toStringShort() }} 现实时间）
        </span>
      </div>
      <div>
        <span v-if="eternity.count.gt(0)">在本次永恒中，</span>
        你获得无限点数的最快速度是每分钟 {{ format(infinity.bestRate, 2, 2) }} 无限点数。
      </div>
      <br>
    </div>
    <div
      v-if="eternity.isUnlocked"
      class="c-stats-tab-subheader c-stats-tab-general"
      data-v-statistics-tab
    >
      <div
        class="c-stats-tab-title c-stats-tab-eternity"
        data-v-statistics-tab
      >
        永恒
      </div>
      <div>
        你的永恒次数是 {{ formatDecimalAmount(eternity.count) }}。
      </div>
      <div v-if="infinity.projectedBanked.gt(0)">
        永恒后储存的无限次数增加 {{ formatDecimalAmount(infinity.projectedBanked.floor()) }} （ {{ formatDecimalAmount(infinity.bankRate) }} /分钟）。
      </div>
      <div v-else-if="infinity.banked.gt(0)">
        永恒后不能获得储存的无限次数。
      </div>
      <div v-if="eternity.hasBest">
        Your fastest Eternity was {{ eternity.best.toStringShort() }}.
      </div>
      <div v-else>
        你<span v-if="reality.isUnlocked">本次现实中</span>不存在最快的永恒用时。
      </div>
      <div>
        你已在本次永恒中花费 {{ eternity.this.toStringShort() }}。
        <span v-if="reality.isUnlocked">
          （{{ eternity.thisReal.toStringShort() }} 现实时间）
        </span>
      </div>
      <div>
        <span v-if="reality.isUnlocked">在本次现实中，</span>
        你获得永恒点数的最快速度是每分钟 {{ format(eternity.bestRate, 2, 2) }} 永恒点数。
      </div>
      <br>
    </div>
    <div
      v-if="reality.isUnlocked"
      class="c-stats-tab-subheader c-stats-tab-general"
      data-v-statistics-tab
    >
      <div
        :class="realityClassObject()"
        data-v-statistics-tab
      >
        {{ isDoomed ? "被毁灭的现实" : "现实" }}
      </div>
      <div>你进行了 {{ formatInt(reality.count) }} 次现实。</div>
      <div>按游戏内时间计算，你最快的现实用时为 {{ reality.best.toStringShort() }}（游戏内时间）。</div>
      <div>按现实时间计算，你最快的现实用时为 {{ reality.bestReal.toStringShort() }}（现实时间）。</div>
      <div
        :class="{ 'c-stats-tab-doomed' : isDoomed }"
        data-v-statistics-tab
      >
        你已在本次{{ isDoomed ? "末日" : "现实" }}中花费 {{ reality.this.toStringShort() }}。
        （{{ reality.thisReal.toStringShort() }} 现实时间）
      </div>
      <div
        v-if="isDoomed"
        class="c-stats-tab-doomed"
        data-v-statistics-tab
      >
        从毁灭你的现实至今， 你经历了 {{ realTimeDoomed.toStringShort() }} 的现实时间。
      </div>
      <div>
        在一次现实中获得现实机器的最大速度：{{ format(reality.bestRate, 2, 2) }}/分
      </div>
      <div>符文稀有度的最大值为 {{ formatRarity(reality.bestRarity) }}.</div>
      <br>
    </div>
  </div>
  `
};