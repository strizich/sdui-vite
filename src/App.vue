<template>
  <sd-layout :scheme="scheme">
    <template v-slot:content>
      <sd-mast>Things here</sd-mast>
      <div class="demo">
        <sd-container>
          <h1 class="sd--text__headline">SDUI - Vite</h1>
          <div>
          <sd-button 
            @click="handleDialogOpen"
          >
            Open Modal
            <sd-tooltip>huh</sd-tooltip>
          </sd-button>
          <sd-button @click="handleToast">Make Toast</sd-button>
          </div>
        </sd-container>
        <sd-checkbox v-model="toast">Toast</sd-checkbox>
      </div>
      <sd-toast v-model:active="toast" dismissable>Okay</sd-toast>
      <sd-dialog aside v-model:active="modal">
        <sd-dialog-header title="Title" subtitle="Subtitle"/>
        <sd-dialog-content>
          <p>Content goes here</p>
        </sd-dialog-content>
        <sd-dialog-footer>
          <sd-button theme="dark" @click="handleDialogClose()">Close</sd-button>
        </sd-dialog-footer>
      </sd-dialog>
      <sd-progress :total="100" :current="90" animated/>
      <sd-progress :progress="0.96"/>
      <sd-slider v-model:value="sliderything"/>
      <sd-radio v-model="scheme" value="auto">Scheme</sd-radio>
      <sd-radio v-model="scheme" value="dark">Scheme</sd-radio>
      <sd-radio v-model="scheme" value="light">Scheme</sd-radio>
      <sd-icon name="home" family="round"/>
      {{scheme}}
    </template>
  </sd-layout>
</template>

<script>
import { reactive, toRefs } from 'vue'
const staticyThing = ['one', 'two', 'three']

export default {
  setup() {
    const state = reactive({
      modal: false,
      toast: false,
      sliderything: 10,
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
      ...toRefs(state),
      handleDialogOpen, 
      handleDialogClose,
      handleToast,
      staticyThing
    }
  }
}
</script>

<style lang="scss">
  @use '@/lib/scss/engine';

  .demo{
    padding: 40px 0;
  }
</style>