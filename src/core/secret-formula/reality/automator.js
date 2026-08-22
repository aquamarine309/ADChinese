import { automatorTemplates } from "../script-templates.js";

export const automator = {
  categoryNames: [
    "时间研究",
    "事件触发",
    "修改设置",
    "信息",
    "脚本流",
  ],
  commands: [
    {
      id: 0,
      isUnlocked: () => true,
      keyword: "重置时间研究",
      category: 0,
      syntax: `<b>studies respec</b>`,
      description: `这条指令会打开重置时间研究的选项，从而在下次永恒的时候重置时间研究。注意它不会进行一次永恒，请确保你的自动购买器开启或者你手动运行永恒指令（尽管永恒之理支持带上重置研究的选项）。`,
      examples: [
        `studies respec`,
      ]
    },
    {
      id: 1,
      isUnlocked: () => true,
      keyword: "载入研究",
      category: 0,
      syntax: `<b>studies</b> [nowait] <b>load id</b> <u>selector</u><br>
        <b>studies</b> [nowait] <b>load name</b> <u>name</u>`,
      description: `载入一个时间研究，就像你点击时间研究标签页下面的按钮一样。`,
      sections: [
        {
          name: "输入",
          items: [
            {
              header: "<i>nowait</i>",
              description: `
                如果存在该指令，自动机将在继续执行后续指令前尽可能多地购买时间研究。默认情况下（即不含“nowait”时），这个指令会无限重复执行当前行，直到预设中的所有研究全部被购买；若不加注意，可能导致自动机永久卡死。
              `
            },
            {
              header: "<i>selector</i>",
              description: `
                通过其槽位编号查找并加载指定的时间研究预设。编号为 1 至 6，按从左到右的顺序排列。`
            },
            {
              header: "<i>name</i>",
              description: "通过其名称查找并加载指定的时间研究预设。此操作区分大小写。"
            },
          ]
        }
      ],
      examples: [
        `studies load id 2`,
        `studies load name ANTI`,
        `studies nowait load name dil`,
      ]
    },
    {
      id: 2,
      isUnlocked: () => true,
      keyword: "购买研究",
      category: 0,
      syntax: `<b>studies</b> [nowait] <b>purchase <u>study_list</u></b>`,
      description: "购买时间研究列表上指定的时间研究",
      sections: [
        {
          name: "输入",
          items: [
            {
              header: "<i>nowait</i>",
              description: `
                如果存在该指令，自动机将在继续执行后续指令前尽可能多地购买时间研究。默认情况下（即不含“nowait”时），此指令会无限重复执行当前行，直到预设中的所有研究全部被购买；若不加注意，可能导致自动机永久卡死。
              `
            },
            {
              header: "<i>study_list</i>",
              description: `
 此处支持导出的时间研究树格式，即用逗号分隔的时间研究编号列表。此指令还支持更灵活的格式，允许使用研究范围（例如 <u>11-62</u>）及以下别名（注意只能使用英文）：<br>
<blockquote><b>antimatter(反物质), infinity(无限), time(时间), active(活跃), passive(被动), idle(挂机), light(光明), dark(黑暗)</b></blockquote>
还可以使用变量名来代替整个时间研究列表（见定义面板），但此时不允许使用简写范围和别名。`
            },
          ]
        }
      ],
      examples: [
        "studies nowait purchase 11,21,31",
        "studies purchase 11-62, antimatter, 111, idle",
        "studies nowait purchase ec6Studies",
      ]
    },
    {
      id: 3,
      isUnlocked: () => true,
      keyword: "重置(PRESTIGE)",
      category: 1,
      syntax: `
        <b>infinity</b> [nowait]<br>
        <b>eternity</b> [nowait] [respec]<br>
        <b>reality</b> [nowait] [respec]`,
      description: `触发一次无限、永恒或现实，如果不行，自动机将一直等待到可以为止。如果你发现你的脚本经常因为这条卡住，也许自动机在到达这行前自动购买器正在触发一次重置——考虑用 <i>nowait</i> 或者将自动购买器设置为AUTO。`,
      sections: [
        {
          name: "修饰",
          items: [
            {
              header: "<i>nowait</i>",
              description: `
              如果存在该指令，当现在无法重置时（例如在永恒挑战中低于目标），自动机将跳转到下一行而不会重复尝试这一行。
              `
            },
            {
              header: "<i>respec</i>",
              description: `
                对于非无限的重置，触发重置的时候同时有相关的清空行为。
                永恒：重置时间研究树并永恒。<br>
                现实：卸下符文并现实。  `
            },
          ]
        }
      ],
      examples: [
        "infinity",
        "eternity respec",
        "reality nowait",
      ]
    },
    {
      id: 4,
      isUnlocked: () => true,
      keyword: "解锁(UNLOCK)",
      category: 1,
      syntax: "<b>unlock</b> [nowait] <u>feature</u>",
      description: "解锁特定的永恒挑战或时间膨胀",
      sections: [
        {
          name: "修饰",
          items: [
            {
              header: "<i>nowait</i>",
              description: `
              如果存在该指令，即使解锁失败，自动机也会跳转到下一行。默认情况下，自动机将保持运行直到解锁成功。          `
            },
          ]
        }
      ],
      examples: [
        "unlock dilation",
        "unlock ec7"
      ]
    },
    {
      id: 5,
      isUnlocked: () => true,
      keyword: "开始(START)",
      category: 1,
      syntax: `
        <b>start</b> ec<u>N</u><br>
        <b>start</b> dilation`,
      description: `开始指定的永恒挑战或膨胀永恒。这条指令还会尝试解锁尚未解锁的永恒挑战，但不会自动解锁时间膨胀（请使用 UNLOCK 指令来完成）。若你已在指定的永恒挑战或膨胀永恒中，再次运行此指令将不会执行任何操作；否则，自动机会持续尝试开始永恒直到成功。`,
      examples: [
        "start ec12",
        "start dilation"
      ]
    },
    {
      id: 6,
      isUnlocked: () => true,
      keyword: "自动(AUTO)",
      category: 2,
      syntax: `<b>auto infinity</b> [setting]<br>
        <b>auto eternity</b> [setting]<br>
        <b>auto reality</b> [setting]`,
      description: `开启或关闭重置自动购买器，并允许你更改其设置。如果未指定设置选项，此指令将切换自动购买器的状态（开启时关闭，关闭时开启）。<b>如果你尝试修改尚未拥有的自动购买器或设置，这条指令将不会生效。</b>`,
      sections: [
        {
          name: "设置",
          items: [
            {
              header: "<i>on</i> | <i>off</i>",
              description: "打开或关闭特定的自动购买器",
            },
            {
              header: "<u><i>数字</i></u> <u><i>时间单位</i></u>",
              description: `仅适用于无限和永恒。
                打开自动购买器并设置为指定的时间间隔`
            },
            {
              header: "<u><i>数字</i></u> x highest",
              description: `仅适用于无限和永恒。
                打开自动购买器并设置为最高数量的倍数`
            },
            {
              header: "<i><u>数字</u> <u>货币</u></i>",
              description: `开启自动购买器并将其设置为在特定数量时触发。货币类型必须与自动购买器类型匹配（无限点数(IP)、永恒点数(EP)或现实机器(RM)）。这将为现实自动购买器选择“现实机器”模式。符文等级模式无法通过自动机更改或设置，只能手动操作。`,
            },
          ]
        }
      ],
      examples: [
        "auto infinity on",
        "auto eternity off",
        "auto infinity 30s",
        "auto eternity 10 seconds",
        "auto eternity 1e100 x highest"
      ]
    },
    {
      id: 7,
      isUnlocked: () => BlackHole(1).isUnlocked,
      keyword: "黑洞(BLACK HOLE)",
      category: 2,
      syntax: "<b>black hole</b> <u>状态</u>",
      description: `开启或关闭黑洞的加速效果。通过自动机开启黑洞不会绕过永久激活前从关闭到最大速度的逐渐加速过程。`,
      examples: [
        "black hole on",
        "black hole off",
      ]
    },
    {
      id: 8,
      isUnlocked: () => Enslaved.isUnlocked,
      keyword: "储存游戏时间",
      category: 2,
      syntax: "<b>store game time</b> <u>行为</u>",
      description: `更改黑洞是否存储时间的状态，同时允许使用已存储的时间。`,
      sections: [
        {
          name: "行为",
          items: [
            {
              header: "<i>on</i> | <i>off</i>",
              description: `
                开启或关闭存储游戏时间。
              `
            },
            {
              header: "<i>use</i>",
              description: `
                消耗所有已存储的游戏时间。不会改变时间存储的开关状态。
              `
            }
          ]
        }
      ],
      examples: [
        "store game time on",
        "store game time off",
        "store game time use",
      ]
    },
    {
      id: 9,
      isUnlocked: () => true,
      keyword: "通知(NOTIFY)",
      category: 3,
      syntax: "<b>notify</b> \"<u>文本</u>\"",
      description: `将指定文本以文本通知形式发送到右上角，位置和样式与自动保存、成就/升级解锁等其他通知相同。在自动机标签页以外的标签页查看自动机状态时，此指令可能很有用。`,
      examples: [
        "notify \"Dilation reached\"",
        "notify \"ECs completed\""
      ]
    },
    {
      id: 10,
      isUnlocked: () => true,
      keyword: "添加注释",
      category: 3,
      syntax: "<b>#</b> 文本<br><b>//</b> 文本",
      description: `允许你在脚本中为自己留下注释。这有助于整理或追踪脚本各部分的功能，使得内容比纯指令更易于阅读。这些指令主要作为一种工具，帮助你在需要时更轻松地跟进脚本的步骤。`,
      sections: [
        {
          name: "说明",
          items: [
            {
              header: "<i>行内注释</i>",
              description: `
                自动机不支持在已有功能代码行的同一行后面放置注释。例如，单行“studies load name TDI // Load push”将是一个无效指令。在这种情况下，你需要将注释移至自动机中的单独一行。
              `
            },
            {
              header: "<i>执行速度</i>",
              description: `
                注释不会拖慢你的脚本，因为执行时会完全跳过它们，且不计入运行的指令。例如，即使你在第20至40行用注释写了很长的说明，自动机在执行时也会<i>立即</i>从第19行跳至第41行。
              `
            },
          ]
        }
      ],
      examples: [
        "# get 1e20 before starting ec1",
        "// this loop alternates dilation and pushing"
      ]
    },
    {
      id: 11,
      isUnlocked: () => true,
      keyword: "等待(WAIT)",
      category: 4,
      syntax: "<b>wait</b> <u>条件</u>",
      description: `强制自动机等待某个条件或事件。若要等待特定时长，请改用 PAUSE 指令。`,
      sections: [
        {
          name: "可能的条件",
          items: [
            {
              header: "<i>比较</i>",
              description: `
                等待直到比较语句为真。关于如何正确输入此选项的详细信息，请查看“比较格式”条目。
              `
            },
            {
              header: "<i>重置</i>",
              description: `
                等待直到指定的重置（无限、永恒或现实）已被其对应的自动购买器触发。这必须发生在<i>执行到</i>此指令<i>之后</i>；如果自动购买器在<i>执行到</i>此指令<i>之前</i>触发，则你的脚本可能会卡住。
              `
            },
            {
              header: "<i>黑洞（状态）</i>",
              description: `
                等待直到黑洞处于指定状态。状态的有效输入为“off”（关闭）、“bh1”（黑洞 1）和“bh2”（黑洞 2），分别对应无黑洞激活、至少第一个黑洞激活以及两个黑洞均激活。
              `
            }
          ]
        }
      ],
      examples: [
        "wait am >= 1e308",
        "wait pending completions >= 5",
        "wait ec9 completions >= 4",
        "wait infinity",
        "wait black hole bh1",
      ]
    },
    {
      id: 12,
      isUnlocked: () => true,
      keyword: "暂停(PAUSE)",
      category: 4,
      syntax: "<b>pause</b> <u>间隔</u>",
      description: `指示自动机在指定时长内停止前进和执行指令。注意，若暂停时长短于自动机的执行速度，自动机会等到下一个执行周期再继续。`,
      examples: [
        "pause 10s",
        "pause 1 minute",
        "pause 34 seconds"
      ],
      sections: [
        {
          name: "间隔格式",
          items: [
            {
              header: "<i>确切的时间</i>",
              description: `此指令接受的时间单位有毫秒（“ms”）、秒（“s”、“sec”或“seconds”）、分钟（“m”、“min”或“minutes”）和小时（“h”或“hours”）。你不能只提供一个数字而不带单位；必须指定时间单位。`,
            },
            {
              header: "<i>定义的常量</i>",
              description: `定义的常量可替代使用，请参阅定义面板。该定义值将假定其单位为秒。`
            },
          ]
        },
        {
          name: "其他",
          items: [
            {
              header: "<i>离线的边缘效应</i>",
              description: `由于离线进度期间时间间隔数受限，此指令在离线进度中运行时可能表现不佳。通常需要 20-30 个时间间隔的 1 秒暂停，在处理数小时的离线进度时可能仅对应 1 个游戏时间间隔，这可能不足以积累脚本后续所需资源。`,
            },
            {
              header: "<i>类似指令</i>",
              description: `使用类似“WAIT”的指令可以让你针对特定资源数量进行设置，以确保游戏在继续之前处于正确的状态。`
            },
            {
              header: "<i>手动跳过</i>",
              description: `你可以通过向前执行一行（将其移至下一行）然后恢复执行，手动强制自动机跳过“PAUSE”指令，无需等待整个指定时长。若你发现自己经常这样做，请考虑修改你的脚本。`
            }
          ]
        }
      ]
    },
    {
      id: 13,
      isUnlocked: () => true,
      keyword: "如果(IF)",
      category: 4,
      syntax: `<b>if</b> <u>条件</u> {<br>
        <blockquote>指令</blockquote>
        }`,
      description: `定义一个自动机脚本的内部块，仅当执行到该行时指定的比较结果为真时才执行。若比较结果为假，自动机将跳至该块后的第一行并继续执行。`,
      examples: [
        "if ec10 completions < 5",
        "if ep > 1e6000"
      ]
    },
    {
      id: 14,
      isUnlocked: () => true,
      keyword: "直到(UNTIL)",
      category: 4,
      syntax: `<b>until</b> <u>比较</u> {<br>
        <blockquote>指令</blockquote>
        }<br><b>until</b> <u>重置</u> {<br>
          <blockquote>指令</blockquote>
        }`,
      description: `定义一个脚本内部块，其中指令会重复执行；比较条件在循环开始和每次重复时进行检查。若在首次执行到“UNTIL”语句时条件为真，则内部指令块将被完全跳过。<br><br>若指定的是重置事件（如无限、永恒或现实）而非条件，则该块将始终进入，块内指令将重复执行，直到该事件在进入块之后首次发生。请注意，自动机将在重置事件发生后完成循环的剩余部分并退出——不会在循环中途立即退出。`,
      examples: [
        "until ep > 1e500",
        "until reality",
      ]
    },
    {
      id: 15,
      isUnlocked: () => true,
      keyword: "WHILE循环",
      category: 4,
      syntax: `<b>while</b> <u>比较</u> {<br>
        <blockquote>指令</blockquote>
      }`,
      description: `定义一个脚本内部块，其中指令会重复执行；比较条件在循环开始和每次重复时进行检查。若在首次执行到“WHILE”语句时条件为假，则内部指令块将被完全跳过。`,
      examples: [
        `while ep < 1e500`,
        `while myThreshold > am`,
      ]
    },
    {
      id: 16,
      isUnlocked: () => true,
      keyword: "停止(STOP)",
      category: 4,
      syntax: `<b>stop</b>`,
      description: `当自动机运行到此行时，它将停止执行，如同你点击了自动机左上角控制面板中的 <i class="fas fa-stop"></i> 按钮。此指令不必放在每个脚本的末尾来停止它们，因为关闭左侧面板中的 <i class="fas fa-sync-alt"></i> 选项会自动实现此效果。此指令在 IF 指令内部使用时可能很有用，以便仅在特定条件下停止执行。`,
      examples: [
        `stop`,
      ]
    },
    {
      id: 17,
      isUnlocked: () => true,
      keyword: "货币列表",
      category: 4,
      syntax: "<i>你可以在任何 IF、WHILE、UNTIL 或 WAIT 指令中使用这些。</i>",
      description: () => {
        const filterText = EffarigUnlock.glyphFilter.isUnlocked
          ? `<b>filter score</b> - 筛选积分，本轮现实中所选符文的筛选评分。<br>`
          : "";
        const stText = V.spaceTheorems > 0
          ? `<b>space theorems</b> - 空间之理，当前未消耗的时间之理数量<br>
            <b>total space theorems</b> - 总共的空间之理，总空间之理，包括已用于当前研究的那些。<br>`
          : "";
        return `这是自动机内可使用的“货币”或数值列表。<br>
请注意，使用时大多数货币需采用科学记数法。<br>
          <b>am</b> - 当前反物质数量  <br>
          <b>ip</b> - 当前无限点数数量  <br>
          <b>ep</b> - 当前永恒点数数量  <br>
          <b>rm</b> - 当前现实机器数量  <br>
          <b>infinities</b> - 当前无限次数 <br>
          <b>banked infinities</b> - 储存的无限次数 <br>
          <b>eternities</b> - 当前永恒次数 <br>
          <b>realities</b> - 当前现实次数 <br>
          <b>pending ip</b> - 即将获得的无限点数（如果不能就为0）<br>
          <b>pending ep</b> - 即将获得永恒点数（如果不能就为0）<br>
          <b>pending tp</b> - 退出膨胀时获得的超光速粒子<br>
          <b>pending rm</b> - 即将获得的现实机器（如果不能就为0）<br>
          <b>pending glyph level</b> - 即将获得的符文等级（如果不能就为0）<br>
          <b>dt</b> - 当前膨胀时间数量<br>
          <b>tp</b> - 当前超光速粒子数量<br>
          <b>rg</b> - 当前复制器星系数量（不要用科学记数法）<br>
          <b>rep</b> - 当前复制器数量<br>
          <b>tt</b> - 当前时间之理数量<br>
          <b>total tt</b> - 总共的时间之理，包括各种形式生成的和购买研究消耗的<br>
          <b>spent tt</b> - 购买研究花费的时间之理<br>
          <b>total completions</b> - 永恒挑战的总完成次数<br>
          <b>pending completions</b> - 本次永恒即将完成的永恒挑战次数<br>
          <b>ec<u>X</u> completions</b> - 某个单一的永恒挑战的完成次数<br>
          ${filterText}
          ${stText}
        `;
      }
    },
    {
      id: 18,
      isUnlocked: () => true,
      keyword: "比较格式",
      category: 4,
      syntax: "<u>资源1</u> <u>条件</u> <u>资源2</u>",
      description: `
        比较语句用于特定指令中，允许你根据游戏当前状态控制自动机的行为。其标准格式包含两个数值输入和一个比较运算符，但数值输入可以是一切内容，只要整体格式正确即可。`,
      sections: [
        {
          name: "条件",
          items: [
            {
              header: "<i>资源</i>",
              description: `
                此内容可以是任意自动机货币、定义的常量，或必须以科学记数法格式书写的数字（例如 1000、1e100、1.8e308）。与大多数通用编程语言不同，此处必须为单个值（即不支持诸如“ip + pending ip”之类的数学表达式）。
              `
            },
            {
              header: "<i>条件</i>",
              description: `
                此内容必须为不等式运算符（<、<=、>、>=），采用通常的数学含义。不允许使用相等运算符（==、!=），因为游戏的数值特性意味着数字通常不会完全相等，基于直接相等进行检查可能导致意外的脚本行为。
              `
            },
          ]
        }
      ],
      examples: [
        "ep < 1e20",
        "total tt > 14000",
      ]
    },
    {
      id: 19,
      isUnlocked: () => true,
      keyword: "内部块的指令",
      category: 4,
      syntax: `<b>标题指令</b> {<br>
        <blockquote>内部块</blockquote>
        }`,
      description: `一些指令关联着一个“内部块”指令集合。该内部块可以包含任何其他有效指令，但其是否实际执行取决于执行 <b>标题指令</b> 时的游戏状态。这允许你重复执行某些指令（例如购买时间研究），或完全跳过它们（例如，若永恒挑战已完成则不再进入）。若需要，这些块可以嵌套，内部块可置于彼此之中。  
<br><br>  
在文本编辑器模式中：使用花括号指定内部块，左花括号 { 与比较语句位于同一行，右花括号 } 单独置于块内最后一行之后。内部指令无需缩进，但缩进有助于视觉清晰。  
<br><br>  
在块编辑器模式中：这些指令附带一个空的虚线矩形，指示内部块包含哪些指令。后续块可拖拽至该虚线矩形内。
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
        }`
      ]
    },
  ],
  otherAutomatorPoints: [
    {
      name: "现实次数",
      automatorPoints: () => 2 * Math.clampMax(Currency.realities.value, 50),
      shortDescription: () => `每进行一次现实后 +${formatInt(2)}, 最多 ${formatInt(50)} 次现实`,
      symbol: "Ϟ",
    },
    {
      name: "黑洞",
      automatorPoints: () => (BlackHole(1).isUnlocked ? 10 : 0),
      shortDescription: () => `解锁后获得 ${formatInt(10)} 自动点数`,
      symbol: "<i class='fas fa-circle'></i>",
    },
  ],
  templates: automatorTemplates
};
