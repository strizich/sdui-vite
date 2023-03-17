<template>
  <div :class="['sd--chicklet', classes]">
    <sd-icon
      v-if="icon"
      :name="icon"
      size="sm"
    />
    <span class="sd--chicklet__content">
      <slot />
    </span>
    <sd-icon
      v-if="dismissable"
      name="close"
      size="sm"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { SdIcon } from '../..'
export default defineComponent({
  name: 'SdChicklet',
  components: { SdIcon },
  props: {
    icon: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String, 
      default: 'md'
    },
    dismissable: Boolean
  },
  setup (props) {
    const classes = computed(() => {
      return {
        [`sd--chicklet__${props.theme}`]: true,
        [`is--${props.size}`]: props.size,
        'is--dismissable': props.dismissable
      }
    })
    return {
      classes
    }
  }
})
</script>

<style lang="scss">
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
  @each $state in $sd-themes {
    &__#{$state} {
      @include elevation(2);
      color: var(--sd-#{$state}-text);
      background-color: var(--sd-#{$state});
      transition: all .13s ease-out;
      border-radius: 2px;
      &.is--dismissable{
        &:hover{
          background-color: var(--sd-#{$state}-accent);
          color: var(--sd-#{$state}-accent-text);
        }
      }
    }
  }
  &__content:not(:only-child){
    margin-right: 4px;
  }
}
</style>
