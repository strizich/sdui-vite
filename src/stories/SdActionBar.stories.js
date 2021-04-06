
import { SdActionBar } from '../lib'

export default {
  title: 'Layout/SdActionBar',
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
    <div>
      <p>WIP</p>
      <sd-action-bar v-bind="args"/>
    </div>
  `}))


export const Default = Template.bind({});
Default.args = {};
