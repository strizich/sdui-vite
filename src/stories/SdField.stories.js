import { SdField } from '../lib'
export default {
  title: 'Form Controls/SdField',
  component: SdField,
  argTypes: {
    id: {
      control: false
    },
    modelModifiers: {
      control: false
    },
    modelValue: {
      control: 'text'
    },
    value: {
      control: 'text'
    },
    error: {
      control: 'text'
    }
  }
};


const Template = (args => ({
  components: { SdField },
  setup () {
    return { args };
  },
  template: `
    <sd-field v-bind="args"/>
  `
}))


export const Default = Template.bind({});
Default.args = {
  label: 'Label',
  message: 'error',
  pristineError: false
}
