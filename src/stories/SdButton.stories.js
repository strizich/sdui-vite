import SdButton from '../lib/components/SdButton/SdButton.vue';

export default {
  title: 'Components/SdButton',
  component: SdButton,
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
    type: { control: { type: 'select', options: [
      'button',
      'link',
    ] }},
    align: { control: { type: 'select', options: [
      'start',
      'end',
      'center'
    ] }},
    size: { control: { type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] } },
    onClick: {action : 'clicked'},
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
  components: { SdButton },
  setup() {
    return { args, themes };
  },
  template: `
    <sd-button 
      v-for="theme in themes"
      :key="theme"
      :theme="theme"
      :type="args.type"
      :href="args.href"
      :align="args.align"
      :size="args.size"
      :flat="args.flat"
      :pill="args.pill"
      :rounded="args.rounded"
      :outline="args.outline"
      :block="args.block"
      :icon="args.icon"
      :icon-only="args.iconOnly"
      :disabled="args.disabled"
      :casing="args.casing"
    >
      <span v-if="!args.iconOnly">
        {{args.label ? args.label : theme}}
      </span>
    </sd-button>
  `,
});

export const Default = Template.bind({});
Default.args = {
  label: '',
};

export const Outline = Template.bind({});
Outline.args = {
  label: '',
  outline: true
};

export const Pill = Template.bind({});
Pill.args = {
  label: '',
  pill: true
};

export const Rounded = Template.bind({});
Rounded.args = {
  label: '',
  rounded: true
};

export const Flat = Template.bind({});
Flat.args = {
  label: '',
  flat: true
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  label: '',
  icon: 'bluetooth'
};

export const WithIconOnly = Template.bind({});
WithIconOnly.args = {
  label: '',
  icon: 'bluetooth',
  iconOnly: true
};

