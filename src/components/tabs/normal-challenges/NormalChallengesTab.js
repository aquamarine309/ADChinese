import ChallengeGrid from '../../ChallengeGrid.js'
import ChallengeTabHeader from '../../ChallengeTabHeader.js'
import NormalChallengeBox from './NormalChallengeBox.js'

export default {
  name: 'NormalChallengesTab',
  components: {
    ChallengeGrid,
    ChallengeTabHeader,
    NormalChallengeBox,
  },
  computed: {
    challenges() {
      return NormalChallenges.all
    },
  },
  template: `
  <div class="l-challenges-tab">
    <ChallengeTabHeader />
    <div>
      部分普通挑战存在开启前置需求。
    </div>
    <div>
      如果启用自动大坍缩，不论采用何种设置，当反物质数量接近挑战目标时，它会尽全力强制进行一次大坍缩。
    </div>
    <br/>
    <ChallengeGrid
      v-slot="{ challenge }"
      :challenges="challenges"
    >
      <NormalChallengeBox :challenge="challenge" />
    </ChallengeGrid>
  </div>
  `,
}
