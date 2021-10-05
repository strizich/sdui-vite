<template>
   <div class="demo">
     <!-- <sd-select label="Dropdown Select" auto-close>
       <template v-slot:default="{ onSelected }">
        <label>
          <button type="radio" value="okay1" @click="onSelected">Okay 1</button>
        </label>
        <label>
          <button type="radio" value="okay2" @click="onSelected">Okay 2</button>
        </label>
       </template>
     </sd-select> -->

    <sd-button @click="state.okay = 1">
      Button
      <sd-tooltip placement="right" v-model="state.active">
        Tip
      </sd-tooltip>
    </sd-button>
     <!-- <sd-simple-select>
       <option value="option-1">Option 1</option>
    </sd-simple-select> -->
    <!-- {{state.selectValue}} -->
    <!-- <select v-model="state.selectValue">
      <option value="one">one</option>
      <option value="two">two</option>
    </select> -->
  </div> 

</template>

<script lang="ts">
  import { reactive, defineComponent, onMounted} from 'vue'
  // import useScheme from './lib/hooks/UseScheme'
  import SdSelect from './lib/components/SdSelect/SdSelect.vue'
  import SdButton from './lib/components/SdButton/SdButton.vue'

  export default defineComponent({
  name: 'App',
  components: {
    SdSelect,
    SdButton
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