<template>
  <!-- FUTURE: Cover all props in SdButton. Several usecases for different kinds of router links. -->
  <router-link
    :to="to"
    v-slot="{href, navigate, isActive, isExactActive}"
    custom
  >
    <sd-button
      @href="href"
      @click="navigate"
      :active="!hash && isActive"
      :theme="theme"
      :exact-active="!hash && isExactActive"
      :outline="outline"
      :disabled="disabled"
      :flat="flat"
      :pill="pill"
    >
      <slot />
    </sd-button>
  </router-link>
</template>

<script>
import SdButton from './SdButton.vue'

export default {
  name: 'SdRouterLink',
  components: {
    SdButton
  },
  props: {
    to: String,
    flat: Boolean,
    outline: Boolean,
    pill: Boolean,
    disabled: Boolean,
    theme: String,
    hash: Boolean
  }
}
</script>

<style lang="scss">

</style>
