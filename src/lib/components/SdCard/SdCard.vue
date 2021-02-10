<template>
  <div :class="['sd--card', classes]">
    <slot/>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'SdCard',
  props: {
    title: String,
    baseClass: {
      type: String,
      default: 'sd--card'
    },
    elevation: {
      type: [Number, String],
      default: 6
    },
    clickable: Boolean
  },
  setup (props) {
    const classes = computed(() => {
      return {
        [`elevation--${props.elevation}`]: true,
        'is--clickable': props.clickable
      }
    })
    return { classes }
  }
}
</script>

<style lang="scss">
@import '../SdElevation/mixins';

.sd--card{
  background-color: v(--background-highlight);
  border-radius: 3px;
  display:flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  transition: box-shadow .23s ease-in-out;
  margin: 16px 0;
  &.is--clickable{
    &:hover{
      z-index: 10;
      @include elevation(24);
      cursor:pointer;
    }
  }
  &--inset{
    padding: 0 16px;
  }
  &--offset{
    padding: 0 0 0 16px;
  }
}
</style>
