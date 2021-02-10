<template>
  <label :class="[computedClasses]">
    <slot />
  </label>
</template>

<script>
import { computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'SdLabel',
  props: {
    inline: Boolean
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
  & > span{
    margin-right:4px;
  }
  &--inline{
    margin-bottom:0;
  }
}
</style>
