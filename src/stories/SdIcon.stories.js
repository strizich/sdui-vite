import SdIcon from '../lib/components/SdIcon/SdIcon.vue';
import { SIZES } from './constants'
export default {
  title: 'Components/SdIcon',
  component: SdIcon,
  argTypes: {
    size: { 
      control: 'select', 
      options: SIZES
    },
    family: {
      control: 'select',
      options: [
        null, 
        'round',
        'outlined',
        'sharp',
        'two-tone'
      ]
    }
  }
};

const Template = (args) => ({
  components: { SdIcon },
  setup() {
    return { args };
  },
  template: `
    <sd-icon 
      v-bind="args"
    />
  `,
});

export const Default = Template.bind({});
Default.args = {};
