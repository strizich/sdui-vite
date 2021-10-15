<template>
  <div class="demo">
    <sd-button>
      okay
      <sd-tooltip>okay</sd-tooltip>
    </sd-button>
    <sd-menu v-model="state.active">
      <sd-button trigger>Trigger</sd-button>
      <sd-menu-content>
        {{state.active}}
      </sd-menu-content>
    </sd-menu>
  </div> 

</template>

<script lang="ts">
  import { reactive, defineComponent} from 'vue'
  // import useScheme from './lib/hooks/UseScheme'
  import SdButton from './lib/components/SdButton/SdButton.vue'
  import SdMenu from './lib/components/SdMenu/SdMenu.vue'
  import SdMenuContent from './lib/components/SdMenu/SdMenuContent.vue'

  export default defineComponent({
  name: 'App',
  components: {
    SdButton,
    SdMenu,
    SdMenuContent
  },
  setup () {
    const state = reactive({
      selected: [],
      ok: 0,
      sliderything: 4,
      modal: false,
      toast: false,
      scheme: 'auto',
      name: 'hello ladies',
      dropdown: false,
      link: null,
      active: true,
      dropdown2: false,
      selectValue: 'one',
      items: [
        {
          label: 'Dropdown Item 1',
          value: 'item1'
        },
        {
          label: 'Dropdown Item 2',
          value: 'item2'
        }
      ]
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
    width: 100%;
    padding: 40px;
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