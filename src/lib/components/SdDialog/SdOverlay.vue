<template>
  <transition name="sd-overlay">
    <div :class="['sd--overlay', overlayClasses]" v-if="active" />
  </transition>
</template>

<script>
// import SdPortal from '@/layout/SdPortal'
import { computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'SdOverlay',
  props: {
    parent: String,
    active: Boolean,
    fixed: Boolean,
    blur: Boolean,
    transparent: Boolean
  },
  setup (props) {
    const overlayClasses = computed(() => {
      return {
        'is--fixed': props.fixed,
        'is--blur': props.blur,
        'is--transparent': props.transparent
      }
    })
    return {
      overlayClasses
    }
  }
})
</script>

<style lang="scss">
  .sd--overlay{
    position: absolute;
    top: 0;
    bottom:0;
    left: 0;
    right: 0;
    overflow: hidden;
    z-index: 1001;
    background-color: #161616DD;
    transition-property: opacity;
    will-change: opacity;
    opacity: 1;
    transition: .3s 0s opacity ease-in-out;
    body > &,
    &.is--fixed{
      position: fixed
    }
    &.is--blur{
      backdrop-filter: blur(16px);
    }
    &.is--transparent{
      opacity: 0;
    }
  }
  .sd-overlay-enter{
  transition: .1s .4s opacity ease-in-out;
  }
  .sd-overlay-leave{
  transition: .1s 0 opacity ease-in-out;
  }
  .sd-overlay-enter, .sd-overlay-leave{
    opacity: 0;
  }
</style>
