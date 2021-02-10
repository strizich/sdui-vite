<template>
  <div class="sd--chart">
    <canvas ref="canvas" :id="id"/>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import SdUuid from '../../core/utilities/SdUuid'
import Chart from 'chart.js'
export default {
  name: 'SdBaseChart',
  props: {
    id: {
      type: String,
      default: () => 'sd-chart--' + SdUuid()
    },
    chartData: Object
  },
  setup (props) {
    const canvas = ref(null)
    const generateChart = (chartData) => {
      const ctx = canvas.value
      const chart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      })
      return chart
    }
    onMounted(() => {
      generateChart(props.chartData)
    })
    return { canvas, generateChart }
  }
}
</script>

<style lang="scss" scoped>

</style>
