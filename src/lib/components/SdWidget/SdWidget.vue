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
    clickable: Boolean
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
@use '../SdElevation/mixins' as *;

.sd--widget{
  flex-grow: 2;
  display:flex;
  flex-direction: column;
  height:100%;
  &__content{
    margin-bottom: 16px;
    flex-grow: 2;
    display: flex;
    flex-direction: column;
    background-color: var(--background-accent);
    border: 1px solid var(--background-accent);
    border-radius: 6px;
    &.is{
      &--clickable {
        @include elevation(6);
        transition: 
          border .23s ease-in-out,
          background-color .23s ease-in-out,
          box-shadow .23s ease-in-out;
        &:hover {
          cursor: pointer;
          border:1px solid var(--primary);
          background-color: var(--background);
          @include elevation(1);
          .sd--widget-footer{
            &:before{
              transition: background-color .23s ease-in-out;
              background-color: var(--primary);
            }
          }
        }
      }
    }
    @each $state, $color in colors.$sd-color-global {
      &--#{$state} {
        background-color: var(--#{$state});
        border: 1px solid var(--#{$state});
        color: var(--#{$state}-text);

        .sd--text__footnote, .sd--text__caption{
          color: var(--#{$state}-text);
        }

        &.is {
          &--clickable {
            transition: 
              border .23s ease-in-out,
              background-color .23s ease-in-out,
              box-shadow .23s ease-in-out;
            &:hover {
              cursor: pointer;
              background-color: var(--#{$state}-accent);
              .sd--widget-footer{
                &:before{
                  background-color: var(--#{$state});
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
