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
                如果存在该指令，自动机将在继续执行后续指令前尽可能多地购买时间研究。默认情况下（即不含“nowait”时），此命令会无限重复执行当前行，直到预设中的所有研究全部被购买；若不加注意，可能导致自动机永久卡死。
              `
            },
            {
              header: "<i>study_list</i>",
              description: `
 此处支持导出的时间研究树格式，即用逗号分隔的时间研究编号列表。此命令还支持更灵活的格式，允许使用研究范围（例如 <u>11-62</u>）及以下别名（注意只能使用英文）：<br>
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
      description: `开始指定的永恒挑战或膨胀永恒。这条指令还会尝试解锁尚未解锁的永恒挑战，但不会自动解锁时间膨胀（请使用 UNLOCK 指令来完成）。若你已在指定的永恒挑战或膨胀永恒中，再次运行此命令将不会执行任何操作；否则，自动机会持续尝试开始永恒直到成功。`,
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
      description: `开启或关闭重置自动购买器，并允许你更改其设置。如果未指定设置选项，此命令将切换自动购买器的状态（开启时关闭，关闭时开启）。<b>如果你尝试修改尚未拥有的自动购买器或设置，这条指令将不会生效。</b>`,
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
      syntax: "<b>black hole</b> <u>state</u>",
      description: `Toggles the speedup effect from the Black Hole on or off. Turning the Black Hole on via the
        Automator does not bypass the gradual acceleration from off to max speed which occurs before they are
        permanent.`,
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
      syntax: "<b>store game time</b> <u>action</u>",
      description: `Changes whether or not the Black Hole is storing time. Also allows usage of stored time.`,
      sections: [
        {
          name: "ACTIONS",
          items: [
            {
              header: "<i>on</i> | <i>off</i>",
              description: `
                Turns storing game time on or off.
              `
            },
            {
              header: "<i>use</i>",
              description: `
                Uses all stored game time. Does not alter the on/off state of time storage.
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
      syntax: "<b>notify</b> \"<u>text</u>\"",
      description: `Takes the specified text and posts it in the top-right corner as
        a text notification, in the same spot and style as other notifications such as auto-save
        and achievement/upgrade unlocks. Can be useful for seeing automator status while
        on tabs other than the Automator tab.`,
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
      syntax: "<b>#</b> text<br><b>//</b> text",
      description: `Allows you to leave a note to yourself within your script. This may be
        useful for organizing or keeping track of which parts of your script do various things,
        in a way that appears more readable than just the commands. These commands mainly serve as a tool to
        help you keep the steps of your scripts easier to follow if desired.`,
      sections: [
        {
          name: "说明",
          items: [
            {
              header: "<i>行内注释</i>",
              description: `
                The Automator does not support comments which are placed after an already functional
                line of code, on the same line. As an example, the single line "studies load name TDI // Load push"
                will be an invalid command. In this case, you will need to move the comment to a separate line
                in the automator.
              `
            },
            {
              header: "<i>执行速度</i>",
              description: `
                Having comments will not slow down your script, as they are completely skipped during
                execution and do not count as a command for the purposes of running. For example, even if you have
                a really long explanation in the form of comments on lines 20-40, the Automator will still
                <i>immediately</i> skip from line 19 to 41 during execution.
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
      syntax: "<b>wait</b> <u>condition</u>",
      description: `Forces Automator to wait for some condition or event. To wait for a certain duration of time,
        use the PAUSE command instead.`,
      sections: [
        {
          name: "可能的条件",
          items: [
            {
              header: "<i>比较</i>",
              description: `
                Wait until the comparison statement is true. Check the entry for "Formatting Comparisons" for details
                on how to properly input this option.
              `
            },
            {
              header: "<i>重置</i>",
              description: `
                Wait until the specified prestige (Infinity, Eternity, or Reality) has been triggered by its respective
                Autobuyer. This must happen <i>after</i> this command is reached; if the Autobuyer triggers
                <i>before</i> the command is reached, your script may get stuck.
              `
            },
            {
              header: "<i>黑洞（状态）</i>",
              description: `
                Wait until the Black Hole(s) are in the specified state. Valid inputs for state are
                "off", "bh1", and "bh2", corresponding to no active Black Hole(s), at least the first Black Hole active,
                and both Black Holes active.
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
      syntax: "<b>pause</b> <u>interval</u>",
      description: `Tells the automator to stop moving forward and executing commands for a certain amount of time.
        Note that if the pause duration is shorter than the automator's execution speed, the automator will wait until
        the next execution tick before moving on.`,
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
              description: `This command accepts time units of milliseconds ("ms"), seconds ("s", "sec", or "seconds"),
                minutes ("m", "min", or "minutes"), and hours ("h" or "hours"). You cannot provide just a number and
                nothing else; a unit of time must be specified.`,
            },
            {
              header: "<i>定义的常量</i>",
              description: `A defined constant may be used instead, see the definition panel. The defined value will
                be assumed to be in units of seconds.`
            },
          ]
        },
        {
          name: "其他",
          items: [
            {
              header: "<i>离线的边缘效应</i>",
              description: `This command may behave undesirably when it runs during offline progress due to limited
                tick count. A 1-second pause that is usually 20-30 ticks might be only 1 game tick when processing
                hours of offline progress, which might not be enough for the resources needed for the rest of the
                script.`,
            },
            {
              header: "<i>类似指令</i>",
              description: `Using another command like 'WAIT' will allow you to set it for a certain resource amount,
                in order to ensure that the game has the proper state before moving onward.`
            },
            {
              header: "<i>手动跳过</i>",
              description: `You can manually force the Automator to continue execution past a PAUSE command without
                waiting the entire specified time by stepping forward one line (to put it on the next one) and then
                resuming execution. If you find yourself doing this regularly, consider modifying your script.`
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
      syntax: `<b>if</b> <u>condition</u> {<br>
        <blockquote>commands</blockquote>
        }`,
      description: `Defines an inner block of block of the automator script which will only be executed if the specified
        comparison is true when this line is reached. If the comparison is false, the automator will instead skip to the
        first line after the block and continue execution from there.`,
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
      syntax: `<b>until</b> <u>comparison</u> {<br>
        <blockquote>commands</blockquote>
        }<br><b>until</b> <u>prestige_event</u> {<br>
          <blockquote>commands</blockquote>
        }`,
      description: `Defines an inner block of the script where commands are repeated; the comparison is checked at the
        start and every time the loop repeats. If the condition is true when the UNTIL statement is first reached, the
        inner block of commands will be skipped entirely.
        <br><br>
        If an prestige event (ie. Infinity, Eternity, or Reality) is specified instead of a condition, then the block
        will always be entered and the commands within the block will repeat until the event occurs for the first time
        <i>after</i> entering the block. Note that the Automator will finish the rest of the loop and then exit after
        the prestige event occurs - it will not immediately exit the loop in the middle.`,
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
      description: `Defines an inner block of the script where commands are repeated; the comparison is checked at the
        start and every time the loop repeats. If the condition is false when the WHILE statement is first reached, the
        inner block of commands will be skipped entirely.`,
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
      description: `When the Automator runs this line, it will stop execution as if you clicked the
        <i class="fas fa-stop"></i> button on the control panel in the top-left of the Automator. This
        does not need to be placed at the end of every script in order to stop them, as turning off the
        <i class="fas fa-sync-alt"></i> option on the left panel will do this automatically.
        This command may be useful when used inside of an IF command, in order to stop execution
        only under certain conditions.`,
      examples: [
        `stop`,
      ]
    },
    {
      id: 17,
      isUnlocked: () => true,
      keyword: "货币列表",
      category: 4,
      syntax: "<i>You can use these in any IF, WHILE, UNTIL, or WAIT command</i>",
      description: () => {
        const filterText = EffarigUnlock.glyphFilter.isUnlocked
          ? `<b>filter score</b> - 筛选积分，Glyph filter score of the Glyph which your filter will select this Reality<br>`
          : "";
        const stText = V.spaceTheorems > 0
          ? `<b>space theorems</b> - 空间之理，Current unspent Space Theorem amount<br>
            <b>total space theorems</b> - 总共的空间之理，TOTAL Space Theorems, including ones spent on current Studies<br>`
          : "";
        return `This is a list of "currencies" or numbers that you can use within the Automator.<br>
          Note that when used, most currencies will need to be in scientific notation.<br>
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
      keyword: "格式化的比较",
      category: 4,
      syntax: "<u>资源1</u> <u>条件</u> <u>资源2</u>",
      description: `
        Comparisons are used within certain commands, which allow you to control the behavior of the automator based
        on the game's current state. They have a standard format with two value inputs and a comparison operator, but
        the value inputs can be anything as long as it is formatted correctly overall.`,
      sections: [
        {
          name: "条件",
          items: [
            {
              header: "<i>资源</i>",
              description: `
                This can be any Automator Currency, a defined constant, or a number which must be formatted in
                scientific notation (eg. 1000, 1e100, 1.8e308). Unlike more general programming languages, this must
                be a single value (ie. math expressions such as "ip + pending ip" are not allowed).
              `
            },
            {
              header: "<i>条件</i>",
              description: `
                This must be an inequality operator (<, <=, >, >=), which takes on its typical mathematical meaning.
                Equality operators (==, !=) are not allowed, as the nature of the game means that numbers will often
                never be exactly equal and thus checking based on direct equality may lead to unexpected script
                behavior.
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
      syntax: `<b>header_command</b> {<br>
        <blockquote>inner_commands</blockquote>
        }`,
      description: `Some commands are associated with an "inner block" of commands. This inner block can contain still
        contain any other valid command, but may or may not actually get executed based on what the state of the game is
        when <b>header_command</b> is executed. This allows you to repeat some commands over and over (eg. Time Study
        purchasing), or to skip them entirely (eg. not entering an EC if it already has full completions). These blocks
        can be nested if desired, with inner blocks being placed within one another.
        <br><br>
        In the text editor mode: Specify the inner block with curly braces, with the opening brace { on the same line as
        the comparison and the closing brace } on its own line after the last line you want inside the block. Inner
        commands do not need to be indented, although it may be visually helpful to do so.
        <br><br>
        In the block editor mode: These commands come with an empty dotted rectangle which indicates which commands are
        within the inner block. Subsequent blocks can then be dragged inside the dotted rectangle.
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
