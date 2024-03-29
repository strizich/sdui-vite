<template>
  <div class="sd--widget">
    <div :class="['sd--widget__content', classes]">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'SdWidget',
  props: {
    metric: {
      type: String,
      default: undefined,
    },
    theme: {
      type: String,
      default: undefined,
    },
    caption: {
      type: String,
      default: undefined,
    },
    footnote: {
      type: String,
      default: undefined,
    },
    clickable: Boolean,
  },
  setup(props) {
    const classes = computed(() => {
      const themeClass = `sd--widget__content--${props.theme}`;
      return {
        [themeClass]: !!props.theme,
        'is--clickable': props.clickable,
      };
    });
    return {
      classes,
    };
  },
});
</script>

<style lang="scss">
@use '../../scss/variables' as colors;
@use '../SdElevation/mixins' as *;

.sd--widget {
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
  &__content {
    margin-bottom: 16px;
    flex-grow: 2;
    display: flex;
    flex-direction: column;
    background-color: var(--sd-background-accent);
    border: 1px solid var(--sd-background-accent);
    border-radius: 6px;
    &.is {
      &--clickable {
        @include elevation(6);
        transition: border 0.23s ease-in-out, background-color 0.23s ease-in-out,
          box-shadow 0.23s ease-in-out;
        &:hover {
          cursor: pointer;
          border: 1px solid var(--sd-primary);
          background-color: var(--sd-background);
          @include elevation(1);
          .sd--widget-footer {
            &:before {
              transition: background-color 0.23s ease-in-out;
              background-color: var(--sd-primary);
            }
          }
        }
      }
    }
    @each $state in colors.$sd-themes {
      &--#{$state} {
        background-color: var(--sd-#{$state});
        border: 1px solid var(--sd-#{$state});
        color: var(--sd-#{$state}-text);

        .sd--text__footnote,
        .sd--text__caption {
          color: var(--sd-#{$state}-text);
        }

        &.is {
          &--clickable {
            transition: border 0.23s ease-in-out,
              background-color 0.23s ease-in-out, box-shadow 0.23s ease-in-out;
            &:hover {
              cursor: pointer;
              background-color: var(--sd-#{$state}-accent);
              .sd--widget-footer {
                &:before {
                  background-color: var(--sd-#{$state});
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
