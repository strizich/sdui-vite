import {
  SdCard,
  SdCardBody,
  SdCardHeader,
  SdCardFooter,
  SdCardMedia,
  SdButton,
  SdIcon
} from '../lib'

export default {
  title: 'Components/SdCard',
  component: SdCard,
  subcomponents: {
    SdCardBody,
    SdCardHeader,
    SdCardFooter,
    SdCardMedia,
    SdButton,
    SdIcon
  },
  argTypes: {
    baseClass: {
      control: 'false'
    },
    elevation: {
      control:{
        type: 'range',
        max: 24,
        min: 1,
        step: 1
      }
    },
    ratio: {
      control: 'select',
      options: [
        '16x9',
        '4x3',
        '1x1'
      ]
    }
  }
}

const Template = (args => ({
  components: {
    SdCard,
    SdCardBody,
    SdCardHeader,
    SdCardFooter,
    SdCardMedia,
    SdButton,
    SdIcon
  },
  setup () {
    return {
      args
    }
  },
  template: `
  <div style="max-width: 600px; margin: 0 auto">
    <sd-card v-bind="args">
      <sd-card-header :title="args.title" :subtitle="args.subtitle" :inline="args.inline"/>
      <sd-card-body>
        Body content goes here
      </sd-card-body>
    </sd-card>
    <sd-card v-bind="args">
      <sd-card-header :title="args.title" :subtitle="args.subtitle" :inline="args.inline">
        <sd-button theme="primary" icon="more_vert" icon-only outline size="sm"/>
      </sd-card-header>
      <sd-card-media :ratio="args.ratio">
        <img src="https://place-puppy.com/600x600" alt="placepuppy placeholder"/>
      </sd-card-media>
      <sd-card-footer align="space-between">
        <sd-icon name="image" color="var(--text-accent)"/>
        <sd-button flat size="xs">Button</sd-button>
      </sd-card-footer>
    </sd-card>
  </div>
  `
}))

export const Default = Template.bind({});
Default.args = {
  title: 'Cards',
  subtitle: 'Subtitle goes here',
  ratio: '16x9',
  inline: true
};