<template>
  <label
    :id="id"
    :for="name"
    :class="['sd--radio', radioClasses]"
    @click="handleChecked"
  >
    <input
      ref="radio"
      class="sd--radio__input"
      v-bind="{ name, disabled, required, value, checked: isSelected }"
      type="radio"
    >
    <span class="sd--radio__content">
      <span><slot /></span>
    </span>
  </label>
</template>

<script lang="ts">
import { computed, defineComponent, ref, PropType } from 'vue'
import sdUuid from '../../core/utilities/SdUuid'
import useKeyboardFocus from '../../hooks/useKeyboardFocus'

export default defineComponent({
  name: 'SdRadio',
  props: {
    modelValue: {
      type: [String, Number, Boolean, Object] as PropType<string | number | boolean | object>,
      default: ''
    },
    value: {
      type: [String, Number, Boolean, Object] as PropType<string | number | boolean | object>,
      default: 'on'
    },
    id: {
      type: [String, Function] as PropType<string | Function>,
      default: () => 'sd--radio--' + sdUuid()
    },
    name: {
      type: String,
      default: ''
    },
    required: Boolean,
    disabled: Boolean,
    theme: {
      type: String,
      default: 'primary'
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const radio = ref(null)
    const isFocused = useKeyboardFocus(radio)

    const isSelected = computed(() => {
      return props.modelValue === props.value
    })

    const radioClasses = computed(() => {
      return {
        'is--required': props.required,
        'is--disabled': props.disabled,
        'is--focused': isFocused.value
      }
    })

    const handleChecked = () => {
      if (!props.disabled) {
        radio.value.focus()
        emit('update:modelValue', props.value)
      }
    }

    return {
      radio,
      isSelected,
      radioClasses,
      handleChecked
    }
  }
})
</script>

<style lang="scss">
%radio {
  width: 0;
  height:0;
  &:before{
    content:'';
    box-shadow: inset 0 0 0 2px var(--divider);
    width: 20px;
    height: 20px;
    display: block;
    position: absolute;
    left: 4px;
    top: 50%;
    margin-top: -10px;
    background-color: transparent;
    border-radius: 50%;
    transition: box-shadow .23s ease-in-out, background-color .23s ease-in-out;
    background-color: var(--background);
    z-index: 15;
  }
  &:checked{
    &:before{
      box-shadow: inset 0 0 0 2px var(--primary),
                  inset 0 0 0 4px var(--background);
      background-color: var(--primary);
    }
  }
  &:focus{
    outline:none;
    &:before{
      box-shadow: inset 0 0 0 2px var(--primary-highlight),
                  inset 0 0 0 10px var(--background);
    }
    &:checked{
      &:before{
        box-shadow: inset 0 0 0 2px var(--primary-accent),
                    inset 0 0 0 4px var(--background);
      }
    }
  }
   &:disabled{
    outline:none;
    &:checked{
      &:before{
        box-shadow: inset 0 0 0 2px var(--disabled),
                    inset 0 0 0 4px var(--background);
        background-color: var(--disabled);
      }
    }
    &:before{
      box-shadow: inset 0 0 0 2px var(--disabled),
                  inset 0 0 0 10px var(--background);
    }
  }
}
  .sd--radio{
    position: relative;
    z-index: 10;
    padding: 8px 8px 8px 32px;
    -webkit-user-select: none;
    user-select: none;
    &.is--focused, &:focus{
      color: var(--primary-highlight);
    }
    &.is--disabled{
      color: var(--disabled);
    }
    &:hover{
      transition: background-color .15s ease-in-out;
      background-color: var(--background-highlight);
      cursor:pointer;
      outline:none;
      .sd--radio__input{
        &:checked{
          &:before{
            box-shadow: inset 0 0 0 2px var(--primary-accent),
                        inset 0 0 0 4px var(--background);
          }
        }
        &:before{
          box-shadow: inset 0 0 0 2px var(--primary-accent),
                      inset 0 0 0 10px var(--background);
        }
      }
    }
    &__input{
      @extend %radio;
      -webkit-appearance: none;
      appearance: none;
      border: none;
      position: absolute;
      top: 50%;
      left: 0;
    }
    &__content{
      font-size: rem(16);
      position: relative;
      z-index: 10;
      width: 100%;
    }
  }

</style>
