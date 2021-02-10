<template>
  <div class="sd--dropdown__header">
      <slot/>
  </div>
</template>
<script>
export default {
  name: 'SdDropdownHeader'
}
</script>

<style lang="scss">
  .sd--dropdown__header {
    font-size: 14px;
    letter-spacing: .5px;
    line-height: 1;
    display:flex;
    align-items: center;
    color: var(--text-accent);
    position:sticky;
    top:0;
    left:0;
    right:0;
    padding:8px 16px;;
    background-color: var(--background-accent);
    z-index: 1000;
}
</style>
