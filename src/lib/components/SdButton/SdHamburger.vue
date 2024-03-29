<template>
  <button
    ref="hamburgerRef"
    :id="id"
    :class="classes"
    @click="(e) => handleToggle(e)"
  >
    <span
      class="sd--hamburger"
      :class="activeClass"
    >
      <i
        class="sd--hamburger__bar"
        :class="`bar--${n}`"
        v-for="n in 3"
        :key="n"
      />
    </span>
  </button>
</template>

<script lang="ts">
import anime from 'animejs'
import { ref, reactive, computed, watchEffect, defineComponent } from 'vue'
import useKeyboardFocus from '../../hooks/useKeyboardFocus'
import sdUuid from '../../core/utilities/SdUuid'
export default defineComponent({
  name: 'SdHamburger',
  props: {
    id: {
      type: String,
      default: () => 'sd--hamburger--' + sdUuid()
    },
    active: Boolean,
    theme: {
      type: String,
      default: 'auto'
    },
    animated: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:active'],
  setup (props, { emit }) {
    const hamburgerRef = ref(null)
    const hasFocus = useKeyboardFocus(hamburgerRef)

    const state = reactive({
      active: false
    })

    watchEffect(() => {
      state.active = props.active
      animateHamburger(state.active)
    }, { flush: 'post' })

    const classes = computed(() => {
      return {
        'sd--button': true,
        'sd--button__hamburger': true,
        'sd--button__flat': true,
        'is--focused': hasFocus.value,
        'is--active': props.active
      }
    })
    const activeClass = computed(() => {
      return {
        'is--active': props.active,
        [`is--${props.theme}`]: !!props.theme
      }
    })

    const animateHamburger = (open) => {
      const tl = anime.timeline({
        duration: 250,
        easing: 'easeInOutQuart'
      })
      if (!open) {
        tl.add({
          targets: `#${props.id} .bar--1`,
          keyframes: [
            { rotateZ: 0, translateY: 0, translateX: 0, easing: 'easeInOutQuad' },
            { width: 24, easing: 'easeInOutQuad' }
          ]
        }, 0).add({
          targets: `#${props.id} .bar--3`,
          keyframes: [
            { rotateZ: 0, translateY: 0, translateX: 0, easing: 'easeInOutQuad' },
            { width: 24, easing: 'easeInOutQuad' }
          ]
        }, 0).add({
          targets: `#${props.id} .bar--2`,
          keyframes: [
            { width: 24, translateX: 0, easing: 'easeInOutQuad' }
          ]
        }, 0)
      } else {
        tl.add({
          targets: `#${props.id} .bar--1`,
          keyframes: [
            { width: 12, easing: 'easeInOutQuad' },
            { rotateZ: -45, translateY: 7, translateX: -4, easing: 'easeInOutQuad' }
          ]
        }, 0).add({
          targets: `#${props.id} .bar--3`,
          keyframes: [
            { width: 12, easing: 'easeInOutQuad' },
            { rotateZ: 45, translateY: -7, translateX: -4, easing: 'easeInOutQuad' }
          ]
        }, 0).add({
          targets: `#${props.id} .bar--2`,
          keyframes: [
            { width: 21, translateX: 3, easing: 'easeInOutQuad' },
            { translateX: 3 }
          ]
        }, 0)
      }
    }

    const handleToggle = () => {
      state.active = !props.active
      emit('update:active', state.active)
    }

    return {
      hasFocus, handleToggle, classes, activeClass, hamburgerRef
    }
  }
})
</script>

<style lang="scss">
.sd--button{
  &__hamburger{
    align-items: center;
    justify-content: center;
    border: none;
    height: 50px;
    width: 50px;
    margin-right: 0;
    // &.is--active{
    //   background-color: var(--sd-background-accent);
    // }
    &:focus{
      outline:none;
    }
    &.is--focused{
      box-shadow: inset 0 0 0 4px var(--sd-primary-accent);
    }
  }
  &__flat{
    background: none;
  }
}
.sd--hamburger{
  display:flex;
  align-items: stretch;
  height: 16px;
  width: 24px;
  justify-content: space-between;
  flex-direction: column;
  position:relative;
  &.is--dark {
    .sd--hamburger__bar {
      background-color: var(--sd-background-light);
    }
  }
  &.is--light {
    .sd--hamburger__bar {
      background-color: var(--sd-background-dark);
    }
  }
  &.is--auto {
    .sd--hamburger__bar {
      background-color: var(--sd-background-inverse);
    }
  }
  &__bar{
    width: 24px;
    height: 2px;
    display:block;
    text-align: center;
    font-size: 11px;
    transform-origin: 0% 50%;
  }
  &.is--open{
    transform-origin: 0% 100%;
    .bar{
      &--1{
        transform: translateY(7px) translateX(1px) rotateZ(45deg);
        width: 12px;
      }
      &--2{
        transform: translateX(3px);
        width: 21px;
      }
      &--3{
        transform: translateY(-7px) translateX(1px) rotateZ(-45deg);
        width: 12px;
      }
    }
  }
}
</style>
