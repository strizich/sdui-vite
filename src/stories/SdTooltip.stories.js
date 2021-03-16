import { SdButton, SdTooltip} from '../lib'
import '../lib/scss/engine.scss'

export default {
  title: 'SdTooltip',
  component: SdTooltip
};

const Template = (args => ({
  components: { SdButton, SdTooltip },
  setup () {
    return { args };
  },
  template: `
  <sd-button>
    <span>Hover Me!</span>
    <sd-tooltip v-bind="args">
      {{args.label}}
    </sd-tooltip>
  </sd-button>
  `
}))

export const Default = Template.bind({});
Default.args = {
  label: 'Tooltip',
  teleport: 'body',
  theme: "primary",
  placement: "right",
  attachToParent: true
};