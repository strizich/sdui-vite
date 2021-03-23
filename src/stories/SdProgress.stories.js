import { SdProgress } from '../lib'
import { THEMES, ALIGNMENT, SIZES } from './constants'

export default {
  title: 'Components/SdProgress',
  component: SdProgress,
  argTypes: {
    theme: {
      control: 'select',
      options: THEMES
    },
    animated: {
      control: 'boolean'
    },
    hint: {
      control: 'text'
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

const themes = THEMES

const Template = (args => ({
  components: { SdProgress },
  setup () {
    return { args, themes };
  },
  template: `
    <sd-progress
      v-for="theme in themes"
      :key="theme"
      :theme="theme"
      :label="args.label ? args.label : theme"
      :hint="args.hint"
      :progress="args.progress"
      :total="args.total"
      :current="args.current"
      :decimal-places="args.decimalPlaces"
    />
  `
}))

export const Progress = Template.bind({});
Progress.args = {
  label: '',
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
