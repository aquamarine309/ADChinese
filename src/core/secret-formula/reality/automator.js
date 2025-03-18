import { automatorTemplates } from '../script-templates.js'

export const automator = {
  categoryNames: ['时间研究', '事件触发器', '额外设定', '信息', '流处理'],
  commands: [
    {
      id: 0,
      isUnlocked: () => true,
      keyword: 'STUDIES RESPEC',
      category: 0,
      syntax: `<b>studies respec</b>`,
      description: `此命令启用重置选项，将在下一次手动或自动永恒时重置您的时间研究。请注意，此命令本身不会执行永恒；请确保您的自动购买器已开启，或者您手动运行 ETERNITY 命令（尽管 ETERNITY 有内置的重置选项）。`,
      examples: [`studies respec`],
    },
    {
      id: 1,
      isUnlocked: () => true,
      keyword: 'STUDIES LOAD',
      category: 0,
      syntax: `<b>studies</b> [nowait] <b>load id</b> <u>selector</u><br>
        <b>studies</b> [nowait] <b>load name</b> <u>name</u>`,
      description: `加载时间研究预设，就像您点击了时间研究选项卡中的按钮一样。`,
      sections: [
        {
          name: 'INPUTS',
          items: [
            {
              header: '<i>nowait</i>',
              description: `
                如果存在，自动脚本将在继续之前尽可能多地购买研究。默认情况下（即没有 "nowait"），此命令将无限重复此行，直到预设中的所有研究都被购买；如果您不小心，这可能会导致自动脚本无限卡住。
              `,
            },
            {
              header: '<i>selector</i>',
              description: `
                通过槽号查找并加载指定的时间研究预设。槽号从 1 到 6，从左到右排序。`,
            },
            {
              header: '<i>name</i>',
              description: '通过给定名称查找并加载指定的时间研究预设。名称区分大小写。',
            },
          ],
        },
      ],
      examples: [`studies load id 2`, `studies load name ANTI`, `studies nowait load name dil`],
    },
    {
      id: 2,
      isUnlocked: () => true,
      keyword: 'STUDIES PURCHASE',
      category: 0,
      syntax: `<b>studies</b> [nowait] <b>purchase <u>study_list</u></b>`,
      description: '从时间研究列表中购买指定的时间研究。',
      sections: [
        {
          name: 'INPUTS',
          items: [
            {
              header: '<i>nowait</i>',
              description: `
                如果存在，自动脚本将在继续之前尽可能多地购买研究。默认情况下（即没有 "nowait"），此命令将无限重复此行，直到预设中的所有研究都被购买；如果您不小心，这可能会导致自动脚本无限卡住。
              `,
            },
            {
              header: '<i>study_list</i>',
              description: `
                此处支持导出的时间研究树格式，即用逗号分隔的时间研究 ID 列表。此命令还支持更灵活的格式，允许使用范围（例如，<u>11-62</u>）和以下别名：<br>
                <blockquote><b>antimatter, infinity, time, active, passive, idle, light, dark</b></blockquote>
                也可以使用变量名称代替整个时间研究列表（请参阅定义面板），但在这种情况下，不允许使用简写范围和别名。`,
            },
          ],
        },
      ],
      examples: ['studies nowait purchase 11,21,31', 'studies purchase 11-62, antimatter, 111, idle', 'studies nowait purchase ec6Studies'],
    },
    {
      id: 3,
      isUnlocked: () => true,
      keyword: 'PRESTIGE',
      category: 1,
      syntax: `
        <b>infinity</b> [nowait]<br>
        <b>eternity</b> [nowait] [respec]<br>
        <b>reality</b> [nowait] [respec]`,
      description: `触发无限、永恒或现实重置（如果可能），否则自动脚本将在此命令处等待，直到可以执行为止。如果您的脚本经常卡在此命令，可能是自动购买器在自动脚本到达此行之前触发了重置 - 考虑使用 <i>nowait</i> 或通过 AUTO 调整自动购买器设置。`,
      sections: [
        {
          name: 'MODIFIERS',
          items: [
            {
              header: '<i>nowait</i>',
              description: `
                如果存在，自动脚本将在无法执行重置时（例如，在目标以下的 EC 中）继续执行下一条命令，而不是重复尝试此命令。
              `,
            },
            {
              header: '<i>respec</i>',
              description: `
                对于非无限重置，还会在触发重置时执行相关的重置操作。
                永恒：重置时间研究和永恒。<br>
                现实：卸下符文并重置现实。
              `,
            },
          ],
        },
      ],
      examples: ['infinity', 'eternity respec', 'reality nowait'],
    },
    {
      id: 4,
      isUnlocked: () => true,
      keyword: 'UNLOCK',
      category: 1,
      syntax: '<b>unlock</b> [nowait] <u>feature</u>',
      description: '解锁指定的永恒挑战或时间延展。',
      sections: [
        {
          name: 'MODIFIERS',
          items: [
            {
              header: '<i>nowait</i>',
              description: `
                如果存在，即使解锁功能失败，自动脚本也会继续执行下一条命令。默认情况下，自动脚本将不断运行此命令，直到解锁成功。
              `,
            },
          ],
        },
      ],
      examples: ['unlock dilation', 'unlock ec7'],
    },
    {
      id: 5,
      isUnlocked: () => true,
      keyword: 'START',
      category: 1,
      syntax: `
        <b>start</b> ec<u>N</u><br>
        <b>start</b> dilation`,
      description: `启动指定的永恒挑战或延展永恒。此命令还会尝试解锁永恒挑战（如果未解锁），但不会对延展执行相同操作（使用 UNLOCK 命令来解锁延展）。如果您已经在指定的永恒挑战或延展永恒中，再次运行此命令将不会执行任何操作；否则，自动脚本将不断尝试启动永恒，直到成功为止。`,
      examples: ['start ec12', 'start dilation'],
    },
    {
      id: 6,
      isUnlocked: () => true,
      keyword: 'AUTO',
      category: 2,
      syntax: `<b>auto infinity</b> [setting]<br>
        <b>auto eternity</b> [setting]<br>
        <b>auto reality</b> [setting]`,
      description: `开启或关闭重置自动购买器，并允许您更改其设置。如果未提供设置选项，此命令将切换自动购买器的状态（如果开启则关闭，如果关闭则开启）。<b>如果您尝试修改您没有的自动购买器或设置，此命令将无效。</b>`,
      sections: [
        {
          name: 'SETTINGS',
          items: [
            {
              header: '<i>on</i> | <i>off</i>',
              description: '开启或关闭指定的自动购买器。',
            },
            {
              header: '<u><i>number</i></u> <u><i>time units</i></u>',
              description: `仅适用于无限和永恒。
                开启自动购买器并设置为在给定时间间隔触发。`,
            },
            {
              header: '<u><i>number</i></u> x highest',
              description: `仅适用于无限和永恒。开启自动购买器并设置为“X 倍最高”模式。`,
            },
            {
              header: '<i><u>number</u> <u>currency</u></i>',
              description: `开启自动购买器并设置为在特定数量时触发。货币必须与自动购买器类型匹配（IP、EP 或 RM）。对于现实自动购买器，这将选择“现实机器”模式。符文等级模式无法通过自动脚本更改或设置，只能手动操作。`,
            },
          ],
        },
      ],
      examples: ['auto infinity on', 'auto eternity off', 'auto infinity 30s', 'auto eternity 10 seconds', 'auto eternity 1e100 x highest'],
    },
    {
      id: 7,
      isUnlocked: () => BlackHole(1).isUnlocked,
      keyword: 'BLACK HOLE',
      category: 2,
      syntax: '<b>black hole</b> <u>state</u>',
      description: `切换黑洞的加速效果开启或关闭。通过自动脚本开启黑洞不会绕过从关闭到最大速度的逐渐加速过程。`,
      examples: ['black hole on', 'black hole off'],
    },
    {
      id: 8,
      isUnlocked: () => Enslaved.isUnlocked,
      keyword: 'STORE GAME TIME',
      category: 2,
      syntax: '<b>store game time</b> <u>action</u>',
      description: `更改黑洞是否存储时间，并允许使用存储的时间。`,
      sections: [
        {
          name: 'ACTIONS',
          items: [
            {
              header: '<i>on</i> | <i>off</i>',
              description: `
                开启或关闭存储游戏时间。
              `,
            },
            {
              header: '<i>use</i>',
              description: `
                使用所有存储的游戏时间。不会更改存储时间的开启/关闭状态。
              `,
            },
          ],
        },
      ],
      examples: ['store game time on', 'store game time off', 'store game time use'],
    },
    {
      id: 9,
      isUnlocked: () => true,
      keyword: 'NOTIFY',
      category: 3,
      syntax: '<b>notify</b> "<u>text</u>"',
      description: `将指定的文本作为文本通知发布在右上角，位置和样式与其他通知（如自动保存和成就/升级解锁）相同。这可以用于查看自动脚本状态，尤其是在非自动脚本选项卡上时。`,
      examples: ['notify "Dilation reached"', 'notify "ECs completed"'],
    },
    {
      id: 10,
      isUnlocked: () => true,
      keyword: 'Adding Comments',
      category: 3,
      syntax: '<b>#</b> text<br><b>//</b> text',
      description: `允许您在脚本中留下注释。这对于组织或跟踪脚本中不同部分的功能可能很有用，使其比仅使用命令更具可读性。这些命令主要用作工具，帮助您在需要时更容易地跟踪脚本的步骤。`,
      sections: [
        {
          name: 'NOTES',
          items: [
            {
              header: '<i>Inline comments</i>',
              description: `
                自动脚本不支持在同一行中放置在已功能代码行之后的注释。例如，单行 "studies load name TDI // Load push" 将是无效命令。在这种情况下，您需要将注释移动到自动脚本中的单独行。
              `,
            },
            {
              header: '<i>Execution speed</i>',
              description: `
                注释不会减慢脚本的执行速度，因为它们会在执行过程中完全跳过，并且不计为运行时的命令。例如，即使您在 20-40 行中有很长的注释解释，自动脚本仍会<i>立即</i>从第 19 行跳到第 41 行。
              `,
            },
          ],
        },
      ],
      examples: ['# get 1e20 before starting ec1', '// this loop alternates dilation and pushing'],
    },
    {
      id: 11,
      isUnlocked: () => true,
      keyword: 'WAIT',
      category: 4,
      syntax: '<b>wait</b> <u>condition</u>',
      description: `强制自动脚本等待某些条件或事件。要等待特定的时间，请使用 PAUSE 命令。`,
      sections: [
        {
          name: 'POSSIBLE CONDITIONS',
          items: [
            {
              header: '<i>comparison</i>',
              description: `
                等待直到比较语句为真。有关如何正确输入此选项的详细信息，请参阅“格式化比较”条目。
              `,
            },
            {
              header: '<i>prestige</i>',
              description: `
                等待指定的重置（无限、永恒或现实）由其各自的自动购买器触发。这必须在此命令到达<i>之后</i>发生；如果自动购买器在此命令到达<i>之前</i>触发，您的脚本可能会卡住。
              `,
            },
            {
              header: '<i>black hole (state)</i>',
              description: `
                等待黑洞处于指定状态。有效的状态输入为 "off"、"bh1" 和 "bh2"，分别对应没有活动的黑洞、至少第一个黑洞活动以及两个黑洞都活动。
              `,
            },
          ],
        },
      ],
      examples: ['wait am >= 1e308', 'wait pending completions >= 5', 'wait ec9 completions >= 4', 'wait infinity', 'wait black hole bh1'],
    },
    {
      id: 12,
      isUnlocked: () => true,
      keyword: 'PAUSE',
      category: 4,
      syntax: '<b>pause</b> <u>interval</u>',
      description: `告诉自动脚本停止前进并执行命令一段时间。请注意，如果暂停时间短于自动脚本的执行速度，自动脚本将等待下一次执行周期后再继续。`,
      examples: ['pause 10s', 'pause 1 minute', 'pause 34 seconds'],
      sections: [
        {
          name: 'INTERVAL FORMATTING',
          items: [
            {
              header: '<i>Specified Interval</i>',
              description: `此命令接受的时间单位为毫秒（"ms"）、秒（"s"、"sec" 或 "seconds"）、分钟（"m"、"min" 或 "minutes"）和小时（"h" 或 "hours"）。您不能只提供一个数字，必须指定时间单位。`,
            },
            {
              header: '<i>Defined Constant</i>',
              description: `可以使用定义的常量代替，请参阅定义面板。定义的值将假定为秒为单位。`,
            },
          ],
        },
        {
          name: 'OTHER',
          items: [
            {
              header: '<i>Offline Side-effects</i>',
              description: `此命令在处理离线进度时可能会表现不佳，因为执行周期有限。通常为 20-30 个周期的 1 秒暂停，在处理数小时的离线进度时可能只有 1 个游戏周期，这可能不足以满足脚本其余部分所需的资源。`,
            },
            {
              header: '<i>Alternatives</i>',
              description: `使用像 'WAIT' 这样的命令可以让您将其设置为特定资源数量，以确保游戏在继续之前处于适当状态。`,
            },
            {
              header: '<i>Manual Skip</i>',
              description: `您可以通过手动将自动脚本向前移动一行（将其放在下一行）然后恢复执行，来强制自动脚本跳过 PAUSE 命令而不等待整个指定时间。如果您经常这样做，请考虑修改您的脚本。`,
            },
          ],
        },
      ],
    },
    {
      id: 13,
      isUnlocked: () => true,
      keyword: 'IF',
      category: 4,
      syntax: `<b>if</b> <u>condition</u> {<br>
        <blockquote>commands</blockquote>
        }`,
      description: `定义一个自动脚本的内部块，只有在到达此行时指定的比较为真时才会执行。如果比较为假，自动脚本将跳过该块并继续执行块后的第一行。`,
      examples: ['if ec10 completions < 5', 'if ep > 1e6000'],
    },
    {
      id: 14,
      isUnlocked: () => true,
      keyword: 'UNTIL',
      category: 4,
      syntax: `<b>until</b> <u>comparison</u> {<br>
        <blockquote>commands</blockquote>
        }<br><b>until</b> <u>prestige_event</u> {<br>
          <blockquote>commands</blockquote>
        }`,
      description: `定义一个脚本的内部块，命令会重复执行；比较在开始时和每次循环重复时检查。如果条件在第一次到达 UNTIL 语句时为真，内部块的命令将完全跳过。
        <br><br>
        如果指定了重置事件（即无限、永恒或现实）而不是条件，则块将始终进入，并且块内的命令将重复执行，直到事件在进入块后首次发生。请注意，自动脚本将在重置事件发生后完成循环的其余部分，然后退出 - 它不会在循环中途立即退出。`,
      examples: ['until ep > 1e500', 'until reality'],
    },
    {
      id: 15,
      isUnlocked: () => true,
      keyword: 'WHILE',
      category: 4,
      syntax: `<b>while</b> <u>comparison</u> {<br>
        <blockquote>commands</blockquote>
      }`,
      description: `定义一个脚本的内部块，命令会重复执行；比较在开始时和每次循环重复时检查。如果条件在第一次到达 WHILE 语句时为假，内部块的命令将完全跳过。`,
      examples: [`while ep < 1e500`, `while myThreshold > am`],
    },
    {
      id: 16,
      isUnlocked: () => true,
      keyword: 'STOP',
      category: 4,
      syntax: `<b>stop</b>`,
      description: `当自动脚本运行此行时，它将停止执行，就像您点击了自动脚本左上角控制面板中的 <i class="fas fa-stop"></i> 按钮一样。这不需要放在每个脚本的末尾以停止它们，因为关闭左侧面板中的 <i class="fas fa-sync-alt"></i> 选项会自动执行此操作。此命令在 IF 命令内部使用时可能很有用，以便仅在特定条件下停止执行。`,
      examples: [`stop`],
    },
    {
      id: 17,
      isUnlocked: () => true,
      keyword: 'Currency List',
      category: 4,
      syntax: '<i>You can use these in any IF, WHILE, UNTIL, or WAIT command</i>',
      description: () => {
        const filterText = EffarigUnlock.glyphFilter.isUnlocked ? `<b>filter score</b> - Glyph filter score of the Glyph which your filter will select this Reality<br>` : ''
        const stText =
          V.spaceTheorems > 0
            ? `<b>space theorems</b> - Current unspent Space Theorem amount<br>
            <b>total space theorems</b> - TOTAL Space Theorems, including ones spent on current Studies<br>`
            : ''
        return `这是您可以在自动脚本中使用的“货币”或数字列表。<br>
          请注意，使用时，大多数货币需要以科学计数法表示。<br>
          <b>am</b> - 当前反物质数量  <br>
          <b>ip</b> - 当前无限点数数量  <br>
          <b>ep</b> - 当前永恒点数数量  <br>
          <b>rm</b> - 当前现实机器数量  <br>
          <b>infinities</b> - 当前无限次数 <br>
          <b>banked infinities</b> - 当前存储的无限次数 <br>
          <b>eternities</b> - 当前永恒次数 <br>
          <b>realities</b> - 当前现实次数 <br>
          <b>pending ip</b> - 在无限重置时获得的 IP（如果不可用则为 0）<br>
          <b>pending ep</b> - 在永恒重置时获得的 EP（如果不可用则为 0）<br>
          <b>pending tp</b> - 在退出延展时获得的 TP<br>
          <b>pending rm</b> - 在现实重置时获得的 RM（如果不可用则为 0）<br>
          <b>pending glyph level</b> - 在现实重置时获得的符文等级（如果不可用则为 0）<br>
          <b>dt</b> - 当前延展时间数量 <br>
          <b>tp</b> - 当前超光速粒子数量<br>
          <b>rg</b> - 当前复制星系数量（不使用科学计数法）<br>
          <b>rep</b> - 当前复制数量 <br>
          <b>tt</b> - 当前时间定理数量 <br>
          <b>total tt</b> - 总时间定理，包括所有生成的时间定理和已用于研究的时间定理 <br>
          <b>total completions</b> - 所有永恒挑战的总完成次数 <br>
          <b>pending completions</b> - 当前 EC 在永恒时的总完成次数 <br>
          <b>ec<u>X</u> completions</b> - 特定 EC 的完成次数（例如，"ec6 completions"）<br>
          ${filterText}
          ${stText}
        `
      },
    },
    {
      id: 18,
      isUnlocked: () => true,
      keyword: 'Formatting Comparisons',
      category: 4,
      syntax: '<u>resource1</u> <u>condition</u> <u>resource2</u>',
      description: `
        比较用于某些命令中，允许您根据游戏的当前状态控制自动脚本的行为。它们具有标准格式，包含两个值输入和一个比较运算符，但只要整体格式正确，值输入可以是任何内容。`,
      sections: [
        {
          name: 'CONDITIONS',
          items: [
            {
              header: '<i>resource</i>',
              description: `
                这可以是任何自动脚本货币、定义的常量或必须以科学计数法表示的数字（例如，1000、1e100、1.8e308）。与更通用的编程语言不同，这必须是单个值（即不允许使用数学表达式，如 "ip + pending ip"）。
              `,
            },
            {
              header: '<i>condition</i>',
              description: `
                这必须是一个不等式运算符（<, <=, >, >=），其含义与数学中的典型含义相同。不允许使用等式运算符（==, !=），因为游戏的性质意味着数字通常永远不会完全相等，因此基于直接相等的检查可能导致意外的脚本行为。
              `,
            },
          ],
        },
      ],
      examples: ['ep < 1e20', 'total tt > 14000'],
    },
    {
      id: 19,
      isUnlocked: () => true,
      keyword: 'Commands with inner blocks',
      category: 4,
      syntax: `<b>header_command</b> {<br>
        <blockquote>inner_commands</blockquote>
        }`,
      description: `某些命令与“内部块”相关联。此内部块仍然可以包含任何其他有效命令，但在执行 <b>header_command</b> 时，是否实际执行取决于游戏的当前状态。这允许您重复某些命令（例如，时间研究购买），或完全跳过它们（例如，如果 EC 已完成，则不进入）。这些块可以嵌套，内部块可以放置在另一个内部块中。
        <br><br>
        在文本编辑器模式下：使用花括号指定内部块，开括号 { 与比较在同一行，闭括号 } 在您希望放在块内的最后一行之后单独一行。内部命令不需要缩进，尽管缩进可能在视觉上有所帮助。
        <br><br>
        在块编辑器模式下：这些命令带有一个空虚线矩形，指示哪些命令在内部块中。后续块可以拖动到虚线矩形内。
        `,
      examples: [
        `if ec10 completions < 5 {<br>
          <blockquote>
          unlock ec10<br>
          start ec10</blockquote>
        }`,
        `until ep > 1e8 {<br>
          <blockquote>
          studies nowait purchase 11-62<br>
          pause 10s<br>
          eternity respec</blockquote>
        }`,
      ],
    },
  ],
  otherAutomatorPoints: [
    {
      name: 'Reality Count',
      automatorPoints: () => 2 * Math.clampMax(Currency.realities.value, 50),
      shortDescription: () => `+${formatInt(2)} per Reality, up to ${formatInt(50)} Realities`,
      symbol: 'Ϟ',
    },
    {
      name: 'Black Hole',
      automatorPoints: () => (BlackHole(1).isUnlocked ? 10 : 0),
      shortDescription: () => `Unlocking gives ${formatInt(10)} AP`,
      symbol: "<i class='fas fa-circle'></i>",
    },
  ],
  templates: automatorTemplates,
}
