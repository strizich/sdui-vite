<template>
  <transition name="error">
    <div
      class="sd--error"
      v-if="message"
    >
      <span class="sd--text__error">
        {{ message }}
      </span>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SdError',
  props: {
    message: {
      type: [String, Boolean],
      default: ''
    }
  }
})
</script>

<style lang="scss">
  .sd--error{
    transition: transform .3s, opacity .3s;
    will-change: transtion, opacity;
  }

  .sd--text{
    &__error{
      color: var(--danger-highlight);
      font-size: 14px;
    }
  }

  .error-enter-to, .error-leave-from{
    transform: translateY(0px);
    opacity: 1;
  }

  .error-enter-from{
    transform: translateY(-8px);
    opacity: 0;
  }

  .error-leave-to{
    transform: translateY(4px);
    opacity: 0;
  }

</style>
