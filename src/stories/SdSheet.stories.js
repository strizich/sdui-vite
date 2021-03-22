import { SdSheet } from '../lib'

export default {
  title: 'Components/SdSheet',
  component: SdSheet
}

const themes = [
  null,
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
  'dark'
]

const Template = (args => ({
  components: {
    SdSheet
  },
  setup () {
    return {
      args,
      themes
    }
  },
  template: `
  <sd-sheet
    v-for="theme in themes" :key="theme"
    :theme="theme"
    :full-height="args.fullHeight"
    :padded="args.padded">
      content
    </sd-sheet>
  `}))


export const Default = Template.bind({});
Default.args = {};