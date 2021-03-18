import { SdHamburger } from '../lib'

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