<template>
  <router-link
    :to="to"
    v-slot="{href, navigate, isActive, isExactActive}"
    custom
  >
    <sd-nav-content
      :icon="icon"
      :href="href"
      :active="isActive"
      :exact-active="isExactActive"
      @click="navigate"
      :secondary="secondary"
    >
      <slot />
    </sd-nav-content>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SdNavContent from './SdNavContent.vue'

export default defineComponent({
  name: 'SdNavLink',
  props: {
    icon: String,
    to: String,
    secondary: Boolean
  },
  components: { SdNavContent }
})
</script>

<style lang="scss">

</style>
