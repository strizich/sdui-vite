import { SdProgress } from '../lib'

export default {
  title: 'Components/SdProgress',
  component: SdProgress,
  argTypes: {
    theme: {
      control: {
        type: 'select',
        options: [
          'primary',
          'secondary',
          'default',
          'warning',
          'success',
          'danger',
          'dark'
        ]
      }
    },
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
    <sd-progress v-bind="args"/>
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
