
import { SdActionBar } from '../lib'

export default {
  title: 'Components/SdActionBar',
  component: SdActionBar
}


const Template = (args => ({
  components: {
    SdActionBar
  },
  setup () {
    return {
      args
    }
  },
  template: `
    <div style="width: 300px">
      <sd-action-bar v-bind="args"/>
    </div>
  `}))


export const Default = Template.bind({});
Default.args = {};
