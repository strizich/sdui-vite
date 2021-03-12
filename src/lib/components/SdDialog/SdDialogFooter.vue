<template>
  <div class="sd--dialog__footer">
    <slot />
  </div>
</template>

<script>
import useAlignment from '../../hooks/useAlignment'

export default {
  name: 'SdDialogFooter',
  props: {
    align: {
      type: String,
      default: 'flex-end'
    },
    direction: {
      type: String,
      default: 'initial'
    }
  },
  setup (props) {
    const { alignmentStyle } = useAlignment(props.align, props.direction)
    return { alignmentStyle }
  }
}
</script>

<style lang="scss">
  @import '../../scss/breakpoints';

.sd--dialog{
  &__footer{
    display: flex;
    align-content: center;
    width: 100%;
    justify-content: flex-end;
    flex-shrink: 0;
    background: var(--background);
    border-top: 1px solid var(--divider);
    border-radius: 0 0 3px 3px;
    backdrop-filter: blur(20px);
    padding: 8px 16px;
    border-radius: 0 0 3px 3px;
    @include breakpoint-down('sm') {
      padding: 8px 8px calc(16px + ios-safe-area(bottom));
    }
  }
}
</style>
