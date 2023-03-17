<template>
  <div class="sd--action-bar">
    <div class="sd--action-bar__header">
      <slot name="title" />
      <h3 
        class="sd--action-bar__title"
        v-if="title"
      >
        {{ title }}
      </h3>
    </div>
    <div class="sd--action-bar__body">
      <div class="sd--action-bar__start">
        <slot name="start" />
      </div>
      <div class="sd--action-bar__end">
        <slot name="end" />
      </div>
    </div>
  </div>  
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SdActionBar',
  props: {
    title: {
      type: String,
      default: undefined
    }
  },
  setup() {
  }
})
</script>

<style lang="scss">
  @use '../../scss/functions' as *;
  @use '../../scss/breakpoints';

  .sd--action-bar {
    --bg-color: var(--sd-background-highlight);
    margin-bottom:16px;
    &__title {
      margin-bottom: 8px;
      font-size: rem(18);
    }
    &__body {
      display: flex;
      justify-content: space-between;
      padding: 16px;
      background-color: var(--sd-bg-color);
      @include breakpoints.breakpoint-down('sm'){
        flex-direction: column;
      }
    }
    &__start{
      @include breakpoints.breakpoint-down('sm'){
        margin-bottom: 16px;
      }
    }
  }
</style>
