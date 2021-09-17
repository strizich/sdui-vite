<template>
   <div class="demo">
     <sd-button>Button</sd-button>
   </div>

</template>

<script lang="ts">
  import { reactive, defineComponent, onMounted} from 'vue'
  // import useScheme from './lib/hooks/UseScheme'
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
  @use '@/lib/scss/engine' with (
    $primary: blue
  );

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