<template>
  <div class="sd--menu" ref="menuRef">
    <slot />
  </div>
</template>

<script>
import { provide, ref, watch, defineComponent, onMounted, onUnmounted } from 'vue';
export default defineComponent ({
  name: 'SdMenu',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const menuRef = ref(null)
    const triggerEl = ref(null)
    const activate = ref(false)

    watch(() => props.modelValue, (next) => {
      activate.value = next
    }, {immediate: true})


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
  z-index: 500;
  display:inline-flex;
}
</style>