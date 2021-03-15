<template>
  <teleport to="#app">
    <div class="sd--menu">
      Menu goes here.
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core"

export default defineComponent({
  name: 'SdMenu'
})
</script>

<style lang="scss">

</style>
