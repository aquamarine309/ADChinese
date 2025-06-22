import { standardizeAutomatorValues, tokenMap as T } from "./lexer.js";

/**
 * Note: the $ shorthand for the parser object is required by Chevrotain. Don't mess with it.
 */

const presetSplitter = /name[ \t]+(.+$)/ui;
const idSplitter = /id[ \t]+(\d)/ui;

function prestigeNotify(flag) {
  if (!AutomatorBackend.isOn) return;
  const state = AutomatorBackend.stack.top.commandState;
  if (state && state.prestigeLevel !== undefined) {
    state.prestigeLevel = Math.max(state.prestigeLevel, flag);
  }
}

EventHub.logic.on(GAME_EVENT.BIG_CRUNCH_AFTER, () => prestigeNotify(T.Infinity.$prestigeLevel));
EventHub.logic.on(GAME_EVENT.ETERNITY_RESET_AFTER, () => prestigeNotify(T.Eternity.$prestigeLevel));
EventHub.logic.on(GAME_EVENT.REALITY_RESET_AFTER, () => prestigeNotify(T.Reality.$prestigeLevel));

// Used by while and until - in order to get the text corrext, we need to invert the boolean if it's an until

function convertBooleanToChinese(value) {
  return value ? "真" : "假";
}

// eslint-disable-next-line max-params
function compileConditionLoop(evalComparison, commands, ctx, isUntil) {
  return {
    run: () => {
      const loopStr = isUntil ? "UNTIL" : "WHILE";
      if (!evalComparison()) {
        AutomatorData.logCommandEvent(`条件 ${parseConditionalIntoText(ctx)} 为${convertBooleanToChinese(isUntil)}，
          在第 ${AutomatorBackend.translateLineNumber(ctx.RCurly[0].startLine + 1) - 1} 行跳出循环
          (${loopStr} 循环结束)`, ctx.startLine);
        return AUTOMATOR_COMMAND_STATUS.NEXT_TICK_NEXT_INSTRUCTION;
      }
      AutomatorBackend.push(commands);
      AutomatorData.logCommandEvent(`条件 ${parseConditionalIntoText(ctx)} 为${convertBooleanToChinese(!isUntil)}，
        跳转到第 ${AutomatorBackend.translateLineNumber(ctx.LCurly[0].startLine + 1) - 1} 行
        (开始 ${loopStr} 循环)`, ctx.startLine);
      return AUTOMATOR_COMMAND_STATUS.SAME_INSTRUCTION;
    },
    blockCommands: commands,
  };
}

// Extracts the conditional out of a command and returns it as text
function parseConditionalIntoText(ctx) {
  const comp = ctx.comparison[0].children;
  const getters = comp.compareValue.map(cv => {
    if (cv.children.AutomatorCurrency) return () => cv.children.AutomatorCurrency[0].image;
    const val = cv.children.$value;
    if (typeof val === "string") return () => val;
    return () => format(val, 2, 2);
  });
  const compareFn = comp.ComparisonOperator[0].image;
  return `${getters[0]()} ${compareFn} ${getters[1]()}`;
}

// Determines how much (prestige currency) the previous (layer) reset gave, for event logging
function findLastPrestigeRecord(layer) {
  let addedECs, gainedEP;
  switch (layer) {
    case "INFINITY":
      return `${format(player.records.recentInfinities[0][1], 2)} IP`;
    case "ETERNITY":
      addedECs = AutomatorData.lastECCompletionCount;
      gainedEP = `${format(player.records.recentEternities[0][1], 2)} EP`;
      return addedECs === 0
        ? `${gainedEP}`
        : `${gainedEP}, ${addedECs} completions`;
    case "REALITY":
      return `${format(player.records.recentRealities[0][1], 2)} RM`;
    default:
      throw Error(`Unrecognized prestige ${layer} in Automator event log`);
  }
}

