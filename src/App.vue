<template>
  <div class="playground">
    <sd-progress :progress="0.9" />
    <sd-container full>
      <sd-sheet padded>
        <sd-button class="thing">
          <sd-tooltip theme="danger">
            Danger
          </sd-tooltip>
          okay
        </sd-button>
        <sd-button flat>
          okay
        </sd-button>
        <sd-button theme="light">
          okay
          ok
        </sd-button>
        <sd-button theme="dark">
          okay
        </sd-button>
      </sd-sheet>
    </sd-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useScrollSpy from './lib/hooks/useScrollSpy';
export default defineComponent({
  name: 'App',
  setup() {
    const parentEl = ref(null);
    const bodyEl = ref(null);
    const checkbox = ref(false)
    const { activeSection } = useScrollSpy(parentEl, bodyEl);

    return { parentEl, bodyEl, activeSection, checkbox };
  }
});
</script>

<style lang="scss">
@use '@/lib/scss/engine' with (
  $primary: red,
  $primary-highlight: pink,
  $primary-dark: orange,
  $primary-dark-highlight: brown
);

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
