<script lang="ts">
import { defineComponent, computed, h } from 'vue'
export default defineComponent({
  name: 'SdContainer',
  props: {
    break: {
      type: String,
      default: undefined
    },
    full: Boolean,
    article: Boolean
  },
  setup (props, { slots }) {
    const classes = computed(() => {
      if (props.full) {
        return 'sd--container--full'
      } else if (props.break) {
        return `sd--container--${props.break}`
      } else {
        return 'sd--container'
      }
    })
    
    const elementTag = computed(() => {
      return props.article ? 'article' : 'div'
    })

    return () =>
      h(
        elementTag.value,
        {
          class: classes.value
        },
        slots
      )
  }
})
</script>

<style lang="scss">
@import '../../scss/breakpoints';
@import './grid';
.sd--container {
  @each $size, $value in $container-max-widths{
    @include media-breakpoint-down($size){
      max-width: $value;
      width: 100%;
      margin: 0 auto;
      padding: 0 32px;
    }
    &--#{$size}{
      max-width: $value;
      margin: 0 auto;
    }
  }
  &--full {
    max-width: 100%;
  }
  @include breakpoint-down('sm') {
    padding: 0 24px;
  }
}
</style>
