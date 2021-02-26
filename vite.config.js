import vue from '@vitejs/plugin-vue'

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */

export default {
  alias: {
    '@': require('path').resolve(__dirname, 'src'),
    '@lib/': require('path').resolve(__dirname, 'src/lib')
  },
  plugins: [vue()]
}

// LIBRARY BUILD WAITING ON vue-3.0.6 to resolve a rollup bug.
// https://github.com/vitejs/vite/issues/1523
// const path = require('path')

// module.exports = {
//   build: {
//     lib: {
//       entry: path.resolve(__dirname, 'src/lib/index.js'),
//       name: 'sdui'
//     },
//     rollupOptions: {
//       // make sure to externalize deps that shouldn't be bundled
//       // into your library
//       external: ['vue'],
//       output: {
//         // Provide global variables to use in the UMD build
//         // for externalized deps
//         globals: {
//           vue: 'Vue'
//         }
//       }
//     }
//   }
// }


// GOES INTO PACKAGE.JSON
// "files": ["dist"],
// "main": "./dist/sdui.umd.js",
// "module": "./dist/sdui.es.js",
// "exports": {
//   ".": {
//     "import": "./dist/sdui.es.js",
//     "require": "./dist/sdui.umd.js"
//   }
// },