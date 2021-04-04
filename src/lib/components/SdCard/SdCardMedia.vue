<template>
  <div :class="['sd--card__media', mediaClasses, mediaSize]">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'SdCardMedia',
  props: {
    ratio: {
      type: String,
      default: '1x1',
      validator: (value: string) => {
        return [
          '16-9',
          '16/9',
          '16:9',
          '16x9',
          '4-3',
          '4/3',
          '4:3',
          '4x3',
          '1-1',
          '1/1',
          '1:1',
          '1x1'
        ].indexOf(value) !== -1
      }
    },
    size: {
      type: String,
      default: 'md',
      validator: (value: string) => {
        return [
          'sm',
          'md',
          'lg'
        ].indexOf(value) !== -1
      }
    }
  },
  setup (props) {
    const getRatioFormat = (divider) => {
      return props.ratio.indexOf(divider) !== -1
    }

    const getAspectRatio = computed(() => {
      let ratio: string[] = []
      if (getRatioFormat(':')) {
        ratio = props.ratio.split(':')
      } else if (getRatioFormat('/')) {
        ratio = props.ratio.split('/')
      } else if (getRatioFormat('-')) {
        ratio = props.ratio.split('-')
      } else if (getRatioFormat('x')) {
        ratio = props.ratio.split('x')
      }
      return ratio.length === 2 ? ratio : null
    })

    const mediaSize = computed(() => {
      return `sd--card__media--${props.size}`
    })

    const mediaClasses = computed(() => {
      let classes = ''
      if (props.ratio) {
        const ratio = getAspectRatio.value
        if (ratio) {
          const [horz, vert] = ratio
          classes = `sd--card__media--${horz}-${vert}`
        }
      }
      return classes
    })
    return { mediaClasses, mediaSize, getAspectRatio }
  }
})
</script>

<style lang="scss">
@import '../../scss/variables';
@import '../../scss/mixins';

$ratioSizes: (
  (16, 9),
  (4, 3),
  (1, 1)
);

.sd--card {
  &__media {
    position:relative;
    @each $size in $ratioSizes {
      $horz: nth($size, 1);
      $vert: nth($size, 2);
      &--#{$horz}-#{$vert} {
        @include aspect-ratio($horz, $vert);
      }
    }
    + .sd--card__header{
      padding-top: 24px
    }
    + .sd--card__content:last-child{
      padding-bottom :16px;
    }
    img {
      width: 100%;
    }
 
    &:first-child{
      border-radius: 3px 3px 0 0;
    }
    &:last-child{
      border-radius: 0 0 3px 3px;
    }
    &:only-child{
      border-radius: 3px;
    }
  }
}
</style>
