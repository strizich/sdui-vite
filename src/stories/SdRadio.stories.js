import { SdRadio } from '../lib'
import { reactive } from 'vue'
export default {
  title: 'Form Controls/SdRadio',
  component: SdRadio,
  argTypes: {
    value: {
      control: false
    }
  },
  args: {
    value: ''
  }
};


const Template = (args => ({
  components: { SdRadio },
  setup () {
    const state = reactive({
      selected: args.selected
    })

    return { state, args };
  },
  template: `
    <sd-radio
      v-model="state.selected"
      value="banana"
      :name="args.name"
      :required="args.required"
      :disabled="args.disabled"
    >
      Banana
    </sd-radio>

    <sd-radio
      v-model="state.selected"
      value="orange"
      :name="args.name"
      :required="args.required"
      :disabled="args.disabled"
    >
      Orange
    </sd-radio>

    <sd-radio
      v-model="state.selected"
      value="pineapple"
      :name="args.name"
      :required="args.required"
      :disabled="args.disabled"
    >
      Pineapple
    </sd-radio>
    <pre><code>selected: {{state.selected}}</code></pre>
  `
}))


export const Default = Template.bind({});
Default.args = {
  selected: 'pineapple'
}
