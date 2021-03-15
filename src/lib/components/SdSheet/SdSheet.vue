<template>
  <div :class="[classes]">
    <slot/>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'SdSheet',
  props: {
    theme: {
      type: String,
      default: 'primary'
    },
    fullHeight: Boolean,
    padded: Boolean
  },
  setup (props) {
    const classes = computed(() => {
      const theme = 'sd--sheet__' + props.theme
      return {
        'sd--sheet': true,
        [theme]: true,
        'is--padded': props.padded,
        'is--full-height': props.fullHeight
      }
    })
    // FUTURE: Change z-index on hover
    // FUTURE: Customizable elevation
    // FUTURE: Allow for color gradiants with user set background colors.
    // FUTURE: Additional testing for tracked css custom properties needed.
    return { classes }
  }
})
</script>

<style lang="scss">
@import '../../scss/variables';
@import '../SdElevation/mixins';
.sd--sheet {
  height: auto;
  border-radius: 1px;
  @include elevation(12);
  &.is--padded{
    padding: 16px;
  }
  &.is--full-height {
    height: 100%;
  }
  @each $key, $color in $sd-color-global {
    $state: $key;
    &__#{$state} {
      background-color: var(--#{$state});
      color: var(--#{$state}-text)
    }
  }
}
</style>
