<template>
  <a :href="href" :class="[linkClasses]" >
    <sd-icon :name="icon" v-if="icon"/>
    <span class="sd--nav__content">
      <slot />
    </span>
  </a>
</template>

<script>
import { computed, defineComponent } from 'vue'
import SdIcon from '../SdIcon/SdIcon.vue'
export default defineComponent({
  name: 'SdNavContent',
  components: { SdIcon },
  props: {
    href: String,
    active: Boolean,
    exactActive: Boolean,
    secondary: Boolean,
    icon: String
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

<style lang="scss" scoped>
  @import '../../scss/mixins';
  @import '../../scss/breakpoints';

  .sd--nav{
    &__item {
    color: var(--text);
    font-weight: 400;
    letter-spacing: 1.5;
    transition: box-shadow .23s ease-in-out, background-color .23s ease-in-out;
    position: relative;
    font-size: 14px;
    &:focus{
      background-color: var(--background);
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
        background-color: var(--background);
        z-index: -1;
        opacity: 0;
      }
      &:hover{
        background-color: rgba(0,0,0, .1);
      }
      &.is--active, &.is--exact-active {
        color: var(--text);
        box-shadow: inset 4px 0 0 var(--primary);
        background-color: var(--background-accent);
      }
      &.is--secondary{
        font-size: 12px;
        padding-left: 20px;
        @include breakpoint-down('sm') {
          font-size: 14px;
        }
        &.is--active, &.is--exact-active {
          background-color: var(--background-accent);
        }
        &:hover{
          background-color: rgba(0,0,0, .1);
        }
      }
    }
  }
</style>
