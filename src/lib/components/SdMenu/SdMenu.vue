<template>
  <div :id="id" class="sd--menu" ref="menuRef">
    <slot />
  </div>
</template>

<script>
import { provide, ref, watch, defineComponent, onMounted, onUnmounted } from 'vue';
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

    onMounted(() => {
      triggerEl.value = menuRef.value.querySelector('[trigger]')
      triggerEl.value.addEventListener('click', toggleMenu, {passive: true})
    })

    onUnmounted(() => {
      triggerEl.value.removeEventListener('click', toggleMenu)
    })

    provide('activate', activate)

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
}
</style>