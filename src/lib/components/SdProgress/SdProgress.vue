<template>
  <div class="sd--progress">
    <sd-label>{{ label }}</sd-label>
    <div class="sd--progress__track">
      <div
        :class="[computedClasses]"
        :style="[computedStyles]"
      >
        <span>
          {{ progressDisplay }}
        </span>
      </div>
    </div>
    <div class="sd--progress__footer">
      <slot name="hint">
        <span
          v-if="hint"
          class="sd--text__footnote"
        >{{ hint }}</span>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { roundTo } from '../../core/utilities/RoundTo'
import { SdLabel } from '../..'
import '../SdElevation'
export default defineComponent({
  name: 'SdProgress',
  components: { SdLabel },
  props: {
    label: {
      type: String,
      default: undefined
    },
    hint: {
      type: String,
      default: undefined
    },
    total: {
      type: Number,
      default: undefined
    },
    current: {
      type: Number,
      default: undefined
    },
    theme: {
      type: String,
      default: 'primary'
    },
    progress: {
      type: Number,
      default: undefined
    },
    decimalPlaces: {
      type: Number,
      default: 0
    },
    animated: Boolean
  },
  setup (props) {
    const progressDisplay = computed(() => {
      if (props.progress) {
        return roundTo(props.progress * 100, props.decimalPlaces) + '%'
      }
      if (props.current && props.total) {
        return roundTo(props.current / props.total * 100, props.decimalPlaces) + '%'
      } else {
        return ''
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
        maxWidth: '100%',
        transition: props.animated ? 'width .23s ease-in-out' : 'unset'
      }
    })

    return {
      computedStyles,
      progressDisplay,
      computedClasses
    }
  }
})
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
      background-color: var(--sd-background-accent);
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
    @each $state in $sd-themes {
        &--#{$state} {
          background-color: var(--sd-#{$state});
          color: var(--sd-#{$state}-text);
          &.is--animated {
            &:after{
              animation: shimmer 10s infinite;
              animation-timing-function: ease-out;
            }
          }
          &:after {
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
