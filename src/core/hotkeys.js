import Mousetrap from '../../modules/mousetrap.js'

import { ElectronRuntime } from '../steam/index.js'

import { GameKeyboard } from './keyboard.js'

// Add your hotkeys and combinations here
// GameKeyboard.bind for single press combinations
// GameKeyboard.bindRepeatable for repeatable combinations
// Hotkeys obey player.options.hotkeys option, and should be everying relating to the functionality of the game itself
// GameKeyboard.bindHotkey for single press hotkeys
// GameKeyboard.bindRepeatableHotkey for repeatable hotkeys
// GameKeyboard class uses Mousetrap under the hood, so for more details visit
// https://craig.is/killing/mice

// Note: mod is a function key helper by Mousetap for both ctrl and command,
// and should be used to provide support for both Windows and Max

// Note: DON'T add repeatables with modifier keys other than shift
// because Mousetrap is crap, and we needed to plug it up to work
// properly with shift, so you will need to plug it up additionally
// for the other modifier keys (#3093).

// Free keys:
// i, j, k, l, n, o, p, q, v, w, x

export const shortcuts = [
  { name: '切换自动购买器', keys: ['a'], type: 'bindHotkey', function: () => keyboardToggleAutobuyers(), visible: true },
  { name: '购买一次计数频率升级', keys: ['shift', 't'], type: 'bindRepeatableHotkey', function: () => buyTickSpeed(), visible: true },
  { name: '购买最大计数频率升级', keys: ['t'], type: 'bindRepeatableHotkey', function: () => buyMaxTickSpeed(), visible: true },
  { name: '最大化所有', keys: ['m'], type: 'bindRepeatableHotkey', function: () => maxAll(), visible: true },
  { name: '维度献祭', keys: ['s'], type: 'bindRepeatableHotkey', function: () => sacrificeBtnClick(), visible: true },
  { name: '维度提升', keys: ['d'], type: 'bindRepeatableHotkey', function: () => manualRequestDimensionBoost(true), visible: true },
  { name: '单次维度提升', keys: ['shift', 'd'], type: 'bindRepeatableHotkey', function: () => manualRequestDimensionBoost(false), visible: false },
  { name: '反物质星系', keys: ['g'], type: 'bindRepeatableHotkey', function: () => manualRequestGalaxyReset(true), visible: true },
  { name: '单次反物质星系', keys: ['shift', 'g'], type: 'bindRepeatableHotkey', function: () => manualRequestGalaxyReset(false), visible: false },
  { name: '大坍缩', keys: ['c'], type: 'bindRepeatableHotkey', function: () => manualBigCrunchResetRequest(), visible: true },
  {
    name: '复制星系',
    keys: ['r'],
    type: 'bindHotkey',
    function: () => {
      replicantiGalaxyRequest()
      setHoldingR(true)
    },
    visible: () => Replicanti.areUnlocked || PlayerProgress.eternityUnlocked(),
  },
  { name: '永恒', keys: ['e'], type: 'bindRepeatableHotkey', function: () => eternityResetRequest(), visible: () => PlayerProgress.eternityUnlocked() || Player.canEternity },
  {
    name: '切换时间研究重置',
    keys: ['shift', 'e'],
    type: 'bindHotkey',
    function: () => {
      player.respec = !player.respec
      GameUI.notify.info(`时间研究重置现在${player.respec ? '启用' : '禁用'}`)
    },
    visible: () => PlayerProgress.eternityUnlocked(),
  },
  {
    name: '进入/退出膨胀',
    keys: ['l'],
    type: 'bindRepeatableHotkey',
    function: () => startDilatedEternityRequest(),
    visible: () => PlayerProgress.realityUnlocked() || PlayerProgress.dilationUnlocked(),
  },
  { name: '进行现实', keys: ['y'], type: 'bindRepeatableHotkey', function: () => requestManualReality(), visible: () => PlayerProgress.realityUnlocked() || isRealityAvailable() },
  {
    name: '切换符文卸下',
    keys: ['shift', 'y'],
    type: 'bindHotkey',
    function: () => {
      player.reality.respec = !player.reality.respec
      GameUI.notify.info(`符文重置现在${player.reality.respec ? '启用' : '禁用'}`)
    },
    visible: () => PlayerProgress.realityUnlocked(),
  },
  { name: '启动/暂停自动脚本', keys: ['u'], type: 'bindHotkey', function: () => keyboardAutomatorToggle(), visible: () => Player.automatorUnlocked },
  { name: '重启自动脚本', keys: ['shift', 'u'], type: 'bindHotkey', function: () => keyboardAutomatorRestart(), visible: () => Player.automatorUnlocked },
  { name: '撤销编辑（自动脚本）', keys: ['mod', 'z'], type: 'bind', function: () => AutomatorData.undoScriptEdit(), visible: () => Player.automatorUnlocked },
  { name: '重做编辑（自动脚本）', keys: ['mod', 'y'], type: 'bind', function: () => AutomatorData.redoScriptEdit(), visible: () => Player.automatorUnlocked },
  { name: '切换黑洞', keys: ['b'], type: 'bindHotkey', function: () => BlackHoles.togglePause(), visible: () => PlayerProgress.realityUnlocked() },
  { name: '切换连续统', keys: ['alt', 'a'], type: 'bindHotkey', function: () => keyboardToggleContinuum(), visible: () => Laitela.continuumUnlocked },
  { name: '进行末日', keys: ['z'], type: 'bindRepeatableHotkey', function: () => armageddonRequest(), visible: () => Pelle.isDoomed },
  {
    name: '切换符文卸下（佩勒）',
    keys: ['shift', 'z'],
    type: 'bindHotkey',
    function: () => {
      if (!Pelle.isDoomed) return
      player.reality.respec = !player.reality.respec
      GameUI.notify.info(`符文重置现在${player.reality.respec ? '启用' : '禁用'}`)
    },
    visible: () => Pelle.isDoomed,
  },
  {
    name: '保存游戏',
    keys: ['mod', 's'],
    type: 'bind',
    function: () => {
      GameStorage.save(false, true)
      return false
    },
    visible: true,
  },
  {
    name: '导出游戏',
    keys: ['mod', 'e'],
    type: 'bind',
    function: () => {
      GameStorage.export()
      return false
    },
    visible: true,
  },
  {
    name: '打开快捷键列表',
    keys: ['?'],
    type: 'bind',
    function: () => {
      keyboardPressQuestionMark()
      return false
    },
    visible: true,
  },
  {
    name: '打开“如何游玩”',
    keys: ['h'],
    type: 'bind',
    function: () => {
      keyboardH2PToggle()
      return false
    },
    visible: true,
  },
  {
    name: '修改可见标签页',
    keys: ['tab'],
    type: 'bind',
    function: () => {
      keyboardVisibleTabsToggle()
      return false
    },
    visible: true,
  },
  {
    name: '确认模态框',
    keys: ['enter'],
    type: 'bind',
    function: () => {
      EventHub.dispatch(GAME_EVENT.ENTER_PRESSED)
      return true
    },
    visible: true,
  },
  {
    name: '关闭模态框或打开选项',
    keys: ['esc'],
    type: 'bind',
    function: () => {
      keyboardPressEscape()
      return false
    },
    visible: true,
  },
  {
    name: '表达敬意',
    keys: ['f'],
    type: 'bindRepeatable',
    function: () => {
      GameUI.notify.info('表达敬意')
      SecretAchievement(13).unlock()
    },
    visible: false,
  },
  {
    name: '切换标签页',
    keys: ['up'],
    type: 'bind',
    function: () => {
      EventHub.dispatch(GAME_EVENT.ARROW_KEY_PRESSED, 'up')
      return false
    },
    visible: false,
  },
  {
    name: '切换标签页',
    keys: ['down'],
    type: 'bind',
    function: () => {
      EventHub.dispatch(GAME_EVENT.ARROW_KEY_PRESSED, 'down')
      return false
    },
    visible: false,
  },
  {
    name: '切换子标签页',
    keys: ['left'],
    type: 'bind',
    function: () => {
      EventHub.dispatch(GAME_EVENT.ARROW_KEY_PRESSED, 'left')
      return false
    },
    visible: false,
  },
  {
    name: '切换子标签页',
    keys: ['right'],
    type: 'bind',
    function: () => {
      EventHub.dispatch(GAME_EVENT.ARROW_KEY_PRESSED, 'right')
      return false
    },
    visible: false,
  },
  { name: '不存在', keys: ['9'], type: 'bind', function: () => SecretAchievement(41).unlock(), visible: false },
  { name: '调整自动购买器', keys: ['mod', 'alt', 'a'], type: 'bind', function: () => keyboardEditAutobuyers(), visible: () => Autobuyers.hasAutobuyersForEditModal },
  { name: '全屏', keys: ['F10'], type: 'bind', function: () => {}, visible: () => false },
  { name: '放大', keys: ['ctrl', '='], type: 'bind', function: () => ElectronRuntime.increaseZoom(), visible: () => false },
  { name: '放大', keys: ['ctrl', '+'], type: 'bind', function: () => ElectronRuntime.increaseZoom(), visible: () => false },
  { name: '缩小', keys: ['ctrl', '-'], type: 'bind', function: () => ElectronRuntime.decreaseZoom(), visible: () => false },
  { name: '重置缩放', keys: ['ctrl', '0'], type: 'bind', function: () => ElectronRuntime.resetZoom(), visible: () => false },
]

