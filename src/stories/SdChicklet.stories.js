import SdChicklet from '../lib/components/SdChicklet/SdChicklet.vue';

export default {
  title: 'Components/SdChicklet',
  component: SdChicklet,
  argTypes: {
    id: {
      control: {
        type: 'text'
      }
    },
    theme: { control: { type: 'select', options: [
      'primary',
      'secondary',
      'default',
      'warning',
      'success',
      'danger',
      'dark'
    ] }},
    casing: {control: {type: 'select', options: [
      null,
      'uppercase',
      'lowercase',
      'captialize',
    ]}},
    size: { control: { type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] } }
  }
};

const themes = [
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
  'dark'
]

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
