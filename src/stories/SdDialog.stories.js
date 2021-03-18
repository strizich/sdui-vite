import { SdButton, SdDialog, SdDialogHeader, SdDialogContent, SdDialogFooter} from '../lib'
import { reactive } from 'vue'

export default {
  title: 'Components/SdDialog',
  component: SdDialog,
  subcomponents: {
    SdDialogHeader, SdDialogContent, SdDialogFooter
  },
  argTypes: {
    portalTo: {
      control: false
    },
    portalDisabled: {
      control: false
    }
  }
};

const Template = (args => ({
  components: { SdDialog, SdDialogHeader, SdDialogContent, SdDialogFooter, SdButton },
  setup () {
    const state = reactive({
      active: args.active
    })

    const toggled = () => {
      state.active = !state.active
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
    :backdrop="args.backdrop"
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