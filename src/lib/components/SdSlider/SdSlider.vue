<template>
  <div class="sd--slider">
    <sd-label v-if="label">{{label}}</sd-label>
    <slot name="label"/>
    <div class="sd--slider__container">
      <div class="sd--slider__min" v-if="showIndicators">
        {{min}}
      </div>
      <div class="sd--slider__content" ref="slider">
        <div class="sd--slider__track-container">
          <!-- <div class="sd--slider__ticks" v-if="showTicks">
            <div class="sd--slider__tick" v-for="n in tickCount" :key="n"/>
          </div> -->
          <div
            class="sd--slider__track"
            :style="thumbTrackStyle"
          />
        </div>
        <div
          ref="handle"
          :class="['sd--slider__thumb-container', thumbClass]"
          tabindex="0"
          :style="thumbStyle"
        >
          <svg class="sd--slider__thumb" width="24" height="24">
            <circle cx="12" cy="12" r="12"/>
          </svg>
          <sd-tooltip
            ref="ttip"
            attach-to-parent
            :active="state.isDragging || hasFocus"
            :autoOpen="false"
            :show-arrow="false"
            :offset="[0, 8]"
            v-if="showTooltip"
          >
            <div class="sd--center sd--big">
              {{result}}
            </div>
          </sd-tooltip>
          <transition name="dragging">
            <div class="sd--slider__pulse" v-if="state.isDragging || hasFocus"></div>
          </transition>
        </div>
      </div>
      <div class="sd--slider__max" v-if="showIndicators">
        {{max}}
      </div>
    </div>
    <small v-if="hint" class="sd--text__footnote">{{hint}}</small>
    <slot name="hint"/>
  </div>
</template>

<script>
// Math to calculate required values
import {
  defineComponent,
  ref,
  reactive,
  computed,
  watchEffect,
  onMounted,
  onUnmounted,
  watch,
  nextTick
} from 'vue'

import {
  minMax,
  quantizeValue,
  pctComplete,
  convertValueToPx,
  singleUnitValue,
  convertToValue
} from './SdSliderFoundation'
import useKeyboardFocus from '../../hooks/useKeyboardFocus'
import SdLabel from '../SdField/SdLabel.vue'
import SdTooltip from '../SdTooltip/SdTooltip.vue'

