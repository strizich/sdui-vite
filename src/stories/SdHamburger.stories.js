import { SdHamburger } from '../lib'
import { reactive, toRefs } from 'vue'
export default {
  title: 'Components/SdHamburger',
  component: SdHamburger,
  argTypes: {
    onClick:  { action: 'update:active' }
  }
};

const Template = (args => ({
  components: { SdHamburger },
  setup () {
    const state = reactive({
      args
    })
    return { ...toRefs(state) };
  },
  template: '<sd-hamburger v-model:active="args.active"/>'
}))

export const Default = Template.bind({});
Default.args = {
  label: 'hm',
  active: false
}