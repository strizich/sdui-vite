import { SdSheet, SdGrid, SdCell } from '../lib'

export default {
  title: 'Grid System/SdGrid',
  component: SdCell,
  subcomponents: { SdGrid }
}

const Template = (args => ({
  components: {
    SdSheet, SdGrid, SdCell
  },
  subcomponents: { SdCell },
  setup () {
    return {
      args,
    }
  },
  template: `
    <sd-grid :gutter="args.gutter" :columns="args.columns">
      <sd-cell
        :xs="args.xs"
        :sm="args.sm"
        :md="args.md"
        :lg="args.lg"
        :xl="args.xl"
        :o-xs="args.oXs"
        :o-sm="args.oSm"
        :o-md="args.oMd"
        :o-lg="args.oLg"
        :o-xl="args.oXl"
      >
        <sd-sheet padded>Cell</sd-sheet>
      </sd-cell>
      <sd-cell
        :xs="args.xs"
        :sm="args.sm"
        :md="args.md"
        :lg="args.lg"
        :xl="args.xl"
        :o-xs="args.oXs"
        :o-sm="args.oSm"
        :o-md="args.oMd"
        :o-lg="args.oLg"
        :o-xl="args.oXl"
      >
        <sd-sheet padded>Cell</sd-sheet>
      </sd-cell>
      <sd-cell
        :xs="args.xs"
        :sm="args.sm"
        :md="args.md"
        :lg="args.lg"
        :xl="args.xl"
        :o-xs="args.oXs"
        :o-sm="args.oSm"
        :o-md="args.oMd"
        :o-lg="args.oLg"
        :o-xl="args.oXl"
      >
        <sd-sheet padded>Cell</sd-sheet>
      </sd-cell>
    </sd-grid>
  `}))


export const Default = Template.bind({});
Default.args = {
  gutter: [16, 16],
  columns: 12
};

