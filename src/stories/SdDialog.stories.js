import { SdButton, SdDialog, SdDialogHeader, SdDialogContent, SdDialogFooter} from '../lib'
import { action } from '@storybook/addon-actions'
import { reactive } from 'vue'
import '../lib/scss/engine.scss'

export default {
  title: 'Components/SdDialog',
  component: SdDialog
};

const Template = (args => ({
  components: { SdDialog, SdDialogHeader, SdDialogContent, SdDialogFooter, SdButton },
  setup () {
    const state = reactive({
      active: args.active
    })

    const toggled = () => {
      state.active = !state.active
      action('update:active')
    }
    // const action = action('close')
    return { args, toggled, state  };
  },
  template: `
  <sd-button @click="toggled">Modal</sd-button> 
  <sd-dialog 
    :id="args.id"
    :size="args.size"
    :fullscreen="args.fullscreen"
    :portal-to="args.portalTo"
    :portal-disabled="args.portalDisabled"
    :aside="args.aside"
    :placement="args.placement"
    :backdrop-blur="args.backdropBlur"
    v-model:active="state.active"
  >
    <sd-dialog-header :title="args.title" :subtitle="args.subtitle"/>
    <sd-dialog-content>{{args.content}}</sd-dialog-content>
    <sd-dialog-footer>
      <sd-button theme="default" @click="toggled">Dismiss</sd-button>
    </sd-dialog-footer>
  </sd-dialog>
  `
}))

export const Dialog = Template.bind({});
Dialog.args = {
  active: false,
  title: 'Dialog',
  subtitle: 'Its alive!',
  content: 'Content goes here',
  portalTo: 'body',
  portalDisabled: true
};

export const Aside = Template.bind({});
Aside.args = {
  title: 'Aside',
  active: false,
  aside: true,
  subtitle: 'Its alive!',
  content: 'Content goes here',
  portalTo: 'body',
  portalDisabled: true
};