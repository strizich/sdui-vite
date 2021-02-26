<template>
  <sd-layout class="sd--docs" :sidebar="sidebar" :floating="floating">
    <template v-slot:header>
      <sd-header :asideOpen="sidebar" @toggle="(e) => toggleSidebar(e)"/>
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
  import { reactive, toRefs, watchEffect } from 'vue'
  import SdHeader from '../../../src/lib/components/SdLayout/SdHeader.vue'
  import SdLayout from '../../../src/lib/components/SdLayout/SdLayout.vue'
  import SdContainer from '../../../src/lib/components/SdGrid/SdContainer.vue'
  import useWindowWidth from '../../../src/lib/hooks/useWindowWidth'

  export default {
    name: 'Layout',
    components: { SdLayout, SdHeader, SdContainer },
    setup() {
      const state = reactive({
        sidebar: false,
        floating: false
      })

      const { smallDevice } = useWindowWidth()

      watchEffect(() => {
        state.floating = smallDevice.value
      })

      const toggleSidebar = (e) => {
        state.sidebar = !state.sidebar
      }
      return { ...toRefs(state), toggleSidebar }
    }
  }
</script>

<style lang="scss">
  @use 'scss/docs';
  @use '../src/lib/scss/engine.scss';
  @import url('../../../node_modules/prismjs/themes/prism-dark.css');
</style>