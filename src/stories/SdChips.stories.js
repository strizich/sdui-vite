import { SdChip } from '../lib'
import { reactive, toRefs } from 'vue'
import { THEMES } from './constants'
export default {
  title: 'Form Controls/SdChips',
  component: SdChip,
  argTypes: {
    theme: {
      control: 'select',
      options: THEMES
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
