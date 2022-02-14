<script lang="ts">
import { defineComponent, computed, ref, h, Ref } from 'vue'
import useKeyboardFocus from '../../hooks/useKeyboardFocus'
import sdUuid from '../../core/utilities/SdUuid'
import SdIcon from '../SdIcon/SdIcon.vue'

export default defineComponent({
  name: 'SdButton',
  components: { SdIcon },
  props: {
    /**
     * ID of the butto  n.
     */
    id: {
      type: String,
      default: () => 'sd--button--' + sdUuid()
    },
    /**
     * Changes the padding and font size of the button.
     * @values xs, sm, md, lg, xl
    */
    size: {
      type: String,
      default: 'md',
      validator: (value: string) => ['xs', 'sm', 'md', 'lg', 'xl'].indexOf(value) !== -1
    },
    /**
     * Controls the color theme
     * @values primary, secondary, default, warning, danger, success, dark
    */
    theme: {
      type: String,
      default: 'primary'
    },
    /**
     * Use the flattened layout
    */
    flat: {
      type: Boolean,
      default: false
    },
    /**
     * Use the outline layout
    */
    outline: {
      type: Boolean,
      default: false
    },
    /**
     * Rounded corners
    */
    pill: {
      type: Boolean,
      default: false
    },
    /**
     * @deprecated
     * Rounded corners, less padding. Use `rounded` with `iconOnly` to remove excess padding.
    */

    rounded: {
      type: Boolean,
      default: false
    },
    /**
     * Sets the component to `display:block` and fill its avaiable horizontal space.
    */
    block: {
      type: Boolean,
      default: false
    },
    /**
     * Only works with `block`. Aligns the button content.
     * @values start, end, center
    */
    align:  {
      type: String,
      default: undefined
    },
    /**
     * Disables the button
    */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Sets an icon in the button
    */
    icon: {
      type: String,
      default: undefined
    },
    /**
     * Sets the icon at the end of the button.
    */
    iconEnd:  {
      type: String,
      default: undefined
    },
    /**
     * Hides the content node. Only Use when there is no other content in the button other than an icon.
    */
    iconOnly: {
      type: Boolean,
      default: false
    },
    /**
     *  Changed the text casing of the button
     * @values uppercase, captialize, lowercase
    */
    casing: {
      type: String,
      default: undefined
    },
    /**
     * Type of button. Changes the root elements to a `button` or `a` depending on context.
     * @values button, link
    */
    type: {
      type: String,
      default: 'button'
    },
    /**
     *  Allows the button to link to external urls. Changes the root node to `a`
    */
    href: {
      type: String,
      default: undefined
    },
    /**
     *  Use by the SdRouterLink component
     * @ignore
    */
    active: Boolean,
    /**
     * Used by the SdRouterLink component
     * @ignore
    */
    exactActive: Boolean,
    class: {
      type: [String, Array],
      default: ''
    },
    focusable: {
      type: Boolean,
      default: true
    }
  },
  setup (props, { slots, attrs }) {
    const root = ref(null)
    const hasSlots = name => !!slots[name]
    const hasFocus = useKeyboardFocus(root)

    const rootClasses = computed(() => {
      return {
        'is--disabled': props.disabled,
        'is--pill': props.pill || props.rounded,
        'is--flat': props.flat,
        'is--outline': props.outline,
        'is--icon-only': props.iconOnly,
        'is--block': props.block,
        // useKeyboardEvent Hook
        'is--focused': hasFocus.value && props.focusable,
        // Props related to RouterLink
        'is--active': props.active,
        'is--exact-active': props.exactActive
      }
    })

    const alignmentStyle = computed(() => {
      return {
        'justify-content': props.align,
        'text-transform': props.casing
      }
    })

    const sizeClass = computed(() => {
      return `sd--button--${props.size}`
    })

    const themeClass = computed(() => {
      return `sd--button__${props.theme}`
    })

    // FUTURE: Add RouterLink variation to button and depricate SdRouterLink
    const elementTag = computed(() => {
      const element = props.href || props.type === 'link' ? 'a' : 'button'
      return element
    }) as Ref<any>

    return () =>
      h(
        elementTag.value,
        {
          ref: root,
          id: props.id,
          type: !props.href ? props.type : null,
          class: ['sd--button', themeClass.value, rootClasses.value, sizeClass.value, props.class],
          href: props.href,
          disabled: props.disabled,
          style: alignmentStyle.value,
          ...attrs
        },
        [
          props.icon && h(SdIcon, {
            name: props.icon,
            size: props.size
          }),

          (!props.iconOnly && hasSlots('default')) && h('div', {
              class: 'sd--button__content'
            }, slots),

          (props.iconOnly && hasSlots('default')) && h(slots['default']),

          props.iconEnd && h(SdIcon, {
            name: props.iconEnd,
            size: props.size
          })
        ]
      )
  }
})
</script>

<style lang="scss">
@use "sass:math";
@import "../../scss/variables";
@import "../../scss/mixins";
@import "../../scss/functions";
@import "../SdElevation/mixins";

$states: ('primary', 'secondary', 'default', 'warning', 'danger', 'success', 'light', 'dark');

%button-content {
  position: relative;
  z-index: 10;
  line-height: 1;
  transition: font-size 0.13s;
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
  align-items: center;
  max-height: 64px;
}

