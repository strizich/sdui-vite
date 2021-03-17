import { SdHamburger } from '../lib'
import '../lib/scss/engine.scss'

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
    return { args };
  },
  template: '<sd-hamburger :active="args.active"/>'
}))

export const Default = Template.bind({});
Default.args = {
  label: 'hm'
}