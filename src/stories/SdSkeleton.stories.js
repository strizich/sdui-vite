import { SdSkeleton } from '../lib'

export default {
  title: 'Components/SdSkeleton',
  component: SdSkeleton
}


const Template = (args => ({
  components: {
    SdSkeleton
  },
  setup () {
    return {
      args
    }
  },
  template: `
    <div style="width: 300px">
      <sd-skeleton v-bind="args"/>
      <sd-skeleton v-bind="args"/>
      <sd-skeleton v-bind="args"/>
    </div>
  `}))


export const Default = Template.bind({});
Default.args = {};
