<template>
  <ul class="sd--list">
    <slot/>
  </ul>
</template>

<script>
export default {
  name: 'SdList',
  setup (props) {

  }
}
</script>

<style lang="scss" scoped>
  .sd--list{
    list-style-type: none;
    padding: 0;
    font-size: 16px;
    margin:0;
    // If the element is also its own child
    &__item & {
      margin-top: 8px;
      padding-bottom:0;
      padding-left: 32px;
      font-size: 14px;
      margin-left: -16px;
      border-bottom:none;
      &:last-child{
        margin-bottom: -8px;
      }
    }
    & + &{
      margin-top: 16px;
    }
  }
</style>
