// WIP

<template>
  <div class="sd--widget">
    <div :class="['sd--widget__content', classes]">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name:'SdWidget',
  props: {
    metric: {
      type: String,
      default: undefined
    },
    theme: {
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
    clickable: {
      type: Boolean,
      default: true
    }
  },
  setup (props) {
    const classes = computed(() => {
      const themeClass = `sd--widget__content--${props.theme}`
      return {
        [themeClass]: !!props.theme,
        'is--clickable': props.clickable
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
    margin-bottom: 16px;
    flex-grow: 2;
    display: flex;
    flex-direction: column;
    background-color: var(--background-accent);
    @each $state, $color in colors.$sd-color-global {
      &--#{$state} {
        background-color: var(--#{$state});
        color: var(--#{$state}-text);
        .sd--text__footnote, .sd--text__caption{
          color: var(--#{$state}-text);
        }
        &.is {
          &--clickable {
            transition: background-color .23s ease-in-out;
            &:hover {
              cursor: pointer;
              background-color: var(--#{$state}-accent);
            }
          }
        }
      }
    }
    .is{
      &--clickable{
        &:hover{
          cursor: pointer;
          background-color: var(--background);
        }
      }
    }
  }
}
</style>