for (const hotkey of shortcuts) {
  GameKeyboard[hotkey.type](hotkey.keys.join('+'), hotkey.function)
}

// We need to know whether the player is holding R or not for the replicanti galaxy
// The keydown version is above, with the replicantiGalaxyRequest, as otherwise it would be overridden
GameKeyboard.bind('r', () => setHoldingR(false), 'keyup')

// Same thing with Shift; we need to double-up on ctrl-shift as well since they're technically different keybinds
GameKeyboard.bind('shift', () => setShiftKey(true), 'keydown')
GameKeyboard.bind('shift', () => setShiftKey(false), 'keyup')
GameKeyboard.bind('ctrl+shift', () => setShiftKey(true), 'keydown')
GameKeyboard.bind('ctrl+shift', () => setShiftKey(false), 'keyup')
GameKeyboard.bind('alt+shift', () => setShiftKey(true), 'keydown')
GameKeyboard.bind('alt+shift', () => setShiftKey(false), 'keyup')

GameKeyboard.bindHotkey('alt+t', () => toggleAutobuyer(Autobuyer.tickspeed))
GameKeyboard.bindHotkey('shift+alt+t', () => toggleBuySingles(Autobuyer.tickspeed))
GameKeyboard.bindHotkey('alt+s', () => toggleAutobuyer(Autobuyer.sacrifice))
GameKeyboard.bindHotkey('alt+d', () => toggleAutobuyer(Autobuyer.dimboost))
GameKeyboard.bindHotkey('alt+g', () => toggleAutobuyer(Autobuyer.galaxy))
GameKeyboard.bindHotkey('alt+r', () => toggleAutobuyer(Autobuyer.replicantiGalaxy))

