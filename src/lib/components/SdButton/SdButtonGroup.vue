<template>
  <div :class="['sd--button-group', classes]">
    <label v-if="label">{{label}}</label>
    <slot />
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'

export default {
  name: 'SdButtonGroup',
  props: {
    label: {
      type: String,
      default: undefined
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const classes = computed(() => {
      return {
        'is--vertical': props.vertical
      }
    })
    return {
      classes
    }
  }
}
</script>

<style lang="scss">
@import '../SdElevation/mixins';

.sd--button-group {
  display: flex;
  border-radius: 3px;
  @include elevation(2);

  .sd--button {
    margin-left: 0;
    margin-right:0;
    border-radius: 0;
    @include elevation(0);
    &:only-child{
      border-radius: 3px;
    }

    &:first-child:not(:only-child){
      border-radius: 3px 0 0 3px;
    }

    &:last-child:not(:only-child){
      border-radius: 0 3px 3px 0;
    }
  }
  &.is--vertical{
    flex-direction: column;
    .sd--button {
      width: 100%;
      margin-left: 0;
      margin-right:0;
      border-radius: 0;
      @include elevation(0);
      &:only-child{
        border-radius: 3px;
      }

      &:first-child:not(:only-child){
        border-radius: 3px 3px 0 0;
      }

      &:last-child:not(:only-child){
        border-radius: 0 0 3px 3px;
      }
    }
  }
}
</style>