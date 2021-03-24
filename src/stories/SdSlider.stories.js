import { SdSlider } from '../lib'
import { reactive, toRefs } from 'vue'
export default {
  title: 'Form Controls/SdSlider',
  component: SdSlider,
  argTypes: {
    showTicks:{
      control: false
    },
    label: {
      control: 'text'
    },
    hint: {
      control: 'text'
    }
  }
};

const Template = (args => ({
  components: { SdSlider },
  setup () {
    const state = reactive({
      args
    })
    return { ...toRefs(state) };
  },
  template: `
  <sd-slider
    :label="args.label"
    :hint="args.hint"
    v-model:value="args.value"
    :min="args.min"
    :max="args.max"
    :step="args.step"
    :show-tooltip="args.showTooltip"
    :show-indicators="args.showIndicators"
  />
  `
}))

export const Default = Template.bind({});
Default.args = {
  label: 'label',
  hint: 'hint',
  showTooltip: true,
  showIndicators: true
}