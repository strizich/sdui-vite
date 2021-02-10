<template>
<div class="sd--nav__heading">
  <h4 class="sd--text__footnote"><slot/></h4>
</div>
</template>
<script>
export default {
  name: 'SdNavHeading'
}
</script>
<style lang="scss" scoped>
.sd--nav__heading{
  padding: 16px 16px 8px;
  .sd--text__footnote{
    margin: 0;
    padding:0;
    line-height: 1;
  }
}
</style>
