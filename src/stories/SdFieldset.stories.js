import { SdFieldset, SdCheckbox, SdRadio } from '../lib'
import { ref } from 'vue'
export default {
  title: 'Components/SdFieldset',
  component: SdFieldset
}

const Template = (args => ({
  components: {
    SdFieldset, SdCheckbox, SdRadio
  },
  setup () {
    const checkboxes = ref([])
    const radios = ref('')
    return {
      args,
      checkboxes,
      radios
    }
  },
  template: `
  <div>
    <sd-fieldset v-bind="args">
      <sd-checkbox v-model="checkboxes" value="options-1">Option 1</sd-checkbox>
      <sd-checkbox v-model="checkboxes" value="options-2">Option 2</sd-checkbox>
      <sd-checkbox v-model="checkboxes" value="options-3">Option 3</sd-checkbox>
    </sd-fieldset>
    <sd-fieldset v-bind="args">
      <sd-radio v-model="radios" value="option-1" name="radio-1">Option 1</sd-radio>
      <sd-radio v-model="radios" value="option-2" name="radio-2">Option 2</sd-radio>
      <sd-radio v-model="radios" value="option-3" name="radio-3">Option 3</sd-radio>
    </sd-fieldset>
  </div>

  `}))


export const Default = Template.bind({});
Default.args = {
  title: 'Fieldset Title'
};