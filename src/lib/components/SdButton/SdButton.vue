<script lang="ts">
import { defineComponent, computed, ref, h, Ref, resolveComponent } from 'vue'
import useKeyboardFocus from '../../hooks/useKeyboardFocus'
import sdUuid from '../../core/utilities/SdUuid'
import SdIcon from '../SdIcon/SdIcon.vue'
export default defineComponent({
  name: 'SdButton',
  components: { SdIcon },
  props: {
    /**
     * ID of the button.
     */
    id: {
      type: String,
      default: () => 'sd--button--' + sdUuid()
    },
    /**
     * Sets the component to `display:block` and fill its avaiable horizontal space.
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
     * Rounded corners, less padding. Use `rounded` with `iconOnly` to remove excess padding.
    */
    rounded: {
      type: Boolean,
      default: false
    },
    /**
     * Sets the component to `display:block` and fill its avaiable horizontal space.
    */
    block: Boolean,
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
     * Use when there is no other content in the button other than an icon.
    */
    iconOnly: Boolean,
    /**
     *  Allows the button to link to external urls. Changes the root node to `a`
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
    exactActive: Boolean
  },
  setup (props, { slots }) {
    const root = ref(null)
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
        'is--focused': hasFocus.value,
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
    }) as Ref<string>

    return () =>
      h(
        elementTag.value,
        {
          ref: root,
          id: props.id,
          type: !props.href ? props.type : 'button',
          class: ['sd--button', themeClass.value, rootClasses.value, sizeClass.value],
          href: props.href,
          disabled: props.disabled,
          style: alignmentStyle.value
        },
        [
          props.icon && h(SdIcon, {
            name: props.icon,
            size: props.size
          }),
          !props.iconOnly ? h('div',
            {
              class: 'sd--button__content'
            },
            slots
          ) : slots.default(),
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
@import '../../scss/variables';
@import '../../scss/mixins';
@import '../../scss/functions';
@import '../SdElevation/mixins';

%button-content{
  position: relative;
  z-index: 10;
  line-height: 1;
  transition: font-size .23s;
  padding-top:8px;
  padding-bottom:8px;
  display:flex;
  align-items: center;
  max-height: 64px;
}
%icons{
  width: 32px;
  position: relative;
  & + .sd--button__content {
    padding-left: 0px;
  }
  &:only-child {
    margin-left:0!important;
  }
}

.sd--button {
  touch-action: manipulation;
  user-select:none;
  -webkit-user-select: none;
  border: none;
  border-radius: 3px;
  font-weight: 500;
  letter-spacing: .5px;
  display: inline-flex;
  align-self: center;
  align-items: center;
  padding: 0;
  vertical-align: middle;
  margin-right: 8px;
  &:last-child {
    margin-right: 0;
  }
  &--xs {
    .sd--button__content{
      @extend %button-content;
      padding: spacing(offset, xs);

    }
    .sd--icon{
      @extend %icons;
      line-height: 20px;

    }
    font-size: rem(11);
    min-height: 20px;
  }

  &--sm {
    font-size: rem(14);
    min-height: 26px;
    .sd--button__content{
      line-height: spacing(inset, sm) * 2;
      @extend %button-content;
      padding: spacing(offset, sm);
    }
    &.is--icon-only{
      .sd--icon{
        width: 26px;
        line-height: spacing(inset, sm) * 2;
      }
    }
  }

  &--md {
    font-size: rem(16);
    min-height: 32px;
    .sd--button__content {
      @extend %button-content;
      padding: spacing(offset, md);
    }
    &.is--icon-only{
      .sd--icon {
        width: 32px;
      }
    }
  }

  &--lg {
    font-size: rem(18);
    min-height: 50px;
    .sd--button__content {
      @extend %button-content;
      padding: spacing(offset, lg);
    }
    &.is--icon-only {
      .sd--icon {
        width: 50px;
      }
    }
  }

  &--xl {
    font-size: rem(24);
    min-height: 64px;
    .sd--button__content {
      @extend %button-content;
      padding: spacing(offset, xl);
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

  @each $state, $color in $sd-color-global {
    &__#{$state} {
      @include elevation(2);
      color: var(--#{$state}-text);
      background-color: var(--#{$state});
      transition: all .13s ease-out;
      border-radius: 3px;
      svg{
        fill: var(--#{$state}-text)
      }

      &:hover {
        @include elevation(4);
        color: var(--#{$state}-accent-text);
        background-color: var(--#{$state}-accent);
        transition: all .13s ease-out;
        svg {
          fill: var(--#{$state}-accent-text)
        }
      }

      &:active {
        @include elevation(6);
        color: var(--#{$state}-highlight-text);
        background-color: var(--#{$state}-highlight);
        transition: all .13s ease-out;
      }

      &.is--active, &.is--exact-active {
        @include elevation(6);
        color: var(--#{$state}-highlight-text);
        background-color: var(--#{$state}-highlight);
        transition: all .13s ease-out;
      }

      &.is--disabled {
        background-color: var(--disabled-background);
        color: var(--disabled);
        @include elevation(0);
      }

      &.is--outline {
        background: none;
        position: relative;
        &:after{
          content: '';
          display: block;
          position: absolute; 
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 1px solid var(--#{$state});
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
        box-shadow: 0 0 0 5px var(--#{$state}-highlight);
        transition: box-shadow .2s ease-out;
      }
    }

    &.is--pill {
      border-radius: 30px;
      .sd--button__content:only-child{
        padding-left: 20px;
        padding-right: 20px;
      }
    }
  }

  // Handle Icons
  .sd--icon {
    width: 32px;
    position: relative;
    & + .sd--button__content {
      padding-left: 0px;
    }
    &:only-child {
      margin-left:0!important;
    }
    &.is {
      &--xs {
        width: 20px;
        &:last-child {
          margin-left: spacing(inset, xs) * -1;
        }
      }
      &--sm {
        width: 30px;
        &:last-child {
          margin-left: spacing(inset, sm) * -1;
        }
      }
      &--md {
        width: 32px;
        &:last-child {
          margin-left: spacing(inset, md) * -1;
        }
      }
      &--lg {
        min-width: 42px;
        &:last-child {
          margin-left: spacing(inset, md) * -1;
        }
      }
      &--xl {
        min-width: 56px;
         &:last-child {
          margin-left: spacing(inset, lg) * -1;
        }
      }
    }
  }
}
</style>
