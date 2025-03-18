import { DC } from '../constants.js'
import { credits } from './credits.js'

export const h2p = {
  /**
   • @template
   • {
   •  @property {String} name   Internal name for the tab entry
   •  @property {String} alias  Display name for the tab; if not present, will use the internal name
   •  @property {Number} id     Unique ID for each entry (generated in-game, not explicitly stated)
   •  @property {function: @return String} info         Text body of information for the entry
   •  @property {function: @return Boolean} isUnlocked  Condition for when the entry is visible and searchable
   •  @property {Array: String} tags  List of keywords which are linked to this tab in the search function
   •  @property {String} tab    Key of a tab+subtab combination which will default the h2p to this entry if opened
   • }
   */
  tabs: [
    {
      name: '这是个啥？',
      info: () => `
        欢迎来到“如何游玩”！
        <br>
        <br>
        这个弹窗（弹出窗口）包含了你在游戏过程中遇到的所有内容的深入解释和额外细节。随着你解锁新的功能和机制，你还可以在这里获得更多的页面。如果你对游戏中的某些内容感到困惑或迷失，你可能会在这里找到相关的解释。
        <br>
        <br>
        目前，打开“如何游玩”将始终从本页开始。在你获得第一次维度提升后，打开这个弹窗将把你带到与你当前可见的标签页和子标签页内容最相关的“如何游玩”条目，如果存在这样的条目。
        `,
      isUnlocked: () => true,
      tags: ['h2p', 'how', 'to', 'play', 'modal'],
      tab: '',
    },
    {
      name: '你的存档',
      info: () => `
你的游戏存档数据存储在计算机的浏览器数据中（如果你在网页浏览器上玩），或者在你的Steam安装文件夹中（如果你在Steam上玩）。这意味着清除浏览器的缓存或Cookie，或者从Steam完全卸载游戏，也会删除你的存档文件。
同样，如果你在隐私或无痕窗口中玩游戏，下次打开浏览器时，你的存档将不存在。存档也是浏览器特定的，例如，如果你在Chrome上玩游戏，你在Firefox上找不到你的存档。最后，你在网页版和Steam版上的存档也完全独立。
<br>
<br>
你可以通过使用导出功能在设备之间转移存档，该功能会将一串非常长的随机字符复制到剪贴板。该文本包含你的存档数据，你可以通过将其粘贴到导入提示的文本框中将其加载回游戏中。你需要完整的存档文本来正确导入，否则游戏可能无法识别该文本为有效的存档。某些消息应用程序可能会在设备之间传输存档时截断部分文本。
<br>
<br>
来自“现实”更新后的格式正确的存档字符串将以<b>${GameSaveSerializer.startingString.savefile}</b>开头，并以<b>${
        GameSaveSerializer.endingString.savefile
      }</b>结尾。如果你从“现实”更新前的游戏版本导入，它将以<b>eyJ</b>开头，并以<b>In19</b>、<b>fX0=</b>或<b>fQ==</b>结尾。如果这些情况都不符合，那么你的存档部分缺失，导入将失败。除了导入和导出到剪贴板外，你还可以从文本文件导入和导出。
<br>
你可以使用“选择存档”按钮在浏览器上的三个独立存档之间切换。这些存档在大多数情况下是完全独立的。导入和导出只会影响当前的存档槽。<b>唯一的例外是清除浏览器或Steam数据，在这种情况下，所有三个存档都将被重置。</b>
<br>
<br>
游戏会定期自动保存，默认每${formatInt(
        30
      )}秒一次。如果你需要关闭游戏，请记住这一点——你在关闭前所做的任何事情可能不会被保存，除非你等待自动保存间隔或手动再次保存。自动保存间隔的长度是可调的，其计时器可以在屏幕的左下角看到。
<br>
<br>
存档的备份也会在在线或离线一段时间后保存，你可以通过点击“打开自动存档备份菜单”按钮随时检查和重新加载这些备份。如果你想将存档恢复到过去的某个时间点，例如几分钟前或你最后一次离线时，这些备份可能会很有用。
<br>
<br>
你还可以将Google账户连接到游戏，允许你将进度保存在云端。这使你可以使用相同的存档在任何登录同一账户的设备上玩游戏。云存档仅与网页版或Steam版游戏的其他存档兼容；来自Android应用的游戏存档不会通过云存档自动链接。从云端保存和加载会自动覆盖其他存档，除非其他存档较旧或进度明显更多，在这种情况下会弹出一个窗口询问你要保留哪个存档。
<br>
<br>
如果你愿意，你可以随时通过点击按钮完全重置存档，这将弹出一个提示，你需要填写以确保你有意重置。执行此重置只会清除当前存档；其他存档槽将不受影响。<b>以这种方式重置游戏是完全不可逆的，并且不会给你带来任何永久的好处，无论是秘密的还是其他的。</b>
`,
      isUnlocked: () => true,
      tags: ['choose', 'cloud', 'google', 'save', 'import', 'export', 'reset'],
      tab: 'options/saving',
    },
    {
      name: '样式',
      info: () => `
游戏有两种不同的UI布局——经典UI保持了“现实”更新前的《反物质维度》风格，而现代UI则是基于更现代的暗色主题风格重新设计的。此外，还有各种主题可以应用于修改游戏中所有内容的外观。有几个秘密主题可以通过导入某些短语来解锁。两种UI布局都支持所有不同的可能主题。
<br>
<br>
游戏中用于显示数字的符号默认为混合科学计数法，但可以通过下拉菜单更改为众多选项之一。其中许多符号是作为玩笑设计的，在某些情况下会将数字格式化为导致文本溢出到屏幕其他部分的方式——这不是错误。你还可以通过“指数符号选项”菜单配置当数字非常大时的显示方式，尽管这可能会导致某些地方的文本出现奇怪的外观。
<br>
<br>
游戏中的许多事件会触发全屏动画或弹出窗口，要求你确认是否要继续。大多数这些动画和确认可以通过选项单独禁用，尽管禁用任何给定动画或确认的能力只会在它们至少显示一次后出现。
`,
      isUnlocked: () => true,
      tags: ['UI', 'update', 'news', 'theme', 'notation', 'comma', 'exponent', 'animation', 'retry', 'confirmation', 'offline', 'hotkey', 'classic', 'modern'],
      tab: 'options/visual',
    },
    {
      name: '离线进度',
      info: () => `
《反物质维度》有一个追赶机制，试图模拟游戏在长时间关闭后的行为。模拟行为只是部分准确，因为游戏在数学上过于复杂，无法在合理的时间内以完全准确性运行。在模拟结束时，游戏将总结在你离开期间各种相关资源的变化。
<br>
<br>
如果游戏保持打开状态但长时间失去焦点或被挂起，它将在你返回时尝试将错过的时间作为离线进度应用。这可能不可靠，因为不同的设备处理这些情况的方式不同。如果这导致不希望的行为，可以在选项中关闭此功能——在这种情况下，游戏将尝试在一个时钟周期内应用所有错过的时间。
<br>
<br>
游戏运行在一个系统上，其中所有内容每时钟周期更新一次——所有维度和资源进行一次生产，所有自动购买器触发一次，所有乘数和值相应更改，所有显示的数字都会更新。默认情况下，当游戏运行时每秒有${formatInt(
        20
      )}个时钟周期，尽管这可以通过更改游戏选项中的“更新速率”来修改。
你当前的设置将平均以${format(1000 / player.options.updateRate, 2, 1)}个时钟周期每秒运行游戏，尽管延迟和内部JavaScript行为可能会导致个别时钟周期有百分之几的差异。
<br>
<br>
当离线模拟激活时，这些时钟周期的长度会进行调整，以填补你离开的时间——例如，设置为${formatInt(1000)}个离线时钟周期并关闭游戏一小时将导致每个时钟周期为${format(
        3.6,
        1,
        1
      )}秒。对于游戏中的大多数内容来说，这不是问题，因为这仍然会在模拟完成后产生大致相同的资源量。一个值得注意的例外是自动购买器——在这种情况下，自动购买器实际上每${format(
        3.6,
        1,
        1
      )}秒才触发一次，这可能会对游戏的部分内容产生重大影响。
<br>
<br>
${
  player.blackHole[0].unlocked
    ? `<b>离线黑洞行为：</b>一旦解锁黑洞，离线进度模拟将尝试以每个时钟周期包含大致相同<i>游戏</i>时间的方式运行游戏。这可能会给人一种黑洞在模拟期间比正常情况下活跃时间更长的印象，而实际上游戏运行活动周期的速度较慢，并“跳过”非活动周期，因为它们对每单位实际时间的生产贡献较少。这导致的行为通常比具有恒定实际时间的时钟周期更有利于你。
      <br>
      <br>`
    : ''
}
离线时钟周期数可以在${formatInt(500)}到${formatInt(
        DC.E6
      )}之间调整。较小的计数将导致更快但不太准确的模拟，而较大的计数将导致更准确但需要更长时间完成的模拟。每个游戏时钟周期的时间限制为一天，这意味着在某些罕见情况下（例如超过一年不玩游戏），你可能无法获得你离开的所有时间。
<br>
<br>
如果需要，可以完全禁用离线进度，例如用于诊断或计时目的，或者进行“仅在线”的游戏流程。否则，离线进度默认从游戏一开始就开启。请注意，如果禁用了离线进度，总游戏时间的统计也会在游戏关闭时暂停。
`,
      isUnlocked: () => true,
      tags: ['offline', 'away', 'progress'],
      tab: 'options/gameplay',
    },
    {
      name: '效果叠加',
      info: () => `
《反物质维度》中的大多数效果和升级主要分为三类：
<br>
• <b>加法：</b>这些效果通常用+（或“增加”）后跟一个数字表示，并将它们的值添加到某个基础量。多个加法效果会相加。这些有时也会表现为减少资源成本的减法效果。
<br>
• <b>乘法：</b>这些效果通常用×（或“乘以”）后跟一个数字表示，或者更罕见地用两个数字用➜分隔。不同的乘法来源总是通过相乘组合，而不是相加。在某些情况下，可能会有负效果或成本减少以除法的形式应用在此类别中。
<br>
• <b>幂：</b>这些效果更为罕见，通常用^后跟一个数字表示。多个幂效果按顺序应用，或者等效地通过将幂效果的值相乘并将最终值作为单个幂应用。在罕见情况下，负效果可能以小于${formatInt(
        1
      )}的幂的形式应用在此类别中。
<br>
<br>
除非在升级或奖励<i>替换</i>旧值时另有说明，否则所有这些效果都会相互叠加。在升级用新值替换旧值的情况下，替换发生在上述任何效果应用之前。要确定一组效果的最终值，每个类别的效果分别组合，然后按加法、乘法、然后幂效果的顺序应用。
<br>
<br>
${PlayerProgress.realityUnlocked() || PlayerProgress.dilationUnlocked() ? '膨胀和任何类似膨胀的效果在所有其他效果叠加在一起后应用。' : ''}
<br>
<br>
${
  PlayerProgress.realityUnlocked()
    ? `符文效果实际上有两个叠加属性；它们内部的叠加方式和它们与所有其他游戏效果的叠加方式。这些可能不一定相同——例如，“反物质维度幂”效果将<i>与自身叠加</i>，然后总效果将添加到${formatInt(
        1
      )}的基础值，并作为<i>幂效果</i>应用于反物质维度。`
    : ''
}
`,
      isUnlocked: () => true,
      tags: ['effect', 'stack', 'combine', 'add', 'reduce', 'multiply', 'divide', 'power', 'dilation', 'glyph'],
      tab: 'options/gameplay',
    },
    {
      name: '常见缩写',
      info: () => `
游戏中的许多资源可能会以缩写形式出现在文本中以节省空间。这个“如何游玩”条目将在你首次遇到新资源时自动更新，添加新的条目。
<br>
• <b>AM</b>: 反物质<br>
• <b>AD</b>: 反物质维度<br>
• <b>AG</b>: 反物质星系<br>
${PlayerProgress.infinityUnlocked() ? '- <b>IP</b>: 无限点数<br>' : ''}
${PlayerProgress.infinityUnlocked() ? '- <b>NC</b>: 普通挑战<br>' : ''}
${PlayerProgress.infinityUnlocked() ? '- <b>IC</b>: 无限挑战<br>' : ''}
${InfinityDimension(1).isUnlocked || PlayerProgress.eternityUnlocked() ? '- <b>ID</b>: 无限维度<br>' : ''}
${PlayerProgress.replicantiUnlocked() ? '- <b>RG</b>: 复制器星系<br>' : ''}
${PlayerProgress.eternityUnlocked() ? '- <b>EP</b>: 永恒点数<br>' : ''}
${PlayerProgress.eternityUnlocked() ? '- <b>TT</b>: 时间定理<br>' : ''}
${PlayerProgress.eternityUnlocked() ? '- <b>TD</b>: 时间维度<br>' : ''}
${PlayerProgress.eternityUnlocked() ? '- <b>EC</b>: 永恒挑战<br>' : ''}
${PlayerProgress.dilationUnlocked() ? '- <b>TP</b>: 超光速粒子<br>' : ''}
${PlayerProgress.dilationUnlocked() ? '- <b>DT</b>: 膨胀时间<br>' : ''}
${PlayerProgress.dilationUnlocked() ? '- <b>TG</b>: 超光速星系<br>' : ''}
${PlayerProgress.realityUnlocked() ? '- <b>RM</b>: 现实机器<br>' : ''}
${PlayerProgress.realityUnlocked() ? '- <b>AP</b>: 自动点数<br>' : ''}
${PlayerProgress.realityUnlocked() ? '- <b>BH</b>: 黑洞<br>' : ''}
${MachineHandler.isIMUnlocked ? '- <b>iM</b>: 虚幻机器<br>' : ''}
${Laitela.isUnlocked ? '- <b>DM</b>: 暗物质<br>' : ''}
${Laitela.isUnlocked ? '- <b>DE</b>: 暗能量<br>' : ''}
`,
      isUnlocked: () => true,
      tags: ['abbreviation', 'shorten', 'am', 'ad', 'ag', 'ip', 'nc', 'ic', 'id', 'rg', 'ep', 'tt', 'td', 'ec', 'tp', 'dt', 'tg', 'rm', 'ap', 'bh', 'im', 'dm', 'de'],
      tab: '',
    },
    {
      name: '反物质维度',
      info: () => `
反物质是你在整个游戏中用于购买各种东西的资源。你第一次打开游戏时有${formatInt(10)}反物质，你可以花费它购买第一个反物质维度来开始游戏。
<br>
<br>
反物质维度是游戏中的生产单位。第一个反物质维度生产你的反物质。每个连续的反物质维度生产前一个维度，使你能够稳定增长。总共有八个反物质维度。
<br>
<br>
<b>维度乘数：</b>在维度旁边有一个乘数（例如：第一个维度${formatX(1, 1, 1)}）。每个维度的基础生产量乘以这个数字。每购买${formatInt(10)}个该维度，这个乘数增加${formatX(
        2
      )}。每次发生这种情况时，维度的价格都会增加。
<br>
<br>
<b>累计维度数量：</b>下一列是你当前拥有的该维度数量。这是你用反物质购买的数量的组合，以及从更高维度生产的数量。
<br>
<br>
<b>购买的维度数量：</b>在每个累计维度数量旁边，括号中显示了你为该维度购买的数量，以达到下一个乘数升级。例如，如果你的累计维度数量旁边有(${formatInt(4)})，你将需要再购买${formatInt(
        6
      )}个该维度以获得下一个乘数增加。
<br>
<br>
<b>维度增长百分比：</b>这个数字表示每个维度每秒的增长量。${formatPercents(1)}表示该维度每秒翻倍。这使你可以判断整体增长。
<br>
<br>
<b>成本 &amp; 直到${formatInt(10)}：</b>
当成本按钮高亮时，你可以用反物质购买每个维度的单个数量。或者，如果“直到${formatInt(10)}”按钮高亮，你可以购买达到该维度下一个维度乘数所需的任何数量。
<br>
<br>
<b>全部购买：</b>全部购买将购买第一个反物质维度直到${formatInt(10)}，直到无法再购买，然后是第二个，依此类推，直到第八个反物质维度，然后购买最大时间速度升级。
<br>
<br>
<b>维度基础价格：</b> ${Array.range(1, 8)
        .map((tier) => format(AntimatterDimension(tier)._baseCost, 2, 2))
        .join(', ')}
<br>
<b>每${formatInt(10)}购买维度的价格增加：</b> ${Array.range(1, 8)
        .map((tier) => format(AntimatterDimension(tier)._baseCostMultiplier, 2, 2))
        .join(', ')}
<br>
<br>
<b>快捷键：1, 2, 3, 4, 5, 6, 7, 8</b>用于购买直到${formatInt(10)}第X个维度
（你也可以在购买维度时按住Shift键，这将只购买${formatInt(1)}而不是${formatInt(10)}），<b>M</b>用于全部购买
`,
      isUnlocked: () => true,
      tags: ['dims', 'normal', 'antimatter', 'ad'],
      tab: 'dimensions/antimatter',
    },
    {
      name: '计数频率',
      info: () => `
游戏中的生产发生在每个“时钟周期”中，最初每秒发生一次。通过购买计数频率升级，你可以使你的反物质维度生产得更快，就像每秒有多个时钟周期一样。
<br>
<br>
<b>时间速度：</b>这表示每秒有多少游戏时钟周期发生。分数时钟周期被考虑在内，提升生产就像部分游戏时钟周期已经过去一样。请注意，实际的时间速度是模拟的，游戏始终以你在选项标签中选择的更新速率进行计算。
<br>
<br>
<b>成本：</b>用反物质乘以显示的乘数来购买每秒的时钟周期。
（没有任何星系时，每次购买为${formatX(1.1245, 0, 3)})
<br>
<br>
<b>购买最大：</b>这将用你当前的反物质购买尽可能多的时间速度升级。
<br>
<br>
<b>快捷键：T</b>将购买尽可能多的时间速度升级，或<b>Shift+T</b>购买单个升级。<b>M</b>用于全部购买。
`,
      isUnlocked: () => Tickspeed.isUnlocked,
      tags: ['dimension', 'earlygame', 'time'],
      tab: 'dimensions/antimatter',
    },
    {
      name: '维度提升',
      info: () => `
<b>维度提升：</b>这会重置你的反物质和所有反物质维度，但会解锁另一个反物质维度供你购买，并提升你的维度乘数。
第一次维度提升需要${formatInt(20)}个第四维度，第二次需要${formatInt(20)}个第五维度，依此类推。在解锁所有${formatInt(8)}个维度后，每次额外的提升将比前一次多花费${formatInt(
        15
      )}个第八维度，并且不再解锁维度，但会继续增加你的维度乘数。
<br>
<br>
你每拥有一次维度提升，第一个维度的乘数将增加${formatX(2)}。每个更高维度的乘数将比前一个少应用一次，最低为${formatInt(0)}。例如，拥有${formatInt(3)}次提升，第一个维度将获得${formatX(
        8
      )}，第二个维度${formatX(4)}，第三个维度${formatX(2)}，其他维度不受影响。
<br>
<br>
<b>快捷键：D</b>将尝试购买一次维度提升。
`,
      isUnlocked: () => true,
      tags: ['dimboost', 'reset', 'earlygame'],
      tab: 'dimensions/antimatter',
    },
    {
      name: '反物质星系',
      info: () => `
购买一个反物质星系将重置你的游戏回到只有${formatInt(4)}个维度可用的状态，但会增加你的时间速度升级效果，前两个星系每次增加+${format(0.02, 0, 2)}。随着你获得更多星系，这个乘数会变得越来越强。
<br>
<br>
虽然前几次时间速度升级的影响很小，但这个增加是乘法的，很快就会变得明显。
<br>
<br>
你的第一个反物质星系需要${formatInt(80)}个第八维度，每个额外的星系将多花费${formatInt(60)}。
<br>
<b>遥远星系缩放：</b>超过${formatInt(100)}个反物质星系后，每个星系之间的成本增加将增加${formatInt(2)}，使下一个星系多花费${formatInt(62)}，然后是${formatInt(64)}，依此类推。
<br>
<b>极远星系缩放：</b>超过${formatInt(Galaxy.remoteStart)}个反物质星系后，除了遥远星系的缩放外，<i>总</i>成本每星系增加${formatPercents(0.002, 1)}。
<br>
<br>
<b>快捷键：G</b>将尝试购买一个反物质星系。
`,
      isUnlocked: () => true,
      tags: ['8th', 'reset', 'galaxy', 'earlygame'],
      tab: 'dimensions/antimatter',
    },
    {
      name: '维度献祭',
      info: () => `
<b>你在第五次维度提升后解锁维度献祭。</b>
<br>
<br>
献祭会立即将所有非第八维度的数量重置为零，而不会减少乘数或当前成本。作为回报，它会将第八维度的乘数乘以显示的值。恢复到之前的生产水平需要时间，但你最终会获得净增长。
<br>
<br>
维度献祭的乘数与你献祭时拥有的第一个维度的数量成比例，并且可以通过完成某些成就和挑战来改善缩放。乘数在献祭之间保持不变，这意味着在${formatX(10)}时献祭一次，然后在${formatX(
        4
      )}时献祭一次，与在${formatX(8)}时献祭一次，然后在${formatX(5)}时献祭一次相同；在这两种情况下，你最终的总献祭乘数都是${formatX(40)}。
<br>
<br>
<b>快捷键：S</b>将尝试进行献祭。
`,
      isUnlocked: () => Sacrifice.isVisible,
      tags: ['8th', 'reset', 'earlygame', 'gods', 'earlygame'],
      tab: 'dimensions/antimatter',
    },
    {
      name: '成就',
      info: () => `
每个成就都有解锁要求。一旦解锁，某些成就会给予奖励。要求和奖励的难度和收益差异很大。
<br>
<br>
除了个别成就的特定奖励外，你还将获得一个${formatX(1.03, 2, 2)}的乘数，适用于所有反物质维度。每完成一整行还会获得另一个${formatX(1.25, 2, 2)}。所有成就的总乘数效果显示在所有成就图像的上方。
<br>
<br>
秘密成就不会提供游戏玩法上的好处或优势，它们只是为乐趣而存在。将鼠标悬停在秘密成就上会提示如何获得它们。
`,
      isUnlocked: () => true,
      tags: ['earlygame', 'awards', 'earlygame'],
      tab: 'achievements',
    },
    {
      name: '无限',
      info: () => `
一旦你拥有太多反物质以至于世界无法处理（${formatInt(2)}<sup>${formatInt(1024)}</sup>或大约${formatPostBreak(
        Number.MAX_VALUE,
        6
      )}，有时称为“无限”），你将被迫进行“大坍缩”。这将重置你的反物质、反物质维度、维度提升和反物质星系。进行大坍缩有时也被称为“无限”。
<br>
<br>
你最终将能够突破${formatPostBreak(Number.MAX_VALUE, 6)}，但在此之前，任何更大的数字将显示为${format(Infinity)}。
<br>
<br>
每次完成无限都会给予一个无限点数，可以在新的无限标签中用于购买升级。你必须从上到下购买这些升级。你还将获得一个“无限”，这实际上是你进行压缩的次数。
<br>
<br>
“将所有来源的无限点数乘以${formatInt(2)}”的升级可以多次购买，但每次购买需要${formatInt(10)}倍的IP。你必须完成成就“不需要DLC”才能开始购买这个特定的升级。
<br>
<br>
<b>快捷键：C</b>将尝试进行大坍缩。
`,
      isUnlocked: () => PlayerProgress.infinityUnlocked(),
      tags: ['crunch', 'big', 'upgrades', 'ip', 'reset', 'prestige', 'earlygame'],
      tab: 'infinity/upgrades',
    },
    {
      name: '普通挑战',
      info: () => `
普通挑战在你的第一次无限后解锁；它们以不同的方式改变游戏机制，创造更困难的无限环境。要完成一个挑战，你必须再次达到${formatPostBreak(Number.MAX_VALUE, 2)}反物质。
<br>
<br>
每个完成的普通挑战将奖励一个自动购买器或升级现有自动购买器的能力。你可以多次运行它们（尽管只有第一次会获得奖励），并且可以随时通过“退出挑战”按钮退出。
<br>
<br>
你的第一次无限被认为是第一个普通挑战，因此在解锁挑战时已经完成。
<br>
<br>
无限升级的最右侧列在挑战中不起作用。
`,
      isUnlocked: () => PlayerProgress.infinityUnlocked(),
      tags: ['infinity', 'autobuyer', 'earlygame'],
      tab: 'challenges/normal',
    },
    {
      name: '自动购买器',
      info: () => `
自动购买器允许你自动购买维度、升级或重置。所有自动购买器的控制都位于“自动化”标签下的“自动购买器”子标签中，包括游戏后期解锁的任何额外自动购买器。
<br>
<br>
反物质维度自动购买器和时间速度升级自动购买器可以根据你的总反物质解锁，但大多数其他自动购买器需要购买升级或完成挑战。
<br>
<br>
大多数自动购买器具有相似的属性：
<br>
<br>
<b>自动购买器间隔：</b>自动购买器在尝试进行另一次购买之前的冷却时间。反物质维度自动购买器和时间速度升级自动购买器需要完成各自的挑战才能升级其间隔。
<br>
<br>
<b>反物质维度自动购买器批量购买：</b>一旦自动购买器的间隔达到最小值（${formatInt(100)}毫秒），所有未来的升级将使自动购买器每次时钟周期可以购买的最大数量翻倍。这可以禁用。
<br>
<br>
<b>反物质维度自动购买器购买数量：</b>维度自动购买器可以设置为购买单个维度或直到${formatInt(10)}。批量购买在自动购买器设置为单个时禁用。
<br>
<br>
<b>时间速度自动购买器购买数量：</b>时间速度自动购买器可以设置为每次激活购买单个升级，或者在完成时间速度挑战（C9）后购买最大可能数量。
<br>
<br>
<b>自动维度提升自定义：</b>使用维度提升自动购买器，你可以设置它将尝试购买的最大提升次数，在维度提升始终自动购买之前的最小反物质星系数量，以及（当解锁时）批量购买精确数量的维度提升的能力。如果你达到指定的星系阈值，自动购买器将忽略你的最大提升限制。
<br>
<br>
<b>最大星系：</b>星系自动购买器将购买的最高星系数量。
<br>
<br>
<b>压缩时的IP：</b>一旦你突破无限，你可以设置你希望在压缩前等待的IP数量。
<br>
<br>
<b>献祭自动购买器：</b>这个自动购买器从最大间隔开始，可能每个时钟周期触发一次。
<br>
<br>
<b>动态数量：</b>升级后的重置自动购买器有一个模式，当达到指定阈值时触发重置。开启“动态数量”将允许在解锁某些升级或成就时自动增加此阈值值，这些升级或成就对此值应用乘数。
<br>
<br>
<b>暂停/恢复自动购买器：</b>此按钮将暂停或恢复已开启的自动购买器。它不会更改单个自动购买器的设置。可以将其视为一个主开关。
<br>
<br>
<b>启用/禁用所有自动购买器：</b>此按钮将单独开启或关闭所有自动购买器。
<br>
<br>
<b>快捷键：A</b>（用于暂停/恢复自动购买器）。
此外，在按下与升级、维度或重置相关的快捷键时按住<b>Alt</b>将切换相关的自动购买器。
`,
      isUnlocked: () => true,
      tags: ['infinity', 'automation', 'challenges', 'rewards', 'interval', 'earlygame'],
      tab: 'automation/autobuyers',
    },
    {
      name: '打破无限',
      info: () => `
一旦你突破无限，你将不再受限于${formatPostBreak(Number.MAX_VALUE, 2)}反物质，并且可以根据你在压缩时拥有的反物质数量获得超过${formatInt(1)}个IP。
<br>
<br>
你现在在${formatPostBreak(Number.MAX_VALUE, 2)}反物质时压缩会获得约${format(1.78, 2, 2)}个IP。你压缩时获得的IP每增加一个${formatPostBreak(Number.MAX_VALUE, 2)}反物质因子乘以${formatInt(
        10
      )}（以连续方式）。在所有乘数应用后，向下舍入到最接近的整数。
<br>
<br>
所有维度的反物质成本在超过${formatPostBreak(Number.MAX_VALUE, 2)}后开始更快地增加。在${formatPostBreak(Number.MAX_VALUE, 2)}以上的升级<i>之间</i>的成本每升级增加${formatX(
        10
      )}，时间速度升级成本也有类似的缩放。
`,
      isUnlocked: () => Autobuyer.bigCrunch.hasMaxedInterval || PlayerProgress.eternityUnlocked(),
      tags: ['limit', 'crunch', 'upgrades', 'midgame'],
      tab: 'infinity/break',
    },
    {
      name: '无限维度',
      info: () => `
<b>解锁无限维度：</b>无限维度通过达到一定数量的反物质解锁。
<br>
<br>
<b>无限维度购买：</b>无限维度只能以${formatInt(10)}为一组购买，并且花费无限点数。它们每次购买都会给予一个永久乘数，类似于其他维度。实际应用的乘数取决于你购买的无限维度。
<br>
<br>
<b>无限维度生产：</b>就像反物质维度一样，每个无限维度生产下一个更高的无限维度。
<br>
<br>
每次压缩时，你生产的无限维度会重置为你购买的数量。虽然无限维度的生产不会在压缩之间保留，但你从购买它们中获得的所有乘数都会保留。
<br>
<br>
<b>无限维度解锁阈值（反物质）：</b> ${Array.range(1, 8)
        .map((tier) => formatPostBreak(InfinityDimension(tier)._unlockRequirement))
        .join(', ')}
<br>
<b>无限维度购买乘数：</b> ${Array.range(1, 8)
        .map((tier) => format(InfinityDimension(tier)._powerMultiplier))
        .join(', ')}
<br>
<b>无限维度基础价格（IP）：</b> ${Array.range(1, 8)
        .map((tier) => format(InfinityDimension(tier)._baseCost))
        .join(', ')}
<br>
<b>无限维度价格增加：</b> ${Array.range(1, 8)
        .map((tier) => format(InfinityDimension(tier)._costMultiplier))
        .join(', ')}
<br>
<br>
与反物质不同，第一个无限维度生产无限之力，它给予所有反物质维度一个等于（力量<sup>${formatInt(7)}</sup>）的乘数。无限维度不受时间速度升级的影响。
`,
      isUnlocked: () => Autobuyer.bigCrunch.hasMaxedInterval || PlayerProgress.eternityUnlocked(),
      tags: ['id', 'power', 'new', 'dims', 'unlock', 'break', 'midgame'],
      tab: 'dimensions/infinity',
    },
    {
      name: '无限挑战',
      info: () => `
无限挑战类似于普通挑战，但它们有更高的最终目标，通常更难。它们不仅解锁自动购买器，还以更独特的方式提升你的各种生产形式。与普通挑战类似，无限挑战中无限升级的最右侧列不起作用。
<br>
<br>
与普通挑战不同，普通挑战是一次性解锁的，而无限挑战需要你达到一定数量的反物质才能尝试。
<br>
<br>
<b>无限挑战解锁阈值：</b> ${GameDatabase.challenges.infinity.map((ic) => formatPostBreak(ic.unlockAM)).join(', ')}
`,
      isUnlocked: () => Autobuyer.bigCrunch.hasMaxedInterval || PlayerProgress.eternityUnlocked(),
      tags: ['rewards', 'break', 'ic', 'midgame'],
      tab: 'challenges/infinity',
    },
    {
      name: '复制器',
      info: () => `
复制器在${format(DC.E140)} IP时解锁。复制器不生产其他东西，而是生产<i>自身</i>，最多达到${formatPostBreak(
        Number.MAX_VALUE,
        2
      )}。复制器以自己的速度生产，不受时间速度升级的影响。每个复制器有一定的几率（初始为${formatPercents(0.01)}）在每个复制器时钟周期（初始为每秒）生产另一个复制器，这两者都可以通过花费IP来升级。
<br>
<br>
如果你购买了复制器星系升级，那么你可以用重置复制器数量回到${formatInt(
        1
      )}来获得一个“免费”的复制器星系。这个星系是免费的，因为它会像反物质星系一样起作用，但它不会使你的下一个反物质星系更贵。然而，它仍然会像反物质星系一样重置相同的东西。
<br>
<br>
<b>快捷键：R</b>将尝试购买一个复制器星系。
<br>
复制器给予所有无限维度一个乘数，在${formatPostBreak(Number.MAX_VALUE, 2)}复制器时达到最大${formatX(Math.pow(2, 20), 2, 2)}。
<br>
<br>
<b>几率升级成本：</b>基础${format(DC.E150)} IP，成本增量${formatX(DC.E15)} IP
<br>
<b>间隔升级成本：</b>基础${format(DC.E140)} IP，成本增量${formatX(DC.E10)} IP
<br>
<b>星系升级成本：</b>基础${format(DC.E170)} IP，成本增量${formatX(DC.E25)} IP，并且每次升级额外增加${formatX(1e5)} IP，类似于遥远反物质星系的缩放。超过${formatInt(
        100
      )}个复制器星系后，每次升级的${formatX(1e5)}变为${formatX(DC.E55)}。超过${formatInt(1000)}后，缩放从二次变为三次，${formatX(DC.E55)}乘数本身每次升级增加${formatX(DC.E5)}。
`,
      isUnlocked: () => Replicanti.areUnlocked || PlayerProgress.eternityUnlocked(),
      tags: ['interval', 'chance', 'infinity', 'galaxy', 'galaxies', 'midgame'],
      tab: 'infinity/replicanti',
    },
    {
      name: '永恒',
      info: () => `
在达到${formatPostBreak(Number.MAX_VALUE, 2)} IP时，你可以进行永恒。永恒将重置此点之前的所有内容，除了挑战时间、成就和统计标签下的一般部分中的任何内容。你将在第一次永恒后获得更多内容。
<br>
<br>
你可以突破${formatPostBreak(Number.MAX_VALUE, 2)} IP而不会有任何强制行为，不像你第一次达到${formatPostBreak(
        Number.MAX_VALUE,
        2
      )}反物质时那样。你将在永恒前拥有的无限点数越多，获得的永恒点数越多。在完成一次永恒时你还将获得一个“永恒次数”。
<br>
<br>
永恒点数增益类似于无限点数增益，但基于无限点数而不是反物质。在${formatPostBreak(Number.MAX_VALUE, 2)} IP时的基础永恒点数增益约为${format(1.62, 2, 2)} EP，每增加一个${formatPostBreak(
        Number.MAX_VALUE,
        2
      )} IP因子乘以${formatInt(5)}。这总是向下舍入，这意味着你在${formatPostBreak(Number.MAX_VALUE, 2)} IP时将获得${formatInt(1)} EP，但在达到${formatPostBreak(DC.E349)}之前不会达到${formatInt(
        2
      )} EP。
<br>
<br>
<b>快捷键：E</b>将尝试进行一次永恒重置。
`,
      isUnlocked: () => PlayerProgress.eternityUnlocked(),
      tags: ['eternal', 'ep', 'reset', 'prestige', 'midgame'],
      tab: 'eternity/upgrades',
    },
    {
      name: '永恒里程碑',
      info: () => `
为了使永恒更快、更方便，随着你获得更多的“永恒”，你将解锁各种增益。这些增益通常会让你在永恒后保留某些升级，提供新的自动购买器以更好地自动化，或者让你以较低的速度离线被动获得资源。
<br>
<br>
给予你升级的里程碑将在第一次开始永恒时自动购买并升级到最大，有效地让你永久拥有它们。
<br>
<br>
所有新的自动购买器都会在各自的手动按钮旁边有切换开关（例如，无限维度自动购买器可以在无限维度标签中找到），除了它们在自动购买器标签中的条目。维度提升、反物质星系和大坍缩自动购买器的改进会更新它们在自动购买器标签中的现有条目。
<br>
<br>
被动生成里程碑的设计仅适用于离线，并且可能需要某些自动购买器设置才能正常工作，如里程碑页面本身所述。
`,
      isUnlocked: () => PlayerProgress.eternityUnlocked(),
      tags: ['eternities', 'rewards', 'automation', 'midgame'],
      tab: 'eternity/milestones',
    },
    {
      name: '时间维度',
      info: () => `
在你的第一次永恒后，你将解锁时间维度。你用永恒点数购买它们，它们生产时间碎片，提供时间速度升级。这些时间速度升级的功能与普通时间速度升级类似，但不会增加它们的成本。时间维度、时间碎片和它们提供的时间速度升级在无限时保留，但在每次永恒时重置。
<br>
<br>
与其他维度类似，第二个时间维度生产第一个时间维度，依此类推。与无限维度类似，你的生产在每次永恒后会重置为你购买的数量，但你将保留你购买的任何乘数升级。
<br>
<br>
每次购买将特定时间维度的乘数增加${formatX(4)}。升级之间的成本乘数有一个基础值，但在达到${format(TimeDimension(1)._costIncreaseThresholds[0], 2)} EP时增加${formatX(1.5, 1, 1)}，在达到${format(
        TimeDimension(1)._costIncreaseThresholds[1]
      )} EP时增加${formatX(2.2, 1, 1)}（基础值）。这些增加是追溯性的，导致在达到这些阈值时成本跳跃，并且仅适用于前四个维度。超过${format(
        TimeDimension(1)._costIncreaseThresholds[2]
      )} EP后，每次维度购买计为四次购买，用于成本增加的目的，导致价格上升得更快。
<br>
<b>时间维度基础价格（EP）：</b> ${Array.range(1, 8)
        .map((tier) => format(TimeDimension(tier)._baseCost))
        .join(', ')}
<br>
<b>时间维度基础价格增加：</b> ${Array.range(1, 8)
        .map((tier) => format(TimeDimension(tier)._costMultiplier))
        .join(', ')}
<br>
<br>
每次获得另一个时间速度升级的阈值比前一次多${formatPercents(0.33)}时间碎片，或者在有相关时间研究的情况下为${formatPercents(0.25)}。在${formatInt(
        FreeTickspeed.softcap
      )}升级后，每个连续免费时间速度升级之间的乘数将以每${formatInt(50000)}升级约${formatX(1.35, 0, 2)}的速度逐渐增加（每升级${formatX(1.000006, 0, 6)}）。
`,
      isUnlocked: () => PlayerProgress.eternityUnlocked(),
      tags: ['dims', 'td', 'shards', 'eternity', 'midgame'],
      tab: 'dimensions/time',
    },
    {
      name: '时间研究',
      info: () => `
时间研究是强大的永恒后升级，花费一种称为时间定理的新资源。时间研究可以提升你在游戏中迄今为止看到的所有内容的生产，甚至可以改变某些公式的工作方式。
<br>
<br>
时间定理是一种有限的资源，每次购买的成本更高。它们可以用反物质、无限点数或永恒点数购买。每次购买的成本增加一个固定的因子。时间定理在永恒时不会重置。
<br>
<br>
研究以树状结构排列，你必须先购买先决条件才能继续。你最初只能购买最顶端的研究，然后从那里你可以购买任何你负担得起的直接下面的研究。然而，有三个例外：
<br>
当研究之间的线有颜色时，你一次只能选择三条路径中的一条。
<br>
当一个永恒挑战的研究在路径上时，你需要完成所有连接到它的挑战至少一次才能访问该研究。你不需要购买挑战研究来访问它。
<br>
在底部，所有边缘再次连接在一起的地方，你只能从每对中选择一个研究。
<br>
<br>
你可以按住Shift键，然后点击一个时间研究来购买直到该点的所有研究。如果你Shift点击一个位于你必须选择两个或多个不同选项的位置的研究，或者你无法负担到达该点所需的所有研究，这可能不会购买你想要的研究。Shift点击会贪婪地购买研究，在向下移动之前尽可能多地购买每一行的研究。
<br>
<br>
<b>预设：</b>最初标记为1到6的按钮允许你将当前的研究集保存到该槽中，让你可以快速通过一次点击再次购买该特定研究集。你可以将鼠标悬停在按钮上并使用工具提示加载/保存一个槽，或者点击加载和Shift点击保存。这些预设可以重命名，但你不允许给多个预设相同的名称。
<br>
<br>
<b>导入树/编辑预设：</b>在编辑预设或导入时间研究树时，模态窗口将显示加载时将购买的时间研究，以及任何错误。对于分叉路径，你可以使用名称作为研究集合的简写。例如，你可以用“antimatter”替换“71, 81, 91, 101”来表示完全购买反物质分叉。此外，如果时间研究字符串有一个有效的永恒挑战，在字符串末尾添加一个“!”将使游戏在使用时尝试立即解锁并进入永恒挑战。
<br>
<br>
<b>偏好：</b>点击齿轮图标将打开一个对话框，让你选择在三向分支中选取的“默认”路径。选择一个默认路径将改变上面提到的Shift点击行为，使其尝试购买你喜欢的路径并继续，而不是在树的分叉处完全停止。如果你购买了相关的时间研究，你可以在此对话框中选择两条维度分叉路径。
<br>
<br>
<b>重置：</b>重置允许你重置树中的升级以取回所有花费的时间定理。它可以免费完成，但只在完成永恒时触发；你不能在永恒中途重置时间研究。
<br>
<br>
<b>时间定理的成本：</b>
<br>
<b>反物质：</b>初始${format(DC.E20000)}，每定理${formatX(DC.E20000)}
<br>
<b>无限点数：</b>初始${formatInt(1)}，每定理${formatX(DC.E100)}
<br>
<b>永恒点数：</b>初始${formatInt(1)}，每定理${formatX(2)}
`,
      isUnlocked: () => PlayerProgress.eternityUnlocked(),
      tags: ['eternity', 'ts', 'theorems', 'tree', 'study', 'midgame'],
      tab: 'eternity/studies',
    },
    {
      name: '永恒挑战',
      info: () => `
永恒挑战是另一组通过时间研究树解锁的挑战。它们需要一定数量的时间定理和一个你必须在解锁挑战时满足的次要要求。
<br>
<br>
当你进入一个永恒挑战时，你的目标变为达到某个目标IP。完成挑战后，你不需要拥有永恒挑战的研究解锁即可获得奖励的效果。这些挑战的奖励类似于时间研究，但通常更强大且永久，因为它们不需要你花费时间定理来获得其效果。
<br>
<br>
你一次只能解锁一个永恒挑战。
<br>
<br>
你可以完成每个永恒挑战最多五次。每次完成后，奖励会变得更强大，但下一次完成的目标也会增加。此外，再次解锁挑战的次要要求也会增加。时间定理的成本不会增加。
<br>
<br>
完成永恒挑战的次要要求将从研究要求中移除，直到你完成该特定的永恒挑战，这意味着你只需要完成次要要求<i>一次</i>。因此，你可以用一组研究解锁一个永恒挑战，然后重置为另一组研究以完成挑战。EC11和EC12是此规则的例外——即使你重置时间研究，维度路径限制仍然存在。
`,
      isUnlocked: () => PlayerProgress.eternityUnlocked(),
      tags: ['ec', 'study', 'time', 'rewards', 'completions', 'midgame'],
      tab: 'challenges/eternity',
    },
    {
      name: '时间膨胀',
      info: () => `
时间膨胀在你购买时间研究以解锁EC11和EC12研究下的时间研究时解锁。要购买此时间研究，你需要${formatInt(5000)}未花费的TT，一个可以到达该研究的树，总共${formatInt(
        TimeStudy.dilation.totalTimeTheoremRequirement
      )} TT，并且必须完成EC11和EC12各五次。
<br>
<br>
膨胀时间将开始一个修改后的永恒，称为时间膨胀，其中所有你的反物质/无限/时间维度乘数的<i>指数</i>和时间速度乘数的<i>指数</i>将提高到${formatPow(0.75, 2, 2)}，显著降低它们。如果你能达到${formatPostBreak(
        Number.MAX_VALUE,
        2
      )} IP来完成这个膨胀的永恒，你将获得一种称为超光速粒子的新资源。
<br>
<br>
你可以膨胀任意多次，但超光速粒子不能像其他资源一样“耕种”。超光速粒子永远不会减少，只会增加，并且它们增加到基于你的TP乘数和当前膨胀中获得的反物质的限制。因此，除非你获得了TP乘数或能够在膨胀中显著增加你的反物质，否则你通常无法增加你的TP。
<br>
<br>
超光速粒子生成另一种称为膨胀时间的货币。膨胀时间通过达到类似于从时间维度获得的时间速度升级的阈值转化为超光速星系。这些超光速星系类似于复制器星系，因为它们像反物质星系一样影响时间速度，但它们不会增加你下一个反物质星系的成本。
<br>
<br>
解锁时间膨胀还会解锁你可以使用膨胀时间购买的升级。第一行中的第一个和第三个升级可以多次购买，只要你负担得起。第二个升级也可以重复购买，但最终会达到上限。
`,
      isUnlocked: () => DilationTimeStudyState.studies[1].isBought || PlayerProgress.realityUnlocked(),
      tags: ['dial', 'dt', 'dilated', 'tachyon', 'particle', 'study', 'free', 'galaxy', 'galaxies', 'midgame'],
      tab: 'eternity/dilation',
    },
    {
      name: '现实',
      info: () => `
当你达到${formatPostBreak(DC.E4000)} EP并完成前${formatInt(
        13
      )}行成就时，你将能够购买解锁现实的时间研究。解锁它将打开一个新标签，在那里你可以找到进行新现实的按钮。开始一个新现实将重置几乎整个游戏，但作为交换，你会获得一种称为现实机器的新货币、一个符文和一个复兴点。
<br>
<br>
与之前的重置不同，你还会失去前${formatInt(13)}行成就——即所有现实前的成就及其相关奖励。然而，你仍然会保留统计标签下一般标题下的所有值和你所有的最佳挑战时间。
<br>
<br>
在完成你的第一次现实后，符文标签包含一个按钮，让你再次重启当前现实，而不改变你即将到来的符文选择。<b>请注意，这将不会给你任何奖励，即使你本来能够正常完成现实。</b>
<br>
<br>
你需要重新完成每个成就的要求才能再次获得它们的奖励，但你也会每${timeDisplayNoDecimals(
        30 * 60000
      )}被动解锁下一个未完成的成就，即使你本来没有满足要求。这种自动完成可以禁用，在这种情况下，计时器将倒计时到零并暂停，在取消暂停时立即完成另一个成就。计时器在离线时仍以相同的速度进行。
<br>
<br>
现实机器可以花费在现实标签中的不同升级上，并且是此时你的主要货币。符文是可装备的对象，你必须装备它们才能使用它们的增益。复兴点是另一种可以花费在技能子标签中的不同技能上的货币。
<br>
<br>
现实机器纯粹基于EP缩放，现实按钮会告诉你需要多少EP才能获得下一个。前${formatInt(10)} RM在${formatPostBreak(DC.E4000)} EP和${formatPostBreak(
        DC.C10P16000D3
      )} EP之间线性缩放，然后超过该点后RM = ${formatInt(1000)}<sup>log<sub>${formatInt(10)}</sub>(EP)/${formatInt(4000)}-${formatInt(1)}</sup>。这个公式在${formatPostBreak(
        DC.C10P16000D3
      )} EP以上比线性更高的RM增益。
<br>
<br>
符文等级基于永恒点数、复制器和膨胀时间的组合，最低等级为${formatInt(1)}。符文类型、效果和稀有度是随机的。
<br>
<br>
你每次现实获得正好${formatInt(1)}复兴点。
<br>
<br>
<b>快捷键：Y</b>将尝试进行现实重置。
`,
      isUnlocked: () => PlayerProgress.realityUnlocked() || TimeStudy.reality.isBought,
      tags: ['rm', 'machines', 'glyph', 'perk', 'reset', 'prestige', 'endgame', 'lategame'],
      tab: 'reality/upgrades',
    },
    {
      name: '符文',
      info: () => `
符文是一种可装备的对象，具有四个属性：
<br>
<b>类型</b> - 这是根据它将提升的游戏部分赋予符文的名称（例如“X符文”）。这决定了它可能具有的效果。
<br>
<b>等级</b> - 这有助于决定你的符文有多强，它基于你在获得它的现实中获得的各种资源的数量。
<br>
<b>稀有度</b> - 这是一个百分比，介于${formatPercents(0)}和${formatPercents(
        1
      )}之间，这也影响你的符文的强度。这是随机的，但可以通过各种升级影响。百分比有效地是质量评级，更高的值更好。特定的稀有度范围被赋予名称，例如普通或罕见。
<br>
<b>效果</b> - 这些是装备符文将给予你的增益，最多可以包含四个效果。等级或稀有度更高的符文通常比更弱的符文有更多的效果。
<br>
<b>注意：你的第一个符文将有一个固定的效果和稀有度，但其等级将基于你在任何现实内容之前的进度。一旦你获得一个符文，其属性无法更改。</b>
<br>
<br>
要装备符文，双击或从你的库存中将其图标拖到屏幕中间的其中一个活动圆圈中。装备后，符文图标变为圆形，并将其效果添加到右侧的列表中。
<br>
<br>
装备多个具有相同效果的符文将结合它们的效果；带有“+”的效果通常将其值相加，带有“×”的效果通常将其值相乘。
<br>
<br>
你可以在现实的任何时候将符文装备到<i>空</i>活动槽中，这将立即应用新符文的效果。你也可以将符文拖到已占用的槽中以切换你装备的符文，但这将重启你当前的现实。
<br>
<br>
你库存的第一行中的槽是“受保护”的槽。新符文永远不会被放置到它们中（即使你的库存中没有更多空间），并且它们不受排序和自动清理按钮的影响。如果你的库存中没有新符文的空间，你将获得的任何符文将自动删除（或如果解锁则献祭）。
<br>
<br>
你可以通过Shift点击符文从你的库存中删除它们，这将弹出一个确认对话框，询问你是否确定要删除符文。在点击时按住Shift和Ctrl键将绕过此对话框。<b>然而，在从现实升级解锁符文献祭之前删除符文将不会给你带来任何好处，除了清理库存空间！</b>
<br>
<br>
一旦你解锁符文献祭，你将能够禁用符文选择模态窗口的出现。如果需要，你可以通过Shift点击现实按钮强制再次出现此模态窗口（忽略此设置）。在禁用选择模态窗口的情况下完成现实将从你的选项中选择一个随机符文。
<br>
<br>
点击一组圆形符文（在模态窗口外）将打开一个模态窗口，显示所有这些符文及其各种属性的详细摘要。摘要将一次显示所有符文的信息，带有稍短的描述，使其更适合与他人分享。这可以用于统计页面中的符文记录、你装备的符文和即将到来的符文选择此现实。
`,
      isUnlocked: () => PlayerProgress.realityUnlocked() || TimeStudy.reality.isBought,
      tags: ['reality', 'sacrifice', 'level', 'endgame', 'lategame'],
      tab: 'reality/glyphs',
    },
    {
      name: '复兴点',
      info: () => `
    复兴升级是在现实后解锁的一种升级。每个复兴升级的效果各不相同，但大多数都是QoL（生活质量）改进，你可以选择自己的路径。所有复兴升级只需要${formatInt(1)}个复兴点即可购买。
    <br>
    <br>
    每次现实你会获得${formatInt(1)}个复兴点，可以用来购买技能树上的升级，首先是“你现在可以在现实时从${formatInt(Perk.firstPerk.config.effect)}个符文中选择${formatInt(
        1
      )}个”。你只能解锁与你已经拥有的复兴升级直接相邻的复兴升级，尽管技能树中有循环，你可以从任何方向通过。
    <br>
    <br>
    复兴树节点有两种不同的形状——圆形或菱形。两者之间的唯一区别是，菱形复兴升级除了正常效果外，还会给予自动点数。不同的节点也有不同的颜色，大致表示它们影响游戏的哪一部分。
    `,
      isUnlocked: () => PlayerProgress.realityUnlocked() || TimeStudy.reality.isBought,
      tags: ['pp', 'reality', 'tree', 'endgame', 'lategame'],
      tab: 'reality/perks',
    },
    {
      name: '自动机概览',
      info: () => `
    当你总共获得${formatInt(AutomatorPoints.pointsForAutomator)}个自动点数时，自动机将被解锁。自动点数可以通过解锁各种复兴升级或现实升级、解锁黑洞，或者简单地完成更多现实来获得。
    <br>
    <br>
    自动机使用一种脚本语言，允许你自动化几乎整个游戏。界面有两个窗格，左侧是脚本窗格，你可以在其中输入自动化游戏的命令，右侧是一个多面板窗格，它根据自动机介绍页面中的说明执行许多不同的操作。
    <br>
    <br>
    如果你想要更大的工作空间，可以按下自动机文档窗格右上角的按钮，将其扩展到全屏。你还可以水平拖动窗格之间的边界，以调整窗格的大小，如果你想要更多的空间来编写脚本或阅读文档。
    <br>
    <br>
    通过按下脚本窗格右上角的按钮，你可以在自动机的块编辑器和文本编辑器模式之间切换；如果你不熟悉编程，块模式可能更容易上手。要在块模式中输入命令，选择右侧的命令块面板，并将相关命令的框拖动到脚本窗格中，然后将其放在你想要的位置。如果需要，可以通过拖动块来自由重新排列命令。在块和文本模式之间切换时，会自动尝试转换你的脚本，但如果脚本包含错误，你可能会丢失部分转换后的脚本。
    <br>
    <br>
    就像你的整个存档文件一样，单个自动机脚本可以从游戏中导入和导出。格式正确的脚本字符串将以<b>${GameSaveSerializer.startingString['automator script']}</b>开头，并以<b>${
        GameSaveSerializer.endingString['automator script']
      }</b>结尾。如果不是这样，那么你的部分脚本在复制粘贴过程中丢失了。导入功能会将脚本加载到一个新槽中；你当前的脚本不会丢失或被覆盖。
    <br>
    <br>
    <b>快捷键：U</b>将暂停/恢复自动机。
    `,
      isUnlocked: () => Player.automatorUnlocked,
      tags: ['automation', 'reality', 'code', 'script', 'endgame', 'lategame'],
      tab: 'automation/automator',
    },
    {
      name: '自动机技术细节',
      info: () => `
    <b>技术限制</b>
    <br>
    <br>
    为了减少延迟并防止存档文件过大，脚本有一些限制。这些限制如下：
    <br>
    - 单个脚本最多限制为${formatInt(AutomatorData.MAX_ALLOWED_SCRIPT_CHARACTERS)}个字符，所有脚本组合在一起不能超过${formatInt(AutomatorData.MAX_ALLOWED_TOTAL_CHARACTERS)}个字符。
    <br>
    - 脚本名称不能超过${formatInt(AutomatorData.MAX_ALLOWED_SCRIPT_NAME_LENGTH)}个字符。
    <br>
    - 定义的常量名称不能超过${formatInt(AutomatorData.MAX_ALLOWED_CONSTANT_NAME_LENGTH)}个字符，或者值不能超过${formatInt(AutomatorData.MAX_ALLOWED_CONSTANT_VALUE_LENGTH)}个字符。
    <br>
    - 你不能有超过${formatInt(AutomatorData.MAX_ALLOWED_SCRIPT_COUNT)}个脚本或${formatInt(AutomatorData.MAX_ALLOWED_CONSTANT_COUNT)}个定义的常量。
    <br>
    <br>
    <b>脚本保存</b>
    <br>
    <br>
    脚本在编辑时会自动保存，但不会保存到游戏存档中，直到全局自动保存计时器（即“自上次保存以来的时间”）触发完整游戏保存。如果你在关闭游戏之前对脚本进行了更改，你应该等待游戏保存后再关闭，以免丢失更改。当脚本长度超过限制时，任何对脚本的编辑都不会被保存，直到你将脚本缩短到限制以下。
    <br>
    <br>
    <b>自动刻</b>
    <br>
    <br>
    自动机的“执行计时器”基于实时时间，因此不受黑洞、时间符文效果和EC12的负面效果等因素的影响。然而，这个执行计时器完全独立于游戏的主生产循环运行，这意味着在更快的速度下，自动机可以在每个生产周期内运行多个命令。
    <br>
    <br>
    某些命令对游戏的内部代码要求更高，在较慢的计算机上可能需要比单个自动刻更长的时间来处理。在这种情况下，自动机将执行这些命令，然后尝试通过尽可能快地执行后续命令来“追赶”，直到它以恒定的执行速度运行了尽可能多的命令。
    <br>
    <br>
    <b>与离线进度的交互</b>
    <br>
    <br>
    在离线进度模拟期间，较长的生产周期意味着你的所有资源实际上是以大块的形式给予的，而不是更连续的形式。这可能会对你的脚本在离线时的行为产生潜在的不利影响，具体取决于你的脚本如何依赖游戏状态来正常工作。此外，PAUSE命令可能会表现得奇怪，因为它也是基于实时时间的。
    `,
      isUnlocked: () => Player.automatorUnlocked,
      tags: ['automation', 'reality', 'code', 'script', 'endgame', 'lategame'],
      tab: 'automation/automator',
    },
    {
      name: '黑洞',
      info: () => `
    黑洞是一个周期性加速游戏运行速度的功能。游戏将以正常速度运行一段时间，然后在一段短时间内以极快的速度运行，然后再回到正常速度并重复此循环。
    <br>
    <br>
    黑洞增加的游戏速度比计数频率更强大，因为与计数频率不同，它<i>平等地影响一切</i>，包括仅部分受计数频率影响的内容（例如无限/时间维度）、通常完全不受影响的内容（例如膨胀时间/时间定理生成），以及纯粹基于时间花费而增强的效果（例如空闲路径IP/EP乘数）。
    <br>
    <br>
    虽然游戏中的大多数功能都会受到这种增加的游戏速度的增强，但有些功能仍然不受影响。在这些情况下，将特别提到给定的时间是<i>实时</i>而不是<i>游戏时间</i>。一个这样的例子是随着时间的推移自动完成永恒挑战的Perk。否则，从这一点开始，应假定所有对时间的引用都是<i>游戏时间</i>。请注意，这也包括你可能希望花费<i>较少</i>时间的情况，例如现实升级“快速复现”。
    <br>
    <br>
    你可以使用现实机器购买黑洞的升级。黑洞有三个升级：
    <br>
    <b>间隔</b> - 黑洞在两次爆发之间不活动的时间，每次升级减少${formatPercents(0.2)}。
    <br>
    <b>力量</b> - 在临时速度爆发期间游戏运行的速度增加，每次升级增加${formatPercents(0.35)}。
    <br>
    <b>持续时间</b> - 每次速度爆发在回到正常速度之前持续的时间，每次升级增加${formatPercents(0.3)}。
    <br>
    <br>
    在解锁黑洞后${formatInt(
      100
    )}天的<i>游戏时间</i>，你将解锁购买新现实升级的能力，该升级允许你拥有第二个黑洞。第二个黑洞的计时器仅在第一个黑洞处于活动状态时才会前进。例如，如果第一个黑洞的持续时间为${formatInt(
        4
      )}分钟，第二个黑洞的间隔为${formatInt(
        8
      )}分钟，那么无论第一个黑洞的间隔有多短，第二个黑洞每两个周期才会激活一次。请注意，游戏内标题中显示的计时器会考虑到这一点，并显示第二个黑洞激活的实际时间；在黑洞标签中，你可以看到第一个黑洞处于活动状态所需的时间，以使第二个黑洞激活。
    <br>
    <br>
    当黑洞至少${formatPercents(0.9999, 2)}的时间处于活动状态时，它将永久保持活动状态。这两个黑洞是分开跟踪的。
    <br>
    <br>
    在离线时，黑洞周期仍会正常前进，它们的活动速度提升将完全应用，就像游戏仍然打开一样。离线时间模拟了不同时间刻长度的不活动和活动黑洞段，以减少活动期间小时间刻计数的负面影响；“离线进度”条目已更新了更多技术细节。
    <br>
    <br>
    黑洞可以暂停，完全停止它们的间隔/持续时间周期。然而，当取消暂停时，它们需要${
      BlackHoles.ACCELERATION_TIME
    }实时秒才能从不活动状态加速到最大提升速度。此加速时间仍会像以全速运行一样推进周期；因此，虽然暂停提供了更多的控制，但它最终也会导致一些提升时间的损失。
    <br>
    <br>
    暂停和取消暂停会影响两个黑洞；它们不能独立暂停或取消暂停。它们可以在激活前${BlackHoles.ACCELERATION_TIME}实时秒自动暂停，方法是切换黑洞标签上的相关设置。
    <br>
    <br>
    <b>升级成本信息：</b>
    <br>
    <b>间隔</b> - 基础成本为${formatInt(15)} RM，每次升级增加${formatX(3.5, 0, 1)}。
    <br>
    <b>力量</b> - 基础成本为${formatInt(20)} RM，每次升级增加${formatX(2)}。
    <br>
    <b>持续时间</b> - 基础成本为${formatInt(10)} RM，每次升级增加${formatX(4)}。
    <br>
    <b>增加的成本缩放：</b> 超过${format(1e30)} RM后，每次购买之间的成本乘数增加一个附加的+${format(0.2, 0, 1)}。超过${format(
        Number.MAX_VALUE,
        1
      )} RM后，会出现一个新的缩放，忽略之前的所有行为。从这一点开始，所有升级的行为都像它们的初始成本为${format(DC.E310)}，进一步的升级成本增加${format(1e6)}，${format(
        1e7
      )}，依此类推（每次升级之间${formatX(10)}）。
    <br>
    <b>黑洞2：</b> 所有升级的初始成本比第一个黑洞高${formatX(1000)}，但成本乘数相同。
    <br>
    <br>
    <b>快捷键：B</b>将暂停/恢复黑洞。
    `,
      isUnlocked: () => player.blackHole[0].unlocked,
      tags: ['reality', 'time', 'speed', 'duration', 'interval', 'rm', 'endgame', 'lategame'],
      tab: 'reality/hole',
    },
    {
      name: '天神',
      info: () => `
    当你获得所有现实升级后，第一个天神将被解锁。这将为天神s打开一个新标签，位于现实标签旁边。天神标签下的第一个子标签显示一个名为“天神 天界导航”的地图，它会随着你在游戏中的进展而更新。首次解锁时，地图的只有部分可见，但新内容会逐渐显示出来，通常会有一个视觉指示，显示你接近下一步的进度。
    <br>
    <br>
    每个天神都有独特的机制和升级，你需要击败所有七个天神才能完成游戏。解锁或击败天神的条件取决于天神的机制。
    <br>
    <br>
    所有天神都有自己的天界现实，但现实与每个天神以及游戏的其余部分的相关性取决于天神。
    <br>
    <br>
    天神是永恒的实体。除非另有说明，否则天神引入的任何新机制都不受游戏速度乘数的影响，而是专门指实时而不是游戏时间。
    `,
      isUnlocked: () => Teresa.isUnlocked,
      tags: ['reality', 'challenges', 'endgame', 'lategame'],
      tab: 'celestial/celestial-navigation',
    },
    {
      name: '特蕾莎, 现实之神',
      alias: '特蕾莎',
      info: () => `
    特蕾莎是第一个天神。他们通过成就147解锁，该成就要求你获得所有现实升级。
    <br>
    <br>
    在主屏幕上，有一个带有“倾倒现实机器”按钮的条。这允许你将RM倒入容器中以获得现实机器乘数。倒入容器中的RM无法取回。当你在容器中达到${format(TeresaUnlocks.run.price)} RM时，你将解锁特蕾莎的现实。
    <br>
    <br>
    当你完成特蕾莎的现实时，
    ${Teresa.runCompleted ? '你的符文献祭将基于在运行期间获得的反物质数量进行倍增' : "<div style='color: var(--color-bad);'>(完成特蕾莎的现实以查看奖励)</div>"}。
    完成特蕾莎的现实只是故事的一部分；你需要继续倒入RM以取得进展。一旦你在容器中达到${format(TeresaUnlocks.effarig.price)} RM，你将解锁下一个天神。
    <br>
    <br>
    ${Teresa.runCompleted ? '特蕾莎的现实可以在完成后再进入，如果你在这次重复运行中达到更高的反物质数量，其奖励将变得更强。' : '(更多信息可用 - 完成特蕾莎的现实)'}
    `,
      isUnlocked: () => Teresa.isUnlocked,
      tags: ['rm', 'endgame', 'lategame', 'perks', 'sacrifice', 'boo', 'ghost', '天神'],
      tab: 'celestials/teresa',
    },
    {
      name: '鹿颈长，古代遗物之神',
      alias: '鹿颈长',
      info: () => `
鹿颈长是你遇到的第二个天神。
他们通过向特蕾莎的容器中倒入至少${format(TeresaUnlocks.effarig.price)} RM来解锁。
<br>
<br>
鹿颈长引入了一种称为遗物碎片的货币，通过在现实中使用不同类型的符文效果获得。在现实中激活的不同效果的数量对遗物碎片的获取有非常强烈的影响，而EP对其影响较小。遗物碎片是鹿颈长解锁的货币，从现在起，每次现实都会获得。
<br>
<br>
使用遗物碎片，你可以购买多个升级（参见“高级符文机制”），这些升级可以改善你的符文，并允许你在进行完全自动化的现实时根据它们的效果和稀有度进行过滤。
<br>
<br>
鹿颈长的最终解锁是他们在${format(GameDatabase.celestials.effarig.unlocks.run.cost)}遗物碎片时的现实。
${
  EffarigUnlock.run.isUnlocked
    ? '他们的现实分为三层：无限、永恒和现实。你必须完成每一层才能进入下一层。完成鹿颈长的永恒将解锁下一个天神。'
    : "<div style='color: var(--color-effarig--base);'>(解锁鹿颈长的现实以查看其详细信息)</div>"
}
<br>
<br>
完成鹿颈长的现实将解锁
${
  EffarigUnlock.reality.isUnlocked
    ? `一种新的符文类型，<span style='color: var(--color-effarig--base);'>鹿颈长</span>符文。鹿颈长符文有
      ${formatInt(7)}种不同的可能效果，你可以在符文过滤设置中查看。你一次只能装备一个鹿颈长符文。
${
  Ra.unlocks.glyphEffectCount.canBeApplied
    ? `由于在太阳神中拥有10级的鹿颈长，鹿颈长符文上出现的效果不再有任何限制。任何鹿颈长符文现在都可以同时拥有所有${formatInt(7)}种效果。`
    : `鹿颈长符文最多只能有${formatInt(4)}种效果，并且RM乘数和符文不稳定效果不能同时出现在同一个符文上。`
}`
    : "<span style='color: var(--color-effarig--base);'>(完成鹿颈长的现实以查看奖励详细信息)</span>"
}
<br>
<br>
`,
      isUnlocked: () => TeresaUnlocks.effarig.canBeApplied,
      tags: ['glyph', 'sacrifice', 'shards', 'reality', 'spectralflame', 'lategame', 'endgame', 'celestial'],
      tab: 'celestials/effarig',
    },
    {
      name: '高级符文机制',
      info: () => `
符文等级调整可以用${format(GameDatabase.celestials.effarig.unlocks.adjuster.cost)}遗物碎片购买。这允许你为每种资源（EP、DT、复制器、永恒）设置权重，以影响在现实中获得的符文等级。
<br>
<br>
自动符文过滤可以用${format(
        GameDatabase.celestials.effarig.unlocks.glyphFilter.cost
      )}遗物碎片购买。该系统使用多种方法之一为你的符文选择分配分数，然后选择分数最高的选择。选择此符文后，它会检查分数是否超过阈值，如果分数高于阈值则保留它，否则将其献祭。有三种基本模式：
<br>
<b>最低总献祭：</b> 符文根据你对该特定符文类型的献祭值分配分数。你拥有最少献祭值的符文类型将获得最高分数。此模式没有阈值，并且总是献祭你的符文。
<br>
<b>效果数量：</b> 符文根据它们拥有的效果数量分配分数，当多个符文具有相同的效果数量时，稀有度更高的符文将被选中。它们与你在文本框中指定的阈值进行比较。
<br>
<b>稀有度阈值模式：</b> 符文根据它们的稀有度百分比分配分数。可以为每个符文类型单独设置比较阈值。
<br>
<br>
此外，还有两种更高级的模式，具有一些额外的灵活性。你可能最初不需要这些，但它们以后会派上用场：
<br>
<b>指定效果模式：</b> 符文根据它们的稀有度分配分数，并与你指定的稀有度阈值进行比较，但此分数会根据你对效果的输入进行修改。符文将检查是否具有最小数量的效果以及是否具有你选择的所有效果，每缺少一个效果，其分数将降低${formatInt(
        200
      )}。这确保了任何不具有你想要的效果的符文都会低于阈值。你可以通过设置不可能的条件来禁止特定的符文类型（例如，在Power符文上至少需要${formatInt(6)}个效果将阻止Power符文被选中）。
<br>
<b>效果分数模式：</b> 符文的分数由其稀有度加上其每个效果的分数计算，你可以单独设置每个效果的阈值和值。一些可能的使用方式包括：
<br>
• 给一个较弱的效果赋予${formatInt(5)}的值，允许你保留没有该效果的符文，只要它们更稀有以弥补较弱的效果。
<br>
• 给一个你不想要的效果分配一个大的负分，将禁止选择具有该效果的符文；这对于效果测试和其他更有限的情况很有用。
<br>
• 设置一个不可能的条件（例如，阈值分数为${formatInt(999)}且所有效果的价值为${formatInt(0)}）也将让你像指定效果模式一样禁止整个类型。
<br>
<br>
符文过滤模式是一个全局设置，适用于所有符文类型；例如，你不能用“稀有度阈值”过滤Power符文，同时用“指定效果”过滤Time符文。选择一种模式将要求你为其设置中的每个符文类型进行配置，以便正确过滤。每个过滤模式都有自己的设置，如果你切换到另一种模式，这些设置将被保留。
<br>
<br>
解锁符文过滤还允许你将即将到来的选择中的最高符文分数用作Automator中的可比较货币。此外，如果过滤器不会保留任何即将到来的选择，你可以让过滤器强制立即进行现实（一旦可用），只要现实自动购买器已开启。
<br>
<br>
符文预设可以用${format(GameDatabase.celestials.effarig.unlocks.setSaves.cost)}遗物碎片购买。这将解锁${formatInt(
        7
      )}个槽，允许你将当前装备的符文保存为集合。你不能覆盖一个集合，必须先删除它。当你加载一个集合时，其中的每个符文都会被找到并装备。如果找不到任何符文，它将显示警告，但仍会装备其余部分。加载集合时，你可以选择对等级和/或稀有度敏感。最好的符文将始终是装备的那个。就像其他圆形符文组一样，你可以点击它们中的任何一个以弹出一个模态窗口，总结整个符文集合。
`,
      isUnlocked: () => EffarigUnlock.adjuster.isUnlocked,
      tags: ['glyph', 'weight', 'adjustment', 'sacrifice', 'filter', 'threshold', 'set', 'save', 'reality', 'lategame', 'endgame'],
      tab: 'celestials/glyphfilter',
    },
    {
      name: '无名氏，时间之神',
      alias: '无名氏',
      info: () => `
无名氏是第三个天神，通过完成鹿颈长的永恒解锁。
<br>
<br>
当你解锁无名氏时，你立即获得两个与时间相关的新机制。你可以通过充能你的黑洞来存储“游戏时间”，并且可以通过有意停止生产来存储“实时时间”。存储的游戏时间也用作从无名氏购买解锁的货币。
<br>
<br>
充能你的黑洞会给你存储的游戏时间，这是通过将你的游戏速度设置为${formatInt(
        1
      )}来实现的。游戏实际上是利用你增加的游戏速度来存储游戏时间本身。它的主要用途是释放黑洞，这使用你存储的游戏时间来跳过与存储的游戏时间相等的时间。这与常规的游戏速度乘数不同，因为释放不受任何游戏速度修改器的影响，只有在存储时才会受到影响。
<br>
<br>
存储实时时间会完全停止所有生产，有效地暂停你的游戏。每经过一个实时秒，你都会获得存储的实时时间（由某个效率因子修改）。你可以使用存储的实时时间在符文标签中增强现实。当你完成现实时，这将一次性使用你所有的存储实时时间，以尝试重复该现实，给你所有你通常会从重复中获得的奖励。例如，如果你有${formatInt(
        50
      )}分钟的存储时间，并增强了一个持续${formatInt(10)}分钟并会给予${format(DC.E30)} RM和${format(DC.E12)}遗物碎片的现实，增强的现实将给你${format(5e30)} RM，${format(5e12)}遗物碎片，${formatInt(
        5
      )}符文（受你的过滤设置影响），和${formatInt(5)} Perk Points。
<br>
<br>
然而，如果你的现实持续了不到${formatInt(1)}秒，增强因子将被存储的秒数上限。例如，如果你有${formatInt(1000)}秒的存储时间，并增强了一个持续${format(0.2, 2, 2)}秒的现实，你将使用${formatInt(
        200
      )}秒来模拟${formatInt(1000)}个现实。
<br>
<br>
你可以切换一个设置，将离线时间自动存储为存储的实时时间。
<br>
<br>
他们的第一个解锁需要${format(
        TimeSpan.fromMilliseconds(ENSLAVED_UNLOCKS.FREE_TICKSPEED_SOFTCAP.price).totalYears
      )}年的存储游戏时间。它增加了从时间维度获得的计数频率升级的软上限（它们的成本开始更快增加的点）${format(1e5)}个计数频率升级。
<br>
<br>
在${format(TimeSpan.fromMilliseconds(ENSLAVED_UNLOCKS.RUN.price).totalYears)}年的存储游戏时间后，你终于能够解锁他们的现实。完成无名氏的现实的奖励是
${Enslaved.isCompleted ? '解锁超立方体，它们有自己的玩法条目。' : "<span style='color: var(--color-bad);'>(完成无名氏的现实以查看奖励详细信息)</span>"}
<br>
<br>
无名氏不会直接解锁下一个天神。
`,
      isUnlocked: () => EffarigUnlock.eternity.isUnlocked,
      tags: ['reality', 'time', 'blackhole', 'lategame', 'endgame', 'testers', 'celestial', ...credits.people.map((p) => p.name)],
      tab: 'celestials/enslaved',
    },
    {
      name: '超立方体',
      info: () => `
超立方体是一种新资源，通过完成无名氏的现实解锁。
<br>
<br>
无限维度通常限制为${format(InfinityDimensions.HARDCAP_PURCHASES)}次总购买，这限制了它们的乘数可以增长的大小，因为最终你无法再升级它们。超立方体允许你通过花费无限点数来提高这个上限。
<br>
<br>
超立方体的成本呈超指数增长，但每个后续的超立方体都比前一个更强大，以弥补这一点。超立方体计数永远不会重置，这意味着一旦购买，你不需要再次达到IP成本，以便在以后的现实中利用提高的上限。
<br>
<br>
你可以在无限维度标签中查看有关你当前超立方体计数和下一个超立方体成本的更多信息。此外，你当前的无限点数现在也会显示一个百分比，表示你距离下一个超立方体有多近。如果负担得起，无限按钮本身将视觉上发生变化，并在点击时将你带到无限维度标签。
`,
      isUnlocked: () => Enslaved.isCompleted,
      tags: ['reality', 'lategame', 'endgame', 'tesseract', 'id', 'celestial'],
      tab: 'celestials/tesseract',
    },
    {
      name: '薇，成就之神',
      alias: '薇',
      info: () => `
薇是一个特殊的天神，因为他们不是由另一个天神解锁的，而是通过完成成就ID 151（第${formatInt(15)}行，第${formatInt(1)}列，“你真的不需要它”）解锁的，该成就要求你在当前的无限中获得${formatInt(
        800
      )}个反物质星系，而不购买第八反物质维度。
<br>
<br>
在从成就解锁子标签后，你会遇到另一组要求来完全解锁薇。你必须完成${formatInt(GameDatabase.celestials.v.mainUnlock.realities.requirement)}个现实，并拥有${format(
        GameDatabase.celestials.v.mainUnlock.realityMachines.requirement
      )}未花费的RM。此外，你需要达到${format(GameDatabase.celestials.v.mainUnlock.eternities.requirement)}个永恒，${format(
        GameDatabase.celestials.v.mainUnlock.infinities.requirement
      )}个无限，${format(GameDatabase.celestials.v.mainUnlock.dilatedTime.requirement)}个延长时间，和${format(
        GameDatabase.celestials.v.mainUnlock.replicanti.requirement
      )}个复制器，所有这些都在同一个现实中。
<br>
<br>
当你满足所有这些要求时，你将能够访问薇的现实。
${
  VUnlocks.vAchievementUnlock.isUnlocked
    ? `然而，完成现实本身只是开始。薇有六个不同的要求，每个要求都需要你在薇的现实中取得一定进展。完成一个要求会奖励你一个薇成就。
      薇成就是永久性的，并在退出薇的现实后保留，并且不需要同时完成所有。
      <br>
      <br>
      完成要求后，薇成就的阈值会增加，如果你能达到新的目标，可以再次完成。你可以完成每个类别的薇成就最多六次。
      完成的薇成就做两件事：
      <br>
      ◦ 在达到某些薇成就总数时，你自动解锁薇标签上的升级，而无需花费任何资源。
      <br>
      ◦ 每个薇成就还会给你一个空间定理。
      <br>
      <br>
      通过拥有${formatInt(2)}个薇成就解锁的目标减少允许你通过花费Perk Points使一些薇成就要求更容易完成，直到达到最简单层级所需的任何限制。减少目标的成本不会随着使用而增加，并且也会减少未来的层级。
      <br>
      <br>
      空间定理允许你购买通常被禁止的时间研究，例如改进IP公式后的Pace Split中的多个路径，或者底部附近的一对黑暗/光明时间研究。像时间定理一样，每次你重置研究时，它们都会被自由地归还。
      有了足够的空间定理，你最终将能够一次购买所有时间研究！
      <br>
      <br>
      达到${formatInt(36)}个薇成就（从而完成所有薇的成就）将解锁下一个天神。`
    : "<span style='color: var(--color-bad);'>(解锁薇的现实以查看更多详细信息)</span>"
}
`,
      isUnlocked: () => Achievement(151).isUnlocked,
      tags: ['reality', 'lategame', 'endgame', 'girlfriend', 'challenges', 'achievement', 'space', 'theorems', 'study', 'triad', 'celestial'],
      tab: 'celestials/v',
    },
    {
      name: '太阳神，遗忘之神',
      alias: '太阳神',
      info: () => `
太阳神是第五个天神，通过完全完成所有薇的成就解锁。他们利用他们的记忆以更强的方式带回以前天神的积极效果。随着时间的推移，你将在太阳神内解锁前四个天神，每个天神都提供与其原始主题相关的额外升级。
<br>
<br>
太阳神内的每个前天神通过使用记忆来提升等级，这些记忆是从记忆块中被动生成的。记忆块只能通过进入太阳神的现实获得，但在现实内，块将基于某些资源总数被动生成。如果你正在存储实时时间，你将不会在太阳神的现实中获得任何块，但记忆仍会正常生成。拥有总共${formatInt(
        Ra.remembrance.requiredLevels
      )}个等级将解锁记忆，它允许你选择一个特定的天神，在太阳神的现实中获得更多的块。
<br>
<br>
记忆可以用于三件事——增加记忆块生成，增加记忆生成，以及提升天神的等级。你从太阳神开始只有特蕾莎解锁，每个后续的天神通过达到前一个天神的${formatInt(8)}级来解锁。等级上限为${formatInt(25)}。
<br>
<br>
特蕾莎解锁了充能你的无限升级的能力，使它们更强大。它们还在达到符文献祭值的某些阈值后改善你的符文效果。
<br>
<br>
在${formatInt(2)}级时，鹿颈长解锁
${
  Ra.unlocks.effarigUnlock.canBeApplied
    ? '一种称为符文炼金术的新机制，并在之后使鹿颈长符文更强大，同时逐渐移除符文生成中几乎所有的随机元素。符文炼金术也有自己的玩法条目。'
    : "<span style='color: var(--color-bad);'>(在太阳神内解锁鹿颈长以查看解锁详细信息)</span>"
}
<br>
<br>
无名氏解锁
${Ra.unlocks.enslavedUnlock.canBeApplied ? '与充能黑洞相关的额外机制，并使它们显著更强大。' : "<span style='color: var(--color-bad);'>(在太阳神内解锁无名氏以查看解锁详细信息)</span>"}
<br>
<br>
薇解锁
${
  Ra.unlocks.vUnlock.canBeApplied
    ? '三体研究，这是树底部附近的新研究，花费空间定理。每个三体研究要求你也拥有附近的三个研究才能购买它们。它们还解锁了一组更困难的薇成就，以完成额外的空间定理。'
    : "<span style='color: var(--color-bad);'>(在太阳神内解锁薇以查看解锁详细信息)</span>"
}
<br>
<br>
太阳神不会直接解锁下一个天神。`,
      isUnlocked: () => VUnlocks.raUnlock.isUnlocked,
      tags: ['reality', 'memories', 'razenpok', 'levels', 'glyphs', 'lategame', 'endgame', 'effarig', 'teresa', 'nameless', 'v', 'celestial'],
      tab: 'celestials/ra',
    },
    {
      name: '符文炼金',
      info: () => `
符文炼金术是通过在太阳神中达到鹿颈长的${formatInt(
        2
      )}级解锁的机制。它解锁了通过精炼你的符文为与其类型相关的炼金资源来消耗你的符文的能力。你可以通过将你的献祭类型设置为“总是献祭”以外的内容来精炼符文，并进行正常的献祭程序。
每个炼金资源都有独特的效果，你可以在炼金标签中查看。
<br>
<br>
除了所有其他属性外，符文现在还有一个<i>精炼值</i>，它决定了它值得多少相关的炼金资源。该值基于符文等级的立方，缩放后使得等级${formatInt(10000)}的符文对应于${formatInt(
        10000
      )}个炼金资源。然而，单个符文本身在精炼时只给出${formatPercents(GlyphSacrificeHandler.glyphRefinementEfficiency)}的这个值。这些是${formatPercents(
        1
      )}稀有度符文的值；稀有度较低的符文仍然具有相同的上限，但按比例给出更少的资源。例如，一个${formatPercents(0.5)}稀有度的符文只会给出其一半的资源。
<br>
<br>
炼金资源不能无限获得；每个资源都有一个基于你精炼的该类型符文的最高精炼值的上限。例如，如果你精炼的最高等级时间符文是等级${formatInt(8000)}（精炼值：${formatInt(
        GlyphSacrificeHandler.levelRefinementValue(8000)
      )}），那么无论你精炼多少时间符文，你都不能拥有超过${formatInt(GlyphSacrificeHandler.levelRefinementValue(8000))}的时间资源，直到你精炼另一个具有更高精炼值的时间符文。
`,
      isUnlocked: () => Ra.unlocks.unlockGlyphAlchemy.canBeApplied,
      tags: [
        'reality',
        'lategame',
        'endgame',
        'ra',
        'effarig',
        'alchemy',
        'power',
        'infinity',
        'time',
        'replication',
        'dilation',
        'cardinality',
        'eternity',
        'dimensionality',
        'inflation',
        'alternation',
        'synergism',
        'momentum',
        'decoherence',
        'force',
        'exponential',
        'uncountability',
        'boundless',
        'unpredictability',
        'multiversal',
        'reaction',
      ],
      tab: 'reality/alchemy',
    },
    {
      name: '符文炼金资源',
      info: () => `
炼金资源可以以某些组合方式组合在一起，以创建新的复合资源，这些资源在达到某些鹿颈长等级时解锁。资源在每个现实中组合一次，不受实时时间放大的影响。当你的试剂数量较高时，反应具有更高的产量，因此发生得更快。复合资源的上限等于其所有试剂中最低的上限。为了使反应发生，所有试剂的当前数量必须大于产物的当前数量。
<br>
<br>
反应速度与反应的可使用试剂数量成正比，但只有高于产物数量的试剂数量才有资格被使用。例如，如果你有${formatInt(10000)}的所有试剂和${formatInt(7500)}的产物，只有${formatInt(
        2500
      )}的试剂用于计算反应速度。如果你有${formatInt(0)}的产物，<i>所有</i>试剂都可用于反应，并且它将产生${formatX(4)}更快。最后，如果你有${formatInt(
        10000
      )}的产物，那么没有试剂可以使用，反应将完全不会运行。
<br>
<br>
要激活或停用反应，点击与反应产物对应的圆圈。当反应可以应用时，将从所有试剂到产物的移动线将显示出来。如果连接是实线，这意味着由于该试剂的上限不足，无法获得更多产物，反应无法进行。
`,
      isUnlocked: () => Ra.unlocks.unlockGlyphAlchemy.canBeApplied,
      tags: [
        'reality',
        'lategame',
        'endgame',
        'ra',
        'effarig',
        'alchemy',
        'power',
        'infinity',
        'time',
        'replication',
        'dilation',
        'cardinality',
        'eternity',
        'dimensionality',
        'inflation',
        'alternation',
        'synergism',
        'momentum',
        'decoherence',
        'force',
        'exponential',
        'uncountability',
        'boundless',
        'unpredictability',
        'multiversal',
        'reaction',
      ],
      tab: 'reality/alchemy',
    },
    {
      name: '虚幻机器',
      info: () => `
一旦你能够在一个现实中获得至少${format(MachineHandler.baseRMCap)}现实机器，你将解锁获得一种新资源——虚幻机器的能力。现实机器也将被硬上限限制在${format(
        MachineHandler.baseRMCap
      )}；你将无法再获得超过此限制的任何现实机器。
<br>
<br>
此外，你还解锁了虚幻升级标签，其中包含一组类似于现实升级的升级——每个升级都有一个你必须满足的条件才能解锁它，以及一个虚幻机器的成本来实际购买它。前两行的升级可以重复购买，而其他三行是一次性升级。
<br>
<br>
你的iM数量受两件事影响：
<br>
<b>iM上限</b> - 你能够拥有的iM的最大数量，基于你如果没有RM上限所能获得的最高RM数量。这是持续更新的，因此如果你超过了之前未封顶的最高RM数量，它会立即增加。
<br>
<b>当前iM</b> - 随着时间的推移，你的当前iM将被动地上升到你的iM上限，其上升速度会随着你接近上限而呈指数级减慢。默认情况下，iM的上升速度是每分钟将你<i>缺失</i>的数量（即你的上限减去当前数量）减半。这种增长速度不受任何游戏速度修改器的影响。
<br>
<br>
虚幻机器升级将解锁最后两个天神。
`,
      isUnlocked: () => MachineHandler.isIMUnlocked,
      tags: ['imaginary', 'machines', 'reality', 'lategame', 'endgame'],
      tab: 'reality/imag_upgrades',
    },
    {
      name: '莱特拉，维度之神',
      alias: '莱特拉',
      info: () => `
莱特拉是第六个天神，通过购买价值${format(ImaginaryUpgrade(15).cost)} iM的相应虚幻升级解锁。
<br>
<br>
莱特拉提供了一种称为暗物质的新货币，它基于你曾经拥有的最高暗物质数量，为连续统提供乘数。暗物质由暗物质维度生成，类似于游戏中所有其他类型的维度的级联方式。与其他维度不同，只有四个暗物质维度而不是八个。你从第一个维度开始解锁，更高的维度通过虚幻升级解锁。在解锁维度时，你会获得${formatInt(
        1
      )}个维度，并且无法在没有从下一个层级生成的情况下获得更多。
<br>
<br>
每个暗物质维度在某个时间间隔后生成两件事：暗物质或下一个较低的暗物质维度和另一种称为暗能量的资源。每个间隔的暗物质和暗物质维度生成等于你的暗物质乘数与你拥有的维度数量的乘积，而暗能量生成与维度数量无关。暗能量用于生成奇点，它们有自己的玩法条目。
<br>
<br>
暗物质维度的时间间隔可以升级到最低${formatInt(10)}毫秒，此时你无法再升级时间间隔。你可以选择在达到该点时提升暗物质维度，最初将暗物质生成乘以${formatInt(POWER_DM_PER_ASCENSION)}，暗能量乘以${formatInt(
        POWER_DE_PER_ASCENSION
      )}。时间间隔乘以${formatInt(1200)}，但可以再次升级。再次达到${formatInt(10)}毫秒时，你可以选择再次提升。
<br>
<br>
一个虚幻升级允许你解锁称为湮灭的声望。湮灭重置你的暗物质和暗物质维度，但增加一个永久乘数，适用于所有暗物质维度。你可以多次湮灭；乘数的增加是叠加的，每次不需要为了更大的增加而湮灭。你必须至少拥有${format(
        Laitela.annihilationDMRequirement
      )}暗物质才能湮灭。
<br>
<br>
莱特拉有一个现实，根据你在现实中的表现，为暗物质维度的暗物质力量提供乘数。每当你在${formatInt(30)}秒内完成现实时，你最高可用的维度将在进一步的现实尝试中被永久禁用。通过在${formatInt(
        30
      )}秒内完成现实八次禁用所有维度，还将给你一个${formatX(8)}的暗能量生成乘数。
<br>
<br>
莱特拉不会直接解锁下一个天神。
`,
      isUnlocked: () => Laitela.isUnlocked,
      tags: ['omsi', 'reality', 'dark', 'matter', 'dimensions', 'lategame', 'endgame', 'ascend', 'celestial'],
      tab: 'celestials/laitela',
    },
    {
      name: '连续统',
      info: () => `
当你解锁莱特拉时，你的反物质维度和计数频率升级将切换到一种称为连续统的新生产模式，它提供与以前相同的效果，但允许购买部分维度或计数频率升级。这些部分升级是免费提供的，无需花费你的反物质，并将提供相应比例的乘数。
<br>
<br>
反物质维度和计数频率升级的购买按钮将被修改，以显示如果连续统未激活时你将能够购买的升级数量，并且购买数量与反物质平滑缩放。例如，拥有${format(2e7)}反物质将给你一个${format(
        5.3,
        0,
        1
      )}的计数频率连续统值（初始成本为${format(1e3)}，增加为${formatX(10)}），因为你可以购买它${formatInt(5)}次，并且大约有${formatPercents(
        0.3
      )}的路程到达下一个。在这种情况下，计数频率连续统将给出一个等于（升级乘数）<sup>${format(5.3, 0, 1)}</sup>的生产提升。
<br>
<br>
一些升级将直接乘以连续统值，这会在不影响成本缩放的情况下提供生产提升。然而，如果连续统在自动购买器页面上被禁用，这些升级将不会生效，这可能导致生产损失。连续统使你的反物质维度和计数频率的自动购买器变得过时，因此只要连续统处于活动状态，这些自动购买器的所有相关设置现在都在该标签上隐藏。
`,
      isUnlocked: () => ImaginaryUpgrade(15).isBought,
      tags: ['continuum', 'purchase', 'reality', 'lategame', 'endgame'],
      tab: '',
    },
    {
      name: '奇点',
      info: () => `
奇点是一种新资源，你可以通过莱特拉中的功能获得。
<br>
<br>
为了获得奇点，你需要达到${format(
        200
      )}暗能量。当你达到时，你可以选择将所有暗能量凝聚成一个奇点，将其重置为零。超过此数量的任何额外暗能量都不会被保留，因此会被浪费。请注意，只有暗能量被重置，你的暗物质及其维度的状态在凝聚奇点时保持不变。
<br>
<br>
一旦你达到${formatInt(10)}个奇点，你可以自由地将凝聚奇点所需的暗能量要求增加或减少${formatInt(10)}倍（最小为${format(200)}）。这增加或减少了从上限重置时获得的奇点数量，使其<i>超过</i>${formatInt(
        10
      )}倍，使更高的上限值得等待。
<br>
<br>
奇点的目的是解锁奇点里程碑，它们类似于永恒里程碑。解锁这些里程碑只需要你达到指定的奇点总数；奇点不会被消耗。有三种类型的里程碑——一次性里程碑，可重复有限次数的里程碑，以及可以无限重复的里程碑。
<br>
<br>
独立于里程碑类型，里程碑还有一个图标，表示它们通常提供的升级类型：
<br>
<b>ᛝ</b> 这些里程碑帮助莱特拉特定的机制。
<br>
<i class="fas fa-arrows-alt"></i> 这些里程碑让莱特拉中的资源影响游戏的其余部分。
<br>
<i class="fas fa-compress-arrows-alt"></i> 这些里程碑基于莱特拉之外的东西改进莱特拉。
`,
      isUnlocked: () => Laitela.isUnlocked,
      tags: ['reality', 'lategame', 'endgame', 'laitela', 'dark'],
      tab: '',
    },
    {
      name: '佩勒，反物质之神',
      alias: '佩勒',
      info: () => `
当你购买最后一个虚幻升级并解锁佩勒时，你将解锁他们的标签，在那里你可以找到一个“毁灭你的现实”的按钮。为了毁灭你的现实，你必须完成此时可用的所有${formatInt(17)}行成就，并拥有${formatInt(
        25000
      )}个每种炼金资源。
<br>
<br>
${
  Pelle.isDoomed
    ? `毁灭你的现实将开始一个新的<b>被毁灭的现实</b>，重置几乎整个游戏直到现实，不会给你当前现实中进度的任何奖励。
      <br>
      <br>
      当你进入被毁灭的现实时，你保留统计标签中“通用”和“现实”标题下的所有值以及你所有的最佳挑战时间。在被毁灭的现实内，多个升级、时间研究、挑战和天神奖励、Perks以及其他游戏机制被禁用或不提供奖励。
      你可以在佩勒标签中查看“在被毁灭的现实中的效果”以获取更多信息。
      <br>
      <br>
      残渣是一种新货币，在末日重置时获得。残渣生成基于你在所有被毁灭的现实中的最佳反物质、无限点数和永恒点数。残渣生成现实碎片，可以用于佩勒升级。
      <br>
      <br>
      佩勒升级可以分为两类。第一行的五个升级可以重复购买，但最终会达到上限。它们为游戏的不同方面提供提升，使在被毁灭的现实中的进展更容易。
      <br>
      <br>
      底部的其他升级提供自动化和生活质量改进。从这些升级中解锁的所有内容都无法通过游戏中的常规方法解锁；例如，如果完成，普通挑战都不会解锁自动购买器，因为它们都被锁定在佩勒升级后面。
      你可以点击升级上方的按钮以隐藏已购买的升级，或点击<i class="fas fa-compress-arrows-alt"></i>图标以折叠并隐藏整个面板。
      <br>
      <br>
      <b>快捷键：Z</b> 将尝试执行末日重置。`
    : "<span style='color: var(--color-bad);'><b>你必须毁灭你的现实才能阅读此条目的其余部分。</b></span>"
}
`,
      isUnlocked: () => Pelle.isUnlocked,
      tags: ['reality', 'antimatter', 'lategame', 'endgame', 'final', 'hevipelle', 'celestial', 'doom'],
      tab: 'celestials/pelle',
    },
    {
      name: '佩勒冲击与裂隙',
      info: () => `
佩勒冲击在被毁灭的现实中的不同事件中遇到。你第一次在被毁灭的现实内达到无限时遇到了第一个佩勒冲击。更多的冲击最终会随着进一步的进展而发生。
每个佩勒冲击都会对游戏的特定方面添加一个削弱，可以通过点击冲击名称查看。每个佩勒冲击还解锁一个裂隙条。
<br>
<br>
裂隙条可以通过点击它们在“空闲”和“填充”之间切换，尽管任何时候只有两个裂隙可以处于“填充”状态。当活动时，裂隙每秒消耗${formatInt(3)}%的裂隙特定资源。每个裂隙提供一个裂隙特定效果，这些效果基于填充的总量。
${PelleStrikes.eternity.hasStrike ? `对此的例外是衰变/崩塌/混乱，其效果在你总共消耗了${formatPostBreak(DC.E2000)} 复制器后会被封顶。` : ''}
此外，每个裂隙还提供三个里程碑奖励，用于将它们填充到某个百分比。
`,
      isUnlocked: () => PelleStrikes.infinity.hasStrike,
      tags: ['reality', 'antimatter', 'lategame', 'endgame', 'final', 'pelle', 'strike', 'rift', 'celestial'],
      tab: 'celestials/pelle',
    },
    {
      name: '星系生成器',
      info: () => `
当你达到${formatInt(
        100
      )}%递归/分散/破坏时，你将解锁<b>星系生成器</b>，它可以被动生成星系。生成的星系类似于复制器星系和超光速粒子星系，因为它们影响计数频率，就像反物质星系一样，但它们不会增加你下一个反物质星系的成本。你还解锁了五个新升级。第一个升级增加了生成的星系的基础数量。其他四个升级则为基础数量提供乘数。前两个升级可以通过花费反物质和生成的星系来购买。复制器或超光速粒子星系不能用于购买这些升级。
<br>
<br>
<b>星系生成器</b>有一个它可以生成的星系的最大数量，只有在达到当前上限后通过消耗裂隙才能增加。
`,
      isUnlocked: () => Pelle.hasGalaxyGenerator,
      tags: ['reality', 'antimatter', 'lategame', 'endgame', 'final', 'pelle', 'galaxy', 'galaxies', 'generator', 'celestial'],
      tab: 'celestials/pelle',
    },
  ],
}
;(function () {
  for (let i = 0; i < h2p.tabs.length; i++) {
    const tab = h2p.tabs[i]
    tab.id = i
    if (tab.alias === undefined) tab.alias = tab.name

    tab.searchTermsRelevance = {}
  }

  const searchIndex = {}

  const addTerm = (term, tab) => {
    let entry = searchIndex[term]
    if (entry === undefined) {
      entry = []
      searchIndex[term] = entry
    }
    if (entry.includes(tab)) return
    entry.push(tab)
  }

  const addWord = (word, tab) => {
    const lowerCase = word.toLowerCase()
    for (let i = 0; i < lowerCase.length; i++) {
      const term = lowerCase.slice(0, i + 1)
      addTerm(term, tab)
      if (tab.searchTermsRelevance[term] === undefined) {
        tab.searchTermsRelevance[term] = ((i + 1) / lowerCase.length) ** 0.65
      } else {
        tab.searchTermsRelevance[term] = Math.max(tab.searchTermsRelevance[term], ((i + 1) / lowerCase.length) ** 0.65)
      }
    }
  }

  const addPhrase = (phrase, tab) => {
    addWord(phrase, tab)
    for (const part of phrase.split(' ')) {
      addWord(part, tab)
    }
  }

  for (const tab of h2p.tabs) {
    addPhrase(tab.name, tab)
  }
  for (const tab of h2p.tabs) {
    for (const tag of tab.tags) {
      addPhrase(tag, tab)
    }
  }
  for (const tab of h2p.tabs) {
    addPhrase(tab.alias, tab)
  }

  const map2dToObject = function (arr, keyFun, valueFun) {
    const out = {}
    for (let idx1 = 0; idx1 < arr.length; idx1++) {
      for (let idx2 = 0; idx2 < arr[idx1].length; idx2++) {
        out[keyFun(arr[idx1][idx2], idx1, idx2)] = valueFun(arr[idx1][idx2], idx1, idx2)
      }
    }
    return out
  }

  // Very suboptimal code coming up. If anybody has a better solution, PLEASE, implement it.
  const keyboardify = (keybrd) =>
    map2dToObject(
      keybrd.split(',').map((str) => str.split('')),
      (key) => key,
      (_key, x, y) => ({ x, y })
    )

  const qwerty = keyboardify(`1234567890,qwertyuiop,asdfghjkl,zxcvbnm`)
  const qwertz = keyboardify(`1234567890,qwertzuiop,asdfghjkl,yxcvbnm`)
  const azerty = keyboardify(`1234567890,azertyuiop,qsdfghjklm,wxcvbn`)
  const dvorak = keyboardify(`1234567890,'<>pyfgcrl,aoeuidhtns,;qjkxbmwvz`)
  const colemak = keyboardify(`1234567890,qwfpgjluy,arstdhneio,zxcvbkm`)
  const workman = keyboardify(`1234567890,qdrwbjfup,ashtgyneoi,zxmcvkl`)
  const qwprf = keyboardify(`1234567890,qwprfyukl,asdtghnioe,zxcvbjm`)

  const keyboards = [qwerty, qwertz, azerty, dvorak, colemak, workman, qwprf]

  const keyboardDist = function (a, b, keyboard) {
    const aPos = keyboard[a],
      bPos = keyboard[b]
    if (!aPos || !bPos) return 100
    return Math.max(Math.abs(aPos.x - bPos.x), Math.abs(aPos.y - bPos.y))
  }

  // I copied this code based on OSA distance off wikipedia, with a few added changes.
  // The cost for "substitution" (third item of the first Math.min) is replaced from a static value
  // to a function which roughly estimates how likely the user is to mispress the key based on its
  // minimum distance from several common keyboard layouts.
  // I have no idea how the actual "distance" calculation works but as long as it does don't touch it.
  const howBadlyTypoedWithKeyboard = function (a, b, keyboard) {
    // If they're the same, skip all calculations
    if (a === b) return 0
    const aLen = a.length
    const bLen = b.length
    // If they're way too different, don't bother
    if (Math.abs(aLen - bLen) > 3) return 100
    // 2d Array with dimensions aLen + 1 x bLen + 1
    const d = new Array(aLen + 1).fill(0).map(() => new Array(bLen + 1).fill(0))

    for (let i = 0; i <= aLen; i++) {
      d[i][0] = i
    }
    for (let i = 0; i <= bLen; i++) {
      d[0][i] = i
    }

    for (let i = 1; i <= aLen; i++) {
      for (let j = 1; j <= bLen; j++) {
        const distance = keyboardDist(a[i - 1], b[j - 1], keyboard)
        const cost = distance === 0 ? 0 : 0.3 + distance * distance * 0.25
        d[i][j] = Math.min(d[i - 1][j] + 0.55, d[i][j - 1] + 0.7, d[i - 1][j - 1] + cost)
      }
    }
    return d[aLen][bLen]
  }

  const howBadlyTypoed = function (a, b) {
    // Arbitrarily large number
    let minTypoed = 1e10
    for (const keyboard of keyboards) {
      minTypoed = Math.min(minTypoed, howBadlyTypoedWithKeyboard(a, b, keyboard))
    }
    return minTypoed
  }

  const specialChars = ["'", '"', ',', '-', '.', '_']

  const replaceSpecialChars = function (str) {
    let result = str
    for (const i of specialChars) {
      result = result.replaceAll(i, '')
    }
    return result
  }

  // There are a LOT of magic numbers in this code, mostly from arbitrary choices for "What number is large enough to
  // act as a placeholder for 'basically not found'?"
  // This will need some cleanup if possible.
  h2p.search = (query) => {
    const truncatedQuery = replaceSpecialChars(query)
    if (truncatedQuery === '') return h2p.tabs.map((x) => ({ tab: x, relevance: 1.5 }))
    const searchTerms = truncatedQuery
      .toLowerCase()
      .split(' ')
      .filter((str) => str !== '')

    // A higher "Relevance" value actually means it's further away from the search, important to keep in mind
    const relevances = Array.repeat(1e4, h2p.tabs.length)
    for (const searchWord of searchTerms) {
      const minimumRequirement = Math.min(searchWord.length - 0.9, 3) * 0.5
      for (const searchIndexStr in searchIndex) {
        const typoThreshold = howBadlyTypoed(replaceSpecialChars(searchIndexStr), searchWord)
        if (typoThreshold < minimumRequirement) {
          for (const tab of searchIndex[searchIndexStr]) {
            const maxRelevance = tab.searchTermsRelevance[searchIndexStr]
            const decrease = Math.max(maxRelevance * 1.6 - 0.9, 0)
            relevances[tab.id] = Math.min(relevances[tab.id], Math.max(typoThreshold, 1 - maxRelevance) - decrease)
          }
        }
      }
    }
    const results = h2p.tabs.filter((x) => relevances[x.id] < 0.9).map((x) => ({ tab: x, relevance: relevances[x.id] }))
    // Provide both the relevance and the tab itself

    // Sort by id first, then push more relevant results to top.
    results.sort((a, b) => a.tab.id - b.tab.id).sort((a, b) => a.relevance - b.relevance)
    // Provide both the relevance and the tab itself
    return results
  }
})()
