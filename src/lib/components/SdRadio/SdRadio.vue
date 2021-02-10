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
      type="radio"/>
    <span class="sd--radio__content">
      <span><slot/></span>
    </span>
  </label>
</template>

<script>
import { computed, ref } from 'vue'
import sdUuid from '../../core/utilities/SdUuid'
import useKeyboardFocus from '../../hooks/useKeyboardFocus'

export default {
  name: 'SdRadio',
  props: {
    modelValue: [String, Number, Boolean, Object],
    value: {
      type: [String, Number, Boolean, Object],
      default: 'on'
    },
    id: {
      type: String,
      default: () => 'sd--radio--' + sdUuid()
    },
    name: [String, Number],
    required: Boolean,
    disabled: Boolean,
    theme: {
      type: String,
      default: 'primary'
    }
  },
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
}
</script>

<style lang="scss">
%radio {
  width: 0;
  height:0;
  &:before{
    content:'';
    box-shadow: inset 0 0 0 2px v(--divider);
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
    background-color: v(--background);
    z-index: 15;
  }
  &:checked{
    &:before{
      box-shadow: inset 0 0 0 2px v(--primary),
                  inset 0 0 0 4px v(--background);
      background-color: v(--primary);
    }
  }
  &:focus{
    outline:none;
    &:before{
      box-shadow: inset 0 0 0 2px v(--primary-highlight),
                  inset 0 0 0 10px v(--background);
    }
    &:checked{
      &:before{
        box-shadow: inset 0 0 0 2px v(--primary-accent),
                    inset 0 0 0 4px v(--background);
      }
    }
  }
   &:disabled{
    outline:none;
    &:checked{
      &:before{
        box-shadow: inset 0 0 0 2px v(--disabled),
                    inset 0 0 0 4px v(--background);
        background-color: v(--disabled);
      }
    }
    &:before{
      box-shadow: inset 0 0 0 2px v(--disabled),
                  inset 0 0 0 10px v(--background);
    }
  }
  &:hover{
    outline:none;
    &:checked{
      &:before{
        box-shadow: inset 0 0 0 2px v(--primary-accent),
                    inset 0 0 0 4px v(--background);
      }
    }
    &:before{
      box-shadow: inset 0 0 0 2px v(--primary-accent),
                  inset 0 0 0 10px v(--background);
    }
  }
}
  .sd--radio{
    position: relative;
    z-index: 10;
    padding: 8px 16px 8px 32px;
    -webkit-user-select: none;
    &.is--focused{
      color: var(--primary-highlight);
    }
    &.is--disabled{
      color: var(--disabled);
    }
    &:hover{
      transition: background-color .15s ease-in-out;
      background-color: var(--background-highlight);
      cursor:pointer;
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
