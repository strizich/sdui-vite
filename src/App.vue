<template>
  <div class="demo">

    <sd-grid>
      <sd-cell 
        xs="1"
        o-xs="1"
        sm="2"
        o-sm="2"
        md="3"
        o-md="3"
        lg="4"
        o-lg="4"
        style="background-color:red">1</sd-cell>
      <sd-cell 
        xs="1"
        o-xs="1"
        sm="2"
        o-sm="2"
        md="3"
        o-md="1"
        lg="4"
        o-lg="1"
        style="background-color:red">1</sd-cell>
    </sd-grid>
    <sd-menu>
      <sd-button trigger>Trigger</sd-button>
      <sd-menu-content fullWidth>
        {{state.active}}
      </sd-menu-content>
    </sd-menu>

    <sd-menu>
      <sd-button icon="more_vert" icon-only trigger/>
      <sd-menu-content full-width>
        <sd-button-group vertical full>
          <sd-button>
            okay
          </sd-button>
          <sd-button>
            okay
          </sd-button>
          <sd-button>
            okay
          </sd-button>
        </sd-button-group>
      </sd-menu-content>
    </sd-menu>
    <sd-menu>
      <sd-field label="popover" v-model="state.selectValue" trigger/>
      <sd-menu-content full-width>
        <sd-fieldset>
          <sd-radio v-model="state.selectValue" value="one">One</sd-radio>
          <sd-radio v-model="state.selectValue" value="two">Two</sd-radio>
          <sd-radio v-model="state.selectValue" value="three">Three</sd-radio>
        </sd-fieldset>
      </sd-menu-content>
    </sd-menu>

    <sd-menu>
      <sd-button-group>
        <sd-button>Button</sd-button>
        <sd-button trigger icon-only>
          <sd-icon name="keyboard_arrow_down"/>
        </sd-button>

      </sd-button-group>

      <sd-menu-content placement="bottom-end">
        <sd-button>uh ok</sd-button>
      </sd-menu-content>
    </sd-menu>

  <div>
    <div class="primary b100">
      primary 100
    </div>
    <div class="primary b200">
      primary 200
    </div>
    <div class="primary b300">
      primary 300
    </div>
    <div class="primary b400">
      primary 400
    </div>
    <div class="primary b500">
      primary 500
    </div>
  </div> 
  <div>
    <div class="secondary b100">
      secondary 100
    </div>
    <div class="secondary b200">
      primary 200
    </div>
    <div class="secondary b300">
      secondary 300
    </div>
    <div class="secondary b400">
      secondary 400
    </div>
    <div class="secondary b500">
      secondary 500
    </div>
  </div> 
   <div>
    <div class="danger b100">
      danger 100
    </div>
    <div class="danger b200">
      danger 200
    </div>
    <div class="danger b300">
      danger 300
    </div>
    <div class="danger b400">
      danger 400
    </div>
    <div class="danger b500">
      danger 500
    </div>
  </div> 
</div>
</template>

<script lang="ts">
  import { reactive, defineComponent} from 'vue'

  export default defineComponent({
  name: 'App',
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
      hoverActive: false,
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

    const handleHover = (event) => {
      if(event === 'mouseenter') {
        state.hoverActive = true
      }
    }

    return {
      handleToast,
      handleDialogClose,
      handleDialogOpen,
      handleHover,
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

</style>