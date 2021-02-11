<template>
  <sd-layout class="sd--docs" floating :sidebar="sidebar">
    <template v-slot:header>
      <sd-header :aside-open="sidebar" @toggle="(e) => toggleSidebar(e)" />
    </template>
    <template v-slot:sidebar>
      Im here
    </template>
    <template v-slot:content>
      <sd-container>
        <Content/>
      </sd-container>
    </template>
  </sd-layout>
</template>

<script>
  import SdHeader from '../../../src/lib/components/SdLayout/SdHeader.vue'
  import SdLayout from '../../../src/lib/components/SdLayout/SdLayout.vue'
  import SdContainer from '../../../src/lib/components/SdGrid/SdContainer.vue'
  import { reactive, toRefs } from 'vue'

  export default {
    name: 'Layout',
    components: { SdLayout, SdHeader, SdContainer },
    setup() {
      const state = reactive({
        sidebar: false
      })
      const toggleSidebar = (e) => {
        console.log(e)
        state.sidebar = e
      }
      return { ...toRefs(state), toggleSidebar }
    }
  }
</script>

<style lang="scss">
  @use '../src/lib/scss/engine.scss';
  @use 'scss/docs';
  @import url('../../../node_modules/prismjs/themes/prism-dark.css');
</style>