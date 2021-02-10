let currentToast = null
let timeout = null

const promiseToast = (duration, persist) => {
  return new Promise(resolve => {
    currentToast = {
      destroy: () => {
        currentToast = null
        resolve()
      }
    }

    if (duration !== Infinity) {
      timeout = window.setTimeout(() => {
        destroyToast()
        if (!persist) {
          console.log('This will take some work to figure out.')
          console.log('Will likely require a different approach...')
        }
      }, duration)
    }
  })
}

const destroyToast = () => {
  return new Promise(resolve => {
    if (currentToast) {
      window.clearTimeout(timeout)
      currentToast.destroy()
      window.setTimeout(resolve, 400)
    } else {
      resolve()
    }
  })
}

export const makeToast = (duration, persist) => {
  if (currentToast) {
    return destroyToast().then(() => {
      return promiseToast(duration, persist)
    })
  }

  return promiseToast(duration, persist)
}
