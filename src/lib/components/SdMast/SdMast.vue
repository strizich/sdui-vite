<template>
  <div class="sd--mast">
    <div class="sd--mast__content">
      <p class="sd--text__caption">{{subtitle}}</p>
      <h1 class="sd--text__headline">{{title}}</h1>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SdMast',
  props: {
    alignment: String,
    title: String,
    subtitle: String
  }
}
</script>

<style lang="scss" scoped>
  $header-height: 50px;
  $mast-height: calc(100vh - 140px);

  .sd--mast{
    margin: 0 0 32px 0;
    min-height: $mast-height;
    background: sd-gradient(v(--background), v(--background-accent));
    position: relative;
    display:flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 env(safe-area-inset-left) 0 env(safe-area-inset-right);
    &__content{
      width: 100%;
      margin: 0 auto;
      padding: 0 32px 32px;
    }
  }
</style>
