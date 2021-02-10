<template>
  <div class="sd--card__body">
    <slot/>
  </div>
</template>

<script>

export default {
  name: 'SdCardBody'
}
</script>

<style lang="scss">
.sd--card {
  &__body{
    padding: 16px;
    flex-grow: 2;
  }
}
</style>
