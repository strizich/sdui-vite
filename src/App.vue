<template>
  <sd-layout :scheme="state.scheme">
    <template #content>
      <sd-mast>Things here</sd-mast>
      <div class="demo">
        <sd-container full>
          <h1 class="sd--text__headline">
            SDUI - Vite
          </h1>
          <sd-action-bar title="hmm">
            <template #start>
              <sd-fieldset title="okay">
                <sd-button 
                  @click="handleDialogOpen"
                >
                  Open Modal
                  <sd-tooltip>huh</sd-tooltip>
                </sd-button>
                <sd-button @click="handleToast">
                  Make Toast
                </sd-button>
              </sd-fieldset>
            </template>
            <template #end>
              <sd-fieldset 
                title="Color Scheme"
                inline
              >
                <sd-radio
                  v-model="state.scheme"
                  value="auto"
                >
                  Auto
                </sd-radio>
                <sd-radio
                  v-model="state.scheme"
                  value="dark"
                >
                  Dark
                </sd-radio>
                <sd-radio
                  v-model="state.scheme"
                  value="light"
                >
                  Light
                </sd-radio>
              </sd-fieldset>
            </template>
          </sd-action-bar>
          <sd-row dense>
            <sd-col
              :sm="6"
              :md="4" 
              :lg="3"
              :xl="2"
            >
              <sd-widget
                theme="primary"
                clickable
              >
                <sd-widget-metric value="51" />
                <sd-widget-footer
                  caption="Widget caption"
                  footnote="Widget footnote"
                />
              </sd-widget>
            </sd-col>
            <sd-col
              :sm="6"
              :md="4" 
              :lg="3"
              :xl="2"
            >
              <sd-widget
                theme="primary"
                clickable
              >
                <sd-widget-metric value="51" />
                <sd-widget-footer
                  caption="Widget caption"
                  footnote="Widget footnote"
                />
              </sd-widget>
            </sd-col>
            <sd-col
              :sm="6"
              :md="4" 
              :lg="3"
              :xl="2"
            >
              <sd-widget
                theme="primary"
                clickable
              >
                <sd-widget-metric value="51" />
                <sd-widget-footer
                  caption="Widget caption"
                  footnote="Widget footnote"
                />
              </sd-widget>
            </sd-col>
            <sd-col
              :sm="6"
              :md="4" 
              :lg="3"
              :xl="2"
            >
              <sd-widget
                theme="primary"
                clickable
              >
                <sd-widget-metric value="51" />
                <sd-widget-footer
                  caption="Widget caption"
                  footnote="Widget footnote"
                />
              </sd-widget>
            </sd-col>
            <sd-col
              :sm="6"
              :md="4" 
              :lg="3"
              :xl="2"
            >
              <sd-widget
                clickable
              >
                <sd-widget-metric value="51" />
                <sd-widget-footer
                  caption="Widget caption"
                  footnote="Widget footnote"
                />
              </sd-widget>
            </sd-col>
          </sd-row>
        </sd-container>
        <sd-checkbox v-model="state.toast">
          Toast
        </sd-checkbox>
      </div>
      <sd-toast
        v-model:active="state.toast"
        dismissable
      >
        Okay
      </sd-toast>
      <sd-dialog
        aside
        v-model:active="state.modal"
      >
        <sd-dialog-header
          title="Title"
          subtitle="Subtitle"
        />
        <sd-dialog-content>
          <p>Content goes here</p>
        </sd-dialog-content>
        <sd-dialog-footer>
          <sd-button
            theme="dark"
            @click="handleDialogClose()"
          >
            Close
          </sd-button>
        </sd-dialog-footer>
      </sd-dialog>
    </template>
  </sd-layout>
</template>

<script lang="ts">
  import { reactive, defineComponent } from 'vue'
  import SdWidget from './lib/components/SdWidget/SdWidget.vue'
  import SdWidgetMetric from './lib/components/SdWidget/SdWidgetMetric.vue'
  import SdWidgetFooter from './lib/components/SdWidget/SdWidgetFooter.vue'

  export default defineComponent({
  components: { SdWidget, SdWidgetMetric, SdWidgetFooter },
  name: 'App',
  setup () {
    const state = reactive({
      sliderything: 0,
      modal: false,
      toast: false,
      scheme: 'auto'
    })

    const handleDialogOpen = () => {
      state.modal = true
    }

    const handleDialogClose = () => {
      state.modal = false
    }

    const handleToast = () => {
      state.toast = true
    }
    return {
      handleToast,
      handleDialogClose,
      handleDialogOpen,
      state
    }
  }
})
</script>

<style lang="scss">
  @use '@/lib/scss/engine';

  .demo{
    padding: 40px 0;
  }
</style>