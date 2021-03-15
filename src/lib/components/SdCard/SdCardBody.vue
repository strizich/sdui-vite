<template>
  <div class="sd--card__body">
    <slot/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SdCardBody'
})
</script>

<style lang="scss">
.sd--card {
  &__body{
    padding: 16px;
    flex-grow: 2;
  }
}
</style>
