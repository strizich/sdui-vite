<template>
  <sd-layout :scheme="state.scheme">
    <template #content>
      <sd-mast>Things here</sd-mast>
      <div class="demo">
        <sd-container>
          <h1 class="sd--text__headline">
            SDUI - Vite
          </h1>
          <div>
            <sd-button 
              @click="handleDialogOpen"
            >
              Open Modal
              <sd-tooltip>huh</sd-tooltip>
            </sd-button>
            <sd-button @click="handleToast">
              Make Toast
            </sd-button>
          </div>
        </sd-container>
        <sd-checkbox v-model="state.toast">
          Toast
        </sd-checkbox>
      </div>
      <sd-toast
        v-model:active="state.toast"
        dismissable
      >
        Okay
      </sd-toast>
      <sd-dialog
        aside
        v-model:active="state.modal"
      >
        <sd-dialog-header
          title="Title"
          subtitle="Subtitle"
        />
        <sd-dialog-content>
          <p>Content goes here</p>
        </sd-dialog-content>
        <sd-dialog-footer>
          <sd-button
            theme="dark"
            @click="handleDialogClose()"
          >
            Close
          </sd-button>
        </sd-dialog-footer>
      </sd-dialog>
      <sd-progress
        :total="100"
        :current="90"
        animated
      />
      <sd-progress :progress="0.96" />
      <sd-field v-model.number="state.sliderything" />
      <sd-slider
        :min="0"
        :max="100"
        v-model="state.sliderything"
        show-tooltip
        show-indicators
        use-wheel
      />
      <sd-radio
        v-model="state.scheme"
        value="auto"
      >
        Scheme
      </sd-radio>
      <sd-radio
        v-model="state.scheme"
        value="dark"
      >
        Scheme
      </sd-radio>
      <sd-radio
        v-model="state.scheme"
        value="light"
      >
        Scheme
      </sd-radio>
      <sd-icon
        name="home"
        family="round"
      />
      {{ state.scheme }}
    </template>
  </sd-layout>
</template>

<script lang="ts">
  import { reactive, defineComponent } from 'vue'
  
  export default defineComponent({
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
</style>