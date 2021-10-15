import { ref, reactive, Ref, watch, nextTick, onMounted, onUnmounted, watchPostEffect } from 'vue'
import { createPopper, Placement } from '@popperjs/core'

const usePopper = (props, emit, activate?) => {
  const targetRef: Ref<null | HTMLElement> = ref(null)
  const instanceRef: Ref<null | HTMLElement> = ref(null)
  const shouldRender: Ref<Boolean> = ref(false)

  const popper = reactive({
    instance: null,
    target: null
  })

// Popper Options
  const options = reactive({
    placement: props.placement,
    modifiers: [{
      name: 'offset',
      options: {
        offset: props.offset
      }
    },
    {
      name: 'preventOverflow',
      options: {
        boundary: 'viewport',
        rootBoundary: 'document'
      }
    }]
  })

    // Copy active prop to local state


  watchPostEffect(() => {
    if(props.modelValue) {
      shouldRender.value = props.modelValue
    }
    if(activate) {
      shouldRender.value = activate.value
    }
  })


  // emit when state has been updated...
  // FUTURE: potentially worth looking into using the new v-model bindings for this.
  watch(() => shouldRender.value, (next) => {
    emit('update:modelValue', next)
    if (next) {
      bindPopper()
    }
  })

  // create popper
  const makePopper = () => {
    popper.instance = createPopper(popper.target, instanceRef.value, options)
  }

  // kill your creation
  const killPopper = () => {
    if (popper.instance) {
      popper.instance.destroy()
      popper.instance = null
    }
  }

  // bind popper instance at the next repaint
  const bindPopper = () => {
    nextTick().then(() => {
      if (popper.target) {
        makePopper()
      }
    })
  }

  const resetPopper = () => {
    if (popper.instance) {
      killPopper()
      makePopper()
    }
  }

  const show = () => {
    shouldRender.value = true
    emit('opened')
  }

  const hide = () => {
    shouldRender.value = false
    emit('closed')
  }

  const touched = () => {
    shouldRender.value = !shouldRender.value
  }

  const outsideTouch = (e) => {
    if (shouldRender.value && popper.target !== e.target) {
      shouldRender.value = false
    }
  }

  const mountEventBindings = async () => {
    await nextTick().then(() => {
      if(targetRef.value.parentNode instanceof HTMLElement) {
        // Gets the orignal parent instance of <teleport />
        popper.target = targetRef.value?.parentNode
        if (props.autoOpen && popper.target) {
          document.body.addEventListener('touchstart', outsideTouch, { passive: true })
          popper.target.addEventListener('touchstart', touched, { passive: true })
          popper.target.addEventListener('mouseenter', show, { passive: true })
          popper.target.addEventListener('mouseleave', hide, { passive: true })
        }
      }
    })
  }

  onMounted(() => {
    mountEventBindings()
    resetPopper()
  })

  onUnmounted(() => {
    if (props.autoOpen) {
      document.body.removeEventListener('touchstart', outsideTouch)
      popper.target.removeEventListener('touchstart', touched)
      popper.target.removeEventListener('mouseenter', show)
      popper.target.removeEventListener('mouseleave', hide)
    }
  })
  return { instanceRef, targetRef, shouldRender }
}

export default usePopper
