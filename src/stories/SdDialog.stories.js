import { SdDialog, SdDialogHeader, SdDialogContent, SdDialogFooter} from '../lib'
import '../lib/scss/engine.scss'
export default {
  title: 'SdDialog',
  component: SdDialog,
  argTypes: {
    size: { control: { type: 'select', options: ['xs', 'sm', 'md', 'lg'] } },
    placement: { control: { type: 'select', options: ['right', 'left'] } },
  }
};

const Template = (args => ({
  components: { SdDialog, SdDialogHeader, SdDialogContent, SdDialogFooter },
  setup () {
    return { args };
  },
  template: `
  <sd-dialog :teleport="null" v-bind="args">
    <sd-dialog-header :title="args.title" :subtitle="args.subtitle"/>
    <sd-dialog-content>Here be the body</sd-dialog-content>
    <sd-dialog-footer>Here be the foot</sd-dialog-footer>
  </sd-dialog>
  `
}))

export const Default = Template.bind({});
Default.args = {
  active: false,
  title: 'Dialog',
  subtitle: 'Its alive!',
  teleport: 'body',
};