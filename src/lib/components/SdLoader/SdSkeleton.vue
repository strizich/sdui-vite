<template>
  <span
    class="sd--text__skeleton"
    :style="[computedStyles]"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'SdSkeleton',
  props: {
    minWidth: {
      type: Number,
      default: 80
    },
    maxWidth: {
      type: Number,
      default: 100
    },
    maxHeight: {
      type: Number,
      default: null
    },
    width: {
      type: Number,
      default: null
    },
    height: {
      type: Number,
      default: 16
    }
  },
  setup (props) {
    const computedStyles = computed(() => {
      const randomWidth = Math.floor(Math.random() * (props.maxWidth - props.minWidth)) + props.minWidth + '%'
      return {
        width: props.width || randomWidth,
        height: props.height + 'px'
      }
    })

    return {
      computedStyles
    }
  }
})
</script>

<style lang="scss">

.sd--text{
  &__skeleton{
    display:inline-block;
    position:relative;
    overflow: hidden;
    backdrop-filter: brightness(76%);
    &:after{
      position:absolute;
      top:0;
      left:0;
      bottom:0;
      right:0;
      transform: translateX(-100%);
      animation: shimmer 5s infinite;
      content: '';
      background-image: linear-gradient(var(--sd-skeleton));
    }
  }
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
