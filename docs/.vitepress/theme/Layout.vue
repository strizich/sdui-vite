<template>
  <SdLayout>
    <template v-slot:content>
      <sd-container>
        <Content/>
      </sd-container>
    </template>
  </SdLayout>
</template>

<script>
  import SdLayout from '../../../src/lib/components/SdLayout/SdLayout.vue'
  import SdContainer from '../../../src/lib/components/SdGrid/SdContainer.vue'
  export default {
    name: 'Layout',
    components: { SdLayout, SdContainer }
  }
</script>

<style lang="scss">
  @use '../src/lib/scss/engine.scss';
  @import url('../../../node_modules/prismjs/themes/prism-dark.css');
</style>