<template>
  <sd-layout class="sd--docs" :sidebar="state.sidebar">
    <template v-slot:header>
      <sd-header @toggle="(e) => toggleSidebar(e)"/>
    </template>
    <template v-slot:sidebar>
      Im here
    </template>
    <template v-slot:content>
      <sd-container article>
        <Content/>
      </sd-container>
    </template>
  </sd-layout>
</template>

<script>
  import { reactive } from 'vue'
  import SdHeader from '../../../src/lib/components/SdLayout/SdHeader.vue'
  import SdLayout from '../../../src/lib/components/SdLayout/SdLayout.vue'
  import SdContainer from '../../../src/lib/components/SdGrid/SdContainer.vue'
  export default {
    name: 'Layout',
    components: { SdLayout, SdHeader, SdContainer },
    setup() {
      const state = reactive({
        sidebar: false
      })
      const toggleSidebar = (event) => {
        state.sidebar = !state.sidebar
      }
      return { state, toggleSidebar }
    }
  }
</script>

<style lang="scss">
  @use 'scss/docs';
  @use '../src/lib/scss/engine.scss';
  @import url('../../../node_modules/prismjs/themes/prism-dark.css');
</style>