<template>
  <slot />
</template>

<script lang="ts">
import { computed, watch, onMounted, nextTick, defineComponent } from 'vue'
export default defineComponent({
  name: 'SdScheme',
  props: {
    /**
     * Changes the preferred color scheme.
     * @values auto, dark, light
    */
    mode: {
      type: String,
      default: 'auto'
    }
  },
  setup (props) {
    const scheme = computed(() => {
      return `sd--scheme--${props.mode}`
    })

    watch(() => scheme.value, (newValue, oldValue) => {
      nextTick().then(() => {
        document.body.classList.replace(`${oldValue}`, `${newValue}`)
      })
    })
    onMounted(() => {
      document.body.classList.add(`${scheme.value}`)
    })
  }
})
</script>