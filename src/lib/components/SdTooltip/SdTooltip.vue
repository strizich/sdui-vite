<template>
  <teleport ref="tooltipPortal" to="#app" :disabled="attachToParent">
    <transition name="tooltip">
      <div ref="tooltipRef" class="sd--tooltip" v-if="state.shouldRender">
        <div :class="['sd--tooltip__content', themeClass]">
          <div>
            <slot />
          </div>
          <div v-if="showArrow" :class="['sd--tooltip__arrow', themeClass]" data-popper-arrow/>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
// FUTURE: Split popper.js logic into a composable
import {
  computed,
  ref,
  reactive,
  watch,
  nextTick,
  onMounted,
  onUnmounted,
  PropType,
  defineComponent,
  Prop
} from 'vue'
import { createPopper, Placement } from '@popperjs/core'

export default defineComponent({
  name: 'SdTooltip',
  emits: ['update:active', 'open', 'close'],
  props: {
    teleport: {
      type: String,
      default: '#app'
    },
    active: Boolean,
    theme: String,
    // FUTURE: Update options obj with editable settings.
    delay: {
      type: [String, Number],
      default: 100
    },
    placement: {
      type: String as PropType<Placement>,
      default: 'top'
    },
    autoOpen: {
      type: Boolean,
      default: true
    },
    offset: {
      type: Array as PropType<number[]>,
      default: () => [0, 8]
    },
    showArrow: Boolean,
    attachToParent: Boolean
  },
  setup (props, { emit }) {
    // Element Bindings
    const tooltipPortal = ref(null)
    const tooltipRef = ref(null)

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
          offset: props.offset
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
      state.popperInstance = createPopper(state.targetEl, tooltipRef.value, options)
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

    const show = () => {
      state.shouldRender = true
      emit('open')
    }

    const hide = () => {
      state.shouldRender = false
      emit('close')
    }

    const touched = () => {
      state.shouldRender = !state.shouldRender
    }
    const outsideTouch = (e) => {
      if (state.shouldRender && state.targetEl !== e.target) {
        state.shouldRender = false
      }
    }
    const mountEventBindings = async () => {
      await nextTick().then(() => {
        // Gets the orignal parent instance of <teleport />
        state.targetEl = tooltipPortal.value?.parentNode
        if (props.autoOpen && state.targetEl) {
          document.body.addEventListener('touchstart', outsideTouch, false)
          state.targetEl.addEventListener('touchstart', touched, false)
          state.targetEl.addEventListener('mouseenter', show, false)
          state.targetEl.addEventListener('mouseleave', hide, false)
        }
      })
    }

    onMounted(() => {
      mountEventBindings()
      resetPopper()
    })

    onUnmounted(() => {
      if (props.autoOpen) {
        document.body.removeEventListener('touchstart', outsideTouch)
        state.targetEl.removeEventListener('touchstart', touched)
        state.targetEl.removeEventListener('mouseenter', show)
        state.targetEl.removeEventListener('mouseleave', hide)
      }
    })

    return {
      state,
      tooltipPortal,
      tooltipRef,
      themeClass
    }
  }
})
</script>

<style lang="scss">
@import '../SdElevation/mixins';
@import '../../scss/variables';

.sd--tooltip{
  // position:fixed;
  min-height: 32px;
  transition: opacity .5s;
  z-index: 500;
  user-select: none;
  &__content {
    max-width: 300px;
    min-height: 24px;
    padding: 8px;
    z-index: 111;
    pointer-events: none;
    border-radius: 2px;
    font-size: 14px;
    text-transform: none;
    white-space: wrap;
    opacity: 1;
    background-color: var(--background-highlight);
    color: var(--text);
    font-weight: 500;
    min-width: 40px;
    @include elevation(4);
    @each $key, $color in $sd-color-global {
         &.is--#{$key} {
          background-color: var(--#{$key}-highlight);
          color: var(--#{$key}-highlight-text);
        }
      }
    }
    &__arrow{
      &:before{
        background-color: var(--background-highlight);
      }
      @each $key, $color in $sd-color-global {
        &.is--#{$key} {
          &:before{
            background-color: var(--#{$key}-highlight);
          }
        }
      }
      &, &:before{
        position: absolute;
        width: 8px;
        height: 8px;
        z-index: 1;
      }
      &:before{
        content: '';
        transform: rotate(45deg);
      }
    }
    // FUTURE: Make this into a mixin for reuse
    &[data-popper-placement^='top'] .sd--tooltip__arrow {
      bottom: -4px;
    }
    &[data-popper-placement^='bottom'] .sd--tooltip__arrow {
      top: -4px;
    }
    &[data-popper-placement^='left'] .sd--tooltip__arrow {
      right: -4px;
    }
    &[data-popper-placement^='right'] .sd--tooltip__arrow {
      left: -4px;
    }
  }
  // FUTURE: Make this into a mixin for reuse
  .tooltip-enter-active, .tooltip-leave-active{
    .sd--tooltip__content {
      transition: opacity .2s .1s, transform .3s ease-in-out;
    }
  }
  .tooltip-enter-to{
    .sd--tooltip__content {
      opacity: 1;
      transform: translate3d(0, 0, 0)
    }
  }
  .tooltip-enter-from{
    .sd--tooltip__content {
      opacity: 0;
      transform: translate3d(0, 4px, 0);
    }
  }
  .tooltip-leave-to{
    .sd--tooltip__content {
      opacity: 0;
      transform: translate3d(0, -4px, 0);
    }
  }
</style>
