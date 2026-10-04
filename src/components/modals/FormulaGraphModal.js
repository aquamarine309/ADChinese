import ModalWrapper from "../modals/ModalWrapper.js";
import DescriptionDisplay from "../DescriptionDisplay.js";
import { uPlot } from "../../../modules/uPlot.iife.min.js";

function log(x) {
  if (x instanceof Decimal) return x.log10();
  return Math.log10(x);
}

function getCssVar(name) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

function niceStep(range, count) {
  const rawStep = range / count;
  const mag = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const norm = rawStep / mag;
  let nice;
  if (norm <= 1) nice = 1;
  else if (norm <= 2) nice = 2;
  else if (norm <= 5) nice = 5;
  else nice = 10;
  return nice * mag;
}

function splitsNiceWithEnds(count = 5, minGapPx = 30) {
  return (u, axisIdx, scaleMin, scaleMax) => {
    if (scaleMax === scaleMin) return [scaleMin];

    const step = niceStep(scaleMax - scaleMin, count - 1);
    const start = Math.ceil(scaleMin / step) * step;
    const arr = [];
    for (let v = start; v <= scaleMax + step * 1e-9; v += step) {
      arr.push(v);
    }

    if (arr.length === 0 || arr[0] > scaleMin) arr.unshift(scaleMin);
    if (arr[arr.length - 1] < scaleMax) arr.push(scaleMax);

    const isX = axisIdx === 0;
    const key = isX ? 'x' : 'y';
    const pos = v => u.valToPos(v, key, true);

    const filtered = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
      if (Math.abs(pos(arr[i]) - pos(filtered[filtered.length - 1])) >= minGapPx) {
        filtered.push(arr[i]);
      }
    }
    const last = arr[arr.length - 1];
    if (filtered[filtered.length - 1] !== last) {
      if (filtered.length > 1) filtered.pop();
      filtered.push(last);
    }

    return filtered;
  };
}

export default {
  name: "FormulaGraphModal",
  components: {
    ModalWrapper,
    DescriptionDisplay
  },
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      x: new Decimal(),
      u: null,
      params: []
    }
  },
  computed: {
    header() {
      return `效果公式图表`;
    },
    formula() {
      return this.config.formula;
    },
    y() {
      return this.formula.formula(this.x);
    }
  },
  mounted() {
    this.initSample();
  },
  methods: {
    update() {
      const x = this.formula.x();
      if (x instanceof Decimal) {
        this.x.copyFrom(x);
      } else {
        this.x = x;
      }
      const params = this.formula.params;
      if (params !== undefined) {
        for (let i = 0; i < params.length; i++) {
          const p = this.params[i];
          const v = params[i].value();
          if (p !== undefined && Decimal.neq(p, v)) this.initSample();
          this.params[i] = v;
        }
      }
    },
    initSample() {
      if (this.u !== null) this.u.destroy();
      const config = this.formula;
      const logX = config.logX || false;
      const logY = config.logY || false;
      const minX = config.rangeX[0];
      const isXDecimal = minX instanceof Decimal;
      const isYDecimal = config.formula(minX) instanceof Decimal;
      if (!logX && isXDecimal || !logY && isYDecimal) {
        throw new Error("Decimal must be in the logarithm mode.");
      }
      const maxX = config.rangeX[1] === null ? (logX ? (isXDecimal ? this.x.pow(2) : Math.min(Math.pow(this.x, 2), 1e300)) : this.x * 2) : config.rangeX[1];
      const rangeX = [logX ? log(minX) : minX, logX ? log(maxX) : maxX];
      const len = rangeX[1] - rangeX[0];
      const count = 600;
      const sampleX = [];
      const sampleY = [];
      let maxY = 0;
      let minY = Number.MAX_VALUE;
      for (let i = 0; i <= count; i++) {
        const x = rangeX[0] + len * i / count;
        const rawX = logX ? (isXDecimal ? Decimal.pow10(x) : Math.pow(10, x)) : x;
        const rawY = config.formula(rawX);
        const y = logY ? log(rawY) : rawY;
        sampleX.push(x);
        sampleY.push(y);
        if (y > maxY) maxY = y;
        if (y < minY) minY = y;
      }
      const formatX = v => v === null ? "--" : config.formatX(logX ? (isXDecimal ? Decimal.pow10(v) : Math.pow(10, v)) : v);
      const formatY = v => v === null ? "--" : this.formatY(logY ? (isYDecimal ? Decimal.pow10(v) : Math.pow(10, v)) : v);
      
      const opts = {
        width: 600,
        height: 500,
        scales: {
          x: {
            time: false,
            range: rangeX
          },
          y: { range: [minY, maxY] }
        },
        series: [
          {
            label: config.xAxis,
            value: (u, v) => formatX(v)
          },
          {
            label: "效果",
            stroke: () => getCssVar("--color-accent"),
            width: 2,
            value: (u, v) => formatY(v)
          }
        ],
        axes: [
          {
            label: config.xAxis,
            stroke: "#888888",
            splits: splitsNiceWithEnds(),
            ticks: {
              show: true,
              stroke: "#888888",
              size: 5,
              width: 1
            },
            grid: {
              show: true,
              stroke: "rgba(128, 128, 128, 0.3)",
              width: 1
            },
            values: (u, splits) => splits.map(x => formatX(x))
          },
          {
            label: "效果",
            stroke: "#888888",
            splits: splitsNiceWithEnds(),
            size: 100,
            ticks: {
              show: true,
              stroke: "#888888",
              size: 5,
              width: 1
            },
            grid: {
              show: true,
              stroke: "rgba(128, 128, 128, 0.3)",
              width: 1
            },
            values: (u, splits) => splits.map(x => formatY(x))
          }
        ]
      };
      this.u = new uPlot(opts, [sampleX, sampleY], this.$refs.chartEl);
    },
    formatY(y) {
      return (this.formula.formatY || this.config.formatEffect)(y);
    }
  },
  template: `
  <ModalWrapper>
    <template #header>
      {{ header }}
    </template>
    <div>
      <DescriptionDisplay :config="config" />
      <div>公式：<span v-html="formula.text" /></div>
      <div v-if="formula.params">
        <div
          v-for="(param, index) in formula.params"
          :key="index"
        >
          {{ param.name }}={{ param.format(params[index]) }}
        </div>
      </div>
      <div>x={{ formula.xAxis }}</div>
      <div>
        当前：x={{ formula.formatX(x) }}
        <i class="fas fa-arrow-right" />
        {{ formatY(y) }}
      </div>
      <div
        ref="chartEl"
        class="o-chart"
      />
    </div>
  </ModalWrapper>
  `
};