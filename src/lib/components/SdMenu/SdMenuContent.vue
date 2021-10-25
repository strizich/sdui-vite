<template>
  <teleport
    ref="targetRef"
    :to="portalDisabled ? null : portalTo"
    :disabled="portalDisabled"
  >
    <transition name="dropdown">
      <div
        :id="id"
        ref="instanceRef"
        class="sd--menu__content"
        v-if="shouldRender"
        :style="computedStyles"
      >
        <slot />
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import usePopper from '../../hooks/usePopper'
import SdContains from '../../core/utilities/SdContains';
import SdUuid from '../../core/utilities/SdUuid';
import { watch, inject, PropType, defineComponent, computed, reactive} from 'vue'
import { Placement } from '@popperjs/core'
 export default defineComponent({
  name: 'SdMenuContent',
  props: {
    id: {
      type: String,
      default: () => 'sd-menu-' + SdUuid()
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
      default: 'bottom-start'
    },
    outsideClick: {
      type: Boolean,
      default: true
    },
    closeOnClick: {
      type: Boolean,
      default: true
    },  
    portalTo: {
      type: String,
      default: 'body'
    },
    portalDisabled: {
      type: Boolean,
      default: false
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

    watch(() => activate.value, (next) => {
      if (next) {
        setTimeout(() => {
          handleWindowResize()
          createClickObserver()
          createKeyboardObserver()
        }, 0)
      }
    })

    const computedStyles = computed(() => {
      if (props.fullWidth) {
        return {
          minWidth: `${state.parentWidth}px`
        }
      }
    })

    const isMenu = ({target}) => {
      return targetRef.value.parentElement ? SdContains(targetRef.value.parentElement, target): false
    }

    const isMenuContent = ({target}) => {
      return instanceRef.value ? SdContains(instanceRef.value, target) : false
    }

    const handleClickEvents = (event) => {
      if(document) {
        const insideClick = !isMenu(event) && (props.closeOnClick || !isMenuContent(event))
        const outsideClick = isMenu(event) && (props.outsideClick || !isMenuContent(event))
        if (insideClick || outsideClick) {
          activate.value = false
          window.removeEventListener('resize', handleWindowResize)
          document.body.removeEventListener('click', handleClickEvents)
          document.body.removeEventListener('keydown', onKeydown)
        }
      }
    }

    const onKeydown = e => {
      switch (e.key) {
        case 'Escape':
          e.preventDefault()
          activate.value = false
          window.removeEventListener('resize', handleWindowResize)
          break
      }
    }

    const createKeyboardObserver = () => {
      document.body.addEventListener('keydown', onKeydown, { passive: false })
    }

    const createClickObserver = () => {
      document.body.addEventListener('click', handleClickEvents, { passive: true })
    }

    const handleWindowResize = () => {
      state.parentWidth = targetRef.value.parentElement.clientWidth
    }

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
      left:0;
      max-width: 300px;
      min-height: 24px;
      padding: 8px;
      z-index: 111;
      border-radius: 2px;
      font-size: 14px;
      text-transform: none;
      white-space: wrap;
      opacity: 1;
      background-color: var(--background-highlight);
      color: var(--text);
      font-weight: 500;
      min-width: 40px;
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
