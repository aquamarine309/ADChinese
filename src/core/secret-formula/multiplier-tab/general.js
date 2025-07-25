import { DC } from "../../constants.js";

import { MultiplierTabHelper } from "./helper-functions.js";
import { MultiplierTabIcons } from "./icons.js";

// See index.js for documentation
export const general = {
  achievement: {
    name: (ach, dim) => (dim?.length === 2
      ? `成就 ${ach}（${dim}）`
      : `成就 ${ach}`),
    multValue: (ach, dim) => {
      // There is also a banked infinities gain effect, but we don't track that in the multiplier tab
      if (ach === 131) return Achievement(131).canBeApplied
        ? Achievement(131).effects.infinitiesGain.effectOrDefault(1) : 1;
      // There is also a buy10 effect, but we don't track that in the multiplier tab
      if (ach === 141) return Achievement(141).canBeApplied ? Achievement(141).effects.ipGain.effectOrDefault(1) : 1;
      if (ach === 183) return 1;
      if (!dim) return Achievement(ach).canBeApplied ? Achievement(ach).effectOrDefault(1) : 1;

      if (dim?.length === 2) {
        let totalEffect = DC.D1;
        for (let tier = 1; tier <= MultiplierTabHelper.activeDimCount(dim); tier++) {
          let singleEffect;
          if (ach === 43) singleEffect = Achievement(43).canBeApplied ? (1 + tier / 100) : 1;
          else singleEffect = (MultiplierTabHelper.achievementDimCheck(ach, `${dim}${tier}`) &&
              Achievement(ach).canBeApplied) ? Achievement(ach).effectOrDefault(1) : 1;
          totalEffect = totalEffect.times(singleEffect);
        }
        return totalEffect;
      }

      if (ach === 43) return Achievement(43).canBeApplied ? (1 + Number(dim.charAt(2)) / 100) : 1;
      return (MultiplierTabHelper.achievementDimCheck(ach, dim) && Achievement(ach).canBeApplied)
        ? Achievement(ach).effectOrDefault(1) : 1;
    },
    // 183 is the only time a power effect is in an Achievement, so we special-case it here and return a x1 multiplier
    powValue: ach => (ach === 183 ? Achievement(183).effectOrDefault(1) : 1),
    isActive: ach => Achievement(ach).canBeApplied,
    icon: ach => {
      const base = MultiplierTabIcons.ACHIEVEMENT;
      return {
        color: base.color,
        symbol: `${base.symbol}${ach}`,
      };
    },
  },
  timeStudy: {
    name: (ts, dim) => (dim?.length === 2
      ? `时间研究 ${ts}（${dim}）`
      : `时间研究 ${ts}`),
    multValue: (ts, dim) => {
      // This is a special case for the passive path RG study, as its effect is 0.4 (for galaxy power) but
      // in the multiplier tab we only reference its replicanti speed value (which is 1.5)
      // The PASS perk doubles this effect
      if (ts === 132) {
        const passPerkMult = Perk.studyPassive.isBought ? 2 : 1;
        return TimeStudy(ts).canBeApplied ? 1.5 * passPerkMult : 1;
      }

      if (!dim) return TimeStudy(ts).canBeApplied ? TimeStudy(ts).effectOrDefault(1) : 1;
      if (dim?.length === 2) {
        let totalEffect = DC.D1;
        for (let tier = 1; tier <= MultiplierTabHelper.activeDimCount(dim); tier++) {
          totalEffect = totalEffect.times((MultiplierTabHelper.timeStudyDimCheck(ts, `${dim}${tier}`) &&
              TimeStudy(ts).isBought) ? TimeStudy(ts).effectOrDefault(1) : 1);
        }
        return totalEffect;
      }
      // The new Decimal() wrapper is necessary because, for some inexplicable reason, replicanti becomes
      // reactive through TS101 if that isn't there
      return (MultiplierTabHelper.timeStudyDimCheck(ts, dim) && TimeStudy(ts).isBought)
        ? new Decimal(TimeStudy(ts).effectOrDefault(1)) : 1;
    },
    isActive: ts => TimeStudy(ts).isBought,
    icon: ts => {
      const base = MultiplierTabIcons.TIME_STUDY;
      return {
        color: base.color,
        symbol: `${base.symbol}${ts}`,
      };
    },
  },
  infinityChallenge: {
    name: ic => `无限挑战 ${ic}`,
    displayOverride: ic => (ic === 4 ? formatPow(InfinityChallenge(4).reward.effectValue, 0, 3) : ""),
    multValue: (ic, dim) => {
      // We cheat here by actually giving IC4 a multiplier of a value equal to its effect on the final
      // value in order to represent its proportion accurately. It's hidden by displayOverride
      if (ic === 4) {
        const ic4Pow = InfinityChallenge(4).reward.effectValue;
        const mults = AntimatterDimensions.all.map(ad => ad.multiplier.pow((ic4Pow - 1) / ic4Pow));
        if (dim?.length === 2) return mults.reduce((x, y) => x.times(y), DC.D1);
        return mults[Number(dim.charAt(2)) - 1];
      }

      if (dim?.length === 2) {
        let totalEffect = DC.D1;
        for (let tier = 1; tier <= MultiplierTabHelper.activeDimCount(dim); tier++) {
          totalEffect = totalEffect.times((MultiplierTabHelper.ICDimCheck(ic, `${dim}${tier}`) &&
              InfinityChallenge(ic).isCompleted) ? InfinityChallenge(ic).reward.effectOrDefault(1) : 1);
        }
        return totalEffect;
      }
      const num = Number(dim.charAt(2));
      if (ic === 8) return (num > 1 && num < 8) ? InfinityChallenge(ic).reward.effectValue : DC.D1;
      return InfinityChallenge(ic).reward.effectValue;
    },
    isActive: ic => InfinityChallenge(ic).isCompleted,
    icon: ic => {
      const base = MultiplierTabIcons.CHALLENGE("infinity");
      return {
        color: base.color,
        symbol: `${base.symbol}${ic}`,
      };
    },
  },
  eternityChallenge: {
    name: ec => `永恒挑战 ${ec}`,
    multValue: (ec, dim) => {
      if (dim?.length === 2) {
        let totalEffect = DC.D1;
        for (let tier = 1; tier <= MultiplierTabHelper.activeDimCount(dim); tier++) {
          totalEffect = totalEffect.times(
            (MultiplierTabHelper.ECDimCheck(ec, `${dim}${tier}`) && EternityChallenge(ec).reward.canBeApplied)
              ? EternityChallenge(ec).reward.effectOrDefault(1).clampMin(1)
              : 1);
        }
        return totalEffect;
      }
      if (ec === 2) return dim === "ID1" ? EternityChallenge(ec).reward.effectValue : DC.D1;
      return EternityChallenge(ec).reward.effectOrDefault(1);
    },
    isActive: ec => EternityChallenge(ec).reward.canBeApplied,
    icon: ec => {
      const base = MultiplierTabIcons.CHALLENGE("eternity");
      return {
        color: base.color,
        symbol: `${base.symbol}${ec}`,
      };
    },
  },
};
