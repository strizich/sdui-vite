import '../lib/scss/engine.scss'
import SdButton from '../lib/components/SdButton/SdButton.vue';

export default {
  title: 'SdButton',
  component: SdButton,
  argTypes: {
    theme: { control: { type: 'select', options: [
      'primary',
      'secondary',
      'default',
      'warning',
      'success',
      'danger'
    ] }},
    casing: {control: {type: 'select', options: [
      'uppercase',
      'lowercase',
      'captialize'
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
    size: { control: { type: 'select', options: ['xs', 'sm', 'md', 'lg'] } },
    onClick: {},
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { SdButton },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<sd-button v-bind="args">{{args.label}}</label>',
});

export const Primary = Template.bind({});
Primary.args = {
  label: 'Button',
  theme: 'primary'
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Secondary',
  theme: 'primary',
  outline: true
};

export const Danger = Template.bind({});
Danger.args = {
  label: 'Danger',
  theme: 'danger',
  flat: true
};

