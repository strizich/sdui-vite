import { ref, computed, onMounted } from 'vue'

const useKeyboardFocus = ($el) => {
  const currentElement = ref(null)
  let eventTarget: HTMLElement
  let hasEvents = false
  let supportsPassiveEvent = { passive: false }

  const checkPassiveEventSupport = () => {
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get () {
          supportsPassiveEvent = { passive: true }
        }
      })
      window.addEventListener('ghost', opts)
    } catch (e) {}
  }

  const setKeyboardInteraction = ({ target }): void => {
    currentElement.value = target
  }

  const setMouseAndTouchInteraction = (): void => {
    currentElement.value = null
  }

  const createKeyboardEvents = (): void => {
    eventTarget.addEventListener('keyup', setKeyboardInteraction)
  }

  const createPointerEvents = (): void => {
    eventTarget.addEventListener('pointerup', setMouseAndTouchInteraction)
  }

  const createMSPointerEvents = (): void => {
    eventTarget.addEventListener('MSPointerUp', setMouseAndTouchInteraction)
  }

  const createMouseAndTouchEvents = (): void => {
    eventTarget.addEventListener('mouseup', setMouseAndTouchInteraction)
    if ('ontouchend' in window) {
      eventTarget.addEventListener('touchend', setMouseAndTouchInteraction, supportsPassiveEvent)
    }
  }

  const bindEvents = (): void => {
    if (window.PointerEvent) {
      createPointerEvents()
    } else if (window.MSPointerEvent) {
      createMSPointerEvents()
    } else {
      createMouseAndTouchEvents()
    }

    createKeyboardEvents()
  }

  const createEvents = () => {
    if (!hasEvents) {
      eventTarget = document.body
      checkPassiveEventSupport()
      bindEvents()
      hasEvents = true
    }
  }

  const hasFocus = computed(() => {
    // For some reason this resolves to true while the app is mounting. Checking if all of the values are available appears to fix this.
    if ($el.value && currentElement.value) {
      return $el.value === currentElement.value
    }
  })

  onMounted(() => {
    createEvents()
  })

  return hasFocus
}

export default useKeyboardFocus
