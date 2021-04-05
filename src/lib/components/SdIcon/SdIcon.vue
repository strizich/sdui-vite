<template>
  <i
    :class="['sd--icon', iconClasses]"
    :style="{'color': color}"
  >
    {{ name }}
    <slot />
  </i>
</template>

<script>
import { defineComponent, computed } from 'vue'
export default defineComponent({
  name: 'SdIcon',
  props: {
    name: {
      type: String,
      default: 'face'
    },
    size: {
      type: String,
      default: 'md'
    },
    color: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const iconClasses = computed(() =>{
      const iconSize = `is--${props.size}`
      return {
        [iconSize]: !!props.size
      }
    })
    return { iconClasses }
  }
})
</script>

<style lang="scss">
$icon-sizes: (
  xs: 16px,
  sm: 18px,
  md: 24px,
  lg: 32px,
  xl: 32px
);

@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2) format('woff2');
}

.sd--icon {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: map-get($icon-sizes, md);
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  font-feature-settings: 'liga';
  font-smooth: antialiased;
}

.sd--icon {
  &.is{
    @each $size, $value in $icon-sizes{
      &--#{$size}{
        font-size: $value;
        line-height: 1;
      }
    }
  }
}
</style>
