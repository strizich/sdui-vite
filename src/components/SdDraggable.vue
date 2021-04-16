<template>
  <div
    class="sd--draggable"
    ref="draggableRef"
    @dragover="(e) => onDragover(e)"
  >
    <div style="grid-column: 1/6;">
      {{ canvas }}
    </div>
    <sd-widget
      id="okay"
      theme="primary"
      draggable="true"
    >
      <sd-widget-footer
        ref="dragRef"
        caption="drag me"
        footnote="i can drag"
        @drag="(e) => onDrag(e)"
      />
    </sd-widget>

    <sd-sheet
      ref="target"
      @dragend="(e) => onDrop(e)"
    >
      hmm
    </sd-sheet>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, ref } from 'vue'
import SdWidget from '@/lib/components/SdWidget/SdWidget.vue'
import SdWidgetFooter from '@/lib/components/SdWidget/SdWidgetFooter.vue'
import SdThrottle from '../lib/core/utilities/SdThrottle'

export default {
  components: { SdWidget, SdWidgetFooter },
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
    const draggableRef = ref(null)
    const dragRef = ref(null)
    const target = ref(null)
    let canvas = reactive({
      width: 0,
      height: 0,
      column: 0,
      row: 0
    })

    const onDragover = (e) => {
      e.preventDefault()
      const { clientX } = e
      console.log('dragover', clientX)
      let data = e.dataTransfer.getData('text')
      console.log(data)
    }

    const onDrag = (e) => {
      SdThrottle(600, ()=> {
        const { dataTransfer, clientX, x } = e
        console.log('drag', x, clientX)
        dataTransfer.setData('text', e.target.id)
      })
    }
    const 
    const setCanvas = () => {
      const canvasRect = draggableRef.value.getBoundingClientRect()
      canvas.width = canvasRect.width
      canvas.height = canvasRect.height
      canvas.column = canvasRect.width / props.columns
      canvas.row = canvasRect.height / props.rows
    }

    onMounted(() => {
      setCanvas()
      console.log(draggableRef)
    })
    return {
      draggableRef,
      dragRef,
      target,
      onDrag,
      onDragover,
      canvas
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