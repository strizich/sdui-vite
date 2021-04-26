<template>
  <div
    id="okay"
    ref="dragRef"
  >
    <sd-sheet padded>
      {{ bounding }}
    </sd-sheet>
  </div>
</template>

<script lang="ts">
  import {defineComponent, onMounted, reactive, ref} from 'vue'
  export default defineComponent({
    name:'SdDrag',
    emits: ['bounds'],
    props: {
      x: {
        type: Number,
        default: 0
      },
      y: {
        type: Number,
        default: 0
      }
    },
    setup(props, {emit}) {
      const dragRef = ref(null)
      const bounding = reactive({
        width: 0,
        height: 0
      })
      onMounted(() => {
        const rect = dragRef.value.getBoundingClientRect()
        bounding.width = rect.width
        bounding.height = rect.height
      })

      return {dragRef, bounding}
    }
  })
</script>
