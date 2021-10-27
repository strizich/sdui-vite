<template>
  <slot />
</template>

<script>
import { watchEffect, onUnmounted } from 'vue'
import { createFocusTrap } from 'focus-trap'

export default {
  name: 'SdFocusTrap',
  emits: ['activate', 'deactivate', 'update:modelValue'],
  props: {
    target: {
      type: [HTMLElement, String],
      default: null
    },
    active: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    escDeactivates: {
      type: Boolean,
      default: true
    },
    outsideClick: {
      type: Boolean,
      default: false
    },
    returnFocus: {
      type: Boolean,
      default: true
    },
    setReturnFocus: {
      type: [HTMLElement, SVGElement, String, Function],
      default: undefined
    },
    preventScroll: {
      type: Boolean,
      default: false
    },

  },
  setup(props, {emit}) {
    let trap = null

    watchEffect(() => {
      if (props.target instanceof HTMLElement) {
        trap = createFocusTrap(props.target, {
          returnFocusOnDeactivate: props.returnFocus,
          clickOutsideDeactivates: props.outsideClick,
          onActivate: () => {
            emit('update:modelValue', true)
            emit('activate', true)
          },
          onDeactivate: () => {
            emit('update:modelValue', false)
            emit('activate', false)
            emit('deactivate', true)
          }
        })
        if(props.active || props.modelValue) {
          trap.activate()
        } else {
          trap.deactivate()
        }
      }
    }, {flush: 'pre'})

    onUnmounted(() => {
      trap.deactivate()
    })
  }
}
</script>