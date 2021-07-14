<template>
  <sd-layout :scheme="state.scheme">
    <template #header>
      <sd-header></sd-header>
    </template>
    <template #content>
      <!-- <sd-mast>Things here</sd-mast> -->
      <div class="demo">
        <sd-container full>
          <h1 class="sd--text__headline">
            SDUI - Vite
          </h1>
          <div id="okay">
            <sd-button-group>
              <sd-button
                type="link"
                id="trigger1"
                :href="state.link"
              >
                Dropdown 1
              </sd-button>
              <sd-dropdown trigger="trigger1" close-on-click>
                <sd-button flat block>okay</sd-button>
                <sd-button flat block>okay</sd-button>
                <sd-button flat block>okay</sd-button>
              </sd-dropdown>

              <sd-button id="trigger2">
                Dropdown 2
              </sd-button>
              <sd-dropdown trigger="trigger2" :portal-to-body="false">
                <sd-button flat block>okay</sd-button>
                <sd-button flat block>okay</sd-button>
                <sd-button flat block>okay</sd-button>
              </sd-dropdown>
            </sd-button-group>
            
          </div>
          <!-- <sd-carousel>
            <sd-sheet padded>Okay</sd-sheet>
            <sd-sheet padded>Okay</sd-sheet>
            <sd-sheet padded>Okay</sd-sheet>
          </sd-carousel> -->
          <sd-action-bar title="hmm">
            <template #start>
              <sd-button-group class="demo__button-group" >
                <sd-button 
                  @click="handleDialogOpen"
                >
                  Open Modal
       
                </sd-button>
              </sd-button-group>
              <sd-button-group class="demo__button-group">
                <sd-button 
                  @click="handleDialogOpen"
                >
                  Open Modal
                  <sd-tooltip>huh</sd-tooltip>
                </sd-button>
                <sd-button outline @click="handleToast">
                  Make Toast
                </sd-button>
                <sd-button @click="handleToast">
                  Make Toast
                </sd-button>
                <sd-button @click="handleToast">
                  Make Toast
                </sd-button>
              </sd-button-group>
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
          <sd-grid
            :columns="12"
            :gutter="[0, 16]">

            <sd-cell
              :sm="7"
              :md="6"
            >
              <sd-widget
                theme="primary"
                class="widget--tall"
              >
                <sd-widget-metric
                  value="1"
                  note="components"
                />
                <sd-widget-footer
                  caption="Widget caption"
                  footnote="Widget footnote"
                />
              </sd-widget>
            </sd-cell>
             <sd-cell
              :xs="6"
              :md="6"
              align="stretch"
             >
              <sd-widget>
                <sd-widget-metric
                  value="2"
                  note="components"
                />
                <sd-widget-footer
                  caption="Widget caption"
                  footnote="Widget footnote"
                />
              </sd-widget>
            </sd-cell>
            <sd-cell
              :xs="6"
              :md="3" 
            >
              <sd-widget
                theme="primary"
              >
                <sd-widget-metric
                  value="51"
                  note="components"
                />
                <sd-widget-footer
                  caption="Widget caption"
                  footnote="Widget footnote"
                />
              </sd-widget>
            </sd-cell>
            <sd-cell
              :md="3"
            >
              <sd-widget
                theme="primary"
              >
                <sd-widget-metric
                  value="51"
                  note="components"
                />
                <sd-widget-footer
                  caption="Widget caption"
                  footnote="Widget footnote"
                />
              </sd-widget>
            </sd-cell>
             <sd-cell
              :md="3"
              >
              <sd-widget
                theme="primary"
              >
                <sd-widget-metric
                  value="51"
                  note="components"
                />
                <sd-widget-footer
                  caption="Widget caption"
                  footnote="Widget footnote"
                />
              </sd-widget>
            </sd-cell>
             <sd-cell 
              :md="3"
             >
              <sd-widget
                theme="primary"
              >
                <sd-widget-metric
                  value="51"
                  note="components"
                />
                <sd-widget-footer
                  caption="Widget caption"
                  footnote="Widget footnote"
                />
              </sd-widget>
            </sd-cell>
          </sd-grid>
        </sd-container>
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
          <sd-slider
            :min="0"
            :max="12"
            :step="2"
            v-model="state.sliderything"
          />
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
  import { reactive, defineComponent, ref, onMounted } from 'vue'
  // import SdCarousel from './lib/components/SdCarousel/SdCarousel.vue'

  export default defineComponent({
  name: 'App',
  components: {
    // SdCarousel,
  },
  setup () {
    const state = reactive({
      sliderything: 4,
      modal: false,
      toast: false,
      scheme: 'auto',
      name: 'hello ladies',
      dropdown: false,
      link: null,
      dropdown2: false
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
    &__button-group{
      margin-bottom: 16px;
    }
  }
  .something{
    color: var(--danger);
    display:flex;
    align-items: center;
    font-size: 12px;
  }
  .widget--tall{
    min-height: 400px;
  }
</style>