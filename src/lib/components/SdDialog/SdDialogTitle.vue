<template>
  <div class="sd--dialog__header">
      <div class="sd--dialog__content" v-if="title || subtitle">
        <h3 class="sd--dialog__title" v-if="title">{{title}}</h3>
        <p class="sd--dialog__subtitle" v-if="subtitle">{{subtitle}}</p>
      </div>
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'SdDialogTitle',
  props: {
    title: String,
    subtitle: String
  }
}
</script>

<style lang="scss" scoped>
  .sd--dialog{
    &__header{
      display:flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      background-color: var(--background);
      border-radius: 3px 3px 0 0;
      flex-shrink: 0;
      border-bottom: 1px solid v(--divider);
    }
    &__title {
      font-size: 20px;
      line-height: 24px;
      margin: 0;
      font-weight: 500;
      margin: 0;
    }
    &__subtitle {
      font-size: 16px;
      color: var(--text-highlight);
      margin: 0;
      font-weight: 300;
    }
  }
</style>
