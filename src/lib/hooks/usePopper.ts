import { ref, reactive, Ref, watch, nextTick, onMounted, onUnmounted, watchEffect } from 'vue'
import { createPopper } from '@popperjs/core'
import { useKeyboardFocus } from '..'

const usePopper = (props, emit, activate?) => {
  const targetRef: Ref<null | HTMLElement> = ref(null)
  const instanceRef: Ref<null | HTMLElement> = ref(null)
  const parentRef: Ref<null | HTMLElement> = ref(null)
  const shouldRender: Ref<Boolean> = ref(false)
  const hasFocus = useKeyboardFocus(parentRef)
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


  watchEffect(() => {
    if(!props.modelValue && activate) {
      shouldRender.value = activate.value
    }
    if(props.modelValue) {
      shouldRender.value = props.modelValue
    }
    if(props.focusable && hasFocus.value) {
      shouldRender.value = hasFocus.value
    }
  }, {flush: 'post'})


  // emit when state has been updated...
  // FUTURE: potentially worth looking into using the new v-model bindings for this.
  watch(() => shouldRender.value, (next) => {
    if (next) {
      bindPopper()
    }
    if(props.modelValue) {
      emit('update:modelValue', next)
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
    emit('update:modelValue', true)
  }

  const hide = () => {
    shouldRender.value = false
    emit('closed')
    emit('update:modelValue', false)
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
        parentRef.value = targetRef.value?.parentNode
        popper.target = parentRef.value
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
  return { instanceRef, targetRef, shouldRender}
}

export default usePopper
