<script setup>
  import { reactive } from 'vue'
  import SdButton from '../src/lib/components/SdButton/SdButton.vue'
  import SdDialog from '../src/lib/components/SdDialog/SdDialog.vue'
  import SdDialogHeader from '../src/lib/components/SdDialog/SdDialogHeader.vue'
  import SdDialogContent from '../src/lib/components/SdDialog/SdDialogContent.vue'
  import SdDialogFooter from '../src/lib/components/SdDialog/SdDialogFooter.vue'

  const state = reactive( {
    modal: false,
    aside: false
  })

  const toggleModal = () => {
    state.modal = !state.modal
  }

  const toggleAside = () => {
    state.aside = !state.aside
  }

</script>

# Dialogs (Modals)
An overlayed content window.

## Demo
<div class="demo">
<sd-button @click="toggleModal">Trigger Aside</sd-button>
<sd-dialog aside v-model:active="state.aside"><sd-dialog-header title="Aside" subtitle="I am an aside">Header</sd-dialog-header><sd-dialog-content>Content</sd-dialog-content><sd-dialog-footer><sd-button @click="toggleAside">Close</sd-button></sd-dialog-footer></sd-dialog>
<sd-button @click="toggleAside">Trigger Modal</sd-button><sd-dialog v-model:active="state.modal"><sd-dialog-header title="Modal" subtitle="I am a modal">Header</sd-dialog-header><sd-dialog-content>Content</sd-dialog-content><sd-dialog-footer><sd-button @click="toggleModal">Close</sd-button></sd-dialog-footer></sd-dialog>
</div>

---

### Example
```html
<template>
  <sd-button @click="toggleModal">Trigger Aside</sd-button>

  <sd-dialog aside v-model:active="state.aside">
    <sd-dialog-header title="Modal" subtitle="I am a modal">Header</sd-dialog-header>
    <sd-dialog-content>Content</sd-dialog-content>
    <sd-dialog-footer>
      <sd-button @click="toggleModal">Close</sd-button>
    </sd-dialog-footer>
  </sd-dialog>
<template>

<script>
  import { reactive } from 'vue'
  export default {
    setup() {
      const state = reactive( {
        active: false
      })
      const toggleModal = () => {
        state.active = !state.active
      }
      return { state, toggleModal }
    }
  }
</script>

```
## API
Here is a rundown of all of the `props` and `events` that have been made available.
### Props
|name|type|default|description|
|-|-|-|-|
|id|`string`|`modal-{random-hash}`|Sets the `id` of the modal.|
|active|`boolean`|`false`|Activates the modal if `true`|
|backdrop|`boolean`|`true`|Controls the visibility of the backdrop (overlay)|
|backdropBlur|`boolean`|`false`|Blurs the body of the page when the modal is open.<br/>_Experimental feature_ may cause a performance loss on low-spec machines_|
|clickOutsideToClose|`boolean`|`true`|Close the modal when a click event occurs outside of the modal.|
|closeOnEsc|`boolean`|`true`|Close the modal when the `esc` key is pressed.|
|size|`string`|`md`|Sets the size of the modal (desktop only)|
|fullscreen|`string`|`true`|(Dialog Only / Mobile Only) keeps the modal from occupying the fullscreen on moble. Setting this to `false` breaks the `enter` / `leave` animation.|
|placement|`string`|`right`|(Aside Only) Positions the modal on the right or left of the screen.|

### Events
|name|description|
|-|-|
|update:active|Updates the parent component when the active state has changed|
|opened|Modal has opened|
|closed|Modal has closed|
|clicked-outside| An outside click has occurred.|

---

## Companion Components
There are several components that can be used optionally with `SdDialog`. These components used to are to style the component. You can omit these components to customize the experience based on your usecase.

### SdDialogHeader
This where the title of the dialog and close button traditionally go.

>The close button is not built into the header. Placing an element into the slot should position it appropriately.

#### API
|name|type|description|
|-|-|-|
|title|`string`|The title of the modal|
|subtitle|`string`|An optional byline or subtitle for the modal`

```html
<!-- TODO: confirm that this fragment is valid -->
<sd-dialog-header>
  <h1>Header</h1>
  <sd-button icon-only flat rounded>
    <sd-icon name="close"/>
  </sd-button>
</sd-dialog-header>
```

### SdDialogContent
Main Content area for the modal. This is where all of your goodness goes.

>`SdDialogContent` will stretch to fit the available space in `<sd-dialog/>`. Which is helpful in keeping the `<sd-footer-content/>` at the bottom of the dialog.

### SdDialogFooter
Contains styling for the component footer. Mainly used to hold action buttons.

|Component|Purpose|
|-|-|
|SdDialogHeader|The Header of the modal|
|SdDialogContent|The content area of the modal. The bulk of your content will go in here. This area should always fill the available space should and keep the footer pressed at the bottom of the page.
|SdDialogFooter|The modal footer|