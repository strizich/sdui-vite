<template>
  <div class="sd--mast">
    <div class="sd--mast__content">
      <p class="sd--text__caption">
        {{ subtitle }}
      </p>
      <h1 class="sd--text__headline">
        {{ title }}
      </h1>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: 'SdMast',
  props: {
    alignment: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
  }
})
</script>

<style lang="scss">
  
  :root{
    --sd-mast-height: calc(100vh - 140px);
    --sd-mast-bg: linear-gradient(180deg, var(--background-accent), var(--background-highlight));
  }

  .sd--mast{
    margin: 0 0 32px 0;
    min-height: var(--sd-mast-height);
    background-image: var(--sd-mast-bg);
    position: relative;
    display:flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 env(safe-area-inset-left) 0 env(safe-area-inset-right);
    color: var(--text);
    &__content{
      width: 100%;
      margin: 0 auto;
      padding: 0 32px 32px;
    }
  }
</style>
