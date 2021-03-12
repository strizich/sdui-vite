<template>
  <div class="sd--progress">
    <sd-label>{{title}}</sd-label>
    <div class="sd--progress__track">
      <div :class="[computedClasses]" :style="[computedStyles]">
        <span>
          {{progressDisplay}}
        </span>
      </div>
    </div>
    <div class="sd--progress__footer" >
      <slot name="hint">
        <span v-if="hint" class="sd--text__footnote">{{hint}}</span>
      </slot>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { SdLabel } from '../..'
import '../../components/SdElevation'
export default {
  name: 'SdProgress',
  components: { SdLabel },
  props: {
    title: String,
    hint: String,
    total: Number,
    current: Number,
    theme: {
      type: String,
      default: 'primary'
    },
    progress: {
      type: Number,
      default: 0
    },
    decimalPlaces: {
      type: Number,
      default: 2
    },
    animated: Boolean
  },
  setup (props) {
    const roundNumber = (number, decimalPlaces) =>
      Number(Math.round(number + 'e' + decimalPlaces) + 'e-' + decimalPlaces)

    const progressDisplay = computed(() => {
      if (props.progress) {
        return roundNumber(props.progress * 100, props.decimalPlaces) + '%'
      }
      if (props.current && props.total) {
        return roundNumber(props.current / props.total * 100, props.decimalPlaces) + '%'
      }
      if (props.current && !props.total) {
        return 'Count is required with value'
      }
      if (props.value && props.progress) {
        return 'Cannot do both. Pick Progress or Value/Count'
      }
    })

    const computedClasses = computed(() => {
      const theme = `sd--progress__rail--${props.theme}`
      return {
        [theme]: true,
        'sd--progress__rail': true,
        'is--animated': props.animated
      }
    })

    const computedStyles = computed(() => {
      return {
        width: progressDisplay.value,
        transition: props.animated ? 'width .23s ease-in-out' : 'unset'
      }
    })

    return {
      computedStyles,
      progressDisplay,
      computedClasses
    }
  }
}
</script>

<style lang="scss">
  @use 'sass:map';
  @import '../../scss/variables';
  @import '../../scss/mixins';
  @import '../../scss/get-contrast';
  .sd--progress{
    margin-bottom: 16px;
    &__track {
      width: 100%;
      position: relative;
      height: 24px;
      background-color: var(--background-accent);
      border-radius: 3px;
    }
    &__rail {
      border-radius: 3px;
      position: absolute;
      top:4px;
      left:4px;
      bottom:4px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      overflow: hidden;
      @each $state, $color in $sd-color-global {
        $base: map.get($color, base);
        $contrast: sd-pick-contrast($base);
        &--#{$state} {
          background-color: $base;
          color: sd-color($contrast, text);
          &.is--animated{
            &:after{
              animation: shimmer 10s infinite;
              animation-timing-function: ease-out;
            }
          }
          &:after{
            background-repeat: no-repeat;
            background-image: linear-gradient(
              90deg,
              rgba(255,255,255, 0) 0%,
              rgba(255,255,255, .1) 66%,
              rgba(255,255,255, .3) 90%,
              rgba(255,255,255, .2) 100%
            );
          }
        }
      }

       &:after{
        //shimmer
        position:absolute;
        top:0;
        left:0;
        bottom:0;
        right:0;
        transform: translateX(-100%);
        content: '';
      }
      & > span{
        font-size: 11px;
        margin-right: 8px;
        position:relative;
        z-index: 100;
      }
    }
  }
  @keyframes shimmer {
    100% {
      transform: translateX(400%);
    }
  }
</style>
