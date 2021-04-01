import vue from '@vitejs/plugin-vue'
import copy from 'rollup-plugin-copy'

/**
 * @type {import('vite').UserConfig}
 */

const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'node_modules'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    copy({
      targets: [
        { src: 'src/lib/scss/**/*', dest: 'dist/scss' },
        { src: 'README.md', dest: 'dist' },
        { src: 'types/*.d.ts', dest: 'dist/types' }
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
