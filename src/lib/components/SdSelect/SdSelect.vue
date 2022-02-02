<template>
  <!--
    <select v-model="state.selectValue">
      <option value="one">one</option>
      <option value="two">two</option>
    </select>
  -->
  <div class="sd--select__group">
    <sd-field
      :label="label"
      @focus="onFocus"
      v-model="selected"
    />
    <sd-dropdown
      v-model="active"
      :return-focus="false"
      :trap-focus="false"
    >
      <slot
        ref="slotted"
        :onSelected="e => handleSelected(e.target.value)"
      />
    </sd-dropdown>
  </div>
</template>

<script lang="ts">
import { toRefs, reactive, ref, onMounted, defineComponent } from 'vue'

export default defineComponent({
  name: 'SdSelect',
  props: {
    label: {
      type: String,
      default: 'Label'
    },
    autoClose: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => ([])
    },
  },
  setup (props) {
    const slotted = ref(null)
    const state = reactive({ 
      active: false,
      search: '',
    })

    const selected = ref('okay')
  
    const handleSelected = (e) => {
      if (selected.value !== e) {
        selected.value = e
      }

      if (props.autoClose) {
        state.active = false;
      }
    }

    const onFocus = () => {
      state.active = true
    }

    const onBlur = () => {
      state.active = false
    }

    onMounted(() => {
      console.log(slotted.value)
    })

    return { ...toRefs(state), slotted, onFocus, onBlur, selected, handleSelected}
  }
})
</script>

<style lang="scss">
.sd--select__group{
  position: relative;
}
</style>
