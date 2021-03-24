import { SdButton, SdTooltip} from '../lib'
import { THEMES } from './constants'
export default {
  title: 'Components/SdTooltip',
  component: SdTooltip,
  decorators: [() => ({
    template: '<div style="text-align:center; padding: 40px 0;"><story /></div>'
  })],
  argTypes: {
    placement: {
      control:'select', 
      options: [
        'right',
        'left',
        'top',
        'bottom'
      ]
    }
  }
};

const themes = [
  null,
  ...THEMES
]

const Template = (args => ({
  components: { SdButton, SdTooltip },
  setup () {
    return { args, themes };
  },
  inheritAttrs: false,
  template: `
  <sd-button theme="default" outline v-for="theme in themes" :key="theme">
    <span>Hover Me!</span>
    <sd-tooltip
      portal-to="body"
      :theme="theme"
      :placement="args.placement"
      :offset="args.offset"
      :auto-open="args.autoOpen"
      :show-arrow="args.showArrow"
      :active="args.active"
      :delay="args.delay"
    >
      {{args.label}} ({{theme !== null ? theme : 'default'}})
    </sd-tooltip>
  </sd-button>
`
}))

export const Default = Template.bind({});
Default.args = {
  label: 'Tooltip',
  portalDisabled: true
};

export const PlacementLeft = Template.bind({});
PlacementLeft.args = {
  label: 'Tooltip',
  placement: "left",
  portalDisabled: true
};

export const PlacementRight = Template.bind({});
PlacementRight.args = {
  label: 'Tooltip',
  placement: "right",
  portalDisabled: true
};

export const PlacementBottom = Template.bind({});
PlacementBottom.args = {
  label: 'Tooltip',
  placement: "bottom",
  portalDisabled: true
};