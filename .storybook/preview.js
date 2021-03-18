import { themes } from '@storybook/theming'
import { computed } from 'vue'
import '../src/lib/scss/engine.scss'

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      // array of plain string values or MenuItem shape (see below)
      items: ['light', 'dark'],
    },
  },
};

export const parameters = {
  docs: {
    theme: themes.dark
  }
}

const withColorScheme = (args, context) => ({
  setup() {
    const scheme = computed(() => {
      return `sd--scheme--${context.globals.theme}`
    })
    return  { args, scheme };
  },
    inheritAttrs: false,
    template: '<div :class="scheme"><story /></div>'
})

export const decorators = [withColorScheme]
