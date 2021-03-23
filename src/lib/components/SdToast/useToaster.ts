export const useToaster = (currentToast, emit) => {
  let timeout = null
  const promiseToast = (duration, persist) => {
    return new Promise<void>(resolve => {
      currentToast = {
        destroy: () => {
          currentToast.value = null
          resolve()
        }
      }  
      if (duration !== Infinity) {
        timeout = window.setTimeout(() => {
          if (!persist) {
            destroyToast()
            emit(`update:active`, false)
          }
        }, duration)
      }
    })
  }
  
  const destroyToast = () => {
    return new Promise<void>(resolve => {
      if (currentToast.value) {
        window.clearTimeout(timeout)
        currentToast.destroy()
        window.setTimeout(resolve, 400)
        emit('update:active', false)
      } else {
        resolve()
      }
    })
  }
  
  const makeToast = (duration, persist) => {
    if (currentToast.value) {
      return destroyToast().then(() => {
        return promiseToast(duration, persist)
      })
    }
  
    return promiseToast(duration, persist)
  }

  return { makeToast, promiseToast, destroyToast}
}
