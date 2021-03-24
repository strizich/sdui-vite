import { SdToast, SdButton } from '../lib'
import { reactive, toRefs } from 'vue'

export default {
  title: 'Components/SdToast',
  component: SdToast,
  argTypes: {
    theme: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'default',
        'success',
        'warning',
        'danger',
        'dark'
      ]
    },
    placement: {
      control: 'select',
      options: [
        'top',
        'top-left',
        'top-right',
        'bottom',
        'bottom-left',
        'bottom-right'
      ]
    }
  }
}

const Template = (args => ({
  components: {
    SdToast,
    SdButton
  },
  setup () {
    const state = reactive({
      args: args
    })
    return {
      ...toRefs(state)
    }
  },
  template: `
    <sd-button 
      @click="args.active = !args.active"
    >
      Toast
    </sd-button>
    <sd-toast 
      v-model:active="args.active"
      :theme="args.theme"
      :placement="args.placement"
      :duration="args.duration"
      :dismissable="args.dismissable"
      :persistant="args.persistant"
      :portal-disabled="args.portalDisabled"
      portal-to="body"
    >
      {{args.content}}
    </sd-toast>
  `}))


export const Default = Template.bind({});
Default.args = {
  portalDisabled: true,
  theme: 'dark',
  content: 'Toast Content'
};
