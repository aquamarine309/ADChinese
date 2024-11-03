import BlackHoleChargingSliders from "../../tabs/black-hole/BlackHoleChargingSliders.js";
import CelestialQuoteHistory from "../../CelestialQuoteHistory.js";
import PrimaryButton from "../../PrimaryButton.js";
import PrimaryToggleButton from "../../PrimaryToggleButton.js";

export default {
  name: "EnslavedTab",
  components: {
    CelestialQuoteHistory,
    PrimaryButton,
    PrimaryToggleButton,
    BlackHoleChargingSliders
  },
  data: () => ({
    isStoringBlackHole: false,
    isStoringReal: false,
    autoStoreReal: false,
    offlineEnabled: false,
    hasAutoRelease: false,
    isRunning: false,
    completed: false,
    storedBlackHole: 0,
    storedReal: 0,
    storedRealEffiency: 0,
    storedRealCap: 0,
    autoRelease: false,
    autoReleaseSpeed: 0,
    unlocks: [],
    buyableUnlocks: [],
    quote: "",
    currentSpeedUp: 0,
    hintsUnlocked: false,
    canModifyGameTimeStorage: false,
    canChangeStoreTime: false,
    canChangeStoreRealTime: false,
    canDischarge: false,
    canAutoRelease: false,
    hasNoCharge: true,
    hasReachedCurrentCap: false,
  }),
  computed: {
    storedRealEfficiencyDesc() {
      return formatPercents(this.storedRealEffiency);
    },
    storedRealCapDesc() {
      return timeDisplayShort(this.storedRealCap);
    },
    unlocksInfo() {
      return ENSLAVED_UNLOCKS;
    },
    nerfedBlackHoleTime() {
      return Enslaved.storedTimeInsideEnslaved(this.storedBlackHole);
    },
    realityTitle() {
      if (this.isRunning) return "你正处于无名氏的现实之中";
      return "开始无名氏的现实";
    },
    runButtonClassObject() {
      return {
        "c-enslaved-run-button__icon": true,
        "c-enslaved-run-button__icon--running": this.isRunning,
        "c-celestial-run-button--clickable": !this.isDoomed,
        "o-pelle-disabled-pointer": this.isDoomed
      };
    },
    runDescription() {
      return GameDatabase.celestials.descriptions[2].effects().split("\n");
    },
    realTimeButtonText() {
      if (!this.offlineEnabled) return "离线进度已禁用";
      if (this.autoStoreReal) return "离线时间存储";
      return "使用离线时间以生产";
    },
    // Use this here since Nameless has a fairly non-standard character, and SFCs don't support using \uf0c1
    enslavedSymbol: () => Enslaved.symbol,
    isDoomed: () => Pelle.isDoomed,
    storeGameTimeClass() {
      return {
        "o-enslaved-mechanic-button": true,
        "o-enslaved-mechanic-button--clickable": this.canModifyGameTimeStorage,
        "o-enslaved-mechanic-button--storing-time": this.isStoringBlackHole,
        "l-fixed-setting": !this.canModifyGameTimeStorage,
        "o-pelle-disabled": this.isDoomed
      };
    },
    storeRealTimeClass() {
      return {
        "o-enslaved-mechanic-button": true,
        "o-enslaved-mechanic-button--clickable": !this.isDoomed,
        "o-enslaved-mechanic-button--storing-time": this.isStoringReal,
        "l-fixed-setting": !this.canChangeStoreRealTime,
        "o-pelle-disabled": this.isDoomed
      };
    },
    dischargeClass() {
      return {
        "o-enslaved-mechanic-button": true,
        "o-enslaved-mechanic-button--clickable": !this.isDoomed,
        "l-fixed-setting": !this.canDischarge || this.hasNoCharge,
        "o-pelle-disabled": this.isDoomed
      };
    },
    doomedDisabledClass() {
      return { "o-pelle-disabled": this.isDoomed };
    },
    mechanicButtonClass() {
      return {
        "o-enslaved-mechanic-button": true,
        "o-enslaved-mechanic-button--clickable": !this.isDoomed
      };
    }
  },
  watch: {
    autoRelease(newValue) {
      player.celestials.enslaved.isAutoReleasing = newValue;
    }
  },
  methods: {
    update() {
      this.isStoringBlackHole = Enslaved.isStoringGameTime;
      this.storedBlackHole = player.celestials.enslaved.stored;
      this.isStoringReal = Enslaved.isStoringRealTime;
      this.autoStoreReal = player.celestials.enslaved.autoStoreReal;
      this.offlineEnabled = player.options.offlineProgress;
      this.hasAutoRelease = Ra.unlocks.autoPulseTime.canBeApplied;
      this.isRunning = Enslaved.isRunning;
      this.completed = Enslaved.isCompleted && !this.isDoomed;
      this.storedReal = player.celestials.enslaved.storedReal;
      this.storedRealEffiency = Enslaved.storedRealTimeEfficiency;
      this.storedRealCap = Enslaved.storedRealTimeCap;
      this.unlocks = Array.from(player.celestials.enslaved.unlocks);
      this.buyableUnlocks = Object.values(ENSLAVED_UNLOCKS).map(x => Enslaved.canBuy(x));
      this.quote = Enslaved.quote;
      this.autoRelease = player.celestials.enslaved.isAutoReleasing;
      this.autoReleaseSpeed = Enslaved.isAutoReleasing ? Enslaved.autoReleaseSpeed : 0;
      this.currentSpeedUp = Enslaved.currentBlackHoleStoreAmountPerMs;
      this.hintsUnlocked = EnslavedProgress.hintsUnlocked.hasProgress;
      this.canModifyGameTimeStorage = Enslaved.canModifyGameTimeStorage;
      this.canChangeStoreTime = Enslaved.canModifyGameTimeStorage;
      this.canChangeStoreRealTime = Enslaved.canModifyRealTimeStorage;
      this.canDischarge = Enslaved.canRelease(false);
      this.canAutoRelease = Enslaved.canRelease(true);
      this.hasNoCharge = player.celestials.enslaved.stored === 0;
      this.hasReachedCurrentCap = this.storedReal === this.storedRealCap;
    },
    toggleStoreBlackHole() {
      Enslaved.toggleStoreBlackHole();
    },
    toggleStoreReal() {
      Enslaved.toggleStoreReal();
    },
    toggleAutoStoreReal() {
      if (!this.offlineEnabled) return;
      Enslaved.toggleAutoStoreReal();
    },
    useStored() {
      Enslaved.useStoredTime(false);
    },
    timeDisplayShort(ms) {
      return timeDisplayShort(ms);
    },
    timeUntilBuy(price) {
      return Math.max((price - this.storedBlackHole) / this.currentSpeedUp, 0);
    },
    buyUnlock(info) {
      Enslaved.buyUnlock(info);
    },
    startRun() {
      if (this.isDoomed) return;
      Modal.celestials.show({ name: "无名氏", number: 2 });
    },
    hasUnlock(info) {
      return Enslaved.has(info);
    },
    canBuyUnlock(info) {
      // This (rather than just using Enslaved.canBuy(info) and removing this.buyableUnlocks)
      // is needed for proper reactivity of button styles (e.g., if you get a level 5000 glyph
      // while on the Nameless tab).
      return this.buyableUnlocks[info.id];
    },
    unlockClassObject(info) {
      return {
        "o-enslaved-shop-button--bought": this.hasUnlock(info),
        "o-enslaved-shop-button--available": this.canBuyUnlock(info)
      };
    },
    glitchStyle(x) {
      const xScale = 15 / 27;
      const yScale = 5;
      const dx = (x - 13) * xScale + (Math.random() * 2 - 1) * 0.85;
      const dy = (Math.random() * 2 - 1) * yScale;
      const height = (Math.pow(Math.random(), 1.5) + 0.25) * 3 * yScale;
      return {
        transform: `translate(${dx}rem, ${dy}rem)`,
        height: `${height}rem`,
      };
    }
  },
  template: `
  <div class="l-enslaved-celestial-tab">
    <CelestialQuoteHistory celestial="enslaved" />
    <div
      v-if="hasAutoRelease && canAutoRelease"
      class="c-subtab-option-container"
    >
      <PrimaryToggleButton
        v-model="autoRelease"
        class="o-primary-btn--subtab-option"
        label="脉冲黑洞："
      />
    </div>
    <div class="l-enslaved-celestial-tab--inner">
      <div class="l-enslaved-run-container">
        <div v-if="hasUnlock(unlocksInfo.RUN)">
          <div class="c-enslaved-run-button">
            <div
              class="c-enslaved-run-button__title"
              :class="doomedDisabledClass"
            >
              {{ realityTitle }}
            </div>
            <div v-if="completed">
              <b>（已完成）</b>
            </div>
            <div
              :class="runButtonClassObject"
              @click="startRun"
            >
              <div class="c-enslaved-run-button__icon__sigil">
                {{ enslavedSymbol }}
              </div>
              <div
                v-for="x in (isRunning ? 25 : 0)"
                :key="x"
                class="c-enslaved-run-button__icon__glitch"
                :style="glitchStyle(x)"
              />
            </div>
            <div
              v-for="line in runDescription"
              :key="line"
              class="c-enslaved-run-description-line"
              data-v-enslaved-tab
            >
              {{ line }}
            </div>
            <b>奖励：解锁超立方体，可提升无限维度的数量上限。（详见无限维度页面）</b>
          </div>
        </div>
      </div>
      <div class="l-enslaved-upgrades-column">
        <PrimaryButton
          v-if="hintsUnlocked"
          class="o-primary-btn"
          onclick="Modal.enslavedHints.show()"
        >
          Examine the Reality more closely...
        </PrimaryButton>
        <div class="l-enslaved-top-container">
          <div class="l-enslaved-top-container__half">
            黑洞充能时，{{ autoRelease ? "禁用" : "降低" }}黑洞的加速效果，失去的速度被转换为储存的游戏内时间。释放黑洞允许你跳过游戏内时间。储存的游戏内时间也用于购买某些升级。
            <button
              :class="storeGameTimeClass"
              @click="toggleStoreBlackHole"
            >
              <div
                class="o-enslaved-stored-time"
                :class="doomedDisabledClass"
              >
                {{ timeDisplayShort(storedBlackHole) }}
              </div>
              <div>
                {{ isStoringBlackHole ? "Charging Black Hole": "Charge Black Hole" }}
              </div>
            </button>
            <button
              :class="dischargeClass"
              @click="useStored"
            >
              <span>Discharge Black Hole</span>
              <p v-if="isRunning">
                {{ timeDisplayShort(nerfedBlackHoleTime) }} in this Reality
              </p>
            </button>
          </div>
          <div class="l-enslaved-top-container__half">
            Storing real time completely halts all production, setting game speed to {{ formatInt(0) }}.
            You can use stored real time to "amplify" a Reality, simulating repeated runs of it.
            Amplified Realities give all the rewards that normal Realities do.
            <button
              :class="[storeRealTimeClass,
                       {'l-fixed-setting': hasReachedCurrentCap}]"
              @click="toggleStoreReal"
              data-v-enslaved-tab
            >
              <div class="o-enslaved-stored-time">
                {{ timeDisplayShort(storedReal) }}
              </div>
              <div>
                {{ isStoringReal ? "Storing real time": "Store real time" }}
              </div>
            </button>
            <button
              :class="[mechanicButtonClass,
                       {'o-enslaved-mechanic-button--storing-time': autoStoreReal && offlineEnabled,
                        'l-fixed-setting': !canChangeStoreRealTime || !offlineEnabled},
                       doomedDisabledClass]"
              @click="toggleAutoStoreReal"
              data-v-enslaved-tab
            >
              {{ realTimeButtonText }}
            </button>
            <div>
              Efficiency: {{ storedRealEfficiencyDesc }}
            </div>
            <div>
              Maximum stored real time: {{ storedRealCapDesc }}
            </div>
          </div>
        </div>
        <BlackHoleChargingSliders />
        <br>
        <div class="l-enslaved-shop-container">
          <button
            v-for="unlock in unlocksInfo"
            :key="unlock.id"
            class="o-enslaved-shop-button"
            :class="unlockClassObject(unlock)"
            @click="buyUnlock(unlock)"
          >
            {{ unlock.description() }}
            <div v-if="!hasUnlock(unlock)">
              Costs: {{ timeDisplayShort(unlock.price) }}
            </div>
            <span v-if="isStoringBlackHole && !hasUnlock(unlock) && timeUntilBuy(unlock.price) > 0">
              Time to obtain: {{ timeDisplayShort(timeUntilBuy(unlock.price)) }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
  `
};