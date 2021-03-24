<template>
  <div class="sd--card__header">
    <div :class="['sd--card__header-group', classes]" v-if="title || subtitle">
      <h3 class="sd--text__header" v-if="title">{{ title }}</h3>
      <p class="sd--text__caption" v-if="subtitle">{{ subtitle }}</p>
    </div>
    <slot/>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed} from 'vue'

export default defineComponent({
  name: 'SdCardHeader',
  props: {
    title: String,
    subtitle: String,
    inline: Boolean
  },
  setup (props) {
    const classes = computed(() => {
      return {
        'is--inline': props.inline
      }
    })
    return {
     classes
    }
  }
})
</script>

<style lang="scss">
@import '../../scss/functions';
@import '../../scss/breakpoints';

.sd--card{
  &__header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    position:relative;
    border-radius: 3px 3px 0 0;
    padding: 8px 16px;
  }
  &__header-group {
    display:block;
    &:first-child{
      margin-right: 16px;
    }
    &:only-child{
      margin-right: 0;
    }
    .sd--text__header{
      flex-grow: 2;
    }
    @include breakpoint-up(sm) {
      &.is--inline {
        display:flex;
        width:100%;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}
</style>
