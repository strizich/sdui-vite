import {
  SdCard,
  SdCardBody,
  SdCardHeader,
  SdCardFooter,
  SdCardMedia,
  SdButton
} from '../lib'

export default {
  title: 'Components/SdCard',
  component: SdCard,
  subcomponents: {
    SdCardBody, SdCardHeader, SdCardFooter, SdCardMedia, SdButton
  },
  argTypes: {
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
    SdCard, SdCardBody, SdCardHeader, SdCardFooter, SdCardMedia, SdButton
  },
  setup () {
    return {
      args
    }
  },
  template: `
  <div style="display:flex;">
    <sd-card v-bind="args" style="width:50%; margin: 0 8px;">
      <sd-card-header :title="args.title"/>
      <sd-card-body>
        Body content goes here
      </sd-card-body>
      <sd-card-footer>
        huh
      </sd-card-footer>
    </sd-card>
    <sd-card v-bind="args" style="width:50%; margin: 0 8px;">
      <sd-card-header :title="args.title"/>
      <sd-card-media :ratio="args.ratio" size="sm">
        <img src="https://place-puppy.com/600x600" alt="placepuppy placeholder"/>
      </sd-card-media>
      <sd-card-footer align="flex-end">
        <sd-button flat>Button</sd-button>
      </sd-card-footer>
    </sd-card>
  </div>
  `
}))

export const Default = Template.bind({});
Default.args = {
  title: 'Cards',
  ratio: '16x9',
};