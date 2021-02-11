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
