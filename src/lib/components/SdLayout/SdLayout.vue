<template>
  <div class="sd--layout">
    <div class="sd--layout__header">
      <slot name="header" />
    </div>
    <div :class="['sd--layout__body', layoutClasses]">
      <!-- FUTURE: Disable transition on mobile and set body to fixed when floating-->
      <transition
        :name="`sidebar-${position}`"
        @leave="afterLeave"
      >
        <div
          :class="['sd--layout__sidebar', 'is--floating', sidebarClasses]"
          :style="handleTabIndex"
        >
          <slot name="sidebar" />
        </div>
      </transition>
      <div class="sd--layout__content">
        <slot name="subheader" />
        <slot name="content" />
        <slot name="footer" />
      </div>
    </div>
    <transition name="overlay-fade">
      <sd-overlay
        v-if="sidebar && overlay"
        :active="floating && sidebar"
        @click="handleOutsideClick"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { reactive, toRef, toRefs, computed, watch, nextTick, defineComponent } from 'vue'
import SdOverlay from '../SdDialog/SdOverlay.vue'
import useScheme from '../../hooks/useScheme'

export default defineComponent({
  name: 'SdLayout',
  // may be able to use provide/inject to handing the excessive prop casting.
  props: {
    scheme: {
      type: String,
      default: 'auto'
    },
    theme: {
      type: String,
      default: 'auto'
    },
    sidebar: Boolean,
    floating: Boolean,
    overlay: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'left'
    },
  },
  components: {
    SdOverlay
  },
  emits: ['toggle'],
  setup (props, { emit }) {

    useScheme(toRef(props, 'scheme'))

    const state = reactive({
      shouldSkip: false
    })

    const layoutClasses = computed(() => {
      return {
        [`sd--layout__body--open-${props.position}`]: props.sidebar && !props.floating
      }
    })

    const sidebarClasses = computed(() => {
      return {
        [`sd--layout__sidebar--${props.position}`]: !!props.position,
        [`sd--layout__sidebar--${props.theme}`]: !!props.theme,
        'is--open': props.sidebar,
        'is--floating': props.floating
      }
    })

    const handleOutsideClick = () => {
      emit('toggle', false)
    }

    const afterLeave = () => {
      if (!props.sidebar) {
        state.shouldSkip = true
      }
    }

    const handleTabIndex = () => {
      // Tabs should skip the sidebar if the sidebar is not visible.
      return state.shouldSkip ? { visibility: 'hidden' } : null
    }

    watch(() => [props.sidebar, props.floating], () => {
      const animationTiming = 200 // ms
      setTimeout(() => {
        nextTick().then(() => {
          window.dispatchEvent(new Event('resize'))
        })
      }, animationTiming)
    })

    return {
      ...toRefs(state),
      sidebarClasses,
      layoutClasses,
      handleOutsideClick,
      handleTabIndex,
      afterLeave
    }
  }
})
</script>

<style lang="scss">
  $sidebar-width: 220px;
  html, body{
    transition: background-color .6s 0s ease-in,
                color .6s 0s ease-in
                background-color .13s 0s ease-in;
    background-color: var(--background);
    color: var(--text);
  }

  .sd--layout {
    min-height: 100vh;
    min-width: 100%;
    position: relative;
    display:flex;
    flex-direction: column;
    & > .sd--overlay{
      z-index: 999;
    }
    &__body {
      display:flex;
      flex-grow: 2;
      height:100%;
      &--open-left {
        .sd--layout__content {
          transition: margin-left .2s ease-in-out;
          margin-left: $sidebar-width;
        }
      }
      &--open-right{
        .sd--layout__content {
          transition: margin-right .2s ease-in-out;
          margin-right: $sidebar-width;
        }
      }
    }
    &__content {
      flex-grow: 2;
      width: 100%;
      margin-left: 0;
      transition: margin-left .2s ease-in-out, margin-right .2s ease-in-out;
    }

    &__sidebar {
      transition: opacity .2s ease-in-out, left .2s ease-in-out, right .2s ease-in-out;
      max-width: $sidebar-width;
      width: 100%;
      align-self: stretch;
      position:fixed;
      top: 50px;
      bottom: 0;
      opacity: 1;
      z-index:1000;
      will-change: opacity, left;
      &--dark{
        background-color: var(--background-dark);
        color: var(--text-light);
      }
      &--light {
        background: var(--background-light);
        color: var(--text-dark);
      }
      &--auto {
        background: var(--background-highlight);
        color: var(--text);
      }
      &--left{
        left: -$sidebar-width;
        &.is--open {
          left: 0;
        }
      }
      &--right{
        right: -$sidebar-width;
        &.is--open {
          right: 0;
        }
      }
      a {
        visibility: hidden;
      }
      &.is--open {
        opacity: 1;
        a {
          visibility: inherit;
        }
      }
      &.is--floating{
        z-index: 1002;
      }
    }
    &__header {
      position:sticky;
      width:100%;
      top:0;
      left:0;
      right:0;
      z-index: 1000;
    }
  }
  .sidebar-left-enter-active, .sidebar-left-leave-active{
    transition: opacity .2s ease-in-out;
    overflow-x: hidden;
  }
  .sidebar-left-enter-from, .sidebar-left-leave-to{
    opacity: 0;
    left: -200px;
  }
  .sidebar-left-enter-to{
    opacity: 1;
    left: 10px;
  }

  .sidebar-right-enter-active, .sidebar-right-leave-active{
    transition: opacity .2s ease-in-out;
    overflow-x: hidden;
  }
  .sidebar-right-enter-from, .sidebar-right-leave-to{
    opacity: 0;
    right: -200px;
  }
  .sidebar-right-enter-to{
    opacity: 1;
    right: 10px;
  }
  .overlay-fade-enter-active, .overlay-fade-leave-active{
    transition: opacity .2s ease-in-out;
  }
  .overlay-fade-enter-from, .overlay-fade-leave-to{
    transition: opacity .2s ease-in-out;
    opacity: 0;
  }
</style>
