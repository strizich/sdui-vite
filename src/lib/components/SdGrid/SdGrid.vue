<template>
  <div class="sd--grid" :style="gridStyles">
    <slot />
    {{gridStyles}}
    {{handleGap}}
  </div>
</template>
<script>
import { computed } from 'vue'
export default {
  name: 'SdGrid',
  props: {
    columns: {
      type: [Number, String],
      default: 12
    },
    gutter: {
      type: [Number, String, Array],
      default: 16
    }
  },
  setup(props) {
    const isArray = computed(() => {
      return Array.isArray(props.gutter)
    })

    const handleGap = computed(() => {
      if(isArray.value) {
        return `${props.gutter[1]}px ${props.gutter[0]}px`
      } else {
        return props.gutter + 'px'
      }
    })

    const gridStyles = computed(() => {
      const column = '1fr '
      return {
        'grid-template-columns': column.repeat(props.columns),
        'gap': handleGap.value
      }
    })

    return {
      gridStyles,
      handleGap
    }
  }
}
</script>

<style lang="scss">
  .sd--grid{
    display: grid;

  }
</style>