export const AutomatorCommands = [
  {
    id: "auto",
    rule: $ => () => {
      $.CONSUME(T.Auto);
      $.CONSUME(T.PrestigeEvent);
      $.OR([
        { ALT: () => $.CONSUME(T.On) },
        { ALT: () => $.CONSUME(T.Off) },
        { ALT: () => $.OR1([
          { ALT: () => $.SUBRULE($.duration) },
          { ALT: () => $.SUBRULE($.xHighest) },
          { ALT: () => $.SUBRULE($.currencyAmount) },
        ]) },
      ]);
    },
    // eslint-disable-next-line complexity
    validate: (ctx, V) => {
      ctx.startLine = ctx.Auto[0].startLine;
      if (ctx.PrestigeEvent && ctx.currencyAmount) {
        const desired$ = ctx.PrestigeEvent[0].tokenType.$prestigeCurrency;
        const specified$ = ctx.currencyAmount[0].children.AutomatorCurrency[0].tokenType.name;
        if (desired$ !== specified$) {
          V.addError(ctx.currencyAmount, `自动机货币不匹配重置层（${desired$} vs ${specified$}）`,
            `使用 ${desired$} 作为重置层货币`);
          return false;
        }
      }

      if (!ctx.PrestigeEvent) return true;
      const advSetting = ctx.duration || ctx.xHighest;
      // Do not change to switch statement; T.XXX are Objects, not primitive values
      if (ctx.PrestigeEvent[0].tokenType === T.Infinity) {
        if (!Autobuyer.bigCrunch.isUnlocked) {
          V.addError(ctx.PrestigeEvent, "未解锁自动无限",
            "完成挑战 12后解锁这条指令");
          return false;
        }
        if (advSetting && !EternityMilestone.bigCrunchModes.isReached) {
          V.addError((ctx.duration || ctx.xHighest)[0],
            "未解锁自动大坍缩的高级选项",
            `永恒次数达到 ${formatInt(EternityMilestone.bigCrunchModes.config.eternities)} 以使用该指令`);
          return false;
        }
      }
      if (ctx.PrestigeEvent[0].tokenType === T.Eternity) {
        if (!EternityMilestone.autobuyerEternity.isReached) {
          V.addError(ctx.PrestigeEvent, "未解锁自动永恒",
            `永恒次数达到 ${formatInt(EternityMilestone.autobuyerEternity.config.eternities)} 以使用该指令`);
          return false;
        }
        if (advSetting && !RealityUpgrade(13).isBought) {
          V.addError((ctx.duration || ctx.xHighest)[0],
            "未解锁自动永恒的高级选项",
            "购买对应的现实升级，解锁更多的自动永恒选项");
          return false;
        }
      }
      if (ctx.PrestigeEvent[0].tokenType === T.Reality) {
        if (!RealityUpgrade(25).isBought) {
          V.addError(ctx.PrestigeEvent, "未解锁自动现实",
            "购买对应的现实升级，解锁自动现实");
          return false;
        }
        if (advSetting) {
          V.addError((ctx.duration || ctx.xHighest)[0],
            "自动现实不能设置为每隔 X 秒自动进行或最高现实机器的 X 倍",
            "使用获得现实机器的数量进行自动现实");
          return false;
        }
      }

      return true;
    },
    compile: ctx => {
      const isReality = ctx.PrestigeEvent[0].tokenType === T.Reality;
      const on = Boolean(ctx.On || ctx.duration || ctx.xHighest || ctx.currencyAmount);
      const duration = ctx.duration ? ctx.duration[0].children.$value : undefined;
      const xHighest = ctx.xHighest ? ctx.xHighest[0].children.$value : undefined;
      const fixedAmount = ctx.currencyAmount ? ctx.currencyAmount[0].children.$value : undefined;
      const durationMode = ctx.PrestigeEvent[0].tokenType.$autobuyerDurationMode;
      const xHighestMode = ctx.PrestigeEvent[0].tokenType.$autobuyerXHighestMode;
      const fixedMode = ctx.PrestigeEvent[0].tokenType.$autobuyerCurrencyMode;
      const autobuyer = ctx.PrestigeEvent[0].tokenType.$autobuyer();
      return () => {
        autobuyer.isActive = on;
        let currSetting = "";
        if (duration !== undefined) {
          autobuyer.mode = durationMode;
          autobuyer.time = duration / 1000;
          // Can't do the units provided in the script because it's been parsed away like 4 layers up the call stack
          currSetting = `${autobuyer.time > 1000 ? formatInt(autobuyer.time) : `${format(autobuyer.time)} 秒`}`;
        } else if (xHighest !== undefined) {
          autobuyer.mode = xHighestMode;
          autobuyer.xHighest = new Decimal(xHighest);
          currSetting = `基于最高的 ${format(xHighest, 2, 2)} 倍`;
        } else if (fixedAmount !== undefined) {
          autobuyer.mode = fixedMode;
          if (isReality) {
            autobuyer.rm = new Decimal(fixedAmount);
            currSetting = `${format(autobuyer.rm, 2)} 现实机器`;
          } else {
            autobuyer.amount = new Decimal(fixedAmount);
            currSetting = `${fixedAmount} ${ctx.PrestigeEvent[0].image === "infinity" ? "无限点数" : "永恒点数"}`;
          }
        }
        // Settings are drawn from the actual automator text; it's not feasible to parse out all the settings
        // for every combination of autobuyers when they get turned off
        const settingString = (autobuyer.isActive && currSetting !== "") ? `（设置：${currSetting}）` : "";
        AutomatorData.logCommandEvent(`自动${ctx.PrestigeEvent[0].image}
          切换至${autobuyer.isActive ? "开启" : "关闭"}状态${settingString}`, ctx.startLine);
        return AUTOMATOR_COMMAND_STATUS.NEXT_INSTRUCTION;
      };
    },
    blockify: ctx => {
      const duration = ctx.duration
        ? `${ctx.duration[0].children.NumberLiteral[0].image} ${ctx.duration[0].children.TimeUnit[0].image}`
        : undefined;
      const xHighest = ctx.xHighest ? ctx.xHighest[0].children.$value : undefined;
      const fixedAmount = ctx.currencyAmount
        ? `${ctx.currencyAmount[0].children.NumberLiteral[0].image}` +
          ` ${ctx.currencyAmount[0].children.AutomatorCurrency[0].image.toUpperCase()}`
        : undefined;
      const on = Boolean(ctx.On);
      let input = "";

      if (duration) input = duration;
      else if (xHighest) input = `${xHighest} x highest`;
      else if (fixedAmount) input = `${fixedAmount}`;
      else input = (on ? "ON" : "OFF");

      return {
        singleSelectionInput: ctx.PrestigeEvent[0].tokenType.name.toUpperCase(),
        singleTextInput: input,
        ...automatorBlocksMap.AUTO
      };
    }
  },
  {
    id: "blackHole",
    rule: $ => () => {
      $.CONSUME(T.BlackHole);
      $.OR([
        { ALT: () => $.CONSUME(T.On) },
        { ALT: () => $.CONSUME(T.Off) },
      ]);
    },
    validate: ctx => {
      ctx.startLine = ctx.BlackHole[0].startLine;
      return true;
    },
    compile: ctx => {
      const on = Boolean(ctx.On);
      return () => {
        if (on === BlackHoles.arePaused) BlackHoles.togglePause();
        let blackHoleEvent;
        if (BlackHole(1).isUnlocked) {
          blackHoleEvent = `黑洞切换为${ctx.On ? "开启" : "关闭"}`;
        } else if (Enslaved.isRunning || Pelle.isDisabled("blackhole")) {
          blackHoleEvent = "当前现实禁用黑洞，忽略黑洞相关的指令";
        } else {
          blackHoleEvent = "未解锁黑洞，忽略黑洞相关的指令";
        }
        AutomatorData.logCommandEvent(blackHoleEvent, ctx.startLine);
        return AUTOMATOR_COMMAND_STATUS.NEXT_INSTRUCTION;
      };
    },
    blockify: ctx => ({
      singleSelectionInput: ctx.On ? "ON" : "OFF",
      ...automatorBlocksMap["BLACK HOLE"]
    })
  },
  {
    id: "blob",
    rule: $ => () => {
      $.CONSUME(T.Blob);
    },
    validate: ctx => {
      ctx.startLine = ctx.Blob[0].startLine;
      return true;
    },
    // This is an easter egg, it shouldn't do anything
    compile: () => () => AUTOMATOR_COMMAND_STATUS.SKIP_INSTRUCTION,
    blockify: () => ({
      ...automatorBlocksMap.BLOB,
    })
  },
  {
    id: "comment",
    rule: $ => () => {
      $.CONSUME(T.Comment);
    },
    validate: ctx => {
      ctx.startLine = ctx.Comment[0].startLine;
      return true;
    },
    // Comments should be no-ops
    compile: () => () => AUTOMATOR_COMMAND_STATUS.SKIP_INSTRUCTION,
    blockify: ctx => ({
      ...automatorBlocksMap.COMMENT,
      singleTextInput: ctx.Comment[0].image.replace(/(#|\/\/)\s?/u, ""),
    })
  },
  {
    id: "ifBlock",
    rule: $ => () => {
      $.CONSUME(T.If);
      $.SUBRULE($.comparison);
      $.CONSUME(T.LCurly);
      $.CONSUME(T.EOL);
      $.SUBRULE($.block);
      $.CONSUME(T.RCurly);
    },
    validate: (ctx, V) => {
      ctx.startLine = ctx.If[0].startLine;
      return V.checkBlock(ctx, ctx.If);
    },
    compile: (ctx, C) => {
      const evalComparison = C.visit(ctx.comparison);
      const commands = C.visit(ctx.block);
      return {
        run: S => {
          // If the commandState is empty, it means we haven't evaluated the if yet
          if (S.commandState !== null) return AUTOMATOR_COMMAND_STATUS.NEXT_INSTRUCTION;
          // We use this flag to make "single step" advance to the next command after the if when the block ends
          S.commandState = {
            advanceOnPop: true,
            ifEndLine: ctx.RCurly[0].startLine
          };
          if (!evalComparison()) {
            AutomatorData.logCommandEvent(`条件 ${parseConditionalIntoText(ctx)} 为假，跳转至第 ${AutomatorBackend.translateLineNumber(ctx.RCurly[0].startLine + 1)} 行`, ctx.startLine);
            return AUTOMATOR_COMMAND_STATUS.NEXT_INSTRUCTION;
          }
          AutomatorBackend.push(commands);
          AutomatorData.logCommandEvent(`条件 ${parseConditionalIntoText(ctx)} 为真，执行对应指令`, ctx.startLine);
          return AUTOMATOR_COMMAND_STATUS.SAME_INSTRUCTION;
        },
        blockCommands: commands,
      };
    },
    blockify: (ctx, B) => {
      const commands = [];
      B.visit(ctx.block, commands);
      const comparison = B.visit(ctx.comparison);
      return {
        nest: commands,
        ...automatorBlocksMap.IF,
        ...comparison,
        genericInput1: standardizeAutomatorValues(comparison.genericInput1),
        genericInput2: standardizeAutomatorValues(comparison.genericInput2)
      };
    }
  },
  {
    id: "notify",
    rule: $ => () => {
      $.CONSUME(T.Notify);
      $.OR([
        { ALT: () => $.CONSUME(T.StringLiteral) },
        { ALT: () => $.CONSUME(T.StringLiteralSingleQuote) },
      ]);
    },
    validate: ctx => {
      ctx.startLine = ctx.Notify[0].startLine;
      return true;
    },
    compile: ctx => {
      const notifyText = ctx.StringLiteral || ctx.StringLiteralSingleQuote;
      return () => {
        GameUI.notify.automator(`自动机：${notifyText[0].image}`);
        AutomatorData.logCommandEvent(`弹出提示：${notifyText[0].image}`, ctx.startLine);
        return AUTOMATOR_COMMAND_STATUS.NEXT_INSTRUCTION;
      };
    },
    blockify: ctx => ({
      ...automatorBlocksMap.NOTIFY,
      singleTextInput: (ctx.StringLiteral || ctx.StringLiteralSingleQuote)[0].image,
    })
  },
  {
    // Note: this has to appear before pause
    id: "pauseTime",
    rule: $ => () => {
      $.CONSUME(T.Pause);
      $.OR([
        { ALT: () => $.SUBRULE($.duration) },
        { ALT: () => $.CONSUME(T.Identifier) },
      ]);
    },
    validate: (ctx, V) => {
      ctx.startLine = ctx.Pause[0].startLine;
      let duration;
      if (ctx.Identifier) {
        if (!V.isValidVarFormat(ctx.Identifier[0], AUTOMATOR_VAR_TYPES.DURATION)) {
          V.addError(ctx, `常量 ${ctx.Identifier[0].image} 不是有效的持续时间数值`,
            `确认 ${ctx.Identifier[0].image} 的数值（按秒计算）小于 ${format(Number.MAX_VALUE / 1000)}`);
          return false;
        }
        const lookup = V.lookupVar(ctx.Identifier[0], AUTOMATOR_VAR_TYPES.DURATION);
        duration = lookup ? lookup.value : lookup;
      } else {
        duration = V.visit(ctx.duration);
      }
      ctx.$duration = duration;
      return ctx.$duration !== undefined;
    },
    compile: ctx => {
      const duration = ctx.$duration;
      return S => {
        let timeString;
        if (ctx.duration) {
          const c = ctx.duration[0].children;
          timeString = `${c.NumberLiteral[0].image} ${c.TimeUnit[0].image}`;
        } else {
          // This is the case for a defined constant; its value was parsed out during validation
          timeString = TimeSpan.fromMilliseconds(duration);
        }
        if (S.commandState === null) {
          S.commandState = { timeMs: 0 };
          AutomatorData.logCommandEvent(`已开始暂停（等待 ${timeString}）`, ctx.startLine);
        } else {
          S.commandState.timeMs += Math.max(Time.unscaledDeltaTime.totalMilliseconds, AutomatorBackend.currentInterval);
        }
        const finishPause = S.commandState.timeMs >= duration;
        if (finishPause) {
          AutomatorData.logCommandEvent(`结束暂停（已等待 ${timeString}）`, ctx.startLine);
          return AUTOMATOR_COMMAND_STATUS.NEXT_INSTRUCTION;
        }
        return AUTOMATOR_COMMAND_STATUS.NEXT_TICK_SAME_INSTRUCTION;
      };
    },
    blockify: ctx => {
      let blockArg;
      if (ctx.duration) {
        const c = ctx.duration[0].children;
        blockArg = `${c.NumberLiteral[0].image} ${c.TimeUnit[0].image}`;
      } else {
        blockArg = `${ctx.Identifier[0].image}`;
      }
      return {
        ...automatorBlocksMap.PAUSE,
        singleTextInput: blockArg
      };
    }
  },
  {
    id: "prestige",
    rule: $ => () => {
      $.CONSUME(T.PrestigeEvent);
      $.OPTION(() => $.CONSUME(T.Nowait));
      $.OPTION1(() => $.CONSUME(T.Respec));
    },
    validate: (ctx, V) => {
      ctx.startLine = ctx.PrestigeEvent[0].startLine;

      if (ctx.PrestigeEvent && ctx.PrestigeEvent[0].tokenType === T.Eternity &&
        !EternityMilestone.autobuyerEternity.isReached) {
        V.addError(ctx.PrestigeEvent, "未解锁自动永恒",
          `永恒次数达到 ${formatInt(EternityMilestone.autobuyerEternity.config.eternities)} 以使用该指令`);
        return false;
      }

      if (ctx.PrestigeEvent && ctx.PrestigeEvent[0].tokenType === T.Reality && !RealityUpgrade(25).isBought) {
        V.addError(ctx.PrestigeEvent, "未解锁自动现实",
          "购买对应的现实升级，解锁自动现实");
        return false;
      }

      if (ctx.PrestigeEvent && ctx.PrestigeEvent[0].tokenType === T.Infinity && ctx.Respec) {
        V.addError(ctx.Respec, "无限并没有 'respec'",
          "移除指令中的 'respec'");
      }
      return true;
    },
    compile: ctx => {
      const nowait = ctx.Nowait !== undefined;
      const respec = ctx.Respec !== undefined;
      const prestigeToken = ctx.PrestigeEvent[0].tokenType;
      return () => {
        const available = prestigeToken.$prestigeAvailable();
        if (!available) {
          if (!nowait) return AUTOMATOR_COMMAND_STATUS.NEXT_TICK_SAME_INSTRUCTION;
          AutomatorData.logCommandEvent(`已尝试进行自动${ctx.PrestigeEvent.image}，因 NOWAIT 直接跳过`,
            ctx.startLine);
          return AUTOMATOR_COMMAND_STATUS.NEXT_INSTRUCTION;
        }
        if (respec) prestigeToken.$respec();
        prestigeToken.$prestige();
        const prestigeName = ctx.PrestigeEvent[0].image.toUpperCase();
        AutomatorData.logCommandEvent(`${prestigeName}已触发（${findLastPrestigeRecord(prestigeName)}）`,
          ctx.startLine);
        // In the prestigeToken.$prestige() line above, performing a reality reset has code internal to the call
        // which makes the automator restart. However, in that case we also need to update the execution state here,
        // or else the restarted automator will immediately advance lines and always skip the first command
        return (prestigeName === "REALITY" && AutomatorBackend.state.forceRestart)
          ? AUTOMATOR_COMMAND_STATUS.RESTART
          : AUTOMATOR_COMMAND_STATUS.NEXT_TICK_NEXT_INSTRUCTION;
      };
    },
    blockify: ctx => ({
      ...automatorBlocksMap[
        ctx.PrestigeEvent[0].tokenType.name.toUpperCase()
      ],
      nowait: ctx.Nowait !== undefined,
      respec: ctx.Respec !== undefined
    })
  },
  {
    id: "startDilation",
    rule: $ => () => {
      $.CONSUME(T.Start);
      $.CONSUME(T.Dilation);
    },
    validate: ctx => {
      ctx.startLine = ctx.Start[0].startLine;
      return true;
    },
    compile: ctx => () => {
      if (player.dilation.active) {
        AutomatorData.logCommandEvent(`因正在进行时间膨胀，忽略 start dilation 指令`,
          ctx.startLine);
        return AUTOMATOR_COMMAND_STATUS.NEXT_INSTRUCTION;
      }
      if (startDilatedEternity(true)) {
        AutomatorData.logCommandEvent(`已进入时间膨胀`, ctx.startLine);
        return AUTOMATOR_COMMAND_STATUS.NEXT_TICK_NEXT_INSTRUCTION;
      }
      return AUTOMATOR_COMMAND_STATUS.NEXT_TICK_SAME_INSTRUCTION;
    },
    blockify: () => ({ singleSelectionInput: "DILATION", ...automatorBlocksMap.START })
  },
  {
    id: "startEC",
    rule: $ => () => {
      $.CONSUME(T.Start);
      $.SUBRULE($.eternityChallenge);
    },
    validate: ctx => {
      ctx.startLine = ctx.Start[0].startLine;
      return true;
    },
    compile: ctx => {
      const ecNumber = ctx.eternityChallenge[0].children.$ecNumber;
      return () => {
        const ec = EternityChallenge(ecNumber);
        if (ec.isRunning) {
          AutomatorData.logCommandEvent(`因正在进行对应的永恒挑战，忽略 start ec 指令`,
            ctx.startLine);
          return AUTOMATOR_COMMAND_STATUS.NEXT_INSTRUCTION;
        }
        if (!EternityChallenge(ecNumber).isUnlocked) {
          if (!TimeStudy.eternityChallenge(ecNumber).purchase(true)) {
            return AUTOMATOR_COMMAND_STATUS.NEXT_TICK_SAME_INSTRUCTION;
          }
        }
        if (ec.start(true)) {
          AutomatorData.logCommandEvent(`正在进行永恒挑战 ${ecNumber}`, ctx.startLine);
          return AUTOMATOR_COMMAND_STATUS.NEXT_TICK_NEXT_INSTRUCTION;
        }
        return AUTOMATOR_COMMAND_STATUS.NEXT_TICK_SAME_INSTRUCTION;
      };
    },
    blockify: ctx => ({
      singleSelectionInput: "EC",
      singleTextInput: ctx.eternityChallenge[0].children.$ecNumber,
      ...automatorBlocksMap.START
    })
  },
  {
    id: "storeGameTime",
    rule: $ => () => {
      $.CONSUME(T.StoreGameTime);
      $.OR([
        { ALT: () => $.CONSUME(T.On) },
        { ALT: () => $.CONSUME(T.Off) },
        { ALT: () => $.CONSUME(T.Use) },
      ]);
    },
    validate: (ctx, V) => {
      ctx.startLine = ctx.StoreGameTime[0].startLine;
      if (!Enslaved.isUnlocked) {
        V.addError(ctx.StoreGameTime[0], "你是不懂怎么储存时间喔",
          "解锁储存时间的能力");
        return false;
      }
      return true;
    },
    compile: ctx => {
      if (ctx.Use) return () => {
        if (Enslaved.isUnlocked) {
          Enslaved.useStoredTime(false);
          AutomatorData.logCommandEvent(`已使用储存的游戏内时间`, ctx.startLine);
        } else {
          AutomatorData.logCommandEvent(`因储存游戏内时间的功能尚未解锁，无法使用储存的游戏内时间`,
            ctx.startLine);
        }
        return AUTOMATOR_COMMAND_STATUS.NEXT_INSTRUCTION;
      };
      const on = Boolean(ctx.On);
      return () => {
        if (on !== player.celestials.enslaved.isStoring) Enslaved.toggleStoreBlackHole();
        AutomatorData.logCommandEvent(`储存游戏内时间切换为 ${ctx.On ? "开启" : "关闭"}`, ctx.startLine);
        return AUTOMATOR_COMMAND_STATUS.NEXT_INSTRUCTION;
      };
    },
    blockify: ctx => ({
      // eslint-disable-next-line no-nested-ternary
      singleSelectionInput: ctx.Use ? "USE" : (ctx.On ? "ON" : "OFF"),
      ...automatorBlocksMap["STORE GAME TIME"]
    })
  },
  {
    id: "studiesBuy",
    rule: $ => () => {
      $.CONSUME(T.Studies);
      $.OPTION(() => $.CONSUME(T.Nowait));
      $.CONSUME(T.Purchase);
      $.OR([
        { ALT: () => $.SUBRULE($.studyList) },
        { ALT: () => $.CONSUME1(T.Identifier) },
      ]);
    },
    validate: (ctx, V) => {
      ctx.startLine = ctx.Studies[0].startLine;
      if (ctx.Identifier) {
        if (!V.isValidVarFormat(ctx.Identifier[0], AUTOMATOR_VAR_TYPES.STUDIES)) {
          V.addError(ctx, `常量 ${ctx.Identifier[0].image} 不是有效的时间研究字符串`,
            `确认 ${ctx.Identifier[0].image} 的值是一个格式正确的时间研究字符串`);
          return false;
        }
        const varInfo = V.lookupVar(ctx.Identifier[0], AUTOMATOR_VAR_TYPES.STUDIES);
        ctx.$studies = varInfo.value;
        ctx.$studies.image = ctx.Identifier[0].image;
      } else if (ctx.studyList) {
        ctx.$studies = V.visit(ctx.studyList);
      }
      return true;
    },
    compile: ctx => {
      const studies = ctx.$studies;
      if (ctx.Nowait === undefined) return () => {
        let prePurchasedStudies = 0;
        let purchasedStudies = 0;
        let finalPurchasedTS;
        for (const tsNumber of studies.normal) {
          if (TimeStudy(tsNumber).isBought) prePurchasedStudies++;
          else if (TimeStudy(tsNumber).purchase(true)) purchasedStudies++;
          else finalPurchasedTS = finalPurchasedTS ?? tsNumber;
        }
        if (prePurchasedStudies + purchasedStudies < studies.normal.length) {
          if (prePurchasedStudies + purchasedStudies === 0) {
            AutomatorData.logCommandEvent(`不可购买任何研究`, ctx.startLine);
          }
          if (purchasedStudies > 0 && finalPurchasedTS) {
            AutomatorData.logCommandEvent(`已购买到时间研究 ${finalPurchasedTS} （共 ${formatInt(purchasedStudies)} 个），尝试购买更多的时间研究`, ctx.startLine);
          }
          return AUTOMATOR_COMMAND_STATUS.NEXT_TICK_SAME_INSTRUCTION;
        }
        const hasEC = studies.ec ? TimeStudy.eternityChallenge(studies.ec).isBought : false;
        if (!studies.ec || (hasEC && !studies.startEC)) {
          AutomatorData.logCommandEvent(`已购买所有指定的时间研究`, ctx.startLine);
          return AUTOMATOR_COMMAND_STATUS.NEXT_INSTRUCTION;
        }
        const unlockedEC = TimeStudy.eternityChallenge(studies.ec).purchase(true);
        if (hasEC || unlockedEC) {
          if (studies.startEC) {
            EternityChallenge(studies.ec).start(true);
            if (EternityChallenge(studies.ec).isRunning) {
              AutomatorData.logCommandEvent(`已购买所有的时间研究，解锁并进入永恒挑战 ${studies.ec}`, ctx.startLine);
            } else {
              AutomatorData.logCommandEvent(`已购买所有的时间研究，已解锁永恒挑战 ${studies.ec}, 但无法进入`, ctx.startLine);
            }
          } else {
            AutomatorData.logCommandEvent(`已购买所有的时间研究，并解锁永恒挑战 ${studies.ec}`, ctx.startLine);
          }
          return AUTOMATOR_COMMAND_STATUS.NEXT_INSTRUCTION;
        }
        return AUTOMATOR_COMMAND_STATUS.NEXT_TICK_SAME_INSTRUCTION;
      };
      return () => {
        for (const tsNumber of studies.normal) TimeStudy(tsNumber).purchase(true);
        if (!studies.ec || TimeStudy.eternityChallenge(studies.ec).isBought) {
          return AUTOMATOR_COMMAND_STATUS.NEXT_INSTRUCTION;
        }
        TimeStudy.eternityChallenge(studies.ec).purchase(true);
        return AUTOMATOR_COMMAND_STATUS.NEXT_INSTRUCTION;
      };
    },
    blockify: ctx => ({
      singleTextInput: ctx.$studies.image,
      nowait: ctx.Nowait !== undefined,
      ...automatorBlocksMap["STUDIES PURCHASE"]
    })
  },
  {
    id: "studiesLoad",
    rule: $ => () => {
      $.CONSUME(T.Studies);
      $.OPTION(() => $.CONSUME(T.Nowait));
      $.CONSUME(T.Load);
      $.OR([
        { ALT: () => $.CONSUME1(T.Id) },
        { ALT: () => $.CONSUME1(T.Name) },
      ]);
    },
    validate: (ctx, V) => {
      ctx.startLine = ctx.Studies[0].startLine;

      if (ctx.Id) {
        const split = idSplitter.exec(ctx.Id[0].image);

        if (!split || ctx.Id[0].isInsertedInRecovery) {
          V.addError(ctx, "预设序号不存在",
            "查看时间研究页面，输入正确的时间研究预设序号");
          return false;
        }

        const id = parseInt(split[1], 10);
        if (id < 1 || id > 6) {
          V.addError(ctx.Id[0], `找不到序号为 ${id} 的时间研究预设`,
            "输入有效的时间研究预设序号 （1 – 6）");
          return false;
        }
        ctx.$presetIndex = id;
        return true;
      }

      if (ctx.Name) {
        const split = presetSplitter.exec(ctx.Name[0].image);

        if (!split || ctx.Name[0].isInsertedInRecovery) {
          V.addError(ctx, "预设名称不存在",
            "查看时间研究页面，输入正确的时间研究预设名称");
          return false;
        }

        // If it's a name, we check to make sure it exists:
        const presetIndex = player.timestudy.presets.findIndex(e => e.name === split[1]) + 1;
        if (presetIndex === 0) {
          V.addError(ctx.Name[0], `找不到名称为 [${split[1]}] 的时间研究预设 （注意：名称区分大小写）`,
            "确认你输入了正确的时间研究预设名称");
          return false;
        }
        ctx.$presetIndex = presetIndex;
        return true;
      }
      return false;
    },
    compile: ctx => {
      const presetIndex = ctx.$presetIndex;
      return () => {
        const imported = new TimeStudyTree(player.timestudy.presets[presetIndex - 1].studies);
        const beforeCount = GameCache.currentStudyTree.value.purchasedStudies.length;
        TimeStudyTree.commitToGameState(imported.purchasedStudies, true, imported.startEC);
        const afterCount = GameCache.currentStudyTree.value.purchasedStudies.length;
        // Check if there are still any unbought studies from the preset after attempting to commit it all;
        // if there are then we keep trying on this line until there aren't, unless we are given nowait
        const missingStudyCount = imported.purchasedStudies
          .filter(s => !GameCache.currentStudyTree.value.purchasedStudies.includes(s)).length;

        const presetRepresentation = ctx.Name ? ctx.Name[0].image : ctx.Id[0].image;

        if (missingStudyCount === 0) {
          AutomatorData.logCommandEvent(`时间研究预设 ${presetRepresentation} 已完全加载`, ctx.startLine);
        } else if (afterCount > beforeCount) {
          AutomatorData.logCommandEvent(`时间研究预设 ${presetRepresentation} 已部分加载（缺失 ${formatInt(missingStudyCount)} 个时间研究）`, ctx.startLine);
        }
        return ctx.Nowait !== undefined || missingStudyCount === 0
          ? AUTOMATOR_COMMAND_STATUS.NEXT_INSTRUCTION
          : AUTOMATOR_COMMAND_STATUS.NEXT_TICK_SAME_INSTRUCTION;
      };
    },
    blockify: ctx => ({
      singleSelectionInput: ctx.Name ? "NAME" : "ID",
      singleTextInput: ctx.Name ? player.timestudy.presets[ctx.$presetIndex - 1].name : ctx.$presetIndex,
      nowait: ctx.Nowait !== undefined,
      ...automatorBlocksMap["STUDIES LOAD"]
    })
  },
  {
    id: "studiesRespec",
    rule: $ => () => {
      $.CONSUME(T.Studies);
      $.CONSUME(T.Respec);
    },
    validate: ctx => {
      ctx.startLine = ctx.Studies[0].startLine;
      return true;
    },
    compile: ctx => () => {
      player.respec = true;
      AutomatorData.logCommandEvent(`“永恒后重置时间研究”已开启`, ctx.startLine);
      return AUTOMATOR_COMMAND_STATUS.NEXT_INSTRUCTION;
    },
    blockify: () => automatorBlocksMap["STUDIES RESPEC"]
  },
  {
    id: "unlockDilation",
    rule: $ => () => {
      $.CONSUME(T.Unlock);
      $.OPTION(() => $.CONSUME(T.Nowait));
      $.CONSUME(T.Dilation);
    },
    validate: ctx => {
      ctx.startLine = ctx.Unlock[0].startLine;
      return true;
    },
    compile: ctx => {
      const nowait = ctx.Nowait !== undefined;
      return () => {
        if (PlayerProgress.dilationUnlocked()) {
          AutomatorData.logCommandEvent(`因已解锁时间膨胀，跳过该指令`, ctx.startLine);
          return AUTOMATOR_COMMAND_STATUS.NEXT_INSTRUCTION;
        }
        const unlockedThisTick = TimeStudy.dilation.purchase(true);
        if (unlockedThisTick) {
          AutomatorData.logCommandEvent(`时间膨胀已解锁`, ctx.startLine);
          return AUTOMATOR_COMMAND_STATUS.NEXT_INSTRUCTION;
        }
        if (nowait) {
          AutomatorData.logCommandEvent(`因出现 NOWAIT, 且未满足解锁时间膨胀的要求，跳过解锁时间膨胀的指令`,
            ctx.startLine);
          return AUTOMATOR_COMMAND_STATUS.NEXT_INSTRUCTION;
        }
        return AUTOMATOR_COMMAND_STATUS.NEXT_TICK_SAME_INSTRUCTION;
      };
    },
    blockify: ctx => ({
      singleSelectionInput: "DILATION",
      nowait: ctx.Nowait !== undefined,
      ...automatorBlocksMap.UNLOCK
    })
  },
  {
    id: "unlockEC",
    rule: $ => () => {
      $.CONSUME(T.Unlock);
      $.OPTION(() => $.CONSUME(T.Nowait));
      $.SUBRULE($.eternityChallenge);
    },
    validate: ctx => {
      ctx.startLine = ctx.Unlock[0].startLine;
      return true;
    },
    compile: ctx => {
      const nowait = ctx.Nowait !== undefined;
      const ecNumber = ctx.eternityChallenge[0].children.$ecNumber;
      return () => {
        if (EternityChallenge(ecNumber).isUnlocked) {
          AutomatorData.logCommandEvent(`因已解锁永恒挑战 ${ecNumber}, 跳过该指令`, ctx.startLine);
          return AUTOMATOR_COMMAND_STATUS.NEXT_INSTRUCTION;
        }
        if (nowait) {
          AutomatorData.logCommandEvent(`因出现 NOWAIT, 且未满足解锁永恒挑战的要求，跳过解锁永恒挑战${ecNumber}的指令`, ctx.startLine);
          return AUTOMATOR_COMMAND_STATUS.NEXT_INSTRUCTION;
        }
        const purchased = TimeStudy.eternityChallenge(ecNumber).purchase(true);
        if (purchased) {
          AutomatorData.logCommandEvent(`已解锁永恒挑战 ${ecNumber}`, ctx.startLine);
          return AUTOMATOR_COMMAND_STATUS.NEXT_INSTRUCTION;
        }
        return AUTOMATOR_COMMAND_STATUS.NEXT_TICK_SAME_INSTRUCTION;
      };
    },
    blockify: ctx => ({
      singleSelectionInput: "EC",
      singleTextInput: ctx.eternityChallenge[0].children.$ecNumber,
      nowait: ctx.Nowait !== undefined,
      ...automatorBlocksMap.UNLOCK
    })
  },
  {
    id: "untilLoop",
    rule: $ => () => {
      $.CONSUME(T.Until);
      $.OR([
        { ALT: () => $.SUBRULE($.comparison) },
        { ALT: () => $.CONSUME(T.PrestigeEvent) },
      ]);
      $.CONSUME(T.LCurly);
      $.CONSUME(T.EOL);
      $.SUBRULE($.block);
      $.CONSUME(T.RCurly);
    },
    validate: (ctx, V) => {
      ctx.startLine = ctx.Until[0].startLine;
      return V.checkBlock(ctx, ctx.Until);
    },
    compile: (ctx, C) => {
      const commands = C.visit(ctx.block);
      if (ctx.comparison) {
        const evalComparison = C.visit(ctx.comparison);
        return compileConditionLoop(() => !evalComparison(), commands, ctx, true);
      }
      const prestigeLevel = ctx.PrestigeEvent[0].tokenType.$prestigeLevel;
      let prestigeName;
      switch (ctx.PrestigeEvent[0].tokenType) {
        case T.Infinity:
          prestigeName = "无限";
          break;
        case T.Eternity:
          prestigeName = "永恒";
          break;
        case T.Reality:
          prestigeName = "现实";
          break;
        default:
          throw Error("Unrecognized prestige layer in until loop");
      }
      return {
        run: S => {
          if (S.commandState === null) {
            S.commandState = { prestigeLevel: 0 };
          }
          if (S.commandState.prestigeLevel >= prestigeLevel) {
            AutomatorData.logCommandEvent(`已进行 ${prestigeName}，退出 until 循环`,
              ctx.startLine);
            return AUTOMATOR_COMMAND_STATUS.NEXT_INSTRUCTION;
          }
          AutomatorBackend.push(commands);
          AutomatorData.logCommandEvent(`未进行${prestigeName}，跳转至第 ${AutomatorBackend.translateLineNumber(ctx.LCurly[0].startLine + 1)} 行（until 循环的开始）`,
          ctx.startLine);
          return AUTOMATOR_COMMAND_STATUS.SAME_INSTRUCTION;
        },
        blockCommands: commands
      };
    },
    blockify: (ctx, B) => {
      const commands = [];
      B.visit(ctx.block, commands);
      const comparison = B.visit(ctx.comparison);
      if (ctx.comparison) {
        return {
          nest: commands,
          ...automatorBlocksMap.UNTIL,
          ...comparison,
          genericInput1: standardizeAutomatorValues(comparison.genericInput1),
          genericInput2: standardizeAutomatorValues(comparison.genericInput2)
        };
      }
      return {
        genericInput1: ctx.PrestigeEvent[0].tokenType.name.toUpperCase(),
        nest: commands,
        ...automatorBlocksMap.UNTIL
      };
    }
  },
  {
    id: "waitCondition",
    rule: $ => () => {
      $.CONSUME(T.Wait);
      $.SUBRULE($.comparison);
    },
    validate: ctx => {
      ctx.startLine = ctx.Wait[0].startLine;
      return true;
    },
    compile: (ctx, C) => () => {
      const evalComparison = C.visit(ctx.comparison);
      const doneWaiting = evalComparison();
      if (doneWaiting) {
        const timeWaited = TimeSpan.fromMilliseconds(Date.now() - AutomatorData.waitStart).toStringShort();
        if (AutomatorData.isWaiting) {
          AutomatorData.logCommandEvent(`已执行 WAIT 指令，继续运行（${parseConditionalIntoText(ctx)} 为真，用时 ${timeWaited}）`, ctx.startLine);
        } else {
          AutomatorData.logCommandEvent(`已跳过 WAIT 指令（${parseConditionalIntoText(ctx)} 为真）`,
            ctx.startLine);
        }
        AutomatorData.isWaiting = false;
        return AUTOMATOR_COMMAND_STATUS.NEXT_INSTRUCTION;
      }
      if (!AutomatorData.isWaiting) {
        AutomatorData.logCommandEvent(`开始执行 WAIT 指令，等待${parseConditionalIntoText(ctx)}`, ctx.startLine);
        AutomatorData.waitStart = Date.now();
      }
      AutomatorData.isWaiting = true;
      return AUTOMATOR_COMMAND_STATUS.NEXT_TICK_SAME_INSTRUCTION;
    },
    blockify: (ctx, B) => {
      const commands = [];
      B.visit(ctx.block, commands);
      const comparison = B.visit(ctx.comparison);
      return {
        nest: commands,
        ...automatorBlocksMap.WAIT,
        ...comparison,
        genericInput1: standardizeAutomatorValues(comparison.genericInput1),
        genericInput2: standardizeAutomatorValues(comparison.genericInput2)
      };
    }
  },
  {
    id: "waitEvent",
    rule: $ => () => {
      $.CONSUME(T.Wait);
      $.CONSUME(T.PrestigeEvent);
    },
    validate: ctx => {
      ctx.startLine = ctx.Wait[0].startLine;
      return true;
    },
    compile: ctx => {
      const prestigeLevel = ctx.PrestigeEvent[0].tokenType.$prestigeLevel;
      return S => {
        if (S.commandState === null) {
          S.commandState = { prestigeLevel: 0 };
        }
        const prestigeOccurred = S.commandState.prestigeLevel >= prestigeLevel;
        const prestigeName = ctx.PrestigeEvent[0].image.toUpperCase();
        if (prestigeOccurred) {
          const timeWaited = TimeSpan.fromMilliseconds(Date.now() - AutomatorData.waitStart).toStringShort();
          AutomatorData.logCommandEvent(`已执行 WAIT 指令，继续运行（${timeWaited} 后进行 ${prestigeName}, 获得 ${findLastPrestigeRecord(prestigeName)}）`, ctx.startLine);
          AutomatorData.isWaiting = false;
          return AUTOMATOR_COMMAND_STATUS.NEXT_INSTRUCTION;
        }
        if (!AutomatorData.isWaiting) {
          AutomatorData.logCommandEvent(`开始执行 WAIT 指令，等待${prestigeName}`, ctx.startLine);
          AutomatorData.waitStart = Date.now();
        }
        AutomatorData.isWaiting = true;
        return AUTOMATOR_COMMAND_STATUS.NEXT_TICK_SAME_INSTRUCTION;
      };
    },
    blockify: ctx => ({
      genericInput1: ctx.PrestigeEvent[0].tokenType.name.toUpperCase(),
      ...automatorBlocksMap.WAIT
    })
  },
  {
    id: "waitBlackHole",
    rule: $ => () => {
      $.CONSUME(T.Wait);
      $.CONSUME(T.BlackHole);
      $.OR([
        { ALT: () => $.CONSUME(T.Off) },
        { ALT: () => $.CONSUME(T.BlackHoleStr) },
      ]);
    },
    validate: ctx => {
      ctx.startLine = ctx.Wait[0].startLine;
      return true;
    },
    compile: ctx => () => {
      const off = Boolean(ctx.Off);
      // This input has the format "bh#"
      const holeID = ctx.BlackHoleStr ? Number(ctx.BlackHoleStr[0].image.charAt(2)) : 0;
      const bhCond = off ? !BlackHole(1).isActive : BlackHole(holeID).isActive;
      const bhStr = off ? "黑洞冷却" : `激活黑洞 ${holeID}`;
      if (bhCond) {
        const timeWaited = TimeSpan.fromMilliseconds(Date.now() - AutomatorData.waitStart).toStringShort();
        AutomatorData.logCommandEvent(`已执行 WAIT 指令，继续运行（等待 ${timeWaited} 后${bhStr}）`,
          ctx.startLine);
        AutomatorData.isWaiting = false;
        return AUTOMATOR_COMMAND_STATUS.NEXT_INSTRUCTION;
      }
      if (!AutomatorData.isWaiting) {
        AutomatorData.logCommandEvent(`开始执行 WAIT 指令，等待${bhStr}`, ctx.startLine);
        AutomatorData.waitStart = Date.now();
      }
      AutomatorData.isWaiting = true;
      return AUTOMATOR_COMMAND_STATUS.NEXT_TICK_SAME_INSTRUCTION;
    },
    blockify: ctx => ({
      genericInput1: "BLACK HOLE",
      // Note: In this particular case we aren't actually storing a comparison operator. This is still okay
      // because internally this is just the variable for the second slot and has no special treatment beyond that
      compOperator: ctx.BlackHoleStr ? ctx.BlackHoleStr[0].image.toUpperCase() : "OFF",
      ...automatorBlocksMap.WAIT
    })
  },
  {
    id: "whileLoop",
    rule: $ => () => {
      $.CONSUME(T.While);
      $.SUBRULE($.comparison);
      $.CONSUME(T.LCurly);
      $.CONSUME(T.EOL);
      $.SUBRULE($.block);
      $.CONSUME(T.RCurly);
    },
    validate: (ctx, V) => {
      ctx.startLine = ctx.While[0].startLine;
      return V.checkBlock(ctx, ctx.While);
    },
    compile: (ctx, C) => compileConditionLoop(C.visit(ctx.comparison), C.visit(ctx.block), ctx, false),
    blockify: (ctx, B) => {
      const commands = [];
      B.visit(ctx.block, commands);
      const comparison = B.visit(ctx.comparison);
      return {
        nest: commands,
        ...automatorBlocksMap.WHILE,
        ...comparison,
        genericInput1: standardizeAutomatorValues(comparison.genericInput1),
        genericInput2: standardizeAutomatorValues(comparison.genericInput2)
      };
    }
  },
  {
    id: "stop",
    rule: $ => () => {
      $.CONSUME(T.Stop);
    },
    validate: ctx => {
      ctx.startLine = ctx.Stop[0].startLine;
      return true;
    },
    compile: ctx => () => {
      AutomatorData.logCommandEvent(`因出现 STOP 指令，运行中止`, ctx.startLine);
      return AUTOMATOR_COMMAND_STATUS.HALT;
    },
    blockify: () => ({
      ...automatorBlocksMap.STOP,
    })
  }
];
