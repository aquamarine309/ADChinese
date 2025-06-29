import { Effarig } from "./effarig.js";
import { Enslaved } from "./enslaved.js";
import { Laitela } from "./laitela/laitela.js";
import { Pelle } from "./pelle/pelle.js";
import { Ra } from "./ra/ra.js";
import { Teresa } from "./teresa.js";
import { V } from "./V.js";

export const Celestials = {
  teresa: Teresa,
  effarig: Effarig,
  enslaved: Enslaved,
  v: V,
  ra: Ra,
  laitela: Laitela,
  pelle: Pelle
};

GameDatabase.celestials.descriptions = [
  {
    name: "特蕾莎",
    effects() {
      return `符文无法生产时间之理。
      获得更少的无限点数和永恒点数（x^${format(0.55, 2, 2)}）。`;
    },
  },
  {
    name: "鹿颈长",
    effects() {
      return `所有维度的倍率、游戏速度和计数频率都受到类似时间膨胀的削弱。
      无限之力可以降低产量和游戏速度的削弱程度，时间碎片可以减少计数频率的削弱程度。
      符文等级暂时限制为 ${formatInt(Effarig.glyphLevelCap)}，稀有度不受影响。`;
    },
    description() {
      return `当你第一次完成一个层级时，直接退出鹿颈长的现实。`;
    }
  },
  {
    name: "无名氏",
    effects() {
      return `符文等级提升到至少 ${formatInt(5000)}。
      无限、时间和第八反物质维度都只能购买 ${formatInt(1)} 个。
      反物质的倍数受到类似时间膨胀的削弱，膨胀符文的“提升时间膨胀中的反物质指数”效果依然在时间膨胀中生效。
      无法购买时间研究 192 （复制器的项目存在上限）
      禁用黑洞。
      大幅减少超光速粒子和膨胀时间的产量。
      膨胀符文无法生产时间之理。
      某些挑战目标有所增加。
      使用储存的游戏时间（释放黑洞）时，其指数变为原来的 ${format(0.55, 2, 2)} 次方。`;
    }
  },
  {
    name: "V",
    effects() {
      const vEffect = `所有的维度倍率、永恒点数、无限点数和膨胀时间的产量，都是原来的平方根。
      复制器的复制间隔是原来的平方。`;
      const vEffectAdditional = `
      禁用符文炼金中“指数”的效果。`;

      return Ra.unlocks.unlockGlyphAlchemy.canBeApplied
        ? vEffect + vEffectAdditional
        : vEffect;
    }
  },
  {
    name: "Ra",
    effects() {
      return `你最多只有 ${formatInt(4)} 个维度提升。
      计数频率倍率固定为 ${formatX(1.1245, 0, 3)}。`;
    },
  },
  {
    name: "Lai'tela",
    effects() {
      let disabledDims;
      const highestActive = 8 - Laitela.difficultyTier;
      switch (highestActive) {
        case 0:
          disabledDims = "所有维度";
          break;
        case 1:
          disabledDims = "第二维度及其以上的维度";
          break;
        case 2:
          disabledDims = "第三维度及其以上的维度";
          break;
        case 3:
          disabledDims = "第四维度及其以上的维度";
          break;
        case 4:
          disabledDims = "第五维度及其以上的维度";
          break;
        case 5:
          disabledDims = "第六维度及其以上的维度";
          break;
        case 6:
          disabledDims = "第七和第八维度";
          break;
        case 7:
          disabledDims = "第八维度";
          break;
        case 8:
          break;
        default:
          throw new Error("Unexpected highest active tier of Lai'tela limitations");
      }
      const disabledText = highestActive === 8
        ? ""
        : `禁用${disabledDims}的生产。`;

      return `无限点数和永恒点数受到类似时间膨胀的削弱。
      游戏速度降低至 ${formatInt(1)}, 在 ${formatInt(10)} 分钟内逐渐复原。
      禁用黑洞的充能、释放、脉冲、反转。
      ${disabledText}`;
    },
    description() {
      return `在这个现实中，反物质产生熵。熵达到 ${formatPercents(1)} 时，该现实将出现不稳定。你将基于达到 ${formatPercents(1)} 的用时，获得暗物质维度加成。如果你能在 ${formatInt(30)} 秒内令该现实出现不稳定，该现实的难度将大幅提升，不过你能获得更强大的加成。该现实出现不稳定 ${formatInt(8)} 次后，暗能量的产量 ${formatX(8)}。`;
    }
  },
];