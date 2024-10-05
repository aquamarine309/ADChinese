export default {
  name: "ImportFilterSingleType",
  props: {
    type: {
      type: String,
      required: true,
    },
    currSettings: {
      type: Object,
      required: true,
    },
    newSettings: {
      type: Object,
      required: true,
    }
  },
  computed: {
    settingsChanged() {
      return JSON.stringify(this.currSettings) !== JSON.stringify(this.newSettings);
    },
    symbol() {
      return GLYPH_SYMBOLS[this.type];
    },
    capitalized() {
      return `${this.type.charAt(0).toUpperCase()}${this.type.substring(1)}`;
    },
    rarityStr() {
      return this.changedValue(this.currSettings.rarity, this.newSettings.rarity, x => formatPercents(x / 100));
    },
    effectStr() {
      return this.changedValue(this.currSettings.effectCount, this.newSettings.effectCount, formatInt);
    },
    scoreStr() {
      return this.changedValue(this.currSettings.score, this.newSettings.score, formatInt);
    },
    effectData() {
      const changes = [];
      for (let index = 0; index < this.currSettings.effectScores.length; index++) {
        const bitmaskIndex = AutoGlyphProcessor.bitmaskIndexOffset(this.type) + index;
        changes.push({
          bitmaskIndex,
          oldReq: (this.currSettings.specifiedMask & (1 << bitmaskIndex)) !== 0,
          newReq: (this.newSettings.specifiedMask & (1 << bitmaskIndex)) !== 0,
          oldScore: this.currSettings.effectScores[index],
          newScore: this.newSettings.effectScores[index],
        });
      }
      return changes;
    }
  },
  methods: {
    changedValue(oldVal, newVal, applyFn) {
      if (oldVal === newVal) return applyFn(oldVal);
      return `${applyFn(oldVal)}➜${applyFn(newVal)}`;
    },
    effectScoreStr(effectEntry) {
      const fullStr = (isSelected, value) => {
        const check = isSelected ? "✔" : "✘";
        return `${check}${formatInt(value)}`;
      };
      const oldStr = fullStr(effectEntry.oldReq, effectEntry.oldScore);
      const newStr = fullStr(effectEntry.newReq, effectEntry.newScore);

      if (effectEntry.oldScore === effectEntry.newScore) return oldStr;
      return `${oldStr}➜${newStr}`;
    },
    topLevelClassObject(key) {
      return {
        "o-cell": true,
        "o-cell--changed": this.currSettings[key] !== this.newSettings[key],
      };
    },
    effectClassObject(effectEntry) {
      return {
        "o-cell": true,
        "o-cell--changed": effectEntry.oldReq !== effectEntry.newReq || effectEntry.oldScore !== effectEntry.newScore,
      };
    },
    getEffectDesc(effectEntry) {
      return GlyphEffects.all.find(e => e.bitmaskIndex === effectEntry.bitmaskIndex && e.isGenerated).genericDesc;
    }
  },
  template: `
  <div>
    {{ symbol }}:
    <span v-if="settingsChanged">
      <span
        class="c-single-row"
        data-v-import-filter-single-type
      >
        <span
          class="c-rarity"
          :class="topLevelClassObject('rarity')"
          ach-tooltip="Setting for Rarity Threshold and Specified Effect"
          data-v-import-filter-single-type
        >
          {{ rarityStr }}
        </span>
        <span
          class="c-effects-count"
          :class="topLevelClassObject('effectCount')"
          ach-tooltip="Number of effects in Specified Effect"
          data-v-import-filter-single-type
        >
          Minimum Effects: {{ effectStr }}
        </span>
        <span
          class="c-target-score"
          :class="topLevelClassObject('score')"
          ach-tooltip="Threshold for Effect Score"
          data-v-import-filter-single-type
        >
          Score: {{ scoreStr }}
        </span>
      </span>
      <br>
      <span
        class="c-single-row"
        data-v-import-filter-single-type
      >
        <span
          v-for="effect in effectData.slice(0, 4)"
          :key="effect.bitmaskIndex"
          class="c-single-score"
          :class="effectClassObject(effect)"
          :ach-tooltip="getEffectDesc(effect)"
          data-v-import-filter-single-type
        >
          {{ effectScoreStr(effect) }}
        </span>
      </span>
      <span
        v-if="effectData.length > 4"
        class="c-single-row c-second-row"
        data-v-import-filter-single-type
      >
        <br>
        <span
          v-for="effect in effectData.slice(4)"
          :key="effect.bitmaskIndex"
          class="c-single-score o-cell"
          :class="effectClassObject(effect)"
          :ach-tooltip="getEffectDesc(effect)"
          data-v-import-filter-single-type
        >
          {{ effectScoreStr(effect) }}
        </span>
      </span>
    </span>
    <span v-else>
      (No changes)
    </span>
  </div>
  `
};