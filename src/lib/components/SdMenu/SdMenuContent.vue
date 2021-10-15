<template>
  <teleport
    ref="targetRef"
    :to="portalDisabled ? null : portalTo"
    :disabled="portalDisabled"
  >
    <transition name="dropdown">
      <div
       ref="instanceRef"
       class="sd--menu__content"
       v-if="shouldRender"
      >
        <slot />
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import usePopper from '../../hooks/usePopper'
import SdContains from '../../core/utilities/SdContains';
import {ref, inject, PropType, defineComponent, onMounted, computed, reactive, onUnmounted, watchEffect } from 'vue'
import { Placement } from '@popperjs/core'
 export default defineComponent({
  name: 'SdMenu',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: ''
    },
    delay: {
      type: Number,
      default: 0
    },
    placement: {
      type: String as PropType<Placement>,
      default: 'top'
    },
    outsideClose: {
      type: Boolean,
      default: true
    },
    insideClose: {
      type: Boolean,
      default: true
    },  
    portalTo: {
      type: String,
      default: 'body'
    },
    portalDisabled: {
      type: Boolean,
      default: true
    },
    offset: {
      type: Array as PropType<number[]>,
      default: [0, 0]
    },
    fullWidth: {
      type: Boolean,
      default: false
    }
  },
  emits: ['opened', 'closed'],
  setup(props, { emit }) {
    const activate: any = inject('activate', false)

    const { shouldRender, targetRef, instanceRef } = usePopper(props, emit, activate)
    
    const state = reactive({
      parentWidth: null
    })

    const computedStyles = computed(() => {
      if (props.fullWidth) {
        return {
          width: `${state.parentWidth}px`
        }
      }
    })
  


    const isMenu = ({target}) => {
      return targetRef.value.parentElement ? SdContains(instanceRef.value, target): false
    }

    const isMenuContent = ({target}) => {
      return instanceRef.value ? SdContains(targetRef.value.parentElement, target): false
    }

    const handleOutsideClick = (event) => {
      if (activate.value ) {
        if (props.outsideClose && isMenuContent(event) && isMenu(event)) {
          activate.value = false
        }
        if(props.insideClose && !isMenuContent(event) && isMenu(event)) {
          activate.value = false
        }
      }
    }

    const handleWindowResize = () => {
      state.parentWidth = targetRef.value.parentElement.clientWidth
    }

    onMounted(() => {
      handleWindowResize()
      window.addEventListener('resize', handleWindowResize, { passive: true })
      document.body.addEventListener('click', handleOutsideClick, { passive: true })     
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleWindowResize)
       document.body.addEventListener('click', handleOutsideClick, { passive: true })     
    })

    return {
      shouldRender,
      targetRef,
      instanceRef,
      computedStyles,
      state,
    }
  }
})
</script>

<style lang="scss">
  @import '../SdElevation/mixins';
  @import '../../scss/variables';
  .sd--menu{
    &__content{
      background-color: var(--background-highlight);
      padding: 15px;
      @include elevation(4);
    }
  }

  .dropdown-enter-active, .dropdown-leave-active{
    .sd--menu__content {
      transition: opacity .2s .1s, transform .3s ease-in-out;
    }
  }
  .dropdown-enter-to{
    .sd--menu__content {
      opacity: 1;
      transform: translate3d(0, 0, 0)
    }
  }
  .dropdown-enter-from{
    .sd--menu__content {
      opacity: 0;
      transform: translate3d(0, 4px, 0);
    }
  }
  .dropdown-leave-to{
    .sd--menu__content {
      opacity: 0;
      transform: translate3d(0, -4px, 0);
    }
  }
</style>