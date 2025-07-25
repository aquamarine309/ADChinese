import ModalOptionsToggleButton from "../../ModalOptionsToggleButton.js";
import ModalWrapperOptions from "./ModalWrapperOptions.js";
import PrimaryButton from "../../PrimaryButton.js";
import SliderComponent from "../../SliderComponent.js";

export default {
  name: "NewsOptionsModal",
  components: {
    ModalOptionsToggleButton,
    ModalWrapperOptions,
    PrimaryButton,
    SliderComponent
  },
  data() {
    return {
      enabled: false,
      repeatBuffer: 40,
      AIChance: 0,
      speed: 1,
      includeAnimated: false,
      chineseNews: false
    };
  },
  computed: {
    newsOnOffLabel() {
      return `新闻：${this.enabled ? "开启" : "关闭"}`;
    },
    sliderPropsRepeatBuffer() {
      return {
        min: 0,
        max: 80,
        interval: 1,
        width: "98%",
        tooltip: false
      };
    },
    sliderPropsAIChance() {
      return {
        min: 0,
        max: 1,
        interval: 0.01,
        width: "98%",
        tooltip: false
      };
    },
    sliderPropsSpeed() {
      return {
        min: 0.5,
        max: 2,
        interval: 0.01,
        width: "98%",
        tooltip: false
      };
    },
  },
  watch: {
    type(newValue) {
      player.options.news.type = newValue;
    },
    repeatBuffer(newValue) {
      player.options.news.repeatBuffer = parseInt(newValue, 10);
    },
    AIChance(newValue) {
      player.options.news.AIChance = parseFloat(newValue, 10);
    },
    speed(newValue) {
      player.options.news.speed = parseFloat(newValue, 10);
    },
    includeAnimated(newValue) {
      player.options.news.includeAnimated = newValue;
    },
    chineseNews(newValue) {
      player.options.news.chineseNews = newValue;
    }
  },
  methods: {
    update() {
      const options = player.options.news;
      this.enabled = options.enabled;
      this.repeatBuffer = options.repeatBuffer;
      this.AIChance = options.AIChance;
      this.speed = options.speed;
      this.includeAnimated = options.includeAnimated;
      this.chineseNews = options.chineseNews;
    },
    adjustSliderValueRepeatBuffer(value) {
      this.repeatBuffer = value;
      player.options.repeatBuffer = this.repeatBuffer;
    },
    adjustSliderValueAIChance(value) {
      this.AIChance = value;
      player.options.AIChance = this.AIChance;
    },
    adjustSliderValueSpeed(value) {
      this.speed = value;
      player.options.speed = this.speed;
    }
  },
  template: `
  <ModalWrapperOptions>
    <template #header>
      新闻选项
    </template>
    <PrimaryButton
      class="o-primary-btn o-primary-btn--option-wide"
      onclick="GameOptions.toggleNews()"
    >
      {{ newsOnOffLabel }}
    </PrimaryButton>
    <div class="o-primary-btn o-primary-btn--option-wide o-primary-btn--slider">
      <b>{{ formatInt(parseInt(repeatBuffer)) }} 消息重复缓冲</b>
      <SliderComponent
        class="o-primary-btn--slider__slider"
        v-bind="sliderPropsRepeatBuffer"
        :value="repeatBuffer"
        @input="adjustSliderValueRepeatBuffer($event)"
      />
    </div>
    <div class="o-primary-btn o-primary-btn--option-wide o-primary-btn--slider">
      <b>{{ formatPercents(parseFloat(AIChance)) }} AI消息比例</b>
      <SliderComponent
        class="o-primary-btn--slider__slider"
        v-bind="sliderPropsAIChance"
        :value="AIChance"
        @input="adjustSliderValueAIChance($event)"
      />
    </div>
    <div class="o-primary-btn o-primary-btn--option-wide o-primary-btn--slider">
      <b>{{ formatPercents(parseFloat(speed)) }} 滚动速度</b>
      <SliderComponent
        class="o-primary-btn--slider__slider"
        v-bind="sliderPropsSpeed"
        :value="speed"
        @input="adjustSliderValueSpeed($event)"
      />
    </div>
    <ModalOptionsToggleButton
      v-model="includeAnimated"
      class="o-primary-btn o-primary-btn--option-wide"
      text="动画效果："
    />
    <ModalOptionsToggleButton
      v-model="chineseNews"
      class="o-primary-btn o-primary-btn--option-wide"
      text="中文新闻："
    />
  </ModalWrapperOptions>
  `
};