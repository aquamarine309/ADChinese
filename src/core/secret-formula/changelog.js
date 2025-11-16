export const changelog = [
  /**
   * @template
   * {
   *  @property {Array: Number} date  Date of the release of the update, stored in order of year-month-date.
   *  @property {String} name         Name of the update entry. Optional.
   *  @property {Number} id           Unique ID for each entry (generated in-game, not explicitly stated)
   *  @property {function: @return String} info  Text body of information for the entry.
   * }
   */
  {
    date: [2024, 8, 12],
    name: "Hi Ra",
    info: `
<b>新增内容：</b><br>
<ul>
<li>新增“SPENT TT”（消耗的时间之理）作为自动机货币</li>
<li>在天神符文外观套装中添加了第五天神的符号</li>
</ul>
<br>
<b>界面优化：</b><br>
<ul>
<li>优化了打破无限升级的文本描述</li>
<li>部分按钮增加圆角效果</li>
<li>新增始终使用\uE010黑洞动画的选项</li>
<li>调整了符文外观中第三天神的符号尺寸</li>
<li>无限维度和时间维度的购买按钮现在更不容易缩小</li>
<li>无限挑战奖励现在即使未完成也始终可见</li>
<li>解锁成就118且启用献祭自动购买器时，献祭按钮将被禁用</li>
</ul>
<br>
<b>问题修复：</b><br>
<ul>
<li>修复了黑洞脉冲在离线进度期间不生效的问题</li>
<li>修复了黑洞反转在禁用期间仍处于激活状态的问题</li>
<li>修复了黑洞反转滑块在禁用期间仍然可见的问题</li>
</ul>
<br>
`
  },
  {
    date: [2024, 5, 2],
    name: "祝贺安卓版现实更新",
    info: `
恭喜安卓现实版本更新发布！为庆祝这一重要里程碑，我们根据安卓版玩家的评论和反馈实施了以下主要改进：

<br>
<br>
<b><i>再次衷心感谢您游玩《反物质维度》！</i></b>
<br>
<br>
<b>主要更新：</b><br>
<ul>
<li>在鸣谢名单中添加新加入的 Android 测试人员</li>
<li>新增一项复兴节点</li>
</ul>
<br>
<b>新增便利性功能与信息：</b><br>
<ul>
<li>研究预设现在会在重新开始时保留，伴生符文也不会消失</li>
<li>交换了 cel2 和复兴商店的解锁顺序</li>
<li>时间研究 131 新增附加效果</li>
<li>自动购买器输入框现在支持回车键确认修改</li>
<li>成就 118 的奖励现在会强化献祭自动购买器</li>
<li>符文预设设置现在默认包含/提升等级</li>
<li>符文回收现在会根据现实自动购买器中的等级设置检查效果</li>
<li>新增模仿虚幻机器 40 的 cel7 升级</li>
<li>在标签修改弹窗中添加"显示所有标签"按钮</li>
<li>当自动永恒挑战因要求未满足被禁用时添加提示</li>
<li>新增交换符文符号与边框颜色的选项</li>
<li>新增现代 UI 界面可见资源切换功能</li>
<li>新增更灵活调整指数记数格式的弹窗</li>
<li>自动机现在会忽略黑洞禁用状态下的黑洞命令</li>
<li>永恒里程碑 1000 的要求现为在 5 秒或更短时间内永恒</li>
<li>退出永恒挑战时研究树现在会自动重置</li>
<li>禁用 cel7 中一项可重复购买的 TP 升级（因造成玩家困惑）</li>
<li>因上述升级删除，重新平衡了第五个裂痕的第三个里程碑</li>
<li>若干文本微调</li>
</ul>
<br>
<b>次要界面调整：</b><br>
<ul>
<li>为新 DAB 复兴节点调整复兴布局</li>
<li>确保符文展示弹窗中的排序顺序一致</li>
<li>新增浅色/深色符文稀有度色盲调色板</li>
<li>修复若干细微界面显示问题</li>
</ul>
<br>
<b>错误修复：</b><br>
<ul>
<li>修复协同放置模组的链接</li>
<li>修复时间维度标签页的提示文本</li>
<li>修复离线进度错误</li>
<li>修复弹窗中的符文稀有度颜色错误</li>
<li>修复自动机暂停命令计时错误</li>
<li>修复特定自动购买器输入导致的 NaN 显示错误</li>
<li>修复无 START 复兴的存档异常问题</li>
<li>修复时间研究 192 在禁用时导致控制台报错的问题</li>
<li>修正 cel7 膨胀弹窗中关于无法获得永恒点数的错误描述</li>
<li>修复自动机脚本中研究字符串的"!"解析问题</li>
<li>修复启用远距机械进程锁定时的"最大化所有时间维度"按钮异常</li>
<li>修复因内部格式变更导致的预设符文配置错误</li>
<li>修复选择"等级:提升"时预设未正确选取最高等级符文的问题</li>
<li>修复开启动画时进入 cel7 膨胀后残留计数未重置的问题</li>
<li>修复同时使用 EC! 功能和重置研究树时永恒挑战时间之理消耗计算错误</li>
<li>修复完全完成时常量数据未正确继承的问题，并迁移受此影响的存档数据</li>
<li>移除设计主题下重复的成就页面文本</li>
<li>防止离线进度超过选项菜单的 1e6 上限</li>
<li>修复本世纪最严重的拼写错误</li>
</ul>
<br>
`
  },
  {
    date: [2023, 7, 18],
    name: "最终官方补丁",
    info: `
自"现实更新"以来的所有补丁都以修复常见问题和实现高需求功能为目标。然而，本次更新将是最后一个官方补丁。后续可能针对此版本的漏洞/请求发布少量小补丁，但未来更新将不再保证且可能不提供更新日志。

<br>
<br>
<b><i>至此，游戏正式版已基本完成。衷心感谢您游玩《反物质维度》！</i></b>
<br>
<br>
<b>新增内容：</b><br>
<ul>
<li>导入时间研究配置时，若字符串包含 EC 并以"!"结尾，将立即进入永恒挑战</li>
<li>为大灾变场景添加膨胀和符文重置快捷键</li>
<li>Shift+点击现实按钮现在强制显示符文选择弹窗（无视设置）</li>
<li>新增 3 种复兴布局（方形/水平网格/距起始点距离）</li>
<li>可为部分现实/虚幻升级启用"升级锁定"，自动阻止不符合解锁条件的手动/自动操作</li>
<li>符文筛选设置现在支持文本导入导出</li>
<li>当筛选器不接受任何待选符文时，可设置为立即执行现实（自动购买器开启且条件满足时）</li>
<li>将空间之理（当前/总量）添加为自动机货币</li>
<li>新增禁用后台离线模拟功能（当游戏失去焦点或设备休眠时）</li>
<li>统计标签页新增存档创建时间信息</li>
<li>现会定期执行自动本地备份（类似安卓版）</li>
</ul>
<br>
<b>新增便利性功能与信息：</b><br>
<ul>
<li>游戏初始教程新增游戏指南重点提示</li>
<li>含奖励的成就左下角新增标识图标</li>
<li>无限/永恒自动购买器在"时间"或"最高X"模式下，设置框内新增下次触发状态提示</li>
<li>永恒挑战解锁后将在标签页持续显示（即使未完成就解锁了新挑战）</li>
<li>前几次现实中的资源追赶弹窗显示更详细</li>
<li>受 EU2 复兴影响的升级现显示更准确的价格文本</li>
<li>修复未选择符文时意外执行现实的漏洞（禁用选择弹窗后仍会随机选择）</li>
<li>现实重置记录现适时显示虚幻机器</li>
<li>更新澄清多项游戏指南条目</li>
<li>重置记录标签页新增更多显示选项</li>
<li>若干文本微调</li>
</ul>
<br>
<b>界面优化：</b><br>
<ul>
<li>维度购买次数提示现向左弹出（非向上）</li>
<li>现代 UI 的突破无限标签页图标更新</li>
<li>时间研究导入弹窗改为双列布局（减少滚动需求）</li>
<li>阐明时间研究 31 与其他升级的交互</li>
<li>永恒挑战新增完成次数视觉标识</li>
<li>现实重置弹窗在可获取奖励时新增强化警告</li>
<li>新增最近卸下符文的标识图标</li>
<li>新增"自动"符文背景色模式（随主题切换黑/白背景）</li>
<li>优化符文稀有度色彩对比度，新增基于稀有度/类型的装饰边框</li>
<li>特定情况下无法卸下符文时新增说明弹窗</li>
<li>鹿颈长符文效果现按"天神顺序"显示</li>
<li>全局等级削弱时，库存符文同步显示削弱后等级</li>
<li> cel4 标签页新增诅咒符文制作功能</li>
<li>新增禁用奇点里程碑按钮光效选项</li>
</ul>
<br>
<b>错误修复：</b><br>
<ul>
<li>修复切换存档时无限点数/永恒点数速率显示异常</li>
<li>禁止时间研究预设重名</li>
<li>修复膨胀状态下无限点数以下永恒按钮样式错误</li>
<li>修复无 START 复兴时的符文均匀性异常</li>
<li>修复部分符文信息色彩显示错误（误用背景色替代主题色）</li>
<li>禁止自动机在编辑器外使用撤销/重做功能</li>
<li>修复重置外观时音乐符文变回普通符文的问题</li>
<li>优化符文预设加载容错率</li>
<li>修复特定情况下 cel1 现实机器记录错误</li>
<li>修复符文筛选器稀有度比对异常</li>
<li>修复特定情况下 cel7 符文槽位显示异常</li>
<li>修复 cel6 图标错位问题（鸣谢 @mrkrutaman）</li>
<li>已购买的符文外观禁止重复购买</li>
<li>修复休眠离线时间未提供实时资源的问题</li>
<li>休眠离线模拟现正确应用离线时间设置</li>
<li>新增部分缺失的快捷键提示</li>
<li>修复标准记数法的大整数显示问题</li>
<li>移除含失效链接的新闻播报</li>
<li>若干细节修复</li>
</ul>
<br>
`
  },
  {
    date: [2023, 5, 25],
    name: "Multiplier Tab, Automator, and Major mechanics fixes",
    info: ` 
<li>新增复制器速度加成分解专用标签页</li>  
<li>效果值现可显示为等效乘数值</li>  
<li>反物质维度标签页在挑战12中启用特殊机制</li>  
<li>通用类别（如"成就"或"时间研究"）即使仅含单项仍可展开</li>  
<li>膨胀时间削弱效果不再影响加成分解标签页内的游戏速度</li>  
<li>单项升级条目措辞更统一</li>  
<li>补充大量遗漏效果并修正错误标签</li>  
</ul>  
<br>  

<b>自动机功能：</b><br>  
<ul>  
<li>右上角自动机通知现启用独立配色</li>  
<li>页面刷新时常量保持固定排序</li>  
<li>新建脚本默认强制名称唯一</li>  
<li>NOTIFY指令新增支持单引号及混合引号</li>  
<li>新增单常量删除按钮及批量删除按钮</li>  
<li>新增撤销/重做功能</li>  
<li>支持将研究预设批量导入为自动机常量</li>  
<li>新增等待下次黑洞1/2激活功能</li>  
<li>新增STOP指令可立即终止脚本</li>  
<li>可用当前符文选项最高筛选分作为比较变量</li>  
</ul>  
<br>  

<b>自动机问题修复：</b><br>  
<ul>  
<li>模块转文本时减少错误行误删</li>  
<li>修复模块嵌套变动时后续模块内容清空问题</li>  
<li>修复自动机偶发运行错误脚本导致崩溃</li>  
<li>修正常量与内置关键词比对异常</li>  
<li>修复执行REALITY指令后首行跳过问题</li>  
<li>修正文本编辑器语法高亮错误</li>  
<li>修复完全通关后部分资源未重置问题</li>  
</ul>  
<br>  

<b>游戏机制修复：</b><br>  
<ul>  
<li>暗能量湮灭后不再重置</li>  
<li>物品栏空位不足5格时禁止<strong>毁灭现实</strong>操作</li>  
<li>"提纯至上限后献祭"模式在关联资源锁定时仍执行献祭</li>  
<li>离线达成条件时正确解锁隐藏成就46</li>  
<li>存储现实时间不再阻断自动购买器运行</li>  
<li>修复从符文页退出天神现实时弹窗异常及崩溃</li>  
<li>速通模式内购标识更新更稳定</li>  
<li>修正因强化导致的现实按钮预期理值显示错误</li>  
<li>修复黑洞偶发永久休眠问题</li>  
<li>修正符文撤销时负数量更新异常</li>  
<li>符文清理弹窗现可准确统计相同符文</li>  
<li>修复符文清理弹窗偶发不显示问题</li>  
<li>修正新符文随机机制与负种子值的兼容问题</li>  
<li>修复强化现实后符文随机种子未推进问题</li>  
</ul>  

<br><b>其他改动：</b><br>  
<ul>  
<li>批量献祭符文清理弹窗新增确认选项</li>  
<li>优化特定条件下导入存档的界面响应</li>  
<li>特蕾莎的永恒升级现支持追溯生效</li>  
<li>离线时间间隔下限从50ms调整为33ms</li>  
<li>设备休眠导致的"离线"进度现按离线时间模拟（非单次大间隔计算）</li>  
<li>离线/休眠最大时长从6小时延长至24小时</li>  
<li>特蕾莎增益商店文本描述标准化</li>  
<li>调整薇导航条目定位防止文本重叠</li>  
<li>AMOLED主题现适配致谢列表配色</li>  
<li>修复解锁黑洞时成就142未触发问题</li>  
<li>修正现实符文外观颜色处理异常</li>  
<li>退出时间膨胀弹窗在非膨胀状态下不再误显</li>  
<li>若干文本细节及拼写修正</li>  
</ul>
`
  },
  {
    date: [2023, 4, 7],
    name: "Speedrunner and Glyph RNG",
    info: `
<b>Major Changes:</b><br>
<ul>
<li><b>Glyph RNG for Realities 2-21 has been completely overhauled.</b> The new RNG now attempts to give
you a much more even spread of effects during these Realities; for each group of 5 consecutive Realities,
you will now see every Glyph type exactly 4 times and every individual effect will always appear <i>at least once</i>
amongst those 4 choices.
</li>
<li>Two side effects of the above change: 2-effect glyphs are now a fair bit more common
(about 30% more common for replication and dilation and 140% more common for the other three) and the Glyph options for
your <i>current</i> Reality may have changed when first loading up this version of the game.</li>
<li>Starting a speedrun save now properly carries over all the other stats which would have normally carried over after
finishing the game</li>
<li>Previous speedrun records are now also stored in the save and can now be compared on a newly-added subtab</li>
<li>Glyph RNG seed can now be modified in-game during a speedrun, as long as you have not realitied yet</li>
<li>Credits page was updated to include people recently brought on for testing the Reality update on Android</li>
<li>The "Total Termination" upgrade now affects <i>all</i> Glyph types</li>
</ul>
<br>

<b>New QoL/features:</b><br>
<ul>
<li>Real time (in stats) is now paused after gaining the final achievement</li>
<li>Perk tree interactivity has been made generally more responsive</li>
<li>Added two new default perk tree layouts (an Android-version grid and \uE010)</li>
<li>Eternity autobuyer now only triggers at full completion count with ECB perk instead of immediately</li>
<li>Added a button to reset all individual Glyph cosmetics</li>
<li>Added a confirmation modal for exiting challenges using the header button</li>
<li>Shift-clicking the icon on the Glyph filter now bumps it to the next <i>lower</i> threshold</li>
<li>Glyph presets now have 2 additional slots (5 => 7)</li>
<li>Added time estimates for reaching max Replicanti and Dilated Time this Reality</li>
<li>Hovering over the dilation button now shows all time estimate tooltips at once</li>
<li>Clicking already-bought dilation studies now moves you over to the appropriate related tab</li>
<li>All progress-locked options now remain permanently modifiable after full game completions</li>
</ul>
<br>

<b>Improved UI/Layout:</b><br>
<ul>
<li>Speedrun time formatting now has 3 hour digits and suppresses END formatting on some subtabs</li>
<li>Improved autobuyer textbox contrast on some themes</li>
<li>Reality header in stats tab now shows cel7-related stats as well</li>
<li>Clarified how Relic Shard rarity boost and cursed Glyphs work</li>
<li>Added %/sec to ID8 when relevant</li>
<li>Added TT to offline progress entries</li>
<li>Added BH cost scaling to its H2P entry</li>
<li>Changed AD Dimension purchase buttons to be stylized like cel6 when Continuum is active</li>
<li>Improved light/dark TS contrast between buyable and bought states</li>
<li>Speedrun widget now takes up less screen space when collapsed</li>
<li>Other various minor text fixes</li>
</ul>
<br>

<b>Bugfixes:</b><br>
<ul>
<li>Fixed buggy Glyph set names from reskinned Companion Glyphs</li>
<li>Fixed broken external links in "About the game"</li>
<li>Fixed AD autobuyer settings being unmodifiable in some cases</li>
<li>Fixed some display bugs with fractional Infinity/Eternity count</li>
<li>Recent prestige tab now properly accounts for amplification</li>
<li>Fixed subtab switching when switching game saves</li>
<li>Fixed Replicanti estimate not accounting for update rate correctly in some cases</li>
<li>Fixed Transience of Information not calculating its RM requirement correctly</li>
<li>Various more minor bugfixes</li>
</ul>
`
  },
  {
    date: [2023, 2, 22],
    name: "Visuals and Code prep",
    info: `
<b>Big Changes:</b><br>
<ul>
<li>Cloud saving now only saves one slot at a time and does so every 10 minutes instead of every 5.
  <b>If you are using the Cloud, please back up your saves locally just in case. This was hard to thoroughly
  test and we don't want you to lose your saves.</b></li>
<li>Please update your theme to v10 for the best user experience (added a new secret theme)</li>
<li>Blobs now have color in the font file</li>
<li>Changed recent prestige page to be an organized table with more information</li>
<li>Multiversal effect should no longer cause a UI softlock if the game processes too slowly</li>
<li>Lots of changes on the backend and Github repository in preparation for making the game open-source</li>
</ul>
<br>

<b>New QoL/features:</b><br>
<ul>
<li>5xEP now always triggers before TD autobuyers</li>
<li>Added time and relic shard modes for auto-reality</li>
<li>Added tracking for total time across full game completions</li>
<li>Changed some default player properties to make poor game behavior less likely</li>
<li>Added an option to invert generated/total TT in study tab</li>
<li>Expanded info for optimizing prestige for resource/time</li>
<li>Added a new animation for inverted black holes</li>
</ul>
<br>

<b>Improved UI/Layout:</b><br>
<ul>
<li>Fixed option dropdown being blurry on some browsers</li>
<li>Fixed some numbers being formatted with the wrong number of decimal places or not using notation</li>
<li>Added text for unequippable glyphs in cel7</li>
<li>Further clarified game/real time behavior in various places</li>
<li>TS21 now shows its effect as a multiplier</li>
<li>Increased contrast on reality upgrade buttons</li>
<li>Made ACHNR perk behave more consistently</li>
<li>Updated some entries in the credits</li>
<li>Added max DT this reality</li>
<li>Fixed a lot of things not being visually disabled in cel7</li>
<li>Many more minor fixes</li>
</ul>
<br>

<b>Bugfixes:</b><br>
<ul>
</li><li>Fixed Modern sidebar resource rounding incorrectly
</li><li>Fixed automator errors on post-completion new games
</li><li>Fixed some news entry stats not being updated properly
</li><li>Fixed news repeat buffer not working
</li><li>Updated progress-locking conditions for some news messages
</li><li>Fixed edge cases for secret achievements 12 and 42
</li><li>Fixed cel5-3 memories having the wrong name in offline progress
</li><li>Fixed Dilated runs not giving EP or being tracked in records
</li><li>Fixed replicanti time being incorrect in cel7
</li><li>Fixed hotkeys allowing autobuyers to be changed even when locked
</li><li>Fixed Continuum H2P entry disappearing in cel7
</ul>
`
  },
  {
    date: [2023, 1, 26],
    name: "Timewall Reduction",
    info: `
<b>Balance Changes:</b><br>
<ul>
<li>EC4 infinity requirement scales slower (50M => 25M per tier)</li>
<li>EC11 goals have been reduced by e50 on all tiers</li>
<li>Improved visibility for cel3 hints (progress is now always visible and accumulates 10x faster)</li>
<li>Made BH auto-pulse always force charging at 99%, removed adjustability for charge rate</li>
<li>Momentum grows 2.5x faster</li>
<li>Reduced final singularity milestone (8e45 => 2.5e45)</li>
<li>Speedruns now also start with achievements 35 and 76</li>
</ul>
<br>

<b>New Quality-of-Life:</b><br>
<ul>
<li>Made TS tree import text persist between closing the modal</li>
<li>Added "Respec and load" buttons/options for TS loading</li>
<li>Added "Sort by Level" to glyph inventory</li>
<li>Auto-EC now holds (but doesn't complete) the next one when paused</li>
</ul>
<br>

<b>Bugfixes:</b><br>
<ul>
<li>Modern-Metro themes now have the correct AD color</li>
<li>Cloud save conflict option buttons now work properly</li>
<li>"Buy 10" multiplier now always shows</li>
<li>Crunch modal no longer shows up pre-break with hotkeys</li>
<li>Next EC rewards now show "Next:" even when capped</li>
<li>EC requirements no longer scale up after max completions</li>
<li>Fixed Companion Glyph still counting as a glyph in some cases (LE, nav, achievements)</li>
<li>Fixed black hole-related achievements not affecting displayed interval/duration</li>
<li>Cel5 times now account for storing real time</li>
<li>Cel6 text now updates properly after destabilization</li>
</ul>
<br>

<b>Minor Changes:</b><br>
<ul>
<li>Improved Cloud conflict detection (eternities in early eternity and max DT in dilation)</li>
<li>Added ability to hide Google info when Cloud saving</li>
<li>Added "Common Abbreviations" to H2P</li>
<li>Added max replicanti text</li>
<li>Reduced IP/min and EP/min hiding thresholds on prestige buttons</li>
<li>Added an outline for fully-completed EC studies</li>
<li>Added cel3 icon to cosmetics</li>
<li>Made paperclips less invisible</li>
<li>Fixed more minor typos and made many minor wording improvements</li>
</ul>
`
  },
  {
    date: [2023, 1, 9],
    name: "The Companion Glyph doesn't want to hurt you",
    info: `
<b>Mechanic Changes:</b><br>
<ul>
<li>Buffed Break Infinity passive infinity generation upgrade (Cap is now once per 100ms instead of
  165ms and is reached at a fastest of 50ms instead of 33ms)</li>
<li>Limited offline ticks to a minimum length of 50ms</li>
<li>The Companion Glyph no longer counts as a Glyph for the purposes of Glyph-based requirements</li>
</ul>
<br>

<b>Bugfixes:</b><br>
<ul>
<li>Fixed EM6 being disabled even if EM200/EM1000 are still locked</li>
<li>Fixed EM200 applying when auto-eternity is in the wrong mode</li>
<li>Made EU1 apply properly on-purchase</li>
<li>Made EU2 always check before EP-based autobuyers trigger</li>
<li>Fixed being able to enter cel7 while in another celestial reality</li>
<li>Fixed autobuyers being unmodifiable in early cel7</li>
<li>Fixed ECB using current IP instead of max IP</li>
<li>Cleared New! notifications upon loading different saves</li>
<li>Fixed IC5 erroneously applying C9 effect to tickspeed cost</li>
</ul>
<br>

<b>Text Changes:</b><br>
<ul>
<li>Added warning for lag in animated themes</li>
<li>Fixed incorrect text on references to the IP formula</li>
<li>Clarified ach156 only applying to generated TT</li>
<li>Updated some slightly out-of-date How To Play entries</li>
<li>Added additional info to Glyph Filter and Alchemy in H2P</li>
<li>Reworded DT mult from replicanti glyph effect to not use very small numbers</li>
<li>Improved Perk wording consistency</li>
<li>Fixed a few spots with unformatted and/or unblinded numbers</li>
<li>Fixed various punctuation inconsistencies</li>
<li>Made Big Crunch autobuyer always show interval, even if below update rate</li>
<li>Moved EC8 ID purchase count nearer to the top of the page</li>
<li>Added "approximately" to replicanti timer at low amounts</li>
<li>Made AG button text account for achievements which stop certain resources from being reset</li>
<li>Added text in a few places for capped upgrades/effects</li>
<li>Added news ticker suggestions up to Dec 26th, fixed some incorrect news tickers</li>
</ul>
`
  },
  {
    date: [2022, 12, 21],
    name: "First Post-release Patch",
    info: `
<b>Various Miscellaneous Changes:</b><br>
<ul>
<li>Fixed NC6 not actually spending lower dimensions when purchasing upgrades</li>
<li>Changed matter scale text ("If every antimatter were...") to only change once per second</li>
<li>Fixed some text overflow issues in IC3 and reality upgrades</li>
<li>Reworded reality reminder text</li>
<li>Fixed Alt-T hotkey not working before completing tickspeed challenge</li>
<li>Fixed glyph tooltips not appearing in a certain secret theme</li>
<li>Made clicking challenge header switch to the tab of the innermost challenge</li>
<li>Changed EU1 perk to apply to all forms of eternity gain, not just manual ones</li>
<li>Fixed some bugs related to achievement Bulked Up</li>
<li>Fixed various typos</li>
<li>Rolled back styling change for unpurchasable upgrades on dark themes</li>
<li>Fixed ID/TD multiplier tabs disappearing within EC11</li>
<li>Fixed a game crash when attempting to run empty or invalid automator scripts</li>
<li>Fixed a few bugs in celestial content</li>
</ul>
`
  },
  {
    date: [2022, 12, 17],
    name: "The Reality Update",
    info: `
<b>MAJOR STUFF:</b><br>
<ul>
<li>The Reality prestige layer.</li>
<li>Added Glyphs.</li>
<li>Added Reality Upgrades.</li>
<li>Added Perks.</li>
<li>Added an Automator.</li>
<li>Added a Black Hole.</li>
<li>Added Celestials.</li>
<li>Added a new Modern UI style. The Old UI style is still available as Classic UI.</li>
<li>Added modals to replace browser alerts, confirmations, and prompts.</li>
<li>Added a How to Play modal with much more detail compared to the old How to Play.</li>
<li>Added 5 new rows of achievements.</li>
<li>Added a Multiplier Breakdown subtab.</li>
<li>Added more Nicolas Cage.</li>
<li>Cloud saving is now available to everyone. This needs your Google account.</li>
<li>Shop tab is now available to everyone.</li>
<li>Redesigned overall UI styling.</li>
<li>\uE010</li>
<li>Rewrote the game UI using the Vue.js framework, significantly improving performance, stability,
  and code maintainability.</li>
<li>Added a speedrun mode.</li>
</ul>
<br>

Options and Accessibility:
<ul>
<li>Added a content summary modal to help players remember older game mechanics after a long time away.</li>
<li>Added more keyboard shortcuts.</li>
<li>Added more confirmations. (can be turned off in options)</li>
<li>Added animations for Eternity and Dilation. (can be turned off in options)</li>
<li>Added more community news and new AI news. (generated by AI using data from suggestions by community)</li>
<li>Added a tutorial glow effect and icon to some buttons when first starting the game.</li>
<li>Added a dropdown menu for easier selection of themes and notations.</li>
<li>Added secret number of secret themes, all of which are no longer case sentitive.</li>
<li>Unlocked secret themes are now permanently available to select from the dropdown.</li>
<li>Added more notations.</li>
<li>Added options to import and export saves from files.</li>
<li>Added a max all Infinity Dimensions button.</li>
<li>Added a button to minimize TT shop.</li>
<li>Added 3 more study tree save slots. (total of 6)</li>
<li>Added a blob.</li>
<li>Added the ability to edit existing study tree slots.</li>
<li>Added a modal for automatic selection of study tree paths when shift-clicking.</li>
<li>Added a line of text on the IC tab telling "All Infinity Challenges unlocked" when all ICs are unlocked.</li>
<li>Added a line of text on the EC tab telling that how many ECs are unlocked.</li>
<li>Added options for adjusting save frequency and displaying time since last save.</li>
<li>Added the ability to name your save file.</li>
<li>Entries in away progress can now be individually shown or hidden.</li>
<li>Added the ability to hide tabs and subtabs.</li>
<li>Added options for adjusting offline progress behavior.</li>
<li>Added an option to automatically switch tabs on some events.</li>
<li>Added options to adjust news ticker scroll speed and repetition.</li>
<li>Added IDs for Challenges and Achievements. (can be turned off in options)</li>
<li>Added more progress bar information. (EC goal, progress in Dilation until TP gain)</li>
<li>Added an option to turn off dynamic amount in autobuyers.</li>
<li>Added a display showing you what type of Infinity/Eternity/Reality you are in, such as Dilation or Challenges</li>
<li>You can now press other hotkeys while holding down a hotkey without interrupting the held hotkey.</li>
<li>Info displays are now visible by default. (can be turned off in options)</li>
<li>Improved import save modal by adding resouce information and offline progress mode selection.</li>
<li>Number input fields may now have input assistance depending on your browser. (such as up and down arrows
  on the side)</li>
<li>Resetting the game now requires inputting a specific phrase in order to prevent accidental resets.</li>
</ul>
<br>

Wording and Layout Changes:
<ul>
<li>Changed "Dimension Shift" to "Dimension Boost".</li>
<li>Changed "Infinitied stat" to "Infinities".</li>
<li>Changed "free galaxy" to "Tachyon Galaxy".</li>
<li>Tickspeed now displays as a X/sec rate instead of a very small fraction X/Y tick time.</li>
<li>Changed various texts for better clarity.</li>
<li>Moved Autobuyers subtab to a new Automation tab and added additional controls for other Autobuyers to the tab,
  such as Infinity Dimension and Replicanti autobuyers.</li>
<li>Added subsections in the Statistics subtab.</li>
<li>Footer links have been moved to the new How to Play and About the Game modals.</li>
<li>Changed some Achievement names and pictures.</li>
<li>Changed some secret Achievement name and requirements.</li>
<li>The cost of bought Infinity upgrades is now hidden.</li>
<li>The "BREAK INFINITY" button is now visible (but locked) even before Automated Big Crunch interval is 0.1s.</li>
<li>Improved text for post-break cost scaling upgrades.</li>
<li>The exit Challenge button is now hidden when the player is not in a challenge.</li>
<li>Eternity Challenges now show their current reward as well as the reward for the next completion.</li>
<li>Having Eternities no longer prevents the Infinity animation from playing.</li>
<li>Added colors to the Crunch/Eternity buttons when you have more than e50 of IP/EP; the color shows if you gain less
  (red), around same (white), or more (green) IP/EP than you currently have.</li>
<li>Moved study 33 to right side.</li>
<li>Changed "Normal Dimensions" to "Antimatter Dimensions".</li>
<li>Changed "Challenges" to "Normal Challenges".</li>
<li>Fixed some tpyos.</li>
</ul>
<br>

New Upgrades and Improved Technical Behavior:
<ul>
<li>Autobuyers are now unlockable before Infinity with antimatter, but can only be upgraded after completing their
  respective Challenges.</li>
<li>Added a new Infinity upgrade for 1e3 IP that gives you 50% of your best IP/min without using Max All,
  while offline.</li>
<li>Added a new Eternity milestone that gives you 25% of your best EP/min while offline.</li>
<li>Added another 2 new milestones that give you Infinities and Eternities while offline.</li>
<li>The "Infinity Point generation based on fastest Infinity" upgrade now takes all IP multipliers into account.</li>
<li>Tickspeed calculation is now dynamic, updating immediately instead of requiring an upgrade to be purchased.</li>
<li>You can buy multiple RG at once if you have enough replicanti; you are no longer limited to one per game tick.</li>
<li>Improved Time Dimension Max all behavior.</li>
<li>Normal and Infinity Challenges now give rewards after Big Crunch.</li>
<li>The Eternity autobuyer can now trigger when you have reached the EC goal, regardless of the settings.</li>
</ul>
<br>

Balance Changes:
<ul>
<li>NC10, 11, and 12 now unlock after 16 Infinities</li>
<li>Each Achievement grants an additional 1.03x multiplier to Antimatter Dimensions.</li>
<li>The Big Crunch Autobuyer's initial interval has been halved, requiring only half as much IP to max out, and
  other autobuyers have drastically lowered initial intervals.</li>
<li>The 500 IP Infinity upgrade now costs 300 IP.</li>
<li>Nicolas Cage.</li>
<li>The 20-eternities milestone was moved to 8-eternities.</li>
<li>Increased cost scaling for Time Dimensions after 1e6000.</li>
<li>TS 83 has been hard capped.</li>
<li>EC10 reward for less than 5 completions has been nerfed (reward at 5 completions is the same).</li>
<li>Lowered the Dilation unlock requirement from 13000 to 12900 total TT.</li>
<li>TP gain amount in Dilation is now calculated based on the highest AM reached.</li>
<li>Purchasing the study to unlock Dilation now requires a 23rd row study purchase.</li>
<li>Changed the condition of IC1 (now it just applies Challenge restrictions, instead of running them).</li>
<li>Changed the unlock conditions of IC2 (from 1e5000 to 1e10500) and IC6 (from 1e20000 to 1e22500).</li>
<li>Changed the goal of IC1 (from 1e850 to 1e650).</li>
<li>Changed the goal of IC5 (from 1e11111 to 1e16500).</li>
<li>Added reward to "I forgot to nerf that" (5% mult to 1st AD).</li>
<li>Added reward to "Is this safe?" (keep 1 RG on Infinity).</li>
<li>Added reward to "Eternities are the new Infinity" (gain x2 more Eternities).</li>
<li>Added reward to "This is what I have to do to get rid of you" (remove downside from TS 131 and 133).</li>
<li>Changed reward of "That's FAST!" (from 1000 to 5000).</li>
<li>Changed reward of "That's FASTER!" (from 2e5 to 5e5).</li>
<li>Changed reward of "Forever isn't that long" (from 1e10 to 5e10).</li>
<li>Changed reward of "Blink of an eye" (from 1e25 with dimension mult to 5e25).</li>
<li>Changed reward of "That wasn't an eternity" (from 2e25 to 5e25).</li>
<li>Changed requirement of "The Gods are pleased" (from x600 to x600 outside of NC8).</li>
<li>Changed requirement of "Daredevil" (from 2 to 3).</li>
<li>Changed requirement of "Blink of an eye" (from 200 ms to 250 ms).</li>
<li>Changed requirement of "Game design is my passion (Hevipelle did nothing wrong)" (from 10 sec to 15 sec).</li>
<li>Changed requirement of "MAXIMUM OVERDRIVE" (from 1e300 IP/min to 1e300 IP).</li>
<li>Changed requirement of "Eternities are the new Infinity" (from 200 ms to 250 ms).</li>
<li>Changed requirement of "Is this safe?" (from 30 minutes to 1 hour).</li>
<li>Changed requirement of "Like feasting" (from 1e100 to 1e90).</li>
<li>Changed requirement of "No ethical consumption" (from 5e9 to 2e9).</li>
<li>Changed requirement of "When will it be enough?" (from 1e20000 to 1e18000).</li>
<li>Changed requirement of "I never liked this infinity stuff anyway" (from 1e140000 to 1e200000).</li>
<li>Changed requirement of "Unique snowflakes" (from 630 to 569).</li>
<li>Changed requirement of "Now you're thinking with dilation!" (from 1e600 EP to 1e260000 AM).</li>
<li>Changed requirement of "This is what I have to do to get rid of you" (from 1e20000 to 1e26000).</li>
<li>Changed achievement 41 to "No DLC required", "buy 16 IU", "unlock 2 new IU".</li>
<li>Changed position of "Zero deaths" (from 43 to 64).</li>
<li>Changed position of "1 Million is a lot" (from 64 to 77).</li>
<li>Changed position of "How the antitables have turned" (from 77 to 43).</li>
<li>Swapped achievements 101 and 117.</li>
<li>Swapped achievements 113 and 124.</li>
<li>Lowered initial costs of post-break cost scaling upgrades (Tickspeed cost from 3e6 to 1e6,
  Dimension cost from 1e8 to 1e7).</li>
<li>NC7 was reworked to not have RNG.</li>
</ul>
<br>

Removed features:
<ul>
<li>Infinity is now non-fixable.</li>
<li>Removed autobuyer priority.</li>
<li>Removed production graph subtab.</li>
<li>Removed fungame.</li>
<li>Removed savefixer.</li>
<li>Removed some news.</li>
<li>Removed floating text from purchasing Dimensions.</li>
<li>Removed blob that caused game crash.</li>
</ul>
<br>

Bugfixes:
<ul>
<li>ID and replicanti autobuyer buttons are now hidden in EC8.</li>
<li>Fixed next Sacrifice multiplier not properly displaying NC8's effect.</li>
<li>Fixed a bug where IC5's cost increment was applied 2 times.</li>
<li>Fixed a bug where inverted themes were broken.</li>
<li>Fixed a bug where resetting the game unlocks a secret achievement.</li>
<li>Fixed a bug where ECs are showing wrong goals after their 5th completion.</li>
<li>Fixed a bug where non-antimatter galaxies weren't applying for tickspeed if your total galaxy count was less
  than 3.</li>
<li>Fixed a bug where you could produce more than infinite antimatter for 1 tick even if you had a fixed Infinity or
  were in a challenge.</li>
<li>Fixed a bug where formatted numbers on autobuyers wouldn't update properly when changing your notation.</li>
<li>Fixed a bug where Infinity Dimensions would automatically purchase upon unlocking them in EC8 while autobuyers were
  enabled.</li>
<li>Fixed a bug where the replicanti upgrade autobuyers would incorrectly display as off upon load/import.</li>
<li>Fixed a bug where the replicanti interval upgrade would say it would upgrade to a number below the max speed.</li>
<li>Fixed a bug where your Infinity Dimension mult would show as 0x if you had 0 infinity power.</li>
<li>Fixed a bug where you could complete EC4 with 1 more Infinity than was allowed, by using the autobuyer.</li>
<li>Fixed a bug where all non-Dimension Autobuyers didn't respect notation on the cost to reduce their interval.</li>
<li>Fixed a bug where the Achievement reward from "To infinity!" wasn't working.</li>
<li>Fixed a bug where the Sacrifice confirmation would show if you pressed the hotkey even when
  you can't Sacrifice.</li>
<li>Fixed a bug where the game saved notification would appear twice when importing a save.</li>
<li>Fixed a bug where the speed of the Tachyon Particle animation was affected your monitor's refresh rate. (if you have
  a 60hz monitor, it will be the same speed as it was before)</li>
<li>Fixed a bug where the Achievement unlock notification for unlocking "4.3333 minutes of Infinity" said
  "Minute of Infinity".</li>
<li>Fixed a bug where you could still Sacrifice after reaching Infinity.</li>
<li>Fixed a bug where your free tickspeed upgrade count would display as a negative number shortly after purchasing your
  first Time Dimension.</li>
<li>Fixed a bug where you were unable to purchase Dimensions if you had exactly their cost and their cost was below
  Infinity.</li>
<li>Fixed a bug where the "X%" text on the progress bar was left aligned rather than centered.</li>
<li>Fixed a bug where the Achievement image for "Blink of an eye" was a gif.</li>
<li>Fixed a bug where the Achievement unlock condition of "Yo dawg, I heard you liked infinities" was not checked
  correctly.</li>
<li>Fixed a bug where the formula for the displayed multiplier on TS11 was incorrect.</li>
<li>Fixed a bug where the Sacrifice and Dimension Boost Autobuyer would not honor Autobuyer interval.</li>
<li>Fixed a bug where the Reality link was just a video of some guy dancing.</li>
<li>Fixed a bunch of other bugs.</li>
`
  },
  {
    date: [2018, 6, 17],
    name: "This Update Sucks",
    info: `
<b>MAJOR STUFF:</b><br>
<ul>
<li>TIME DILATION</li>
<li>3 ROWS OF SECRET ACHIEVEMENTS</li>
<li>Added more Nicolas Cage.</li>
<li>1 new row of achievements.</li>
<li>Added 3 study tree save slots.</li>
<li>Greatly improved performance. (up to 5x in certain cases, ~3x in almost all cases)</li>
<li>Nerfed EC10 reward. ((infinities * EC10 completions * 0.000002+1) >
(infinities ^ 0.9 * EC10 completions * 0.000002+1))</li>
<li>Added even more Nicolas Cage.</li>
<li>Time study 11 has been capped at 1e2500 and now displays its current multiplier.</li>
<li>Time study 193 has been buffed, requires ~1012680 eternities to cap, rather than 1.5m, and is now capped at 1e13000
instead of ~1.81e12900/1.5m eternities. (1.02^x) > (1.03^x)</li>
<li>The second eternity upgrade has been buffed, and now soft caps at 100k, rather than 125k. The end result is very
slightly higher. ((x/300)^log4(2x)) > ((x/200)^log4(2x))</li>
<li>EC1 now requires 20k eternities per tier to unlock, down from 25k.</li>
<li>TD cost scaling has been increased after costs of 1e1300. (this is in addition to the current increase)</li>
<li>Added additional galaxy cost scaling after 800 galaxies.</li>
<li>Added a button to buy the maximum amount of eternity point multipliers at once.</li>
<li>Offline progress processes ~5x faster, and now simulates autobuyers. (please note that offline progress is still
capped at 1000 ticks, with additional ticks increasing the production of said 1000 ticks)</li>
<li>Added a new save file system that allows 3 different save files at once all with cloud save enabled, along with
a new cloud save UI.</li>
<li>Added an animation to visualize your multiplier gain when you purchase 10 of a dimension, dimension boost/shift,
or sacrifice.</li>
<li>Nicolas Cage.</li>
<li>Added an animation to big crunches. This will only trigger if you haven't eternitied, have a fastest infinity time
above 1 minute, and haven't broken infinity.</li>
<li>Added a button in the options menu to disable individual animations.</li>
<li>Added more news ticker entries</li>
</ul>
<br>
<b>Minor stuff:</b><br>
<ul>
<li>Reduced the space between the secondary eternity tab buttons.</li>
<li>The EC3 description now specifies that dimensional sacrifice is disabled.</li>
<li>Autobuyer inputs now support commas and notation on exponents.</li>
<li>When purchasing the EP or IP multipliers, autobuyer inputs will now always format the updated value above 1000.</li>
<li>The size and placement of the auto IP multiplier and auto RG toggles have been adjusted to fit with the other auto
toggles.</li>
<li>Total time played now increases at a normal rate inside EC12.</li>
<li>Fastest infinity time now updates normally inside EC12.</li>
<li>The time theorem purchasing background is now 20 pixels wider.</li>
<li>Changed the wording on time study 133 for clarity.</li>
<li>Added various missing periods to achievements.</li>
<li>Improved chart performance. (it's still pretty laggy if your settings are too high)</li>
<li>You can now purchase study 201 while you have EC11/12 bought, but you cannot purchase another path.</li>
<li>Purchasing study 131 no longer turns off your replicanti galaxy autobuyer, but instead displays it as disabled.</li>
<li>You can now purchase another split using shift while you have study 201.</li>
<li>You now purchase max galaxies manually by clicking or using the hotkey with more than 6 eternities.</li>
<li>You can now purchase single dimension boosts and galaxies by holding shift while purchasing.</li>
<li>ID8 will now display a rate of change after completing EC7 at least once.</li>
<li>Added an oxford comma to formatted time values.</li>
<li>Made the dimensional sacrifice button 40px wider to prevent the text overflowing.</li>
<li>Made the all tab eternity and infinity point displays 30px wider to prevent the text overflowing.</li>
<li>Moved the big crunch button up to prevent blocking the statistics and achievement tab buttons.</li>
<li>Moved the eternity and infinity buttons inwards to prevent the HTML layout jumping around.</li>
<li>Fixed the placement of certain footers.</li>
<li>Fixed a typo where a news ticker said "Dimesional Sacrifice" instead of "Dimensional Sacrifice"</li>
<li>Fixed a bug where TDs displayed a 2x multiplier per purchase when they actually gave a 4x multiplier.</li>
<li>Fixed a bug where study 51 wouldn't respect notation.</li>
<li>Fixed a bug where the infinity challenges tab would always show.</li>
<li>Fixed a bug where the auto RG toggle would jiggle left and right 1 pixel in certain cases.</li>
<li>Fixed a bug where the rate of change on the 7th dimension wouldn't take into account ID1 while in EC7.</li>
<li>Fixed a bug where EC12 displayed 0.1 seconds after 5 completions, but actually required 0.0 seconds.</li>
<li>Fixed a bug where tickspeed elements wouldn't hide correctly in certain cases.</li>
<li>Fixed a bug where bought eternity challenge unlock studies would show as gray in the dark theme rather than a deep
purple.</li>
<li>Fixed a bug where dimensions 5-8 would hide upon eternity even with the 30 eternity milestone.</li>
<li>Fixed a bug where popup colors weren't inverted in the inverted and inverted metro themes.</li>
<li>Fixed a bug where the eternity point amount wouldn't show when you imported a save with eternity points into a save
without them.</li>
<li>Fixed a bug where locked eternity challenges didn't have a hover effect in the dark metro theme.</li>
<li>Fixed a bug where popups weren't properly centered.</li>
<li>Fixed a bug where ID autobuyers would purchase IDs upon unlock even while disabled.</li>
<li>Fixed a bug where study tree branches drawn to row 22 were off-centered.</li>
<li>Fixed a bug where EP/min and IP/min peaks wouldn't update properly upon import.</li>
<li>Fixed a bug where infinity dimension autobuyers wouldn't hide properly upon import.</li>
<li>Fixed a bug where the IP multiplier autobuyer wouldn't hide properly upon import.</li>
<li>Fixed a bug where the option to change big crunch modes wouldn't hide properly upon import.</li>
<li>Fixed a bug where the max buy galaxy interval setting wouldn't hide properly upon import.</li>
<li>Fixed a bug where the RG autobuyer wouldn't hide properly upon import.</li>
<li>Fixed a bug where the eternity confirmation option wouldn't hide properly upon import.</li>
<li>Fixed a bug where the replicanti upgrade autobuyers wouldn't hide properly upon import.</li>
<li>Fixed a bug where your update rate wouldn't update upon import.</li>
<li>Fixed a bug where the chart line color wouldn't update properly upon import.</li>
<li>Fixed a bug where achievement images were being cut off by 4 pixels on the right and bottom sides.</li>
<li>Fixed a bug where "Yo dawg, I heard you liked infinities..." only required 1e300 times the previous infinity.</li>
<li>Fixed a bug where the auto sacrifice interval would still display as 0.10 seconds even with the
double autobuyer speed breaking infinity upgrade.</li>
<li>Fixed a bug where certain time studies were 1 pixel too far to the left or right.</li>
<li>Fixed a bug where studies 223 & 224 weren't taken into account when displaying antimatter galaxies as
distant antimatter galaxies.</li>
<li>Fixed a bug where study 227 would multiply your 4th time dimension production by 0
if you had no sacrifice bonus.</li>
<li>Fixed a bug where the game would say "You have 1 eternity points." rather than "You have 1 eternity point.".</li>
<li>Fixed a bug where popups would remain open after changing tabs.</li>
<li>Fixed a bug where you were able to select the achievement images by clicking and dragging over them.</li>
<li>Fixed a bug where studies 233 and 234 had the wrong classes assigned to them on load.</li>
</ul>
`
  },
  {
    date: [2018, 4, 1],
    name: "Fixed a Bug where there wasn't an Update",
    info: `
Huge thanks to Omsi for helping me a ton with this.<br><br>
<b>MAJOR STUFF:</b><br>
<ul>
<li>2 NEW ETERNITY CHALLENGES</li>
<li>12 NEW TIME STUDIES</li>
<li>Time study 132 has been buffed from a 30% bonus to a 40% bonus.</li>
<li>Added an achievement bonus for "Popular music": "Replicanti galaxies divide your replicanti by 1.79e308 instead of
resetting them to 1."</li>
<li>Added an achievement bonus for "IT'S OVER 9000": "Sacrifice doesn't reset your dimensions."</li>
<li>Added an achievement bonus for "Like feasting on a behind": "IP multiplier based on time spent this infinity."</li>
<li>Added an achievement bonus for "What do I have to do to get rid of you": "Time dimensions are multiplied by
the number of studies you have."</li>
<li>Added "Infinity" notation.</li>
<li>Added "Brackets" notation.</li>
<li>Added an import/export system for the time study tree.</li>
<li>Added an EP/min & peak EP/min display to the eternity button.</li>
<li>Added an eternity hotkey.</li>
<li>Added something to help you pick your theme.</li>
<li>Added a few more IAPs.</li>
<li>Reduced the cost of "Double IP gain from all sources" IAP from 50 ➜ 40</li>
</ul>
<br>
<b>Minor stuff:</b><br>
<ul>
<li>Added an option to not plot drops in production on the chart. (It will instead copy the newest data point)</li>
<li>Added displays for the current bonuses from time studies 71, 72, and 73.</li>
<li>Built up speed for 6 hours to do it in 0.5x A presses.</li>
<li>Changed study 72 to only work on the 4th infinity dimension, but doubled its power. (No effective change)</li>
<li>Alchemy 120 (Vivification) scaling decreased.</li>
<li>Fixed a bug where the buttons to purchase time studies wouldn't move in inverted themes on firefox.</li>
<li>Fixed a bug. Antman, you're good to go.</li>
<li>Fixed a bug that gave you the ability to set a custom name for your theme when using a secret theme.</li>
<li>Fixed BLJ. Shoutout to SimpleFlips.</li>
<li>Fixed a bug that caused purchasing the EP multiplier to require multiple clicks.</li>
<li>Removed the ghost from the game. Was annoying.</li>
<li>Fixed a bug that allowed you to earn "Long lasting relationship" in EC7.</li>
<li>Monkeys no longer eat humans, as intended.</li>
<li>Fixed a bug where the reward from EC7 could display -1.</li>
<li>Increased the drop rate of collector's pendant items by 20%.</li>
<li>Fixed a bug where the infinity requirement for EC4 could be less than 0.</li>
<li>Transcension gives less Ancient Souls.</li>
<li>Fixed a bug where the visual display for autobuyer bulk buy settings wouldn't update upon your first eternity.</li>
<li>Fixed the rickroll. Now it's properly not working.</li>
<li>Fixed a bug where the EP multiplier would break if its power exceeded 1.79e308.</li>
<li>Leeroy Jenkins' Battlecry now doesn't trigger Patches.</li>
<li>Fixed a bug where the confirmation for starting an infinity challenge would say you need to reach infinity.</li>
<li>Cursors now do circles around the cookie.</li>
<li>Fixed a bug where the offline progress popup would simply say "While you were away" if nothing happened.</li>
<li>Traction has been slightly increased to reduce unwanted drifts.</li>
<li>Fixed a bug that in rare cases would cause the offline progress popup to say you gained "NaNeInfinity" time shards
or infinity power.</li>
<li>Fixed a bug where the tickspeed visual display wouldn't update upon any form of reset.</li>
<li>Bugged a fix where eternity was dumb.</li>
<li>CS now makes notes go faster in mania.</li>
<li>Fixed a bug where replicanti were hidden but still unlocked if you eternitied for the 50th time
while they were locked.</li>
<li>Dirt is now more abundant.</li>
<li>Fixed a bug where the 1st dimension wasn't producing the 0th dimension.</li>
<li>Fixed a bug where The Nameless Ones were too easy.</li>
<li>Fixed a bug where in a specific case, 2 eternity challenges would appear as running at the same time.</li>
<li>Increased TukkunFCG YC rewards by 15%.</li>
<li>Added more space. SPAAAAAAACE</li>
<li>Fixed a bug where the eternity challenges tab would hide after refreshing with less than 1e2000 antimatter.</li>
<li>Fixed a bug where eternity challenges wouldn't update correctly upon import.</li>
<li>Fixed a bug where dimension display values wouldn't update in certain cases.</li>
<li>Portals are now not red.</li>
<li>Fixed a bug where the ON/OFF text on the challenge confirmation option wasn't capitalized upon load.</li>
<li>Reduced GRB's autokill threshold to 2500/2000 power/toughness.</li>
<li>Fixed a typo where the eternity confirmation option said "Eternity confimation".</li>
<li>Added bugs because Omsi wants more bugs to fix. Absolute legend, I'm telling you, the queen is legendary.</li>
<li>Fixed a typo where the reward for "That's faster!" said you started with 20000 antimatter, rather than 200000.</li>
<li>Added depression to your themes.</li>
<li>Fixed inconsistencies with the standard notation naming convention.</li>
<li>Tried to fix a bug where the game was bad but failed. The game is still bad.</li>
<li>Changed the wording on EC4 to say "X or less" rather than "less than X".
(It always worked this way, this is just a correction)</li>
<li>Made donkeys less fast, so you can actually catch them now.</li>
<li>Changed the wording on the EC2 reward to say "affects 1st Infinity Dimension" rather than
"affects Infinity Dimensions". (It always worked this way, this is just a correction)</li>
<li>Increased the base breeding speed of trimps by 10%.</li>
<li>You can now click through the footer and progress bar to access buttons that they are overlapping.
(This is for smaller screens)</li>
<li>Made periods longer.</li>
<li>Added loot boxes.</li>
<li>Removed loot boxes.</li>
<li>Added various missing periods to achievement descriptions.</li>
<li>Added a missing period to time spent in this eternity.</li>
Increased the price of creation count increases from 50 god power to 60.</li>
<li>Added a missing space to the "Autobuyers work twice as fast." upgrade.</li>
<li>Manually buying max dimension boosts no longer requires 10 eternities or more, and now only requires the bulk buy
dimension boosts breaking infinity upgrade.</li>
<li>Did a barrel roll.</li>
<li>Added more useless patch notes</li>
</ul>
`
  },
  {
    date: [2018, 2, 1],
    name: "Eternity Challenges",
    info: `
<ul>
<li>NEW TIME STUDIES</li>
<li>2 new achievement rows</li>
<li>Made certain news messages only show if you have reached certain levels of progression</li>
<li>Massively improved performance of calculating dimension costs thanks to SpectralFlame.
(Cuts cpu usage by up to 2/3 in late-game)</li>
<li>New news (get it?) ticker entries.</li>
<li>Added a production chart.</li>
<li>Added new statistics to replace the scale statistic after 1e100000 antimatter.</li>
<li>Added a new milestone for 30 eternities: "Start with all normal dimensions available for purchase".</li>
<li>Added an option to change the update rate of the game, ranging from 33ms to 200ms.
(before this, it was locked at 50ms)</li>
<li>The game now partially simulates offline progress, instead of estimating it.</li>
<li>Added 3 new eternity upgrades.</li>
<li>Added a reward to the "NEW DIMENSIONS???" achievement, "Your achievement bonus affects Infinity Dimensions."</li>
<li>Buffed time study 111. (10 ^ (log10(antimatter) / 290- 0.75)) > (10 ^ (log10(antimatter) / 285- 0.75))</li>
<li>Buffed time study 83. (1.0001^x) > (1.0004^x)</li>
<li>Nerfed eternity upgrade 1. ((x+1)^3) > (x+1)</li>
<li>Nerfed eternity upgrade 2. (x^log4(2x)) > ((x/300)^log4(2x) with harsher formula above 125,000)</li>
<li>Fixed a bunch of bugs and changed a bunch of things. (more detail below)</li>
<li>Added buy max buttons to Time Dimensions and Time Theorems.</li>
<li>Added a hotkey for replicanti galaxies. (R)</li><br>
<li>Nitty gritty:</li>
<li>Greatly improved the performance of calculating bonus tickspeed from time dimensions.</li>
<li>Replaced all references to soft resets with references to dimension boosts.</li>
<li>Made achievements update on import/hardreset.</li>
<li>Made the game take into account your infinity points gained on crunch for the purposes of
eternity point gain when you eternity.</li>
<li>The replicanti interval is now displayed after and reductions / increases.</li>
<li>Added missing periods to various achievements.</li>
<li>Made the bonus from time study 131 display next to max replicanti galaxies.</li>
<li>Added time dimensions to the info scale.</li>
<li>Changed the description of time study 31 to "Powers up bonuses that are based on your infinitied stat
(to the power of 4)" from "Powers up existing upgrades based on infinitied stat (to the power of 4)".</li>
<li>Changed the description of "MAXIMUM OVERDRIVE" to say "Big Crunch with X" instead of "Reach X".</li>
<li>Added "with reduced effect" to the description of time study 71, 72, and 73.</li>
<li>Changed the text on autobuy max dimension boosts to "Buy max dimboosts every X seconds:"
from "Max dimboost interval:". (To achieve parity with the autobuy max galaxies text)</li>
<li>Made the challenges button always show if you have more than 1 eternity.</li>
<li>Fixed centering issues with infinity and eternity upgrades.</li>
<li>Various minor changes to themes to improve consistency. (Too minute to list, even here)</li>
<li>Made the eternity autobuyer number multiply by 5 when you buy the eternity point multiplier.</li>
<li>Increased the requirement for "Is This Hell?". (5 > 6.66 seconds)</li>
<li>Reduced the starting replicanti interval upgrade cost. (1e160 > 1e140)</li>
<li>Galaxies are labeled "Distant Antimatter Galaxies" when the cost scaling starts. (At 100 galaxies)</li>
<li>Dimensions no longer produce anything after reaching challenge goal, or after reaching infinity with fixed infinity.
This is due to the c6 being abusable.</li>
<li>Made the 7 and 25 eternity milestones work much faster.</li>
<li>After unlocking bulk dimboosts, clicking dimension boost or pressing D will buy max dimension boosts.</li>
<li>Moved fake news, don't you dare to sleep, spreading cancer, and one for each dimension to rows 2, 3, 4,
and 7 respectively.</li>
<li>Added a visual display of how many galaxies/dim boosts you have next to the cost.</li>
<li>Added an explanation of hotkeys to the options page.</li>
<li>Made shift+1-8 purchase singular dimensions and shift+T purchase a singular tickspeed upgrade.</li>
<li>Reworked the display of the buy time theorem buttons.</li>
<li>The milestones page now has 2 columns.</li>
<li>Extended support for standard notation to e3e18, and letter/cancer notation (almost) infinitely.</li>
<li>Added support for standard, letter and logrithm notation in autobuyer inputs.</li>
<li>Added "in a challenge" to the description of "Zero Deaths".</li>
<li>Made most large numbers in achievements be listed in your chosen notation.</li>
<li>Nerfed "Gift From The Gods"'s achievement reward.</li>
<li>Made purchasing time theorems with EP require at least 1 time dimension.</li>
<li>First eternity now takes you to the time dimensions tab.</li>
<li>Time dimension prices now have 2 decimal places.</li>
<li>Reformatted the tick interval reduction text for very small numbers.</li>
<li>The game now keeps track of when you automatically do an infinity, and you can passively gain IP based off the
IP/min in that run if you go offline (but only if infinity isn't broken).</li>
<li>Made time study 171 apply retroactively. This was causing an issue with production being much lower than expected
when going into a long run on the same run as respeccing.</li>
<li>Fixed a bug where max all wasn't giving achievements when buying dimensions.</li>
<li>Fixed a bug where the game wouldn't show the default dimensions tab upon hard resetting.</li>
<li>Fixed a bug where time dimensions were called "X Dimension" rather than "X Time Dimension".</li>
<li>Fixed a bug where the replicanti galaxy button would show as locked if you had more than
the listed max replicanti galaxies and study 131.</li>
<li>Fixed a bug where the last ten eternities average said IP/X rather than EP/X.</li>
<li>Fixed a bug where the big crunch autobuyer said "X times since last crunch" instead of "X times last crunch".</li>
<li>Fixed a bug where the challenge records display wouldn't update upon import.</li>
<li>Fixed a bug where hotkeys wouldn't work sometimes.</li>
<li>Fixed a bug where secret theme names would display as "0" after refreshing.</li>
<li>Fixed a bug where time studies would move around when your window size was too small.</li>
<li>Fixed a bug where infinity dimensions would reset when clicking on a challenge and not entering while
challenge confirmations were on.</li>
<li>Fixed a bug where you always had the infinity challenge 1 reward.</li>
<li>Fixed a bug where eternity milestone classes weren't set correctly upon import.</li>
<li>Fixed a bug where the eternity autobuyer, sacrifice autobuyer, time dimension tab, and replicanti
wasn't hiding correctly upon import.</li>
<li>Fixed a bug where buy max dim boosts was able to buy 1 too many boosts.</li>
<li>Fixed a bug where the study tree would be off-centered if the game windows wasn't wide enough.</li>
<li>Fixed a bug where you could buy factions of dimension boosts with dimension boost bulk buy.</li>
<li>Fixed a bug where your autobuy max dimension boost interval would set itself to itself
if you eternitied while changing it.</li>
<li>Fixed a bug where secondary statistic tabs weren't hiding upon import.</li>
<li>Fixed a bug where replicanti galaxies wouldn't give a bonus if you had less than 3 galaxies.</li>
<li>Fixed a bug where the dimension boost autobuyer would ignore dimension boost costs until they costed 8th dimensions.
</li>
<li>Fixed a bug where the future shop multipliers were displayed before the x rather than after.</li>
<li>Fixed a bug where the challenge confirmation button's off and on were lowercase.</li>
<li>Fixed a bug where the static infinity point display would disappear after eternity.</li>
</ul>`
  },
  {
    date: [2017, 12, 1],
    name: "\"Eternity\" update",
    info: `
<ul>
<li>Time studies tree with free respec</li>
<li>Eternity Milestones with tons of automation</li>
<li>Eternity upgrades</li>
<li>TIME DIMENSIONS</li>
<li>REPLICANTIS</li>
<li>More themes made by Omsi</li>
<li>Disable hotkeys option</li>
<li>Current IP/min post-break</li>
<li>Infinity Challenge times</li>
<li>Past 10 eternities</li>
<li>Lowered IP multiplier cost by 1 Order of magnitude.</li>
<li>3 more rows of achievements</li>
<li>Infinity challenge reward nerfs (1st: 1.5x ➜ 1.3x; 3rd: lowered; 4th: mult^1.1 ➜ mult^1.05)</li>
<li>More news ticker entries</li>
<li>Immensely improved performance thanks to break_infinity.js made by Patashu, it replaces decimal.js</li>
<li>Added LZString for cloud saving purposes.</li>
<li>Achievement refractoring to reduce save string size made by StrangeTim.</li>
<li>Commas between exponents option for numbers higher than e100000</li>
<li>Added logarithm notation</li>
<li>Made letter and cancer notation last longer.
</ul>
`
  },
  {
    date: [2017, 10, 10],
    info: `
<ul>
<li>Complete refactoring for all upgrade UI.</li>
<li>Minor Upgrade Changes. (Capping some upgrades)</li>
<li>Kred shop- 3 paid Upgrades- More upgrades (and upgrade improvements) coming in the future.</li>
<li>8 new Achievements- Achievement Rewards have also been added.</li>
<li>Infinity Challenges- additional challenges to do going from Inf Dim 2 to current end game and beyond.</li>
<li>Main Screen UI updates- IP points are now visible everywhere.</li>
<li>Hotkeys- C for Big Crunch, M for Max All, S for Dimensional Sacrifice, D for Dimension Shift/Boost,
G for Antimatter Galaxy, Numbers 1-8 for Buy 10 (D1-8), A for Toggle Autobuyers.</li>
<li>Bug Fixes- At least 2, including a percentage buff.</li>
</ul>`
  },
  {
    date: [2017, 9, 25],
    info: `
<ul>
<li>NEW DIMENSIONS?</li>
<li>Super Secret Post-Infinity Dimensions added. Get more antimatter to find out!</li>
<li>Post-break double galaxy upgrade nerfed. It now gives 50% more.</li>
<li>Four new post-break upgrades added.</li>
<li>Scaling of the dimension cost multiplier increased.</li>
<li>Eight new achievements added.</li>
<li>Cloud saving maybe added.</li>
<li>Refunded Dimension cost increase multiplier and changed the cost.</li>
</ul>`
  },
  {
    date: [2017, 9, 19],
    name: "Breaking Infinity",
    info: `
<ul>
<li>Post infinity content added (Breaking infinity), requires big crunch speed to be maxed.</li>
<li>New upgrade tree pre-breaking, included one upgrade that be taken multiple times to
increase infinity point gains.</li>
<li>Eight late game post-breaking upgrades.</li>
<li>Eight new achievements.</li>
<li>Reworked autobuyer prices and times, full refund for all points spent on them.</li>
<li>Autobuyers now can be upgraded beyond 0.1 seconds, and they also now 'wait' after their interval has passed,
instantly buying once they are able to.</li>
<li>Automatic DimBoosts, Galaxies, and Big Crunches now have an input box.</li>
<li>Unique achievement rewards for multiple achievements.</li>
<li>Zero galaxies now gives 11% tickspeed.</li>
<li>Galaxies past two give diminishing returns, Faster than a Potato made easier to compensate.</li>
<li>Game now updates 20 times a second with increased performance, max autobuyer speed is not impacted.</li>
<li>Autobuyer settings are now saved in between sessions.</li>
<li>Monitor scaling issues mainly fixed.</li>
<li>Priority should be working properly.</li>
<li>Big crunch button is now less obtrusive.</li>
<li>Your screen no longer defaults to the dimensions tab when you reach infinity
(if you have broken infinity or if your fastest time to reach infinity is less than one minute).</li>
<li>More statistics have been added such as record challenge times and last ten infinities.</li>
<li>Times below one minute are now kept at two decimal points of precision.</li>
<li>Percentage increase per second for dimensions 1-8 are now kept to two decimal points of precision.</li>
<li>The reset button works better now.</li>
</ul>`
  },
  {
    date: [2017, 9, 7],
    name: "Challenges",
    info: `
<ul>
<li>Added 12 challenges.</li>
<li>Added 8 new achievements.</li>
<li>Added autobuyers.</li>
</ul>`
  },
  {
    // These were originally spread throughout 28/8 to 30/8.
    // But they would otherwise hold too little content on their own
    date: [2017, 8, 30],
    info: `
<ul>
<li>Added news on top of the page.</li>
<li>Added a multiplier for completing a row of achievements.</li>
<li>New letter notation option.</li>
<li>Nerfed galaxies from +3% to +2%.</li>
<li>Added 8 new achievements.</li>
<li>Added Dimensional Sacrifice, appears at 5th dimension shift/boost.</li>
<li>More notations!</li>
<li>Bar until infinity at the bottom.</li>
<li>Some UI changes.</li>
</ul>`
  },
  {
    date: [2017, 8, 24],
    name: "Infinity",
    info: `
<ul>
<li>Now when you get to 1.7e308 antimatter, you reach infinity, and you can reset again at infinity,
gaining infinity points.</li>
<li>You can use infinity points for upgrades.</li>
<li>The game also now runs 6 hours while it is closed.</li>
<li>In addition there are some graphic updates.</li>
</ul>`
  },
  // These were originally spread throughout 3/5 to 7/5.
  // But they would otherwise hold too little content on their own
  {
    date: [2017, 5, 7],
    info: `
<ul>
<li>Added this changelog, fixed money displaying problem. Added a title to the HTML.</li>
<li>The game now works offtab.</li>
<li>Fixed the bug with costs showing for example 1000 SxTg.</li>
<li>Visual update! And statistics.</li>
<li>Added export and import options.</li>
<li>Added save button although game saves every 10 seconds.</li>
<li>Slightly smaller text and added a max all button.</li>
<li>Saves should now FINALLY work properly.</li>
</ul>`
  }
];


for (let i = 0; i < changelog.length; i++) {
  changelog[i].id = i;
}
