<template>
  <div class="sd--cell" :style="cellStyles">
    <slot />
  </div>
</template>

<script>
import { computed } from 'vue'
import useWindowWidth from '../../hooks/useWindowWidth'
export default {
  name: 'SdCell',
  props: {
    offset: {
      type: Number,
      default: 0
    },
    span: Number
  },
  setup (props) {
    const { breakpoint } = useWindowWidth()
    const cellStyles = computed(() => {
      console.log(breakpoint.value)
      return {
        'grid-column-start': `${props.offset}`,
        'grid-column-end': `span ${props.span}`
      }
    })
    return {
      cellStyles
    }
  }
}
</script>

<style>

</style>