<template>
  <label
    :for="id"
    :class="['sd--switch']"
    @click.prevent="handleChecked"
  >
      <span class="sd--switch__label">
        <slot/>
      </span>

      <div
        :class="[inputClasses, themeClass]"
      >
        <input
          ref="switchRef"
          class="sd--switch__field"
          type="checkbox"
          v-bind="attributes"
          :id="id"
          :checked="isSelected"
        />
      </div>
  </label>
</template>

<script>
// Research way to properly split this code.

import { defineComponent, ref, computed } from 'vue'
import sdUuid from '../../core/utilities/SdUuid'
import useKeyboardFocus from '../../hooks/useKeyboardFocus'

export default defineComponent({
  name: 'SdSwitch',
  props: {
    modelValue: [String, Boolean, Object, Number, Array],
    value: {
      type: [String, Boolean, Object, Number],
      default: null
    },
    name: [String, Number],
    required: Boolean,
    disabled: Boolean,
    trueValue: {
      default: true
    },
    falseValue: {
      default: false
    },
    fieldType: {
      type: String,
      default: 'checkbox'
    },
    theme: {
      type: String,
      default: 'primary'
    },
    id: {
      type: String,
      default: () => 'sd-switch--' + sdUuid()
    }
  },
  setup (props, { emit }) {
    const switchRef = ref(false)
    const isFocused = useKeyboardFocus(switchRef)

    const isModelArray = computed(() => {
      return Array.isArray(props.modelValue)
    })

    const hasValue = computed(() => {
      return props.value !== null
    })

    const isSelected = computed(() => {
      if (isModelArray.value) {
        return props.modelValue.includes(props.value)
      }
      if (hasValue.value) {
        return props.modelValue === props.value
      } else {
        return props.modelValue === props.trueValue
      }
    })

    const removeItemFromModel = (newModel) => {
      const index = newModel.indexOf(props.value)
      if (index !== -1) {
        newModel.splice(index, 1)
      }
    }

    const handleArrayCheckbox = () => {
      const newModel = props.modelValue
      if (!isSelected.value) {
        newModel.push(props.value)
      } else {
        removeItemFromModel(newModel)
      }
      emit('update:modelValue', newModel)
    }

    const handleSingleSelectCheckbox = () => {
      emit('update:modelValue', isSelected.value ? null : props.value)
    }

    const handleSimpleCheckbox = () => {
      emit('update:modelValue', isSelected.value ? props.falseValue : props.trueValue)
    }

    const handleChecked = () => {
      if (!props.disabled) {
        if (isModelArray.value) {
          handleArrayCheckbox()
        } else if (hasValue.value) {
          handleSingleSelectCheckbox()
        } else {
          handleSimpleCheckbox()
        }
      }
    }

    const attributes = computed(() => {
      const attrs = {
        id: props.id,
        name: props.name,
        disabled: props.disabled,
        required: props.required,
        'true-value': props.trueValue,
        'false-value': props.falseValue
      }
      if (props.value === null || typeof props.value !== 'object') {
        attrs.value = (props.value === null || props.value === undefined) ? '' : String(props.value)
      }
      return attrs
    })

    const containerClasses = computed(() => {
      return {
        'is--disabled': props.disabled,
        'is--focused': isFocused.value
      }
    })

    const inputClasses = computed(() => {
      return {
        'sd--switch__control': true,
        'is--checked': isSelected.value,
        'is--disabled': props.disabled,
        'is--required': props.required,
        'is--focused': isFocused.value
      }
    })

    const themeClass = computed(() => {
      return `sd--switch__${props.theme}`
    })

    return {
      themeClass,
      switchRef,
      attributes,
      inputClasses,
      containerClasses,
      isFocused,
      isSelected,
      isModelArray,
      hasValue,
      handleChecked
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../scss/variables';

$knob-size: 24px;
$checkmarkSvgUri: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='8' viewBox='0 0 10 8'%3E%3Cpath fill='%23FFF' fill-opacity='.9' d='M6.3984375,12.3046875 L3.13671875,9.0625 C3.04557282,8.97135407 3,8.85416657 3,8.7109375 C3,8.56770843 3.04557282,8.45052093 3.13671875,8.359375 L3.859375,7.65625 C3.95052093,7.55208343 4.06445312,7.5 4.20117188,7.5 C4.33789062,7.5 4.45833343,7.55208343 4.5625,7.65625 L6.75,9.84375 L11.4375,5.15625 C11.5416666,5.05208343 11.6621094,5 11.7988281,5 C11.9355469,5 12.0494791,5.05208343 12.140625,5.15625 L12.8632812,5.859375 C12.9544272,5.95052093 13,6.06770843 13,6.2109375 C13,6.35416657 12.9544272,6.47135407 12.8632812,6.5625 L7.1015625,12.3046875 C7.01041657,12.4088541 6.89322907,12.4609375 6.75,12.4609375 C6.60677093,12.4609375 6.48958343,12.4088541 6.3984375,12.3046875 Z' transform='translate(-3 -5)'/%3E%3C/svg%3E%0A";
$checkmarkSvgDarkUri: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='8' viewBox='0 0 10 8'%3E%3Cpath fill='%23000' fill-opacity='.9' d='M6.3984375,12.3046875 L3.13671875,9.0625 C3.04557282,8.97135407 3,8.85416657 3,8.7109375 C3,8.56770843 3.04557282,8.45052093 3.13671875,8.359375 L3.859375,7.65625 C3.95052093,7.55208343 4.06445312,7.5 4.20117188,7.5 C4.33789062,7.5 4.45833343,7.55208343 4.5625,7.65625 L6.75,9.84375 L11.4375,5.15625 C11.5416666,5.05208343 11.6621094,5 11.7988281,5 C11.9355469,5 12.0494791,5.05208343 12.140625,5.15625 L12.8632812,5.859375 C12.9544272,5.95052093 13,6.06770843 13,6.2109375 C13,6.35416657 12.9544272,6.47135407 12.8632812,6.5625 L7.1015625,12.3046875 C7.01041657,12.4088541 6.89322907,12.4609375 6.75,12.4609375 C6.60677093,12.4609375 6.48958343,12.4088541 6.3984375,12.3046875 Z' transform='translate(-3 -5)'/%3E%3C/svg%3E%0A";

%knob{
  display:block;
  position:absolute;
  width: $knob-size;
  height: $knob-size;
  left: 0;
  right:100%;
  top:50%;
  margin-top: -$knob-size / 2;
  border-radius: 3px;
  transform: rotateZ(-90deg);
  content:'';
  background-image: url($checkmarkSvgUri);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 0px;
}
%checked-knob{
  right:0;
  left: 100%;
  transform: rotateZ(0);
  margin-left: -$knob-size;
  background-image: url($checkmarkSvgUri);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 16px;
}

%rail{
  border-radius: 30px;
  display:block;
  position:absolute;
  content:'';
  top:0;
  bottom:0;
  left:0;
  right: 100%;
}
%checked-rail{
  left:0;
  right: 0;
}

.sd--switch{
  display: flex;
  position:relative;
  align-items: center;
  padding: 16px 8px;
  margin:0;
  justify-content: space-between;
  &:focus{
    outline:none;
  }
  &:hover{
    background-color: var(--background-highlight);

  }
  @each $state, $color in $sd-color-global {
    // FUTURE: Adjust change checkbox (light/dark) based on theme.
    // FUTURE: Normalize unchecked state. Show color for checked state.
    // $contrast: sd-pick-contrast($base);
    &__#{$state} {
      background-color: var(--divider);
      border-top: 1px solid var(--background-highlight);
      border-radius: 3px;
      &:after{
        background-color: var(--#{$state});
      }
      &:before{
        background-color: var(--#{$state}-accent);
      }
    }
  }
  &__control{
    width: 48px;
    height: 12px;
    position:relative;
    &:after{
      transition: all .3s ease-in-out;
      @extend %knob;
    }
    &:before{
      transition: all .3s ease-in-out;
      @extend %rail;
    }
    &.is--checked{
      &:after{
        transition: all .3s ease-in-out;
        @extend %checked-knob;
      }
      &:before{
        transition: all .3s ease-in-out;
        @extend %checked-rail;
      }
    }
  }
  &__field{
    appearance: none;
    width: 0;
    height: 0;
    border: none;
  }
  &__label{
    margin-right: 8px;
    margin-bottom: 0;
    font-size: 16px;
  }
}
</style>
