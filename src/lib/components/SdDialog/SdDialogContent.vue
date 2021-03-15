<template>
  <div class="sd--dialog__content">
    <slot/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SdDialogContent'
})
</script>

<style lang="scss">
  .sd--dialog__content{
    background-color: var(--background);
    padding: 16px;
    flex-grow: 2;
    overflow-y: auto;
    overflow-x:hidden;
  }
</style>
