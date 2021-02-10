<template>
  <div :class="[classes]">
    <slot/>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'SdContainer',
  props: {
    break: String,
    full: Boolean
  },
  setup (props) {
    const classes = computed(() => {
      if (props.full) {
        return 'sd--container--full'
      } else if (props.break) {
        return `sd--container--${props.break}`
      } else {
        return 'sd--container'
      }
    })
    return { classes }
  }
}
</script>

<style lang="scss">
@import '../../scss/breakpoints';
@import './grid';
.sd--container {
  @each $size, $value in $container-max-widths{
    @include media-breakpoint-down($size){
      max-width: $value;
      width: 100%;
      margin: 0 auto;
      padding: 0 32px;
    }
    &--#{$size}{
      max-width: $value;
      margin: 0 auto;
    }
  }
  &--full {
    max-width: 100%;
  }
  @include breakpoint-down('sm') {
    padding: 0 24px;
  }
}
</style>
