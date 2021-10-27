<template>
  <sd-container full>
    <h1 class="sd--text__headline">
      Playground
    </h1>
    <sd-button @click="state.toast = !state.toast">
      <sd-tooltip
        v-model="state.toast"
        :auto-open="false"
      >
        Okay
      </sd-tooltip>
    </sd-button>
    <sd-slider
      label="okay"
      v-model="state.sliderything"
      show-tooltip
    />
    <sd-button
      icon="bluetooth"
      show-tooltip
    >
      okay
    </sd-button>

    <sd-button
      size="sm"
      icon="bluetooth"
    >
      okay
    </sd-button>
    <sd-button
      size="xs"
      icon-end="bluetooth"
    >
      okay
    </sd-button>
    <sd-button
      size="xs"
      icon="bluetooth"
      icon-only
    />
    <sd-button
      size="sm"
      icon="bluetooth"
      icon-only
    />
    <sd-button
      size="md"
      icon="bluetooth"
      icon-only
    />
    <sd-button
      size="lg"
      icon="bluetooth"
      icon-only
    />
    <sd-button
      size="xl"
      icon="bluetooth"
      icon-only
    />
    <sd-menu>
      <sd-button
        icon="more_vert"
        icon-only
        trigger
      />
      <sd-menu-content full>
        <sd-button-group
          vertical
          full
        >
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
      <sd-field
        label="popover"
        v-model="state.selectValue"
        trigger
      />
      <sd-menu-content full>
        <sd-fieldset>
          <sd-radio
            v-model="state.selectValue"
            value="one"
          >
            One
          </sd-radio>
          <sd-radio
            v-model="state.selectValue"
            value="two"
          >
            Two
          </sd-radio>
          <sd-radio
            v-model="state.selectValue"
            value="three"
          >
            Three
          </sd-radio>
        </sd-fieldset>
      </sd-menu-content>
    </sd-menu>

    <sd-menu>
      <sd-button trigger>
        Trigger
      </sd-button>
      <sd-menu-content full>
        {{ state.active }}
      </sd-menu-content>
    </sd-menu>

    <sd-menu>
      <sd-button-group>
        <sd-button>Button</sd-button>
        <sd-button
          trigger
          icon-only
        >
          <sd-icon name="keyboard_arrow_down" />
        </sd-button>
      </sd-button-group>

      <sd-menu-content
        placement="bottom-end"
        full
      >
        <sd-button-group
          vertical
          full
        >
          <sd-button
            theme="default"
            flat
            block
          >
            uh ok
          </sd-button>
          <sd-button
            theme="default"
            flat
            block
          >
            uh ok
          </sd-button>
          <sd-button
            theme="default"
            flat
            block
          >
            uh ok
          </sd-button>
          <sd-button
            theme="default"
            flat
            block
          >
            uh ok
          </sd-button>
          <sd-button
            theme="default"
            flat
            block
          >
            uh ok
          </sd-button>
        </sd-button-group>
      </sd-menu-content>
    </sd-menu>
  </sd-container>
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