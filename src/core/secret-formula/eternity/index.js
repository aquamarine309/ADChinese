import { dilationUpgrades } from "./dilation-upgrades.js";
import { eternityMilestones } from "./eternity-milestones.js";
import { eternityUpgrades } from "./eternity-upgrades.js";

import { dilationTimeStudies } from "./time-studies/dilation-time-studies.js";
import { ecTimeStudies } from "./time-studies/ec-time-studies.js";
import { normalTimeStudies } from "./time-studies/normal-time-studies.js";

export const eternity = {
  dilation: dilationUpgrades,
  milestones: eternityMilestones,
  timeStudies: {
    dilation: dilationTimeStudies,
    ec: ecTimeStudies,
    normal: normalTimeStudies
  },
  upgrades: eternityUpgrades
};
