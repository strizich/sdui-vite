<template>
  <div class="sd--grid" :class="[gridClasses]" :style="gridStyles">
    <slot />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
export default defineComponent({
  name: 'SdGrid',
  props: {
    columns: {
      type: [Number, String],
      default: 12
    },
    gutter: {
      type: [Number, String, Array] as PropType<number[] | number | string >,
      default: null
    }
  },
  setup(props) {
    const isArray = computed(() => {
      return Array.isArray(props.gutter)
    })

    const handleGap = computed(() => {
      if(isArray.value) {
        return `${props.gutter[0]}px ${props.gutter[1]}px`
      } else {
        return props.gutter + 'px'
      }
    })
    const gridClasses = computed(() => {
      return {
        [`sd--grid--${props.columns}`]: true
      }
    })
    const gridStyles = computed(() => {
      return {
        'gap': handleGap.value
      }
    })

    return {
      gridStyles,
      handleGap,
      gridClasses
    }
  }
})
</script>

<style lang="scss">
  .sd--grid{
    display: grid;
    gap: 16px;

    &--12{
      grid-template-columns: repeat(12, 1fr),
    }
    &--6{
      grid-template-columns: repeat(6, 1fr),
    }
    &--4{
      grid-template-columns: repeat(4, 1fr),
    }
    &--1{
      grid-template-columns: repeat(1, 1fr),
    }
  }
</style>