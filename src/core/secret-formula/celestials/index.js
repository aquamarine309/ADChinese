import { finalSigil } from "./navigation-sigils/final-sigil.js";
import { galaxyIcon } from "./navigation-sigils/galaxy-icon.js";
import { alchemyResources } from "./alchemy.js";
import { effarigUnlocks } from "./effarig.js";
import { enslaved } from "./enslaved.js";
import { pelleGalaxyGeneratorUpgrades } from "./galaxy-generator.js";
import { celestialNavigation } from "./navigation.js";
import { pelleUpgrades } from "./pelle-upgrades.js";
import { perkShop } from "./perk-shop.js";
import { ra } from "./ra.js";
import { pelleRifts } from "./rifts.js";
import { singularityMilestones } from "./singularity-milestones.js";
import { pelleStrikes } from "./strikes.js";
import { teresa } from "./teresa.js";
import { quotes } from "./quotes/index.js";
import { v } from "./v.js";

export const celestials = {
  effarig: {
    unlocks: effarigUnlocks
  },
  alchemy: {
    resources: alchemyResources
  },
  pelle: {
    galaxyGeneratorUpgrades: pelleGalaxyGeneratorUpgrades,
    strikes: pelleStrikes,
    upgrades: pelleUpgrades,
    rifts: pelleRifts
  },
  descriptions: {},
  enslaved,
  navigation: celestialNavigation,
  navSigils: {
    ...galaxyIcon,
    ...finalSigil
  },
  perkShop,
  ra,
  singularityMilestones,
  teresa,
  quotes,
  v
};
