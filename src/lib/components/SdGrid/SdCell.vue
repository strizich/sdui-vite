<template>
  <div :class="['sd--cell', cellClasses]" :style="cellStyles">
    <slot />
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'SdCell',
  props: {
    span: Number,
    start: {
      type: Number,
      default: 0
    },
    end: Number,
    xs: {
      type: Number,
      default: 12
    },
    sm: Number,
    md: Number,
    lg: Number,
    xl: Number,
    oXs: {
      type: Number,
      default: 0
    },
    oSm: {
      type: Number,
      default: 0
    },
    oMd: {
      type: Number,
      default: 0
    },
    oLg: {
      type: Number,
      default: 0
    },
    oXl: {
      type: Number,
      default: 0
    }
  },
  setup (props) {
    const cellStyles = computed(() => {
      return {
        'grid-column-start': props.start
      }
    })
    const cellClasses = computed(() => {
      return {
        [`sd--cell-xs-${props.xs}`]: props.xs,
        [`sd--cell-sm-${props.sm}`]: props.sm,
        [`sd--cell-md-${props.md}`]: props.md,
        [`sd--cell-lg-${props.lg}`]: props.lg,
        [`sd--cell-xl-${props.xl}`]: props.xl,
        [`sd--cell-xs-offset-${props.oXs}`]: props.oXs,
        [`sd--cell-sm-offset-${props.oSm}`]: props.oSm,
        [`sd--cell-md-offset-${props.oMd}`]: props.oMd,
        [`sd--cell-lg-offset-${props.oLg}`]: props.oLg,
        [`sd--cell-xl-offset-${props.oXl}`]: props.oXl
      }
    })
    return {
      cellStyles,
      cellClasses
    }
  }
}
</script>

<style lang="scss">
  @use 'grid' as *;

  @include make-grid-cells;
</style>