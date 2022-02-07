<template>
  <div
    :id="id"
    class="sd--menu"
    ref="menuRef"
  > 
    <slot />
  </div>
</template>

<script>
import { provide, ref, watch, defineComponent, onUnmounted, watchPostEffect } from 'vue';
import sdUuid from '../../core/utilities/SdUuid';
export default defineComponent ({
  name: 'SdMenu',
  props: {
    modelValue: { 
      type: Boolean,
      default: false
    },
    keyboard: {
      type: Boolean,
      default: true
    },
    id: {
      type: String,
      default: () => 'sd--menu--' + sdUuid()
    }
  },
  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const menuRef = ref(null)
    const triggerEl = ref(null)
    const activate = ref(false)

    watch(() => props.modelValue, (next) => {
      if (next) {
        activate.value = next
      }
    })

    watch(() => activate.value, (next) => {
      if (next) {
        emit('update:modelValue', activate.value)
      }
    })

    const toggleMenu = () => {
      activate.value = !activate.value
    }

    const handleKeypress = (e) => {
      if (props.keyboard && (e.key === 'Enter' || e.code === 'Space')) {
        e.preventDefault()
        activate.value = !activate.value
      }
    }

    watchPostEffect(() => {
      if (menuRef.value instanceof HTMLElement) {
        triggerEl.value = menuRef.value.querySelector('[trigger]')
        triggerEl.value.addEventListener('mouseup', toggleMenu, {passive: true})
        triggerEl.value.addEventListener('keydown', handleKeypress, {passive: false})
      }
    })

    onUnmounted(() => {
      if(triggerEl.value) {
        triggerEl.value.removeEventListener('mouseup', toggleMenu)
        triggerEl.value.removeEventListener('keydown', handleKeypress)
      }
    })

    provide('activate', activate)
    provide('menuEl', menuRef)
    provide('triggerEl', triggerEl)
    return {
      menuRef
    }
  }
});
</script>

<style lang="scss">
.sd--menu{
  position: relative; 
  transition: opacity .5s;
  display:inline-block;
  margin-right: 8px;
  &:last-child:not(:only-child){
    margin-right: 0;
  }
}
</style>