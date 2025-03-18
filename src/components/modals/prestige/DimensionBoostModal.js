import ModalWrapperChoice from '../ModalWrapperChoice.js'

export default {
  name: 'DimensionBoostModal',
  components: {
    ModalWrapperChoice,
  },
  props: {
    bulk: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    topLabel() {
      return `你正要进行维度提升`
    },
    message() {
      const keepDimensions =
        Perk.antimatterNoReset.canBeApplied || Achievement(111).canBeApplied || PelleUpgrade.dimBoostResetsNothing.isBought
          ? `……实际上不会重置任何东西，因为你的升级可以防止反物质和反物质维度在这种情况下发生重置。您仍会像往常一样从“提升”中获得倍增效果。`
          : `重置你的反物质和分物质维度。你确定要这样做吗？`

      return `这将会${keepDimensions}`
    },
  },
  methods: {
    handleYesClick() {
      requestDimensionBoost(this.bulk)
      EventHub.ui.offAll(this)
    },
  },
  template: `
  <ModalWrapperChoice
    option="dimensionBoost"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ topLabel }}
    </template>
    <div class="c-modal-message__text">
      {{ message }}
    </div>
  </ModalWrapperChoice>
  `,
}
