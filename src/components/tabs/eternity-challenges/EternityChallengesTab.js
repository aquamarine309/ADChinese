import ChallengeGrid from '../../ChallengeGrid.js'
import ChallengeTabHeader from '../../ChallengeTabHeader.js'
import EternityChallengeBox from './EternityChallengeBox.js'

export default {
  name: 'EternityChallengesTab',
  components: {
    ChallengeTabHeader,
    ChallengeGrid,
    EternityChallengeBox,
  },
  data() {
    return {
      unlockedCount: 0,
      showAllChallenges: false,
      autoEC: false,
      isAutoECVisible: false,
      hasUpgradeLock: false,
      remainingECTiers: 0,
      untilNextEC: TimeSpan.zero,
      untilAllEC: TimeSpan.zero,
      hasECR: false,
    }
  },
  computed: {
    challenges() {
      return EternityChallenges.all
    },
    upgradeLockNameText() {
      return RealityUpgrade(12).isLockingMechanics ? RealityUpgrade(12).name : ImaginaryUpgrade(15).name
    },
    nextECText() {
      return this.untilNextEC.totalMilliseconds === 0 && !this.autoEC ? 'Immediately upon unpausing' : `${this.untilNextEC} (real time)`
    },
    allECText() {
      return this.untilAllEC.totalMilliseconds === 0 && !this.autoEC ? 'Immediately upon unpausing' : `After ${this.untilAllEC} (real time)`
    },
  },
  methods: {
    update() {
      this.showAllChallenges = player.options.showAllChallenges
      this.unlockedCount = EternityChallenges.all.filter(this.isChallengeVisible).length
      this.isAutoECVisible = Perk.autocompleteEC1.canBeApplied
      this.autoEC = player.reality.autoEC
      const shouldPreventEC7 = TimeDimension(1).amount.gt(0)
      this.hasUpgradeLock =
        RealityUpgrade(12).isLockingMechanics || (ImaginaryUpgrade(15).isLockingMechanics && shouldPreventEC7 && !Array.range(1, 6).some((ec) => !EternityChallenge(ec).isFullyCompleted))
      const remainingCompletions = EternityChallenges.remainingCompletions
      this.remainingECTiers = remainingCompletions
      if (remainingCompletions !== 0) {
        const autoECInterval = EternityChallenges.autoComplete.interval
        const untilNextEC = Math.max(autoECInterval - player.reality.lastAutoEC, 0)
        this.untilNextEC.setFrom(untilNextEC)
        this.untilAllEC.setFrom(untilNextEC + autoECInterval * (remainingCompletions - 1))
      }
      this.hasECR = Perk.studyECRequirement.isBought
    },
    isChallengeVisible(challenge) {
      return challenge.completions > 0 || challenge.isUnlocked || challenge.hasUnlocked || (this.showAllChallenges && PlayerProgress.realityUnlocked())
    },
  },
  template: `
  <div class="l-challenges-tab">
    <ChallengeTabHeader />
    <div v-if="isAutoECVisible">
      Eternity Challenges are automatically completed sequentially, requiring all previous
      Eternity Challenges to be fully completed before any progress is made.
    </div>
    <div
      v-if="isAutoECVisible && remainingECTiers > 0"
      class="c-challenges-tab__auto-ec-info l-challenges-tab__auto-ec-info"
    >
      <div class="l-challenges-tab__auto-ec-timers">
        <span
          v-if="hasUpgradeLock"
          class="l-emphasis"
          data-v-eternity-challenges-tab
        >
          Auto EC is currently disabled because of the "{{ upgradeLockNameText }}" upgrade requirement lock.
        </span>
        <span v-if="remainingECTiers > 0">
          Next Auto Eternity Challenge completion: {{ nextECText }}
        </span>
        <span>
          All Auto Eternity Challenge completions: {{ allECText }}
        </span>
        <br>
      </div>
    </div>
    <div>
      再次完成永恒挑战以获得更大的奖励，最多不超过 {{ formatInt(5) }} 次。<br/> 奖励永久有效，无需购买对应的时间研究。
    </div>
<div v-if="!hasECR">
      当你重置已解锁的永恒挑战时，无需重新完成次要条件<br>
      即可再次解锁，直至完成该挑战；仅需时间定理即可。
    </div>
    <div v-if="unlockedCount !== 12">
      已查看{{ formatInt(unlockedCount) }}个，共{{ formatInt(12) }}个永恒挑战。
    </div>
    <div v-else>
      已查看全部{{ formatInt(12) }}个永恒挑战。
    </div>
    <br/>
    <ChallengeGrid
      v-slot="{ challenge }"
      :challenges="challenges"
      :is-challenge-visible="isChallengeVisible"
    >
      <EternityChallengeBox :challenge="challenge" />
    </ChallengeGrid>
  </div>
  `,
}
