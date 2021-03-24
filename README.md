# SDUI
A component library written for Vue3. [Demo](https://www.strizichdesign.com)

[![npm version](https://badge.fury.io/js/%40strizich%2Fsdui.svg)](https://badge.fury.io/js/%40strizich%2Fsdui)
![license](https://img.shields.io/npm/l/@strizich/sdui)
![issues](https://img.shields.io/github/issues/strizich/sdui-vite)
![size](https://img.shields.io/bundlephobia/minzip/@strizich/sdui)

## Getting Started

### Installation
Download the package from npm / yarn.

NPM
```
npm i @strizich/sdui
```

YARN
```
yarn add @strizich/sdui
```

### Setup
First we will have to mount the component library to the application instance.

```js
// src/main.js

import { createApp } from 'vue'
import { sdInstall } from '@strizich/sdui'
import App from './App.vue'

const app = createApp(App)

// Makes the components globally available.
sdInstall(app)

app.mount('#app')
```

Now that the components are mounted we need to pull down the styles. At this time `sass` is required.

``` vue
// App.vue
<style lang="scss">
  @use '../node_modules/@strizich/sdui/dist/scss/engine'; // dart-sass
  @import '../node_modules/@strizich/sdui/dist/scss/engine'; // node-sass
  @import url('../node_modules/@strizich/sdui/dist/style.css');
</style>
```

