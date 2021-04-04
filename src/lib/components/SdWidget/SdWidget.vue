// WIP

<template>
  <div class="sd--widget">
    <div :class="['sd--widget__content', classes]">
      <slot name="default" />
      <div class="sd--widget__metric">
        <span>500</span>
      </div>
      <div class="sd--widget__footer">
        <div class="sd--text__caption">
          {{ caption }}
        </div>
        <div class="sd--text__footnote">
          {{ footnote }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    metric: {
      type: String,
      default: undefined
    },
    caption: {
      type: String,
      default: undefined
    },
    footnote: {
      type: String,
      default: undefined
    },
    theme: {
      type: String,
      default: undefined
    }
  },
  setup (props) {
    const classes = computed(() => {
      const themeClass = `sd--widget__content--${props.theme}`
      return {
        [themeClass]: !!props.theme
      }
    })
    return {
      classes
    }
  }
})
</script>

<style lang="scss">
@use '../../scss/variables' as colors;

.sd--widget{
  flex-grow: 2;
  height: 100%;
  display:flex;
  flex-direction: column;
  &__content{
    padding: 16px;
    margin-bottom: 16px;
    flex-grow: 2;
    background-color: var(--background-accent);
    @each $state, $color in colors.$sd-color-global {
      &--#{$state} {
        background-color: var(--#{$state});
        color: var(--#{$state}-text);
        .sd--text__footnote, .sd--text__caption{
          color: var(--#{$state}-text);
        }
      }
    }
  }
  &__metric{
    font-size: 50px;
    flex-grow: 2;
    margin: 16px 0;
  }
}
</style>
