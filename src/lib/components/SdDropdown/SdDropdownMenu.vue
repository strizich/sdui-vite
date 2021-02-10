<template>
  <div class="sd--dropdown__menu">
    <sd-dropdown-header v-if="title">{{title}}</sd-dropdown-header>
    <slot/>
  </div>
</template>
<script>
import SdDropdownHeader from './SdDropdownHeader.vue'
export default {
  name: 'SdDropdownMenu',
  props: {
    title: String
  },
  components: { SdDropdownHeader }
}
</script>
<style lang="scss">
.sd--dropdown__menu {
  height:100%;
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 8px 8px;
  & > .sd--button{
    margin:0;
    text-align: left;
  }
  & > .sd--checkbox {
    margin-left:8px;
  }
  .sd--radio {
    margin:0
  }
}
</style>
