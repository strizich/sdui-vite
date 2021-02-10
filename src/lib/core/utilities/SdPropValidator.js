// Needs upgrading to v3

import Vue from 'vue'

export default (name, options) => {
  return {
    validator: value => {
      if (options.includes(value)) {
        return true
      }
      Vue.util.warn(`The ${name} prop is invalid. Value: ${name}. Expected: ${options.join(', ')}.`, this)
      return false
    }
  }
}
