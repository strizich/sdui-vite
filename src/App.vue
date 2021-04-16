<template>
  <sd-layout :scheme="state.scheme">
    <template #content>
      <sd-draggable>
        okay
      </sd-draggable>
    </template>
  </sd-layout>
</template>

<script lang="ts">
  import { reactive, defineComponent } from 'vue'
  import SdDraggable from '@/components/SdDraggable.vue'
  export default defineComponent({
  components: { SdDraggable },
  name: 'App',
  setup () {
    const state = reactive({
      sliderything: 0,
      modal: false,
      toast: false,
      scheme: 'auto'
    })

    const handleDialogOpen = () => {
      state.modal = true
    }

    const handleDialogClose = () => {
      state.modal = false
    }

    const handleToast = () => {
      state.toast = true
    }
    return {
      handleToast,
      handleDialogClose,
      handleDialogOpen,
      state
    }
  }
})
</script>

<style lang="scss">
  @use '@/lib/scss/engine';

  .demo{
    padding: 40px 0;
  }
  .something{
    color: var(--danger);
    display:flex;
    align-items: center;
    font-size: 12px;;
  }
</style>