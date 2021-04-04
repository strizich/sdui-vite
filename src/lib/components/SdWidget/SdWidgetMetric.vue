<template>
  <div class="sd--widget-metric">
    {{ value }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SdWidgetMetric',
  props: {
    value: {
      type: [String, Number],
      default: '0'
    }
  },
  setup () {
    return {}
  }
})
</script>

<style lang="scss">
  .sd--widget-metric {
    font-size: 50px;
    flex-grow: 1;
    margin: 16px;
  }
</style>
