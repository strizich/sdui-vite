<template>
  <div class="playground">
    <sd-container class="thing" full>
      <div class="scroller" ref="parentEl">
        <div class="scroller__sidebar">
          <div class="scroller__nav">
            <a 
              href="#one" 
              :class="{active: activeSection === 'one'}"
            >
              One
            </a>
            <a
              href="#two"
              :class="{active: activeSection === 'two'}"
            >
              Two
            </a>
            <a
              href="#three"
              :class="{active: activeSection === 'three'}"
            >
              Three
            </a>
            <a
              href="#four"
              :class="{active: activeSection === 'four'}"
            >
              Four
            </a>
          </div>
        </div>
        <div class="scroller__body" ref="bodyEl">
          <section 
            id="one"
            style="height: 1000px; background-color:green;"
          >
            one
          </section>
          <section
            id="two"
            style="height: 1000px; background-color:red;"
          >
            two
          </section>
          <section
            id="three"
            style="height: 1000px; background-color:blue;"
          >
            three
          </section>
          <section
            id="four"
            style="height: 1000px; background-color:orange;"
          >
            four
          </section>
        </div>
      </div>
    </sd-container>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref } from 'vue';
import useScrollSpy from './lib/hooks/useScrollSpy'
export default defineComponent({
  name: 'App',
  setup() {
    const parentEl = ref(null)
    const bodyEl = ref(null)
    const { activeSection } = useScrollSpy(parentEl, bodyEl)

    return {parentEl, bodyEl, activeSection}
  },
});
</script>

<style lang="scss">
@use '@/lib/scss/engine';

.playground {
  padding: 0px;
}
.scroller {
  position:relative;
  display:flex;
  &:after{
    content: '';
    position: absolute;
    top: 2483px;
    width: 30px;
    height: 30px;
    background-color: #fff;
  }
  &__nav{
    position:sticky;
    width: 300px;
    top:0;
    padding: 16px 0;
    display: flex;
    flex-direction: column;
    & > a {
      padding: 8px;
    }
  }
  &__body{
    width: 100%;
  }
}

a.active {
  background-color: red;
}
</style>
