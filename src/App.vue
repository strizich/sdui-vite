<template>
  <div class="playground">
    <sd-progress :progress="0.9" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { PACKAGE_VERSION } from './lib'
import useScrollSpy from './lib/hooks/useScrollSpy';
export default defineComponent({
  name: 'App',
  setup() {
    const version = PACKAGE_VERSION;
    const parentEl = ref(null);
    const bodyEl = ref(null);
    const checkbox = ref(false)
    const { activeSection } = useScrollSpy(parentEl, bodyEl);

    return { parentEl, bodyEl, activeSection, checkbox, version };
  }
});
</script>

<style lang="scss">
@use '@/lib/scss/engine' with (
  $primary-highlight: pink,
  $primary-dark-highlight: brown,
  $primary-dark-accent: brown
);

$link: green;

.playground {
  padding: 0px;
}
.scroller {
  position: relative;
  display: flex;
  &:after {
    content: '';
    position: absolute;
    top: 2483px;
    width: 30px;
    height: 30px;
    background-color: #fff;
  }
  &__nav {
    position: sticky;
    width: 300px;
    top: 0;
    padding: 16px 0;
    display: flex;
    flex-direction: column;
    & > a {
      padding: 8px;
    }
  }
  &__body {
    width: 100%;
  }
}

a.active {
  background-color: red;
}
</style>
