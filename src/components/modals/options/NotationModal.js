import { ADNotations } from "../../../../modules/notations.js";

import ModalWrapper from "../ModalWrapper.js";
import SliderComponent from "../../SliderComponent.js";

export default {
  name: "NotationModal",
  components: {
    ModalWrapper,
    SliderComponent
  },
  data() {
    return {
      commaDigits: 0,
      notationDigits: 0,
    };
  },
  computed: {
    sampleNums() {
      const largestExponent = "123456789012345";
      const numbers = [];
      for (let digits = 4; digits < 16; digits++) numbers.push(Decimal.pow10(largestExponent.substring(0, digits)));
      return numbers;
    },
    sliderProps() {
      return {
        min: 3,
        max: 15,
        interval: 1,
        width: "100%",
        tooltip: false
      };
    },
  },
  watch: {
    commaDigits(newValue) {
      player.options.notationDigits.comma = newValue;
      ADNotations.Settings.exponentCommas.min = 10 ** newValue;
    },
    notationDigits(newValue) {
      player.options.notationDigits.notation = newValue;
      ADNotations.Settings.exponentCommas.max = 10 ** newValue;
    },
  },
  // This puts the sliders in the right spots on initialization
  created() {
    const options = player.options.notationDigits;
    this.commaDigits = options.comma;
    this.notationDigits = options.notation;
  },
  methods: {
    update() {
      const options = player.options.notationDigits;
      this.commaDigits = options.comma;
      this.notationDigits = options.notation;
    },

    // These need a bit of extra logic to ensure that the notation threshold is always >= the comma threshold
    adjustSliderComma(value) {
      this.commaDigits = value;
      player.options.notationDigits.comma = value;
      if (value > this.notationDigits) this.adjustSliderNotation(value);
    },
    adjustSliderNotation(value) {
      this.notationDigits = value;
      player.options.notationDigits.notation = value;
      if (value < this.commaDigits) this.adjustSliderComma(value);
    }
  },
  template: `
  <ModalWrapper>
    <template #header>  
      指数记数法设置  
    </template>  
    你可以调整极大数值的显示方式。较小数值将直接显示指数部分而不额外格式化；中等数值会在指数中添加逗号分隔以提升可读性；极大数值则会对指数部分应用记数法格式化以缩短显示。你可以在下方调整这三个显示区域的切换阈值：  
    <br>  
    <br>  
    <div  
      class="c-single-slider"  
      data-v-notation-modal  
    >  
      <b  
        class="o-digit-text"  
        data-v-notation-modal  
      >指数添加逗号的最小位数：{{ formatInt(commaDigits) }} 位</b>  
      <SliderComponent  
        class="o-primary-btn--slider__slider o-slider"  
        v-bind="sliderProps"  
        :value="commaDigits"  
        @input="adjustSliderComma($event)"  
        data-v-notation-modal  
      />  
    </div>  
    <div  
      class="c-single-slider"  
      data-v-notation-modal  
    >  
      <b  
        class="o-digit-text"  
        data-v-notation-modal  
      >指数应用记数法的最小位数：{{ formatInt(notationDigits) }} 位</b>  
      <SliderComponent  
        class="o-primary-btn--slider__slider o-slider"  
        v-bind="sliderProps"  
        :value="notationDigits"  
        @input="adjustSliderNotation($event)"  
        data-v-notation-modal  
      />  
    </div>  
    <br>  
    指数格式化示例：  
    <div  
      class="c-sample-numbers"  
      data-v-notation-modal  
    >  
      <span  
        v-for="(num, id) in sampleNums"  
        :key="id"  
        class="o-single-number"  
        data-v-notation-modal  
      >  
        {{ formatPostBreak(num) }}  
      </span>  
    </div>  
    <br>  
    注意：界面默认针对科学记数法优化（阈值设为 {{ formatInt(5) }} 和 {{ formatInt(9) }} 位）。若大幅偏离这些值，文本可能显示异常或溢出框体。此外，使用某些记数法时这些设置可能不会产生视觉变化。
  </ModalWrapper>
  `
};