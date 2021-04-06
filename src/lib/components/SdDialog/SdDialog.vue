<template>
  <!-- TODO: Add aria tags -->
  <teleport
    :to="portalTo"
    :disabled="portalDisabled"
  >
    <transition
      name="dialog"
      @after-enter="dispatchResize"
      @after-leave="dispatchResize"
    >
      <div
        class="sd--dialog"
        v-if="active"
      >
        <div
          :class="['sd--dialog__wrapper','elevation--6', classes ]"
          @keydown.esc="onEsc"
          ref="modalContainer"
        >
          <div class="sd--dialog__container">
            <slot />
          </div>
        </div>
        <sd-overlay
          fixed
          :parent="`#${id}`"
          :class="backdropClass"
          :active="active"
          :blur="backdropBlur"
          @click="onOutsideClick"
          v-if="backdrop && active"
        />
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, watch, computed, nextTick, onMounted, ref } from 'vue'
import SdOverlay from './SdOverlay.vue'
import sdUuid from '../../core/utilities/SdUuid'
import '../SdElevation'

export default defineComponent({
  name: 'SdDialog',
  props: {
    id: {
      type: String,
      default: 'modal-' + sdUuid()
    },
    portalTo: {
      type: String,
      default: '#app'
    },
    portalDisabled: {
      type: Boolean,
      default: false
    },
    active: Boolean,
    backdrop: {
      type: Boolean,
      default: true
    },
    backdropClass: {
      type: String,
      default: 'sd--dialog__overlay'
    },
    backdropBlur: Boolean,
    clickOutsideToClose: {
      type: Boolean,
      default: true
    },
    closeOnEsc: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'md'
    },
    fullscreen: {
      type: Boolean,
      default: true
    },
    aside: Boolean,
    placement: {
      type: String,
      default: 'right'
    }
  },
  components: {
    SdOverlay
  },
  emits: ['update:active', 'clicked-outside', 'opened', 'closed'],
  setup (props, { emit }) {
    const modalContainer = ref(null)
    const classes = computed(() => {
      const sizeClass = `is--${props.size}`
      const asidePlacement = `sd--dialog__aside--${props.placement}`
      return {
        'sd--dialog__aside': props.aside,
        'sd--dialog__fullscreen': props.fullscreen && !props.aside,
        [asidePlacement]: props.aside && props.placement,
        [sizeClass]: true
      }
    })

    const setFocus = () => {
      // Sets the focus on the modal container so the
      // first focused field when`tab` is pressed will
      // be an child of the modal.
      window.setTimeout(() => {
        if (modalContainer.value) {
          modalContainer.value.setAttribute('tabindex', '-1')
          modalContainer.value.focus()
        }
      }, 0)
    }

    // When the modal is active we set the body of the document to fixed and position
    // it based on its current scoll location. This keeps the body of the document from
    // bouncing back to position [0,0] if the use is scrolled down and disables scrolling
    // on the body while the dialog is open.
    // When the dialog is closed save style we used above to
    // position the element in `scrollY`.
    // Then set the position of the body back to static.
    // Then set scrollTo to our saved scroll position.
    watch(() => props.active, () => {
      nextTick().then(() => {
        if (props.active) {
          document.body.classList.add('sd--dialog--open')
          document.body.style.top = `-${window.scrollY}px`
          document.body.style.position = 'fixed'
          document.body.style.left = '0'
          document.body.style.right = '0'
          setFocus()
          emit('opened')
        } else {
          const scrollY = document.body.style.top
          document.body.classList.remove('sd--dialog--open')
          document.body.removeAttribute('style')
          window.scrollTo(0, parseInt(scrollY || '0') * -1)
          emit('closed')
        }
      })
    })

    const closeModal = () => {
      emit('update:active', false)
    }

    const onOutsideClick = () => {
      if (props.clickOutsideToClose) {
        closeModal()
      }
      emit('clicked-outside')
    }

    const onEsc = () => {
      if (props.closeOnEsc) {
        closeModal()
      }
    }

    // Dispatch a resize event for children component
    // that need to update their boundingRect after the
    // animation has completed
    const dispatchResize = () => {
      nextTick().then(() => {
        window.dispatchEvent(new Event('resize'))
      })
    }

    onMounted(() => {
      setFocus()
    })

    return {
      onEsc,
      onOutsideClick,
      closeModal,
      classes,
      modalContainer,
      dispatchResize
    }
  }
})
</script>

<style lang="scss">
  @import '../../scss/breakpoints';

  .sd--dialog{
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right: 0;
    z-index: 1001;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translate(0, 0);
    color: var(--text);
    // &--open{
    //   @include breakpoint-up('sm') {
    //     padding-right: 10px;
    //   }
    // }
    &__wrapper{
      margin: auto;
      display: flex;
      flex-flow: column;
      flex-direction: row;
      overflow: hidden;
      position: fixed;
      z-index: 1002;
      border-radius: 2px;
      backface-visibility: hidden;
      pointer-events: auto;
      transform-origin: center center;
      transition: opacity .3s ease-in-out,
                  transform .3s  ease-in-out;
      will-change: opacity, transform, left, top;
      &:focus{
        outline: none;
      }
      &.is{
        &--sm{
          width: 25%;
          height: auto;
        }
        &--md{
          @include breakpoint-up('md'){
            height: 80%;
          }
          width: 60%;
        }
        &--lg{
          width: 90%;
        }
      }
    }
    &__fullscreen{
      min-width: 300px;
      max-width: 80%;
      max-height: 80%;
      height:100%;
      width:100%;
      @include breakpoint-down('sm'){
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-radius: 0;
        transform: none;
      }
    }
    &__aside{
      min-height: 100%;
      left: 100%;
      top:0;
      bottom:0;
      right: 0;
      overflow: hidden;
      transition: opacity .3s ease-in-out,
                  transform .3s  ease-in-out;
      &--left{
        right: auto;
        left: 0;
        transform: translate3D(0%, 0, 0);
      }
      &--right{
        transform: translate3D(-100%, 0, 0);
      }
      @include breakpoint-down('sm'){
        left: 0;
        right: 0;
        top:0;
        bottom:0;
        min-width: 100%;
        transform: none;
        opacity: 1;
      }
      &.is--md{
        width: 40%
      }
    }
    &__container{
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      flex: 1;
      height: 100%;
      @include breakpoint-down('sm'){
        height: 100%;
        top:0;
      }
    }
  }

.dialog-leave-active, .dialog-enter-active {
  transition: opacity .3s ease-in-out,
              transform .3s ease-in-out;
  & > .sd--overlay{
    will-change: opacity;
    transition: opacity .5s ease-in-out,
  }
}

.dialog-enter-from, .dialog-leave-to{
  .sd--overlay{
    opacity: 0;
  }
  .sd--dialog {
    &__fullscreen {
      transform: translate3D(0, -30px, 0);
      opacity: 0;
      @include breakpoint-down("sm") {
        transform: translate3D(0, 100%, 0);
      }
    }
    &__aside {
      &--left{
        transform: translate3D(-100%, 0, 0);
      }
      &--right{
        transform: translate3D(100%, 0, 0);
      }
      @include breakpoint-down("sm") {
        transform: translate3D(0, 100%, 0);
      }
    }
  }
}
</style>
