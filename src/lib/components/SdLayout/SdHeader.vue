<template>
  <header class="sd--header">
    <div class="sd--header__container">
      <sd-hamburger
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
import { defineComponent, reactive } from 'vue'
import useWindowWidth from '../../hooks/useWindowWidth'
import SdHamburger from '../SdButton/SdHamburger.vue'

export default defineComponent({
  name: 'SdHeader',
  emits: ['toggle'],
  components: { SdHamburger },
  props: {
    asideOpen: Boolean
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

    updateWindowWidth()
    getStoredMenuState()

    return { handleMenu }
  }
})
</script>

<style lang="scss">
.sd--header{
  &__container{
    display: flex;
    background-color: var(--background-highlight);
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
}

</style>
