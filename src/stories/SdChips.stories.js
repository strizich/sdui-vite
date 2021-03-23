import { SdChip } from '../lib'
import { reactive, toRefs } from 'vue'
export default {
  title: 'Form Controls/SdChips',
  component: SdChip,
  argTypes: {
    theme: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'default',
        'success',
        'warning',
        'danger',
        'dark'
      ]
    }
  }
}

const Template = (args => ({
  components: { SdChip },
  setup () {
    const state = reactive({
      args: args
    })
    return { ...toRefs(state) }
  },
  template: `
  <div>
   <sd-chip v-bind="args"/>
  </div>
  `
}))

export const Default = Template.bind({})
Default.args = {
  label: 'Chip Field',
  modelValue: ['Hello']
}