.sd--button {
  touch-action: manipulation;
  --webkit-appearance: none;
  user-select: none;
  -webkit-user-select: none;
  border: none;
  border-radius: var(--btn-border-radius);
  font-weight: 500;
  letter-spacing: 0.5px;
  display: inline-flex;
  align-self: center;
  align-items: center;
  padding: 0;
  vertical-align: middle;
  margin: var(--btn-margin);
  text-transform: var(--btn-casing);
  &:last-child {
    margin-right: 0;
  }
  &--xs {
    font-size: var(--btn-font-size-xs);
    min-height: var(--btn-height-xs);
    .sd--button__content {
      padding: var(--btn-padding-xs);
      width: var(--btn-height-xs);
    }
  }

  &--sm {
    font-size: var(--btn-font-size-sm);
    min-height: var(--btn-height-sm);
    .sd--button__content {
      line-height: calc(var(--btn-padding-sm) * 2);
      padding: var(--spacing-2);
    }
  }

  &--md {
    font-size: var(--btn-font-size-md);
    min-height: var(--btn-height-md);
      .sd--button__content {
        padding: var(--btn-padding-md);
      }
    &.is--icon-only {
      min-width: var(--btn-height-md);
    }
  }

  &--lg {
    font-size: var(--btn-font-size-lg);
    min-height: var(--btn-height-lg);

    .sd--button__content {
      @extend %button-content;
      padding: var(--btn-padding-lg);
    }
    &.is--icon-only {
      .sd--icon {
        min-width: var(--btn-height-lg);
      }
    }
  }

  &--xl {
    font-size: var(--btn-font-size-xl);
    padding: var(--btn-padding-xl);
    .sd--button__content {
      @extend %button-content;
      padding: var(--btn-padding-xl);
    }
    &.is--icon-only {
      .sd--icon {
        width: 64px;
      }
    }
  }

  &.is--block {
    display: flex;
    width: 100%;
    justify-content: center;
    & + & {
      margin: 0;
    }
  }

  &:focus {
    outline: none;
  }

  &__content {
    @extend %button-content;
  }

  @each $state in $sd-themes{
    &__#{$state} {
      @if $use-button-elevation {
        box-shadow: var(--btn-elevation-2)
      }
      color: var(--#{$state}-text);
      background-color: var(--#{$state});
      transition: all 0.13s ease-out;
      border-radius: var(--btn-border-radius);
      svg {
        fill: var(--#{$state}-text);
      }

      &:hover {
        @if $use-button-elevation {
          box-shadow: var(--btn-elevation-4)
        }
        color: var(--#{$state}-accent-text);
        background-color: var(--#{$state}-accent);
        transition: all 0.13s ease-out;
        svg {
          fill: var(--#{$state}-accent-text);
        }
      }

      &.is--disabled {
        background-color: var(--disabled-background);
        color: var(--disabled);
        @include elevation(0);
      }

      &.is--outline {
        background: none;
        position: relative;
        &.is--pill,
        &.is--rounded {
          &:after {
            border-radius: 30px;
          }
        }
        &:after {
          content: "";
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 1px solid var(--#{$state});
          border-radius: var(--btn-border-radius);
        }
        @include flatten-theme($state);

        &.is--disabled {
          border: 1px solid var(--disabled);
          @include flatten-theme(disabled);
        }
      }

      &.is--flat {
        background: none;
        border: none;
        outline: none;
        @include flatten-theme($state);

        &.is--disabled {
          @include flatten-theme(disabled);
        }
      }

      &.is--focused {
        box-shadow: 0 0 0 4px var(--#{$state}-highlight);
        transition: box-shadow 0.13s ease-out;
        z-index: 11;
      }

      &:active,
      &.is--active,
      &.is--exact-active {
        @if $use-button-elevation {
          box-shadow: var(--btn-elevation-6)
        }
        color: var(--#{$state}-highlight-text);
        background-color: var(--#{$state}-highlight);
        transition: all 0.13s ease-out;
      }
    }
  }

  &.is--pill {
    border-radius: 30px;
    .sd--button__content:only-child {
      padding-left: 20px;
      padding-right: 20px;
    }
  }

  &__icon-only {
    display: flex;
    width: 100%;
  }

  // Handle Icons
  .sd--icon {
    width: 32px;
    position: relative;
    & + .sd--button__content {
      padding-left: 0px;
    }
    &:only-child {
      margin-left: 0 !important;
    }
    &.is {
      &--xs {
        font-size: var(--btn-font-size-xs);
        width: var(--btn-height-xs);
        &:last-child {
          margin-left: calc(var(--spacing-1) * -1);
        }
      }
      &--sm {
        width: var(--btn-height-sm);
        font-size: var(--btn-font-size-sm);
        &:last-child {
          margin-left: calc(var(--spacing-2) * -1);
        }
      }
      &--md {
        font-size: var(--btn-font-size-md);
        width: var(--btn-height-md);
        &:last-child {
          margin-left: calc(var(--spacing-3) * -1);
        }
      }
      &--lg {
        font-size: var(--btn-font-size-lg);
        width: var(--btn-height-lg);
        &:last-child {
          margin-left: calc(var(--spacing-3) * -1);
        }
      }
      &--xl {
        font-size: var(--btn-font-size-xl);
        width: var(--btn-height-xl);
        &:last-child {
          margin-left: calc(var(--spacing-3) * -1);
        }
      }
    }
  }
}
</style>
