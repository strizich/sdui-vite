<template>
  <div :class="['sd--chicklet', classes]">
    <sd-icon v-if="icon" :name="icon" size="sm"/>
    <span class="sd--chicklet__content">
      <slot/>
    </span>
    <sd-icon v-if="dismissable" name="close" size="sm"/>
  </div>
</template>

<script>
import { SdIcon } from '../..'
import { computed } from 'vue'
export default {
  name: 'SdChicklet',
  components: { SdIcon },
  props: {
    icon: String,
    theme: {
      type: String,
      default: 'primary'
    },
    sm: Boolean,
    xs: Boolean,
    md: {
      type: Boolean,
      default: true
    },
    lg: Boolean,
    dismissable: Boolean
  },
  setup (props) {
    const classes = computed(() => {
      return {
        [`sd--chicklet__${props.theme}`]: true,
        'is--dismissable': props.dismissable,
        'is--xs': props.xs,
        'is--sm': props.sm,
        'is--md': props.md,
        'is--lg': props.lg
      }
    })
    return {
      classes
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../SdElevation/mixins';
@import '../../scss/variables';

.sd--chicklet {
  display:inline-flex;
  align-items: center;
  transition: background-color .23s ease-in-out;
  vertical-align: top;
  margin: 4px 0 4px 4px;
  vertical-align: middle;
  .sd--icon:first-child{
    margin-right: 4px;
  }
  &.is{
    &--dismissable{
      cursor: pointer;
      text-align: inherit;
    }
    &--xs{
      font-size: 10px;
      padding: 2px;
      margin: 0 auto;
    }
    &--sm{
      font-size: 12px;
      padding:2px;
    }
    &--md{
      padding: 4px;
      font-size: 14px;
    }
    &--lg{
      padding: 4px;
      font-size: 16px;
    }
  }
  @each $state, $color in $sd-color-global {
    &__#{$state} {
      @include elevation(2);
      color: var(--#{$state}-text);
      background-color: var(--#{$state});
      transition: all .13s ease-out;
      border-radius: 2px;
      &.is--dismissable{
        &:hover{
          background-color: var(--#{$state}-accent);
          color: var(--#{$state}-accent-text);
        }
      }
    }
  }
  &__content:not(:only-child){
    margin-right: 4px;
  }
}
</style>
