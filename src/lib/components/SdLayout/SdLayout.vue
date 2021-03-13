<template>
  <div class="sd--layout">
    <div class="sd--layout__header">
      <slot name="header"/>
    </div>
    <div :class="['sd--layout__body', layoutClasses]">
      <!-- FUTURE: Disable transition on mobile and set body to fixed when floating-->
        <transition name="sidebar" @leave="afterLeave">
          <div :class="['sd--layout__sidebar', sidebarClasses]" :style="handleTabIndex">
            <slot name="sidebar"/>
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
        v-if="sidebar"
        :active="floating && sidebar"
        @click="handleOutsideClick"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, computed, watch, nextTick, onMounted, defineComponent } from 'vue'
import SdOverlay from '../SdDialog/SdOverlay.vue'
// import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'SdLayout',
  // may be able to use provide/inject to handing the excessive prop casting.
  props: {
    sidebar: Boolean,
    floating: Boolean,
    overlay: Boolean,
    scheme: {
      default: 'auto'
    }
  },
  components: {
    SdOverlay
  },
  emits: ['toggle'],
  setup (props, { emit }) {
    const scheme = computed(() => {
      return `sd--scheme--${props.scheme}`
    })

    watch(() => scheme.value, (newValue, oldValue) => {
      nextTick().then(() => {
        document.body.classList.remove(`${oldValue}`)
        document.body.classList.add(`${newValue}`)
      })
    })
    
    onMounted(() => {
        document.body.classList.add(`${scheme.value}`)
    })

    const state = reactive({
      shouldSkip: false
    })

    const layoutClasses = computed(() => {
      return {
        'sd--layout__body--open': props.sidebar && !props.floating
      }
    })

    const sidebarClasses = computed(() => {
      return {
        'sd--layout__sidebar--open': props.sidebar,
        'sd--layout__sidebar--floating': props.floating
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

    watch(() => [props.sidebar, props.floating], ([sidebarVal, floatVal]) => {
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
                background-color .6s 0s ease-in;
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
      &--open {
        .sd--layout__content {
          transition: margin-left .2s ease-in-out;
          margin-left: $sidebar-width;
        }
      }
    }
    &__content {
      flex-grow: 2;
      width: 100%;
      margin-left: 0;
      transition: margin-left .2s ease-in-out;
    }
    &__sidebar {
      transition: opacity .2s ease-in-out, left .2s ease-in-out;
      max-width: $sidebar-width;
      width: 100%;
      background: var(--background-highlight);
      align-self: stretch;
      position:fixed;
      top: 50px;
      left: -$sidebar-width;
      bottom: 0;
      opacity: 1;
      z-index:1000;
      will-change: opacity, left;
      a {
        visibility: hidden;
      }
      &--open {
        left: 0;
        opacity: 1;
        a {
          visibility: inherit;
        }
      }
      &--floating{
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
  .sidebar-enter-active, .sidebar-leave-active{
    transition: opacity .2s ease-in-out;
    overflow-x: hidden;
  }
  .sidebar-enter-from, .sidebar-leave-to{
    opacity: 0;
    left: -200px;
  }
  .sidebar-enter-to{
    opacity: 1;
    left: 10px;
  }
  .overlay-fade-enter-active, .overlay-fade-leave-active{
    transition: opacity .2s ease-in-out;
  }
  .overlay-fade-enter-from, .overlay-fade-leave-to{
    transition: opacity .2s ease-in-out;
    opacity: 0;
  }
</style>
