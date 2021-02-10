<template>
  <div class="sd--card__header">
    <h3 class="sd--card__title" v-if="title">{{title}}</h3>
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'SdCardHeader',
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style lang="scss">
.sd--card{
  &__header{
    display: flex;
    padding: 8px 16px;
    justify-content: space-between;
    align-items: center;
    font-weight: 400;
    position:relative;
    color: var(--text-accent);
    border-radius: 3px 3px 0 0;
    // &:after{
    //   content: '';
    //   position: absolute;
    //   left: spacing(inset);
    //   right: 0;
    //   bottom: 0;
    //   height: 1px;
    //   background-color: v(--divider);
    // }
  }
  &__title{
    font-size: rem(18);
    margin: 0;
  }
}
</style>
