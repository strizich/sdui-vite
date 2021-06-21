<template>
  <div class="sd--widget-footer">
    <div class="sd--widget__footer--start">
      <div class="sd--text__caption">
        {{ caption }}
      </div>
      <div class="sd--text__footnote">
        {{ footnote }}
      </div>
    </div>
    <div class="sd--widget__footer--end">
      <sd-icon 
        name="chevron_right"
        v-if="clickable"
      />
    </div>
  </div>
</template>

<script lang="ts">
// TODO: Add properties to manage auto height.
import { defineComponent } from 'vue'
import SdIcon from '../SdIcon/SdIcon.vue'
export default defineComponent({
  name: 'SdWidgetFooter',
  components: { SdIcon },
  props: {
    caption: {
      type: String,
      default: undefined
    },
    footnote: {
      type: String,
      default: undefined
    },
    clickable: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    
  }
})
</script>

<style lang="scss">
.sd--widget-footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 8px 16px;
    flex-grow: 0;
    
    &:not(:only-child):before{
      content: '';
      height: 1px;
      background-color: var(--divider);
      position:absolute;
      left: 16px;
      right: 0;
      top: 0;
    }
  }
</style>
