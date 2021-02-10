<template>
  <teleport ref="dropdownPortal" to="#app" :disabled="attachToParent">
    <transition name="dropdown">
      <div ref="dropdownRef" class="sd--dropdown" v-if="state.shouldRender">
        <div :class="['sd--dropdown__content', themeClass]">
          <slot />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import {
  computed,
  ref,
  reactive,
  watch,
  nextTick,
  onMounted,
  onUnmounted
} from 'vue'
import { createPopper } from '@popperjs/core'

export default {
  name: 'SdDropdown',
  emits: ['update:active', 'open', 'close'],
  props: {
    active: Boolean,
    theme: {
      type: [String],
      default: 'default'
    },
    delay: {
      type: [String, Number],
      default: 100
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    autoClose: {
      type: Boolean,
      default: false
    },
    offset: {
      type: Array,
      default: () => [0, 8]
    },
    attachToParent: Boolean
  },
  setup (props, { emit }) {
    // Element Bindings
    const dropdownPortal = ref(null)
    const dropdownRef = ref(null)

    // Styling
    const themeClass = computed(() => `is--${props.theme}`)

    // Element Instances
    const state = reactive({
      targetEl: null,
      popperInstance: null,
      shouldRender: false
    })

    // Popper Options
    const options = reactive({
      placement: props.placement,
      modifiers: [{
        name: 'offset',
        options: {
          mainAxis: false,
          offset: ({ placement, reference, popper }) => {
            if (placement === 'bottom') {
              return [(popper.width / 2 - reference.width / 2), 8]
            } else {
              return props.offset
            }
          }
        }
      },
      {
        name: 'preventOverflow',
        options: {
          boundary: 'viewport',
          rootBoundary: 'document'
        }
      }]
    })

    // Copy active prop to local state
    watch(() => props.active, () => {
      state.shouldRender = props.active
    })

    // emit when state has been updated...
    // FUTURE: potentially worth looking into using the new v-model bindings for this.
    watch(() => state.shouldRender, (shouldRender) => {
      emit('update:active', shouldRender)
      if (shouldRender) {
        bindPopper()
      }
    })

    // create popper
    const makePopper = () => {
      state.popperInstance = createPopper(state.targetEl, dropdownRef.value, options)
    }

    // kill your creation
    const killPopper = () => {
      if (state.popperInstance) {
        state.popperInstance.destroy()
        state.popperInstance = null
      }
    }

    // bind popper instance at the next repaint
    const bindPopper = () => {
      nextTick().then(() => {
        if (state.targetEl) {
          makePopper()
        }
      })
    }

    const resetPopper = () => {
      if (state.popperInstance) {
        killPopper()
        makePopper()
      }
    }
    const show = (e) => {
      if (!state.shouldRender) {
        state.shouldRender = true
        e.stopPropagation()
        emit('open')
      }
    }
    const hide = (e) => {
      if (state.shouldRender) {
        state.shouldRender = false
        e.stopPropagation()
        emit('close')
      }
    }

    const mountEventBindings = async () => {
      await nextTick().then(() => {
        // Gets the orignal parent instance of <teleport />
        state.targetEl = dropdownPortal.value?.parentNode
        if (state.targetEl) {
          // add event listeners for keyboard.
          state.targetEl.addEventListener('click', (e) => show(e), false)
        }
        if (props.autoClose && state.targetEl) {
          document.body.addEventListener('click', (e) => hide(e), false)
        }
      })
    }

    onMounted(() => {
      mountEventBindings()
      resetPopper()
    })

    onUnmounted(() => {
      document.body.removeEventListener('click', (e) => hide(e))
      if (props.autoClose && state.targetEl) {
        state.targetEl.removeEventListener('click', (e) => show(e))
      }
    })

    return {
      state,
      dropdownPortal,
      dropdownRef,
      themeClass,
      hide
    }
  }
}
</script>

<style lang="scss">
@import '../SdElevation/mixins';
@import '../../scss/variables';

.sd--dropdown{
  // position:fixed;
  min-height: 32px;
  transition: opacity .5s;
  min-width: 220px;
  z-index: 1002;
  user-select: none;
  position: absolute;
  &__content {
    max-width: 300px;
    min-height: 24px;
    z-index: 111;
    border-radius: 2px;
    font-size: 14px;
    text-transform: none;
    white-space: wrap;
    opacity: 1;
    background-color: var(--background-accent);
    font-weight: 500;
    min-width: 40px;
    @include elevation(4);
    div > * {
      display:block;
      width: 100%;
    }
  }
  & ~ .sd--overlay{
    pointer-events: none;
  }
}
  // FUTURE: Make this into a mixin for reuse
  .dropdown-enter-active, .dropdown-leave-active{
    .sd--dropdown__content {
      transition: opacity .2s .1s, transform .3s ease-in-out;
    }
  }
  .dropdown-enter-to{
    .sd--dropdown__content {
      opacity: 1;
      transform: translate3d(0, 0, 0)
    }
  }
  .dropdown-enter-from{
    .sd--dropdown__content {
      opacity: 0;
      transform: translate3d(0, 4px, 0);
    }
  }
  .dropdown-leave-to{
    .sd--dropdown__content {
      opacity: 0;
      transform: translate3d(0, -4px, 0);
    }
  }
</style>
