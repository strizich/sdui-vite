import { reactive, toRefs, onMounted, onUnmounted } from 'vue'
import SdThrottle from '../core/utilities/SdThrottle'

const useWindowWidth = () => {
  const state = reactive({
    windowWidth: null,
    smallDevice: false
  })

  const updateWindowWidth = () => {
    const width = window.innerWidth
    state.windowWidth = width
    state.smallDevice = state.windowWidth <= 768
  }

  const addResizeListener = () => {
    window.addEventListener('resize', () => {
      SdThrottle(600, updateWindowWidth())
    }, false)
  }

  const removeResizeListener = () => {
    window.removeEventListener('resize', updateWindowWidth())
  }

  updateWindowWidth()

  onMounted(() => {
    addResizeListener()
  })

  onUnmounted(() => {
    removeResizeListener()
  })

  return { ...toRefs(state) }
}

export default useWindowWidth