GameKeyboard.bindHotkey('alt+c', () => toggleAutobuyer(Autobuyer.bigCrunch))
GameKeyboard.bindHotkey('alt+e', () => toggleAutobuyer(Autobuyer.eternity))
GameKeyboard.bindHotkey('alt+y', () => toggleAutobuyer(Autobuyer.reality))
;(function () {
  function bindDimensionHotkeys(tier) {
    GameKeyboard.bindRepeatableHotkey(`${tier}`, () => buyManyDimension(tier))
    GameKeyboard.bindRepeatableHotkey(`num${tier}`, () => buyManyDimension(tier))
    GameKeyboard.bindRepeatableHotkey(`shift+${tier}`, () => buyOneDimension(tier))
    GameKeyboard.bindRepeatableHotkey(`shift+num${tier}`, () => buyOneDimension(tier))
    GameKeyboard.bindHotkey(`alt+${tier}`, () => toggleAutobuyer(Autobuyer.antimatterDimension(tier)))
    GameKeyboard.bindHotkey(`alt+num${tier}`, () => toggleAutobuyer(Autobuyer.antimatterDimension(tier)))
    GameKeyboard.bindHotkey(`shift+alt+${tier}`, () => toggleBuySingles(Autobuyer.antimatterDimension(tier)))
    GameKeyboard.bindHotkey(`shift+alt+num${tier}`, () => toggleBuySingles(Autobuyer.antimatterDimension(tier)))
  }
  for (let i = 1; i < 9; i++) bindDimensionHotkeys(i)
})()

