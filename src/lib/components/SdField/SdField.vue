<template>
  <div :class="[rootClasses]">
    <sd-label :required="required">
      {{ label }}
    </sd-label>
    <slot name="header" />
    <div :class="[inputClasses]">
      <sd-icon
        v-if="icon"
        :color="iconColor"
        :name="icon"
      />
      <slot name="addon" />
      <input
        ref="inputRef"
        :id="id"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        @animationstart="(e) => log(e)"
        @blur="(e) => handleTouched(e)"
        @focus="(e) => handleFocused(e)"
        @input="(e) => handleInput(e)"
        :value="modelValue ? modelValue : value"
      >
      <sd-icon
        v-if="iconEnd"
        :color="iconEndColor"
        :name="iconEnd"
      />
      <slot name="addon-end" />
    </div>
    <slot name="footer" />
    <sd-error :message="handleValidation" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs, watch, PropType, ref } from 'vue'
import SdUuid from '../../core/utilities/SdUuid'
import SdLabel from './SdLabel.vue'
import SdError from './SdError.vue'
import SdIcon from '../SdIcon'


interface ModelModifiers {
  number: boolean | Function;
}

export default defineComponent({
  name: 'SdField',
  components: { SdLabel, SdError, SdIcon },
  emits: ['update:modelValue', 'focus', 'blur', 'change', 'input'],
  props: {
    modelValue: {
      type: [String, Number],
      default: undefined
    },
    value: {
      type: [String, Number],
      default: undefined
    },
    id: {
      type: [String, Function] as PropType<string | Function>,
      default: () => 'sd--field--' + SdUuid()
    },
    modelModifiers: {
      type: [Object, Function] as PropType<ModelModifiers>,
      default: () => ({})
    },
    icon: {
      type: String,
      default: ''
    },
    iconColor: {
      type: String,
      default: ''
    },
    iconEnd: {
      type: String,
      default: ''
    },
    iconEndColor: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: undefined
    },
    name:{ 
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    error: {
      type: [Boolean, String],
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    setFocus: Boolean,
    disabled: Boolean,
    required: Boolean,
    pristineError: Boolean
  },
  setup (props, { emit }) {
    const inputRef = ref(null)

    const state = reactive({
      touched: false,
      focused: false,
      autofill: null
    })

    const handleValidation = computed(() => {
      // shows error on blur
      if (!props.pristineError && !state.touched) {
        return false
      }
      // show error on load
      if (props.pristineError) {
        return props.error
      }
      // handle empty string
      if (isErrorString.value && props.error === '') {
        return false
      }
      // handled error === null and required
      if (
          (props.required && !props.modelValue) &&
          (props.required && !props.value)
        ) {
        return props.error || 'Required'
      }
      return state.touched && props.error
    })

    const isErrorString = computed(() => {
      return typeof props.error === 'string'
    })

    const handleInput = (e) => {
      let value = e.target.value
      // Parse value as a number if v-model.number modifier is used.
      if (props.modelModifiers.number || props.type === 'number') {
        value = parseFloat(value)
      }
      if (!props.modelValue) {
        emit('input', value)
      }
      emit('update:modelValue', value)
    }

    const handleTouched = (e) => {
      state.touched = true
      state.focused = false
      emit('blur', e)
    }

    const handleFocused = (e) => {
      state.focused = true
      emit('focus', e)
    }

    const rootClasses = computed(() => {
      return {
        'sd--field': true,
        'is--focused': state.focused
      }
    })

    const inputClasses = computed(() => {
      return {
        'sd--field__control': true,
        'is--autofill': state.autofill,
        'is--dirty': state.touched,
        'is--error': handleValidation.value,
        'is--disabled': props.disabled
      }
    })

    watch(() => props.setFocus, () => {
      state.focused = props.setFocus
      if (props.setFocus) {
        inputRef.value.focus()
      }
    })

    return {
      ...toRefs(state),
      rootClasses,
      inputClasses,
      handleInput,
      handleTouched,
      handleFocused,
      isErrorString,
      handleValidation,
      inputRef
    }
  }
})
</script>

<style lang="scss">
  @import '../../scss/variables';
  .sd--field{
    padding-bottom: 24px;
    position: relative;
    width: 100%;
    &.is {
      &--focused {
        .sd--field__control{
          border-color: var(--primary-highlight);
          @if $use-field-elevation {
            box-shadow: var(--btn-elevation-1)
          }
        }
      }
    }
    &__body{
      display:flex;
      flex-wrap: wrap;
      align-items: center;
    }
    &__control {
      appearance: none;
      -webkit-appearance: none;
      color: var(--text);
      display:block;
      outline: none;
      border: 1px solid var(--divider);
      background: var(--background-highlight);
      border-radius: 3px;
      transition: background-color .13s ease-in-out,  border .3s ease-in-out,  box-shadow .3s ease-in-out, ;
      font-size: 16px;
      margin-bottom: 4px;
      width: 100%;
      display:flex;
      flex-wrap: wrap;
      align-items:center;
      @if $use-field-elevation {
        box-shadow: var(--btn-elevation-2);
      }
      &:disabled, &.is--disabled {
        opacity: .35;
        background-color: var(--background-accent);
        color: var(--text-highlight);
      }
      & > .sd--icon{
        color: var(--text-accent);
        &:first-child{
          margin: 0 0 0 8px;
        }
         &:last-child{
          margin: 0 8px 0 0;
        }
        margin: 0 4px;
      }
      & > input{
        background-color:transparent;
        flex-grow: 2;
        outline: none;
        color: var(--text);
        font-size: 16px;
        border:none;
        padding: 8px;
        &::placeholder {
          color: var(--text-placeholder, --text-highlight);
        }
        // padding: 4px 0;
        // margin: -4px 0;
      }
       &.is--error{
        border-color: var(--danger);
      }
    }

    & > span{
      display:block;
      margin-bottom: 4px;
    }

    & > input + span{
      margin-top: 8px;
    }
    .sd--error{
      position: absolute;
      bottom: 10px;
      left:0;
    }
  }

// this is still janky... needs more work
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    /* https://github.com/vuejs/vue/issues/7058 */
    animation-name: onAutoFillStart;
    transition: box-shadow .3s ease-in-out 0s, background 20000s ease-in-out 0s;
    -webkit-text-fill-color: var(--text);
    background: black;
    box-shadow: inset 0 0 0 30px var(--background-highlight);
  }

  :not(:-webkit-autofill) {
    /* https://github.com/vuejs/vue/issues/7058 */
    animation-name: onAutoFillCancel;
  }
</style>
