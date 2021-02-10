<template>
  <div :class="[breakpointClasses]" :style="{order}">
    <slot/>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'SdCol',
  props: {
    xs: [Number, String],
    sm: [Number, String],
    md: [Number, String],
    lg: [Number, String],
    xl: [Number, String],
    order: Number
  },
  setup (props) {
    const breakpointClasses = computed(() => {
      const classes = []
      const breakpointAuto = 'sd--col-auto'
      const breakpointXs = `sd--col-xs-${props.xs}`
      const breakpointSm = `sd--col-sm-${props.sm}`
      const breakpointMd = `sd--col-md-${props.md}`
      const breakpointLg = `sd--col-lg-${props.lg}`
      const breakpointXl = `sd--col-xl-${props.xl}`

      if (props.xs) {
        classes.push(breakpointXs)
      }
      if (props.sm) {
        classes.push(breakpointSm)
      }
      if (props.md) {
        classes.push(breakpointMd)
      }
      if (props.lg) {
        classes.push(breakpointLg)
      }
      if (props.xl) {
        classes.push(breakpointXl)
      }
      if (!props.xs && !props.md && !props.lg && !props.xs && !props.sm) {
        classes.push(breakpointAuto)
      }
      return classes
    })
    return { breakpointClasses }
  }
}
</script>

<style lang="scss">
  @import './grid';
  @if $enable-grid-classes {
    @include make-grid-columns();
  }
</style>
