import { reactive, toRefs, onMounted, onUnmounted, Ref } from 'vue'
import SdThrottle from '../core/utilities/SdThrottle'

interface WindowWidth {
  windowWidth:  number | null;
  smallDevice: boolean;
  breakpoint: string | null;
}

interface Breakpoints {
  XS: number;
  SM: number;
  MD: number;
  LG: number;
  XL: number;
}

const MIN_WIDTH: Breakpoints = {
  XS: 0,
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200
}

const MAX_WIDTH: Breakpoints = {
  XS: 575.95,
  SM: 767.95,
  MD: 991.95,
  LG: 1199.95,
  XL: 1439.95
}

const useWindowWidth = () => {
  const state = reactive<WindowWidth>({
    windowWidth: null,
    smallDevice: false,
    breakpoint: null
  })

  const getCurrentBreakpoint = (windowWidth) => {
    console.log(windowWidth)
    if(windowWidth > MIN_WIDTH.XS && windowWidth < MAX_WIDTH.XS) {
      state.breakpoint = 'XS'
    } else if (windowWidth > MIN_WIDTH.SM && windowWidth < MAX_WIDTH.SM) {
      state.breakpoint = 'SM'
    } else if(windowWidth > MIN_WIDTH.MD && windowWidth < MAX_WIDTH.MD) {
      state.breakpoint = 'MD'
    } else if(windowWidth > MIN_WIDTH.LG && windowWidth < MAX_WIDTH.LG) {
      state.breakpoint = 'LG'
    } else if (windowWidth > MIN_WIDTH.XL) {
      state.breakpoint = 'XL'
    }
  }

  const updateWindowWidth = () => {
    const width = window.innerWidth
    getCurrentBreakpoint(width)
    console.log(state.breakpoint)
    state.windowWidth = width
    state.smallDevice = state.windowWidth <= MIN_WIDTH.SM
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
