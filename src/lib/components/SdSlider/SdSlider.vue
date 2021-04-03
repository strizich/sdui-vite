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
          <div class="sd--slider__ticks" v-if="showTicks">
            <div class="sd--slider__tick" v-for="n in tickCount" :key="n"/>
          </div>
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
            portal-disabled
            :active="isDragging || isFocused"
            :autoOpen="false"
            :offset="[0, 8]"
            v-if="showTooltip"
          >
            <div class="sd--center sd--big">
              {{result}}
            </div>
          </sd-tooltip>
          <transition name="dragging">
            <div class="sd--slider__pulse" v-if="isDragging || isFocused"></div>
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

<script lang="ts">
// Math to calculate required values
import { defineComponent, computed } from 'vue'
import { minMax } from './SdSliderFoundation'
import useSlider from './useSlider'
import SdLabel from '../SdField/SdLabel.vue'
import SdTooltip from '../SdTooltip/SdTooltip.vue'

export default defineComponent({
  name: 'SdSlider',
  components: {
    SdTooltip,
    SdLabel
  },
  props: {
    label: {
      type: String
    },
    modelValue: {
      type: Number,
      required: true
    },
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
    showIndicators: {
      type: Boolean
    },
    showTicks: {
      type: Boolean
    },
    showTooltip: {
      type: Boolean
    },
    useWheel: {
      type: Boolean
    },
    hint: {
      type: String
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const {
      slider,
      handle,
      result,
      computedX,
      handleWidth,
      isDragging,
      isFocused,
      isHover
    } = useSlider(props, emit)

    // Gets the number of ticks
    const tickCount = computed(() => {
      const ticks = (props.max - props.min) / props.step
      return minMax(2, ticks, 100)
    })

    // Computed Styles
    const thumbTrackStyle = computed(() => {
      return {
        width: computedX.value + (handleWidth.value / 2) + 'px'
      }
    })

    // Computed Classes
    const thumbStyle = computed(() => {
      return {
        transition: 'transform .23s ease-in-out',
        position: 'absolute',
        left: computedX.value - (handleWidth.value / 2) + 'px',
        cursor: isDragging.value ? 'grab' : 'pointer',
        zIndex: isDragging.value ? 1000 : 0
      }
    })

    const thumbClass = computed(() => {
      return {
        'is--dragging': isDragging.value,
        'is--focused': isFocused.value
      }
    })

    return {
      slider,
      handle,
      thumbStyle,
      thumbClass,
      thumbTrackStyle,
      result,
      tickCount,
      isFocused,
      isDragging,
      isHover
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
