<template>
  <sd-layout :scheme="state.scheme">
    <template #header>
      <sd-header></sd-header>
    </template>
    <template #content>
      <!-- <sd-mast>Things here</sd-mast> -->
      <div class="demo">
        <sd-container full>
          <h1 class="sd--text__headline">
            SDUI - Vite
          </h1>
          <div id="okay">
            <sd-button icon-only>
              <sd-icon name="add"/>
            </sd-button>
            <sd-button icon-only href="#">
              <sd-icon name="add"/>
            </sd-button>
            <sd-button-group>
              <sd-button id="trigger1">
                Dropdown 1
              </sd-button>
              <sd-dropdown trigger="trigger1" close-on-click>
                <sd-button flat block>okay</sd-button>
                <sd-button flat block>okay</sd-button>
                <sd-button flat block>okay</sd-button>
              </sd-dropdown>

              <sd-button id="trigger2">
                Dropdown 2
              </sd-button>
              <sd-dropdown trigger="trigger2" :portal-to-body="false">
                <sd-button flat block>okay</sd-button>
                <sd-button flat block>okay</sd-button>
                <sd-button flat block>okay</sd-button>
              </sd-dropdown>
            </sd-button-group>
            
          </div>
        </sd-container>
      </div>    
    </template>
  </sd-layout>
</template>

<script lang="ts">
  import { reactive, defineComponent, ref, onMounted } from 'vue'
  // import SdCarousel from './lib/components/SdCarousel/SdCarousel.vue'

  export default defineComponent({
  name: 'App',
  components: {
    // SdCarousel,
  },
  setup () {
    const state = reactive({
      sliderything: 4,
      modal: false,
      toast: false,
      scheme: 'auto',
      name: 'hello ladies',
      dropdown: false,
      link: null,
      dropdown2: false
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
    &__button-group{
      margin-bottom: 16px;
    }
  }
  .something{
    color: var(--danger);
    display:flex;
    align-items: center;
    font-size: 12px;
  }
  .widget--tall{
    min-height: 400px;
  }
</style>