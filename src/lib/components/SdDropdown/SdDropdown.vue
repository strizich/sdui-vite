<template>
  <teleport
    ref="dropdownPortal"
    to="#app"
    :disabled="!portalToBody"
  >
    <transition name="dropdown">
      <div
        ref="dropdownRef"
        class="sd--dropdown"
        v-if="state.shouldRender"
      >
        <sd-focus-trap
          :target="dropdownContent"
          v-model="state.shouldRender"
          :outside-click="true"
        >
          <div ref="dropdownContent" :class="['sd--dropdown__content', themeClass]">
          <slot />
          </div>
        </sd-focus-trap>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
  ref,
  reactive,
  watch,
  nextTick,
  onMounted,
  onUnmounted
} from 'vue'
import { createPopper, Placement } from '@popperjs/core'
import SdFocusTrap from '../SdFocusTrap/SdFocusTrap.vue'
import SdThrottle from '../../core/utilities/SdThrottle'

export default defineComponent({
  components: { SdFocusTrap },
  name: 'SdDropdown',
  emits: ['update:modelValue', 'open', 'close'],
  props: {
    modelValue: Boolean,
    theme: {
      type: [String],
      default: 'default'
    },
    delay: {
      type: [String, Number],
      default: 100
    },
    placement: {
      type: String as PropType<Placement>,
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
    trigger: {
      type: String,
      default: null
    },
    portalToBody: {
      type: Boolean,
      default: true
    },
    lazy: {
      type: Boolean,
      default: true
    },
    closeOnClick: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    // Element Bindings
    const dropdownPortal = ref(null)
    const dropdownRef = ref(null)
    const dropdownContent = ref(null)

    // Styling
    const themeClass = computed(() => `is--${props.theme}`)

    // Element Instances
    const state = reactive({
      targetEl: null,
      popperInstance: null,
      shouldRender: false,
      trapActive: false
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
    watch(() => props.modelValue, () => {
      state.shouldRender = props.modelValue
    })

    // create popper
    const makePopper = () => {
      state.popperInstance = createPopper(state.targetEl, dropdownRef.value, options)
    }

    const killPopper = () => {
      if (state.popperInstance) {
        state.popperInstance.destroy()
        state.popperInstance = null
      }
    }

    const resetPopper = () => {
      if (state.popperInstance) {
        killPopper()
        makePopper()
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

    watch(() => state.shouldRender, (shouldRender) => {
      console.log(state.shouldRender)
      if (shouldRender) {
        bindPopper()
      } else {
        hide()
      }
    })

    const show = () => {
      state.shouldRender = true
      state.trapActive = true
      document.addEventListener('mouseup', clickOutside, {passive: true})
      document.addEventListener('touchend', clickOutside, {passive: true})
      
      emit('update:modelValue', true)
      emit('open')
    }

    const hide = () => {
        state.shouldRender = false
        state.trapActive = false  
        document.removeEventListener('mouseup', clickOutside)
        document.removeEventListener('touchend', clickOutside)

        emit('update:modelValue', false)
        emit('close')
    }

    const clickOutside = (e) => {
      const dropdown = e?.composedPath()[0] || e.target
      if (dropdown instanceof Node) {
        if(
          dropdownRef.value !== null &&
          !dropdownRef.value.contains(dropdown) ||
          props.closeOnClick
        ) {
          state.shouldRender = false
        }
      }
    }

    const mountEventBindings = async () => {
      await nextTick().then(() => {
        if (props.portalToBody) {
          // Gets the orignal parent node
          state.targetEl = dropdownPortal.value.parentNode
        }
        if (props.trigger) {
          state.targetEl = document.querySelector('#' + props.trigger)
          state.targetEl.addEventListener('click', SdThrottle(600, () => show()), { passive: true })
          state.targetEl.addEventListener('touch', SdThrottle(600, () => show()), { passive: true })
        }
      })
    }

    onMounted(() => {
      mountEventBindings()
      resetPopper()
    })

    onUnmounted(() => {
      // if (props.autoClose && state.targetEl) {
      //   state.targetEl.removeEventListener('mouseup', show)
      // }
    })

    return {
      state,
      dropdownPortal,
      dropdownRef,
      dropdownContent,
      themeClass,
      hide
    }
  }
})
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