// A few special GameKeyboards
GameKeyboard.bind(['mod+shift+c', 'mod+shift+i', 'mod+shift+j', 'f12'], () => SecretAchievement(23).unlock())

// Toggle autobuyers
function toggleAutobuyer(buyer) {
  // Autobuyer.tickspeed.isUnlocked is false without NC9, but we still want the simpler one to be togglable via hotkey
  const isSimpleTickspeed = buyer === Autobuyer.tickspeed && buyer.isBought
  if (buyer.disabledByContinuum) {
    GameUI.notify.info('开启连续统时无法切换状态')
  } else if (buyer.isUnlocked || isSimpleTickspeed) {
    buyer.toggle()
    GameUI.notify.info(`${buyer.name} 自动购买器切换 ${buyer.isActive ? '开启' : 'o关闭'}`)
  }
  return false
}

function toggleBuySingles(buyer) {
  if (buyer.disabledByContinuum) {
    GameUI.notify.info('开启连续统时无法切换状态')
  } else if (buyer.isUnlocked && buyer.toggleMode !== null) {
    buyer.toggleMode()
    const bulkName = buyer.name === 'Tickspeed' || buyer.hasUnlimitedBulk ? 'max' : '10'
    GameUI.notify.info(`${buyer.name} 自动购买器设置为 ${buyer.mode === 1 ? '单个' : bulkName}`)
  }
  return false
}

function keyboardToggleAutobuyers() {
  if (Tab.automation.isUnlocked) {
    Autobuyers.toggle()
    GameUI.notify.info(`自动购买器 ${player.auto.autobuyersOn ? '恢复' : '暂停'}`)
  }
}

function keyboardToggleContinuum() {
  if (!Laitela.continuumUnlocked) return
  if (ImaginaryUpgrade(21).isLockingMechanics && player.auto.disableContinuum) {
    ImaginaryUpgrade(21).tryShowWarningModal()
    return
  }
  // This is a toggle despite the lack of !, because player.auto.disableContinuum
  // is negated compared to whether continuum is on.
  Laitela.setContinuum(player.auto.disableContinuum)
  GameUI.notify.info(`${player.auto.disableContinuum ? '禁用' : '启用'} 连续统`)
}

function keyboardAutomatorToggle() {
  // Automator must be unlocked
  if (Player.automatorUnlocked) {
    if (AutomatorBackend.isRunning) {
      AutomatorBackend.pause()
    } else if (AutomatorBackend.isOn) {
      AutomatorBackend.mode = AUTOMATOR_MODE.RUN
    } else {
      // Only attempt to start the visible script instead of the existing script if it isn't already running
      const visibleIndex = player.reality.automator.state.editorScript
      AutomatorBackend.restart()
      AutomatorBackend.start(visibleIndex)
      if (AutomatorData.currentErrors().length === 0) {
        GameUI.notify.automator(`启动脚本 "${AutomatorBackend.scriptName}"`)
      } else {
        GameUI.notify.error(`无法启动脚本 "${AutomatorBackend.scriptName}" (存在错误)`)
      }
      return
    }
    const action = AutomatorBackend.isRunning ? '恢复' : '暂停'
    const linenum = AutomatorBackend.currentLineNumber
    GameUI.notify.automator(`${action} 脚本 "${AutomatorBackend.scriptName}" 于行 ${linenum}`)
  }
}

function keyboardAutomatorRestart() {
  if (Player.automatorUnlocked) {
    const action = AutomatorBackend.isOn ? '重启' : '启动'
    GameUI.notify.automator(`${action} 脚本 "${AutomatorBackend.scriptName}"`)

    AutomatorBackend.restart()
    AutomatorBackend.start()
  }
}

function armageddonRequest() {
  if (!Pelle.canArmageddon) return
  Pelle.armageddon(true)
}

function keyboardPressEscape() {
  if (Quote.isOpen || Quote.isHistoryOpen) Quote.clearAll()
  else if (Modal.isOpen) Modal.hideAll()
  else Tab.options.show(true)
}

