<template>
  <div class="sd--dialog__header">
    <div
      class="sd--dialog__header-content"
      v-if="title || subtitle"
    >
      <h3
        class="sd--dialog__title"
        v-if="title"
      >
        {{ title }}
      </h3>
      <p
        class="sd--dialog__subtitle"
        v-if="subtitle"
      >
        {{ subtitle }}
      </p>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SdDialogHeader',
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="scss">
  .sd--dialog{
    &__header{
      display:flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      background-color: var(--sd-background);
      border-radius: 3px 3px 0 0;
      flex-shrink: 0;
      border-bottom: 1px solid var(--sd-divider);
    }
    &__title {
      font-size: 20px;
      line-height: 24px;
      margin: 0;
      font-weight: 500;
      margin: 0;
    }
    &__subtitle {
      font-size: 16px;
      color: var(--sd-text-highlight);
      margin: 0;
      font-weight: 300;
    }
  }
</style>
