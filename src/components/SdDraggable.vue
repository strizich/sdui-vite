<template>
  <div
    class="sd--draggable"
    ref="draggable"
    @dragover="(e) => onDragover(e)"
  >
    <sd-drag
      ref="drag"
      style="grid-column: 2/4"
      draggable="true"
      :style="[testing]"
      @drag="(e) => onDrag(e)"
    />
    <div style="grid-column: 1/6;">
      {{ canvas }}
      x: {{ pos.x }}
      y: {{ pos.y }}
      {{ item }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, reactive, ref, watchEffect } from 'vue'
// import SdThrottle from '../lib/core/utilities/SdThrottle'
import SdDrag from './SdDrag.vue'

export default {
  name: 'SdDraggable',
  components: { SdDrag },
  props: {
    columns: {
      type: Number,
      default: 12
    },
    rows: {
      type: Number,
      default: 12
    }
  },
  setup(props) {
    const draggable = ref(null)
    const drag = ref(null)

    const canvas = reactive({
      width: 0,
      height: 0,
      column: 0,
      row: 0
    })

    const item = reactive({
      width: 0,
      height: 0
    })

    const pos = reactive({
      x: 0,
      y: 0
    })

    const onDragover = (e) => {
      e.preventDefault()
      const { x, y} = e
      // let data = e.dataTransfer.getData('text')
      pos.x = x
      pos.y = y
    }
    const testing = computed(() => {
      return {
        position: 'absolute',
        left: pos.x + 'px',
        top: pos.y + 'px',
        // transform: 'translateY(-50%) translateX(-50%)'
      }
    })
    const onDrag = (e) => {
      console.log(e)
    }
    
    const setCanvas = () => {
        console.log(draggable.value.getBoundingClientRect())
      if(drag.value instanceof HTMLElement && draggable.value instanceof HTMLElement){
        const canvasRect = draggable.value.getBoundingClientRect()
        const dragRect = drag.value.getBoundingClientRect()
        canvas.width = canvasRect.width
        canvas.height = canvasRect.height
        canvas.column = canvasRect.width / props.columns
        canvas.row = canvasRect.height / props.rows
        
        item.width = dragRect.width
        item.height = dragRect.height
      }
    }
    onMounted(() => {
      setCanvas()
    })
    // watchEffect(() => {
    //  setCanvas()
    //   const canvasRect = draggable.value.getBoundingClientRect()
    //   const dragRect = drag.value.getBoundingClientRect()
    //   if(drag.value instanceof HTMLElement && draggable.value instanceof HTMLElement){
    //     canvas.width = canvasRect.width
    //     canvas.height = canvasRect.height
    //     canvas.column = canvasRect.width / props.columns
    //     canvas.row = canvasRect.height / props.rows
        
    //     item.width = dragRect.width
    //     item.height = dragRect.height
    //   }    
    // }, {flush: 'post'})

    return {
      draggable,
      drag,
      onDrag,
      onDragover,
      canvas,
      pos,
      testing,
      item
    }
  }
}
</script>

<style lang="scss" scoped>
.sd--draggable {
  display: grid;
  width:100%;
  height:100%;
  grid-template-columns: repeat(12, calc(100% / 12) [col-start]);
  grid-template-rows: repeat(12, calc(100% / 12) [col-start]);
  & > .sd--widget{
    grid-column: 2 / 5;
    grid-row: 3 / 6;
  }
}
</style>