<template>
  <div :class="['sd--select', baseClasses]">
    <sd-label v-if="label">
      {{ label }}
    </sd-label>
    <div class="sd--select__content">
      <select
        :class="['sd--select__control', classes]"
        :value="modelValue || value"
        @click="(e) => handleClick(e)"
        @change="(e) => handleChange(e)"
        @focus="(e) => handleFocus(e)"
        @blur="(e) => handleBlur(e)"
      >
        <slot />
      </select>
      <sd-icon
        name="arrow_drop_down"
        :class="['sd--select__indicator', classes]"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue'
import SdIcon from '../SdIcon'
import SdLabel from './SdLabel.vue'
export default defineComponent({
  name: 'SdSelect',
  emits: ['update:modelValue', 'focus', 'blur', 'click', 'change'],
  components: { SdIcon, SdLabel },
  props: {
    modelValue: {
      type: [String, Object, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    block: Boolean,
    value: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const state = reactive({
      hasFocus: false
    })

    const classes = computed(() => {
      return {
        'is--focused': state.hasFocus
      }
    })
    const baseClasses = computed(() => {
      return {
        'is--block': props.block
      }
    })

    const handleChange = (event) => {
      state.hasFocus = false
      if (props.modelValue) {
        emit('update:modelValue', event.target.value)
      } else {
        emit('change', event)
      }
    }

    const handleClick = (event) => {
      emit('click', event)
      state.hasFocus = true
    }

    const handleFocus = (event) => {
      emit('focus', event)
    }

    const handleBlur = (event) => {
      emit('blur', event)
    }

    return {
      ...toRefs(state),
      handleChange,
      handleFocus,
      handleBlur,
      handleClick,
      classes,
      baseClasses
    }
  }
})
</script>

<style lang="scss">
  @import '../SdElevation/mixins';
  @import '../../scss/variables';
  .sd--select {
    &.is--block{
      width: 100%;
    }
    &__content{
      position: relative;
    }
    &__indicator{
      position: absolute;
      right: 8px;
      top: 50%;
      margin-top: -12px;
      transition: transform .3s;
      transform: rotateZ(0deg);
      pointer-events: none;
      &.is--focused{
        transform: rotateZ(180deg)
      }
    }
    &__control{
    appearance: none;
    -webkit-appearance: none;
    color: var(--text);
    padding: 8px;
    display:block;
    outline: none;
    border: 1px solid var(--divider);
    background: var(--background-highlight);
    border-radius: 3px;
    transition: all .3s ease-in-out;
    font-size: 16px;
    margin-bottom: 4px;
    width: 100%;
    padding-right: 24px;
    display:block;
    @include elevation(3);
      &:disabled {
        background-color: var(--background-highlight);
        color: var(--text-highlight);
      }
      &:focus{
        outline: none;
      }
      &:active {
        background-color: var(--background-highlight);
        border-color: var(--primary);
      }
      &.is--error{
        border-color: var(--danger);
      }
    }
  }
</style>
