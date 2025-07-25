export default {
  name: "ReplicantiGainText",
  data() {
    return {
      remainingTimeText: "",
      galaxyText: ""
    };
  },
  methods: {
    update() {
      const updateRateMs = player.options.updateRate;
      const ticksPerSecond = 1000 / updateRateMs;
      const logGainFactorPerTick = Decimal.divide(getGameSpeedupForDisplay() * updateRateMs *
        (Math.log(player.replicanti.chance + 1)), getReplicantiInterval());
      const log10GainFactorPerTick = logGainFactorPerTick.dividedBy(Math.LN10);

      // The uncapped factor is needed for galaxy speed calculations
      const log10GainFactorPerTickUncapped = Decimal.divide(getGameSpeedupForDisplay() * updateRateMs *
        (Math.log(player.replicanti.chance + 1)), getReplicantiInterval(false)).dividedBy(Math.LN10);

      const replicantiAmount = Replicanti.amount;
      const isAbove308 = Replicanti.isUncapped && replicantiAmount.log10() > LOG10_MAX_VALUE;

      if (isAbove308) {
        const postScale = Math.log10(ReplicantiGrowth.scaleFactor) / ReplicantiGrowth.scaleLog10;
        const gainFactorPerSecond = logGainFactorPerTick
          .times(postScale)
          .plus(1)
          .pow(ticksPerSecond / postScale);
        // The calculations to estimate time to next milestone of OoM based on game state, assumes that uncapped
        // replicanti growth scales as time^1/postScale, which turns out to be a reasonable approximation.
        const milestoneStep = Pelle.isDoomed ? 100 : 1000;
        const nextMilestone = Decimal.pow10(milestoneStep * Math.floor(replicantiAmount.log10() / milestoneStep + 1));
        const coeff = Decimal.divide(updateRateMs / 1000, logGainFactorPerTick.times(postScale));
        const timeToThousand = coeff.times(nextMilestone.divide(replicantiAmount).pow(postScale).minus(1));
        // The calculation seems to choke and return zero if the time is too large, probably because of rounding issues
        const timeEstimateText = timeToThousand.eq(0)
          ? "一段极其长的时间"
          : `${TimeSpan.fromSeconds(timeToThousand.toNumber())}`;
        this.remainingTimeText = `你每秒获得 ${formatX(gainFactorPerSecond, 2, 1)} 复制器` +
          ` (${timeEstimateText} 后达到 ${format(nextMilestone)})`;
      } else {
        this.remainingTimeText = "";
      }

      const totalTime = LOG10_MAX_VALUE / (ticksPerSecond * log10GainFactorPerTick.toNumber());
      let remainingTime = (LOG10_MAX_VALUE - replicantiAmount.log10()) /
        (ticksPerSecond * log10GainFactorPerTick.toNumber());
      if (remainingTime < 0) {
        // If the cap is raised via Effarig Infinity but the player doesn't have TS192, this will be a negative number
        remainingTime = 0;
      }

      const galaxiesPerSecond = log10GainFactorPerTickUncapped.times(ticksPerSecond / LOG10_MAX_VALUE);
      const timeFromZeroRG = galaxies => 50 * Math.log((galaxies + 49.5) / 49.5);
      let baseGalaxiesPerSecond, effectiveMaxRG, effectiveCurrentRG;
      if (RealityUpgrade(6).isBought && !Pelle.isDoomed) {
        baseGalaxiesPerSecond = galaxiesPerSecond.divide(RealityUpgrade(6).effectValue);
        effectiveMaxRG = timeFromZeroRG(Replicanti.galaxies.max + Replicanti.galaxies.extra) -
          timeFromZeroRG(Replicanti.galaxies.extra);
        effectiveCurrentRG = timeFromZeroRG(Replicanti.galaxies.bought + Replicanti.galaxies.extra) -
          timeFromZeroRG(Replicanti.galaxies.extra);
      } else {
        baseGalaxiesPerSecond = galaxiesPerSecond;
        effectiveMaxRG = Replicanti.galaxies.max;
        effectiveCurrentRG = Replicanti.galaxies.bought;
      }
      const secondsPerGalaxy = galaxiesPerSecond.reciprocal();

      if (this.remainingTimeText === "") {
        if (remainingTime === 0) {
          this.remainingTimeText = `无限复制器 （需要
            ${TimeSpan.fromSeconds(secondsPerGalaxy.toNumber())}）`;
        } else if (replicantiAmount.lt(100)) {
          // Because of discrete replication, we add "大约 (Approximately)" at very low amounts
          this.remainingTimeText = `距离 无限 复制器还需大约 ${TimeSpan.fromSeconds(remainingTime)}`;
        } else {
          this.remainingTimeText = `距离 无限 复制器还有 ${TimeSpan.fromSeconds(remainingTime)}`;
        }
      }

      // If the player can get RG, this text is redundant with text below. It denotes total time from 1 to e308
      if (Replicanti.galaxies.max === 0 && !isAbove308) {
        this.remainingTimeText += ` （总计需 ${TimeSpan.fromSeconds(totalTime)} ）`;
      }


      if (Replicanti.galaxies.max > 0) {
        // If the player has max RGs, don't display the "You are gaining blah" text
        if (player.replicanti.galaxies === Replicanti.galaxies.max) {
          this.galaxyText = "你已达到最大复制器星系数量";
        } else {
          this.galaxyText = `你每过 ${TimeSpan.fromSeconds(secondsPerGalaxy.toNumber())} 秒能获得一个复制器星系。`;
          if (galaxiesPerSecond.gte(1)) {
            this.galaxyText = `你每秒获得 ${format(galaxiesPerSecond, 2, 1)} 复制器星系。`;
          }
          // Take the total time from zero replicanti to max RG + e308 replicanti and then subtract away the time which
          // has already elapsed. The time elapsed is calculated from your current RG total (including the current one)
          // and then subtracts away the time spent in the current RG so far.
          const allGalaxyTime = Decimal.divide(effectiveMaxRG - effectiveCurrentRG, baseGalaxiesPerSecond).toNumber();

          // Pending galaxy gain is here because the growth slows down significantly after
          // 1e308 normally. However, the seconds per galaxy code is calculated as if
          // uncapped since nobody would wait for 1e52345325 replicanti to buy an RG.
          // To solve this problem, after 1e308, it uses the pending value as the basis of
          // how ""close"" you are to the next galaxy instead of replicanti amount,
          // which is a good enough best case approximation in my opinion.
          // Note: This pending case ignores Reality Upgrade 6 but it's not really accurate anyway
          // (basically assumes you'll get all your possible RGs now) so that's probably fine.
          const pending = Replicanti.galaxies.gain;
          let pendingTime = pending * secondsPerGalaxy.toNumber();
          // If popular music is unlocked add the divide amount
          if (Achievement(126).isUnlocked && !Pelle.isDoomed) {
            const leftPercentAfterGalaxy = replicantiAmount.log10() / LOG10_MAX_VALUE - pending;
            pendingTime += leftPercentAfterGalaxy * secondsPerGalaxy.toNumber();
          }
          const thisGalaxyTime = pending > 0 ? pendingTime : secondsPerGalaxy.toNumber() - remainingTime;
          this.galaxyText += `（复制器星系于 ${TimeSpan.fromSeconds(Math.clampMin(allGalaxyTime - thisGalaxyTime, 0))} 后达到最大数量）`;
        }
      } else {
        this.galaxyText = ``;
      }
    }
  },
  template: `
  <p>{{ remainingTimeText }}<br>{{ galaxyText }}</p>
  `
};