import { SdButton, SdTooltip} from '../lib'
import '../lib/scss/engine.scss'

export default {
  title: 'Components/SdTooltip',
  component: SdTooltip,
  argTypes: {
    placement: { control: { type: 'select', options: ['right', 'left'] } },
    handles: ['mouseover', 'huh']
  }
};

const Template = (args => ({
  template: `
  <sd-button>
    <span>Hover Me!</span>
    <sd-tooltip v-bind="args">
      {{args.label}}
    </sd-tooltip>
  </sd-button>
  `,
  setup () {
    return { args };
  },
  components: { SdButton, SdTooltip },
}))

export const Default = Template.bind({});
Default.args = {
  label: 'Tooltip',
  teleport: 'body',
  theme: "primary",
  placement: "right",
  attachToParent: true
};