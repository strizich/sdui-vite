<template>
  <div class="playground">
    <sd-progress :progress="0.9" />
    <sd-container full>
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
        okayy
      </sd-button>
      <sd-button
        theme="light"
        icon-only
        size="sm"
        icon="bluetooth"
      />
      <sd-button 
        theme="butts"
      >
        okay
      </sd-button>
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
@use '@/lib/scss/engine';
@use '@/lib/scss/make-button' as *;

@include makeButton('butts') {
  --bg: green;
  --bg-hover: navy;
  --text: red;
  --hover: white;
  --text-hover: orange;
  --text-focus: 
  --butts-border-color: #ffffff;
  --butts-active-color: lime;
  --btn-font-size-md: 20px;
};

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