export default defineComponent({
  name: 'SdSlider',
  components: {
    SdTooltip,
    SdLabel
  },
  props: {
    label: String,
    value: Number,
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    showIndicators: Boolean,
    showTicks: Boolean,
    showTooltip: Boolean,
    theme: String,
    hint: String
  },
  emits: ['update:value'],
  setup (props, { emit }) {
    const slider = ref(null)
    const handle = ref(null)
    const hasFocus = useKeyboardFocus(handle)
    const state = reactive({
      init: false,
      computedX: 0,
      x: 0,
      minX: 0,
      maxX: 0,
      dragStartX: null,
      isDragging: false,
      handleWidth: 0,
      handleHeight: 0,
      offset: null,
      unit: 0,
      pctComplete: 0
    })

    // Gets the number of ticks
    // const tickCount = computed(() => {
    //   return (props.max - props.min) / props.step
    // })

    // Computed Styles
    const thumbTrackStyle = computed(() => {
      return {
        width: state.computedX + (state.handleWidth / 2) + 'px'
      }
    })

    // Computed Classes
    const thumbStyle = computed(() => {
      return {
        transition: 'transform .23s ease-in-out',
        position: 'absolute',
        left: state.computedX - (state.handleWidth / 2) + 'px',
        cursor: state.isDragging ? 'grab' : 'pointer',
        zIndex: state.isDragging ? 1000 : 0
      }
    })

    const thumbClass = computed(() => {
      return {
        'is--dragging': state.isDragging,
        'is--focused': hasFocus.value
      }
    })

    // --- Keyboard Handlers --- //
    // Increases the value by a unit which is `step / (max - min) * width`
    const handleIncrementUp = () => {
      state.x = state.computedX + state.unit
      state.pctComplete = pctComplete(state.x, state.maxX)
    }

    // Decrease the value by a unit
    const handleIncrementDown = () => {
      state.x = state.computedX - state.unit
      state.pctComplete = pctComplete(state.x, state.maxX)
    }

    // Increase the value to the upper boundry (clientWith / maxX)
    const handleIncrementMax = () => {
      state.x = state.maxX
      state.pctComplete = 1
    }

    // Decrease the value to the lower boundry (0)
    const handleIncrementMin = () => {
      state.x = 0
      state.pctComplete = 0
    }

    // --- Keyboard Events --- //
    const onKeydown = e => {
      // `e.preventDefault()` is called in each case so that it does not block other keys. Eg. `Tab`
      switch (e.key) {
        case 'ArrowLeft':
        case 'PageUp':
        case 'ArrowDown':
          e.preventDefault()
          handleIncrementDown()
          break

        case 'ArrowRight':
        case 'PageDown':
        case 'ArrowUp':
          e.preventDefault()
          handleIncrementUp()
          break

        case 'Home':
          e.preventDefault()
          handleIncrementMin()
          break

        case 'End':
          e.preventDefault()
          handleIncrementMax()
          break
      }
    }

    // --- Mouse / Touch Handlers --- //
    const handleMove = (e) => {
      const { clientX } = e
      state.x = Math.max(0, Math.min(clientX - state.dragStartX, state.maxX))
      state.pctComplete = pctComplete(state.x, state.maxX)
    }

    const handleStart = (e) => {
      const { clientX } = e
      const clickX = Math.round((clientX - state.offset))
      state.isDragging = true
      state.x = Math.max(0, Math.min(clickX, state.maxX))
      state.dragStartX = clientX - state.x
      state.pctComplete = pctComplete(state.x, state.maxX)
    }

    const handleEnd = (e) => {
      state.isDragging = false
      state.dragStartX = null
    }

    // --- Mouse Events --- //
    const onMouseMove = e => {
      e.preventDefault()
      handleMove(e)
    }

    const onMouseDown = e => {
      handleStart(e)
      document.addEventListener('mouseup', onMouseUp, { passive: true })
      document.addEventListener('mousemove', onMouseMove, { passive: false })
    }

    const onMouseUp = e => {
      handleEnd(e)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousedown', onMouseDown)
    }

    // --- Touch Events---
    const onTouchMove = e => {
      e.preventDefault()
      handleMove(e.touches[0])
    }

    const onTouchStart = e => {
      handleStart(e.touches[0])
      document.addEventListener('touchend', onTouchEnd, { passive: true })
      document.addEventListener('touchmove', onTouchMove, { passive: false })
    }

    const onTouchEnd = e => {
      handleEnd(e.touches[0])
      document.removeEventListener('touchstart', onTouchStart)
      document.removeEventListener('touchend', onTouchEnd)
      document.removeEventListener('touchmove', onTouchMove)
    }

    // --- Window Resize Handler  -- //
    const handleWindowResize = () => {
      nextTick().then(() => {
        if (
          slider.value instanceof HTMLElement &&
          handle.value instanceof HTMLElement
        ) {
          const rect = slider.value.getBoundingClientRect()
          state.offset = Math.round(rect.left)
          state.maxX = Math.round(slider.value.clientWidth)
          state.handleWidth = Math.round(handle.value.clientWidth)
        }
      })
    }

    // Core of the maths. Will rerun if any of the dependencies change.
    // Also runs once the component is mount (flush: 'post')
    watchEffect(() => {
      if (
        slider.value instanceof HTMLElement &&
        handle.value instanceof HTMLElement
      ) {
        const rect = slider.value.getBoundingClientRect()
        state.init = true

        // Used to offset the click position. Useful if the element has moved since the last interaction.
        state.offset = Math.round(rect.left)

        // Allows for more flexability in future iterations. (Mostly useless right now)
        state.handleWidth = Math.round(handle.value.clientWidth)

        // The width of the slider element in pixels. Used to calculate the % complete and lock the handle in the upper bounds
        state.maxX = Math.round(slider.value.clientWidth)

        // Core calculation to convert an arbitrary value into pixels
        state.computedX = convertValueToPx(props.value, props.min, props.max, state.maxX)

        // The value of a single unit of X converted to pixels.
        state.unit = singleUnitValue(props.step, props.min, props.max, state.maxX)

        // Adds listeners when mounted. Not totally sure why I put it here.
        if (hasFocus.value) {
          handle.value.addEventListener('keydown', onKeydown, { passive: false })
        } else {
          handle.value.removeEventListener('keydown', onKeydown)
        }

        slider.value.addEventListener('touchstart', onTouchStart, { passive: true })
        slider.value.addEventListener('mousedown', onMouseDown)
      }
    }, { flush: 'post' })

    // Final Calculations
    const result = computed(() => {
      const currentValue = convertToValue(state.pctComplete, props.min, props.max)
      const quantize = quantizeValue(currentValue, props.step)
      if (currentValue !== props.max && currentValue !== props.min) {
        return minMax(props.min, quantize, props.max)
      }
      return minMax(props.min, currentValue, props.max)
    })

    // Emits the result on change
    watch(() => result.value, (newValue) => {
      emit('update:value', newValue)
    })

    onMounted(() => {
      // Listens to resize events. `SdLayout` will also emit resize events when the state of the sidebar changes.
      window.addEventListener('resize', handleWindowResize)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleWindowResize)
    })

    return {
      state,
      slider,
      handle,
      thumbStyle,
      thumbClass,
      thumbTrackStyle,
      result,
      hasFocus
    }
  }
})
</script>

