import { reactive, toRefs } from 'vue'
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
      control: false
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
    const state = reactive({
      input: '',
      args: args
    })
    return { ...toRefs(state), args };
  },
  template: `
    <sd-field
      v-model="input"
      :value="args.value"
      :error="args.error"
      :label="args.label"
      :pristine-error="args.pristineError"
      :icon="args.icon"
      :icon-color="args.iconColor"
      :icon-end="args.iconEnd"
      :icon-end-color="args.iconEndColor"
      :name="args.name"
      :set-focus="args.setFocus"
      :disabled="args.disabled"
      :required="args.required"
      :type="args.type"
    />
  `
}))

export const Default = Template.bind({});
Default.args = {
  label: 'Label',
  message: 'error',
  pristineError: false
}
