<template>
  <!-- FUTURE: Cover all props in SdButton. Several usecases for different kinds of router links. -->
  <router-link
    :to="to"
    v-slot="{href, navigate, isActive, isExactActive}"
    custom
  >
    <sd-button
      @click="navigate"
      :tabindex="tabindex"
      :href="href"
      :active="!hash && isActive"
      :theme="theme"
      :exact-active="!hash && isExactActive"
      :outline="outline"
      :disabled="disabled"
      :icon="icon"
      :icon-only="iconOnly"
      :flat="flat"
      :pill="pill"
    >
      <slot />
    </sd-button>
  </router-link>
</template>

<script lang="ts">
import SdButton from './SdButton.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SdRouterLink',
  components: {
    SdButton
  },
  props: {
    to: {
      type: String,
      default: undefined
    },
    icon: {
      type: String,
      default: ''
    },
    iconOnly: Boolean,
    tabindex: {
      type: [String, Number],
      default: 0
    },
    flat: Boolean,
    outline: Boolean,
    pill: Boolean,
    disabled: Boolean,
    theme: {
      type: String,
      default: undefined
    },
    hash: Boolean
  }
})
</script>

<style lang="scss">

</style>
