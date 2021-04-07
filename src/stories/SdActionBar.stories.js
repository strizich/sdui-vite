import { reactive } from 'vue'
import { SdActionBar, SdButton, SdCheckbox, SdFieldset } from '../lib'

export default {
  title: 'Layout/SdActionBar',
  component: SdActionBar
}


const Template = (args => ({
  components: {
    SdActionBar,
    SdButton,
    SdCheckbox,
    SdFieldset
  },
  setup () {
    const state = reactive({
      checked: false
    })
    return {
      args,
      state
    }
  },
  template: `
    <div>
      <p>WIP</p>
      <sd-action-bar v-bind="args">
        <template #start>
          <sd-fieldset title="Left Slot">
            <sd-button>Button</sd-button>
            <sd-button>Button</sd-button>
          </sd-fieldset>
        </template>
        <template #end>
        <sd-fieldset title="Right Slot">
          <sd-checkbox v-model="state.checked">Button</sd-checkbox>
        </sd-fieldset>
        </template>
      </sd-action-bar>
    </div>
  `}))


export const Default = Template.bind({});
Default.args = {};