function keyboardPressQuestionMark() {
  if (Modal.hotkeys.isOpen) {
    EventHub.dispatch(GAME_EVENT.CLOSE_MODAL)
    return
  }
  if (Modal.isOpen) Modal.hideAll()
  Modal.hotkeys.show()
}

function keyboardH2PToggle() {
  if (Modal.h2p.isOpen) {
    EventHub.dispatch(GAME_EVENT.CLOSE_MODAL)
    return
  }
  if (Modal.isOpen) Modal.hideAll()
  Modal.h2p.show()
}

function keyboardEditAutobuyers() {
  if (Modal.autobuyerEditModal.isOpen) {
    EventHub.dispatch(GAME_EVENT.CLOSE_MODAL)
    return
  }
  if (!Autobuyers.hasAutobuyersForEditModal) return
  if (Modal.isOpen) Modal.hideAll()
  Modal.autobuyerEditModal.show()
}

function keyboardVisibleTabsToggle() {
  if (Modal.hiddenTabs.isOpen) {
    EventHub.dispatch(GAME_EVENT.CLOSE_MODAL)
    return
  }
  if (Modal.isOpen) Modal.hideAll()
  Modal.hiddenTabs.show()
}

EventHub.logic.on(GAME_EVENT.ARROW_KEY_PRESSED, (direction) => {
  if (Quote.isOpen || Quote.isHistoryOpen) return
  // Current tabs. Defined here as both tab and subtab movements require knowing your current tab.
  const currentTab = Tabs.current.key
  if (direction[0] === 'up' || direction[0] === 'down') {
    // Make an array of the keys of all the unlocked and visible tabs
    const tabs = Tabs.currentUIFormat.flatMap((i) => (i.isAvailable ? [i.key] : []))
    // Find the index of the tab we are on
    let top = tabs.indexOf(currentTab)
    // Move in the desired direction
    if (direction[0] === 'up') top--
    else top++
    // Loop around if needed
    top = (top + tabs.length) % tabs.length
    // And now we go there.
    Tab[tabs[top]].show(true)
  } else if (direction[0] === 'left' || direction[0] === 'right') {
    // Current subtabs
    const currentSubtab = Tabs.current._currentSubtab.key
    // Make an array of the keys of all the unlocked and visible subtabs
    const subtabs = Tabs.current.subtabs.flatMap((i) => (i.isAvailable ? [i.key] : []))
    // Find the index of the subtab we are on
    let sub = subtabs.indexOf(currentSubtab)
    // Move in the desired direction
    if (direction[0] === 'left') sub--
    else sub++
    // Loop around if needed
    sub = (sub + subtabs.length) % subtabs.length
    // And now we go there.
    Tab[currentTab][subtabs[sub]].show(true)
  }
})

const konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a', 'enter']
let konamiStep = 0

function testKonami(character) {
  if (SecretAchievement(17).isUnlocked) return
  // This conditional is structured weirdly in order to make sure more than 2 consecutive "up" inputs doesn't
  // reset the sequence state unnecessarily, and that interrupting the sequence later on with the starting
  // input will correctly set the state to one step in
  if (konamiCode[konamiStep] === character) konamiStep++
  else if (konamiStep === 2 && character === 'up') konamiStep = 2
  else if (character === konamiCode[0]) konamiStep = 1
  else konamiStep = 0
  if (konamiCode.length <= konamiStep) {
    SecretAchievement(17).unlock()
    Currency.antimatter.bumpTo(30)
    Speedrun.startTimer()
  }
}

// Remember that Mousetrap handles the backend for GameKeyboard
// Without this, Mousetrap become confused when the "up" key is pressed, as it is the starting key of a sequence
// and an individual key. To allow both the up keybind and the konami code to work, we will change how Mousetrap handles
// all keys so the konami code functions entirely separately from the normal handling.
const originalHandleKey = Mousetrap.prototype.handleKey
Mousetrap.prototype.handleKey = function (character, modifiers, e) {
  if (e.type === 'keydown') testKonami(character)
  return originalHandleKey.apply(this, [character, modifiers, e])
}