<style lang="scss">
@import '../SdElevation/mixins';

.sd--slider{
  &__container{
    display:flex;
    width:100%;
    justify-content: space-between;
    align-items: center;
  }
  &__min, &__max{
    margin: 0 8px;
    padding: 8px 16px;
    font-size: 11px;
    background-color: var(--background-accent)
  }
  &__min {
    margin-left: 0;
  }
  &__max {
    margin-right:0;
  }
  &__content{
    position:relative;
    height: 24px;
    border-radius: 30px;
    width:100%;
  }
  &__track-container{
    background-color: var(--background-accent);
    position: absolute;
    height: 8px;
    left:0;
    right:0;
    top: 50%;
    margin-top: -4px;
    border-radius: 30px;
  }
  &__ticks{
    display:flex;
    justify-content: space-between;
  }
  &__tick{
    text-align: center;
    width: 100%;
    &:after{
      position: relative;
      background-color: var(--divider);
      content: '';
      width: 1px;
      height: 8px;
      display:block;
      margin:0 auto 0 0;
    }
  }
  &__track{
    background-color: var(--primary);
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 0;
    border-radius: 30px;
    &:focus-within {
      background-color: var(--primary-accent);
    }
  }
  &__thumb-container{
    width: 24px;
    height:24px;
    &:focus{
      outline:none;
      .sd--slider__thumb{
        fill: var(--primary-accent);
      }
    }
    &.is--dragging{
      &:after{
        content: '';
        left: 50%;
        opacity: .5;
        transform: transition(-0.5, 0.5);
      }
    }
  }
  &__thumb{
    fill: var(--primary);
  }
  &__pulse{
    transition: all .13s ease-in-out;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--primary-accent);
    border-radius: 30px;
    z-index: 1;
    opacity: .25;
    transform: scale(2);
  }
}
.sd--center{
  text-align:center;
  font-size: 16px;
}

.dragging-enter-from, .dragging-leave-to{
  opacity: 0;
  transform: scale(0);
}
.dragging-enter-to{
  opacity: .25;
  transform: scale(2);
}
</style>
