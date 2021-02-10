<template>
  <div :class="['sd--row', classes]" :style="{alignItems, justifyContent}">
    <slot/>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'SdRow',
  props: {
    dense: Boolean,
    gutterless: Boolean,
    alignItems: String,
    justifyContent: String
  },
  setup (props) {
    const classes = computed(() => {
      return {
        'is--gutterless': props.gutterless,
        'is--dense': props.dense
      }
    })
    return { classes }
  }
}
</script>

<style lang="scss">
  @import 'grid';
  .sd--row {
    @include make-row();
    &.is{
      &--gutterless {
        margin-right: 0;
        margin-left: 0;
        > .sd--col,
        > [class*="col-"] {
          padding-right: 0;
          padding-left: 0;
        }
      }
      &--dense {
        margin-right: 0;
        margin-left: 0;
        > .sd--col,
        > [class*="col-"] {
          padding-right: 8px;
          padding-left:8px;
        }
      }
    }
  }

</style>
