<template>
  <label :class="[computedClasses]">
    <slot />
    <span
      class="sd--label--required"
      v-if="required"
    >*</span>
  </label>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'SdLabel',
  props: {
    inline: Boolean,
    required: Boolean
  },
  setup (props) {
    const computedClasses = computed(() => {
      return {
        'sd--label': true,
        'sd--label--inline': props.inline
      }
    })
    return { computedClasses }
  }
})
</script>

<style lang="scss">
.sd--label {
  font-size: 14px;
  letter-spacing: .5px;
  line-height: 1.2;
  display:flex;
  align-items: center;
  color: var(--text-accent);
  position: relative;
  justify-content: space-between;

  & > span {
    margin-right:4px;
  }

  &--required {
    font-size: 20px;
    margin-left: 8px;
    line-height: 1;
    height: 12px;
    margin-right: 0;
    color: var(--danger);
    align-self: center;
  }

  &--inline {
    margin-bottom:0;
  }
}
</style>
