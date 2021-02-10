<template>
  <div class="sd--card__footer" :style="alignmentStyle">
    <slot/>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import useAlignment from '../../hooks/useAlignment'

export default defineComponent({
  name: 'SdCardFooter',
  props: {
    align: {
      type: String,
      default: 'flex-start'
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
})
</script>

<style lang="scss" >
.sd--card__footer{
  padding: spacing(offset);
  display:flex;
  border-radius: 0 0 3px 3px;
  position: relative;
  align-items: center;
  border-top: 1px solid v(--divider);
  flex-grow: 0;
}
</style>
