<template>
  <div :class="['sd--card', classes]">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'SdCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    baseClass: {
      type: String,
      default: 'sd--card'
    },
    elevation: {
      type: [Number, String],
      default: 6
    },
    clickable: {
      type: Boolean,
      default: false
    }
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
})
</script>

<style lang="scss">
@import '../SdElevation/mixins';

.sd--card{
  background-color: var(--background-highlight);
  border-radius: 3px;
  display:flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  transition: box-shadow .23s ease-in-out;
  margin: 0 0 16px 0;
  &.is--clickable{
    &:hover{
      z-index: 10;
      @include elevation(24);
      cursor:pointer;
    }
  }
}
</style>
