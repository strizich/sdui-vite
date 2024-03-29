<template>
  <a
    :href="href"
    :class="[linkClasses]"
  >
    <sd-icon
      :name="icon"
      v-if="icon"
    />
    <span class="sd--nav__content">
      <slot />
    </span>
  </a>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import SdIcon from '../SdIcon/SdIcon.vue'
export default defineComponent({
  name: 'SdNavContent',
  components: { SdIcon },
  props: {
    href: {
      type: String,
      default: ''
    },
    active: Boolean,
    exactActive: Boolean,
    secondary: Boolean,
    icon: {
      type: String,
      default: ''
    },
    dark: {
      type: Boolean,
      default: false
    },
    light: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const linkClasses = computed(() => {
      return {
        'sd--nav__item': true,
        'is--secondary': props.secondary,
        'is--active': props.active,
        'is--exact-active': props.exactActive
      }
    })
    return {
      linkClasses
    }
  }
})
</script>

<style lang="scss">
  @import '../../scss/mixins';
  @import '../../scss/breakpoints';
  .sd--layout__sidebar {
    &--dark{
    .sd--nav__item {
        --text: var(--sd-text-light);
        --background: var(--sd-background-dark);
        --background-highlight: var(--sd-background-dark-highlight);
        --background-accent: var(--sd-background-dark-accent);
      }
    }
    &--light{
      .sd--nav__item {
        --text: var(--sd-text-dark);
      }
    }
    &--auto{
      .sd--nav__item {
        color: var(--sd-text);
      }
    }
  }
  .sd--nav{
    &__item {
    font-weight: 400;
    letter-spacing: 1.5;
    transition: box-shadow .23s ease-in-out, background-color .23s ease-in-out;
    position: relative;
    font-size: 14px;
    color: var(--sd-text);
    &:focus{
      background-color: var(--sd-background);
      outline:none;
    }
    @include breakpoint-down('sm') {
      font-size: 16px;
    }
      .sd--icon{
        margin-right: 4px;
      }
      &:after{
        transition: all .23s ease-in-out;
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 100%;
        right: 0;
        background-color: var(--sd-background);
        z-index: -1;
        opacity: 0;
      }
      &:hover{
        background-color: var(--sd-background-highlight);
      }
      &.is--active, &.is--exact-active {
        color: var(--sd-text);
        box-shadow: inset 4px 0 0 var(--sd-primary);
        background-color: var(--sd-background-accent);
      }
      &.is--secondary{
        font-size: 12px;
        padding-left: 20px;
        @include breakpoint-down('sm') {
          font-size: 14px;
        }
        &.is--active, &.is--exact-active {
          background-color: var(--sd-background-accent);
        }
        &:hover{
          background-color: rgba(0,0,0, .1);
        }
      }
    }
  }
</style>
