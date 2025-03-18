import { AutobuyerInputFunctions } from '../../components/tabs/autobuyers/AutobuyerInput.js'

export const automatorTemplates = {
  /**
   * 动态生成脚本模板中可能的数据类型列表，假设仅为字符串或布尔值
   * {
   *  @property {String} name              用作此对象中条目的键的字符串
   *  @property {String[]} boolDisplay     用于布尔输入的真/假状态的显示字符串。如果未定义，则假定为非布尔输入
   *  @property {Function} isValidString    用于测试输入字符串是否格式正确的函数
   *  @property {Function} map             用于将输入映射到其实际值的函数，实际值存储在 param 对象中。如果未定义，则假定为无映射
   * }
   */
  paramTypes: [
    {
      name: 'tree',
      isValidString: (str) => {
        const validImport = TimeStudyTree.isValidImportString(str)
        const preset = str.match(/^(NAME (.{1,4})|ID (\d))$/u)
        const validPreset = preset ? player.timestudy.presets.some((p) => p.name === preset[2]) || (Number(preset[3]) > 0 && Number(preset[3]) < 7) : false
        return validImport || validPreset
      },
    },
    {
      name: 'integer',
      isValidString: (str) => AutobuyerInputFunctions.int.tryParse(str),
      map: (x) => Math.round(parseInt(x, 10)),
    },
    {
      name: 'decimal',
      isValidString: (str) => AutobuyerInputFunctions.decimal.tryParse(str),
      map: (x) => AutobuyerInputFunctions.decimal.tryParse(x),
    },
    {
      name: 'boolean',
      boolDisplay: [true, false], // 布尔值显示为 "true" 和 "false"
    },
    {
      name: 'nowait',
      boolDisplay: ['继续前进', '继续购买研究'], // 布尔值显示为 "继续前进" 和 "继续购买研究"
    },
    {
      name: 'mode',
      boolDisplay: ['最高值的 X 倍', '自上次以来的秒数'], // 布尔值显示为 "最高值的 X 倍" 和 "自上次以来的秒数"
      map: (x) => (x ? 'mult' : 'time'),
    },
  ],
  /**
   * 自动脚本模板列表，主要用于在此处格式化玩家 UI 提示，以便所有必填字段以正确的输入格式显示。实际的脚本格式化还需要在 ScriptTemplate 类的构造函数中编写一个方法
   * {
   *  @property {String} name          脚本模板的名称，也用作 ScriptTemplate 对象构造函数中的键
   *  @property {String} description   描述模板在自动脚本中使用时执行的操作的文本
   *  @property {Object[]} inputs      需要填充的 param 对象的字段，以便模板拥有所需的所有信息。包含字段名称、类型（从上面的 paramTypes 中提取）和 UI 中显示的提示
   *  @property {Function} warnings    检查当前游戏状态并可能根据某些常见情况提供警告的函数，这些情况可能导致意外行为
   * }
   */
  scripts: [
    {
      name: '刷永恒点数',
      description: `此脚本执行重复的永恒，尝试在每次永恒后重新购买时间研究树。必须为无限和永恒自动购买器提供设置。脚本将重复，直到达到最终永恒点值。`,
      inputs: [
        { name: 'treeStudies', type: 'tree', prompt: '或直接输入您的时间研究' },
        { name: 'treeNowait', type: 'nowait', prompt: '缺失研究时的行为' },
        { name: 'finalEP', type: 'decimal', prompt: '目标永恒点' },
        { name: 'autoInfMode', type: 'mode', prompt: '无限自动购买器模式' },
        { name: 'autoInfValue', type: 'decimal', prompt: '无限自动购买器阈值' },
        { name: 'autoEterMode', type: 'mode', prompt: '永恒自动购买器模式' },
        { name: 'autoEterValue', type: 'decimal', prompt: '永恒自动购买器阈值' },
      ],
      warnings: () => {
        const list = []
        if (!RealityUpgrade(10).isBought) {
          list.push(`此脚本将无法正确设置自动购买器模式，除非您至少有 ${formatInt(100)} 次永恒。考虑在现实的开始时获取现实升级 "${RealityUpgrade(10).name}"。`)
        }
        // Telemechanical Process (TD/5xEP autobuyers)
        if (!RealityUpgrade(13).isBought) {
          list.push(`此模板在没有现实升级 "${RealityUpgrade(13).name}" 的情况下可能表现不佳`)
        }
        if (!Perk.ttBuySingle.isBought) {
          list.push(`此模板在没有技能 "${Perk.ttBuySingle.label}" 的情况下可能表现不佳，除非您可以在不购买时间定理的情况下生成它们`)
        }
        return list
      },
    },
    {
      name: '刷永恒次数',
      description: `此脚本在购买指定的时间研究树后执行重复的快速永恒。自动无限将设置为“最高值的 X 倍”，并指定每次永恒的崩溃次数，自动永恒将尽快触发。脚本将重复，直到达到最终永恒计数。`,
      inputs: [
        { name: 'treeStudies', type: 'tree', prompt: '或直接输入您的时间研究' },
        { name: 'treeNowait', type: 'nowait', prompt: '缺失研究时的行为' },
        { name: 'crunchesPerEternity', type: 'integer', prompt: '每次永恒的崩溃次数' },
        { name: 'eternities', type: 'decimal', prompt: '目标永恒计数' },
      ],
      warnings: () => {
        const list = []
        // Eternal flow (eternity generation)
        if (RealityUpgrade(14).isBought) {
          list.push(`您可能不需要使用此模板，因为您已经拥有现实升级 "${RealityUpgrade(14).name}"`)
        }
        return list
      },
    },
    {
      name: '刷无限次数',
      description: `此脚本购买指定的时间研究树，然后为获得无限配置您的自动购买器。它将重复，直到达到最终无限计数；计数可以是银行无限，在这种情况下，它将获取所有无限，然后执行一次永恒。`,
      inputs: [
        { name: 'treeStudies', type: 'tree', prompt: '或直接输入您的时间研究' },
        { name: 'treeNowait', type: 'nowait', prompt: '缺失研究时的行为' },
        { name: 'infinities', type: 'decimal', prompt: '目标无限计数' },
        { name: 'isBanked', type: 'boolean', prompt: '使用银行作为目标？' },
      ],
      warnings: () => {
        const list = []
        if (!Perk.achievementGroup5.isBought) {
          list.push(`您在此现实中不会从成就 "${Achievement(131).name}" 开始 - 由于无法在稍后存入银行，刷无限可能不如预期有用`)
        }
        // Boundless flow (infinity generation)
        if (RealityUpgrade(11).isBought) {
          list.push(`您可能不需要使用此模板，因为您已经拥有现实升级 "${RealityUpgrade(11).name}"`)
        }
        return list
      },
    },
    {
      name: '完成永恒挑战',
      description: `此脚本购买指定的时间研究树，然后解锁指定的永恒挑战。然后，它将根据您的指定设置配置您的无限自动购买器并进入永恒挑战。最后，它将等待直到至少达到所需的完成次数，然后触发永恒以完成挑战。`,
      inputs: [
        { name: 'treeStudies', type: 'tree', prompt: '或直接输入您的时间研究' },
        { name: 'treeNowait', type: 'nowait', prompt: '缺失研究时的行为' },
        { name: 'ec', type: 'integer', prompt: '永恒挑战 ID' },
        { name: 'completions', type: 'integer', prompt: '目标完成次数' },
        { name: 'autoInfMode', type: 'mode', prompt: '无限自动购买器模式' },
        { name: 'autoInfValue', type: 'decimal', prompt: '无限自动购买器阈值' },
      ],
      warnings: () => {
        const list = []
        if (!Perk.studyECRequirement.isBought) {
          list.push(`由于次要资源要求，永恒挑战可能无法可靠解锁，考虑在使用此模板之前解锁技能 "${Perk.studyECRequirement.label}"`)
        }
        if (!Perk.studyECBulk.isBought) {
          list.push(`在没有批量完成永恒挑战的情况下使用此模板可能会导致脚本过长，速度较慢且难以修改。如果您使用此模板，考虑在解锁技能 "${Perk.studyECBulk.label}" 后返回以简化您的脚本`)
        }
        return list
      },
    },
    {
      name: '解锁膨胀',
      description: `此脚本执行重复的永恒，尝试在每次永恒后重新购买时间研究树。必须为永恒自动购买器提供设置；您的无限自动购买器将被关闭。脚本将循环，直到您拥有解锁延展所需的总时间定理，然后它将解锁延展。`,
      inputs: [
        { name: 'treeStudies', type: 'tree', prompt: '或直接输入您的时间研究' },
        { name: 'treeNowait', type: 'nowait', prompt: '缺失研究时的行为' },
        { name: 'finalEP', type: 'decimal', prompt: '目标永恒点' },
        { name: 'autoEterMode', type: 'mode', prompt: '永恒自动购买器模式' },
        { name: 'autoEterValue', type: 'decimal', prompt: '永恒自动购买器阈值' },
      ],
      warnings: () => {
        const list = []
        // Telemechanical Process (TD/5xEP autobuyers)
        if (!RealityUpgrade(13).isBought) {
          list.push(`此模板在没有现实升级 "${RealityUpgrade(13).name}" 的情况下可能表现不佳`)
        }
        if (!Perk.ttBuySingle.isBought) {
          list.push(`此模板在没有技能 "${Perk.ttBuySingle.label}" 的情况下可能表现不佳，除非您可以在不购买时间定理的情况下生成它们`)
        }
        return list
      },
    },
  ],
}
