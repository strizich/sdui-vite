import SdChicklet from '../lib/components/SdChicklet/SdChicklet.vue';
import { THEMES , SIZES } from './constants'
export default {
  title: 'Components/SdChicklet',
  component: SdChicklet,
  argTypes: {
    id: {
      control: 'text'
    },
    theme: { 
      control: 'select',
      options: THEMES
    },
    casing: {control: 'select', options: [
      null,
      'uppercase',
      'lowercase',
      'captialize',
    ]},
    size: { 
    control: 'select', 
    options: SIZES
  }
  }
};

const themes = THEMES

const Template = (args) => ({
  components: { SdChicklet },
  setup() {
    return { args, themes };
  },
  template: `
    <sd-chicklet 
      v-for="theme in themes"
      :theme="theme"
      :size="args.size"
      :icon="args.icon"
      :dismissable="args.dismissable"
      :key="theme"
    >
      {{args.label ? args.label : theme}}
    </sd-chicklet>
  `,
});

export const Default = Template.bind({});
Default.args = {
  label: '',
};
