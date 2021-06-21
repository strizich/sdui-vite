import SdButton from '../lib/components/SdButton/SdButton.vue';
import SdButtonGroup from '../lib/components/SdButton/SdButtonGroup.vue'

import { THEMES, ALIGNMENT, SIZES } from './constants'


export default {
  title: 'Components/SdButtonGroup',
  component: SdButtonGroup,
  argTypes: {
    id: {
      control: false
    },
    theme: { 
      control: 'select',
      options: THEMES
    },
    casing: {
      control: 'select',
      options: [
        null,
        'uppercase',
        'lowercase',
        'captialize'
      ]
    },
    type: { 
      control: 'select',
      options: [
        'button',
        'link'
      ]
    },
    align: { 
      control: 'select',
      options: ALIGNMENT
    },
    size: { 
      control: 'select',
      options: SIZES
    }
  },
  args: {
    id: ''
  },
  onClick: {action: 'clicked'},
}

const themes = THEMES

const Template = (args) => ({
  components: { SdButton, SdButtonGroup },
  setup() {
    return { args, themes };
  },
  template: `
  <sd-button-group :vertical="args.vertical">
    <sd-button
      :outline="args.outline"
      :pill="args.pill"
      :flat="args.flat"
      :icon="args.icon"
      :icon-end="args.iconEnd"
    >
      Button1
    </sd-button>
    <sd-button
      :outline="args.outline"
      :pill="args.pill"
      :flat="args.flat"
      :icon="args.icon"
      :icon-end="args.iconEnd"
    >
      Button1
    </sd-button>
    <sd-button
      :outline="args.outline"
      :pill="args.pill"
      :flat="args.flat"
      :icon="args.icon"
      :icon-end="args.iconEnd"
    >
      Button1
    </sd-button>
  </sd-button-group>
  `,
});

export const Default = Template.bind({});
Default.args = {};

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
export const WithIconEnd = Template.bind({});
WithIconEnd.args = {
  label: '',
  iconEnd: 'bluetooth'
};

export const WithIconOnly = Template.bind({});
WithIconOnly.args = {
  label: '',
  icon: 'bluetooth',
  iconOnly: true
};

