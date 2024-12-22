import ModalWrapper from "./ModalWrapper.js";
import PrimaryButton from "../PrimaryButton.js";

export default {
  name: "RealityGlyphCreationModal",
  components: {
    ModalWrapper,
    PrimaryButton
  },
  data() {
    return {
      isDoomed: false,
      realityGlyphLevel: 0,
      // This contains an array where each entry is an array looking like [4000, "realitygalaxies"]
      possibleEffects: [],
    };
  },
  methods: {
    update() {
      this.isDoomed = Pelle.isDoomed;
      this.realityGlyphLevel = AlchemyResource.reality.effectValue;
      const realityEffectConfigs = GlyphEffects.all
        .filter(eff => eff.glyphTypes.includes("reality"))
        .sort((a, b) => a.bitmaskIndex - b.bitmaskIndex);
      const minRealityEffectIndex = realityEffectConfigs.map(cfg => cfg.bitmaskIndex).min();
      this.possibleEffects = realityEffectConfigs
        .map(cfg => [realityGlyphEffectLevelThresholds[cfg.bitmaskIndex - minRealityEffectIndex], cfg.id]);
    },
    createRealityGlyph() {
      if (GameCache.glyphInventorySpace.value === 0) {
        Modal.message.show("No available inventory space; Sacrifice some Glyphs to free up space.",
          { closeEvent: GAME_EVENT.GLYPHS_CHANGED });
        return;
      }
      Glyphs.addToInventory(GlyphGenerator.realityGlyph(this.realityGlyphLevel));
      AlchemyResource.reality.amount = 0;
      player.reality.glyphs.createdRealityGlyph = true;
      this.emitClose();
    },
    formatGlyphEffect(effect) {
      if (this.realityGlyphLevel < effect[0]) return `(Requires Glyph level ${formatInt(effect[0])})`;
      const config = GlyphEffects[effect[1]];
      const value = config.effect(this.realityGlyphLevel, rarityToStrength(100));
      const effectTemplate = config.singleDesc;
      return effectTemplate.replace("{value}", config.formatEffect(value));
    }
  },
  template: `
  <ModalWrapper>
    <template #header>
      创造现实符文
    </template>
    <div class="c-reality-glyph-creation">
      <div>
        消耗所有的“现实”炼金资源，创造一个等级为 {{ formatInt(realityGlyphLevel) }} 的现实符文。该现实符文的稀有度始终为 {{ formatPercents(1) }}, 其等级基于炼金资源“现实”的数量决定。创造现实符文不会影响其它的炼金资源。现实符文具有独特的词条，有些词条只会在等级达到一定数值后出现。你可以献祭现实符文，提高所有记忆块的数量倍率。你只能装备一个现实符文，这一点和鹿颈长符文一样。
      </div>
      <div
        class="o-available-effects-container"
        data-v-reality-glyph-creation-modal
      >
        <div
          class="o-available-effects"
          data-v-reality-glyph-creation-modal
        >
          符文词条：
        </div>
        <div
          v-for="(effect, index) in possibleEffects"
          :key="index"
        >
          {{ formatGlyphEffect(effect) }}
        </div>
      </div>
      <PrimaryButton
        v-if="isDoomed"
        :enabled="false"
      >
        你不能在毁灭的现实中创造现实符文
      </PrimaryButton>
      <PrimaryButton
        v-else-if="realityGlyphLevel !== 0"
        @click="createRealityGlyph"
      >
        创造一个现实符文！
      </PrimaryButton>
      <PrimaryButton
        v-else
        :enabled="false"
      >
        现实符文的等级必须大于 {{ formatInt(0) }}
      </PrimaryButton>
    </div>
  </ModalWrapper>
  `
};