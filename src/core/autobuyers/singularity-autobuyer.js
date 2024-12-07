import { AutobuyerState } from "./autobuyer.js";

export class SingularityAutobuyerState extends AutobuyerState {
  get data() {
    return player.auto.singularity;
  }

  get name() {
    return `奇点`;
  }

  get isUnlocked() {
    return SingularityMilestone.autoCondense.canBeApplied;
  }

  get bulk() {
    return Singularity.singularitiesGained;
  }

  tick() {
    if (Currency.darkEnergy.value >= Singularity.cap * SingularityMilestone.autoCondense.effectValue) {
      Singularity.perform();
    }
  }
}
