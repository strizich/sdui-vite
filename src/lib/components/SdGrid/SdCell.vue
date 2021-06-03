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
    // TODO: figure out a better way to handle this for xs breakpoints.
    xs: {
      type: Number,
      default: 12
    },
    sm: {
      type: Number,
      default: 0
    },
    md: {
      type: Number,
      default: 0
    },
    lg: {
      type: Number,
      default: 0
    },
    xl: {
      type: Number,
      default: 0
    },
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
    },
    align: {
      type: String,
      default: undefined
    },
    justify: {
      type: String,
      default: undefined
    }
  },
  setup (props) {
    const cellStyles = computed(() => {
      return {
        'align-self': props.align,
        'justify-self': props.justify
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
