<template>
  <div class="sd--widget-metric">
    <span
      class="sd--widget-metric__value"
      v-if="value"
    >
      {{ value }}
    </span>
    <span
      class="sd--widget-metric__note"
      v-if="note"
    >
      {{ note }}
    </span>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SdWidgetMetric',
  props: {
    value: {
      type: [String, Number],
      default: undefined
    },
    note: {
      type: String,
      default: undefined
    }
  }
});
</script>

<style lang="scss">
.sd--widget-metric {
  flex-grow: 1;
  margin: 16px;
  &__value {
    font-size: 50px;
  }
  &__note {
    margin-left: 8px;
    font-size: 16px;
    opacity: 0.86;
  }
}
</style>
