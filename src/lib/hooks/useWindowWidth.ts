import { reactive, toRefs, onMounted, onUnmounted, Ref } from 'vue'
import SdThrottle from '../core/utilities/SdThrottle'

interface WindowWidth {
  windowWidth:  number | null,
  smallDevice: boolean
}

const useWindowWidth = () => {
  const state = reactive<WindowWidth>({
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
    window.removeEventListener('resize', () => {
      SdThrottle(600, updateWindowWidth())
    })
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
