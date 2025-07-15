import { IntervaledAutobuyerState } from "./autobuyer.js";

export class DarkMatterDimensionAscensionAutobuyerState extends IntervaledAutobuyerState {
  get data() {
    return player.auto.ascension;
  }

  get name() {
    return `暗物质维度飞升`;
  }

  get isUnlocked() {
    return SingularityMilestone.ascensionAutobuyers.canBeApplied;
  }

  get interval() {
    return 1000 * SingularityMilestone.darkAutobuyerSpeed.effectValue;
  }

  get hasUnlimitedBulk() {
    return true;
  }

  tick() {
    super.tick();
    for (let i = 1; i <= SingularityMilestone.ascensionAutobuyers.effectValue; i++) {
      DarkMatterDimension(i).ascend();
    }
  }
}
