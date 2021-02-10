<template>
  <sd-layout>
    <template v-slot:content>
      <div class="demo">
        <sd-container>
          <h1 class="sd--text__headline">SDUI - Vite</h1>
          <sd-button 
            @click="handleDialogOpen"
          >
            Open Modal
          </sd-button>
          <sd-dialog aside v-model:active="modal">
            <sd-dialog-header title="Title" subtitle="Subtitle"/>
            <sd-dialog-content>
              <p>Content goes here</p>
            </sd-dialog-content>
            <sd-dialog-footer>
              <sd-button theme="dark" @click="handleDialogClose()">Close</sd-button>
            </sd-dialog-footer>
          </sd-dialog>
        </sd-container>
      </div>
    </template>
  </sd-layout>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  setup() {
    const state = reactive({
      modal: false
    })

    const handleDialogOpen = () => {
      state.modal = true
    }

    const handleDialogClose = () => {
      state.modal = false
    }

    return {
      ...toRefs(state),
      handleDialogOpen, 
      handleDialogClose
    }
  }
}
</script>

<style lang="scss">
  @use './lib/scss/main';

  .demo{
    padding: 40px 0;
  }
</style>