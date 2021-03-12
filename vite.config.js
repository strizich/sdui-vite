import vue from '@vitejs/plugin-vue'
import copy from 'rollup-plugin-copy'

/**
 * @type {import('vite').UserConfig}
 */

const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@lib/': path.resolve(__dirname, 'src/lib')
    }
  },
  plugins: [
    vue(),
    copy({
      targets: [
        { src: 'src/lib/scss/**/*', dest: 'dist/scss' },
        { src: 'README.md', dest: 'dist' }
      ],
      hook: 'writeBundle'
    })
  ],
  build: {
    lib: {
      name: 'sdui',
      entry: path.resolve(__dirname, 'src/lib/index.ts')
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
}
