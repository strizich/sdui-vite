import { ref, computed, onMounted, Ref } from 'vue'

const useKeyboardFocus = (el: Ref<HTMLElement>) => {
  const currentElement: Ref<EventTarget | null> = ref(null) 
  let eventTarget: HTMLElement | null = null
  let hasEvents = false
  let supportsPassiveEvent = { passive: false }

  const checkPassiveEventSupport = (): void => {
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get () {
          supportsPassiveEvent = { passive: true }
        }
      })
      window.addEventListener('ghost', () => {}, opts)
    } catch (e) {
      console.error(e)
    }
  }

  const setKeyboardInteraction = (event: KeyboardEvent): void => {
    currentElement.value = event.target
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

  const createMouseAndTouchEvents = (): void => {
    eventTarget.addEventListener('mouseup', setMouseAndTouchInteraction)
    if ('ontouchend' in window) {
      eventTarget.addEventListener('touchend', setMouseAndTouchInteraction, supportsPassiveEvent)
    }
  }

  const bindEvents = (): void => {
    if (window.PointerEvent) {
      createPointerEvents()
    } else {
      createMouseAndTouchEvents()
    }

    createKeyboardEvents()
  }

  const createEvents = (): void => {
    if (!hasEvents) {
      eventTarget = document.body
      checkPassiveEventSupport()
      bindEvents()
      hasEvents = true
    }
  }

  const hasFocus = computed(() => {
    // For some reason this resolves to true while the app is mounting. Checking if all of the values are available appears to fix this.
    if (el.value && currentElement.value) {
      return el.value === currentElement.value
    } else {
      return false
    }
  })

  onMounted(() => {
    createEvents()
  })

  return hasFocus
}

export default useKeyboardFocus
