<template>
  <teleport
    ref="targetRef"
    :to="portalDisabled ? null : portalTo"
    :disabled="portalDisabled"
  >
    <transition name="menu">
      <div
        :id="id"
        ref="instanceRef"
        class="sd--menu"
        v-if="shouldRender"
        :style="computedStyles"
      >
        <sd-focus-trap
          :target="instanceRef"
          :set-return-focus="triggerEl"
          v-model="shouldRender"
        >
          <slot />
        </sd-focus-trap>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import usePopper from '../../hooks/usePopper'
import SdContains from '../../core/utilities/SdContains';
import SdUuid from '../../core/utilities/SdUuid';
import { inject, PropType, defineComponent, computed, reactive, watchEffect } from 'vue'
import { Placement } from '@popperjs/core'
import SdFocusTrap from '../SdFocusTrap/SdFocusTrap.vue';

// TODO: Add props to control z-index

 export default defineComponent({
  components: { SdFocusTrap },
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
      default: () => [0, 0]
    },
    full: {
      type: Boolean,
      default: false
    }
  },
  emits: ['opened', 'closed'],
  setup(props, { emit }) {
    const activate: any = inject('activate', false)
    const menuEl: any = inject('menuEl', null)
    const triggerEl: any = inject('triggerEl', null)

    const { shouldRender, targetRef, instanceRef } = usePopper(props, emit, activate)

    const state = reactive({
      parentWidth: 0,
    }) 

    const computedStyles = computed(() => {
      if (props.full) {
        return {
          minWidth: `${state.parentWidth}px`
        }
      }
      return false
    })
    const isTrigger = ({target}) => {
      return SdContains(triggerEl.value, target)
    }

    const isMenu = ({target}) => {
      return menuEl.value ? SdContains(menuEl.value, target) : false
    }

    const isMenuContent = ({target}) => {
      return instanceRef.value ? SdContains(instanceRef.value, target) : false
    }

    const handleClickEvents = (event) => {
      if(document && activate.value && !isTrigger(event)) {
        const insideClick = isMenu(event) && (props.closeOnClick && isMenuContent(event))
        const outsideClick = !isMenu(event) && (props.outsideClick && !isMenuContent(event))

        if (insideClick || outsideClick) {
          activate.value = false
          window.removeEventListener('resize', handleWindowResize)
          document.body.removeEventListener('mouseup', handleClickEvents)
          document.body.removeEventListener('keyup', onKeydown)
        }
      }
    }

    const onKeydown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          e.stopPropagation()
          activate.value = false
          break;
      }
    }

    const createKeyboardObserver = () => {
      document.body.addEventListener('keyup', onKeydown, { passive: false })
    }

    const createClickObserver = () => {
      document.body.addEventListener('mouseup', handleClickEvents, { passive: true })
    }

    const createResizeObserver = () => {
      window.addEventListener('resize', handleWindowResize, { passive: true })
    }

    const handleWindowResize = () => {
      if(menuEl.value instanceof HTMLElement) {
        state.parentWidth = menuEl.value.getBoundingClientRect().width
      }
    }

    watchEffect(() => {
      if (activate.value && instanceRef.value instanceof HTMLElement) {
          createClickObserver()
          handleWindowResize()
          createKeyboardObserver()
          createResizeObserver()
      }
    }, { flush: 'post' })

    return {
      shouldRender,
      targetRef,
      instanceRef,
      computedStyles,
      state,
      triggerEl
    }
  }
})
</script>

<style lang="scss">
  @import '../SdElevation/mixins';
  @import '../../scss/variables';
  .sd--menu{
      left:0;
      min-height: 24px;
      padding: 8px;
      z-index: 1100;
      border-radius: 2px;
      font-size: 14px;
      text-transform: none;
      white-space: wrap;
      opacity: 1;
      background-color: var(--background-highlight);
      color: var(--text);
      font-weight: 500;
      min-width: 40px;
      @include elevation(6);
  }
.menu-enter-active,
.menu-leave-active {
  transition: top 0.3s, opacity 0.3s 0.1s;
}

.menu-enter-to, .menu-leave-from {
  opacity: 1;
  top: 0;
}

 .menu-leave-to, .menu-enter-from {
  top: 16px;
  opacity: 0;
  position: absolute;
}
</style>
