<template>
  <!-- Should maybe rename this component... -->
  <div :class="['sd--fieldset', classes]">
    <div
      class="sd--fieldset__header"
      v-if="title"
    >
      <sd-label :inline="inlineLabel">
        <span>{{ title }}</span>
        <span v-if="tip">
          <sd-icon
            name="info"
            size="xs"
          />
          <sd-tooltip :placement="tipPlacement">{{ tip }}</sd-tooltip>
        </span>
      </sd-label>
    </div>
    <div :class="['sd--fieldset__content', childClasses]">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import SdTooltip from '../SdTooltip'
import SdIcon from '../SdIcon'
import SdLabel from './SdLabel.vue'
export default defineComponent({
  name: 'SdFieldset',
  components: { SdTooltip, SdIcon, SdLabel },
  props: {
    title: {
      type: String,
      default: ''
    },
    stack: Boolean,
    inlineLabel: Boolean,
    inline: Boolean,
    tip: {
      type: String,
      default: ''
    },
    tipPlacement: {
      type: String,
      default: 'top'
    }
  },
  setup (props) {
    const classes = computed(() => {
      return {
        'sd--fieldset--inline': props.inlineLabel,
        'sd--fieldset--stacked': props.stack,
        'sd--fieldset--inline-stacked': props.inlineLabel && props.stack
      }
    })
    const childClasses = computed(() => {
      return {
        'is--stacked': props.stack,
        'is--inline': props.inline
      }
    })
    return { classes, childClasses }
  }
})
</script>

<style lang="scss">
@import '../../scss/variables';
@import '../../scss/mixins';
@import '../../scss/breakpoints';

.sd--fieldset{
  padding: 0 0 16px 0;
  display:flex;
  flex-direction: column;
  align-items: flex-start;
  &:only-child{
    padding:0;
  }
  &--inline{
    align-items: flex-start;
    @include breakpoint-up('sm') {
      display:flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
    }
  }
  &--inline-stacked{
    align-items: flex-start;
  }
  &__header{
    display:flex;
    align-items: center;
  }
  &__legend{
    align-items: center;
    flex-wrap:none;
    display: flex;
    flex-shrink: 0;
  }
  &__icon{
    display: inline-flex;
    align-items: flex-end;
    justify-content: flex-end;
  }
  &__content{
    display:flex;
    flex-direction: row;
    align-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
    .sd--checkbox, .sd--switch{
      margin-left:0;
      margin-right: 0;
      width:100%;
    }
    .sd--switch:not(:last-child){
      border-bottom: 1px solid var(--divider)
    }
    .sd--radio{
      margin-bottom:0;
      width:100%;
    }
    .sd--button{
      margin: 0 4px;
    }
    &.is{
      &--stacked{
        flex-direction: column;
        width:100%;
        align-content: flex-start;
        .sd--button{
          margin: 4px;
        }
      }
      &--inline{
        flex-direction: row;
        width: auto;
        .sd--radio, .sd--button, .sd--checkbox{
          width: auto;
        }
      }
    }
  }
}
</style>
