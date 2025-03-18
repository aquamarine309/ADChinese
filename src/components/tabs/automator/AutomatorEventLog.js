export default {
  name: 'AutomatorEventLog',
  data() {
    return {
      unsortedEvents: [],
      newestFirst: false,
      timestampMode: 0,
      currentTime: 0,
      maxEntries: 0,
      clearOnReality: false,
      clearOnRestart: false,
    }
  },
  computed: {
    events() {
      // eslint-disable-next-line no-nested-ternary
      const sorted = this.unsortedEvents.sort((a, b) => (a.timestamp === b.timestamp ? (a.thisReality === b.thisReality ? a.line - b.line : a.thisReality - b.thisReality) : a.timestamp - b.timestamp))
      return this.newestFirst ? sorted.reverse() : sorted
    },
    clearTooltip() {
      return `清除所有条目 (Max. ${this.maxEntries})`
    },
    buttonClassObject() {
      return 'c-automator-docs--button fas'
    },
  },
  watch: {
    newestFirst(newValue) {
      player.options.automatorEvents.newestFirst = newValue
    },
    timestampMode(newValue) {
      player.options.automatorEvents.timestampType = newValue
    },
    clearOnReality(newValue) {
      player.options.automatorEvents.clearOnReality = newValue
    },
    clearOnRestart(newValue) {
      player.options.automatorEvents.clearOnRestart = newValue
    },
  },
  methods: {
    update() {
      const eventSettings = player.options.automatorEvents
      this.unsortedEvents = AutomatorData.eventLog
      this.newestFirst = eventSettings.newestFirst
      this.timestampMode = eventSettings.timestampType
      this.currentTime = Date.now()
      this.maxEntries = eventSettings.maxEntries
      this.clearOnReality = eventSettings.clearOnReality
      this.clearOnRestart = eventSettings.clearOnRestart
    },
    clearLog() {
      AutomatorData.clearEventLog()
      this.update()
    },
    sortStyle(selected) {
      return {
        'background-color': selected ? 'var(--color-reality)' : '',
      }
    },
    timestampStyle(key) {
      return {
        'background-color': this.timestampMode === AUTOMATOR_EVENT_TIMESTAMP_MODE[key] ? 'var(--color-reality)' : '',
      }
    },
    clearRealityStyle() {
      return {
        'background-color': this.clearOnReality ? 'var(--color-reality)' : '',
      }
    },
    clearRestartStyle() {
      return {
        'background-color': this.clearOnRestart ? 'var(--color-reality)' : '',
      }
    },
    setTimestampMode(key) {
      this.timestampMode = AUTOMATOR_EVENT_TIMESTAMP_MODE[key]
    },
    timestamp(entry) {
      switch (this.timestampMode) {
        case AUTOMATOR_EVENT_TIMESTAMP_MODE.DISABLED:
          return ''
        case AUTOMATOR_EVENT_TIMESTAMP_MODE.THIS_REALITY:
          return `，现实 ${TimeSpan.fromSeconds(entry.thisReality).toStringShort()} （现实时间）`
        case AUTOMATOR_EVENT_TIMESTAMP_MODE.RELATIVE_NOW:
          return `，${TimeSpan.fromMilliseconds(this.currentTime - entry.timestamp).toStringShort()} 前`
        case AUTOMATOR_EVENT_TIMESTAMP_MODE.RELATIVE_PREV:
          if (entry.timegap === entry.timestamp) return `，第一个已记录的事件`
          return `，上一事件 ${TimeSpan.fromMilliseconds(entry.timegap).toStringShort()} 后`
        case AUTOMATOR_EVENT_TIMESTAMP_MODE.DATE_TIME:
          return `，${Time.toDateTimeString(entry.timestamp)}`
        default:
          throw Error('Unrecognized timestamp mode in Automator event log')
      }
    },
    scrollToLine(line) {
      AutomatorScroller.scrollToLine(line)
      AutomatorHighlighter.updateHighlightedLine(line, LineEnum.Event)
    },
  },
  template: `
<div class="c-automator-docs-page">
  <div>
    此面板记录了自动脚本最近执行的所有命令的事件日志，并附带了一些额外信息。如果您发现自动脚本在某些地方卡住，它可能有助于您找到问题。
    <br>
    <br>
    虽然您的设置保存在存档文件中，但实际事件不会保存，并在刷新后消失。
    <br>
    <br>
    <b>条目排序：</b>
    <button
      v-tooltip="'最旧的结果在前'"
      :style="sortStyle(!newestFirst)"
      :class="buttonClassObject"
      class="fa-angle-down"
      @click="newestFirst = false"
    />
    <button
      v-tooltip="'最新的结果在前'"
      :style="sortStyle(newestFirst)"
      :class="buttonClassObject"
      class="fa-angle-up"
      @click="newestFirst = true"
    />
    <button
      v-tooltip="clearTooltip"
      :class="buttonClassObject"
      class="fa-trash"
      @click="clearLog"
    />
    <button
      v-tooltip="'每次现实时清除事件日志'"
      :style="clearRealityStyle()"
      :class="buttonClassObject"
      class="fa-eraser"
      @click="clearOnReality = !clearOnReality"
    />
    <button
      v-tooltip="'脚本重启时清除事件日志'"
      :style="clearRestartStyle()"
      :class="buttonClassObject"
      class="fa-backspace"
      @click="clearOnRestart = !clearOnRestart"
    />
  </div>
  <div>
    <b>时间戳样式：</b>
    <button
      v-tooltip="'无时间戳'"
      :style="timestampStyle('DISABLED')"
      :class="buttonClassObject"
      class="fa-ban"
      @click="setTimestampMode('DISABLED')"
    />
    <button
      v-tooltip="'当前现实的时间'"
      :style="timestampStyle('THIS_REALITY')"
      :class="buttonClassObject"
      class="fa-stopwatch"
      @click="setTimestampMode('THIS_REALITY')"
    />
    <button
      v-tooltip="'自事件以来的时间'"
      :style="timestampStyle('RELATIVE_NOW')"
      :class="buttonClassObject"
      class="fa-clock"
      @click="setTimestampMode('RELATIVE_NOW')"
    />
    <button
      v-tooltip="'自上次事件以来的时间'"
      :style="timestampStyle('RELATIVE_PREV')"
      :class="buttonClassObject"
      class="fa-arrow-left"
      @click="setTimestampMode('RELATIVE_PREV')"
    />
    <button
      v-tooltip="'日期和时间'"
      :style="timestampStyle('DATE_TIME')"
      :class="buttonClassObject"
      class="fa-user-clock"
      @click="setTimestampMode('DATE_TIME')"
    />
  </div>
  <span
    v-for="(event, id) in events"
    :key="id"
  >
    <b>第 {{ event.line }} 行{{ timestamp(event) }}：</b>
    <button
      v-tooltip="'跳转到行'"
      :class="buttonClassObject"
      class="fa-arrow-circle-right"
      @click="scrollToLine(event.line)"
    />
    <div class="c-automator-docs-page__indented">
      <i>{{ event.message }}</i>
    </div>
  </span>
</div>
  `,
}

const AUTOMATOR_EVENT_TIMESTAMP_MODE = {
  DISABLED: 0,
  THIS_REALITY: 1,
  RELATIVE_NOW: 2,
  RELATIVE_PREV: 3,
  DATE_TIME: 4,
}
