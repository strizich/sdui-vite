import '../lib/scss/engine.scss'
import SdButton from '../lib/components/SdButton/SdButton.vue';

export default {
  title: 'Components/SdButton',
  component: SdButton,
  decorators: [() => ({
    template: '<div style="text-align:center; padding: 40px"><story /></div>'
  })],
  argTypes: {
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
  label: 'Primary',
  theme: 'primary'
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Secondary',
  theme: 'secondary'
};

export const Default = Template.bind({});
Default.args = {
  label: 'Default',
  theme: 'default'
};

export const Success = Template.bind({});
Success.args = {
  label: 'Success',
  theme: 'success',
};

export const Danger = Template.bind({});
Danger.args = {
  label: 'Danger',
  theme: 'danger'
};

export const Warning = Template.bind({});
Warning.args = {
  label: 'Warning',
  theme: 'warning'
};

export const Dark = Template.bind({});
Dark.args = {
  label: 'Dark',
  theme: 'dark'
};

export const Outline = Template.bind({});
Outline.args = {
  label: 'Outline',
  theme: 'primary',
  outline: true
};

export const Pill = Template.bind({});
Pill.args = {
  label: 'Pill',
  theme: 'primary',
  pill: true
};

export const Rounded = Template.bind({});
Rounded.args = {
  label: 'Rounded',
  theme: 'primary',
  rounded: true
};
