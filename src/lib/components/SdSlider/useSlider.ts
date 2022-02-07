import { computed, reactive, ref, Ref, watch, nextTick, watchEffect, onMounted, onUnmounted, toRefs } from 'vue'
import { minMax, quantizeValue, pctComplete, convertToValue, convertValueToPx, singleUnitValue } from './SdSliderFoundation'
import { roundTo } from '../../core/utilities/RoundTo'
import useKeyboardFocus from '../../hooks/useKeyboardFocus'
const useSlider = (props, emit) => {
  const slider: Ref<null | HTMLElement> = ref(null)
  const handle: Ref<null | HTMLElement> = ref(null)
  const isFocused = useKeyboardFocus(handle)

  const state = reactive({
    init: false,
    computedX: 0,
    x: 0,
    minX: 0,
    maxX: 0,
    dragStartX: 0,
    handleWidth: 0,
    handleHeight: 0,
    handleOffset: 0,
    unit: 0,
    pctComplete: 0,
    isHover: false,
    isDragging: false
  })

  const handleHover = e => {
    if (e.type === 'mouseenter') {
      state.isHover = true
    }
    if (e.type === 'mouseleave') {
      state.isHover = false
    }
  }
  
  // --- Keyboard Handlers --- //
  // Increases the value by a unit which is `step / (max - min) * width`
  const handleIncrementUp = () => {
    state.x = state.computedX + state.unit
    state.pctComplete = pctComplete(state.x, state.maxX)
  }

  // Decrease the value by a unit
  const handleIncrementDown = () => {
    state.x = state.computedX - state.unit
    state.pctComplete = pctComplete(state.x, state.maxX)
  }

  // Increase the value to the upper boundry (clientWith / maxX)
  const handleIncrementMax = () => {
    state.x = state.maxX
    state.pctComplete = 1
  }

  // Decrease the value to the lower boundry (0)
  const handleIncrementMin = () => {
    state.x = 0
    state.pctComplete = 0
  }

  // --- Keyboard Events --- //
  const onKeydown = e => {
    // `e.preventDefault()` is called in each case so that it does not block other keys. Eg. `Tab`
    switch (e.key) {
      case 'ArrowLeft':
      case 'PageUp':
      case 'ArrowDown':
        e.preventDefault()
        handleIncrementDown()
        break

      case 'ArrowRight':
      case 'PageDown':
      case 'ArrowUp':
        e.preventDefault()
        handleIncrementUp()
        break

      case 'Home':
        e.preventDefault()
        handleIncrementMin()
        break

      case 'End':
        e.preventDefault()
        handleIncrementMax()
        break
    }
  }

  const handleMouseWheel = (e) => {
    if(e.wheelDelta > 0) {
      handleIncrementUp()
    } else{
      handleIncrementDown()
    }
  }

  // --- Mouse / Touch Handlers --- //
  const handleMove = (e: MouseEvent | TouchInit) => {
    const { clientX } = e
    state.x = Math.max(0, Math.min(clientX - state.dragStartX, state.maxX))
    state.pctComplete = pctComplete(state.x, state.maxX)
  }

  const handleStart = (e: MouseEvent | TouchInit) => {
    const { clientX } = e
    const clickX = Math.round((clientX - state.handleOffset))
    state.x = Math.max(0, Math.min(clickX, state.maxX))
    state.dragStartX = clientX - state.x
    state.pctComplete = pctComplete(state.x, state.maxX)
    state.isDragging = true
  }

  const handleEnd = () => {
    state.isDragging = false
    state.dragStartX = 0
  }

  // --- Mouse Events --- //
  const onMouseWheel = (e: MouseEvent)=> {
    e.preventDefault()
    handleMouseWheel(e)
  }

  const onMouseMove = (e: MouseEvent) => {
    e.preventDefault()
    handleMove(e)
  }

  const onMouseDown = (e: MouseEvent) => {
    handleStart(e)
    document.addEventListener('mouseup', onMouseUp, { passive: true })
    document.addEventListener('mousemove', onMouseMove, { passive: false })
  }

  const onMouseUp = (e: MouseEvent) => {
    handleEnd()
    document.removeEventListener('mouseup', onMouseUp)
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mousedown', onMouseDown)
  }

  // --- Touch Events---
  const onTouchMove = (e: TouchEvent) => {
    const { touches } = e
    e.preventDefault()
    handleMove(touches[0])
  }

  const onTouchStart = (e: TouchEvent): void => {
    const { touches } = e
    handleStart(touches[0])
    document.addEventListener('touchend', onTouchEnd, { passive: true })
    document.addEventListener('touchmove', onTouchMove, { passive: false })
  }

  const onTouchEnd = (): void => {
    handleEnd()
    document.removeEventListener('touchstart', onTouchStart)
    document.removeEventListener('touchend', onTouchEnd)
    document.removeEventListener('touchmove', onTouchMove)
  }

  // --- Window Resize Handler  -- //
  const handleWindowResize = () => {
    nextTick().then(() => {
      if (
        slider.value instanceof HTMLElement &&
        handle.value instanceof HTMLElement
      ) {
        const rect = slider.value.getBoundingClientRect()
        state.handleOffset = Math.round(rect.left)
        state.maxX = Math.round(slider.value.clientWidth)
        state.handleWidth = Math.round(handle.value.clientWidth)
      }
    })
  }

  // Core of the maths. Will rerun if any of the dependencies change.
  // Also runs once the component is mount (flush: 'post')
  watchEffect(() => {
    if (
      slider.value instanceof HTMLElement &&
      handle.value instanceof HTMLElement
    ) {
      const rect = slider.value.getBoundingClientRect()
      state.init = true

      // Allows for more flexability in future iterations. (Mostly useless right now)
      state.handleWidth = Math.round(handle.value.clientWidth)
      
      // Used to offset the click position.
      // Useful if the element's x position has moved since the last interaction.
      state.handleOffset = Math.round(rect.left)

      // The width of the slider element in pixels.
      // Used to calculate the % complete and lock the handle in the upper bounds
      state.maxX = Math.round(slider.value.clientWidth)

      // Core calculation to convert an arbitrary value into pixels
      state.computedX = convertValueToPx(props.modelValue, props.min, props.max, state.maxX)

      // The value of a single unit of X converted to pixels.
      state.unit = singleUnitValue(props.step, props.min, props.max, state.maxX)

      slider.value.addEventListener('touchstart', onTouchStart, { passive: true })
      slider.value.addEventListener('mousedown', onMouseDown)

      slider.value.addEventListener('mouseenter', handleHover, { passive: true })
      slider.value.addEventListener('mouseleave', handleHover, { passive: true })

      // Adds listeners when mounted. Not totally sure why I put it here.
      if (isFocused.value) {
        handle.value.addEventListener('keydown', onKeydown, { passive: false })
      } else {
        handle.value.removeEventListener('keydown', onKeydown)
      }
    }
  }, { flush: 'post' })

  watch(() => state.isHover, (next) => {
    if (slider.value instanceof HTMLElement && next) {
      if (props.useWheel && state.isHover) {
        slider.value.addEventListener('wheel', onMouseWheel, { passive: false })
      } else {
        slider.value.removeEventListener('wheel', onMouseWheel)
      }
    }
  })

  // Final Calculations
  const result = computed(() => {
    const currentValue = convertToValue(state.pctComplete, props.min, props.max)
    const quantize = quantizeValue(currentValue, props.step)
    if (currentValue !== props.max && currentValue !== props.min) {
      return minMax(props.min, quantize, props.max)
    }
    return roundTo(minMax(props.min, currentValue, props.max), 2)
  })

  // Emits the result on change
  watch(() => result.value, (next) => {
    emit('update:modelValue', next)
  })

  onMounted(() => {
    // Listens to resize events.
    window.addEventListener('resize', handleWindowResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleWindowResize)

    if (slider.value instanceof HTMLElement) {
      slider.value.removeEventListener('mouseenter', handleHover)
      slider.value.removeEventListener('mouseleave', handleHover)
    }
  })

  return {
    ...toRefs(state),
    slider,
    handle,
    result,
    isFocused
  }
}

export default useSlider