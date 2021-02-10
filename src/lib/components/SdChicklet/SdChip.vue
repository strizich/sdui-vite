<template>
  <div class="sd--chip">
    <sd-field
      ref="inputRef"
      :label="label"
      :set-focus="state.focusInput"
      :placeholder="placeholder"
      @keyup.enter="handleEnter"
      @keydown.delete="handleBackspace"
      @blur="handleBlur"
      v-model="state.inputVal"
    >
    <template #addon>
      <transition-group name="fade">
        <sd-chicklet
          :theme="state.duplicatedChip === chip ? 'danger' : theme"
          @click="removeChip(chip)"
          dismissable
           v-for="(chip, index) in state.chipList"
          :key="index"
        >
          {{chip}}
        </sd-chicklet>
      </transition-group>
    </template>
    </sd-field>
  </div>
</template>

<script>
import { defineComponent, reactive, computed, watch, ref, nextTick, watchEffect } from 'vue'
import { SdChicklet, SdField } from '../..'

export default defineComponent({
  name: 'SdChip',
  components: { SdChicklet, SdField },
  props: {
    label: String,
    placeholder: String,
    theme: {
      type: String,
      default: 'primary'
    },
    error: [Boolean, String],
    uppercase: Boolean,
    lowercase: Boolean,
    captialize: Boolean,
    checkDuplicated: {
      type: Boolean,
      default: true
    },
    modelValue: Array
  },
  emits: ['update:modelValue', 'delete', 'inset'],
  setup (props, { emit }) {
    const inputRef = ref(null)

    const state = reactive({
      inputVal: '',
      chipList: [],
      duplicatedChip: null,
      focusInput: null
    })

    const handleEnter = (e) => {
      if (!state.duplicatedChip && state.inputVal) {
        state.chipList.push(formattedInputVal.value)
        state.inputVal = ''
        emit('update:modelValue', state.chipList)
        emit('inset', state.chipList)
      }
    }

    const removeChip = (chip) => {
      const index = props.modelValue.indexOf(chip)
      state.chipList.splice(index, 1)
      emit('update:modelValue', state.chipList)
      emit('delete', chip, index)
      nextTick(() => {
        state.focusInput = true
      })
    }

    const handleBlur = () => {
      if (state.focusInput) {
        state.focusInput = false
      }
    }

    const formattedInputVal = computed(() => {
      if (props.captialize) {
        return state.inputVal.charAt(0).toUpperCase() + state.inputVal.slice(1)
      }
      if (props.uppercase) {
        return state.inputVal.toUpperCase()
      }
      if (props.lowercase) {
        return state.inputVal.toLowerCase()
      }
      return state.inputVal
    })

    const checkDuplicate = () => {
      if (!state.chipList.includes(formattedInputVal.value)) {
        state.duplicatedChip = null
        return false
      }
      if (!props.checkDuplicated) {
        return false
      }
      state.duplicatedChip = formattedInputVal.value
    }

    const handleBackspace = () => {
      if (!state.inputVal) {
        removeChip(state.chipList[props.modelValue.length - 1])
      }
    }

    watch(() => state.inputVal, () => {
      checkDuplicate()
    })

    // NOTES: Watcheffect runs once on mount. Then reruns on change.
    watchEffect(() => {
      state.chipList = props.modelValue
    })

    return { state, handleEnter, handleBackspace, removeChip, inputRef, checkDuplicate, handleBlur }
  }
})
</script>

<style lang="scss">
.sd--chip{
  margin: 0 auto;
  .sd--field{
    position: relative;
    &__control{
      &:after{
        font-family: 'Material Icons';
        font-feature-settings: 'liga';
        pointer-events: none;
        content: 'keyboard_return';
        position: absolute;
        right: 4px;
        bottom: 37px;
        padding: 2px 4px;
        display:block;
        color: var(--text-accent);
        background-color:var(--background);
        border-radius: 3px;
        font-size: 12px;
      }
    }
  }
}
.sd--chicklet{
  margin-right: 8px;
  opacity: 1;
  transition: background-color .23s ease-in-out, opacity .23s ease-in-out;
}
.fade-enter-active, .fade-leave-active{
  transition: opacity .23s ease-in-out, transform .23s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(.9);

}
.fade-enter-to, .fade-leave-from{
  opacity:1;
  transform: scale(1);
}
</style>
