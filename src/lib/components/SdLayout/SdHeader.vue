<template>
  <header :class="['sd--header', headerClasses]">
    <div class="sd--header__container">
      <sd-hamburger
        :theme="theme"
        :class="[triggerClasses]"
        :active="asideOpen"
        @update:active="handleMenu"
      />
      <div class="sd--header__content">
        <div class="sd--header__brand">
          <slot name="brand" />
        </div>
        <nav class="sd--header__nav">
          <slot name="nav" />
        </nav>
      </div>
    </div>
    <div class="sd--header__subheader">
      <slot name="subheader" />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, reactive, computed} from 'vue'
import useWindowWidth from '../../hooks/useWindowWidth'
import SdHamburger from '../SdButton/SdHamburger.vue'

export default defineComponent({
  name: 'SdHeader',
  emits: ['toggle'],
  components: { SdHamburger },
  props: {
    asideOpen: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'auto'
    },
    sidebarPosition: {
      type: String,
      default: 'left'
    }
  },
  setup (props, { emit }) {
    const { smallDevice } = useWindowWidth()

    const sidebar = reactive({
      open: false
    })

    const getStoredMenuState = () => {
      const state = window.localStorage.getItem('SDUI:navState')
      sidebar.open = state === 'true'
      emit('toggle', sidebar.open)
    }

    const updateWindowWidth = () => {
      const smScreen = smallDevice.value
      if (smScreen === true) {
        window.localStorage.setItem('SDUI:navState', 'false')
        emit('toggle', false)
      }
    }

    const handleMenu = (e) => {
      const smScreen = smallDevice.value
      if (!smScreen) {
        window.localStorage.setItem('SDUI:navState', `${!props.asideOpen}`)
      } else {
        window.localStorage.setItem('SDUI:navState', 'false')
      }
      emit('toggle', e)
    }

    const triggerClasses = computed(() => {
      return {
        'sd--header__trigger': true,
        [`is--${props.sidebarPosition}`]: !!props.sidebarPosition,
      }
    })
    const headerClasses = computed(() => {
      return {
        [`sd--header--${props.theme}`]: !!props.theme,
      }
    })

    updateWindowWidth()
    getStoredMenuState()

    return { handleMenu, triggerClasses, headerClasses }
  }
})
</script>

<style lang="scss">
.sd--header{
  &--light {
    background-color: var(--background-light);
    color: var(--text-dark);
  }
  &--dark {
    background-color: var(--background-dark);
    color: var(--text-light);
  }
  &--auto {
    background-color: var(--background-highlight);
    color: var(--text);
  }
  &__container{
    display: flex;
  }
  &__content{
    width: 100%;
    flex-wrap: wrap;
    padding: 8px 0px 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__brand{
    flex-grow: 1;
  }
  &__nav{
    flex-grow: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 8px;
  }
  &__subheader{
    width: 100%;
  }
  &__trigger {
    &.is--left{
      order: 0;
    }
    &.is--right{
      order: 4;
    }
  }
}
</style>
