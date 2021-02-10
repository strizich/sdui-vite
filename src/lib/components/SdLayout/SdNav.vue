<template>
  <div class="sd--nav">
    <sd-nav-heading v-if="title">{{title}}</sd-nav-heading>
    <slot />
  </div>
</template>

<script>
import SdNavHeading from './SdNavHeading.vue'

export default {
  name: 'SdNav',
  props: {
    title: String
  },
  components: { SdNavHeading },
  setup () {
    return {

    }
  }
}
</script>

<style lang="scss">

  .sd--nav{
    list-style-type: none;
    margin: 16px 0 16px;
    padding: 0;
    &__list-item {
      margin:0;
      padding:0;
    }
    &__item{
      display:block;
      padding: 8px;
      display:flex;
      align-items: center;
      & > span {
        margin-left: 8px;
      }
      // &--active{
      // Things go here for active state.
      // }
      &--exact-active{
        color: #fff;
        background-color: var(--primary)
      }
    }
  }
</style>
