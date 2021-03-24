<template>
  <i :class="['sd--icon', iconClasses]" :style="{'color': color}">
    {{name}}
    <slot/>
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
    family: {
      type: String,
    },
    size: {
      type: String,
      default: 'md'
    },
    color: {
      type: String
    }
  },
  setup (props) {
    const iconClasses = computed(() =>{
      const iconSize = `is--${props.size}`
      const iconFamily = !props.family ? 'material-icons' : `material-icons-${props.family}`
    return {
      [iconFamily]: true,
      [iconSize]: !!props.size
    }
    })
    return { iconClasses }
  }
})
</script>

<style lang="scss">
$material-icons-font-path: '~/material-icons/iconfont/';
@import '~/material-icons/iconfont/material-icons.scss';

$icon-sizes: (
  xs: 16px,
  sm: 18px,
  md: 24px,
  lg: 32px,
  xl: 32px
);

.sd--icon {
  color: var(--text);
  &.is{
    @each $size, $value in $icon-sizes{
      &--#{$size}{
        font-size: $value;
        width: $value;
        height: $value;
        min-width: $value;
        line-height: 1;
      }
    }
  }
}
</style>
