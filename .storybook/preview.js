import './preview.scss'
import { themes } from '@storybook/theming'
import { computed } from 'vue'
import { useScheme } from '../src/lib'
import { toRef } from 'vue'
import '../src/lib/scss/engine.scss'

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'dark',
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
    const { globals } = context
    useScheme(toRef(globals, 'theme'))
    const scheme = computed(() => {
      return `sd--scheme--${globals.theme}`
    })
    return  { args, scheme };
  },
    inheritAttrs: false,
    template: '<story />'
})

export const decorators = [withColorScheme]
