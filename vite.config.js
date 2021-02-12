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
  build: {
    lib: {
      entry: require('path').resolve(__dirname, 'src/lib'),
      name: "SDUI"
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  plugins: [vue()]
}
