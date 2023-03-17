<template>
  <teleport
    ref="targetRef"
    :to="portalDisabled ? null : portalTo"
    :disabled="portalDisabled"
  >
    <transition name="tooltip">
      <div
        ref="instanceRef"
        class="sd--tooltip"
        v-if="shouldRender"
      >
        <div :class="['sd--tooltip__content', themeClass]">
          <div>
            <slot />
          </div>
          <div
            v-if="showArrow"
            :class="['sd--tooltip__arrow', themeClass]"
            data-popper-arrow
          />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
// FUTURE: Split popper.js logic into a composable
import { computed, PropType, defineComponent, ref } from 'vue';
import { Placement } from '@popperjs/core';
import usePopper from '../../hooks/usePopper';

export default defineComponent({
  name: 'SdTooltip',
  emits: ['update:modelValue', 'opened', 'closed'],
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: ''
    },
    // FUTURE: Update options obj with editable settings.
    delay: {
      type: [String, Number],
      default: 100
    },
    placement: {
      type: String as PropType<Placement>,
      default: 'top'
    },
    autoOpen: {
      type: Boolean,
      default: true
    },
    offset: {
      type: Array as PropType<number[]>,
      default: () => [0, 8]
    },
    showArrow: Boolean,
    portalTo: {
      type: String,
      default: '#app'
    },
    focusable: {
      type: Boolean,
      default: true
    },
    portalDisabled: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { emit }) {
    const themeClass = computed(() => `is--${props.theme}`);
    const activate = ref(props.modelValue);

    const { shouldRender, targetRef, instanceRef } = usePopper(
      props,
      emit,
      activate
    );

    return {
      targetRef,
      instanceRef,
      themeClass,
      shouldRender
    };
  }
});
</script>

<style lang="scss">
@import '../SdElevation/mixins';
@import '../../scss/variables';
.sd--tooltip {
  // position:fixed;
  position: relative;
  min-height: 32px;
  transition: opacity 0.5s;
  z-index: 500;
  user-select: none;
  pointer-events: none;
  &__content {
    max-width: 300px;
    min-height: 24px;
    padding: 8px;
    z-index: 111;
    pointer-events: none;
    border-radius: 2px;
    font-size: 14px;
    text-transform: none;
    white-space: wrap;
    opacity: 1;
    background-color: var(--sd-background-highlight);
    color: var(--sd-text);
    font-weight: 500;
    min-width: 40px;
    @include elevation(4);
    @each $key in $sd-themes{
      &.is--#{$key} {
        background-color: var(--sd-#{$key}-highlight);
        color: var(--sd-#{$key}-highlight-text);
      }
    }
  }
  &__arrow {
    &:before {
      background-color: var(--sd-background-highlight);
    }
      @each $key in $sd-themes {
      &.is--#{$key} {
        &:before {
          background-color: var(--sd-#{$key}-highlight);
        }
      }
    }
    &,
    &:before {
      position: absolute;
      width: 8px;
      height: 8px;
      z-index: 1;
    }
    &:before {
      content: '';
      transform: rotate(45deg);
    }
  }
  // FUTURE: Make this into a mixin for reuse
  &[data-popper-placement^='top'] .sd--tooltip__arrow {
    bottom: -4px;
  }
  &[data-popper-placement^='bottom'] .sd--tooltip__arrow {
    top: -4px;
  }
  &[data-popper-placement^='left'] .sd--tooltip__arrow {
    right: -4px;
  }
  &[data-popper-placement^='right'] .sd--tooltip__arrow {
    left: -4px;
  }
}
// FUTURE: Make this into a mixin for reuse
.tooltip-enter-active,
.tooltip-leave-active {
  .sd--tooltip__content {
    transition: opacity 0.2s 0.1s, transform 0.3s ease-in-out;
  }
}
.tooltip-enter-to {
  .sd--tooltip__content {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
.tooltip-enter-from {
  .sd--tooltip__content {
    opacity: 0;
    transform: translate3d(0, 4px, 0);
  }
}
.tooltip-leave-to {
  .sd--tooltip__content {
    opacity: 0;
    transform: translate3d(0, -4px, 0);
  }
}
</style>
