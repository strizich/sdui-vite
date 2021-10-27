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
    id: {
      type: String,
      default: () => 'sd--menu--' + sdUuid()
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const menuRef = ref(null)
    const triggerEl = ref(null)
    const activate = ref(false)

    watch(() => props.modelValue, (next) => {
      activate.value = next
    }, {immediate: true})

    watch(() => activate.value, (next) => {
      if (next) {
        emit('update:modelValue', activate.value)
      }
    })

    const toggleMenu = () => {
      activate.value = !activate.value
    }

    watchPostEffect(() => {
      if (menuRef.value instanceof HTMLElement) {
        triggerEl.value = menuRef.value.querySelector('[trigger]')
        triggerEl.value.addEventListener('mousedown', toggleMenu, {passive: true})
      }
    })

    onUnmounted(() => {
      if(triggerEl.value) {
        triggerEl.value.removeEventListener('mousedown', toggleMenu)
      }
    })

    provide('activate', activate)
    provide('menuEl', menuRef)

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

  z-index: 110;
  display:inline-block;
  margin-right: 8px;
  &:last-child:not(:only-child){
    margin-right: 0;
  }
}
</style>