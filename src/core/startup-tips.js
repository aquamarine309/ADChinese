class StartupTipState {
  constructor(config) {
    this.config = config;
    this.id = config.id;
  }
  
  get isUnlocked() {
    return (this.config.isUnlocked?.() ?? true) &&
      (this.enslavedOnly === Enslaved.isRunning);
  }
  
  get enslavedOnly() {
    return this.config.enslavedOnly ?? false;
  }
  
  get pelleOnly() {
    return this.config.pelleOnly ?? false;
  }
};

const StartupTips = mapGameData(
  GameDatabase.startupTips,
  config => new StartupTipState(config)
);

export function getAvailableStartupTips() {
  if (Pelle.isDoomed) return StartupTips.filter(tip => tip.pelleOnly);
  return StartupTips.filter(tip => tip.isUnlocked);
}