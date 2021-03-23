import { reactive, toRefs } from 'vue'
import { SdSwitch } from '../lib'
export default {
  title: 'Form Controls/SdSwitch',
  component: SdSwitch,
  argTypes: {
    id: {
      control: false
    },
    theme: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'default',
        'success',
        'danger',
        'warning'
      ]
    }
  }
}

const Template = (args => ({
  components: { SdSwitch },
  setup () {
    const state = reactive({
      args: args
    })
    return { ...toRefs(state) }
  },
  template: `
  <div>
    <div class="defaultExample" v-if="!args.arrItems && !args.objArrItems">
      <sd-switch
        v-model="args.modelValue"
        :required="args.required"
        :disabled="args.disabled"
        :true-value="args.trueValue"
        :false-value="args.falseValue"
        :rotate-anim="args.rotateAnim"
        :value="args.value"
        :theme="args.theme"
      >
        {{args.label}}
      </sd-switch>
    </div>
    <div class="arrExample" v-if="args.arrItems">
      <sd-switch
        v-for="(item, index) in args.arrItems"
        v-model="args.modelValue"
        :value="item"
        :key="index">
          {{typeof item === 'string' ? item : item.label}}
      </sd-switch>
    </div>
    <div class="arrExample" v-if="args.objArrItems">
      <sd-switch
        v-for="(item, index) in args.objArrItems"
        v-model="args.modelValue[index].selected"
        :key="index"
      >
        {{typeof item === 'string' ? item : item.label}}
      </sd-switch>
    </div>
    <pre><code>selected: {{args.modelValue}}</code></pre>
  </div>
  `
}))

export const Default = Template.bind({})
Default.args = {
  label: 'v-model as boolean',
  value: true,
  modelValue: true
}

Default.argTypes = {
  modelValue: {
    control: 'boolean'
  }
}

export const WithString = Template.bind({})
WithString.args = {
  label: 'v-model as string',
  value: 'word',
  modelValue: 'word'
}

WithString.argTypes = {
  modelValue: {
    control: 'text'
  }
}

// export const WithObject = Template.bind({})
// WithObject.args = {
//   items: [],
//   label: 'v-model as object',
//   modelValue: {
//     label: 'Im a object',
//     selected: false
//   }
// }

export const WithArray = Template.bind({})
WithArray.args = {
  arrItems: ['Apples', 'Oranges', 'Pears', 'Lemons'],
  label: 'v-model as array',
  modelValue: ['Apples', 'Lemons']
}

export const WithArrayOfObjects = Template.bind({})
WithArrayOfObjects.args = {
  objArrItems: [
    {
      label: 'Xbox',
      value: 'xbox', 
      selected: false
    },
    {
      label: 'Playstation',
      value: 'playstation',
      selected: false
    }
  ],
  label: 'v-model as array of object',
  modelValue: [
    {
      label: 'Xbox',
      value: 'xbox', 
      selected: false
    },
    {
      label: 'Playstation',
      value: 'playstation',
      selected: true
    }
  ]
}