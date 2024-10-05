export const Cloud = {
  provider: null,
  auth: null,
  db: null,
  user: null,
  lastCloudHash: null,

  get isAvailable() {
    return false;
  },

  resetTempState() {},

  get loggedIn() {
    return this.user !== null;
  },

  async login() {},

  async loginWithSteam(accountId, staticAccountId, screenName) {},

  // NOTE: This function is largely untested due to not being used at any place within web reality code
  async loadMobile() {},

  compareSaves(cloud, local, hash) {},

  async saveCheck(forceModal = false) {},

  save() {},

  async loadCheck() {},

  async load() {},

  // The initial implementation of cloud saving combined all save files in the same DB entry, but we have since changed
  // it so that they're all saved in separate slots. The database itself retains the single-entry data until the first
  // player load attempt after this change, at which point this is called client-side to do a one-time format migration
  // Before the migration, saves were stored in ".../web" and afterward they have been moved to ".../web/1" and similar
  async separateSaveSlots() {},

  readFromCloudDB(slot) {},

  writeToCloudDB(slot, data) {},

  logout() {},

  init() {},
};
