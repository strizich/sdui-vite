import { SdProgress } from '../lib'
import '../lib/scss/engine.scss'

export default {
  title: 'Components/SdProgress',
  component: SdProgress,
  argTypes: {
    animated: {
      control: {
        type: 'boolean'
      }
    },
    progress: {
      control: {
        type: 'range',
        max: 1,
        min: 0,
        step: 0.01
      }
    }
  }
};

const Template = (args => ({
  components: { SdProgress },
  setup () {
    return { args };
  },
  template: `
    <sd-progress theme="primary" v-bind="args"/>
    <sd-progress theme="secondary" v-bind="args"/>
    <sd-progress theme="default" v-bind="args"/>
    <sd-progress theme="success" v-bind="args"/>
    <sd-progress theme="warning" v-bind="args"/>
    <sd-progress theme="danger" v-bind="args"/>
    <sd-progress theme="dark" v-bind="args"/>
  `
}))

export const Progress = Template.bind({});
Progress.args = {
  label: 'hm',
  progress: 0.25,
  total: 0,
  current: 0
}

export const Total = Template.bind({});
Total.args = {
  label: 'hm',
  progress: 0,
  total: 100,
  current: 50
}
