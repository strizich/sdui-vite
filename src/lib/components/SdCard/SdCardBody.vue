<template>
  <div class="sd--card__body">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SdCardBody'
})
</script>

<style lang="scss">
@import '../../scss/spacing';
.sd--card {
  &__body {
    padding: 16px;
    flex-grow: 2;
    position: relative;
    & > p {
      padding-top: 0;
      margin-top: 0;
    }
  }
}
</style>
